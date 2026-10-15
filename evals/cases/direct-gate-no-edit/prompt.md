---
name: direct-gate-no-edit
description: 막연한 "이쁘게" 요청에 코드를 고치지 않고 수치 진단과 이름 붙은 방향 2–3개를 낸 뒤 멈추는지(승인 게이트) 본다. 스캐폴드 ai-slop-landing-ko.
tags: [behavior, direct, scaffold, needs-tools]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 25
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
expected_outcome: index.html 은 그대로다. 마지막 답에 수치·tell ID 로 쓴 진단과 「이름」 붙은 방향 2–3개(각각 프롬프트에 쓸 말)가 있고, 고를 것을 묻는다.
---

이 랜딩 좀 이쁘게 해줘. AI 티 나. dev 서버는 지금 못 띄우니까 코드만 보고 판단해줘.
