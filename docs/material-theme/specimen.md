# Specimen

## Body copy


텍스트는 이렇게 보여집니다. 
*강조하기 위한 부분*도 표시할 수 있습니다.
텍스트는 이렇게 보여집니다. 

줄바꿈을 하고 *강조하기 위한 부분*도 표시할 수 있습니다.
텍스트는 이렇게 보여집니다. 
[링크](#) 도 표시할 수 있습니다.
`코드블럭`처럼 보이게할 수 도 있습니다.




## Headings

### The 3rd level

#### The 4th level

##### The 5th level

###### The 6th level

## Headings <small>with secondary text</small>

### The 3rd level <small>with secondary text</small>

#### The 4th level <small>with secondary text</small>

##### The 5th level <small>with secondary text</small>

###### The 6th level <small>with secondary text</small>



## Blockquotes

> 인용문은 \> 를 사용하고 한단락 들여쓰기 하면 됩니다.
  줄바꿈이 적용되지 않고 한단락으로 표현 됩니다.

```
> 인용문은 > 를 사용하고 한단락 들여쓰기 하면 됩니다.
  줄바꿈이 적용되지 않고 한단락으로 표현 됩니다.
```


### Blockquote nesting

> 인용문 들여쓰기는 \> 의 갯수 만큼 들여쓸기가 됩니다.
  지금은 한블럭 들여쓰기가 된겁니다.
  [링크](#) 도 표시할 수 있습니다.

> > 이 블럭은 \>를 두개 사용해서 표시한 겁니다.
    두개만큼 들여쓰기
    인용문안에 `코드도 넣을 수 있습니다.`

> > > 이 블럭은 \>를 세개 사용해서 표시한 겁니다.
      마찬가지로 `코드형태도 표시할 수 있습니다.`
      왼쪽 여백이 \> 세개 만큼 들여써야 됩니다.

### Other content blocks

> 일반 인용문처럼 사용할 수 도 있습니다.
  인용문안에 코드 블럭도 넣을 수 있습니다.
  ``` js hl_lines="8"
  var _extends = function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  };
  ```

  > > 이 블럭은 \>를 두개 사용해서 들여쓰기 한 겁니다.
      마찬가지로 \> 두개 만큼 왼쪽 여백이 있어야 합니다.
      여기서도 코드 블럭을 넣을 수 있습니다. `:::js return target`




## Lists

### Unordered lists

* 순서없는 목록은 \* 를 사용합니다.
  줄바꿈을 할 경우 \* 만큼 왼쪽에 들여쓰기를 합니다.
  그럼 이렇게 보입니다.

    * 목록안에 목록을 표시할때는 한블럭 더 들여쓰기 합니다.
    * 그럼 이처럼 들여쓰기한 형태로 목록이 표시됩니다.
    * 그럼 이처럼 들여쓰기한 형태로 목록이 표시됩니다.

* 다음은 두번째 목록입니다.
  순서가 없는 목록이기에 똑같이 \* 를 사용합니다.
  순서가 없는 목록이기에 똑같이 \* 를 사용합니다.

* 다음은 세번째 목록입니다.
  순서가 없는 목록이기에 똑같이 \* 를 사용합니다.
  순서가 없는 목록이기에 똑같이 \* 를 사용합니다.



### Ordered lists

1. 순서 있는 목록은 목록 앞에 숫자를 표시합니다.
1. 현재 목록앞에는 `1` 을 지정한 겁니다.
1. 똑같이 `1` 지정해도 목록이라고 판단되면 숫자는 자동으로 올라갑니다.
2. 순서있는 목록안에 목록을 표시할 수 있습니다.
   마찬가지로 들여쓰기를 하고 숫자를 표시하면 됩니다.

    1. 하위 목록 1번 입니다.
       하위 목록 1번 이지만 아라비아 숫자로 표시됩니다.

        1. 하위에 하위 목록입니다.
        1. 물론 숫자로 표시했지만 이처럼 보여집니다.
        1. 숫자는 같은 숫자로 지정해도 자동으로 올라갑니다.

    2. 하위 목록 두번째 입니다.

    3. 목록에도 이처럼 코드블럭을 삽입할 수 있습니다.
       코드는 이처럼 인라인 `:::js var _extends` 또는 블럭으로 사용할 수 있습니다.
       하지만 목록에서의 블럭은 표시되지 않고 인라인으로 표시됩니다.
    ```js hl_lines="1"
    var _extends = function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target;
    };
    ```

3. 다음 목록입니다.



### Definition lists

정의 목록은 \:를 사용해 표시합니다.

:   그럼 제목과 내용부분처럼 보여집니다.
    더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 

    줄바꿈을 해서 코드 블럭처럼 보이게 할 수도 있습니다.

제목 행

:   내용 부분입니다.
    더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 더미 텍스트 

## Code blocks

### Inline

코드 양쪽에 \`를 넣으면 `이렇게` 보여집니다. 
\* 를 양쪽에 넣으면 *`이렇게`* 보여집니다.
링크를 표현하는 \[\]안에 \`를 양쪽에 넣으면 [`이런식으로`](#) 보여집니다.

코드 양쪽에 넣으면 이런식 `:::js return target` 으로 보여집니다.



### Listing

코드 블럭 하이라이트 하는것은 `#!js hl_lines="8"` 를 사용하면 됩니다.
아래는 들여쓰기를 한 경우입니다.

    #!js hl_lines="8"
    var _extends = function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target;
    };

아래는 \`\`\`를 사용한 경우 입니다.

```
#!js hl_lines="8"
var _extends = function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
};
```




## Horizontal rules

수평 단락을 표시하기 위해 밑줄을 표현하기도 합니다. 단락을 표시하기 위해서는 \*\*\* 를 지정하면 됩니다. 그럼 아래처럼 보여집니다.

***

수평 단락을 표시하기 위한 글



## Data tables


표를 표시하려면 아래처럼 작성합니다.

```
| Sollicitudo / Pellentesi | consectetur | adipiscing | elit    | arcu | sed |
| ------------------------ | ----------- | ---------- | ------- | ---- | --- |
| Vivamus a pharetra       | yes         | yes        | yes     | yes  | yes |
| Pulvinar nisl            | yes         | yes        | yes     | -    | -   |
| Sed suscipit             | yes         | yes        | yes     | yes  | yes |
| Orci non pretium         | yes         | partial    | -       | -    | -   |
```


| Sollicitudo / Pellentesi | consectetur | adipiscing | elit    | arcu | sed |
| ------------------------ | ----------- | ---------- | ------- | ---- | --- |
| Vivamus a pharetra       | yes         | yes        | yes     | yes  | yes |
| Pulvinar nisl            | yes         | yes        | yes     | -    | -   |
| Sed suscipit             | yes         | yes        | yes     | yes  | yes |
| Orci non pretium         | yes         | partial    | -       | -    | -   |

표에 링크, 강조표시, 코드 등도 넣을 수 있습니다.

```
| Left       | Center   | Right   |
| :--------- | :------: | ------: |
| Lorem      | *dolor*  | `amet`  |
| [ipsum](#) | **sit**  |         |
```

| Left       | Center   | Right   |
| :--------- | :------: | ------: |
| Lorem      | *dolor*  | `amet`  |
| [ipsum](#) | **sit**  |         |

표의 너비를 조정하려면 `<table>` 태그를 사용할수도 있습니다.

```
<table>
  <colgroup>
    <col width="30%">
    <col width="70%">
  </colgroup>
  <thead>
    <tr class="header">
      <th>Table</th>
      <th>with colgroups (Pandoc)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lorem</td>
      <td>ipsum dolor sit amet.</td>
    </tr>
    <tr>
      <td>Sed sagittis</td>
      <td>eleifend rutrum. Donec vitae suscipit est.</td>
    </tr>
  </tbody>
</table>
```

<table>
  <colgroup>
    <col width="30%">
    <col width="70%">
  </colgroup>
  <thead>
    <tr class="header">
      <th>Table</th>
      <th>with colgroups (Pandoc)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lorem</td>
      <td>ipsum dolor sit amet.</td>
    </tr>
    <tr>
      <td>Sed sagittis</td>
      <td>eleifend rutrum. Donec vitae suscipit est.</td>
    </tr>
  </tbody>
</table>