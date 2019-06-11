# box-shadow

선택한 요소에 그림자 효과 내기

그림자 효과는 `box-shadow` 속성을 사용하며 수평거리와 수직거리는 필수이며, 나머지 속성값은 옵션이므로 필요할때만 지정하면 됩니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td style="white-space:nowrap;">수평 거리</td>
        <td>수평으로 얼마나 떨어져 있는지의 값입니다. 양수값은 오른쪽, 음수값은 왼쪽에 그림자를 만듭니다. 필수 속성</td>
    </tr>
    <tr>
      <td style="white-space:nowrap;">수직 거리</td>
      <td>수직으로 얼마나 떨어져 있는지의 값입니다. 양수값은 아래쪽, 음수값은 위쪽에 그림자를 만듭니다. 필수 속성</td>
    </tr>
    <tr>
        <td style="white-space:nowrap;">흐림정도</td>
        <td>그림자의 흐림정도(blur radius)를 지정합니다. 이 값을 생략하면 0을 기본값으로 지정하고 진한 그림자가 표시됩니다. 값이 커질수록 부드러운 그림자를 표시하며 음수값은 사요알 수 없습니다.</td>
    </tr>
    <tr>
        <td>번짐정도</td>
        <td>그림자의 번지는 정도를 나타냅니다. 양수값은 모든 방향으로 퍼져 나가기 때문에 박스보다 크게 표시됩니다. 음수값은 그림자가 축소되어 보여집니다. 기본값은 0입니다.</td>
    </tr>
    <tr>
        <td>색상</td>
        <td>그림자의 색상을 지정합니다. 한가지만 지정할 수 있고, 공백으로 구분해 여려 개의 색상을 지정할 수도 있습니다. 기본값은 현재 글자색 입니다.</td>
    </tr>
    <tr>
        <td>inset</td>
        <td>이 키워드를 함께 표시하면 안쪽 그림자로 그립니다.</td>
    </tr>
</table>

아래 예제는 오른쪽 아래쪽으로 그림자를 그립니다.

```css
.ex {
  width: 200px;
  height: 100px;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 0 black;
}
```

<div style="width: 200px; height: 100px; border-radius: 20px; box-shadow: 2px 2px 5px 0 black;"></div>

<br><br>