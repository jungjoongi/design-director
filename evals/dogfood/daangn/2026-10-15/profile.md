---
schema: dd.profile/1
slug: daangn-com
name: 당근
input_type: url
source: https://www.daangn.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: files
recapture: null
styles: {primary: kr-fintech-simple, secondary: null, treatments: []}
structure: "nav → announcement-bar → category-nav(8) → board-list(5) → content-list(4) → footer"
evidence: {measured: 63, declared: 12, derived: 17, estimated: 8, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
---

# 당근 — Reference Profile

## 1. 본질 (Essence)

동네 이웃을 위해 회색 바닥 위 흰 카드 두 단계, 600px 한 열로 쌓은 목록, 아이콘에만 찍는 주황으로 '바로 쓰는 동네 게시판' 느낌을 만든다.

## 2. 스타일 분류 (Classification)

- primary: `kr-fintech-simple` — 페이지 #F3F4F5(면적 82%) 위 흰 카드 radius 16, 테두리 사용 low, 그림자 알파 5%(모두 측정). 정보는
  리스트 행으로 쌓는다. 단 범위 밖 차이 셋: 강조색이 파랑이 아니라 주황 #FF6F0F, 화면 제목이 22–28px 가 아니라 18–20px,
  "한 화면 한 메시지"가 아니라 서비스 타일 8개 + 목록 5행을 한 화면에 둔다(밀도 한 단계 높음)
- secondary: 없음 — 브랜드 인덱스는 `× playful-illustrative` 로 적어 두었지만 이 페이지에서는 서비스 아이콘 8개의 다색 처리뿐이고
  일러스트·캐릭터·탄성 모션(전환 150ms 단일 속도, 측정)이 없다. 앱 소개·캠페인 페이지라면 달라질 수 있다
- treatments: 없음 — `backdrop-filter` 0, 그라데이션 면적 2%(배너 사진 영역, 측정)
- 축: 밀도 3 · 온도 3 · 채도 2 · 대비 3 · 둥긂 4 · 장식 1

## 3. 무드 키워드 (Mood)

동네 게시판 같은 (neighborhood bulletin) · 연출 없는 생활 사진 (unstaged everyday photos) ·
회색 바닥과 흰 카드로 정돈된 (layered-surface tidy) · 주황 점으로 따뜻한 (orange-dot warmth) ·
첫 화면부터 쓰는 (utility-first, no hero) · 크기 대신 굵기로 말하는 (weight-led quiet hierarchy)

## 4. 시그니처 무브 (Signature Moves)

### 1. 면을 회색 바닥과 흰 카드 두 단계로만 나눈다
- 관찰: 페이지 전체(overview.jpg). 검색창·배너·타일·목록·맛집·지도가 모두 #F3F4F5 위에 뜬 흰 카드다. 구분선은 '…' 위와
  푸터 사업자 정보 위 두 곳뿐
- 수치: bg #F3F4F5 면적 82% · surface #FFFFFF 19%(측정), 카드 radius 16(측정), 테두리 1px 사용 low(측정),
  그림자 `0 1px 1px rgba(0,0,0,.05)` 67% / `0 1px 4px rgba(0,0,0,.08)` 33%(측정)
- 기본값과의 차이: 흔한 값은 흰 배경 + 1px 테두리 카드 + `shadow-md`(알파 10%, 블러 6px 이상). 여기선 그림자 알파가 절반 이하이고
  깊이는 명도 차(97% → 100%)가 맡는다
- 따라 하는 법: `body{background:#F3F4F5} .card{background:#fff;border-radius:16px;border:0;box-shadow:0 1px 1px rgb(0 0 0/.05)}`
- 깨지는 경우: 카드 안에 카드를 또 넣으면 흰 위에 흰이 되어 경계가 사라진다 → 카드 안은 여백·행 구분으로만 나눈다

### 2. 주황은 면이 아니라 아이콘 점으로 찍는다
- 관찰: 로고, 서비스 타일 아이콘 5/8, 섹션 제목 앞 아이콘(불꽃·수저), 지도 칩 아이콘(desktop.png). 데스크톱 첫 화면에 주황으로
  칠한 버튼·띠·배경은 0개. 주황 면은 모바일의 '…' 버튼 하나뿐(mobile.png)
- 수치: 아이콘 주황 #FF6F0F(측정, 유채색 픽셀 중 24%), 브랜드 solid #FF6600 · hover #E14D00 · weak #FFF2EC(선언),
  아이콘 약 24px(추정)
- 기본값과의 차이: 흔한 SaaS 는 브랜드색을 주 CTA·링크·배지·히어로 면에 쓴다. 여기선 브랜드색이 "정체성 표시"에만 쓰이고
  행동(검색·탐색)은 흰 pill 과 검정 글자가 맡는다
- 따라 하는 법: `--accent:#FF6F0F` 를 `svg{color:var(--accent)}` 아이콘과 로고에만 묶고, 버튼 기본형은
  `background:#fff;color:#1A1C20`. solid 주황 버튼은 화면당 최대 1개(앱 설치 같은 전환 행동)
- 깨지는 경우: 흰 글자를 #FF6600 위에 올리면 대비 2.94:1(파생)로 16px 라벨은 AA 미달 → 주황 버튼 라벨은 18.66px bold 이상으로
  키우거나 #E14D00 처럼 더 진한 주황을 쓴다

### 3. 600px 한 열과 316px 레일로 고정하고, 로고는 왼쪽 여백에 건다
- 관찰: desktop.png·slices 02–04. 메인 열 x=250–850, 레일 x=874–1190. 로고만 x≈158 로 열 밖에 걸려 메인 열의 왼쪽 선이
  검색창부터 푸터 사업자 정보까지 한 줄로 이어진다. 상단 줄과 지도 레일은 스크롤해도 같은 자리(sticky)
- 수치: 컨테이너 max-width 988 · 거터 24(측정) → 콘텐츠 940, 카드 폭 600 · 316(측정), 열 간격 24(파생), sticky(추정)
- 기본값과의 차이: 흔한 값은 1200–1280px 가운데 컨테이너 + 전폭 상단 내비. 여기선 본문이 600px 로 모바일 앱 화면 폭에 가깝고,
  상단 내비가 띠가 아니라 열 폭 그대로의 pill 이다
- 따라 하는 법: `.layout{max-width:988px;padding:0 24px;margin:auto;display:grid;grid-template-columns:600px 316px;gap:24px}`
  `.logo{position:absolute;right:calc(100% + 16px)}` · `.topbar,.rail{position:sticky;top:24px}`
- 깨지는 경우: 1100px 아래에서는 걸린 로고가 화면 밖으로 나간다 → 그 폭부터 로고를 열 안으로 넣고, 모바일에선 레일을 지운다
  (실제로 모바일에서 레일·서비스 타일이 사라진다)

### 4. 크기 대신 굵기와 회색 농도로 위계를 만든다
- 관찰: 모든 제목과 목록 행. 페이지에서 가장 큰 글자가 섹션 제목 20px 이고 h1 크기의 히어로 카피가 없다
- 수치: 단계 13 · 14 · 16 · 18 · 20px(측정), 스케일 1.125(파생), 제목:본문 크기 비 1.43:1(파생), 굵기 700 / 400 두 개(측정),
  글자색 #1A1C20 → #555D6D → #868B94 세 단계(측정·선언), 자간 0(측정)
- 기본값과의 차이: 흔한 랜딩은 h1 48–64px 로 본문의 3–4배. 여기선 1.43배라 "광고"가 아니라 "앱 화면"으로 읽힌다
- 따라 하는 법: `--fs: 13px 14px 16px 18px 20px;` 제목은 `font-weight:700;color:#1A1C20`, 메타는 `14px/400 #868B94`.
  20px 를 넘는 글자를 만들지 않는다
- 깨지는 경우: 마케팅 랜딩에 그대로 쓰면 첫 화면이 밋밋하다 → 이 무브는 콘텐츠 피드·대시보드형 홈에만 채택한다

### 5. 목록 행을 '순번 + 굵은 제목 + 회색 메타 + 정사각 사진'으로 쌓는다
- 관찰: board-list(인기 글 5행), content-list(맛집 4장). 순번 · 제목 1줄(넘치면 말줄임) · 말머리 · 시간 · 추천/댓글 수 · 오른쪽 사진
- 수치: 썸네일 120×120 radius 6(측정), 행 높이 약 144px(추정), 맛집 카드 padding 12 · 카드 간격 약 8px(측정·추정),
  메타 14px #868B94(측정), 카운트 아이콘 약 16px #B0B3BA(추정)
- 기본값과의 차이: 흔한 콘텐츠 목록은 3열 카드 그리드(이미지 위 + 제목 아래). 여기선 한국 게시판 문법(순번·말머리·댓글 수)을
  유지한 채 사진만 오른쪽에 붙여 스캔 속도를 지킨다
- 따라 하는 법: `.row{display:grid;grid-template-columns:24px 1fr 120px;gap:12px;padding:16px 24px}`
  `.thumb{width:120px;aspect-ratio:1;border-radius:6px;object-fit:cover}` `.title{font:700 16px/1.38 sans;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`
- 깨지는 경우: 사진이 없는 행이 섞이면 오른쪽이 들쭉날쭉해진다 → 사진 없는 행은 그대로 비우고 제목 폭만 늘린다(원본도 3번 행이 그렇다)

## 5. 토큰 (Tokens)

### 5.1 타이포그래피 (Typography)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | `-apple-system, system-ui, Pretendard Variable, Segoe UI, Roboto, Helvetica Neue` | 측정 | 시스템 스택. system-ui 가 앞이라 Pretendard 는 사실상 쓰이지 않는다(macOS 는 Apple SD Gothic Neo, Windows 는 맑은 고딕) |
| display | 없음 — 가장 큰 글자는 h2 20px | 측정 | 히어로 카피 없음 (무브 4) |
| h2 | 20 / 20px · 700 · 1.35 · 0em | 측정 | 섹션 제목(아이콘 + 제목) |
| h1 | 18 / 18px · 700 · 1.33 · 0em | 측정 | 맛집 카드 제목. 엔진 역할 이름은 h1 이지만 실제 위계는 h2 아래 |
| body-lg | 16px · 700 · 1.38 · 0em | 측정 | 서비스 타일 라벨, 인기 글 제목 |
| body | 14px · 400 · 1.36 · 0em | 측정 | 메타, 푸터 링크, 카운트 |
| small | 13px · 400 · 1.38 · 0em | 측정 | 리뷰 수 같은 보조 |
| button | 13px · 700 · 1.38 · 0em | 측정 | 칩 라벨 |
| 스케일 비율 | 1.125 (major second), fit 0.67, 단계 13 14 16 18 20 | 파생 | |
| clamp | 없음 (D/M 크기 차 2px 미만) | 파생 | |
| 줄바꿈 | keep-all 0%, text-wrap balance 없음 | 측정 | 제목은 1줄 말줄임으로 처리해서 문제가 드러나지 않는다 |

### 5.2 색 (Color)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg | #F3F4F5 · 면적 82% | 측정 | 페이지 바닥 전체. 변수 `--carotene-color-bg-neutral` 과 같은 값 |
| surface | #FFFFFF · 19% | 측정 | 모든 카드·검색 pill (무브 1) |
| surface-hover | #F7F8F9 | 선언 | `--carotene-color-bg-layer-default-hover` |
| text | #1A1C20 | 측정 | 제목·버튼 글자(컴포넌트 fg 측정). 변수 fg-neutral |
| text-secondary | #555D6D · 글자 50% | 측정 | 푸터 링크·본문. 엔진의 'text' 역할 값 |
| text-muted | #868B94 · 14% | 측정 | 메타(말머리 · 시간) |
| placeholder | #B0B3BA | 선언 | 검색 placeholder, 카운트 아이콘 |
| border | #DCDEE3 · 사용 low | 측정 | '…' 위, 푸터 구분선 |
| accent (아이콘) | #FF6F0F | 측정 | 로고·아이콘 (무브 2). 변수 fg-warmth-l6 와 같은 값 |
| brand solid · hover · weak | #FF6600 · #E14D00 · #FFF2EC | 선언 | solid 는 모바일 '…' 버튼에서만 보임 |
| accent-fg | #FFFFFF | 선언 | `--carotene-color-fg-on-solid`. 엔진은 대비로 #000000 을 파생했지만 화면의 버튼 글자는 흰색 |
| 대비 text/bg · text/surface | 15.49:1 · 17.06:1 (AAA) | 파생 | |
| 대비 muted/bg · muted/surface | 3.11:1 · 3.42:1 (AA-large 만) | 파생 | 14px 메타가 AA 미달 — 따라 할 때 #6B7280 이하로 진하게 (CO-7) |
| 대비 accent-fg/brand | 2.94:1 (AA 미달) | 파생 | 무브 2 깨지는 경우 참고 |
| 보조 유채색 | #126BE0 파랑(중고차 아이콘·지역 배지 계열), #FFCB64 노랑, 핑크보라(부동산 아이콘) | 측정 | 서비스별 아이콘 색. 넓은 면에는 없다 |
| 의미색 | negative #FA342C · positive #079171 · warning #FBDC65 | 선언 | 이 페이지엔 보이지 않음 |
| warmth 6단계 | #777F87 → #368FE2 → #16B6E9 → #30C795 → #FFA113 → #FF6F0F | 선언 | 회색→파랑→하늘→초록→노랑→주황. 이름(warmth)으로 보아 온도 표시용 램프. 이 페이지엔 아이콘 주황만 보인다 |
| 중립 온도 | cool (hue 248–269, chroma 0.03 이하), 램프 8단계 #1A1C20…#FFFFFF | 파생 | 따뜻함은 중립이 아니라 주황과 사진이 맡는다 |

### 5.3 간격·레이아웃 (Space & Layout)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 기준 단위 | 4px (adherence 0.78) | 파생 | |
| 간격 단계 | 2 4 6 8 12 14 16 24 | 파생 | |
| 섹션 상하 여백 | 측정 실패: 엔진이 섹션 경계를 감지하지 못했다(페이지 전체를 한 섹션으로 분류) | — | 아래 추정 행으로 대신한다 |
| 그룹 간격 | 블록 사이 약 40–48px, 섹션 제목 → 카드 약 18px | 추정 | slices 01–02 에서 읽음 |
| 컨테이너 | max-width 988px | 측정 | 콘텐츠 940 = 600 + 24 + 316 |
| 열 | 메인 600px + 레일 316px | 측정 | 카드 폭으로 측정 (무브 3) |
| 열 간격 | 24px | 파생 | 940 − 600 − 316 |
| 거터 | 24 / 16px (D/M) | 측정 | |
| 그리드 | 2열(메인·레일). 엔진 gap 2px 은 맛집 2×2 사진 모자이크 간격으로 보인다 | 측정 | |
| 서비스 타일 그리드 | 4열 × 2행, gap 약 12px | 추정 | |
| 고정 요소 | 상단 줄(top 약 24px)·오른쪽 레일 sticky | 추정 | 슬라이스마다 같은 위치 |
| 밀도 | airy, 첫 화면 빈 칸 76% | 파생 | 양옆 여백 때문. 600px 열 안의 밀도는 중간(행 144px, 타일 8개) |

### 5.4 형태·깊이 (Shape & Depth)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius 단계 | 4 · 6 · 8 · 16 · pill | 측정 | 위계별로 다르다 (SH-1 아님) |
| radius 카드 | 16px | 측정 | 타일·목록·맛집·지도 카드 |
| radius 버튼·입력 | pill (검색창·드롭다운·칩) | 측정 | pill 비율 6% |
| radius 이미지 | 배너 8px · 썸네일 6px | 측정 | 카드보다 한 단계 작게 |
| radius 성격 | rounded | 측정 | |
| 테두리 | 1px, 사용 low | 측정 | 카드 테두리 없음 |
| 그림자 | sm `0 1px 1px rgba(0,0,0,.05)` 67% · md `0 1px 4px rgba(0,0,0,.08)` 33% | 측정 | md 는 배너·드롭다운 같은 떠 있는 요소, sm 은 타일·목록 카드 |
| 포커스 링 | 측정 실패: 포커스 상태는 캡처하지 않는다 | — | 브리프에서 정한다 |

### 5.5 모션 (Motion)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 단계 | 150ms 하나 (fast = base = slow) | 측정 | 전환 53개 |
| easing | `cubic-bezier(0.35, 0, 0.35, 1)` | 측정 | 대칭형 ease-in-out |
| 등장 연출 | 없음 (애니메이션 1개) | 측정 | 스크롤 연출 없음 |
| hover 표현 | 흰 면 → #F7F8F9 배경 변화, 주황 → #E14D00 | 선언 | 변수 기준. 실제 hover 는 캡처하지 않음 |
| reduced-motion | 대응함 | 측정 | |
| 라이브러리 | 없음 (CSS transition) | 측정 | |

### 5.6 이미지·아이콘 (Imagery & Icons)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 이미지 비중 | 5% | 측정 | 썸네일·배너·지도 |
| 종류 | 사용자가 올린 생활 사진(정사각 크롭), 캠페인 배너 사진 1장, 지도 캔버스 1 | 추정 | 캔버스 1개는 측정 |
| 아이콘 개수 | 37개 | 측정 | |
| 아이콘 스타일 | 서비스·섹션 아이콘은 채움(filled) 다색 약 24px, 기능 아이콘(돋보기·chevron·↗)은 선 약 1.5–2px | 추정 | 서비스마다 색이 다르다 (IC-2 의 옅은 사각 배경은 없음) |
| 배경 이미지·SVG 일러스트 | 0% · 0% | 측정 | |
| 영상 | 없음 | 측정 | |

## 6. 컴포넌트 (Components)

- 검색 입력: 메인 열 폭 600 · 높이 약 56 · pill · 흰 면 · 그림자 sm(추정), 안쪽 input 은 18px · 테두리 없음(측정), placeholder
  #B0B3BA(선언), 오른쪽 돋보기 약 24px(추정)
- '…' 드롭다운: 높이 56 · padding-x 20 · pill · 흰 면 · 글자 #1A1C20 16px/400 · 그림자 있음(측정). 레일 폭 316
- 텍스트 버튼(내비·푸터): 높이 32 · padding 0 · 글자 #1A1C20 16px/700(측정). 푸터의 앱 칩은 회색 pill(추정)
- …: 높이 55 · padding-x 16 · 글자 text-muted 16px/400 · 카드 하단(측정), 위에 1px 구분선(추정)
- 모바일 주 버튼(…): #FF6600 면 · 흰 글자 · 높이 약 36 · radius 약 8(추정). 데스크톱엔 없음
- 서비스 타일: 폭 141 · padding 12/16 · radius 16 · 흰 면 · 그림자 sm(측정), 아이콘 왼쪽 위 + 16px/700 라벨 왼쪽 아래,
  외부 링크 타일만 오른쪽 아래 ↗(추정)
- 목록 카드(인기 글): 폭 600 · radius 16 · 흰 면 · 그림자 sm(측정), 행은 무브 5
- 맛집 카드: 폭 600 · padding 12 · radius 16 · 흰 면 · 그림자 없음(측정), 제목 18px/700(측정), 지역 배지는 작은 파란 pill(추정 — 엔진 배지
  샘플 0개)
- 지도 카드: 폭 316 · radius 16 · 흰 면(측정), 안쪽 오른쪽 위에 흰 pill 칩 + 그림자(추정)
- hover·focus·pressed: 측정 실패: 정적 캡처. 변수로는 layer hover #F7F8F9, brand hover·pressed #E14D00(선언)

## 7. 페이지 구조 (Page Anatomy)

| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고(열 밖 왼쪽에 걸림) + search-bar pill 600×56 + '…' 드롭다운 pill 316×56, sticky, 띠 배경 없음 | bg | 엔진 footer(0.95) 한 덩어리 → 6개로 나눔(엔진 미분리). search-bar 를 품는다 |
| 2 | announcement-bar | 캠페인 이미지 배너 600×100, radius 8 | 사진 | 변형: pill 이 아니라 이미지 띠. 실제 캠페인이라 LA-7 아님 |
| 3 | category-nav | 흰 타일 4열 × 2행(8개), 아이콘 + 굵은 라벨, 외부 링크만 ↗ | surface 타일 | 모바일에서 사라짐 |
| 4 | board-list | 아이콘 + h2 제목, 한 장의 흰 카드 안에 순번 5행 + 오른쪽 120px 사진 + … | surface | 변형: 조회·글쓴이 대신 추천·댓글 수, 사진 열 추가 |
| 5 | content-list | 아이콘 + h2 제목, 행마다 따로 떨어진 흰 카드 4장(간격 약 8px), 오른쪽 2×2 사진 모자이크 | surface | |
| 6 | footer | 같은 600px 열 안에서 이어짐: 앱 아이콘 + 회색 칩, 4열 링크, 1px 선, 사업자 정보 | bg | 별도 띠 없음. 사업자 정보 있음(KR-6 충족) |
| R | toc | 오른쪽 레일 316px, 지도 카드 316×200 + 안쪽 칩, sticky | surface | 맞는 id 없음 → 가장 가까운 toc(데스크톱 sticky 우측) 변형: 목차 대신 지도 진입. 모바일에서 사라짐 |

리듬: 배경 교차 0번. 페이지 전체가 #F3F4F5 한 면이고 흰 카드 덩어리와 약 40–48px 간격(추정)이 구획을 맡는다. 섹션 제목은 아이콘 + 20px 로 통일.

```text
+--------------------------------------------------------------+
| nav (sticky) logo-out | search-bar pill 600 | trend pill 316 |
+--------------------------------------------------------------+
| announcement-bar  image 600x100     | toc-variant: map card  |
| category-nav  4x2 white tiles       | 316x200, sticky rail   |
| board-list (5)  rank + title + 120 thumb, [more]             |
| content-list (4)  separate cards, 2x2 photo mosaic           |
| footer  app chip + 4 cols + rule + business info  (same col) |
+--------------------------------------------------------------+
```

박스 밖 메모: 오른쪽 레일은 nav 아래부터 페이지 끝까지 고정된다. 가로선은 sticky 상단 줄 경계만 표시했다(배경 교차는 없다).

모바일: 상단은 로고 + 주황 '…' 버튼, 그 아래 전폭 search-bar pill(좌우 16px) → '…' 한 줄(pill 아님, 텍스트 + chevron)
→ announcement-bar 가 화면 끝까지(full-bleed, radius 0) → board-list 카드(좌우 16px, radius 16, 썸네일 120 유지). category-nav 와
지도 레일은 사라진다. 하단 고정 바는 첫 화면에 없다. board-list 아래쪽은 mobile.png 범위 밖이라 확인하지 못했다.

## 8. 따라 할 때 Do / Don't

Do
- 페이지 바닥을 #F3F4F5 로 깔고 모든 묶음을 흰 카드 radius 16 에 담는다. 그림자는 알파 5% 1px 까지만 (무브 1)
- 브랜드색은 로고·아이콘에만 묶고, 주 행동은 흰 pill + #1A1C20 글자로 만든다 (무브 2)
- 본문을 600px 한 열로 묶고, 보조 정보는 316px sticky 레일로 뺀다 (무브 3)
- 위계는 20/18/16/14/13px 과 700/400, 회색 3단계로 끝낸다 (무브 4)
- 목록은 순번·말머리·시간·반응 수를 지키고 사진은 오른쪽 120px 정사각으로 붙인다 (무브 5)
- 따라 할 때는 메타 회색을 #6B7280 이상 진하게, 한글에 `word-break: keep-all` 을 더한다 (원본의 약점 보완)

Don't
- 카드에 1px 테두리와 `shadow-md` 를 함께 두르지 않는다 — 무브 1, SH-5, SH-2
- 주황 그라데이션 히어로나 주황 띠를 깔지 않는다 — 무브 2, CO-4
- 1200px 넓은 컨테이너에 3열 카드 그리드로 콘텐츠를 펼치지 않는다 — 무브 3, 무브 5, LA-1
- 48px 이상 히어로 헤드라인을 얹지 않는다 — 무브 4, LA-6
- 게시글 목록을 이미지 위·제목 아래 카드 피드로 바꾸지 않는다 — 무브 5, KR-6
- 서비스 아이콘을 옅은 둥근 사각 배경 안에 넣거나 이모지로 대신하지 않는다 — IC-2, IC-1

## 9. 폰트 대체 (Font Substitutes)

| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| -apple-system / system-ui (SF Pro, Segoe UI) | OS 시스템 폰트, 임베드 불가 | system-ui 스택 그대로 | Pretendard | 원본은 OS 에 맡긴다. 같은 인상을 모든 OS 에서 얻으려면 Pretendard 를 스택 맨 앞에 둔다 |
| Apple SD Gothic Neo / 맑은 고딕 (OS 한글) | OS 시스템 폰트 | — | Pretendard, Noto Sans KR | 원본은 Windows 에서 맑은 고딕으로 보인다(KR-2 예외: 의도된 앱 UI). 따라 할 땐 웹폰트를 로드한다 |

## 10. 베끼지 말 것 (Don't Copy)

- 당근 로고·당근 심볼·워드마크, 앱 아이콘
- 서비스 타일 아이콘 세트(다색 채움 아이콘)와 불꽃·수저 섹션 아이콘 — 공개 세트로 같은 크기·채움 규칙만 옮긴다
- 사용자 게시글 사진·제목, 맛집 사진, 캠페인 배너 이미지와 문구
- 지도 타일(지도 제공사 자산)
- 서비스 이름·카피·사업자 정보 문구
- 'carotene' 디자인 시스템 변수 이름 그대로 — 값의 구조(bg/fg/stroke × 상태)만 참고한다
- 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)

