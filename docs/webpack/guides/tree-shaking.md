# Tree Shaking

_트리 셰이킹(Tree shaking)_ 은 데드 코드 제거를 위해 JavaScript 컨텍스트에서 일반적으로 사용되는 용어입니다. ES2015 모듈 구문의 [정적 구조](http://exploringjs.com/es6/ch_modules.html#static-module-structure), 즉 가져오기[`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 및 내보내기[`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)에 의존합니다. 이름과 개념은 ES2015 모듈 번들러 롤업[rollup](https://github.com/rollup/rollup)에 의해 대중화 되었습니다.

webpack 2 릴리스에는 ES2015 모듈 (별칭 하모니 모듈)과 미사용 모듈 내보내기 감지 기능이 내장되어 있습니다. 새로운 webpack 4 릴리스는 `package.json` 의 `"sideEffects"`  속성을 통해 컴파일러에 힌트를 제공하여 프로젝트에서 "순수한" 파일을 나타내므로 사용하지 않을 경우 정리할 수 있는 방법으로 이 기능을 확장합니다.


T> 이 안내서의 나머지 부분은 시작하기[Getting Started](getting-started)에서 나옵니다. 이 안내서를 아직 읽지 않았다면 지금 읽어보십시오.


## Add a Utility

두 가지 기능을 내보내는 새 유틸리티 파일인 `src/math.js` 를 프로젝트에 추가해 보겠습니다.

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
+ |- math.js
|- /node_modules
```

__src/math.js__

```javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

번들이 축소되지 않도록 `mode` 구성 옵션을 [development](../configuration/mode/#mode-development)로 설정하십시오.


__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ mode: 'development',
+ optimization: {
+   usedExports: true
+ }
};
```

그 자리에 입력 스크립트를 업데이트하여 다음과 같은 새로운 방법 중 하나를 활용하고 간단하게 `lodash`를 제거하겠습니다.

__src/index.js__

``` diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   const element = document.createElement('div');
+   const element = document.createElement('pre');

-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

`src/math.js` 모듈에서 `square` 메소드를 가져오지`import` 않았습니다. 이 기능은 "데드 코드"로 알려져 있으며 사용하지 않는 내보내기`export`는 삭제해야합니다. 이제 npm 스크립트, `npm run build`를 실행하고 출력 번들을 검사하겠습니다.


__dist/bundle.js (around lines 90 - 100)__

```js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  'use strict';
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube;
  function square(x) {
    return x * x;
  }

  function cube(x) {
    return x * x * x;
  }
});
```

위의 사용되지 않은 하모니 내보내기 사각형 주석에 유의하십시오. 아래 코드를 보면 정사각형`square`을 가져오지 않았지만 여전히 번들에 포함되어 있음을 알 수 있습니다. 다음 섹션에서 수정하겠습니다.



## Mark the file as side-effect-free

100% ESM 모듈 세계에서 부작용을 식별하는 것은 간단합니다. 그러나 우리는 아직 존재하지 않기 때문에 웹팩의 컴파일러에게 코드의 "순도"에 대한 힌트를 제공해야 합니다.

이것이 달성되는 방식은 package.json의 `"sideEffects"` 특성입니다.


```json
{
  "name": "your-project",
  "sideEffects": false
}
```

위에서 언급 한 모든 코드에는 부작용이 없으므로, 속성을 `false`로 표시하여 사용하지 않은 내보내기를 안전하게 제거 할 수 있음을 웹팩에 알릴 수 있습니다.

T> "부작용"은 가져올 때 하나 이상의 내보내기를 노출하는 것 외에 특별한 동작을 수행하는 코드로 정의됩니다. 이에 대한 예는 전역 범위에 영향을 미치며 일반적으로 내보내기를 제공하지 않는 폴리 필입니다.

코드에 부작용이 있다면 대신 배열을 제공 할 수 있습니다.

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}
```

배열은 관련 파일에 대한 상대, 절대 및 glob 패턴을 허용합니다. 후드 아래에서 [micromatch](https://github.com/micromatch/micromatch#matching-features)를 사용합니다.


T> 가져온 파일은 트리가 흔들릴 수 있습니다. 즉, 프로젝트에서 `css-loader`와 같은 것을 사용하고 CSS 파일을 가져 오는 경우 의도하지 않게 프로덕션 모드에서 삭제되지 않도록 부작용 목록에 추가해야합니다.

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

마지막으로 `"sideEffects"`는 [`module.rules` 구성 옵션](../configuration/module/#module-rules) 에서 설정할 수도 있습니다.


## Clarifying tree shaking and `sideEffects`

[`sideEffects`](/configuration/optimization/#optimizationsideeffects) 및 [`usedExports`](/configuration/optimization/#optimizationusedexports) (트리 쉐이킹이라고도 함) 최적화는 서로 다른 두 가지입니다.

`sideEffects`는 전체 모듈/파일과 전체 하위 트리를 건너 뛸 수 있으므로 훨씬 더 효과적입니다.

`usedExports`는 [terser](https://github.com/terser-js/terser)를 사용하여 명령문의 부작용을 감지합니다. JavaScript에서는 어려운 작업이며 straighforward `sideEffects` 플래그만큼 효과적이지 않습니다. 또한 사양에 따르면 부작용을 평가해야하므로 하위 트리/종속성을 건너 뛸 수 없습니다. 내보내기 기능이 제대로 작동하지만 React의 상위 구성 요소 (HOC)는 이와 관련하여 문제가 있습니다.

예를 들어 보자.


```javascript
import { Button } from '@shopify/polaris';
```

사전 번들 버전은 다음과 같습니다.

```javascript
import hoistStatics from 'hoist-non-react-statics';

