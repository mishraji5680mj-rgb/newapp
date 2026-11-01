/* Bhajan audio player: opens from the 6 boxes at the top of the Bhajan tab (Aarti, Bhajan, Chalisa, Stuti, Path).
   Audio only. Has: playlist, like, WhatsApp share, in-app alarm, ringtone download, shuffle / repeat.
   Tracks come from: aud/0..7.mp3 (aarti), aud/c<devta>.mp3 (chalisa), BHAJAN / BHAJAN_AUDIO in bhajan-list.js (bhajan). */
(function(){
var D=document;
if(!window.DEV||!window.DT||!window.IMG)return;
var RE=/^(Bhagwan Shri |भगवान श्री |Shri |श्री )/;
function tn(k){var p=DT[k][0].split("|");return p[0].replace(RE,"")+"|"+p[1].replace(RE,"")}
function sb(k,by){var p=(k>-1?tn(k):"Bhajan|भजन").split("|");return by?p[0]+" · "+by+"|"+p[1]+" · "+by:p.join("|")}
function has(c,k){return c==="c"?!!(window.CH&&CH[k]):true}
var CATS={a:["🪔","Aarti|आरती"],b:["🎶","Bhajan|भजन"],c:["📿","Chalisa|चालीसा"],s:["🙏","Stuti|स्तुति"],p:["📖","Path|पाठ"]};
var SOON="Coming soon 🙏|जल्द आ रहे हैं 🙏";

/* ---------- tracks ---------- */
function tracks(c){var o=[],k,i;
 if(c==="a"){for(k=0;k<DT.length;k++)if(window.AUD&&AUD[k])o.push({id:"a"+k,k:k,src:AUD[k],title:DEV[k][5],sub:tn(k),img:IMG[k]})}
 else if(c==="c"){var CA=window.CHALISA_AUDIO||{};for(k=0;k<DT.length;k++)if(has("c",k)){var p=tn(k).split("|");o.push({id:"c"+k,k:k,src:CA[k]||"aud/c"+k+".mp3",title:p[0]+" Chalisa|"+p[1]+" चालीसा",sub:tn(k),img:IMG[k]})}}
 else if(c==="b"){
  (window.BHAJAN||[]).forEach(function(x,i){if(!x||!x.src)return;var k=(typeof x.dev==="number")?x.dev:-1;
   o.push({id:"b"+i,k:k,src:x.aud||x.src,title:x.title||"Bhajan|भजन",sub:sb(k,x.by),img:k>-1?IMG[k]:(x.poster||IMG[0]),video:!x.aud})});
  (window.BHAJAN_AUDIO||[]).forEach(function(x,i){if(!x||!x.src)return;var k=(typeof x.dev==="number")?x.dev:-1;
   o.push({id:"ba"+i,k:k,src:x.src,title:x.title||"Bhajan|भजन",sub:sb(k,x.by),img:x.img||IMG[k>-1?k:0]})})}
 return o}
function find(id){var c=id.charAt(0),l=tracks(c),i;for(i=0;i<l.length;i++)if(l[i].id===id)return{c:c,l:l,i:i};return null}

/* ---------- storage ---------- */
function jget(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}

/* ---------- css ---------- */
var css=
"#bp{position:fixed;inset:0;z-index:60;display:none;color:color-mix(in oklab,var(--a2) 35%,#fff);font-family:'Hind',system-ui,sans-serif;overflow:hidden;background:color-mix(in oklab,var(--deep) 70%,#000);-webkit-user-select:none;user-select:none}#bp.on{display:block}"
+"#bp .bg{position:absolute;inset:-40px;background:center/cover no-repeat;filter:blur(38px) saturate(1.5) brightness(.75);transform:scale(1.15);transition:background-image .6s}"
+"#bp .dim{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 18%,rgba(242,163,27,.28),transparent 60%),linear-gradient(180deg,rgba(42,7,7,.55),rgba(26,5,4,.88))}"
+"#bp .pt{position:absolute;bottom:-30px;font-size:1.3rem;opacity:0;animation:bpf 9s linear infinite;pointer-events:none}@keyframes bpf{0%{transform:translateY(0) rotate(0);opacity:0}15%{opacity:.7}100%{transform:translateY(-110vh) rotate(160deg);opacity:0}}"
+"#bp section{position:absolute;inset:0;display:none;flex-direction:column;padding-top:env(safe-area-inset-top,0px)}#bp section.on{display:flex}"
+".bp-h{display:flex;align-items:center;gap:10px;padding:10px 14px}.bp-h b{flex:1;font:400 1.3rem 'Tiro Devanagari Hindi',Georgia,serif;color:var(--a);text-align:center}.bp-h small{display:block;font:400 .78rem 'Hind',sans-serif;color:color-mix(in oklab,var(--a2) 60%,#fff);opacity:.85}"
+".bp-ib{flex:none;width:42px;height:42px;border-radius:50%;border:1.5px solid rgba(242,163,27,.8);background:rgba(0,0,0,.25);color:var(--a);font-size:1.1rem;cursor:pointer;padding:0}"
+".bp-chips{display:flex;gap:8px;padding:0 16px 8px}.bp-chips button{padding:6px 16px;border-radius:99px;border:1.5px solid var(--a);background:transparent;color:var(--a2);font:inherit;font-weight:600;font-size:.9rem;cursor:pointer}.bp-chips button.on{background:var(--a);color:var(--on-a)}"
+".bp-sr{display:none;padding:0 16px 10px}.bp-sr.on{display:block}.bp-sr .pill{display:flex;align-items:center;gap:8px;height:46px;padding:0 6px 0 14px;border-radius:99px;border:1.5px solid rgba(242,163,27,.85);background:rgba(0,0,0,.4);color:var(--a);box-shadow:inset 0 1px 3px rgba(0,0,0,.4)}.bp-sr .pill:focus-within{border-color:var(--a2);box-shadow:0 0 0 3px rgba(242,163,27,.25)}.bp-sr .pill svg{flex:none}.bp-sr input{flex:1;min-width:0;height:100%;padding:0;border:0;background:none;color:color-mix(in oklab,var(--a2) 35%,#fff);font:inherit;font-size:16px;outline:none}.bp-sr input::placeholder{color:#c9ae8a}.bp-sr .pill button{flex:none;width:34px;height:34px;border-radius:50%;border:0;background:rgba(242,163,27,.18);color:var(--a);display:grid;place-items:center;padding:0;cursor:pointer}"
+".bp-ls{flex:1;overflow-y:auto;padding:4px 14px 120px;-webkit-overflow-scrolling:touch}"
+".bp-r{display:flex;align-items:center;gap:12px;width:100%;margin:0 0 10px;padding:10px;border-radius:16px;border:1px solid rgba(242,163,27,.35);background:rgba(255,255,255,.08);backdrop-filter:blur(6px);color:inherit;font:inherit;text-align:left;cursor:pointer}"
+".bp-r.cur{border-color:var(--a);background:rgba(242,163,27,.18)}.bp-r img{width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid var(--a);flex:none;background:var(--deep)}"
+".bp-r span{flex:1;min-width:0}.bp-r b{display:block;font-size:1rem;line-height:1.25}.bp-r small{display:block;color:color-mix(in oklab,var(--a2) 60%,#fff);font-size:.82rem}.bp-r i{font-style:normal;font-size:1.2rem;flex:none}"
+".bp-soon{text-align:center;color:color-mix(in oklab,var(--a2) 60%,#fff);padding:60px 20px;font-size:1.05rem}.bp-soon div{font-size:3rem;margin-bottom:8px}"
+".bp-mini{position:absolute;left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px));display:none;align-items:center;gap:10px;padding:8px 10px;border-radius:18px;background:rgba(74,16,16,.95);border:2px solid var(--a);box-shadow:0 4px 16px rgba(0,0,0,.5);cursor:pointer}.bp-mini.on{display:flex}"
+".bp-mini img{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid var(--a)}.bp-mini span{flex:1;min-width:0}.bp-mini b{display:block;font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bp-mini small{color:color-mix(in oklab,var(--a2) 60%,#fff);font-size:.78rem}"
/* now playing */
+".bp-now{align-items:center}.bp-art{position:relative;width:min(64vw,268px);height:min(64vw,268px);margin:2vh auto 2.2vh;flex:none}"
+".bp-art::before,.bp-art::after{content:'';position:absolute;inset:-14px;border-radius:50%;border:2px solid rgba(242,163,27,.45);opacity:0}.bp-art.play::before{animation:bpr 2.6s ease-out infinite}.bp-art.play::after{animation:bpr 2.6s ease-out 1.3s infinite}@keyframes bpr{from{transform:scale(.92);opacity:.8}to{transform:scale(1.28);opacity:0}}"
+".bp-disc{position:absolute;inset:0;border-radius:50%;background:var(--deep) center/cover no-repeat;border:6px solid var(--a);box-shadow:0 0 0 6px rgba(242,163,27,.25),0 14px 40px rgba(0,0,0,.6),0 0 50px rgba(242,163,27,.35);animation:bps 24s linear infinite;animation-play-state:paused}.bp-art.play .bp-disc{animation-play-state:running}@keyframes bps{to{transform:rotate(360deg)}}"
+".bp-disc::after{content:'';position:absolute;left:50%;top:50%;width:26px;height:26px;margin:-13px;border-radius:50%;background:radial-gradient(var(--a2),#c98a1e);border:3px solid #5a360c}"
+".bp-tt{text-align:center;padding:0 22px;width:100%}.bp-tt b{display:block;font:400 1.5rem/1.25 'Tiro Devanagari Hindi',Georgia,serif;color:#fff}.bp-tt small{display:block;margin-top:2px;color:var(--a);font-size:.95rem}"
+".bp-sk{width:100%;max-width:440px;padding:12px 24px 0}.bp-sk input{width:100%;height:28px;margin:0;background:none;-webkit-appearance:none;appearance:none;touch-action:none}"
+".bp-sk input::-webkit-slider-runnable-track{height:5px;border-radius:3px;background:linear-gradient(90deg,#F2A31B var(--p,0%),rgba(255,255,255,.25) var(--p,0%))}.bp-sk input::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;margin-top:-6.5px;border-radius:50%;background:var(--a2);border:3px solid var(--a)}"
+".bp-sk input::-moz-range-track{height:5px;border-radius:3px;background:rgba(255,255,255,.25)}.bp-sk input::-moz-range-progress{height:5px;border-radius:3px;background:var(--a)}.bp-sk input::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:var(--a2);border:3px solid var(--a)}"
+".bp-tm{display:flex;justify-content:space-between;font-size:.8rem;color:color-mix(in oklab,var(--a2) 60%,#fff);margin-top:-2px}"
+".bp-ct{display:flex;align-items:center;justify-content:center;gap:16px;padding:6px 0 4px}.bp-ct button{border:0;background:none;color:var(--a2);font-size:1.5rem;cursor:pointer;width:46px;height:46px;border-radius:50%;padding:0;opacity:.9}.bp-ct button.on{color:var(--a);opacity:1;text-shadow:0 0 10px var(--a)}"
+".bp-ct .big{width:70px;height:70px;font-size:1.9rem;background:radial-gradient(circle at 35% 30%,#ffe29a,#F2A31B 60%,#c9780f);color:var(--on-a);box-shadow:0 6px 22px rgba(242,163,27,.5);opacity:1}.bp-ct .big:active{transform:scale(.94)}"
+".bp-ac{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;width:100%;max-width:440px;padding:10px 14px calc(14px + env(safe-area-inset-bottom,0px));margin-top:auto}"
+".bp-ac button{display:grid;gap:3px;justify-items:center;padding:8px 2px;border-radius:14px;border:1px solid rgba(242,163,27,.4);background:rgba(255,255,255,.08);color:var(--a2);font:inherit;font-size:.72rem;font-weight:600;cursor:pointer}.bp-ac button b{font-size:1.4rem;font-weight:400;line-height:1;display:grid;place-items:center;height:30px}.bp-ac button b img{display:block;width:30px;height:30px;object-fit:contain}"
+".bp-ac button.on{background:rgba(242,163,27,.22);border-color:var(--a)}.bp-ac .lk.on b{animation:bpl .5s}@keyframes bpl{40%{transform:scale(1.5)}}"
/* sheets + toast */
+"#bp .sh{position:absolute;left:0;right:0;bottom:0;max-height:86%;overflow-y:auto;padding:18px 18px calc(22px + env(safe-area-inset-bottom,0px));border-radius:24px 24px 0 0;background:var(--deep);border-top:3px solid var(--a);box-shadow:0 -10px 40px rgba(0,0,0,.6);transform:translateY(105%);transition:transform .3s;z-index:5}#bp .sh.on{transform:none}"
+"#bp .sh h3{margin:0 0 4px;font:400 1.35rem 'Tiro Devanagari Hindi',Georgia,serif;color:var(--a)}#bp .sh p{margin:6px 0;color:color-mix(in oklab,var(--a2) 60%,#fff);font-size:.9rem;line-height:1.45}"
+"#bp .sh input[type=time]{width:100%;padding:12px;margin:8px 0;border-radius:12px;border:2px solid var(--a);background:color-mix(in oklab,var(--deep) 70%,#000);color:var(--a2);font:600 1.6rem 'Hind',sans-serif;text-align:center;color-scheme:dark}"
+"#bp .sh label{display:flex;align-items:center;gap:10px;margin:8px 0;color:color-mix(in oklab,var(--a2) 35%,#fff)}#bp .sh label input{width:22px;height:22px;accent-color:var(--a)}"
+".bp-bt{display:block;width:100%;margin:10px 0 0;padding:13px;border:0;border-radius:14px;background:linear-gradient(135deg,#D9650F,#F2A31B);color:var(--deep);font:600 1.05rem 'Hind',sans-serif;text-align:center;text-decoration:none;cursor:pointer}.bp-bt.g{background:transparent;border:1.5px solid var(--a);color:var(--a)}"
+".bp-al{display:flex;align-items:center;gap:10px;padding:10px 12px;margin:8px 0;border-radius:14px;background:rgba(242,163,27,.16);border:1px solid var(--a)}.bp-al span{flex:1;font-weight:600}"
+".bp-bd{position:absolute;inset:0;background:rgba(0,0,0,.5);display:none;z-index:4}.bp-bd.on{display:block}"
+".bp-ts{position:absolute;left:50%;bottom:calc(100px + env(safe-area-inset-bottom,0px));transform:translateX(-50%) translateY(20px);max-width:86%;padding:10px 18px;border-radius:99px;background:rgba(0,0,0,.85);border:1px solid var(--a);color:var(--a2);font-size:.92rem;text-align:center;opacity:0;pointer-events:none;transition:.3s;z-index:7}.bp-ts.on{opacity:1;transform:translateX(-50%)}"
+"#bp-ring{position:fixed;inset:0;z-index:80;display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center;background:radial-gradient(ellipse at 50% 30%,#8a3a12,#2a0707 70%);color:color-mix(in oklab,var(--a2) 35%,#fff);font-family:'Hind',system-ui,sans-serif}#bp-ring.on{display:flex}"
+"#bp-ring .al{font-size:4.5rem;animation:bpw .6s infinite alternate}@keyframes bpw{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}#bp-ring h2{margin:0;font:400 2.4rem 'Tiro Devanagari Hindi',Georgia,serif;color:var(--a)}#bp-ring p{margin:0;color:color-mix(in oklab,var(--a2) 60%,#fff)}#bp-ring .bp-bt{max-width:320px}"
+"@media (prefers-reduced-motion:reduce){.bp-disc,#bp .pt,.bp-art::before,.bp-art::after{animation:none!important}}"
+"@media (max-height:640px){.bp-art{width:min(46vw,200px);height:min(46vw,200px)}}";
var st=D.createElement("style");st.textContent=css;D.head.appendChild(st);

/* ---------- dom ---------- */
var root=D.createElement("div");root.id="bp";
var pts="";["🌸","✨","🪔","🌼","✨","🌺"].forEach(function(e,i){pts+='<span class="pt" style="left:'+(8+i*16)+'%;animation-delay:'+(i*1.6)+'s">'+e+"</span>"});
root.innerHTML='<div class="bg" id="bp-bg"></div><div class="dim"></div>'+pts
+'<section id="bp-l"><div class="bp-h"><button class="bp-ib" data-a="close" aria-label="Back">←</button><b id="bp-lt"></b><button class="bp-ib" data-a="srch" aria-label="Search"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4L21 21"/></svg></button></div>'
+'<div class="bp-sr" id="bp-sr"><div class="pill"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4L21 21"/></svg><input type="text" id="bp-q" autocomplete="off" enterkeyhint="search" inputmode="search"><button type="button" data-a="srx" aria-label="Clear"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div></div>'
+'<div class="bp-chips"><button data-f="all" class="on"></button><button data-f="liked"></button></div><div class="bp-ls" id="bp-ls"></div>'
+'<div class="bp-mini" id="bp-mini"><img alt=""><span><b></b><small></small></span><button class="bp-ib" data-a="mtog" aria-label="Play">▶</button></div></section>'
+'<section id="bp-n" class="bp-now"><div class="bp-h"><button class="bp-ib" data-a="list" aria-label="Playlist">⌄</button><b><small id="bp-nc"></small><span id="bp-nh"></span></b><button class="bp-ib" data-a="list2" aria-label="List">☰</button></div>'
+'<div class="bp-art" id="bp-art"><div class="bp-disc" id="bp-disc"></div></div>'
+'<div class="bp-tt"><b id="bp-t"></b><small id="bp-s"></small></div>'
+'<div class="bp-sk"><input type="range" id="bp-sk" min="0" max="1000" value="0" aria-label="Seek"><div class="bp-tm"><span id="bp-c">0:00</span><span id="bp-d">0:00</span></div></div>'
+'<div class="bp-ct"><button data-a="shuf" aria-label="Shuffle">🔀</button><button data-a="prev" aria-label="Previous">⏮</button><button class="big" data-a="tog" id="bp-tg" aria-label="Play">▶</button><button data-a="next" aria-label="Next">⏭</button><button data-a="rep" id="bp-rp" aria-label="Repeat">🔁</button></div>'
+'<div class="bp-ac"><button class="lk" data-a="like" id="bp-lk"><b>🤍</b><span id="bp-l1"></span></button><button data-a="wa"><b><img src="wa.png" alt="" width="30" height="30"></b><span id="bp-l2"></span></button><button data-a="alarm"><b>⏰</b><span id="bp-l3"></span></button><button data-a="ring"><b>🔔</b><span id="bp-l4"></span></button><button data-a="list"><b>☰</b><span id="bp-l5"></span></button></div></section>'
+'<div class="bp-bd" id="bp-bd"></div>'
+'<div class="sh" id="bp-al"><h3 id="al-h"></h3><p id="al-p"></p><div id="al-cur"></div><input type="time" id="al-t" value="06:00"><label><input type="checkbox" id="al-d" checked><span id="al-dl"></span></label><button class="bp-bt" data-a="alset"></button><button class="bp-bt g" data-a="sheetx"></button></div>'
+'<div class="sh" id="bp-rg"><h3 id="rg-h"></h3><p id="rg-p"></p><a class="bp-bt" id="rg-a" download></a><p id="rg-s"></p><button class="bp-bt g" data-a="sheetx"></button></div>'
+'<div class="bp-ts" id="bp-ts"></div>';
D.body.appendChild(root);
var ring=D.createElement("div");ring.id="bp-ring";ring.innerHTML='<div class="al">⏰</div><h2 id="rn-t"></h2><p id="rn-n"></p><button class="bp-bt" data-r="stop"></button><button class="bp-bt g" data-r="snooze"></button>';D.body.appendChild(ring);
function $(i){return D.getElementById(i)}

/* ---------- state ---------- */
var au=new Audio();au.preload="none";
var cat="a",list=[],idx=-1,filt="all",shuf=false,rep=0,drag=false,likes=jget("bp_likes",{});
function cur(){return list[idx]}
function fmt(s){if(!isFinite(s)||s<0)s=0;var m=Math.floor(s/60),x=Math.floor(s%60);return m+":"+(x<10?"0":"")+x}
function toast(m){var t=$("bp-ts");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove("on")},2400)}
var q="";
function vis(){var v=filt==="liked"?list.filter(function(t){return likes[t.id]}):list;if(q){var s=q.toLowerCase();v=v.filter(function(t){return(t.title+" "+t.sub).toLowerCase().indexOf(s)>-1})}return v}

