# 디자인 어휘집 (Vocabulary)

"이 느낌 뭐라고 불러?"에 답하고, 형용사 대신 쓸 말을 고를 때 읽는다. 용어는 영어 원어를 그대로 둔다. 사용자가 다음 프롬프트에
그 단어를 그대로 쓰게 하려는 것이다. "지시하는 법" 열이 핵심이다: 용어 + 레버 + 값이 있어야 AI 가 평균값으로 돌아가지 않는다.
수치는 일반적인 범위이고 특정 브랜드의 실측값이 아니다.

## 목차
1. 위계·구성 (Hierarchy & Composition)
2. 타이포 (Typography)
3. 색 (Color)
4. 형태·깊이 (Shape & Depth)
5. 모션 (Motion)
6. 이미지·아이콘 (Imagery & Icons)
7. 컴포넌트·패턴 (Components & Patterns)
8. 스타일 이름 (Style Names)

## 1. 위계·구성 (Hierarchy & Composition)

| Term | 뜻 | 지시하는 법 (레버+값) | 예문 |
|---|---|---|---|
| Visual hierarchy | 무엇을 먼저, 다음에 보는지의 순서 | 크기·굵기·색·위치·여백 중 2개 이상으로 차이를 준다. 단계 3–4개, display:본문 크기 비 2.5–6배 | "첫 화면 위계를 h1 → 제품 화면 → CTA 순으로" |
| Focal point | 시선이 가장 먼저 꽂히는 한 곳 | 화면당 1개. 가장 큰 크기·색 대비를 거기에만 | "초점은 잔액 숫자 하나로" |
| Whitespace / Negative space | 비워 둔 공간. 남은 칸이 아니라 설계한 요소 | 섹션 padding-y, 그룹 사이 간격 > 그룹 안 간격 | "섹션 상하 여백 128px, 그룹 사이 48px" |
| Proximity | 가까운 것끼리 한 덩어리로 읽힌다 | 그룹 안 간격 : 그룹 사이 간격 = 1 : 2–3 | "라벨과 입력은 8px, 필드 사이는 24px" |
| Alignment | 요소의 시작선·축을 맞추는 것 | 정렬선 2–3개로 제한. 긴 글은 flush left(왼쪽 맞춤), justify 금지 | "모든 텍스트를 왼쪽 열 선에 맞춰" |
| Grid / Columns / Gutter | 열·열 사이 간격·바깥 여백으로 된 배치 틀 | 데스크톱 12열·모바일 4열, gutter 16–32px, 요소 폭은 열 배수 | "12열 그리드, 텍스트 5열 + 이미지 7열" |
| Container | 콘텐츠의 최대 폭 | `max-width` 960–1280px + 좌우 padding 20–32px | "컨테이너 1120px, 좌우 24px" |
| Bleed / Full-bleed | 요소가 컨테이너를 넘어 화면 끝까지 닿는 것 | `margin-inline: calc(var(--container) / 2 - 50vw)`(한쪽만이면 `margin-right`) + 섹션에 `overflow-x: clip`. 그리드 아이템의 % margin 은 컨테이너가 아니라 그리드 영역 폭 기준이라 `50%` 를 쓰지 않는다. `--container` 는 실제 콘텐츠 폭(`min(1120px, 100vw - 2 * var(--gutter))` 처럼) | "제품 화면이 오른쪽 끝까지 bleed" |
| Asymmetry | 좌우 무게를 일부러 다르게 두는 것 | 5/7, 4/8 분할, 빈 열 남기기 | "히어로를 5/7 비대칭으로" |
| Rhythm | 간격·배경이 규칙적으로 반복되는 느낌 | 간격은 기준 단위 배수만, 배경 교차 규칙 하나 | "간격은 8의 배수, 배경 교차는 cta-band 한 번만" |
| Baseline grid | 글줄 기준선이 일정 간격에 맞는 격자 | line-height 를 4px 배수로(24·28·32) | "본문 16/24, 소제목 20/28 로 4px 격자" |
| 8pt grid | 크기·간격을 8의 배수로 쓰는 규칙 | 4px 은 아이콘·미세 간격에만 | "8pt grid, 미세 조정만 4px" |
| Density | 화면당 정보량 | 행 높이·본문 크기·여백으로 조절. 여유형 vs 밀집형 | "밀집형: 행 36px, 본문 14px" |
| Above the fold | 스크롤 없이 보이는 첫 화면 | 1440×900 / 390×844 안에 약속·증거·행동이 들어오게 | "첫 화면 안에 CTA 와 제품 화면 윗부분까지" |
| F-pattern | 텍스트 위주 화면을 F 자로 훑는 시선 | 왼쪽 정렬 제목, 첫 단어에 핵심어 | "목록 제목 첫 단어에 핵심어를 둬" |
| Z-pattern | 이미지 위주 화면을 Z 자로 훑는 시선 | 왼쪽 위 로고 → 오른쪽 위 CTA → 왼쪽 아래 → 오른쪽 아래 CTA | "Z-pattern 끝점인 오른쪽 아래에 주 CTA" |
| Progressive disclosure | 필요한 때 필요한 만큼만 보여주기 | 기본 3–5개 노출 + 더보기, 고급 설정은 접기 | "고급 옵션은 접어 두고 3개만 보여줘" |
| Optical alignment | 수치가 아니라 눈으로 맞아 보이게 보정 | 재생 아이콘 1–2px 오른쪽, 둥근 글자는 기준선 아래로 살짝 | "버튼 안 아이콘을 optical 하게 1px 내려" |

