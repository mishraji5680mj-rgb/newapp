var C="panchang-v36",A=["./","ui.css","bg.mp3","img/0.webp","img/1.webp","img/2.webp","img/3.webp","img/4.webp","img/5.webp","img/6.webp","img/7.webp","manifest.webmanifest","icon-192.png","icon-512.png","push-config.js","bhajan-list.js","chat-widget.js","aarti.js","bhajan-hub.js","bhajan-player.js","wa.png","hanuman.jpg"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}).catch(function(){}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C&&x!=="fonts-v1"}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
// Fast start: show the saved copy at once, refresh it in the background (next open gets the update).
self.addEventListener("fetch",function(e){var r=e.request,u=new URL(r.url);
 if(r.method==="GET"&&(u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com")){
  e.respondWith(caches.open("fonts-v1").then(function(c){return c.match(r).then(function(m){
   var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==="opaque"))c.put(r,res.clone());return res}).catch(function(){return m||Response.error()});
   e.waitUntil(net.catch(function(){}));return m||net})}));return}
 if(r.method==="GET"&&u.origin===location.origin&&r.headers.has("range")&&/\/bg\.mp3$/.test(u.pathname)){
  e.respondWith(caches.match("bg.mp3").then(function(m){if(!m)return fetch(r);return m.arrayBuffer().then(function(b){var h=r.headers.get("range").match(/bytes=(\d*)-(\d*)/)||[],st=+h[1]||0,en=h[2]?Math.min(+h[2],b.byteLength-1):b.byteLength-1;
   return new Response(b.slice(st,en+1),{status:206,headers:{"Content-Type":"audio/mpeg","Content-Range":"bytes "+st+"-"+en+"/"+b.byteLength,"Content-Length":String(en-st+1),"Accept-Ranges":"bytes"}})})}));return}
 if(r.method!=="GET"||u.origin!==location.origin||u.pathname.indexOf("/api/")===0||u.pathname.indexOf("/aud/")===0||u.pathname.indexOf("/vid/")===0||r.headers.has("range"))return;
 e.respondWith(caches.open(C).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(m){
  var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return m||(r.mode==="navigate"?c.match("./"):0)||new Response("Offline",{status:503,headers:{"Content-Type":"text/plain"}})});
  e.waitUntil(net.catch(function(){}));return m||net})}))});
self.addEventListener("push",function(e){var d={};try{d=e.data.json()}catch(x){d={title:"🙏 Panchang",body:e.data?e.data.text():""}}
 e.waitUntil(self.registration.showNotification(d.title||"🙏 Panchang",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",data:{tab:d.tab||"panchang"}}))});
self.addEventListener("notificationclick",function(e){e.notification.close();var tab=(e.notification.data&&e.notification.data.tab)||"panchang";
 e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){for(var i=0;i<l.length;i++){if("focus" in l[i]){l[i].postMessage({tab:tab});return l[i].focus()}}return self.clients.openWindow("./index.html?tab="+tab)}))});