```text
kr-fintech-simple 계열 포털형 홈(히어로 없음). 페이지 배경 #F3F4F5, 모든 묶음은 흰 카드 radius 16, 테두리 없음, 그림자 0 1px 1px rgba(0,0,0,.05).
레이아웃은 988px 컨테이너 안 600px 메인 열 + 316px sticky 오른쪽 레일, 로고는 메인 열 왼쪽 바깥에 건다. 상단은 600px 흰 pill 검색창(높이 56).
글자는 13/14/16/18/20px 과 굵기 700/400 만, 글자색 #1A1C20 · #555D6D · #6B7280. 주황 #FF6F0F 는 로고·아이콘에만, 버튼은 흰 pill + 검정 글자.
목록 행: 순번 + 16px 굵은 제목 1줄 + 회색 메타(말머리 · 시간) + 반응 수 + 오른쪽 120px 정사각 사진 radius 6.
금지: 주황 그라데이션, 큰 히어로 헤드라인, 3열 카드 그리드, 카드 테두리+진한 그림자, 이모지 아이콘.
```

```text
Portal-style home, no hero, Korean fintech-simple lineage. Page #F3F4F5; every group is a white card, 16px radius, no border, shadow 0 1px 1px rgba(0,0,0,.05).
988px container: 600px main column + 316px sticky right rail; the logo hangs outside the main column on the left. Top: a 600px white pill search field, 56px tall.
Type only 13/14/16/18/20px at weights 700/400; text #1A1C20 / #555D6D / #6B7280. Orange #FF6F0F only on the logo and icons; buttons are white pills with dark text.
List rows: rank + one-line 16px bold title + grey meta + reaction counts + 120px square photo on the right (radius 6). No gradients, big headlines, 3-column card grids or emoji icons.
```

