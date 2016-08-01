---
layout: post
title:  "서브라임텍스트(sublimetext) otto 테마"
featured: true
categories: sublimetext
comments: true
tags: [sublimetext theme, otto]
image: /images/sublimetext/demun-223.jpg
---

`otto` 테마는 여러가지 컬러셋을 가지고 있습니다.

[otto 테마 홈페이지](https://packagecontrol.io/packages/Theme%20-%20Otto)를 보면 미리보기를 통해 테마를 확인하세요.

현제 제가 적용한 스크린샷입니다.

![Sync View Scroll](/images/sublimetext/demun-223.jpg)

제가 이 테마를 적용한 이유는 서브라임텍스트의 기본 테마와 비슷한 부분이 있기 때문이고, 왼쪽 사이드바에 보이는 아이콘 부분이 명확하게 표시되는 부분 때문입니다.

기본 테마는 아이콘 부분이 항상 부족함이 있다고 생각했거든요.


<br>

### 설치

먼저 플러그인을 설치합니다.

`Ctrl+Shift+p` 를 눌러 `Package Control: Install Package` 를 선택합니다.

![package control](/images/sublimetext/demun-003.jpg)

그후 나오는 명령창에서 `Theme - otto` 입력하여 선택합니다.

그럼 설치는 끝입니다.




<br>

### 적용

`Preferences -> Settings - User` 를 클릭해서 설치한 `otto` 테마를 활성화시켜줘야 합니다.
2줄만 변경해주면 됩니다.

저는 `Otto Monokai` 를 적용했습니다. 여려분은 원하는 테마를 선택해서 변경해주면 됩니다.

```json
// Otto Yesterday
// -----------------

"theme": "Otto Yesterday.sublime-theme",
"color_scheme": "Packages/Theme - Otto/schemes/Otto Yesterday.tmTheme",

// Otto Tomorrow
// -----------------

"theme": "Otto Tomorrow.sublime-theme",
"color_scheme": "Packages/Theme - Otto/schemes/Otto Tomorrow.tmTheme",

// Otto Oceanic
// -----------------

"theme": "Otto Oceanic.sublime-theme",
"color_scheme": "Packages/Theme - Otto/schemes/Otto Oceanic.tmTheme",

// Otto Monokai
// -----------------

"theme": "Otto Monokai.sublime-theme",
"color_scheme": "Packages/Theme - Otto/schemes/Otto Monokai.tmTheme",
```

적용후 서브라임텍스트를 재시작해주세요. 그럼 잘 적용이 될겁니다.




<br>

### 권장하는 설정

[테마 홈페이지](https://packagecontrol.io/packages/Theme%20-%20Otto)를 보면 아래쪽에 권장하는 설정 부분이 있습니다. 이 설정은 유저마음이지만 제작자가 권장하니 저도 적용을 했습니다.

```json
"always_show_minimap_viewport": true,
"bold_folder_labels": true,
"caret_extra_bottom": 1,
"caret_extra_top": 1,
"caret_extra_width": 1,
"caret_style": "blink",
"fade_fold_buttons": false,
"indent_guide_options": ["draw_normal", "draw_active"],
"line_padding_bottom": 2,
"line_padding_top": 2,
"overlay_scroll_bars": "enabled",
"show_encoding": true,
"show_line_endings": true,
```


<br>

### 알려진 문제

홈페이지에도 나왔듯 `찾기`에서 아래 패널이 안보이는 현상이 있습니다.

![issu](https://packagecontrol.io/readmes/img/14ffa0adf75199f1be2f31ee22096800e6769fab.gif)

제가 사용해보니 이 이슈는 그렇게 큰 문제가 되지는 않는듯 합니다.