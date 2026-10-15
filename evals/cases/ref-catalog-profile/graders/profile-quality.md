---
type: llm
focus: { source: file, path: ".design/references/style-swiss/profile.md" }
weight: 2
---

You are grading a "Reference Profile" Markdown file (mostly Korean) for the Swiss design style. It was built from a bundled style catalog, not by measuring a website, so every value should be a catalog range.

PASS only if ALL of these hold:
1. Token values are given as ranges or catalog values (for example "64–96px", "1.5–1.7"). The evidence column says 카탈로그 (catalog) or 파생 (derived — values computed from catalog ranges, such as a contrast ratio or a mobile spacing derived from the desktop range); both are correct. No token row is labelled 측정 (measured), and no specific brand or website is presented as the measured source. The fixed appendix heading "부록: 측정 메모 (Capture Notes)" is part of the schema and does not count as a measured value.
2. The section "4. 시그니처 무브" lists 3 to 5 moves, and every move includes at least one number (px, em, ratio, font weight, column count).
3. The numbered sections 1 through 11 are all present and filled in (본질, 스타일 분류, 무드 키워드, 시그니처 무브, 토큰 with 5.1–5.6, 컴포넌트, 페이지 구조, Do / Don't, 폰트 대체, 베끼지 말 것, 프롬프트). No section is left as a todo placeholder.
4. Each Don't cites a move number or a tell id (for example "무브 2" or "LA-4").

FAIL if any item is missing or contradicted.