## 부록: 화면 관찰 (Visual Read)

- 랜딩 페이지가 아니라 **포털형 홈**이다. 히어로·h1 카피·CTA 섹션이 없고, 첫 화면부터 검색창 → 배너 → 서비스 타일 8개 →
  인기 글 목록으로 바로 "쓰는 화면"이 나온다.
- 데스크톱 구도: 콘텐츠 940px = 왼쪽 메인 600px + 간격 24px + 오른쪽 레일 316px. 로고(약 76px 폭)는 컨테이너 안이 아니라
  **왼쪽 여백(x≈158)에 걸려** 있어 메인 열의 왼쪽 선(x=250)이 검색창·배너·타일·목록·푸터까지 끊기지 않는다.
- 상단 줄(로고 + 검색창 + '…' 드롭다운)과 오른쪽 레일(지도 카드)이 스크롤해도 따라온다(slices 02–04 에서 같은 위치,
  추정: sticky). 스크롤하면 상단 줄은 y64 → y24 로 올라붙는다.
- 화면 전체가 #F3F4F5 회색 바닥 위에 흰 카드(radius 16)가 떠 있는 구조다. 카드 테두리는 없고, 그림자는 거의 안 보일 만큼
  옅다. 면의 위계는 "회색 바닥 / 흰 카드" 두 단계로 끝난다.
