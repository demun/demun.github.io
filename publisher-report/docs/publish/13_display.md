# display

`display` 속성을 사용하면 블록레벨요소를 인라인 레벨 요소로 바꿀수도 있고, 여려형태로 사용할 수 있습니다.

`display` 속성은 해당 요소가 화면에 어떻게 보일지를 지정할 때 사용합니다.

```css
display: none | block | inline-block | inline;
```

##### inline-block

인라인 레벨요소에는 너비나 마진같은 박스 모델값이 정확히 적용되지 않습니다. `inline-block` 를 사용하면 인라인과 블록의 두가지 특성을 모두 가집니다.

다음 예제는 인라인 요소에 `inline-block` 를 사용하여 너비 높이, 마진을 적용한 예제입니다.

```css
span {
  display: inline-block;
  width: 200px;
  height: 50px;
  margin-right: 10px;
  background-color: #ccc;
}
```

<div>
    <span style="display: inline-block; width:200px; height: 50px; margin-right: 10px; background-color: #ccc;"></span>
    <span style="display: inline-block; width:200px; height: 50px; margin-right: 10px; background-color: #ccc;"></span>
    <span style="display: inline-block; width:200px; height: 50px; margin-right: 10px; background-color: #ccc;"></span>
</div>








### position

배치 방법 지정하기

position 속성을 이용하면 가로나 세로로 배치할 수 있습니다.

```CSS
position: static | relative | absolute | fixed
```

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>static</td>
        <td>요소를 문서의 흐름에 맞추어 배치합니다. 기본값</td>
    </tr>
    <tr>
        <td>relative</td>
        <td>이전 요소에 자연스럽게 연결해 배치하되 위치를 지정할 수 있습니다.</td>
    </tr>
    <tr>
      <td>absolute</td>
      <td>원하는 위치를 지정해 배치합니다.</td>
    </tr>
    <tr>
      <td>fixed</td>
      <td>지정한 위치에 고정해 배치합니다. 화면에서 요소가 잘릴 수도 있습니다.</td>
    </tr>
</table>

position 속성중 static 을 제외한 나머지 속성은 죄표를 이용해 위치를 배치합니다. 이 때 위치는 top, bottom, left, right 로 지정합니다.

top 은 위쪽에서 얼마나 떨어져 있는지를 나타내는데 값이 0이면 제일 위쪽을 말합니다. bottom, left, right 도 마찬가지 입니다.

###### static 속성 값 - 문서의 흐름대로 배치하기

static 은 position 속성의 기본값으로 요소를 나열한 순서대로 배치하며 top, right 같은값은 사용할 수 없습니다. 단지 float 속성을 이용해 죄우로 배치할 수 있습니다.

###### relative 속성 값 - 문서 흐름 따라 위치 지정하기

relative 속성 값은 순서대로 배치되지만 top, bottom, left, right 속성을 사용해서 좌푯값을 사용해 위치를 지정할 수 있습니다.

아래 예제는 하위요소가 부모요소에 대해 위에서 10px, 왼쪽에서 100px 떨어진 위치에 배치합니다.

```CSS
.parent {
  width: 100%;
  height: 300px
  border: 1px solid red;
}

.child {
  width: 100px;
  height: 100px;
  border: 1px solid blue;
  position: relative;
  top: 10px;
  left: 100px;
}
```

<div style="height: 200px; width: 100%; border: 1px solid blue;">
  <div style="width:100px; height:100px; border: 1px solid red; position: relative; top: 10px; left: 100px;"></div>
</div>

###### absolute 속성 값 - 원하는 위치에 배치하기

absolute 속성은 문서의 흐름과 상관없이 left, right, top, bottom 속성값을 이용해 원하는 위치에 배치할 수 있습니다. 이때 기준이 되는 위치는 가장 가까운 부모요소나 조상요소중 position 속성이 relative 인 요소입니다.


```CSS
.parent {
  width: 100%;
  height: 300px
  border: 1px solid red;
  position: relative;
}

.child {
  width: 100px;
  height: 100px;
  border: 1px solid blue;
  position: absolute;
  top: 10px;
  left: 100px;
}
```

<div style="height: 300px; width: 100%; border: 1px solid blue; position: relative;">
  <div style="width:100px; height:100px; border: 1px solid red; position: absolute; top: 10px; left: 100px;"></div>
</div>

###### fixed 속성 값 - 브라우저 창 기준으로 배치하기

