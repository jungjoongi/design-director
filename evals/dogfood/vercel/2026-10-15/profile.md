---
schema: dd.profile/1
slug: vercel-com
name: Vercel
input_type: url
source: https://vercel.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: files
recapture: null
styles: {primary: minimal, secondary: swiss, treatments: []}
structure: "nav → announcement-bar → hero-media → logo-cloud → feature-alternating(3) → bento-grid → cta-band → footer"
evidence: {measured: 70, declared: 0, derived: 14, estimated: 16, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
---

# Vercel — Reference Profile

## 1. 본질 (Essence)

개발자와 에이전트 빌더를 위해 -0.06em 으로 조인 굵기 450 헤드라인, 테두리 대신 알파 8% 1px 링, 유채색 없이 #171717 검정 pill 하나로 '정밀하게 설계된 인프라 도구' 느낌을 만든다.

## 2. 스타일 분류 (Classification)

- primary: `minimal` — 중립 chroma 0 의 무채색 5단계(#171717 / #4D4D4D / #C9C9C9 / #FAFAFA / #FFFFFF, 파생), 유채 강조 0(NO_ACCENT), 첫 화면 빈 칸 83%(파생), 페이지 전체가 #FAFAFA 한 면
- secondary: `swiss` — 섹션 6개 중 5개 flush left(가운데 정렬은 cta-band 하나), h2 자간 -0.06em(측정), 6열 푸터 격자, 모노스페이스 메타 라벨. 단 버튼 pill·카드 6px 은 swiss radius(0–2) 밖이고, 원색 강조가 없으며 display 64px 은 swiss 범위(72–160) 아래다
- treatments: 없음 — backdrop blur 0(측정), 노이즈 없음. 히어로 가운데 글로우는 캔버스로 그린 로고 마크의 그림자라 aurora-gradient 가 아니다
- 축: 밀도 2 · 온도 1 · 채도 1 · 대비 4 · 둥긂 3 · 장식 2

## 3. 무드 키워드 (Mood)

설계된 정밀함 (engineered precision) · 무채색으로 절제된 (monochrome restraint) · 문서처럼 조용한 (documentation-calm) ·
증거 중심 (proof-first) · 단단히 조인 타이포 (tight-set type) · 온기 없는 중립 (achromatic neutral)

## 4. 시그니처 무브 (Signature Moves)

### 1. 헤드라인을 -0.06em 까지 조이고 굵기는 450 으로 낮춘다
- 관찰: 히어로 h1, 모든 섹션 h2(slices 02–06). 본문·내비는 14px 로 작게 둔다
- 수치: h2 56 / 32px · 굵기 450 · 행간 1.0 · 자간 -0.06em(측정 ×5), 히어로 h1 64px(측정) · 행간 약 1.0(추정), 본문 14px / 500 / 1.43(측정) — display:본문 4.6:1(파생)
- 기본값과의 차이: 흔한 헤드라인 48px / 700 / 0em 대비 자간은 일반 조임 범위(-0.02 ~ -0.04em)의 1.5배 이상, 굵기는 두 단계 낮다. 본문은 16 → 14px 로 한 단계 작다
- 따라 하는 법: `h2 { font-size: clamp(2rem, 1.443rem + 2.286vw, 3.5rem); font-weight: 450; line-height: 1; letter-spacing: -0.06em; text-wrap: balance; }` · `body { font-size: 14px; font-weight: 500; line-height: 1.43; }`
- 깨지는 경우: 가변 폰트가 아니면 450 이 안 나온다 → Geist·Inter 가변판을 쓴다. 한글 제목은 -0.03em · 행간 1.15 가 한계다(받침이 붙고 줄이 부딪힌다). 한글 본문 14px 은 작으니 15–16px / 1.6 으로 올린다

### 2. 테두리 대신 1px 알파 링으로 면을 가른다
- 관찰: 기능 행의 화면 프레임, 벤토 타일, 보조 버튼, 내비 보조 버튼(slices 02–05)
- 수치: border-width 0(측정), `box-shadow: 0 0 0 1px rgba(0,0,0,.08)` 그림자 요소의 42% · `0 0 0 1px #EBEBEB` 33%(측정). 블러가 있는 띄우는 그림자는 측정 0
- 기본값과의 차이: 흔한 카드는 `1px solid #E5E7EB` + `shadow-md`. 여기는 깊이 표현이 0 이고 경계만 남는다
- 따라 하는 법: `--ring: 0 0 0 1px rgba(0,0,0,.08); .card { border: 0; box-shadow: var(--ring); }` · Tailwind `ring-1 ring-black/[.08]`
- 깨지는 경우: 흰 면(#FFFFFF)을 #FAFAFA 위에 둘 때 링과 2% 명도 차가 함께 일한다. 같은 색 위에선 링이 너무 옅다 → 알파 10–12% 로 올린다. 다크 테마는 흰색 알파 링으로 뒤집는다

### 3. 색을 빼고 #171717 검정 버튼을 강조로 쓴다
- 관찰: 페이지 전체(overview.jpg). 유채색은 텍스트 링크·상태 점의 파랑과 터미널 체크 초록뿐이다
- 수치: bg #FAFAFA 면적 99%(측정), accent = 주 버튼 배경 #171717(측정, 선언된 강조 변수 없음), 유채색 #0070F3 · #297A3A 는 글자·점 크기로만(측정), 중립 chroma 0(파생)
- 기본값과의 차이: 흔한 SaaS 는 파랑·보라 브랜드색 + 그라데이션을 CTA·아이콘·배지에 모두 쓴다(면적 5–10%)
- 따라 하는 법: `--accent: #171717; --accent-fg: #FFFFFF; --link: #0070F3;` 버튼·배지·아이콘 배경에는 유채색을 쓰지 않는다
- 깨지는 경우: 검정이 주 버튼·제목·검정 카드를 모두 맡아 CTA 가 묻힐 수 있다 → 검정 면은 한 화면에 1–2개. 회색 #8F8F8F 는 bg 위 3.1:1 이라 본문에 쓰지 않는다

### 4. 기능을 고객사의 실제 화면으로 증명한다
- 관찰: feature-alternating 3행(slices 02–04). 화면과 문장 열이 행마다 좌우를 바꾼다
- 수치: 화면 프레임 폭 약 920px = 콘텐츠 폭의 2/3(추정), 반대쪽 1/3 열에 24px 두 톤 문장(앞 구절 #171717, 나머지 #4D4D4D) + 14px 기능 링크 4개(추정), 화면 아래 약 15% 를 bg 로 페이드(추정), 이미지 비중 16%(측정)
- 기본값과의 차이: 흔한 기능 소개는 아이콘 + 제목 + 설명 3열 카드(LA-2)
- 따라 하는 법: `grid-template-columns: 2fr 1fr; gap: 20px;` 화면에 `mask-image: linear-gradient(to bottom, #000 80%, transparent);` 문장은 `<strong>` 구절만 `color: #171717`, 나머지 `#4D4D4D`
- 깨지는 경우: 실제 고객 사례·화면이 없으면 성립하지 않는다 → 내 제품 화면으로 바꾸고, 고객 수치는 출처가 있을 때만 쓴다(CP-5)

### 5. 버튼은 pill, 카드는 6px 로 둥긂을 두 갈래로 나눈다
- 관찰: 히어로·cta-band 버튼(pill), 벤토 타일·화면 프레임(6–8px)
- 수치: 버튼 radius pill · 높이 40(측정), radius 요소 중 pill 비율 62%(측정), 흰 카드 6px · 검정 카드 8px(측정), 단계 4 / 6 / 8 + pill(측정)
- 기본값과의 차이: 흔한 값은 모든 곳 8px(SH-1). 여기는 컨트롤과 면이 서로 다른 형태 언어를 쓴다
- 따라 하는 법: `--radius-control: 9999px; --radius-card: 6px; --radius-card-lg: 8px;`
- 깨지는 경우: 내비 안 32px 버튼은 약 6px(추정)이라 pill 규칙의 예외다 → 높이 32px 이하 버튼은 6px 로 둔다

## 5. 토큰 (Tokens)

### 5.1 타이포그래피 (Typography)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 (본문·디스플레이) | Geist Sans (GeistSans, 웹폰트, OFL) · 글자 비중 89% | 측정 | h1·h2·본문·버튼·내비 전부 |
| 패밀리 (모노) | Geist Mono (웹폰트, OFL) · 11% | 측정 | 12px 메타·터미널 출력·모바일 히어로 부제 |
| display (히어로 h1) 크기 | 64px | 측정 | 구조 줄의 h1 크기 |
| display 처리 | 굵기 약 450 · 행간 약 1.0 · 자간 약 -0.06em | 추정 | 두 줄 기준선 간격 63px, h2 와 같은 처리로 보인다 |
| display 모바일 | 약 52px, 가운데 정렬 | 추정 | mobile.png |
| h2 | 56 / 32px · 450 · 1.0 · -0.06em | 측정 | 섹션 제목 ×5 |
| h3 (카드 제목) | 24px · 450 · 1.33 · -0.04em | 측정 | 엔진의 h1 역할 ×6 — 벤토 타일 제목 크기라 h3 로 읽는다 |
| body | 14px · 500 · 1.43 · 0em | 측정 | ×24 |
| small | Geist Mono 12px · 400 · 1.33 · 0em | 측정 | ×11, eyebrow 대문자 라벨은 없음 |
| button | 16px · 500 · 1.5 · 0em | 측정 | |
| nav | 14px · 400 · 1.43 · 0em | 측정 | ×89 (푸터 링크 포함) |
| 스케일 | 1.618 golden-ratio (fit 0.63) · 단계 12 14 16 24 56 64 | 파생 | 중간 단계(32–40)가 비어 있다 — 제목과 본문 사이를 크게 띄운다 |
| clamp | h2 `clamp(2rem, 1.443rem + 2.286vw, 3.5rem)` | 파생 | |
| 크기 비 display:본문 | 64 / 14 = 4.6:1 | 파생 | 무브 1 |
| 줄바꿈 | text-wrap balance 사용 · 라틴 100%(keep-all 해당 없음) | 측정 | |

### 5.2 색 (Color)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg | #FAFAFA · 면적 99% · `--ds-background-200` | 측정 | 페이지 전체 한 면 |
| surface | #FFFFFF · `--ds-contrast-fg` | 측정 | 카드·화면 프레임·보조 버튼 면 |
| text | #4D4D4D · 글자 52% · `--color-gray-900` | 측정 | 본문·내비 |
| text-strong | #171717 | 추정 | 헤드라인·두 톤 문장의 앞 구절. 화면상 accent 와 같은 검정 |
| text-muted | #8F8F8F | 측정 | 푸터 보조 컨트롤 글자 |
| border | 링 `rgba(0,0,0,.08)` (`--color-gray-alpha-400`) · `#EBEBEB` | 측정 | border 가 아니라 box-shadow 링(무브 2) |
| accent | #171717 · `--color-gray-1000` | 측정 | 주 버튼 배경(무브 3) |
| accent-fg | #FFFFFF | 측정 | |
| bg-inverse | #171717 · 면적 1% | 측정 | 벤토의 검정 카드 |
| link | #0070F3 · `--geist-link-color` | 측정 | 링크·상태 점. 면으로 쓰지 않는다 |
| success | #297A3A · `--ds-green-900` | 측정 | 터미널 출력의 체크 표시 |
| 대비 text/bg · accent-fg/accent | 8.1:1 (AAA) · 17.9:1 (AAA) | 파생 | |
| 대비 muted/bg | 3.1:1 (본문 AA 미달) | 파생 | #8F8F8F 는 큰 글자·보조 컨트롤에만 |
| 중립 온도 | neutral, chroma 0 (hue 없음) | 파생 | 따뜻함도 차가움도 없는 순수 회색 |
| 그라데이션 | 5개 · 면적 10% · 글자 그라데이션 0 | 측정 | 화면 아래 페이드 마스크로 보인다. 장식 그라데이션 면은 없음 |

### 5.3 간격·레이아웃 (Space & Layout)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 기준 단위 | 없음 (irregular, adherence 0.33) · 단계 2 4 6 8 12 20 | 파생 | 작은 단계가 촘촘하다. 옮길 땐 4px 기준으로 정리해도 된다 |
| 섹션 상하 여백 | 116 / 85px (D/M) | 측정 | 일반 랜딩(64–96)의 약 1.2–1.8배 |
| 컨테이너 | max-width 961px | 측정 | 엔진 값. 화면상 큰 블록은 이보다 넓다(다음 행) |
| 실제 콘텐츠 폭 | 약 1392px (좌우 24px 만 남긴 전체 폭) | 추정 | desktop.png·slices 에서 콘텐츠가 x 24–1416 에 걸친다 |
| 거터 | 16 / 24px (D/M) | 측정 | |
| 그리드 | 6열(푸터) · 2열(벤토) · gap 20 / 24px | 측정 | |
| 기능 행 분할 | 화면 2/3 + 문장 열 1/3, 행마다 좌우 교대 | 추정 | 무브 4 |
| 밀도 | airy · 첫 화면 빈 칸 83% | 파생 | |

### 5.4 형태·깊이 (Shape & Depth)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius 버튼 (40px) | pill | 측정 | 히어로·cta-band 버튼 |
| radius 내비 버튼 (32px) | 약 6px | 추정 | desktop.png 내비 오른쪽 버튼 3개 |
| radius 카드 | 흰 카드 6px · 검정 카드 8px | 측정 | |
| radius 단계 | 4 · 6 · 8 + pill · pill 비율 62% · 성격 soft | 측정 | 무브 5 |
| 테두리 | border-width 0 · 사용 none | 측정 | 경계는 아래 링이 맡는다 |
| 경계 링 | sm `0 0 0 1px rgba(0,0,0,.08)` (42%) · md `0 0 0 1px #EBEBEB` (33%) | 측정 | 무브 2 |
| 띄우는 그림자 | 없음 — 측정된 그림자 요소 12개가 모두 spread 1px 링 | 측정 | 히어로 마크의 그림자는 캔버스 렌더라 CSS 가 아니다 |
| 포커스 링 | 측정 실패: 포커스 상태는 캡처하지 않는다 | — | 브리프에서 정한다 |

### 5.5 모션 (Motion)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 단계 | fast 100 / base 100 / slow 200ms · 전환 105개 | 측정 | 짧고 거의 한 단계 |
| easing | `cubic-bezier(0.4, 0, 0.2, 1)` | 측정 | |
| 등장 연출 | 애니메이션 1개 · 캔버스 1개(히어로 마크) | 측정 | 섹션별 fade-up 은 측정되지 않았다 |
| 스크롤 연출 | 측정 실패: 정적 캡처라 스크롤 연동은 잡히지 않는다 | — | |
| reduced-motion | 대응함 | 측정 | |
| 라이브러리 | 없음 (CSS transition) | 측정 | |

### 5.6 이미지·아이콘 (Imagery & Icons)

| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 이미지 비중 | 이미지 16% · SVG 5% · 배경 이미지 0% | 측정 | |
| 종류 | 고객사 제품 화면(UI 재현), 선으로만 그린 추상 도형, 터미널 출력. 사진·일러스트 없음 | 추정 | 무브 4 |
| 아이콘 개수 | 14개 | 측정 | |
| 아이콘 스타일 | 약 16px, 선 약 1.5px, 단색 #4D4D4D | 추정 | 화면 프레임 안 UI 아이콘 |
| 영상·캔버스 | 영상 0 · 캔버스 1 | 측정 | 캔버스는 히어로 마크 |
| 로고 띠 | 흑백 고객 로고 7개, 첫 화면 바닥 한 줄 | 추정 | 모바일에선 가로로 잘린다 |
| 블러 | backdrop-filter 0 | 측정 | 글래스 없음 |

## 6. 컴포넌트 (Components)

- 주 버튼(히어로·cta-band): 높이 40 · padding-x 12(측정, 화면상 좌우 여백은 약 18px) · pill · bg #171717 · 글자 #FFFFFF 16px/500 (측정)
- 보조 버튼: 높이 40 · pill · bg #FFFFFF · 글자 #171717 16px/500 · 1px 링 (측정)
- 내비 버튼: 높이 약 32 · radius 약 6 · 14px/500 · 흰 + 링 2개, 검정 1개 (추정)
- 내비 링크: 높이 32 · padding-x 0 · 14px/400 · #4D4D4D · 드롭다운 2개는 작은 꺾쇠 (측정)
- 내비: 높이 64 · sticky · 투명 배경 · 링크 5 + CTA · 스크롤 후 하단 1px 선 · 모바일 햄버거 (측정, 하단 선은 slices 로 추정)
- 카드(흰): radius 6 · padding 16–20 · bg #FFFFFF 또는 bg · 1px 알파 링 · 그림자 없음 (측정)
- 카드(검정): radius 8 · padding 0 · bg #171717 (측정)
- 배지: 측정 실패: 엔진이 배지를 잡지 못했다. 화면상 푸터의 회색 pill 약 20px · 12px (추정)
- 입력: 페이지에 없다 (측정 0개)
- hover·focus 등 상태: 측정 실패: 정적 캡처

## 7. 페이지 구조 (Page Anatomy)

| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 왼쪽 + 링크 4(드롭다운 2), 오른쪽 버튼 3(보조 2 + 검정 1), 64px sticky | bg | |
| 2 | announcement-bar | 내비 아래 가운데 한 줄, 일반 글자 + 굵은 링크 + 꺾쇠, pill 없음 | bg | 엔진 미분리(hero-media 안) |
| 3 | hero-media | 3단: 왼쪽 아래 h1 2줄 + pill 버튼 2, 가운데 캔버스 마크, 오른쪽 짧은 문장 3줄 | bg | 엔진 hero-media(0.93) 유지. 미디어가 배경이 아니라 가운데 오브젝트인 변형 |
| 4 | logo-cloud | 흑백 고객 로고 7개 한 줄, 첫 화면 바닥 | bg | 엔진 미분리(hero-media 안) |
| 5 | feature-alternating | 행마다 h2 2줄 → 고객사 화면 2/3 + 두 톤 문장·기능 링크 4 1/3, 좌우 교대 | bg | 엔진 (2) → 3행: slices 02·03·04 |
| 6 | bento-grid | 2열, 큰 타일 1 + 작은 타일 2, 타일 radius 6, 링 경계 | bg | 엔진 media-text(0.55) → bento-grid: 타일 크기가 다르다 |
| 7 | cta-band | 가운데 h2 한 줄 + 검정 pill + 흰 pill(아이콘 3 + 복사) | bg | 유일한 가운데 정렬. 진한 띠 없음 |
| 8 | footer | 6열 사이트맵(열 제목 + 링크 4–9), '…' 배지, 하단 마크 + 모노 상태 표시 | bg | 모바일 2열 |

리듬: 여백 116/85 고정, #FAFAFA 한 면이 끝까지 이어지고 배경 교차는 0회 — 구획은 여백과 56px h2 가 맡는다. 진한 면은 버튼과 벤토 검정 카드뿐이다.

```text
+--------------------------------------------------------------+
| nav   logo + links(4)                  [demo] [login] [CTA]  |
+--------------------------------------------------------------+
| announcement-bar   centered text + link, no pill             |
| hero-media   h1 + 2 pills | canvas mark | 3-line list        |
| logo-cloud (7, monochrome)                                   |
| feature-alternating (3)    screen 2/3 | quote + links 1/3    |
| bento-grid (2 cols)   big tile 1 | small tiles 2             |
| cta-band   centered h2 + 2 pills, same bg                    |
| footer (6 cols sitemap)              status line + mark      |
+--------------------------------------------------------------+
```

모바일: 내비는 로고 + 햄버거. 히어로는 캔버스 마크가 위로 가고 h1 이 가운데 정렬(약 52px)로 바뀌며, 모노스페이스 부제 한 줄이 새로 나타나고 버튼 2개는 전체 폭 pill 로 쌓인다. 로고 띠는 가로로 잘린다. feature-alternating 은 텍스트 위·화면 아래로 고정된다. h2 56 → 32px, 섹션 여백 116 → 85px, 푸터 6열 → 2열.

## 8. 따라 할 때 Do / Don't

Do
- 헤드라인을 56–64px · 굵기 450 · 행간 1.0 · 자간 -0.06em 으로 조인다. 한글은 -0.03em · 1.15 (무브 1)
- 경계는 `box-shadow: 0 0 0 1px rgba(0,0,0,.08)` 링 하나로 만들고, 흰 면을 #FAFAFA 위에 둔다 (무브 2)
- 주 버튼은 #171717 pill, 유채색은 텍스트 링크·상태 점에만 쓴다 (무브 3)
- 기능은 실제 제품 화면 2/3 + 두 톤 문장과 기능 목록 1/3 로 보여주고 화면 아래를 페이드한다 (무브 4)
- radius 는 컨트롤 pill · 면 6–8px 두 갈래로 나눈다 (무브 5)
- 모노스페이스는 터미널 출력·명령어처럼 실제 코드 맥락에만 쓴다

Don't
- 카드를 `shadow-md` 로 띄우지 않는다 — 무브 2, SH-2
- 링 + 테두리 + 진한 그림자를 한 요소에 겹치지 않는다 — 무브 2, SH-5
- 파랑을 버튼·아이콘·배지 면으로 넓히지 않는다 — 무브 3, CO-5
- 히어로 빈 곳을 그라데이션 블롭으로 메우지 않는다. Vercel 의 가운데 글로우는 로고 마크 렌더라 옮길 대상이 아니다 — CO-4, 10장
- 기능 소개를 아이콘 + 제목 + 설명 3열 카드로 바꾸지 않는다 — 무브 4, LA-2
- 작은 라벨마다 모노스페이스 대문자를 붙이지 않는다 — TY-5
- #8F8F8F 회색을 본문에 쓰지 않는다(3.1:1) — 무브 3, CO-7

## 9. 폰트 대체 (Font Substitutes)

| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Geist Sans | OFL (공개 배포) | Geist 그대로 (대체 불필요), 없으면 Inter | Pretendard | OFL 이라 그대로 써도 된다(출처 표기). 가변판이어야 굵기 450 이 나온다. 한글 제목은 자간 -0.03em 까지만 |
| Geist Mono | OFL (공개 배포) | Geist Mono 그대로 | Pretendard | 코드·터미널 안에만. 한글이 섞이는 코드 블록은 드물어 본문 한글 폰트로 폴백한다 |

## 10. 베끼지 말 것 (Don't Copy)

- 삼각형 로고·워드마크, 히어로 캔버스의 삼각형 렌더와 동심원 글로우
- 고객사 로고 7개, 기능 행의 고객사 화면(Notion·Mintlify·Zapier 류 재현 UI)과 고객 수치 문장
- 헤드라인·두 톤 문장·버튼·공지 카피
- 벤토 타일의 제품 그래픽(선 도형, 검정 카드 목업, 터미널 출력 내용)
- 사이트 고유 아이콘 세트 — 선 굵기·크기 규칙만 옮기고 Lucide 같은 공개 세트로 구현한다
- Geist 폰트는 OFL 이라 써도 된다. 다만 Geist + 검정 pill + 삼각형 마크를 모두 가져오면 Vercel 로 오인되니, 무브 2–3개만 가져오고 색·이미지는 내 제품에서 정한다
- 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)

```text
minimal × swiss 계열 개발자 도구 랜딩. 배경 #FAFAFA 한 면, 섹션은 여백 116/85px 로만 나누고 배경 교차 없음.
헤드라인 Geist 56–64px 굵기 450 행간 1.0 자간 -0.06em(한글은 Pretendard -0.03em/1.15), 본문 14–16px #4D4D4D.
경계는 border 대신 box-shadow 0 0 0 1px rgba(0,0,0,.08), 띄우는 그림자 없음. 버튼 pill(#171717 / 흰 + 링), 카드 radius 6px.
기능은 실제 제품 화면 2/3 + 짧은 문장·기능 목록 1/3, 좌우 교대. 유채색은 링크 파랑 하나.
금지: 그라데이션 블롭, 브랜드색 버튼, shadow-md 카드, 아이콘 3열 카드, 모노 대문자 라벨.
```

```text
Minimal developer-tool landing with Swiss leanings. One flat #FAFAFA background, sections separated by 116/85px whitespace only.
Geist headlines 56–64px, weight 450, line-height 1.0, -0.06em tracking; 14–16px body in #4D4D4D.
Borders as box-shadow 0 0 0 1px rgba(0,0,0,.08), no elevation shadows. Pill buttons (#171717, or white + ring), 6px card radius.
Features as real product UI at 2/3 width beside a short statement and feature list, alternating sides. Only color: link blue.
```

## 부록: 화면 관찰 (Visual Read)

- 첫 화면(desktop.png)은 3분할: 왼쪽 아래 h1 2줄(64px, 아주 조인 자간) + 검정 pill 버튼·흰 pill 버튼, 가운데 캔버스로 그린 검정 삼각형 마크와 옅은 동심원 그림자, 오른쪽에 짧은 문장 3줄(16px 안팎) 목록. 맨 아래에 흑백 고객 로고 7개가 화면 폭 전체에 고르게 깔린다.
- 내비 바로 아래 가운데에 한 줄 공지(일반 글자 + 굵은 링크 + 꺾쇠). pill 배경 없이 글자만이다.
- 페이지 전체가 #FAFAFA 한 면이다. 섹션마다 배경 교차가 없고, 명도 변화는 버튼·카드 안 검정 면(벤토의 검정 패널)뿐이다.
- 기능 섹션 3개(slices 02–04)는 같은 골격: 왼쪽 위 h2 56px 2줄 → 콘텐츠 폭 2/3 에 고객사 실제 화면을 흰 프레임에 담고 아래쪽을 페이드로 흐린다 → 반대쪽 1/3 에 두 톤 문장(앞 구절 진한 색, 뒤 구절 회색) + 작은 회색 '…' 라벨 + 링크 4개. 03 행만 화면이 오른쪽이다.
- 카드·프레임·보조 버튼 경계는 아주 옅은 1px 선(테두리가 아니라 box-shadow 링). 그림자로 띄우는 카드는 보이지 않는다.
- 벤토(slice 05)는 2열: 왼쪽 큰 타일 1(선만으로 그린 추상 도형) + 오른쪽 작은 타일 2(검정 카드 목업, 모노스페이스 터미널 출력). 타일 radius 6–8px.
- 모노스페이스는 터미널 출력·작은 메타·모바일 히어로 부제에만 나온다. 본문·버튼은 전부 산세리프.
- cta-band(slice 06)는 유일한 가운데 정렬 섹션: h2 한 줄 + 검정 pill 버튼 + 흰 pill(작은 로고 아이콘 3개 + 복사 아이콘). 배경은 그대로 #FAFAFA 라 띠처럼 보이지 않는다.
- 푸터는 6열 사이트맵, 회색 링크 14px, '…' 회색 pill 배지 몇 개, 맨 아래 파란 점 + 모노 상태 표시.
- 모바일(mobile.png): 삼각형 마크가 위로, h1 이 가운데 정렬로 바뀌고 약 52px 로 크게 남는다. 부제가 모노스페이스 한 줄로 등장, 버튼 2개는 전체 폭 pill 로 쌓인다. 로고 띠는 가로로 잘린다.
- 유채색은 사실상 없다. 링크·상태 점의 파랑(#0070F3 계열)과 터미널 체크의 초록이 아주 작게만 보인다.

## 부록: 측정 메모 (Capture Notes)

- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2. 신뢰도 high (타이포 0.95 · 색 0.9 · 간격 0.62 · 구조 0.84). 페이지 높이 D 5930 / M 6671px, 슬라이스 7장으로 전체가 덮였다.
- 경고: NETWORK_BUSY(두 뷰포트, 8초 안에 네트워크가 잠잠해지지 않음 — 캔버스·분석 스크립트로 보이며 화면 렌더는 정상), NO_ACCENT(유채 강조 없음, accent 는 가장 진한 중립 버튼 배경).
- 숨긴 오버레이: modal 2개(desktop·mobile 각 `div.inset-0`, 클릭 없이 display:none).
- 간격 신뢰도 0.62 — 컨테이너 961px 은 화면과 맞지 않는다(콘텐츠가 x 24–1416 에 걸침). 실제 폭은 추정 행으로 따로 적었다.
- 엔진 정정: h1 역할 24px(×6) → 카드 제목(h3)으로 읽음, 히어로 h1 은 구조 줄의 64px. 섹션 hero-media 안에 announcement-bar·logo-cloud 분리, feature-alternating (2) → 3행, media-text(0.55) → bento-grid. tokens.json 은 그대로 둠.
- 그림자 tier 문자열은 투명 레이어 4개 뒤에 1px 링이 붙은 형태라 summary 의 앞부분만 보면 그림자가 없는 것처럼 보인다. tokens.json 의 전체 값에서 링을 확인했다.
- 근거 비율: 값이 있는 토큰 행 57개 = 측정 40 · 파생 8 · 추정 9 → 70 / 14 / 16%. 측정 실패 2행(포커스 링, 스크롤 연출)은 뺐다.
- 페이지 텍스트에서 지시처럼 보이는 문자열은 없었다.
