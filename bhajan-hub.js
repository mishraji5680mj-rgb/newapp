/* Bhajan hub: category buttons, Top 10, and a swipe pager with one page per devta.
   Edit TOP10 below to change the Top 10 list. a = aarti, c = chalisa, m = mantra; number = devta
   (0 Ganesh, 1 Shiv, 2 Vishnu, 3 Hanuman, 4 Lakshmi, 5 Durga, 6 Krishna, 7 Surya). */
(function(){
var D=document,sec=D.getElementById("bhajan"),host=D.getElementById("bjf");
if(!sec||!host||!window.DEV||!window.DT||!window.IMG)return;
/* TOP10 = [type, devta number, audio file (optional), title (only for type "b")]
   Top 10 me tap karne par SIRF AUDIO chalta hai (koi page/video nahi khulta).
   "a" aarti -> by default aud/<devta>.mp3.  "c" chalisa -> aud/c<devta>.mp3 (file daalni hogi).
   "b" bhajan audio -> apni mp3 aur title likhein, jaise ["b",3,"aud/b1.mp3","Hanuman Bhajan|हनुमान भजन"] */
var TOP10=[["c",3],["a",3],["a",0],["a",2],["a",1],["c",1],["a",5],["a",4],["a",6],["a",7]];
var CAT=[["a","🪔","Aarti|आरती"],["b","🎶","Bhajan|भजन"],["c","📿","Chalisa|चालीसा"],["s","🙏","Stuti|स्तुति"],["p","📖","Path|पाठ"],["m","🕉️","Mantra|मंत्र"]];
var LB={a:"Aarti|आरती",c:"Chalisa|चालीसा",m:"Mantra|मंत्र"},SOON="Coming soon 🙏|जल्द आ रहे हैं 🙏";
function nm(k){return L(DT[k][0]).replace(/^(Bhagwan Shri |भगवान श्री |Shri |श्री )/,"")}
function has(t,k){return t==="c"?!!(window.CH&&CH[k]):true}
var css="#bhajan.view.on.hubm{background:var(--bg)}#bhajan.hubm #bjf{display:none}#bhajan:not(.hubm) #bjh{display:none}"
+"#bjh{height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch;color:var(--ink);padding:14px 0 28px;font-family:'Hind',system-ui,sans-serif}"
+"#bjh h2{font:400 1.45rem 'Tiro Devanagari Hindi',Georgia,serif;color:var(--maroon);margin:0 16px 10px}:root[data-theme=dark] #bjh h2{color:var(--gold)}@media (prefers-color-scheme:dark){:root:not([data-theme=light]) #bjh h2{color:var(--gold)}}"
+"#bjh h4{margin:18px 16px 8px;font-size:1.05rem;color:var(--saffron)}"
+".hb-cats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 16px}.hb-cats button{display:grid;gap:2px;justify-items:center;padding:12px 4px;border-radius:14px;border:2px solid var(--gold);background:var(--surface);color:var(--ink);font:inherit;font-weight:600;font-size:.95rem;cursor:pointer}.hb-cats button b{font-size:1.6rem;font-weight:400}"
+".hb-t10{display:flex;gap:12px;overflow-x:auto;padding:4px 16px 8px;scroll-snap-type:x proximity;scrollbar-width:none}.hb-t10::-webkit-scrollbar{display:none}"
+".hb-tc{flex:none;width:128px;scroll-snap-align:start;position:relative;display:grid;gap:4px;justify-items:center;padding:12px 8px;border-radius:16px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font:inherit;cursor:pointer}.hb-tc img{width:84px;height:84px;border-radius:50%;object-fit:cover;border:3px solid var(--gold)}.hb-tc b{font-size:.95rem;line-height:1.2}.hb-tc small{color:var(--muted)}"
+".hb-tc i{position:absolute;left:8px;top:8px;min-width:24px;height:24px;border-radius:12px;background:var(--maroon);color:var(--a2);font:700 .8rem/24px sans-serif;text-align:center;font-style:normal}"
+".hb-tabs{display:flex;gap:8px;overflow-x:auto;padding:2px 16px 8px;scrollbar-width:none}.hb-tabs::-webkit-scrollbar{display:none}.hb-tabs button{flex:none;padding:7px 16px;border-radius:99px;border:1.5px solid var(--gold);background:transparent;color:var(--ink);font:inherit;font-weight:600;cursor:pointer}.hb-tabs button.on{background:var(--gold);color:var(--on-a)}"
+".hb-sw{margin:0 16px 8px;color:var(--muted);font-size:.85rem}"
+".hb-pg{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior-x:contain}.hb-pg::-webkit-scrollbar{display:none}.hb-pp{flex:none;width:100%;scroll-snap-align:center;padding:0 16px;box-sizing:border-box}"
+".hb-hd{display:flex;align-items:center;gap:14px}.hb-hd img{width:84px;height:84px;border-radius:50%;object-fit:cover;border:3px solid var(--gold)}.hb-hd h3{margin:0;font:400 1.4rem 'Tiro Devanagari Hindi',Georgia,serif}.hb-hd small{color:var(--muted)}"
+".hb-mt{margin:12px 0;font:1.2rem/1.4 'Tiro Devanagari Hindi',serif;color:var(--saffron);text-align:center}"
+".hb-bk{margin:0 0 10px;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:var(--surface)}.hb-bt{font-weight:600;margin-bottom:4px}.hb-bb{color:var(--muted);font-size:.92rem}.hb-bs{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}"
+".hb-bs button,.hb-bk .hb-o{padding:8px 14px;border-radius:99px;border:0;background:var(--gold);color:var(--on-a);font:inherit;font-weight:600;font-size:.9rem;cursor:pointer}.hb-bs button.m{background:var(--maroon);color:var(--a2)}"
+"#hb-back{display:none;position:absolute;z-index:8;left:10px;top:calc(10px + env(safe-area-inset-top,0px));padding:8px 14px;border-radius:99px;border:1px solid var(--gold);background:rgba(0,0,0,.55);color:var(--a2);font:inherit;font-weight:600;cursor:pointer}#bhajan.view.on:not(.hubm) #hb-back{display:block}"
+"#hb-sh{position:fixed;inset:0;z-index:40;background:var(--bg);color:var(--ink);display:none;flex-direction:column;font-family:'Hind',system-ui,sans-serif}#hb-sh.on{display:flex}"
+"#hb-sh .hh{display:flex;justify-content:space-between;align-items:center;padding:calc(10px + env(safe-area-inset-top,0px)) 16px 10px;background:var(--maroon);color:var(--gold);border-bottom:3px solid var(--gold)}#hb-sh .hh b{font:400 1.25rem 'Tiro Devanagari Hindi',Georgia,serif}#hb-sh .hh button{width:40px;height:40px;border-radius:8px;border:2px solid var(--gold);background:none;color:var(--gold);font-size:1.1rem;cursor:pointer}"
+"#hb-sh .hl{flex:1;overflow-y:auto;padding:12px 16px 24px}.hb-r{display:flex;align-items:center;gap:12px;width:100%;margin:0 0 10px;padding:10px;border-radius:14px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font:inherit;text-align:left;cursor:pointer}.hb-r img{width:54px;height:54px;border-radius:50%;object-fit:cover;border:2px solid var(--gold);flex:none}.hb-r b{display:block}.hb-r small{color:var(--muted)}.hb-soon{text-align:center;color:var(--muted);padding:40px 10px}";
css+=".hb-vs{display:flex;gap:10px;overflow-x:auto;padding:4px 0 2px;scrollbar-width:none}.hb-vs::-webkit-scrollbar{display:none}"
+".hb-vc{flex:none;width:104px;display:grid;gap:6px;justify-items:stretch;padding:0;border:0;background:none;color:var(--ink);font:inherit;text-align:left;cursor:pointer}.hb-vc b{font-size:.82rem;line-height:1.25;font-weight:600;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}"
+".hb-vi{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:9/14;border-radius:12px;border:2px solid var(--gold);background:var(--deep) center/cover no-repeat;font-size:2rem;overflow:hidden}.hb-vi em{position:absolute;right:6px;bottom:6px;width:26px;height:26px;border-radius:50%;background:rgba(0,0,0,.6);color:var(--a2);font:normal .8rem/26px sans-serif;text-align:center}"
+"body.hbpl #bjh{padding-bottom:104px}"
+".hb-tc.pl{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold)}"
+"#hb-pl{display:none;position:fixed;left:8px;right:8px;bottom:calc(var(--navh,66px) + 8px);z-index:12;align-items:center;gap:8px;padding:8px 10px;border-radius:16px;background:var(--maroon2);border:2px solid var(--gold);color:var(--a2);box-shadow:0 4px 14px rgba(0,0,0,.45);font-family:'Hind',system-ui,sans-serif}"
+"#hb-pl.on{display:flex}body:not(.bjon) #hb-pl{display:none}#hb-pl img{width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid var(--gold);flex:none}"
+"#hb-pl .pt{flex:1;min-width:0}#hb-pl b{display:block;font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#hb-pl small{display:block;font-size:.76rem;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+"#hb-pl i{display:block;height:3px;margin-top:4px;border-radius:2px;background:rgba(255,255,255,.2);overflow:hidden}#hb-pl u{display:block;height:100%;width:0;background:var(--gold);text-decoration:none}"
+"#hb-pl button{flex:none;width:38px;height:38px;border-radius:50%;border:1.5px solid var(--gold);background:none;color:var(--gold);font-size:1rem;cursor:pointer;padding:0}#hb-pl button[data-p=tog]{background:var(--gold);color:var(--on-a)}";
var st=D.createElement("style");st.textContent=css;D.head.appendChild(st);
var hub=D.createElement("div");hub.id="bjh";sec.insertBefore(hub,host);
var bk=D.createElement("button");bk.id="hb-back";bk.type="button";bk.textContent="← "+L("Back|वापस");sec.appendChild(bk);
var sh=D.createElement("div");sh.id="hb-sh";sh.innerHTML='<div class="hh"><b></b><button type="button" id="hb-sx" aria-label="Close">✕</button></div><div class="hl"></div>';D.body.appendChild(sh);
sec.classList.add("hubm");
function btn(t,k,l,c){return'<button type="button" data-t="'+t+'" data-k="'+k+'"'+(c?' class="'+c+'"':"")+">"+L(l)+"</button>"}
function blk(ic,t,body,b){return'<div class="hb-bk"><div class="hb-bt">'+ic+" "+L(t)+'</div><div class="hb-bb">'+body+"</div>"+(b?'<div class="hb-bs">'+b+"</div>":"")+"</div>"}
function page(k){var d=DEV[k],ch=has("c",k);
 return'<div class="hb-pp"><div class="hb-hd"><img src="'+IMG[k]+'" alt=""><div><h3>'+L(DT[k][0])+"</h3><small>"+L(DT[k][1])+'</small></div></div><div class="hb-mt">'+d[3]+"</div>"
 +blk("🪔","Aarti|आरती","<b>"+L(d[5])+"</b>",btn("a",k,"Open|खोलें")+btn("d",k,"🪔 Aarti in mandir|🪔 मन्दिर में आरती","m"))
 +bjSec(k)
 +blk("📿","Chalisa|चालीसा",ch?L("Read the full chalisa.|पूरी चालीसा पढ़ें।"):L(SOON),ch?btn("c",k,"Open|खोलें"):"")
 +blk("🙏","Stuti|स्तुति",L(SOON))+blk("📖","Path|पाठ",L(SOON))
 +blk("🕉️","Mantra|मंत्र","<b>"+d[3]+"</b>",btn("m",k,"📿 Start jap|📿 जप शुरू करें")+btn("cp",k,"📋 Copy|📋 कॉपी","m"))+"</div>"}
function vids(k){return(window.BHAJAN||[]).filter(function(x){return x&&x.src&&x.dev===k})}
function bjSec(k){var v=vids(k),h='<div class="hb-bk"><div class="hb-bt">🎬 '+L("Bhajan videos|भजन वीडियो")+(v.length?" ("+v.length+")":"")+'</div>';
 if(!v.length)return h+'<div class="hb-bb">'+L(SOON)+"</div></div>";
 return h+'<div class="hb-vs">'+v.map(function(x,i){return'<button type="button" class="hb-vc" data-bv="'+i+'" data-k="'+k+'"><span class="hb-vi"'+(x.poster?' style="background-image:url('+x.poster+')"':"")+">"+(x.poster?"":"🎬")+'<em>▶</em></span><b>'+L(x.title||"")+"</b></button>"}).join("")+"</div></div>"}
var cur=0,tabs,pg;
var TL=[];
function render(){var top=TOP10.filter(function(x){return has(x[0],x[1])}).slice(0,10);TL=top.map(function(x){return{t:x[0],k:x[1],src:x[2]||(x[0]==="a"&&window.AUD?AUD[x[1]]:""),title:x[3]}});
 hub.innerHTML="<h2>"+L("Bhajan · Aarti · Chalisa|भजन · आरती · चालीसा")+'</h2><div class="hb-cats">'+CAT.map(function(c){return'<button type="button" data-cat="'+c[0]+'"><b>'+c[1]+"</b>"+L(c[2])+"</button>"}).join("")+"</div>"
 +"<h4>🔥 "+L("Top 10|टॉप 10")+'</h4><div class="hb-t10">'+top.map(function(x,i){return'<button type="button" class="hb-tc" data-ti="'+i+'" data-t="'+x[0]+'" data-k="'+x[1]+'"><i>'+(i+1)+'</i><img src="'+IMG[x[1]]+'" alt=""><b>'+nm(x[1])+"</b><small>"+(x[3]?L(x[3]):L(LB[x[0]]||"Bhajan|भजन"))+" 🎧</small></button>"}).join("")+"</div>"
 +"<h4>🛕 "+L("Devta-wise|देवता के अनुसार")+'</h4><div class="hb-tabs">'+DT.map(function(d,k){return'<button type="button" data-tab="'+k+'">'+nm(k)+"</button>"}).join("")+"</div>"
 +'<div class="hb-sw">'+L("← Swipe left for the next devta →|← अगले देवता के लिए बाएँ स्वाइप करें →")+'</div><div class="hb-pg">'+DT.map(function(d,k){return page(k)}).join("")+"</div>";
 tabs=hub.querySelector(".hb-tabs");pg=hub.querySelector(".hb-pg");hl(cur);pg.scrollLeft=cur*pg.clientWidth;
 pg.addEventListener("scroll",function(){var i=Math.round(pg.scrollLeft/(pg.clientWidth||1));if(i!==cur)hl(i)},{passive:true});bk.textContent="← "+L("Back|वापस")}
function hl(i){cur=i;[].forEach.call(tabs.children,function(b,k){b.classList.toggle("on",k===i)});var e=tabs.children[i];if(e)tabs.scrollLeft=e.offsetLeft-tabs.clientWidth/2+e.offsetWidth/2}
function closeSh(){var was=sh.classList.contains("on");sh.classList.remove("on");if(was&&window.LYAPI)LYAPI.drop("hbsh")}
if(window.LYAPI){LYAPI.close.hbsh=function(){sh.classList.remove("on")};LYAPI.close.reels=function(){sec.classList.add("hubm")}}
function reels(dev,start){closeSh();stopTop();if(window.BHAJAN_SET)BHAJAN_SET(dev,start||0);sec.classList.remove("hubm")}
function act(t,k){closeSh();k=+k;
 if(t==="a"){show("pooja");openDev(k)}else if(t==="c"){show("chalisa");openCh(k)}else if(t==="m")openJap(k)
 else if(t==="d"){if(window.AARTI_OPEN_FOR)AARTI_OPEN_FOR(k)}else if(t==="b")reels(null,0)
 else if(t==="cp"){try{navigator.clipboard.writeText(DEV[k][3])}catch(e){}}}
function sheet(c){var def=CAT.filter(function(x){return x[0]===c})[0],ks=DT.map(function(d,k){return k}).filter(function(k){return has(c,k)});
 sh.querySelector(".hh b").textContent=def[1]+" "+L(def[2]);var l=sh.querySelector(".hl");
 l.innerHTML=(c==="s"||c==="p")?'<div class="hb-soon">'+L(SOON)+"</div>":ks.map(function(k){var d=DEV[k];
  return'<button type="button" class="hb-r" data-t="'+c+'" data-k="'+k+'"><img src="'+IMG[k]+'" alt=""><span><b>'+L(DT[k][0])+"</b><small>"+(c==="a"?L(d[5]):d[3])+"</small></span></button>"}).join("");sh.classList.add("on");if(window.LYAPI)LYAPI.push("hbsh")}
hub.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
 if(b.dataset.ti!==undefined)playTop(+b.dataset.ti);
 else if(b.dataset.bv!==undefined)reels(+b.dataset.k,+b.dataset.bv);
 else if(b.dataset.cat){var cc=b.dataset.cat;if(cc!=="m"&&window.BP_OPEN)BP_OPEN(cc);else if(cc==="b")reels(null,0);else sheet(cc)}
 else if(b.dataset.tab!==undefined){var x=+b.dataset.tab*pg.clientWidth;if(pg.scrollTo)pg.scrollTo({left:x,behavior:"smooth"});else pg.scrollLeft=x}
 else if(b.dataset.t)act(b.dataset.t,b.dataset.k)});
