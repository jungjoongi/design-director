---
name: direct
description: >-
  디자인 디렉팅 — 디자이너·기획자 없이 만드는 개발자를 위해, 막연한 요청이나 레퍼런스를 '이름 붙은 방향 + 수치
  토큰 + 페이지 구조'의 디자인 브리프로 바꾸고, 승인받은 뒤에만 코드에 적용하고 스크린샷으로 검증한다(랜딩·SaaS
  화면·커머스·콘텐츠·커뮤니티/게시판). 사용자가 정확한 값이 아니라 느낌·방향을 말하면 UI 코드를 열기 전에 먼저 이
  스킬을 쓴다: '좀 이쁘게 해줘', '모던하게', '고급스럽게', '깔끔하게', '세련되게', '있어 보이게', '촌스러워',
  '밋밋해', '디자인이 별로야', 'AI가 만든 티 나', '토스 느낌으로 바꿔줘', '이 사이트처럼 만들어줘', '랜딩 구성부터
  잡아줘', '상세페이지 구성', '게시판 화면 설계', 'make it look premium/modern', 'restyle this like Linear', 'it
  looks generic', 'give this a design direction'. 레퍼런스 URL이 함께 와도 이 스킬이 먼저다(분석은 안에서 ref로).
  하지 않는 것: 값이 정해진 단일 수정('버튼 색 #2563EB로', '패딩 24px')은 바로 처리, 방향·레퍼런스 요구 없이 새
  UI를 짓는 일은 frontend-design, 분석만 원하면 ref, 비평만은 design:design-critique, 접근성 감사는
  design:accessibility-review, 문구는 design:ux-copy.
argument-hint: "[페이지·파일 경로] [ref=프로필·URL·스타일·브랜드] [요청]"
allowed-tools:
  - Read
  - Glob
  - Grep
  - AskUserQuestion
  - Skill
  - "Edit(./.design/**)"
  - "Bash(node ${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs *)"
  - "Bash(node \"${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs\" *)"
---

# direct — 디자인 디렉팅

입력: `$ARGUMENTS` — 대상 페이지·파일, 레퍼런스(`ref=` 프로필 slug·URL·스타일 id·브랜드 이름), 요청 문장.
비어 있으면 주요 라우트(`app/**/page.*`, `pages/**`, `src/routes/**`)를 찾아 "어느 화면을 다룰까요?"를 후보 4개
이하로 묻는다.

**원칙: 코드보다 브리프가 먼저다.** 방향 없이 코드를 고치면 AI 는 평균값(보라 그라데이션, 똑같은 카드, 이모지
아이콘)으로 돌아간다. 브리프는 고치기 싸고 코드는 비싸다. 그래서 방향을 이름과 수치로 정하고, 사용자가 승인한
뒤에만 `.design/` 밖의 파일을 고친다. 이 플러그인을 쓰는 이유도 이 순서에 있다.

CLI 는 `node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" <명령>` 이다(stdout 에 JSON 하나). references 문서의 `${…}` 루트
표기는 치환되지 않는다. 위 명령에 적힌 실제 경로로 바꿔 쓴다.

`<page>` 는 라우트에서 정하는 이름이다: `/` → `home`, `/pricing` → `pricing`, `/blog/[slug]` → `blog-post`(동적 세그먼트는
빼고 그 페이지가 무엇인지로 부른다). 브리프(`.design/briefs/<page>.md`)와 캡처 폴더(`.design/verify/<page>/`)가 같은 이름을 쓴다.

## 0. 모드 판정 — 첫 행동

요청을 읽자마자 모드를 정한다. 질문이나 파일 생성보다 먼저다.

| 요청 | 모드 | 동작 |
|---|---|---|
| 속성 하나, 값이 있거나 뻔함, 느낌어 없음 ("버튼 색 #2563EB로", "패딩 24px") | 통과 | 바로 고친다. 질문 없음, `.design/` 파일 없음. "정확한 지시라 바로 적용했어요" 한 줄. 값이 없으면 기존 토큰과 맞는 값을 골라 무엇을 골랐는지 말한다 |
| 컴포넌트·섹션 하나 + 느낌어 ("이 카드 세련되게") | 퀵 | 범위 진단 3줄 → 한 줄짜리 안 2–3개 → 고른 번호가 곧 승인 → 적용 → 스크린샷 1장. 브리프 파일 없음 |
| 페이지 단위, 새 페이지, 레퍼런스 따라 하기, "AI 티" 전반 | 풀 | 1–7단계 |
| "뭐가 문제인지만", "진단만" | 진단만 | 1단계 + 방향 2–3개 제안에서 멈춘다 |

