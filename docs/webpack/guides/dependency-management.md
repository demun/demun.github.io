# Dependency Management

> es6 modules

> commonjs

> amd


## require with expression

요청에 표현식이 포함되어 있으면 컨텍스트가 만들어 지므로 컴파일 타임에 __exact__ 모듈을 알 수 없습니다.
A context is created if your request contains expressions, so the __exact__ module is not known on compile time.

Example:

```javascript
require('./template/' + name + '.ejs');
```

webpack은 `require()` 호출하여 파싱하고 몇 가지 정보를 추출합니다 :

```code
Directory: ./template
Regular expression: /^.*\.ejs$/
```

__context module__


컨텍스트 모듈이 생성됩니다. 이 디렉토리에는 정규 표현식과 일치하는 요청과 함께 필요할 수 있는 __해당 디렉토리에 대한 모든 모듈__ 에 대한 참조가 포함되어 있습니다. 컨텍스트 모듈에는 요청을 모듈 ID로 변환하는 맵이 들어 있습니다.


Example:

```json
{
  "./table.ejs": 42,
  "./table-row.ejs": 43,
  "./directory/folder.ejs": 44
}
```

컨텍스트 모듈에는 맵에 액세스하기 위한 런타임 로직이 포함되어 있습니다.

이는 동적 요구 사항이 지원되지만 모든 가능한 모듈이 번들에 포함됨을 의미합니다.


## `require.context`

`require.context()` 함수로 자신만의 컨텍스트를 만들 수 있습니다.

그것은 당신이 검색 할 디렉토리를 전달할 것인지, 서브 디렉토리를 검색해야 하는지를 나타내는 플래그 또는 정규식을 사용하여 파일을 대조합니다.

webpack은 빌드하는 동안 코드에서 `require.context ()` 를 파싱합니다.

구문은 다음과 같습니다.

```javascript
require.context(directory, useSubdirectories = false, regExp = /^\.\//);
```

Examples:

```javascript
require.context('./test', false, /\.test\.js$/);
// `.test.js`로 끝나는 요청과 함께 요구 될 수 있는 테스트 디렉토리의 파일들을 가지고있는 문맥.
```

```javascript
require.context('../', true, /\.stories\.js$/);
// 상위 폴더에 있는 모든 파일과 `.stories.js` 로 끝나는 내림차순 폴더가 있는 컨텍스트
```

!!! warning
    `require.context`에 전달 된 인자는 리터럴이어야합니다!


### context module API

컨텍스트 모듈은 하나의 인수를 취하는 (require) 함수를 내 보냅니다.

내 보낸 함수는 `resolve`,`keys`,`id` 의 3 가지 속성을 가집니다.

- `resolve`는 함수이고 파싱 된 요청의 모듈 id를 반환합니다.
- `keys`는 컨텍스트 모듈이 처리 할 수 있는 모든 가능한 요청의 배열을 반환하는 함수입니다.

이는 디렉토리에있는 모든 파일을 요구하거나 패턴과 일치시키려는 경우에 유용 할 수 있습니다 예 :

```javascript
function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js$/));
```

```javascript
const cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../components/', true, /\.js$/));
// 빌드 타임 캐시에는 필요한 모든 모듈이 채워집니다.
```

- `id`는 컨텍스트 모듈의 모듈 ID입니다. 이는 `module.hot.accept`에 유용 할 수 있습니다.

