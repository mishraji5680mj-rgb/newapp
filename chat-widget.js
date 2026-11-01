/* Satya Sahayak: AI chat helper for Pooja Paath. Gemini answers via /api/chat (key stays on the server);
   if the server/network fails it falls back to the built-in offline answers from the app’s own data. */
(function(){
if(window.__aiw)return;window.__aiw=1;
var D=document,Q=function(i){return D.getElementById(i)};
function t(s){var p=s.split("|");return p[window.lang==="hi"?1:0]||p[0]}
var TX={nm:"Satya Sahayak|सत्य सहायक",
sb:"Your helper for panchang and dharm|पंचांग और धर्म के लिए आपका सहायक",
bt:"Ask|पूछें",ph:"Ask about tithi, festival, rashi, aarti…|तिथि, त्योहार, राशि, आरती पूछें…",
hi:"🙏 Namaste! Ask me today’s date or tithi, upcoming festivals, the rashi of a name, or any aarti, mantra or chalisa.|🙏 नमस्ते! मुझसे आज की तारीख या तिथि, आने वाले त्योहार, किसी नाम की राशि, या कोई भी आरती, मंत्र, चालीसा पूछिए।",
er:"Sorry, something went wrong. Please try again.|क्षमा करें, कुछ गड़बड़ हो गई। फिर से कोशिश करें।",
sd:"Send|भेजें",cl:"Close|बंद करें"};
var CH=["Today’s tithi|आज की तिथि","Today’s date|आज की तारीख","Upcoming festivals|आने वाले त्योहार","Ganesh aarti|गणेश आरती","Rashi of Rahul|राहुल की राशि"];
var css='#aib{position:fixed;right:12px;bottom:calc(122px + env(safe-area-inset-bottom,0px));z-index:12;height:46px;padding:0 15px;border-radius:99px;border:2px solid var(--gold,#F2A31B);background:var(--maroon,#6B1A1A);color:var(--a2);font:600 .9rem/1 "Mukta",system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.35)}body.bjon #aib{display:none!important}'
+'#aic{position:fixed;inset:0;z-index:9990;display:flex;flex-direction:column;background:var(--bg,#FBF5EA);color:var(--ink,#2A1A14);font:16px/1.55 "Mukta",system-ui,sans-serif}#aic[hidden]{display:none}'
+'.aih{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:calc(10px + env(safe-area-inset-top,0px)) 14px 10px;background:var(--maroon,#6B1A1A);border-bottom:3px solid var(--gold,#F2A31B);color:color-mix(in oklab,var(--a2) 35%,#fff)}'
+'.aih b{display:block;font:400 1.25rem "Tiro Devanagari Hindi",Georgia,serif;color:var(--gold,#F2A31B)}.aih small{display:block;opacity:.85;font-size:.78rem;line-height:1.3}'
+'#aix{flex:none;width:44px;height:44px;border-radius:8px;border:2px solid var(--gold,#F2A31B);background:none;color:var(--gold,#F2A31B);font-size:1.1rem;cursor:pointer}'
+'.aim{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:14px;display:flex;flex-direction:column;gap:10px}'
+'.aiu,.aia{max-width:86%;padding:10px 14px;border-radius:16px;overflow-wrap:anywhere}.aiu{align-self:flex-end;background:var(--gold,#F2A31B);color:var(--on-a);border-bottom-right-radius:4px}'
+'.aia{align-self:flex-start;background:var(--surface,#fff);border:1px solid var(--line,#E8D9BF);border-bottom-left-radius:4px}.aiw{animation:aibl 1s infinite}@keyframes aibl{50%{opacity:.35}}'
+'.aiq{display:flex;gap:8px;overflow-x:auto;padding:0 14px 8px;scrollbar-width:none}.aiq::-webkit-scrollbar{display:none}.aiq button{flex:none;font:inherit;font-size:.9rem;font-weight:600;padding:7px 14px;border-radius:99px;border:1.5px solid var(--gold,#F2A31B);background:transparent;color:var(--saffron,#D9650F);cursor:pointer;white-space:nowrap}'
+'.aif{display:flex;gap:8px;align-items:flex-end;padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px));background:var(--surface,#fff);border-top:1px solid var(--line,#E8D9BF)}'
+'.aif textarea{flex:1;min-width:0;max-height:120px;resize:none;font:inherit;font-size:16px;padding:10px 12px;border-radius:12px;border:1px solid var(--line,#E8D9BF);background:var(--bg,#FBF5EA);color:inherit}'
+'.aiact{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.aiact button{font:inherit;font-size:.9rem;font-weight:600;padding:8px 14px;border-radius:99px;border:0;background:var(--gold,#F2A31B);color:var(--on-a);cursor:pointer}'
+'#aig{flex:none;width:46px;height:46px;border-radius:50%;border:0;background:var(--gold,#F2A31B);color:var(--on-a);font-size:1.2rem;cursor:pointer}#aig:disabled{opacity:.5}';
var st=D.createElement("style");st.textContent=css;D.head.appendChild(st);
var w=D.createElement("div");
w.innerHTML='<button type="button" id="aib"></button><div id="aic" hidden role="dialog" aria-modal="true" aria-labelledby="ain"><div class="aih"><div><b id="ain"></b><small id="aisb"></small></div><button type="button" id="aix">✕</button></div><div class="aim" id="aim" aria-live="polite"></div><div class="aiq" id="aiq"></div><div class="aif"><textarea id="aii" rows="1" maxlength="800"></textarea><button type="button" id="aig">➤</button></div></div>';
while(w.firstChild)D.body.appendChild(w.firstChild);
var M=Q("aim"),I=Q("aii"),G=null,H=[];
function fmt(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^[ \t]*[*-][ \t]+/gm,"• ").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\n/g,"<br>")}
function add(c,h){var e=D.createElement("div");e.className="ai"+c;e.innerHTML=h;M.appendChild(e);M.scrollTop=M.scrollHeight;return e}
function ui(){Q("ain").textContent=t(TX.nm);Q("aisb").textContent=t(TX.sb);Q("aib").textContent="🙏 "+t(TX.bt);I.placeholder=t(TX.ph);
Q("aig").setAttribute("aria-label",t(TX.sd));Q("aix").setAttribute("aria-label",t(TX.cl));if(G)G.innerHTML=fmt(t(TX.hi));
var q=Q("aiq");q.innerHTML="";CH.forEach(function(c){var b=D.createElement("button");b.type="button";b.textContent=t(c);b.onclick=function(){send(t(c))};q.appendChild(b)})}
var DV=[[0,/ganesh|ganpati|ganapati|गणेश|गणपति|विनायक/],[1,/shiv|shankar|mahadev|bholenath|शिव|शंकर|महादेव|भोले/],[2,/vishnu|narayan|विष्णु|नारायण/],[3,/hanuman|bajrang|हनुमान|बजरंग/],[4,/lakshmi|laxmi|लक्ष्मी/],[5,/durga|ambe|दुर्गा|अम्बे|अंबे/],[6,/krishna|krishn|kanha|कृष्ण|कन्हैया/],[7,/surya|suraj|सूर्य|सूरज/]];
var DKW=/aarti|arti|आरती|mantra|मंत्र|chalisa|चालीसा|vidhi|विधि|jap|जप|lyrics|path|पाठ/;
var SW=/^(rashi|raashi|राशि|kya|क्या|hai|है|hain|kaun|कौन|sa|सा|si|सी|meri|mera|मेरी|मेरा|naam|नाम|name|ka|का|ki|की|ke|के|of|my|is|what|whats|find|batao|बताओ|bataiye|बताइए|batana|बताना|the|for|ko|को|se|से|kis|किस|hogi|होगी|hoga|होगा|mujhe|मुझे|please|plz|ek|एक|main|मैं|hu|hun|हूँ|हूं)$/i;
var GEN=/^(maha|महा|puja|pooja|jayanti|purnima|amavasya|पूजा|जयंती|पूर्णिमा|अमावस्या)$/i;
function pg(iso){var o=SEL;SEL=iso;try{return panchang()}finally{SEL=o}}
function vr(p,iso){var tn=p.tn.split("|")[0],o=[];if(tn==="Ekadashi")o.push("Ekadashi|एकादशी");if(tn==="Trayodashi")o.push("Pradosh|प्रदोष");if(tn==="Chaturthi"&&!p.shukla)o.push("Sankashti Chaturthi|संकष्टी चतुर्थी");if(tn==="Purnima")o.push("Purnima|पूर्णिमा");
var wk={1:"Somvar (Shiv ji)|सोमवार (शिव जी)",2:"Mangalvar (Hanuman ji)|मंगलवार (हनुमान जी)",4:"Guruvar (Vishnu ji)|गुरुवार (विष्णु जी)",6:"Shanivar|शनिवार"}[p.wd];if(wk)o.push(wk);
FEST.forEach(function(f){if(f[0]===iso&&/Shivratri|Navratri/i.test(f[1]))o.push(f[1])});return o.map(function(z){return L(z)})}
function fd(iso){var p=iso.split("-"),d=new Date(Date.UTC(+p[0],+p[1]-1,+p[2]));return L(WD[d.getUTCDay()])+", "+(+p[2])+" "+L(MOF[+p[1]-1])+" "+p[0]}
function rel(iso){var n=days(iso);return n===0?L(T.tod):n===1?L(T.tmr):L("In |")+n+" "+L("days|दिन")+(lang==="hi"?" बाद":"")}
function nav(fn){return function(){close();try{fn()}catch(e){}}}
function clk(sel){var e=D.querySelector(sel);if(e)e.click()}
function A(l,fn){return{l:l,f:nav(fn)}}
function Sd(l,q){return{l:l,f:function(){send(q)}}}
function devOf(q){for(var i=0;i<DV.length;i++)if(DV[i][1].test(q))return DV[i][0];return -1}
function devCard(k,q){var d=DEV[k],ar=(AARTI[k]||"").split("\n").filter(function(x){return x.trim()}).slice(0,4).join("\n");
var tx="**"+L(DT[k][0])+"**\n"+L(T.day_)+": "+L(d[2])+"\n"+L(T.mnt)+": "+d[3]+"\n"+L(T.off)+": "+L(d[4])+(ar?"\n\n"+L(T.ar)+":\n"+ar+"\n…":"");
var a=[A("🪔 Open aarti|🪔 आरती खोलें",function(){show("pooja");openDev(k)}),A("📖 Read full aarti|📖 पूरी आरती पढ़ें",function(){show("pooja");openDev(k);rdOpen(k)})];
if(CH[k])a.push(A("📿 Chalisa|📿 चालीसा",function(){show("chalisa");openCh(k)}));
a.push(A("🕉️ Jap counter|🕉️ जप काउंटर",function(){openJap(k)}));return{t:tx,a:a}}
function ans(q,x){
 var iso=todayIso(),k,m;
 if(/thank|dhanyawad|dhanyavad|shukriya|धन्यवाद|शुक्रिया/.test(q))return{t:L("You are welcome 🙏 Jai Shri Ram!|आपका स्वागत है 🙏 जय श्री राम!")};
 if(/who are you|tum kaun|aap kaun|कौन हो|कौन हैं/.test(q))return{t:L("I am Satya Sahayak, the helper of this app. I answer from the app’s own panchang, festival, rashi and aarti data.|मैं सत्य सहायक हूँ, इस ऐप का सहायक। मैं ऐप के अपने पंचांग, त्योहार, राशि और आरती के डेटा से जवाब देता हूँ।")};
 if(/^(hare|har har|jai|jay|radhe|ram ram|sita ram|om |ॐ|हरे|हर हर|जय|राधे|राम राम|सीता राम)/.test(q)&&!DKW.test(q)&&!/kab|कब|date|तारीख|rashi|राशि|tithi|तिथि|vrat|व्रत|festival|त्योहार|meaning|matlab|arth|अर्थ|मतलब/.test(q)&&q.split(/\s+/).length<=5){var gd=devOf(q);
  return{t:x.trim().replace(/\b[a-z]/g,function(c){return c.toUpperCase()})+" 🙏\n"+L("What would you like to know?|आप क्या जानना चाहेंगे?"),a:(gd>-1?[Sd("🪔 Aarti and mantra|🪔 आरती और मंत्र",DT[gd][0].split("|")[0].replace("Bhagwan Shri ","")+" aarti")]:[]).concat(CH.slice(0,3).map(function(c){return Sd(c,t(c))}))}}
 if(/tithi|तिथि|panchang|पंचांग|nakshatra|नक्षत्र|paksha|पक्ष/.test(q)){var p=pg(iso),v=vr(p,iso);
  return{t:"**"+L("Today’s Panchang|आज का पंचांग")+"**\n"+fd(iso)+"\n"+L(T.tithi)+": "+L(p.tn)+"\n"+L(T.paksha)+": "+L(p.shukla?T.sh_:T.kr_)+"\n"+L(T.nak)+": "+L(p.nk)+"\n"+L("Month|माह")+": "+mName(p)+(v.length?"\n"+L("Vrat today|आज का व्रत")+": "+v.join(", "):"")+"\n\n"+L("Calculated for sunrise; confirm vrat and muhurat with Pandit ji.|सूर्योदय के हिसाब से गणना; व्रत और मुहूर्त पंडित जी से पूछ लें।"),a:[A("🌙 Open Panchang|🌙 पंचांग खोलें",function(){show("panchang")})]}}
 var dk=devOf(q),hasK=DKW.test(q);
 if(!hasK||/kab|कब|date|tarikh|तारीख/.test(q)){var hit=null;FEST.forEach(function(f){if(hit)return;var w=(f[1].replace(/\([^)]*\)/g,"").split(/[|\s]+/)).filter(function(z){return z.length>=(/[ऀ-ॿ]/.test(z)?3:4)&&!GEN.test(z)});
   if(w.some(function(z){return q.indexOf(z.toLowerCase())>-1}))hit=f});
  if(hit)return{t:"**"+L(hit[1])+"**\n"+fd(hit[0])+"\n"+rel(hit[0]),a:[A("🪔 Open festivals|🪔 त्योहार खोलें",function(){show("fest")})]}}
 if(/festival|tyohar|tyauhar|त्योहार|त्यौहार|utsav|उत्सव/.test(q)){var up=FEST.filter(function(f){return days(f[0])>=0}).slice(0,5);
  return{t:"**"+L("Upcoming festivals|आने वाले त्योहार")+"**\n"+up.map(function(f){return"• "+L(f[1])+" – "+fd(f[0]).replace(/^[^,]*, /,"")}).join("\n"),a:[A("🪔 Open festivals|🪔 त्योहार खोलें",function(){show("fest")})]}}
 if(/\bdate\b|tarikh|tareekh|taarikh|तारीख|तारिख|(what|which|kaun\s*sa|कौन\s*सा).*(day|din|दिन)/.test(q))return{t:L("Today is |आज ")+fd(iso)+L("|  है।")};
 if(/rashi|raashi|राशि/.test(q)){var nm=(x.split(/[\s,?.!।]+/).filter(function(z){return z&&!SW.test(z)})[0])||"";
  if(!nm)return{t:L("Tell me a name, for example: Rashi of Rahul.|कोई नाम बताइए, जैसे: राहुल की राशि।"),a:[Sd("Rashi of Rahul|राहुल की राशि","Rashi of Rahul")]};
  var h=rashiOf(nm);if(!h.length)return{t:L(T.nf),a:[A("♈ Open Rashi page|♈ राशि पेज खोलें",function(){show("jyotish");clk('[data-jy="0"]')})]};
  return{t:"**"+nm+"**\n"+L(T.is)+rname(h[0])+(h.length>1?"\n"+L(T.alt)+h.slice(1).map(rname).join(", "):"")+"\n"+L(T.lt)+": "+L(RASHI[h[0]][4]+"|"+RASHI[h[0]][3])+"\n\n"+L("The rashi by name uses the first letter; the real rashi comes from the birth chart.|नाम से राशि पहले अक्षर पर आधारित है; असली राशि जन्म कुंडली से तय होती है।"),
   a:[A("♈ Open Rashi page|♈ राशि पेज खोलें",function(){show("jyotish");clk('[data-jy="0"]');$("nm").value=nm;find(true)})]}}
 if(dk>-1)return devCard(dk,q);
 if(/aarti|arti|आरती|chalisa|चालीसा|mantra|मंत्र/.test(q))return{t:L("Which Devta? Choose one:|किस देवता की? चुनिए:"),a:DV.map(function(e){var n=DT[e[0]][0];return Sd(n,n.split("|")[0].replace("Bhagwan Shri ","")+" aarti")})};
 if(/vrat|व्रत|ekadashi|एकादशी|upvas|उपवास|pradosh|प्रदोष/.test(q)){var pp=pg(iso),vv=vr(pp,iso);
  return{t:vv.length?L("Vrat today: |आज का व्रत: ")+vv.join(", "):L("No main vrat found for today. See all vrat with vidhi in the Dharm tab.|आज कोई मुख्य व्रत नहीं मिला। सभी व्रत और विधि धर्म टैब में देखें।"),a:[A("🪔 Vrat vidhi|🪔 व्रत विधि",function(){show("dharm");clk('[data-dh="0"]')})]}}
 if(/puja|pooja|पूजा|पूजन/.test(q)&&/vidhi|विधि|kaise|कैसे|how|steps/.test(q))return{t:"**"+L(T.sh)+"**\n"+STEPS.map(function(s,i){return(i+1)+". "+L(s)}).join("\n"),a:[A("🔔 Open aarti|🔔 आरती खोलें",function(){show("pooja")})]};
 if(/samagri|सामग्री/.test(q))return{t:L("Puja samagri lists are in the Dharm tab.|पूजा सामग्री की सूची धर्म टैब में है।"),a:[A("🧺 Samagri|🧺 सामग्री",function(){show("dharm");clk('[data-dh="1"]')})]};
 if(/jyotirlinga|ज्योतिर्लिंग|dham|धाम|shaktipeeth|शक्तिपीठ|mandir|मन्दिर|teerth|तीर्थ|somnath|kedarnath|badrinath|kashi|ayodhya/.test(q))return{t:L("Temples and teerth are in the Dharm tab.|मन्दिर और तीर्थ धर्म टैब में हैं।"),a:[A("🛕 Mandir & Teerth|🛕 मन्दिर व तीर्थ",function(){show("dharm");clk('[data-dh="2"]')})]};
 if(/kundli|कुंडली|janam|janm|जन्म/.test(q))return{t:L("You can make your Janm Kundli in the Jyotish tab.|जन्म कुंडली ज्योतिष टैब में बना सकते हैं।"),a:[A("🪐 Janm Kundli|🪐 जन्म कुंडली",function(){show("jyotish");clk('[data-jy="1"]')})]};
 if(/bhajan|भजन|video|reel|वीडियो/.test(q))return{t:L("Bhajan videos are in the Bhajan tab.|भजन वीडियो भजन टैब में हैं।"),a:[A("🎶 Open Bhajan|🎶 भजन खोलें",function(){show("bhajan")})]};
 if(/^(hi|hello|hey|namaste|namaskar|ram ram|jai|नमस्ते|नमस्कार|राम राम|जय)/.test(q))return{t:L(TX.hi),a:CH.map(function(c){return Sd(c,t(c))})};
 return{df:1,t:L("I could not find this in the app. You can ask me:|यह मुझे ऐप में नहीं मिला। आप ये पूछ सकते हैं:"),a:CH.map(function(c){return Sd(c,t(c))})}}
