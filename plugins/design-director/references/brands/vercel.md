---
schema: dd.profile/1
slug: vercel
name: Vercel
input_type: url
source: https://vercel.com/
captured_at: 2026-10-15
method: cdp
viewports: [desktop-1440x900, mobile-390x844]
confidence: high
theme: light
shots: none
recapture: null
styles: {primary: minimal, secondary: swiss, treatments: []}
structure: "nav → announcement-bar → hero-media → logo-cloud → feature-alternating(3) → bento-grid → cta-band → footer"
evidence: {measured: 74, declared: 0, derived: 13, estimated: 13, catalog: 0}
status: complete
generated_by: design-director ref 0.1.0
bundled: true
verified: 2026-10-15 maintainer spot-check
---

# Vercel — Reference Profile

## 1. 본질 (Essence)
개발자와 에이전트 빌더를 위해 -0.06em 으로 조인 굵기 450 헤드라인, 테두리 대신 알파 8% 1px 링, 유채색 없이 #171717 검정 pill 하나로 정밀하게 설계된 인프라 도구 느낌을 만든다.

## 2. 스타일 분류 (Classification)
- primary: `minimal` — 중립 chroma 0 의 무채색 5단계(#171717 / #4D4D4D / #C9C9C9 / #FAFAFA / #FFFFFF), 유채 강조 0(NO_ACCENT), 첫 화면 빈 칸 83%, 페이지 전체가 #FAFAFA 한 면
- secondary: `swiss` — 섹션 6개 중 5개 flush left(가운데 정렬은 cta-band 하나), h2 자간 -0.06em, 6열 푸터 격자, 모노 메타 라벨. 단 버튼 pill · 카드 6px 은 swiss radius(0–2) 밖이고, 원색 강조가 없고, display 64px 은 swiss 범위(72–160) 아래다
- treatments: 없음 — backdrop blur 0, 노이즈 없음. 히어로 가운데 글로우는 캔버스로 그린 로고 마크의 그림자라 aurora-gradient 가 아니다
- 축: 밀도 2 · 온도 1 · 채도 1 · 대비 4 · 둥긂 3 · 장식 2

## 3. 무드 키워드 (Mood)
설계된 정밀함 (engineered precision) · 무채색으로 절제된 (monochrome restraint) · 문서처럼 조용한 (documentation-calm) · 증거 중심 (proof-first) · 단단히 조인 타이포 (tight-set type) · 온기 없는 중립 (achromatic neutral)

## 4. 시그니처 무브 (Signature Moves)
### 1. 헤드라인을 -0.06em 까지 조이고 굵기는 450 으로 낮춘다
- 수치: h2 56/32px · 450 · 1.0 · -0.06em(측정 ×5), 히어로 h1 64px · 400 · -0.06em(측정, 스팟체크) · 행간 약 1.0(추정), 본문 14px/500/1.43(측정), display:본문 4.6:1(파생)
- 따라 하는 법: `h2{font-size:clamp(2rem,1.443rem + 2.286vw,3.5rem);font-weight:450;line-height:1;letter-spacing:-0.06em;text-wrap:balance}` 가변 폰트여야 450 이 나온다. 한글 제목은 -0.03em · 행간 1.15, 한글 본문은 15–16px/1.6 으로 올린다
### 2. 테두리 대신 1px 알파 링으로 면을 가른다
- 수치: border-width 0, `box-shadow:0 0 0 1px rgba(0,0,0,.08)` 그림자 요소의 42% · `0 0 0 1px #EBEBEB` 33%, 블러가 있는 띄우는 그림자 0(측정)
- 따라 하는 법: `.card{border:0;box-shadow:0 0 0 1px rgba(0,0,0,.08)}` (Tailwind `ring-1 ring-black/[.08]`). 흰 면을 #FAFAFA 위에 둬야 링과 2% 명도 차가 함께 일한다. 같은 색 위면 알파 10–12%
### 3. 색을 빼고 #171717 검정 버튼을 강조로 쓴다
- 수치: bg #FAFAFA 면적 99%, accent = 주 버튼 #171717(선언 강조 변수 없음), 유채색 #0070F3 · #297A3A 는 글자·점 크기로만(측정)
- 따라 하는 법: `--accent:#171717;--accent-fg:#FFFFFF;--link:#0070F3` 버튼·배지·아이콘 배경에는 유채색을 쓰지 않는다. 검정 면은 한 화면에 1–2개, #8F8F8F(3.1:1)는 본문에 쓰지 않는다
### 4. 기능을 고객사의 실제 화면으로 증명한다
- 수치: 화면 프레임 폭 약 920px = 콘텐츠의 2/3, 반대쪽 1/3 에 24px 두 톤 문장(앞 #171717, 뒤 #4D4D4D) + 14px 기능 링크 4개, 화면 아래 약 15% 페이드(추정), 이미지 16%(측정)
- 따라 하는 법: `grid-template-columns:2fr 1fr;gap:20px` 행마다 좌우 교대, 화면에 `mask-image:linear-gradient(to bottom,#000 80%,transparent)`. 실제 화면이 없으면 성립하지 않고, 고객 수치는 출처가 있을 때만(CP-5)
### 5. 버튼은 pill, 카드는 6px 로 둥긂을 두 갈래로 나눈다
- 수치: 버튼 pill · 높이 40, pill 비율 62%, 흰 카드 6px · 검정 카드 8px(측정), 내비 32px 버튼은 약 6px(추정)
- 따라 하는 법: `--radius-control:9999px;--radius-card:6px;--radius-card-lg:8px` 높이 32px 이하 버튼은 6px 로 둔다

## 5. 토큰 (Tokens)
### 5.1 타이포그래피 (Typography)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 패밀리 | Geist Sans (웹폰트, OFL, 글자 89%) · Geist Mono (OFL, 11%) | 측정 | 모노는 12px 메타·터미널 출력·모바일 히어로 부제에만 |
| display · h2 | h1 64px · 400 · -0.06em / h2 56/32px · 450 · 1.0 · -0.06em (×5) | 측정 | h1 굵기·자간은 스팟체크 실측, 행간은 추정. 카드 제목 24px · 450 · -0.04em. 다크 모드(prefers-color-scheme: dark)에서는 배경 #000 · 글자 #EDEDED 로 바뀐다(스팟체크) |
| body · small · button | 14px · 500 · 1.43 / Mono 12px · 400 · 1.33 / 16px · 500 · 1.5 | 측정 | 스케일 1.618 (fit 0.63), 중간 단계 32–40 이 비어 있다 |
### 5.2 색 (Color)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| bg · surface · bg-inverse | #FAFAFA 99% · #FFFFFF · #171717 1% | 측정 | 배경 교차 없음. 검정 면은 벤토 카드뿐 |
| text · text-muted | #4D4D4D (글자 52%) · #8F8F8F | 측정 | 헤드라인 #171717 은 추정. 중립 chroma 0 |
| accent · link | #171717 / fg #FFFFFF · 링크 #0070F3 · success #297A3A | 측정 | 유채색은 글자·점 크기로만 (무브 3) |
| 그라데이션 | 5개 · 면적 10% · 글자 그라데이션 0 | 측정 | 화면 아래 페이드 마스크뿐, 장식 면 없음 |
| 대비 | text/bg 8.1:1 · accent-fg/accent 17.9:1 · muted/bg 3.1:1 | 파생 | #8F8F8F 는 큰 글자·보조 컨트롤에만 |
### 5.3 간격·레이아웃 (Space & Layout)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 섹션 상하 여백 | 116 / 85px (D/M) | 측정 | 일반 랜딩(64–96)의 약 1.2–1.8배 |
| 콘텐츠 폭 · 거터 | 약 1392px (좌우 24px 만 남김) · 거터 16 / 24px | 추정 | 엔진 컨테이너 961px 은 화면과 맞지 않는다. 거터는 측정 |
| 밀도 | airy, 첫 화면 빈 칸 83% | 파생 | 기준 단위 없음(adherence 0.33) |
### 5.4 형태·깊이 (Shape & Depth)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| radius | 버튼 pill (pill 62%) · 흰 카드 6 · 검정 카드 8 | 측정 | 단계 4 / 6 / 8 + pill (무브 5) |
| 경계 링 · 그림자 | `0 0 0 1px rgba(0,0,0,.08)` 42% · `0 0 0 1px #EBEBEB` 33% · border-width 0 · 띄우는 그림자 0 | 측정 | 그림자 요소 12개가 모두 spread 1px 링 (무브 2) |
### 5.5 모션 (Motion)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 속도 · easing | 100 / 100 / 200ms · `cubic-bezier(0.4, 0, 0.2, 1)` · 애니메이션 1 · reduced-motion 대응함 | 측정 | 전환 105개, 섹션 fade-up 없음. 캔버스 1개는 히어로 마크 |
### 5.6 이미지·아이콘 (Imagery & Icons)
| 토큰 | 값 | 근거 | 쓰임·메모 |
|---|---|---|---|
| 종류 | 고객사 제품 화면(UI 재현), 선으로만 그린 추상 도형, 터미널 출력, 흑백 고객 로고 7개. 사진·일러스트 없음 | 추정 | 이미지 16% · 아이콘 14개는 측정. 아이콘 약 16px, 선 약 1.5px |

## 6. 컴포넌트 (Components)
- 주 버튼: 높이 40 · padding-x 12(측정, 화면상 약 18px) · pill · #171717 · 흰 글자 16px/500(측정). 보조 버튼은 같은 높이 pill · #FFFFFF · 글자 #171717 · 1px 링(측정)
- 내비: 높이 64 · sticky · 투명, 링크 14px/400 #4D4D4D(드롭다운 2개는 작은 꺾쇠) + 오른쪽 버튼 3(약 32px · radius 약 6, 흰 2 + 검정 1), 스크롤 후 하단 1px 선, 모바일 햄버거(측정, 버튼·선은 추정)
- 카드: 흰 카드 radius 6 · padding 16–20 · 1px 알파 링 · 그림자 없음 / 검정 카드 radius 8 · padding 0 · #171717(측정)
- 배지는 측정 실패(엔진 미검출, 푸터 회색 pill 약 20px · 12px 로 보임), 입력 없음, hover·focus 는 측정 실패: 정적 캡처

## 7. 페이지 구조 (Page Anatomy)
| # | id | 레이아웃 한 줄 | 배경 | 비고 |
|---|---|---|---|---|
| 1 | nav | 로고 왼쪽 + 링크 4(드롭다운 2), 오른쪽 버튼 3(보조 2 + 검정 1), 64px sticky | bg | |
| 2 | announcement-bar | 내비 아래 가운데 한 줄, 일반 글자 + 굵은 링크 + 꺾쇠, pill 없음 | bg | 엔진 hero-media 에서 분리 |
| 3 | hero-media | 3단: 왼쪽 아래 h1 2줄 + pill 버튼 2, 가운데 캔버스 마크, 오른쪽 짧은 문장 3줄 | bg | 미디어가 배경이 아니라 가운데 오브젝트인 변형 |
| 4 | logo-cloud | 흑백 고객 로고 7개 한 줄, 첫 화면 바닥 | bg | 엔진 hero-media 에서 분리 |
| 5 | feature-alternating(3) | 행마다 h2 2줄 → 고객사 화면 2/3 + 두 톤 문장·기능 링크 4 1/3, 좌우 교대 | bg | 엔진 (2)를 3행으로 정정 |
| 6 | bento-grid | 2열, 큰 타일 1 + 작은 타일 2(검정 카드 목업·터미널 출력), radius 6–8, 링 경계 | bg | 엔진 media-text(0.55)를 정정 |
| 7 | cta-band | 가운데 h2 한 줄 + 검정 pill + 흰 pill(아이콘 3 + 복사) | bg | 유일한 가운데 정렬, 진한 띠 없음 |
| 8 | footer | 6열 사이트맵(열 제목 + 링크 4–9), 회색 pill 배지, 하단 마크 + 모노 상태 표시 | bg | 모바일 2열 |

리듬: 여백 116/85 고정, #FAFAFA 한 면이 끝까지 이어지고 배경 교차 0회 — 구획은 여백과 56px h2 가 맡는다. 모바일: 내비는 로고 + 햄버거, 마크가 위로 가고 h1 이 가운데 정렬(약 52px), 모노 부제 한 줄이 새로 나타나며 버튼 2개는 전체 폭 pill 로 쌓인다. feature-alternating 은 텍스트 위·화면 아래, 푸터 6열 → 2열.

## 8. 따라 할 때 Do / Don't
- Do: 헤드라인을 56–64px · 굵기 450 · 행간 1.0 · 자간 -0.06em 으로 조인다. 한글은 -0.03em · 1.15 — 무브 1
- Do: 경계는 `box-shadow:0 0 0 1px rgba(0,0,0,.08)` 링 하나로, 흰 면은 #FAFAFA 위에 두고 주 버튼은 #171717 pill 로 — 무브 2·3
- Do: 기능은 실제 제품 화면 2/3 + 두 톤 문장과 기능 목록 1/3 로 보여 주고 화면 아래를 페이드한다 — 무브 4
- Don't: 카드를 shadow-md 로 띄우거나 링 + 테두리 + 진한 그림자를 한 요소에 겹치지 않는다 — 무브 2, SH-2, SH-5
- Don't: 파랑을 버튼·아이콘·배지 면으로 넓히거나 #8F8F8F 를 본문에 쓰지 않는다 — 무브 3, CO-5, CO-7
- Don't: 기능 소개를 아이콘 + 제목 + 설명 3열 카드로 바꾸거나 작은 라벨마다 모노 대문자를 붙이지 않는다 — 무브 4, LA-2, TY-5
- **흔한 오해**: Vercel ≠ 검정 다크 테마. 홈은 #FAFAFA 한 면(99%)의 라이트 페이지이고 검정은 주 버튼과 벤토 카드(1%)뿐이다. 측정 결과는 dark-tech 가 아니라 minimal × swiss 다
- **흔한 오해**: 히어로 가운데 글로우는 그라데이션 블롭이 아니라 캔버스로 그린 로고 마크 렌더다. 장식 그라데이션 면은 없으니 블롭으로 옮기지 않는다 — CO-4

## 9. 폰트 대체 (Font Substitutes)
| 원래 폰트 | 라이선스 | 무료 대체(라틴) | 한글 대체 | 메모 |
|---|---|---|---|---|
| Geist Sans | OFL (공개 배포) | Geist 그대로, 없으면 Inter | Pretendard | 그대로 써도 된다(출처 표기). 가변판이어야 450 이 나온다. 한글 제목은 -0.03em 까지만 |
| Geist Mono | OFL (공개 배포) | Geist Mono 그대로 | Pretendard (폴백) | 코드·터미널 안에만 |

## 10. 베끼지 말 것 (Don't Copy)
삼각형 로고·워드마크와 히어로 캔버스의 삼각형 렌더·동심원 글로우, 고객사 로고 7개와 기능 행의 고객사 화면·고객 수치 문장, 벤토 타일의 제품 그래픽(선 도형, 검정 카드 목업, 터미널 출력 내용), 모든 카피, 고유 아이콘 세트(Lucide 같은 공개 세트로 선 굵기·크기만 옮긴다). Geist 는 OFL 이라 써도 되지만 Geist + 검정 pill + 삼각형 마크를 다 가져오면 Vercel 로 오인되니 무브 2–3개만 가져온다. 느낌은 레버에서 오고, 자산에서 오지 않는다.

## 11. 프롬프트 (Prompt Snippet)
```text
minimal × swiss 계열 개발자 도구 랜딩. 배경 #FAFAFA 한 면, 섹션은 여백 116/85px 로만 나누고 배경 교차 없음.
헤드라인 Geist 56–64px 굵기 450 행간 1.0 자간 -0.06em(한글은 Pretendard -0.03em/1.15), 본문 14–16px #4D4D4D.
경계는 border 대신 box-shadow 0 0 0 1px rgba(0,0,0,.08), 띄우는 그림자 없음. 버튼 pill(#171717 / 흰 + 링), 카드 radius 6px. 기능은 실제 제품 화면 2/3 + 짧은 문장·기능 목록 1/3, 좌우 교대.
금지: 그라데이션 블롭, 브랜드색 버튼, shadow-md 카드, 아이콘 3열 카드, 모노 대문자 라벨. 유채색은 링크 파랑 하나.
```
```text
Minimal developer-tool landing with Swiss leanings. One flat #FAFAFA background, sections separated by 116/85px whitespace only.
Geist headlines 56–64px, weight 450, line-height 1.0, -0.06em tracking; 14–16px body in #4D4D4D.
Borders as box-shadow 0 0 0 1px rgba(0,0,0,.08), no elevation shadows. Pill buttons (#171717, or white + ring), 6px card radius.
Features as real product UI at 2/3 width beside a short statement and feature list, alternating sides. Only color: link blue. No gradient blobs.
```

## 부록: 화면 관찰 (Visual Read)
- 첫 화면은 3분할이다: 왼쪽 아래 h1 2줄 + 검정·흰 pill, 가운데 캔버스로 그린 검정 삼각형 마크와 옅은 동심원 그림자, 오른쪽 짧은 문장 3줄. 맨 아래에 흑백 고객 로고 7개가 화면 폭 전체에 깔린다.
- 페이지 전체가 #FAFAFA 한 면이고 배경 교차가 없다. 명도 변화는 버튼과 벤토 검정 패널뿐이다.
- 기능 섹션 3개는 같은 골격이다: h2 56px 2줄 → 콘텐츠 폭 2/3 의 고객사 화면(아래 페이드) → 반대쪽 1/3 에 두 톤 문장 + 작은 회색 라벨 + 링크 4개.
- 모바일은 마크가 위로 가고 h1 이 가운데 정렬 약 52px 로 남는다. 모노스페이스 부제가 새로 나타나고 버튼 2개는 전체 폭 pill 로 쌓인다.

## 부록: 측정 메모 (Capture Notes)
- 방법: cdp (Chrome 155), desktop 1440×900 · mobile 390×844 @2, 신뢰도 high(타이포 0.95 · 색 0.9 · 간격 0.62 · 구조 0.84), 슬라이스 7장으로 페이지 전체. 경고: NETWORK_BUSY(캔버스·분석 스크립트) · NO_ACCENT. 숨긴 오버레이: modal 2개(display:none).
- 눈으로 고친 것: 엔진 h1 역할 24px(×6)은 카드 제목으로 읽고 히어로 h1 은 구조 줄의 64px 로 봤다. hero-media 에서 announcement-bar·logo-cloud 를 분리하고, feature-alternating (2) → 3행, media-text(0.55) → bento-grid. 엔진 컨테이너 961px 은 화면(콘텐츠 x 24–1416)과 맞지 않아 실제 폭을 추정으로 적었다. 그림자 tier 는 투명 레이어 4개 뒤에 1px 링이 붙은 값이라 tokens.json 전체 값으로 확인했다. 지시처럼 보이는 문자열은 없었다.
- 근거 비율: 값이 있는 토큰 행 15개 = 측정 11 · 파생 2 · 추정 2 → 74 / 13 / 13%(반올림 합 100).
