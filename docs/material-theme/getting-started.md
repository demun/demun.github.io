# Getting started

## Installation

### Installing MkDocs

[MkDocs][1]를 설치하기전에 Python 과 `pip`가 있는지 확인하십시요.

아래 구문으로 설치여부를 참고하세요.

``` sh
python --version
# Python 2.7.13
pip --version
# pip 9.0.1
```

MkDocs 설치 및 검증은 다음과 같이 간단하다.

``` sh
pip install mkdocs && mkdocs --version
# mkdocs, version 0.17.1
```

[1]: https://www.mkdocs.org

### Installing Material

#### using pip

Material 은 `pip`로 설치할 수 있다.

``` sh
pip install mkdocs-material
```

#### using choco

윈도우에 [Chocolatey][2] 가 있으면 [Chocolatey][2]를 이용하여 [Material][3]를 설치할 수 있다:

``` dos
choco install mkdocs-material
```

이렇게 하면 [Python][4] 과 [MkDocs][5]와 같은 모든 필수 종속성이 설치된다.

  [2]: https://chocolatey.org
  [3]: https://chocolatey.org/packages/mkdocs-material
  [4]: https://chocolatey.org/packages/python
  [5]: https://chocolatey.org/packages/mkdocs


#### cloning from GitHub

Material은 시스템에 전체 설치하지않고 복제하여 사용할 수 있다.
프로젝트의 루트 디렉토리의 하위 폴더에 복제하면 된다

``` sh
git clone https://github.com/squidfunk/mkdocs-material.git
```

[테마 확장][6] 과 테마의 [필요부분][7] 이 모두 있다. 
테마는 `mkdocs-material/material`폴더에 위치한다.

  [6]: customization.md#extending-the-theme
  [7]: customization.md#overriding-partials


## Usage

테마를 사용하려면 `mkdocs.yml`에 다음행을 추가하세요.

``` yaml
theme:
  name: 'material'
```

GitHub에서 Material를 복제한 경우:

``` yaml
theme:
  name: null
  custom_dir: 'mkdocs-material/material'
```

MkDocs 에는 개발서버가 포함되어 있으므로 변경사항을 진행하면서 검토할 수 있다.
개발서버는 다음 명령으로 시작할 수 있다:

``` sh
mkdocs serve
```

이제 브라우저에서 [http://localhost:8000][9] 로 접속하여 Material 테마를 볼 수 있다.
여기서부터 문서작성을 시작할 수 있으며, 테마를 읽고 사용할 수 있다.
or read on and customize the theme.

  [9]: http://localhost:8000

## Configuration

### Color palette

기본 색상은 구글의 Material 디자인 [색상팔렛트][10]에 있는 모든 기본 색상과 강조 색상에 대해 정의되어 있어서 테마의 전체적인 모양을 쉽게 바꿀수 있다.
다음 변수를 사용하여 기본 색상과 강조 색상을 설정하세요.

``` yaml
theme:
  palette:
    primary: 'indigo'
    accent: 'indigo'
```

색상이름은 대소문자를 구분하지 않지만 Material 색상팔렛트의 이름과 일치해야 한다.
유효한 값은: `red`, `pink`, `purple`, `deep purple`, `indigo`, `blue`, `light blue`, `cyan`, `teal`, `green`, `light green`, `lime`, `yellow`, `amber`, `orange`, `deep orange`, `brown`, `grey`, `blue grey`, `white`. 이다.
마지막 네 가지 색은 원색으로만 사용할 수 있다.

이 구성을 통해 색상을 설정하면 색상팔렛트를 정의하는 추가 CSS파일이 자동으로 포함된다.
저장소를 복제하고 사용자 지정 색상을 사용하여 테마를 다시 컴파일 하세요.
자세한 내용은 [customization][11]의 가이드를 참고하세요.

  [10]: http://www.materialui.co/colors
  [11]: customization.md


#### Primary colors

> Default: `indigo`

테마의 기본 색상을 변경하려면 타일을 클릭하십시오.

<button data-md-color-primary="red">Red</button>
<button data-md-color-primary="pink">Pink</button>
<button data-md-color-primary="purple">Purple</button>
<button data-md-color-primary="deep-purple">Deep Purple</button>
<button data-md-color-primary="indigo">Indigo</button>
<button data-md-color-primary="blue">Blue</button>
<button data-md-color-primary="light-blue">Light Blue</button>
<button data-md-color-primary="cyan">Cyan</button>
<button data-md-color-primary="teal">Teal</button>
<button data-md-color-primary="green">Green</button>
<button data-md-color-primary="light-green">Light Green</button>
<button data-md-color-primary="lime">Lime</button>
<button data-md-color-primary="yellow">Yellow</button>
<button data-md-color-primary="amber">Amber</button>
<button data-md-color-primary="orange">Orange</button>
<button data-md-color-primary="deep-orange">Deep Orange</button>
<button data-md-color-primary="brown">Brown</button>
<button data-md-color-primary="grey">Grey</button>
<button data-md-color-primary="blue-grey">Blue Grey</button>
<button data-md-color-primary="white">White</button>


<script>
  var buttons = document.querySelectorAll("button[data-md-color-primary]");
  Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener("click", function() {
      document.body.dataset.mdColorPrimary = this.dataset.mdColorPrimary;
    })
  })
