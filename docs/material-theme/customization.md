# Customization

## A great starting point

프로젝트 문서화는 프로젝트 자체만큼이나 다양하며 Material 테마는 훌륭하게 보이기 위한 좋은 출발점이다. 
그러나 설명서를 작성할 때 원하는 스타일을 보존하기 위해 약간의 조정이 필요한 지점에 도달할 수 있다.

## Adding assets

[MkDocs][1]는 테마를 변경하는 몇 가지 방법을 제공한다. 
기존 테마를 몇 번 수정하려면 스타일시트와 자바스크립트 파일을 `docs` 디렉토리에 추가하면 된다.

  [1]: https://www.mkdocs.org


### Additional stylesheets

일부 색상을 조정하거나 특정 요소의 간격을 변경하려면 별도의 스타일시트에서 이 작업을 수행할 수 있다. 
가장 쉬운 방법은 `docs` 디렉토리에 새 스타일시트 파일을 만드는 것이다.

``` sh
mkdir docs/stylesheets
touch docs/stylesheets/extra.css
```
그리고 다음 줄을 `mkdocs.yml`에 추가한다:

``` yaml
extra_css:
  - 'stylesheets/extra.css'
```

개발 서버를 `mkdocs serve`로 스핀업하고 추가 스타일시트 파일에 변경사항을 입력하기 시작하십시오. MkDocs 개발 서버가 실시간 재로드 기능을 실행하므로 저장 후 즉시 변경사항을 볼 수 있다.

### Additional JavaScript

자바스크립트 추가도 마찬가지다. 
다른 구문을 하이라이터로 통합하거나 테마에 사용자 지정 로직을 추가하려면 `docs` 디렉토리에 새 JavaScript 파일을 만드십시오


``` sh
mkdir docs/javascripts
touch docs/javascripts/extra.js
```

그리고 다음 줄을 `mkdocs.yml`에 추가한다:

``` yaml
extra_javascript:
  - 'javascripts/extra.js'
```

추가 지원은 [MkDocs 설명서][2]에서 확인할 수 있다.

  [2]: https://www.mkdocs.org/user-guide/styling-your-docs/#customizing-a-theme

## Extending the theme

HTML 소스(예: 일부 부분 추가 또는 제거)를 변경하려면 테마를 확장할 수 있다. 
MkDocs의 0.16 버전에서는 [테마 확장][3]을 구현하며, 주 테마를 변경하지 않고 테마의 일부를 쉽게 재정의할 수 있다.

  [3]: https://www.mkdocs.org/user-guide/styling-your-docs/#using-the-theme-custom_dir

### Setup and theme structure

`mkdocs.yml`에서 Material 테마를 참조하고, `custom_dir`를 사용하여 참조하는 `theme`와 같은 재정의를 위한 폴더를 새로 만드십시오.

``` yaml
theme:
  name: 'material'
  custom_dir: 'theme'
```

!!! warning "테마 확장 사전 요구 사항"

    테마 확장 과정에 `custom_dir` 변수가 사용되기 때문에 `pip`를 통해 Material 테마를 설치하고 `mkdocs.yml`에서 이름 매개변수를 참조할 필요가 있다.

테마 디렉토리의 모든 파일이 원래 테마의 일부인 동일한 이름으로 대체하기 때문에 테마 디렉토리의 구조는 원래 테마의 디렉토리 구조를 반영해야 한다. 
게다가, 추가적인 자산들이 테마 디렉토리에 저장될 수도 있다.

Material 테마의 디렉토리 레이아웃은 다음과 같다:

``` sh
.
├─ assets/
│  ├─ images/                          # Images and icons
│  ├─ javascripts/                     # JavaScript
│  └─ stylesheets/                     # Stylesheets
├─ partials/
│  ├─ integrations/                    # 3rd-party integrations
│  ├─ language/                        # Localized languages
│  ├─ footer.html                      # Footer bar
│  ├─ header.html                      # Header bar
│  ├─ hero.html                        # Hero teaser
│  ├─ language.html                    # Localized labels
│  ├─ nav-item.html                    # Main navigation item
│  ├─ nav.html                         # Main navigation
│  ├─ search.html                      # Search box
│  ├─ social.html                      # Social links
│  ├─ source.html                      # Repository information
│  ├─ tabs-item.html                   # Tabs navigation item
│  ├─ tabs.html                        # Tabs navigation
│  ├─ toc-item.html                    # Table of contents item
│  └─ toc.html                         # Table of contents
├─ 404.html                            # 404 error page
├─ base.html                           # Base template
└─ main.html                           # Default page
```

### Overriding partials