function Button(_ref) {
  // ...
}

function merge() {
  var _final = {};

  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  for (var _i = 0, _objs = objs; _i < _objs.length; _i++) {
    var obj = _objs[_i];
    mergeRecursively(_final, obj);
  }

  return _final;
}

function withAppProvider() {
  return function addProvider(WrappedComponent) {
    var WithProvider =
    /*#__PURE__*/
    function (_React$Component) {
      // ...
      return WithProvider;
    }(Component);

    WithProvider.contextTypes = WrappedComponent.contextTypes ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes) : polarisAppProviderContextTypes;
    var FinalComponent = hoistStatics(WithProvider, WrappedComponent);
    return FinalComponent;
  };
}

var Button$1 = withAppProvider()(Button);

export {
  // ...,
  Button$1
};
```


`Button`을 사용하지 않으면 `export { Button$1 };`를 효과적으로 제거 할 수 있습니다. 나머지 코드는 모두 남습니다. 문제는 "이 코드에 부작용이 있거나 안전하게 제거 할 수 있습니까?"입니다. 특히 `withAppProvider()(Button)` 줄 때문에 말이 어렵습니다. `withAppProvider`가 호출되고 리턴 값도 호출됩니다. `merge` 또는 `hoistStatics`를 호출 할 때 부작용이 있습니까? 
`WithProvider.contextTypes` (Setter?)를 할당하거나`WrappedComponent.contextTypes` (Getter?)를 읽을 때 부작용이 있습니까?

Terser는 실제로 그것을 알아 내려고 시도하지만 많은 경우 확실하지 않습니다. 이것은 terser가 알아낼 수 없기 때문에 잘 작동하지 않는다는 것을 의미하지는 않습니다. JavaScript와 같은 동적 언어로 안정적으로 결정하기는 너무 어렵습니다.

그러나 `/*#__PURE__*/` 주석을 사용하여 terser를 도울 수 있습니다. 명령문을 부작용 없이 플래그합니다. 따라서 간단한 변경으로 코드를 트리 쉐이킹 할 수 있습니다.


`var Button$1 = /*#__PURE__*/ withAppProvider()(Button);`

이렇게 하면 이 코드 조각을 제거 할 수 있습니다. 그러나 수입에 부작용이 있을 수 있기 때문에 포함(included)/평가(evaluated)가 필요한 질문이 여전히 남아있다.

이를 해결하기 위해 `package.json`의 [`"sideEffects"`](tree-shaking/#mark-the-file-as-side-effect-free) 속성을 사용합니다.

`/*#__PURE__*/` 와 유사하지만 명령문 레벨 대신 모듈 레벨에 있습니다. (`"sideEffects"` property) : "no-sideEffects로 플래그가 지정된 모듈에서 직접 내보내기를 사용하지 않으면 번 들러가 부작용에 대한 모듈 평가를 건너 뛸 수 있습니다."

Shopify의 Polaris 예제에서 원래 모듈은 다음과 같습니다.


__index.js__

```javascript
import './configure';
export * from './types';
export * from './components';
```

__components/index.js__

```javascript
// ...
export { default as Breadcrumbs } from './Breadcrumbs';
export { default as Button, buttonFrom, buttonsFrom, } from './Button';
export { default as ButtonGroup } from './ButtonGroup';
// ...
```

__package.json__

```json
// ...
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
// ...
```

`import { Button } from "@shopify/polaris";` 이것은 다음과 같은 의미를 갖습니다:

- 포함 : 모듈 포함, 평가 및 종속성 분석 계속
- 건너 뛰기 : 포함하지 말고 평가하지 말고 종속성 분석을 계속하십시오.
- 제외 : 포함하지 말고 평가하지 말고 의존성을 분석하지 마십시오.

특히 일치하는 리소스별:

- `index.js`: 직접 내보내기는 사용되지 않지만 sideEffects -> include로 플래그가 지정되었습니다.
- `configure.js`: 내보내기가 사용되지 않지만 sideEffects -> include로 플래그가 지정되었습니다.
- `types/index.js`: 부작용이 표시되지 않은 내보내기가 사용되지 않습니다-> 제외
- `components/index.js`: 직접 내보내기는 사용되지 않고 sideEffects로 플래그 지정되지 않지만 다시 내보내기 된 내보내기는 사용됩니다-> 건너 뛰기
- `components/Breadcrumbs.js`: sideEffects-> 제외로 플래그가 지정되지 않은 내보내기가 사용되지 않습니다. 또한 sideEffects로 플래그를 지정하더라도 `components/Breadcrumbs.css`와 같은 모든 종속성을 제외했습니다.
- `components/Button.js`: sideEffects로 플래그가 지정되지 않은 직접 내보내기가 사용됩니다.
- `components/Button.css`: 내보내기가 사용되지 않지만 sideEffects-> include로 플래그가 지정되었습니다.

이 경우 번들에는 4 개의 모듈 만 포함됩니다.

- `index.js`: 비어 있음
- `configure.js`
- `components/Button.js`
- `components/Button.css`

이 최적화 후에도 다른 최적화가 계속 적용될 수 있습니다. 예를 들면 다음과 같습니다. 
`buttonFrom` 및 `buttonsFrom` 내보내기는 `Button.js`에서 사용되지 않습니다.
`usedExports` 최적화는 그것을 선택하고 terser는 모듈에서 일부 문장을 삭제할 수 있습니다.

모듈 연결도 적용됩니다. 따라서 이 4 개의 모듈과 입력 모듈 (및 더 많은 종속성)을 연결할 수 있습니다. `index.js`에는 결국 생성된 코드가 없습니다.


## Minify the Output

따라서 가져오기`import` 및 내보내기`export` 구문을 사용하여 "데드 코드"를 삭제하도록 요청했지만 여전히 번들에서 삭제해야합니다. 그렇게 하려면 `mode` 구성 옵션을 [`production`](/configuration/mode/#mode-production) 구성 옵션으로 설정하십시오.

So we've cued up our "dead code" to be dropped by using the `import` and `export` syntax, but we still need to drop it from the bundle. To do that set the `mode` configuration option to [`production`](/configuration/mode/#mode-production) configuration option.

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
- mode: 'development',
- optimization: {
-   usedExports: true
- }
+ mode: 'production'
};
```

