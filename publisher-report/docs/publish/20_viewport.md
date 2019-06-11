# viewport

HTML5에서는 장치 또는 너비에 따라 화면이 표시되도록 새로운 메소드인 `viewport`를 추가했습니다.

`<head>`태그 사이에 아래와 같은 메타태그를 추가해야 합니다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`<meta>` 뷰포트 요소는 페이지의 크기와 스케일링을 제어하는 방법에 브라우저 지침을 제공합니다.

`width=device-width` 부분은 장치의 화면 너비를 따르도록 페이지 폭을 설정합니다 (장치에 따라 다름).

`initial-scale=1.0` 부분은 페이지가 브라우저에 의해 처음로드 될 때 초기 확대 / 축소 레벨을 설정합니다.



# mediaquery

미디어쿼리는 CSS3에서 소개 된 CSS 기술입니다.

`@media` 특정 조건이 true 인 경우에만 규칙을 사용하여 CSS 속성 블록을 포함합니다.

미디어쿼리 구문은 아래와 같습니다.

```css
@media only 미디어타입 and(속성: 값) {
    /* css 구문 */
}
```


아래 예제는 브라우져창이 최대 600px 이하인경우에는 배경색상이 파란색으로 나옵니다.

```css
@media only screen and (max-width: 600px) {
    body {
        background-color: blue;
    }
}
```


1. 모바일 우선 정책으로 기본 CSS는 모바일을 비롯해 모든 장치가 사용되도록 정합니다.
2. 두번째 중단점을 사용하여 특정 기기의 너비에 해당하는 CSS를 작성합니다.

예

```css
/* 모바일을 비롯한 모든 기기 */
body {
    background-color: #fff;
}

/* 너비가 768px 이상(테블릿) 적용되는 CSS */
@media only screen and (min-width: 768px) {
    body {
        background: #ddd;
    }
}

/* 너비가 1200px 이상(PC) 적용되는 CSS */
@media only screen and (min-width: 1200px) {
    body {
        background: #ddd;
    }
}
```








# responsive-image

이미지는 고정된 크기를 가지고 있습니다. 반응형에서는 자동으로 커지고 작아져야 합니다.

작은 이미지를 강제적으로 늘리면 이미지가 제대로 나오지 않습니다.(width:100%)

그래서 이미지보다 클때는 원래 이미지 크기로 나오고 작을때는 작은 상태로 리사이징되게 지정할 수 있습니다.

```css
img {
    max-width: 100;
    height: auto;
}
```



