# gradient


CSS3 에서는 색상 그라데이션(gradation)를 사용해 배경을 꾸밀 수도 있습니다. 선형이나 원형 그라데이션을 사용할때 브라우져를 고려해야하지만 유용한 기능입니다.

모던 브라우져 초기버젼에서는 접두사를 붙여야만 지원함으로 각 브라우져별로 속성을 지정하고 마지막에 표준 구문을 작성합니다.

<table class="table">
    <tr>
        <th>접두사</th>
        <th>브라우저 버젼</th>
    </tr>
    <tr>
        <td>-webkit-</td>
        <td>사파리, 크롬</td>
    </tr>
    <tr>
        <td>-moz-</td>
        <td>파이어폭스</td>
    </tr>
    <tr>
        <td>-o-</td>
        <td>오페라</td>
    </tr>
</table>

브라우져별 접두사를 적용한 예:

```css
.grad {
  background: blue; /* 그라데이션을 지원하지 않는 브라우져용 */
  background: -webkit-linear-gradient(left top, blue, white);
  background: -moz-linear-gradient(right bottom, blue, white);
  background: -o-linear-gradient(right bottom, blue, white);
  background: linear-gradient(to right bottom, blue, white); /* 표준구문 */
}
```

#### 선형 그라데이션

선형 그라데이션은 색상이 수직, 수평 또는 대각선 방향으로 일정하게 변하는 것을 말합니다.

```css
linear-gradient( [각도 | to 방향,]? color-stop [, color-stop])
```

###### 방향

그라데이션 방향을 지시할 때는 끝 지점을 기준으로 `to` 키워드와 함께 사용합니다.
선형 그라데이션의 위치나 각도 옵션을 생략하면 `to bottom`으로 인식합니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>to top</td>
        <td>아래에서 시작해 위로 만들어집니다.</td>
    </tr>
    <tr>
        <td>to left</td>
        <td>오른쪽에서 시작해 왼쪽으로 만들어집니다.</td>
    </tr>
    <tr>
        <td>to right</td>
        <td>왼쪽에서 시작해 오른쪽으로 만들어집니다.</td>
    </tr>
    <tr>
        <td>to bottom</td>
        <td>위에서 시작해 아래로 만들어집니다.</td>
    </tr>
</table>

브라우져별 지원방식이 약간 달라 주의해서 사용해야 합니다.

<table class="table">
    <tr>
        <th>접두사</th>
        <th>브라우저 버젼</th>
        <th>위치 속성 값</th>
    </tr>
    <tr>
        <td>-webkit-</td>
        <td>사파리 5.1 ~ 6.0</td>
        <td>그라데이션 시작위치 기준</td>
    </tr>
    <tr>
        <td>-moz-</td>
        <td>파이어폭스 3.6 ~ 15</td>
        <td>그라데이션 끝 위치 기준, to 키워드 사용하지 않음</td>
    </tr>
    <tr>
        <td>-o-</td>
        <td>오페라 11.1 ~ 12.0</td>
        <td>그라데이션 끝 위치 기준, to 키워드 사용하지 않음</td>
    </tr>
</table>

아래 예는 왼쪽 위에서 파란색으로 시작해 오른쪽 아래에서 흰색으로 변하는 그라데이션을 정의한 겁니다.

```css
.ex {
  background: blue;
  background: -webkit-linear-gradient(left top, blue, white);
  background: -moz-linear-gradient(bottom right, blue, white);
  background: -o-linear-gradient(bottom right, blue, white);
  background: linear-gradient(to bottom right, blue, white);
}
```

<div style="height:200px; background:blue; background:-webkit-linear-gradient(left top, blue, white); background:-moz-linear-gradient(bottom right, blue, white);
background:-o-linear-gradient(bottom right, blue, white);
background:linear-gradient(to bottom right, blue, white);"></div>


###### 각도

선형 그라데이션에서 색상이 바뀌는 방향을 알려주는 방법으로 각도를 사용할 수 있습니다.
이때의 각도는 그라데이션이 끝나는 각도이며, `deg` 단위를 써서 표시합니다.

맨 위부분이 `0deg`이고 시계 방향으로 회전하면서 `90deg, 180deg, 270deg` 등이 됩니다.
예를들어 `45deg` 는 오른쪽 위 방향이므로 왼쪽 아래에서 오른쪽 위로 끝납니다.

![linear-gradient-angle](/images/linear-gradient-angle.jpg)

아래 예제는 왼쪽 아래에서 오른쪽 위로 변하고, 빨간색에서 흰색으로 변하는 선형 그라데이션을 정의한겁니다.

```css
.ex {
  height: 200px;
  background: #ff0000;
  background: -webkit-linear-gradient(45deg, #ff0000, #ffffff);
  background: -moz-linear-gradient(45deg, #ff0000, #ffffff);
  background: -o-linear-gradient(45deg, #ff0000, #ffffff);
  background: linear-gradient(to 45deg, #ff0000, #ffffff);
}
```