/* ---------- texts ---------- */
function labels(){$("bp-lt").textContent=CATS[cat][0]+" "+L(CATS[cat][1]);
 var ch=root.querySelectorAll(".bp-chips button");ch[0].textContent=L("All|सभी");ch[1].textContent="❤️ "+L("Liked|पसंद");
 $("bp-q").placeholder=L("Search bhajan, devta, singer…|भजन, देवता या गायक खोजें…");$("bp-l1").textContent=L("Like|पसंद");$("bp-l2").textContent="WhatsApp";$("bp-l3").textContent=L("Alarm|अलार्म");$("bp-l4").textContent=L("Ringtone|रिंगटोन");$("bp-l5").textContent=L("List|सूची");
 $("bp-nc").textContent=L(CATS[cat][1]);$("bp-nh").textContent=""}

/* ---------- list ---------- */
function drawList(){var ls=$("bp-ls"),v=vis(),h="";
 if(!list.length){ls.innerHTML='<div class="bp-soon"><div>'+CATS[cat][0]+"</div>"+L(SOON)+"</div>";return}
 if(!v.length){ls.innerHTML=q?'<div class="bp-soon"><div>🔍</div>'+L("Nothing found.|कुछ नहीं मिला।")+"</div>":'<div class="bp-soon"><div>🤍</div>'+L("No liked items yet. Tap ❤️ in the player.|अभी कोई पसंद नहीं। प्लेयर में ❤️ दबाएँ।")+"</div>";return}
 v.forEach(function(t){var on=cur()&&cur().id===t.id;h+='<button type="button" class="bp-r'+(on?" cur":"")+'" data-id="'+t.id+'"><img src="'+t.img+'" alt=""><span><b>'+L(t.title)+"</b><small>"+L(t.sub)+"</small></span><i>"+(likes[t.id]?"❤️":(on&&!au.paused?"🔊":"▶"))+"</i></button>"});
 ls.innerHTML=h}
