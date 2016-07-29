# test


마크다운 테스트

- 1231
- 456
- 789


코드블럭 테스트

```css
.test {
	display: block;
	padding: 10px 0;
}
```


```javascript
console.log('test');
```


```html
<div class="test">
	<h1>test</h1>
</div>
```


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
