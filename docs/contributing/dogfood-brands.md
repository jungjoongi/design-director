# 브랜드 카드 만들기 (메인테이너 절차)

`references/brands/<slug>.md` 는 플러그인에 같이 들어가는 브랜드 카드다. "토스 느낌으로" 같은 요청이 브라우저 없이도
바로 동작하게 해 주고, `ref` 의 회귀 기준선 역할도 한다. 카드의 수치는 **반드시 실제 캡처에서** 가져온다.
기억이나 블로그 글에서 옮겨 적은 값은 넣지 않는다.

## 카드 형식

카드는 `references/profile-schema.md` 를 그대로 따르는 profile.md 다. 다른 점은 이것뿐이다.

- frontmatter 에 `bundled: true`, `verified: <YYYY-MM-DD> maintainer spot-check` 를 붙인다.
- 150줄 안팎으로 줄인다. 토큰 표는 핵심 15행 정도만 남긴다.
- 스크린샷·사이트 카피·로고는 넣지 않는다. 섹션 제목도 인용하지 않고 섹션 id 와 레이아웃 설명만 쓴다.
- "흔한 오해"(예: "토스 ≠ 파랑 + 둥근 카드")를 8장 Do / Don't 안에 쓴다.

## 절차

1. 빈 작업 폴더에서 이 저장소의 플러그인을 로드한다.
   ```bash
   mkdir -p /tmp/dd-dogfood && cd /tmp/dd-dogfood
   claude --plugin-dir ~/git/design/plugins/design-director
   ```
2. `/design-director:ref <URL>` 로 홈을 분석한다. 필요하면 대표 내부 페이지(가격, 상품 상세 등)를 한 번 더 분석한다.
3. 결과를 검토한다.
   - 시그니처 무브가 실제 사이트에서 눈으로 확인되는가.
   - DevTools(또는 다른 브라우저의 getComputedStyle)로 1440×900, 라이트 모드에서 값 5개를 대조한다:
     본문 크기·행간, h1·h2 크기·굵기·자간, 강조색, 버튼 배경·radius, 배경색. 다르면 실측값으로 카드를 고치고 근거에 "스팟체크"를 적는다.
   - 사이트 카피가 10단어 넘게 인용되지 않았는가. 섹션 제목 원문은 지운다.
   - 폰트 라이선스와 대체 폰트가 맞는가(`references/korean-typography.md`).
4. profile.md 를 카드 형식으로 줄여 `plugins/design-director/references/brands/<slug>.md` 에 둔다.
5. `references/brands/_index.md` 의 해당 행을 `상태: 캡처 YYYY-MM`, `카드: <slug>.md` 로 고친다.
6. 원본 profile.md 와 tokens.json 을 `evals/dogfood/<slug>/<YYYY-MM-DD>/` 에 둔다. 다음 캡처와 비교하는 회귀 기준선이다.
   사이트 제목·섹션 제목·버튼 라벨은 "…" 로 지우고, 스크린샷·summary.md·raw/ 는 넣지 않는다(사이트 원문이 들어 있다).

## 갱신

- 카드가 6개월보다 오래되면 `ref` 가 사용자에게 다시 캡처하라고 권한다. 메인테이너도 릴리스마다 오래된 카드를 다시 캡처한다.
- 사이트가 개편되면 즉시 다시 캡처하고 카드를 고친다.
- 차단(exit 6) 등으로 캡처할 수 없는 사이트는 카드를 만들지 않는다. 인덱스에 URL 과 스타일 매핑만 `미검증` 으로 둔다.
