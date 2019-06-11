# 텍스트


글꼴, 모양, 굵기 등 다양한 스타일을 지정할 수 있습니다.



#### 글꼴 지정하기

글꼴은 `font-family` 속성으로 지정합니다.

```css
body {
    font-family: <글꼴이름>[, <글꼴이름>, <글꼴이름>];
}
```

웹 문서에 포함된 텍스트들은 사용자의 글꼴을 이용해 웹브라우저 화면에 표시됩니다. 

예를들어 "맑은고딕"으로 지정할 경우 윈도우 7이상의 사용자라면 의도대로 표시되지만 "맑은고딕"이 설치되어 있지 않은 시스템인경우 브라우저의 기본값이 나타나 각각 다른글꼴로 표시됩니다.

따라서 한가지 글꼴만 지정해도 되지만, 지정한 글꼴이 없는 경우를 대비해 두번째, 세번째 글꼴까지 지정하는것이 일반적입니다.

```css
body {
    font-family: "맑은고딕", 돋움, 굴림;
}
```

> "맑은 고딕"처럼 두 단어 이상으로 된 글꼴 이름은 따옴표로 묶어줘야 합니다.

맑은고딕이 설치된 사용자라면 맑은고딕으로 보일것이고 만약 설치되지 않았다면 돋움 또는 굴림으로 표시됩니다. 그래서 뒷부분에는 모든 사용자가 설치되어 있는 기본 글꼴(web-safe font)을 일반적으로 지정합니다.

기본글꼴은 윈도우의 경우 영문이면 sans-serif 체와 serif 체가 있고, 한글이면 굴림, 궁서, 돋움, 바탕(체) 등이 있습니다.




#### 글자 크기 조정하기

글자 크기는 `font-size` 속성으로 조절합니다.

```css
.sample {
    font-size: <절대크기> | <상대크기> | <크기> | <백분율>;
}
```

font-size 속성에서 사용하는 속성값은 다음과 같습니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td><절대크기></td>
        <td>브라우저에서 지정한 글자 크기입니다. 사용할 수 있는 값은 xx-amall | x-small | small | medium | large | x-large | xx-large 입니다.</td>
    </tr>
    <tr>
        <td><상대크기></td>
        <td>부모 요소의 글자 크기를 기준으로 더 크거나 작게 표시합니다. 사용할 수 있는 값은 larger | smaller 입니다.</td>
    </tr>
    <tr>
        <td><크기></td>
        <td>브라우저와 상관없이 글자 크기를 지정합니다.</td>
    </tr>
    <tr>
        <td><백분율></td>
        <td>부모 유소의 글자 크기를 기준으로 해당하는 %를 계산해 표시합니다.</td>
    </tr>
</table>

`font-size` 에서 사용할 수 있는 값은 여러 형태이지만 주로 <크기>값을 많이 사용하는데 이때 사용할 수 있는 단위는 다음과 같습니다.

<table class="table">
    <tr>
        <th>단위</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>em</td>
        <td>해당 글꼴의 대문자 M의 너비를 기준으로 크기를 조절합니다.</td>
    </tr>
    <tr>
        <td>ex</td>
        <td>x-height(엑스 하이트). 해당 글꼴의 소문자 x의 높이를 기준으로 크기를 조절합니다.</td>
    </tr>
    <tr>
        <td>px</td>
        <td>픽셀. 모니터에 따라 상대적 크기가 됩니다.</td>
    </tr>
    <tr>
        <td>pt</td>
        <td>포인트.일반 문서에서 많이 사용하는 단위입니다.</td>
    </tr>
</table>


#### 글자 굵기 지정하기

글자 굵기는 `font-weight` 속성을 사용합니다.

```css
.sample {
    font-weight: normal | bold | border | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}
```

사용하는 속성값은 다음과 같습니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>narmal</td>
        <td>일반적인 형태로 기본 값입니다.</td>
    </tr>
    <tr>
        <td>bord | lighter | bolder</td>
        <td>굵게 | 원래 굵기보다 더 가늘게 | 원래 굵기보다 더 굵게 나타냅니다.</td>
    </tr>
    <tr>
        <td>100 ~ 900 사이의 수치</td>
        <td>400은 normal, 700은 bold에 해당하며 숫자 값을 주절해 좀 더 세밀히 글꼴 두께를 조절할 수 있습니다.</td>
    </tr>
