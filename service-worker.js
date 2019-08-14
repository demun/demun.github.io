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
    "revision": "ddfac729ee08d54dbfe2a6b60a173818"
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
    "url": "assets/js/2.fb158010.js",
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
    "url": "assets/js/6.84300286.js",
    "revision": "a0c71dab2320b40c1d52091ea08c751c"
  },
  {
    "url": "assets/js/7.0705d6ba.js",
    "revision": "98ac525253e0b9157351653ce8dc3da3"
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
    "url": "assets/js/app.c1aec018.js",
    "revision": "87ffd72eb306d452b2a15c26d10c0c61"
  },
  {
    "url": "docs/foo-nav.html",
    "revision": "dacad4c10b1def41b6d122d7e98f45d6"
  },
  {
    "url": "docs/index.html",
    "revision": "f1902431c86425cf7a0c70964f54eb3a"
  },
  {
    "url": "index.html",
    "revision": "94e9c099c1ad174d990c657132a7fe93"
  },
  {
    "url": "javascript/index.html",
    "revision": "f5826a1e6df0288c29de20d0a92a50c0"
  },
  {
    "url": "jquery/index.html",
    "revision": "35ed1369d01542d1f961cae42ccd1faa"
  },
  {
    "url": "sub1/index.html",
    "revision": "33394af219178817ca98538976dd0af2"
  },
  {
    "url": "sub2/file1.html",
    "revision": "0915da270e0e6b64dc04a1070f672188"
  },
  {
    "url": "sub2/index.html",
    "revision": "889dcfa6b1d95d6f4cd82312dbcac903"
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
