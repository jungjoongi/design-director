---
name: direct-brief-draft
description: 질문할 거리를 모두 미리 답한 풀 모드 요청에서 브리프를 draft 로 쓰고, 코드는 건드리지 않은 채 승인을 묻는지 본다. 스캐폴드 bland-landing-ko.
tags: [behavior, direct, scaffold, needs-tools]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 30
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
expected_outcome: .design/briefs/home.md 가 status draft 로 생기고, index.html·styles.css 는 그대로이며, 마지막 답이 브리프 요약과 적용 승인 질문이다.
---

index.html 을 토스 느낌(kr-fintech-simple)으로 바꾸고 싶어. 목표는 무료 체험 가입, 주 사용자는 5–20명 팀 리더, 히어로에 쓸 제품 화면은 아직 없어. 토스 사이트를 직접 재지는 말고 카탈로그 값으로 충분해. dev 서버도 안 띄워도 돼. 일단 브리프까지만 써줘.
