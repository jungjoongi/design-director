# 검증 체크리스트

`direct` 7단계. 적용한 결과를 같은 뷰포트로 캡처해 레퍼런스(또는 before)와 나란히 놓고, 브리프가 약속한 것이
화면에 실제로 들어갔는지 확인한다. 판정마다 근거(수치·위치·타일)를 단다. "좋아 보인다"는 판정이 아니다.

## 1. 준비

- dev 서버가 떠 있는지 확인한다(브리프 `dev_url`). 안 떠 있으면 띄워도 되는지 묻고, 허락하면 프로젝트의 dev 스크립트를
  백그라운드로 실행한다. 거절하면 사용자가 띄운 주소를 받는다.
- 뷰포트: 레퍼런스가 있으면 그 `capture.json` 의 뷰포트를 `verify` 가 그대로 쓴다. 없으면 desktop 1440×900, mobile 390×844.
- before 가 있어야 비교가 된다. 1단계에서 찍어 둔 `.design/verify/<page>/before/` 가 없으면 적용 전에 찍는다.
  이미 코드를 바꿨다면 before 없이 진행하고 보고서에 "before 없음"이라고 적는다.
- before 는 한 번만 찍는다. 브리프가 `approved` 이후인데 before 를 `--force` 로 다시 찍으면 바뀐 화면이 before 가
  되어 비교가 무의미해진다. 반복(iteration)은 처음 before 를 계속 기준으로 쓴다.

```bash
# 적용 전 (1단계) — Bash timeout 180000
node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" capture "<localUrl>" --out ".design/verify/<page>/before" --force
# 적용 후 — .design/references/<slug>/capture.json 이 있을 때(URL 로 캡처한 프로필)
node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" verify "<localUrl>" --ref <slug> --page <page>
# 적용 후 — 그 밖(브랜드 카드·카탈로그·이미지 프로필, 방향만 정함): before 와 나란히
node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" verify "<localUrl>" --ref .design/verify/<page>/before --ref-label BEFORE --page <page>
```

이 문서의 `${CLAUDE_PLUGIN_ROOT}` 는 치환되지 않은 표기다. 명령은 SKILL.md 에 적힌 실제 경로를 따옴표째 쓴다.

`--ref <slug>` 는 그 폴더에 `capture.json` 이 있을 때만 쓴다. 브랜드 카드·카탈로그·이미지 프로필 폴더에는 profile.md 뿐이라
엔진이 기본 뷰포트로 결과만 찍고 `REF_IMAGES_MISSING` 경고를 낸다. 그때 의미 있는 비교는 before/after 다.

결과는 `.design/verify/<page>/<YYYYMMDD-HHMMSS>/` 에 생긴다: `side-by-side-desktop.jpg`, `side-by-side-mobile.jpg`,
`summary.md`, `desktop.png`, `mobile.png`, `capture.json`. 실패하면 exit code 별 다음 행동은
`${CLAUDE_PLUGIN_ROOT}/references/capture-guide.md` 를 따른다. 자주 나는 것: 5(dev 서버 꺼짐), 9(빌드 에러 오버레이 —
에러부터 고친다), 2 EXISTS(`--force` 정책은 같은 문서 1장 — 작업 폴더는 묻지 않고 덮어쓰되 승인 뒤 before 는 다시 찍지 않는다).

## 2. 읽는 순서

1. 결과 `summary.md` — 수치(토큰 일치·대비·넘침)는 여기서 읽는다. 스크린샷으로 수치를 짐작하지 않는다.
2. `side-by-side-desktop.jpg` → `side-by-side-mobile.jpg` 를 **따로** Read 한다(왼쪽 REFERENCE/BEFORE, 오른쪽 RESULT).
   이미지 하나에 한 화면씩 보는 게 큰 합성 이미지 하나보다 정확하다.
3. 첫 화면 아래가 궁금하면 결과 폴더의 `slices/desktop-NN.jpg` 중 필요한 장만 연다.

## 3. 시그니처 무브 판정

브리프 §4 의 무브마다 한 줄. 무브의 수치를 summary 값이나 화면 위치로 확인한다. 타일 열은 결과 폴더
`slices/desktop-NN.jpg` 의 번호다(desktop 1 = `slices/desktop-01.jpg`).

| 무브 | 판정 | 근거 | 타일 |
|---|---|---|---|
| 1 숫자를 주인공으로 키운다 (display 72px/700) | 반영 | summary display 72px/700, 히어로 왼쪽 | desktop 1 |
| 2 굵기 두 개로만 위계를 만든다 (400/700) | 부분 | 기능 제목에 600 이 남음 (features.tsx) | desktop 3 |
| 3 카드 대신 여백으로 묶는다 (안쪽 16 · 바깥 96) | 없음 | 기능 묶음에 border 가 남아 있음 | desktop 2 |

- 반영: 수치와 위치가 브리프대로. 부분: 일부 화면·컴포넌트에서만. 없음: 보이지 않거나 수치가 다르다.
- 모바일에서 깨지는 무브는 "부분"으로 적고 어디서 깨지는지 쓴다.

## 4. 브리프 토큰 일치

결과 `summary.md` 의 값과 브리프 §5 "변경" 열을 비교한다(v0.1 엔진은 diff 를 자동 계산하지 않는다).

| 판정 | 크기·간격·radius·행간 | 색 (OKLCH 성분 차) |
|---|---|---|
| OK | 차이 ≤ max(1px, 4%) | 같은 hex, 또는 L ≤ 0.02 · C ≤ 0.02 · H ≤ 4° |
| CLOSE | 차이 ≤ 12% | L ≤ 0.05 · C ≤ 0.04 · H ≤ 10° |
| OFF | 그 밖 | 그 밖 |

