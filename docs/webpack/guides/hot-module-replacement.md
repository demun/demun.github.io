# Hot Module Replacement

  <!-- - title: Concepts - Hot Module Replacement
    url: /concepts/hot-module-replacement
  - title: API - Hot Module Replacement
    url: /api/hot-module-replacement -->


T> 이 안내서는 [개발](development) 안내서에 있는 코드 예제를 확장합니다.

핫 모듈 교체 (또는 HMR)는 웹팩에서 제공하는 가장 유용한 기능 중 하나입니다. 모든 종류의 모듈을 완전히 새로 고칠 필요없이 런타임에 업데이트 할 수 있습니다. 이 페이지는 __구현__ 에 초점을 두는 반면 [개념 페이지](../concepts/hot-module-replacement)는 작동 방식 및 유용성에 대한 자세한 내용을 제공합니다.

Hot Module Replacement (or HMR) is one of the most useful features offered by webpack. It allows all kinds of modules to be updated at runtime without the need for a full refresh. This page focuses on __implementation__ while the [concepts page](/concepts/hot-module-replacement) gives more details on how it works and why it's useful.

W> __HMR__ 은 프로덕션 환경에서의 사용을 목적으로하지 않으므로 개발시에만 사용해야합니다. 자세한 내용은 [building for production guide](production)를 참조하십시오.


## Enabling HMR

이 기능은 생산성 향상에 유용합니다. 우리가 해야 할 일은 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 설정을 업데이트하고 webpack에 내장된 HMR 플러그인을 사용하는 것입니다. `print.js`의 엔트리 포인트는 `index.js` 모듈에 의해 소비되므로 제거할 것입니다.


T> `webpack-dev-server` 대신 `webpack-dev-middleware`를 사용하는 경우 [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) 패키지를 사용하여 사용자 지정 서버 또는 응용 프로그램에서 HMR을 활성화하십시오.

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
-      app: './src/index.js',
-      print: './src/print.js'
+      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

T> `webpack-dev-server --hotOnly` 명령으로 CLI를 사용하여 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 구성을 수정할 수 있습니다. 

이제 `index.js` 파일을 업데이트하여 `print.js` 내부의 변경이 감지되면 업데이트된 모듈을 수락하도록 webpack에 지시합니다.


__index.js__

``` diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

`print.js`에서 `console.log` 문을 변경하기 시작하면 브라우저 콘솔에 다음 출력이 표시됩니다 (단, `button.onclick = printMe` 출력에 대해 걱정하지 마십시오. 나중에 해당 부분도 업데이트 할 예정입니다).


__print.js__

``` diff
  export default function printMe() {
-   console.log('I get called from print.js!');
+   console.log('Updating print.js...')
  }
```

__console__

``` diff
[HMR] Waiting for update signal from WDS...
main.js:4395 [WDS] Hot Module Replacement enabled.
+ 2main.js:4395 [WDS] App updated. Recompiling...
+ main.js:4395 [WDS] App hot update...
+ main.js:4330 [HMR] Checking for updates on the server...
+ main.js:10024 Accepting the updated printMe module!
+ 0.4b8ee77….hot-update.js:10 Updating print.js...
+ main.js:4330 [HMR] Updated modules:
+ main.js:4330 [HMR]  - 20
```


## Via the Node.js API


Node.js API와 함께 Webpack Dev Server를 사용할 때 devpack 옵션을 webpack 구성 오브젝트에 두지 마십시오. 대신 생성시 두번째 매개 변수로 전달하십시오. 예 :

`new WebpackDevServer(compiler, options)`


HMR을 사용하려면 Webpack 구성 객체를 수정하여 HMR 진입점을 포함시켜야 합니다. `webpack-dev-server` 패키지에는 이를 수행하는데 사용할 수 있는 `addDevServerEntrypoints`라는 메소드가 포함되어 있습니다. 다음은 그 모습을 보여주는 작은 예입니다.


__dev-server.js__

``` javascript
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