sh.addEventListener("click",function(e){if(e.target.closest("#hb-sx"))return closeSh();var b=e.target.closest(".hb-r");if(b)act(b.dataset.t,b.dataset.k)});
bk.onclick=function(){sec.classList.add("hubm")};
new MutationObserver(function(){if(window.LYAPI){if(sec.classList.contains("on")&&!sec.classList.contains("hubm"))LYAPI.push("reels");else LYAPI.drop("reels")}if(!sec.classList.contains("on")&&!sec.classList.contains("hubm"))sec.classList.add("hubm");if(!sec.classList.contains("on")){closeSh();stopTop()}}).observe(sec,{attributes:true,attributeFilter:["class"]});
D.querySelectorAll(".lang button").forEach(function(b){b.addEventListener("click",function(){setTimeout(render,0)})});
/* ---------- Top 10: audio-only mini player ---------- */
var pl=D.createElement("div");pl.id="hb-pl";pl.innerHTML='<img alt=""><div class="pt"><b></b><small></small><i><u></u></i></div><button type="button" data-p="prev" aria-label="Previous">⏮</button><button type="button" data-p="tog" aria-label="Play/Pause">⏸</button><button type="button" data-p="next" aria-label="Next">⏭</button><button type="button" data-p="x" aria-label="Close">✕</button>';D.body.appendChild(pl);
var au=new Audio(),pi=-1;au.preload="none";
function plTxt(x){var nmn=x.title?L(x.title):nm(x.k),sb=x.title?nm(x.k):L(LB[x.t]||"Bhajan|भजन");
 pl.querySelector("b").textContent=nmn;pl.querySelector("small").textContent=sb;pl.querySelector("img").src=IMG[x.k];
 try{if("mediaSession" in navigator&&window.MediaMetadata)navigator.mediaSession.metadata=new MediaMetadata({title:nmn,artist:sb+" · Pooja Paath",artwork:[{src:IMG[x.k]}]})}catch(e){}}
