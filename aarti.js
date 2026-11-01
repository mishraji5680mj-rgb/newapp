/* Mandir me Aarti — virtual aarti (demo: Hanuman ji) */
(function(){
var IC=["🐘","🔱","🐚","🚩","🪷","🦁","🪈","☀️"],JAI=["जय गणेश देवा!","हर हर महादेव!","जय जगदीश हरे!","जय बजरंगबली!","जय माँ लक्ष्मी!","जय माता दी!","जय श्री कृष्ण!","जय सूर्य देव!"];
var css="#am-ov{position:fixed;inset:0;z-index:99999;background:radial-gradient(ellipse at 50% 30%,#7a2118 0,#3a0d0b 60%,#1a0504 100%);color:#FBEBD0;display:none;flex-direction:column;font-family:'Hind',system-ui,sans-serif;-webkit-user-select:none;user-select:none;touch-action:none;overflow:hidden;padding-top:env(safe-area-inset-top,0)}"+
"#am-ov.on{display:flex}#am-top{display:flex;justify-content:space-between;align-items:center;padding:10px 14px}#am-top b{color:#F2A31B;font-size:1.1rem}"+
"#am-x{background:none;border:1px solid #F2A31B;color:#F2A31B;border-radius:99px;width:38px;height:38px;font-size:1.2rem;cursor:pointer}"+
"#am-pick{flex:1;overflow:auto;padding:8px 16px 24px;text-align:center}#am-pick h2{color:#F2A31B;margin:6px 0}#am-pick p{margin:0 0 14px;color:#EBD3B0}"+
".am-g{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;max-width:420px;margin:0 auto}"+
".am-c{background:rgba(255,255,255,.07);border:2px solid #F2A31B;border-radius:14px;padding:16px 8px;color:inherit;font:inherit;cursor:pointer;position:relative}"+
".am-c span{display:block;font-size:2.2rem}.am-c span img{width:76px;height:76px;border-radius:50%;object-fit:cover;border:2.5px solid #F2A31B;box-shadow:0 0 0 3px rgba(242,163,27,.25),0 6px 14px rgba(0,0,0,.5);margin-bottom:6px}.am-c.off{opacity:.5;border-color:#8a6a3a;border-style:dashed}.am-c small{display:block;color:#EBD3B0;font-size:.78rem}"+
".am-c.off::after{content:'जल्द आ रहे हैं';position:absolute;top:-9px;right:8px;background:#6B1A1A;color:#F2A31B;font-size:.68rem;padding:1px 8px;border-radius:99px;border:1px solid #F2A31B}"+
"#am-scene{flex:1;display:none;flex-direction:column;min-height:0}#am-scene.on{display:flex}"+
"#am-st{position:relative;flex:1;min-height:0}#am-dev{position:absolute;inset:0;display:flex;justify-content:center;align-items:flex-end;padding:40px 0 0;box-sizing:border-box;pointer-events:none}#am-dev img.dv{height:100%;width:auto;max-width:100%}"+
"#am-th{position:absolute;width:156px;height:156px;margin:-78px 0 0 -78px;left:50%;top:78%;pointer-events:none;will-change:transform;z-index:3;filter:drop-shadow(0 14px 10px rgba(0,0,0,.55))}"+
"#am-bloom{position:absolute;width:300px;height:300px;margin:-150px 0 0 -150px;left:50%;top:64%;border-radius:50%;pointer-events:none;z-index:2;background:radial-gradient(circle,rgba(255,196,80,.5),rgba(255,140,30,.18) 45%,transparent 70%);mix-blend-mode:screen;opacity:.8;will-change:transform}"+
".am-em{position:absolute;width:5px;height:5px;margin:-2px;border-radius:50%;background:radial-gradient(#fff6c0,#ffb02e 60%,transparent 72%);pointer-events:none;z-index:4}"+
"#am-ring{position:absolute;left:50%;top:78%;width:120px;height:120px;margin:-60px 0 0 -60px;border:0;border-radius:50%;pointer-events:none}"+
"#am-hint{z-index:6;text-shadow:0 1px 6px #000;position:absolute;left:0;right:0;bottom:6px;text-align:center;font-size:.85rem;color:#EBD3B0;pointer-events:none}"+
"#am-cnt{z-index:6;position:absolute;left:12px;top:8px;background:rgba(0,0,0,.35);border:1px solid #F2A31B;border-radius:99px;padding:3px 12px;font-size:.9rem;color:#F2A31B}"+
"#am-txt{z-index:6;text-shadow:0 1px 6px #000,0 0 10px #000;position:absolute;left:0;right:0;top:44px;text-align:center;color:#F2A31B;font-size:1.05rem;pointer-events:none}"+
"#am-bar{display:flex;justify-content:center;gap:6px;padding:10px 10px calc(14px + env(safe-area-inset-bottom,0));background:rgba(0,0,0,.35);border-top:2px solid #F2A31B}"+
"#am-bar button{flex:1;max-width:100px;background:#F2A31B;color:#4A1010;border:0;border-radius:12px;padding:8px 2px;font:inherit;font-weight:600;font-size:.74rem;cursor:pointer}#am-bar button b{display:block;font-size:1.4rem;font-weight:400}#am-bar button:active{transform:scale(.94)}"+
".am-fl{position:absolute;font-size:1.7rem;pointer-events:none;z-index:5;will-change:transform,opacity}"+
"#am-bell{position:absolute;z-index:7;text-shadow:0 2px 8px rgba(0,0,0,.6);right:10px;top:6px;font-size:2.2rem;transform-origin:50% 0;pointer-events:none}"+
"@keyframes am-sw{0%,100%{transform:rotate(0)}25%{transform:rotate(22deg)}75%{transform:rotate(-22deg)}}"+
"@keyframes am-fk{from{transform:scale(1,1) skewX(-3deg)}to{transform:scale(.93,1.1) skewX(4deg)}}"+
"#am-flame{transform-box:fill-box;transform-origin:50% 100%;animation:am-fk .42s ease-in-out infinite alternate}"+
"#am-lnk{display:block;margin:10px auto 0;background:#F2A31B;color:#4A1010;border:0;border-radius:10px;padding:10px 20px;font:inherit;font-weight:600;cursor:pointer}"+
"#am-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin:6px 0 14px;padding:14px 16px;background:linear-gradient(135deg,#D9650F,#F2A31B);color:#3a0d0b;border:2px solid #6B1A1A;border-radius:14px;font:600 1.1rem/1.2 inherit;cursor:pointer;box-shadow:0 3px 10px rgba(107,26,26,.3)}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var st2=document.createElement("style");st2.textContent="#am-ov{font-family:'Mukta','Hind',system-ui,sans-serif}#am-top b,#am-pick h2,#am-cnt{font-family:'Tiro Devanagari Hindi','Mukta',serif;font-weight:400;letter-spacing:.02em}#am-top b{font-size:1.3rem;background:linear-gradient(180deg,#fff0b0,#f2a31b);-webkit-background-clip:text;background-clip:text;color:transparent}#am-txt{font-family:'Tiro Devanagari Hindi','Mukta',serif;font-size:1.35rem!important;top:86px!important;background:linear-gradient(180deg,#fff7d0,#f6b93b);-webkit-background-clip:text;background-clip:text;color:transparent!important;text-shadow:none!important;filter:drop-shadow(0 2px 4px #000)}#am-fr{position:absolute;inset:0;z-index:5;pointer-events:none;overflow:hidden}#am-fr .tor{position:absolute;left:0;top:0;width:100%;height:56px;filter:drop-shadow(0 6px 6px rgba(0,0,0,.55))}#am-fr .pl{position:absolute;top:0;bottom:0;width:30px;background:linear-gradient(90deg,#3a1a06,#b8761c 28%,#ffe08a 50%,#b8761c 72%,#3a1a06);box-shadow:0 0 18px rgba(0,0,0,.6)}#am-fr .pl.l{left:0}#am-fr .pl.r{right:0}#am-fr .pl::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 46px,rgba(60,25,4,.55) 46px 52px,transparent 52px 98px)}#am-fr .pl::after{content:'';position:absolute;left:-4px;right:-4px;top:40px;height:16px;border-radius:4px;background:linear-gradient(180deg,#ffe9a0,#8a5a10)}#am-fr .bl{position:absolute;top:44px;font-size:1.6rem;font-style:normal;transform-origin:50% 0;animation:am-sw 3.2s ease-in-out infinite;filter:drop-shadow(0 3px 3px #000)}#am-fr .bl1{left:34px}#am-fr .bl2{left:34%;animation-delay:.7s}#am-fr .bl3{right:34%;animation-delay:1.4s}#am-fr .bl4{right:34px;animation-delay:2s}#am-fr .fl{position:absolute;bottom:0;width:60px;height:60px;background:radial-gradient(circle at 50% 100%,#ffb02e,#ff7a00 30%,transparent 62%);opacity:.5;animation:am-fk .5s ease-in-out infinite alternate}#am-fr .fl.l{left:20px}#am-fr .fl.r{right:20px}#am-cnt{top:126px!important;left:38px!important}#am-bell{display:none}#am-dev img.dv{border-radius:0!important;border-width:0!important;box-shadow:none!important}";document.head.appendChild(st2);


/* ---------- audio (synthesised, no files) ---------- */
var AC=null;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==="suspended")AC.resume();return AC}
function ghanta(){var a=ac();if(!a)return;var t=a.currentTime,g=a.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.55,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+2.4);g.connect(a.destination);
 [[620,1],[1250,.6],[1870,.45],[2790,.3],[3900,.18]].forEach(function(p){var o=a.createOscillator(),h=a.createGain();o.type="sine";o.frequency.value=p[0];h.gain.value=p[1]*.5;o.connect(h);h.connect(g);o.start(t);o.stop(t+2.5)});
 if(navigator.vibrate)navigator.vibrate(30)}