## 2. 타이포 (Typography)

| Term | 뜻 | 지시하는 법 (레버+값) | 예문 |
|---|---|---|---|
| Typeface / Font family | 글꼴 패밀리 | 1–2 패밀리, 역할을 분명히(디스플레이 / 본문) | "제목·본문 모두 Pretendard 하나" |
| Type scale | 글자 크기 단계와 그 비율 | 비율 1.2(차분)–1.333(표현적), 단계 5–7개 | "16 기준 1.25 비율: 16·20·25·31·39" |
| Display type | 히어로용 가장 큰 글자 | 본문의 3–6배, 자간 음수, 행간 1.0–1.15(한글은 1.15 이상) | "display 72px, 행간 1.05" |
| Body text | 읽는 글 | 16–18px, 행간 1.5–1.75(한글 1.5 이상, 1.6 권장) | "본문 17px/1.7" |
| Lead paragraph | 제목 아래 요약 문단 | 본문보다 2–4px 크게, 색은 한 단계 옅게 | "리드 20px, text-muted" |
| Measure | 한 줄의 길이 | 라틴 60–75자(`max-width: 65ch`). 한글은 em 으로 34–40em(35–40자). ch 는 숫자 0 폭 기준이라 한글 폭과 안 맞는다 | "본문 max-width 36em" |
| Leading | 줄 사이 간격(line-height) | 본문 1.5–1.8, 제목 1.05–1.3. 한글 제목은 1.15 이상 | "제목 leading 1.15, 본문 1.7" |
| Tracking | 글자 사이 간격 전체 조정(letter-spacing) | 큰 제목 -0.01 ~ -0.04em(-0.04em 은 라틴만. 한글 display 는 -0.02 ~ -0.03em, 한글 본문은 -0.01 ~ -0.02em), 라틴 대문자 라벨 +0.04 ~ +0.12em | "h1 tracking -0.025em" |
| Weight | 획 두께 100–900 | 2–3단계만(400/600 또는 400/500/700). 가변 서체면 550 같은 중간값 | "굵기는 400과 600 두 개만" |
| Optical size | 크기에 따라 글자 형태를 바꾸는 가변 축(opsz) | `font-optical-sizing: auto`, opsz 축이 있는 서체 | "opsz 있는 서체로 작은 글자 가독성 확보" |
| x-height | 소문자 x 높이. 클수록 작은 크기에서 잘 읽힌다 | 13px 이하 UI 글자엔 x-height 큰 서체 | "x-height 큰 산세리프로 13px 표" |
| Tabular numbers | 숫자 폭이 같아 자릿수가 세로로 맞는 숫자 | `font-variant-numeric: tabular-nums` | "가격·시간은 tabular-nums, 모노 금지" |
| Serif | 획 끝 돌기가 있는 서체. 한글은 명조·바탕 | 읽기형·에디토리얼 제목, 본문 17px 이상 | "제목만 세리프, 본문은 고딕" |
| Sans-serif classes | neo-grotesk(Helvetica 계열) · geometric(원·삼각형 기반) · humanist(손글씨 리듬) | 중립·정밀 = neo-grotesk, 친근 = geometric, 따뜻·읽기 = humanist | "humanist 산세리프로 부드럽게" |
| Monospace | 모든 글자 폭이 같은 서체 | 코드·ID 에만. 데이터 라벨에 쓰면 AI 기본값(TY-5) | "코드 블록만 monospace" |
| Eyebrow / Overline | 제목 위의 작은 라벨 | 정보가 있을 때만(카테고리·단계). 모든 제목 위에 두면 TY-2 | "eyebrow 없이 제목만" |
| All caps | 전부 대문자 | 라틴 짧은 라벨에만, tracking +0.04em 이상. 한글엔 대문자가 없다 | "대문자 라벨 쓰지 마" |
| Text wrap balance | 여러 줄 제목의 줄 길이를 고르게 | 제목 `text-wrap: balance`, 본문 `text-wrap: pretty` | "h1·h2 에 text-wrap balance" |
| keep-all | 한글을 어절 단위로 줄바꿈 | `word-break: keep-all; overflow-wrap: break-word;` | "한글 전체에 keep-all" |
| Widow / Orphan | 마지막 줄에 한 단어만 남는 외톨이 줄 | 제목 balance, 본문 pretty, 카피 길이 조정 | "제목 끝에 한 어절만 남지 않게" |
| Fluid type | 화면 폭에 따라 연속으로 변하는 크기 | `clamp(2.5rem, 1.94rem + 2.29vw, 4rem)` (390px 에서 40, 1440px 에서 64) | "h1 을 clamp 로 40→64px" |
| Type pairing | 두 서체의 조합 | 대비를 분명히(세리프 + 산세리프) 하거나 한 패밀리로 | "명조 제목 + 고딕 본문" |

