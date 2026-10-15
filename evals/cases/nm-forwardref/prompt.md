---
name: nm-forwardref
description: React 의 ref(forwardRef) 질문이다. 이름이 같은 ref 스킬이 뜨면 오발이다.
tags: [near-miss, ref]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 4
timeout_seconds: 240
allowed_tools: [Read, Glob, Grep, Skill]
---

forwardRef로 감싼 Input에 ref가 계속 null이야. 왜 그래?
