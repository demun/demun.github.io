---
layout: post
title:  "Welcome to Jekyll!"
date:   2016-01-18 12:57:38 +0900
categories: jekyll update
---
글쓰기는 _posts 폴더안의 첫번째 글, welcome-to-jekyll.markdown 을 수정한다.

글은 언제나 년-월-일-글제목.markdown 으로 저장한다. .md .html도 가능하다.
Front-matter 라고 부르는 글은 상단의 --- 안의 내용은 메타데이터로 Jekyll에게 알려줄 글의 기본 설정부분이다.

- layout: 은 알다시피 _layouts 안의 html 형식을 불러오는 것이다. 이 부분을 활용하면 수많은 스타일의 글을 작성해 낼 수 있다.

title: 글 제목

date: 글 작성 날짜 시간

이 외에도 categories, tag, author 등을 지정해 줄 수 있으며 이 값들은 테마 제작때 사용가능하다. 예: {{ page.정한이름 }}

markdown 문법으로 상대경로를 적을경우 이미지가 깨진다면 경로에 / 를 앞에 적었는지 확인하자. 예: ![대체텍스트](/폴더/이미지 주소)



{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