## 3. 색 (Color)

| Term | 뜻 | 지시하는 법 (레버+값) | 예문 |
|---|---|---|---|
| Palette | 쓰는 색 전체 | 중립 5–9단계 + 강조 1–2 + 의미색 3–4 | "팔레트: 회색 7단계 + 파랑 1" |
| Neutral ramp | 배경·글자·선에 쓰는 회색 계단 | 50–950 단계, hue 를 살짝(cool 220–260 / warm 40–90) | "중립색을 cool grey 로" |
| Accent color | 행동·상태를 표시하는 색 | 1개, 면적 1–10%, 주 CTA·링크·선택에만. 브랜드색과 같을 필요는 없다 | "강조색은 주 CTA 에만" |
| Semantic colors | 성공·경고·오류·정보 색 | 강조색과 hue·명도를 겹치지 않게 | "오류 빨강은 브랜드 빨강과 다른 명도로" |
| Monochrome | 한 hue 의 명도 변화만으로 된 배색 | 강조 없이 명도 대비로 위계 | "흑백 monochrome, 색은 사진에만" |
| Duotone | 이미지를 두 색으로 바꾸는 처리 | 진한 색 = 그림자, 밝은 색 = 하이라이트 | "팀 사진을 남색·크림 duotone 으로" |
| Chroma / Saturation | 색의 진하기 | oklch chroma 0.02–0.06(차분) ~ 0.15 이상(선명) | "강조색 chroma 를 0.12 로 낮춰" |
| Color temperature | 중립색이 따뜻한지 차가운지 | warm: oklch hue 40–90, cool: 220–260 | "중립색을 따뜻하게, hue 70" |
| Contrast ratio | 글자와 배경의 WCAG 명도 대비 | 본문 4.5:1 이상, 큰 글자·UI 경계 3:1 이상 | "보조 텍스트도 4.5:1 이상" |
| Surface | 배경 위에 놓인 판(카드·패널)의 색 | bg 와 명도 차 2–6% | "페이지 회색, 카드 흰색" |
| Background steps | 그림자 대신 배경 명도 단계로 만드는 깊이 | bg / surface / surface-2 각 2–4% 차이 | "그림자 없이 배경 단계로" |
| On-color | 색 면 위에 올리는 글자색 | 강조색 위 흰색·검정 중 4.5:1 이상인 쪽 | "노랑 버튼 글자는 검정" |
| OKLCH | 지각적으로 고른 색 공간(명도·채도·hue) | `oklch(0.62 0.19 255)`. 단계를 만들 땐 L 만 바꾼다 | "중립 단계를 oklch L 로 균등하게" |
| Gradient / Mesh gradient | 색이 이어지는 면 / 여러 점에서 섞이는 그라데이션 | 인접 hue 2–3색, 한 곳에만. 보라→파랑 기본값은 CO-1 | "그라데이션 없이 단색 면" |
| 60-30-10 | 주색 60 · 보조 30 · 강조 10 의 면적 비 | 면적 비로 균형을 잡는다 | "60-30-10: 흰색·옅은 회색·파랑" |
| Color blocking | 큰 단색 면으로 영역을 나누는 것 | 섹션 배경 2–3색 교대 | "가격 섹션만 진한 색 block" |
| Dark mode | 어두운 테마 | 순검정 대신 명도 8–14%, 텍스트 흰 85–92%, 채도 낮춤 | "다크 모드 bg 명도 10%" |
| Scrim / Overlay | 이미지 위 글자 대비를 위한 반투명 막 | 검정 30–60%, 또는 아래쪽만 그라데이션 | "사진 아래쪽 40% scrim" |

