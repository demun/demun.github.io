# Concepts

__웹팩__ 은 현대 자바스크립트 응용 프로그램들을 위한 정적 모듈 번들러다. 웹팩이 당신의 애플리케이션을 처리할 때, 그것은 내부적으로 당신의 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 번들을 생성하는 의존성 그래프를 만든다.

T> 자바스크립트 모듈 및 웹팩 모듈에 대한 자세한 내용은 [여기](/modules)를 참조하십시오.

버전 4.0.0 이후, 웹팩은 당신의 프로젝트를 번들로 만들기 위해 구성 파일을 필요로 하지 않지만, 그럼에도 불구하고 당신의 요구를 더 잘 맞추도록 믿을 수 없을 정도로 구성 가능하다.

시작하려면 __핵심 개념__ 만 이해하면 된다.



- [Entry](#entry)
- [Output](#output)
- [Loaders](#loaders)
- [Plugins](#plugins)
- [Mode](#mode)
- [Browser Compatibility](#browser-compatibility)

본 문서는 이러한 개념에 대한 개괄적인 개요를 제공하는 동시에 상세한 개념별 사용 사례에 대한 링크를 제공하기 위한 것이다.

모듈 번들러에 대한 아이디어와 모듈 번들러가 후드 아래에서 어떻게 작동하는지 더 잘 이해하려면 다음 자료를 참조하십시오.

- [수동으로 애플리케이션 번들링](https://www.youtube.com/watch?v=UNMkLHzofQI)
- [Simple Module 번들러 라이브 코딩](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
- [Simple Module Bundler에 대한 자세한 설명](https://github.com/ronami/minipack)


## Entry

__진입점__ 은 내부 의존성 그래프를 작성하기 위해 어떤 모듈 웹팩을 사용해야 하는지를 나타낸다. 
웹팩은 진입점이 어떤 다른 모듈과 라이브러리에 의존하는지를 알아낼 것이다(직접 및 간접적으로).

기본적으로 이 값은 `./src/index.js`이지만 [webpack 구성](/configuration)에서 입력 속성을 구성하여 다른(또는 여러 진입점)을 지정할 수 있다. 예:


__webpack.config.js__

``` js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

T> 자세한 내용은 [entry points](/entry-points) 섹션에서 확인하십시오..



## Output

__출력__ 속성은 웹팩에 생성되는 __번들__ 을 내보낼 위치와 이러한 파일의 이름을 지정하는 방법을 알려준다. 
기본값은 기본 출력 파일의 경우 `./dist/main.js`로, 다른 생성된 파일의 경우 `./dist` 폴더로 설정된다.

구성에서 **출력** 필드를 지정하여 프로세스의 이 부분을 구성할 수 있다.


__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

위의 예에서, 웹팩에 번들의 이름과 내보낼 위치를 알려주는 `output.filename` 과 `output.path` 사용한다.
상단에서 경로 모듈을 가져오는 것이 궁금할 경우 파일 경로를 조작하는 데 사용되는 핵심 [Node.js module](https://nodejs.org/api/modules.html) 입니다.





## Loaders



웹팩은 자바스크립트와 JSON 파일만 이해하고 있다. 로더는 웹팩이 다른 유형의 파일을 처리하고 응용 프로그램에서 사용할 수 있고 종속성 그래프에 추가할 수 있는 유효한 [modules](#modules)로 변환할 수 있도록 한다.

!!! note 
    `.css` 파일과 같은 모든 유형의 모듈을 가져올 수 있는 기능은 웹 팩에 특정한 기능이며 다른 번들러나 태스크 러너가 지원하지 않을 수 있다는 점에 유의하십시오. 우리는 언어의 이 연장이 개발자들이 더 정확한 의존성 그래프를 만들 수 있게 해주기 때문에 보증된다고 느낀다.


높은 수준에서 로더는 웹 팩 구성에서 두 가지 속성을 가지고 있다.

1. `test` 속성은 변환해야 하는 파일 또는 파일을 식별한다.
2. `use` 속성은 변환을 위해 어떤 로더를 사용해야 하는지를 나타낸다.



__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```

위의 구성은 `rules`와 `use`이라는 두 가지 필수 속성을 가진 단일 모듈에 대한 `rules` 속성을 정의했다. 
이것은 웹팩의 컴파일러에게 다음과 같이 알려준다.


!!! note
    웹 팩 구성에서 규칙을 정의할 때 규칙이 아닌 `module.rules`에서 규칙을 정의하고 있다는 것을 기억해야 한다. 당신의 이익을 위해, 웹팩은 만약 이것이 잘못되면 당신에게 경고할 것이다.


!!! note
    파일과 일치하도록 regex를 사용할 때는 인용할 수 없다는 점을 명심하십시오. 즉, `/\.txt$/` 는 `'/\.txt$/'`/ `"/\.txt$/"` 와 동일하지 않음. 전자는 웹팩에 .txt로 끝나는 어떤 파일과 일치하도록 지시하고 후자는 웹팩에 절대 경로 '.txt'를 가진 단일 파일과 일치하도록 지시한다. 이것은 당신의 의도가 아닐 것이다.




## Plugins


로더는 특정 유형의 모듈을 변환하는 데 사용되지만 플러그인을 활용하여 번들 최적화, 자산 관리 및 환경 변수 주입과 같은 광범위한 작업을 수행할 수 있다.

> 플러그인 인터페이스와 이를 사용하여 웹 팩 기능을 확장하는 방법을 확인하십시오.

플러그인을 사용하려면 플러그인을 `require()`하고 `plugins` 배열에 추가해야 한다. 
대부분의 플러그인은 옵션을 통해 사용자 정의할 수 있다. 구성에서 플러그인을 여러 번 사용할 수 있으므로, `new` 연산자와 함께 플러그인을 호출하여 해당 플러그인의 인스턴스를 생성해야 한다.


__webpack.config.js__

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

위의 예에서 `html-webpack-plugin`은 생성된 모든 번들을 자동으로 주입하여 응용 프로그램용 HTML 파일을 생성한다.

> 웹팩이 제공하는 많은 플러그인이 있다! [list of plugins](/plugins)를 확인하십시오.

웹 팩 구성에서 플러그인을 사용하는 것은 간단하지만, 더 자세히 살펴볼 가치가 있는 많은 사용 사례가 있다. [여기서 자세한 내용을 알아보십시오](#plugins).



## Mode

`mode` 파라미터를 `development`, `production` or `none`로 설정하면 각 환경에 맞는 웹팩의 내장 최적화가 가능하다. 기본값은 `production`이다.


```javascript
module.exports = {
  mode: 'production'
};
```



## Browser Compatibility

webpack은 [ES5-compliant](https://kangax.github.io/compat-table/es5/)인 모든 브라우저를 지원한다(IE8 이하는 지원되지 않음). 
웹팩은 `Promise`에 `import()` 와 `require.ensure()`가 필요하다. 
구형 브라우저를 지원하려면 이러한 표현을 사용하기 전에 polyfill(폴리필)을 로드해야 한다.

<br>
<br>