var SH=null;
function shankh(){try{if(!SH)SH=new Audio(window.AARTI_SHANKH||'aud/shankh.mp3');SH.currentTime=0;var p=SH.play();if(p&&p.catch)p.catch(shankhSynth);if(navigator.vibrate)navigator.vibrate([200,80,400]);return}catch(e){}shankhSynth()}
function shankhSynth(){var a=ac();if(!a)return;var t=a.currentTime,D=3.2,g=a.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.5,t+.5);g.gain.setValueAtTime(.5,t+D-.7);g.gain.exponentialRampToValueAtTime(.0001,t+D);
 var f=a.createBiquadFilter();f.type="lowpass";f.frequency.value=1400;f.connect(g);g.connect(a.destination);
 var lf=a.createOscillator(),lg=a.createGain();lf.frequency.value=5.5;lg.gain.value=4;lf.connect(lg);lf.start(t);lf.stop(t+D);
 [1,2,3].forEach(function(m,i){var o=a.createOscillator(),h=a.createGain();o.type=i?"triangle":"sawtooth";o.frequency.setValueAtTime(215*m*.93,t);o.frequency.exponentialRampToValueAtTime(235*m,t+.6);h.gain.value=[.5,.25,.12][i];lg.connect(o.frequency);o.connect(h);h.connect(f);o.start(t);o.stop(t+D)});
 if(navigator.vibrate)navigator.vibrate([200,80,400])}