## 4. 형태·깊이 (Shape & Depth)

| Term | 뜻 | 지시하는 법 (레버+값) | 예문 |
|---|---|---|---|
| Border radius | 모서리 둥글기 | 2 이하 sharp · 3–8 soft · 9–16 rounded · 17 이상 very-rounded (summary 의 radius 성격과 같은 구간) | "카드 radius 16, 버튼 10" |
| Radius scale | 컴포넌트 위계별 radius 단계 | 2–3단계, 작은 것은 작게. 전부 같으면 SH-1 | "radius 6/10/16 세 단계" |
| Nested radius | 바깥과 안쪽 모서리의 관계 | 안쪽 = 바깥 - padding | "카드 20, padding 8 이면 안쪽 12" |
| Pill | 끝이 완전히 둥근 형태 | `border-radius: 9999px`, 배지·칩·작은 버튼 | "필터 칩은 pill" |
| Hairline border | 아주 가는 경계선 | 1px, 텍스트색 알파 6–12% | "카드 경계는 1px 8% hairline" |
| Divider / Rule | 영역을 나누는 선 | 정보 구분일 때만. 장식으로 깔면 LA-4 | "구분선 없이 여백으로 나눠" |
| Ring | 그림자로 만든 바깥 테두리 | `box-shadow: 0 0 0 1px …`, Tailwind `ring-1 ring-black/5` | "카드에 ring-1 ring-black/5" |
| Focus ring | 키보드 포커스 표시 | `:focus-visible` 2px 실선 + 2px offset, 대비 3:1 이상 | "focus-visible 은 2px 강조색 링" |
| Elevation | 면이 떠 있는 높이 단계 | 0–3단계: 평면 · 카드 · 드롭다운 · 모달 | "elevation 은 세 단계만" |
| Layered shadow | 짧고 진한 그림자 + 길고 옅은 그림자를 겹친 것 | `0 1px 2px rgb(0 0 0 / .06), 0 8px 24px rgb(0 0 0 / .06)` | "떠 있는 패널만 layered shadow" |
| Hard shadow | blur 없는 오프셋 그림자 | `4px 4px 0 #000` (neo-brutalism) | "버튼에 hard shadow 4px" |
| Backdrop blur | 뒤 콘텐츠를 흐리는 반투명 면 | `backdrop-filter: blur(12–20px)` + 채움 60–80%(내비) | "sticky 내비에 blur 12px, 흰 80%" |
| Outline / Ghost button | 테두리만 있는 버튼 / 배경 없는 버튼 | 보조 행동용, 주 버튼과 높이를 같게 | "보조 버튼은 ghost" |