</script>


#### Accent colors

> Default: `indigo`

테마의 강조 색상을 변경하려면 타일을 클릭하십시오.

<button data-md-color-accent="red">Red</button>
<button data-md-color-accent="pink">Pink</button>
<button data-md-color-accent="purple">Purple</button>
<button data-md-color-accent="deep-purple">Deep Purple</button>
<button data-md-color-accent="indigo">Indigo</button>
<button data-md-color-accent="blue">Blue</button>
<button data-md-color-accent="light-blue">Light Blue</button>
<button data-md-color-accent="cyan">Cyan</button>
<button data-md-color-accent="teal">Teal</button>
<button data-md-color-accent="green">Green</button>
<button data-md-color-accent="light-green">Light Green</button>
<button data-md-color-accent="lime">Lime</button>
<button data-md-color-accent="yellow">Yellow</button>
<button data-md-color-accent="amber">Amber</button>
<button data-md-color-accent="orange">Orange</button>
<button data-md-color-accent="deep-orange">Deep Orange</button>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-accent]");
  Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener("click", function() {
      document.body.dataset.mdColorAccent = this.dataset.mdColorAccent;
    })
  })
</script>

### Font family

> Default: `Roboto` and `Roboto Mono`

기본적으로 [Roboto font family][12]가 포함되며, 특히 텍스트의 경우 sans-serif 유형, 코드의 경우 `monospaced` 유형에 포함된다. 
두 글꼴 모두 [Google Fonts][13]에서 로드되며 예를들어 [Ubuntu font family][14]와 같이 다른 글꼴로 변경할 수 있다:

``` yaml
theme:
  font:
    text: 'Ubuntu'
    code: 'Ubuntu Mono'
```

텍스트 글꼴의 일반 두께는 400, `monospaced` 글꼴은 **700** 로 사용된다.
다른 글꼴을 로드하거나, 구글 글꼴을 사용하지 않으려면 `font` 를 `false` 로 설정하세요:

``` yaml
theme:
  font: false
```

[12]: https://fonts.google.com/specimen/Roboto
[13]: https://fonts.google.com
[14]: https://fonts.google.com/specimen/Ubuntu


### Logo

> Default icon: `school`

로고는 최소 해상도 128x128의 직사각형 모양을 가져야 한다.
`docs/images` 폴더를 만들고 로고를 추가하고 다음을 추가하세요.

``` yaml
theme:
  logo: 'images/logo.svg'
```

또한 [Material Design icon font][15]에서 임의의 ligature(또는 유티코드 포인트)를 설정하여 기본 아이콘을 변경할 수 있다.

``` yaml
theme:
  logo:
    icon: 'cloud'
```

[15]: https://material.io/icons/

### Language

