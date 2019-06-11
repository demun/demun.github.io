# 여백 margin, padding


### margin 속성 - 요소 주변 여백 설정하기

마진(margin)은 요소 주변에 여백입니다. 이를 이용하면 요소와 요소 사이의 간격을 조절할 수 있습니다.

```CSS
margin-top: <크기> | <백분율> | auto
margin-right: <크기> | <백분율> | auto
margin-bottom: <크기> | <백분율> | auto
margin-left: <크기> | <백분율> | auto
margin: <크기> | <백분율> | auto
```

마진 속성에는 margin-top, margin-right, margin-bottom, margin-left 가 있는데 나열한 순서대로 위, 오른쪽, 아래, 왼쪽 마진을 설정할 수 있고, 한번에 지정할때는 margin 사용할 수 있습니다.

- `margin: 10px` 는 네 방향 모두 여백을 줍니다. `margin: 10px 10px 10px 10px`와 같습니다.
- `margin: 10px 20px` 는 위 아래는 10px 오른쪽 왼쪽은 20px 를 줍니다. `margin: 10px 20px 10px 20px`와 같습니다.
- `margin: 10px 20px 30px` 는 위 10px, 오른쪽 20px, 아래 30px 를 주고 왼쪽은 오른쪽과 같은 20px를 줍니다. `margin: 10px 20px 30px 20px`와 같습니다.


<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>크기</td>
        <td>너비나 높이 값을 픽셀(px)이나 센티미터(cm) 같은 단위와 함께 수치로 지정합니다.</td>
    </tr>
    <tr>
      <td>백분율</td>
      <td>박스 모델을 포함하고 있는 부모요소를 기준으로 너비나 높이 값을 %로 지정합니다.</td>
    </tr>
    <tr>
        <td style="white-space:nowrap;">흐림정도</td>
        <td>display 속성에서 지정한 값에 맞게 적절한 값을 자동으로 지정합니다.</td>
    </tr>
</table>

margin-left 와 margin-right 의 값을 auto로 지정하면 요소의 너비 값을 뺀 나머지 공간의 좌우 마진을 똑같이 맞쳐 중앙에 배치하게 됩니다.

```css
.ex {
  width: 100px;
  height: 100px;
  background-color: red;
  margin-left: auto;
  margin-right: auto;
}
```

미리보기

<div style="width:100px; height:100px; background-color:red; margin-left:auto; margin-right:auto;"></div>




#### padding 속성 - 콘텐츠 영역과 테두리 사이 여백 설정하기

패딩(padding)은 콘텐츠와 테두리 사이의 여백을 말합니다. margin 과 같이 padding-top, padding-right, padding-bottom, padding-left 처럼 순서대로 위, 오른쪽, 아래, 왼쪽의 여백을 지정합니다.

```CSS
padding-top: <크기> | <백분율> | auto
padding-right: <크기> | <백분율> | auto
padding-bottom: <크기> | <백분율> | auto
padding-left: <크기> | <백분율> | auto
padding: <크기> | <백분율> | auto
```

아래 예제는 컨텐츠(글씨)와 테두리에 여백을 보여줍니다.

```css
.ex {
  width: 100px;
  height: 100px;
  background-color: red;
  padding: 30px;
  border: 10px solid black;
}
```

미리보기

<div style="width:100px; height:100px; background-color: red; padding: 30px; border: 10px solid black;">컨텐츠의 크기는 여기까지입니다. 이외의 부분은 패딩입니다.</div>








# 너비, 높이


박스 모델에서 콘텐츠 영역의 크기를 지정할때 너비는 width 속성과 높이는 height 속성을 사용합니다.

```css
width: <크기> | <백분율> | auto
height: <크기> | <백분율> | auto
```

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>크기</td>
        <td>너비나 높이값을 px나 cm 같은 단위와 함께 수치로 지정합니다.</td>
    </tr>
    <tr>
        <td>백분율</td>
        <td>박스 모델을 포함하는 부모 요소를 기준으로 너비나 높이 값을 백분율(%)로 지정합니다.</td>
    </tr>
    <tr>
        <td>auto</td>
        <td>박스 모델의 너비와 높이 값이 콘텐츠 양에 따라 자동으로 결정됩니다. 기본값</td>
    </tr>
</table>

- 실제 컨텐츠 크기 계산하기

너비를 나타내는 width 속성에 좌우 패딩과 테두리까지 합쳐야 실제 컨텐츠의 크기를 알수 있습니다.

```css
.ex {
  width: 200px; /* 너비 */
  height: 200px; /* 높이 */
  padding: 10px; /* 여백 */
  border: 5px solid #000; /* 테두리 */
  background: red; /* 보여주기위한 예제*/
}
```

<kdb>컨텐츠 크기(230) = 너비(200) + 좌우여백(20) + 좌우테두리(10)</kdb>

<div style="width:200px; height:200px; padding:10px; border:5px solid #000; background:red;"></div>



# 최대너비, 최대높이

최대는 `max-` 접두사를 최소는 `min-` 접두사를 붙입니다.

최대 너비는 `max-width`를 사용해서 컨텐츠의 최대 너비를 지정합니다.

최소 너비의 예

```css
.ex {
    min-height: 100px;
}
```

