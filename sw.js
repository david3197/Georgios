const C='georgios-v16',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png'],
EXT=['https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all([...CORE.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})),...EXT.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{}))])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!='GET'||(u.origin!=location.origin&&u.hostname!='www.gstatic.com'))return;
 const page=u.origin==location.origin&&(r.mode=='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html'));
 if(page){e.respondWith(Promise.race([fetch(r,{cache:'no-cache'}),new Promise((_,j)=>setTimeout(j,4000))]).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp))}return res}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
  const net=fetch(r).then(res=>{if(res&&(res.ok||res.type=='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>hit);
  return hit||net}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l[0]?l[0].focus():clients.openWindow('./')))});
