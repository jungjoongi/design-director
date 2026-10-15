# design-director

디자이너·기획자 없이 만드는 사람을 위한 디자인 디렉터. 레퍼런스를 측정 가능한 디자인 언어로 분석하고(`ref`),
그걸로 화면을 기획·브리프·적용·검증한다(`direct`).

```
/plugin install design-director --marketplace jungjoongi/design-director
```

| 스킬 | 언제 |
|---|---|
| `/design-director:ref` | "이 사이트 분석해줘", "이 느낌 뭐라고 불러?", "토스 디자인 특징" |
| `/design-director:direct` | "좀 이쁘게 해줘", "AI 티 나", "토스 느낌으로 바꿔줘", "랜딩 구성부터 잡아줘" |

- 엔진: `scripts/dd.mjs` (Node 20+, 의존성 없음, Chromium 계열 브라우저로 캡처)
- 산출물: 프로젝트의 `.design/` (프로필, 브리프, 검증 스크린샷. 타사 스크린샷은 gitignore)
- 자세한 설명: https://github.com/jungjoongi/design-director
