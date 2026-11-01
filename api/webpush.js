// Zero-dependency Web Push (RFC 8030 + RFC 8291 aes128gcm + RFC 8292 VAPID) using only node:crypto.
// Subscriptions are stored in Upstash Redis (Vercel Marketplace -> Storage -> Upstash Redis) via its REST API.
import crypto from "node:crypto";
const b64u = (b) => Buffer.from(b).toString("base64url");
const unb64u = (s) => Buffer.from(s, "base64url");

export function vapidKeys() {
  const pub = process.env.VAPID_PUBLIC, priv = process.env.VAPID_PRIVATE;
  if (!pub || !priv) throw new Error("VAPID_PUBLIC / VAPID_PRIVATE environment variables are not set");
  return { pub, priv };
}

function vapidHeader(endpoint, pub, priv, subject) {
  const aud = new URL(endpoint).origin;
  const head = b64u(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const body = b64u(JSON.stringify({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: subject }));
  const pubBuf = unb64u(pub);
  const key = crypto.createPrivateKey({
    key: { kty: "EC", crv: "P-256", d: priv, x: b64u(pubBuf.subarray(1, 33)), y: b64u(pubBuf.subarray(33, 65)) },
    format: "jwk",
  });
  const sig = crypto.sign("sha256", Buffer.from(head + "." + body), { key, dsaEncoding: "ieee-p1363" });
  return `vapid t=${head}.${body}.${b64u(sig)}, k=${pub}`;
}

export function encrypt(sub, payload) {
  const ua = unb64u(sub.keys.p256dh), auth = unb64u(sub.keys.auth);
  const ecdh = crypto.createECDH("prime256v1");
  ecdh.generateKeys();
  const asPub = ecdh.getPublicKey();
  const secret = ecdh.computeSecret(ua);
  const keyInfo = Buffer.concat([Buffer.from("WebPush: info\0"), ua, asPub]);
  const ikm = Buffer.from(crypto.hkdfSync("sha256", secret, auth, keyInfo, 32));
  const salt = crypto.randomBytes(16);
  const cek = Buffer.from(crypto.hkdfSync("sha256", ikm, salt, Buffer.from("Content-Encoding: aes128gcm\0"), 16));
  const nonce = Buffer.from(crypto.hkdfSync("sha256", ikm, salt, Buffer.from("Content-Encoding: nonce\0"), 12));
  const cipher = crypto.createCipheriv("aes-128-gcm", cek, nonce);
  const enc = Buffer.concat([cipher.update(Buffer.concat([Buffer.from(payload), Buffer.from([2])])), cipher.final(), cipher.getAuthTag()]);
  const rs = Buffer.alloc(4); rs.writeUInt32BE(4096);
  return Buffer.concat([salt, rs, Buffer.from([asPub.length]), asPub, enc]);
}

export async function sendPush(sub, payload, opts = {}) {
  const { pub, priv } = vapidKeys();
  const subject = process.env.VAPID_SUBJECT || "mailto:admin@example.com";
  const res = await fetch(sub.endpoint, {
    method: "POST",
    headers: {
      Authorization: vapidHeader(sub.endpoint, pub, priv, subject),
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      TTL: String(opts.ttl || 86400),
      Urgency: opts.urgency || "high",
    },
    body: encrypt(sub, JSON.stringify(payload)),
  });
  return res.status;
}

/* ---------- storage (Upstash Redis REST) ---------- */
function redisCfg() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Storage not configured (add Upstash Redis from Vercel Storage)");
  return { url: url.replace(/\/$/, ""), token };
}

async function redis(...cmd) {
  const { url, token } = redisCfg();
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error("Redis: " + (j.error || r.status));
  return j.result;
}

const KEY = "subs";
export const saveSub = (id, sub) => redis("HSET", KEY, id, JSON.stringify(sub));
export const deleteSub = (id) => redis("HDEL", KEY, id);
export async function allSubs() {
  const flat = (await redis("HGETALL", KEY)) || [];
  const out = [];
  for (let i = 0; i < flat.length; i += 2) {
    try { out.push({ id: flat[i], sub: JSON.parse(flat[i + 1]) }); } catch { /* skip bad row */ }
  }
  return out;
}

export async function broadcast(payload) {
  const list = await allSubs();
  let sent = 0, removed = 0, failed = 0;
  for (let i = 0; i < list.length; i += 25) {
    await Promise.all(list.slice(i, i + 25).map(async ({ id, sub }) => {
      try {
        const st = await sendPush(sub, payload);
        if (st === 404 || st === 410) { await deleteSub(id); removed++; }
        else if (st >= 200 && st < 300) sent++;
        else failed++;
      } catch { failed++; }
    }));
  }
  return { total: list.length, sent, removed, failed };
}
