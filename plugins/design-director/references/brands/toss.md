---
schema: dd.profile/1
slug: toss
name: 토스
input_type: url
source: https://toss.im/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: mixed
shots: none
recapture: null
styles: {primary: minimal, secondary: kr-fintech-simple, treatments: [glassmorphism, aurora-gradient]}
structure: "nav → hero-media → feature-grid(3) → feature-alternating(sticky) → media-text → text-block → feature-alternating(sticky, dark) → gallery → footer"
evidence: {measured: 79, declared: 0, derived: 14, estimated: 7, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
bundled: true
verified: 2026-10-15 maintainer spot-check
---

# 토스 — Reference Profile

## 1. 본질 (Essence)
금융을 어렵게 느끼는 일반 사용자를 위해 둥근 프레임 속 실사 영상, 스크롤에 고정된 기능 장면, 제품 화면 안에만 남긴 파랑으로 복잡한 금융이 한 장면씩 풀리는 느낌을 만든다.

## 2. 스타일 분류 (Classification)
- primary: `minimal` — 마케팅 크롬이 무채색뿐이다(NO_ACCENT, 측정). bg #FFFFFF 76% · surface #F5F5F5 22% · 검정 2%, 섹션 여백 중앙값 200px, 첫 화면 버튼 0개
- secondary: `kr-fintech-simple` — 제품 UI 목업 안에서만 나온다(큰 금액 숫자, 파랑 배지 #2972E8, radius 24 흰 카드). 카탈로그의 앱 화면 문법(파랑 CTA, 그림자 없음)과 달리 바깥은 cinematic scrollytelling 이고 옅은 청색 그림자를 쓴다
- treatments: `glassmorphism` — backdrop blur 29개, 다크 장면의 반투명 카드(#FFFFFF0F 면 + #FFFFFF21 1px). `aurora-gradient` — 푸터 한 곳의 흐린 청보라·분홍 면(그라데이션 19개 · 면적 5%)
- 축: 밀도 1 · 온도 2 · 채도 1 · 대비 4 · 둥긂 4 · 장식 2

## 3. 무드 키워드 (Mood)
영화처럼 넘기는 (cinematic scrollytelling) · 무채색으로 차분한 (monochrome calm) · 실사로 일상적인 (everyday real-life footage) · 제품이 증명하는 (product-as-proof) · 둥글게 감싼 (soft rounded framing) · 매끄럽게 이어지는 (seamless smooth-scroll)

## 4. 시그니처 무브 (Signature Moves)
### 1. 히어로를 둥근 프레임 속 실사 영상 하나로 채운다
- 수치: 컨테이너 1408px → 1440 뷰포트에서 좌우 16px 인셋, 프레임 radius 32px, 위 64px = 내비 높이(측정). 영상 위 흰 헤드라인 display 80px · 700 · 1.2(측정), 버튼 0개. 프레임 높이 뷰포트의 약 90%(추정)
- 따라 하는 법: `.hero{margin:64px 16px 0;height:calc(100svh - 88px);border-radius:32px;overflow:hidden}` 영상은 `object-fit:cover`. 흰 글자 대비가 모자라면 아래 40%에 옅은 검정 scrim. 실사 영상이 없으면 hero-product 로 바꾼다
### 2. 기능 하나를 한 장면으로 만들어 스크롤에 고정한다
- 수치: 페이지 50,718px ≈ 57화면, 장면 섹션 9,765 / 14,717 / 11,300px, lenis smooth-scroll · lottie, CSS 전환 351개 · keyframe 0개(측정)
- 따라 하는 법: `.scene{height:400vh}` `.scene__stage{position:sticky;top:0;height:100vh;overflow:clip}` 스크롤 진행률로 `transform`·`opacity` 만 바꾼다. 장면은 3–5개, reduced-motion 이면 sticky 를 풀고 정적 이미지로 쌓는다
### 3. 마케팅 화면에서는 색을 빼고 파랑은 제품 화면 안에만 둔다
- 수치: 선언된 강조 변수 없음(측정). 제품 UI 배지 bg #1A7AF917 · fg #2972E8 · 10px/500, 유채 군집 #4396FB(측정). 마케팅 버튼은 #FFFFFF0F 반투명 흰 면이거나 다크 pill
- 따라 하는 법: `.product-ui{--accent:#2972E8}` 처럼 강조색을 제품 UI 스코프 안에만 정의하고, 마케팅 버튼은 중립색이나 반투명 흰 면으로 칠한다
### 4. 제목·본문을 -0.02em 로 조이고 굵기를 700과 400으로 나눈다
- 수치: h1·h2·h3·body·small·button·nav 자간 전부 -0.02em, display 만 0em(측정). 제목 700 · 본문 400 · 버튼 500, h2 48px 대 본문 16px = 3:1, keep-all 100%(측정)
- 따라 하는 법: `body{letter-spacing:-0.02em;word-break:keep-all}` `h1,h2,h3{font-weight:700}` `p{line-height:1.6}`. 12px 미만 글자는 -0.01em

## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | Toss Product Sans OTF (전용 webfont, 글자 96%) | 측정 | display·제목·본문·버튼·내비 공용. 폴백 -apple-system, 숫자 SF Mono 1% |
| display | 80px · 700 · 1.2 · 0em (×3) | 측정 | 히어로 영상 위 헤드라인 한 줄. 자간 0 은 이 역할뿐 |
| h2 · h3 · body | 48/36px · 1.28 / 20/18px · 1.48 / 16/14px · 400 · 1.6, 제목 700, 전부 -0.02em | 측정 | 장면 제목 · 카드 제목 · 회색 본문. h1 32/40px 은 장면 안 소제목, small 12/10px |
### 5.2 색 (Color)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg · surface · bg-inverse | #FFFFFF 76% · #F5F5F5 22% · #000000 2% | 측정 | 장면 배경. 회색 장면 #F3F3F3 |
| text · text-muted | #727780 (글자 36%) · #8F959E | 측정 | 회색 본문이 기본. 중립은 cool, hue 258–262 |
| accent | 없음 (monochrome) · 제품 UI 안에서만 #2972E8 on #1A7AF917 | 측정 | 마케팅 영역에 유채 강조가 없다 — 무브 3 |
| 대비 | text/bg 4.5 · text/surface 4.13 · muted/bg 3.02 | 파생 | 본문이 AA 경계값이다. 회색 면 위에서는 이미 미달 |
### 5.3 간격·레이아웃 (Space & Layout)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 섹션 상하 여백 | D 200px (중앙값) · M 42px | 측정 | M 은 sticky 장면을 짧게 펼친 구조 탓에 작게 잡혔다. 그대로 쓰지 않는다 |
| 컨테이너 · 거터 | max-width 1408px (1440에서 좌우 16px) · 거터 D 32 / M 20px | 측정 | 기준 단위 없음(adherence 0.63) |
| 밀도 | airy, 첫 화면 빈 칸 85% | 파생 | 첫 화면 텍스트는 헤드라인 하나 |
### 5.4 형태·깊이 (Shape & Depth)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius | 버튼 pill (66%) · 카드 24 / 큰 surface 카드 48 · 영상 프레임 32 · 배지 5 | 측정 | very-rounded, 위계마다 다르다 |
| 그림자 | sm `rgba(2,32,71,.05) 0 6px 30px` · md `rgba(59,96,145,.1) 0 12px 24px` | 측정 | 청색 tint, 넓고 옅다. 테두리 사용 low |
### 5.5 모션 (Motion)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 · easing | 250 / 300 / 450ms · `ease` · keyframe 0개 · lenis·lottie | 측정 | 움직임은 스크롤 진행률이 만든다 |
| reduced-motion | 측정 실패: 교차 출처 CSS 라 확인 불가 | — | 따라 할 때는 반드시 구현한다(MO-4) |
### 5.6 이미지·아이콘 (Imagery & Icons)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 종류 | 실사 영상(휴대폰을 쓰는 인물) + 실제 제품 UI 목업 + 스튜디오 제품 사진. 영상 6 · 캔버스 4 · 아이콘 19 | 추정 | 개수는 측정. 일러스트·3D 없음, 자연광·저채도 톤 |

## 6. 컴포넌트 (Components)
- 내비: 높이 D 64 / M 56px, fixed, 투명, 테두리 없음. 링크는 ghost 16px/500 #333840, 좌우 패딩 12. 오른쪽 언어 선택 outline pill(높이 31, #4E4D4C70 1px) + 회색 pill CTA, 모바일은 햄버거(측정, CTA 모양은 추정)
- 장면 CTA(다크): pill 높이 약 48, 16px/600 흰 글자 + 오른쪽 흰 원(약 28px) 안 검정 화살표, 면 #FFFFFF 10–20% 반투명(추정)
- 카드: 상품·위젯 폭 271–291 · radius 24 · 흰 면 · 그림자 sm / 큰 surface 카드 폭 398 · radius 48 / 대시보드 radius 22 · 그림자 md(측정)
- 배지·칩(제품 UI 안): 배지 높이 18 · 좌우 5 · radius 5 · #1A7AF917 / #2972E8 · 10px/500, 다크 칩 높이 19 · 13px/500 · #E8EBF0CC · 경계 #FFFFFF21(측정). 입력 없음. hover·focus 는 측정 실패: 정적 캡처

## 7. 페이지 구조 (Page Anatomy)
| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 왼쪽, 링크 6, 오른쪽 언어 + pill CTA, 64px fixed 투명 | bg | |
| 2 | hero-media | 16px 인셋 영상 프레임(r32) + 흰 헤드라인 한 줄, 버튼 없음. 프레임이 줄며 다음 장면으로 | 사진 | 9,765px 장면. 엔진 hero-centered 를 정정 |
| 3 | feature-grid(3) | 가운데 h2 + 흐린 용어 구름, 검정 패널 3장을 gap 0 띠로, 아래 h3 + 본문 3열 | bg (패널 inverse) | 엔진 media-text 를 정정 |
| 4 | feature-alternating (sticky) | 왼쪽 휴대폰 목업 고정, 오른쪽 1px 세로선 + 단계 텍스트 교체, 이어서 격자 바탕의 떠 있는 상품 카드 | bg → surface | 14,717px |
| 5 | media-text · text-block | 대시보드 카드 + 텍스트, 2열 텍스트 블록 | surface | text-block 은 캡처 때 대부분 비어 있었다 |
| 6 | feature-alternating (sticky, dark) | 순검정 바탕 왼쪽 pill 배지 + h2 + pill CTA 2, 오른쪽 결제 단말 사진, 실내 사진 장면으로 전환 | bg-inverse → 사진 | 11,300px, 텍스트 crossfade |
| 7 | gallery | 파스텔 그라데이션 위젯 타일(r32) 격자, 가장자리 흐림, 아래 왼쪽 h2 + 본문 | bg | 엔진 footer 에서 분리 |
| 8 | footer | 링크 4열 + 사업자 정보, 바닥에 화면 폭 거대 라틴 워드마크 | 흐린 그라데이션 사진 | aurora-gradient |

모바일: 페이지가 50,718 → 21,739px(43%)로 줄어 sticky 장면을 짧게 펼친다. 히어로 영상은 세로로 크롭돼 화면 거의 전부를 채우고, 헤드라인은 3줄 가운데 정렬, 내비는 로고 + 햄버거 56px. 하단 고정 버튼 없음.

## 8. 따라 할 때 Do / Don't
- Do: 히어로는 radius 32px 인셋 프레임 속 실사 영상 하나와 헤드라인 한 줄로 끝내고, 버튼은 다음 장면으로 미룬다 — 무브 1
- Do: 기능마다 sticky 장면 하나(3–5개), 장면 안에서는 실제 제품 화면만 바꾸고 왼쪽에 진행 표시를 둔다 — 무브 2
- Do: 섹션은 구분선 없이 배경 명도(#FFFFFF / #F5F5F5 / #000)로 나누고 검정 장면은 한 번만 둔다. 떠 있는 카드에는 청색 tint 그림자를 준다
- Don't: 파랑 CTA·파랑 그라데이션 히어로를 만들지 않는다 — 무브 3, CO-1
- Don't: 히어로 아래 버튼 쌍을 붙이거나 모든 섹션을 fade-up 시키지 않는다. 스크롤 연출은 reduced-motion 에서 끈다 — 무브 1·2, CP-6, MO-1, MO-4
- Don't: 본문을 #727780 보다 옅게 하지 않는다. 흰 배경에서 4.5:1 경계값이다 — CO-7
- **흔한 오해**: 토스 ≠ 파랑 + 둥근 카드. toss.im 마케팅 크롬은 무채색이고(NO_ACCENT) 파랑은 제품 UI 목업 안 배지·체크에만 있다. 그림자 없는 평면도 아니다 — 카드에 넓고 옅은 청색 그림자가 있다. 토스다움은 색보다 장면 길이·인셋 프레임·-0.02em 자간에서 온다

## 9. 폰트 대체 (Font Substitutes)
| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Toss Product Sans OTF | 비공개 전용 서체 | Inter | Pretendard (1순위), Wanted Sans | 느낌은 700/400 굵기 대비와 -0.02em 에서 온다. Pretendard 에 그대로 준다 |
| SF Pro · SF Mono (폴백) | 시스템, 임베드 불가 | `system-ui` · `ui-monospace`, JetBrains Mono | Pretendard | 모노는 대시보드 숫자에만 |

## 10. 베끼지 말 것 (Don't Copy)
토스 로고·심볼과 푸터 거대 워드마크, 실사 영상·인물·단말기·상품 사진, 제품 UI 목업 화면, 위젯 타일 그래픽과 고유 아이콘, 모든 카피(문장 길이와 해요체만 옮긴다), Toss Product Sans 서체 파일. 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)
```text
minimal × kr-fintech-simple, cinematic scrollytelling. 히어로는 좌우 16px 인셋 · radius 32px 프레임 속 실사 영상 하나 + 흰 헤드라인 한 줄(80px/700/1.2), 버튼 없음. 기능마다 sticky 장면 하나(3–5개), 장면 안에서는 실제 제품 화면만 바뀐다.
섹션 여백 200px, 구분선 없이 배경 명도(#FFFFFF/#F5F5F5/#000)로 나눈다. 마케팅 영역은 무채색, 파랑 #2972E8 은 제품 UI 안 상태 배지에만. 제목·본문 -0.02em, 굵기 700/400, 본문 16px/1.6 #727780 이상 진하게, keep-all.
카드 radius 24 + 그림자 rgba(2,32,71,.05) 0 6px 30px. 금지: 파랑 CTA, 그라데이션 히어로, 버튼 쌍, fade-up 남발, 스톡 사진. reduced-motion 이면 장면을 정적으로.
```
```text
Minimal × Korean fintech-simple, cinematic scrollytelling. Hero: one real-life video in a frame inset 16px with 32px radius, a single white 80px/700 headline, no CTA. One sticky scroll scene per feature (3–5), where only the real product UI changes.
200px section spacing, no dividers: switch background value (#FFFFFF / #F5F5F5 / #000). Neutral marketing chrome; blue #2972E8 only on status badges inside product UI. Headings and body at -0.02em, weights 700/400, body 16px/1.6 no lighter than #727780.
24px card radius with a blue-tinted soft shadow. No blue CTAs, gradient heroes, CTA pairs, blanket fade-ups or stock photos. Respect prefers-reduced-motion.
```

## 부록: 화면 관찰 (Visual Read)
- 첫 화면은 내비 아래를 둥근 영상 프레임 하나가 거의 다 채우고, 흰 헤드라인 한 줄만 얹힌다. 휴대폰을 보는 인물, 자연광·저채도·회청색 톤이다.
- 스크롤하면 프레임이 줄며 다음 장면으로 넘어가고, 왼쪽 가장자리의 짧은 가로선 약 11개가 진행을 표시한다. 흰 → 회색(격자선 바탕의 떠 있는 상품 카드) → 순검정(결제 단말) → 실내 사진 → 파스텔 위젯 타일 → 흐린 그라데이션 푸터로 막이 바뀐다.
- 파랑은 제품 목업 속 배지·체크에서만 보여 시선이 제품 화면으로 모인다.

## 부록: 측정 메모 (Capture Notes)
- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2, 신뢰도 high. 경고: NO_ACCENT · SECTIONS_EMPTY · SLICES_SAMPLED(57화면 중 10장) · RAW_TRIMMED, 첫 캡처는 NETWORK_BUSY(영상 스트리밍)도 있었다. 타이포는 고친 엔진으로 같은 날 다시 쟀다: 히어로 헤드라인이 display 80px · 700 · 1.2 · 0em 로 측정됐다(첫 캡처는 72–80px 추정).
- 눈으로 고친 것: 엔진 hero-centered → hero-media, media-text → feature-grid(3), content-list(3) → feature-alternating(sticky), unknown → feature-alternating(sticky, dark), footer → gallery + footer 분리, 장면 사이 90px 빈 자리 제외. 지시처럼 보이는 문자열은 없었다.
- 근거 비율: 값이 있는 토큰 행 14개 = 측정 11 · 파생 2 · 추정 1 → 79 / 14 / 7%. 측정 실패 1행(reduced-motion)은 뺐다.
