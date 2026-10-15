# 브리프 템플릿 (.design/briefs/<page>.md)

`direct` 4단계에서 이 형식으로 브리프를 쓴다. 브리프는 사람이 승인하는 문서이면서, compact 뒤에 어디까지 했는지
알려 주는 상태 파일이다(frontmatter `status`·`iteration`, 끝의 적용 로그·변경 이력). 헤딩 문구와 순서를 지킨다.
값은 숫자로 쓰고 근거 열에 출처를 단다: `측정 / 선언 / 파생 / 추정 / 카탈로그 / 브리프`(브리프 = 이 문서에서 정한 값).

## 1. 파일 골격

```markdown
---
schema: dd.brief/1
page: home                     # 라우트에서 정한 이름(SKILL.md 의 <page> 규칙)
files: ["app/(marketing)/page.tsx", "components/landing/*.tsx", "app/globals.css"]
type: landing                  # landing | saas-app | commerce | community | content-portfolio
stack: tailwind-v4+shadcn      # stack-recipes 이름, + 로 겹침
references: [linear-app]       # .design/references/<slug> — 없으면 []
styles: {primary: swiss, secondary: dark-tech, treatments: []}
viewports: [desktop-1440x900, mobile-390x844]
dev_url: http://localhost:3000/
status: draft                  # draft → approved → applied → verified
iteration: 0                   # 검증 후 보정·피드백 반영 횟수
created: 2026-10-15
approved_at: null
---

# 디자인 브리프 — {페이지}

## 0. 한 줄 방향 (Direction)
「{이름}」 — {primary} × {secondary}, 레퍼런스: {브랜드}의 {구체 요소}

## 1. 페이지 기획 (Plan)
| 항목 | 내용 | 근거·가정 |
|---|---|---|
| 목표 | … | 사용자 답 / 추론(README 첫 문단) / 가정 |
| 주 사용자 | … | |
| 주 행동 (Primary CTA) | … | |
| 보조 행동 | … | |
| 있는 콘텐츠 | 제품 화면 3장, 기능 6개, 가격표 | 코드·자산에서 확인 |
| 없는 콘텐츠와 처리 | 고객 후기 없음 → 섹션 생략 | 지어내지 않는다 |

## 2. 구조 (Structure)
| # | 섹션 id | 목적 | 콘텐츠 출처 | 변경 |
|---|---|---|---|---|
(ASCII 와이어프레임 — 박스 안은 영문 id·라벨, 폭 64자 이하)
모바일: …
레퍼런스 번역: 가져올 레버 … / 두고 올 레버 …

## 3. 진단 요약 (Diagnosis)
점수 before {n}/100 · AI 기본값 S1 {n} · S2 {n} · 상위 문제 3개(수치)

## 4. 시그니처 무브 (Signature Moves)
1. {동사로 끝나는 지시문} [채택|변형|버림] — {어디에}
   {수치(근거)} · {따라 하는 법: CSS·Tailwind 한 줄}

## 5. 토큰 (Tokens)
| 범주 | 토큰 | 현재 | 변경 | 근거 |
|---|---|---|---|---|

## 6. 컴포넌트 규칙 (Components)
버튼(변형별 높이·패딩·radius·상태), 카드, 입력, 내비 …

## 7. 한국어 타이포 규칙 (Korean Type)
## 8. Do / Don't
## 9. 적용 계획 (Apply Plan)
| 단계 | 파일 | 바뀌는 것 | 바뀌지 않는 것 |
|---|---|---|---|
## 10. 검증 기준 (Acceptance)
## 11. 이식용 프롬프트 (Portable Prompt)
## 적용 로그 (Apply Log)
## 변경 이력 (History)
```

## 2. 섹션별 규칙

- **0** 「이름」은 사용자가 고른 옵션 이름 그대로. 스타일 id 는 `${CLAUDE_PLUGIN_ROOT}/references/styles/_index.md` 의 id 만 쓴다.
- **1** 사용자가 답하지 않고 추론한 칸은 근거 열에 "가정"이라고 쓴다. 가정이 틀렸다는 말을 들으면 여기부터 고친다.
- **2** 섹션 id 는 `${CLAUDE_PLUGIN_ROOT}/references/sections.md` 에서만. 콘텐츠 출처가 없는 섹션은 빼거나 `TODO(카피)`.
- **4** 무브는 3–5개, 무브마다 두 줄로 줄여 쓴다: 첫 줄은 제목(동사로 끝나는 지시문) + 채택/변형/버림 + 위치, 둘째 줄은
  수치(근거 태그) · 따라 하는 법. 관찰·기본값과의 차이·깨지는 경우까지 담은 전체 형식은 레퍼런스 프로필 4장이나
  `${CLAUDE_PLUGIN_ROOT}/references/signature-moves.md` §4 에 있다. 변형이면 바뀐 수치를, 버림이면 이유를 둘째 줄에 쓰고,
  깨지는 경우가 채택 판단을 바꾸면 둘째 줄 끝에 붙인다. 레퍼런스가 없으면 스타일 파일의 무브에서 고른다.
  수치 없는 무브는 무브가 아니다 — 7단계에서 다시 잴 수 없다.