- 오렌지는 로고, 서비스 타일 아이콘 대부분, 불꽃·수저 같은 섹션 아이콘, 지도 칩 아이콘에만 있다. 큰 오렌지 면은 데스크톱에
  하나도 없다(모바일의 '…' 버튼 하나뿐). 그래서 첫 인상은 "회색·흰색 화면에 오렌지 점들".
- 서비스 타일 8개는 각자 색이 다른 24px 내외 아이콘(오렌지·노랑·파랑·핑크보라)을 왼쪽 위에, 굵은 라벨을 왼쪽 아래에 둔다.
  외부로 나가는 타일 3개만 오른쪽 아래에 옅은 ↗ 화살표가 있다.
- 인기 글 목록: 번호(1–5) + 굵은 제목 + 회색 메타(카테고리 · 날짜) + 좋아요/댓글 아이콘 카운트 + 오른쪽 정사각 썸네일
  120px. 사진은 사용자가 찍은 그대로의 생활 사진(강아지, 길거리, 물고기)이라 톤이 제각각이다 — 연출 사진이 없다.
- 맛집 섹션은 카드를 하나로 묶지 않고 행마다 별도 흰 카드(간격 8px)로 나누고, 오른쪽에 2×2 사진 모자이크를 둔다.
  지역 태그는 작은 파란 pill.
