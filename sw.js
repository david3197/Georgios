const C='v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json'])));self.skipWaiting()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.method!='GET')return;
 if(u.origin==location.origin||u.hostname=='www.gstatic.com'){
  e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request)))}});