fixed 속성 값도 absolute 속성 값처럼 문서의 흐름과 상관없이 위치를 좌표로 결정하지만 부모 오소가 아닌 브라우저 창이 기준이 됩니다.
브라우저 창 왼쪽 위 꼭지점을 원점으로 두고 좌표가 계산되며, 한번 배치되면 브라우저 창을 스크롤 하더라도 계속 고정되어 표시됩니다.

[예제보기](../html/ex/fixed.html)





### float 속성 - 왼쪽이나 오른쪽에 배치하기

float 속성은 요소를 문서 위에 떠 있게 만들어서 왼쪽이나 오른쪽으로 배치합니다.

```css
float: left | right | none
```

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>left</td>
        <td>해당 요소를 문서의 왼쪽에 배치합니다.</td>
    </tr>
    <tr>
      <td>right</td>
      <td>해당 요소를 문서의 오른쪽에 배치합니다.</td>
    </tr>
    <tr>
      <td>none</td>
      <td>좌우 어느쪽으로도 배치하지 않습니다.</td>
    </tr>
</table>

아래 예제는 너비 높이 100px 인 요소를 오른쪽에 배치합니다.

```CSS
.ex {
  width: 100px;
  height: 100px;
  background-color: red;
  float: right;
}
```

<div style="width: 100px; height: 100px; background-color: red; float: right;"></div>
<div style="clear: both;"></div>

> float 속성은 다음에 오는 요소에까지 영향을 미쳐 float 속성을 해제해줘야 다음에 오는 요소를 바르게 배치할 수 있습니다.


### clear 속성 - float 속성 해제하기

float 속성은 왼쪽이나 오른쪽에 배치하면 그 다음에 오는 요소들도 영향을 받아 한쪽으로 배치가 됩니다. 같은 방향으로 배치할때는 상관이 없으나 그렇지 않을경우는 float 속성을 해제해줘야 하는데 clear 속성을 사용합니다.

```CSS
clear: none | left | right | both
```

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>none</td>
        <td>float 속성을 해제하지 않습니다.</td>
    </tr>
    <tr>
        <td>left</td>
        <td>왼쪽으로 배치하는 속성을 해제합니다.</td>
    </tr>
    <tr>
      <td>right</td>
      <td>오른쪽으로 배치하는 속성을 해제합니다.</td>
    </tr>
    <tr>
      <td>both</td>
      <td>좌우 모두 해제합니다.</td>
    </tr>
</table>

위 요소에서 `float: left` 처럼 왼쪽으로 요소를 띄우면 다음 요소에서는 `clear: left` 라고 float 속성을 해제합니다. 방향을 일일이 맞쳐서 해제를 해줘야 하기 때문에 양쪽다 해제하는 `clear:both` 를 많이 사용합니다.



#### float 속성을 해제해는 가장 좋은 방법

float 는 실무에서 매우 빈번하게 사용됩니다. float 속성을 clear 속성으로 해제를 해도 몇가지 버그가 존재합니다.

예를들어 float 를 속성을 사용한 요소의 부모요소는 전체 너비를 같지 못합니다.

아래코드를 보면 float 속성을 사용한 요소의 부모요소에 배경으로 #ddd 색상을 지정했습니다.

```html
<div style="background-color: #ddd;">
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
</div>
```

미리보기

<div style="background-color: #ddd;">
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
</div>
<div style="clear:both;"></div>

하지만 이처럼 배경색을 갖지 못합니다. 부모요소는 하위요소를 포함한 영역을 가지고 있어야 하는데 그렇지 못합니다.

그래서 float 속성만 해제하는것만 하는것이 아니라 float 가 가지고 있는 버그 또한 해결해야 합니다.

그것은 float 를 사용한 부모요소에 `clearfix` 라는 float 해제전용클래스를 부여하고 clearfix의 가상요소(::after)에 `content: ""; display: table; clear: both;` 라는 속성과 값을 부여합니다.

clearfix 라는 클래스는 이름을 변경해도 되지만 일반적으로 clearfix 클래스를 사용합니다.

CSS에 아래처럼 클래스에 대한 지정을 합니다.

```CSS
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

html 에는 clearfix 클래스만 부여합니다.

```html
<div class="clearfix" style="background-color: #ddd;">
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
</div>
```

그럼 아래처럼 부모가 배경색을 갖는 것을 볼 수 있습니다.

<div class="clearfix" style="background-color: #ddd;">
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
  <div style="width:100px; height:100px; border: 1px solid red; float: left;"></div>
</div>


