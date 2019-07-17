# Asset Management

처음부터 가이드를 따라다녔다면 이제 "Hello Webpack"을 보여주는 작은 프로젝트를 갖게 될 것이다. 
이제 이미지 같은 다른 자산을 통합하여 어떻게 처리할 수 있는지 살펴봅시다.

웹팩에 앞서 프런트엔드 개발자들은 grunt나 gulp 등의 도구를 사용해 이 자산을 처리하고 `/src` 폴더에서  `/dist` 또는 `/build` 디렉토리로 옮기게 된다. 

JavaScript 모듈에도 동일한 방법이 사용되었지만, 웹팩과 같은 툴은 __동적으로 번들__ 하여 모든 의존성([dependency graph](/concepts/dependency-graph))이라고 알려진 것을 생성 할 것이다. 

이것은 아주 좋은 일이다. 왜냐하면 모든 모듈이 현재 그것의 _의존성을 명시적으로 진술하고_ 있고 우리는 사용하지 않는 모듈들을 묶는 것을 피할 것이기 때문이다.

가장 멋진 웹팩 기능 중 하나는 로더가 있는 JavaScript 외에 _다른 종류의 파일도 포함_ 할 수 있다는 것이다. 
이는 자바스크립트에 대해 위에 열거한 것과 동일한 장점(예: 명시적 의존성)을 웹사이트나 웹 앱을 만들 때 사용하는 모든 것에 적용할 수 있다는 것을 의미한다. 
이미 해당 설정에 익숙할 수 있으므로 CSS부터 시작합시다.



## Setup

시작하기 전에 우리 프로젝트를 조금 변경하자:

__dist/index.html__

``` diff
  <!doctype html>
  <html>
    <head>
-    <title>Getting Started</title>
+    <title>Asset Management</title>
    </head>
    <body>
-     <script src="main.js"></script>
+     <script src="bundle.js"></script>
    </body>
  </html>
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
-     filename: 'main.js',
+     filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```


## Loading CSS

JavaScript 모듈 내에서 CSS 파일을 `import` 하기 위해서는 [style-loader](/loaders/style-loader) 및 [css-loader](/loaders/css-loader)를 설치하여 [`module` 구성](/configuration/module)해야 한다:


``` bash
npm install --save-dev style-loader css-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

> webpack은 정규식을 사용하여 어떤 파일을 찾고 특정 로더에게 제공할지 결정한다. 
  이 경우 `.css`로 끝나는 파일은 `style-loader`와 `css-loader`에 제공된다.

이렇게 하면 그 스타일링에 따라 `./style.css`를 파일로 가져올 수 있다. 
이제, 그 모듈을 실행하면, html 파일의 `<head>`에 문자열화된 css가 포함된 `<style>` 태그가 삽입될 것이다.

우리 프로젝트에 새로운 `style.css` 파일을 추가해서 그것을 우리의 `index.js`로 가져오자.


__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

__src/style.css__

``` css
.hello {
  color: red;
}
```

__src/index.js__

``` diff
  import _ from 'lodash';
+ import './style.css';

  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.classList.add('hello');

    return element;
  }

  document.body.appendChild(component());
```

Now run your build command:

``` bash
npm run build

...
    Asset      Size  Chunks             Chunk Names
bundle.js  76.4 KiB       0  [emitted]  main
Entrypoint main = bundle.js
...
```

브라우저에서 `index.html`을 다시 열면 `Hello webpack`이 빨간색으로 표시된 것을 볼 수 있다. 
웹팩이 한 일을 보려면 페이지를 검사하고(`<style>` 태그가 자바스크립트에 의해 동적으로 생성되므로 결과가 표시되지 않으므로 페이지 소스를 보지 마십시오) 페이지의 헤드 태그를 확인하십시오. 
`index.js`로 가져온 스타일 블록이 들어 있어야 한다.

생산 시 로드 시간을 단축할 수 있으며 대부분의 경우 [minimize css](/plugins/mini-css-extract-plugin/#minimizing-for-production)를 사용해야 한다. 
게다가, 로더는 당신이 생각할 수 있는 CSS의 거의 모든 외관을 위해 존재한다. -- [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader), 및 [less](/loaders/less-loader) 등 몇개만 지정하면 된다.



## Loading Images

이제 CSS를 도입하고 있지만 배경이나 아이콘 같은 이미지는 어떨까? [file-loader](/loaders/file-loader)를 사용하여 시스템에도 쉽게 통합할 수 있다.


``` bash
npm install --save-dev file-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