- 애매하면 퀵으로 시작하고 "페이지 전체로 넓힐 수도 있어요" 라고 한 줄 덧붙인다.
- 퀵 모드 스크린샷(회차마다 번호를 올린다, Bash timeout 180000):
  `node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" capture "<localUrl>" --out ".design/verify/<page>/quick-1" --viewports desktop --force`
- 사용자가 직접 "브리프 없이 바로 해", "그냥 적용까지 해줘" 라고 하면 사전 승인으로 본다. 그래도 브리프 요약은 보여준다.
- 플랜 모드에서는 브리프를 채팅으로만 보여주고, 플랜 모드를 나간 뒤에 파일로 저장한다.

**퀵 모드 문장 예시**

```
PlanCard 가 '기본값'처럼 보이는 이유: radius 12·shadow-md·회색 테두리를 한꺼번에 써서 면이 3겹이고(SH-5),
가격 숫자가 20px 라 위계가 약해요.
1) 「단단하게」 테두리 1px 만 남기고 그림자 제거, 가격 32px/700, radius 8
2) 「부드럽게」 테두리 대신 면 색(surface-2), 가격 28px/600, radius 16
3) 「강조형」 추천 플랜만 진한 면 + 흰 글자, 나머지는 경계선만
번호로 답하시면 바로 적용할게요.
```

## 진행 체크리스트 (풀 모드)

단계마다 갱신한다. compact 뒤에는 이 목록으로 이어 갈 단계를 정한다.

```
- [ ] 1. 맥락 수집·진단
- [ ] 2. 기획·방향 (멈춤 1)
- [ ] 3. 구조
- [ ] 4. 브리프
- [ ] 5. 승인 (멈춤 2)
- [ ] 6. 적용 — 토큰 → 타이포 → 간격·레이아웃 → 색 → 컴포넌트 → 모션
- [ ] 7. 검증·반복 (최대 2회)
```

**재개 규칙** — compact 뒤에는 기억으로 이어가지 않는다. `.design/briefs/<page>.md` 의 frontmatter `status`·`iteration`
과 끝의 적용 로그·변경 이력을 먼저 읽고 판정한다: `draft` → 5단계(승인 대기), `approved` → 적용 로그의 마지막
단계 다음부터 6단계, `applied` → 7단계, `verified` → 끝(새 피드백이면 7단계 반복). 브리프가 아직 없으면(1–3단계 중
compact) before 폴더와 대화로 판정하고, 답을 받지 못한 질문만 다시 묻는다. 그다음 **지금 단계의 reference 만** 다시 읽는다.

## 1. 맥락 수집과 진단 — 질문 전에 먼저 읽는다

사용자에게 묻기 전에 코드에서 알 수 있는 건 다 읽는다. 질문은 코드가 답하지 못하는 것만 남긴다.

**스택과 대상** — `references/stack-recipes/_detect.md` 로 스택을 판정한다. 대상 페이지 파일과 그 섹션 컴포넌트,
현재 토큰 위치(`@theme`·`tailwind.config`·`:root`), 폰트 로딩 위치, `<html lang>` 을 확인한다.

**제품과 목표 추론** — 아래에서 읽는다. 브리프 §1 의 근거 열에 출처를 적기 위해서다.
- `package.json` 의 `description`, README 첫 문단
- `metadata`·`<title>`·OG 설명
- 히어로 카피, CTA 라벨(무엇을 하게 만들려는지), 가격 데이터, 내비 항목

**콘텐츠 인벤토리** — 있음/없음 표를 만든다: 제품 화면 이미지, 기능 목록, 가격, 후기, 고객 로고, 수치, 사진.
없는 후기·로고·수치는 지어내지 않는다(CP-5). 없으면 그 섹션을 빼거나 `TODO(카피)` 로 남긴다.

**기존 `.design/`** — `references/*/profile.md`(이미 분석한 레퍼런스), `briefs/*.md`(다른 페이지의 방향 — 맞춰야 한다),
`taste.md`(고른 방향·거절한 방향). 거절한 방향은 다시 제안하지 않는다.

