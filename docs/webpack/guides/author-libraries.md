# Authoring Libraries

Aside from applications, webpack can also be used to bundle JavaScript libraries. The following guide is meant for library authors looking to streamline their bundling strategy.
응용 프로그램을 제외하고 webpack은 JavaScript 라이브러리를 묶는 데 사용될 수도 있습니다. 다음 가이드는 번들링 전략을 간소화 하려는 라이브러리 제작자를 위한 것입니다.

## Authoring a Library

여러분이 작은 라이브러리 `webpack-numbers`를 작성한다고 가정 해 보겠습니다. 이 라이브러리는 사용자가 숫자 표현에서 텍스트 표현으로 변환 할 수 있도록 해줍니다. 예를들어 2에서 'two'.

기본 프로젝트 구조는 다음과 같습니다:

__project__

``` diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

npm 초기화, webpack 및 lodash 설치:

``` bash
npm init -y
npm install --save-dev webpack lodash
```

__src/ref.json__

```json
[
  {
    "num": 1,
    "word": "One"
  },
  {
    "num": 2,
    "word": "Two"
  },
  {
    "num": 3,
    "word": "Three"
  },
  {
    "num": 4,
    "word": "Four"
  },
  {
    "num": 5,
    "word": "Five"
  },
  {
    "num": 0,
    "word": "Zero"
  }
]
```

__src/index.js__

``` js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
}

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
}
```

라이브러리 사용에 대한 사용 스펙은 다음과 같습니다.

- __ES2015 module import:__

``` js
import * as webpackNumbers from 'webpack-numbers';
// ...
webpackNumbers.wordToNum('Two');
```

- __CommonJS module require:__

``` js
const webpackNumbers = require('webpack-numbers');
// ...
webpackNumbers.wordToNum('Two');
```

- __AMD module require:__

``` js
require(['webpackNumbers'], function (webpackNumbers) {
  // ...
  webpackNumbers.wordToNum('Two');
});
```

또한 우리는 스크립트 태그를 통해 라이브러리를 로드하여 라이브러리를 사용할 수 있습니다:

``` html
<!doctype html>
<html>
  ...
  <script src="https://unpkg.com/webpack-numbers"></script>
  <script>
    // ...
    // Global variable
    webpackNumbers.wordToNum('Five')
    // Property in the window object
    window.webpackNumbers.wordToNum('Five')
    // ...
  </script>
</html>
```


다음과 같은 방법으로 라이브러리를 노출하도록 구성 할 수도 있습니다.

- 노드에 대한 전역 개체의 속성입니다.
- `this` 객체의 속성.


전체 라이브러리 구성 및 코드는 [webpack-library-example](https://github.com/kalcifer/webpack-library-example)을 참조하십시오.



## Base Configuration

이제 이 라이브러리를 다음과 같은 목표를 달성하는 방식인 번들로 묶어 보겠습니다.

- `lodash` 번들을 피하기 위해 `externals` 을 사용하므로 그것을 로드해야 합니다.
- 라이브러리 이름을 `webpack-numbers` 로 설정.
- 라이브러리를 `webpackNumbers` 라는 변수로 요청합니다.
- Node.js 내의 라이브러리에 액세스 할 수 있어야 합니다.

또한 우리는 다음과 같은 방법으로 라이브러리에 액세스 할 수 있어야합니다.

- ES2015 모듈. 즉, `'webpack-numbers' 에서 webpackNumbers를 가져옵니다.`
- CommonJS 모듈. 즉 `require('webpack-numbers')`를 사용합니다.
-`script` 태그를 통해 포함될 때 전역 변수.

이 기본 웹팩 구성으로 시작할 수 있습니다:

__webpack.config.js__

``` js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js'
  }
};
```


## Externalize Lodash

이제 `webpack`을 실행하면 큰 번들이 생성된다는 것을 알 수 있습니다. 파일을 검사하면 lodash가 코드와 함께 번들 된 것을 볼 수 있습니다.
이 경우 `lodash` 를 `peerDependency` 로 취급하는 것을 선호합니다.
소비자가 이미 `lodash` 를 설치해야 함을 의미합니다. 따라서 이 외부 라이브러리에 대한 제어권을 라이브러리 사용자에게 포기할 수 있습니다.

이것은`externals` 설정을 사용하여 할 수 있습니다:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js'
-   }
+   },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_'
+     }
+   }
  };
```

이것은 당신의 라이브러리가 `lodash`라는 의존성이 우리 환경에서 사용 가능할 것으로 기대한다는 것을 의미합니다.

> 라이브러리를 다른 webpack 번들의 종속물로만 사용할 계획이라면 `externals`을 배열로 지정할 수 있습니다.



## External Limitations

종속성에서 여러 파일을 사용하는 라이브러리의 경우 :