- **5** 범주는 타이포·색·간격·형태·모션 순. 현재 값은 진단에서 잰 값, 변경 값은 이 브리프가 정한 값. 토큰 12–20개가 적당하다.
- **6** 컴포넌트마다 상태(hover·focus-visible·disabled·loading·empty·error)를 적는다.
- **7** 한국어 페이지만. `${CLAUDE_PLUGIN_ROOT}/references/korean-typography.md` §1·§2 에서 이 페이지에 해당하는 줄만 옮긴다.
- **8** Do 3–6개, Don't 3–6개. Don't 마다 tell ID 나 깨지는 무브 번호를 붙인다. 브리프가 일부러 고른 tell 은 Do 에 "예외: CO-2 크림 배경은 방향의 일부"처럼 적는다.
- **9** 적용 순서(토큰 → 타이포 → 간격·레이아웃 → 색 → 컴포넌트 → 모션)대로 행을 둔다. "바뀌지 않는 것"에 문구·라우팅·데이터 로직을 적는다.
- **10** 6–10개, 모두 확인 가능한 문장으로: "390px 가로 넘침 0", "S1 tell 0", "본문 대비 ≥ 7:1", "무브 1–3 반영".
- **적용 로그** 단계마다 한 줄: `② 타이포 — globals.css, layout.tsx — display 36→56px, Pretendard 로드 — 스크린샷 OK`.
- **변경 이력** 승인 뒤 바뀐 것: `2026-10-15 it1 — 사용자 "더 과감하게(히어로)" → display 56→72px, 섹션 96→128px`.

## 3. 채팅 요약 템플릿 (60줄 이하)

```
브리프를 .design/briefs/{page}.md 에 저장했어요.

방향: 「{이름}」 — {primary} × {secondary} · 레퍼런스: {브랜드}의 {요소}
시그니처 무브: 1) … 2) … 3) …
구조: nav → hero-split → logo-cloud → feature-alternating(2) → pricing → faq → cta-band → footer
{ASCII 와이어프레임 데스크톱 1개}
바꾸는 토큰(핵심): display 36→56px · 본문 행간 1.4→1.65 · 섹션 48→112px · radius 12 하나 → 8/16 · 강조 #6366F1→#2F5BEA
하지 않을 것: CO-1 보라 그라데이션 · TY-2 eyebrow · IC-1 이모지 아이콘 · LA-1 같은 카드 반복 · CP-5 가짜 후기
바뀌는 파일: app/globals.css, app/(marketing)/page.tsx, components/landing/{hero,features,pricing}.tsx
바뀌지 않는 것: 문구, 라우팅, 데이터 로직, 가격 정보
```

## 4. 짧은 예시 — 모아노트 SaaS 랜딩 (발췌)

