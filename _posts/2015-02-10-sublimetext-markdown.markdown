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


- css

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



아래는 링크의 예제

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help
