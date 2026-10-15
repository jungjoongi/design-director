# design-director 평가(eval) 세트

`claude plugin eval` 로 돌리는 케이스와, 케이스가 작업 폴더에 까는 픽스처 앱이다. 설치본에 섞이지 않게
플러그인 폴더(`plugins/design-director/`) 밖에 둔다. 픽스처의 제품 "모아노트"(회의 녹음을 요약해 주는 팀 도구)와
회사·인물·수치·사업자 정보는 모두 가상이고, 도메인은 예약 도메인 `moanote.example` 을 쓴다.

```
evals/
├── fixtures/apps/            정적 앱 3개. 빌드 없음, python3 -m http.server 로 띄운다
│   ├── ai-slop-landing-ko/   Tailwind v4 브라우저 빌드(CDN). AI 기본값 범벅 랜딩
│   ├── bland-landing-ko/     plain CSS. 밋밋한 랜딩
│   └── board-ko/             카드 피드로 만든 한국 커뮤니티 게시판(목록 + 글 상세)
└── cases/<case>/             prompt.md (+ case.yaml · scaffold.sh) + graders/*.md
```

## 1. 픽스처 앱

앱마다 `index.html`(+ `styles.css`), `package.json`(`description`, `"dev": "python3 -m http.server 4173"`), `README.md` 가
있다. direct 는 package.json `description` 과 README 첫 문단에서 제품을 추론하므로, 이 파일들은 실제 프로젝트처럼 쓰고
평가 의도는 적지 않는다(스캐폴드가 그대로 작업 폴더에 복사한다).

| 앱 | 의도 | `dd.mjs tells` 에 걸리는 것 (flagged) | 코드로 안 잡히는 의도된 문제 |
|---|---|---|---|
| ai-slop-landing-ko | 보라→파랑 히어로, 그라데이션 텍스트, 글래스 카드, 이모지 아이콘, 영문 eyebrow, 끝 화살표, 모든 섹션 fade-up | 18개 — S1: TY-1 TY-2 TY-3 CO-1 CO-4 SH-3 IC-1 MO-4 KR-1 KR-2 KR-4 · S2: SH-2 MO-1 MO-2 CP-1 CP-4 · S3: SH-5 CP-6 | LA-1 · LA-3(모든 섹션 같은 골격) · LA-6 · LA-7 · CP-5(가짜 로고 띠 Acme 등, 후기, 수치) · KR-6(사업자 정보 없는 푸터) |
| bland-landing-ko | 시스템 폰트, 회색 일색, 전부 가운데 정렬, 본문 행간 1.4, h1 32px 대 본문 16px, 섹션 패딩 48px 균일 | 2개 — S1: KR-1 KR-2 | 위계 약함, 리듬 없음, 강조색 없음 |
| board-ko | 게시판을 3열 카드 그리드로, 조회 수 숨김(`hidden`), 무한 스크롤 자리, 6단 대댓글, 번호·말머리·페이지네이션·이전/다음 글 없음 | 0개 (keep-all·Pretendard 를 넣어 타이포 tell 을 뺐다) | KR-6 — 구조 문제만 남긴 픽스처다 |

캡처 확인(2026-10-15, Chrome 155): 세 앱 모두 `dd.mjs capture http://localhost:<port>/` 가 exit 0 으로 끝났다
(신뢰도 ai-slop high · bland high · board medium). board 의 `post.html` 도 따로 찍어 확인했다.

다시 확인하는 법:

```bash
node plugins/design-director/scripts/dd.mjs tells evals/fixtures/apps/ai-slop-landing-ko --root evals/fixtures/apps/ai-slop-landing-ko
python3 -m http.server 4173 --directory evals/fixtures/apps/bland-landing-ko    # http://localhost:4173/
```

그레이더가 픽스처의 특정 문자열에 기대고 있다. 픽스처를 고칠 때 아래를 지킨다.

- ai-slop 히어로의 `bg-gradient-to-r from-purple-500 to-blue-500` (direct-gate-no-edit 가 "그대로인지" 본다)
- bland 의 원래 강조색 `#5B6B7C` — `styles.css` 의 `--color-primary` 와 `index.html` 의 `theme-color` 메타 (direct-brief-draft)
- bland 어디에도 `#2563EB` 를 넣지 않는다 (direct-pass-through 가 바뀐 결과로 찾는다)