``` js
import A from 'library/one';
import B from 'library/two';

// ...
```

외부에서 `library` 를 지정하여 번들에서 제외 할 수 없습니다. 하나씩 또는 정규식을 사용하여 제외해야 합니다.


``` js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // "library/"로 시작하는 모든 것
    /^library\/.+$/
  ]
};
```


## Expose the Library

라이브러리를 광범위하게 사용하려면 CommonJS, AMD, Node.js와 같은 다른 환경에서 그리고 전역 변수로 호환되기를 바랍니다. 라이브러리를 사용할 수있게 만들려면 `output` 안에 `library` 속성을 추가하십시오:


__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
-     filename: 'webpack-numbers.js'
+     filename: 'webpack-numbers.js',
+     library: 'webpackNumbers'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

> `library` 설정은 `entry` 설정과 관련이 있습니다. 대부분의 라이브러리에서는 단일 진입 점을 지정하는 것으로 충분합니다. [multi-part libraries](https://github.com/webpack/webpack/tree/master/examples/multi-part-library)는 가능하지만 [index script](https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file)를 통해 부분 내보내기를 노출하는 것이 더 간단합니다. 라이브러리의 `entry` 포인트로서 `array`를 사용하는 것은 __권장하지 않음__ 입니다.

그러면 라이브러리 번들을 가져올 때 `webpackNumbers` 라는 전역 변수로 사용할 수 있습니다. 다른 환경과 호환되도록 라이브러리에 `libraryTarget` 속성을 추가하십시오.
그러면 라이브러리가 노출 될 수 있는 방법에 대한 다양한 옵션이 추가됩니다.


__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
-     library: 'webpackNumbers'
+     library: 'webpackNumbers',
+     libraryTarget: 'umd'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```


다음과 같은 방법으로 라이브러리를 노출 할 수 있습니다.

- 변수: `script` 태그 (`libraryTarget:'var'`)에 의해 사용 가능한 전역 변수입니다.
- This : `this` 객체 (`libraryTarget:'this'`)를 통해 사용할 수 있습니다.
- Window : 브라우저에서 `window` 객체 (`libraryTarget:'window'`)를 통해 사용할 수 있습니다.
- UMD : AMD 또는 CommonJS 에서 `require` (`libraryTarget:'umd'`) 를 사용 가능합니다.


`library`가 설정되고 `libraryTarget` 이 아닌 경우, `libraryTarget`의 기본값은 [output configuration documentation](/configuration/output)에 지정된대로 `var`입니다. 
사용 가능한 모든 옵션에 대한 자세한 목록은 [`output.libraryTarget`](/configuration/output#outputlibrarytarget)을 참조하십시오.

> webpack 3.5.5에서 `libraryTarget: { root:'_' }` 을 사용하면 [issue 4824](https://github.com/webpack/webpack/issues/4824)에 명시된대로 제대로 작동하지 않습니다. 그러나 `libraryTarget: { var: '_' }`을 설정하여 라이브러리를 전역 변수로 사용할 수 있습니다.




### Final Steps


[production guide](/guides/production)의 단계에 따라 프로덕션 출력을 최적화하십시오. 생성된 번들에 대한 경로를 `main` 필드로 `package.json`에 추가하십시오


__package.json__

``` json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

또는 [이 안내서](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)에 따라 표준 모듈로 추가하십시오.

``` json
{
  ...
  "module": "src/index.js",
  ...
}
```

`main` 키는 [`package.json`의 표준](https://docs.npmjs.com/files/package.json#main)을 의미하고, `module`을 [a](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md) [proposal](https://github.com/rollup/rollup/wiki/pkg.module) JavaScript 생태계 업그레이드를 허용하려면 역호환성을 없애지 않고 ES2015 모듈을 사용합니다.


W> `module` 속성은 ES2015 모듈 구문을 사용하지만 브라우저나 노드에서 아직 지원하지 않는 다른 구문 기능은 사용하지 않는 스크립트를 가리켜야합니다. 이렇게하면 webpack이 모듈 구문 자체를 분석 할 수 있으므로 사용자가 라이브러리의 특정 부분만 사용하는 경우 [tree shaking](https://webpack.js.org/guides/tree-shaking/)을 통해 더 가벼운 번들을 사용할 수 있습니다.

이제 [npm 패키지로 게시](https://docs.npmjs.com/getting-started/publishing-npm-packages)하고 [unpkg.com](https://unpkg.com/#/)에서 검색하여 사용자에게 배포 할 수 있습니다.

T> 라이브러리와 관련된 스타일시트를 노출하려면 [`MiniCssExtractPlugin`](/plugins/mini-css-extract-plugin)을 사용해야합니다. 사용자는 다른 스타일시트처럼 사용하고 로드 할 수 있습니다.


<br>
