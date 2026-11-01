# Pooja Paath Sahayak — Vercel + Gemini

## Deploy (5 minute)
1. Is folder ko GitHub repo me daalein (ya `vercel` CLI se deploy karein).
2. Vercel -> Add New Project -> repo chunein. **Framework Preset: Other**, Build Command / Output Directory **khali** chhodein.
3. Settings -> Environment Variables me **GEMINI_API_KEY** daalein (key: https://aistudio.google.com/apikey). Save ke baad **Redeploy** karein.
4. Ho gaya — app kholkar "🙏 Ask / पूछें" button se chatbot test karein.

## Chatbot kaise kaam karta hai
- `chat-widget.js` -> `/api/chat` (serverless) -> Gemini. API key sirf Vercel server par rehti hai, browser me nahi.
- Aaj ki tithi/nakshatra/aane wale tyohar app se Gemini ko context me bheje jate hain.
- Agar Gemini fail ho (key na ho, quota khatam, net na ho) to app ke apne offline jawab dikhte hain — chat kabhi toot'ta nahi.

## Notifications (optional)
Pehle Netlify Blobs use hota tha; ab Upstash Redis. Vercel -> Storage -> Upstash Redis banakar project se connect karein, phir `.env.example` ke baaki variables daalein. Daily 07:00 IST notification `vercel.json` ke cron se chalti hai (CRON_SECRET zaroori). Admin page: `/admin.html`.
Purani subscriptions Netlify me thi — naye domain par users ko ek baar "Turn on notifications" dobara dabana hoga.

## Note
Pooja booking ka WhatsApp flow waise hi chalta hai. Netlify Forms (booking ki list) Vercel par nahi hoti, isliye wo "added to the list" line ab nahi dikhegi.
