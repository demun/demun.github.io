# PyMdown Extensions

[PyMdown Extensions][1]는 표준 마크다운 라이브러리에 몇 가지 훌륭한 기능을 추가하는 마크다운 확장 모음입니다. 
이러한 이유로, Material 테마와 잘 통합되어 있기 때문에 **이 패키지의 설치가 매우 권장된다**

  [1]: http://facelessuser.github.io/pymdown-extensions/

## Installation

다음 명령을 사용하여 PyMdown Extensions 패키지를 설치할 수 있다:

``` sh
pip install pymdown-extensions
```

PyMdown Extensions 패키지의 일부인 다음 확장 목록을 Material 테마와 함께 사용할 것을 권장한다.

``` yaml
markdown_extensions:
  - pymdownx.arithmatex
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.details
  - pymdownx.emoji:
      emoji_generator: !!python/name:pymdownx.emoji.to_svg
  - pymdownx.inlinehilite
  - pymdownx.magiclink
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.superfences
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tilde
```

## Usage

### Arithmatex <small>MathJax</small>

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>

[Arithmatterx][2]는 Material과 [MathJax][3]를 통합하여 TeX 마크업에서 작성된 블록형식과 인라인식을 구문 분석하여 수학 표기법으로 출력한다. 
TeX 구문에 방정식을 쓰는 방법에 대한 간략한 소개와 빠른 참조는 [이 스레드][4]를 참조하십시오.

MathJax JavaScript 런타임은 `mkdocs.yml`의 확장을 활성화하는 것 외에도 포함시켜야 한다. 
이 작업은 [추가 JavaScript][5]를 사용하여 수행해야 한다:

``` yaml
extra_javascript:
  - 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'
```

기본 MathJax 구성을 재정의하려면 MathJax 구성이 포함된 `extra_javascript`에 다른 JavaScript 파일 **before**을 추가하면 된다. 예:


``` js
window.MathJax = {
  tex2jax: {
    inlineMath: [ ["\\(","\\)"] ],
    displayMath: [ ["\\[","\\]"] ]
  },
  TeX: {
    TagSide: "right",
    TagIndent: ".8em",
    MultLineWidth: "85%",
    equationNumbers: {
      autoNumber: "AMS",
    },
    unicode: {
      fonts: "STIXGeneral,'Arial Unicode MS'"
    }
  },
  displayAlign: "left",
  showProcessingMessages: false,
  messageStyle: "none"
};
```

mkdocs.yml에 다음을 포함하십시오:

``` yaml
extra_javascript:
  - 'javascripts/extra.js'
  - 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'
```

  [2]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [3]: https://www.mathjax.org/
  [4]: http://meta.math.stackexchange.com/questions/5020/
  [5]: ../customization.md#additional-javascript

#### Blocks

블록은 별도의 줄에 배치되어 있는 `:::tex $$...$$`로 둘러싸여 있다.

Example:

``` tex
$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$
```

Result:

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$

#### Inline

인라인 방식은 다음과 같이 `:::tex $...$`로 둘러싸여 있다:

Example:

``` tex
Lorem ipsum dolor sit amet: $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$
```

Result:

Lorem ipsum dolor sit amet: $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$

### BetterEm

[BetterEm][6]는 시작 및 끝 토큰 감지를 위한 보다 정교한 파서(parser)를 제공하여 마크다운 내의 강조 표시(**bold** 및 *italic*) 처리를 개선한다. 
[사용 노트][7]에 대한 설명서를 읽어 보십시오.


  [6]: https://facelessuser.github.io/pymdown-extensions/extensions/betterem/
  [7]: https://facelessuser.github.io/pymdown-extensions/usage_notes/

### Caret

[Caret][8]을 통해 ^^inserted text^^ 를 강조할 수 있다.
추가된 것으로 표시되어야 하는 텍스트 부분은 반드시 두 개의 `^^...^^`에 포함되어야 한다.

  [8]: https://facelessuser.github.io/pymdown-extensions/extensions/caret/




### Critic

[Critic][9]은 문서에 대한 변경사항(추가, 삭제 및 주석)을 추적할 수 있는 마크다운 확장인 [Critic Markup][10]을 구현한다.
마크다운 문서를 편집하는 동안 변경 내용은 렌더링(기본값), 승인 또는 거부될 수 있다.


{\--deleted--\} 키워드 사용 {--deleted--} , {\++added++\} 키워드 사용 {++added++}
{\~~one~>a single~~\} 키워드 사용 {~~one~>a single~~} 특정 문자만 지우거나 강조할 수 있다.
{\==Highlighting==\} 키워드 사용 {==Highlighting==} 도 가능. {\>>코멘트 아이콘도 넣을수 있다<<\} {>>코멘트 아이콘도 넣을수 있다<<}.