자, '내 이미지'에서 `import MyImage from './my-image.png'`는 해당 이미지가 처리되어 출력 디렉터리에 추가되며, `MyImage` 변수에는 처리 후 해당 이미지의 최종 URL이 포함될 것이다. 

위와 같이 [css-loader](/loaders/css-loader)를 사용할 경우, CSS 내의 `url('./my-image.png')`에도 유사한 프로세스가 발생한다. 

로더는 이 파일이 로컬 파일임을 인식하고 `'./my-image.png'`를 교체한다.`output` 디렉토리의 이미지에 대한 최종 경로가 있는 경로. 

[html-loader](/loaders/html-loader)는 `<img src="./my-image.png" />`를 같은 방식으로 처리한다.

프로젝트에 이미지를 추가하고 이 기능이 어떻게 작동하는지 확인해 보십시오. 원하는 이미지를 모두 사용할 수 있습니다,


__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
+ import Icon from './icon.png';

  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

+   // Add the image to our existing div.
+   const myIcon = new Image();
+   myIcon.src = Icon;
+
+   element.appendChild(myIcon);

    return element;
  }

  document.body.appendChild(component());
```

__src/style.css__

``` diff
  .hello {
    color: red;
+   background: url('./icon.png');
  }
```

새 빌드를 생성하고 index.html 파일을 다시 여십시오.

``` bash
npm run build

...
                               Asset      Size  Chunks                    Chunk Names
da4574bb234ddc4bb47cbe1ca4b20303.png  3.01 MiB          [emitted]  [big]
                           bundle.js  76.7 KiB       0  [emitted]         main
Entrypoint main = bundle.js
...
```

모든 것이 잘 풀렸다면 이제 당신은 반복적인 배경과 함께 우리의 `Hello webpack` 텍스트 옆에 있는  `img` 요소를 보아야 한다. 
이 원소를 조사하면 실제 파일 이름이 '5c999da72346a995e2718865d019c8.png'와 같은 것으로 바뀐 것을 알 수 있다. 
웹팩이 `src` 폴더에서 우리 파일을 찾아 처리했다는 뜻이다!

> 여기서부터 논리적인 다음 단계는 당신의 이미지를 최소화하고 최적화하는 것이다. 이미지 로드 프로세스를 향상시킬 수 있는 방법에 대한 자세한 내용은 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 및 [url-loader](/loaders/url-loader)를 참조하십시오.



## Loading Fonts

그렇다면 글꼴과 같은 다른 자산은 어떨까? 파일과 URL 로더는 당신이 그것들을 통해 로드한 모든 파일을 가져가서 당신의 빌드 디렉토리에 출력한다. 이것은 우리가 글꼴을 포함한 모든 종류의 파일에 그것들을 사용할 수 있다는 것을 의미한다. 글꼴 파일을 처리하도록 `webpack.config.js`를 업데이트하십시오.


__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

Add some font files to your project:

__project__


``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- my-font.woff
+   |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

로더가 구성되고 글꼴이 배치되면 `@font-face` 선언을 통해 이를 통합할 수 있다. 현지 `url(...)` 지시는 이미지와 마찬가지로 웹팩에 의해 선택될 것이다.


__src/style.css__

``` diff
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./my-font.woff2') format('woff2'),
+         url('./my-font.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
+ }

  .hello {
    color: red;
+   font-family: 'MyFont';
    background: url('./icon.png');
  }
```

이제 새 빌드를 실행하여 웹팩이 글꼴을 처리했는지 확인하십시오.

``` bash
npm run build

...
                                 Asset      Size  Chunks                    Chunk Names
5439466351d432b73fdb518c6ae9654a.woff2  19.5 KiB          [emitted]
 387c65cc923ad19790469cfb5b7cb583.woff  23.4 KiB          [emitted]
  da4574bb234ddc4bb47cbe1ca4b20303.png  3.01 MiB          [emitted]  [big]
                             bundle.js    77 KiB       0  [emitted]         main
Entrypoint main = bundle.js
...
```

`index.html`을 다시 열고 `Hello webpack` 텍스트가 새 글꼴로 변경되었는지 확인하십시오. 만약 모든 것이 잘 된다면, 당신은 변화를 보아야 한다.


## Loading Data

로드할 수 있는 또 다른 유용한 자산은 JSON 파일, CSV, TSV, XML과 같은 데이터. JSON에 대한 지원은 실제로 노드JS와 유사하게 내장되어 있어 `./data.json에서 데이터 가져오기`가 기본적으로 작동한다는 뜻이다. CSV, TSV 및 XML을 가져오려면 [csv-loader](https://github.com/theplatapi/csv-loader) 및 [xml-loader](https://github.com/gisikw/xml-loader)을 사용하십시오. 세 가지 모두를 싣도록 합시다.



``` bash
npm install --save-dev csv-loader xml-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