function pop(){var a=ac();if(!a)return;var t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.frequency.setValueAtTime(700,t);o.frequency.exponentialRampToValueAtTime(1200,t+.12);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.0001,t+.2);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+.25)}

/* ---------- artwork ---------- */
var HANUMAN='<img class="dv" src="hanuman.jpg" alt="Hanuman ji" draggable="false" style="object-fit:cover;border-radius:14px;border:3px solid #F2A31B;box-shadow:0 0 30px rgba(242,163,27,.5)">';

var FRAME='<div id="am-fr" aria-hidden="true"><i class="pl l"></i><i class="pl r"></i><svg class="tor" viewBox="0 0 400 90" preserveAspectRatio="none"><defs><linearGradient id="tg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#e0a020"/><stop offset="1" stop-color="#7a4d08"/></linearGradient></defs><rect width="400" height="16" fill="url(#tg1)"/><path d="M0 16 Q25 70 50 16 Q75 70 100 16 Q125 70 150 16 Q175 70 200 16 Q225 70 250 16 Q275 70 300 16 Q325 70 350 16 Q375 70 400 16 V0 H0Z" fill="url(#tg1)" opacity=".95"/><g fill="#ff9a1a" stroke="#b45309" stroke-width=".8">'+(function(){var h="";for(var i=0;i<16;i++)h+='<circle cx="'+(12+i*25)+'" cy="'+(34+(i%2?4:0))+'" r="6"/>';return h})()+'</g><g fill="#ffd25a">'+(function(){var h="";for(var i=0;i<16;i++)h+='<circle cx="'+(12+i*25)+'" cy="'+(34+(i%2?4:0))+'" r="2.4"/>';return h})()+'</g></svg><b class="bl bl1">🔔</b><b class="bl bl2">🔔</b><b class="bl bl3">🔔</b><b class="bl bl4">🔔</b><div class="fl l"></div><div class="fl r"></div></div>';
function buildThali(){
 var P=function(a,r,cx,cy){var t=a*Math.PI/180;return[(cx+Math.cos(t)*r).toFixed(1),(cy+Math.sin(t)*r).toFixed(1)]};
 var h='<svg id="am-th" viewBox="0 0 160 160"><defs>'
 +'<radialGradient id="tpb" cx="40%" cy="34%" r="80%"><stop offset="0" stop-color="#fff3bf"/><stop offset=".3" stop-color="#f3c24e"/><stop offset=".7" stop-color="#bf8213"/><stop offset="1" stop-color="#5f3a07"/></radialGradient>'
 +'<linearGradient id="tpr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8d6"/><stop offset=".22" stop-color="#e9b43a"/><stop offset=".5" stop-color="#7a4d08"/><stop offset=".78" stop-color="#e9b43a"/><stop offset="1" stop-color="#fff0b0"/></linearGradient>'
 +'<radialGradient id="tpd" cx="46%" cy="42%" r="62%"><stop offset="0" stop-color="#f6d777"/><stop offset=".6" stop-color="#d9a22b"/><stop offset="1" stop-color="#9a6409"/></radialGradient>'
 +'<radialGradient id="tdy" cx="38%" cy="30%" r="85%"><stop offset="0" stop-color="#f1b36b"/><stop offset=".5" stop-color="#b8602a"/><stop offset="1" stop-color="#5b2410"/></radialGradient>'
 +'<radialGradient id="tgh" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#ffe9a0"/><stop offset="1" stop-color="#e0a020"/></radialGradient>'
 +'<radialGradient id="tfl" cx="50%" cy="82%" r="80%"><stop offset="0" stop-color="#fffdf0"/><stop offset=".28" stop-color="#ffe17a"/><stop offset=".62" stop-color="#ff9a1a"/><stop offset="1" stop-color="#e8470a" stop-opacity=".85"/></radialGradient>'
 +'<radialGradient id="tgl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd25a" stop-opacity=".95"/><stop offset=".5" stop-color="#ff9d2e" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a1e" stop-opacity="0"/></radialGradient>'
 +'<radialGradient id="tkm" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ff5a4a"/><stop offset="1" stop-color="#a50e10"/></radialGradient>'
 +'<radialGradient id="trc" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d2c0"/></radialGradient>'
 +'<filter id="tbl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter><filter id="tb1"><feGaussianBlur stdDeviation="1"/></filter>'
 +'<g id="tmg"><g fill="#f57c00">';
 for(var i=0;i<14;i++)h+='<ellipse cx="0" cy="-5.4" rx="2.5" ry="4.3" transform="rotate('+(i*360/14).toFixed(1)+')"/>';
 h+='</g><g fill="#ffa000">';
 for(i=0;i<12;i++)h+='<ellipse cx="0" cy="-3.6" rx="2.2" ry="3.4" transform="rotate('+(i*30+15)+')"/>';
 h+='</g><g fill="#ffc107">';
 for(i=0;i<9;i++)h+='<ellipse cx="0" cy="-2.2" rx="1.7" ry="2.3" transform="rotate('+(i*40)+')"/>';
 h+='</g><circle r="1.5" fill="#bf4d00"/></g>'
 +'<path id="tlf" d="M0 0C3-4 9-4.5 13 0C9 4.5 3 4 0 0Z" fill="#2f7d33"/></defs>';
 /* plate */
 h+='<circle cx="80" cy="80" r="77" fill="url(#tpr)"/><circle cx="80" cy="80" r="72.5" fill="url(#tpb)"/>'
 +'<circle cx="80" cy="80" r="72.5" fill="none" stroke="#fff3c0" stroke-opacity=".55" stroke-width="1"/>'
 +'<circle cx="80" cy="80" r="66" fill="none" stroke="#6f4608" stroke-opacity=".55" stroke-width="1.2"/>'
 +'<circle cx="80" cy="80" r="63.5" fill="none" stroke="#ffe9a0" stroke-opacity=".5" stroke-width=".8"/>'
 +'<circle cx="80" cy="80" r="61" fill="url(#tpd)"/>';
 /* engraved scallops on the rim */
 for(i=0;i<36;i++){var a=P(i*10,69.2,80,80);h+='<circle cx="'+a[0]+'" cy="'+a[1]+'" r="1.35" fill="#7a4d08" fill-opacity=".55"/><circle cx="'+(+a[0]-.3)+'" cy="'+(+a[1]-.4)+'" r=".6" fill="#fff6c8" fill-opacity=".7"/>'}
 /* engraved lotus pattern in the dish */
 h+='<g fill="none" stroke="#7a4d08" stroke-opacity=".38" stroke-width=".9">';
 for(i=0;i<16;i++){var p1=P(i*22.5-9,57,80,80),p2=P(i*22.5,43,80,80),p3=P(i*22.5+9,57,80,80);h+='<path d="M'+p1[0]+' '+p1[1]+'Q'+p2[0]+' '+p2[1]+' '+p3[0]+' '+p3[1]+'"/>'}
 h+='<circle cx="80" cy="80" r="40" stroke-dasharray="1.5 3"/></g>';
 /* marigolds + leaves ring */
 for(i=0;i<8;i++){var lp=P(i*45+22.5,46,80,80);h+='<use href="#tlf" transform="translate('+lp[0]+' '+lp[1]+') rotate('+(i*45+22.5+90)+') scale(.9)"/>'}
 for(i=0;i<8;i++){var fp=P(i*45,47,80,80);h+='<g transform="translate('+fp[0]+' '+fp[1]+') rotate('+(i*17)+') scale('+(i%2?0.95:1.12)+')"><circle r="6.8" fill="#000" fill-opacity=".25" cx=".8" cy="1.4" filter="url(#tb1)"/><use href="#tmg"/></g>'}
 /* kumkum + rice heaps */
 h+='<ellipse cx="55" cy="75" rx="9" ry="6" fill="#000" fill-opacity=".22" filter="url(#tb1)"/><path d="M47 77C48.5 66.5 61.5 66.5 63 77Z" fill="url(#tkm)"/><ellipse cx="55" cy="77" rx="8" ry="2.5" fill="#8f0b0e"/>'
 +'<ellipse cx="105" cy="75" rx="9" ry="6" fill="#000" fill-opacity=".22" filter="url(#tb1)"/><path d="M97 77C98.5 66.5 111.5 66.5 113 77Z" fill="url(#trc)"/><ellipse cx="105" cy="77" rx="8" ry="2.5" fill="#bdb4a0"/>';
 for(i=0;i<8;i++){var gx=99+((i*7)%11)*.95,gy=71+((i*5)%5)*.9;h+='<ellipse cx="'+gx.toFixed(1)+'" cy="'+gy.toFixed(1)+'" rx="1" ry=".55" fill="#fff" transform="rotate('+(i*40)+' '+gx.toFixed(1)+' '+gy.toFixed(1)+')"/>'}
 /* central brass/clay diya */
 h+='<ellipse cx="80" cy="95" rx="21" ry="9" fill="#000" fill-opacity=".3" filter="url(#tbl)"/>'
 +'<path d="M58 84C58 100 68 106 80 106C92 106 102 100 102 84Z" fill="url(#tdy)"/>'
 +'<path d="M62 94C70 99 90 99 98 94" stroke="#f6c58c" stroke-opacity=".5" stroke-width="1.2" fill="none"/>'
 +'<ellipse cx="80" cy="84" rx="22" ry="8.5" fill="#6b2d12"/><ellipse cx="80" cy="84" rx="22" ry="8.5" fill="none" stroke="#f1b36b" stroke-width="1.4"/>'
 +'<ellipse cx="80" cy="84.6" rx="17.5" ry="6" fill="url(#tgh)"/><ellipse cx="76" cy="83" rx="7" ry="1.6" fill="#fff" fill-opacity=".55"/>'
 +'<rect x="78.6" y="76" width="2.8" height="9" rx="1.2" fill="#3b2a1a"/>';
 /* flame (lean group is turned by JS, inner group flickers by CSS) */
 h+='<circle id="am-gl" cx="80" cy="66" r="34" fill="url(#tgl)"/>'
 +'<g id="am-fl"><g id="am-flame"><path d="M80 44C89 56 91 68 80 78C69 68 71 56 80 44Z" fill="url(#tfl)"/><path d="M80 58C84 64 85 70 80 76C75 70 76 64 80 58Z" fill="#fffbe8" fill-opacity=".92"/><path d="M80 66C82 69 82 72 80 75C78 72 78 69 80 66Z" fill="#7fb2ff" fill-opacity=".55"/></g></g>';
 /* soft highlight + inner light */
 h+='<path d="M22 56A62 62 0 0 1 56 22" stroke="#fff" stroke-opacity=".5" stroke-width="3.6" stroke-linecap="round" fill="none" filter="url(#tb1)"/><path d="M134 108A62 62 0 0 1 108 134" stroke="#fff" stroke-opacity=".22" stroke-width="2.6" stroke-linecap="round" fill="none" filter="url(#tb1)"/></svg>';
 return h}

