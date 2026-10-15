---
name: direct-pass-through
description: 값이 정해진 단일 수정은 질문·브리프 없이 바로 처리해야 한다(플러그인이 길을 막지 않는지). 스캐폴드 bland-landing-ko.
tags: [behavior, direct, scaffold, needs-tools]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
expected_outcome: styles.css 의 버튼 색이 #2563EB 로 바뀌고, .design/ 파일은 생기지 않으며, 답은 바로 적용했다는 짧은 보고다.
---

버튼 색을 #2563EB 로 바꿔줘
