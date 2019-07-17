# Compliance with GDPR

## Material does not process any personal data

재료는 정적 사이트 생성기인 MkDocs의 테마다. 
자료 자체는 개인 데이터의 추적이나 처리를 하지 않는다. 
그러나 Material이 통합하는 타사 서비스 중 일부는 실제로 [일반 데이터 보호 규정][1](GDPR)에 위반될 수 있으므로 신중하게 평가할 필요가 있다.


  [1]: https://en.wikipedia.org/wiki/General_Data_Protection_Regulation

## Third-party services

### Google Fonts

Material은 Google 글꼴 CDN에 의존하여 글꼴을 [편리하게 구성][2]할 수 있게 한다.
그러나, Google의 글꼴을 포함시키는 것은 현재 회색 영역 내에 있는데, 이는 GDPR 준수에 관한 공식적인 진술이나 판결이 없고 주제가 여전히 [현행적으로 논의][3]되고 있기 때문이다. 
이러한 이유로, GDPR 컴플라이언스를 보장해야 하는 경우, 다음을 사용하여 Google 글꼴 CDN 사용을 비활성화해야 한다.


``` yaml
theme:
  font: false
```

Google 글꼴이 비활성화되면, Material 시스템 글꼴에 의존하여 해당하는 폴백으로 **Helvetica Neue** 및 **Monaco**로 기본 설정된다. 
그러나 당신은 `fonts` 블록을 [오버라이딩][4] 하여 스스로 호스팅하는 웹폰트를 포함할 수 있다.

아이콘 글꼴(Material and FontAwesome)은 테마와 함께 번들로 구성되어 있으며, 따라서 제3자가 관여하지 않도록 자체 호스팅된다.

  [2]: getting-started.md#font-family
  [3]: https://github.com/google/fonts/issues/1495
  [4]: customization.md#overriding-template-blocks

### Google Analytics and Disqus

Material은 [Google Analytics][5] 및 [Disqus][6] 함께 제공되며, *명백하게 사용 가능*해야 한다. 
GDPR을 준수하기 위해 두 통합 모두 비활성화한다.


  [5]: getting-started.md#google-analytics
  [6]: getting-started.md#disqus
