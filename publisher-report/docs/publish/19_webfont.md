# webfont


CSS3 표준으로 선택된 웹 폰트(web font)는 시스템에 글꼴이 없어도 다운로드시켜 화면에 보여주는 방식입니다.

웹폰트를 지정하는 방식은 두가지가 있습니다.

웹상에 폰트가 있는경우와 직접 업로드해서 사용하는 방식입니다.

- 웹상에 폰트가 있는 경우

`<link>` 태그나 `@import` 구문을 써서 다운로드 주소를 링크시키고 글꼴을 지정하는 방법입니다.

```css
@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
.sample {
    font-family: "Nanum Gothic", 돋움;
}
```

- 직접 업로드해서 사용하는 경우

웹 폰트를 지정해주면 사이트에 접속하는 순간 다운로드 해서 표시해줍니다.

```css
@font-face {
    font-family: 글꼴이름;
    src: url(글꼴파일경로) format(파일유형);
}
.sample {
    font-family: 글꼴이름;
}
```

> 웹에서 사용할 수 있는 폰트는 woff(*.woff), 트루타입(.ttf), 오픈타입(*.ttf, *.otf), 임베디드 오픈타입(*.eot), svg폰트(*.svg, *.svgz) 입니다.

시스템에서 사용하는 글꼴은 트루타입(TrueType) 유형이고 확장자가 `*.ttf` 입니다. 하지만 파일용량이 커서 eot(Embedded Open Type)와 woff(Web Open Font Format) 파일을 많이 사용합니다.

사용할때도 가벼운 eot, woff 를 먼저 지정하고 뒤에 ttf 파일을 지정합니다.

```css
@font-face {
    font-family: 'trana';
    src: local('trana'),
        url('trana.eot'),
        url('trana.woff') format('woff'),
        url('trana.ttf') format('truetype');
}
.sample {
    font-family: 'trana', sans-serif;
}
```