var THALI=buildThali();

var ov,cur=null,rev=0,ang=0,acc=0,auto=null,drag=0,cx,cy;
function build(){
 ov=document.createElement("div");ov.id="am-ov";
 ov.innerHTML='<div id="am-top"><b>🪔 मन्दिर में आरती</b><button id="am-x" aria-label="बंद करें">✕</button></div>'+
 '<div id="am-pick"><h2>कौन से देवता की आरती करें?</h2><p>अपने इष्टदेव को चुनिए</p><div class="am-g">'+
 window.DT.map(function(d,k){return '<button class="am-c" data-d="'+k+'"><span>'+(window.IMG&&IMG[k]?'<img src="'+IMG[k]+'" alt="" draggable="false">':IC[k])+'</span>'+d[0].split("|")[1].replace("भगवान श्री ","")+'<small>'+d[0].split("|")[0].replace("Bhagwan Shri ","")+'</small></button>'}).join("")+'</div></div>'+
 '<div id="am-scene"><div id="am-st"><div id="am-txt"></div><div id="am-cnt">🪔 आरती: 0 चक्कर</div><div id="am-bell">🔔</div><div id="am-dev"></div>'+FRAME+'<div id="am-ring"></div><div id="am-bloom"></div>'+THALI+'<div id="am-hint">👆 थाली को गोल-गोल घुमाइए</div></div>'+
 '<div id="am-bar"><button data-a="spin"><b>🪔</b>थाली घुमाएँ</button><button data-a="flower"><b>🌺</b>फूल चढ़ाएँ</button><button data-a="shankh"><b>🐚</b>शंख</button><button data-a="ghanta"><b>🔔</b>घंटा</button><button data-a="sound"><b>🔊</b>गान सुनें</button></div></div>';
 document.body.appendChild(ov);
 ov.addEventListener("click",function(e){
  var b=e.target.closest("button");if(!b)return;
  if(b.id==="am-x")return close();
  if(b.dataset.d!==undefined)return start(+b.dataset.d);
  var a=b.dataset.a;if(a==="ghanta")ring();if(a==="shankh")conch();if(a==="flower")flowers();if(a==="spin")toggleAuto();if(a==="sound")toggleSnd();
 });
 var stg=ov.querySelector("#am-st");
 stg.addEventListener("pointerdown",function(e){if(e.target.closest("button"))return;ac();drag=1;startLoop();stg.setPointerCapture&&stg.setPointerCapture(e.pointerId);mv(e)});
 stg.addEventListener("pointermove",function(e){if(drag)mv(e)});
 var up=function(){drag=0;last=null};stg.addEventListener("pointerup",up);stg.addEventListener("pointercancel",up);
}
var last=null,R=0;
/* ---- smooth, physical thali motion: eased follow, tilt, flame lean, embers, glow ---- */
var tx=0,ty=0,px=0,py=0,vx=0,vy=0,raf=0,lt=0,emT=0,lit=0,fx=0;
function place(a){tx=Math.cos(a)*R;ty=Math.sin(a)*R}
function startLoop(){if(!raf){lt=performance.now();raf=requestAnimationFrame(loop)}}
function loop(t){raf=0;if(!ov||!ov.classList.contains("on")||!cur&&cur!==0)return;
 var dt=Math.min(.05,Math.max(.001,(t-lt)/1000));lt=t;
 if(auto)spinTo(ang+2.7*dt);
 var idle=(drag||auto)?0:1,ox=idle*Math.sin(t/900)*3,oy=idle*Math.cos(t/760)*2.5;
 var k=1-Math.exp(-dt*13),nx=px+(tx+ox-px)*k,ny=py+(ty+oy-py)*k;vx=(nx-px)/dt;vy=(ny-py)/dt;px=nx;py=ny;
 var sp=Math.hypot(vx,vy),th=ov.querySelector("#am-th");
 var rx=Math.max(-16,Math.min(16,-vy*.016)),ry=Math.max(-16,Math.min(16,vx*.016));
 th.style.transform="translate("+px.toFixed(1)+"px,"+py.toFixed(1)+"px) perspective(560px) rotateX("+rx.toFixed(1)+"deg) rotateY("+ry.toFixed(1)+"deg)";
 var lean=Math.max(-24,Math.min(24,-vx*.035));fx+=(lean-fx)*Math.min(1,dt*10);
 var fl=th.querySelector("#am-fl");if(fl)fl.setAttribute("transform","rotate("+fx.toFixed(1)+" 80 78)");
 var gl=th.querySelector("#am-gl");if(gl)gl.setAttribute("r",(34+Math.min(8,sp/90)+Math.sin(t/110)*1.2).toFixed(1));
 var bl=ov.querySelector("#am-bloom");if(bl){bl.style.transform="translate("+px.toFixed(1)+"px,"+(py-14).toFixed(1)+"px)";bl.style.opacity=(.55+Math.min(.45,sp/900)+Math.sin(t/140)*.04).toFixed(2)}
 lit+=((Math.min(1,rev/7)*.6+Math.min(1,sp/800)*.4)-lit)*Math.min(1,dt*4);
 var di=ov.querySelector("#am-dev img");if(di)di.style.filter="brightness("+(.78+.32*lit).toFixed(2)+") saturate("+(1+.15*lit).toFixed(2)+")";
 if(sp>140&&t-emT>45&&!window.matchMedia("(prefers-reduced-motion:reduce)").matches){emT=t;ember(th.offsetLeft+th.offsetWidth/2+px+(Math.random()-.5)*8,th.offsetTop+th.offsetHeight*.38+py)}
 raf=requestAnimationFrame(loop)}
