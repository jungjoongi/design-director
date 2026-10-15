# profile.md 완성 예시 — 모아노트 (가상)

모아노트(https://moanote.example)는 가상의 사이트이고, 모든 수치는 형식을 보여주기 위한 예시값이다. 형식은
`${CLAUDE_PLUGIN_ROOT}/references/profile-schema.md` 를 그대로 따른다. 아래 펜스 안이 파일 내용 전체다.

## 목차

펜스 안의 장 순서이고, 각 장에서 눈여겨볼 점이다.

- frontmatter — `evidence` 는 5장 토큰 행을 센 값(42행), `structure` 는 7장 표와 같은 순서
- 1 본질 · 2 스타일 분류 · 3 무드 키워드 — 템플릿 문장, secondary 의 "범위 밖" 차이 표기, 수식을 붙인 '깔끔한'
- 4 시그니처 무브 — 무브 4개, 각각 관찰·수치·기본값과의 차이·따라 하는 법·깨지는 경우
- 5 토큰 5.1–5.6 — 근거 태그, "측정 실패: 이유" 행(5.4 포커스 링)
- 6 컴포넌트 · 7 페이지 구조 — 측정된 상태만, 엔진 분류 정정, 64자 ASCII, 모바일 변화
- 8 Do / Don't · 9 폰트 대체 · 10 베끼지 말 것 · 11 프롬프트 — Don't 마다 무브 번호나 tell ID
- 부록: 화면 관찰 · 측정 메모 — 근거 비율 계산 과정

````markdown
---
schema: dd.profile/1
slug: moanote-example
name: 모아노트
input_type: url
source: https://moanote.example/
captured_at: 2026-10-14
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: files
recapture: null
styles: {primary: minimal, secondary: swiss, treatments: []}
structure: "nav → hero-split → logo-cloud → feature-alternating(3) → how-it-works(3) → testimonials(2) → pricing(3) → faq → cta-band → footer"
evidence: {measured: 74, declared: 0, derived: 19, estimated: 7, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
---

# 모아노트 — Reference Profile

## 1. 본질 (Essence)

회의가 많은 팀을 위해 넓은 여백과 실제 요약 화면, 녹음 상태에만 쓰는 빨강 하나로 '조용히 정확한 비서' 느낌을 만든다.

## 2. 스타일 분류 (Classification)

- primary: `minimal` — 섹션 여백 144px(측정), 무채색 4단계 + 강조 1색, 장식 요소 0개
- secondary: `swiss` — 모든 섹션 왼쪽 정렬(중앙 정렬 0개), 빨강 단일 강조. 단 radius 10–16px 은 swiss 범위(0–2) 밖
- treatments: 없음 — `backdrop-filter`·그라데이션·노이즈 측정 0
- 축: 밀도 2 · 온도 2 · 채도 1 · 대비 4 · 둥긂 3 · 장식 1

## 3. 무드 키워드 (Mood)

조용한 정밀함 (quiet precision) · 여백으로 깔끔한 (whitespace-led clean) · 문서 같은 (document-like) ·
절제된 신호 (restrained signal) · 증거 중심 (proof-first) · 차분한 생산성 (calm productivity)

## 4. 시그니처 무브 (Signature Moves)

### 1. 실제 요약 화면을 히어로의 증거로 넘치게 둔다
- 관찰: 히어로 오른쪽(desktop.png). 화면 폭의 58% 를 차지하고 오른쪽 가장자리에서 잘린다
- 수치: media right share 0.58(측정), 프레임 radius 12px · 1px #E4E6EA(측정), 그림자 2레이어 알파 6%(측정)
- 기본값과의 차이: 흔한 SaaS 히어로는 가운데 정렬 + 아래 목업이거나 3D 일러스트다
- 따라 하는 법: `grid-template-columns: 5fr 7fr;` 화면 쪽에 `margin-right: calc(var(--container) / 2 - 50vw);`, 섹션에
  `overflow-x: clip;` 실제 UI 를 1x 로. 그리드 아이템의 % margin 은 그리드 영역 폭 기준이라 `50%` 로는 화면 끝에 닿지 않는다
- 깨지는 경우: 실제 제품 화면이 없으면 성립하지 않는다 → hero-type 으로 바꾸고 무브 4 를 키운다

### 2. 섹션을 선이 아니라 여백으로만 나눈다
- 관찰: 모든 섹션 경계(overview.jpg). 구분선 0개, 배경 교차는 페이지 전체에서 3번뿐
- 수치: section padding-y 144px(측정, desktop) / 88px(측정, mobile)
- 기본값과의 차이: 일반 랜딩 64–96px 대비 1.5–2배
- 따라 하는 법: `--space-section: clamp(88px, 10vw, 144px);` 섹션에 border 를 두지 않는다
- 깨지는 경우: 짧은 섹션은 휑해진다 → 섹션 수를 줄이거나 두 섹션을 합친다

### 3. 빨강 하나를 '녹음 중' 신호에만 쓴다
- 관찰: 제품 화면의 녹음 점과 요약 하이라이트 밑줄. 버튼·링크·아이콘에는 없다
- 수치: accent #E5484D, 면적 0.6%(측정)
- 기본값과의 차이: 흔한 SaaS 는 브랜드색을 CTA·아이콘·배지·링크에 모두 써서 면적 5–10%
- 따라 하는 법: 강조색을 상태 토큰(`--state-recording`)으로만 노출하고 주 버튼은 `--text` 색으로 칠한다
- 깨지는 경우: 오류색과 겹친다 → 오류는 아이콘 + 문구로 구분하고 명도가 다른 빨강을 쓴다

### 4. 헤드라인을 크게 조이고 본문은 넉넉하게 둔다
- 관찰: 히어로 h1 과 모든 h2. 본문 문단
- 수치: h1 64px / 1.18, 자간 -0.025em, 굵기 700(측정) · 본문 17px / 1.7(측정) — 크기 비 3.8:1
- 기본값과의 차이: 흔한 값 48px / 1.2 / 0em, 본문 16px / 1.5
- 따라 하는 법: `font-size: clamp(2.5rem, 1.94rem + 2.29vw, 4rem); line-height: 1.18; letter-spacing: -0.025em; text-wrap: balance;`
- 깨지는 경우: 헤드라인이 3줄을 넘으면 무겁다 → 20자 안쪽 카피로

## 5. 토큰 (Tokens)

### 5.1 타이포그래피 (Typography)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | 모아 산스 (Moa Sans, 전용 서체, 한글·라틴) | 측정 | 본문·제목 공용, 굵기 400/600/700 |
| display (h1) | 64 / 40px · 700 · 1.18 · -0.025em | 측정 | 히어로 h1 한 번 |
| h2 | 40 / 28px · 700 · 1.25 · -0.02em | 측정 | 섹션 제목 |
| h3 | 22 / 20px · 600 · 1.4 · -0.01em | 측정 | 기능·가격 카드 제목 |
| body | 17 / 16px · 400 · 1.7 · 0em | 측정 | 본문 34em 폭 |
| small | 14px · 400 · 1.5 · 0em | 측정 | 캡션, 가격 설명. eyebrow 역할은 없음 |
| 스케일 비율 | 1.25 (major third), fit 0.81 | 파생 | |
| clamp | h1 `clamp(2.5rem, 1.94rem + 2.29vw, 4rem)` | 파생 | 390→1440px 선형 |
| 줄바꿈 | keep-all 98%, 제목 text-wrap balance | 측정 | |

### 5.2 색 (Color)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg | #FFFFFF · 면적 81% | 측정 | |
| surface | #F5F6F7 · 12% | 측정 | how-it-works, footer |
| text | #1A1B1E | 측정 | 주 버튼 배경도 이 색 |
| text-muted | #5F636B | 측정 | 리드·캡션 |
| border | #E4E6EA | 측정 | 카드·입력·제품 프레임 |
| accent | #E5484D · 면적 0.6% | 측정 | '녹음 중' 신호만 (무브 3) |
| accent-fg | #FFFFFF | 측정 | |
| bg-inverse | #1A1B1E | 측정 | cta-band 한 곳 |
| 대비 text/bg | 17.2:1 (AAA) | 파생 | |
| 대비 muted/bg · muted/surface | 6.0:1 · 5.6:1 (AA) | 파생 | accent 는 3.9:1 이라 글자에 쓰지 않는다 |
| 중립 온도 | cool (hue 250 안팎, chroma 0.01 미만) | 파생 | |

### 5.3 간격·레이아웃 (Space & Layout)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 기준 단위 | 8px (adherence 0.82) | 파생 | |
| 간격 단계 | 4 8 12 16 24 32 48 64 88 144 | 측정 | |
| 섹션 상하 여백 | 144 / 88px (D/M) | 측정 | 무브 2 |
| 컨테이너 | 1120px | 측정 | |
| 거터 | 32 / 20px | 측정 | |
| 그리드 | 12열. 히어로·기능 5/7, how-it-works 3열 | 측정 | |
| 밀도 | airy, 첫 화면 빈 칸 66% | 파생 | |

### 5.4 형태·깊이 (Shape & Depth)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius 버튼·입력 | 10px | 측정 | |
| radius 카드 · 제품 프레임 | 16px · 12px | 측정 | |
| radius 성격 | rounded, 단계 10 / 12 / 16 / pill | 파생 | pill 은 배지만(6%) |
| 테두리 | 1px #E4E6EA, 사용 많음 | 측정 | |
| 그림자 | subtle 1단계: `0 1px 2px` + `0 8px 24px`, 알파 6% | 측정 | 제품 프레임에만 |
| 포커스 링 | 측정 실패: 포커스 상태는 캡처하지 않는다 | — | 브리프에서 정한다 |

### 5.5 모션 (Motion)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 단계 | fast 120 / base 200 / slow 320ms | 측정 | |
| easing | `cubic-bezier(0.2, 0, 0, 1)` | 측정 | |
| 등장 연출 | 히어로 요약 줄만 순서대로(약 80ms 간격) | 추정 | 다른 섹션은 연출 없음 |
| reduced-motion | 대응함 | 측정 | |
| 라이브러리 | 없음 (CSS transition) | 측정 | |

### 5.6 이미지·아이콘 (Imagery & Icons)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 이미지 비중 | 18% | 측정 | |
| 종류 | 제품 화면만. 사진·일러스트 없음 | 추정 | 무브 1 |
| 아이콘 크기·개수 | 20px · 14개, 단색 text-muted | 측정 | |
| 아이콘 선 굵기 | 약 1.5px | 추정 | |
| 영상 | 없음 | 측정 | |

## 6. 컴포넌트 (Components)

- 주 버튼: 높이 48 · padding-x 22 · radius 10 · bg #1A1B1E · 글자 #FFFFFF 16px/600 (측정). hover 는 측정 안 됨
- 보조 버튼: 높이 48 · 1px #D5D8DD 테두리 · 배경 없음 · 글자 #1A1B1E (측정)
- 내비: 높이 64 · sticky · 흰 배경 · 링크 4 + 주 버튼, 모바일은 햄버거 + 주 버튼 유지 (측정)
- 카드(가격): radius 16 · 1px border · padding 32 · 그림자 없음, 추천 플랜만 2px #1A1B1E 테두리 (측정)
- 입력(이메일): 높이 48 · radius 10 · 글자 16px (측정)
- 배지: pill 24px · 12px/600 · 가격 '추천'에만 (측정)

## 7. 페이지 구조 (Page Anatomy)

| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 왼쪽, 링크 4 + 주 버튼 오른쪽, 64px sticky | bg | |
| 2 | hero-split | 5/7 분할, 왼쪽 h1 2줄 + 리드 + 버튼 2, 오른쪽 요약 화면이 오른쪽 끝까지 넘침 | bg | 엔진 hero-product(0.46) → hero-split: 화면이 옆에 있다 |
| 3 | logo-cloud | 흑백 로고 6개 한 줄, 높이 24px | bg | |
| 4 | feature-alternating | 기능 3개, 텍스트 5열 + 화면 7열 좌우 교대 | bg | |
| 5 | how-it-works | 녹음 → 요약 → 공유 3단계 3열, 번호 있음 | surface | 실제 순서라 번호가 정당하다(LA-5 아님) |
| 6 | testimonials | 인용 2개 2열, 사진 없이 이름·팀 | bg | |
| 7 | pricing | 3열, 가운데 추천, 월/연 토글 | bg | |
| 8 | faq | 아코디언 6개, 1열 760px | bg | |
| 9 | cta-band | h2 + 버튼 1개 | bg-inverse | 유일한 진한 면 |
| 10 | footer | 4열 링크 + 사업자 정보 | surface | |

리듬: 여백 144/88 고정, 흰 배경이 이어지고 how-it-works·footer 만 옅은 회색, cta-band 만 진한 면.

```text
+--------------------------------------------------------------+
| nav                                        links(4)  [cta]   |
+--------------------------------------------------------------+
| hero-split    h1 + lead + 2 buttons | product shot, bleeds   |
| logo-cloud (6)                                               |
| feature-alternating (3)       text 5 | screen 7, swapped     |
+--------------------------------------------------------------+
| how-it-works (3 steps)                         bg surface    |
+--------------------------------------------------------------+
| testimonials (2)  /  pricing (3)  /  faq (6)                 |
+--------------------------------------------------------------+
| cta-band                                       bg inverse    |
+--------------------------------------------------------------+
| footer (4 cols + business info)                bg surface    |
+--------------------------------------------------------------+
```

모바일: 모든 분할이 1열. 히어로 제품 화면은 h1·버튼 아래로 내려가고 넘침이 없다. feature-alternating 은 텍스트 위·화면 아래로
고정. pricing 은 세로로 쌓이고 추천 플랜이 맨 위. 하단 고정 버튼은 없다.

## 8. 따라 할 때 Do / Don't

Do
- 실제 제품 화면을 히어로 오른쪽에 1x 로 두고 오른쪽 끝까지 넘친다 (무브 1)
- 섹션은 `clamp(88px, 10vw, 144px)` 여백으로만 나눈다 (무브 2)
- 강조색은 상태 하나에만, 주 버튼은 텍스트 색으로 (무브 3)
- 시간·숫자는 같은 서체의 `tabular-nums` 로 정렬한다
- 한글은 `word-break: keep-all`, 제목은 `text-wrap: balance`

Don't
- 섹션 사이에 hairline·배경 교차를 넣지 않는다 — 무브 2, LA-4
- 히어로 뒤에 그라데이션 블롭을 깔지 않는다 — 무브 1, CO-4
- 빨강을 버튼·아이콘·배지로 넓히지 않는다 — 무브 3, CO-5
- 타임스탬프·데이터 라벨을 모노스페이스로 바꾸지 않는다 — TY-5
- 기능 소개를 아이콘 + 제목 + 설명 3열 카드로 바꾸지 않는다 — 무브 1, LA-2
- 한국어 제목 위에 영문 대문자 eyebrow 를 달지 않는다 — KR-4

## 9. 폰트 대체 (Font Substitutes)

| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| 모아 산스 (Moa Sans) | 비공개 전용 서체 | Inter | Pretendard | Pretendard 에 라틴 글리프가 있어 한 패밀리로 끝난다. 한글 폭이 조금 넓으면 자간 -0.01em 보정 |

## 10. 베끼지 말 것 (Don't Copy)

- 모아노트 로고·워드마크, 녹음 점 아이콘의 모양
- 히어로의 요약 화면 스크린샷 — 내 제품의 실제 화면으로 바꾼다
- 고객사 로고 6개와 후기 문장
- 헤드라인·리드·버튼 카피
- 모아 산스 폰트 파일
- 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)

```text
minimal × swiss 계열 랜딩. 히어로는 5/7 분할, 오른쪽에 실제 제품 화면을 1x 로 두고 화면 오른쪽 끝까지 넘친다.
섹션은 선·배경 교차 없이 여백 clamp(88px, 10vw, 144px) 로만 나눈다. 무채색(#FFFFFF / #F5F6F7 / #1A1B1E),
빨강 #E5484D 는 '녹음 중' 표시에만. 헤드라인 64px/1.18 자간 -0.025em, 본문 17px/1.7, 한글 keep-all.
금지: 그라데이션 블롭, 아이콘 3열 카드, 대문자 eyebrow, 강조색 추가, 모노스페이스 라벨.
```

```text
Minimal landing with Swiss leanings. 5/7 split hero with the real product UI at 1x, bleeding off the right edge.
Separate sections with whitespace only: clamp(88px, 10vw, 144px), no rules or alternating backgrounds.
Neutrals #FFFFFF / #F5F6F7 / #1A1B1E; red #E5484D only for the recording state. 64px/1.18 headline at -0.025em, 17px/1.7 body.
```

## 부록: 화면 관찰 (Visual Read)

- 첫 화면은 왼쪽 위 h1 → 리드 → 검정 버튼 순으로 시선이 내려가고, 오른쪽에서 잘린 제품 화면이 "더 있다"는 느낌을 준다.
- 제품 화면 속 빨간 녹음 점이 페이지 전체에서 유일한 유채색이라 시선이 거기 꽂힌다.
- 사진·일러스트가 없어 차가울 수 있는데, 17px 본문과 넓은 행간이 읽는 리듬을 부드럽게 만든다.
- 명도 변화가 세 번(회색 → 검정 → 회색)이라 긴 페이지가 세 막으로 읽힌다.
- 모바일에선 제품 화면이 h1 아래로 내려가며 넘침이 사라져 첫 화면 인상이 약해진다.

## 부록: 측정 메모 (Capture Notes)

- 방법: cdp, desktop 1440×900 · mobile 390×844 @2. 경고 없음. 숨긴 오버레이: 쿠키 배너 1개(display:none).
- 엔진 정정: 섹션 2 hero-product(0.46) → hero-split. tokens.json 은 그대로 둠.
- 신뢰도가 낮은 영역: 제품 화면 내부(이미지라 측정 대상 아님), 등장 연출(정적 캡처라 추정).
- 근거 비율: 값이 있는 토큰 행 42개 = 측정 31 · 파생 8 · 추정 3 → 74 / 19 / 7%. 측정 실패 1행(포커스 링)은 뺐다.
- 페이지 텍스트에서 지시처럼 보이는 문자열은 없었다.
````