T> [webpack-dev-middleware를 사용](development#using-webpack-dev-middleware)하는 경우 custompack 서버에서 HMR을 사용하도록 [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) 패키지를 확인하십시오. 


## Gotchas

핫 모듈 교체는 까다로울 수 있습니다. 이를 보여주기 위해 우리의 실제 사례로 돌아가 보자. 계속해서 예제 페이지에서 버튼을 클릭하면 콘솔이 이전 `printMe` 기능을 인쇄하고 있음을 알 수 있습니다.

버튼의 `onclick` 이벤트 핸들러가 여전히 원래 `printMe` 함수에 바인딩 되어 있기 때문에 이런 일이 발생합니다.

HMR에서 이 작업을 수행하려면 `module.hot.accept`를 사용하여 새 `printMe` 함수에 대한 바인딩을 업데이트 해야합니다.


__index.js__

``` diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
  }

- document.body.appendChild(component());
+ let element = component(); // Store the element to re-render on print.js changes
+ document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
-     printMe();
+     document.body.removeChild(element);
+     element = component(); // Re-render the "component" to update the click handler
+     document.body.appendChild(element);
    })
  }
```

이것은 하나의 예일 뿐이지 만 사람들을 쉽게 여행 할 수있는 다른 많은 것들이 있습니다. 다행히도 많은 모듈이 교체 될 수있는 많은 로더가 있습니다 (그 중 일부는 아래에 언급되어 있습니다).


## HMR with Stylesheets

CSS를 사용한 핫 모듈 교체는 실제로 `style-loader`를 사용하여 매우 간단합니다. 이 로더는 CSS 종속성이 업데이트 될 때 `<style>` 태그를 패치하기 위해 `module.hot.accept`를 사용합니다.

먼저 다음 명령을 사용하여 두 로더를 모두 설치하십시오.

```bash
npm install --save-dev style-loader css-loader
```

이제 구성 파일을 업데이트하여 로더를 사용하도록하겠습니다.

__webpack.config.js__

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: ['style-loader', 'css-loader']
+       }
+     ]
+   },
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

스타일시트를 핫 로딩하는 것은 모듈로 가져 오는 것 만큼 쉽습니다.

__project__

``` diff
  webpack-demo
  | - package.json
  | - webpack.config.js
  | - /dist
    | - bundle.js
  | - /src
    | - index.js
    | - print.js
+   | - styles.css
```

__styles.css__

``` css
body {
  background: blue;
}
```

__index.js__

``` diff
  import _ from 'lodash';
  import printMe from './print.js';
+ import './styles.css';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
  }

  let element = component();
  document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      document.body.removeChild(element);
      element = component(); // Re-render the "component" to update the click handler
      document.body.appendChild(element);
    })
  }

```

`body`의 스타일을 `background: red;` 배경으로 변경하십시오. 완전히 새로 고치지 않으면 페이지의 배경색이 즉시 변경됩니다.

__styles.css__

``` diff
  body {
-   background: blue;
+   background: red;
  }
```


## Other Code and Frameworks

HMR이 다양한 프레임 워크 및 라이브러리와 원활하게 상호 작용할 수 있도록 커뮤니티에 다른 로더와 예제가 많이 있습니다 ...

- [React Hot Loader](https://github.com/gaearon/react-hot-loader): Tweak react components in real time.
- [Vue Loader](https://github.com/vuejs/vue-loader): This loader supports HMR for vue components out of the box.
- [Elm Hot webpack Loader](https://github.com/klazuka/elm-hot-webpack-loader): Supports HMR for the Elm programming language.
- [Angular HMR](https://github.com/gdi2290/angular-hmr): No loader necessary! A simple change to your main NgModule file is all that's required to have full control over the HMR APIs.

T> 핫 모듈 교체를 돕거나 향상시키는 다른 로더 또는 플러그인을 알고 있다면이 목록에 추첨 요청을 제출하십시오!
