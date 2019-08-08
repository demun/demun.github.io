# Scaffolding

복잡한 웹팩 구성을 처음으로 설정하는 것은 어려울 수 있습니다. 성능을 최적화 하기위한 고급 구성 작성은 상당히 어렵습니다. `init` 기능은 자신의 설정을 만들거나 다른 사람들이 만드는 프로젝트를 초기화하려는 사람들을 지원하기 위해 고안되었습니다.


## Creating a scaffold

`webpack-cli` 발판을 작성하기 전에 여러분이 달성하고자 하는 것을 생각해 보십시오. 어떤 프로젝트나 응용 프로그램에서 사용할 수 있는 "일반적인" 구조를 원하십니까? `webpack.config.js`와 프레임워크 코드를 모두 작성하는 비계처럼 뭔가 집중하고 싶습니까? 또한 비계에 대한 사용자 경험을 생각하는 것이 유용합니다.

`webpack-cli`는 출력물을 적절하게 커스터마이즈 할 수 있는 쌍방향 경험을 제공합니다. 예를 들어 "귀하의 진입점은 무엇입니까?" 와 같은 질문을 하십시오.

### Writing a scaffold

발판 작성법을 배울 수 있는 많은 자료가 있습니다. [Writing a Scaffold](/contribute/writing-a-scaffold/)에서 시작 할 수 있습니다.

`webpack-scaffold` 는 스캐폴드를 만드는 유틸리티 모음입니다. 여기에는 비계를 만드는 데 사용할 수있는 기능이 포함되어 있습니다.


### Running a scaffold

발판은 `webpack-cli init` 을 사용하여 실행할 수 있습니다 :

```bash
webpack-cli init <your-scaffold>
```

#### Running a scaffold locally

스캐폴드 패키지가 로컬 파일 시스템에 있으면 `init` 을 그 경로로 가리켜야 합니다 :

```bash
webpack-cli init path/to/your/scaffold
```

또는 전역 모듈을 만들고 로컬 모듈에 대한 심볼릭 링크를 만들 수 있습니다.

- Using npm

```bash
cd path/to/my-scaffold
npm link
webpack-cli init my-scaffold
```

- Using yarn

```bash
cd path/to/my-scaffold
yarn link
webpack-cli init my-scaffold
```

#### Running a scaffold from npm

npm에서 패키지를 구할 수 있다면 그 이름은 `webpack-scaffold` 로 시작해야하며 다음을 실행하여 사용할 수 있습니다 :


```bash
webpack-cli init webpack-scaffold-yourpackage
```

## API

`scaffold`을 만들려면 [`yeoman-generator`](http://yeoman.io/authoring/) 를 만들어야 합니다. 덕분에 [Yeoman API](http://yeoman.io/learning/)의 메소드를 포함하도록 생성기를 선택적으로 확장 할 수 있습니다. 일반 웹팩 구성의 모든 속성을 지원한다는 점은 주목할 가치가 있습니다. 우리가 이것을 하기 위해서 기억해야 할 것이 있습니다 :


!!! warning
    객체는 문자열을 사용하여 만들고 문자열은 이중 문자열을 사용하여 만듭니다. 즉, 문자열을 만들려면 문자열을 다른 문자열로 묶어야 올바르게 문자열을 검증 할 수 있습니다.

### Required

- [`opts.env.configuration`(required)](#optsenvconfigurationrequired)
- [`opts.env.configuration.myObj` (required)](#optsenvconfigurationmyobj-required)
- [`myObj.webpackOptions` (required)](#myobjwebpackoptions-required)
- [`writing` (required)](#writing-required)

### Optional

- [myObj.merge](#myobjmerge-optional)
- [myObj.topScope](#myobjtopscopeoptional)
- [myObj.configName](#myobjconfignameoptional)

### `opts.env.configuration`(required)

`object`

이 항목은 구성을 시작하는 지점이며 CLI가 작동 할 수 있도록 생성자의 생성자에서 초기화합니다.

```js
class MyScaffold extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {};
  }
}
```

### `opts.env.configuration.myObj` (required)

`object`

이것은 여러분의 발판이며 CLI가 webpack 구성으로 변형시킬 옵션을 여기에 추가합니다. 당신은 `dev.config` 나 `prod.config` 와 같은 다른 설정을 표현하면서 당신이 선호하는 많은 다른 스캐 폴드를 가질 수 있습니다.

```js
class MyScaffold extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {},
      prod: {}
    };
  }
}
```

### `myObj.webpackOptions` (required)

`object`

이 객체의 형식은 일반 웹팩 구성[configuration](/configuration/)과 같습니다. 여기에 스캐폴드 속성을 선언하십시오. 예: `entry`, `output` 및 `context`. 이것을 yeoman 메소드 내에서 초기화 할 수 있습니다.


```js
this.options.env.configuration.dev.webpackOptions = {
  entry: '\'app.js\'',
  output: {}
};
```

### `writing` (required)

`function`

스캐 폴딩 인스턴스를 실행하려면, 설정을 `.yo-rc.json` 파일에 써야합니다. 이것은 `write` 메소드와 같이 yeoman 생성기의 라이프 사이클 중 하나를 사용하여 수행 할 수 있습니다.


```js
class MyScaffold extends Generator {
  writing() {
    this.config.set('configuration', myObj);
  }
}
```

### `myObj.merge` (optional)

`string`

[`webpack-merge`](https://github.com/survivejs/webpack-merge)를 사용하려면 `myObj`의 `merge` 프라퍼티를 병합하고자하는 설정의 이름으로 설정할 수 있다 :


```js
this.options.env.configuration.dev.merge = 'myConfig';
```

### `myObj.topScope`(optional)

`[string]`

`topScope` 속성은 모듈 가져 오기와 함수/변수 선언과 같이 설정에 필요한 모든 코드를 작성하는 곳입니다 :


```js
this.options.env.configuration.dev.topScope = [
  'const webpack = require("webpack");',
  'const path = require("path");'
];
```

### `myObj.configName`(optional)

`string`

`configName` 은 설정 파일의 이름을 커스터마이징 할 수 있게 합니다. 예를 들어 `webpack.config.js` 대신 `webpack.base.js` 라고 이름을 붙일 수 있습니다 :

```js
this.options.env.configuration.dev.configName = 'base';
```
