# Caching

> 본 가이드의 예는 [getting started](/guides/getting-started), [output management](/guides/output-management) 및 [code splitting](/guides/code-splitting)에서 비롯된다.

그래서 우리는 웹팩을 이용하여 모듈형 어플리케이션을 묶어서 배포 가능한 `/dist` 디렉토리를 만들고 있다. `/dist`의 내용이 서버에 배치되면 클라이언트(일반적으로 브라우저)가 해당 서버를 공격해 사이트와 자산을 확보하게 된다. 마지막 단계는 시간이 많이 소요될 수 있으며, 이것이 브라우저가 [caching](https://searchstorage.techtarget.com/definition/cache)이라는 기술을 사용하는 이유다. 이를 통해 불필요한 네트워크 트래픽이 줄어들어 사이트 로딩 속도가 빨라진다. 그러나, 그것은 또한 당신이 새로운 코드를 작성할 때 어려울 수 있다.

이 가이드는 웹팩 컴파일에 의해 생성되는 파일이 콘텐츠가 변경되지 않는 한 캐슁된 상태로 유지될 수 있도록 하는 데 필요한 구성에 초점을 맞추고 있다.



## Output Filenames

출력 파일 이름을 정의하는 데 `output.filename` [substitutions](/configuration/output#output-filename) 설정을 사용할 수 있다.
webpack은 대체자라는 대괄호로 묶은 문자열을 사용하여 파일 이름을 템플릿 화하는 방법을 제공합니다.
`[contenthash]` 대체를 통해 자산의 내용을 바탕으로 독특한 해시를 추가하게 된다. 자산의 내용이 바뀌면 `[contenthash]`도 바뀐다.

[output management](/guides/output-management)의`plugins`을 사용하여 [getting started](/guides/getting-started)의 예제를 사용하여 프로젝트를 설정하므로 `index.html` 파일을 수동으로 유지관리할 필요가 없다.


__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

__webpack.config.js__

``` diff
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
-       title: 'Output Management'
+       title: 'Caching'
      })
    ],
    output: {
-     filename: 'bundle.js',
+     filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

이 구성으로 `npm run build 빌드를 실행하면 다음과 같은 출력이 생성되어야 한다.

``` bash
...
                       Asset       Size  Chunks                    Chunk Names
main.7e2c49a622975ebd9b7e.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
...
```



보시다시피 번들의 이름은 이제 (해시를 통해) 내용을 반영한다. 변경하지 않고 다른 빌드를 실행하면 파일 이름이 그대로 유지됩니다. 그러나 다시 실행하려면 다음과 같은 경우가 있습니다.


``` bash
...
                       Asset       Size  Chunks                    Chunk Names
main.205199ab45963f6a62ec.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
...
```

이것은 웹팩이 특정 보일러 플레이트, 특히 런타임과 매니페스트를 엔트리 청크에 포함하기 때문이다.

> 현재 웹팩 버전에 따라 출력이 다를 수 있다. 최신 버전은 일부 이전 버전과 동일한 해싱 문제를 모두 가지고 있지는 않을 수 있지만, 다음 단계를 수행하여 안전할 것을 권고한다.


## Extracting Boilerplate

[code splitting](/guides/code-splitting)에서 학습한 바와 같이 [`SplitChunksPlugin`](/plugins/split-chunks-plugin/)은 모듈을 별도의 번들로 분할하는 데 사용할 수 있다.
웹팩은 [`optimization.runtimeChunk`](/configuration/optimization/#optimization-runtimechunk) 옵션을 사용하여 런타임 코드를 별도의 청크로 분할하는 최적화 기능을 제공합니다. 모든 청크에 대해 하나의 런타임 번들을 생성하려면`single`로 설정하십시오 :


__webpack.config.js__

``` diff
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      })
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
+   optimization: {
+     runtimeChunk: 'single'
+   }
  };
```

추출된 `runtime` 번들을 보려면 다른 빌드를 실행하십시오.

``` bash
Hash: 82c9c385607b2150fab2
Version: webpack 4.12.0
Time: 3027ms
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
   main.e81de2cf758ada72f306.js   69.5 KiB       1  [emitted]  main
                     index.html  275 bytes          [emitted]
[1] (webpack)/buildin/module.js 497 bytes {1} [built]
[2] (webpack)/buildin/global.js 489 bytes {1} [built]
[3] ./src/index.js 309 bytes {1} [built]
    + 1 hidden module
```

`lodash` 나`react`와 같은 써드 파티 라이브러리를 로컬 소스 코드보다 변경 가능성이 적은 별도의 `vendor` 청크로 추출하는 것도 좋은 습관입니다. 이 단계를 통해 클라이언트는 서버에 최신 정보를 요청할 수 있습니다.

이것은 [SplitChunksPlugin 예제](/plugins/split-chunks-plugin/#split-chunks-example-2)에 나와있는 [`SplitChunksPlugin`](/plugins/split-chunks-plugin/)의 [`cacheGroups`](/plugins/split-chunks-plugin/#splitchunks-cachegroups) 옵션을 사용하여 수행 할 수 있습니다. `optimizations.splitChunks` 와 `cacheGroups`을 다음 params와 build에 추가합니다.



__webpack.config.js__

``` diff
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
-     runtimeChunk: 'single'
+     runtimeChunk: 'single',
+     splitChunks: {
+       cacheGroups: {
+         vendor: {
+           test: /[\\/]node_modules[\\/]/,
+           name: 'vendors',
+           chunks: 'all'
+         }
+       }
+     }
    }
  };
```

새로운 `vendor` 번들을 보기 위해 다른 빌드를 실행 해 봅시다:

``` bash
...
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
vendors.a42c3ca0d742766d7a28.js   69.4 KiB       1  [emitted]  vendors
   main.abf44fedb7d11d4312d7.js  240 bytes       2  [emitted]  main
                     index.html  353 bytes          [emitted]
...
```

우리는`main` 번들이 `node_modules` 디렉토리의 `vendor` 코드를 포함하지 않고 크기가`240 bytes`로 내려간 것을 볼 수 있습니다!


## Module Identifiers

프로젝트에 다른 모듈 `print.js`를 추가해 보겠습니다.

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

__print.js__

``` diff
+ export default function print(text) {
+   console.log(text);
+ };
```

__src/index.js__

``` diff
  import _ from 'lodash';
+ import Print from './print';

  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

다른 빌드를 실행하면 우리의 `main` 번들의 해쉬만 변경 될 것이라고 기대할 수 있습니다 ...


``` bash
...
                           Asset       Size  Chunks                    Chunk Names
  runtime.1400d5af64fc1b7b3a45.js    5.85 kB      0  [emitted]         runtime
  vendor.a7561fb0e9a071baadb9.js     541 kB       1  [emitted]  [big]  vendor
    main.b746e3eb72875af2caa9.js    1.22 kB       2  [emitted]         main
                      index.html  352 bytes          [emitted]
...
```

... 우리는 세개 모두를 볼 수 있습니다. 이것은 각 [`module.id`](/api/module-variables#module-id-commonjs-)가 기본적으로 해결 순서에 따라 증가하기 때문입니다. 즉, 해결 순서가 변경되면 ID도 함께 변경됩니다. 다시 요약하면.

- `main` 번들은 새로운 내용으로 인해 변경되었습니다.
- `module.id`가 변경 되었기 때문에`vendor` 번들이 변경되었습니다.
- 그리고 `runtime` 번들은 새로운 모듈에 대한 참조를 포함하고 있기 때문에 바뀌었습니다.

첫 번째와 마지막 것으로 예상됩니다 - 우리가 수정하고자하는 `vendor` 해시입니다. 다행히도 이 문제를 해결하는 데 사용할 수있는 두 가지 플러그인이 있습니다.
첫 번째는 `NamedModulesPlugin` 으로, 숫자 식별자가 아닌 모듈 경로를 사용합니다.
이 플러그인은 더 읽기 쉬운 출력을 위해 개발하는 동안 유용하지만 실행하는 데 약간 시간이 걸립니다. 두 번째 옵션은 프로덕션 빌드에 권장되는 [`HashedModuleIdsPlugin`](/plugins/hashed-module-ids-plugin)입니다.



__webpack.config.js__

``` diff
  const path = require('path');
+ const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+      new webpack.HashedModuleIdsPlugin()
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  };
```

이제는 새로운 로컬 종속성에도 불구하고 우리의 `vendor` 해시는 빌드간에 일관성을 유지해야합니다:

``` bash
...
                          Asset       Size  Chunks             Chunk Names
   main.216e852f60c8829c2289.js  340 bytes       0  [emitted]  main
vendors.55e79e5927a639d21a1b.js   69.5 KiB       1  [emitted]  vendors
runtime.725a1a51ede5ae0cfde0.js   1.42 KiB       2  [emitted]  runtime
                     index.html  353 bytes          [emitted]
Entrypoint main = runtime.725a1a51ede5ae0cfde0.js vendors.55e79e5927a639d21a1b.js main.216e852f60c8829c2289.js
...
```

그리고 추가 종속성을 일시적으로 제거하기 위해 `src/index.js`를 수정합시다 :

__src/index.js__

``` diff
  import _ from 'lodash';
- import Print from './print';
+ // import Print from './print';

  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.onclick = Print.bind(null, 'Hello webpack!');
+   // element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

그리고 마지막으로 빌드를 다시 실행하십시오:

``` bash
...
                          Asset       Size  Chunks             Chunk Names
   main.ad717f2466ce655fff5c.js  274 bytes       0  [emitted]  main
vendors.55e79e5927a639d21a1b.js   69.5 KiB       1  [emitted]  vendors
runtime.725a1a51ede5ae0cfde0.js   1.42 KiB       2  [emitted]  runtime
                     index.html  353 bytes          [emitted]
Entrypoint main = runtime.725a1a51ede5ae0cfde0.js vendors.55e79e5927a639d21a1b.js main.ad717f2466ce655fff5c.js
...
```

두 빌드 모두 `vendor` 번들의 파일 이름에`55e79e5927a639d21a1b`을 생성했음을 알 수 있습니다.


## Conclusion

캐싱은 복잡 할 수 있지만 응용 프로그램이나 사이트 사용자가 누릴 수 있는 그만한 가치가 있습니다. 자세한 내용은 아래의 _[추가 정보](https://github.com/webpack/webpack.js.org/issues/652)_ 섹션을 참조하십시오.

