# Output Management

!!! tip
    이 안내서는 자산 관리[`자산 관리`](asset-management) 안내서에 있는 코드 예제를 확장합니다.


지금까지는 모든 자산을 `index.html` 파일에 수동으로 포함 시켰지만 응용 프로그램이 커짐에 따라 [파일 이름에 해시를 사용](caching)하고 [여러 번들]code-splitting)을 출력하기 시작하면 `index.html` 파일을 수동으로 관리하기가 어려울 것입니다. 그러나 이 프로세스를 훨씬 쉽게 관리 할 수 있는 몇 가지 플러그인이 있습니다.


## Preparation

먼저 프로젝트를 약간 조정 해 보겠습니다:

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- print.js
  |- /node_modules
```

`src/print.js` 파일에 몇 가지 로직을 추가해 보겠습니다.

__src/print.js__

``` js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

그리고 `src/index.js` 파일에서 해당 기능을 사용하십시오 :

__src/index.js__

``` diff
  import _ from 'lodash';
+ import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
+   const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

+   btn.innerHTML = 'Click me and check the console!';
+   btn.onclick = printMe;
+
+   element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
```

webpack이 항목을 분리 할 수 있도록 `dist/index.html` 파일도 업데이트 해 보겠습니다.

__dist/index.html__

``` diff
  <!doctype html>
  <html>
    <head>
-     <title>Asset Management</title>
+     <title>Output Management</title>
+     <script src="./print.bundle.js"></script>
    </head>
    <body>
-     <script src="./bundle.js"></script>
+     <script src="./app.bundle.js"></script>
    </body>
  </html>
```

이제 설정을 조정하십시오. `src/print.js`를 새로운 진입점 (`print`)으로 추가하고 출력값도 변경하여 진입점 이름을 기반으로 번들 이름을 동적으로 생성합니다.


__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     app: './src/index.js',
+     print: './src/print.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

`npm run build`를 실행하고 이것이 무엇을 생성하는지 봅시다.

``` bash
...
          Asset     Size  Chunks                    Chunk Names
  app.bundle.js   545 kB    0, 1  [emitted]  [big]  app
print.bundle.js  2.74 kB       1  [emitted]         print
...
```

webpack은 `print.bundle.js` 및 `app.bundle.js` 파일을 생성하며 `index.html` 파일에도 지정되어 있음을 알 수 있습니다. 브라우저에서 `index.html`을 열면 버튼을 클릭 할 때 어떤 일이 발생하는지 확인할 수 있습니다.

그러나 우리가 엔트리 포인트 중 하나의 이름을 변경하거나 새로운 것을 추가했다면 어떻게 될 것입니까? 생성된 번들은 빌드에서 이름이 바뀌지만 `index.html` 파일은 여전히 이전 이름을 참조합니다. [`HtmlWebpackPlugin`](../plugins/html-webpack-plugin)으로 문제를 해결해 봅시다.




## Setting up HtmlWebpackPlugin

먼저 플러그인을 설치하고`webpack.config.js` 파일을 조정하십시오.


``` bash
npm install --save-dev html-webpack-plugin
```

__webpack.config.js__

``` diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

빌드하기 전에 `HtmlWebpackPlugin`이 `dist/` 폴더에 이미있는 경우에도 기본적으로 자체 `index.html` 파일을 생성한다는 것을 알아야합니다. 즉, `index.html 파일을 새로 생성 된 파일로 대체합니다. `npm run build`를 수행하면 어떻게 되는지 봅시다 :

``` bash
...
           Asset       Size  Chunks                    Chunk Names
 print.bundle.js     544 kB       0  [emitted]  [big]  print
   app.bundle.js    2.81 kB       1  [emitted]         app
      index.html  249 bytes          [emitted]
...
```

코드 편집기에서 `index.html`을 열면 `HtmlWebpackPlugin`이 완전히 새로운 파일을 만들고 모든 번들이 자동으로 추가된다는 것을 알 수 있습니다.

`HtmlWebpackPlugin`이 제공하는 모든 기능 및 옵션에 대한 자세한 내용을 보려면 [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) 저장소에서 해당 기능을 읽어보십시오.

또한 기본 템플릿 외에도 몇 가지 추가 기능을 제공하는 [`html-webpack-template`](https://github.com/jaketrent/html-webpack-template)을 살펴볼 수 있습니다.



## Cleaning up the `/dist` folder

이전 가이드 및 코드 예제를 통해 알게되었으므로 `/dist` 폴더가 복잡해졌습니다. Webpack은 파일을 생성하여 `/dist` 폴더에 넣지만 프로젝트에서 실제로 사용중인 파일은 추적하지 않습니다.

일반적으로 각 빌드 전에 `/dist` 폴더를 지우는 것이 좋으므로 사용 된 파일만 생성됩니다. 그것을 돌러봅시다.

이것을 관리하는 인기있는 플러그인은 [`clean-webpack-plugin`](https://www.npmjs.com/package/clean-webpack-plugin)이므로 설치하고 구성하십시오.


``` bash
npm install --save-dev clean-webpack-plugin
```

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
  Â  Â  Â  title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Now run an `npm run build` and inspect the `/dist` folder. If everything went well you should now only see the files generated from the build and no more old files!
이제 `npm run build`를 실행하고  `/dist` 폴더를 검사하십시오. 모든 것이 잘 되었다면 이제 빌드에서 생성된 파일만 볼 수 있고 더 이상 오래된 파일은 보이지 않습니다!


## The Manifest

webpack과 그 플러그인이 생성되는 파일을 "알 수있는"것처럼 보이는지 궁금 할 것입니다. 대답은 webpack이 모든 모듈이 출력 번들에 매핑되는 방식을 추적 할 수 있음을 나타내는 것입니다. 다른 방법으로 웹팩의 [`output`](../configuration/output)을 관리하려는 경우 매니페스트를 시작하는 것이 좋습니다.

manifest 데이터는 [`WebpackManifestPlugin`](https://github.com/danethurber/webpack-manifest-plugin)을 사용하여 쉽게 소비 할 수 있도록 json 파일로 추출 할 수 있습니다.

프로젝트 내에서이 플러그인을 사용하는 방법에 대한 완전한 예는 다루지 않겠지만 [개념 페이지와](../concepts/manifest) [캐싱 가이드](caching)에서 장기 캐싱과의 관계를 확인하는 방법을 살펴볼 수 있습니다.




## Conclusion

이제 번들을 HTML에 동적으로 추가하는 방법을 배웠으므로 [개발 가이드](development)로 넘어 가자. 또는 고급 주제를 파고 싶다면 [코드 분할 안내서](code-splitting)로 이동하는 것이 좋습니다.

