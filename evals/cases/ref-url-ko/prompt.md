---
name: ref-url-ko
description: 한국어로 URL 을 주며 "왜 고급져 보이는지 수치로" 물으면 ref 가 떠야 한다.
tags: [trigger, ref]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 4
timeout_seconds: 240
allowed_tools: [Read, Glob, Grep, Skill]
---

https://linear.app 디자인이 왜 고급져 보이는지 실제 수치로 뜯어봐줘