function put(el,r,ac){el.className="aia";el.innerHTML=fmt(r.t);
 if(ac!==false&&r.a&&r.a.length){var w=D.createElement("div");w.className="aiact";r.a.forEach(function(o){var bt=D.createElement("button");bt.type="button";bt.textContent=t(o.l);bt.onclick=o.f;w.appendChild(bt)});el.appendChild(w)}
 M.scrollTop=M.scrollHeight}
function local(x){var old=window.lang;if(/[ऀ-ॿ]/.test(x))window.lang="hi";try{return ans(x.toLowerCase(),x)}finally{window.lang=old}}
function ctx(){var old=window.lang;window.lang="en";try{var iso=todayIso(),p=pg(iso),up=FEST.filter(function(f){return days(f[0])>=0}).slice(0,6);
 return "Today (IST): "+fd(iso)+". Tithi: "+L(p.tn)+", "+L(p.shukla?T.sh_:T.kr_)+". Nakshatra: "+L(p.nk)+". Month: "+mName(p)+". Upcoming festivals: "+up.map(function(f){return L(f[1])+" ("+f[0]+")"}).join("; ")+"."}
 catch(e){return""}finally{window.lang=old}}
var BUSY=false;
async function gemini(x){var c=new AbortController(),tm=setTimeout(function(){c.abort()},28000);
 try{var r=await fetch("/api/chat",{method:"POST",headers:{"content-type":"application/json"},signal:c.signal,
  body:JSON.stringify({message:x,history:H.slice(-8),lang:/[ऀ-ॿ]/.test(x)?"hi":(window.lang==="hi"?"hi":"en"),context:ctx()})});
  if(!r.ok)throw new Error("http "+r.status);var j=await r.json();if(!j||!j.reply)throw new Error("empty");return String(j.reply)}
 finally{clearTimeout(tm)}}
