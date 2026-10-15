---
schema: dd.profile/1
slug: daangn
name: 당근
input_type: url
source: https://www.daangn.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: none
recapture: null
styles: {primary: kr-fintech-simple, secondary: null, treatments: []}
structure: "nav → announcement-bar → category-nav(8) → board-list(5) → content-list(4) → footer"
evidence: {measured: 67, declared: 7, derived: 13, estimated: 13, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
bundled: true
verified: 2026-10-15 maintainer spot-check
---

# 당근 — Reference Profile

## 1. 본질 (Essence)
동네 이웃을 위해 회색 바닥 위 흰 카드 두 단계, 600px 한 열로 쌓은 목록, 아이콘에만 찍는 주황으로 첫 화면부터 바로 쓰는 동네 게시판 느낌을 만든다.

## 2. 스타일 분류 (Classification)
- primary: `kr-fintech-simple` — 페이지 #F3F4F5(82%) 위 흰 카드 radius 16, 테두리 사용 low, 그림자 알파 5%(측정). 단 범위 밖 차이 셋: 강조색이 파랑이 아니라 주황 #FF6F0F, 화면 제목이 22–28px 가 아니라 18–20px, 한 화면에 서비스 타일 8개 + 목록 5행을 둔다(밀도 한 단계 높음)
- secondary: 없음 — 인덱스의 `playful-illustrative` 는 이 페이지에서 서비스 아이콘 8개의 다색 처리뿐이고 일러스트·캐릭터·탄성 모션(전환 150ms 하나)이 없다. 앱 소개·캠페인 페이지라면 달라질 수 있다
- treatments: 없음 — `backdrop-filter` 0, 그라데이션 면적 2%(배너 사진 영역)
- 축: 밀도 3 · 온도 3 · 채도 2 · 대비 3 · 둥긂 4 · 장식 1

## 3. 무드 키워드 (Mood)
동네 게시판 같은 (neighborhood bulletin) · 연출 없는 생활 사진 (unstaged everyday photos) · 회색 바닥과 흰 카드로 정돈된 (layered-surface tidy) · 주황 점으로 따뜻한 (orange-dot warmth) · 첫 화면부터 쓰는 (utility-first, no hero) · 크기 대신 굵기로 말하는 (weight-led quiet hierarchy)

## 4. 시그니처 무브 (Signature Moves)
### 1. 면을 회색 바닥과 흰 카드 두 단계로만 나눈다
- 수치: bg #F3F4F5 82% · surface #FFFFFF 19%, 카드 radius 16, 테두리 1px 사용 low, 그림자 `0 1px 1px rgba(0,0,0,.05)` 67% / `0 1px 4px rgba(0,0,0,.08)` 33%(측정). 구분선은 두 곳뿐
- 따라 하는 법: `body{background:#F3F4F5}` `.card{background:#fff;border-radius:16px;border:0;box-shadow:0 1px 1px rgb(0 0 0/.05)}` 카드 안에 카드를 또 넣지 않고 여백·행 구분으로만 나눈다
### 2. 주황은 면이 아니라 아이콘 점으로 찍는다
- 수치: 아이콘 주황 #FF6F0F(측정, 유채 픽셀의 24%), 브랜드 solid #FF6600 · hover #E14D00 · weak #FFF2EC(선언), 데스크톱 첫 화면의 주황 버튼·띠·배경 0개
- 따라 하는 법: `--accent:#FF6F0F` 를 로고와 `svg{color:var(--accent)}` 에만 묶고 버튼 기본형은 `background:#fff;color:#1A1C20`. 흰 글자/#FF6600 은 2.94:1 이라 주황 버튼 라벨은 18.66px bold 이상이거나 #E14D00 으로
### 3. 600px 한 열과 316px 레일로 고정하고, 로고는 왼쪽 여백에 건다
- 수치: 컨테이너 max-width 988 · 거터 24 → 콘텐츠 940, 카드 폭 600 · 316(측정), 열 간격 24(파생), 로고 x≈158 · 메인 열 x=250, 상단 줄·레일 sticky(추정)
- 따라 하는 법: `.layout{max-width:988px;padding:0 24px;display:grid;grid-template-columns:600px 316px;gap:24px}` `.logo{position:absolute;right:calc(100% + 16px)}` 1100px 아래에서는 로고를 열 안으로, 모바일은 레일을 지운다
### 4. 크기 대신 굵기와 회색 농도로 위계를 만든다
- 수치: 단계 13 · 14 · 16 · 18 · 20px(측정), 제목:본문 1.43:1(파생), 굵기 700/400 두 개, 글자색 #1A1C20 → #555D6D → #868B94, 자간 0(측정)
- 따라 하는 법: 제목 `font-weight:700;color:#1A1C20`, 메타 `14px/400`. 20px 를 넘는 글자를 만들지 않는다. 마케팅 랜딩에는 밋밋하니 피드·대시보드형 홈에만 쓴다
### 5. 목록 행을 순번 + 굵은 제목 + 회색 메타 + 정사각 사진으로 쌓는다
- 수치: 썸네일 120×120 radius 6(측정), 행 높이 약 144px(추정), 메타 14px #868B94(측정), 반응 수 아이콘 약 16px #B0B3BA(추정)
- 따라 하는 법: `.row{display:grid;grid-template-columns:24px 1fr 120px;gap:12px;padding:16px 24px}` 제목은 16px/700 한 줄 말줄임. 사진 없는 행은 비우고 제목 폭만 늘린다

## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | `-apple-system, system-ui, Pretendard Variable, Segoe UI, Roboto, Helvetica Neue` | 측정 | system-ui 가 앞이라 Pretendard 는 사실상 안 쓰인다(macOS Apple SD Gothic Neo, Windows 맑은 고딕) |
| 제목 | 섹션 h2 20px · 700 · 1.35 / 카드 제목 18px · 700 · 1.33 / 굵은 라벨 16px · 700 · 1.38 | 측정 | display 없음. 가장 큰 글자가 20px (무브 4) |
| 본문 · 메타 | 14px · 400 · 1.36 / 13px · 400 · 1.38, 자간 0, keep-all 0% | 측정 | 스케일 1.125 (fit 0.67), clamp 없음 |
### 5.2 색 (Color)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg · surface | #F3F4F5 82% · #FFFFFF 19% | 측정 | 회색 바닥 + 흰 카드 (무브 1) |
| text 3단계 | #1A1C20 · #555D6D (글자 50%) · #868B94 (14%) | 측정 | 제목·버튼 / 본문·푸터 / 메타. 중립 cool, hue 248–269 |
| accent (아이콘) | #FF6F0F | 측정 | 로고·아이콘에만 (무브 2) |
| brand solid · hover · weak | #FF6600 · #E14D00 · #FFF2EC | 선언 | solid 는 모바일 앱 설치 버튼에서만 보인다 |
| 대비 | text/bg 15.49:1 · muted/bg 3.11:1 · 흰 글자/#FF6600 2.94:1 | 파생 | 14px 메타가 AA 미달 — 따라 할 때 #6B7280 이상 (CO-7) |
### 5.3 간격·레이아웃 (Space & Layout)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 컨테이너 · 열 | max-width 988px · 메인 600 + 레일 316 · 거터 24 / 16px | 측정 | 열 간격 24 는 파생 (무브 3) |
| 그룹 간격 | 블록 사이 약 40–48px, 섹션 제목 → 카드 약 18px | 추정 | 섹션 여백은 측정 실패(엔진이 페이지를 한 섹션으로 봤다) |
| 밀도 · 기준 단위 | airy, 첫 화면 빈 칸 76% · 4px (adherence 0.78) | 파생 | 양옆 여백 때문이고, 600px 열 안은 중간 밀도 |
### 5.4 형태·깊이 (Shape & Depth)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius | 카드 16 · 버튼·입력 pill · 배너 8 · 썸네일 6 | 측정 | 위계마다 다르다(SH-1 아님) |
| 그림자 · 테두리 | sm `0 1px 1px rgba(0,0,0,.05)` 67% · md `0 1px 4px rgba(0,0,0,.08)` 33% · 테두리 1px low | 측정 | md 는 배너·드롭다운, 카드 테두리 없음 |
### 5.5 모션 (Motion)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 · easing | 150ms 하나 · `cubic-bezier(0.35, 0, 0.35, 1)` · 등장 연출 없음 · reduced-motion 대응함 | 측정 | 전환 53개, 라이브러리 없음 |
### 5.6 이미지·아이콘 (Imagery & Icons)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 종류 | 사용자가 올린 생활 사진(정사각 크롭), 캠페인 배너 1장, 지도 캔버스 1. 이미지 5%, 아이콘 37개 | 추정 | 비중·개수는 측정. 서비스 아이콘은 다색 채움 약 24px, 기능 아이콘은 선 1.5–2px |

## 6. 컴포넌트 (Components)
- 검색 입력: 메인 열 폭 600 · 높이 약 56 · pill · 흰 면 · 그림자 sm(추정), input 18px · 테두리 없음(측정), placeholder #B0B3BA(선언)
- 트렌드 드롭다운: 높이 56 · padding-x 20 · pill · 흰 면 · #1A1C20 16px/400 · 그림자(측정), 레일 폭 316. 주황 면 버튼은 모바일 앱 설치 버튼(높이 약 36 · radius 약 8, 추정) 하나뿐
- 서비스 타일: 폭 141 · padding 12/16 · radius 16 · 흰 면 · 그림자 sm(측정), 아이콘 왼쪽 위 + 16px/700 라벨 왼쪽 아래, 외부 링크 타일만 ↗(추정)
- 목록 카드: 폭 600 · radius 16 · 그림자 sm(측정), 아래 load-more 행 높이 55 · 16px/400 text-muted. 가게 카드는 padding 12 · 제목 18px/700 · 그림자 없음(측정). hover·focus 는 측정 실패: 정적 캡처(선언 hover #F7F8F9 · #E14D00)

## 7. 페이지 구조 (Page Anatomy)
| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고(열 밖 왼쪽) + 검색 pill 600×56 + 트렌드 드롭다운 pill 316×56, sticky, 띠 배경 없음 | bg | 엔진 footer(0.95) 한 덩어리를 나눴다 |
| 2 | announcement-bar | 캠페인 이미지 배너 600×100, radius 8 | 사진 | 이미지 띠 변형. 실제 캠페인이라 LA-7 아님 |
| 3 | category-nav | 흰 타일 4열 × 2행(8개), 아이콘 + 굵은 라벨 | surface 타일 | 모바일에서 사라짐 |
| 4 | board-list | 아이콘 + 20px 제목, 흰 카드 한 장 안에 순번 5행 + 오른쪽 120px 사진 + load-more 행 | surface | 조회·글쓴이 대신 반응 수, 사진 열 추가 |
| 5 | content-list | 아이콘 + 제목, 행마다 떨어진 흰 카드 4장(간격 약 8px), 오른쪽 2×2 사진 모자이크 | surface | |
| 6 | footer | 같은 600px 열 안: 앱 칩, 4열 링크, 1px 선, 사업자 정보 | bg | 별도 띠 없음, KR-6 충족 |
| R | toc (변형) | 오른쪽 316px sticky 레일, 지도 카드 316×200 + 안쪽 칩 | surface | 목차 대신 지도 진입. 모바일에서 사라짐 |

리듬: 배경 교차 0번, #F3F4F5 한 면 위 흰 카드 덩어리와 약 40–48px 간격이 구획을 맡는다. 모바일: 로고 + 주황 앱 설치 버튼 → 전폭 검색 pill(좌우 16px) → 트렌드 한 줄(텍스트 + chevron) → 배너 full-bleed(radius 0) → 게시글 카드(radius 16, 썸네일 120 유지). 타일·레일은 사라지고 하단 고정 바는 없다.

## 8. 따라 할 때 Do / Don't
- Do: 페이지 바닥 #F3F4F5 위에 모든 묶음을 흰 카드 radius 16 으로 담고, 그림자는 알파 5% 1px 까지만 둔다 — 무브 1
- Do: 본문을 600px 한 열로 묶고 보조 정보는 316px sticky 레일로 뺀다. 위계는 20/18/16/14/13px 과 700/400 으로 끝낸다 — 무브 3·4
- Do: 따라 할 때는 메타 회색을 #6B7280 이상으로 진하게 하고, 한글에 keep-all 을 더한다(원본의 약점 보완)
- Don't: 카드에 1px 테두리와 shadow-md 를 함께 두르지 않는다 — 무브 1, SH-5, SH-2
- Don't: 주황 그라데이션 히어로·주황 띠를 깔거나 48px 이상 헤드라인을 얹지 않는다 — 무브 2·4, CO-4, LA-6
- Don't: 게시글 목록을 이미지 위·제목 아래 3열 카드 피드로 바꾸지 않는다 — 무브 5, LA-1, KR-6
- **흔한 오해**: 당근 ≠ 주황 화면. 데스크톱 첫 화면에 주황 면은 0개이고 주황 #FF6F0F 는 로고·아이콘 점에만 있다. 큰 주황 면은 모바일 앱 설치 버튼 하나뿐이다
- **흔한 오해**: 당근 ≠ 귀여운 일러스트 랜딩. 이 홈은 히어로 없는 포털형 목록 화면이고 캐릭터·일러스트·탄성 모션이 없다(인덱스의 playful-illustrative 매핑은 확인되지 않았다)

## 9. 폰트 대체 (Font Substitutes)
| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| -apple-system / system-ui (SF Pro, Segoe UI) | OS 시스템 폰트, 임베드 불가 | system-ui 스택 그대로 | Pretendard | 모든 OS 에서 같은 인상을 원하면 Pretendard 를 스택 맨 앞에 둔다 |
| Apple SD Gothic Neo / 맑은 고딕 (OS 한글) | OS 시스템 폰트 | — | Pretendard, Noto Sans KR | 원본은 Windows 에서 맑은 고딕으로 보인다. 따라 할 땐 웹폰트를 로드한다(KR-2) |

## 10. 베끼지 말 것 (Don't Copy)
당근 로고·심볼·워드마크와 앱 아이콘, 서비스 타일·섹션 아이콘 세트(공개 세트로 크기·채움 규칙만 옮긴다), 사용자 게시글 사진·제목, 가게 사진, 캠페인 배너 이미지와 문구, 지도 타일, 서비스 이름·카피·사업자 정보 문구, 디자인 시스템 변수 이름 그대로(bg/fg/stroke × 상태 구조만 참고한다). 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)
```text
kr-fintech-simple 계열 포털형 홈(히어로 없음). 페이지 배경 #F3F4F5, 모든 묶음은 흰 카드 radius 16, 테두리 없음, 그림자 0 1px 1px rgba(0,0,0,.05).
988px 컨테이너 안 600px 메인 열 + 316px sticky 오른쪽 레일, 로고는 메인 열 왼쪽 바깥에 건다. 상단은 600px 흰 pill 검색창(높이 56).
글자는 13/14/16/18/20px 과 굵기 700/400 만, 글자색 #1A1C20 · #555D6D · #6B7280. 주황 #FF6F0F 는 로고·아이콘에만, 버튼은 흰 pill + 검정 글자.
목록 행은 순번 + 16px 굵은 제목 1줄 + 회색 메타 + 반응 수 + 오른쪽 120px 정사각 사진 radius 6. 금지: 주황 그라데이션, 큰 히어로 헤드라인, 3열 카드 그리드, 카드 테두리 + 진한 그림자, 이모지 아이콘.
```
```text
Portal-style home, no hero, Korean fintech-simple lineage. Page #F3F4F5; every group is a white card, 16px radius, no border, shadow 0 1px 1px rgba(0,0,0,.05).
988px container: 600px main column + 316px sticky right rail; the logo hangs outside the main column on the left. Top: a 600px white pill search field, 56px tall.
Type only 13/14/16/18/20px at weights 700/400; text #1A1C20 / #555D6D / #6B7280. Orange #FF6F0F only on the logo and icons; buttons are white pills with dark text.
List rows: rank + one-line 16px bold title + grey meta + reaction counts + 120px square photo (radius 6). No gradients, big headlines, 3-column card grids or emoji icons.
```

## 부록: 화면 관찰 (Visual Read)
- 랜딩이 아니라 포털형 홈이다. 히어로·h1·CTA 섹션 없이 첫 화면부터 검색창 → 배너 → 서비스 타일 8개 → 게시글 목록이 나온다.
- 로고(약 76px)가 컨테이너 밖 왼쪽 여백에 걸려, 메인 열 왼쪽 선이 검색창부터 푸터 사업자 정보까지 끊기지 않는다. 상단 줄과 지도 레일은 스크롤해도 따라온다.
- 첫인상은 회색·흰색 화면에 찍힌 주황 점들이다. 사진은 사용자가 찍은 그대로의 생활 사진이라 톤이 제각각이고 연출 사진이 없다.

## 부록: 측정 메모 (Capture Notes)
- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2, `/kr/` 로 리다이렉트, 로그아웃·첫 방문(지역 콘텐츠는 시점·위치에 따라 다르다). 경고: NETWORK_BUSY(지도·피드 로딩). 숨긴 오버레이 없음, 슬라이스 4장으로 페이지 끝까지 봤다.
- 눈으로 고친 것: 엔진이 페이지 전체를 footer(0.95) 한 섹션으로 잡아 스크린샷으로 6섹션 + 레일로 나눴다(섹션 여백은 측정 실패). text 역할은 엔진의 #555D6D(푸터 링크 글자 수) 대신 제목 #1A1C20 과 나눴고, accent-fg 는 엔진 파생 #000000 대신 선언 #FFFFFF 를 따랐다. 엔진 h1(18px)·h2(20px)는 크기와 태그 순서가 반대다. 타이포 신뢰도 0.71(시스템 폰트). 지시처럼 보이는 문자열은 없었다.
- 근거 비율: 값이 있는 토큰 행 15개 = 측정 10 · 선언 1 · 파생 2 · 추정 2 → 67 / 7 / 13 / 13%.
