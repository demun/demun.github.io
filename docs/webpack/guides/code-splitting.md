# Code Splitting

> 본 가이드는 [Getting Started](/guides/getting-started) 및 [Output Management](/guides/output-management)에 제시된 예를 확장한다. 최소한 이 예제에 대해 잘 알고 있는지 확인하십시오.

코드 분할은 웹팩의 가장 매력적인 특징 중 하나이다. 이 기능은 당신이 당신의 코드를 다양한 번들로 나눌 수 있게 해주며, 그 번들은 온디맨드 또는 병렬로 로드될 수 있다. 더 작은 묶음을 달성하고 올바르게 사용할 경우 로드 시간에 큰 영향을 미칠 수 있는 리소스 로드 우선 순위를 제어하는 데 사용할 수 있다.

코드 분할에는 세 가지 일반적인 접근방식이 있다.

- 진입점(Entry Points) : [`entry`](/configuration/entry-context) 구성을 사용하여 수동으로 분할 코드
- 중복 방지(Prevent Duplication): [`SplitChunksPlugin`](/plugins/split-chunks-plugin/)을 사용하여 청크를 중복제거 및 분할하십시오.
- 동적 가져오기(Dynamic Imports): 모듈 내 인라인 기능 호출을 통해 코드 분할



## Entry Points

이것은 코드를 나누는 가장 쉽고 직관적인 방법이다. 그러나, 그것은 더 수동적이고 우리가 검토할 몇 가지 유의점이 있다. 다른 모듈을 기본 번들에서 어떻게 분리할 수 있는지 살펴봅시다.


__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- another-module.js
|- /node_modules
```

__another-module.js__

``` js
import _ from 'lodash';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
+   another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

이렇게 하면 다음과 같은 빌드 결과가 나온다.

``` bash
...
            Asset     Size   Chunks             Chunk Names
another.bundle.js  550 KiB  another  [emitted]  another
  index.bundle.js  550 KiB    index  [emitted]  index
Entrypoint index = index.bundle.js
Entrypoint another = another.bundle.js
...
```

언급했듯이, 이 접근에는 몇 가지 유의점이 있다.

- 입력 청크 사이에 중복된 모듈이 있을 경우 두 번 모두 포함됨
- 코어 애플리케이션 로직으로 코드를 동적으로 분할할 때 사용할 수 없는 유연성

`lodash` 역시 `./src/index.js` 내에서 가져오기 때문에 이 두 가지 점 중 첫 번째 점은 분명히 우리의 예시일 것이다. [`SplitChunksPlugin`](/plugins/split-chunks-plugin/)을 사용하여 이 중복을 제거하자.



## Prevent Duplication

[`SplitChunksPlugin`](/plugins/split-chunks-plugin/)는 공통의 의존성을 기존 입력 청크 또는 완전히 새로운 청크로 추출할 수 있게 해준다. 이를 사용하여 이전 예에서 `lodash` 종속성을 제거해 봅시다.

> 웹팩 v4 에서 부드럽게 어어서 `CommonsChunkPlugin`을 제거했다. 청크가 최신 버전에서 어떻게 처리되는지 알아보려면 [`SplitChunksPlugin`](/plugins/split-chunks-plugin/)을 확인하십시오.


__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   optimization: {
+     splitChunks: {
+       chunks: 'all'
+     }
+   }
  };
```

[`optimization.splitChunks`](/plugins/split-chunks-plugin/#optimization-splitchunks) 구성 옵션을 적용하면 이제 중복 의존성이 `index.bundle.js`와 `another.bundle.js`에서 제거되는 것을 볼 수 있다. 플러그인은 우리가 `lodash`를 따로 떼어낸 것을 알아채고, 주된 묶음에서 사용하지 않는 부분을 제거해야 한다. `npm run build`를 통해 제대로 작동하는지 확인해보자.


``` bash
...
                          Asset      Size                 Chunks             Chunk Names
              another.bundle.js  5.95 KiB                another  [emitted]  another
                index.bundle.js  5.89 KiB                  index  [emitted]  index