- 푸터는 별도 띠가 아니라 같은 회색 바닥, 같은 600px 열 안에서 이어진다. 앱 아이콘 타일 + 회색 pill 칩, 4열 링크, 1px 선,
  사업자 정보. 페이지가 끝까지 하나의 열로 읽힌다.
- 모바일: 로고 + 오렌지 '…' 버튼(높이 약 36px, radius 약 8px) → 전폭 검색 pill → '…' 한 줄 → 배너가
  **화면 끝까지(full-bleed)** → 인기 글 카드. 서비스 타일 8개와 지도 레일은 모바일에서 사라진다.
- 글자는 전부 시스템 산세리프(맥에서 Apple SD Gothic Neo 로 렌더)이고 가장 큰 글자가 20px 이다. 크기 대비가 아니라
  굵기(700 vs 400)와 회색 농도로 위계를 만든다.

## 부록: 측정 메모 (Capture Notes)

- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2. `https://www.daangn.com/` → `/kr/` 로 리다이렉트. 로그아웃·첫 방문
  상태라 지역 기반 콘텐츠(지도 위치, 맛집 지역)는 캡처 시점·위치에 따라 달라진다.
- 경고: `NETWORK_BUSY` (desktop, 8초 안에 네트워크가 잠잠해지지 않음) — 지도 타일·피드 로딩 때문으로 보인다. 스크린샷은 정상 렌더.
  숨긴 오버레이 없음. 슬라이스 4장(페이지 높이 D 2879 / M 2827)으로 페이지 끝까지 들어왔다.