</table>



#### 작은 대문자로 표시하기

작은 대문자란 대문자를 소문자 크기에 맞추어 작게 표시하는 것을 말합니다. `font-variant` 속성으로 지정합니다.

```css
.sample {
    font-variant: normal | small-caps;
}
```

`narmal` 은 일반적인 형태, `small-caps` 는 작은 대문자 형태로 표시합니다.


#### 글자 스타일 지정하기

글자를 이탤릭체로 표시할 수 있습니다. 

```css
.sample {
    font-style: normal | italic | oblique;
}
```

속성에 대한 설명은 다음과 같습니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>narmal</td>
        <td>일반적인 형태로 표시합니다.</td>
    </tr>
    <tr>
        <td>italic</td>
        <td>이탤릭체로 표시합니다. 대부분 기울어질 형태에 맞게 글꼴이 다음어져 있기 때문에 웹에서는 이 값을 사용합니다.</td>
    </tr>
    <tr>
        <td>oblique</td>
        <td>이탤릭체로 표시합니다. 원래 글꼴을 단지 기울어지게 표시할 뿐입니다.</td>
    </tr>
</table>



#### 글꼴 속성을 한번에 표현하기

`font` 속성을 사용하면 글꼴에 스타일을 한번에 지정할 수 있습니다.

```css
.sample {
    font: [ [ <'font-style'> || <'font-variant'> || <'font-weight'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar | inherit;
}
```

특정 키워드를 입력해 그것에 어울리는 글꼴 스타일로 표시할 수도 있습니다. caption, icon, menu 등이 그 예입니다.

<table class="table">
    <tr>
        <th>속성</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>font-*</td>
        <td>font-로 시작하는 글꼴 관련 속성을 한꺼번에 나열합니다.</td>
    </tr>
    <tr>
        <td>caption</td>
        <td>캡션에 어울리는 글꼴 스타일로 표시합니다.</td>
    </tr>
    <tr>
        <td>icon</td>
        <td>아이콘에 어울리는 글꼴 스타일로 표시합니다.</td>
    </tr>
    <tr>
        <td>menu</td>
        <td>드롭다운 메뉴에 어울리는 글꼴 스타일로 표시합니다.</td>
    </tr>
    <tr>
        <td>message-box</td>
        <td>대화상자에 어울리는 글꼴 스타일로 표시합니다.</td>
    </tr>
    <tr>
        <td>small-caption</td>
        <td>작은 캡션에 어울리는 글꼴 스타일로 표시합니다.</td>
    </tr>
    <tr>
        <td>status-bar</td>
        <td>상태 표시줄에 어울리는 글꼴 스타일로 표시합니다.</td>
    </tr>
</table>

예제;

<p style="font:caption">font:caption, 캡션에 어울리는 글꼴 스타일로 표시합니다.</p>
<p style="font:icon">font:icon, 아이콘에 어울리는 글꼴 스타일로 표시합니다.</p>
<p style="font:menu">font:menu, 드롭다운 메뉴에 어울리는 글꼴 스타일로 표시합니다.</p>
<p style="font:message-box">font:message-box, 대화상자에 어울리는 글꼴 스타일로 표시합니다.</p>
<p style="font:small-caption">font:small-caption, 작은 캡션에 어울리는 글꼴 스타일로 표시합니다.</p>
<p style="font:status-bar">font:status-bar, 상태 표시줄에 어울리는 글꼴 스타일로 표시합니다.</p>


<br>


## 텍스트 스타일

앞에서는 글꼴 관련된 스타일을 알아보았고, 여기서는 텍스트 스타일을 알아보겠습니다.

글꼴은 폰트와 관련이 있다면 텍스트 스타일은 글자와 단어들, 글자들로 이루어진 문단에서 사용되는 스타일 등입니다.


### 글자 색 지정하기

글자 색은 `color` 속성을 사용합니다.

```css
color: <색상>
```

색상값은 16진수, rgb(또는 rgba), hsl(또는 hsla), 색상이름으로 표시할 수 있습니다.

```html
<p style="color:rgb(0,200,0)">글자색 지정하기</p>
<p style="color:#f30">글자색 지정하기</p>
<p style="color:blue">글자색 지정하기</p>
```