## 2. 케이스

모든 케이스는 `runs: 2` 이고, `plugins: ["../../../plugins/design-director"]` 로 플러그인을 직접 가리킨다.
스캐폴드가 있는 케이스는 `case.yaml` 의 `context.scaffold_script` 가 픽스처를 빈 작업 폴더로 복사한다(`--scaffold` 필요).

### 트리거 — 스킬이 떠야 한다 (`tool_used` Skill, 그레이더 1개)

| 케이스 | 스킬 | 스캐폴드 | 프롬프트 |
|---|---|---|---|
| ref-url-ko | ref | - | https://linear.app 디자인이 왜 고급져 보이는지 실제 수치로 뜯어봐줘 |
| ref-style-name | ref | - | Swiss 스타일이 정확히 어떤 규칙인지 레퍼런스로 정리해줘 |
| ref-en | ref | - | what style is stripe.com? break down its look with actual values, not vibes |
| direct-vague-ko | direct | ai-slop | 이 랜딩 좀 이쁘게 해줘. 뭔가 AI가 만든 티가 나 |
| direct-brand | direct | bland | index.html 토스 느낌으로 바꿔줘. 깔끔하고 신뢰감 있게 |
| direct-structure-community | direct | board | 커뮤니티 게시판 목록이랑 글 상세 구조부터 잡아줘. 클리앙 같은 한국 커뮤니티 느낌으로 |
| direct-en | direct | bland | make this landing look more premium, it looks generic |

`max_turns` 는 4(스캐폴드 케이스는 파일을 먼저 볼 수 있어 5)로 짧게 끊는다. 스킬이 떴는지만 보므로 그 뒤 작업은 필요 없다.

### 오발 — 이름이 비슷하지만 스킬이 뜨면 안 된다 (`tool_used` Skill `min: 0` `max: 0` `arm: both`)

| 케이스 | 뜨면 안 되는 스킬 | 프롬프트 |
|---|---|---|
| nm-forwardref | ref | forwardRef로 감싼 Input에 ref가 계속 null이야. 왜 그래? |
| nm-crawl | ref | https://example.com 상품 목록 크롤링해서 가격 CSV로 뽑아줘 |
| nm-backend-board | direct | 커뮤니티 게시판 백엔드 설계해줘. 대댓글, 추천 포함해서 테이블 구조랑 API |
| nm-tailwind-migrate | direct | tailwind v3에서 v4로 마이그레이션 하는 방법 알려줘 |

### 행동 — `--scaffold` 와 `--allow-tools Write Edit Bash` 가 있어야 의미가 있다

| 케이스 | 스캐폴드 | max_turns | 그레이더 (괄호는 weight, 표시 없으면 1) |
|---|---|---|---|
| direct-gate-no-edit | ai-slop | 25 | gradient-kept(2) · no-code-edits(2) · no-code-writes · named-directions · tell-ids · diagnosis-quality(llm, 2) · skill-fired(표시용) |
| direct-brief-draft | bland | 30 | brief-exists(2) · brief-status-draft · brief-cites-tells · styles-unchanged · index-unchanged · no-code-edits(2) · no-code-writes · asks-approval · brief-quality(llm, 2) · skill-fired(표시용) |
| direct-pass-through | bland | 12 | color-applied(2) · no-brief · no-design-files · applied-directly(llm) |
| ref-catalog-profile | - | 25 | profile-exists(2) · moves-heading · fixed-headings · catalog-method · catalog-evidence · no-measured-cells · status-complete · no-todo · profile-quality(llm, 2) · skill-fired(표시용) |

- **direct-gate-no-edit** — "이쁘게, AI 티 나"에 코드를 고치지 않고 수치 진단 + tell ID + 「이름」 붙은 방향 2–3개를 내고 멈추는지.
  "그대로"는 두 겹으로 본다: 파일 내용(원래 그라데이션 클래스)과, `.design/` 밖 경로로 간 Edit·Write 호출 0회.