function ember(x,y){var st=ov.querySelector("#am-st"),e=document.createElement("div");e.className="am-em";e.style.left=x+"px";e.style.top=y+"px";st.appendChild(e);
 var dx=(Math.random()-.5)*34,dy=-30-Math.random()*40;var an=e.animate([{transform:"translate(0,0) scale(1)",opacity:.95},{transform:"translate("+dx+"px,"+dy+"px) scale(.2)",opacity:0}],{duration:700+Math.random()*500,easing:"ease-out"});an.onfinish=function(){e.remove()}}
function center(){var st=ov.querySelector("#am-st"),rg=ov.querySelector("#am-ring"),th=ov.querySelector("#am-th"),w=st.clientWidth,h=st.clientHeight;R=Math.max(60,Math.min(w*.3,h*.26,130));
 rg.style.top=th.style.top="64%";rg.style.width=rg.style.height=2*R+"px";rg.style.margin=-R+"px 0 0 "+(-R)+"px";
 var r=rg.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2}
function mv(e){center();var a=Math.atan2(e.clientY-cy,e.clientX-cx);spinTo(a)}
function spinTo(a){
 if(last!==null){var d=a-last;if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;acc+=d;
  if(Math.abs(acc)>=2*Math.PI){acc=0;rev++;ov.querySelector("#am-cnt").textContent="🪔 आरती: "+rev+" चक्कर";if(rev===1||rev%5===0){pop()}if(rev===5)ov.querySelector("#am-hint").textContent="🙏 "+JAI[cur]}}
 last=a;ang=a;place(a)}