바닥글을 오버라이드하기 위해 `footer.html` 부분을 우리 자신의 부분으로 교체할 수 있다. 
이렇게 하려면 테마 디렉터리에 `partial/footer.html` 파일을 생성하십시오. 
이제 MkDocs는 테마를 렌더링할 때 새로운 부분을 사용할 것이다.
이것은 어떤 파일로도 할 수 있다.


### Overriding template blocks

부분 부분을 재정의하는 것 외에도, Material 테마 내에서 정의되고 특정 형상을 포장하는 소위 템플릿 블록을 재정의할 수도 있다. 
템플릿 블록을 재정의하려면 테마 디렉터리 내에 `main.html`을 만들고 블록을 정의하십시오.


``` jinja
{% extends "base.html" %}

{% block htmltitle %}
  <title>Lorem ipsum dolor sit amet</title>
{% endblock %}
```

Material 테마는 다음 템플릿 블록을 제공한다.:

| Block name   | Wrapped contents                                |
| ------------ | ----------------------------------------------- |
| `analytics`  | Google Analytics 통합 포장          |
| `content`    | 주요 내용 포장                          |
| `disqus`     | disqus 통합 포장                                 |
| `extrahead`  | 추가 메타 태그를 정의하기 위한 빈 블록      |
| `fonts`      | 웹 글꼴 정의 포장                   |
| `footer`     | 네비게이션과 저작권으로 바닥글을 감싼다.  |
| `header`     | 고정 헤더 막대 포장                      |
| `hero`       | Wraps the hero teaser                           |
| `htmltitle`  | `<title>` 태그 포장                         |
| `libs`       | JavaScript 라이브러리 포장(예: Moderniz)  |
| `scripts`    | JavaScript 응용프로그램 로직         |
| `source`     | 연결된 원본 파일 포장                   |
| `site_meta`  | 문서 헤드에 메타 태그 포장        |
| `site_nav`   | 사이트 네비게이션 및 목차 포장 |
| `styles`     | 스타일시트 포장(추가 소스      |

이 항목에 대한 자세한 내용은 [MkDocs 설명서][4]

  [4]: https://www.mkdocs.org/user-guide/styling-your-docs/#overriding-template-blocks

## Theme development

Material 테마는 [Webpack][5]을 빌드 도구로 사용하여 [Babel][6] 및 [SASS][7]와 같은 현대 웹 기술을 활용한다. 보다 근본적인 변경을 원한다면 Material 테마의 출처를 직접 조정하여 다시 컴파일할 필요가 있을 수 있다. 이것은 꽤 쉽다.

  [5]: https://webpack.js.org/
  [6]: https://babeljs.io
  [7]: http://sass-lang.com

### Environment setup

Material 테마에 대한 개발을 시작하기 위해서는 최소한 8의 [Node.js][8] 버전이 필요하다. 먼저 저장소 복제.

``` sh
git clone https://github.com/squidfunk/mkdocs-material
```

다음으로, 모든 종속성을 설치해야 하며, 이 종속성은 다음과 같이 처리된다:

``` sh
cd mkdocs-material
pip install -r requirements.txt
npm install
```
Windows에 있는 경우 [GNU Make][9]

  [8]: https://nodejs.org
  [9]: http://gnuwin32.sourceforge.net/packages/make.htm

### Development mode

개발 서버는 다음으로 시작할 수 있다:

``` sh
npm run watch
```

이렇게 하면 자산, 템플릿 및 문서의 변경 사항을 모니터링할 MkDocs 개발 서버도 시작될 것이다. 
브라우저에서 [localhost:8000][10]을 접속해 이 문서를 보십시오.

예를 들어 색 팔레트를 변경하는 것은 `src/assets/stylesheets/_config.scss`의 `$md-color-primary` 및 `$md-color-accent` 변수를 변경하는 것만큼이나 간단하다:

``` css
$md-color-primary: $clr-red-400;
$md-color-accent:  $clr-teal-a700;
```

!!! warning "자동으로 생성된 파일"

    이 디렉토리의 내용은 `src` 디렉토리에서 자동으로 생성되며 테마가 작성될 때 재정의되므로 `material` 디렉토리를 변경하지 마십시오.

  [10]: http://localhost:8000

### Build process

변경을 마치면 테마를 호출하여 만들 수 있다.

``` sh
npm run build
```

이는 모든 스타일시트와 JavaScript 소스의 생산 수준 컴파일 및 최소화를 트리거한다. 
명령이 종료되면, 최종 테마는 `material` 디렉토리에 위치한다. 
원본 `mkdocs.yml`에서 앞서 언급한 디렉토리를 가리키는 `theme_dir` 변수를 추가하십시오.

이제 `mkdocs build`를 실행할 수 있으며 원본 Material 테마를 변경한 문서를 볼 수 있다.
