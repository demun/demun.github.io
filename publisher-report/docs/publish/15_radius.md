# radius


`border-radius` 속성을 사용하면 박스 모서리 부분을 둥글게 만들수 있습니다.
박스 모서리의 두 방향과 반지름을 뜻하는 radius 를 사용해서 둥글게 만들수 있습니다.

```css
border-top-left-radius: <크기> | <백분율>
border-top-right-radius: <크기> | <백분율>
border-bottom-right-radius: <크기> | <백분율>
border-bottom-left-radius: <크기> | <백분율>
border-radius: <크기> | <백분율>
```

네 군데 모두 둥글게 처리하려면 `border-radius` 속성을 사용하고, 각각 다르게 설정하면 방향을 나타내는 `border-top-left-radius`(왼쪽 위 모서리) 등을 사용합니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>크기</td>
        <td>둥글게 처리할 반지름 크기를 px 나 em 같은 단위와 함께 수치로 표시합니다.</td>
    </tr>
    <tr>
        <td>백분율</td>
        <td>현재 요소의 크기를 기준으로 둥글게 처리할 반지름 크기를 %로 지정합니다.</td>
    </tr>
</table>

아래코드는 오른쪽 상단과, 왼쪽 하단을 20px 만큼 둥글게 만드는 코드입니다.

```css
.ex {
  width: 100px;
  height: 100px;
  background-color: red;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
```

미리보기

<div style="width:100px; height:100px; border-top-right-radius:20px; border-bottom-left-radius:20px; background-color:red;"></div>



##### 타원 형태로 둥글게 만들기

타원 형태로 만들려면 가로 반지름 크기와 세로 반지름 크기를 함께 지정하면 됩니다

```CSS
border-top-left-radius: <가로크기> <세로 크기>
border-top-right-radius: <가로크기> <세로 크기>
border-bottom-left-radius: <가로크기> <세로 크기>
border-bottom-right-radius: <가로크기> <세로 크기>
border-radius: <가로크기> / <세로 크기>
```

네 방향을 한번에 지정하는 경우 `border-radius` 를 사용하는데 가로크기와 세로크기 사이에 슬래시(/)를 넣어 구분합니다.

아래 예제는 왼쪽 상단에 둥근타원형태로 만들어봤습니다.

```css
.ex {
  width: 200px;
  height: 100px;
  background-color: red;
  border-top-left-radius: 100px 50px;
}
```

미리보기

<div style="border-top-left-radius: 100px 50px; width: 200px; height: 100px; background-color: red;"></div>


