# Installation

이 안내서는 웹팩을 설치하는 데 사용되는 다양한 방법을 설명합니다.


## Prerequisites

시작하기 전에 [Node.js](https://nodejs.org/ko/)의 새로운 버전이 설치되어 있는지 확인하십시오. 현재 LT (Long Term Support) 버전은 이상적인 출발점입니다. 이전 버전에서는 webpack 및 또는 관련 패키지에 필요한 기능이 누락되어 다양한 문제가 발생할 수 있습니다.


## Local Installation

최신 webpack 릴리즈는 다음과 같습니다.

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

최신 릴리스 또는 특정 버전을 설치하려면 다음 명령 중 하나를 실행하십시오.

``` bash
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

webpack v4 이상을 사용하는 경우 [CLI](/api/cli/).

``` bash
npm install --save-dev webpack-cli
```

로컬로 설치하는 것은 대부분의 프로젝트에서 권장하는 것입니다. 이렇게하면 변경 내용을 도입 할 때 프로젝트를 개별적으로 쉽게 업그레이드 할 수 있습니다. 일반적으로 webpack은 로컬 `node_modules` 디렉토리에 webpack 찾고 하나 이상의 [npm scripts](https://docs.npmjs.com/misc/scripts)를 통해 실행됩니다.


```json
"scripts": {
	"build": "webpack --config webpack.config.js"
}
```

!!! tip 
    webpack의 로컬 설치를 실행하려면 바이너리 버전을 `node_modules/.bin/webpack` 으로 접근 할 수 있습니다. 또는 npm v5.2.0 이상을 사용하는 경우 'npx webpack'을 실행하여 실행할 수 있습니다.


## Global Installation

다음 NPM 설치는 `webpack` 을 전역 적으로 사용할 수 있게 합니다 :

``` bash
npm install --global webpack
```

!!! warning
    이 방법은 권장되지 않습니다.. 전역으로 설치하면 webpack의 특정 버전으로 사용자가 잠기고 다른 버전을 사용하는 프로젝트에서 실패 할 수 있습니다.


## Bleeding Edge

webpack에서 제공하는 최신 버전을 사용하는 데 적극적인 경우 다음 명령을 사용하여 베타 버전을 설치하거나 webpack 저장소에서 직접 설치할 수 있습니다.


``` bash
npm install webpack@beta
npm install webpack/webpack#<tagname/branchname>
```

!!! warning
    이러한 최첨단 릴리즈를 설치할 때주의하십시오! 그들은 여전히 버그를 포함 할 수 있으므로 프로덕션에 사용해서는 안됩니다.
