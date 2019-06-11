# 표


웹문서에서 자료를 정리할때 자주 사용하는 요소가 '표(talbe)' 입니다.    
표는 행(row)과 열(column)로 이루어져 있고, 행과 열이 만나 이루는 영역을 셀(cell) 이라고 부릅니다.

기본적인 구조는 아래와 같습니다.

```html
<table>
    <tr>
        <th>제목셀</th>
        <td>내용셀</td>
    </tr>
    <tr>
        <th>제목셀</th>
        <td>내용셀</td>
    </tr>
</table>
```

기본적으로 제목에 해당하는 부분에 `<th>`태그를 사용합니다.    
`<th>` 는 굵게 표시되고 셀의 중앙에 위치하게 됩니다.

<table>
    <tr>
        <th>제목셀</th>
        <td>내용셀</td>
    </tr>
    <tr>
        <th>제목셀</th>
        <td>내용셀</td>
    </tr>
</table>


###### 행 또는 열 합치기

행의 셀을 합칠때는 `colspan`속성을 사용합니다. 원하는 갯수만큼 지정하면 됩니다.

```html
<table>
    <tr>
        <td>내용셀</td>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
    <tr>
        <td colspan="2">내용셀</td>
        <td>내용셀</td>
    </tr>
    <tr>
        <td>내용셀</td>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
</table>
```

<table>
    <tr>
        <td>내용셀</td>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
    <tr>
        <td colspan="2">내용셀</td>
        <td>내용셀</td>
    </tr>
    <tr>
        <td>내용셀</td>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
</table>

열을 합칠때는 `rowspan` 속성을 사용합니다. 마찬가지로 원하는 갯수만큼 숫자로 지정하면 됩니다.

```html
<table>
    <tr>
        <td>내용셀</td>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
    <tr>
        <td rowspan="2">내용셀</td>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
    <tr>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
</table>
```

<table>
    <tr>
        <td>내용셀</td>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
    <tr>
        <td rowspan="2">내용셀</td>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
    <tr>
        <td>내용셀</td>
        <td>내용셀</td>
    </tr>
</table>


###### 표에 제목 붙이기

표에 제목을 붙일때는 `<caption>` 태그를 사용합니다.   
`<caption>` 태그를 사용한 표 제목은 표의 중앙에 표시되고, `<caption>` 안에 다른 태그를 사용하여 여러줄로도 표시할 수 있습니다.

```html
<table>
	<caption>표의 제목을 넣는 태그</caption>
    <tr>
        <th>제목셀</th>
        <td>내용셀</td>
    </tr>
    <tr>
        <th>제목셀</th>
        <td>내용셀</td>
    </tr>
</table>
```



###### 표 구조 정의하기

일부 표에서는 표의 머리부분, 몸부분, 다리부분이 각각 나뉘어서 보여질때가 있습니다.   
이때 해당하는 태그가 머리부분 `<thead>`, 몸부분 `<tbody>`, 다리부분 `<tfoot>` 입니다.    

> html4에서는 `<tfoot>` 이 `<tbody>` 다음에 쓰면 오류가 납니다. html5 에서는 `<tbody>` 전.후 아무곳에 써도 상관없습니다.

```html
<table>
    <thead>
        <tr>
            <th>제목1</th>
            <th>제목2</th>
            <th>제목3</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <td>표하단1</td>
            <td>표하단2</td>
            <td>표하단3</td>
        </tr>
    </tfoot>
    <tbody>
        <tr>
            <td>내용셀</td>
            <td>내용셀</td>
            <td>내용셀</td>
        </tr>
        <tr>
            <td>내용셀</td>
            <td>내용셀</td>
            <td>내용셀</td>
        </tr>
    </tbody>
</table>
```

<table>
    <thead>
        <tr>
            <th>제목1</th>
            <th>제목2</th>
            <th>제목3</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <td>표하단1</td>
            <td>표하단2</td>
            <td>표하단3</td>
        </tr>
    </tfoot>
    <tbody>
        <tr>
            <td>내용셀</td>
            <td>내용셀</td>
            <td>내용셀</td>
        </tr>
        <tr>
            <td>내용셀</td>
            <td>내용셀</td>
            <td>내용셀</td>
        </tr>
    </tbody>
</table>


###### 여러 열 묶기

하나의 열에 스타일을 지정하거나 열(column)을 몇 개씩 묶어 스타일을 지정할 수 있습니다.   
`<col>` 태그는 한 열에 있는 모든 셀에 같은 스타일을 적용 할 때 사용하는 것으로 닫는 태그가 없습니다.

`<colgroup>` 태그를 사용해서 여러 열을 묶어 스타일을 적용할 수 있는데 `<colgroup>`태그안에 묶는 열의 개수만큼 `col` 태그를 넣어야 합니다.

이때 주의점은 `<col>`태그와 `<colgroup>`태그는 `<caption>`태그뒤와 `<tr>`태그전에 사용되어야 합니다.

```html
<table>
    <caption>표제목</caption>
    <colgroup>
        <col style="background:#ddd;">
        <col>
    </colgroup>
    <tbody>
        <tr>
            <td>내용1</td>
            <td>내용2</td>
        </tr>
        <tr>
            <td>내용1</td>
            <td>내용2</td>
        </tr>
    </tbody>
</table>
```

<table>
    <caption>표제목</caption>
    <colgroup>
        <col style="background:#ddd;">
        <col>
    </colgroup>
    <tbody>
        <tr>
            <td>내용1</td>
            <td>내용2</td>
        </tr>
        <tr>
            <td>내용1</td>
            <td>내용2</td>
        </tr>
    </tbody>
</table>

<br><br>
