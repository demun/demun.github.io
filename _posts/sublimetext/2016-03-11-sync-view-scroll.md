---
layout: post
title:  "Sync View Scroll-두탭을 동기화하며 스크롤해서 볼수 있는 플로그인"
date:   2016-03-10
categories: sublimetext
---

Sync View Scroll 은 동시에 두개의 탭을 보며 동기화할수 있는 플러그인입니다.

에디터를 사용하다보면 두개의 파일을 비교할때가 있습니다.
비교해서 수정할때 유용합니다.

예를들어 두개의 똑같은 파일을 열고 서로 비교해가며 스크롤해간다고 가정하면 1번파일을 스크롤하고, 다시 2번 파일을 스클롤을 해야 합니다.
하지만 Sync View Scroll는 한쪽에서 스크롤을 하면 다른쪽파일도 동시에 같이 스크롤이 됩니다.


### 설치

먼저 플러그인을 설치합니다.

`Ctrl+Shift+p` 를 눌러 `Package Control: Install Package` 를 선택합니다.

![package control](/images/sublimetext/demun-003.jpg)

그후 나오는 명령창에서 `Sync View Scroll` 입력하여 선택합니다.

![Sync View Scroll](/images/sublimetext/demun-004.jpg)


<br>


### 사용법

사용법은 무척 간단합니다. 동기화할 파일에서 단축키만 누르면 되고, 바로 스크롤하면 됩니다.


`Ctrl+Shift+p` 를 눌러 `SyncScroll: Toggle Current View Scroll Sync` 를 선택합니다.

![Toggle Current View Scroll Sync](/images/sublimetext/demun-005.jpg)

간편하게 단축키 `Ctrl+Shift+,` 를 눌러서 사용하는것을 추천합니다.

여기서 단축키를 누를때 자세히 보면 첫번째줄에 커서가 가있습니다. 

![Toggle Current View Scroll Sync](/images/sublimetext/demun-006.jpg)

1번파일, 2번파일 모두 동일한 곳에 커서가 위치시킨후 단축키 `Ctrl+Shift+,`를 눌러서 시작하기 바랍니다.

그래야 동일하게 스크롤이 됩니다.

동영상을 첨부하니 참고하세요.

<iframe width="700" height="500" src="https://www.youtube.com/embed/-qG_Gospb9A" frameborder="0" allowfullscreen></iframe>