{==

개폐 태그를 별도의 라인에 배치하고 태그와 내용 사이에 새로운 라인을 추가하여 블록에 포맷을 적용할 수도 있다.

==}

  [9]: https://facelessuser.github.io/pymdown-extensions/extensions/critic/
  [10]: http://criticmarkup.com/

### Details

[상세][11]에는 HTML5 `details`와 `summary` 태그를 사용하여 임의의 내용을 포함할 수 있는 접이식 [Admonition-style blocks][12]이 추가된다. 
또한 모든 경고(Admonition) 한정자를 사용할 수 있다. 예를 들어 `note`, `question`, `warning` 등:


??? question "How many Prolog programmers does it take to change a lightbulb?"

    Yes.

  [11]: https://facelessuser.github.io/pymdown-extensions/extensions/details/
  [12]: admonition.md

### Emoji

[Emoji][13]는 우리가 일상생활에서 사용하는 :shit:-load of emojis를 삽입하는 기능을 추가한다. 사용 가능한 모든 이모티콘 목록은 [EmojiOne 데모][14]를 참조하십시오.

\:shit: :shit: \:tada: :tada:


!!! warning "Legal disclaimer"

    Material는 [CC BY 4.0][16]에 따라 발매되는 [EmojiOne][15]과 제휴하지 않는다. EmojiOne 이미지 또는 CSS를 포함할 경우 [EmojiOne 라이센스][17]를 읽고 사용 및 속성이 올바른지 확인하십시오.

  [13]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/
  [14]: https://emoji.codes/
  [15]: http://emojione.com
  [16]: https://creativecommons.org/licenses/by/4.0/legalcode
  [17]: http://emojione.com/licensing/

### InlineHilite

[InlineHilite][18]에는 인라인 코드 강조 표시 지원이 추가된다. 
예를 들어 본문에 포함된 짧은 조각에 유용하다. 
`#!js var test = 0;` 와 `#!js`와 같이 인라인 코드와 언어 식별자 접두어 얻을 수 있다.


  [18]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/

### MagicLink

[MagicLink][19]는 마크다운에서 링크를 감지하여 필요한 마크를 자동으로 생성하므로 특별한 구문이 필요하지 않다. 
`http[s]://`, `ftp://` 링크를 자동 연동하고, e-메일 주소를 참고한다.


  [19]: https://facelessuser.github.io/pymdown-extensions/extensions/magiclink/

### Mark

[Mark][20] 텍스트 강조 기능 추가 \==highlight text== ==highlight text== 
강조해야 할 텍스트는 두개의 등호 속에 넣으면 된다. `==...==`.

  [20]: https://facelessuser.github.io/pymdown-extensions/extensions/mark/

### SmartSymbols

[SmartSymbols][21] 특수 문자에 대한 마크업 화살표(`<--, -->, <-->`)(<--, -->, <-->), 상표 및 저작권 기호(\(c), \(tm), \(r))((c), (tm), (r)), 백분율(`1/2, 1/4, ...`)(1/2, 1/4, ...) 등은 변환된다


  [21]: https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/

### SuperFences

[SuperFences][22]는 표준 마크다운 라이브러리의 [Fenceed Code Blocks][23] 확장이 올바르게 구문 분석되지 않는 블록 견적, 목록 및 기타 블록 요소 아래에 코드 블록을 내포할 수 있는 기능을 제공한다.

SuperFences 는 [탭이 있는 코드 블록 그룹화][24]를 허용한다.

  [22]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
  [23]: https://python-markdown.github.io/extensions/fenced_code_blocks/
  [24]: codehilite.md#grouping-code-blocks

### Tasklist

[Tasklist][25] 스타일 확인란 목록 지원을 추가한다. 
이것은 임무를 추적하고 무엇을 하고 무엇을 아직 하지 않았는지를 보여주는데 유용하다.
체크박스 목록은 일반 목록과 같으나 빈 체크박스의 경우 `[ ]`로, 채워진 체크박스의 경우 `[x]`로 접두어로 사용한다.

Example:

``` markdown
* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [x] Nulla lobortis egestas semper
* [x] Curabitur elit nibh, euismod et ullamcorper at, iaculis feugiat est
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [x] Sed egestas felis quis elit dapibus, ac aliquet turpis mattis
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
* [ ] Nulla vel eros venenatis, imperdiet enim id, faucibus nisi
```

Result:

* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [x] Nulla lobortis egestas semper
* [x] Curabitur elit nibh, euismod et ullamcorper at, iaculis feugiat est
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [x] Sed egestas felis quis elit dapibus, ac aliquet turpis mattis
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
* [ ] Nulla vel eros venenatis, imperdiet enim id, faucibus nisi

[25]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/

### Tilde

[Tilde][26] 텍스트 지움 표시를 하는 물결표 모양을 지원한다 \~~strike through~~ ~~strike through~~ 
물결표 모양은 `~~...~~` 으로 표현한다

  [26]: https://facelessuser.github.io/pymdown-extensions/extensions/tilde/
