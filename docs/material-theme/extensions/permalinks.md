# Permalinks

Permalinks는 표준 마크다운 라이브러리의 일부인 [Table of Contents][1] 확장의 기능이다. 
확장자는 각 헤드라인 끝에 닻을 삽입하므로 문서의 하위 부분에 직접 연결할 수 있다.


  [1]: https://python-markdown.github.io/extensions/toc/

## Installation

permalinks를 활성화하려면 `mkdocs.yml`에 다음을 추가하십시오:

``` yaml
markdown_extensions:
  - toc:
      permalink: true
```

이렇게 하면 (현재 보고 있는 페이지와 같이) 각 헤드라인 끝에 `¶` 단락 기호가 포함된 링크가 추가되며, 이 링크는 Material 테마가 호버에 표시된다. 
permalink의 텍스트를 변경하기 위해 문자열을 전달할 수 있다. 예:


``` markdown
markdown_extensions:
  - toc:
      permalink: Link
```

## Usage

활성화하면 permalinks가 자동으로 삽입된다.
