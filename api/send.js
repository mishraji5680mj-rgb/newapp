import crypto from "node:crypto";
import { broadcast } from "./_lib/webpush.js";

function sameKey(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest();
  const y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).send("POST only");
  let d = req.body;
  if (typeof d === "string") { try { d = JSON.parse(d); } catch { return res.status(400).send("bad json"); } }
  if (!d || typeof d !== "object") return res.status(400).send("bad json");
  if (!process.env.ADMIN_KEY || !sameKey(d.key || "", process.env.ADMIN_KEY)) return res.status(401).send("wrong key");
  if (!d.title) return res.status(400).send("title required");
  const tabs = ["panchang", "fest", "jyotish", "pooja", "chalisa", "dharm"];
  try {
    const r = await broadcast({
      title: String(d.title).slice(0, 100),
      body: String(d.body || "").slice(0, 300),
      tab: tabs.includes(d.tab) ? d.tab : "panchang",
    });
    return res.status(200).json(r);
  } catch (e) {
    console.error("send failed:", e && e.message);
    return res.status(500).send("send failed: " + (e && e.message));
  }
}