<p style="color:rgb(0,200,0)">글자색 지정하기</p>
<p style="color:#f30">글자색 지정하기</p>
<p style="color:blue">글자색 지정하기</p>


### 텍스트에 줄 표시하기/없애기

`text-decoration` 속성을 사용하면 텍스트에 밑줄을 긋거나 취소선을 표시할 수 있습니다.

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>none</td>
        <td>밑줄을 표시하지 않습니다.</td>
    </tr>
    <tr>
        <td>underline</td>
        <td>밑줄을 표시합니다.</td>
    </tr>
    <tr>
        <td>overline</td>
        <td>영역 위로 선을 그림니다.</td>
    </tr>
    <tr>
        <td>line-through</td>
        <td>영역을 가로지르는 선(취소 선)을 그림니다.</td>
    </tr>
</table>

```html
<p style="text-decoration:none">text-decoration:none, 밑줄을 표시하지 않습니다.</p>
<p style="text-decoration:underline">text-decoration:underline, 밑줄을 표시합니다.</p>
<p style="text-decoration:overline">text-decoration:overline, 영역 위로 선을 그림니다.</p>
<p style="text-decoration:line-through">text-decoration:line-through, 영역을 가로지르는 선(취소 선)을 그림니다.</p>
```

예제;

<p style="text-decoration:none">text-decoration:none, 밑줄을 표시하지 않습니다.</p>
<p style="text-decoration:underline">text-decoration:underline, 밑줄을 표시합니다.</p>
<p style="text-decoration:overline">text-decoration:overline, 영역 위로 선을 그림니다.</p>
<p style="text-decoration:line-through">text-decoration:line-through, 영역을 가로지르는 선(취소 선)을 그림니다.</p>


### 텍스트 대.소문자 변환하기

영문자를 표기할때 대.소문자를 원하는대로 표시하며 `text-transform` 속성을 사용합니다.

```css
text-transform: none | capitalize | uppercase | lowercase | full-width
```

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>none</td>
        <td>변환하지 않습니다.</td>
    </tr>
    <tr>
        <td>capitalize</td>
        <td>시작하는 첫 번째 글자를 대문자로 변환합니다.</td>
    </tr>
    <tr>
        <td>uppercase</td>
        <td>모든 글자를 대문자로 변환합니다.</td>
    </tr>
    <tr>
        <td>lowercase</td>
        <td>모든 글자를 소문자로 변환합니다.</td>
    </tr>
    <tr>
        <td>full-width</td>
        <td>가능한 모든 문자를 전각 문자로 변환합니다.</td>
    </tr>
</table>

```html
<p style="text-transform:none">none capitalize UPPERCASE lowercase full-width</p>
<p style="text-transform:capitalize">none capitalize UPPERCASE lowercase full-width</p>
<p style="text-transform:uppercase">none capitalize UPPERCASE lowercase full-width</p>
<p style="text-transform:lowercase">none capitalize UPPERCASE lowercase full-width</p>
<p style="text-transform:full-width">none capitalize UPPERCASE lowercase full-width</p>
```

예제;

<p style="text-transform:none">none capitalize UPPERCASE lowercase full-width</p>
<p style="text-transform:capitalize">none capitalize UPPERCASE lowercase full-width</p>
<p style="text-transform:uppercase">none capitalize UPPERCASE lowercase full-width</p>
<p style="text-transform:lowercase">none capitalize UPPERCASE lowercase full-width</p>
<p style="text-transform:full-width">none capitalize UPPERCASE lowercase full-width</p>




### 공백 처리하기

`white-space` 속성을 사용하면 텍스트와 함께 공백을 처리할 수 있습니다.

```css
white-space: normal | nowrap | pre | pre-line | pre-wrap
```

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>normal</td>
        <td>여러 개의 공백을 하나로 표시합니다.</td>
    </tr>
    <tr>
        <td>nowrap</td>
        <td>여러 개의 공백을 하나로 표시하고 영역 너비를 넘어가는 내용은 줄을 바꾸지 않고 계속 한 줄로 표시합니다.</td>
    </tr>
    <tr>
        <td>pre</td>
        <td>여러 개의 공백을 하나로 표시하고 영역 너비를 넘어가는 내용은 줄을 바꾸지 않고 계속 한 줄로 표시합니다.</td>
    </tr>
    <tr>
        <td>pre-line</td>
        <td>여러 개의 공백을 하나로 표시하고 영역 너비를 넘어가는 내용은 자동으로 줄을 바꿔 표시합니다.</td>
    </tr>
    <tr>
        <td>pre-wrap</td>
        <td>여러 개의 공백을 하나로 표시하고 영역 너비를 넘어가는 내용은 자동으로 줄을 바꿔 표시합니다.</td>
    </tr>