function drawMini(){var m=$("bp-mini"),t=cur();if(!t||!$("bp-l").classList.contains("on")){m.classList.remove("on");return}
 m.classList.add("on");m.querySelector("img").src=t.img;m.querySelector("b").textContent=L(t.title);m.querySelector("small").textContent=L(t.sub);m.querySelector("button").textContent=au.paused?"▶":"⏸"}
function drawNow(){var t=cur();if(!t)return;
 $("bp-bg").style.backgroundImage="url("+t.img+")";$("bp-disc").style.backgroundImage="url("+t.img+")";
 $("bp-t").textContent=L(t.title);$("bp-s").textContent=L(t.sub);
 var lk=$("bp-lk");lk.classList.toggle("on",!!likes[t.id]);lk.querySelector("b").textContent=likes[t.id]?"❤️":"🤍";
 $("bp-tg").textContent=au.paused?"▶":"⏸";$("bp-art").classList.toggle("play",!au.paused);
 $("bp-rp").textContent=rep===2?"🔂":"🔁";$("bp-rp").classList.toggle("on",rep>0);root.querySelector("[data-a=shuf]").classList.toggle("on",shuf);
 meta(t)}
function meta(t){try{if("mediaSession" in navigator&&window.MediaMetadata)navigator.mediaSession.metadata=new MediaMetadata({title:L(t.title),artist:L(t.sub)+" · Pooja Paath",artwork:[{src:t.img}]})}catch(e){}}
function view(v){$("bp-l").classList.toggle("on",v==="l");$("bp-n").classList.toggle("on",v==="n");if(v==="l"){if(window.LYAPI)LYAPI.drop("bpn");drawList();drawMini()}else{if(window.LYAPI)LYAPI.push("bpn");drawNow()}}

