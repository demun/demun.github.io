hero: Metadata enables hero teaser texts
path: tree/master/docs/extensions
source: metadata.md

# Metadata

[Metadata][1] 확장 기능을 사용하면 페이지별 컨텍스트에서 테마에 대한 제어력을 높일 수 있는 문서에 메타데이터를 추가할 수 있다.

  [1]: https://python-markdown.github.io/extensions/meta_data/

## Installation

다음 줄을 `mkdocs.yml`에 추가하십시오.

``` yaml
markdown_extensions:
  - meta
```

## Usage

메타데이터는 마크다운 문서의 시작 부분에 일련의 키 값 쌍으로 작성되며, 메타데이터 컨텍스트를 종료하는 빈 행으로 구분된다.
물론, 메타데이터는 실제 페이지 내용을 렌더링하기 전에 문서에서 벗겨져 테마에 사용할 수 있게 된다.

Example:

``` markdown
title: Lorem ipsum dolor sit amet
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
path: path/to/file
source: file.js

# Headline

...
```

Material에서 지원하는 메타데이터를 다루는 다음 섹션을 참조하십시오.

### Setting a hero text

자료는 맨 위로 스크롤할 때 현재 페이지에서 볼 수 있듯이 메타데이터를 통해 간단한 텍스트 전용 페이지 로컬 히어로를 노출한다.
이것은 다음과 같이 간단하다.

``` markdown
hero: Metadata enables hero teaser texts
```

### Linking sources

문서가 특정 원본 파일 집합과 관련이 있고 프로젝트의 `mkdocs.yml` 안에 `repo_url`이 정의되어 있을 경우, `source` 키를 사용하여 파일을 연결할 수 있다.


``` markdown
source: file.js
```

파일 이름은 `mkdocs.yml`로 설정된 `repo_url`에 추가되지만, 올바른 경로 해결을 위해 `path`를 붙일 수 있다.


Example:

``` markdown
path: tree/master/docs/extensions
source: metadata.md
```

Result:

결과는 [source][2] 섹션을 참조하십시오.

  [2]: #__source

### Redirecting to another page

네비게이션 트리에서 문서를 이동하고 이전 URL에서 새 URL로 사용자를 리디렉션해야 하는 경우가 있다. 
`redirect` 메타 태그는 현재 문서에서 태그에 지정된 주소로 리디렉션을 만들 수 있다.

예를 들어 문서에 다음 내용이 포함된 경우:


``` markdown
redirect: /new/url
```

해당 문서의 URL에 액세스하면 자동으로 `/new/url`로 리디렉션된다.

### Overrides

#### Page title

문서별 수준에서 페이지 제목을 재정의할 수 있다.:

``` markdown
title: Lorem ipsum dolor sit amet
```

그러면 현재 페이지의 문서 `head` 안에 있는 `title` 태그가 제공된 값으로 설정된다. 
또한 페이지 제목에 대시를 구분 기호로 사용하여 사이트 제목을 추가하는 MkDocs에 대한 Material의 기본 동작을 재정의한다.


#### Page description

문서별 수준에서 페이지 설명을 재정의할 수도 있다:

``` yaml
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
```

그러면 현재 페이지의 문서 `head` 안에 사이트 설명이 들어 있는 `meta` 태그가 제공된 값으로 설정된다.


#### Disqus

[geting started guide][3]에 설명된 바와 같이 문서별 수준에서 Disqus components 섹션을 활성화할 수 있다:

``` markdown
disqus: your-shortname
```

특정 페이지를 빈 값으로 설정하여 Disqus를 사용하지 않도록 설정할 수 있다:

``` markdown
disqus:
```

  [3]: ../getting-started.md#disqus