- **direct-brief-draft** — 질문할 거리를 미리 다 답한 풀 모드 요청에서 `.design/briefs/home.md` 를 `status: draft` 로 쓰고
  코드는 그대로 둔 채 승인을 묻는지. 브리프 내용은 llm 그레이더가 파일을 직접 읽어 판정한다.
- **direct-pass-through** — 값이 정해진 수정("버튼 색을 #2563EB 로")은 질문·브리프·`.design/` 파일 없이 바로 고치는지.
  플러그인이 정확한 지시를 가로막지 않는지 보는 회귀 테스트다. 이 케이스는 스킬이 떴는지 묻지 않는다(떠도 통과 모드면 된다).
- **ref-catalog-profile** — 스타일 이름만으로 `.design/references/style-swiss/profile.md` 를 고정 헤딩 전부와
  `method: catalog`·`status: complete` 로 저장하고, 근거 열에 `측정` 셀이 없는지.

## 3. 실행

`--eval-dir` 는 **대상(target) 폴더 아래**로 풀리고, `..`·절대 경로·점으로 시작하는 이름(`.runs`)을 받지 않는다.
케이스가 플러그인 폴더 밖에 있으므로 저장소 루트를 대상(`.`)으로 주고 `--eval-dir evals/cases` 로 고른다.
`claude plugin eval ./plugins/design-director --eval-dir ./evals/cases` 처럼 쓰면 `plugins/design-director/evals/cases` 를
찾아 "No eval cases found" 로 끝난다.

```bash
# 트리거 + 오발 11개. 쓰기 권한이 필요 없다. --scaffold 는 direct 트리거 케이스에 픽스처를 깐다
claude plugin eval . --eval-dir evals/cases --trust-plugin --scaffold --ablation none --tag trigger near-miss

# 행동 4개. 파일 쓰기와 셸(dd.mjs tells)을 쓰므로 권한을 준다. 기본 ablation 은 플러그인 없는 기준선도 같이 돈다
claude plugin eval . --eval-dir evals/cases --trust-plugin --scaffold --allow-tools Write Edit Bash --tag behavior

# 이름으로 고르기
claude plugin eval . --eval-dir evals/cases --trust-plugin --runs 2 --ablation none --allow-tools Write Edit --case 'ref-*'
claude plugin eval . --eval-dir evals/cases --trust-plugin --scaffold --allow-tools Write Edit Bash --case 'direct-*'

# 한 케이스만 한 번 (스모크)
claude plugin eval . --eval-dir evals/cases --trust-plugin --case nm-forwardref --runs 1 --ablation none
```

- 대상(`.`)은 `--tag`·`--allow-tools`·`--json` 보다 앞에 둔다. 이 옵션들은 값을 여러 개 받아서 뒤에 오는 대상을 값으로 먹는다.
- 결과는 `evals/cases/results/<시각>/` 에 `aggregate-result.json` 과 `report.html` 로 남는다(`.gitignore` 처리).
  다른 곳에 두려면 `--output-dir evals/.runs/<이름>`.
- 모델을 고정하려면 `--model`. 안 주면 실행 환경의 기본 모델을 쓴다(스모크 때 `claude-opus-5-5`). 모델이 바뀌면 트리거
  비율도 바뀌므로 비교할 때는 고정한다. llm 그레이더 판정 모델은 `--judge-model`(기본 haiku).
- 기본 `--threshold` 는 1.0 이라 한 케이스라도 만점이 아니면 exit 1 이다. 추세를 볼 때는 `--threshold 0.8` 처럼 준다.

### 형식만 검사 (생성 0원)

존재하지 않는 케이스 이름으로 거르면 아무것도 돌지 않고, `prompt.md` frontmatter 오류만 보고된다.
그레이더 형식까지 보려면 케이스를 고른 채 존재하지 않는 모델을 준다. 모든 실행이 API 단계에서 바로 실패해서 비용이 0이다.
실패한 실행의 임시 폴더가 `/private/tmp/e-*` 에 잠긴 채 남으니(`chmod -R u+rwx` 후 삭제) 형식을 바꿨을 때만 쓴다.