!!! info "Material에 언어/번역 추가"

    Material 를 더 많은 언어로 번역하는데 도움이 된다 - 자세한것은 [여기를 클릭](http://bit.ly/2EbzFc8) 하세요

#### Localization

> Default: `en`

MkDocs의 Material는 국제화(i18n)를 지원하며 다음 언어로 된 모든 템플릿 변수 및 레이블에 대한 번역:


<table style="white-space: nowrap;">
  <thead>
    <tr>
      <th colspan="4">사용 가능한 언어</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ar</code> / Arabic</td>
      <td><code>ca</code> / Catalan</td>
      <td><code>cs</code> / Czech</td>
      <td><code>da</code> / Danish</td>
    </tr>
    <tr>
      <td><code>nl</code> / Dutch</td>
      <td><code>en</code> / English</td>
      <td><code>fi</code> / Finnish</td>
      <td><code>fr</code> / French</td>
    </tr>
    <tr>
      <td><code>gl</code> / Galician</td>
      <td><code>de</code> / German</td>
      <td><code>gr</code> / Greek</td>
      <td><code>he</code> / Hebrew</td>
    </tr>
    <tr>
      <td><code>hi</code> / Hindi</td>
      <td><code>hr</code> / Croatian</td>
      <td><code>hu</code> / Hungarian</td>
      <td><code>id</code> / Indonesian</td>
    </tr>
    <tr>
      <td><code>it</code> / Italian</td>
      <td><code>ja</code> / Japanese</td>
      <td><code>kr</code> / Korean</td>
      <td><code>no</code> / Norwegian</td>
    </tr>
    <tr>
      <td colspan="2"><code>nn</code> / Norwegian (Nynorsk)</td>
      <td><code>fa</code> / Persian</td>
      <td><code>pl</code> / Polish</td>
    </tr>
    <tr>
      <td><code>pt</code> / Portugese</td>
      <td><code>ru</code> / Russian</td>
      <td><code>sr</code> / Serbian</td>
      <td><code>sh</code> / Serbo-Croatian</td>
    </tr>
    <tr>
      <td><code>sk</code> / Slovak</td>
      <td><code>es</code> / Spanish</td>
      <td><code>sv</code> / Swedish</td>
      <td><code>tr</code> / Turkish</td>
    </tr>
    <tr>
      <td><code>uk</code> / Ukrainian</td>
      <td><code>vi</code> / Vietnamese</td>
      <td colspan="2">
        <code>zh</code> / Chinese (Simplified)
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <code>zh-Hant</code> / Chinese (Traditional)
      </td>
      <td colspan="2"><code>zh-TW</code> / Chinese (Taiwanese)</td>
    </tr>
    <tr>
      <td colspan="4" align="right">
        <a href="http://bit.ly/2EbzFc8">Submit a new language</a>
      </td>
    </tr>
  </tbody>
</table>

사용할 언어 지정:

``` yaml
theme:
  language: 'en'
```

언어를 지정하지 않으면 영어로 지정된다.
다른 언어의 번역을 만들려면 기존 언어의 현지화 파일을 복사하고 [2자 언어 코드][16]를 사용하여 새 파일의 이름을 지정하고 모든 번역을 조정하십시오.

``` sh
cp partials/language/en.html partials/language/jp.html
```

[16]: https://www.w3schools.com/tags/ref_language_codes.asp



#### Text direction

> Default: best match for given theme language, automatically set

Material은 왼쪽에서 오른쪽(`ltr`) 오른쪽에서 왼쪽(`rtl`) 모두 지원한다.
아랍어, 히브리어, 시아크어 등 더 많은 언어를 테마에 사용할 수 있다.
to be used with the theme:

``` yaml
theme:
  direction: 'rtl'
```

#### Site search

> Default: 지정된 테마의 언어에 대해 최적으로 일치시키는 것을 자동으로 설정한다

사이트 검색은 기본적으로 영어를 위한 스템퍼를 포함하는 [lunr.js][17]를 사용하여 구현되며, 
다른 언어를 위한 스템머는 [lunr-language][18]에 포함되며, 두 가지 모두 이 주제와 통합된다.

Material은 주어진 주제 언어의 일치(또는 가장 잘 어울리는) 스템퍼를 선택한다. 
검색 언어를 명시적으로 정의하면 프로젝트의 `mkdocs.yml`에서 다국어 검색을 활성화할 수 있다.


``` yaml
extra:
  search:
    language: 'en, de, ru'
```

작성 시, 다음과 같은 언어가 지원된다.:

<table style="white-space: nowrap;">
  <thead>
    <tr>
      <th colspan="4">사용 가능한 언어 스템퍼</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>da</code> / Danish</td>
      <td><code>du</code> / Dutch</td>
      <td><code>en</code> / English</td>
      <td><code>fi</code> / Finnish</td>
    </tr>
    <tr>
      <td><code>fr</code> / French</td>
      <td><code>de</code> / German</td>
      <td><code>hu</code> / Hungarian</td>
      <td><code>it</code> / Italian</td>
    </tr>
    <tr>
      <td><code>ja</code> / Japanese</td>
      <td><code>no</code> / Norwegian</td>
      <td><code>pt</code> / Portugese</td>
      <td><code>ro</code> / Romanian</td>
    </tr>
    <tr>
      <td><code>ru</code> / Russian</td>
      <td><code>es</code> / Spanish</td>
      <td><code>sv</code> / Swedish</td>
      <td><code>tr</code> / Turkish</td>
    </tr>
  </tbody>
</table>

!!! warning "MkDocs 1.0 호환성"

    MkDocs 1.0은 검색 색인 사전 구축을 지원하는 반면, 원본 테마의 기본 검색 동작이 더 나은 UX를 위해 크게 수정되었기 때문에 MkDocs 1.0은 현재 이 설정을 지원하지 않는다. 
    통합은 가능하지만, Material이 제공하는 기능의 작은 부분 집합은 주로 현지화 누락으로 인해 사전 구축된 인덱스로 이동할 수 없을 것이다.


!!! warning "필요한 언어만 지정하십시오."

    다른 언어에 대한 지원을 포함하면 일반적인 JavaScript 페이로드량이 약 20kb(gzip 없음) 증가하고 언어당 15-30kb 증가한다는 점에 유의하십시오.


토큰화 구분자는 사용자 정의가 가능하여 `-` 또는 `.` 으로 구분된 단어의 일부를 색인화할 수 있다.:

``` yaml
extra:
  search:
    tokenizer: '[\s\-\.]+'
```

  [17]: https://lunrjs.com
  [18]: https://github.com/MihaiValentin/lunr-languages

### Favicon

> Default: `assets/images/favicon.png`

기본 즐겨찾기는 `favicon` 변수를 `.ico` 또는 이미지 파일로 설정하여 변경할 수 있다.

``` yaml
theme:
  favicon: 'assets/images/favicon.ico'
```

### Features

#### Tabs

> Default: `false`

기본적으로 수평 메뉴는 작은 화면에서 종종 문제가 있기 때문에 접이식 섹션(헤더에서 최상위 섹션을 렌더링하는 기본 MkDocs 테마와 다르다)을 사용하여 전체 네비게이션이 왼쪽에서 렌더링된다. 그러나 대형 문서화 프로젝트의 경우 별도의 최상위 섹션에 다른 메뉴 계층을 추가하는 것이 바람직하다.
Material은 feature 플래그를 `true`로 설정하여 활성화할 수 있는 탭 기능을 사용하여 이 기능을 한다.


``` yaml
theme:
  feature:
    tabs: true
```

탭을 활성화하면 머리글 바로 아래에 *상단 섹션*이 추가 레이어로 렌더링된다. 
왼쪽의 메뉴에는 선택한 섹션에 포함된 페이지만 포함된다. 
또한 프로젝트의 `mkdocs.yml` 안에 정의된 *top-level page*는 첫 번째 탭 아래에 그룹화되어 첫 번째 페이지의 제목을 받게 된다.


## Customization

### Adding a source repository

문서 내에 프로젝트의 저장소에 대한 링크를 포함하려면 프로젝트의 `mkdocs.yml`을 통해 다음 변수를 설정하십시오.


``` yaml
repo_name: 'squidfunk/mkdocs-material'
repo_url: 'https://github.com/squidfunk/mkdocs-material'
```

저장소의 이름은 큰 화면의 검색바 옆에 표시되며 작은 크기의 기본 메뉴바의 일부로 표시된다.

또한 `repo_url`이 GitHub, BitBucket 또는 GitLab 저장소를 가리키면 해당 서비스 로고가 저장소의 이름 옆에 표시된다.
또한 GitHub의 경우 별과 포크의 수가 표시된다.

저장소가 개인 환경에서 호스팅 될 경우 서비스 로고는 `extra.repo_icon` 을 `github`, `gitlab` 또는 `bitbucket`를 가르킨다

!!! question "왜 모든 글의 맨 위에 편집 버튼이 있는가?"

    `repo_url`이 GitHub 또는 BitBucket 저장소로 설정하고 `repo_name`은 *GitHub* 또는 *BitBucket*(기본 설정으로 표시)로 설정하면 모든 글의 맨 위에 편집 버튼이 나타난다. 
    이것은 MkDocs가 자동으로 구현하는 동작이다. 
    편집 버튼 표시 여부를 정의하는 `edit_uri` 속성에 대한 자세한 내용은 [MkDocs document][19]를 참조하십시오.


[19]: https://www.mkdocs.org/user-guide/configuration/#edit_uri

### Adding social links

소셜 계정은 자동으로 포함된 [FontAwesome][20] 웹 글꼴을 사용하여 문서의 바닥글에 연결할 수 있다.
형식은 `github`, `twitter`, `linkedin` 등 서비스 명칭을 나타내야 하며, `link`에는 다음과 같이 연결하고자 하는 URL이 포함되어야 한다.


``` yaml
extra:
  social:
    - type: 'github'
      link: 'https://github.com/squidfunk'
    - type: 'twitter'
      link: 'https://twitter.com/squidfunk'
    - type: 'linkedin'
      link: 'https://linkedin.com/in/squidfunk'
```

링크는 순서대로 생성되며 링크의 `type`은 FontAwesome glyph의 이름과 일치해야 한다. `fa`는 자동으로 추가돼 `github`은 `fa fa-github`이 된다.

[20]: http://fontawesome.io/icons/

### Adding a Web App Manifest

[Web App Manifest][21]은 사용자의 모바일 기기나 데스크톱에 설치되었을 때 웹 응용 프로그램과 동작 방법을 브라우저에 알려주는 간단한 JSON 파일이다. `mkdocs.yml`에 매니페스트를 지정할 수 있다.


```yaml
extra:
  manifest: 'manifest.webmanifest'
```

[21]: https://developers.google.com/web/fundamentals/web-app-manifest/

### More advanced customization

Material 테마의 일반적인 모양을 변경하려면 고급 사용자 정의에 대한 자세한 내용은 [이 문서][22]를 참조하십시오.

  [22]: customization.md

## Integrations

### Google Analytics

MkDocs를 사용하면 사이트 추적을 Google Analytics와 쉽게 통합할 수 있다.
기본적인 추적 외에도, 모든 발신 링크를 클릭하는 것은 사이트 검색의 사용 방법뿐만 아니라 추적할 수 있다. 추적은 프로젝트의 `mkdocs.yml`에서 활성화될 수 있다.


``` yaml
google_analytics:
  - 'UA-XXXXXXXX-X'
  - 'auto'
```

### Disqus

MkDocs의 Material는 [Disqus][23]와 통합되므로, 설명서에 주석 섹션을 추가하려면, `mkdocs.yml`에서 Disqus 프로젝트의 단축 이름을 설정하십시오.

``` yaml
extra:
  disqus: 'your-shortname'
```

주석 섹션은 *인덱스 페이지를 제외한 모든 페이지에 삽입됨*.
또한, 목차 하단의 새로운 항목이 생성되어 주석 섹션과 연결된다. 필요한 자바스크립트가 자동으로 포함된다.


!!! warning "요구 사항들"

    Disqus 통합이 제대로 로드되려면 `site_url` 값을 `mkdocs.yml`에서 설정해야 한다.

또한 [Metadata][24]를 사용하여 특정 페이지에 대해 Disqus를 활성화하거나 비활성화할 수 있다.

  [23]: https://disqus.com
  [24]: extensions/metadata.md#disqus

## Extensions

MkDocs는 여러 가지 [Markdown Extensions][25]를 지원한다. 
다음 확장은 기본적으로 사용하도록 설정되어 있지 않지만(기본적으로 사용하도록 설정된 링크 참조) 항상 켜져 있어야 한다.


``` yaml
markdown_extensions:
  - admonition
  - codehilite:
      guess_lang: false
  - toc:
      permalink: true
```

자세한 내용은 설치 및 사용에 대한 자세한 내용을 포함하여 Material 테마에서 지원되는 다음 확장 목록을 참조하십시오.

* [Admonition][26]
* [Codehilite][27]
* [Footnotes][28]
* [Metadata][29]
* [Permalinks][30]
* [PyMdown Extensions][31]

  [25]: https://www.mkdocs.org/user-guide/writing-your-docs/#markdown-extensions
  [26]: extensions/admonition.md
  [27]: extensions/codehilite.md
  [28]: extensions/footnotes.md
  [29]: extensions/metadata.md
  [30]: extensions/permalinks.md
  [31]: extensions/pymdown.md

## Full example

아래는 `mkdocs.yml`에 대한 전체 예제 구성이다:

``` yaml
# 프로젝트 정보
site_name: 'Material for MkDocs'
site_description: 'A Material Design theme for MkDocs'
site_author: 'Martin Donath'
site_url: 'https://squidfunk.github.io/mkdocs-material/'

# Repository
repo_name: 'squidfunk/mkdocs-material'
repo_url: 'https://github.com/squidfunk/mkdocs-material'

# Copyright
copyright: 'Copyright &copy; 2016 - 2017 Martin Donath'

# Configuration
theme:
  name: 'material'
  language: 'en'
  palette:
    primary: 'indigo'
    accent: 'indigo'
  font:
    text: 'Roboto'
    code: 'Roboto Mono'

# Customization
extra:
  manifest: 'manifest.webmanifest'
  social:
    - type: 'github'
      link: 'https://github.com/squidfunk'
    - type: 'twitter'
      link: 'https://twitter.com/squidfunk'
    - type: 'linkedin'
      link: 'https://linkedin.com/in/squidfunk'

# Google Analytics
google_analytics:
  - 'UA-XXXXXXXX-X'
  - 'auto'

# Extensions
markdown_extensions:
  - admonition
  - codehilite:
      guess_lang: false
  - toc:
      permalink: true
```