## 5. 모션 (Motion)

| Term | 뜻 | 지시하는 법 (레버+값) | 예문 |
|---|---|---|---|
| Duration | 움직임의 길이 | 작은 UI 100–200ms, 패널 200–300ms, 화면 전환 300–500ms | "hover 150ms, 모달 250ms" |
| Easing / Spring | 속도 곡선 / 탄성 물리 기반 움직임 | 등장 ease-out, 퇴장 ease-in, 이동 ease-in-out. 기본 `ease` 대신 커스텀 bezier. spring 은 overshoot 약간 | "ease-out cubic-bezier(0.2, 0, 0, 1)" |
| Stagger | 여러 요소를 시간차로 움직이기 | 간격 40–80ms, 5–6개까지 | "목록 등장 stagger 60ms" |
| Micro-interaction | 작은 행동에 대한 피드백 | 좋아요·복사·토글, 150–300ms | "복사 버튼을 체크 아이콘으로 바꿔" |
| Scroll reveal | 스크롤하면 나타나는 연출 | 페이지당 1–2곳. 모든 섹션이면 MO-1 | "scroll reveal 은 히어로 아래 한 번만" |
| Parallax | 층마다 다른 속도로 움직이는 스크롤 | 배경 0.8–0.9배속, 한 곳에만 | "히어로 사진만 parallax 0.85" |
| Choreography | 여러 움직임을 한 흐름으로 설계 | 페이지 로드 때 한 번의 시퀀스 | "로드 때 h1 → 제품 화면 순서로 한 번" |
| Reduced motion | 움직임 줄이기 설정을 존중 | `@media (prefers-reduced-motion: reduce)` 에서 이동은 빼고 페이드만. 무시하면 MO-4 | "reduced-motion 에선 이동 없이" |
| Hover state | 마우스를 올린 상태 | 색·배경 변화 120–200ms. 모든 카드 lift 는 MO-2 | "hover 는 배경 4% 어둡게만" |
| Count-up | 숫자가 올라가며 표시되는 연출 | 600–1200ms, 결과 숫자 한 곳 | "잔액 숫자 count-up 800ms" |

## 6. 이미지·아이콘 (Imagery & Icons)

| Term | 뜻 | 지시하는 법 (레버+값) | 예문 |
|---|---|---|---|
| Line icon vs Filled icon | 선으로 그린 아이콘 / 면으로 채운 아이콘 | 한 화면엔 한 종류, 활성 상태만 채움 | "선 아이콘, 선택된 탭만 filled" |
| Stroke width & size | 아이콘 선 두께와 크기 | 16/20/24px, 선 1.5–2px. 글자 크기의 1.25–1.5배 | "아이콘 20px, stroke 1.5px" |
| Icon set | 같은 규칙으로 그린 아이콘 묶음 | 한 세트만. 공개 라이선스(Lucide·Phosphor 등) | "Lucide 한 세트만" |
| Spot illustration | 작은 장면 일러스트 | 빈 상태·온보딩에 화면당 1개, 선·팔레트 규칙 고정 | "빈 상태에 spot illustration 하나" |
| Product screenshot | 실제 UI 캡처 | 1x 실제 데이터, 프레임 최소, 목업 기울이기 없음 | "목업 대신 실제 화면 1:1" |
| Art direction | 사진의 톤·구도·조명 규칙 | 한 문장 규칙(자연광, 저채도, 여백 많은 구도) | "사진은 자연광, 인물 없이 제품 클로즈업" |
| Aspect ratio | 이미지의 가로세로 비 | 상품 3:4·4:5·1:1 중 하나로 통일, 히어로 16:9 | "상품 이미지 3:4 통일" |
| Crop | 잘라내는 범위 | 타이트 크롭(디테일) vs 와이드(맥락) | "타이트 크롭으로 소재감" |
| Edge-to-edge | 여백 없이 화면 끝까지 채운 이미지 | radius 0, 이미지 사이 gap 0–2px | "기획전 사진은 edge-to-edge" |
| Grain / Noise | 미세 입자 질감 | 불투명도 3–6%, overlay | "배경에 grain 4%" |
| 3D render | 입체 그래픽 | 조명·각도 통일, 의미 있는 사물만. 블롭은 IC-3 | "주제를 나타내는 3D 오브젝트 하나" |
| Emoji | 유니코드 그림 글자 | 기능 아이콘으로 쓰지 않는다(IC-1) | "이모지 대신 선 아이콘" |

