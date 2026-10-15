---
schema: dd.profile/1
slug: musinsa
name: 무신사
input_type: url
source: https://www.musinsa.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: none
recapture: null
styles: {primary: kr-editorial-commerce, secondary: data-dense, treatments: []}
structure: "nav → search-bar → category-nav → hero-media(3) → category-nav → product-grid → logo-cloud → product-grid(2) → media-text → product-grid(2) → content-list(3) → product-grid → product-grid → product-grid → product-grid → content-list → footer"
evidence: {measured: 67, declared: 7, derived: 13, estimated: 13, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
bundled: true
verified: 2026-10-15 maintainer spot-check
---

# 무신사 — Reference Profile

## 1. 본질 (Essence)
매일 훑어보는 패션 쇼핑객을 위해 13px 글자, 간격 없이 붙인 260px 상품 사진 레일, 할인율에만 쓰는 빨강 하나로 끝없이 이어지는 매대 느낌을 만든다.

## 2. 스타일 분류 (Classification)
- primary: `kr-editorial-commerce` — UI 는 무채색(monochrome, 측정), 유채색 글자의 94.5% 가 할인율 빨강 #F5415F, 상품 사진 radius 0, 글자 12–14px. 단 범위 밖: 첫 화면 빈 칸 25% 로 밀도가 이 스타일의 밀2 보다 훨씬 높고, 모듈 사이 여백은 약 40px 로 범위(80–160px)보다 좁고, 정가 취소선이 없고, 헤더 탭에 이벤트 다색 라벨이 있다
- secondary: `data-dense` — 본문 13px/1.38(측정 ×81), 그림자 0개, 브랜드 벽 20열 × 6줄, 첫 화면 빈 칸 25%(파생). 표·숫자 정렬 대신 사진 레일로 밀도를 만든다는 점이 다르다
- treatments: 없음 — `backdrop-filter`·그라데이션·노이즈 측정 0 (배너 속 3D 그래픽은 이미지 콘텐츠다)
- 축: 밀도 5 · 온도 2 · 채도 3 · 대비 3 · 둥긂 2 · 장식 2

## 3. 무드 키워드 (Mood)
매대처럼 촘촘한 (dense merchandising) · 가격이 먼저 읽히는 (price-forward) · 사진이 색을 맡는 (photo-carried color) · 무채색 틀 (monochrome chrome) · 기획전 띠로 끊기는 리듬 (event-banded rhythm) · 빨리 넘기는 스트리트 편집숍 (fast-scroll street retail)

## 4. 시그니처 무브 (Signature Moves)
### 1. 글자를 13px 로 줄이고 위계는 굵기와 빨강으로만 만든다
- 수치: body 13px/1.38(측정 ×81) · small 12px/1.42 · h1 20px/600(측정), 가장 큰 글자 : 본문 = 1.54 : 1, 단계 11 12 13 14 16 20(파생). 더 큰 글자는 모두 배너 이미지 안에 있다
- 따라 하는 법: `--fs-meta:12px;--fs-body:13px;--fs-title:18px;--fs-hero:20px` 브랜드명 12px/700, 상품명 13px/400 + `line-clamp:2`, 가격 13px/700. 한글 행간은 1.4–1.5(원본 1.38 은 KR-5 경계), 상세 본문은 15–16px/1.6
### 2. UI 를 무채색으로 두고 빨강은 할인율에만 쓴다
- 수치: 유채색 글자의 94.5% 가 #F5415F, 중립 램프 10단계 #000000 → #FFFFFF, monochrome(측정), #F5415F/흰 바탕 3.6 : 1(파생). 버튼·링크·아이콘·하트는 검정·회색
- 따라 하는 법: `--sale:#E0263F` (흰 바탕 4.6 : 1 로 보정) `.price-rate{color:var(--sale);font-weight:700}` `.price{color:#000;font-weight:700}` 같은 줄에 할인율 → 판매가 순서. 할인이 없으면 빨강 없이 가격만
### 3. 상품 사진을 radius 0 · 간격 0 레일로 붙이고 화면 끝에서 자른다
- 수치: 카드 폭 260px · padding 0 · radius 0(측정), 사진 260 × 312 = 5 : 6(추정), x16 에서 시작해 1440 에서 잘려 5.5장 보임(추정), 히어로 배너 480px × 3장 gap 0(측정)
- 따라 하는 법: `.rail{display:grid;grid-auto-flow:column;grid-auto-columns:260px;gap:0;overflow-x:auto;scroll-snap-type:x mandatory;margin-right:calc(50% - 50vw)}` `.rail img{aspect-ratio:5/6;object-fit:cover;border-radius:0}` 누끼 배경이 제각각이면 #F5F5F5 계열로 맞추거나 gap 2px
### 4. 머리를 거의 검정 띠 하나로 묶고 이벤트 색은 그 안에만 둔다
- 수치: 헤더 #1A1B1F, 내비 56px sticky(측정, `--layout-header-top:56px` 선언), 콘텐츠 시작 y192(측정), 이벤트 라벨 #3A6EFF · #A97BFF · #F19053 · #F7E74B 각 0.5–1%(측정). 스크롤하면 약 104px 띠가 고정된다
- 따라 하는 법: `header{background:#1A1B1F;color:#fff;position:sticky;top:0}` 탭 줄 기획전 라벨만 `color:var(--event-<id>)`, 두 줄 12px/700. 어두운 면은 헤더 하나, 이벤트 색이 헤더 밖 버튼으로 새면 무브 2 가 깨진다
### 5. 기획전마다 풀폭 색 띠로 레일 흐름을 끊는다
- 수치: 띠 3개 / 페이지 17,569px, 노랑 띠 약 #F5E54A(추정), 바탕 #F5F5F5 43% · 모듈 #FFFFFF 50% · 그림자 0개(측정)
- 따라 하는 법: `.band{background:var(--event-bg);padding-block:24px 32px}` 띠 안은 제목 + 남은 시간 + 로고 칩 필터 + 같은 레일 컴포넌트를 그대로 쓴다. 레일 3–4개마다 1개, 띠 색 하나는 기획전 하나에만

## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | Pretendard Variable (스택 `Pretendard Variable, Pretendard, sans-serif`, OFL, 한 패밀리 100%) | 측정 | FALLBACK_FONT_LIKELY 경고가 있지만 화면 글꼴은 Pretendard 모양이다 |
| display · 모듈 제목 | 히어로 배너 위 h1 20px · 600 · 1.3 · 0em (D/M 같음) | 측정 | 모듈 제목은 약 18px · 600–700(추정, 엔진 역할 미검출) |
| body · small · button | 13px · 400 · 1.38 (×81) / 12px · 400 · 1.42 / 14px · 400 · 1 | 측정 | 자간 0, keep-all 4% (상품명이 낱말 중간에서 끊긴다) |
### 5.2 색 (Color)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg · surface · bg-inverse | #FFFFFF 50% · #F5F5F5 43% · #1A1B1F 1% | 측정 | 흰 모듈 / 페이지 바탕 / 헤더 띠. footer #F0F0F0 |
| text · text-muted | #000000 (글자 53%) · #666666 (25%) | 측정 | 가격·제목도 순검정 |
| accent (할인) · event 라벨 | #F5415F (유채색 글자 94.5%) · 헤더 라벨 #3A6EFF · #A97BFF · #F19053 · #F7E74B · #F31110 (각 0.5–2%) | 측정 | 빨강은 글자로만, 면 0 (무브 2·4) |
| 대비 | text/bg 21 : 1 · muted/bg 5.7 : 1 · sale/bg 3.6 : 1 | 파생 | 13px 할인율은 AA 미달 → #E0263F (4.6 : 1). 중립은 #1A1B1F 만 cool |
### 5.3 간격·레이아웃 (Space & Layout)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 모듈 간격 | 모듈 사이 약 40px, 모듈 제목 → 레일 약 16px | 추정 | 엔진 섹션 여백 0px 은 본문 전체를 한 섹션으로 묶은 값이라 쓰지 않는다 |
| 컨테이너 · 거터 | 상한 1440px (`--max-width`) · 하한 744px (`--min-width`) · 거터 12 / 16px | 선언 | 엔진 600px 은 내부 요소 폭. 거터는 측정 |
| 상품 레일 · 히어로 | 카드 260px · gap 0 (오른쪽 끝에서 잘림) · 배너 480 × 360 × 3장, gap 0 | 측정 | 그리드 10 · 8 · 5열 gap 4px 은 특전 타일·브랜드 벽 |
| 밀도 | dense, 첫 화면 빈 칸 25% · 헤더 192px | 파생 | 기준 단위 없음(adherence 0.66), 4px 로 맞춰도 무리 없다 |
### 5.4 형태·깊이 (Shape & Depth)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius | 칩·버튼 pill (38%) · 입력 4 · 카드 0–4 · 이미지 0–2 | 측정 | 직각 사진과 둥근 칩의 두 값 대비 |
| 그림자 · 테두리 | 그림자 0개 · 테두리 1px 사용 적음 (#8A8A8A 알파 10%) | 측정 | 깊이는 #F5F5F5 / #FFFFFF / #1A1B1F 세 단계 |
### 5.5 모션 (Motion)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 · easing | 100 / 100 / 200ms · `ease` · 애니메이션 1 · swiper · reduced-motion 대응함 | 측정 | 전환 35개. 기획전 띠 남은 시간은 초 단위로 바뀐다(추정) |
### 5.6 이미지·아이콘 (Imagery & Icons)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 종류 | 상품 누끼 + 착용 컷 + 연출 컷이 한 레일에 섞임, 배너는 3D 그래픽·제품 연출, 브랜드 원형 로고 56px 20열 × 6줄. 아이콘 86개 | 추정 | 아이콘 개수는 측정. 엔진 이미지 7% 는 지연 로딩 영향, 체감 50% 이상 |

## 6. 컴포넌트 (Components)
- 상품 카드: 폭 260 · padding 0 · radius 0 · 흰 면 · 테두리·그림자 없음(측정). 사진 5:6 → 브랜드명 12/700 → 상품명 13/400 1–2줄 → 빨강 할인율 + 판매가 13/700, 사진 오른쪽 아래 하트(추정)
- 필터 칩 · 세그먼트: 칩 높이 32 · pill · 14px/400 · 왼쪽 원형 브랜드 로고(측정 ×24), 어두운 띠 위에서는 #FFFFFF33. 성별 세그먼트도 높이 32 pill(측정), 선택 항목은 검정 면 + 흰 글자(추정)
- 헤더: 내비 높이 D 56 / M 88 · sticky · #1A1B1F 띠 · 링크 14 · CTA 있음 · 모바일 햄버거(측정), 검색창 높이 36 · padding-x 8 · radius 4 · 14px(측정), 로그인 버튼은 1px 흰 테두리(추정)
- 링크·기타: 텍스트 링크 높이 28 · 14px/400(측정 ×73), 모듈 오른쪽 load-more 링크는 12px 밑줄(추정), 떠 있는 원형 버튼 지름 44. 배지는 엔진 0개(화면상 파랑·회색·노랑 작은 배지, 추정). hover·focus 는 측정 실패: 정적 캡처

## 7. 페이지 구조 (Page Anatomy)
| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav · search-bar · category-nav | 헤더 띠 192px: 햄버거 + 서비스 탭 8(라틴 대문자 16/500) + 유틸 5 + 로그인, 풀폭 검색 36px, 탭 5 + 기획전 라벨 6(색 글자) | bg-inverse | 엔진 unknown(0.2)을 나눴다 |
| 2 | hero-media(3) | 480 × 360 배너 3장, gap 0, radius 0, 왼쪽 아래 흰 글자 | 사진 | 엔진 미분리 |
| 3 | category-nav | 특전 타일 9열 × 2줄(작은 상품 컷 + 12px 라벨) + 바로가기 pill 10개 | surface | 바로가기 타일 변형 |
| 4 | product-grid (띠) | 분홍 기획전 띠: 큰 그래픽 제목 + 남은 시간 + 성별 세그먼트 + 레일 | event 띠 | 무브 5 |
| 5 | logo-cloud | 브랜드 벽: 탭 줄 + 56px 원형 로고 20열 × 6줄 + 배지 + 이름 12px | bg | 고객사가 아니라 입점 브랜드 바로가기 |
| 6 | product-grid ×N · media-text · content-list(3) | 모듈 제목 18px + 260px 카드 레일(gap 0, 오른쪽 넘침), 워드마크 패널 + 착용 컷 레일, 브랜드 카드 3열 | bg 모듈 / surface 바탕 | 엔진 content-list(5) 한 덩어리(16,198px)를 나눴다 |
| 7 | product-grid (띠 2) · content-list | 회갈색·노랑 기획전 띠 + 레일, 이어서 큰 사진 타일이 섞인 가로 레일 | event 띠 → bg | |
| 8 | footer | 결제수단 로고 줄 + 5열 링크 + 사업자 정보 + SNS 아이콘 | surface-2 | |

리듬: 위 192px 어두운 헤더 한 덩어리 아래로 #F5F5F5 바탕에 흰 레일 모듈이 약 40px 간격으로 이어지고, 레일 3–4개마다 기획전 색 띠가 끼어든다. 모바일: 내비 88px, 햄버거가 2열 카테고리 시트를 열고, 히어로는 둥근 카드 1장 + 카운터 캐러셀, 특전 타일·pill 은 가로 스크롤 한 줄씩, 하단 탭 바 5개, footer 5열 → 1열.

## 8. 따라 할 때 Do / Don't
- Do: 목록 글자는 12/13px 두 크기로 두고 위계는 굵기(400/700)와 색(검정/#666/빨강)으로 만든다. 한글 행간은 1.4–1.5 — 무브 1
- Do: 상품 사진은 5:6 하나로 통일하고 radius 0 · gap 0 레일로 붙여 오른쪽 끝에서 반 장 잘리게 둔다 — 무브 3
- Do: 어두운 면은 sticky 헤더 하나(#1A1B1F)로 끝내고, 기획전은 레일 3–4개마다 풀폭 색 띠 하나로 둔다 — 무브 4·5
- Don't: 상품 카드에 radius 12 + 그림자를 넣어 SaaS 카드처럼 만들지 않는다 — 무브 3, LA-1, SH-2
- Don't: 빨강이나 헤더 이벤트 색을 버튼·배지·아이콘으로 넓히지 않는다 — 무브 2·4, CO-5
- Don't: 13px 본문을 상세 설명·후기 같은 긴 글로 넓히거나 한글 행간을 1.4 아래로 내리지 않는다. 상품명은 keep-all + line-clamp 2 로 끊는다 — 무브 1, KR-5, KR-1
- **흔한 오해**: 무신사 ≠ 29CM 같은 화보 피드. 같은 kr-editorial-commerce 지만 첫 화면 빈 칸 25% 의 data-dense 매대이고, 모듈 간격은 약 40px, 사진은 260px 레일로 끝없이 이어진다
- **흔한 오해**: 무신사 ≠ 검정 화면. 어두운 면은 위 192px 헤더 띠(면적 1%) 하나이고, 본문은 #F5F5F5 바탕 + 흰 모듈이다

## 9. 폰트 대체 (Font Substitutes)
| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Pretendard Variable | OFL 1.1 | 그대로 (라틴은 Inter 계열) | 그대로 Pretendard | 무료라 같은 것을 써도 된다(출처 github.com/orioncactus/pretendard). 느낌은 폰트가 아니라 12/13px 와 굵기 대비에서 온다. 서비스 워드마크는 로고라 대체하지 않는다 |

## 10. 베끼지 말 것 (Don't Copy)
무신사 로고·워드마크와 서비스별 워드마크(모바일 카테고리 시트의 영문 로고들), 배너 그래픽(기획전 3D 타이틀·연출 이미지)·상품 사진·브랜드 로고·착용 컷, 기획전 이름·배너 카피·서비스 이름·버튼 문구, 쿠폰·등급 배지의 고유 형태와 헤더 툴팁 문구. 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)
```text
한국 패션 커머스 메인, kr-editorial-commerce × data-dense. 상단은 #1A1B1F 어두운 sticky 헤더(내비 56px + 검색 + 탭) 하나, 본문은 #F5F5F5 바탕에 흰 모듈.
상품은 260px 카드를 gap 0, radius 0, 사진 5:6 으로 붙인 가로 레일이고 오른쪽 화면 끝에서 잘린다. 글자는 12/13px(브랜드명 700, 상품명 400 두 줄 말줄임, 가격 700), 모듈 제목 18px.
유채색은 할인율 빨강 #E0263F 하나. 레일 3–4개마다 풀폭 기획전 색 띠 하나. 금지: 그림자, 그라데이션, 브랜드색 버튼, fade-up, 큰 헤드라인. 한글 keep-all.
```
```text
Korean fashion-commerce home, editorial-commerce meets data-dense. One dark sticky header (#1A1B1F: 56px nav + search + tabs); body on #F5F5F5 with white modules.
Products sit in horizontal rails of 260px cards with zero gap, zero radius and 5:6 photos, cut off at the right edge. Type is 12/13px (bold brand, two-line product name, bold price), 18px module titles.
The only chromatic UI color is a red discount rate (#E0263F). A full-width colored campaign band every 3–4 rails. No shadows, gradients, brand-colored buttons, fade-ups or big headlines.
```

## 부록: 화면 관찰 (Visual Read)
- 첫 화면 위 192px 는 거의 검정 띠 하나(내비 + 흰 검색창 + 탭 줄)이고, 탭 줄 오른쪽 기획전 라벨 6개만 색 글자라 UI 색이 여기 몰려 있다.
- 그 아래 배너 3장이 간격 0 · radius 0 으로 화면 끝까지 붙고, 본문은 #F5F5F5 바탕 위 흰 모듈이 이어진다. 모듈마다 굵은 제목 + 오른쪽 밑줄 링크, 아래 260px 카드 레일이 오른쪽 끝에서 잘린다(5.5장).
- 상품 사진은 누끼·착용·연출 컷이 한 레일에 섞여 톤 통일이 없고, 브랜드 벽이 정보 밀도가 가장 높다. 분홍 → 회갈색 → 노랑 기획전 띠가 레일 흐름을 끊고, 그림자는 어디에도 없다.
- 모바일 첫 화면은 카테고리 시트가 열린 채 찍혀 뒤가 어둡게 덮였다.

## 부록: 측정 메모 (Capture Notes)
- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2, `/main/musinsa/recommend` 로 리다이렉트, 로그아웃. 경고: NETWORK_BUSY · SLICES_SAMPLED(20화면 중 10장) · FALLBACK_FONT_LIKELY · NO_ACCENT(엔진 accent 는 중립 버튼 배경이라 할인 빨강 #F5415F 를 강조로 읽었다). 숨긴 오버레이 0 — 데스크톱 툴팁과 모바일 카테고리 시트가 남아 모바일 값은 추정이다(다음엔 `--hide`).
- 눈으로 고친 것: content-list(5) 한 섹션(16,198px)에 묶인 히어로·레일·띠를 17섹션으로 나눴고, unknown(0.2) → category-nav, 컨테이너 600px → 선언 1440px, 섹션 여백 0px → 화면상 모듈 간격 약 40px(추정). 엔진 이미지 7% 는 지연 로딩 영향으로 봤다. 지시처럼 보이는 문자열은 없었다.
- 근거 비율: 값이 있는 토큰 행 15개 = 측정 10 · 선언 1 · 파생 2 · 추정 2 → 67 / 7 / 13 / 13%.