/* ---------- playback ---------- */
function stopOthers(){try{if(window.HB_STOP)HB_STOP()}catch(e){}try{var pa=D.querySelector("audio.au");if(pa)pa.pause()}catch(e){}}
function playAt(i){var t=list[i];if(!t)return;idx=i;stopOthers();$("bp-sk").value=0;$("bp-sk").style.setProperty("--p","0%");$("bp-c").textContent="0:00";$("bp-d").textContent="0:00";
 au.src=t.src;var p=au.play();if(p&&p.catch)p.catch(function(){});drawNow()}
function pick(dir){var v=list;if(!v.length)return;var n;
 if(shuf&&v.length>1){do{n=Math.floor(Math.random()*v.length)}while(n===idx)}else n=(idx+dir+v.length)%v.length;playAt(n)}
function toggle(){if(!cur())return;if(!au.getAttribute("src")){playAt(idx);return}if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause()}
au.addEventListener("play",function(){drawNow();drawMini();if($("bp-l").classList.contains("on"))drawList()});
au.addEventListener("pause",function(){drawNow();drawMini();if($("bp-l").classList.contains("on"))drawList()});
au.addEventListener("loadedmetadata",function(){$("bp-d").textContent=fmt(au.duration)});
au.addEventListener("timeupdate",function(){if(drag||!au.duration)return;var p=au.currentTime/au.duration*100;$("bp-sk").value=p*10;$("bp-sk").style.setProperty("--p",p+"%");$("bp-c").textContent=fmt(au.currentTime)});
au.addEventListener("ended",function(){if(rep===2){au.currentTime=0;var p=au.play();if(p&&p.catch)p.catch(function(){})}else if(!shuf&&rep===0&&idx===list.length-1){au.pause()}else pick(1)});
au.addEventListener("error",function(){if(au.getAttribute("src"))toast(L("Audio file not found yet 🙏|ऑडियो फ़ाइल अभी नहीं मिली 🙏"))});
$("bp-q").addEventListener("input",function(){q=this.value.trim();drawList()});
var sk=$("bp-sk");
sk.addEventListener("input",function(){drag=true;var p=sk.value/10;sk.style.setProperty("--p",p+"%");if(au.duration)$("bp-c").textContent=fmt(au.duration*p/100)});
sk.addEventListener("change",function(){if(au.duration)au.currentTime=au.duration*sk.value/1000;drag=false});
try{if("mediaSession" in navigator){navigator.mediaSession.setActionHandler("nexttrack",function(){pick(1)});navigator.mediaSession.setActionHandler("previoustrack",function(){pick(-1)});navigator.mediaSession.setActionHandler("play",toggle);navigator.mediaSession.setActionHandler("pause",toggle)}}catch(e){}

