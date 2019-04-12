// 默认 ws 文件变化后，会重新注册 service worker
const CACHE_NAME = 'CACHE_V_' + 3;
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

// 获取数据后，进行缓存
function fetchAddSave(request) {
  // 请求到了，需要更新缓存
  fetch({
    url: request.url
  }).then(res => {
    // res 是流，流的特点是流完了，就没了，在 caches 中已经把流使用完了，所以返回的 res 已经不再是返回的 res
    // 更新缓存
    let r = res.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(request, res));
    // 返回最新内容
    return r;
  })
}

self.addEventListener('fetch', e => {
  // 如果联网了的话，就发请求，没联网就把缓存拿出来

  // 缓存策略，缓存优先，网络优先
  if (e.request.url.includes('/api/')) {
    return e.respondWith(fetchAddSave(e.request).catch(err => {
      // 打开缓存，把缓存中匹配到的结果返还回去
      return caches.open(CACHE_NAME).then(cache => cache.match(e.request));
    }));
  }


  // 线程中，不能发 AJAX 请求，可以把 AJAX 改成 fetch
  // 用什么内容返回当前响应
  e.respondWith(
    fetch({
      url: e.request.url,
    }).catch(err => {
      // 打开缓存，把缓存中匹配到的结果返还回去
      return caches.open(CACHE_NAME).then(cache => cache.match(e.request));
    })
  )
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