**화면이 이미 있으면**
1. dev 서버 포트를 찾는다: `package.json` dev 스크립트 → 프레임워크 기본값(next 3000, vite 5173, astro 4321, nuxt 3000,
   sveltekit 5173, remix 3000 또는 5173). 떠 있지 않으면 띄워도 되는지 묻고, 허락하면 프로젝트의 dev 스크립트를
   백그라운드로 실행한다. 거절하면 사용자가 띄운 주소를 받는다.
2. before 캡처 (Bash timeout 180000):
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" capture "<localUrl>" --out ".design/verify/<page>/before" --force
   ```
   실패하면 exit code 별 대응과 `--force` 정책은 `${CLAUDE_PLUGIN_ROOT}/references/capture-guide.md`. 9(빌드 에러 오버레이)면
   에러부터 알린다.
   before 가 이미 있고 브리프가 `approved` 이후면 다시 찍지 않는다 — 바뀐 화면이 before 가 되면 비교가 무의미해진다.
3. `summary.md` → `desktop.png` → `mobile.png` 순으로 읽고 `references/diagnosis-checklist.md` 로 100점 채점.
4. AI 기본값 스캔 — 페이지 파일 + 전역 CSS + 레이아웃을 넘긴다(프로젝트 단위 검사 때문):
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" tells app/page.tsx components/landing app/globals.css app/layout.tsx
   ```
   코드로 못 잡는 tell 은 스크린샷을 보며 `${CLAUDE_PLUGIN_ROOT}/references/ai-default-tells.md` 기준으로 찾는다.

화면이 아직 없으면(새 페이지) 진단은 건너뛰고 인벤토리와 추론만으로 2단계로 간다.
화면은 있는데 캡처를 못 하면(dev 서버를 띄울 수 없음, exit 4 등) 코드 + `tells` 스캔으로 진단하고 진단 메모에
"캡처 없음 — 코드로만 판단"이라고 적는다. 점수는 코드로 셀 수 있는 항목만 매기고 나머지는 '판단 보류'로 둔다.

**진단만 모드의 출력** — 점수 + 상위 문제 3개(레버와 숫자, `references/diagnosis-checklist.md` §4 형식) + tell 요약 +
방향 2–3개를 한 줄씩(2-3 형식의 이름·스타일·"프롬프트에 쓸 말"만). 그리고 "이 중 하나로 브리프를 만들까요?" 로 끝낸다.
`.design/` 에는 before 캡처만 남는다.

## 2. 기획과 방향 — 첫 번째 멈춤

추론한 것을 3–4줄로 먼저 보여주고, **AskUserQuestion 한 번에 4문항 이하**로 묻는다. 코드로 확실히 추론한 문항은
빼고 브리프 §1 에 "가정"으로 적는다. 전부 추론되면 방향 한 문항만 묻는다. 레퍼런스가 있으면 방향 문항도 뺀다(2-1).
페이지 유형별 구조 질문과 질문 은행은 `references/planning-questions.md`.

```
코드에서 이렇게 읽었어요. 맞는지 확인하고 방향을 골라주세요.
· 페이지: app/(marketing)/page.tsx — SaaS 제품 랜딩
· 제품: 모아노트 — 회의 녹음을 요약해 주는 팀 도구 (README 첫 문단)
· 지금 상태: 진단 48/100 — 위계 약함(헤드라인 36px vs 본문 16px), 모든 섹션이 같은 3열 카드,
  AI 기본값 tell 5개(CO-1 보라 그라데이션, TY-2 eyebrow, IC-1 이모지 아이콘, MO-1, CP-1)
```

| 문항 | 선택지 예시 |
|---|---|
| 목표 | 무료로 시작하기 (현재 CTA 기준) / 데모 신청 / 앱 다운로드 |
| 주 사용자 | 5–20명 팀 리더 (README 추론) / 개인 프리랜서 / 기업 구매 담당 |
| 방향 | A 「조용한 정밀함」 / B 「친근한 명료함」 / C 「손으로 쓴 문서」 / 레퍼런스 줄게요 (URL·이미지) |
| 구조 (유형별 1개, 필요할 때만) | "히어로에 보여줄 실제 제품 화면이 있나요?" — 있음 / 아직 없음 (타이포·도식으로) |

선택지마다 짧은 설명을 붙이고, 추론한 값에는 "(추론)"을 붙인다. 방향 옵션의 자세한 내용(아래 형식)은 질문 바로
위에 채팅으로 먼저 보여준다 — 선택지 라벨만으로는 고를 수 없다. "레퍼런스 줄게요"를 고르면 URL·이미지를 받은 뒤
2-1 사다리 ② 로 간다. 답을 받으면 바로 3단계로 넘어가고, 같은 질문을 다시 하지 않는다.

