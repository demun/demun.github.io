---
layout: post
title:  "Jekyll"
date:   2016-02-14 19:05:13 +0900
categories: blog
tags: jekyll
---


# 카테고리

카테고리는 폴더를 미리 만들지 않아도 포스트 작성시 머릿말에 카테고리를 지정해주면 생성된다.

{% highlight yml %}
---
layout: post
title:  "html 연습"
date:   2016-02-14 19:05:13 +0900
categories: html
---
{% endhighlight %}


파일명은 첫글자를 대문자로 해도 소문자로 카테고리 폴더가 만들어진다.

머릿말에서 `categories: html` 라고 지정하고 파일이름도 `Html` 이라고 할경우의 예제

파일명 `2016-2-01-Html.md` 라고 만들경우 `html-2016-02-14-html.html` 이 만들어진다.