T> Note that the `--optimize-minimize` flag can be used to enable `TerserPlugin` as well.

With that squared away, we can run another `npm run build` and see if anything has changed.

Notice anything different about `dist/bundle.js`? Clearly the whole bundle is now minified and mangled, but, if you look carefully, you won't see the `square` function included but will see a mangled version of the `cube` function (`function r(e){return e*e*e}n.a=r`). With minification and tree shaking our bundle is now a few bytes smaller! While that may not seem like much in this contrived example, tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees.

T> [ModuleConcatenationPlugin](/plugins/module-concatenation-plugin) is needed for the tree shaking to work. It is added by `mode: "production"`. If you are not using it, remember to add the [ModuleConcatenationPlugin](/plugins/module-concatenation-plugin) manually.

## Conclusion

So, what we've learned is that in order to take advantage of _tree shaking_, you must...

- Use ES2015 module syntax (i.e. `import` and `export`).
- Ensure no compilers transform your ES2015 module syntax into CommonJS modules (this is the default behavior of popular Babel preset @babel/preset-env - see [documentation](https://babeljs.io/docs/en/babel-preset-env#modules) for more details).
- Add a `"sideEffects"` property to your project's `package.json` file.
- Use [`production`](/configuration/mode/#mode-production) `mode` configuration option to enable [various optimizations](/configuration/mode/#usage) including minification and tree shaking.

You can imagine your application as a tree. The source code and libraries you actually use represent the green, living leaves of the tree. Dead code represents the brown, dead leaves of the tree that are consumed by autumn. In order to get rid of the dead leaves, you have to shake the tree, causing them to fall.

If you are interested in more ways to optimize your output, please jump to the next guide for details on building for [production](/guides/production).
