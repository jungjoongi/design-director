# Changelog

이 프로젝트는 [Semantic Versioning](https://semver.org/lang/ko/) 을 따른다.
버전은 `plugins/design-director/.claude-plugin/plugin.json` 과 `.claude-plugin/marketplace.json` 에 함께 적는다.

## 0.1.0 — 2026-10-15

첫 버전.

- `ref` 스킬: 웹사이트 URL·스크린샷·스타일/브랜드 이름을 Reference Profile 로 분석한다.
- `direct` 스킬: 모호한 요청과 레퍼런스를 기획·구조·브리프로 바꾸고, 승인 후 코드에 적용하고 스크린샷으로 검증한다.
- `dd.mjs` 엔진: 의존성 없이 Chromium 계열 브라우저로 캡처하고 디자인 토큰과 페이지 구조를 측정한다.
- 스타일 카탈로그 12종 + 트리트먼트 5종, AI 기본값 패턴 48개, 한글 타이포그래피 가이드, 화면 유형 5종의 구조 패턴.
- 번들 브랜드 카드 9개(토스, 당근, 29CM, 무신사, Apple, Linear, Stripe, Vercel, Notion). 2026-10-15 실측, 메인테이너 스팟체크.
- 평가: `claude plugin eval` 케이스 15개(발동 7, 오발 방지 4, 동작 4)와 테스트 앱 3종.
