# Getting Started


Webpack은 JavaScript 모듈을 컴파일하는 데 사용된다. [installed](/guides/installation) 후에는 [CLI](/api/cli) 또는 [API](/api/node)에서 Webpack과 접속할 수 있다. 
아직 웹 팩을 처음 사용하는 경우 [핵심 개념](/concepts) 및 [이 비교](/comparison)를 읽고 커뮤니티에 나와 있는 다른 도구에서 웹 팩을 사용할 수 있는 이유를 알아보십시오.

## Basic Setup

먼저 디렉토리를 만들고, npm을 초기화하며, [webpack local 설치](/guides/installation#local-installation)를 설치하고, webpack-cli(명령줄에서 webpack을 실행하는 데 사용되는 도구)를 설치하자.


``` bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

> 안내서 전체에서 `diff` 블록을 사용하여 디렉토리, 파일 및 코드에 어떤 변화를 주고 있는지 보여줄 것이다.

이제 다음 디렉터리 구조, 파일 및 해당 내용을 생성하십시오.


__project__

``` diff
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

__src/index.js__

``` javascript
function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

__index.html__

``` html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

`package.json` 파일은 우리가 우리의 패키지를 `private`으로 표시하고 `main` 항목을 제거하기 위해서입니다. 
이것은 당신의 코드를 실수로 게시하는 것을 막기 위한 것이다.

> `package.json`에 대해서 자세히 알고 싶다면 [npm documentation](https://docs.npmjs.com/files/package.json)을 읽는 것을 추천한다.



__package.json__

``` diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,
-   "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {}
  }
```

이 예에서 `<script>` 태그 사이에는 암묵적인 의존성이 있다. 
우리의 `index.js` 파일은 `lodash`가 실행되기 전에 페이지에 포함되느냐에 달려 있다.

`index.js`가 `lodash` 필요성을 명시적으로 선언한 적이 없기 때문에 글로벌 변수 `_`가 존재한다고만 가정하기 때문이다. 

이러한 방식으로 JavaScript 프로젝트를 관리하는 데 문제가 있다:

- 스크립트가 외부 라이브러리에 따라 달라지는 것은 바로 알 수 없다.
- 종속성이 없거나 잘못된 순서에 포함된 경우, 응용프로그램이 제대로 작동하지 않는다.
- 종속성이 포함되지만 사용되지 않을 경우, 브라우저는 불필요한 코드를 다운로드하지 않을 수 없게 된다.

대신 Webpack을 사용하여 이 스크립트를 관리해 봅시다.



## Creating a Bundle

먼저 "source" 코드 (`/src`)와 "distribution" 코드 (`/dist`)를 구분하여 디렉터리 구조를 약간 수정한다. 
"source" 코드는 우리가 쓰고 편집할 코드다. 
"distribution" 코드는 우리의 빌드 프로세스의 최소화되고 최적화된 `output`이며, 최종적으로는 브라우저에 로딩될 것이다.


__project__

``` diff
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```


`lodash` 의존성을 `index.js`와 결합시키려면 다음과 같이 라이브러리를 로컬에 설치해야 한다.

``` bash
npm install --save lodash
```

> 생산 번들에 번들할 패키지를 설치할 때는 `npm install --save`를 사용해야 한다. 
  개발 목적으로 패키지를 설치하는 경우(예: linter, 테스트 라이브러리 등) `npm install --save-dev`를 사용하십시오. 
  자세한 내용은 [npm documentation](https://docs.npmjs.com/cli/install)에서 확인할 수 있다.


이제 script에서 `lodash`를 가져오자.

__src/index.js__

``` diff
+ import _ from 'lodash';
+
  function component() {
    const element = document.createElement('div');

-   // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

이제 scripts을 묶을 예정이니 `index.html` 파일을 업데이트해야 한다. 지금 `import`하고 있는 것처럼 lodash `<script>`를 제거하고, 다른 `<script>` 태그를 수정하여 원시 파일 `/src`가 아닌 묶음을 로딩하도록 하자.


__dist/index.html__

``` diff
  <!doctype html>
  <html>
   <head>
     <title>Getting Started</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="main.js"></script>
   </body>
  </html>
```

이 설정에서`index.js` 는 `lodash`가 존재하도록 명시적으로 요구하고 있으며 이를 `_`로 묶는다(글로벌 범위 오염 없음).
모듈에 필요한 종속성을 명시함으로써, 웹팩은 종속성 그래프를 작성하기 위해 이 정보를 사용할 수 있다. 
그런 다음 그래프를 사용하여 스크립트가 올바른 순서로 실행되는 최적화된 번들을 생성한다.

즉, `src/index.js`에서 대본을 [entry point](/concepts/entry-points)로 삼고, `dist/main.js`를 [output](/concepts/output)로 생성하는 `npx webpack`을 실행해 보자. 
노드 8.2/npm 5.2.0 이상에서 실행되는 `npx` 명령은 처음에 설치한 웹팩 패키지의 웹팩 바이너리 (`./node_modules/.bin/webpack`)를 실행한다.


``` bash
npx webpack

...
Built at: 13/06/2018 11:52:07
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

> 당신의 출력물은 약간 다를 수 있지만, 빌드가 성공한다면, 당신은 진행하는 것이 좋다. 또한, 경고에 대해 걱정하지 마라. 우리는 나중에 그것에 대해 논의할 것이다.

브라우저에서 `index.html`을 열고 모든 것이 제대로 된 경우 다음 텍스트인 'Hello Webpack'을 확인하십시오.



## Modules

[`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 및 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) 문장이 [ES2015](https://babeljs.io/docs/en/learn/)에서 표준화되었다. 
아직 대부분의 브라우저에서 지원되지 않지만, 웹팩은 그것을 즉시 지원한다.

그 이면에는 웹팩이 실제로 코드를 "트랜스파일"하여 오래된 브라우저들도 코드를 실행할 수 있도록 한다. 
만약 당신이 `dist/main.js`를 검사한다면, 당신은 웹팩이 어떻게 이런 일을 하는지 볼 수 있을 것이다. 그것은 꽤 기발한 것이다! 웹팩은 `import`과 `export` 외에도 다양한 모듈 구문도 지원한다. 자세한 내용은 [Module API](/api/module-methods)를 참조하십시오.

webpack은 `import`과 `export` 문구 이외의 다른 코드는 변경하지 않는다는 점에 유의한다. 
다른 [ES2015 features](http://es6-features.org/)를 사용하는 경우 [Babel](https://babeljs.io/) 또는 [Bublé](https://buble.surge.sh/guide/)와 같은 Webpack의 [loader system](/concepts/loaders/)나 [use a transpiler](/loaders/#transpiling)를 사용하십시오.



## Using a Configuration

버전 4를 기준으로 웹팩은 구성이 필요하지 않지만, 대부분의 프로젝트에는 보다 복잡한 설정이 필요하기 때문에 웹팩은 [configuration file](/concepts/configuration)을 지원한다. 이 방법은 터미널에서 많은 명령을 수동으로 입력해야 하는 것보다 훨씬 효율적이므로, 다음 명령을 생성해 봅시다.


__project__

``` diff
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

__webpack.config.js__

``` javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

이제 빌드를 다시 실행하고 대신 새 구성 파일을 사용합시다.

``` bash
npx webpack --config webpack.config.js

...
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

> `webpack.config.js`가 있으면 `webpack` 명령이 기본적으로 그것을 선택한다. 여기서는 `--config` 옵션을 사용하여 모든 이름의 구성을 전달할 수 있음을 보여 준다. 이것은 여러 파일로 분할해야 하는 더 복잡한 구성에 유용할 것이다.

구성 파일은 단순한 CLI 사용량보다 훨씬 더 많은 유연성을 제공한다. 우리는 로더 규칙, 플러그인, 해결 옵션 및 많은 다른 개선 사항들을 이런 식으로 지정할 수 있다. 자세한 내용은 [구성 문서](/configuration)을 참조하십시오.




## NPM Scripts

CLI에서 웹팩의 로컬 사본을 실행하는 것이 특별히 즐겁지 않은 것을 감안하면, 우리는 약간 쉽게 설정할 수 있다. 

[npm script](https://docs.npmjs.com/misc/scripts)를 추가하여 _package.json_ 의 조정하자.


__package.json__

``` diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
    "scripts": {
-      "test": "echo \"Error: no test specified\" && exit 1"
+      "test": "echo \"Error: no test specified\" && exit 1",
+      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {
      "lodash": "^4.17.5"
    }
  }
```

이제 앞서 사용했던 `npx` 명령 대신 `npm run build` 명령을 사용할 수 있게 됐다. 
`scripts`에서 우리는 `npx`와 동일한 이름으로 로컬로 설치된 npm 패키지를 참조할 수 있다. 
이 규칙은 모든 기여자가 동일한 공통 스크립트 집합(필요한 경우 각각 `--config`와 같은 플래그가 있는)을 사용할 수 있도록 하기 때문에 대부분의 npm 기반 프로젝트에서 표준이다.

이제 다음 명령을 실행하여 스크립트 별칭이 작동하는지 확인하십시오.


``` bash
npm run build

...
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/.
```

> 사용자 지정 매개변수는 `npm run build`과 매개변수(예: `npm run build -- --colors`) 사이에 두 개의 대시(dash)를 추가하여 웹팩에 전달할 수 있다.



## Conclusion

이제 기본 빌드를 함께 사용하게 되었으니 다음 안내서 [`Asset Management`](/guides/asset-management)로 이동하여 웹팩으로 이미지 및 글꼴과 같은 자산을 관리하는 방법을 알아보십시오. 이 때, 당신의 프로젝트는 다음과 같이 보여야 한다.


__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- main.js
  |- index.html
|- /src
  |- index.js
|- /node_modules
```


> npm 5를 사용하고 있다면 디렉터리에도 `package-lock.json` 파일이 있을 것이다.

웹팩의 디자인에 대해 자세히 알고 싶다면 [기본개념](/concepts)과 [구성](/configuration) 페이지를 확인하면 된다. 
또한, [API](/api) 섹션은 다양한 인터페이스 웹팩을 제공한다.

<br>