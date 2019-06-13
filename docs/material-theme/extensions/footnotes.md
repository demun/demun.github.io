# Footnotes

[Footnotes][1]는 표준 마크다운 라이브러리에 포함된 또 다른 확장이다.
이름에서 말하는 것처럼 설명서에 각주를 추가할 수 있는 기능이 추가된다.

  [1]: https://python-markdown.github.io/extensions/footnotes/

## Installation

다음 줄을 `mkdocs.yml`에 추가하십시오.

``` yaml
markdown_extensions:
  - footnotes
```

## Usage

각주 마크업은 링크의 표준 마크다운 마크업과 유사하다.
참조는 본문에 삽입되며, 이 내용은 문서의 어느 지점에서나 정의될 수 있다.


### Inserting the reference

각주 참조는 대괄호로 묶이고 캐럿으로 시작하고 숫자 식별자를 포함할 수 있는 임의 라벨로 시작한다. [1, 2, 3, ...] 또는 [Granovettter 등 1998년]의 이름. 
렌더링된 참조는 항상 연속된 위첨자(^) 숫자다.

Example:

``` markdown
Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]
```

Result:

Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]

### Inserting the content

각주 내용은 또한 각주 참조에 사용된 라벨과 일치해야 하는 라벨로 선언된다. 
문서의 임의 위치에 삽입할 수 있으며 항상 페이지 하단에 렌더링된다. 
또한, 백 링크는 자동으로 각주 참조에 추가된다.

#### on a single line

짧은 글은 같은 줄에 쓰여질 수 있다.

Example:

``` markdown
[^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

<a href="#fn:1">Jump to footnote at the bottom of the page</a>

  [^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### on multiple lines

단락은 다음 줄에 써야 한다. 모든 마크다운 블록과 마찬가지로 콘텐츠도 네 개의 공간으로 들여쓰기 되어야 한다.

Example:

``` markdown
[^2]:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

Result:

  [^2]:
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
      nulla. Curabitur feugiat, tortor non consequat finibus, justo purus
      auctor massa, nec semper lorem quam in massa.

<a href="#fn:2">Jump to footnote at the bottom of the page</a>