```markdown
## 0. 한 줄 방향 (Direction)
「친근한 명료함」 — kr-fintech-simple × minimal, 레퍼런스: 토스의 굵기 대비와 큰 숫자만

## 1. 페이지 기획 (Plan)
| 항목 | 내용 | 근거·가정 |
|---|---|---|
| 목표 | 무료 체험 시작 | 현재 CTA '무료로 시작하기' + 사용자 답 |
| 주 사용자 | 5–20명 팀 리더 | README 첫 문단(추론), 사용자 확인 |
| 주 행동 | 무료로 회의 요약 받기 | |
| 없는 콘텐츠와 처리 | 고객 후기·로고 없음 → testimonials·logo-cloud 생략 | 지어내지 않는다 |

## 4. 시그니처 무브 (Signature Moves)
1. 숫자를 주인공으로 키운다 [변형] — 히어로 "60분 회의 → 3분 요약" 의 숫자
   display 72px/700(브리프), 나머지 문장 20px/500 · `font-size: var(--text-display); font-variant-numeric: tabular-nums` — 숫자가 실측이 아니면 깨진다
2. 굵기 두 개로만 위계를 만든다 [채택] — 전체
   본문 400, 제목 700, 그 사이 굵기 없음(카탈로그) · `font-weight: 400 / 700` 만 쓴다
3. 카드 대신 여백으로 묶는다 [채택] — 기능 섹션
   묶음 안쪽 16px, 묶음 사이 96px, 테두리 0(브리프) · 묶음 안 `gap: 16px`, 묶음 사이 `gap: 96px`, `border: 0`

## 5. 토큰 (Tokens)
| 범주 | 토큰 | 현재 | 변경 | 근거 |
|---|---|---|---|---|
| 타이포 | --text-display | 36px | clamp(2.5rem, 4vw + 1rem, 4.5rem) | 브리프 (display ÷ body 4.5) |
| 타이포 | body line-height | 1.4 | 1.65 | korean-typography §2 |
| 색 | --color-accent | #6366F1 | oklch(0.56 0.19 260) | 카탈로그 범위 안에서 브리프 |
| 간격 | 섹션 상하 | 48px | 112px (모바일 72px) | 카탈로그 kr-fintech-simple 범위 |
| 형태 | radius | 12px 전부 | 버튼 12 · 카드 20 · 입력 12 | 브리프 |

## 8. Do / Don't
- Don't: 히어로 보라→파랑 그라데이션 [CO-1] · 섹션 제목 위 영문 eyebrow [KR-4] · 기능 앞 이모지 [IC-1] · 없는 후기 [CP-5]
```

## 5. 이식용 프롬프트

v0·Cursor·Lovable·다른 Claude 세션에 그대로 붙이는 프롬프트. 2,500자 이하. 브리프의 수치를 그대로 옮긴다.
사용자 언어로 하나를 쓰고, 요청하면 다른 언어로 하나 더 쓴다.

```
[역할] 너는 아래 브리프의 시각 방향을 정확히 따르는 시니어 프론트엔드 디자이너다. 방향을 임의로 바꾸지 마라.
[제품/페이지] {제품 한 줄} · 목표: {goal} · 주 사용자: {user} · 핵심 행동: {CTA}
[방향] {한 줄 방향}. 스타일: {primary} × {secondary}. 레퍼런스: {brand}의 {구체 요소}만.
[시그니처 무브] 1) … 2) … 3) … (모두 수치 포함)
[토큰] :root{ --color-surface:…; --color-ink:…; --color-accent:…; --font-sans:…; --text-display:clamp(…); --radius-card:…; --space-section:…; }
[구조] 1 nav 2 hero-split … (섹션 id + 한 줄)
[한국어 타이포] word-break:keep-all; 본문 line-height {body line-height}; 자간 {tracking}; lang="ko"; 입력 16px 이상
[금지] 보라-파랑 그라데이션, 이모지 아이콘, 모든 카드 같은 radius+그림자, 대문자 영문 아이브로우, 버튼 끝 화살표, 가짜 후기·로고·수치
[출력] {stack}. 대비 4.5:1, focus-visible, prefers-reduced-motion.
```

```
[Role] You are a senior front-end designer who follows the visual direction below exactly. Do not change the direction.
[Product/Page] {one line} · Goal: {goal} · Primary user: {user} · Key action: {CTA}
[Direction] {one-line direction}. Style: {primary} × {secondary}. Reference: only {specific element} from {brand}.
[Signature moves] 1) … 2) … 3) … (each with numbers)
[Tokens] :root{ --color-surface:…; --color-ink:…; --color-accent:…; --font-sans:…; --text-display:clamp(…); --radius-card:…; --space-section:…; }
[Structure] 1 nav 2 hero-split … (section id + one line)
[Korean type] word-break:keep-all; body line-height {body line-height}; letter-spacing {tracking}; lang="ko"; inputs ≥16px
[Never] purple-to-blue gradients, emoji icons, identical radius+shadow cards, uppercase eyebrows, arrows appended to buttons, fake testimonials/logos/numbers
[Output] {stack}. Contrast 4.5:1, focus-visible, prefers-reduced-motion.
```

도구별 메모 — `[출력]` 줄을 바꾼다:
- v0: "Next.js + Tailwind + shadcn/ui"
- Lovable: "React + Vite + Tailwind + shadcn"
- Cursor·Claude Code: "기존 파일 {경로}를 수정, 새 의존성 금지"

[금지] 줄은 브리프 §8 Don't 에서 이 페이지에 해당하는 것만 남긴다. 브리프가 일부러 고른 요소(예: 크림 배경)는 금지에서 뺀다.
