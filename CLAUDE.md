# design-director 저장소 규칙

디자이너·기획자 없이 만드는 사람을 위한 Claude Code 플러그인. 저장소 루트가 마켓플레이스이고, 설치되는 실체는
`plugins/design-director/` 다. 테스트·평가·기여 문서는 플러그인 폴더 밖에 둬서 설치본에 섞이지 않게 한다.

## 먼저 읽을 것

| 문서 | 내용 |
|---|---|
| `docs/architecture.md` | 엔진(scripts/) 계약: CLI·exit code·산출물·추출/분석 책임·tells 형식·보안 |
| `plugins/design-director/references/tokens-schema.md` | `tokens.json` 필드 |
| `plugins/design-director/references/profile-schema.md` | `profile.md` frontmatter·고정 헤딩 (ref → direct 계약) |
| `plugins/design-director/references/sections.md` | 섹션 타입 id (엔진·ref·direct 공용) |

형식을 바꾸면 계약 문서와 테스트를 같은 커밋에서 함께 고친다.

## 문서·스킬 작성

- 본문은 한국어 평서문(~한다)으로 쓰고, 디자인 용어는 영어 원어를 그대로 두거나 병기한다. 사용자가 다음 프롬프트에
  그 단어를 그대로 쓸 수 있게 하는 게 이 플러그인의 목적이다.
- 번역투를 피한다. "~를 통해", "~에 있어서", "~하는 것이 중요합니다", 과한 명사화, 불필요한 피동은 쓰지 않는다.
- 형용사가 아니라 레버와 수치로 쓴다. "깔끔하게" 대신 "섹션 간격 128px, 경계선 없음".
- `SKILL.md` 본문 500줄 미만. `description` 1024자 이하, `<` `>` 금지(YAML `>-` 블록). 트리거 문구는 한/영 실제 말투로.
- 200줄 넘는 reference 는 맨 위에 목차를 둔다. SKILL.md 끝에는 "언제 어떤 reference 를 읽을지" 목록을 둔다.
- 공용 문서는 `${CLAUDE_PLUGIN_ROOT}/references/…`, 스킬 전용 문서는 `references/…`(SKILL.md 기준 상대 경로)로 가리킨다.
  `${CLAUDE_PLUGIN_ROOT}` 는 스킬을 불러올 때 본문과 `allowed-tools` 의 Bash 규칙 안에서만 실제 경로로 바뀐다.
  셸 환경변수가 아니므로 명령은 항상 `node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" …` 처럼 중괄호 형태로 쓴다.
- `allowed-tools` 는 YAML 리스트로 쓴다. 파일 쓰기 권한은 `Edit(./.design/**)` 하나로 준다(`Write(…)` 경로 규칙은
  무시된다). Bash 규칙은 명령 문자열 전체와 맞춰 보므로 따옴표 있는 형태와 없는 형태를 둘 다 넣는다.
  사용자 코드 수정 권한은 일부러 주지 않는다. 권한 프롬프트가 두 번째 승인 게이트다.
- **수치를 기억으로 만들지 않는다.** 브랜드 수치는 `ref` 로 실측한 카드에서만 가져온다. 스타일 카탈로그는 범위값만 쓴다.
- 이유를 설명한다. 대문자 MUST/NEVER 를 늘어놓지 않는다.

## 엔진 (plugins/design-director/scripts/)

- 런타임 의존성 0개, Node ≥ 20, ESM `.mjs`, 표준 라이브러리만. 테스트는 `node:test`.
- `dd.mjs` 는 stdout 에 JSON 객체 하나만 쓰고, 진행 로그는 stderr 로 보낸다.
- `inpage/*.js` 는 import 없는 함수 식 파일 하나. `lib/analyze/*` 는 `node:*`·`process`·`Buffer` 를 쓰지 않는다.
- 코드 주석은 한국어로 짧게. 식별자는 영어.

## 저장소에 넣지 않는 것

- 타사 사이트 스크린샷·카피·로고·일러스트·폰트 파일. 브랜드 카드는 텍스트 근사치만.
- `.design/`(플러그인을 써 볼 때 생기는 산출물), `evals/.runs/`, `tests/.tmp/`.

## 개발 루프

```bash
npm test                                                     # 단위 + 통합 (브라우저 없으면 통합은 skip)
claude plugin validate .                                     # 마켓플레이스 매니페스트
claude plugin validate plugins/design-director               # 플러그인 매니페스트·스킬
claude --plugin-dir plugins/design-director                  # 이번 세션에만 로드해서 써 보기
```

버전을 올릴 때는 `plugins/design-director/.claude-plugin/plugin.json` 과 `.claude-plugin/marketplace.json` 의
버전을 **같이** 올리고 `CHANGELOG.md` 에 적는다. 릴리스 태그는 `claude plugin tag plugins/design-director`.

커밋 메시지는 한국어로 무엇을 왜 바꿨는지 한 줄(~한다). 릴리스 커밋은 끝에 `(0.1.0)` 처럼 버전을 붙인다.
