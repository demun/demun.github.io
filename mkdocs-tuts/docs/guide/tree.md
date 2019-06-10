# 폴더 구조

폴더 및 페이지를 더 생성할 경우 `mkdocs.yml` 에서 지정해주면 됩니다.

여기서는 `docs/guide` 라는 폴더를 생성하고 `theme.md, tree.md` 파일을 만들었습니다. `mkdocs.yml` 의 설정은 아래와 같습니다.

```yml
pages: 
  - 홈: index.md
  - 사용법: how.md
  - 세부사용법:
    - '테마': 'guide/theme.md'
    - '구조': 'guide/tree.md'
```

주의할점은 하위메뉴는 `'` 로 감싼다는 점입니다. 유의해서 사용하세요.