## 7. 컴포넌트·패턴 (Components & Patterns)

섹션 단위 이름은 `sections.md` 의 id 를 쓴다. 여기는 컴포넌트와 관용 패턴이다.

| Term | 뜻 | 지시하는 법 (레버+값) | 예문 |
|---|---|---|---|
| Hero | 첫 화면의 주인공 영역 | 약속 한 문장 + 증거 + 행동. 변형은 `hero-*` id | "hero-split, 오른쪽에 실제 화면" |
| CTA (primary / secondary) | 행동 유도 버튼 | 주 1개(채움) + 보조 1개(ghost), 높이 같게 40–48px | "주 CTA 하나, 보조는 텍스트 링크" |
| Sticky CTA | 화면 아래 고정 버튼 | 모바일 전폭 52–56px + safe-area | "모바일 하단 고정 CTA 56px" |
| Nav bar | 상단 이동 막대 | 56–72px, sticky, 링크 5개 이하 + 주 CTA | "내비 64px, 링크 4개" |
| Bento grid | 크기가 다른 타일 격자. 스타일이 아니라 배치 | 큰 타일 1 + 작은 타일 3–5, 타일마다 실제 화면 | "bento-grid 5타일, 큰 타일에 대표 기능" |
| Card | 하나의 단위를 담은 판 | 꼭 필요할 때만. radius·그림자를 위계별로 | "카드 없이 리스트로" |
| List row | 왼쪽 아이콘 + 두 줄 텍스트 + 오른쪽 값·화살표 | 행 높이 56–72px, 아이콘 32–40px | "설정을 list row 로" |
| Chip / Tag / Badge | 작은 선택·분류·상태 표시 | 칩 28–32px pill, 배지 18–24px 글자 12px | "필터는 chip, 신상은 badge" |
| Segmented control | 2–4개 중 하나를 고르는 붙은 버튼 | 높이 32–40px, 선택 면이 미끄러진다 | "월간/연간 segmented control" |
| Tabs | 같은 자리에서 내용을 바꾸는 탭 | 3–5개, 밑줄 또는 면 | "사용 사례 탭 4개" |
| Accordion | 펼치고 접는 목록 | FAQ, 화살표 회전 200ms | "FAQ 는 accordion" |
| Modal / Dialog | 흐름을 막는 창 | 짧은 확인·입력만, 폭 400–560px | "삭제 확인만 modal" |
| Bottom sheet | 아래서 올라오는 판 | 상단 radius 20–28px, 손잡이 표시 | "옵션 선택은 bottom sheet" |
| Toast | 잠깐 뜨는 알림 | 3–5초, 행동 1개까지 | "저장되면 toast '저장했어요'" |
| Empty state | 데이터가 없을 때의 화면 | 이유 + 첫 행동 버튼(+ 일러스트 1) | "빈 목록에 '첫 회의 녹음하기' 버튼" |
| Skeleton | 로딩 중 자리 표시 | 실제 레이아웃 모양, 은은한 shimmer 1.2–1.6s | "목록 로딩은 skeleton 3행" |
| Data table | 비교용 행·열 표 | 행 32–48px, 숫자 오른쪽 정렬, 고정 헤더 | "data-table 행 40px" |
| Pagination / Infinite scroll | 페이지 번호 / 계속 불러오기 | 게시판은 번호(위치 유지), 피드는 무한 스크롤 | "게시판은 pagination" |
| Logo cloud | 고객사 로고 줄 | 흑백, 높이 20–32px, 진짜 고객만(CP-5) | "로고 6개 흑백 한 줄" |
| Form field | 라벨·입력·도움말·오류 묶음 | 라벨은 위, 입력 44–48px, 글자 16px 이상 | "입력 높이 48px, 오류는 아래 13px" |