function mark(){D.body.classList.toggle("hbpl",pl.classList.contains("on"));[].forEach.call(hub.querySelectorAll(".hb-tc"),function(c){c.classList.toggle("pl",+c.dataset.ti===pi&&pl.classList.contains("on"))})}
function playTop(i){var x=TL[i];if(!x)return;if(window.BP_STOP)BP_STOP();
 if(i===pi&&pl.classList.contains("on")){if(au.paused){var q=au.play();if(q&&q.catch)q.catch(function(){})}else au.pause();return}
 pi=i;pl.classList.add("on");plTxt(x);pl.querySelector("u").style.width="0";mark();
 if(!x.src){au.pause();au.removeAttribute("src");pl.querySelector("small").textContent=L("Audio coming soon 🙏|ऑडियो जल्द आएगा 🙏");return}
 au.src=x.src;var p=au.play();if(p&&p.catch)p.catch(function(){})}
window.HB_STOP=function(){stopTop()};
function stopTop(){au.pause();pl.classList.remove("on");pi=-1;mark()}
function stepTop(d){if(!TL.length)return;var n=(pi+d+TL.length)%TL.length;pi=-1;playTop(n)}
au.addEventListener("play",function(){pl.querySelector("[data-p=tog]").textContent="⏸"});
au.addEventListener("pause",function(){pl.querySelector("[data-p=tog]").textContent="▶"});
au.addEventListener("timeupdate",function(){if(au.duration)pl.querySelector("u").style.width=(au.currentTime/au.duration*100)+"%"});
au.addEventListener("ended",function(){stepTop(1)});
au.addEventListener("error",function(){if(au.getAttribute("src")&&pi>-1)pl.querySelector("small").textContent=L("Audio file not found yet 🙏|ऑडियो फ़ाइल अभी नहीं मिली 🙏")});
pl.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var a=b.dataset.p;
 if(a==="x")stopTop();else if(a==="prev")stepTop(-1);else if(a==="next")stepTop(1);
 else if(au.getAttribute("src")){if(au.paused){var q=au.play();if(q&&q.catch)q.catch(function(){})}else au.pause()}});
try{if("mediaSession" in navigator){navigator.mediaSession.setActionHandler("nexttrack",function(){stepTop(1)});navigator.mediaSession.setActionHandler("previoustrack",function(){stepTop(-1)})}}catch(e){}
render();
})();
