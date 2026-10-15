---
schema: dd.profile/1
slug: stripe-com
name: Stripe
input_type: url
source: https://stripe.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: files
recapture: null
styles: {primary: corporate-clean, secondary: null, treatments: [aurora-gradient]}
structure: "nav → hero-media → logo-cloud → bento-grid → media-text → stats(4) → media-text → carousel → media-text → media-text → stats(2) → feature-grid(3) → carousel → media-text → cta-band → footer"
evidence: {measured: 70, declared: 3, derived: 17, estimated: 10, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
---

# Stripe — Reference Profile

## 1. 본질 (Essence)

결제 인프라를 고르는 개발자와 기업을 위해 300 굵기의 투톤 헤드라인, 컨테이너 가장자리의 1px 안내선, 히어로 한 곳에서 화면 밖으로 흘러나가는 브랜드 리본 그라데이션 하나로 '정밀하게 설계됐지만 차갑지 않은 금융 인프라'라는 인상을 만든다.

## 2. 스타일 분류 (Classification)

- primary: `corporate-clean` — 브랜드 1색 #533AFD 를 버튼·링크·아이콘에 쓰고(측정), 차가운 회청 중립(hue 248–258)에 1px 테두리를 많이 쓴다(측정). 섹션마다 레이아웃이 다르다(bento·carousel·media-text·stats). 단 헤드라인 굵기 300 과 radius 4–6px 은 corporate-clean 범위(600–700, 6–12px) 밖이다
- secondary: 없음 — 보이는 1px 격자선(무브 4)은 swiss 에서 가져온 장치다. 하지만 h1 48px 로 크기 대비가 약하고(swiss 72–160px) 그라데이션을 쓰므로 secondary 로 두지 않는다
- treatments: `aurora-gradient` — 히어로 리본 그라데이션 하나, 그라데이션 13개·면적 13%(측정). 카탈로그 정의(흐린 블롭)와 다른 점: 가장자리가 선명한 대각선 띠이고, 가는 결 무늬가 있으며, 흐림(blur) 대신 화면 밖으로 넘친다
- 축: 밀도 3 · 온도 2 · 채도 3 · 대비 3 · 둥긂 2 · 장식 3

## 3. 무드 키워드 (Mood)

설계도 같은 정밀함 (blueprint precision) · 가는 획의 권위 (light-weight authority) · 회청색으로 차분한 (slate-calm) ·
빛 한 줄기 (a single luminous ribbon) · 증거 중심 (proof-first) · 엔지니어링된 신뢰 (engineered trust)

## 4. 시그니처 무브 (Signature Moves)

### 1. 브랜드 리본 그라데이션 한 줄기를 히어로에서 화면 밖으로 흘려보낸다
- 관찰: desktop.png 오른쪽 위에서 아래로 내려오는 띠. h1 일부 위를 지나가고 화면 오른쪽 끝에서 잘린다. mobile.png 에선 화면 위쪽을 대각선으로 가로지른다. 같은 팔레트가 bento 카드 일러스트, platform 섹션의 제품 화면 배경, 카드 발급 이미지에서 파스텔로 반복된다(slices 02·06)
- 수치: 그라데이션 13개·면적 13%, canvas 13개(측정) · 강조 그라데이션 변수 #BDB4FF → #643AFD → #533AFD(선언) · 리본 색 주황→분홍→보라→하늘 4색, 첫 화면 높이의 약 85%(추정)
- 기본값과의 차이: 흔한 히어로는 흐린 보라→파랑 블롭을 텍스트 뒤 가운데에 깐다(CO-1, CO-4). 이 사이트는 경계가 선명한 띠 하나를 대각선으로 넘치게 두고, 그라데이션은 이 히어로에만 있다
- 따라 하는 법: 히어로에 `overflow: clip`, 리본은 SVG path 를 `linearGradient`(브랜드 hue 3–4개)로 채워 `position: absolute; right: -10vw; top: 0; height: 110%` 로 둔다. 다른 섹션에서는 같은 팔레트를 채도를 낮춰 일러스트 안에만 쓴다
- 깨지는 경우: 브랜드 색이 보라·파랑 두 개뿐이면 CO-1 이 된다. hue 폭 90° 이상인 브랜드 색 3–4개가 있어야 한다. 리본이 h1 을 덮는 구간은 글자 대비가 4.5:1 아래로 떨어질 수 있으니 확인한다

### 2. 헤드라인을 두 명도로 이어 쓴다
- 관찰: 히어로 h1, bento 머리 h2, enterprise·startups 머리 h2, 다크 섹션 h2, feature-grid 3열의 리드 문장, … 제목. 6곳 이상에서 반복된다. 첫 문장은 진하고, 같은 크기·같은 굵기로 이어지는 문장은 회청색이다
- 수치: 앞 #061B31(측정 색, bg 대비 17.37:1) / 뒤 #50617A(측정 색, 6.3:1). 다크 면에서는 #FFFFFF / #839BC8 계열. 색과 문장 위치의 대응은 스크린샷으로 정했다(추정)
- 기본값과의 차이: 흔한 SaaS 는 큰 h2 아래에 작은 리드 문단을 둬 크기로 위계를 만들거나 한 단어에 그라데이션을 준다(TY-1, TY-3). 여기서는 크기를 바꾸지 않고 명도만 바꾼다
- 따라 하는 법: `<h2><span>앞 문장.</span> <span class="rest">뒤 문장.</span></h2>`, `.rest { color: var(--text-muted); }`. 굵기·크기는 그대로 둔다
- 깨지는 경우: 뒷문장이 길어지면 h2 가 4줄을 넘어 무거워진다. 두 문장을 합쳐 라틴 25단어, 한글 60자 안쪽으로 줄인다. muted 대비가 4.5:1 아래면 CO-7

### 3. 헤드라인과 본문을 모두 300 굵기로 가볍게 쓴다
- 관찰: 모든 h1–h3, 본문, 내비. 버튼 라벨만 400. 한 가변 서체가 글자의 98% 를 차지한다
- 수치: h1 48px / 1.15 / -0.02em · h2 32px / 1.1 / -0.02em · h3 26px / 1.12 / -0.01em · 본문 16px / 1.4, 모두 300(측정) · 버튼 400(측정)
- 기본값과의 차이: 흔한 SaaS 헤드라인은 600–700, 본문은 400 이다. 여기서는 굵기 대비를 버리고 명도(무브 2)와 크기로 위계를 만든다. 무게감 대신 정밀한 인상이 남는다
- 따라 하는 법: `h1, h2, h3 { font-weight: 300; letter-spacing: -0.02em; text-wrap: balance; } body { font-weight: 300; } button { font-weight: 400; }`
- 깨지는 경우: 대체 서체의 300 이 원래 서체보다 가늘면 흐려 보인다. 한글 본문(Pretendard)과 짙은 배경 위 본문은 400 으로 올린다. 12px 아래 글자도 400

### 4. 컨테이너 가장자리에 1px 안내선을 페이지 끝까지 긋는다
- 관찰: desktop.png 의 x≈88·x≈1352 세로선이 거의 모든 섹션을 관통한다. 섹션 경계·logo-cloud 위아래·stats 열 위에서 가로 1px 선과 만난다. 다크 섹션에서도 같은 자리에 남색 선으로 이어진다(slices 07·08). 모바일에는 세로선이 없다
- 수치: 1px #E5EDF5(측정, 테두리 둘레 비중 68%) · 컨테이너 1266px(측정) → 안내선 x = (1440 − 1266) / 2 ≈ 87px(파생) · 다크 면 선 색은 #0D1738 보다 한 단계 밝은 남색(추정)
- 기본값과의 차이: 흔한 랜딩은 섹션을 여백이나 배경 교차로만 나눈다. 격자를 직접 그리는 건 swiss 계열 장치이고, 여기서는 그 선이 아주 옅다(bg 대비 약 1.2:1)
- 따라 하는 법: `.page { max-width: 1266px; margin-inline: auto; border-inline: 1px solid var(--border); } .page > section + section { border-top: 1px solid var(--border); } @media (max-width: 768px) { .page { border-inline: 0; } }`
- 깨지는 경우: 선이 콘텐츠 시작선과 맞지 않으면 그냥 장식선이 된다(LA-4). 안쪽 콘텐츠는 안내선에서 16px(거터) 떨어뜨려 시작한다

### 5. 모서리를 4–6px 로 거의 각지게 묶고 인디고 하나는 행동에만 쓴다
- 관찰: 모든 버튼, 카드, 이미지, 캐러셀 화살표. 주 버튼·텍스트 링크·작은 선 아이콘만 인디고다. 면 배경에는 인디고를 깔지 않는다
- 수치: radius 버튼 4 · 카드·이미지 6 · 배지 4, pill 4%(측정) · accent #533AFD, accent-fg 대비 6.19:1(측정) · 보조 테두리 #B9B9F9 · 옅은 인디고 #E8E9FF / #D6D9FC(측정)
- 기본값과의 차이: 흔한 값은 모든 곳 8px 이거나 pill 버튼이다. 4/6 두 단계는 거의 각진 쪽이고, 둥근 리본 일러스트와 대비를 만든다
- 따라 하는 법: `--radius-control: 4px; --radius-surface: 6px; --accent: #533AFD; --accent-quiet: #E8E9FF;` 주 버튼 `bg: var(--accent)`, 보조 버튼은 `border: 1px solid #B9B9F9; color: var(--accent);`
- 깨지는 경우: 인디고를 섹션 배경이나 아이콘 타일로 넓히면 무브 1 의 리본과 색이 다툰다. 강조는 행동 요소에만 둔다

## 5. 토큰 (Tokens)

### 5.1 타이포그래피 (Typography)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 (본문·디스플레이) | sohne-var (Söhne 가변, 상용) · 스택 `sohne-var, SF Pro Display, sans-serif` | 측정 | 글자 98%, 모든 역할 |
| 패밀리 (mono) | SourceCodePro (OFL) | 측정 | 글자 2%, 다크 섹션 코드 목업 |
| h1 | 48 / 34px · 300 · 1.15 · -0.02em | 측정 | 히어로 투톤 h1 (무브 2·3) |
| h2 | 32 / 22px · 300 · 1.1 · -0.02em | 측정 | 섹션 머리, 투톤 |
| h3 | 26 / 20px · 300 · 1.12 · -0.01em | 측정 | bento 카드 제목 |
| body | 16px · 300 · 1.4 · 0em | 측정 | 본문, 회청 #50617A |
| small | 10px · 300 · normal | 측정 | 각주·배지 표본. 화면에서 보이는 작은 글자는 12–14px(추정) |
| button | 16px · 400 · 1 · 0em | 측정 | 굵기 400 은 버튼에만. 내비 CTA 샘플은 14px |
| nav | 18 / 16px · 300 · 1.4 | 측정 | 화면에서는 약 14px 처럼 보인다. 측정 표본에 다른 요소가 섞였을 수 있다 |
| 스케일 비율 | 1.25 (major third), fit 0.77 · 단계 9 10 11 12 14 16 18 22 26 32 48 | 파생 | fit 이 낮아 비율보다는 단계 목록을 따른다 |
| clamp h1 | `clamp(2.125rem, 1.8rem + 1.333vw, 3rem)` | 파생 | 390→1440px 선형 |
| clamp h2 · h3 | `clamp(1.375rem, 1.143rem + 0.952vw, 2rem)` · `clamp(1.25rem, 1.111rem + 0.571vw, 1.625rem)` | 파생 | |
| 줄바꿈 | text-wrap: balance 사용, 한글 0% | 측정 | |
| eyebrow | 없음. h1 위에는 문장형 라벨 + 실시간 숫자 한 줄 | 추정 | 대문자 라벨을 쓰지 않는다 |

### 5.2 색 (Color)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg | #FFFFFF · 면적 80% | 측정 | |
| surface | #F8FAFD · 6% | 측정 | stats 띠, Book 카드 오른쪽, 푸터 |
| surface-line | #E5EDF5 · 6% (`--hds-canary-ui-mini-stroke`) | 측정 | 옅은 면이면서 테두리 색 |
| text-strong (heading) | #061B31 | 측정 | 엔진 역할 이름은 link 다. 화면에서는 헤드라인 앞 문장 색이다(무브 2) |
| text | #50617A · 글자 38% | 측정 | 본문, 투톤 뒷문장 |
| text-muted | #64748D · 10% | 측정 | 캡션, 흐린 통계 숫자 |
| border | #E5EDF5 · 둘레 68% | 측정 | 안내선·카드·띠 (무브 4) |
| accent | #533AFD (`--accent-gradient-color-stop-3`) | 측정 | 주 버튼·링크·아이콘 (무브 5) |
| accent-fg | #FFFFFF | 측정 | |
| accent-quiet | #E8E9FF 버튼 면 · #D6D9FC (`--hds-color-accent-border-quiet`) · #B9B9F9 보조 버튼 테두리 | 측정 | 캐러셀 화살표, outline 버튼 |
| focus | #635BFF (`--hds-canary-color-border-focus`) | 선언 | 포커스 상태 모양은 캡처하지 않음 |
| bg-inverse | #0D1738 · 보조 #122054 | 측정 | 개발자 섹션 면(약 2,340px) |
| inverse text-muted | #839BC8 · #A3B5D6 | 측정 | 다크 면 투톤의 뒷문장, 링크. 대응은 스크린샷으로 정함 |
| 강조 그라데이션 | #BDB4FF → #643AFD → #533AFD (`--accent-gradient-color-stop-1…3`) | 선언 | |
| 리본 그라데이션 | 주황 → 분홍 → 보라 → 하늘 | 추정 | 히어로 한 곳 (무브 1). 정확한 값은 canvas 라 측정하지 못했다 |
| 그라데이션 사용 | 13개 · 면적 13% · 글자 그라데이션 0 | 측정 | |
| 대비 heading/bg · text/bg | 17.37:1 (AAA) · 6.3:1 (AA) | 파생 | |
| 대비 accent-fg/accent · text/surface | 6.19:1 (AA) · 5.33:1 (AA) | 파생 | |
| 중립 온도 | cool (hue 248–258, chroma 0.005–0.05) | 파생 | 순수 회색 대신 푸른 회청 |

### 5.3 간격·레이아웃 (Space & Layout)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 기준 단위 | 4px (adherence 0.73) | 파생 | |
| 간격 단계 | 2 4 6 8 10 12 14 16 20 24 32 64 | 파생 | |
| 섹션 상하 여백 | 93 / 55px (D/M, 중앙값) | 측정 | 기본값 범위. 구획은 여백보다 선(무브 4)이 맡는다 |
| 컨테이너 | max-width 1266px | 측정 | 안내선 위치 (무브 4) |
| 거터 | 16px | 측정 | 안내선 안쪽 콘텐츠 시작 |
| 안내선 위치 | x ≈ 87px / 1353px @1440 | 파생 | 컨테이너 양 끝 |
| 그리드 | bento 2+1 / 3열, stats 4열(모바일 2열), feature 3열, 머리 2열 · gap 16 / 10px (D/M) | 측정 | 열 조합은 엔진 값 2·36·4·3 을 스크린샷과 맞춘 것 |
| 밀도 | airy, 첫 화면 빈 칸 62% | 파생 | 아래로 갈수록 카드·텍스트가 촘촘해진다 |
| 페이지 길이 | D 14,803px / M 20,443px | 측정 | 17 화면 |

### 5.4 형태·깊이 (Shape & Depth)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius 버튼 · 배지 | 4px | 측정 | 무브 5 |
| radius 카드 · 이미지 | 6px | 측정 | |
| radius 성격 | soft, 단계 4 / 5 / 6, pill 4% | 측정 | |
| 테두리 | 1px, 사용 많음 | 측정 | 안내선·카드·로고 띠 |
| 그림자 sm | `rgba(23,23,23,.06) 0 3px 6px` | 측정 | 작은 컨트롤 |
| 그림자 md | `rgba(23,23,23,.08) 0 15px 35px` | 측정 | 떠 있는 카드 |
| 그림자 lg | `rgba(0,0,0,.1) 0 20px 40px -20px` | 측정 | 음수 spread 로 아래쪽에만 깔린다 |
| 그림자 xl | `rgba(3,3,39,.25) 0 14px 21px -14px, rgba(0,0,0,.1) 0 8px 17px -8px` | 측정 | 남색 기운 2레이어, 제품 목업 |
| 그림자 성격 | subtle, 요소 17개뿐. 테두리가 주, 그림자는 목업·떠 있는 카드에만 | 파생 | |
| 포커스 링 | 측정 실패: 포커스 상태는 캡처하지 않는다 | — | 색 변수만 있음(5.2 focus) |

### 5.5 모션 (Motion)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 단계 | fast 300 / base 300 / slow 800ms | 측정 | 전환 455개 |
| easing | `cubic-bezier(0.25, 1, 0.5, 1)` | 측정 | ease-out-quart 계열, 끝이 길게 감속 |
| 애니메이션 | CSS 애니메이션 3개, 라이브러리 없음 | 측정 | |
| 히어로 연출 | 리본·입자 일러스트를 canvas 로 그리고 움직인다. h1 위 숫자가 실시간으로 바뀐다 | 추정 | canvas 13개(측정). 두 뷰포트 캡처의 숫자가 서로 달랐다 |
| 로고 띠 | 오른쪽 끝이 잘린 마키처럼 보인다 | 추정 | |
| reduced-motion | 측정 실패: 교차 출처 CSS 라 확인 불가 | — | |

### 5.6 이미지·아이콘 (Imagery & Icons)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 이미지 비중 | 29% · 배경 이미지 3% · SVG 4% | 측정 | |
| 종류 | 그라데이션·입자 일러스트, 실제 제품 UI 조각, 고객사 브랜드 이미지. 실사 사진은 2–3곳뿐 | 추정 | 행사 무대, 항공 도로 사진 |
| canvas | 13개 | 측정 | 그라데이션·파티클 렌더 |
| 아이콘 | 138개 · 작은 인디고 선 아이콘, 40px 정사각 1px 테두리 상자 안에 약 20px | 측정 (개수) / 추정 (모양) | feature-grid, 카드 확장 버튼 |
| 다이어그램 | 점 격자 위 인디고 칩 + 점선 연결 | 추정 | 다크 섹션 |
| 영상 | 0 | 측정 | |
| blur | backdrop-filter 3곳 | 측정 | 히어로 보조 버튼 등 반투명 면(#FFFFFFA6) |

## 6. 컴포넌트 (Components)

- 주 버튼: 높이 48 · padding-x 24 · radius 4 · bg #533AFD · 글자 #FFFFFF 14–16px/400 · 그림자 없음 (측정). 라벨 끝에 작은 ›(추정). hover 는 측정 실패: 정적 캡처
- 보조 버튼 (히어로): 높이 48 · padding-x 24 · radius 4 · bg 흰색 65%(#FFFFFFA6) · 1px #B9B9F9 · 글자 #533AFD 16/400 (측정). 리본 위에서도 읽히게 반투명 흰 면을 쓴다
- outline 버튼: 높이 48 · 1px #B9B9F9 · 배경 없음 · 글자 #533AFD (측정)
- 흰 버튼 (사진 위): 높이 48 · bg #FFFFFF · 글자 #533AFD (측정)
- 아이콘 버튼 (캐러셀 화살표): 높이 40 · radius 4 · bg #E8E9FF (측정), 비활성은 흰 바탕 + 1px 테두리(추정)
- 텍스트 링크: #533AFD 16px + › , 밑줄 없음 (추정)
- 내비: 높이 76 / 66 (D/M) · static · 투명 배경 · 로고 + 드롭다운 링크 4 + 가격, 오른쪽에 로그인 + 주 CTA · 모바일은 햄버거(56px 흰 사각) (측정 + 화면)
- 카드 (bento): radius 6 · 1px #E5EDF5 · 흰 바탕, 위쪽에 h3 + 오른쪽 위 확장 아이콘, 아래 2/3 는 일러스트·제품 UI (측정 radius / 추정 구성)
- 카드 (스토리 캐러셀): 약 332×448(3:4) 이미지 radius 6, 아래 16px 캡션 2줄 (추정)
- 배지: 높이 9 · 8px/300 · #64748D (측정) — 각주 수준. 화면에서 눈에 띄는 배지는 없다
- 입력: 측정 실패: 홈 화면에 입력 필드가 없다

## 7. 페이지 구조 (Page Anatomy)

| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 + 링크 5 왼쪽, 로그인 + 주 CTA 오른쪽, 76px static | bg (투명) | |
| 2 | hero-media | 왼쪽 정렬 h1 4줄 투톤 + 실시간 지표 한 줄 + 버튼 2, 오른쪽 리본이 화면 밖으로 넘침 | bg + 리본 | 무브 1·2 |
| 3 | logo-cloud | 로고 8개 한 줄, 72px 띠, 위아래 1px | bg | 엔진이 hero 에 묶음 → 분리 |
| 4 | bento-grid | 투톤 h2 아래, 크기가 다른 타일(위 2+1, 아래 3열, 넓은 타일 1), 타일마다 제품 UI·일러스트 | bg | 엔진 faq(6) → bento-grid: 아코디언이 아니라 확장 카드 타일 |
| 5 | media-text | 컨테이너 폭 사진 배너 radius 6, 왼쪽 위에 흰 h2 + 흰 버튼 | 사진 | 엔진 unknown(0.2) → media-text 오버레이 변형 |
| 6 | stats | 가운데 h2 2줄 + 4열 숫자 48px, 첫 숫자만 진하고 나머지 회청 | surface | 엔진 bg #ffffff → 화면은 옅은 회청 그라데이션 |
| 7 | media-text | 2열 머리(h2 + 버튼 / 회청 본문) + 고객 사례 한 줄 + 가로로 넓은 사진 | bg | 엔진 faq(4) 를 4개로 나눔(7–10). 엔진 미분리 |
| 8 | carousel | 2열 머리 + 3:4 고객 스토리 카드가 오른쪽으로 넘침, 화살표 2 | bg | |
| 9 | media-text | 그라데이션 위 제품 화면 1장(폭 100%) + 3열 아이콘·리드·링크 | bg | 아래에 인용 아바타가 이어진다 |
| 10 | media-text | 투톤 h2 + 버튼 2, 점 격자 위 노드 다이어그램 | bg-inverse | 엔진 stats(2)(0.85) 를 3개로 나눔(10–12) |
| 11 | stats | 투톤 문장 + 숫자 2개 | bg-inverse | 슬라이스 사이 구간이라 화면 확인 못 함. 엔진 값 유지 |
| 12 | feature-grid | 3열: 위 목업 카드(채팅·앱 아이콘 격자·코드 에디터), 아래 리드 + 링크 | bg-inverse | 아이콘 카드가 아니라 목업 카드 |
| 13 | carousel | 투톤 h2 + 너비가 다른 뉴스 카드, 화살표 2 | bg | 엔진 unknown(0.2) → carousel (모바일 엔진 gallery(8)) |
| 14 | media-text | 왼쪽 책 표지 면 + 오른쪽 surface 카드에 제목·본문·링크 칩 2 | bg | 13 과 엔진이 한 섹션으로 묶음 |
| 15 | cta-band | 2열: 짧은 제목 + 버튼 2 | surface | 엔진 text-block(0.6) → 옅은 면 CTA 변형 |
| 16 | footer | 링크 4–5열, 작은 글자, 지역 선택 | surface | 엔진 text-block(0.5) 은 푸터 윗부분으로 합침 |

리듬: 섹션 여백 93/55px. 흰 면이 대부분이고, 명도가 바뀌는 곳은 stats(surface) · 개발자 3섹션(bg-inverse, 약 2,340px) · cta-band 와 footer(surface) 세 군데다. 그사이 구획은 여백보다 1px 안내선이 맡는다.

```text
+--------------------------------------------------------------+
| nav                         links(5)    [sign in] [cta]      |
+--------------------------------------------------------------+
| hero-media   2-tone h1 + 2 buttons | ribbon bleeds right     |
| logo-cloud (8)                                  1px rules    |
| bento-grid   2+1 / 3 tiles, product UI + illustration        |
| media-text   photo banner, overlay h2 + button               |
+--------------------------------------------------------------+
| stats (4)    centered h2, 48px numbers         bg surface    |
+--------------------------------------------------------------+
| media-text   enterprise: 2-col head + wide photo             |
| carousel     startups: 3:4 story cards, bleeds right         |
| media-text   platforms: product shot + 3 cols                |
+--------------------------------------------------------------+
| media-text   dev head + node diagram           bg inverse    |
| stats (2)  /  feature-grid (3) mockup cards    bg inverse    |
+--------------------------------------------------------------+
| carousel (news)  /  media-text (book)                        |
+--------------------------------------------------------------+
| cta-band (2 col)  /  footer (4-5 cols)         bg surface    |
+--------------------------------------------------------------+
```

모바일: 리본은 화면 위쪽 대각선으로 옮겨 h1 뒤를 덮고, h1 은 첫 문장만 두 줄로 남는다. 버튼 2개는 전체 폭으로 쌓인다. 내비는 로고 + 햄버거. 세로 안내선은 사라지고 가로 띠 선만 남는다. stats 는 4열 → 2열, bento 와 feature-grid 는 1열이 된다. 섹션 여백은 93 → 55px. 페이지가 14,803 → 20,443px 로 길어진다.

## 8. 따라 할 때 Do / Don't

Do
- 히어로 한 곳에만 브랜드 hue 3–4개로 만든 선명한 리본을 두고 화면 밖으로 넘긴다 (무브 1)
- 섹션 머리는 같은 크기·같은 굵기로 '진한 앞 문장 + 회청 뒷문장'으로 쓴다 (무브 2)
- 헤드라인·본문은 300, 버튼만 400 으로 둔다. 한글 본문은 400 으로 올린다 (무브 3)
- 1266px 컨테이너 양 끝에 1px 안내선을 긋고, 콘텐츠는 그 안쪽 16px 에서 시작한다 (무브 4)
- radius 는 컨트롤 4 / 면 6 두 단계, 인디고는 버튼·링크·아이콘에만 쓴다 (무브 5)
- 중립은 순수 회색 대신 hue 250 안팎의 회청(#50617A, #64748D, #E5EDF5)으로 맞춘다

Don't
- 리본을 흐린 보라→파랑 블롭으로 바꾸거나 섹션마다 깔지 않는다 — 무브 1, CO-1, CO-4
- 투톤 뒷문장에 그라데이션이나 다른 강조색을 넣지 않는다 — 무브 2, TY-1, TY-3
- 헤드라인 굵기를 600–700 으로 올리지 않는다. 가벼움이 이 느낌의 절반이다 — 무브 3, TY-4
- 안내선과 맞지 않는 장식 hairline 을 섹션마다 추가하지 않는다 — 무브 4, LA-4
- radius 를 12–16px 로 키우고 모든 카드에 같은 그림자를 주지 않는다 — 무브 5, SH-1, SH-2, LA-1
- 한글 본문을 300 굵기 · 행간 1.4 그대로 옮기지 않는다 — 무브 3, KR-5

## 9. 폰트 대체 (Font Substitutes)

| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Söhne (sohne-var, 가변) | 상용 (Klim Type Foundry) | Inter, Geist | Pretendard | 그로테스크 계열. 300 굵기와 -0.02em 자간을 그대로 옮긴다. Inter 300 은 조금 넓어 보이니 display 만 -0.025em 까지 조인다. 한글 본문은 Pretendard 400, 행간 1.6 |
| SourceCodePro | OFL | Source Code Pro (그대로 사용 가능) | D2Coding 이나 Pretendard 폴백 | 코드 목업에만 쓴다. 데이터 라벨로 넓히지 않는다(TY-5) |

## 10. 베끼지 말 것 (Don't Copy)

- Stripe 로고·워드마크, '…' 같은 행사 로고, … 문장(紋章)
- 히어로 리본 그라데이션 렌더와 bento 카드의 파티클·카드 발급 일러스트 — 내 브랜드 hue 로 새로 만든다
- 고객사 로고 띠, 고객 스토리 이미지, 행사·항공 사진
- 대시보드·코드 에디터·다이어그램 목업 — 내 제품의 실제 화면으로 바꾼다
- 헤드라인·리드·버튼 카피, 실시간 지표 문구와 숫자
- Söhne 폰트 파일 (`@font-face` 주소가 보여도 내려받지 않는다)
- 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)

```text
corporate-clean + aurora-gradient 랜딩. 히어로 한 곳에만 브랜드 hue 3–4개로 만든 선명한 대각선 리본 그라데이션을 화면 오른쪽 밖으로 넘긴다.
섹션 머리는 같은 크기·같은 굵기로 '진한 앞 문장(#061B31) + 회청 뒷문장(#50617A)' 투톤으로 쓴다.
헤드라인·본문 굵기 300(h1 48px/1.15 -0.02em, h2 32px/1.1, 본문 16px), 버튼만 400. 한글 본문은 400·행간 1.6.
1266px 컨테이너 양 끝에 1px #E5EDF5 세로 안내선, 섹션 경계에 가로 1px. radius 버튼 4 / 카드 6, 인디고 #533AFD 는 버튼·링크·아이콘에만.
금지: 흐린 보라→파랑 블롭, 굵은 600–700 헤드라인, 그라데이션 텍스트, 12px 이상 radius, 모든 카드에 같은 그림자.
```

```text
Corporate-clean landing with one aurora treatment: a single crisp diagonal ribbon gradient (3–4 brand hues) in the hero only, bleeding off the right edge.
Two-tone section heads: same size and weight, lead sentence #061B31 then the rest in slate #50617A.
Weight 300 for headlines and body (h1 48px/1.15 at -0.02em, h2 32px/1.1, body 16px); 400 for buttons only.
1px #E5EDF5 guide lines on both edges of a 1266px container plus 1px rules between sections. Radius 4 (controls) / 6 (cards); indigo #533AFD only for buttons, links and icons.
No blurred purple-blue blobs, no 600–700 headlines, no gradient text, no 12px+ radius, no identical shadow on every card.
```

## 부록: 화면 관찰 (Visual Read)

- **첫 화면(desktop)**: 흰 바탕 왼쪽에 h1 이 4줄로 놓이고, 오른쪽 위에서 아래로 주황→분홍→보라→하늘 리본 그라데이션이 화면 바깥까지 넘친다. 이 리본은 텍스트 일부를 덮고 지나가며(h1 위로 겹침) 화면 높이의 약 85% 를 차지한다. 첫 화면에서 유일한 고채도 면이다.
- **h1 투톤**: 첫 문장은 거의 검정 남색, 이어지는 문장은 회청색으로 같은 크기·같은 굵기를 유지한다. 위계는 크기가 아니라 명도로만 만든다. 이 패턴이 h2(섹션 머리말)와 다크 섹션 제목, feature-grid 3열의 리드 문장에서도 반복된다(다크에서는 흰색 + 연한 하늘색).
- **h1 위 작은 라이브 지표**: 12–14px 한 줄(라벨 + 숫자)이 h1 위 약 60px 에 놓인다. 대문자 eyebrow 가 아니라 문장형 라벨이다. 데스크톱·모바일 캡처의 숫자가 서로 달라 실시간으로 바뀌는 값으로 보인다.
- **보이는 세로 안내선**: 컨테이너 양 끝(x≈88, x≈1352)에 1px 연회색 세로선이 페이지 거의 전체를 관통한다. 섹션 경계에서는 가로 1px 선과 만난다. 다크 섹션에서도 같은 위치에 남색 계열 선으로 이어진다.
- **로고 띠**: 히어로 아래 높이 약 72px 의 가로 띠, 위아래 1px 선. 로고 8개가 같은 간격, 오른쪽 끝이 잘려 흐르는 마키처럼 보인다.
- **기능 카드(bento)**: 위 줄은 크기가 다른 타일, 아래 줄은 3열. radius 약 6px, 1px 연한 테두리. 카드 윗부분에 제목(26px 가는 굵기), 오른쪽 위 작은 확장 아이콘 버튼, 아래 2/3 는 파스텔 그라데이션·입자 일러스트 또는 실제 제품 UI 조각이 채운다. 사진은 없다.
- **사진 배너**: 컨테이너 폭, radius 6, 행사 무대 사진 위 왼쪽 위에 흰 h2 와 흰 버튼.
- **통계 띠**: 옅은 회청 면, 가운데 정렬 h2 두 줄 아래 4열 숫자(약 48px, 가는 굵기). 첫 숫자만 진하고 나머지 3개는 회청색으로 흐리다. 열 위 경계선에 짧은 분홍→보라 그라데이션 선이 지나간다.
- **스토리 캐러셀**: 왼쪽 h2 + 보라 버튼, 오른쪽 회청색 본문의 2열 머리. 아래 세로형(약 3:4) 카드가 오른쪽으로 잘려 넘친다. 고객사 이미지가 꽉 차고 왼쪽 아래에 흰 워드마크가 있다. 화살표 버튼은 40px 정사각, 연보라 바탕.
- **platform 섹션**: 주황·분홍 리본 그라데이션 위에 브라우저 프레임 제품 화면 하나가 컨테이너 폭으로 놓이고, 아래 3열은 40px 테두리 상자 속 인디고 선 아이콘 + 굵은 리드 문장 + 회청 설명 + 인디고 링크다.
- **다크 섹션**: #0D1738 계열 짙은 남색 면이 약 2,300px 이어진다. 개발자 대상이다. 점 격자 배경 위에 노드 다이어그램(보라 칩, 점선 연결), 코드 에디터 목업(SourceCodePro), 통합 앱 아이콘 격자. 링크는 연보라.
- **…**: 왼쪽은 갈색 면 위에 책 표지(그림자), 오른쪽은 옅은 surface 카드에 제목 + 회청 저자명 + 본문 + 작은 링크 칩 2개. 오른쪽 위에 세로 타원 문장(紋章).
- **사진**: 실사 사진은 행사 무대와 항공 도로 사진 정도로 적다. 대부분은 그라데이션 일러스트·제품 UI·고객 브랜드 이미지다.
- **푸터**: #F8FAFD 아주 옅은 회청 바탕, 링크 목록 4–5열, 작은 글씨.
- **모바일**: 리본 그라데이션이 화면 위쪽 대각선으로 옮겨가 h1 뒤를 덮는다. h1 은 첫 문장만 두 줄로 남는다(긴 투톤 문장이 짧아짐). 버튼 2개가 전체 폭으로 쌓이고(높이 약 44px), 내비는 로고 + 흰 사각 햄버거 버튼이다.
- **리듬**: 흰 면 → 옅은 회청 면(stats) → 흰 면 → 짙은 남색 면 → 흰 면 → 옅은 회청 CTA·푸터. 섹션은 주로 1px 선과 배경 단계로 나뉜다.

## 부록: 측정 메모 (Capture Notes)

- 방법: cdp, Chrome 155, desktop 1440×900 · mobile 390×844 @2. 2026-10-15T01:24:38Z, 로그아웃·첫 방문·en-US.
- 신뢰도: overall high (타이포 0.95 · 색 0.9 · 간격 0.82 · 구조 0.65).
- 경고: NETWORK_BUSY ×2(두 뷰포트 모두 네트워크가 8초 안에 잠잠해지지 않음. canvas 렌더와 실시간 숫자 때문으로 보인다), SLICES_SAMPLED(17 화면 중 슬라이스 10장을 고르게 뽑음. 섹션 11 stats(2) 구간은 슬라이스 사이라 화면으로 확인하지 못했다), RAW_TRIMMED(histograms·vars 잘림).
- 숨긴 오버레이: consent 2개(desktop·mobile, 클릭 없이 display:none).
- 엔진 정정(tokens.json 은 그대로 둠): faq(6) → bento-grid · unknown(0.2) → media-text · faq(4) → media-text + carousel + media-text · stats(2) → media-text + stats + feature-grid · unknown(0.2) → carousel + media-text · text-block(0.6) → cta-band · text-block(0.5) → footer 에 합침 · hero-media 에서 logo-cloud 분리.
- 색 역할 정정: 엔진의 `link` #061B31 은 화면에서 헤드라인 앞 문장 색이다. 프로필에선 text-strong 으로 적었다. stats 띠의 bg 를 엔진은 #ffffff 로 잡았지만 화면은 옅은 회청 그라데이션이다.
- 신뢰도가 낮은 영역: 리본 그라데이션 색(canvas 라 계산값 없음 → 추정), 내비 글자 크기(측정 18px, 화면 약 14px), small 10px(각주 표본 위주), hover·focus·스크롤 연출(정적 캡처).
- 근거 비율: 5장 표에서 값이 있는 행 63개 = 측정 44 · 선언 2 · 파생 11 · 추정 6 → 70 / 3 / 17 / 10%(반올림, 합 100). 측정 실패 2행(포커스 링, reduced-motion)은 뺐다. 아이콘 행(측정/추정 혼합)은 측정으로 셌다.
- 페이지 텍스트(제목·버튼 라벨·title)에서 지시처럼 보이는 문자열은 없었다.