/* ---------- like / share / sheets ---------- */
function like(){var t=cur();if(!t)return;if(likes[t.id])delete likes[t.id];else{likes[t.id]=1;try{if(navigator.vibrate)navigator.vibrate(25)}catch(e){}}jset("bp_likes",likes);drawNow();toast(likes[t.id]?L("Added to liked ❤️|पसंद में जुड़ गया ❤️"):L("Removed from liked|पसंद से हटाया"))}
function wa(){var t=cur();if(!t)return;var u=location.origin+location.pathname,tx="🙏 "+L(t.title)+" ("+L(t.sub)+")\n"+L("Listen on Pooja Paath app:|पूजा पाठ ऐप पर सुनिए:")+" "+u;
 window.open("https://wa.me/?text="+encodeURIComponent(tx),"_blank","noopener")}
function sheet(id,on){var was=$("bp-al").classList.contains("on")||$("bp-rg").classList.contains("on");$(id).classList.toggle("on",on);$("bp-bd").classList.toggle("on",on);if(window.LYAPI){if(on&&!was)LYAPI.push("bps");else if(!on)LYAPI.drop("bps")}}
function closeSheets(){sheet("bp-al",false);sheet("bp-rg",false)}
function openRing(){var t=cur();if(!t)return;
 $("rg-h").textContent="🔔 "+L("Make it your ringtone|इसे अपनी रिंगटोन बनाएँ");
 $("rg-p").textContent=L("A website cannot change your phone's ringtone by itself. Download the file, then set it from your phone's settings.|वेबसाइट सीधे फ़ोन की रिंगटोन नहीं बदल सकती। फ़ाइल डाउनलोड करें, फिर फ़ोन की सेटिंग से लगाएँ।");
 var a=$("rg-a");a.href=t.src;a.setAttribute("download",t.src.split("/").pop());a.textContent="⬇️ "+L("Download|डाउनलोड करें")+" — "+L(t.title);
 $("rg-s").innerHTML="<b>Android:</b> "+L("Settings → Sound → Phone ringtone (or Alarm sound) → Add → choose the downloaded file.|सेटिंग्स → साउंड → फ़ोन रिंगटोन (या अलार्म साउंड) → जोड़ें → डाउनलोड की फ़ाइल चुनें।")
  +"<br><b>iPhone:</b> "+L("Open the file in GarageBand and export it as a ringtone.|फ़ाइल को GarageBand में खोलकर रिंगटोन के रूप में एक्सपोर्ट करें।")
  +(t.video?"<br><br>⚠️ "+L("This one is a video file. Add an mp3 for it (aud field in bhajan-list.js) for a clean ringtone.|यह वीडियो फ़ाइल है। साफ़ रिंगटोन के लिए इसका mp3 जोड़ें (bhajan-list.js में aud)।"):"");
 root.querySelector("#bp-rg .bp-bt.g").textContent=L("Close|बंद करें");sheet("bp-rg",true)}