### 2-1. 방향 확보 사다리

위에서부터 처음 걸리는 칸을 쓴다.

1. **기존 프로필** — `.design/references/<slug>/profile.md` 가 있으면 그걸 쓰자고 제안한다.
2. **URL·이미지** — `Skill(design-director:ref)` 를 args 에 URL 이나 이미지 경로를 넣어 부른다. ref 는 3줄로 보고하고 돌아온다.
3. **브랜드 이름** — `Skill(design-director:ref)` 에 브랜드 이름을 넘긴다. 카드 절차는 `${CLAUDE_PLUGIN_ROOT}/references/brands/_index.md`
   1장, 카드가 없어 실측(1–2분)하다 브라우저 문제로 막히면 `${CLAUDE_PLUGIN_ROOT}/references/capture-guide.md` 의 사다리를 따른다.
4. **스타일 이름** — `${CLAUDE_PLUGIN_ROOT}/references/styles/_index.md` 와 해당 스타일 파일 하나.
5. **아무것도 없음** — 2-2 느낌어 모드.

**레퍼런스가 있으면(1–3칸) 그게 곧 방향이다.** 방향 문항은 묻지 않고, 추론하지 못한 목표·사용자·구조 문항만 묻는다.
방향은 프로필에서 뽑은 요약 하나(2-3 형식)로 보여주고, 변주("더 과감하게"·"더 차분하게")는 사용자가 원할 때만 만든다.

섞을 때는 **primary 1개 + 레버 단위 보조 2개 이하**("타입은 Linear, 색은 토스"). 시그니처 무브는 primary 에서만
가져온다. 무브까지 섞으면 어느 쪽도 아닌 화면이 된다.

### 2-2. 느낌어 모드

`references/feeling-words.md` 에서 **사용자가 쓴 그 말의 항목만** 읽는다. 가설을 1단계 수치로 확인하고 근거를 숫자로
단다("답답해 보이는 이유: 본문 행간 1.3, 섹션 패딩 32px"). 남은 가설로 축 델타를 정하고, 가장 가까운 스타일
2–3개로 옵션을 만든다. "이쁘게"처럼 가설이 안 서는 말은 진단 상위 문제 3개가 옵션을 정한다. 장식부터 더하지 않는다.

### 2-3. 옵션 제시 규칙

- 2–3개. 서로 6개 축 중 **2개 이상** 다르게. 하나는 안전안, 하나는 과감안.
- AI 기본값 묶음(보라 그라데이션+글래스, 크림+세리프+테라코타, 검정+형광, 신문형 hairline)은 사용자가 원하지 않는 한 빼고 만든다.
- 각 옵션 형식 — 마지막 줄 "프롬프트에 쓸 말"은 사용자가 다른 AI 도구에서도 쓸 어휘를 익히게 하려는 장치다.
  이 플러그인이 생긴 이유가 그것이다.

```
A. 「조용한 정밀함」 — Dark-tech × Swiss · 레퍼런스: Linear
   어두운 무채색, 1px 경계, 자간을 조인 큰 헤드라인. 기능이 많은 도구를 '잘 만든 물건'처럼.
   바뀌는 것: 배경·타입 스케일·카드 → 경계선
   위험: 일러스트가 많은 제품엔 안 맞음
   프롬프트에 쓸 말: "dark-tech, Swiss grid, hairline borders, tight tracking"
```

- 사용자가 못 고르면 하나를 이유와 함께 추천한다("팀 리더가 결제 결정을 하니 B 가 신뢰와 친근함을 같이 줘요").

## 3. 구조 설계

페이지 유형에 맞는 `references/page-patterns/<type>.md` 하나를 읽는다(예: 랜딩이면 `references/page-patterns/landing.md`,
섞인 페이지면 두 개까지). 섹션 id 는 `${CLAUDE_PLUGIN_ROOT}/references/sections.md` 에서만 고른다.

- 섹션 표: 브리프 §2 와 같은 5열 — # · 섹션 id · 목적 · 콘텐츠 출처(있는 자산·코드) · 변경(유지·추가·삭제·이동).
  출처가 없는 섹션은 빼거나 `TODO(카피)`. 지어내지 않는다.
