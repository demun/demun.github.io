---
layout: post
title:  "Sublimetext"
date:   2015-02-10 15:14:54
categories: Sublimetext
comments: true
---
서브라임텍스트 카테고리


지킬의 스니펫

	def print_hi(name)
	  puts "Hi, #{name}"
	end
	print_hi('Tom')
	#=> prints 'Hi, Tom' to STDOUT.



구문강조의 예제

- javascript

```
function fixFooterInit() {
    var footerHeight = $('footer').outerHeight();
    var footerMarginTop = getFooterMarginTop() - 0;
    // var footerMarginTop = 80;

    fixFooter(footerHeight, footerMarginTop); //fix footer at the beginning

    $(window).resize(function() { //when resize window, footer can auto get the postion
        fixFooter(footerHeight, footerMarginTop);
    });

    /*    $('body').click(function() {
        fixFooter(footerHeight, footerMarginTop);
    });*/
}
```


* CSS code

```css
table thead{
	border-bottom: 1px dashed #777;
	background-color: #aaa;
	color:#fff;
}
table th{
	padding: 2px 10px;
}
table tr:nth-child(2n){
	background-color: #E5EAED;
}
table td{
	padding: 2px 10px;
}
```

* CSS code
{% highlight css %}
table{
	border-top:2px solid #777;
	border-bottom: 2px solid #777;
	margin: 8px 0;
}
table thead{
	border-bottom: 1px dashed #777;
	background-color: #aaa;
	color:#fff;
}
{% endhighlight %}




아래는 링크의 예제

지킬을 최대한 활용하는 방법에 대한 자세한 정보를 원하시면 [Jekyll docs][jekyll] 를 참조하십시오. 버그 / 기능 요청은 [Jekyll’s GitHub repo][jekyll-gh].  질문이있는 경우 [지킬의 전용 도움말 저장소][jekyll-help]를 참고하세요.

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help