/* ---------- alarm (works while the app is open) ---------- */
var AL=jget("bp_alarm",null),alT=0;
function alText(){if(!AL)return"";var d=new Date(AL.at);return d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
function openAlarm(){var t=cur();
 $("al-h").textContent="⏰ "+L("Bhajan alarm|भजन अलार्म");
 $("al-p").textContent=L("Plays: |बजेगा: ")+(t?L(t.title):"")+L(". The alarm rings while the app is open. For a sure alarm, download the file and set it in your phone's Alarm app.|। अलार्म तब बजता है जब ऐप खुला हो। पक्के अलार्म के लिए फ़ाइल डाउनलोड करके फ़ोन के अलार्म में लगाएँ।");
 $("al-dl").textContent=L("Repeat every day|रोज़ दोहराएँ");
 root.querySelector("[data-a=alset]").textContent="⏰ "+L("Set alarm|अलार्म लगाएँ");root.querySelector("#bp-al .bp-bt.g").textContent=L("Close|बंद करें");
 var c=$("al-cur");c.innerHTML=AL?'<div class="bp-al"><span>⏰ '+alText()+" · "+(AL.id&&find(AL.id)?L(find(AL.id).l[find(AL.id).i].title):"")+'</span><button class="bp-ib" data-a="aldel" aria-label="Delete">🗑</button></div>':"";
 sheet("bp-al",true)}
function nextAt(hm){var p=hm.split(":"),d=new Date();d.setHours(+p[0],+p[1],0,0);if(d.getTime()<=Date.now()+1000)d.setDate(d.getDate()+1);return d.getTime()}
function setAlarm(){var t=cur();if(!t)return;var v=$("al-t").value;if(!v)return;
 AL={id:t.id,at:nextAt(v),hm:v,daily:$("al-d").checked};jset("bp_alarm",AL);
 try{if("Notification" in window&&Notification.permission==="default")Notification.requestPermission()}catch(e){}
 closeSheets();toast("⏰ "+L("Alarm set for |अलार्म लगा: ")+alText());arm()}
function delAlarm(){AL=null;try{localStorage.removeItem("bp_alarm")}catch(e){}openAlarm();toast(L("Alarm removed|अलार्म हटाया"))}
function arm(){clearInterval(alT);if(AL)alT=setInterval(chk,10000)}
function chk(){if(!AL||Date.now()<AL.at)return;var late=Date.now()-AL.at,a=AL;
 if(a.daily){do{a.at+=86400000}while(a.at<=Date.now())}else AL=null;
 if(AL)jset("bp_alarm",AL);else try{localStorage.removeItem("bp_alarm")}catch(e){}
 if(late<30*60000)fire(a)}
function fire(a){var f=find(a.id)||find("a3")||find("a0");if(!f)return;cat=f.c;list=f.l;labels();root.classList.add("on");if(window.LYAPI)LYAPI.push("bp");view("n");playAt(f.i);
 $("rn-t").textContent=L("Time for bhajan 🙏|भजन का समय 🙏");$("rn-n").textContent=L(f.l[f.i].title);
 ring.querySelector("[data-r=stop]").textContent=L("Stop|बंद करें");ring.querySelector("[data-r=snooze]").textContent=L("Snooze 5 min|5 मिनट बाद");ring.classList.add("on");
 try{if(navigator.vibrate)navigator.vibrate([400,200,400,200,400])}catch(e){}
 try{if("Notification" in window&&Notification.permission==="granted")new Notification(L("Time for bhajan 🙏|भजन का समय 🙏"),{body:L(f.l[f.i].title),icon:"icon-192.png"})}catch(e){}}
ring.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
 if(b.dataset.r==="stop"){au.pause();ring.classList.remove("on")}
 else if(b.dataset.r==="snooze"){au.pause();ring.classList.remove("on");var s={id:cur().id};setTimeout(function(){fire(s)},5*60000)}});
