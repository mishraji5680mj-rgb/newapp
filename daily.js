import { broadcast } from "./_lib/webpush.js";

// Weekday -> [वार, देवता, मंत्र, अर्पण]. Same devta-of-the-day mapping the app shows on its home screen.
const DAYS = [
  ["रविवार", "सूर्य देव", "ॐ घृणि सूर्याय नमः", "जल (अर्घ्य), लाल फूल, गुड़"],
  ["सोमवार", "भगवान शिव", "ॐ नमः शिवाय", "जल, कच्चा दूध, बेलपत्र"],
  ["मंगलवार", "हनुमान जी", "ॐ हं हनुमते नमः", "तेल में सिंदूर, लाल फूल, चना"],
  ["बुधवार", "श्री गणेश", "ॐ गं गणपतये नमः", "दूर्वा, लाल फूल, मोदक"],
  ["गुरुवार", "लक्ष्मी नारायण", "ॐ नमो भगवते वासुदेवाय", "तुलसी दल, पीले फूल, केला"],
  ["शुक्रवार", "माँ लक्ष्मी", "ॐ श्रीं महालक्ष्म्यै नमः", "कमल, खीर, घी का दीपक"],
  ["शनिवार", "हनुमान जी", "ॐ हं हनुमते नमः", "तेल में सिंदूर, लाल फूल, चना"],
];

// Vercel Cron calls this every day at 07:00 India time (01:30 UTC) — see vercel.json.
// Vercel sends "Authorization: Bearer <CRON_SECRET>" automatically when CRON_SECRET is set.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return res.status(401).send("unauthorized");
  try {
    const d = DAYS[new Date(Date.now() + 19800000).getUTCDay()]; // India date
    const r = await broadcast({
      title: `🙏 आज ${d[0]} है, ${d[1]} की आरती`,
      body: `${d[2]} · अर्पित करें: ${d[3]}। आरती करें और आज का जप-क्रम बनाए रखें 🔥`,
      tab: "panchang",
    });
    return res.status(200).json(r);
  } catch (e) {
    console.error("daily failed:", e && e.message);
    return res.status(500).send("daily failed");
  }
}