function toggleAuto(){ac();if(auto){auto=null;ov.querySelector('[data-a=spin]').lastChild.textContent="थाली घुमाएँ";return}
 center();ov.querySelector('[data-a=spin]').lastChild.textContent="थाली रोकें";last=ang;auto=true;startLoop()}
function ring(){ghanta();ov.querySelectorAll("#am-fr .bl").forEach(function(e,i){e.style.animation="none";void e.offsetWidth;e.style.animation="am-sw .9s ease-out "+(i*.08)+"s"});var b=ov.querySelector("#am-bell");b.style.animation="none";void b.offsetWidth;b.style.animation="am-sw .9s ease-out"}
var conchOn=0;
function conch(){if(conchOn)return;conchOn=1;shankh();var t=ov.querySelector("#am-txt");t.textContent="🐚 ॐ ॐ ॐ";setTimeout(function(){conchOn=0;t.textContent=MT()},9000)}
function flowers(){ac();pop();var st=ov.querySelector("#am-st"),w=st.clientWidth,h=st.clientHeight,E=["🌺","🌸","🏵️","🌼","🌹"];
 for(var i=0;i<14;i++)(function(i){var f=document.createElement("div");f.className="am-fl";f.textContent=E[i%5];var x0=w/2+(Math.random()-.5)*w*.6,y0=h*.9,x1=w/2+(Math.random()-.5)*90,y1=h*(.25+Math.random()*.3);f.style.left=x0+"px";f.style.top=y0+"px";st.appendChild(f);
  var an=f.animate([{transform:"translate(0,0) scale(.6) rotate(0)",opacity:0},{opacity:1,offset:.15},{transform:"translate("+(x1-x0)+"px,"+(y1-y0-60)+"px) scale(1.1) rotate("+(Math.random()*240-120)+"deg)",opacity:1,offset:.6},{transform:"translate("+(x1-x0+(Math.random()-.5)*60)+"px,"+(h*.82-y0)+"px) scale(1) rotate("+(Math.random()*360)+"deg)",opacity:0}],{duration:1900+Math.random()*700,delay:i*70,easing:"ease-out",fill:"both"});an.onfinish=function(){f.remove()}})(i);
 var t=ov.querySelector("#am-txt");t.textContent="🌺 पुष्प अर्पित हुए 🙏";setTimeout(function(){t.textContent=MT()},2200)}

