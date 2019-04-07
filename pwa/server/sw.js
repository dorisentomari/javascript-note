// 默认 ws 文件变化后，会重新注册 service worker
const CACHE_NAME = 'CACHE_V_' + 2;
// 缓存列表
const CACHE_LIST = [
  '/',
  '/index.html',
  '/index.css',
  '/main.js',
  '/api/img'
];

// 缓存的内容
function preCache() {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(CACHE_LIST);
  });
}

function clearCache() {
  return caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key !== CACHE_NAME) {
        return caches.delete(key);
      }
    }));
  })
}


self.addEventListener('fetch', e => {
  console.log(e.request.url);

});

// 安装当前 service worker
self.addEventListener('install', e => {
  // 如果上一个 service worker 不销毁，需要手动 skipWaiting
  console.log('install');
  console.log(e);
  // e.waitUtil()，等待 Promise 完成
  e.waitUntil(
    preCache().then(skipWaiting)
  )
});

// 激活当前 service worker，让 service worker 立即生效
self.addEventListener('activate', e => {
  console.log('activate');
  e.waitUntil(
    Promise.all([clearCache(), self.clients.claim()])
  )
});
