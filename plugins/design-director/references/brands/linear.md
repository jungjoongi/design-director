---
schema: dd.profile/1
slug: linear
name: Linear
input_type: url
source: https://linear.app/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: dark
shots: none
recapture: null
styles: {primary: dark-tech, secondary: minimal, treatments: []}
structure: "nav → hero-product → logo-cloud(7) → text-block → feature-grid(3) → media-text(4) → content-list(4) → testimonials(2) → cta-band → footer"
evidence: {measured: 74, declared: 0, derived: 13, estimated: 13, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
bundled: true
verified: 2026-10-15 maintainer spot-check
---

# Linear — Reference Profile

## 1. 본질 (Essence)
제품을 만드는 팀을 위해 화면 폭을 채운 실제 제품 UI, 명도 3단계 면, 1px 반투명 hairline, 회색 4단계 글자로 브랜드색 없이 조용하고 정밀한 엔지니어링 도구 느낌을 만든다.

## 2. 스타일 분류 (Classification)
- primary: `dark-tech` — bg #08090A(oklch L 0.14), 면 #0F1011 / #161718 로 명도 +3%씩, 경계 1px 흰 8%(#FFFFFF14, 테두리 둘레의 75%), display 굵기 510 · 자간 -0.022em(측정). 이미지 대신 실제 제품 UI 를 쓴다
- secondary: `minimal` — 첫 화면 빈 칸 69%(파생), 마케팅 UI 강조색 0개(선언 `--color-accent` #7170FF 는 화면에서 측정되지 않음), 히어로 본문 버튼 0개. 단 본문 15px · 컨테이너 1310px 은 minimal 범위(16–18px · 960–1200px) 밖
- treatments: 없음 — 히어로 아래 빛은 유채색 블롭이 아니라 중립 회색 그라데이션 한 곳(추정), 글래스는 내비 blur 1곳뿐. 후기 카드의 파스텔 그라데이션은 카드 면 하나라 aurora-gradient 로 보지 않는다
- 축: 밀도 2 · 온도 1 · 채도 2 · 대비 4 · 둥긂 2 · 장식 2

## 3. 무드 키워드 (Mood)
정밀한 도구 (precision instrument) · 엔지니어링 도면 같은 (blueprint-like) · 어둠 속 절제 (restrained in the dark) · 제품이 증거 (product-as-proof) · 회색으로 말하는 위계 (grayscale hierarchy) · 소음 없는 속도감 (quiet velocity)

## 4. 시그니처 무브 (Signature Moves)
### 1. 실제 제품 UI 를 컨테이너 폭 전체로 깔고 아래에서 회색 빛을 받친다
- 수치: 히어로 media share 0.84, 프레임 폭 ≈ 컨테이너 1310px, radius 12px(측정). 빛 띠 높이 약 48px · 회색 약 #5A5E64 → bg(추정). 모바일은 축소하지 않고 오른쪽이 잘린다(추정)
- 따라 하는 법: `.hero-shot{max-width:1310px;border:1px solid rgb(255 255 255/.08);border-radius:12px;background:#0F1011}` + 부모 `::after` 에 흰 28% radial-gradient 를 `filter:blur(24px)` 로 깐다. 제품 화면은 PNG 보다 실제 컴포넌트로 그린다. 화면이 없으면 hero-type 으로 바꾼다
### 2. 헤드라인을 510 굵기 · 행간 1.0 · 자간 -0.022em 으로 조이고, 위계는 명도로 나눈다
- 수치: h1 64/38px · 510 · 1.0 · -0.022em, h2 48/24px · 510 · 1.0 · -0.022em(측정). text-block 의 h2 는 같은 48px 안에서 첫 문장 #F7F8F8 → 나머지 #8A8F98(추정, 값은 선언 변수)
- 따라 하는 법: `h1{font:510 clamp(2.375rem,1.771rem + 2.476vw,4rem)/1 "Inter Variable",sans-serif;letter-spacing:-.022em;text-wrap:balance}` `h2 .rest{color:#8A8F98}`. 한글 헤드라인은 행간 1.15–1.2 · 자간 -0.02em, 510 은 가변 폰트에서만 의미가 있다
### 3. 브랜드색을 빼고 회색 4단계 글자와 밝은 회색 pill 로만 움직인다
- 수치: 글자 #F7F8F8(선언) / #D0D6E0 / #8A8F98 36% / #62666D 11%(측정). 주 버튼 bg #E5E5E6 · 글자 #08090A · 높이 44 · pill(측정). 선언 accent #7170FF · brand #5E6AD2 는 화면 0%
- 따라 하는 법: `--fg-1:#F7F8F8;--fg-2:#D0D6E0;--fg-3:#8A8F98;--fg-4:#62666D;--btn-primary-bg:#E5E5E6` 주 CTA 는 가장 밝은 면(대비 15.8:1)으로 하나만. 강조색 토큰은 제품 상태 표시에만 노출한다
### 4. 면을 그림자 대신 1px 흰 8% hairline 과 명도 +3% 단계로 나눈다
- 수치: border #FFFFFF14(합성 #1B1C1D) 1px · 둘레 75%, bg #08090A → #0F1011 → #161718(oklch L 0.14 → 0.17 → 0.20), 그림자는 `0 2px 32px rgb(0 0 0/.25)` 한 단계(측정)
- 따라 하는 법: 카드 `background:#0F1011;border:1px solid rgb(255 255 255/.08);box-shadow:none`, 섹션 경계 `border-top` 은 컨테이너가 아니라 풀블리드 섹션에. 라이트 모드로 옮기면 검정 8% 로 뒤집는다
### 5. 섹션 머리를 h2 왼쪽 · 설명 오른쪽 반으로 쪼갠다
- 수치: media-text 머리 ×4, h2 x80 · 설명 x752(약 1:1), 설명 약 20px/1.6, 섹션 사이 약 160px + 1px 가로선 + 약 160px(추정)
- 따라 하는 법: `.sec-head{display:grid;grid-template-columns:1fr 1fr;gap:64px;padding-block:160px 64px;border-top:1px solid var(--line)}` 머리만 고정하고 아래 제품 UI 구성(보드·타임라인·채팅·diff)은 섹션마다 바꾼다(LA-3 회피)

## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | Inter Variable (webfont, OFL, 글자 88%) · Berkeley Mono (webfont, 12%) | 측정 | 모노는 그림 번호 캡션·코드·이슈 ID 에만 |
| display (h1) · h2 | 64/38px · 510 · 1.0 · -0.022em / 48/24px · 510 · 1.0 · -0.022em | 측정 | h2 ×7. 후기 인용 h3 32/20px · 400 · 1.13 |
| body · small · button | 15px · 400 · 1.6 · -0.011em / 14/13px mono · 1.71 · 0em / 13px · 510 | 측정 | 버튼 글자가 본문보다 작다. 스케일 1.333 (fit 0.65) |
### 5.2 색 (Color)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg · surface · surface-2 | #08090A 72% · #0F1011 25% · #161718 1% | 측정 | 중립 cool, hue 246–262, chroma 0.015 이하 |
| text 4단계 | #F7F8F8 · #D0D6E0 · #8A8F98 (글자 36%) · #62666D (11%) | 측정 | #F7F8F8 은 선언 `--color-fg-primary` 값. 본문은 #8A8F98 |
| border | #FFFFFF14 (합성 #1B1C1D) · 둘레 75% | 측정 | 무브 4 |
| 주 버튼 · 강조 | 주 버튼 #E5E5E6 / 글자 #08090A · 화면상 유채색은 제품 UI 상태 초록 #27A644 뿐 | 측정 | 선언 #7170FF · #5E6AD2 는 화면 0% — 무브 3 |
| 대비 | text/bg 6.13 · muted/bg 3.45 · #F7F8F8/bg 18.7 · 버튼 글자 15.8 | 파생 | #62666D 는 본문에 쓰지 않는다 |
### 5.3 간격·레이아웃 (Space & Layout)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 컨테이너 · 거터 | max-width 1310px · 거터 36 / 12px | 측정 | 히어로 제품 프레임 폭과 거의 같다. 기준 단위 4px |
| 섹션 사이 가시 간격 | 약 160px + 1px 풀블리드 선 + 약 160px | 추정 | 엔진 padding 중앙값 82px 는 박스 안쪽 값이다 |
| 밀도 | airy, 첫 화면 빈 칸 69% · 히어로 위 빈 칸 198px | 파생 | 바깥은 여백, 제품 UI 안쪽은 13px 행으로 밀집 |
### 5.4 형태·깊이 (Shape & Depth)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius | 마케팅 버튼 pill (50%) · 카드 9 · 이미지 12 · 배지 4 · UI ghost 8 | 측정 | 단계 2 4 6 8 9 12 |
| 테두리 · 그림자 | 1px 흰 8% (사용 high) · `rgba(0,0,0,.25) 0 2px 32px` 1단계 | 측정 | 어두운 바탕이라 그림자는 거의 안 보인다 |
### 5.5 모션 (Motion)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 · easing | 100 / 100 / 160ms · `cubic-bezier(0.25, 0.46, 0.45, 0.94)` · reduced-motion 대응함 | 측정 | transition 368 · animation 3, 라이브러리 없음. 도구 같은 즉답감 |
### 5.6 이미지·아이콘 (Imagery & Icons)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 종류 | HTML 로 그린 제품 UI, 1px 선 아이소메트릭 와이어프레임 도형, 흑백 고객 로고. 사진 0, 아이콘 206개(약 14–16px, 선 1.25–1.5px) | 추정 | 아이콘·영상 개수는 측정. 사진·인물·3D 없음 |

## 6. 컴포넌트 (Components)
- 주 버튼: 높이 44 · padding-x 20 · pill · #E5E5E6 / #08090A 13px/510 · 1px #E5E5E6(측정), 내비·cta-band 에만. 보조는 어두운 pill + 1px hairline(추정). hover 는 측정 실패: 정적 캡처
- 칩·ghost: 칩 높이 24 · padding-x 7 · pill · #D0D6E0 12px · 1px #2E2E32 / 제품 UI ghost 높이 28 · radius 8 · 13px/510(측정)
- 내비: 높이 73 / 65 · fixed · backdrop blur · 투명 + 하단 1px 선, 링크 6 + 세로 구분선 + 로그인 링크 + 가입 pill, 모바일 햄버거(측정, 링크 수는 화면)
- 카드: 제품 UI 패널 폭 662 · padding 12/16 · radius 9 · #0F1011 · 1px border / 작은 패널 폭 400 · radius 12 · #161718(측정). 배지 높이 18–24 · radius 4 · 테두리만

## 7. 페이지 구조 (Page Anatomy)
| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 왼쪽, 링크 6 + 구분선 + 로그인 + pill 오른쪽, 73px fixed blur | bg (투명) | |
| 2 | hero-product | h1 2줄 왼쪽 + 리드 1줄 + 오른쪽 텍스트 링크, 아래 제품 UI 1310px 가 회색 빛 띠 위에 | bg | 본문 버튼 0개 |
| 3 | logo-cloud(7) · text-block | 흑백 로고 7개 + 모노 대문자 캡션, 이어서 h2 48px 3줄(흰 → 회색 두 톤) | bg | 무브 2 |
| 4 | feature-grid(3) | 3열, 세로 hairline, 모노 그림 번호 캡션 + 선 도형 + 제목 + 2줄 | bg | 아이콘 카드가 아니라 LA-2 아님 |
| 5 | media-text ×4 | 머리 분할(h2 왼쪽 / 설명 + 링크 오른쪽) + 아래 넓은 제품 UI 콜라주, 섹션마다 구성이 다르다 | bg | 엔진 feature-grid·unknown 을 정정 |
| 6 | content-list(4) | 체인지로그: 가로선 위 점 4개 + 4열 짧은 글 | bg | 엔진 unknown 을 정정 |
| 7 | testimonials(2) | 2/3 파스텔 그라데이션 카드 + 1/3 형광 연두 카드, 아래 수치 문장 + 링크 | 밝은 카드 | 페이지 유일한 명도 반전 |
| 8 | cta-band · footer | 가운데 정렬 h2 + 밝은 pill · 어두운 pill, 이어서 로고 + 링크 5열 | bg | 유일한 가운데 정렬 |

리듬: 배경은 처음부터 끝까지 #08090A 한 장이고 구획은 약 160px 여백 + 풀블리드 1px 선이 맡는다. 모바일: h1 64 → 38px, h2 48 → 24px, 모든 분할이 1열, 히어로 제품 UI 는 축소 없이 오른쪽이 잘린다. 하단 고정 바 없음.

## 8. 따라 할 때 Do / Don't
- Do: 히어로 아래에 실제 제품 UI 를 컨테이너 폭(1310px)으로 깔고, 빛은 무채색 띠 한 곳만 둔다 — 무브 1
- Do: 면은 #08090A / #0F1011 / #161718 세 단계 + 1px 흰 8% 선으로 나누고, 주 CTA 는 가장 밝은 회색 pill 하나로 — 무브 3·4
- Do: 섹션 머리를 h2 왼쪽 · 설명 오른쪽으로 고정하고 아래 UI 구성은 섹션마다 바꾼다 — 무브 5
- Don't: 브랜드 보라·파랑을 버튼·링크·배지에 칠하거나 히어로 뒤에 보라 블롭을 깔지 않는다 — 무브 1·3, CO-1, CO-4, CO-5
- Don't: 검정 한 장 위에 형광 강조 하나만 남기거나 카드를 shadow-md 로 띄우지 않는다 — 무브 4, CO-3, SH-2
- Don't: 라벨·숫자·메타를 전부 모노로 바꾸거나 본문을 #62666D(3.45:1)로 내리지 않는다 — TY-5, CO-7
- **흔한 오해**: Linear ≠ 검정 + 보라 glow. 인디고 #5E6AD2 · #7170FF 는 선언 변수에만 있고 마케팅 화면에서는 0% 다. 유채색은 제품 UI 상태 아이콘과 후기 카드뿐이다
- **흔한 오해**: Linear ≠ 굵은 헤드라인. 굵기는 700 이 아니라 510 이고, 크기 대신 같은 h2 안의 흰 → 회색 명도로 강조한다

## 9. 폰트 대체 (Font Substitutes)
| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Inter Variable | OFL (무료) | Inter Variable 그대로 | Pretendard Variable | 510 을 쓰려면 둘 다 가변 폰트로. 한글 헤드라인은 행간 1.15–1.2, -0.02em |
| Berkeley Mono | 유료 상용 서체 (엔진 판정 unknown) | JetBrains Mono, IBM Plex Mono, Geist Mono | 쓰지 않음 (한글은 Pretendard) | 그림 번호·코드·이슈 ID 같은 라틴 문자열에만 |

## 10. 베끼지 말 것 (Don't Copy)
Linear 로고·워드마크·심볼, 히어로와 기능 섹션의 제품 UI 화면(내 제품의 실제 화면으로 바꾼다), 아이소메트릭 와이어프레임 도형(1px 선 · 무채색 규칙만 옮긴다), 고객사 로고·후기 인용·인물·회사명, 모든 카피, Berkeley Mono 폰트 파일. 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)
```text
dark-tech × minimal 랜딩. 배경 #08090A, 면 #0F1011 / #161718, 경계 1px rgba(255,255,255,.08) — 그림자 대신 경계.
히어로: 왼쪽 정렬 h1 64px 굵기 510 행간 1.0 자간 -0.022em(한글은 행간 1.15, -0.02em), 아래에 실제 제품 UI 를 1310px 폭으로, 빛은 무채색 띠 한 곳.
글자는 회색 4단계(#F7F8F8 / #D0D6E0 / #8A8F98 / #62666D), 본문 15px/1.6. 주 CTA 는 #E5E5E6 pill 하나, 브랜드색 없음. 섹션 머리는 h2 왼쪽 · 설명 오른쪽, 섹션 사이 약 160px + 풀블리드 1px 선.
금지: 보라 그라데이션·블롭, 형광 강조, shadow-md 카드, 모든 라벨 모노, 그라데이션 글자.
```
```text
Dark-tech landing with minimal restraint. Background #08090A, surfaces #0F1011 / #161718, 1px rgba(255,255,255,.08) borders instead of shadows.
Left-aligned 64px headline, weight 510, line-height 1.0, -0.022em tracking; below it the real product UI at 1310px wide, lit by one neutral gray glow.
Four gray text levels (#F7F8F8 / #D0D6E0 / #8A8F98 / #62666D), 15px/1.6 body, one light-gray pill CTA (#E5E5E6), no brand color. Split section heads, ~160px plus a full-bleed 1px rule between sections.
No purple gradients or blobs, neon accent, shadow-md cards, monospace everywhere, or gradient text.
```

## 부록: 화면 관찰 (Visual Read)
- 첫 화면은 위 약 200px 를 비우고 h1 2줄이 왼쪽 x80 에서 시작한다. 히어로 본문에는 버튼이 없고 주 CTA 는 내비의 밝은 회색 pill 하나다.
- 히어로 아래 HTML 제품 화면(사이드바 + 이슈 상세 + 에이전트 패널)이 화면 폭 거의 전체를 차지하고, 프레임 아래 회색 빛 띠가 무대 조명처럼 받친다. 도면 번호식 모노 캡션과 1px 선 아이소메트릭 도형이 엔지니어링 도면 인상을 만든다.
- 페이지 전체가 거의 검정 한 톤이고, 후기 섹션의 하늘→라벤더 그라데이션 카드와 형광 연두 카드에서만 명도가 뒤집힌다.
- 모바일은 h1 이 4줄로 쌓이고, 제품 화면은 축소되지 않은 채 오른쪽이 잘린다.

## 부록: 측정 메모 (Capture Notes)
- 방법: cdp (system Chrome), desktop 1440×900 · mobile 390×844 @2, 로그아웃·첫 방문, 숨긴 오버레이 없음. 경고: SLICES_SAMPLED(12화면 중 10장) · RAW_TRIMMED(histograms·vars — 선언 변수는 남은 40여 개만 참고).
- 눈으로 고친 것: 섹션 6·8 feature-grid → media-text, 9·10·11 unknown(0.2) → media-text · content-list · testimonials. 엔진 섹션 padding 82 / 12px 는 박스 안쪽 값이라 보이는 간격은 슬라이스로 추정했다. 엔진 accent #27A644 는 제품 UI 상태 아이콘이라 마케팅 강조로 보지 않았고, 헤드라인 #F7F8F8 은 선언 변수에서 가져왔다. 지시처럼 보이는 문자열은 없었다.
- 근거 비율: 값이 있는 토큰 행 15개 = 측정 11 · 파생 2 · 추정 2 → 74 / 13 / 13%(반올림 합 100).