```bash
claude plugin eval . --eval-dir evals/cases --trust-plugin --case 'zz-none'                       # frontmatter 만
claude plugin eval . --eval-dir evals/cases --trust-plugin --runs 1 --ablation none --no-publish \
  --model zz-invalid-model --max-cost-usd 0.05                                                   # 그레이더까지
```

## 4. 비용

- 실측: 스모크 `nm-forwardref` 1회 — 2턴, 14초, **$0.08** (claude-opus-5-5, 스킬 안 뜸). 셸 권한을 준 4턴짜리 점검 실행 — $0.26.
- 추정: 스킬이 뜨면 SKILL.md 와 references 를 읽느라 한 턴이 훨씬 무거워진다. 트리거·오발 11개 × 2회는 스모크의 수십 배,
  행동 4개 × 2회 × 2갈래(기준선 포함)는 그보다 한 자릿수 더 든다고 보고 `--max-cost-usd` 로 상한을 건다.
- 줄이는 법: 트리거·오발은 `--ablation none`(플러그인 없는 쪽은 스킬이 뜰 수 없어 기준선이 정보가 없다), 행동 케이스도
  기준선 비교가 필요 없으면 `--ablation none`, 반복 중에는 `--runs 1 --case <이름>`.
- llm 그레이더는 실행마다 판정 3표를 부른다(4개 케이스에 하나씩).

## 5. 설계 메모

- **실행 환경**: 실행마다 격리된 `claude -p` 다. 이 플러그인과 내장 플러그인만 뜨고, 설명에 나오는 경쟁 스킬
  (frontend-design, design:design-critique 등)은 없다. 사용자 설정·CLAUDE.md·MCP 도 없다.
- **AskUserQuestion 을 주지 않는다**: 단일 턴 실행이라 사용자가 답할 수 없다. 도구가 없으면 질문이 마지막 답에 글로
  남고, `last_message` 그레이더가 방향 이름·승인 질문을 거기서 읽는다.
- **실행 안 셸 샌드박스**: `dd.mjs tells` 는 돈다(플러그인 경로를 읽을 수 있다). 하지만 Chrome 은 뜨지 못한다
  (`dd.mjs doctor` → `LAUNCH_FAILED`, exit 4). 그래서 capture·verify 가 필요한 흐름은 평가할 수 없고, 행동 케이스
  프롬프트가 그 질문을 미리 답한다 — gate 는 "dev 서버는 지금 못 띄우니까 코드만 보고 판단해줘", brief 는
  "토스 사이트를 직접 재지는 말고 카탈로그 값으로 충분해. dev 서버도 안 띄워도 돼". 안 그러면 스킬이 서버 기동·실측
  여부를 묻고 실행이 거기서 끝난다.
- **"그대로" 판정**: `file_exists` 는 실행 중에 새로 만든 파일만 센다(스캐폴드 파일은 안 센다). 그래서 기존 파일은 내용
  정규식과 `tool_used`(Edit·Write 의 `file_path` 가 `.design/` 밖이면 0회여야 통과)로 본다.
- **빈 파일 통과 방지**: "없어야 한다" 검사는 `not_contains` 대신 `^(?![\s\S]*금지패턴)[\s\S]*## 4\. 시그니처 무브` 처럼
  썼다. 파일이 없으면 통과하지 못한다.
- **브리프 이름**: brief-* 그레이더는 `/` → `home` 규칙(direct SKILL.md)대로 `.design/briefs/home.md` 를 읽는다.
  다른 이름으로 쓰면 brief-exists 만 통과하고 나머지는 실패하는데, 그 자체가 스킬 규칙 위반이라 그대로 둔다.
- **스킬 발동 표시**: 두 갈래 실행에서 `tool_used: Skill` 은 점수에서 빠지고 표시용이 된다. 그레이더가 그것 하나뿐인 트리거
  케이스는 예외로 점수에 들어간다. 오발 케이스는 `arm: both` 로 양쪽 모두 점수에 넣는다.
- **다중 턴(history_file)은 쓰지 않는다**: 경로 대상이면 한 갈래로만 돌고, 기록 파일을 플러그인 버전마다 다시 떠야 한다.