- ASCII 와이어프레임: 박스 안은 영문 라벨·id 로 쓴다(한글은 터미널에서 2칸을 차지해 정렬이 깨진다). 데스크톱 폭 64자
  이하, 모바일은 변화만 메모한다.

```
+--------------------------------------------------------------+
| nav        logo          links x4                [CTA]       |
+--------------------------------------------------------------+
| hero-split                     |                             |
|  H1 (2 lines) + sub            |   product screenshot        |
|  [Primary CTA]  [demo 2 min]   |   (real, not mockup)        |
+--------------------------------------------------------------+
| feature-alternating #1   text  |  image                      |
| feature-alternating #2   image |  text                       |
+--------------------------------------------------------------+
| pricing   3 plans, recommended = filled surface              |
+--------------------------------------------------------------+
| faq       6 items, accordion                                 |
+--------------------------------------------------------------+
| cta-band  one sentence + [Primary CTA]                       |
+--------------------------------------------------------------+
| footer    links / business info                              |
+--------------------------------------------------------------+
mobile: hero 1열(이미지가 텍스트 아래), feature 는 이미지 위·텍스트 아래, pricing 은 세로로 쌓기
```

- **레퍼런스 번역**: 레퍼런스에서 가져올 레버와 두고 올 레버를 나눈다. 예: Linear 의 타이포 스케일·1px 경계는 가져오고,
  다크 배경·제품 스크린샷 기울이기는 랜딩이 아닌 앱 화면이라 두고 온다. 브리프 §2 끝에 적는다.

## 4. 브리프

`references/brief-template.md` 형식으로 `.design/briefs/<page>.md` 를 `status: draft` 로 쓴다. 무브는 레퍼런스 프로필
4장에서, 레퍼런스가 없으면 스타일 파일과 `${CLAUDE_PLUGIN_ROOT}/references/signature-moves.md` 형식으로 만든다.
한국어 페이지면 `${CLAUDE_PLUGIN_ROOT}/references/korean-typography.md` 에서 해당 규칙을 §7 에 옮긴다.
이식용 프롬프트(§11)도 이때 같이 쓴다.

채팅에는 **60줄 이하 요약**만: 방향 · 무브 · 와이어프레임 · 핵심 토큰 변화 · 하지 않을 것 5개(tell ID) · 바뀌는 파일 /
바뀌지 않는 것. 이 요약이 곧 5단계의 게이트 메시지다. 끝에 승인 질문을 붙여 한 번만 보낸다. 전체 문서는 파일에 있다고 알려준다.

## 5. 승인 게이트 — 두 번째 멈춤

승인 전에는 `.design/` 밖의 파일을 만들지도 고치지도 않는다. 사용자가 방향을 고르고 결과를 상상할 수 있는 마지막
지점이 여기라서다. 코드 수정 권한을 일부러 미리 받지 않았으니 적용할 때 뜨는 권한 프롬프트가 두 번째 안전장치다.

4단계 요약이 곧 이 게이트 메시지다. 아래는 요약 부분을 줄이고 끝의 승인 질문까지 보인 예다.

```
브리프를 .design/briefs/home.md 에 저장했어요. 핵심만 요약하면:
방향 「친근한 명료함」 — kr-fintech-simple × minimal, 레퍼런스: 토스의 굵기 대비와 큰 숫자
바꾸는 것: 토큰 14개, 히어로·기능 섹션 구조, 버튼·카드 2종
바꾸지 않는 것: 문구, 라우팅, 데이터 로직
예상 변경 파일: app/globals.css, app/(marketing)/page.tsx, components/landing/{hero,features}.tsx

이대로 적용할까요?
· "적용해줘": 토큰 → 타이포 → 간격 → 색 → 컴포넌트 → 모션 순서로 적용하고 스크린샷으로 확인해요
· 고칠 부분을 말씀해 주시면 브리프만 고쳐서 다시 보여드려요
· "프롬프트만": v0·Cursor·Lovable 에 붙여 쓸 프롬프트만 드려요
```

| 사용자의 답 | 처리 |
|---|---|
| "적용해줘", "적용", "진행해", "ㄱㄱ", "이대로 가자", "apply", "go ahead" | 승인. `status: approved`, `approved_at` 기록 후 6단계 |
| "괜찮네", "오 좋다", 질문 | 승인이 아니다. 질문에 답한 뒤 "적용할까요?"를 한 번만 묻는다 |
| "토큰만 먼저", "히어로만" | 부분 승인. 그 범위만 적용·검증하고 나머지를 묻는다. 적용 로그에 범위를 적는다 |
| 수정 요청 ("B 인데 좀 더 따뜻하게") | 브리프를 고치고 **바뀐 부분만 diff 로** 보여준 뒤 다시 이 게이트 |
| "프롬프트만" | 브리프 §11 을 출력하고 끝. 코드는 건드리지 않는다 |

