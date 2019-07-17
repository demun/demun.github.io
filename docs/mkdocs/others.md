title: Lorem ipsum dolor sit amet
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.




# 확장기능 사용법

기본적으로 지원하는 확장기능을 설정만하면 다양한 기능을 이용할 수 있습니다.


## 각주

각주 기능은 확장기능에 아래처럼 지정해주면 됩니다.

```yml
markdown_extensions:
  - footnotes
```


각주는 `[^숫자]` 를 이용해서 작성하며 문서 하단에 위치하게 됩니다.
각주에 대한 참고 내용을 바로 아래 작성하여도 보이기는 문서 하단에 위치합니다.

예:

글 중간에 참고 하고 싶은 키워드가 있으면 첫번째[^1]처럼 작성하면 됩니다. 여러개가 있을수 있고 두번째[^2] 처럼 사용하면 됩니다.
각주에 대한 내용은 바로 아래 넣어도 문서 하단에 위치하게 됩니다.

[^1]: 첫번째 각주에 대한 내용
[^2]: 두번째 각주에 대한 내용

결과

```md
글 중간에 참고 하고 싶은 키워드가 있으면 첫번째[^1]처럼 작성하면 됩니다. 여러개가 있을수 있고 두번째[^2] 처럼 사용하면 됩니다.
각주에 대한 내용은 바로 아래 넣어도 문서 하단에 위치하게 됩니다.

[^1]: 첫번째 각주에 대한 내용
[^2]: 두번째 각주에 대한 내용
```

## Metadata

메타데이터는 문서 상단에 메타정보를 추가할 수 있습니다.

```yml
markdown_extensions:
  - meta
```

타이틀, 설명, 경로, 파일링크 등을 문서에 추가할 수 있습니다.

예:

```md
title: 타이틀을 지정할 수 있습니다.
description: 문서의 설명글을 추가할 수 있습니다.
path: path/to/file
source: file.js

# Headline
....
```


## Permalinks

파머링크를 사용하면 영구 링크가 자동으로 삽입됩니다. 제목에 링크를 달아서 이동하게 해줍니다.

```md
markdown_extensions : 
  -  toc : 
      permalink :  true
```

마우스를 올릴때 보여집니다. 

<!-- 파머링크의 텍스트를 변경하고 싶으면 문자열을 전달하면 됩니다.

```markdown
markdown_extensions:
  - toc:
      permalink: Link
```

이렇게 하면 제목의 끝에 `¶` 이 추가되어 링크로 작동이 됩니다. -->


