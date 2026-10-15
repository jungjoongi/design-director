---
schema: dd.profile/1
slug: notion
name: Notion
input_type: url
source: https://www.notion.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: none
recapture: null
styles: {primary: corporate-clean, secondary: playful-illustrative, treatments: []}
structure: "announcement-bar → nav → hero-product → logo-cloud → bento-grid → testimonials(3) → cta-band → footer"
evidence: {measured: 80, declared: 0, derived: 13, estimated: 7, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
bundled: true
verified: 2026-10-15 maintainer spot-check
---

# Notion — Reference Profile

## 1. 본질 (Essence)
협업 도구를 고르는 팀을 위해 96px 로 조인 헤드라인 속 상태 칩, 실제 워크스페이스 화면과 그 가장자리에 걸친 흑백 펜 드로잉으로 정밀한데 사람 손이 닿은 작업 공간 느낌을 만든다.

## 2. 스타일 분류 (Classification)
- primary: `corporate-clean` — 브랜드 파랑 1색 #0075DE 는 주 CTA 에만, radius 버튼 8 / 카드 12 두 단계, 1px 경계 + 옅은 다겹 그림자, 히어로·기능 섹션 모두 실제 제품 UI(이미지 47%, 측정). 단 중립은 차가운 회색이 아니라 따뜻한 회색(text-muted hue 68)이다
- secondary: `playful-illustrative` — 제품 프레임 가장자리에 걸친 흑백 펜 드로잉 캐릭터, 헤드라인 속 pill 칩. 단 범위 밖: 일러스트가 흑백 잉크 선뿐(다색 아님), radius 8–12(범위 12–32 의 아래 끝), 탄성 모션 없음(200ms ease-in)
- treatments: 없음 — 그라데이션 3개(면적 9%)는 오로라 면이 아니라 페이드이고 글자 그라데이션 0, backdrop blur 1곳뿐
- 축: 밀도 3 · 온도 3 · 채도 2 · 대비 4 · 둥긂 3 · 장식 3

## 3. 무드 키워드 (Mood)
손그림이 섞인 정밀함 (hand-drawn precision) · 따뜻한 무채색 (warm neutral) · 제품이 증거인 (product-as-proof) · 큰 글자로 단정한 (big-type confidence) · 문서처럼 차분한 (document-calm) · 장난기 한 방울 (a dash of whimsy)

## 4. 시그니처 무브 (Signature Moves)
### 1. 히어로 헤드라인 하나만 96px 로 키우고 -0.048em 으로 조인다
- 수치: 히어로 h1 96px · 600 · 1.04 · -0.048em(측정, 스팟체크), 섹션 h2 54px/1.04/-0.035em · 본문 18px(측정) → display:본문 5.3:1(파생)
- 따라 하는 법: `font-size:clamp(3rem,1.9rem + 4.6vw,6rem);line-height:1.02;letter-spacing:-0.035em;font-weight:700;text-wrap:balance` h2 는 `clamp(2rem,1.489rem + 2.095vw,3.375rem)`. 한글은 -0.02 ~ -0.03em, 행간 1.15 이상, 굵기 600
### 2. 헤드라인 속 단어 하나를 제품의 상태 칩으로 바꾼다
- 수치: 칩 bg #D0F4D8 · radius 9999 · padding 8/28px · 폭 244px(측정), 점 지름 약 32px 초록(추정). 글자색은 그대로 둔다
- 따라 하는 법: `.chip{display:inline-flex;align-items:center;gap:.3em;padding:.08em .3em;border-radius:9999px;background:#D0F4D8}` 내 제품에 실제로 있는 상태·태그·멘션 모양만, 한 페이지에 한 번만 쓴다. 없으면 단순 하이라이트(TY-1)가 된다
### 3. 실제 제품 화면을 가장 옅은 그림자로 띄우고 흑백 펜 드로잉을 가장자리에 걸친다
- 수치: 프레임 폭 960px · radius 8 · 1px rgba(0,0,0,.1) · 그림자 5겹, 각 알파 0.008–0.024, 최대 blur 28px(측정). 캐릭터 2개가 프레임 선을 넘는다(추정)
- 따라 하는 법: `box-shadow:0 .67px 3.5px rgba(0,0,0,.008),0 2.9px 7.3px rgba(0,0,0,.016),0 7.2px 14.5px rgba(0,0,0,.02),0 13.9px 28.3px rgba(0,0,0,.024)` 일러스트는 `position:absolute` 로 모서리에 약 -40px 걸친다. 고유 손그림이 없으면 화면만 둔다
### 4. 크롬은 따뜻한 무채색으로 끝내고, 색은 주 CTA 와 제품 데이터에만 둔다
- 수치: bg #FFFFFF 77% · surface #F9F9F8 15% · band #F6F5F4 · text-muted #615D59(hue 68) · accent #0075DE · 보조 #E6F3FE 위 #005BAB(측정)
- 따라 하는 법: `--surface:#F9F9F8;--band:#F6F5F4;--muted:#615D59;--text:rgba(0,0,0,.9);--accent:#0075DE` 파랑은 버튼 2종에만. 제품 화면에 색이 거의 없으면 칩이나 일러스트에 색 하나를 더 허락한다
### 5. 기능 카드는 옅은 면 위에 제품 조각을 잘라 넣고 그림자를 뺀다
- 수치: 카드 bg #F9F9F8 · radius 12 · padding 24 · 그림자·테두리 없음 · 열 간격 24px(측정), 카드 제목 약 22px/700(추정)
- 따라 하는 법: `.card{background:#F9F9F8;border-radius:12px;padding:24px 24px 0;overflow:hidden}` 안쪽 흰 UI 패널(radius 12)을 `margin-bottom:-40px` 로 밀어 잘라 낸다. 넣을 UI 조각이 없으면 media-text 로 바꾼다

## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | NotionInter (Inter 기반 웹폰트, 글자 78%) · Lyon Text (세리프 웹폰트, 22%) | 측정 | Lyon 은 body 18px 역할, 화면 위치는 확인 못 함 |
| display · h2 | 히어로 h1 96px · 600 · 1.04 · -0.048em / h2 54/32px · 700 · 1.04 · -0.035em | 측정 | h1 값은 스팟체크 실측. cta-band 제목 42/26px · -0.036em |
| body · small · button | 18px · 400 · 1.56 (Lyon Text) / 14px · 400 · 1.43 / 16px · 500 · 1.5 | 측정 | 스케일이 12–22 와 42–96 두 덩어리(fit 0.83) |
### 5.2 색 (Color)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg · surface · band | #FFFFFF 77% · #F9F9F8 15% · #F6F5F4 | 측정 | band 는 cta-band 와 맨 위 안내 띠 |
| text · text-muted | #000000E5 (합성 #1A1A1A) · #615D59 (11%) | 측정 | 순검정이 아니라 알파 0.9. 회색은 oklch(0.48 0.008 68) |
| accent | #0075DE / fg #FFFFFF · tint #E6F3FE + 글자 #005BAB · 상태 칩 #D0F4D8 | 측정 | 파랑은 버튼 2종에만 (무브 4) |
| 대비 | text/bg 17.4:1 · muted/bg 6.53:1 · accent-fg/accent 4.57:1 | 파생 | 파랑 위 흰 글자가 AA 경계. 중립 warm, chroma 0.001–0.008 |
### 5.3 간격·레이아웃 (Space & Layout)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 섹션 여백 · 컨테이너 · 거터 | 96 / 36px (D/M) · 1184px · 106 / 16px | 측정 | 모바일에서 크게 줄인다 |
| 그리드 · 정렬 | 열 4 · 3 · 2, gap 24 / 12px · 히어로·cta-band 가운데, 나머지 왼쪽 | 측정 | bento 2열, 카드 안쪽 여백 24 |
| 밀도 | balanced, 첫 화면 빈 칸 49% | 파생 | 기준 단위 없음(adherence 0.7) |
### 5.4 형태·깊이 (Shape & Depth)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius | 버튼 8 · 카드·이미지 12 · 제품 프레임 8 · 내비 ghost 4 · pill 11% | 측정 | pill 은 칩·언어 선택·원형 버튼 |
| 테두리 | 1px rgba(0,0,0,.1) (합성 #E5E5E5) · 사용 medium | 측정 | 내비 아래, 제품 프레임. 선언 변수 #00000014 대신 렌더값 |
| 그림자 | sm 4겹, 마지막 `rgba(0,0,0,.04) 0 4px 18px` (83%) · 프레임 5겹 알파 0.008–0.024 | 측정 | ring shadow 없음 (무브 3) |
### 5.5 모션 (Motion)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 · easing | 200ms 한 단계 · `ease-in` · CSS 애니메이션 2 · reduced-motion 대응함 | 측정 | 전환 80개. 따라 할 때는 ease-out 이 자연스럽다 |
### 5.6 이미지·아이콘 (Imagery & Icons)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 종류 | 실제 제품 UI 화면 + 흑백 펜 드로잉 캐릭터 2개, 흑백 고객 로고 약 18개. 사진 없음. 이미지 47% · 영상 1 · 아이콘 23개 | 추정 | 비중·개수는 측정. 일러스트도 이미지 파일이다 |

## 6. 컴포넌트 (Components)
- 주 버튼: 높이 38 · padding-x 15 · radius 8 · #0075DE · 흰 글자 16px/500 · 그림자 없음(측정 ×5). tint 보조 버튼은 같은 치수 · #E6F3FE · 글자 #005BAB, 흰 보조 버튼은 글자 #097FE8(측정)
- 내비: 흰 배경, 아래 1px 경계, 높이 약 64px, 로고 왼쪽 · 링크 4 가운데 · 로그인 텍스트 + 주 버튼 오른쪽(추정 — 엔진 nav 는 언어 안내 띠를 잡았다). 링크는 ghost 높이 36 · padding-x 10 · radius 4 · 16px/400(측정). 모바일은 로고 + 주 버튼 + 햄버거
- 카드(bento): 폭 602 · radius 12 · #F9F9F8 · padding 24 · 테두리·그림자 없음, 안쪽 흰 UI 패널 radius 12(측정), 오른쪽 위 검정 원형 화살표 약 32px(추정)
- 제품 프레임 · 칩: 프레임 폭 960 · radius 8 · 1px border · 5겹 그림자 / 상태 칩 폭 244 · padding 8/28 · pill · #D0F4D8(측정). 입력·배지 없음, hover·focus 는 측정 실패: 정적 캡처

## 7. 페이지 구조 (Page Anatomy)
| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | announcement-bar | 언어 전환 안내 한 줄, 높이 약 30–44px | band | ko-KR 로케일에서만 뜨는 띠. 엔진 nav 를 정정 |
| 2 | nav | 로고 왼쪽, 링크 4 가운데, 로그인 + 주 버튼 오른쪽, 아래 1px 경계 | bg | 엔진 미분리 |
| 3 | hero-product | 가운데 정렬 h1 96px 2줄 + 칩, 리드 1줄, 버튼 2, 아래 960px 제품 프레임 + 펜 드로잉 2개 | bg | |
| 4 | logo-cloud | 회색 캡션 1줄 + 흑백 로고 약 9개 × 2줄 | bg | 엔진 미분리(히어로 안) |
| 5 | bento-grid | h2 54px 왼쪽 + 2열 카드(#F9F9F8, radius 12), 카드마다 라벨·제목·원형 화살표 + 잘린 UI 조각 | bg | 엔진 media-text(0.63)를 정정 |
| 6 | testimonials | h2 54px + 3열 고객 사례(로고·링크) | bg | 엔진 alt 를 따름, 화면 미확인 |
| 7 | cta-band | 가운데 h2 42px + 버튼 2 | band | 진한 면이 아니라 옅은 따뜻한 회색 |
| 8 | footer | 4열 링크 + 언어 선택 pill + 쿠키 설정 | bg | |

리듬: 여백 96/36, 흰 배경이 길게 이어지고 맨 위 띠와 cta-band 만 #F6F5F4. 구획은 여백과 정렬 전환(가운데 → 왼쪽 → 가운데)이 맡는다. 모바일: 로고 + 주 버튼 + 햄버거, bento 2열 → 1열(UI 조각은 제목 아래), footer 4열 → 2열, h2 54 → 32px, 여백 96 → 36px.

## 8. 따라 할 때 Do / Don't
- Do: 히어로 h1 하나만 96px / -0.035em 으로 키우고 섹션 h2 는 54px 로 한 단계 낮춘다. 한글은 -0.02 ~ -0.03em, 행간 1.15 이상, keep-all — 무브 1
- Do: 제품 화면은 실제 UI 를 1x 로 두고, 프레임은 1px 경계 + 알파 0.03 이하 다겹 그림자, 가장자리 손그림은 2개 이하로 — 무브 3
- Do: 기능 카드는 #F9F9F8 면 + radius 12 + 그림자 없이, 아래로 잘린 UI 조각으로 채운다 — 무브 5
- Don't: 헤드라인 칩을 색 span 하이라이트로 흉내 내거나 제품에 없는 칩을 만들지 않는다 — 무브 2, TY-1
- Don't: 프레임에 rgba(0,0,0,.1) 한 겹 shadow-md 를 쓰거나 펜 드로잉 자리를 스톡·3D 일러스트로 채우지 않는다 — 무브 3, SH-2, IC-3
- Don't: 파랑을 아이콘·배지·링크로 넓히거나 카드에 테두리 + 그림자 + 채움을 모두 얹지 않는다 — 무브 4·5, CO-5, SH-5
- **흔한 오해**: Notion ≠ 흑백 손그림 문서 화면. 홈은 corporate-clean 으로 측정됐다: 파랑 #0075DE 주 CTA, radius 8/12, 다겹 그림자, 이미지 47% 가 실제 제품 UI 다. 손그림은 히어로 프레임 가장자리 2개뿐이다
- **흔한 오해**: Notion 의 회색은 차가운 slate 가 아니라 따뜻한 회색(#615D59 · #F9F9F8, hue 68)이고, 글자는 순검정이 아니라 알파 0.9 다

## 9. 폰트 대체 (Font Substitutes)
| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| NotionInter (Inter 기반 웹폰트) | 엔진 unknown — 사이트 전용 컷으로 보고 파일을 쓰지 않는다 | Inter (OFL) | Pretendard | 한 패밀리로 끝난다. 96px 한글은 700 → 600 이나 크기 10% 줄여 같은 무게로 |
| Lyon Text (세리프 텍스트) | 유료 상용 | Newsreader | Noto Serif KR | 한글 페이지는 본문을 Pretendard 로 두고 세리프는 인용에만 |

## 10. 베끼지 말 것 (Don't Copy)
Notion N 로고·워드마크, 흑백 펜 드로잉 캐릭터(흑백 · 균일한 잉크 선 · 2개 이하라는 규칙만 옮긴다), 워크스페이스 스크린샷과 그 안의 데이터, 고객사 로고 띠와 사례, 모든 카피와 히어로 칩 안의 단어, NotionInter·Lyon Text 폰트 파일. 따뜻한 무채색 + #0075DE + 가운데 96px 히어로 + 펜 드로잉을 한꺼번에 가져오면 Notion 으로 오인되니 무브 2–3개만 고른다. 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)
```text
corporate-clean 에 손그림 한 방울을 얹은 랜딩. 히어로는 가운데 정렬, h1 96px/1.02 자간 -0.035em 굵기 700, 문장 속 단어 하나를 제품의 상태 칩(pill #D0F4D8 + 초록 점)으로 한 번만 바꾼다.
아래에 실제 제품 UI 를 960px 프레임에 1x 로: radius 8, 1px rgba(0,0,0,.1), 4–5겹 그림자 각 알파 0.03 이하, 가장자리에 흑백 펜 드로잉 2개만.
중립은 따뜻하게(#FFFFFF / #F9F9F8 / #615D59 / rgba(0,0,0,.9)), 파랑 #0075DE 는 주 버튼만. 기능은 h2 54px 왼쪽 정렬 + #F9F9F8 radius 12 카드 2열, 그림자 없이 UI 조각을 아래로 잘라 넣는다.
금지: 보라 그라데이션, shadow-md, 색 span 강조, 스톡·3D 일러스트, 대문자 eyebrow.
```
```text
Corporate-clean landing with a dash of hand-drawn whimsy. Centered hero, 96px/1.02 h1 at -0.035em, weight 700; swap one word for a product status chip (pill #D0F4D8 with a green dot), once.
Real product UI at 1x in a 960px frame: radius 8, 1px rgba(0,0,0,.1), 4–5 layered shadows each under 0.03 alpha, two black ink-line characters overlapping its edges.
Warm neutrals (#FFFFFF / #F9F9F8 / #615D59), blue #0075DE on the primary button only. Features: left-aligned 54px h2, 2-column #F9F9F8 cards (radius 12, no shadow) with cropped UI.
No purple gradients, shadow-md, colored word highlights, stock or 3D illustrations, uppercase eyebrows.
```

## 부록: 화면 관찰 (Visual Read)
- 첫 화면은 가운데 정렬이다. 아주 큰 헤드라인 2줄이 화면 폭의 약 66%를 채우고, 둘째 줄 단어 하나가 민트 pill + 초록 점 안에 들어가 제품의 상태 칩처럼 보인다. 아래로 검정 리드 1줄, 파랑 채움 버튼과 옅은 파랑 tint 버튼이 붙는다.
- 실제 워크스페이스 화면(사이드바 + 칸반)이 960px 프레임에 있고, 프레임 밖으로 흑백 펜 드로잉 캐릭터(왼쪽 아래 인물, 오른쪽 위 얼굴 낙서)가 걸친다. 정밀한 UI 와 손그림 잉크 선이 겹치는 게 첫인상의 핵심이다.
- 마케팅 크롬은 거의 무채색이고 유채색은 파랑 버튼과 제품 화면 속 태그뿐이다. 히어로 다음 h2 부터 왼쪽 정렬로 바뀌고, 섹션 사이 구분선은 보이지 않는다.

## 부록: 측정 메모 (Capture Notes)
- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2, 로케일 ko-KR(쿠키 창·언어 안내 띠가 보였고 본문은 en-us). 경고: RAW_TRIMMED. 1차 캡처에서 쿠키 동의 창이 숨겨지지 않아 `--hide` 로 desktop 만 다시 찍었고 측정값은 같았다. 슬라이스가 1장뿐이라 섹션 6–8 은 구조 데이터로만 적었고, 모바일 첫 화면에는 히어로가 없어 모바일 히어로 값은 비웠다.
- 눈으로 고친 것: 엔진 role h1(42px)은 cta-band 제목이라 히어로 h1 은 구조의 heading size 96px 에서 가져왔다. nav(0.95) → announcement-bar, media-text(0.63) → bento-grid, logo-cloud(0.8) → testimonials(엔진 alt, 화면 미확인), summary 의 link #FFFFFF 는 오인으로 보고 버렸다. 지시처럼 보이는 문자열은 없었다.
- 근거 비율: 값이 있는 토큰 행 15개 = 측정 12 · 파생 2 · 추정 1 → 80 / 13 / 7%.