- 엔진 정정(tokens.json 은 그대로 둠):
  - 구조: 엔진이 페이지 전체를 `footer`(0.95) 한 섹션으로 분류했다. 스크린샷으로 nav · announcement-bar · category-nav ·
    board-list · content-list · footer + 오른쪽 레일로 나눴다. 그래서 섹션 여백은 측정 실패로 두었다.
  - 색 'text' 역할: 엔진은 글자 수 기준으로 #555D6D 를 골랐지만(푸터 링크가 많다) 제목·버튼은 #1A1C20 이라 표에서 둘로 나눴다.
  - accent-fg: 엔진 파생 #000000 대신 선언 변수 `fg-on-solid` #FFFFFF 와 화면을 따랐다.
  - 타이포 역할 이름: 엔진 h1(18px) 은 맛집 카드 제목, h2(20px) 는 섹션 제목이다. 크기 순서와 태그 순서가 반대다.
- 신뢰도가 낮은 영역: 타이포 0.71 — 시스템 폰트라 OS 마다 글리프가 다르다. sticky·hover·아이콘 크기·행 높이는 스크린샷 추정.
- 근거 비율: 값이 있는 토큰 행 59개 = 측정 37 · 파생 10 · 선언 7 · 추정 5 → 63 / 17 / 12 / 8%(반올림 합 100). 측정 실패 2행
  (섹션 상하 여백, 포커스 링)은 뺐다.
- 페이지 텍스트에서 지시처럼 보이는 문자열은 없었다.