## 6. 적용

순서: ① 토큰 → ② 타이포 → ③ 간격·레이아웃 → ④ 색 → ⑤ 컴포넌트 → ⑥ 모션. 체감 변화의 대부분이 ①②에서 나오고,
뒤 단계가 앞 단계의 값을 쓰기 때문이다. 스택별 방법은 `references/stack-recipes/<stack>.md`
(예: `references/stack-recipes/tailwind-v4.md`, shadcn 이면 `references/stack-recipes/shadcn.md` 도).

| 단계 | 하는 일 | 확인 |
|---|---|---|
| ① 토큰 | 브리프 §5 를 프로젝트의 실제 토큰 위치에(별도 토큰 파일을 만들지 않는다) | 빌드가 깨지지 않는다 |
| ② 타이포 | 폰트 로딩, 스케일, 한국어 규칙(keep-all·행간·자간·`lang`) | **스크린샷 1장** + 한 줄 상태 보고 |
| ③ 간격·레이아웃 | 섹션 간격, 컨테이너, 구조 변경(섹션 추가·순서·삭제) | 섹션 순서가 브리프 §2 와 같다 |
| ④ 색 | 하드코딩 색을 역할 토큰으로, 강조색 쓰임 정리 | 강조가 행동·핵심 정보에만 |
| ⑤ 컴포넌트 | 버튼·카드·입력·내비 + 상태(hover·focus-visible·disabled·loading·empty·error) | 상태가 빠진 컴포넌트가 없다 |
| ⑥ 모션 | 조율된 순간 1번 + 행동 피드백, `prefers-reduced-motion` | 이동 애니메이션은 모두 reduced-motion 대응 |

- ② 뒤 스크린샷은 멈추려는 게 아니다. "타이포까지 적용 — 헤드라인 56px, Pretendard 로드 확인" 처럼 한 줄 보고하고
  계속한다. 넘침·빌드 에러·폰트 로드 실패처럼 **깨졌을 때만** 멈추고 알린다. 찍는 법:
  `node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" capture "<localUrl>" --out ".design/verify/<page>/step-type" --viewports desktop --force`
  후 `summary.md` 의 타이포 표와 `desktop.png` 를 본다.
- 기능·라우팅·데이터 로직·문구는 그대로 둔다(브리프가 바꾼다고 적은 것만 바꾼다). 가짜 콘텐츠는 넣지 않는다.
- 범위는 요청한 페이지 + 공유 토큰. 다른 화면도 쓰는 컴포넌트를 고치면 브리프 §9 에 적힌 것만.
- 새 의존성(폰트 패키지, 애니메이션 라이브러리)은 브리프 §9 에 적혀 승인된 것만 설치한다. 폰트는 CDN 링크나
  woff2 파일로 충분한 경우가 많다(`${CLAUDE_PLUGIN_ROOT}/references/korean-typography.md` §6).
- 끝나면 타입체크·빌드를 돌린다(`npm run build` 또는 `tsc --noEmit`, 프로젝트 스크립트 기준). 실패하면 고치고 보고한다.
- 단계마다 브리프 적용 로그에 한 줄 쓴다. 모두 끝나면 `status: applied`.
- frontend-design 스킬이 같이 로드돼 있으면: 승인된 브리프가 그 스킬이 말하는 "client brief" 다. 그 스킬의 계획 단계는
  브리프로 대신하고, 품질 바닥(반응형·포커스·reduced-motion·대비)과 스크린샷 자기 비평 습관은 그대로 쓴다.
  그 스킬도 "브리프의 말이 항상 이긴다"고 적고 있어서, 브리프가 방향을 붙잡는다.

## 7. 검증과 반복

