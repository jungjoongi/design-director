---
schema: dd.profile/1
slug: stripe
name: Stripe
input_type: url
source: https://stripe.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: none
recapture: null
styles: {primary: corporate-clean, secondary: null, treatments: [aurora-gradient]}
structure: "nav → hero-media → logo-cloud → bento-grid → media-text → stats(4) → media-text → carousel → media-text → media-text → stats(2) → feature-grid(3) → carousel → media-text → cta-band → footer"
evidence: {measured: 79, declared: 0, derived: 14, estimated: 7, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
bundled: true
verified: 2026-10-15 maintainer spot-check
---

# Stripe — Reference Profile

## 1. 본질 (Essence)
결제 인프라를 고르는 개발자와 기업을 위해 300 굵기의 투톤 헤드라인, 컨테이너 가장자리의 1px 안내선, 히어로 한 곳에서 화면 밖으로 흘러나가는 브랜드 리본 그라데이션 하나로 정밀하게 설계됐지만 차갑지 않은 금융 인프라 인상을 만든다.

## 2. 스타일 분류 (Classification)
- primary: `corporate-clean` — 브랜드 1색 #533AFD 를 버튼·링크·아이콘에 쓰고, 회청 중립(hue 248–258)에 1px 테두리를 많이 쓴다(측정). 섹션마다 레이아웃이 다르다(bento·carousel·media-text·stats). 단 헤드라인 굵기 300 과 radius 4–6px 은 범위(600–700, 6–12px) 밖
- secondary: 없음 — 보이는 1px 격자선(무브 4)은 swiss 장치지만 h1 48px 로 크기 대비가 약하고(swiss 72–160px) 그라데이션을 써서 secondary 로 두지 않는다
- treatments: `aurora-gradient` — 히어로 리본 하나, 그라데이션 13개 · 면적 13%(측정). 카탈로그(흐린 블롭)와 달리 가장자리가 선명한 대각선 띠이고, 흐림 대신 화면 밖으로 넘친다
- 축: 밀도 3 · 온도 2 · 채도 3 · 대비 3 · 둥긂 2 · 장식 3

## 3. 무드 키워드 (Mood)
설계도 같은 정밀함 (blueprint precision) · 가는 획의 권위 (light-weight authority) · 회청색으로 차분한 (slate-calm) · 빛 한 줄기 (a single luminous ribbon) · 증거 중심 (proof-first) · 엔지니어링된 신뢰 (engineered trust)

## 4. 시그니처 무브 (Signature Moves)
### 1. 브랜드 리본 그라데이션 한 줄기를 히어로에서 화면 밖으로 흘려보낸다
- 수치: 그라데이션 13개 · 면적 13%, canvas 13개(측정), 강조 그라데이션 변수 #BDB4FF → #643AFD → #533AFD(선언), 리본은 주황→분홍→보라→하늘 4색 · 첫 화면 높이의 약 85%(추정)
- 따라 하는 법: 히어로에 `overflow:clip`, 리본은 SVG path 를 브랜드 hue 3–4개 `linearGradient` 로 채워 `position:absolute;right:-10vw;height:110%`. 다른 섹션은 같은 팔레트를 채도를 낮춰 일러스트 안에만. hue 폭 90° 미만(보라·파랑뿐)이면 CO-1 이 된다
### 2. 헤드라인을 두 명도로 이어 쓴다
- 수치: 앞 문장 #061B31(bg 대비 17.37:1) / 뒤 문장 #50617A(6.3:1), 다크 면은 #FFFFFF / #839BC8 계열(색 측정, 문장 대응은 추정). h1·h2·다크 h2·feature 리드 등 6곳 이상 반복
- 따라 하는 법: `<h2><span>앞 문장.</span> <span class="rest">뒤 문장.</span></h2>` `.rest{color:var(--text-muted)}` 크기·굵기는 그대로 둔다. 두 문장 합쳐 한글 60자 안쪽
### 3. 헤드라인과 본문을 모두 300 굵기로 가볍게 쓴다
- 수치: h1 48px/1.15/-0.02em · h2 32px/1.1/-0.02em · h3 26px/1.12/-0.01em · 본문 16px/1.4, 모두 300 · 버튼만 400(측정). 한 가변 서체가 글자의 98%
- 따라 하는 법: `h1,h2,h3{font-weight:300;letter-spacing:-0.02em;text-wrap:balance}` `body{font-weight:300}` `button{font-weight:400}` 한글 본문·짙은 배경 위 본문·12px 미만은 400 으로 올린다
### 4. 컨테이너 가장자리에 1px 안내선을 페이지 끝까지 긋는다
- 수치: 1px #E5EDF5(측정, 테두리 둘레 68%), 컨테이너 1266px(측정) → 안내선 x ≈ 87px(파생), bg 대비 약 1.2:1. 모바일에는 세로선이 없다
- 따라 하는 법: `.page{max-width:1266px;margin-inline:auto;border-inline:1px solid #E5EDF5}` `section+section{border-top:1px solid #E5EDF5}` 콘텐츠는 선에서 16px(거터) 안쪽에서 시작한다. 선이 콘텐츠 시작선과 어긋나면 LA-4
### 5. 모서리를 4–6px 로 거의 각지게 묶고 인디고는 행동에만 쓴다
- 수치: radius 버튼·배지 4 · 카드·이미지 6, pill 4%(측정), accent #533AFD · accent-fg 대비 6.19:1, 보조 테두리 #B9B9F9 · 옅은 인디고 #E8E9FF(측정)
- 따라 하는 법: `--radius-control:4px;--radius-surface:6px;--accent:#533AFD` 주 버튼만 인디고 면, 보조 버튼은 `border:1px solid #B9B9F9;color:#533AFD`. 섹션 배경·아이콘 타일로 넓히면 리본과 색이 다툰다

## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | sohne-var (Söhne 가변, 상용, 글자 98%) · SourceCodePro (OFL, 2%) | 측정 | 모노는 다크 섹션 코드 목업에만 |
| h1 · h2 · h3 | 48/34px · 1.15 · -0.02em / 32/22px · 1.1 · -0.02em / 26/20px · 1.12 · -0.01em, 모두 300 | 측정 | 투톤 머리 (무브 2·3). h1 `clamp(2.125rem, 1.8rem + 1.333vw, 3rem)` |
| body · button | 16px · 300 · 1.4 · 0em / 16px · 400 · 1 | 측정 | 400 은 버튼에만. 스케일 1.25 (fit 0.77), eyebrow 없음 |
### 5.2 색 (Color)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg · surface · bg-inverse · border | #FFFFFF 80% · #F8FAFD 6% · #0D1738 (보조 #122054) · #E5EDF5 (둘레 68%) | 측정 | 다크 면은 개발자 섹션 약 2,340px. #E5EDF5 는 옅은 면이자 안내선 |
| text-strong · text · muted | #061B31 · #50617A (글자 38%) · #64748D (10%) | 측정 | #061B31 은 엔진 역할 link, 화면에선 헤드라인 앞 문장 색 |
| accent | #533AFD / fg #FFFFFF · quiet #E8E9FF · 보조 테두리 #B9B9F9 | 측정 | 버튼·링크·아이콘에만 (무브 5) |
| 그라데이션 | 13개 · 면적 13% · 글자 그라데이션 0, 변수 #BDB4FF → #643AFD → #533AFD | 측정 | 리본 4색은 canvas 라 추정 (무브 1) |
| 대비 | heading/bg 17.37:1 · text/bg 6.3:1 · accent-fg/accent 6.19:1 · text/surface 5.33:1 | 파생 | 중립 cool, hue 248–258 |
### 5.3 간격·레이아웃 (Space & Layout)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 섹션 여백 · 컨테이너 · 거터 | 93 / 55px (D/M 중앙값) · max-width 1266px · 16px | 측정 | 기본값 범위. 구획은 여백보다 안내선이 맡는다. 기준 단위 4px |
| 안내선 · 밀도 | x ≈ 87 / 1353px @1440 · airy, 첫 화면 빈 칸 62% | 파생 | 아래로 갈수록 카드·텍스트가 촘촘해진다 |
### 5.4 형태·깊이 (Shape & Depth)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius | 버튼·배지 4 · 카드·이미지 6 · pill 4% | 측정 | soft, 단계 4 / 5 / 6 |
| 그림자 | sm `rgba(23,23,23,.06) 0 3px 6px` · md `rgba(23,23,23,.08) 0 15px 35px` · xl `rgba(3,3,39,.25) 0 14px 21px -14px` + `rgba(0,0,0,.1) 0 8px 17px -8px` | 측정 | 요소 17개뿐. 목업·떠 있는 카드에만, 나머지는 테두리 |
### 5.5 모션 (Motion)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 · easing | 300 / 300 / 800ms · `cubic-bezier(0.25, 1, 0.5, 1)` · CSS 애니메이션 3개 | 측정 | 전환 455개, 끝이 길게 감속. 히어로 리본은 canvas 로 움직인다(추정) |
| reduced-motion | 측정 실패: 교차 출처 CSS 라 확인 불가 | — | 따라 할 때는 리본·마키를 멈춘다(MO-4) |
### 5.6 이미지·아이콘 (Imagery & Icons)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 종류 | 그라데이션·입자 일러스트, 실제 제품 UI 조각, 고객사 브랜드 이미지, 실사는 2–3곳. 이미지 29% · canvas 13 · 아이콘 138개 | 추정 | 비중·개수는 측정. 아이콘은 40px 테두리 상자 안 약 20px 인디고 선 |

## 6. 컴포넌트 (Components)
- 주 버튼: 높이 48 · padding-x 24 · radius 4 · #533AFD · 흰 글자 14–16px/400 · 그림자 없음(측정). 히어로 보조 버튼은 같은 치수에 흰 65% 면(#FFFFFFA6) + 1px #B9B9F9 + 글자 #533AFD(측정)
- outline · 아이콘 버튼: outline 높이 48 · 1px #B9B9F9 · 글자 #533AFD / 캐러셀 화살표 높이 40 · radius 4 · #E8E9FF(측정). 텍스트 링크는 #533AFD 16px + ›, 밑줄 없음(추정)
- 내비: 높이 76 / 66 · static · 투명, 로고 + 드롭다운 링크 4 + 가격, 오른쪽 로그인 + 주 CTA, 모바일은 56px 흰 사각 햄버거(측정 + 화면)
- 카드(bento): radius 6 · 1px #E5EDF5 · 흰 바탕, 위 h3 + 오른쪽 위 확장 아이콘, 아래 2/3 는 일러스트·제품 UI(radius 측정, 구성 추정). 입력 없음, hover·focus 는 측정 실패: 정적 캡처

## 7. 페이지 구조 (Page Anatomy)
| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 + 링크 5 왼쪽, 로그인 + 주 CTA 오른쪽, 76px static | bg (투명) | |
| 2 | hero-media · logo-cloud | 왼쪽 h1 4줄 투톤 + 실시간 지표 한 줄 + 버튼 2, 오른쪽 리본이 화면 밖으로. 아래 로고 8개 72px 띠, 위아래 1px | bg + 리본 | 엔진이 hero 에 묶은 logo-cloud 를 분리 |
| 3 | bento-grid | 투톤 h2 아래 크기가 다른 타일(2+1 / 3열), 타일마다 제품 UI·일러스트 | bg | 엔진 faq(6)을 정정 |
| 4 | media-text · stats(4) | 컨테이너 폭 사진 배너 + 흰 h2·버튼 오버레이, 이어서 가운데 h2 + 4열 숫자 48px(첫 숫자만 진함) | 사진 → surface | |
| 5 | media-text · carousel | 2열 머리(h2 + 버튼 / 회청 본문) + 넓은 사진, 3:4 고객 스토리 카드가 오른쪽으로 넘침, 그라데이션 위 제품 화면 + 3열 | bg | 엔진 faq(4)를 나눴다 |
| 6 | media-text · stats(2) · feature-grid(3) | 투톤 h2 + 점 격자 노드 다이어그램, 숫자 2개, 목업 카드 3열(채팅·앱 격자·코드) | bg-inverse | 약 2,340px, 엔진 stats(2)를 나눴다 |
| 7 | carousel · media-text | 너비가 다른 뉴스 카드 + 화살표, 책 표지 면 + surface 카드 | bg | |
| 8 | cta-band · footer | 2열 짧은 제목 + 버튼 2, 링크 4–5열 + 지역 선택 | surface | 엔진 text-block 을 정정 |

리듬: 섹션 여백 93/55px, 명도가 바뀌는 곳은 stats · 개발자 섹션 · CTA·푸터 세 군데이고 그사이는 1px 안내선이 나눈다. 모바일: 리본이 화면 위쪽 대각선으로 옮겨 h1 뒤를 덮고, 버튼 2개는 전체 폭으로 쌓인다. 세로 안내선은 사라지고, stats 4열 → 2열, bento·feature-grid 는 1열, 페이지는 14,803 → 20,443px.

## 8. 따라 할 때 Do / Don't
- Do: 히어로 한 곳에만 브랜드 hue 3–4개로 만든 선명한 리본을 두고 화면 밖으로 넘긴다 — 무브 1
- Do: 섹션 머리는 같은 크기·같은 굵기로 진한 앞 문장 + 회청 뒷문장으로 쓰고, 헤드라인·본문은 300, 버튼만 400 — 무브 2·3
- Do: 1266px 컨테이너 양 끝에 1px 안내선을 긋고 콘텐츠는 그 안쪽 16px 에서 시작한다. radius 는 4 / 6 두 단계 — 무브 4·5
- Don't: 리본을 흐린 보라→파랑 블롭으로 바꾸거나 섹션마다 깔지 않는다 — 무브 1, CO-1, CO-4
- Don't: 헤드라인 굵기를 600–700 으로 올리거나 뒷문장에 그라데이션을 넣지 않는다 — 무브 2·3, TY-3, TY-4
- Don't: radius 를 12–16px 로 키우고 모든 카드에 같은 그림자를 주지 않는다. 한글 본문을 300 · 1.4 그대로 옮기지 않는다 — 무브 3·5, SH-1, LA-1, KR-5
- **흔한 오해**: Stripe ≠ 보라 그라데이션 사이트. 그라데이션은 히어로 리본 한 곳에 몰려 있고 나머지는 흰 면 + 1px #E5EDF5 선 + 회청 글자의 정돈된 코퍼릿 레이아웃이다. 리본도 흐린 블롭이 아니라 선명한 대각선 띠다
- **흔한 오해**: Stripe ≠ 굵은 헤드라인. h1–h3 과 본문이 모두 300 이고, 위계는 굵기 대신 투톤 명도로 만든다

## 9. 폰트 대체 (Font Substitutes)
| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Söhne (sohne-var, 가변) | 상용 (Klim Type Foundry) | Inter, Geist | Pretendard | 300 과 -0.02em 을 그대로 옮긴다. Inter 300 은 조금 넓어 display 만 -0.025em. 한글 본문은 Pretendard 400, 행간 1.6 |
| SourceCodePro | OFL | Source Code Pro (그대로) | D2Coding 또는 Pretendard 폴백 | 코드 목업에만. 데이터 라벨로 넓히지 않는다(TY-5) |

## 10. 베끼지 말 것 (Don't Copy)
Stripe 로고·워드마크와 행사 로고·문장(紋章), 히어로 리본 렌더와 bento 의 파티클·카드 발급 일러스트(내 브랜드 hue 로 새로 만든다), 고객사 로고 띠·고객 스토리 이미지·행사·항공 사진, 대시보드·코드 에디터·다이어그램 목업, 모든 카피와 실시간 지표 문구·숫자, Söhne 폰트 파일. 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)
```text
corporate-clean + aurora-gradient 랜딩. 히어로 한 곳에만 브랜드 hue 3–4개로 만든 선명한 대각선 리본 그라데이션을 화면 오른쪽 밖으로 넘긴다.
섹션 머리는 같은 크기·굵기로 진한 앞 문장(#061B31) + 회청 뒷문장(#50617A) 투톤. 헤드라인·본문 굵기 300(h1 48px/1.15 -0.02em, h2 32px/1.1, 본문 16px), 버튼만 400, 한글 본문은 400 · 행간 1.6.
1266px 컨테이너 양 끝에 1px #E5EDF5 세로 안내선, 섹션 경계에 가로 1px. radius 버튼 4 / 카드 6, 인디고 #533AFD 는 버튼·링크·아이콘에만.
금지: 흐린 보라→파랑 블롭, 600–700 헤드라인, 그라데이션 텍스트, 12px 이상 radius, 모든 카드에 같은 그림자.
```
```text
Corporate-clean landing with one aurora treatment: a single crisp diagonal ribbon gradient (3–4 brand hues) in the hero only, bleeding off the right edge.
Two-tone section heads: same size and weight, lead sentence #061B31 then the rest in slate #50617A. Weight 300 for headlines and body (h1 48px/1.15 at -0.02em, h2 32px/1.1, body 16px); 400 for buttons only.
1px #E5EDF5 guide lines on both edges of a 1266px container plus 1px rules between sections. Radius 4 (controls) / 6 (cards); indigo #533AFD only for buttons, links and icons.
No blurred purple-blue blobs, no 600–700 headlines, no gradient text, no 12px+ radius, no identical shadow on every card.
```

