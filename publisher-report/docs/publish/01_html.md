# html 소개

HTML(Hypertext Markup Language,하이퍼텍스트 마크업 언어)는 웹페이지가 어떻게 구조화되어 있는지 브라우저로 하여금 알 수 있도록 하는 마크업 언어입니다.
HTML 은 elements 로 구성되어 있으며, 이들은 적절한 방법으로 나타내고 실행하기 위해 각 컨텐츠의 여러 부분들을 감싸고 마크업합니다.
tags 는 웹 상의 다른 페이지로 이동하게 하는 하이퍼링크 내용들을 생성하거나, 단어를 강조하는 등의 역할을 합니다.

확장자가 `.html` 로 끝나는 문서가 html 문서입니다. 



# html 구조
html 을 마크업언어라고 하는데 마크업할때 사용하는 약속된 표기법을 '태그(tag)'라고 합니다.

태그는 웹문서에 표시하려는 내용을 전달하는 언어이기 때문에 정확히 사용해야 합니다.  

태그는 `<` 와 `>` 이루어져 있으며 대부분의 태그는 여는태그(`<속성>`) 와 닫는태그(`</속성>`) 와 같이 한쌍으로 이루어져 있습니다.  

`<img>` 태그나 `<br>` 태그처럼 닫는태그가 없는 경우도 있지만 닫는태그가 있는 경우는 반드시 닫는태그를 삽입해야 합니다.

HTML 태그는 대.소문자를 구분하지 않지만 html5 에서는 모두 소문자로 사용하기를 권장합니다.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>해딩</h1>
    <p>단락</p>
</body>
</html>
```




# 문서타입

문서의 시작을 알려주는 `<html>`태그보다 먼저 사용하는 것이 '문서유형(document type)'을 지정하는 `<!doctype>` 입니다.  
이때 지정하는 문서 유형이란 웹 브라우저에게 '이제부터 처리할 문서는 HTML 문서이고 어떤 유형을 사용했으니 그 버젼에 맞는 방법으로 해석하라' 라고 알려주는 겁니다.

문서의 유형에 따라 브라우져게 해석하는 방식이 다르기 때문에 명확하게 지정해줘야 합니다.


- 엄격 모드(strict mode)

HTML4 표준 문법에 따라야하고 조금만 어긋나면 오류를 일으키기 때문에 정확해야 합니다. 예를들어 닫기태그가 빠지면 오류를 일으킵니다.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!-- xhtml -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1-strict.dtd">
```

- 호환 모드(transitional mode)

HTML4 표준 문법에 조금 벗어나더라도 허용하는 모드입니다.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- xhtml -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1-transitional.dtd">
```

- 프레임세트 모드(transitional mode)

웹 브라우져가 화면을 분할해 한 화면에 여러분서를 동시에 표현하는 방법인데 웹 문서에서 프레임세트를 사용할경우, 프레임세트 모드를 지정해야합니다.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
<!-- xhtml -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1-frameset.dtd">
```

> XHTML(Extensible Hypertext Markup Language)은 HTML 과 동등한 표현 능력을 지닌 마크업 언어로, HTML 보다 엄격한 문법을 가진다.

- html5

```html
<!DOCTYPE html>
```





## 태그

태그는 속성과 함께 사용할수도 있습니다.

![태그설명](../images/element.jpg)

포함관계를 명확하게 해야 합니다.

올바른 예:

```html
<ul><li>내용</li></ul>
```

잘못된 예:

```html
<ul><li>내용</ul></li>
```




# 요소, 속성

html 에서 `<h1>` 와 같은 태그를 요소라고 하며, 요소는 속성 `name="value"` 를 갖을수 있습니다.

속성은 이름과 값을 갖습니다.

아래는 링크의 예:

```html
<a href="http://google.co.kr/">Google</a>
```






# 아아디, 클래스

요소에 아이디를 부여할 수 있습니다. 

아이디는 문서에서 유일해야 합니다.

공백이나 탭을 포함 할 수 없습니다.

대소문자를 구분합니다.

아이디의 예:

```html
<div id="header">.....</div>
<span id="link">......</span>
```

요소에 클래스를 부여할 수 있습니다.

클래스는 문서에 여러번 사용할 수 있습니다.

클래스의 예:

```html
<div class="header">....</div>
<span class="link">......</span>
```

아이디는 문서내에 유일해야하며, 클래스는 다중사용이 가능합니다.