<div style="height:200px; background:#ff0000; background:-webkit-linear-gradient(45deg, #ff0000, #ffffff); background:-moz-linear-gradient(45deg, #ff0000, #ffffff);
background:-o-linear-gradient(45deg, #ff0000, #ffffff);
background:linear-gradient(to 45deg, #ff0000, #ffffff);"></div>



###### 색상 중지 점(color-stop)

선형 그라데이션을 만들기 위해서는 바뀌는 부분의 색을 지정해줘야 하는데 그 지점을 색상 중지 점(color-stop) 라고 합니다.
색상 중지 점을 지정할때는 색상만 지정할수도 있고, 색상과 중지 점의 위치도 같이 지정 할수도 있습니다.

다음 예는 시작색상과 끝색상을 #06f 로 하고 시작위치에서 30% 지점에 흰색을 두어 위에서 아래로 부드럽게 연결되는 그라데이션을 정의한 것입니다.

<div style="height: 200px; background: #06f; background-image: -webkit-linear-gradient(top, #06f, white 30%, #06f); background-image: -moz-linear-gradient(bottom, #06f, white 30%, #06f); background: -o-linear-gradient(bottom, #06f, white 30%, #06f); background: linear-gradient(to bottom, #06f, white 30%, #06f);"></div>

코드 예:

```css
.ex {
    height: 200px;
    background-image: -webkit-linear-gradient(top, #06f, white 30%, #06f);
    background-image: -moz-linear-gradient(bottom, #06f, white 30%, #06f); 
    background: -o-linear-gradient(bottom, #06f, white 30%, #06f); 
    background: linear-gradient(to bottom, #06f, white 30%, #06f);
}
```







#### 원형 그라데이션

원형 그라데이션은 원이나 타원의 주심부터 바깥 방향으로 색상이 바뀌는 형태입니다.
원의 중심과 크기를 지정하고 그라데이션의 모양을 지정해야 합니다.

```css
radial-gradient( <최종모양> <크기> at <위치>, color-stop, [color-stop]);
```

###### 모양

원형 그라데이션에서 모양은 circle(원형)과 ellipse(타원형) 입니다.
따로 지정하지 않으면 ellipse로 인식합니다.

아래 예는 circle로 정의한 경우입니다.

```css
.ex {
    height: 200px;
    width: 200px;
    background: red; 
    background: -webkit-radial-gradient(circle, white, yellow, red); 
    background: -moz-radial-gradient(circle, white, yellow, red); 
    background: -o-radial-gradient(circle, white, yellow, red); 
    background: radial-gradient(circle, white, yellow, red);
}
```

<div style="height: 200px; width: 200px; background: red; background: -webkit-radial-gradient(circle, white, yellow, red); background: -moz-radial-gradient(circle, white, yellow, red); background: -o-radial-gradient(circle, white, yellow, red); background: radial-gradient(circle, white, yellow, red);"></div>

###### 위치

표준 구문에서는 `모양`과 `크기` 속성 다음에 `at` 키워드와 함께 위치값을 지정하는데 브라우져 접두사를 붙이는 구문에서는 `at` 키워드 없이 구문의 맨 앞부분에 위치를 표시합니다.

사용할 수 있는 위치값은 키워드(left, center, right 중 하나, top, center, bottom 중 하나)나 30% 와 같은 백분율입니다.
생략하면 가로 세로 모두 중앙인 center 로 인식합니다.

10% 10% 위치에서 흰색에서 파란색으로 변하는 원형 그라데이션을 정의한 겁니다.

```css
.ex {
    height: 200px;
    width: 200px;
    background: blue; /* css 미지원 브라우저 */
    background: -webkit-radial-gradient(10% 10%, circle, white, blue); /* 초기 모던 브라우저 */
    background: -moz-radial-gradient(10% 10%, circle, white, blue); /* 초기 모던 브라우저 */
    background: -o-radial-gradient(10% 10%, circle, white, blue); /* 초기 모던 브라우저 */
    background: radial-gradient(circle at 10% 10%, white, blue); /* 최신 모던 브라우저 */
}
```

<div style="height: 200px; width: 200px; background: blue; background: -webkit-radial-gradient(10% 10%, circle, white, blue); background: -moz-radial-gradient(10% 10%, circle, white, blue); background: -o-radial-gradient(10% 10%, circle, white, blue); background: radial-gradient(circle at 10% 10%, white, blue);"></div>

###### 크기

원의 모양을 나타내는 키워드 값(circle 또는 elipse)과 크기를 나타내는 키워드 값을 같이 사용하면 됩니다.

* closest-side 속성 값

이 속성값을 사용하면 원의 경우, 그라데이션 가장자리가 중심에서 가장 가까운 요소의 모서리와 만나고, 타원의 경우, 중심에서 가장 가까운 요소의 수평축이나 수직축과 만납니다.

<div style="height: 150px; width:150px; background: radial-gradient(closest-side at 60% 55%,blue,green,yellow,black);"></div>


```css
.ex {
    height: 150px; 
    width:150px; 
    background: radial-gradient(closest-side at 60% 55%,blue,green,yellow,black);
}
```

* farthest-side 속성 값

그라데이션 가장자리가 중심에서 가장 먼 모서리와 만납니다.

<div style="height: 150px; width:150px; background: radial-gradient(farthest-side at 60% 55%,blue,green,yellow,black);"></div>


```css
.ex {
    height: 150px; 
    width:150px; 
    background: radial-gradient(farthest-side at 60% 55%,blue,green,yellow,black);
}
```

* closest-corner 속성 값

그라데이션 가장자리가 그라데이션 중심에서 가장 가까운 요소의 코너에 닿도록 합니다.

<div style="height: 150px; width:150px; background: radial-gradient(closest-corner at 60% 55%,blue,green,yellow,black);"></div>



```css
.ex {
    height: 150px; 
    width:150px; 
    background: radial-gradient(closest-corner at 60% 55%,blue,green,yellow,black);
}
```


* farthest-corner 속성 값(기본 값)

그라데이션 가장자리가 중심에서 가장 먼 코너에 닿도록 합니다.

<div style="height: 150px; width:150px; background: radial-gradient(farthest-corner at 60% 55%,blue,green,yellow,black);"></div>

```css
.ex {
    height: 150px; 
    width:150px; 
    background: radial-gradient(farthest-corner at 60% 55%,blue,green,yellow,black);
}
```

###### 색상 중지 점(color-stop)

선형 그라데이션처럼 원형 그라데이션에서 색상이 바뀌는 부분을 색상 중지 점(color-stop)이라고 하는데 색상뿐만 아니라 바뀌는 위치도 함께 지정할 수 있습니다.

다음 예제는 중앙에서 시작해 시작 색상은 빨간색이고 노란색을 거쳐 하늘색으로 끝나는 원형 그라데이션입니다.
모양을 지정하지 않아서 타원형이고, 시작 색상의 위치값을 지정하지 않아서 중간 위치에서 시작해 크기 기본값인 farthest-corner 로 표시됩니다.

```css
.ex {
    width: 200px;
    height: 200px;
    background: skyblue; /* css3 미지원 브라우저 */
    background: -webkit-radial-gradient(red, yellow, skyblue); /* 초기 모던 브라우저 */
    background: -moz-radial-gradient(red, yellow, skyblue); /* 초기 모던 브라우저 */
    background: -o-radial-gradient(red, yellow, skyblue); /* 초기 모던 브라우저 */
    background: radial-gradient(red, yellow, skyblue); /* 최신 모던 브라우저 */
}
```

<div style="width: 200px; height: 200px; background: skyblue; background: -webkit-radial-gradient(red, yellow, skyblue);  background: -moz-radial-gradient(red, yellow, skyblue); background: -o-radial-gradient(red, yellow, skyblue); background: radial-gradient(red, yellow, skyblue);"></div>



###### 그라데이션 반복

선형 그라데이션과 원형 그라데이션은 패턴을 한 번 만든 후 요소를 채울 만큼 반복해 표시할 수 있습니다.
선형 그라데이션을 반복할때는 `repeating-linear-gradient` 를 사용하며 원형 그라데이션의 반복은 `repeating-radial-gradient`를 사용합니다.

아래는 노란색과 빨간색이 반복되는 선형 그라데이션입니다.

```css
.ex {
    width: 200px;
    height: 200px;
    background: repeating-linear-gradient(yellow, red 20px);
}
```

<div style="width: 200px; height: 200px; background: repeating-linear-gradient(yellow, red 20px);"></div>

선형 그라데이션의 반복 기능은 위처럼 그라데이션을 반복하는것보다 배경에 두개 이상의 색상을 반복해 표시할때 유용합니다.
그러기 위해서는 패턴을 만들어서 사용합니다.

위 예제에서는 `yellow, red 20px` 옵션을 사용했기때문에 노랑색부터 빨간색까지 부드럽게 섞여 표시되지만 다음 노란색이 시작되는 부분에서는 이전 빨간색과 노란색이 겹쳐 주황색처럼 표시됩니다.
다음은 시작색상과 끝색상을 명확히 구분해 준 예제입니다.


```css
.ex {
    width: 200px;
    height: 200px;
    background: repeating-linear-gradient(yellow, yellow 20px, red 20px, red 40px);
}
```

<div style="width: 200px; height: 200px; background: repeating-linear-gradient(yellow, yellow 20px, red 20px, red 40px);"></div>


선형 그라데이션 패턴 예:

```css
.ex {
    width: 200px;
    height: 200px;
    background: repeating-radial-gradient(circle, white, white 10%, #ccc 10%, #ccc 20%);
}
```

<div style="width: 200px; height: 200px; background: repeating-radial-gradient(circle, white, white 10%, #ccc 10%, #ccc 20%);"></div>


