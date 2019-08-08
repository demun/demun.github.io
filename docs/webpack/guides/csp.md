# Content Security Policies

Webpack은로드되는 모든 스크립트에 `nonce`를 추가 할 수 있습니다. 기능 세트를 활성화하려면 `__webpack_nonce__` 변수를 입력 스크립트에 포함시켜야합니다.
고유한 해시 기반 논스가 생성되어 각 고유 페이지 뷰에 제공되어야하므로 `__webpack_nonce__` 이 구성 파일이 아니라 항목 파일에 지정되는 이유입니다. `nonce`는 항상 base64로 인코딩 된 문자열 이어야합니다.



## Examples

entry 파일:

``` js
// ...
__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
// ...
```


## Enabling CSP

CSP는 기본적으로 활성화되어 있지 않습니다.
대응하는 헤더 `Content-Security-Policy` 또는 메타 태그 `<meta http-equiv="Content-Security-Policy" ...>` 는 CSP를 가능하게하도록 브라우저에 지시하기 위해 문서와 함께 보내야합니다.
다음은 CDN 화이트리스트 URL을 포함하는 CSP 헤더의 예입니다.


```html
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
```
CSP와 `nonce` 속성에 대한 더 자세한 정보는 이 페이지 하단의 __추가 읽기(Further Reading)__ 단원을 참조하십시오.


## Further Reading

- [Nonce purpose explained](https://stackoverflow.com/questions/42922784/what-s-the-purpose-of-the-html-nonce-attribute-for-script-and-style-elements)
- [화이트리스트의 불안정성과 컨텐츠 보안 정책의 미래](https://ai.google/research/pubs/pub45542)
- [CSP, 해시, Nonces 및 보고서 URI를 사용하여 웹 사이트 스크립트 잠그기](https://www.troyhunt.com/locking-down-your-website-scripts-with-csp-hashes-nonces-and-report-uri/)
- [CSP on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

