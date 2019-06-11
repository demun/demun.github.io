# list

순서없는 목록(ul)의 경우 목록앞에 불릿(bullet)을 넣을수 있고, 순서있는 목록(ol)의 경우는 번호 스타일을 지정할 수 있습니다. 이때 사용하는것이 `list-style-type` 입니다.

```css
list-style-type: none | <순서없는 목록의 불릿> | <순서있는 목록의 번호>
```


##### 순서없는 목록에서 불릿 모양 바꾸기

`list-style-type` 속성값으로 원하는 형태의 불릿 모양을 지정할 수 있습니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>disc</td>
        <td>채운 원</td>
    </tr>
    <tr>
        <td>circle</td>
        <td>빈 원</td>
    </tr>
    <tr>
        <td>square</td>
        <td>채운 사각형</td>
    </tr>
    <tr>
        <td>none</td>
        <td>블릿 없애기</td>
    </tr>
</table>


```html
<ul style="list-style-type:square">
    <li>list</li>
    <li>list</li>
</ul>
```

<ul style="list-style-type:square">
    <li>list</li>
    <li>list</li>
</ul>




##### 순서 있는 목록에서 숫자 바꾸기

순서 있는 목록에서 숫자의 타입을 지정할 수 있습니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>decimal</td>
        <td>1로 시작하는 십진수</td>
    </tr>
    <tr>
        <td>decimal-leading-zero</td>
        <td>앞에 0이 붙는 십진수</td>
    </tr>
    <tr>
        <td>lower-roman</td>
        <td>소문자 로마 숫자</td>
    </tr>
    <tr>
        <td>upper-roman</td>
        <td>대문자 로마 숫자</td>
    </tr>
    <tr>
        <td>lower-alpha 또는 lower-latin</td>
        <td>소문자 알파벳</td>
    </tr>
    <tr>
        <td>upper-alpha 또는 upper-latin</td>
        <td>대문자 알파벳</td>
    </tr>
    <tr>
        <td>armenian</td>
        <td>아르메니아 숫자</td>
    </tr>
    <tr>
        <td>georgian</td>
        <td>조지 완조시대의 숫자</td>
    </tr>
</table>

3개씩 순서화한 목록

<ul>
    <li style="list-style-type:decimal">decimal</li>
    <li style="list-style-type:decimal">decimal</li>
    <li style="list-style-type:decimal">decimal</li>
    <li style="list-style-type:decimal-leading-zero">decimal-leading-zero</li>
    <li style="list-style-type:decimal-leading-zero">decimal-leading-zero</li>
    <li style="list-style-type:decimal-leading-zero">decimal-leading-zero</li>
    <li style="list-style-type:lower-roman">lower-roman</li>
    <li style="list-style-type:lower-roman">lower-roman</li>
    <li style="list-style-type:lower-roman">lower-roman</li>
    <li style="list-style-type:upper-roman">upper-roman</li>
    <li style="list-style-type:upper-roman">upper-roman</li>
    <li style="list-style-type:upper-roman">upper-roman</li>
    <li style="list-style-type:lower-alpha">lower-alpha</li>
    <li style="list-style-type:lower-alpha">lower-alpha</li>
    <li style="list-style-type:lower-alpha">lower-alpha</li>
    <li style="list-style-type:armenian">armenian</li>
    <li style="list-style-type:armenian">armenian</li>
    <li style="list-style-type:armenian">armenian</li>
    <li style="list-style-type:georgian">georgian</li>
    <li style="list-style-type:georgian">georgian</li>
    <li style="list-style-type:georgian">georgian</li>
</ul>


##### 불릿 대신 이미지 넣기

`list-style-image` 속성을 사용하여 불릿 대신 이미지를 목록 앞에 넣을 수 있습니다.

```css
list-style-image: <이미지 경로> | none;
```

```html
<ul style="list-style-image: url(../images/bullet.png)">
    <li>list</li>
    <li>list</li>
    <li>list</li>
</ul>
```

<ul style="list-style-image: url(../images/bullet.png)">
    <li>list</li>
    <li>list</li>
    <li>list</li>
</ul>


##### 목록에 들여쓰기 효과 내기

`list-style-position` 속성을 사용하면 불릿의 위치를 안쪽이나 바깥쪽으로 표시할 수 있습니다.

```css
list-style-position: inside | outside;
```

<ul style="list-style-position: inside">
    <li>list</li>
    <li>list</li>
    <li>list</li>
</ul>

