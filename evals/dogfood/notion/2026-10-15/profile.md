---
schema: dd.profile/1
slug: notion-com
name: Notion
input_type: url
source: https://www.notion.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: files
recapture: null
styles: {primary: corporate-clean, secondary: playful-illustrative, treatments: []}
structure: "announcement-bar → nav → hero-product → logo-cloud → bento-grid → testimonials(3) → cta-band → footer"
evidence: {measured: 77, declared: 0, derived: 12, estimated: 11, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
---

# Notion — Reference Profile

## 1. 본질 (Essence)

협업 도구를 고르는 팀을 위해 96px 로 조인 헤드라인 속 상태 칩, 실제 워크스페이스 화면과 그 가장자리에 걸친 흑백 펜 드로잉으로
'정밀한데 사람 손이 닿은 작업 공간' 느낌을 만든다.

## 2. 스타일 분류 (Classification)

- primary: `corporate-clean` — 브랜드 파랑 1색(#0075DE)은 주 CTA 에만, radius 버튼 8 / 카드 12 두 단계, 1px 경계 + 옅은
  다겹 그림자, 히어로·기능 섹션 모두 실제 제품 UI(이미지 비중 47%, 측정). 단 중립은 corporate-clean 의 차가운 회색이 아니라
  따뜻한 회색(text-muted hue 68)이다
- secondary: `playful-illustrative` — 히어로 제품 프레임 가장자리에 걸친 흑백 펜 드로잉 캐릭터, 헤드라인 속 pill 칩.
  단 범위 밖: 일러스트가 흑백 잉크 선뿐(다색 아님), radius 8–12(범위 12–32 의 아래 끝), 탄성 모션 없음(200ms ease-in)
- treatments: 없음 — 그라데이션 3개(면적 9%)는 오로라 면이 아니고 글자 그라데이션 0, backdrop blur 1곳뿐
- 축: 밀도 3 · 온도 3 · 채도 2 · 대비 4 · 둥긂 3 · 장식 3

## 3. 무드 키워드 (Mood)

손그림이 섞인 정밀함 (hand-drawn precision) · 따뜻한 무채색 (warm neutral) · 제품이 증거인 (product-as-proof) ·
큰 글자로 단정한 (big-type confidence) · 문서처럼 차분한 (document-calm) · 장난기 한 방울 (a dash of whimsy)

## 4. 시그니처 무브 (Signature Moves)

### 1. 히어로 헤드라인 하나만 96px 로 키우고 -0.035em 으로 조인다
- 관찰: hero-product 의 h1(slices/desktop-01.jpg). 2줄이 화면 폭의 약 66%를 채운다. 아래 섹션 h2 는 54px 로 한 단계 낮다
- 수치: 히어로 h1 96px(측정) · 굵기 700, 행간 약 1.0, 자간 약 -0.035em(추정, 같은 패밀리의 h2 값과 화면 비교) ·
  섹션 h2 54px / 1.04 / -0.035em(측정) · 본문 18px(측정) → display:본문 5.3:1(파생)
- 기본값과의 차이: 흔한 히어로 48–64px / 자간 0 대비 1.5–2배 크고, 행간 1.2 대신 1.0 안팎으로 줄 사이를 붙인다
- 따라 하는 법: `font-size: clamp(3rem, 1.9rem + 4.6vw, 6rem); line-height: 1.02; letter-spacing: -0.035em; font-weight: 700; text-wrap: balance;`
  섹션 h2 는 `clamp(2rem, 1.489rem + 2.095vw, 3.375rem)`(파생, 32→54px)
- 깨지는 경우: 헤드라인이 6–7단어를 넘으면 3줄이 되어 첫 화면을 다 먹는다 → 카피를 줄인다. 한글은 이 값 그대로면 받침이 붙는다
  → 자간 -0.02 ~ -0.03em, 행간 1.15 이상, 굵기 700 → 600

### 2. 헤드라인 속 단어 하나를 제품의 상태 칩으로 바꾼다
- 관찰: 히어로 h1 둘째 줄 가운데 동사. 글자색은 그대로 두고 연초록 pill 안에 초록 점과 함께 넣었다. Notion 의 상태(Status) 속성 칩과 같은 모양이다
- 수치: 칩 bg #D0F4D8, radius 9999, padding 8 / 28px, 폭 244px(측정) · 점 지름 약 32px, 초록(추정)
- 기본값과의 차이: 흔한 강조는 단어 하나만 브랜드색·그라데이션으로 칠한다(TY-1). 여기서는 글자색을 바꾸지 않고 **제품 안의
  UI 객체**를 문장에 꽂아 "이 문장이 곧 제품 화면"이라는 신호를 준다
- 따라 하는 법: `<span class="chip"><i class="dot"></i>…</span>` 에 `display:inline-flex; align-items:center; gap:.3em;
  padding:.08em .3em; border-radius:9999px; background:#D0F4D8;` 점은 `width:.33em; aspect-ratio:1; border-radius:50%`
- 깨지는 경우: 내 제품에 그 칩이 실제로 없으면 단순 하이라이트(TY-1)가 된다 → 제품에 있는 상태·태그·멘션 모양만 쓴다.
  한 페이지에 한 번만

### 3. 실제 제품 화면을 가장 옅은 그림자로 띄우고 흑백 펜 드로잉을 가장자리에 걸친다
- 관찰: 히어로 아래 워크스페이스 화면(사이드바 + 칸반). 왼쪽 아래에 인물, 오른쪽 위에 얼굴 낙서가 프레임 선을 넘어 걸쳐 있다
- 수치: 프레임 폭 960px, radius 8, 1px rgba(0,0,0,.1), 그림자 5겹·각 알파 0.008–0.024·최대 blur 28px(측정) ·
  이미지 비중 47%(측정) · 일러스트는 흑백 잉크 선, 캐릭터 2개(추정)
- 기본값과의 차이: 흔한 SaaS 는 shadow-md(알파 0.1) 한 겹 + 기울인 목업 + 다색 3D 일러스트. 여기서는 그림자를 거의 보이지 않게
  흩고, 장식은 색 없는 손선 2개로 끝낸다
- 따라 하는 법: `box-shadow: 0 .67px 3.5px rgba(0,0,0,.008), 0 2.9px 7.3px rgba(0,0,0,.016), 0 7.2px 14.5px rgba(0,0,0,.02), 0 13.9px 28.3px rgba(0,0,0,.024);`
  `border:1px solid rgba(0,0,0,.1); border-radius:8px;` 일러스트는 `position:absolute` 로 프레임 모서리에 -40px 정도 걸친다
- 깨지는 경우: 실제 제품 화면이 없으면 무브 전체가 성립하지 않는다 → hero-type 으로. 고유 손그림이 없으면 일러스트를 빼고
  화면만 둔다(스톡 일러스트는 IC-3·IC-4 로 무너진다)

### 4. 크롬은 따뜻한 무채색으로 끝내고, 색은 주 CTA 와 제품 데이터에만 둔다
- 관찰: 배경·글자·경계·면은 무채색. 유채색은 파랑 버튼과 제품 화면 속 태그(초록·분홍·주황·하늘), 히어로 칩뿐(desktop.png, slices)
- 수치: bg #FFFFFF 77% · surface #F9F9F8 15% · band #F6F5F4 · text-muted #615D59(oklch hue 68, 측정) · accent #0075DE(측정) ·
  보조 버튼 #E6F3FE 위 #005BAB(측정)
- 기본값과의 차이: 흔한 SaaS 는 차가운 slate 중립 + 브랜드색을 아이콘·배지·링크까지 넓힌다. 여기서는 중립을 노랑 쪽으로
  아주 조금 데우고(chroma 0.008), 파랑은 버튼 2종에만 둔다
- 따라 하는 법: `--bg:#FFF; --surface:#F9F9F8; --band:#F6F5F4; --muted:#615D59; --text:rgba(0,0,0,.9); --accent:#0075DE; --accent-tint:#E6F3FE; --accent-ink:#005BAB;`
- 깨지는 경우: 제품 화면에 색이 거의 없으면 페이지가 너무 무채색이 된다 → 칩(무브 2)이나 일러스트 쪽에 색 하나를 더 허락한다

### 5. 기능 카드는 옅은 면 위에 제품 조각을 잘라 넣고 그림자를 뺀다
- 관찰: bento-grid(desktop.png 두 번째 화면). 2열 카드, 위에 작은 라벨 + 굵은 제목 + 오른쪽 검정 원형 화살표, 아래에 흰 UI 패널이
  카드 밑변에서 잘린다
- 수치: 카드 bg #F9F9F8, radius 12, padding 24, 그림자 없음, 테두리 없음(측정) · 열 간격 24px(측정) · 카드 제목 약 22px / 700(추정)
- 기본값과의 차이: 흔한 기능 섹션은 아이콘 + 제목 + 설명 3열 카드에 흰 배경 + shadow(LA-2, LA-1). 여기서는 2열로 크게,
  아이콘 대신 실제 UI 조각을 쓰고 깊이는 면 색 차이(#FFFFFF ↔ #F9F9F8)로만 만든다
- 따라 하는 법: `.card{background:#F9F9F8;border-radius:12px;padding:24px 24px 0;overflow:hidden}` 안쪽 UI 는 흰 면 radius 12 로
  `margin-bottom:-40px` 정도 밀어 잘라 낸다
- 깨지는 경우: 카드마다 넣을 실제 UI 조각이 없으면 빈 회색 상자가 된다 → 카드 수를 줄이거나 media-text 로 바꾼다

## 5. 토큰 (Tokens)

### 5.1 타이포그래피 (Typography)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 디스플레이·UI | NotionInter (Inter 기반 웹폰트, 글자 78%) | 측정 | h1·h2·small·button·nav. 스택 `NotionInter, Inter, -apple-system, system-ui` |
| 패밀리 본문 세리프 | Lyon Text (웹폰트, 글자 22%) | 측정 | body 역할 18px. 화면에서 위치는 확인 못함(섹션 4 인용으로 짐작) |
| display (히어로 h1) 크기 | 96px | 측정 | structure 의 hero heading size. role 표에는 없다(측정 메모) |
| display 굵기·행간·자간 | 700 · 약 1.0 · 약 -0.035em | 추정 | 슬라이스에서 줄 간격·글자 간격을 h2 와 비교 |
| h2 | 54 / 32px · 700 · 1.04 · -0.035em | 측정 | 섹션 제목, 왼쪽 정렬 |
| h1 역할 (cta-band 제목) | 42 / 26px · 700 · 1.14 · -0.036em | 측정 | 엔진 role h1 은 이 제목을 잡았다 |
| 카드 제목 | 약 22px · 700 | 추정 | 스케일 단계에 22 가 있다 |
| 리드 | 약 20px · 400 · 검정 | 추정 | 히어로 서브 한 줄, muted 회색이 아니다 |
| body | 18px · 400 · 1.56 · 0em (Lyon Text) | 측정 | ×3 |
| small | 14px · 400 · 1.43 · 0em | 측정 | 캡션·카드 라벨 ×17 |
| button | 16px · 500 · 1.5 · 0em | 측정 | |
| nav | 14px · 500 · 1.43 · 0em | 측정 | ×37, 대부분 footer 링크로 보인다. 상단 링크는 ghost 16/400 |
| 스케일 | 단계 12 14 16 18 20 22 42 54 72 96 · 1.067 minor-second (fit 0.83) | 파생 | 작은 단계는 촘촘하고 22 → 42 에서 크게 뛴다. 두 덩어리 스케일 |
| clamp | h1 역할 `clamp(1.625rem, 1.254rem + 1.524vw, 2.625rem)` · h2 `clamp(2rem, 1.489rem + 2.095vw, 3.375rem)` | 파생 | 390→1440px 선형 |
| 줄바꿈 | text-wrap balance 사용 · keep-all 0%(한글 1%) | 측정 | |

### 5.2 색 (Color)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg | #FFFFFF · 면적 77% | 측정 | |
| surface | #F9F9F8 · 15% | 측정 | bento 카드 면 |
| surface-band | #F6F5F4 | 측정 | cta-band, 맨 위 언어 안내 띠 |
| text | #000000E5 (합성 #1A1A1A) | 측정 | 순검정이 아니라 알파 0.9 |
| text-muted | #615D59 · 11% | 측정 | oklch(0.48 0.008 68), 따뜻한 회색 |
| border | #0000001A (합성 #E5E5E5) | 측정 | 선언 변수 `--border-color-regular` 는 #00000014. 렌더값을 쓴다 |
| accent | #0075DE | 측정 | 주 CTA 만 (무브 4) |
| accent-fg | #FFFFFF | 측정 | |
| accent-tint (보조 버튼) | bg #E6F3FE · 글자 #005BAB | 측정 | 히어로 두 번째 버튼 |
| accent-strong | #097FE8 (`--tatami-color-accent-strong`) | 측정 | 흰 배경 보조 버튼 글자 |
| 상태 칩 | #D0F4D8 pill | 측정 | 히어로 칩 (무브 2). 점 색은 화면상 초록 |
| 기타 유채색 | #F64932 · #FFB110 · #E32D14 · #E89D01 (각 16%) | 측정 | 제품 화면 태그·아이콘 쪽 색으로 보인다(위치는 추정) |
| 대비 text/bg · text/surface | 17.4:1 · 16.69:1 (AAA) | 파생 | |
| 대비 muted/bg · accent-fg/accent | 6.53:1 (AA) · 4.57:1 (AA) | 파생 | 파랑 위 흰 글자는 AA 경계. 더 밝은 파랑으로 바꾸지 않는다 |
| 중립 온도 | warm (hue 68 안팎, chroma 0.001–0.008) | 파생 | |
| 그라데이션 | 3개 · 면적 9% · 글자 그라데이션 0 | 측정 | 장식 면이 아니라 페이드 처리로 보인다 |

### 5.3 간격·레이아웃 (Space & Layout)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 기준 단위 | 없음 (irregular, adherence 0.7) · 단계 3 4 5 6 8 12 15 16 24 | 파생 | 4/8 계열이 많지만 3·5·15 가 섞인다 |
| 섹션 상하 여백 | 96 / 36px (D/M) | 측정 | 일반 랜딩 범위. 모바일에서 크게 줄인다 |
| 컨테이너 | 1184px | 측정 | |
| 거터 | 106 / 16px | 측정 | |
| 그리드 | 열 4 · 3 · 2, gap 24 / 12px | 측정 | bento 2열, 고객 사례 3열, footer 4열 |
| 정렬 | 히어로·cta-band 가운데, 나머지 섹션 왼쪽 | 측정 | 가운데 → 왼쪽 → 가운데로 페이지가 닫힌다 |
| 카드 안쪽 여백 | 24px | 측정 | |
| 밀도 | balanced · 첫 화면 빈 칸 49% | 파생 | |
| 페이지 높이 | 4731 / 4003px | 측정 | 섹션 6개, 짧은 홈 |

### 5.4 형태·깊이 (Shape & Depth)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius 버튼 | 8px (내비 ghost 4, 언어 선택 pill) | 측정 | |
| radius 카드·이미지 | 12px | 측정 | bento 카드, 안쪽 UI 패널 |
| radius 제품 프레임 | 8px | 측정 | 히어로 960px 프레임 |
| radius 단계 | 4 / 8 / 12 / pill · pill 비율 11% | 측정 | pill 은 칩·언어 선택·원형 버튼 |
| 테두리 | 1px rgba(0,0,0,.1) · 사용 medium | 측정 | 내비 아래, 제품 프레임 |
| 그림자 sm | `rgba(0,0,0,.01) 0 .175px 1.041px, rgba(0,0,0,.02) 0 .8px 2.925px, rgba(0,0,0,.027) 0 2.025px 7.847px, rgba(0,0,0,.04) 0 4px 18px` · 83% | 측정 | 4겹, elevation 0.52. ring shadow 없음 |
| 그림자 프레임 | 5겹, 알파 0.008 → 0.024+, 최대 blur 28px | 측정 | 히어로 제품 프레임 (무브 3) |
| 포커스 링 | 측정 실패: 포커스 상태는 캡처하지 않는다 | — | 브리프에서 정한다 |

### 5.5 모션 (Motion)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 단계 | 200ms 한 단계 (fast·base·slow 모두 200, 전환 80개) | 측정 | |
| easing | `ease-in` | 측정 | 흔한 ease-out 과 반대. 따라 할 때는 ease-out 이 더 자연스럽다 |
| 애니메이션 | CSS 2개 · 라이브러리 없음 | 측정 | |
| 등장 연출 | 히어로 칩 단어가 바뀌는 연출일 가능성 | 추정 | 정적 캡처라 확인 못함 |
| reduced-motion | 대응함 | 측정 | |
| hover | 측정 실패: 정적 캡처라 상태를 재지 않는다 | — | |

### 5.6 이미지·아이콘 (Imagery & Icons)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 이미지 비중 | 47% | 측정 | 제품 화면이 대부분 |
| 종류 | 실제 제품 UI 화면 + 흑백 펜 드로잉 캐릭터. 사진 없음 | 추정 | 무브 3 |
| 고객 로고 | 흑백 로고 약 18개, 2줄 | 추정 | 히어로 아래 |
| 아이콘 개수 | 23개 | 측정 | |
| 원형 화살표 버튼 | 검정 원 약 32px + 흰 화살표 | 추정 | bento 카드 오른쪽 위 |
| 영상 | 1개 | 측정 | |
| SVG·캔버스·배경 이미지 | 0% · 0 · 0% | 측정 | 일러스트도 이미지 파일로 들어 있다 |
| backdrop blur | 1곳 | 측정 | |

## 6. 컴포넌트 (Components)

- 주 버튼: 높이 38 · padding-x 15 · radius 8 · bg #0075DE · 글자 #FFFFFF 16px/500 · 그림자 없음 (측정, ×5 — 내비·히어로·cta-band)
- 보조 버튼(tint): 높이 38 · padding-x 15 · radius 8 · bg #E6F3FE · 글자 #005BAB 16px/500 (측정, 히어로)
- 보조 버튼(흰): 높이 38 · radius 8 · bg #FFFFFF · 글자 #097FE8 16px/500 (측정, 본문 영역)
- 내비 링크: ghost 높이 36 · padding-x 10 · radius 4 · 글자 text 16px/400 (측정 ×22). 드롭다운 링크에 작은 chevron (추정)
- 언어 선택: pill 높이 38 · padding-x 16 · 1px border · 14px/500 (측정, footer)
- 내비: 흰 배경, 아래 1px 경계, 화면상 높이 약 64px. 로고 왼쪽, 링크 4개 가운데, 로그인 텍스트 + 주 버튼 오른쪽 (추정 — 엔진 nav 값은
  언어 안내 띠를 잡았다). 모바일은 로고 + 주 버튼 + 햄버거 (mobile.png)
- 카드(bento): 폭 602 · radius 12 · bg #F9F9F8 · padding 24 · 테두리·그림자 없음 (측정). 안쪽 흰 UI 패널 radius 12 (측정)
- 제품 프레임: 폭 960 · radius 8 · 1px border · 5겹 그림자 (측정)
- 상태 칩: 폭 244 · padding 8/28 · pill · #D0F4D8 (측정)
- 입력·배지: 페이지에 없음(측정 0). hover·focus 는 측정 실패: 정적 캡처

## 7. 페이지 구조 (Page Anatomy)

| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | announcement-bar | 언어 전환 안내 한 줄, 높이 약 30–44px | surface-band | 엔진 nav(0.95) → announcement-bar: ko-KR 로케일에서만 뜨는 안내 띠 |
| 2 | nav | 로고 왼쪽, 링크 4 가운데, 로그인 + 주 버튼 오른쪽, 아래 1px 경계 | bg | 엔진 미분리(1·3 사이) |
| 3 | hero-product | 가운데 정렬, h1 96px 2줄 + 칩, 리드 1줄, 버튼 2, 아래 960px 제품 프레임 + 펜 드로잉 2개 | bg | 엔진 hero-product(0.85) 유지 |
| 4 | logo-cloud | 회색 캡션 1줄 + 흑백 로고 약 9개 × 2줄 | bg | 엔진 미분리(히어로 높이 1329 안에 포함) |
| 5 | bento-grid | h2 54px 왼쪽 + 2열 카드(#F9F9F8, radius 12), 카드마다 라벨·제목·원형 화살표 + 잘린 UI 조각 | bg | 엔진 media-text(0.63) → alt bento-grid: 카드마다 실제 화면이 있고 반복 3×2 |
| 6 | testimonials | h2 54px + 3열 고객 사례(로고·링크 3개) | bg | 엔진 logo-cloud(0.8) → alt testimonials(모바일도 testimonials). 화면 미확인, 세리프 본문이 여기일 가능성 |
| 7 | cta-band | 가운데 h2 42px + 버튼 2 | surface-band | 진한 면이 아니라 옅은 따뜻한 회색 |
| 8 | footer | 4열 링크 + 언어 선택 pill + 쿠키 설정 | bg | |

리듬: 여백 96/36, 흰 배경이 길게 이어지고 맨 위 안내 띠와 cta-band 만 #F6F5F4. 명도 변화가 2번뿐이라 구획은 여백과
정렬 전환(가운데 → 왼쪽 → 가운데)이 맡는다.

```text
+--------------------------------------------------------------+
| announcement-bar (locale)                    bg surface-band |
+--------------------------------------------------------------+
| nav           logo | links(4) centered | login [cta]         |
| hero-product  h1 96px + chip, lead, 2 buttons, centered      |
|               product frame 960 + ink characters             |
| logo-cloud (2 rows, mono)                                    |
| bento-grid    2 cols, surface cards, UI cropped              |
| testimonials (3)                                             |
+--------------------------------------------------------------+
| cta-band      h2 42px + 2 buttons, centered  bg surface-band |
+--------------------------------------------------------------+
| footer (4 cols)                                              |
+--------------------------------------------------------------+
```

히어로만 가운데 정렬이고 제품 프레임이 컨테이너 안에 머문다(넘침 없음). 펜 드로잉만 프레임 선을 넘는다.

모바일: 내비는 로고 + 주 버튼 + 햄버거. bento 2열 → 1열, UI 조각은 제목 아래로. footer 4열 → 2열. h2 54 → 32px,
섹션 여백 96 → 36px. 캡처된 모바일 첫 화면에는 히어로 헤드라인이 없고 로고 띠부터 보인다(엔진도 대응 섹션을 못 찾음, 측정 메모).

## 8. 따라 할 때 Do / Don't

Do
- 히어로 h1 하나만 96px / -0.035em 으로 키우고, 섹션 h2 는 54px 로 한 단계 낮춘다 (무브 1)
- 헤드라인 칩은 내 제품에 실제로 있는 UI 모양(상태·태그·멘션)으로 한 번만 쓴다 (무브 2)
- 제품 화면은 실제 UI 를 1x 로, 프레임은 1px 경계 + 알파 0.03 이하 다겹 그림자 (무브 3)
- 중립은 hue 60–70 쪽으로 아주 조금 데우고, 파랑은 주 버튼과 tint 보조 버튼에만 쓴다 (무브 4)
- 기능 카드는 #F9F9F8 면 + radius 12 + 그림자 없이, 아래로 잘린 UI 조각으로 채운다 (무브 5)
- 한글에 옮길 때는 display 자간 -0.02 ~ -0.03em, 행간 1.15 이상, `word-break: keep-all`

Don't
- 칩을 색 span 하이라이트로 흉내 내지 않는다 — 무브 2, TY-1
- 제품 프레임에 rgba(0,0,0,.1) 한 겹 shadow-md 를 쓰지 않는다 — 무브 3, SH-2
- 펜 드로잉 자리를 스톡 일러스트·3D 블롭으로 채우지 않는다 — 무브 3, IC-3
- 파랑을 아이콘·배지·링크로 넓히거나 히어로 뒤에 보라 그라데이션을 깔지 않는다 — 무브 4, CO-1
- bento 카드에 테두리 + 그림자 + 채움을 모두 얹지 않는다 — 무브 5, SH-5
- 카드 라벨을 대문자 eyebrow 로 바꾸지 않는다(문장형 14px 라벨이다) — 무브 5, TY-2

## 9. 폰트 대체 (Font Substitutes)

| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| NotionInter (Inter 기반 Notion 웹폰트) | 엔진 unknown — 사이트 전용 컷으로 보고 파일을 쓰지 않는다 | Inter (OFL) | Pretendard | Pretendard 라틴이 Inter 계열이라 한 패밀리로 끝난다. 96px 한글은 굵기 700 → 600 또는 크기 10% 줄여 같은 무게 |
| Lyon Text (세리프 텍스트) | 유료(상용) | Newsreader | Noto Serif KR | 본문 세리프 대체. 한글 페이지는 본문을 Pretendard 로 두고 세리프를 인용에만 쓰는 편이 안전하다 |

## 10. 베끼지 말 것 (Don't Copy)

- Notion 'N' 로고·워드마크
- 흑백 펜 드로잉 캐릭터(Notion 고유 일러스트) — 선 규칙(흑백, 균일한 잉크 선, 캐릭터 2개 이하)만 옮긴다
- 워크스페이스 스크린샷과 그 안의 데이터, 고객사 로고 띠와 사례
- 헤드라인·리드·버튼 카피, 히어로 칩 안의 단어
- NotionInter·Lyon Text 폰트 파일
- 따뜻한 무채색 + #0075DE + 가운데 96px 히어로 + 펜 드로잉을 한꺼번에 가져오면 Notion 으로 오인된다 → 무브 2–3개만 고르고
  색과 일러스트는 내 제품에서 정한다
- 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)

```text
corporate-clean 에 손그림 한 방울을 얹은 랜딩. 히어로는 가운데 정렬, h1 96px/1.02 자간 -0.035em 굵기 700,
문장 속 단어 하나를 제품의 상태 칩(pill #D0F4D8 + 초록 점)으로 한 번만 바꾼다. 아래에 실제 제품 UI 를 960px 프레임에 1x 로:
radius 8, 1px rgba(0,0,0,.1), 4–5겹 그림자 각 알파 0.03 이하. 프레임 가장자리에 흑백 펜 드로잉 2개만 걸친다.
중립은 따뜻하게(#FFFFFF / #F9F9F8 / #615D59 / rgba(0,0,0,.9)), 파랑 #0075DE 는 주 버튼만, 보조 버튼은 #E6F3FE 위 #005BAB.
기능은 h2 54px 왼쪽 정렬 + #F9F9F8 radius 12 카드 2열, 그림자 없이 UI 조각을 아래로 잘라 넣는다. 섹션 여백 96px.
금지: 보라 그라데이션, shadow-md, 색 span 강조, 스톡·3D 일러스트, 대문자 eyebrow.
```

```text
Corporate-clean landing with a dash of hand-drawn whimsy. Centered hero, 96px/1.02 h1 at -0.035em, weight 700;
swap one word for a product status chip (pill #D0F4D8 with a green dot), once. Real product UI at 1x in a 960px frame:
radius 8, 1px rgba(0,0,0,.1), 4–5 layered shadows each under 0.03 alpha, two black ink-line characters overlapping its edges.
Warm neutrals (#FFFFFF / #F9F9F8 / #615D59), blue #0075DE on the primary button only, secondary #005BAB on #E6F3FE.
Features: left-aligned 54px h2, 2-column #F9F9F8 cards (radius 12, no shadow) with cropped UI. 96px section padding.
No purple gradients, shadow-md, colored word highlights, stock or 3D illustrations, uppercase eyebrows.
```

## 부록: 화면 관찰 (Visual Read)

- **첫 화면(slices/desktop-01.jpg)**: 가운데 정렬. 아주 큰 산세리프 헤드라인 2줄이 화면 폭의 약 66%(240–1200px)를 채운다.
  둘째 줄 가운데 단어 하나가 민트 pill(#D0F4D8, radius 9999) 안에 초록 점과 함께 들어가 있다. 문장 속 단어가 Notion 의
  '상태 칩'처럼 보인다. 그 아래로 회색 아닌 검정 리드 1줄, 파랑 채움 버튼과 옅은 파랑 tint 버튼이 붙어 있다(간격 약 16px).
- **히어로 미디어**: 실제 Notion 워크스페이스 화면(사이드바 + 칸반 보드)이 브라우저 크롬을 흉내 낸 1px 테두리 프레임 안에 있다.
  프레임 폭 960px, radius 8, 그림자는 거의 안 보일 만큼 넓고 옅다. 프레임 가장자리 바깥으로 흑백 펜 드로잉 캐릭터
  (왼쪽 아래 인물, 오른쪽 위 얼굴 낙서)가 걸쳐 있다. 정밀한 제품 UI 와 손으로 그린 잉크 선이 한 화면에 겹치는 게 첫인상의 핵심이다.
- **색의 위치**: 마케팅 크롬(배경·글자·경계)은 거의 무채색이고, 유채색은 파랑 버튼 하나와 제품 화면 속 태그(초록·분홍·주황·
  하늘)에만 있다. 색은 "제품 안의 데이터"로만 보인다.
- **로고 띠**: 히어로 아래에 흑백 고객사 로고 2줄(약 9개 × 2). 위에 작은 회색 캡션 한 줄.
- **두 번째 화면(desktop.png, 스크롤된 상태로 찍힘)**: 54px 헤드라인이 **왼쪽 정렬**로 바뀐다(히어로만 가운데). 아래로 2열 카드,
  카드 배경은 #F9F9F8 근처의 아주 옅은 따뜻한 회색, radius 12, 안쪽 여백 약 24px. 카드 상단에 작은 라벨 + 굵은 제목 +
  오른쪽 끝 검정 원형 화살표 버튼(약 32px). 카드 아래쪽에 흰 제품 UI 조각(데이터베이스 표, 차트)이 카드 밖으로 잘려 나간다.
- **리듬**: 흰 바탕이 길게 이어지고 cta-band 와 맨 위 언어 안내 띠만 #F6F5F4(따뜻한 회색)다. 섹션 사이 구분선은 보이지 않는다.
- **모바일(mobile.png)**: 로고 + 파랑 CTA + 햄버거. 캡처된 첫 화면에는 히어로 헤드라인이 없고 로고 띠 → "…" 섹션이 바로 나온다.
  카드는 1열, 헤드라인 2줄, 원형 화살표는 오른쪽에 유지.
- **가려진 것**: 쿠키 동의 창(한국어)이 1차 캡처의 오른쪽 아래를 가렸다. 배너를 숨긴 재캡처로 첫 화면을 다시 확인했다(측정값 동일).
  엔진 섹션 4–6(고객 사례, cta-band, footer)은 슬라이스가 없어 화면으로 보지 못했다. 구조 데이터로만 적는다.

## 부록: 측정 메모 (Capture Notes)

- 방법: cdp, Chrome 155, desktop 1440×900 · mobile 390×844 @2, 2026-10-15T01:29:39Z. 경고 RAW_TRIMMED(histograms, vars).
  로케일 ko-KR 로 찍혀 한국어 쿠키 창과 언어 전환 안내 띠가 보였다. 페이지 본문은 en-us.
- 오버레이: 1차 캡처에서 쿠키 동의 창(Transcend)이 숨겨지지 않았다(overlaysHidden 비어 있음). `--hide` 로 desktop 만 다시 찍어
  `div#transcend-consent-manager` 를 숨겼고, summary 의 측정값은 1차와 같았다. 재캡처 폴더는 이 레퍼런스 폴더에 남기지 않았다.
- 슬라이스: 페이지 높이 4731px 인데 슬라이스가 1장(slicesY 859)뿐이라 overview.jpg 가 첫 화면만 담는다. desktop.png 는 첫 화면이
  아니라 y≈860 부근이 찍혔다(두 캡처 모두). 섹션 6–8 은 화면으로 확인하지 못했고 구조 데이터만 썼다.
- 엔진 정정(tokens.json 은 그대로 둠):
  - role h1(42px)은 cta-band 제목이다. 히어로 h1 은 `structure.sections[1].heading.size` 96px 에서 가져왔다
  - 섹션 1 nav(0.95, h44, #F6F5F4) → announcement-bar. 실제 내비와 logo-cloud 는 엔진이 분리하지 않았다
  - 섹션 3 media-text(0.63) → bento-grid, 섹션 4 logo-cloud(0.8) → testimonials(엔진 alt, 화면 미확인)
  - 모바일에서 히어로 대응 섹션을 찾지 못했고 mobile.png 첫 화면에도 히어로가 없다. 모바일 히어로 값은 적지 않았다
  - summary 의 link #FFFFFF·link/bg 1:1 은 링크 색 오인으로 보고 옮기지 않았다
- 신뢰도가 낮은 영역: 히어로 h1 의 굵기·행간·자간(role 표에 없어 화면 추정), Lyon Text 본문의 위치, 등장 연출, 기타 유채색의 위치.
- 근거 비율: 값이 있는 토큰 행 60개 = 측정 46 · 파생 7 · 추정 7 → 77 / 12 / 11%. 측정 실패 2행(포커스 링, hover)은 뺐다.
- 페이지 텍스트에서 지시처럼 보이는 문자열은 없었다.
