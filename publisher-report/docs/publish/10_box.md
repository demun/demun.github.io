# 박스모델

박스 모델이란 각 요소(element)는 사각형 박스 형태로 나타냅니다. 박스의 크기, 특성(색, 배경, 테두리 모양 등) 및 위치 결정이 렌더링 엔진의 목적입니다.

CSS 에서, 이 사각형 박스 각각은 표준 박스 모델을 사용하여 기술됩니다. 이 모델은 요소에 의해 차지되는 공간의 내용(content)을 설명합니다. 각 박스는 네 경계(edge)가 있습니다: margin 경계, border 경계, padding 경계 및 content 경계.

![box model](../images/boxmodel.png)

`content 영역`은 요소의 실제 내용을 포함하는 영역입니다. 거기에는 대개 배경, 색 또는 이미지(그 순서로, 배경색을 감추는 불투명한 이미지)가 있고 content 경계 안쪽에 놓입니다. 따라서 그 크기(dimensions)는 content 너비 및 content 높이입니다.

`padding 영역`은 패딩을 둘러싼 보더까지 입니다. content 영역이 배경, 색 또는 그 위에 설정된 이미지가 있을 때, 이는 패딩까지 이어집니다. 이것이 패딩을 content 의 연장으로 생각할 수 있는 이유입니다. 패딩은 padding 경계 안쪽에 놓이고 그 크기는 padding 박스 너비 및 padding 박스 높이입니다.

패딩과 content 경계 사이의 공간은 padding-top, padding-right, padding-bottom, padding-left 및 단축(shorthand) CSS 속성 padding 으로 제어될 수 있습니다.

`border 영역`은 padding 영역을 보더를 포함하는 영역까지 확장합니다. 이는 border 경계 안쪽 영역이고 그 크기는 border-box 너비 및 border-box 높이입니다. 이 영역은 border-width 속성 또는 단축 border 에 의해 정의된 보더의 크기에 의존합니다.

`margin 영역`은 border 영역을 요소를 그 이웃과 구별하기 위해 쓰이는 빈 영역으로 확장합니다. 이는 margin 경계 안쪽 영역이고 그 크기는 margin 박스 너비 및 margin 박스 높이입니다.
