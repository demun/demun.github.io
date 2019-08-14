/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "791a43d7f4a551db15e4527d8848bc9b"
  },
  {
    "url": "assets/css/0.styles.81a5ae0e.css",
    "revision": "52860b81f7b0a1ad516187798d5595dc"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.07f310da.js",
    "revision": "2fde763f7be15f6c2e0b75c67a5367a0"
  },
  {
    "url": "assets/js/11.a8540114.js",
    "revision": "2477eba2cdca38ded55357ccf78099e8"
  },
  {
    "url": "assets/js/12.0428dc28.js",
    "revision": "0f6053ce21f5dc370f003c71c725d1e1"
  },
  {
    "url": "assets/js/13.e87bba89.js",
    "revision": "5015d3446c92280264a406dbdb988d31"
  },
  {
    "url": "assets/js/14.3b9e64c0.js",
    "revision": "57af3a4c4aae47d47f26d81ce45632fa"
  },
  {
    "url": "assets/js/2.0bd010c3.js",
    "revision": "16c45a2ea0de5b751e92b41cf2f82a25"
  },
  {
    "url": "assets/js/3.bcb7b5b1.js",
    "revision": "f5fb5856b51689b180805483b04448b2"
  },
  {
    "url": "assets/js/4.ea18a8a4.js",
    "revision": "94098c7d9ac99adbcdc42c20ee6df932"
  },
  {
    "url": "assets/js/5.8eedbeb5.js",
    "revision": "5ec6c06344c74f6932ad6e2f1ae10291"
  },
  {
    "url": "assets/js/6.7a38688f.js",
    "revision": "80a4e43c9f9c8ce4b83b59d0f727003e"
  },
  {
    "url": "assets/js/7.da37a32f.js",
    "revision": "43800e67e915ea5c5aaa5db6016dcc74"
  },
  {
    "url": "assets/js/8.b91cdb7d.js",
    "revision": "1446ba6087deed53a71762b50234ad72"
  },
  {
    "url": "assets/js/9.2e936e2d.js",
    "revision": "36a641e2795ee78974aef33c29a09ffb"
  },
  {
    "url": "assets/js/app.53fc691d.js",
    "revision": "39d6f15149d288f199e078528ee3bc17"
  },
  {
    "url": "docs/foo-nav.html",
    "revision": "b64e6288cb05479578f1089bd388408f"
  },
  {
    "url": "docs/index.html",
    "revision": "bd676bec543a9b3925570d78d7cba6e3"
  },
  {
    "url": "index.html",
    "revision": "ef917ee840df856ae072df90310aa33a"
  },
  {
    "url": "javascript/index.html",
    "revision": "a8805679dfeab52c99b1aaa0a137d380"
  },
  {
    "url": "jquery/index.html",
    "revision": "ad6bc3a83d65278fae545c28310694c2"
  },
  {
    "url": "sub1/index.html",
    "revision": "3684af01194900e3695bf34803001f1d"
  },
  {
    "url": "sub2/file1.html",
    "revision": "d7efe4a3d598e789d8c5bf00b9741a19"
  },
  {
    "url": "sub2/index.html",
    "revision": "e3477355fb0e62b640aa5b6f69b61193"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