function MT(){return cur===null?"":window.DEV[cur][3]}
var SND=null;
function sndUi(){var b=ov&&ov.querySelector("[data-a=sound]");if(b)var on=SND&&!SND.paused;b.lastChild.textContent=on?"गान रोकें":"गान सुनें";b.firstChild.textContent=on?"⏸":"🔊"}
function sndStop(){if(SND){SND.onplay=SND.onpause=null;SND.pause();SND=null}}
function sndStart(k,t0){sndStop();var u=(window.AUD||{})[k];if(!u){sndUi();return}SND=new Audio(u);SND.onplay=SND.onpause=sndUi;if(t0){try{SND.currentTime=t0}catch(e){}}var p=SND.play();if(p&&p.catch)p.catch(sndUi);sndUi()}
function toggleSnd(){if(!SND){sndStart(cur,0);return}if(SND.paused){var p=SND.play();if(p&&p.catch)p.catch(sndUi)}else SND.pause();sndUi()}
function start(k,t0){cur=k;rev=0;acc=0;last=null;ov.querySelector("#am-pick").style.display="none";ov.querySelector("#am-scene").classList.add("on");
 var src=k===3?"hanuman.jpg":window.IMG[k];
 ov.querySelector("#am-dev").innerHTML='<img class="dv" src="'+src+'" alt="" draggable="false" style="object-fit:cover;border-radius:14px;border:3px solid #F2A31B;box-shadow:0 0 30px rgba(242,163,27,.5)">';
 ov.querySelector("#am-txt").textContent=MT();ov.querySelector("#am-cnt").textContent="🪔 आरती: 0 चक्कर";
 ov.querySelector("#am-hint").textContent="👆 थाली को गोल-गोल घुमाइए";
 var pa=document.querySelector("#dd audio.au");if(pa)pa.pause();
 sndStart(k,t0||0);
 requestAnimationFrame(function(){center();ang=Math.PI/2;place(ang);px=tx;py=ty;vx=vy=0;fx=0;lit=0;startLoop()})}
