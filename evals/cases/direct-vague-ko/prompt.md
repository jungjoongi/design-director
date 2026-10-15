---
name: direct-vague-ko
description: AI 티 나는 랜딩에 "이쁘게" 같은 느낌어만 주면 direct 가 떠야 한다. 스캐폴드 ai-slop-landing-ko.
tags: [trigger, direct, scaffold]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 5
timeout_seconds: 240
allowed_tools: [Read, Glob, Grep, Skill]
---

이 랜딩 좀 이쁘게 해줘. 뭔가 AI가 만든 티가 나