판정 기준·보고 형식·반복 규칙은 `references/verify-checklist.md` 하나가 기준이다. 같은 뷰포트로 after 를 찍고 나란히 놓는다
(Bash timeout 180000):

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" verify "<localUrl>" --ref <slug> --page <page>
node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" verify "<localUrl>" --ref .design/verify/<page>/before --ref-label BEFORE --page <page>
```

첫 줄은 `.design/references/<slug>/capture.json` 이 있을 때(URL 로 캡처한 프로필)만 쓴다. 브랜드 카드·카탈로그·이미지
프로필이거나 방향만 정했으면 둘째 줄로 before/after 를 비교한다.

1. 무브(반영/부분/없음)·브리프 토큰 일치(OK/CLOSE/OFF)·tells 재스캔·접근성 바닥·한국어 점검·재채점을 근거와 함께 판정한다.
2. before/after 표 + 남은 차이 3가지 + 다음 선택지("이대로 좋아" / "더 과감하게" / 구체 피드백)로 보고한다.
3. 자동 보정은 객관 항목만 최대 2회, 주관 피드백은 해당 레버를 한 단계 더 미는 것으로 해석한다. 끝나면 `.design/taste.md`
   에 한 줄 남기고 브리프를 `status: verified` 로 바꾼다.

## 다른 스킬과의 관계

| 스킬 | 관계 |
|---|---|
| frontend-design | 방향 요구 없이 새 UI 를 지을 때 그쪽. 함께 로드되면 승인된 브리프가 그 스킬의 client brief (6단계) |
| ref (design-director:ref) | 레퍼런스 분석. 이 스킬이 2-1 에서 `Skill` 로 부른다. 분석만 원하면 사용자가 직접 ref 를 쓴다 |
| design:accessibility-review | 접근성 바닥에서 실패하거나 폼·모달이 많은 화면이면 전체 감사를 권한다 |
| design:design-system | 여러 페이지에 적용해 토큰이 쌓이면 문서화를 권한다 |
| design:ux-copy · humanize-korean | 문구 다듬기. 이 스킬은 문구를 바꾸지 않는다(KR-7 은 진단만) |
| design:design-critique | 비평만 원할 때. 이 스킬의 "진단만" 모드와 달리 방향·브리프를 만들지 않는다 |

## 하지 않는 것

- 승인 전 `.design/` 밖 파일 생성·수정 — 사용자가 결과를 보기 전에 코드를 바꾸면 되돌리는 비용을 사용자가 낸다.
- 지어낸 후기·로고·수치(CP-5) — 정직성 문제이고, 들키면 제품 전체의 신뢰를 잃는다.
- 레퍼런스의 로고·일러스트·사진·카피·유료 폰트 파일 복사 — 가져오는 건 비율·리듬·토큰이다.
- 브리프에 없는 기능 변경, 고르지 않은 방향으로 바꾸기, 범위를 넘는 전역 리팩터.
- v0.1 은 웹 전용이다. React Native·Flutter 는 브리프와 이식용 프롬프트까지만 만든다.

## 언제 어떤 reference 를 읽을지

| 시점 | 읽을 것 |
|---|---|
| 1 맥락·진단 | `references/stack-recipes/_detect.md`, `references/diagnosis-checklist.md`, 화면이 있으면 `${CLAUDE_PLUGIN_ROOT}/references/ai-default-tells.md` |
| 1 캡처 실패 | `${CLAUDE_PLUGIN_ROOT}/references/capture-guide.md` |
| 2 기획 질문 | `references/planning-questions.md` |
| 2 방향 | 프로필 `profile.md` · 또는 `${CLAUDE_PLUGIN_ROOT}/references/brands/_index.md` + 카드 1개 · 또는 `${CLAUDE_PLUGIN_ROOT}/references/styles/_index.md` + 스타일 파일 1–3개 · 또는 `references/feeling-words.md` (그 말의 항목만) |
| 3 구조 | `references/page-patterns/<type>.md` (예: `references/page-patterns/landing.md`), `${CLAUDE_PLUGIN_ROOT}/references/sections.md` |
| 4 브리프 | `references/brief-template.md`, `${CLAUDE_PLUGIN_ROOT}/references/signature-moves.md`(카탈로그·느낌어 경로), 한국어 페이지면 `${CLAUDE_PLUGIN_ROOT}/references/korean-typography.md` |
| 6 적용 | `references/stack-recipes/<stack>.md` 하나(shadcn 이면 둘) |
| 7 검증 | `references/verify-checklist.md`, `${CLAUDE_PLUGIN_ROOT}/references/capture-guide.md` |
| 용어 | `${CLAUDE_PLUGIN_ROOT}/references/vocabulary.md` — 목차로 필요한 항목만 |
