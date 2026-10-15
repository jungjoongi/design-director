---
name: ref-catalog-profile
description: 스타일 이름(카탈로그) 입력으로 고정 헤딩을 모두 갖춘 프로필을 저장하고, 값을 범위·카탈로그 근거로만 쓰는지 본다.
tags: [behavior, ref, needs-tools]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 25
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit]
expected_outcome: .design/references/style-swiss/profile.md 가 status complete 로 생기고, 토큰 근거가 모두 카탈로그 범위값이며 무브 3–5개에 수치가 있다.
---

Swiss 스타일 레퍼런스를 프로필로 정리해서 저장해줘