## 8. 스타일 이름 (Style Names)

자세한 정의·범위는 `${CLAUDE_PLUGIN_ROOT}/references/styles/_index.md` 와 각 스타일 파일. 스타일 이름만 쓰면 AI 는 그 스타일의
평균으로 간다. 이름 + 레버 2–3개를 같이 쓴다.

| Term | 뜻 | 지시하는 법 (id + 핵심 레버) | 예문 |
|---|---|---|---|
| Minimal | 요소를 줄이고 여백·크기로 위계 | `minimal`: 섹션 120–200px, 무채색 + 강조 0–1 | "minimal, 섹션 여백 144px, 강조색은 CTA 에만" |
| Swiss / International Style | 보이는 격자, 왼쪽 정렬, 거대한 산세리프 | `swiss`: 12열, radius 0, 원색 하나 | "swiss, 12열에 전부 왼쪽 정렬" |
| Editorial | 잡지 편집 문법 | `editorial`: 세리프 제목, 본문 18px 이상, 캡션 | "editorial, 명조 제목에 본문 18px" |
| Corporate clean | 정돈된 신뢰형 | `corporate-clean`: 브랜드 1색, radius 2–3단계, 실제 화면 | "corporate-clean, 남색 하나에 실제 제품 화면" |
| Data-dense | 촘촘한 정보 화면 | `data-dense`: 본문 13–14px, 행 32–36px, tabular | "data-dense, 행 36px 에 tabular 숫자" |
| Neo-brutalism | 두꺼운 테두리 + 하드 그림자 | `neo-brutalism`: 3px 검정 테두리, `4px 4px 0` | "neo-brutalism, 3px 테두리에 하드 섀도" |
| Playful illustrative | 고유 일러스트로 친근하게 | `playful-illustrative`: 선 2px 규칙, radius 20 | "playful-illustrative, 빈 상태에 캐릭터" |
| Organic soft | 따뜻한 중립과 부드러운 곡선 | `organic-soft`: 오프화이트, radius 24, 느린 모션 | "organic-soft, 색은 제품 사진에서" |
| Luxury | 큰 이미지, 작은 글자, 느림 | `luxury`: 풀블리드 사진, 12–14px, radius 0 | "luxury, 사진 80% 에 글자 13px" |
| Dark tech | 어두운 면, 1px 경계, 정밀한 도구 | `dark-tech`: bg 명도 8%, 경계 흰 8% | "dark-tech, 그림자 대신 1px 경계" |
| KR fintech simple (토스형) | 한 화면 한 메시지, 큰 숫자 | `kr-fintech-simple`: 배경 단계, 하단 고정 CTA | "토스형, 그림자 없이 회색 배경 단계" |
| KR editorial commerce (29CM형) | 사진이 색을 독점하는 커머스 | `kr-editorial-commerce`: 흑백 UI, 상품 3:4 | "29CM형, UI 는 흑백, 상품 3:4" |
| Glassmorphism | 뒤를 흐리는 반투명 면 | `+ glassmorphism`: blur 12–24px, 뒤에 다색 배경 | "사진 위 내비에만 glass" |
| Neumorphism | 같은 색 면을 양방향 그림자로 돌출 | `+ neumorphism`: 장식 요소에만 | "neumorphism 은 장식 카드 하나만" |
| Aurora gradient | 흐린 다색 그라데이션 면 | `+ aurora-gradient`: 브랜드 hue 2–4색, 한 곳 | "히어로에만 브랜드색 aurora" |
| Grain / Noise texture | 필름 입자 질감 | `+ grain-noise`: 3–6%, overlay | "배경에 grain 4%" |
| Clay 3D | 무광 파스텔 3D 렌더 | `+ clay-3d`: 화면당 1개, 의미 있는 사물 | "주제 오브젝트 하나만 clay 3D" |

Bauhaus, Memphis, Y2K, Material, Flat, Skeuomorphism 같은 이름은 카탈로그에 없다. `_index.md` 7장의 규칙(일반 지식 +
"카탈로그 미수록" 표시 + URL 캡처 제안)을 따른다.
