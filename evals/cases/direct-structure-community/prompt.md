---
name: direct-structure-community
description: 커뮤니티 게시판 화면 구조를 잡아 달라면 direct 가 떠야 한다. 스캐폴드 board-ko(카드 피드로 만든 게시판).
tags: [trigger, direct, scaffold]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 5
timeout_seconds: 240
allowed_tools: [Read, Glob, Grep, Skill]
---

커뮤니티 게시판 목록이랑 글 상세 구조부터 잡아줘. 클리앙 같은 한국 커뮤니티 느낌으로