프로젝트에 일부 데이터 파일 추가:

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- data.xml
    |- my-font.woff
    |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

__src/data.xml__

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

이제 이러한 네 가지 데이터 유형(JSON, CSV, TSV, XML) 중 하나를 `import` 수 있으며, 가져온 `Data` 변수에는 쉽게 사용할 수 있도록 구문 분석된 JSON이 포함되어 있다.


__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
  import Icon from './icon.png';
+ import Data from './data.xml';

  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

+   console.log(Data);

    return element;
  }

  document.body.appendChild(component());
```

`npm run build` 명령을 다시 실행하고 `index.html`을 여십시오. 개발자 도구에서 콘솔을 보면 가져온 데이터가 콘솔에 기록되는 것을 볼 수 있을 것이다!

> 이것은 [d3](https://github.com/d3)과 같은 도구를 사용하여 일종의 데이터 시각화를 구현할 때 특히 유용할 수 있다. ajax 요청을 하고 런타임에 데이터를 분석하는 대신 빌드 프로세스 중에 모듈에 로드하여 모듈이 브라우저를 누르는 즉시 파싱된 데이터를 이동할 수 있도록 할 수 있다.




## Global Assets

위에서 언급한 모든 것 중 가장 멋진 부분은 이런 식으로 자산을 적재하면 보다 직관적인 방법으로 모듈과 자산을 함께 묶을 수 있다는 것이다. 
모든 것을 포함하는 글로벌 `/assets` 디렉토리에 의존하지 않고 자산을 사용하는 코드로 그룹화할 수 있다. 
예를 들어, 이와 같은 구조는 매우 유용할 수 있다.


``` diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

이 설정은 밀접하게 결합되어 있는 모든 것들이 현재 함께 있기 때문에 당신의 코드를 훨씬 더 유용하게 할 수 있게 한다. 
다른 프로젝트에서 `/my-component`를 사용하고 싶다고 가정해 봅시다. 단순히 복사하거나 저쪽에 있는 `/components` 디렉토리로 옮기기만 하면 된다. 
모든 _외부 의존성_ 을 설치하고 _구성에 동일한 로더_ 가 정의되어 있는 한, 시도하는 것이 좋을 것이다.

그러나 기존 방식에 갇혀 있거나 여러 구성 요소(뷰, 템플릿, 모듈 등) 간에 공유되는 일부 자산이 있다고 가정해 보십시오. 
이러한 자산을 기본 디렉토리에 저장하고 [aliasing](/configuration/resolve#resolve-alias)을 사용하여 `import`을 용이하게 할 수 있다.



## Wrapping up

다음 가이드의 경우 이 가이드에서 사용한 모든 다른 자산을 사용하지 않을 것이므로, 다음 가이드에 대비할 수 있도록 정리를 좀 하자[Output Management](https://webpack.js.org/guides/output-management/):


__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
-   |- data.xml
-   |- my-font.woff
-   |- my-font.woff2
-   |- icon.png
-   |- style.css
    |- index.js
  |- /node_modules
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
-   module: {
-     rules: [
-       {
-         test: /\.css$/,
-         use: [
-           'style-loader',
-           'css-loader'
-         ]
-       },
-       {
-         test: /\.(png|svg|jpg|gif)$/,
-         use: [
-           'file-loader'
-         ]
-       },
-       {
-         test: /\.(woff|woff2|eot|ttf|otf)$/,
-         use: [
-           'file-loader'
-         ]
-       },
-       {
-         test: /\.(csv|tsv)$/,
-         use: [
-           'csv-loader'
-         ]
-       },
-       {
-         test: /\.xml$/,
-         use: [
-           'xml-loader'
-         ]
-       }
-     ]
-   }
  };
```

__src/index.js__

``` diff
  import _ from 'lodash';
- import './style.css';
- import Icon from './icon.png';
- import Data from './data.xml';
-
  function component() {
    const element = document.createElement('div');
-
-   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.classList.add('hello');
-
-   // Add the image to our existing div.
-   const myIcon = new Image();
-   myIcon.src = Icon;
-
-   element.appendChild(myIcon);
-
-   console.log(Data);

    return element;
  }

  document.body.appendChild(component());
```


## Next guide

[Output Management](https://webpack.js.org/guides/output-management/)으로 넘어가자.


## Further Reading

- [Loading Fonts](https://survivejs.com/webpack/loading/fonts/) on SurviveJS