function open(){if(!ov)build();ov.classList.add("on");if(window.LYAPI)LYAPI.push("am");ov.querySelector("#am-pick").style.display="";ov.querySelector("#am-scene").classList.remove("on");document.body.style.overflow="hidden"}
function close(){sndStop();if(auto){auto=null}var was=ov.classList.contains("on");ov.classList.remove("on");document.body.style.overflow="";if(was&&window.LYAPI)LYAPI.drop("am")}
if(window.LYAPI)LYAPI.close.am=function(){sndStop();if(auto){auto=null}ov.classList.remove("on");document.body.style.overflow=""};
function openFor(k,t0){if(!ov)build();open();start(k,t0)}
window.AARTI_OPEN_FOR=openFor;
window.addEventListener("resize",function(){if(ov&&ov.classList.contains("on")&&cur){center();place(ang)}});

/* ---------- main-page button (Pooja tab) ---------- */
function mount(){var s=document.querySelector("#pooja .wrap");if(!s||document.getElementById("am-btn"))return;
 var b=document.createElement("button");b.id="am-btn";b.type="button";b.innerHTML="🪔 मन्दिर में आरती करें";b.onclick=open;
 var sub=s.querySelector(".sub");sub?sub.after(b):s.prepend(b)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();

/* ---------- "मन्दिर में आरती करें" inside the devta aarti box ---------- */
var gs=document.createElement("style");gs.textContent="#am-go{display:block;width:100%;max-width:420px;margin:12px auto;padding:13px 16px;font:600 1.05rem/1.2 inherit;background:linear-gradient(135deg,#D9650F,#F2A31B);color:#3a0d0b;border:2px solid #6B1A1A;border-radius:14px;cursor:pointer;box-shadow:0 3px 10px rgba(107,26,26,.3)}";document.head.appendChild(gs);
function inject(){var dd=document.getElementById("dd");if(!dd||dd.hidden||dd.querySelector("#am-go"))return;var rb=dd.querySelector("[data-reel]");if(!rb)return;var k=+rb.dataset.reel,au=dd.querySelector("audio.au");
 var b=document.createElement("button");b.type="button";b.id="am-go";b.textContent="🪔 मन्दिर में आरती करें";
 b.onclick=function(){var pa=dd.querySelector("audio.au"),t0=pa&&!pa.paused?pa.currentTime:0;if(pa)pa.pause();openFor(k,t0)};
 if(au)au.after(b);else rb.parentNode.before(b)}
var dd0=document.getElementById("dd");if(dd0){new MutationObserver(inject).observe(dd0,{childList:true});inject()}
})();