async function send(x){x=(x||"").trim();if(!x||BUSY)return;BUSY=true;Q("aig").disabled=true;Q("aiq").style.display="none";I.value="";I.style.height="auto";add("u",fmt(x));
 var lr;try{lr=local(x)}catch(e){lr=null}
 var el=add("a aiw",fmt("…"));
 try{var g=await gemini(x);H.push({role:"user",text:x},{role:"model",text:g});if(H.length>16)H.splice(0,H.length-16);
  el.classList.remove("aiw");put(el,{t:g,a:lr&&!lr.df?lr.a:null})}
 catch(e){el.classList.remove("aiw");
  if(lr)put(el,lr);else put(el,{t:t(TX.er)})}
 finally{BUSY=false;Q("aig").disabled=false;M.scrollTop=M.scrollHeight}}
function open(){ui();if(!G)G=add("a",fmt(t(TX.hi)));Q("aic").hidden=false;if(window.LYAPI)LYAPI.push("ai");setTimeout(function(){I.focus()},50)}
function close(){var was=!Q("aic").hidden;Q("aic").hidden=true;if(was&&window.LYAPI)LYAPI.drop("ai")}
if(window.LYAPI)LYAPI.close.ai=function(){Q("aic").hidden=true};
Q("aib").onclick=open;Q("aix").onclick=close;Q("aig").onclick=function(){send(I.value)};
I.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(I.value)}});
I.addEventListener("input",function(){I.style.height="auto";I.style.height=Math.min(I.scrollHeight,120)+"px"});
D.addEventListener("keydown",function(e){if(e.key==="Escape"&&!Q("aic").hidden)close()});
D.querySelectorAll(".lang button").forEach(function(b){b.addEventListener("click",function(){setTimeout(ui,0)})});
window.AI_CHAT_OPEN=open;ui();
})();