<ul style="list-style-position: outside">
    <li>list</li>
    <li>list</li>
    <li>list</li>
</ul>



##### 목록 속성 한꺼번에 표시하기

`list-style` 속성으로 한꺼번에 표시할 수 있습니다.

```css
list-style: [ <'list-style-type'> || <'list-style-position'> || <'list-style-image'> ] | inherit;
```

```html
<ul style="list-style: lower-roman inside;">
    <li>list</li>
    <li>list</li>
    <li>list</li>
</ul>
```

<ul style="list-style: lower-roman inside;">
    <li>list</li>
    <li>list</li>
    <li>list</li>
</ul>






# table


표의 크기뿐만 아니라 테두리, 셀의 테두리, 여러 가지 여백 등 표 스타일을 지정할 수 있습니다.


### caption-side 속성 - 표 제목 위치 정하기

표 제목은 `<caption>`태그를 이용해 캡션으로 표시합니다. 기본적으로 캡션은 표의 위쪽에 표시되지만 caption-side 속성을 이용하면 표의 아래쪽으로 옮길 수 있습니다.


```css
caption-size: top | bottom
```


<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>top</td>
        <td>캡션을 표의 윗부분에 표시합니다. 기본값</td>
    </tr>
    <tr>
        <td>bottom</td>
        <td>캡션을 표의 아래부분에 표시합니다.</td>
    </tr>
</table>


### border 속성 - 표 테두리 스타일 결정하기

border 속성을 이용하여 표의 테두리를 지정할 수도 있고, 셀에도 테두리를 지정할 수 있습니다.

아래 예제는 표에도 테두리를 지정하고, 셀에도 각각 테두리를 지정했습니다.

<table style="border: 1px solid red;">
    <tr>
        <td style="border: 1px dotted blue;">내용</td>
        <td style="border: 1px dotted blue;">내용</td>
    </tr>
    <tr>
        <td style="border: 1px dotted blue;">내용</td>
        <td style="border: 1px dotted blue;">내용</td>
    </tr>
</table>

```css
table {
  border: 1px solid red;
}

td {
  border: 1px dotted blue;
}
```

### border-collapse 속성 - 테두리 통합, 분리하기

위에서처럼 td 태그에서 border 속성을 사용하면 두 줄로 표시되는데 이때 border-collapse 속성을 이용하면 표의 바깥 테두리와 셀의 각 테두리가 떨어져 있는것을 그대로 둘 것인지, 두 테두리를 하나로 합칠것인지 결정할 수 있습니다.

```css
border-collapse: collapse | separate
```


<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>collapse</td>
        <td>테두리를 하나로 합쳐 표시합니다.</td>
    </tr>
    <tr>
        <td>separate</td>
        <td>테두리를 따로 표시합니다. 기본값</td>
    </tr>
</table>



아래 예제는 표의 바깥 테두리와 셀의 테두리가 합쳐져 하나의 테두리인 것처럼 지정한것입니다.

```css
table {
  border: 1px solid red;
  border-collapse: collapse;
}

td {
  border: 1px dotted blue;
}
```

<table style="border: 1px solid red; border-collapse: collapse;">
    <tr>
        <td style="border: 1px dotted blue;">내용</td>
        <td style="border: 1px dotted blue;">내용</td>
    </tr>
    <tr>
        <td style="border: 1px dotted blue;">내용</td>
        <td style="border: 1px dotted blue;">내용</td>
    </tr>
</table>


### border-spacing 속성 - 인접한 셀 테두리 사이 거리 지정하기

border-spacing 속성은 border-collapse: separate를 사용해 셀들을 분리했을 경우, 인접한 셀 테두리 사이의 거리를 지정합니다.

```css
border-spacing: <크기>
```


<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>크기</td>
        <td>px 나 em 등 크기와 단위를 직접 지정합니다.</td>
    </tr>
</table>


아래 예제는 표의 테두리와 셀의 테두리 사이의 간격을 표시하려고 border-spacing 를 사용하여 지정했습니다.


```css
table {
  border: 1px solid red;
  border-collapse: separate;
  border-spacing: 20px 40px;
}

td {
  border: 1px dotted blue;
}
```

<table style="border: 1px solid red; border-collapse: separate; border-spacing: 20px 40px;">
    <tr>
        <td style="border: 1px solid blue;">내용</td>
        <td style="border: 1px solid blue;">내용</td>
    </tr>
    <tr>
        <td style="border: 1px solid blue;">내용</td>
        <td style="border: 1px solid blue;">내용</td>
    </tr>
</table>


