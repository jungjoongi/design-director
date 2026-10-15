# Changelog

이 프로젝트는 [Semantic Versioning](https://semver.org/lang/ko/) 을 따른다.
버전은 `plugins/design-director/.claude-plugin/plugin.json` 과 `.claude-plugin/marketplace.json` 에 함께 적는다.

## 0.1.1 — 2026-10-15

- 보안: 사이트가 정하는 폰트 이름을 정화하고 32자로 자른다. CSS 변수 값은 앞부분이 아니라 값 전체를 검사하고, 색은 hex 로만
  내보낸다(`rgb( 지시문 )` 같은 값이 색으로 통과하던 문제). 폰트·변수 이름을 `untrusted` 로 표시한다.
- 보안: 미디어 위 글자 예외를 48px 이상·절반 이상 겹침일 때만 적용한다(1px 투명 이미지로 숨은 글자 필터를 피하던 문제).
- 회귀 테스트: 폰트 이름·CSS 변수 값에 숨긴 지시문 탐침을 픽스처에 더한다.

## 0.1.0 — 2026-10-15

첫 버전.

- `ref` 스킬: 웹사이트 URL·스크린샷·스타일/브랜드 이름을 Reference Profile 로 분석한다.
- `direct` 스킬: 모호한 요청과 레퍼런스를 기획·구조·브리프로 바꾸고, 승인 후 코드에 적용하고 스크린샷으로 검증한다.
- `dd.mjs` 엔진: 의존성 없이 Chromium 계열 브라우저로 캡처하고 디자인 토큰과 페이지 구조를 측정한다.
- 스타일 카탈로그 12종 + 트리트먼트 5종, AI 기본값 패턴 48개, 한글 타이포그래피 가이드, 화면 유형 5종의 구조 패턴.
- 번들 브랜드 카드 9개(토스, 당근, 29CM, 무신사, Apple, Linear, Stripe, Vercel, Notion). 2026-10-15 실측, 메인테이너 스팟체크.
- 평가: `claude plugin eval` 케이스 15개(발동 7, 오발 방지 4, 동작 4)와 테스트 앱 3종.
