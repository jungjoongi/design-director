---
schema: dd.profile/1
slug: toss-im
name: 토스
input_type: url
source: https://toss.im/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: mixed
shots: files
recapture: null
styles: {primary: minimal, secondary: kr-fintech-simple, treatments: [glassmorphism, aurora-gradient]}
structure: "nav → hero-media → feature-grid(3) → feature-alternating(sticky) → media-text → text-block → feature-alternating(sticky, dark) → gallery → footer"
evidence: {measured: 71, declared: 0, derived: 11, estimated: 18, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
---

# 토스 — Reference Profile

## 1. 본질 (Essence)

금융을 어렵게 느끼는 일반 사용자를 위해 둥근 프레임 속 실사 영상, 스크롤에 고정된 기능 장면, 제품 화면 안에만 남긴 파랑으로 '복잡한 금융이 한 장면씩 단순해지는' 느낌을 만든다.

## 2. 스타일 분류 (Classification)

- **primary: `minimal`** — 마케팅 크롬이 무채색뿐이다(monochrome, NO_ACCENT, 측정). bg #FFFFFF 76% · surface #F5F5F5 22% · 검정 2%. 섹션 여백 중앙값 200px(측정), 첫 화면에는 메시지 하나만 있고 버튼이 없다(desktop.png).
- **secondary: `kr-fintech-simple`** — 제품 UI 조각에서만 나타난다. 큰 금액 숫자, 파랑 상태 배지 #2972E8(측정), 해요체 문장, radius 24px 흰 카드(측정). 페이지 전체의 문법은 아니다.
- **treatments: `glassmorphism`** — backdrop blur 요소 29개(측정). 어두운 장면의 반투명 UI 카드·버튼(#FFFFFF0F 면 + #FFFFFF21 1px 경계, 측정)이 사진·검정 그라데이션 위에 놓인다. **`aurora-gradient`** — 푸터 한 곳에만 흐린 청보라·분홍 그라데이션 면이 깔린다(그라데이션 19개, 면적 5%, 측정 / 위치는 추정).
- **카탈로그와 다른 점**: 카탈로그의 `kr-fintech-simple` 은 앱 화면 문법이다(파랑 CTA, 그림자 없음, 하단 고정 버튼). toss.im 메인은 그 문법을 제품 목업 안에만 두고, 바깥은 cinematic scrollytelling 마케팅으로 짰다. 파랑 CTA는 없고, 넓고 옅은 청회색 그림자를 쓰고, 검정 장면도 있다. kr-fintech-simple 파일이 "안 맞는 곳"으로 꼽은 '브랜드 스토리텔링 랜딩'이 바로 이 페이지다.
- 축: 밀도 1 · 온도 2 · 채도 1 · 대비 4 · 둥긂 4 · 장식 2

## 3. 무드 키워드 (Mood)

- 영화처럼 넘기는 (cinematic scrollytelling)
- 무채색으로 차분한 (monochrome calm)
- 실사로 일상적인 (everyday real-life footage)
- 제품이 증명하는 (product-as-proof)
- 여백이 큰 (whitespace-led airy)
- 둥글게 감싼 (soft rounded framing)
- 매끄럽게 이어지는 (seamless smooth-scroll)

## 4. 시그니처 무브 (Signature Moves)

### 1. 히어로를 둥근 프레임 속 실사 영상 하나로 채운다
- 관찰: desktop.png·mobile.png 첫 화면. 영상 프레임 하나와 그 아래쪽에 얹은 흰 헤드라인 한 줄이 전부이고, 버튼·부제·배지는 없다
- 수치: 컨테이너 max-width 1408px(측정) → 1440 뷰포트에서 좌우 16px 인셋(파생), 이미지 radius 32px(측정), 위 64px = 내비 높이(측정), 프레임 높이 약 810px = 뷰포트의 90%(추정), 영상 요소 6개(측정). 모바일은 좌우 약 18px, radius 약 40px(추정)
- 기본값과의 차이: 흔한 히어로는 h1 + 리드 + 버튼 2개에 제품 이미지를 옆이나 아래에 둔다. 이 페이지는 텍스트를 영상 위로 올리고 CTA를 0개로 줄였다. 풀블리드 대신 인셋 + radius 를 줘서 '화면 속 화면'처럼 보인다
- 따라 하는 법: `.hero{margin:64px 16px 0;height:calc(100svh - 88px);border-radius:32px;overflow:hidden;position:relative}` `.hero video{width:100%;height:100%;object-fit:cover}` `.hero h2{position:absolute;inset:auto 0 48px;color:#fff;text-align:center}`
- 깨지는 경우: 직접 찍은 실사 영상·사진이 없으면 성립하지 않는다. 스톡 사진으로 채우면 IC-4 가 된다 → 제품 화면 하나를 크게 두는 hero-product 로 바꾼다. 흰 글자 대비가 부족하면 아래쪽 40%에 `linear-gradient(transparent, rgba(0,0,0,.35))` scrim 을 깐다

### 2. 기능 하나를 한 장면으로 만들어 스크롤에 고정한다
- 관찰: overview.jpg 전체. 섹션 하나가 수천 px 동안 sticky 로 머물고, 그 안에서 영상 프레임이 줄어들거나 제품 화면·텍스트 단계가 바뀐다(desktop-02, 04, 07)
- 수치: 페이지 높이 50,718px ≈ 57화면(측정), 장면 섹션 높이 9,765 / 14,717 / 11,300px(측정), smooth-scroll 라이브러리 lenis · lottie(측정), CSS 전환 348개 · keyframe 애니메이션 0개(측정)
- 기본값과의 차이: 흔한 랜딩은 섹션 600–900px 를 쌓고 모두 fade-up 300ms 로 등장시킨다. 이 페이지는 장면 하나에 10–16화면 분량의 스크롤을 쓴다. 페이지 길이도 기본값의 5–10배다
- 따라 하는 법: `.scene{height:400vh}` `.scene__stage{position:sticky;top:0;height:100vh;overflow:clip}` 스크롤 진행률(0–1)로 장면 안 요소의 `transform`·`opacity` 만 바꾼다(`animation-timeline: view()` 또는 IntersectionObserver + rAF)
- 깨지는 경우: 장면이 5개를 넘으면 지루하고 길을 잃는다 → 3–5장면 + 왼쪽 진행 표시. `prefers-reduced-motion` 에서는 sticky 를 풀고 정적 이미지로 쌓는다(MO-4). 모바일 저사양 기기에서는 영상 장면을 포스터 이미지로 바꾼다

### 3. 마케팅 화면에서는 색을 빼고 파랑은 제품 화면 안에만 둔다
- 관찰: 마케팅 버튼·제목·내비에는 유채색이 없다. 파랑은 제품 목업 안의 상태 배지, 송금 완료 체크, 결제 버튼에서만 보인다(desktop-02, 04, 05)
- 수치: monochrome 예 · 선언된 강조 변수 없음(측정). 제품 UI 배지 bg #1A7AF917 · fg #2972E8 · 10px/500(측정), 유채색 군집 #4396FB(측정). 마케팅 버튼은 반투명 흰 #FFFFFF0F 이거나 다크 pill(측정)
- 기본값과의 차이: 흔한 핀테크 랜딩은 브랜드 파랑을 CTA·링크·아이콘·히어로 그라데이션에 모두 칠해 면적 5–10%가 된다. 여기서 파랑은 '제품이 일하는 순간'의 표시다
- 따라 하는 법: `--accent` 를 `.product-ui{--accent:#2972E8}` 스코프 안에만 정의하고, 마케팅 버튼은 `--text`(중립)나 반투명 흰 면으로 칠한다
- 깨지는 경우: 보여줄 실제 제품 화면이 없으면 페이지에 색이 하나도 없어 단조롭다 → 강조 1색을 상태 하나(완료·진행)에만 쓰는 방식으로 바꾼다

### 4. 섹션을 선이 아니라 배경 명도로 장면을 바꿔 나눈다
- 관찰: overview.jpg. 흰 → 흰 → 회색 → 검정 → 따뜻한 실내 사진 → 흰 → 그라데이션 푸터로 장면마다 배경이 바뀐다. 섹션 사이 구분선은 없다
- 수치: 장면 배경 #FFFFFF / #F3F3F3 / #000000(측정), 테두리 사용 low(측정), 섹션 여백 중앙값 D 200px(측정)
- 기본값과의 차이: 흔한 랜딩은 흰 배경을 이어 가며 hairline 으로 나누거나, 흰·옅은 회색을 기계적으로 번갈아 쓴다. 여기서는 명도 변화가 페이지를 5–6막으로 나누고, 검정 장면 한 번이 가장 큰 대비를 만든다
- 따라 하는 법: `[data-scene="light"]{background:#fff}` `[data-scene="muted"]{background:#f5f5f5}` `[data-scene="dark"]{background:#000;color:#fff}` 섹션에 `border` 를 두지 않는다
- 깨지는 경우: 장면마다 명도를 바꾸면 깜빡이는 느낌이 든다 → 같은 명도 2–3장면을 한 막으로 묶고, 검정 장면은 한 번만 둔다

### 5. 모든 글자를 -0.02em 로 조이고 굵기를 700과 400으로 나눈다
- 관찰: h1·h2·h3·본문·small 전부(summary 타이포 표)
- 수치: 자간 -0.02em, 역할 5개 전부(측정 ×56). 제목 700 · 본문 400 · 버튼 500(측정). h2 48px/1.28 대 본문 16px/1.6(측정)이라 크기 비 3:1. keep-all 100%(측정). 전용 서체가 글자의 95%(측정)
- 기본값과의 차이: 흔한 값은 자간 0에 Inter 하나, 굵기 600을 섞는다. 이 페이지는 본문까지 같은 값으로 조여 글자 덩어리가 단단하고, 중간 굵기가 없어 위계가 굵기 하나로 갈린다
- 따라 하는 법: `body{letter-spacing:-0.02em;word-break:keep-all}` `h1,h2,h3{font-weight:700}` `p{font-weight:400;line-height:1.6}`
- 깨지는 경우: 대체 서체 Pretendard 는 -0.02em 까지 괜찮지만 10px 이하 글자는 받침이 붙는다 → 12px 미만은 -0.01em. 라틴 대문자 라벨은 0 이상으로 둔다

## 5. 토큰 (Tokens)

### 5.1 타이포그래피 (Typography)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리(본문·디스플레이) | Toss Product Sans OTF (전용, webfont) | 측정 | 글자의 95%. 제목·본문·버튼 공용 |
| 시스템 폴백 | -apple-system · SF Pro Text · SF Mono | 측정 | 모노(1%)는 대시보드 숫자 |
| display (히어로 헤드라인) | 시각 약 72–80px · 700 | 추정 | 측정 h2(48px)보다 크게 보인다. 스크롤 scale 연출로 보이며 계산값이 아니다 |
| h2 | 48 / 36px · 700 · 1.28 · -0.02em | 측정 | 장면 제목. 이 페이지에서 가장 큰 제목 태그 (×17) |
| h1 | 32 / 28px · 700 · 1.4 · -0.02em | 측정 | 장면 안 소제목에 쓴다(h2보다 작다) (×6) |
| h3 | 20 / 18px · 700 · 1.48 · -0.02em | 측정 | 기능 카드·단계 제목, 2줄 (×8) |
| body | 16 / 14px · 400 · 1.6 · -0.02em | 측정 | 회색 본문 2줄 단위 (×17) |
| small | 12 / 10px · 400 · 1 · -0.02em | 측정 | 제품 UI 라벨·캡션 |
| button | 14.6 / 13px · 500 · 1.45 · 0em | 측정 | 표본 1개라 대표성 낮음 |
| 스케일 비율 | 1.25 (major third), fit 0.76 | 파생 | 단계 12–22 촘촘, 32·48 로 점프 |
| clamp | h2 `clamp(2.25rem, 1.971rem + 1.143vw, 3rem)` · body `clamp(0.875rem, 0.829rem + 0.19vw, 1rem)` | 파생 | 390→1440px 선형 |
| 줄바꿈 | keep-all 100%, text-wrap balance 없음 | 측정 | 한글 92% / 라틴 8% |

### 5.2 색 (Color)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg | #FFFFFF (76%) | 측정 | 기본 장면 |
| surface | #F5F5F5 (22%) · 장면 배경 #F3F3F3 | 측정 | 셀러·광고 장면 바탕, 큰 카드 |
| bg-inverse | #000000 (2%) | 측정 | 결제 단말·금융 기능 패널 장면. 순검정 |
| text (본문) | #727780 | 측정 | 글자 수 기준 36%. 회색 본문이 기본 |
| text-muted | #8F959E | 측정 | 보조 설명, 비활성 단계 |
| text-strong (제목) | 램프 #1C1F25–#333840 중 하나 | 추정 | 역할 배정은 화면으로 판단. 내비 링크 #333840 은 측정 |
| text-on-dark | #FFFFFF, 보조 #E8EBF0CC | 추정 | 엔진 text-inverse(#000000)는 흰 면 위 검정 글자 군집이라 다른 뜻이다. #E8EBF0CC 는 다크 칩 글자색(측정) |
| border | 1px, 사용 low · 다크 UI 경계 #FFFFFF21 | 측정 | 엔진 border #FFFFFF(73%)는 흰 면 위 흰 경계라 사실상 보이지 않는다 |
| accent | 없음 (monochrome, 선언 변수 없음) | 측정 | 마케팅 영역에 유채 강조가 없다 — 무브 3 |
| accent-fg | 측정 실패: 강조색이 없어 짝이 되는 전경색이 없다 | — | 주 버튼은 반투명 흰 면 또는 다크 pill |
| product-blue (제품 UI 안) | #2972E8 on #1A7AF917 · 군집 #4396FB | 측정 | 상태 배지·완료 체크·결제 버튼. 제품 목업 안에서만 |
| 기타 유채 | #F04251 (+ 25% 알파 #F0425140) | 측정 | 쓰인 위치를 특정하지 못했다(제품 목업 안 추정) |
| 대비 | text/bg 4.5 (AA 경계) · text-muted/bg 3.02 · text/surface 4.13 | 파생 | 본문이 AA 경계값이다. 더 옅게 하면 CO-7 |
| 중립 온도 | cool, hue 258–262 · 램프 #000000 #111317 #1C1F25 #333840 #4E535C #727780 #8F959E | 파생 | 아주 약한 청색 기운의 회색 |
| 그라데이션 | 19개, 면적 5%, 글자 그라데이션 3 | 측정 | 대부분 장면 전환 페이드·푸터. 버튼·제목엔 없음(화면 판단) |

### 5.3 간격·레이아웃 (Space & Layout)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 기준 단위 | 없음 (irregular, adherence 0.63) · 단계 3 4 5 6 8 10 11 12 14 15 16 20 24 28 | 파생 | 4px 배수가 많지만 3·5·11·15 가 섞인다 |
| 섹션 상하 여백 | D 200px / M 42px (중앙값) | 측정 | M 값은 sticky 장면을 짧게 펼친 모바일 구조 때문에 작게 잡혔다(측정 메모) |
| 장면 높이 | 9,765 / 14,717 / 11,300px · 페이지 D 50,718px / M 21,739px | 측정 | 무브 2. 모바일은 장면을 짧게 펼친다 |
| 컨테이너 | max-width 1408px (1440에서 좌우 16px) | 측정 | 히어로 프레임·패널 띠가 거의 화면 폭 |
| 텍스트 컨테이너 | 약 1,000–1,100px, 왼쪽 정렬 블록 | 추정 | 미니앱·커머스 장면 텍스트 위치 |
| 거터 | D 32px / M 20px | 측정 | |
| 그리드 | 2열 · gap D 30px / M 8px | 측정 | 금융 기능 3패널 띠는 gap 0(추정) |
| 밀도 | airy, 첫 화면 빈 칸 100% | 파생 | 첫 화면에 텍스트 블록이 헤드라인 하나뿐 |
| 가로 넘침 | desktop 0px · mobile 0px | 측정 | |

### 5.4 형태·깊이 (Shape & Depth)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius 단계 | 5 · 16 · 22 · 24 · 26 · 27 · 32 · 33 | 측정 | very-rounded. 위계별로 다르다 |
| radius 버튼 | pill (pill 비율 65%) · 작은 칩 5px | 측정 | 장면 CTA·언어 선택은 pill |
| radius 카드 | 24px (상품·위젯 카드) · 48px (큰 surface 카드) · 22px (대시보드 카드) | 측정 | |
| radius 이미지·영상 프레임 | 32px | 측정 | 히어로 프레임. 스크롤 다음 장면은 더 크게 보인다(약 48px, 추정) |
| radius 입력 | 측정 실패: 페이지에 입력 필드가 없다 | — | |
| radius 배지 | 5px | 측정 | |
| 테두리 | 1px, 사용 low | 측정 | 셀러 장면 바탕의 격자선, 다크 UI 경계에만 |
| 그림자 sm | `rgba(2,32,71,.05) 0 6px 30px` | 측정 | 떠 있는 카드. 청색 tint, 넓고 옅음 |
| 그림자 md | `rgba(59,96,145,.1) 0 12px 24px, inset 0 0 0 1px rgba(0,0,0,.02)` | 측정 | 대시보드·위젯 카드 |
| 그림자 lg | `rgba(102,108,125,.2) 0 0 52px` + 큰 inset | 측정 | 영상 프레임 아래 퍼진 그림자로 보인다 |
| backdrop blur | 29개 요소 | 측정 | 다크 장면의 반투명 UI 카드·버튼(glassmorphism) |

### 5.5 모션 (Motion)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 단계 | fast 250ms · base 300ms · slow 450ms | 측정 | 전환 348개 |
| easing | `ease` | 측정 | 대부분 기본 ease |
| keyframe 애니메이션 | 0개 | 측정 | 움직임은 스크롤 진행률이 직접 만든다 |
| 스크롤 연출 | lenis smooth-scroll · sticky 장면 · 프레임 scale·텍스트 crossfade | 추정 | 라이브러리(lenis·lottie)는 측정, 연출 내용은 슬라이스로 판단 |
| 스크롤 진행 표시 | 왼쪽 가장자리 짧은 가로선 약 11개, 현재 위치만 진함 | 추정 | 모든 슬라이스의 같은 자리 |
| reduced-motion 대응 | 측정 실패: 교차 출처 CSS 라 확인 불가 | — | 따라 할 때는 반드시 구현(MO-4) |

### 5.6 이미지·아이콘 (Imagery & Icons)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 미디어 비중 | 이미지 3% · 배경 이미지 6% · SVG 1% · 영상 6 · 캔버스 4 | 측정 | 면적 비중은 낮게 잡히지만 영상·캔버스가 장면의 주인공 |
| 종류 | 실사 영상(인물이 휴대폰을 쓰는 장면) + 실제 제품 UI 목업 + 스튜디오 제품 사진 | 추정 | 일러스트·캐릭터·3D 블롭 없음 |
| 사진 톤 | 자연광, 저채도, 회청색 하늘·창 / 제품은 베이지·회갈색 스튜디오 | 추정 | 무채색 크롬과 온도를 맞춘다 |
| 아이콘 | 19개 · 원형 버튼 안 2px 선 화살표, 내비 햄버거 | 추정 | 개수는 측정. 기능 아이콘 나열이 없다 |
| 장식 텍스트 | 금융 용어를 흐리게 흩뿌린 텍스트 구름 1곳, 푸터 거대 라틴 워드마크 | 추정 | |

## 6. 컴포넌트 (Components)

- **내비**: 높이 D 64 / M 56px, fixed, 배경 투명, 테두리 없음(측정). 링크는 ghost 버튼 6개, 16px/500, 색 #333840, 높이 64, 좌우 패딩 12(측정). 오른쪽 언어 선택 + 회색 pill CTA, 모바일은 로고 + 햄버거(측정 / CTA 모양은 추정).
- **장면 CTA (다크 장면)**: pill, 높이 약 48px, 좌우 약 18px, 라벨 16px/600 흰 글자 + 오른쪽 흰 원(약 28px) 안의 검정 화살표. 면은 #FFFFFF 10–20% 반투명, 두 번째는 더 어두운 면(추정, desktop-07).
- **원형 화살표 버튼 (금융 기능 패널)**: 지름 약 48px, 반투명 회색 원 위 흰 화살표, 패널 오른쪽 아래(추정, desktop-03).
- **언어 선택 칩**: outline pill, 높이 31, 좌우 패딩 12, 16px/400, 경계 #4E4D4C70 1px(측정).
- **다크 UI 칩**: outline, 높이 19, 좌우 패딩 5, radius 5, 13px/500, 글자 #E8EBF0CC, 경계 #FFFFFF21(측정). 제품 목업 안 조건 선택.
- **배지 (상태)**: 높이 18, 좌우 패딩 5, radius 5, bg #1A7AF917, fg #2972E8, 10px/500(측정). 제품 카드 안 '…' 상태. 비활성은 회색 배지(추정).
- **카드**: 큰 surface 카드 폭 398 · radius 48 · 패딩 0(측정). 상품·위젯 카드 폭 271–291 · radius 24 · 흰 면 · 그림자 sm(측정). 대시보드 카드 폭 201–205 · radius 22 · 그림자 md(측정). 카드 안은 이름 → 큰 가격 → 키-값 3행 → 배지 순서(추정, desktop-05).
- **리스트 행 (제품 UI 안)**: 왼쪽 라벨 회색, 오른쪽 값 정렬, 행 높이 약 22px(추정). 대시보드 숫자는 모노스페이스 3개를 세로 1px 선으로 나눈다(추정).
- **입력**: 없음.
- **상태(hover·focus·active)**: 측정 실패: 정적 캡처.

## 7. 페이지 구조 (Page Anatomy)

| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 왼쪽, 가운데 링크 6, 오른쪽 언어 + pill CTA, 64px fixed 투명 | bg | |
| 2 | hero-media | 좌우 16px 인셋 영상 프레임(radius 32) + 아래쪽 흰 헤드라인 한 줄, 버튼 없음. sticky 장면으로 이어져 프레임이 줄며 송금 장면으로 전환 | 사진 | 엔진 hero-centered(0.5) → hero-media: 텍스트가 영상 위에 있다. 9,765px 장면 |
| 3 | feature-grid | 가운데 h2 + 흐린 용어 구름, 검정 패널 3장을 gap 0 으로 이어 붙인 띠, 패널 아래 h3 2줄 + 본문 2줄 3열 | bg (패널 bg-inverse) | 엔진 media-text(0.75) → feature-grid(3): 같은 무게의 기능 3개 |
| 4 | feature-alternating | 왼쪽 휴대폰 목업·떠 있는 상품 사진 sticky, 오른쪽 1px 세로선 + 단계 텍스트가 교체. 이어서 회색 격자 바탕의 떠 있는 상품 카드 | bg → surface | 엔진 content-list(3)(0.7) → feature-alternating(sticky-scrollytelling 변형). 14,717px. 엔진 미분리: 셀러 카드 장면 포함 |
| 5 | media-text | 대시보드 카드 + 텍스트, 회색 바탕 | surface | 엔진 그대로(0.55). 엔진 #4 unknown(90px 빈 자리)은 장면 사이 여백이라 뺐다 |
| 6 | text-block | 2열 텍스트 블록, 캡처 시 대부분 비어 있음 | surface | 엔진 그대로(0.5). 스크롤할 때 그리는 내용이 많아 신뢰도 낮음 |
| 7 | feature-alternating | 순검정 바탕 왼쪽 pill 배지 + h2 + 본문 + pill CTA 2, 오른쪽 결제 단말 제품 사진 크게. 따뜻한 실내 사진 장면으로 전환 | bg-inverse → 사진 | 엔진 unknown(0.2) → feature-alternating(sticky, dark). 11,300px, 텍스트 crossfade |
| 8 | gallery | 파스텔 그라데이션 위젯 타일(radius 32) 격자, 가장자리 타일은 흐림. 아래 왼쪽 h2 + 본문 2줄 | bg | 엔진 미분리: footer(0.95)에 묶여 있었다 |
| 9 | footer | 오른쪽 링크 4열 + 사업자 정보·약관 줄, 왼쪽 위 한 줄 슬로건, 바닥에 화면 폭 거대 라틴 워드마크 | 사진(흐린 그라데이션) | aurora-gradient 트리트먼트 |

리듬: 섹션 여백 중앙값 200px, 장면 하나가 10–16화면을 쓴다. 배경은 흰 → 회색 → 검정 → 사진 → 흰 → 그라데이션으로 5–6막이 되고 구분선은 없다. 가장 큰 대비는 검정 장면 한 번이다.

```text
+--------------------------------------------------------------+
| nav  fixed 64, transparent              links(6)  [cta]      |
+--------------------------------------------------------------+
| hero-media  rounded video frame r32, h2 overlay, no cta      |
|   -> sticky scene, frame shrinks into next shot              |
| feature-grid (3)  black panels | title + body below          |
| feature-alternating  sticky phone | steps right              |
+--------------------------------------------------------------+
| media-text / text-block  grid lines, floating cards          |
|                                           bg surface         |
+--------------------------------------------------------------+
| feature-alternating  product photo right   bg inverse        |
+--------------------------------------------------------------+
| gallery  scattered widget tiles r32 + h2 left                |
+--------------------------------------------------------------+
| footer  4 cols + biz info, giant wordmark  bg photo          |
+--------------------------------------------------------------+
```

모바일: 페이지 높이가 50,718 → 21,739px 로 43% 가 된다. 긴 sticky 장면을 짧게 펼친 것이다. 히어로 영상은 세로로 크롭돼 화면 거의 전부를 채우고, 헤드라인은 한 줄에서 세 줄 가운데 정렬로 바뀐다. 내비는 로고 + 햄버거, 높이 56px. 엔진 모바일 시퀀스는 hero-media → gallery(4) → text-block → content-list(3)×2 → feature-grid(6) → feature-grid(2) → content-list(3) → footer 이고, 데스크톱 3패널 띠·위젯 타일이 모바일에서는 1열이나 가로 갤러리로 쌓인다. 하단 고정 버튼은 없다.

## 8. 따라 할 때 Do / Don't

**Do**
- 히어로는 radius 32px 인셋 프레임 속 실사 영상(또는 사진) 하나와 헤드라인 한 줄로 끝낸다. 버튼은 다음 장면으로 미룬다 — 무브 1
- 기능 하나에 sticky 장면 하나를 주고, 장면 안에서는 실제 제품 화면만 바꾼다. 장면은 3–5개, 왼쪽에 진행 표시를 둔다 — 무브 2
- 파랑은 제품 UI 안의 상태 배지·완료 표시에만 쓰고, 마케팅 버튼은 중립 면이나 반투명 흰 pill 로 칠한다 — 무브 3
- 섹션은 배경 명도(흰 / #F5F5F5 / #000)로 나누고, 검정 장면은 한 번만 둔다 — 무브 4
- 모든 글자에 -0.02em 과 keep-all 을 주고, 굵기는 제목 700 / 본문 400 두 개만 쓴다 — 무브 5
- 떠 있는 카드에는 검정 그림자 대신 청색 tint 그림자 `rgba(2,32,71,.05) 0 6px 30px` 를 쓰고, radius 는 5 / 24 / 32 / 48 위계로 나눈다

**Don't**
- "토스 = 파랑 + 둥근 카드"로 옮기지 않는다. 파랑 CTA, 파랑 그라데이션 히어로를 만들지 않는다 — 무브 3, CO-1
- 히어로 아래에 "시작하기 + 더 알아보기" 버튼 쌍을 붙이지 않는다 — 무브 1, CP-6
- 장면 연출 대신 모든 섹션을 fade-up 시키지 않는다. 스크롤 연출은 reduced-motion 에서 반드시 끈다 — 무브 2, MO-1, MO-4
- 섹션 사이에 hairline 을 넣지 않는다 — 무브 4, LA-4
- 본문을 #727780 보다 옅게 하지 않는다. 사이트도 흰 배경에서 4.5:1 경계값이고, 회색 면 위에서는 4.13 으로 이미 AA 미달이다 — CO-7
- 실사 영상 자리를 스톡 사진이나 AI 인물 이미지로 채우지 않는다 — 무브 1, IC-4, IC-5

## 9. 폰트 대체 (Font Substitutes)

| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Toss Product Sans OTF | 비공개 전용 서체 (proprietary, 외부 배포 안 함) | Inter | Pretendard (1순위), Wanted Sans | 토스 느낌은 폰트보다 굵기 대비(700/400)·-0.02em·여백에서 온다. Pretendard 에 `letter-spacing:-0.02em` 을 그대로 준다 |
| SF Pro Text / -apple-system | 시스템 (임베드 불가) | `-apple-system, BlinkMacSystemFont, system-ui` | Pretendard | 폴백으로만 남긴다 |
| SF Mono | 시스템 (임베드 불가) | `ui-monospace`, JetBrains Mono | — | 대시보드 숫자에만. 한글 본문에는 쓰지 않는다 |

## 10. 베끼지 말 것 (Don't Copy)

- 토스 로고·심볼, 푸터의 거대 라틴 워드마크(문구·배치 그대로)
- 히어로·송금·실내 장면의 영상과 인물 사진, 결제 단말기 제품 사진, 상품 스튜디오 사진
- 제품 UI 목업 화면(송금 완료, 주식 모으기, 셀러 카드, 대시보드), 지구본·점 패턴 렌더
- 카피: 헤드라인·장면 문구·버튼 라벨. 문장 길이(2줄), 해요체 말투만 옮긴다
- Toss Product Sans 서체 파일(@font-face 주소가 보여도 받지 않는다)
- 미니앱 위젯 타일 세트의 그래픽, 고유 아이콘

느낌은 레버에서 오고, 자산에서 오지 않는다. 옮길 것은 인셋 프레임 radius, 장면 길이, 색을 쓰는 범위, 자간이다.

## 11. 프롬프트 (Prompt Snippet)

```text
미니멀 × 토스형 핀테크 심플. 히어로는 좌우 16px 인셋, radius 32px 프레임 속 실사 영상 하나 + 흰 헤드라인 한 줄, 버튼 없음.
기능마다 sticky 스크롤 장면 하나(3–5개), 장면 안에서 실제 제품 화면만 바뀐다. 섹션 여백 200px, 구분선 없이 배경 명도(흰/#F5F5F5/#000)로 나눈다.
마케팅 영역은 무채색만, 파랑(#2972E8 계열)은 제품 UI 안 상태 배지에만. 모든 글자 -0.02em, 제목 700 / 본문 400, 본문 16px/1.6 #727780 이상 진하게, keep-all.
카드 radius 24, 그림자는 rgba(2,32,71,.05) 0 6px 30px. 파랑 CTA·그라데이션 히어로·버튼 쌍·fade-up 남발·스톡 사진 금지. reduced-motion 이면 장면을 정적으로.
```

```text
Minimal × Korean fintech-simple. Hero: one real-life video in a frame inset 16px with 32px radius, a single white headline overlaid, no CTA.
One sticky scroll scene per feature (3–5 scenes) where only the real product UI changes. 200px section spacing, no dividers — separate scenes by background value (white / #F5F5F5 / #000).
Marketing chrome stays neutral; blue (#2972E8-ish) appears only on status badges inside product UI. All text at -0.02em tracking, 700 headings / 400 body, 16px/1.6 body no lighter than #727780.
Cards 24px radius with a blue-tinted soft shadow rgba(2,32,71,.05) 0 6px 30px. No blue CTAs, gradient heroes, CTA pairs, blanket fade-ups or stock photos. Respect prefers-reduced-motion.
```

## 부록: 화면 관찰 (Visual Read)

- **첫 화면(desktop.png)**: 내비 아래 거의 화면 전체를 둥근 영상 프레임 하나가 채운다(좌우 약 16px, 위 64px 띄움, 모서리 약 32px). 영상은 지하철 창가에서 휴대폰을 보는 인물, 자연광·저채도·회청색 톤. 헤드라인 한 줄이 영상 아래쪽에 흰 글자로 얹힌다. 버튼·부제·배지 없음 — 메시지 하나와 영상뿐이다. 헤드라인 글자는 시각적으로 약 72–80px(추정)로, 측정된 h2 48px 보다 크다(스크롤 연동 scale 로 보인다).
- **모바일(mobile.png)**: 같은 영상이 세로로 크롭되어 화면 거의 전부를 채우고(좌우 약 18px, 모서리 약 40px), 헤드라인은 세 줄 가운데 정렬로 바뀐다. 상단은 로고 + 햄버거만.
- **왼쪽 가장자리**: 세로로 쌓인 짧은 가로선 10여 개(스크롤 진행 표시). 현재 위치만 진하다. 모든 슬라이스에서 같은 자리.
- **스크롤 내러티브(desktop-02)**: 히어로 영상 프레임이 줄어들며 다음 장면(송금 완료 화면을 든 손)으로 바뀐다. 프레임 radius 가 더 커지고(약 48px) 아래로 넓고 흐린 청회색 그림자가 깔린다. 텍스트는 영상 위 왼쪽에 흰 글자 h3 + 본문 2줄.
- **금융 기능 장면(desktop-03)**: 흰 배경 가운데 정렬 h2 위로 금융 용어가 흐릿하게 흩어진 장식 텍스트 구름. 아래에 검정 패널 3장이 이어 붙은 가로 띠(패널 사이 간격 0, 바깥 모서리만 각짐) — 각 패널에 반투명 다크 UI 카드와 원형 화살표 버튼. 패널 아래에 h3 2줄 + 회색 본문 2줄, 3열.
- **커머스 장면(desktop-04)**: 실제 쇼핑 앱 화면을 담은 휴대폰 목업과 떠 있는 상품 사진 타일(radius 약 24px) 왼쪽, 텍스트는 오른쪽에 h3 + 본문, 왼쪽에 1px 세로선 하나로 단계 표시(활성 단계만 진하고 나머지는 흐림).
- **광고·셀러 장면(desktop-05)**: 옅은 회색(#F5F5F5) 바탕에 1px 격자선이 보이고, 그 위에 흰 상품 카드(radius 약 24px, 아주 옅은 그림자)가 높이를 엇갈려 떠 있다. 카드 안은 상품명·가격(크게)·키-값 3행·파란 상태 배지. 하단에 대시보드 카드(숫자 3개를 세로 구분선으로 나눔, 숫자는 모노스페이스).
- **결제 단말 장면(desktop-07, 08)**: 배경이 완전한 검정으로 바뀌고 단말기 제품 사진이 오른쪽에 크게. 왼쪽에 pill 배지 + h2 + 본문 + pill 버튼(라벨 + 흰 원형 화살표). 캡처 순간 여러 텍스트 레이어가 겹쳐 보인다(스크롤 크로스페이드 중간 상태). 08 은 따뜻한 회갈색 실내 사진으로 전환.
- **미니앱 장면(desktop-09)**: 흰 바탕에 파스텔 그라데이션 위젯 타일(radius 약 32px, 비행·걸음·날씨·쿠폰·게임)이 격자로 흩어지고 가장자리 타일은 흐려진다. 아래 왼쪽 정렬 h2(진한 남색 계열) + 회색 본문 2줄.
- **푸터(desktop-10)**: 흐린 청보라·분홍 그라데이션 사진 배경 위 흰 글자. 오른쪽 4열 링크, 왼쪽 위 한 줄 슬로건, 바닥에 화면 폭을 꽉 채우는 반투명 거대 라틴 워드마크(약 200px 이상, 추정).
- **리듬**: 페이지 높이 50,718px(약 57화면). 섹션 하나가 수천 px 동안 sticky 로 고정되고 스크롤에 따라 장면이 바뀌는 구조다. 흰 → 흰 → 회색 → 검정 → 사진 → 흰 → 그라데이션으로 배경이 장면 단위로 바뀐다.
- **사진 톤**: 자연광, 저채도, 회청색 하늘·창. 제품 사진은 회갈색·베이지 스튜디오 톤. 인물은 실제 사용 장면(휴대폰을 보는 손·얼굴).

## 부록: 측정 메모 (Capture Notes)

- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2. 신뢰도 high (타이포 0.95 · 색 0.9 · 간격 0.77 · 구조 0.55). 숨긴 오버레이 없음.
- 경고: NETWORK_BUSY(데스크톱 네트워크가 8초 안에 잠잠해지지 않음, 영상 스트리밍) · SLICES_SAMPLED(57화면 중 슬라이스 10장을 고르게 뽑음 — 장면 사이 전환은 일부만 봤다) · RAW_TRIMMED(histograms, vars) · NO_ACCENT · SECTIONS_EMPTY(1개 섹션이 스크롤할 때만 그려짐).
- 엔진 정정(tokens.json 은 그대로 둠): #1 hero-centered → hero-media, #2 media-text → feature-grid(3), #3 content-list(3) → feature-alternating(sticky), #4 unknown(90px) 제외, #7 unknown → feature-alternating(sticky, dark), #8 footer → gallery + footer 로 분리.
- 신뢰도가 낮은 영역: 히어로 헤드라인 크기(스크롤 scale 연출이라 계산값과 보이는 크기가 다르다, 추정), 장면 CTA 버튼 치수(엔진 버튼 샘플에 잡히지 않음, 추정), text-block 장면(캡처 시 대부분 비어 있음), desktop-07 텍스트 겹침(crossfade 중간 상태), 유채색 #F04251 의 위치.
- 섹션 여백 M 42px 는 sticky 장면을 짧게 펼친 모바일 구조 때문에 작게 잡힌 중앙값이다. 모바일 섹션 간격으로 그대로 쓰지 않는다.
- 근거 비율: 값이 있는 토큰 행 55개 = 측정 39 · 파생 6 · 추정 10 → 71 / 11 / 18%. 측정 실패 3행(accent-fg, 입력 radius, reduced-motion)은 뺐다.
- 페이지 텍스트에서 지시처럼 보이는 문자열은 없었다.