vendors~another~index.bundle.js   547 KiB  vendors~another~index  [emitted]  vendors~another~index
Entrypoint index = vendors~another~index.bundle.js index.bundle.js
Entrypoint another = vendors~another~index.bundle.js another.bundle.js
...
```

다음은 커뮤니티가 코드 분할을 위해 제공하는 몇 가지 유용한 플러그인과 로더 입니다.

- [`mini-css-extract-plugin`](/plugins/mini-css-extract-plugin): CSS를 주 애플리케이션에서 분리하는 데 유용하다.
- [`bundle-loader`](/loaders/bundle-loader): 코드를 분할하고 결과 번들을 여유롭게 로드하는 데 사용됨.
- [promise-loader](https://github.com/gaearon/promise-loader): `bundle-loader`와 비슷하지만 약속(promises)을 쓴다.





## Dynamic Imports

동적 코드 분할에 관한 한 웹팩에 의해 두 가지 유사한 기법이 지원된다. 첫 번째 및 권장 방법은 동적 가져오기에 [ECMAScript proposal](https://github.com/tc39/proposal-dynamic-import)을 준수하는  [`import()` syntax](/api/module-methods#import-1)을 사용하는 것이다. 기존의 웹팩 특유의 접근방식은 [`require.ensure`](/api/module-methods#requireensure)를 사용하는 것이다. 이 두 가지 방법 중 첫 번째 방법을 사용해 봅시다.

!!! warning
    `import()` 호출은 내부적으로 [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)을 사용한다. 이전 브라우저에서 `import()`를 사용할 경우 [es6-promise](https://github.com/stefanpenner/es6-promise) 또는 [promise-polyfill](https://github.com/taylorhakes/promise-polyfill)와 같은 폴리필을 사용하여 `Promise`를 표시하십시오.

시작하기 전에 다음 시연에 필요하지 않으므로 [`entry`](/concepts/entry-points/) 및 [`optimization.splitChunks`](/plugins/split-chunks-plugin)를 구성에서 제거하십시오.




__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
+     index: './src/index.js'
-     index: './src/index.js',
-     another: './src/another-module.js'
    },
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
-   optimization: {
-     splitChunks: {
-       chunks: 'all'
-     }
-   }
  };
```

비 엔트리 청크 파일의 이름을 결정하는 `chunkFilename`의 사용에 주목하십시오. `chunkFilename`에 대한 자세한 내용은 [output documentation](/configuration/output/#output-chunkfilename)를 참조하십시오. 또한 프로젝트도 업데이트하여 현재 사용하지 않는 파일을 제거하십시오.


__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
- |- another-module.js
|- /node_modules
```

이제 정적으로 `lodash`를 가져오는 대신 동적 가져오기를 사용하여 청크를 분리할 것이다.

__src/index.js__

``` diff
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   const element = document.createElement('div');
-
-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
+     const element = document.createElement('div');
+
+     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     return element;
+
+   }).catch(error => 'An error occurred while loading the component');
  }

- document.body.appendChild(component());
+ getComponent().then(component => {
+   document.body.appendChild(component);
+ })
```

`default`가 필요한 이유는 웹팩4 때부터 입니다.
CommonJS 모듈을 가져올때, 수입물량은 더 이상 `module.exports`의 값으로 해결되지 않고, 대신 commonJS 모듈을 위한 인공 네임스페이스 객체를 만들게 된다. 이에 대한 자세한 내용은 [webpack 4: import() and CommonJs](https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655)를 참조하십시오.

댓글에 `webpackChunkName`의 사용법을 기록해 두십시오. 이렇게 되면 우리의 별도 묶음은 `[id].bundle.js`가 아니라 `lodash.bundle.js`로 명명될 것이다.
`webpackChunkName` 및 기타 사용 가능한 옵션에 대한 자세한 내용은 [`import()` documentation](/api/module-methods#import-)를 참조하십시오. 웹팩을 실행하여 `lodash`를 별도의 번들로 구분해 봅시다.



``` bash
...
                   Asset      Size          Chunks             Chunk Names
         index.bundle.js  7.88 KiB           index  [emitted]  index