- 두 색 중 하나라도 C < 0.02(거의 무채색)면 H 비교는 생략한다. 무채색에 가까울수록 hue 값이 크게 흔들린다.
- clamp() 토큰은 desktop·mobile 값을 각각 비교한다.
- summary 에 없는 토큰(예: hover 색)은 코드에서 확인하고 "코드 기준"이라고 적는다.
- OFF 는 원인을 한 줄로: 덮어쓰는 유틸리티 클래스, 적용 안 된 파일, 캐시된 폰트 등.

## 5. AI 기본값 재스캔

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/dd.mjs" tells <바뀐 파일…> <전역 CSS> <레이아웃>
```

- 바뀐 파일에서 **S1 은 0** 이어야 한다. S2 는 before 보다 줄었는지 본다.
- 브리프가 이름으로 고른 요소(§8 Do 의 예외)는 세지 않는다.
- 코드로 못 잡는 tell(LA-1·LA-3·IC-2·IC-5 등)은 side-by-side 를 보며 `${CLAUDE_PLUGIN_ROOT}/references/ai-default-tells.md` 기준으로 확인한다.

## 6. 접근성 바닥

| 항목 | 기준 | 어디서 |
|---|---|---|
| 본문 대비 | ≥ 4.5:1 | summary 대비 결과 |
| 보조 텍스트(text-muted) 대비 | ≥ 4.5:1 | summary 대비 결과 |
| 큰 글자 대비 (24px 이상, 18.66px bold 이상) | ≥ 3:1 | summary |
| 컨트롤·포커스 링 대비 | ≥ 3:1 (WCAG 1.4.11) | 스크린샷 + 코드 |
| focus-visible | 모든 인터랙티브 요소에 보이는 링 | 코드(`focus-visible`), `outline: none` 대체 여부 |
| 터치 대상 | ≥ 24×24px (WCAG 2.2 AA 2.5.8), 권장 44px | summary 컴포넌트 샘플(버튼 높이) |
| reduced-motion | 이동 애니메이션이 있으면 대응 | summary 모션의 reduced-motion, tells MO-4 |

하나라도 실패하면 자동 보정 대상이다. 바닥을 넘었더라도 폼·모달·키보드 흐름이 많은 화면이면 사용자에게
`design:accessibility-review` 로 전체 감사를 권한다(이 체크는 바닥일 뿐이다).

## 7. 한국어·모바일

- 한국어 페이지: `${CLAUDE_PLUGIN_ROOT}/references/korean-typography.md` §7 의 10개 항목.
- 모바일 넘침: 결과 `summary.md` 의 `가로 넘침` 줄에서 mobile 값이 0 이어야 한다(줄이 없으면 `tokens.json` 에서
  `overflowX` 를 Grep 해 `health.overflowX` 를 본다). 0 이 아니면 같은 줄의 범인 힌트(localhost 에서만 수집)로 찾아 고친다.
- 모바일에서 히어로 제목 줄바꿈·버튼 폭·하단 고정 바가 콘텐츠를 가리는지 스크린샷으로 본다.

## 8. 재채점

`references/diagnosis-checklist.md` 의 같은 표로 after 를 채점한다. before 와 같은 근거(summary)로 매겨야 비교가 된다.

## 9. 보고 형식

```
검증 결과 — home (iteration 0)
| 항목 | before | after |
|---|---|---|
| 진단 점수 | 48/100 | 81/100 |
| AI 기본값 tell | S1 3 · S2 2 | S1 0 · S2 1 |
| 시그니처 무브 | — | 2/3 반영 (1 부분) |
| 브리프 토큰 일치 | — | 13/15 OK · 1 CLOSE · 1 OFF |
| 접근성 바닥 | 대비 실패 2 | 통과 |

남은 차이 3가지
1. 무브 3: 기능 묶음 border 가 남아 여백 위계가 약함 (features.tsx:42)
2. --text-h2 OFF: 브리프 40px, 결과 32px — md:text-3xl 이 덮어씀
3. 모바일 히어로 숫자가 clamp 하한(2.5rem = 40px)에서도 390px 폭을 넘어 두 줄로 꺾임 → 하한을 2.25rem 으로 낮출지 검토

다음: "이대로 좋아" / "더 과감하게(어떤 부분을)" / 구체 피드백
```

## 10. 반복과 중단

- **자동 보정** — 객관 항목만: 토큰 OFF, 바뀐 파일의 S1 tell, 접근성 바닥 실패, 모바일 넘침. 최대 2회.
  고칠 때마다 브리프 적용 로그에 한 줄 쓰고 `iteration` 을 올린다.
- **주관 피드백** — "더 과감하게", "좀 덜 차갑게"는 지금 상태에서 해당 레버를 한 단계 더 미는 것으로 해석한다
  (예: display 56→72px, 섹션 96→128px). 브리프 변경분(diff)을 보여주고 짧게 승인받은 뒤 적용한다.
- **중단** — 피드백 반복이 3회를 넘거나, 두 번 연속 점수·무브 판정이 나아지지 않으면(정체) 멈추고 선택지를 준다:
  지금 상태로 마무리 / 방향을 다시 고르기(2단계) / 이식용 프롬프트로 다른 도구에서 이어 가기.

## 11. 마무리

- 브리프 `status: verified`, 변경 이력에 마지막 판정을 한 줄.
- `.design/taste.md` 에 한 줄 추가(없으면 만든다). 거절한 방향과 이유를 남겨, 다음에 같은 방향을 다시 제안하지 않는다.

```
2026-10-14 home: B 선택 (A·C 거절 — "다크는 고객층과 안 맞음")
```
