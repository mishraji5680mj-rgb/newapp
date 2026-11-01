import crypto from "node:crypto";
import { saveSub } from "./_lib/webpush.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).send("POST only");
  let sub = req.body;
  if (typeof sub === "string") { try { sub = JSON.parse(sub); } catch { return res.status(400).send("bad json"); } }
  if (!sub || typeof sub.endpoint !== "string" || !sub.endpoint.startsWith("https://") || !sub.keys || !sub.keys.p256dh || !sub.keys.auth)
    return res.status(400).send("bad subscription");
  try {
    const id = crypto.createHash("sha256").update(sub.endpoint).digest("hex");
    await saveSub(id, { endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("subscribe failed:", e && e.message);
    return res.status(503).send("storage not ready");
  }
}
