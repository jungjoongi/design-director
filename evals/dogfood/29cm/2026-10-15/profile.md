---
schema: dd.profile/1
slug: 29cm-co-kr
name: 29CM
input_type: url
source: https://www.29cm.co.kr/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: files
recapture: null
styles: {primary: kr-editorial-commerce, secondary: editorial, treatments: []}
structure: "nav → category-nav → hero-media(3) → content-list(≈30) → pagination → footer"
evidence: {measured: 64, declared: 3, derived: 15, estimated: 18, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
---

# 29CM — Reference Profile

## 1. 본질 (Essence)

취향으로 물건을 고르는 사람을 위해, 화면의 90%를 화보 사진으로 덮고 UI 는 무채색 10–13px 글자와 1px 회색 선으로
물러나게 한 3열 매거진 피드로 '잡지를 넘기다 사는' 편집숍 느낌을 만든다. 유채색 UI 는 할인율 오렌지 #FF4800 하나뿐이다.

## 2. 스타일 분류 (Classification)

- primary: `kr-editorial-commerce` — 이미지 비중 90%(측정), 콘텐츠 글자 10–13px(측정), 중립 램프 chroma 0 + 강조 #FF4800 1색(측정),
  할인율·가격·배지·찜 수 같은 커머스 관례를 상품 행마다 유지
- secondary: `editorial` — 홈을 3단 매거진 지면처럼 짜고(브랜드 사진 단 + 기획 기사 단 2개), 단 사이를 1px 세로선으로 나눈다.
  단 세리프 제목·18px 이상 본문은 없다(editorial 범위 밖) — 글이 아니라 사진이 주인공이다
- treatments: 없음 — `backdrop-filter` 0, 그림자 0, 장식 그라데이션 없음(측정. 그라데이션 1개는 목록 끝 흰 페이드, 면적 1%)
- 축: 밀도 4 · 온도 3 · 채도 2 · 대비 4 · 둥긂 1 · 장식 1
  (스타일 기본 밀2 와 달리 첫 화면 빈 칸 12% 로 촘촘하다. 채도는 UI 1 이지만 사진이 화면을 덮어 2)

## 3. 무드 키워드 (Mood)

사진이 말하는 (photo-led) · 잡지를 넘기는 (magazine browsing) · 촘촘하지만 조용한 (dense but quiet) ·
흑백 UI 위 오렌지 신호 하나 (monochrome UI, single orange signal) · 편집숍 큐레이션 (select-shop curation) · 날 선 모서리 (sharp-edged)

## 4. 시그니처 무브 (Signature Moves)

### 1. 화면을 사진으로 덮고 사진 사이 여백을 없앤다
- 관찰: 첫 화면(desktop.png) 세 타일이 헤더 아래부터 화면 끝까지 차고, 피드 전체(overview.jpg)에서 사진이 이어진다
- 수치: 이미지 비중 90%(측정) · 첫 화면 빈 칸 12%(파생) · 사진 radius 0(측정, 403px 타일) · 첫 줄 타일 사이 간격 0, 1px 선만(추정)
- 기본값과의 차이: 흔한 커머스 홈은 컨테이너 1200px 가운데 + 배너 캐러셀 + 카드 gap 16–24px. 여기는 max-width 없이 1440 풀폭이다
- 따라 하는 법: `.feed { display:grid; grid-template-columns: 42fr 28fr 28fr; gap:0; }` 사진은 `width:100%; aspect-ratio:…; object-fit:cover; border-radius:0;`
- 깨지는 경우: 화보급 사진이 없으면 화면이 그대로 빈약해진다 → 사진 수를 줄이고 무브 2 의 스토리 카드 비중을 늘린다. 스톡·AI 사진이면 IC-4·IC-5

### 2. 홈을 3단 매거진 피드로 짜고, 스토리 하나에 상품 행 3개를 붙인다
- 관찰: desktop slices 02–09. 왼쪽 단은 브랜드 사진 스포트라이트(라틴 브랜드명 흰 글자 오버레이), 가운데·오른쪽 단은
  '사진 → 제목 → 한 줄 설명 → 상품 행 3개' 스토리 카드가 세로로 쌓인다. 두 단의 카드 높이가 달라 엇갈린다(masonry)
- 수치: 단 폭 605 | 402 | 403px(추정, 42/28/28%) · 스토리 카드 폭 355px(측정) · 제목 22px/700(측정) · 상품 행 간격 약 92px,
  썸네일 약 70px(추정) · 단 구분 1px 세로선(추정)
- 기본값과의 차이: 흔한 커머스는 '기획전 배너' 와 '4열 상품 그리드' 를 따로 둔다. 여기는 기획과 상품이 한 카드 안에 붙어 있고 상품 그리드가 없다
- 따라 하는 법: 가운데·오른쪽 단은 `column-count` 대신 단별 flex column 두 개로(읽는 순서 유지). 카드 =
  `<img aspect-[3/2]> <h3 text-[22px] font-bold mt-4> <p text-sm mt-3> <ul divide-y divide-[#DDD] mt-4>` 상품 행 3개
- 깨지는 경우: 스토리마다 상품을 3개씩 묶을 기획이 없으면 '배너 + 무작위 상품' 이 된다 → 기획 단위가 먼저다. 모바일은 1단으로 접는다

### 3. 유채색은 할인율 숫자에만 쓴다
- 관찰: 모든 상품 행의 할인율(slices 02·05). 버튼·아이콘·배지·링크는 무채색이다. 모바일은 앱 설치 띠의 pill 하나만 예외
- 수치: accent #FF4800(측정, `--ruler-semantic-color-common-accent`) · 기타 유채색 0(측정) · 중립 10단계 chroma 0(측정)
- 기본값과의 차이: 흔한 커머스는 브랜드색을 CTA·배지·탭·찜 하트에 넓게 쓴다. 여기는 찜 하트도 회색 선 아이콘이다
- 따라 하는 법: `--accent:#FF4800` 는 `.price-rate{color:var(--accent);font-weight:700}` 에만. 주 버튼·하트·배지는 `#1F1F1F`·`#8A8A8A`·`#F0F0F0`
- 깨지는 경우: #FF4800 은 흰 바탕 대비 3.4:1(파생)이라 13px 글자에는 AA 미달이다. 할인율 숫자 외 문장에는 쓰지 않고, 접근성이 우선이면 `--ruler-scale-color-red-600` #D53F00(선언, 대비 4.63:1 파생) 쪽으로 내린다

### 4. 콘텐츠 글자를 10–22px 안에 가두고 위계는 굵기로 만든다
- 관찰: 상품 행(브랜드명 굵게 → 상품명 보통 → 할인율·가격 굵게 → 회색 배지), 스토리 제목, 버튼
- 수치: 가격·브랜드 13px/700(측정) · 버튼 12px/400(측정) · 배지 10px/500(측정, 모바일 12) · 스토리 제목 22px/700(측정) ·
  자간 전 역할 0em(측정) · 스케일 1.067 minor second(파생). 콘텐츠 최대:최소 = 22:10
- 기본값과의 차이: 본문 16px/1.5 기본값보다 3px 작고, 큰 헤드라인이 없다. 큰 글자는 상단 라틴 메뉴(40px 단계, 무브 밖)에만 있다
- 따라 하는 법: `--fs-xs:10px; --fs-sm:12px; --fs-md:13px; --fs-lg:22px;` 같은 크기 안에서 `font-weight:400/500/700` 과 색(#1F1F1F/#6A6A6A/#8A8A8A)으로 위계
- 깨지는 경우: 한글 10px 은 저시력·저해상도 화면에서 깨진다 → 모바일처럼 12px 하한을 두고, 상품명은 13px 을 권장한다. 행간 1.2–1.4(측정)는 한 줄 라벨에만

### 5. 그림자 없이 1px #DDDDDD 선과 radius 2–4px 로 면을 나눈다
- 관찰: 상품 행 사이 가로선, 피드 단 사이 세로선, 푸터 구분선, 아웃라인 버튼(로그인, …)
- 수치: 그림자 요소 0개(측정) · 테두리 1px #DDDDDD(측정) · radius 버튼 4 / 썸네일·배지 2 / 사진 0(측정) · pill 6%(측정)
- 기본값과의 차이: 기본값 radius 8 + `shadow-md` 카드 대비 그림자 0, radius 절반 이하
- 따라 하는 법: `border-color:#DDD; box-shadow:none;` Tailwind `rounded-[4px]`(버튼) · `rounded-[2px]`(썸네일·배지) · `rounded-none`(사진), `divide-y divide-[#DDD]`
- 깨지는 경우: 근거 없이 0 radius + hairline 만 남기면 신문 템플릿처럼 보인다(LA-4) → 무브 1 의 사진 비중이 함께 있어야 성립한다

## 5. 토큰 (Tokens)

### 5.1 타이포그래피 (Typography)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | 29CM Editorial (전용 웹폰트, 한글·라틴 공용) · 폴백 -apple-system, Apple SD Gothic Neo, Noto Sans KR | 측정 | 글자 100% 가 이 패밀리. 라이선스 unknown → 9장 |
| 상단 라틴 메뉴 | 40px 단계 · 굵기 약 600 · 첫 화면만, 스크롤 뒤 약 24px | 추정 | 40px 은 스케일 단계로 측정됐고, 이 요소에 붙는다는 건 화면에서 판단 |
| 스토리 제목 (h1 D) | 22px · 700 · 1.36 · 0em | 측정 | ×4 |
| 제목 (h2 M) | 16px · 700 · 1.4 · 0em | 측정 | 모바일 전용 역할 |
| 카테고리 내비 | 16 / 9px · 600 · 1.4 · 0em | 측정 | 라틴 대문자로 입력됨(transform none). … 만 이탤릭 |
| body-lg (M) | 15px · 400 · 1.5 · 0em | 측정 | 모바일 스토리 설명 ×30 |
| body | 13px · 700 · 1.4 · 0em | 측정 | 가격·브랜드명 ×29 |
| button | 12px · 400 · 1.36 · 0em | 측정 | ×32 |
| small | 10 / 12px · 500 · 1.2 · 0em | 측정 | 배지·보조 정보 ×48 |
| 브랜드 오버레이 | 라틴 약 44–48px · 400 · 흰색, 한글 브랜드명 약 12px | 추정 | 왼쪽 단 브랜드 사진 왼쪽 아래 |
| 자간 | 모든 역할 0em | 측정 | 조이거나 넓히지 않는다 |
| 스케일 비율 | 1.067 minor second (fit 0.84) · 단계 10 11 12 13 15 16 22 40 | 파생 | 13 이하에 단계가 몰려 있다 |
| clamp | 없음 (D/M 차 2px 미만) | 파생 | 배지만 10→12 로 오히려 커진다 |
| 줄바꿈 | keep-all 27% · text-wrap balance 없음 | 측정 | 상품명은 한 줄 말줄임(…) |

### 5.2 색 (Color)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg | #FFFFFF · 면적 95% | 측정 | `--ruler-semantic-color-background-default` |
| surface | #F7F7F7 · 5% | 측정 | 썸네일 바탕, `--ruler-semantic-color-fill-surface-contents` |
| text | #1F1F1F | 측정 | 글자 40% |
| text-muted | #6A6A6A | 측정 | 글자 28%, 배지 글자 |
| text-subtle | #8A8A8A | 측정 | 찜 수, 보조 아이콘 |
| border | #DDDDDD | 측정 | 모든 선·아웃라인 버튼 |
| badge-bg | #F0F0F0 | 측정 | 텍스트 배지 바탕 |
| accent | #FF4800 | 측정 | 할인율만 (무브 3). `--ruler-semantic-color-common-accent` |
| accent-fg | #000000 | 파생 | `--ruler-semantic-color-fill-primary`. 실제로 accent 면 위 글자는 거의 없다 |
| accent 램프 | red-100 #FFEFEB … 500 #FF4800 · 600 #D53F00 … 950 #2E1608 | 선언 | `--ruler-scale-color-red-*` 10단계 + 알파 3단계 |
| gray 램프 | #F4F4F4 #E4E4E4 #C4C4C4 #A0A0A0 #5D5D5D #474747 #303030 #27272A #19191A | 선언 | `--ruler-scale-color-gray-*`. 실측 중립(#1F1F1F·#6A6A6A·#DDD)은 램프 밖 값이 섞여 있다 |
| 대비 text/bg · muted/bg | 16.48:1 AAA · 5.41:1 AA | 파생 | |
| 대비 accent/bg | 3.4:1 (AA 큰 글자만) | 파생 | 13px/700 할인율은 AA 미달 → 무브 3 깨지는 경우 |
| 중립 온도 | neutral (chroma 0, hue 없음) | 파생 | 온기는 사진이 낸다 |
| 그라데이션 | 1개 · 면적 1% | 측정 | 목록 끝 흰 페이드(slice 10). 장식 그라데이션 없음 |

### 5.3 간격·레이아웃 (Space & Layout)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 기준 단위 | 없음 (irregular, adherence 0.42) | 파생 | 4·8 배수가 아닌 값(3·6·10)이 섞임 |
| 간격 단계 | 2 3 4 6 8 10 12 24 | 파생 | 24 위 큰 단계가 없다 — 섹션 여백 개념이 없는 피드 |
| 섹션 상하 여백 (D) | 측정 실패: 홈이 섹션 구분 없는 피드 하나라 섹션 여백이 잡히지 않았다 | — | 스토리 카드 사이 세로 간격 약 60px(slice 02, 화면 판단) |
| 섹션 상하 여백 (M) | 20px | 측정 | |
| 컨테이너 | max-width 없음 (1440 풀폭) | 측정 | 무브 1 |
| 거터 | 48 / 24px (D/M) | 측정 | 헤더·푸터 좌우. 피드 사진은 거터 없이 가장자리까지 |
| 그리드 (엔진) | 4열 · gap 8 / 12px (D/M) | 측정 | 화면상 홈 피드는 3단 → 다음 행 |
| 피드 단 폭 | 605 \| 402 \| 403px (42/28/28%) · 단 안 좌우 패딩 약 24 | 추정 | 무브 2 |
| 스토리 카드 폭 | 355px · padding 0 | 측정 | 402 단 - 패딩 24×2 ≈ 355 |
| 상품 행 | 행 간격 약 92px · 썸네일 약 70px · 행 구분 1px | 추정 | |
| 헤더 높이 | 첫 화면 약 214px → 스크롤 뒤 약 130px | 추정 | 라틴 메뉴가 40→24 로 줄며 3단 헤더가 압축 |
| 밀도 | dense · 첫 화면 빈 칸 12% | 파생 | |

### 5.4 형태·깊이 (Shape & Depth)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius 버튼 | 4px | 측정 | 로그인·… 아웃라인 버튼 |
| radius 카드·썸네일 | 2px | 측정 | |
| radius 배지 | 2px | 측정 | |
| radius 사진 타일 | 0 | 측정 | 403px surface 타일 |
| radius 성격 | sharp · 단계 2·4 · pill 6% | 측정 | pill 은 모바일 앱 설치 띠 버튼 정도 |
| radius 모바일 히어로 카드 | 약 8px | 추정 | 모바일에서만 둥글다(mobile.png) |
| 테두리 | 1px #DDDDDD · 사용 medium | 측정 | 무브 5 |
| 피드 단 구분선 | 1px 세로선 (#DDDDDD 로 보임) | 추정 | slice 02·05 |
| 그림자 | flat · 0개 | 측정 | |
| 포커스 링 | 측정 실패: 포커스 상태는 캡처하지 않는다 | — | |

### 5.5 모션 (Motion)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 단계 | 150ms 하나 (fast = base = slow) | 측정 | 전환 12개 |
| easing | `cubic-bezier(0.4, 0, 0.2, 1)` | 측정 | Tailwind 기본 ease-in-out |
| 애니메이션 | 0개 | 측정 | |
| 등장 연출 | 보이지 않음 | 추정 | 정적 캡처라 스크롤 연출은 단정하지 않는다 |
| reduced-motion | 대응 없음 | 측정 | 따라 할 때는 넣는다(MO-4) |
| 라이브러리 | 없음 | 측정 | |
| hover 상태 | 측정 실패: 정적 캡처 | — | |

### 5.6 이미지·아이콘 (Imagery & Icons)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 이미지 비중 | 90% · 배경 이미지 0% | 측정 | 경고 IMAGE_HEAVY |
| 종류 | 연출 화보·룩북(인물, 자연광, 실내) + 흰·회색 바탕 상품 컷 | 추정 | 일러스트는 기획 타일 1–2개뿐 |
| 비율 | 브랜드 사진 세로형(605 폭), 스토리 사진 약 3:2(355×237), 썸네일 1:1 | 추정 | 비율이 단마다 하나로 고정 |
| 아이콘 개수 | 21개 · SVG 면적 0% | 측정 | |
| 아이콘 스타일 | 헤더는 채운(solid) 검정 글리프 약 18px, 찜 하트는 회색 선 약 1.5px · 20px | 추정 | 모바일 하단 탭은 채움(활성)/선(비활성) |
| 영상·blur | 영상 0 · 캔버스 0 · backdrop blur 0 | 측정 | |

## 6. 컴포넌트 (Components)

- 아웃라인 버튼: 높이 52 · padding-x 20 · radius 4 · bg #FFFFFF · 1px #DDDDDD · 글자 #1F1F1F 11–12px/400 (측정 ×2 — … 버튼 크기.
  헤더 로그인 버튼은 화면상 약 28px 높이로 더 작다, 추정). 채운 주 버튼은 홈에 없다
- 상품 행 (`product-card` 변형): 썸네일 약 70px · radius 2 · bg #F7F7F7 → 브랜드명 약 11px/700 → 상품명 12px 한 줄 말줄임 →
  할인율 13px/700 #FF4800 + 가격 13px/700 #1F1F1F → 배지 줄. 오른쪽에 찜 하트 + 찜 수 #8A8A8A. 행 사이 1px #DDDDDD (구조 추정, 크기·색 측정)
- 스토리 카드: 폭 355 · padding 0 · radius 0 · 사진 → 제목 22px/700 → 설명 한 줄 → 상품 행 3개 (측정 + 화면)
- 브랜드 스포트라이트 타일: 605px 단 폭 풀블리드 사진, 왼쪽 아래 흰 라틴 브랜드명(약 44–48px) + 한글 이름 작게 (추정)
- 배지: 높이 16 · padding-x 4 · radius 2 · bg #F0F0F0 · 글자 #6A6A6A 10px/500 (측정). 쿠폰·무료배송·신상품 류 텍스트만, 아이콘 없음
- 내비 (D): sticky · 3층 — 로고 + 유틸 아이콘 4 + 로그인 / 라틴 대형 메뉴 4개 / 카테고리 라틴 대문자 16px 14개 + 이탤릭 2개.
  스크롤하면 라틴 메뉴가 24px 로 줄며 로고 옆으로 올라간다 (측정: sticky·CTA 있음 / 층 구성은 화면)
- 내비 (M): 로고 + 장바구니 + 검색만, 위에 진한 앱 설치 띠(오렌지 pill 버튼), 아래 하단 탭 바 5개 (mobile.png)
- 입력: 홈에 없음 (측정 0개)
- hover·focus 상태: 측정 실패: 정적 캡처

## 7. 페이지 구조 (Page Anatomy)

| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 왼쪽 + 유틸 아이콘 4 · 아웃라인 로그인 오른쪽, 그 아래 라틴 40px 메뉴 4개, sticky | bg | 엔진 nav(0.95). 스크롤 뒤 3층 → 2층 압축 |
| 2 | category-nav | 라틴 대문자 16px 카테고리 14개 한 줄 + 세로선 + 이탤릭 링크 2개 | bg | 엔진이 nav 에 묶음. 엔진 미분리 |
| 3 | hero-media | 3타일 605/402/403, 헤더 아래부터 화면 끝까지, 간격 0. 타일마다 흰 글자 오버레이 | 사진 | 엔진 미감지(피드 첫 줄). 피드와 같은 3단 격자 |
| 4 | content-list | 3단 피드: 왼쪽 브랜드 사진 단, 가운데·오른쪽 스토리 카드(사진 + 제목 + 상품 행 3개) 엇갈림, 단 사이 1px 세로선 | bg | 엔진 미감지(높이 약 11,900px). 모바일 content-list(30) 기준 |
| 5 | pagination | 가운데 아웃라인 '…' 버튼 160×52 한 개, 위에 흰 페이드 | bg | 엔진 unknown(0.2) → pagination(load-more 변형) |
| 6 | footer | 고객센터 + SNS 4 / 공지 목록 + 링크 4열 / 사업자 정보 | bg | 엔진 footer(0.95). 1px 선 2개로 3층 |

리듬: 배경 교차 0번 — 헤더부터 푸터까지 흰 바탕이 이어지고, 명도 변화는 전부 사진이 만든다. 섹션 여백 대신 1px 선이 구획을 맡는다.

```text
+--------------------------------------------------------------+
| nav       logo / latin menu 40px (4)      icons(4) [login]   |
| category-nav   latin caps 16px (14) | italic links (2)       |
+--------------------------------------------------------------+
| hero-media (3 tiles)   605 | 402 | 403   full-bleed, gap 0   |
+--------------------------------------------------------------+
| content-list   brand photo col | story col | story col       |
|   story = photo 355 + title 22 + product rows (3)            |
|   columns staggered, 1px vertical rules, ~30 stories         |
+--------------------------------------------------------------+
| pagination     [load more]   white fade above                |
+--------------------------------------------------------------+
| footer   cs + sns / notice + links (4 cols) / business info  |
+--------------------------------------------------------------+
```

모바일: 시퀀스 `announcement-bar → nav → hero-media → content-list(30) → bottom-tab-bar`. 맨 위에 진한 앱 설치 띠(약 50px)가 붙고,
헤더는 로고 + 아이콘 2개로 줄어 카테고리 줄이 사라진다. 히어로는 radius 약 8px 카드 캐러셀로 바뀌어 다음 카드가 오른쪽에 걸친다.
3단 피드는 1단으로 접혀 스토리 카드가 폭 가득(좌우 거터 24) 쌓이고, 제목 16px·설명 15px 로 데스크톱보다 설명이 커진다.
하단 탭 바 5개가 고정된다.

## 8. 따라 할 때 Do / Don't

Do
- 사진을 가장자리까지 채우고 사진 사이 간격은 0, 경계는 1px 선으로만 둔다 (무브 1)
- 기획 하나를 '사진 + 22px 제목 + 한 줄 설명 + 상품 행 3개' 카드로 묶는다 (무브 2)
- 유채색 UI 는 할인율 숫자 하나에만, 찜 하트·배지·버튼은 무채색으로 (무브 3)
- 콘텐츠 글자는 10–22px 안에서 굵기·회색 단계로 위계를 만든다. 한글 하한은 12px (무브 4)
- 그림자 0, radius 는 버튼 4 / 썸네일 2 / 사진 0 세 값만 쓴다 (무브 5)
- 상품명 한 줄 말줄임, 할인율 → 가격 → 텍스트 배지 순서의 한국 커머스 관례를 지킨다

Don't
- 상품을 radius 12 + 그림자 카드 4열 그리드로 바꾸지 않는다 — 무브 2·5, LA-1
- 오렌지를 CTA·탭·하트·배지로 넓히지 않는다 — 무브 3, CO-5
- 사진 없이 0 radius·hairline·빽빽한 단만 가져오지 않는다 — 무브 1, LA-4
- 할인율·찜 수·배지 같은 커머스 관례를 빼고 '감성' 카드만 남기지 않는다 — 무브 2, KR-6
- 피드 카드마다 fade-up·hover-lift 를 넣지 않는다 — 무브 5, MO-1, MO-2
- 한국어 기획 제목 위에 영문 대문자 eyebrow 를 달지 않는다 — 무브 4, KR-4

## 9. 폰트 대체 (Font Substitutes)

| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| 29CM Editorial (29CM 전용, 한글·라틴 공용) | unknown — 외부 배포 확인 안 됨, 전용 서체로 취급 | Pretendard 의 라틴 글리프, 라틴 메뉴만 따로 키우면 Manrope | Pretendard, SUIT | 파일은 가져오지 않는다. 느낌은 0em 자간·13px/700 가격·40px 라틴 메뉴의 크기 대비에서 온다. 라틴 메뉴는 폭이 약간 넓은 그로테스크로 보여(추정) Manrope 가 가깝다 |

## 10. 베끼지 말 것 (Don't Copy)

- 29CM 로고·워드마크, '29' 앱 아이콘, 상단 라틴 메뉴의 서비스 이름들(고유 코너명)
- 화보·룩북·상품 사진 전부, 기획 타일의 손글씨·일러스트 타이포
- 기획 제목·설명·버튼 카피, 고객센터·사업자 정보 문구
- 입점 브랜드명과 브랜드 로고
- 29CM Editorial 폰트 파일
- 헤더·하단 탭의 고유 아이콘 글리프 — Lucide 같은 공개 세트로 같은 크기·채움 규칙만 옮긴다
- 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)

```text
kr-editorial-commerce × editorial. 홈을 3단 매거진 피드로: 42% 브랜드 사진 단 + 28% 스토리 단 2개, 단 사이 1px #DDDDDD 세로선, 사진은 가장자리까지 radius 0·gap 0.
스토리 카드 = 사진(3:2) + 제목 22px/700 + 한 줄 설명 + 상품 행 3개(썸네일 70px radius 2, 브랜드 11px 굵게, 상품명 12px 한 줄 말줄임, 할인율·가격 13px/700).
UI 는 #FFFFFF/#F7F7F7/#1F1F1F/#6A6A6A/#DDDDDD 무채색만, #FF4800 은 할인율 숫자에만. 자간 0, 그림자 0, 버튼 radius 4.
금지: 둥근 그림자 카드 4열 그리드, 오렌지 CTA·배지, fade-up, 대문자 eyebrow.
```

```text
Korean editorial commerce with a magazine layout. Three-column feed: a 42% brand-photo column and two 28% story columns, 1px #DDDDDD vertical rules, full-bleed photos with zero radius and zero gap.
Story card = 3:2 photo + 22px/700 title + one-line dek + three product rows (70px thumbs, 13px/700 prices).
Neutral UI only; #FF4800 only for discount rates. 0em tracking, no shadows, 4px button radius. No rounded shadow cards, orange CTAs or fade-ups.
```

## 부록: 화면 관찰 (Visual Read)

- 첫 화면(desktop.png)은 위 214px 정도가 흰 헤더이고 나머지가 사진 세 장으로 꽉 찬다. 왼쪽 큰 인물 화보, 가운데 손글씨풍 일러스트 타이포 기획,
  오른쪽 상품 정물 — 세 타일의 사진 톤(따뜻한 실내 / 원색 일러스트 / 베이지 정물)이 서로 달라 첫인상이 잡지 표지처럼 다채롭다.
- 헤더에서 가장 큰 글자는 콘텐츠가 아니라 라틴 메뉴(약 40px)다. 카테고리도 라틴 대문자라 첫 화면 위쪽은 '영문 잡지 마스트헤드'처럼 읽히고,
  한글은 사진 위 오버레이와 아래 피드에서야 등장한다.
- 스크롤하면(slices 02–09) 왼쪽 단은 브랜드 하나씩 크게 보여 주는 화보가 이어지고, 가운데·오른쪽은 스토리 카드가 엇갈려 쌓인다.
  카드 아래 상품 행이 촘촘해(약 92px 간격) 사진 → 글자 → 사진의 리듬이 생긴다.
- 화면에서 색이 나오는 곳은 사진과 할인율 숫자뿐이다. 할인율 오렌지는 상품 행마다 같은 자리에 있어 세로로 점선처럼 이어진다.
- 단 사이 세로선, 상품 행 사이 가로선이 모두 1px 연회색이라 사진이 없는 부분은 거의 선만 남는다. 그림자나 카드 바탕이 없다.
- 피드 끝은 흰 페이드 아래 가운데 '…' 아웃라인 버튼 하나다. 푸터는 흰 바탕에 1px 선 두 개로 3층을 나눈다.
- 모바일(mobile.png)은 분위기가 다르다: 맨 위 진한 앱 설치 띠에 오렌지 pill 버튼이 있어 첫 화면 유일한 유채색 UI 가 되고,
  히어로는 둥근 카드 캐러셀(다음 카드가 오른쪽에 걸침, 오른쪽에 페이지 번호), 하단에 탭 바 5개가 붙어 앱처럼 보인다.
- 사진 속 인물·상품명 텍스트 외에 개인정보는 화면에 없다(로그아웃 상태).

## 부록: 측정 메모 (Capture Notes)

- 방법: cdp (Chrome 155 headless), desktop 1440×900 @1 · mobile 390×844 @2. 2026-10-15 01:23 UTC, 로그아웃·ko-KR·첫 방문 상태. 숨긴 오버레이 없음.
- 경고: NETWORK_BUSY(D·M 모두 8초 안에 네트워크가 잠잠해지지 않음 — 지연 로드 이미지 일부가 빠졌을 수 있다) · SLICES_SAMPLED(페이지 15화면,
  슬라이스 10장을 고르게 뽑음 — 피드 중간 일부는 보지 못했다) · IMAGE_HEAVY(이미지 90%라 색 비중은 참고만) · STRUCTURE_LOW(섹션 67%만 분류).
- 엔진 정정: 데스크톱 구조가 `nav → unknown → footer` 로만 잡혔다. 피드 전체(y 약 214–12,100)가 섹션 하나로 인식되지 않아
  hero-media·content-list 를 스크린샷으로 붙였고, unknown(0.2) → pagination(load-more), nav 에서 category-nav 를 분리했다. tokens.json 은 그대로 둠.
- 엔진 그리드 '4열 · gap 8/12' 은 화면상 3단 피드와 맞지 않는다. 헤더 유틸 영역 등 다른 요소에서 잡힌 값으로 보고 피드 단 폭은 추정으로 따로 적었다.
- 버튼 primary 측정값(높이 52)은 '…' 버튼 크기다. 헤더 로그인 버튼은 더 작아 보인다(추정).
- 상단 라틴 메뉴 40px: 40 은 스케일 단계로 측정됐지만 어느 역할인지 엔진이 이름 붙이지 않아 화면 판단으로 연결했다(추정).
- accent-fg #000000 은 엔진 파생값(`--ruler-semantic-color-fill-primary`)이다. 화면에서 accent 면 위 글자는 모바일 앱 띠 pill 정도이고 흰 글자로 보인다.
- 대비 accent/bg 3.4:1, red-600/bg 4.63:1 은 측정 hex 로 계산한 파생값이다.
- 근거 비율: 값이 있는 토큰 행 61개 = 측정 39 · 선언 2 · 파생 9 · 추정 11 → 64 / 3 / 15 / 18%. 측정 실패 3행(섹션 여백 D, 포커스 링, hover)은 뺐다.
- 페이지 텍스트에서 지시처럼 보이는 문자열은 없었다.