vendors~lodash.bundle.js   547 KiB  vendors~lodash  [emitted]  vendors~lodash
Entrypoint index = index.bundle.js
...
```

`import()`이 약속(promise)을 되돌리기 때문에 [`async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)와 함께 사용할 수 있다. 
단, 이를 위해서는 Babel과 [Syntax Dynamic Import Babel Plugin](https://babeljs.io/docs/plugins/syntax-dynamic-import/#installation)과 같은 사전 프로세서를 사용해야 한다. 코드를 단순화하는 방법은 다음과 같다.


__src/index.js__

``` diff
- function getComponent() {
+ async function getComponent() {
-   return import(/* webpackChunkName: "lodash" */ 'lodash').then({ default: _ } => {
-     const element = document.createElement('div');
-
-     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-
-     return element;
-
-   }).catch(error => 'An error occurred while loading the component');
+   const element = document.createElement('div');
+   const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
+
+   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+   return element;
  }

  getComponent().then(component => {
    document.body.appendChild(component);
  });
```


## Prefetching/Preloading modules

webpack 4.6.0+ 사전 설정 및 사전 로드 지원 추가.

가져오기를 선언하는 동안 이러한 인라인 지침을 사용하면 웹팩이 브라우저에 다음과 같은 내용을 알려주는 "리소스 힌트(Resource Hint)"를 출력할 수 있다.

- prefetch: 향후 일부 메뉴에는 리소스가 필요할 수 있음
- preload: 현재 탐색메뉴 중에 리소스가 필요할 수 있음

간단한 프리페치(prefetch) 예로는 `LoginButton` 구성 요소를 렌더링한 다음 클릭 후 `LoginModal` 구성 요소를 로드하는 `HomePage` 구성 요소를 들 수 있다.




__LoginButton.js__

```js
//...
import(/* webpackPrefetch: true */ 'LoginModal');
```

이에 따라 페이지 머리글에는 `<link rel="prefetch" href="login-modal-chunk.js">`가 추가되어 유휴 시간에는 브라우저가 `login-modal-chunk.js` 파일을 사전페치하도록 지시하게 된다.

> webpack은 부모 청크를 로드한 후 프리페치 힌트를 추가한다.

프리로드(Preload) 지침은 프리페치(prefetch)에 비해 여러 가지 차이가 있다.

- 사전 로드된 청크가 부모 청크와 병렬로 로드되기 시작함. 미리 피팅된 청크는 부모 청크가 로딩된 후에 시작된다.
- 사전 로드된 청크는 중간 우선순위를 가지며 즉시 다운로드된다. 브라우저가 유휴 상태일 때 미리 피팅된 청크가 다운로드된다.
- 사전 로드된 청크는 즉시 부모 청크로 요청되어야 한다. 미리 로드 청크는 나중에 언제든지 사용할 수 있다.
- 브라우저 지원은 다르다.

간단한 프리로드 예로는 항상 별도의 공간에 있어야 하는 대형 라이브러리에 의존하는 `Component`를 들 수 있다.

거대한 `ChartingLibrary`가 필요한 `ChartComponent`를 상상해 보자. `LoadingIndicator` 렌더링할 때 즉시 `ChartingLibrary`를 온디맨드 방식으로 가져오게 된다.



__ChartComponent.js__

```js
//...
import(/* webpackPreload: true */ 'ChartingLibrary');
```

`ChartComponent`를 사용하는 페이지가 요청되면 charting-library-chunk도 `<link rel="preload">`를 통해 요청한다. 
페이지 청크가 더 작고 더 빨리 끝난다고 가정하면, 페이지는 `LoadingIndicator`으로 표시된다.
이미 요청된 `charting-library-chunk`가 끝날 때까지. 이것은 두 번이 아니라 한 번 왕복만 필요로 하기 때문에 약간의 하중 시간을 증가시킬 것이다. 특히 대기 시간이 많은 환경에서는 더욱 그러하다.

> webpackPreload를 잘못 사용하면 실제로 성능이 저하될 수 있으므로 사용 시 주의하십시오.



## Bundle Analysis

일단 코드를 분할하기 시작하면, 출력을 분석하여 모듈들이 어디에서 끝나게 되었는지 확인하는 것이 유용할 수 있다. [official analyze tool](https://github.com/webpack/analyse)은 시작하기에 좋은 곳이다. 커뮤니티에서 지원하는 다른 옵션도 있다.

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): 웹 팩 통계를 위한 대화형 파이 차트.
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 번들을 시각화하고 분석하여 공간을 차지하는 모듈과 중복될 수 있는 모듈을 확인하십시오.
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): 번들 콘텐츠를 편리한 대화형 확대 가능한 트리맵으로 나타내는 플러그인 및 CLI 유틸리티.
- [webpack 번들 도우미 최적화](httpswewebpack. jakoblind.no/optimize): 이 도구는 당신의 번들을 분석하고 당신의 번들 크기를 줄이기 위해 개선해야 할 것에 대한 실행 가능한 제안을 당신에게 제공할 것이다.


## Next Steps

실제 응용 프로그램에서 `import()`를 사용할 수 있는 방법에 대한 보다 구체적인 예는 [Lazy Loading](/guides/lazy-loading/)과 [Caching](/guides/caching/)을 참조하십시오.


<br>

