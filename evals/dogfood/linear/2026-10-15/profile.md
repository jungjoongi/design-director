---
schema: dd.profile/1
slug: linear-app
name: Linear
input_type: url
source: https://linear.app/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: dark
shots: files
recapture: null
styles: {primary: dark-tech, secondary: minimal, treatments: []}
structure: "nav → hero-product → logo-cloud(7) → text-block → feature-grid(3) → media-text(4) → content-list(4) → testimonials(2) → cta-band → footer"
evidence: {measured: 70, declared: 5, derived: 15, estimated: 10, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
---

# Linear — Reference Profile

## 1. 본질 (Essence)

제품을 만드는 팀을 위해, 화면 폭을 채운 실제 제품 UI와 명도 3단계 면 · 1px 반투명 hairline · 회색 4단계 글자로 '조용하고 정밀한 엔지니어링 도구' 느낌을 만든다. 브랜드색은 쓰지 않는다.

## 2. 스타일 분류 (Classification)

- primary: `dark-tech` — bg #08090A(oklch L 0.14, 측정), 면 #0F1011 / #161718 로 명도 +3%씩(측정), 경계 1px 흰 8%(#FFFFFF14, 테두리 둘레의 75%, 측정), display 굵기 510·자간 -0.022em(측정). 실제 제품 UI 가 이미지 대신 쓰인다
- secondary: `minimal` — 첫 화면 빈 칸 69%(파생), 마케팅 UI 에 강조색 0개(선언된 `--color-accent` #7170FF 가 화면에서 측정되지 않음), 히어로 본문에 버튼 0개. 단 본문 15px·컨테이너 1310px 은 minimal 범위(16–18px · 960–1200px) 밖
- treatments: 없음 — 히어로 아래 빛은 유채색 블롭이 아니라 중립 회색 그라데이션 한 곳(추정), 글래스는 내비 blur 1곳뿐(측정 backdrop blur 2). 후기 카드의 파스텔 그라데이션은 카드 면 하나라 aurora-gradient 로 보지 않는다
- 축: 밀도 2 · 온도 1 · 채도 2 · 대비 4 · 둥긂 2 · 장식 2

## 3. 무드 키워드 (Mood)

정밀한 도구 (precision instrument) · 엔지니어링 도면 같은 (blueprint-like) · 어둠 속 절제 (restrained in the dark) · 제품이 증거 (product-as-proof) · 회색으로 말하는 위계 (grayscale hierarchy) · 소음 없는 속도감 (quiet velocity)

## 4. 시그니처 무브 (Signature Moves)

### 1. 실제 제품 UI 를 컨테이너 폭 전체로 깔고 아래에서 회색 빛을 받친다
- 관찰: hero-product 의 h1 아래(desktop.png, slices/desktop-02.jpg). 사이드바 + 이슈 상세 + 에이전트 패널이 이미지가 아니라 HTML 로 그려진 제품 화면이다. 프레임 아래로 중립 회색 그라데이션 띠가 깔려 무대 조명처럼 보인다. 기능 섹션 4개도 같은 방식으로 제품 UI 조각을 넓게 깐다(×5 반복)
- 수치: 히어로 media share 0.84(측정), 프레임 폭 ≈ 컨테이너 1310px(측정) · radius 12px(측정, image), 빛 띠 높이 약 48px · 회색 약 #5A5E64 → bg(추정). 모바일은 축소하지 않고 오른쪽이 잘린다(추정, mobile.png)
- 기본값과의 차이: 흔한 SaaS 히어로는 가운데 정렬 + 기울인 목업 이미지 + 보라 glow. 여기는 왼쪽 정렬 h1 아래 1x 실제 UI, 빛은 무채색
- 따라 하는 법: `.hero-shot{max-width:1310px;margin-inline:auto;border:1px solid rgb(255 255 255/.08);border-radius:12px;background:#0F1011}` + 부모 `::after{inset:auto 12px -48px;height:96px;background:radial-gradient(60% 100% at 50% 0,rgb(255 255 255/.28),transparent);filter:blur(24px)}`. 모바일은 `min-width:720px; overflow-x:clip` 으로 오른쪽을 자른다
- 깨지는 경우: 실제 제품 화면이 없으면 성립하지 않는다 → hero-type 으로 바꾸고 무브 2 를 키운다. 화면을 PNG 로 넣으면 해상도·다크 톤이 어긋나니 가능하면 실제 컴포넌트로 그린다

### 2. 헤드라인을 510 굵기·행간 1.0·자간 -0.022em 으로 조이고, 위계는 명도로 나눈다
- 관찰: 히어로 h1, 모든 섹션 h2(×7). text-block 의 h2 는 첫 문장만 거의 흰색이고 이어지는 문장은 같은 48px 에서 회색으로 바뀐다(slices/desktop-02.jpg)
- 수치: h1 64/38px · 510 · 1.0 · -0.022em(측정), h2 48/24px · 510 · 1.0 · -0.022em(측정), 본문 15px 과 4.3:1(파생). 두 톤 = #F7F8F8 → #8A8F98(추정, 값은 선언 `--color-fg-primary`·`--color-fg-tertiary`)
- 기본값과의 차이: 흔한 값 48px / 1.2 / 0em / 700. 굵기를 700 대신 510 으로 낮추고 행간을 1.0 까지 붙여 덩어리로 읽힌다. 강조를 굵기·색이 아니라 명도 차로 낸다
- 따라 하는 법: `h1{font:510 clamp(2.375rem,1.771rem + 2.476vw,4rem)/1 "Inter Variable",sans-serif;letter-spacing:-.022em;text-wrap:balance}` · `h2 .rest{color:var(--fg-tertiary)}`
- 깨지는 경우: 한글은 행간 1.0 이면 두 줄째 받침과 초성이 부딪힌다 → 한글 헤드라인 행간 1.15–1.2, 자간 -0.02em. 가변 폰트가 아니면 510 이 500 으로 반올림돼 차이가 없다

### 3. 브랜드색을 빼고 회색 4단계 글자와 밝은 회색 pill 로만 움직인다
- 관찰: 페이지 전체. 주 CTA(내비 …, cta-band …)는 브랜드색이 아니라 밝은 회색 pill. 유채색은 제품 UI 안 상태 아이콘(초록·노랑)과 후기 카드뿐
- 수치: 글자 #F7F8F8(선언) / #D0D6E0(측정) / #8A8F98 36%(측정) / #62666D 11%(측정). 주 버튼 bg #E5E5E6 · 글자 #08090A · 높이 44 · radius pill(측정). 선언된 `--color-accent` #7170FF 와 `--color-brand-bg` #5E6AD2 는 화면에서 0%(측정되지 않음)
- 기본값과의 차이: 흔한 SaaS 는 브랜드 보라·파랑을 CTA·링크·아이콘·배지에 모두 칠해 면적 5–10%. 여기는 마케팅 UI 강조 면적 0
- 따라 하는 법: `--fg-1:#F7F8F8; --fg-2:#D0D6E0; --fg-3:#8A8F98; --fg-4:#62666D; --btn-primary-bg:#E5E5E6;` 주 버튼은 `bg:var(--btn-primary-bg); color:var(--bg); border-radius:9999px`. 강조색 토큰은 제품 상태(완료·진행) 에만 노출
- 깨지는 경우: 회색만 쓰면 CTA 를 못 찾는다 → 주 CTA 는 페이지에서 가장 밝은 면(#E5E5E6, 대비 15.8:1)으로 하나만 둔다. #62666D 를 본문에 쓰면 3.45:1 로 AA 미달(CO-7)

### 4. 면을 그림자 대신 1px 흰 8% hairline 과 명도 +3% 단계로 나눈다
- 관찰: 내비 하단선, 제품 프레임·카드 테두리, 기능 3열 사이 세로선, 섹션 사이 화면 끝까지 닿는 가로선(slices/desktop-03.jpg)
- 수치: border #FFFFFF14(합성 #1B1C1D), 1px, 테두리 둘레의 75%(측정) · bg #08090A → surface #0F1011 → #161718(측정, oklch L 0.14 → 0.17 → 0.20). 그림자는 `0 2px 32px rgb(0 0 0/.25)` 한 단계뿐(측정)
- 기본값과의 차이: 흔한 값은 `shadow-md` rgba(0,0,0,.1) 카드 반복. 여기는 경계가 깊이를 대신하고, 그림자는 어두운 바탕이라 거의 보이지 않는다
- 따라 하는 법: `--line:rgb(255 255 255/.08); --bg-0:#08090A; --bg-1:#0F1011; --bg-2:#161718;` 카드 `background:var(--bg-1); border:1px solid var(--line); box-shadow:none`. 섹션 경계 `border-top:1px solid var(--line)` 을 컨테이너가 아니라 섹션(풀블리드)에
- 깨지는 경우: 검정 한 장 + 경계 없이 형광 강조만 남기면 AI 기본값(CO-3)이 된다. 면 3단계와 hairline 이 함께 있어야 한다. 라이트 모드로 옮기면 흰 8% 대신 검정 8% 로 뒤집는다

### 5. 섹션 머리를 h2 왼쪽 · 설명 오른쪽 반으로 쪼갠다
- 관찰: media-text 4개(…) 의 머리 전부(×4, overview.jpg 05·06·07). 왼쪽 2줄 h2, 오른쪽 열에 설명 3줄 + 텍스트 링크. 아래에 제품 UI 가 폭 전체로 깔린다
- 수치: h2 x80, 설명 시작 x752 — 1440 화면의 약 절반(추정). 설명 글자 약 20px · 행간 1.6 · #D0D6E0 계열(추정). 섹션 사이 가시 간격 약 160px + 1px 가로선 + 약 160px(추정, slices/desktop-03.jpg). 엔진의 섹션 padding 중앙값은 82px(측정)
- 기본값과의 차이: 흔한 섹션 머리는 가운데 정렬 eyebrow + h2 + 부제 세로 스택. 여기는 왼쪽 정렬 2열로, h2 는 짧은 명사구가 되고 설명이 옆에서 받친다
- 따라 하는 법: `.sec-head{display:grid;grid-template-columns:1fr 1fr;align-items:start;gap:64px;padding-block:160px 64px;border-top:1px solid var(--line)}` 모바일 `grid-template-columns:1fr`
- 깨지는 경우: 머리 아래까지 똑같은 골격을 4번 찍으면 LA-3 이 된다 → 머리만 고정하고 아래 제품 UI 구성(보드·타임라인·채팅·코드 diff)은 섹션마다 다르게

## 5. 토큰 (Tokens)

### 5.1 타이포그래피 (Typography)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리(본문·디스플레이) | Inter Variable (webfont, OFL) · 글자 88% | 측정 | h1–h3·본문·버튼·내비 모두. 스택 뒤에 SF Pro Display, system-ui |
| 패밀리(모노) | Berkeley Mono (webfont) · 글자 12% | 측정 | 그림 번호 캡션, 로고 띠 캡션, 제품 UI 안 코드·이슈 ID |
| display (h1) | 64 / 38px · 510 · 1.0 · -0.022em | 측정 | 히어로 h1 한 번(×2: 데스크톱·모바일 같은 요소) |
| h2 | 48 / 24px · 510 · 1.0 · -0.022em | 측정 | 섹션 제목 ×7. 모바일 축소 비 0.5 로 큰 편 |
| h3 | 32 / 20px · 400 · 1.13 · -0.022em | 측정 | 후기 인용문. 굵기 400 |
| body | 15px · 400 · 1.6 · -0.011em | 측정 | 본문도 살짝 조인다 |
| small | 14 / 13px · mono · 400 · 1.71 · 0em | 측정 | ×153. 캡션·메타 |
| button | 13px · 510 · normal | 측정 | 버튼 글자가 본문보다 작다 |
| nav | 13px · 400 · 1.5 | 측정 | |
| 스케일 비율 | 1.333 perfect-fourth, fit 0.65 · 단계 10 12 13 14 15 24 32 48 64 72 | 파생 | fit 이 낮다: 13–15 의 촘촘한 UI 단계 + 24–72 의 큰 단계 두 무리 |
| clamp | h1 `clamp(2.375rem, 1.771rem + 2.476vw, 4rem)` · h2 `clamp(1.5rem, 0.943rem + 2.286vw, 3rem)` | 파생 | 390→1440px 선형 |
| 줄바꿈 | text-wrap balance 사용, keep-all 해당 없음(한글 0%) | 측정 | 한국어로 옮길 땐 keep-all 필수 |
| 두 톤 헤드라인 | 같은 h2 안에서 #F7F8F8 → #8A8F98 | 추정 | text-block 섹션 1곳에서 확인 |

### 5.2 색 (Color)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg | #08090A · oklch(0.14 0.003 246) · 면적 72% | 측정 | `--color-bg-level-0` |
| surface | #0F1011 · 25% | 측정 | `--color-bg-level-1`. 제품 프레임·카드 |
| surface-2 | #161718 · 1% | 측정 | 작은 카드, 입력 |
| text-strong | #F7F8F8 | 선언 | `--color-fg-primary`. h1·h2 색(화면에서 거의 흰색으로 보임) |
| text-secondary | #D0D6E0 | 측정 | 버튼·배지 글자, 섹션 설명 |
| text (본문) | #8A8F98 · 글자 36% | 측정 | `--color-fg-tertiary`. 리드·기능 설명 |
| text-muted | #62666D · 11% | 측정 | `--color-fg-quaternary`. 메타·캡션 |
| border | #FFFFFF14 (합성 #1B1C1D) · 둘레 75% | 측정 | 무브 4 |
| 주 버튼 bg | #E5E5E6, 글자 #08090A | 측정 | `--color-button-invert-bg`. 강조색 대신 |
| 화면상 강조 | #27A644 (초록) | 측정 | 제품 UI 안 상태 아이콘·테두리뿐. 마케팅 UI 에는 없다 |
| 선언 강조 | #7170FF (hover #828FFF) | 선언 | `--color-accent`. 이 페이지 화면에서는 측정되지 않음 |
| 브랜드 인디고 | #5E6AD2 | 선언 | `--color-brand-bg`. 역시 화면 0% |
| 후기 카드 면 | #E4F222(형광 연두) · 하늘→라벤더 그라데이션 | 측정 | 유채색 군집 13%. 어두운 페이지의 유일한 밝은 면 |
| 대비 (엔진) | text/bg 6.13 AA · text/surface 5.86 AA · text-muted/bg 3.45 AA-large 만 | 파생 | #62666D 는 본문에 쓰지 않는다 |
| 대비 (추가) | #F7F8F8/bg 18.7 · #D0D6E0/bg 13.6 · 버튼 글자/#E5E5E6 15.8 | 파생 | 선언·측정값으로 계산 |
| 중립 온도 | cool — hue 246–262, chroma 0.003–0.015 | 파생 | 거의 무채색에 아주 약간 푸른 기 |
| 그라데이션 | 57개 · 면적 22% · 글자 그라데이션 0 | 측정 | 대부분 제품 UI 페이드·빛 띠·후기 카드. 그라데이션 글자 없음 |

### 5.3 간격·레이아웃 (Space & Layout)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 기준 단위 | 4px (adherence 0.7) | 파생 | |
| 간격 단계 | 4 6 7 8 10 12 32 | 파생 | 제품 UI 의 촘촘한 값이 섞여 있다 |
| 섹션 padding-y (중앙값) | 82 / 12px (D/M) | 측정 | 모바일 12 는 섹션 박스 안쪽만 잰 값으로 보인다(측정 메모) |
| 섹션 사이 가시 간격 | 약 160px + 1px 풀블리드 선 + 약 160px | 추정 | slices/desktop-03.jpg. 무브 5 |
| 히어로 위 빈 칸 | 198px (h1 y271 − 내비 73) | 파생 | 첫 화면 위쪽을 비워 h1 을 화면 중간 가까이 내린다 |
| 컨테이너 | max-width 1310px | 측정 | 히어로 제품 프레임 폭과 거의 같다 |
| 거터 | 36 / 12px | 측정 | |
| 그리드 | 열 4 · 7 · 5 · 3, 간격 64 / 8px | 측정 | 기능 3열, 체인지로그 4열, 푸터 5열 |
| 섹션 머리 분할 | h2 x80 · 설명 x752 (약 1:1) | 추정 | 무브 5 |
| 밀도 | airy, 첫 화면 빈 칸 69% | 파생 | 제품 UI 안쪽은 밀집(13px 행) — 바깥 여백과 안쪽 밀도의 대비 |
| 페이지 높이 | 9960 / 5876px (D/M) | 측정 | 약 11 화면 |

### 5.4 형태·깊이 (Shape & Depth)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius 단계 | 2 4 6 8 9 12 · pill 비율 50% | 측정 | 마케팅 버튼은 pill, UI 요소는 4–12 |
| radius 버튼 | pill (주 버튼·내비·cta) / 8 (제품 UI ghost) | 측정 | |
| radius 카드 · 이미지 | 9 · 12px | 측정 | 프레임 12, 안쪽 카드 8–9 |
| radius 배지 | 4px | 측정 | 높이 18–24 |
| 테두리 | 1px, 흰 8%, 사용 high | 측정 | 무브 4 |
| 그림자 | subtle 1단계 `rgba(0,0,0,.25) 0 2px 32px` · 32개 요소 | 측정 | 어두운 바탕이라 거의 안 보인다 |
| ring shadow | 있음 | 측정 | 테두리를 box-shadow 로 그린 요소가 있다 |
| 히어로 빛 띠 | 프레임 아래 중립 회색 그라데이션 한 곳 | 추정 | 무브 1. 유채색 glow 아님 |
| 포커스 링 | 측정 실패: 포커스 상태는 캡처하지 않는다 | — | 브리프에서 정한다 |

### 5.5 모션 (Motion)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 단계 | fast 100 · base 100 · slow 160ms | 측정 | 짧다. 도구 같은 즉답감 |
| easing | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (easeOutQuad 계열) | 측정 | |
| 전환·애니메이션 수 | transition 368 · animation 3 | 측정 | 대부분 hover·상태 전환 |
| 등장 연출 | 측정 실패: 정적 캡처라 스크롤 연출은 잡히지 않는다 | — | |
| reduced-motion | 대응함 | 측정 | |
| 라이브러리 | 없음 (CSS transition) | 측정 | |

### 5.6 이미지·아이콘 (Imagery & Icons)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 이미지 비중 | img 8% · 배경 이미지 23% · SVG 13% | 측정 | 사진 0. 비중 대부분이 제품 UI 와 선 도형 |
| 종류 | HTML 로 그린 제품 UI, 1px 선 아이소메트릭 와이어프레임 도형, 흑백 고객 로고 | 추정 | 사진·인물·3D 렌더 없음 |
| 아이콘 개수 | 206개 | 측정 | 거의 전부 제품 UI 안 |
| 아이콘 스타일 | 약 14–16px, 선 1.25–1.5px, 단색 회색(상태 아이콘만 유채색) | 추정 | |
| 영상·캔버스 | 0 · 0 | 측정 | |
| blur | backdrop blur 2곳 (내비) | 측정 | |

## 6. 컴포넌트 (Components)

- 주 버튼: 높이 44 · padding-x 20 · radius pill · bg #E5E5E6 · 글자 #08090A 13px/510 · 1px #E5E5E6 테두리 (측정). 내비·cta-band 에만. hover 는 선언값 `--color-button-invert-bg-hover` #FFF(측정 실패: 정적 캡처)
- 보조 버튼(cta-band): 어두운 pill + 1px hairline, 같은 높이 (추정, overview 10)
- 칩 버튼(outline): 높이 24 · padding-x 7 · radius pill · 글자 #D0D6E0 12px/400 · 1px #2E2E32 (측정)
- ghost(제품 UI 사이드바): 높이 28 · padding-x 7 · radius 8 · 글자 #D0D6E0 13px/510 · ×21 (측정)
- 텍스트 링크: "… →" 형식, 회색 #8A8F98 계열, 밑줄 없음 (추정). 히어로·섹션 머리·후기 아래
- 내비: 높이 73 / 65 · fixed · backdrop blur · 투명 바탕 + 하단 1px 선 · 링크 6(엔진 5) + 세로 구분선 + … + … pill, 모바일 햄버거 (측정, 링크 수는 화면)
- 카드(제품 UI 패널): 폭 662 · padding 12/16 · radius 9 · bg #0F1011 · 1px border (측정)
- 카드(작은 패널): 폭 400 · radius 12 · bg #161718 · 1px border (측정)
- 후기 카드: 2/3 폭 + 1/3 폭, radius 약 8, 밝은 면 위 검정 글자, 인용 h3 32px/400, 아래 로고 + 세로 hairline + 이름·직함 (치수 추정, 글자 측정)
- 배지: 높이 18–24 · padding-x 4–6 · radius 4 · 11–12px · 테두리만 (측정). 인디고 배지 1종 bg #6D78D526 · 글자 #6D78D5 (측정, 제품 UI 안)

## 7. 페이지 구조 (Page Anatomy)

| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 왼쪽, 링크 6 + 구분선 + … + pill 오른쪽, 73px fixed blur | bg (투명) | |
| 2 | hero-product | h1 2줄 왼쪽 + 리드 1줄 + 같은 줄 오른쪽 텍스트 링크, 아래 제품 UI 1310px 가 회색 빛 띠 위에 | bg | 엔진 hero-product(0.85) 유지. 본문 버튼 0개 |
| 3 | logo-cloud | 흑백 로고 7개 한 줄 + 모노 대문자 캡션 1줄 | bg | |
| 4 | text-block | h2 48px 3줄, 첫 문장 흰색 → 나머지 회색 | bg | 엔진 text-block(0.5) 유지. 무브 2 |
| 5 | feature-grid | 3열, 세로 hairline, 모노 FIG 캡션 + 선 도형 + 제목 + 2줄 | bg | 아이콘 카드가 아니라 도형 + 세로선이라 LA-2 아님 |
| 6 | media-text | 머리 분할(h2 왼쪽 / 설명 + 링크 오른쪽) + 아래 제품 UI 콜라주 + 하위 기능 링크 3열 | bg | 엔진 feature-grid(0.8) → media-text: 기능 하나를 깊게 다룬다. 섹션 6–9 같은 머리 ×4 |
| 7 | media-text | 같은 머리 + 타임라인·차트 UI | bg | 엔진 media-text(0.55) 유지 |
| 8 | media-text | 같은 머리 + 에이전트 채팅 패널 4개 가로 | bg | 엔진 feature-grid(0.8) → media-text |
| 9 | media-text | 같은 머리 + 이슈 목록 + 코드 diff UI | bg | 엔진 unknown(0.2) → media-text |
| 10 | content-list | 체인지로그: 가로선 위 점 4개 + 4열 짧은 글 | bg | 엔진 unknown(0.2) → content-list |
| 11 | testimonials | 인용 카드 2개(2/3 파스텔 그라데이션 + 1/3 형광 연두), 아래 수치 문장 + 텍스트 링크 | 밝은 카드 | 엔진 unknown(0.2) → testimonials(모바일 엔진 판정과 일치) |
| 12 | cta-band | 가운데 정렬 h2 + 밝은 pill · 어두운 pill | bg | 페이지 유일한 가운데 정렬 |
| 13 | footer | 로고 + 링크 5열 + 하단 법적 링크 | bg (solid) | |

리듬: 배경은 처음부터 끝까지 #08090A 한 장이고, 구획은 약 160px 여백 + 풀블리드 1px 선이 맡는다. 명도가 뒤집히는 곳은 후기 카드 한 번뿐이라 페이지가 "어두운 긴 막 → 밝은 한 박자 → 마무리"로 읽힌다.

```text
+--------------------------------------------------------------+
| nav (fixed, blur)              links(6) | login [signup]     |
+--------------------------------------------------------------+
| hero-product   h1 2 lines, left            text link ->      |
| [ product UI frame 1310w, lit from below by gray glow ]      |
| logo-cloud (7) + mono caption                                |
| text-block     h2 two-tone (white -> gray)                   |
| feature-grid (3)  FIG | iso line art | text, v-rules         |
|--------------------------------------------------------------|
| media-text x4  h2 left        | lead + link right            |
|                [ wide product UI collage ]                   |
|                (each chapter split by full-bleed rule)       |
|--------------------------------------------------------------|
| content-list (4)  dot timeline, 4 cols                       |
+--------------------------------------------------------------+
| testimonials (2)  [ pastel gradient 2/3 ][ acid 1/3 ]        |
+--------------------------------------------------------------+
| cta-band       centered h2 + 2 pills                         |
+--------------------------------------------------------------+
| footer         logo + 5 link cols                            |
+--------------------------------------------------------------+
```

모바일: h1 64 → 38px, h2 48 → 24px. 모든 분할이 1열로 쌓이고 섹션 머리는 h2 → 설명 순서. 히어로 제품 UI 는 축소하지 않고 오른쪽이 화면 밖으로 잘린 채 h1·리드 아래에 놓인다. 로고 7열은 사라지거나 1열로 줄고, 4열(채팅 패널·체인지로그)은 1열. 내비는 로고 + … + … pill + 햄버거. 하단 고정 바 없음.

## 8. 따라 할 때 Do / Don't

Do
- 히어로 아래에 실제 제품 UI 를 컨테이너 폭(1240–1310px)으로 깔고, 빛은 무채색 띠 한 곳만 (무브 1)
- 헤드라인은 가변 폰트 510 · 자간 -0.022em 으로 조이고, 강조는 같은 크기 안에서 흰색 → 회색 명도로 (무브 2)
- 주 CTA 는 페이지에서 가장 밝은 회색 pill 하나. 강조색은 제품 상태 표시에만 (무브 3)
- 면은 #08090A / #0F1011 / #161718 세 단계 + 1px 흰 8% 선으로 나눈다 (무브 4)
- 섹션 머리를 h2 왼쪽 · 설명 오른쪽으로 고정하고, 그 아래 UI 구성은 섹션마다 바꾼다 (무브 5)
- 모노는 "…" 같은 그림 번호·코드·ID 에만. 한국어로 옮길 땐 한글에 모노를 쓰지 않는다

Don't
- 브랜드 보라·파랑을 버튼·링크·아이콘·배지에 칠하지 않는다 — 무브 3, CO-5
- 히어로 뒤에 보라→파랑 그라데이션 블롭·오브를 깔지 않는다 — 무브 1, CO-4, CO-1
- 검정 한 장 위에 형광 강조 하나만 남기지 않는다(면 단계·hairline 없이) — 무브 4, CO-3
- 카드를 `shadow-md` 로 띄우지 않는다. 깊이는 경계와 명도로 — 무브 4, SH-2
- 데이터 라벨·숫자·본문 메타를 전부 모노로 바꾸지 않는다 — TY-5
- 본문을 #62666D(3.45:1)로 내리지 않는다. 본문은 #8A8F98 이상 — 무브 3, CO-7
- 섹션 머리 아래까지 같은 골격을 4번 찍지 않는다 — 무브 5, LA-3

## 9. 폰트 대체 (Font Substitutes)

| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Inter Variable | OFL (무료) | Inter Variable 그대로 | Pretendard Variable | 굵기 510 을 쓰려면 둘 다 가변 폰트로 로드한다. 한글 헤드라인은 행간 1.15–1.2, 자간 -0.02em 으로 완화 |
| Berkeley Mono | 유료 상용 서체 (엔진 판정 unknown) | JetBrains Mono, IBM Plex Mono, Geist Mono | 쓰지 않음(한글은 Pretendard) | 그림 번호·코드·이슈 ID 같은 라틴 문자열에만. 폰트 파일을 가져오지 않는다 |

## 10. 베끼지 말 것 (Don't Copy)

- Linear 로고·워드마크·사선 원 심볼
- 히어로와 기능 섹션의 제품 UI 화면 — 내 제품의 실제 화면으로 바꾼다
- 아이소메트릭 와이어프레임 도형 일러스트 — 선 굵기(1px)·무채색 규칙만 옮긴다
- 고객사 로고 7개, 후기 인용과 인물·회사명, 고객 수 문장
- 헤드라인·리드·버튼·캡션 카피
- Berkeley Mono 폰트 파일
- 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)

```text
dark-tech × minimal 랜딩. 배경 #08090A, 면 #0F1011 / #161718, 경계 1px rgba(255,255,255,.08) — 그림자 대신 경계.
히어로: 왼쪽 정렬 h1 64px 굵기 510 행간 1.0 자간 -0.022em(한글은 행간 1.15, -0.02em), 아래에 실제 제품 UI 를 1310px 폭으로, 빛은 무채색 띠 한 곳.
글자는 회색 4단계(#F7F8F8 / #D0D6E0 / #8A8F98 / #62666D), 본문 15px/1.6. 주 CTA 는 #E5E5E6 pill 하나, 브랜드색 없음.
섹션 머리는 h2 왼쪽 · 설명 오른쪽 2열, 섹션 사이 약 160px 여백 + 풀블리드 1px 선.
금지: 보라 그라데이션·블롭, 형광 강조, shadow-md 카드, 모든 라벨 모노, 그라데이션 글자.
```

```text
Dark-tech landing with minimal restraint. Background #08090A, surfaces #0F1011 / #161718, 1px rgba(255,255,255,.08) borders instead of shadows.
Left-aligned 64px headline, weight 510, line-height 1.0, -0.022em tracking; below it the real product UI at 1310px wide, lit by one neutral gray glow.
Four gray text levels (#F7F8F8 / #D0D6E0 / #8A8F98 / #62666D), 15px/1.6 body. One light-gray pill CTA (#E5E5E6), no brand color.
Section heads split h2 left / description right; ~160px whitespace plus a full-bleed 1px rule between sections.
No purple gradients or blobs, neon accent, shadow-md cards, monospace everywhere, or gradient text.
```

## 부록: 화면 관찰 (Visual Read)

- 첫 화면(desktop.png): 위 200px 가량을 비우고 h1 2줄이 왼쪽 x80 에서 시작한다. 리드 문장은 회색 한 줄, 같은 기준선 오른쪽 끝에 작은 텍스트 링크 하나. 버튼이 히어로 본문에 없다 — 주 CTA 는 내비의 밝은 회색 pill 하나뿐이다.
- 히어로 아래 제품 화면(사이드바 + 이슈 상세 + 에이전트 채팅 패널)이 거의 화면 폭 전체(x60–1380)를 차지한다. 프레임 바로 아래에 중립 회색 그라데이션 띠가 깔려 제품 화면이 아래에서 조명을 받는 무대처럼 보인다. 유채색 광원이 아니라 회색 빛이다.
- 로고 띠 아래 모노스페이스 대문자 캡션 한 줄, 기능 3열 위에 도면 번호식 모노 캡션(…)이 붙는다. 3열 사이는 세로 hairline, 각 열 위는 1px 선으로 그린 아이소메트릭 와이어프레임 도형이다. 엔지니어링 도면 같은 인상.
- 텍스트 블록 섹션의 큰 h2 는 첫 문장만 거의 흰색, 이어지는 문장은 회색으로 같은 크기·같은 줄에서 이어진다. 크기를 바꾸지 않고 명도로만 위계를 나눈다.
- 기능 섹션 4개(…)가 모두 같은 머리 구조다: 왼쪽에 2줄 h2, 오른쪽 절반에 설명 3줄 + 텍스트 링크. 그 아래 제품 UI 조각이 넓게 깔리고, 섹션 사이는 화면 끝까지 닿는 1px 가로선 하나 + 위아래 큰 여백으로 끊긴다.
- 페이지 전체가 거의 검정 한 톤이고 유채색은 제품 UI 안의 상태 아이콘(초록·노랑·주황)과 코드 diff 의 빨강·초록뿐이다. 예외가 후기 섹션: 옅은 하늘→라벤더 그라데이션 카드와 형광 연두 카드가 갑자기 밝은 면으로 튀어나와, 긴 어두운 페이지에서 유일하게 명도가 뒤집히는 지점이 된다.
- 체인지로그는 가로선 위 점 4개 타임라인 + 4열 짧은 글. CTA 는 가운데 정렬 h2 + 밝은 pill / 어두운 pill 두 개, 유일한 가운데 정렬 섹션.
- 모바일(mobile.png): h1 이 4줄로 쌓이고 제품 화면은 축소되지 않고 오른쪽이 화면 밖으로 잘린 채 h1·리드 아래에 놓인다. 내비는 로고 + … + … pill + 햄버거.

## 부록: 측정 메모 (Capture Notes)

- 방법: cdp(system Chrome), desktop 1440×900 · mobile 390×844 @2. 2026-10-15 01:23Z, 로그아웃·첫 방문 상태. 숨긴 오버레이 없음.
- 경고: `SLICES_SAMPLED` — 페이지가 12 화면이라 슬라이스 10장을 고르게 뽑았다(중간 일부는 슬라이스에 없다). `RAW_TRIMMED` — raw 의 histograms·vars 가 잘렸다. 선언 변수는 tokens.json 에 남은 40여 개만 참고했다.
- 엔진 정정(7장 비고): 섹션 6·8 feature-grid → media-text, 9·10·11 unknown(0.2) → media-text · content-list · testimonials. tokens.json 은 그대로 둠.
- 신뢰도가 낮은 영역: 섹션 여백 — 엔진 중앙값 82 / 12px 은 섹션 박스 안쪽만 잰 값으로 보이고, 화면에서 보이는 간격(약 160px + 선 + 160px)은 슬라이스에서 읽은 추정이다. 모바일 12px 은 쓰지 않는다. 헤드라인 색 #F7F8F8 은 화면 색과 맞는 선언 변수에서 가져왔다(글자색 군집에는 #8A8F98 가 주로 잡힘).
- 색 해석: 엔진이 accent 로 잡은 #27A644(45%)와 기타 유채색은 대부분 HTML 로 그린 제품 UI 안의 상태 아이콘이다. 마케팅 UI 의 강조로 보지 않았다(무브 3).
- 폰트 라이선스: Berkeley Mono 는 엔진 판정 unknown 이며, 유료 상용 서체로 보고 대체 폰트를 적었다.
- 정적 캡처라 hover·포커스·스크롤 연출은 없다. 5.5 등장 연출·5.4 포커스 링은 측정 실패로 둔다.
- 근거 비율: 값이 있는 토큰 행 60개 = 측정 42 · 선언 3 · 파생 9 · 추정 6 → 70 / 5 / 15 / 10%. 측정 실패 2행(포커스 링, 등장 연출)은 뺐다.
- 페이지 텍스트에서 지시처럼 보이는 문자열은 없었다.
