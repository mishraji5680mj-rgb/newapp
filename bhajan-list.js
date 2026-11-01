/* ===== BHAJAN VIDEOS =====
   Bhajan tab ke upar wale "Bhajan" button me SAARI videos isi order me chalti hain.
   Har devta ke page me sirf uski apni videos dikhti hain (dev number se).

   Nayi video jodne ke liye:
   1. Video "vid" folder me daalein (jaise vid/7.mp4) aur chahein to photo vid/7.jpg
   2. Neeche ek line jodein. title = "English|हिन्दी"
   3. dev = devta ka number:
        0 Ganesh   1 Shiv   2 Vishnu/Ram   3 Hanuman
        4 Lakshmi  5 Durga  6 Krishna      7 Surya/Chhath
      (dev nahi likhenge to video sirf upar wale "Bhajan" button me dikhegi)
   Line ke end me comma (,) zaroor lagayein. */
window.BHAJAN=[
  {src:"vid/1.mp4", title:"Ganesh Vandana|गणेश वंदना", poster:"vid/1.jpg", dev:0},
  {src:"vid/2.mp4", title:"Shiv Bhajan|शिव भजन", poster:"vid/2.jpg", dev:1},
  {src:"vid/3.mp4", title:"Ram Aayenge|राम आएंगे", poster:"vid/3.jpg", dev:2, aud:"aud/b1.mp3", by:"Swati Mishra"},
  {src:"vid/4.mp4", title:"Jai Shri Ram – Ayodhya|जय श्री राम – अयोध्या", poster:"vid/4.jpg", dev:2},
  {src:"vid/5.mp4", title:"Hari Stotram|हरि स्तोत्रम्", poster:"vid/5.jpg", dev:2},
  {src:"vid/6.mp4", title:"Chhathi Maiya|छठी मैया", poster:"vid/6.jpg", dev:7, aud:"aud/b2.mp3", by:"Vishal Mishra"},
];

/* ===== BHAJAN AUDIO (sirf sunne wale bhajan, video ke bina) =====
   Bhajan ke player me upar wali videos ke saath ye bhi dikhte hain.
   mp3 "aud" folder me daalein. dev = devta number (upar likha hai). by = gayak ka naam (optional). */
window.BHAJAN_AUDIO=[
  {src:"aud/b3.mp3", title:"Maa Main Khada Dwar Tere|माँ मैं खड़ा द्वार तेरे", dev:5, by:"Lakhbir Singh Lakkha"},
  {src:"aud/b4.mp3", title:"Khatu Shyam – Teen Baan Ke Dhaari|खाटू श्याम – तीन बाण के धारी", dev:6},
  {src:"aud/b5.mp3", title:"New Bhajan|नया भजन"},
  {src:"aud/hanuman-chalisa.mp3", title:"Hanuman Chalisa|हनुमान चालीसा", dev:3, by:"Gayak ka naam"},
];
window.CHALISA_AUDIO={3:"aud/hanuman-chalisa.mp3"};
