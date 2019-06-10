# 배포

mkdocs 로 제작된 문서들은 [github.com][https://github.com/] 저장소에 올리면 `~.io` 라는 도메인으로 호스팅됩니다.

먼저 배포를 하기전 마지막으로 `mkdocs build` 를 해서 최종파일을 만들어놉니다.

배포를 하려면 아래의 명령어를 사용하면 됩니다.

```sh
mkdocs gh-deploy
```

이제 모든 파일들을 저장소에 올리면 됩니다.

```sh
git add .
git commit -m "mkdocs upload"
git push
```

그러면 다음과 같은 주소로 접속할 수 있습니다.

`https://아이디.github.io/저장소이름` 

예: `https://demun.github.io/mkdocs-tuts` 