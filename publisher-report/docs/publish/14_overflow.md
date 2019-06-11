# overflow

overflow속성은 요소의 내용이 너무 커서 지정한 영역에 들어 가지 않을 때 내용을 클립할지 또는 스크롤 막대를 추가할지 지정합니다.

overflow속성의 값은 다음과 같습니다.

- visible : 기본값. 오버플로가 잘리지 않습니다. 그것은 요소의 상자 밖에 렌더링됩니다.
- hidden : 오버플로가 잘리고 나머지 내용은 보이지 않습니다.
- scroll : 오버플로가 잘리지만 스크롤바가 추가되어 나머지 내용을 볼 수 있습니다.
- auto : 오버플로가 잘린 경우 스크롤바를 추가하여 나머지 콘텐츠를 확인해야합니다.

> overflow속성은 지정된 높이의 블록 요소에 대해서만 작동합니다.


```css
.ex {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border:1px solid blue
}
```

<div style="width:200px; height:200px; overflow:hidden; border:1px solid blue">이 안에 내용물은 너비 높이 200px 입니다. 내용이 많으면 overflow: hidden 으로 인해 넘치는 부분은 안보이게 처리되었습니다.</div>









# opacity

opacity속성은 요소의 불투명도/투명도를 지정합니다.

단위는 0 ~ 1 까지 사용가능하며 소숫점도 사용할 수 있습니다.

```css
.ex {
    background: red;
    width: 200px;
    height: 200px;
    opacity: 0.5;
}
```

<div style="width:200px; height: 200px; background: red; opacity: 0.5;"></div>