</table>



### 텍스트 간격 조절하기

`letter-spacing` 속성은 글자 사이 간격을 조절하고, `word-spacing` 속성은 단어와 단어사이의 간격을 조절하는데 사용합니다.

```css
letter-spacing: normal | <크기>
word-spacing: normal | <크기>
```

<br>



### 텍스트 정렬하기

`text-align` 속성은 문단의 텍스트 정렬 방법을 지정합니다.

```css
text-align: left | right | center
```

<table class="table">
    <tr>
        <th>속성 값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>left</td>
        <td>왼쪽에 맞추어 문단을 정렬합니다.</td>
    </tr>
    <tr>
        <td>right</td>
        <td>오른쪽에 맞추어 문단을 정렬합니다.</td>
    </tr>
    <tr>
        <td>center</td>
        <td>가운데에 맞추어 문단을 정렬합니다.</td>
    </tr>
</table>

```html
<div style="text-align:left;">텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다. 텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다. 텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다. 텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다. 텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다.</div>
```

<div style="text-align:left;">텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다. 텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다. 텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다. 텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다. 텍스트가 어떤식으로 정렬이 되는지를 테스트 합니다.</div>


### 텍스트 들여쓰기

`text-indent` 속성은 문단의 첫 글자를 얼마나 들여쓸지를 지정합니다.

```css
text-indent: <크기> | <백분율>
```

<table class="table">
    <tr>
        <th>속성</th>
        <th>설명</th>
    </tr>
    <tr>
        <td><크기></td>
        <td>단위와 함께 들여 쓸 크기를 지정합니다. 음수 값도 사용할 수 있습니다.</td>
    </tr>
    <tr>
        <td><백분율></td>
        <td>부모 요소의 너비를 기준으로 상대적 크기를 지정합니다.</td>
    </tr>
</table>

```html
<p style="text-indent:50px;">텍스트 들여쓰기</p>
<p style="text-indent:50%;">텍스트 들여쓰기</p>
```

<p style="text-indent:50px;">텍스트 들여쓰기</p>
<p style="text-indent:50%;">텍스트 들여쓰기</p>


### 줄 간격 조절하기

`line-height` 속성을 사용하면 줄 간격을 조정할 수 있습니다.

```css
line-height: normal | <숫자> | <크기> | <백분율> | inherit
```

속성값이 줄간격의 값이 아니라 '배수'를 뜻합니다. 아래 예제는 모두 줄간격이 30px 를 나타냅니다.

```html
<p style="font-size:15px; line-height:30px;">줄 간격 조절하기</p>
<p style="font-size:15px; line-height:2.0;">줄 간격 조절하기</p>
<p style="font-size:15px; line-height:200%;">줄 간격 조절하기</p>
```

<p style="font-size:15px; line-height:30px;">줄 간격 조절하기</p>
<p style="font-size:15px; line-height:2.0;">줄 간격 조절하기</p>
<p style="font-size:15px; line-height:200%;">줄 간격 조절하기</p>




<br>


# 링크


링크의 스타일을 지정할 수 있습니다.

```css
a {
  color: blue;
}
```

링크의 상태에 따라 각각 스타일을 지정할 수도 있습니다.

- a:link - 방문하지 않은 링크
- a:visited - 사용자가 방문한 링크
- a:hover - 사용자가 링크에 마우스를 올릴때
- a:active - 사용자가 링크를 클릭할 때

`link,visited,hover,active` 순서로 지정해야 합니다.

```css
a:link {
    color: red;
}
a:visited {
    color: green;
}
a:hover {
    color: hotpink;
}
a:active {
    color: blue;
}
```

## text-decoration

`text-decoration` 속성은 주로 링크에서 밑줄을 제거하는 데 사용됩니다.

```css
a:link {
    text-decoration: none;
}
```


## background-color

`background-color` 속성은 링크의 배경색을 지정할 수 있습니다 :

```css
a:link {
    background-color: yellow;
}
```



