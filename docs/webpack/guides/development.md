# Development

> 본 가이드는 [Output Management](/guides/output-management) 가이드에 수록된 코드 예를 자세히 설명한다.

만약 당신이 가이드를 따라왔다면, 당신은 웹팩의 기본에 대해 확실히 이해해야 한다. 계속하기 전에, 우리의 삶을 조금 더 편하게 만들 수 있는 개발 환경을 설정하는 것을 살펴보자.


!!! info 
    본 안내서의 도구는 개발 목적으로만 사용되므로 생산 시 사용하지 마십시오!


진행하기 전에 먼저 [`mode`를 `'development'`(/configuration/mode/#mode-development)로 설정하십시오.


__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
+   mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

## Using source maps

웹팩이 당신의 소스 코드를 번들로 묶을 때, 그것의 원래 위치로 오류와 경고를 추적하는 것은 어려워질 수 있다. 예를 들어 원본 파일 3개(`a.js`, `b.js`, `c.js`)를 하나의 번들(`bundle.js`)로 묶고 원본 파일 중 하나에 오류가 있으면 스택 추적은 단순히 `bundle.js`를 가리키게 된다. 오류가 발생한 원본 파일을 정확히 알고 싶을 때 항상 도움이 되는 것은 아니다.

오류와 경고를 쉽게 추적하기 위해, 자바스크립트는 컴파일된 코드를 다시 원본 코드로 매핑하는 [source maps](http://blog.teamtreehouse.com/introduction-source-maps)을 제공한다. 만약 `b.js`에서 오류가 발생하면, 출처 맵에서 정확히 그 사실을 알 수 있을 것이다.

소스 맵에 관해서는 [다양한 옵션](/configuration/devtool)을 많이 이용할 수 있다. 필요에 맞게 구성할 수 있도록 반드시 체크아웃하십시오.

본 안내서의 경우, 설명에 적합한 `inline-source-map` 옵션을 사용해 보십시오(프로덕션은 아니지만).




__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

이제 디버깅할 것이 있는지 확인하자. 그러면 `print.js` 파일에 오류를 생성하자.

__src/print.js__

``` diff
  export default function printMe() {
-   console.log('I get called from print.js!');
+   cosnole.log('I get called from print.js!');
  }
```

`npm run build`를 실행하면 다음과 같이 컴파일해야 한다.

``` bash
...
          Asset       Size  Chunks                    Chunk Names
  app.bundle.js    1.44 MB    0, 1  [emitted]  [big]  app
print.bundle.js    6.43 kB       1  [emitted]         print
     index.html  248 bytes          [emitted]
...
```

이제 브라우저에서 `index.html` 파일을 여십시오. 버튼을 클릭하고 오류가 표시되는 콘솔을 확인하십시오. 오류는 다음과 같은 것을 말해준다.

 ``` bash
 Uncaught ReferenceError: cosnole is not defined
    at HTMLButtonElement.printMe (print.js:2)
 ```

오류에는 오류가 발생한 파일(`print.js`)과 라인 번호(2)에 대한 참조도 포함되어 있음을 알 수 있다. 이것은 훌륭하다. 왜냐하면 이제 우리는 그 문제를 해결하기 위해 정확히 어디를 보아야 할지를 알고 있기 때문이다.




## Choosing a Development Tool

> 일부 텍스트 편집기에는 다음과 같은 도구 중 일부를 방해할 수 있는 "안전한 쓰기" 기능이 있다. 이러한 문제에 대한 해결 방법은 [Adjusting Your text Editor](#adjusting-your-text-editor)를 참조하십시오.

코드를 컴파일하고 싶을 때마다 `npm run build`를 수동으로 실행해야 하는 번거로움이 생긴다.

웹 팩에는 변경될 때마다 코드를 자동으로 컴파일하는 데 도움이 되는 몇 가지 다른 옵션이 있다.

 1. webpack's Watch Mode
 2. webpack-dev-server
 3. webpack-dev-middleware

대부분의 경우 `webpack-dev-server`를 사용하고 싶을 것이다. 그러나 위의 모든 옵션을 살펴보기로 하자.

### Using Watch Mode

당신은 Webpack에 당신의 의존성 그래프 내의 모든 파일을 "watch"하도록 지시할 수 있다. 이러한 파일 중 하나가 업데이트되면 전체 빌드를 수동으로 실행할 필요가 없도록 코드가 다시 컴파일된다.

webpack의 watch mode를 시작할 npm 스크립트를 추가하자.


__package.json__

``` diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^2.0.0",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^4.30.0",
      "xml-loader": "^1.2.1"
    }
  }
```

이제 명령줄에서 `npm run watch`를 실행하여 웹팩이 어떻게 코드를 컴파일하는지 확인하십시오.
스크립트가 현재 파일을 보고 있기 때문에 명령줄을 종료하지 않는다는 것을 알 수 있다.

이제 Webpack이 파일을 보는 동안 앞에서 소개한 오류를 제거해 봅시다.


__src/print.js__

``` diff
  export default function printMe() {
-   cosnole.log('I get called from print.js!');
+   console.log('I get called from print.js!');
  }
```

이제 파일을 저장하고 터미널 창을 확인하십시오. 변경된 모듈을 자동으로 다시 컴파일하는 웹팩을 확인하십시오!

유일한 단점은 변경사항을 보려면 브라우저를 새로 고쳐야 한다는 것이다. 그런 일이 자동적으로 일어난다면 훨씬 더 좋을 텐데, 바로 그런 일을 할 `webpack-dev-server`를 사용해 보자.



### Using webpack-dev-server

`webpack-dev-server`는 간단한 웹 서버와 라이브 리로드 기능을 제공한다. 설정하자:


``` bash
npm install --save-dev webpack-dev-server
```

구성 파일을 변경하여 dev 서버에 파일을 검색할 위치를 지정하십시오.

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

`localhost:8080`는 `webpack-dev-server`로 `dist` 디렉터리에 있는 파일을 처리하라는 것이다.

!!! warning
    `webpack-dev-server`는 컴파일 후 출력 파일을 작성하지 않는다. 대신 번들 파일을 메모리에 보관하고 서버의 루트 경로에 탑재된 실제 파일인 것처럼 서비스한다. 페이지가 다른 경로에서 번들 파일을 찾을 것으로 예상하는 경우, dev 서버의 구성에서 [`publicPath`](/configuration/dev-server/#devserver-publicpath-) 옵션을 사용하여 이 파일을 변경할 수 있다.

dev 서버도 쉽게 실행할 스크립트를 추가하십시오.


__package.json__

``` diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
+     "start": "webpack-dev-server --open",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^2.0.0",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^4.30.0",
      "xml-loader": "^1.2.1"
    }
  }
```

이제 명령줄에서 `npm start`를 실행할 수 있고, 자동으로 페이지가 로드되는 것을 볼 수 있다. 이제 원본 파일을 변경하고 저장하면 코드가 컴파일된 후 웹 서버가 자동으로 다시 로드된다. 한번 해 보세요!

`webpack-dev-server`는 구성 가능한 옵션이 많다. 자세한 내용을 보려면 [documentation](/configuration/dev-server)로 이동하십시오.

> 서버가 작동 중이므로 [Hot Module Replacement](/guides/hot-module-replacement)를 시도해 보십시오!





### Using webpack-dev-middleware

`webpack-dev-middleware`는 웹팩으로 처리된 파일을 서버로 내보내는 포장지다. 이는 내부적으로 `webpack-dev-server`에 사용되지만, 필요에 따라 맞춤 설정이 가능한 별도의 패키지로 이용할 수 있다. webpack-dev-middleware와 express 서버를 결합한 예를 살펴보겠다.

express와 webpack-dev-middleware를 설치하여 시작합니다.


``` bash
npm install --save-dev express webpack-dev-middleware
```

이제 미들웨어가 올바르게 작동하는지 확인하기 위해 웹 팩 구성 파일을 조정해야 한다.

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
+     publicPath: '/'
    }
  };
```

`publicPath`는 `http://localhost:3000` 에서 파일이 올바르게 제공되도록 하기 위해 서버 스크립트 내에서 사용될 것이다. 포트 번호는 나중에 명시해 두겠다. 다음 단계는 사용자 정의 `express` 서버를 설정하는 것이다.


__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
+ |- server.js
  |- /dist
  |- /src
    |- index.js
    |- print.js
  |- /node_modules
```

__server.js__

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// webpack-dev-middleware를 사용하고 webpack.config.js 구성 파일을 기본으로 사용하도록 Express에 지시하십시오.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

이제 npm 스크립트를 추가하여 서버를 좀 더 쉽게 실행하십시오.

__package.json__

``` diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --open",
+     "server": "node server.js",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^2.0.0",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "express": "^4.15.3",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^4.30.0",
      "webpack-dev-middleware": "^1.12.0",
      "xml-loader": "^1.2.1"
    }
  }
```

이제 터미널에서 `npm run server`를 실행하면 다음과 유사한 출력을 얻을 수 있다.

``` bash
Example app listening on port 3000!
...
          Asset       Size  Chunks                    Chunk Names
  app.bundle.js    1.44 MB    0, 1  [emitted]  [big]  app
print.bundle.js    6.57 kB       1  [emitted]         print
     index.html  306 bytes          [emitted]
...
webpack: Compiled successfully.
```

이제 브라우저를 열고 `http://localhost:3000` 으로 이동하십시오. 웹 팩 앱이 실행되고 작동하는 것을 볼 수 있다!

> 핫 모듈 교체 방법에 대해 자세히 알고 싶으시면 [Hot Module Replacement](/guides/hot-module-replacement/) 가이드를 읽어보십시오.




## Adjusting Your Text Editor

코드의 자동 컴파일을 사용할 때 파일을 저장할 때 문제가 발생할 수 있다. 일부 편집자들은 잠재적으로 재컴파일을 방해할 수 있는 "안전한 쓰기" 기능을 가지고 있다.

일부 일반 편집기에서 이 기능을 사용하지 않도록 설정하려면 아래 목록을 참조하십시오.


- __Sublime Text 3__: 사용자 기본 설정에 `atomic_save: 'false'` 를 추가하십시오.
- __JetBrains IDEs (e.g. WebStorm)__: `Preferences > Appearance & Behavior > System Settings` "안전한 쓰기 사용(Use safe write)"을 선택 해제한다.
- __Vim__: 설정에 `:set backupcopy=yes` 를 추가하십시오.


## Conclusion

이제 코드를 자동으로 컴파일하고 간단한 개발 서버를 실행하는 방법을 배웠으니, [Hot Module Replacement](/guides/hot-module-replacement)에 대해 다룰 다음 가이드를 확인해 보십시오.

<br>