## 부록: 화면 관찰 (Visual Read)
- 첫 화면은 흰 바탕 왼쪽에 h1 4줄, 오른쪽 위에서 주황→분홍→보라→하늘 리본이 h1 일부를 덮고 화면 밖으로 넘친다. 첫 화면의 유일한 고채도 면이다.
- h1 위 약 60px 에 12–14px 문장형 라벨 + 실시간 숫자 한 줄이 있다. 대문자 eyebrow 가 아니다.
- 컨테이너 양 끝(x≈88 · x≈1352)의 1px 연회색 세로선이 페이지 거의 전체를 관통하고, 다크 섹션에서도 남색 선으로 이어진다.
- 리듬은 흰 면 → 옅은 회청 stats → 흰 면 → 짙은 남색 개발자 섹션 → 흰 면 → 옅은 회청 CTA·푸터 순이다. 실사 사진은 행사 무대·항공 도로 정도로 적다.

## 부록: 측정 메모 (Capture Notes)
- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2, 로그아웃·첫 방문·en-US. 신뢰도 high(타이포 0.95 · 색 0.9 · 간격 0.82 · 구조 0.65). 경고: NETWORK_BUSY ×2(canvas·실시간 숫자) · SLICES_SAMPLED(17화면 중 10장, stats(2) 구간은 화면 미확인) · RAW_TRIMMED. 숨긴 오버레이: consent 2개(display:none).
- 눈으로 고친 것: faq(6) → bento-grid, faq(4) → media-text + carousel + media-text, stats(2) → media-text + stats + feature-grid, unknown → media-text · carousel, text-block → cta-band · footer, hero-media 에서 logo-cloud 분리. 엔진 link #061B31 은 헤드라인 앞 문장 색으로, stats 띠 bg #ffffff 는 화면상 옅은 회청 그라데이션으로 봤다. 내비 글자는 측정 18px 이지만 화면은 약 14px. 지시처럼 보이는 문자열은 없었다.
- 근거 비율: 값이 있는 토큰 행 14개 = 측정 11 · 파생 2 · 추정 1 → 79 / 14 / 7%. 측정 실패 1행(reduced-motion)은 뺐다.