D.addEventListener("visibilitychange",function(){if(!D.hidden)chk()});
arm();

/* ---------- open / close ---------- */
function open(c){cat=c;list=tracks(c);idx=-1;filt="all";q="";$("bp-q").value="";$("bp-sr").classList.remove("on");var ch=root.querySelectorAll(".bp-chips button");ch[0].classList.add("on");ch[1].classList.remove("on");
 labels();stopOthers();au.pause();au.removeAttribute("src");root.classList.add("on");if(window.LYAPI)LYAPI.push("bp");view("l");D.body.style.overflow="hidden"}
function hardClose(){au.pause();au.removeAttribute("src");idx=-1;root.classList.remove("on");D.body.style.overflow="";$("bp-al").classList.remove("on");$("bp-rg").classList.remove("on");$("bp-bd").classList.remove("on")}
function closeAll(){hardClose();if(window.LYAPI)LYAPI.drop("bp")}
if(window.LYAPI){LYAPI.close.bps=function(){$("bp-al").classList.remove("on");$("bp-rg").classList.remove("on");$("bp-bd").classList.remove("on")};LYAPI.close.bpn=function(){$("bp-l").classList.add("on");$("bp-n").classList.remove("on");drawList();drawMini()};LYAPI.close.bp=hardClose}
root.addEventListener("click",function(e){
 var r=e.target.closest(".bp-r");if(r){var id=r.dataset.id,i=list.map(function(t){return t.id}).indexOf(id);if(i>-1){if(i===idx&&au.getAttribute("src")){}else playAt(i);view("n")}return}
 var f=e.target.closest("[data-f]");if(f){filt=f.dataset.f;[].forEach.call(root.querySelectorAll(".bp-chips button"),function(b){b.classList.toggle("on",b===f)});drawList();return}
 if(e.target.closest("#bp-mini")&&!e.target.closest("[data-a=mtog]")){view("n");return}
 var b=e.target.closest("[data-a]");if(!b){if(e.target.id==="bp-bd")closeSheets();return}
 var a=b.dataset.a;
 if(a==="close")closeAll();else if(a==="list"||a==="list2")view("l");else if(a==="tog"||a==="mtog")toggle();
 else if(a==="next")pick(1);else if(a==="prev"){if(au.currentTime>4)au.currentTime=0;else pick(-1)}
 else if(a==="shuf"){shuf=!shuf;drawNow();toast(shuf?L("Shuffle on|शफ़ल चालू"):L("Shuffle off|शफ़ल बंद"))}
 else if(a==="rep"){rep=(rep+1)%3;drawNow();toast([L("Repeat off|रिपीट बंद"),L("Repeat all|सभी रिपीट"),L("Repeat one|एक रिपीट")][rep])}
 else if(a==="srch"){var sr=$("bp-sr");sr.classList.toggle("on");if(sr.classList.contains("on"))$("bp-q").focus();else{q="";$("bp-q").value="";drawList()}}
 else if(a==="srx"){q="";$("bp-q").value="";drawList();$("bp-q").focus()}
 else if(a==="like")like();else if(a==="wa")wa();else if(a==="alarm")openAlarm();else if(a==="ring")openRing();
 else if(a==="alset")setAlarm();else if(a==="aldel")delAlarm();else if(a==="sheetx")closeSheets()});
window.BP_OPEN=open;
window.BP_STOP=function(){if(root.classList.contains("on"))closeAll()};
})();
