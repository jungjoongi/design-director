---
name: nm-backend-board
description: 게시판이지만 백엔드(테이블·API) 설계 요청이다. direct 가 뜨면 오발이다.
tags: [near-miss, direct]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 4
timeout_seconds: 240
allowed_tools: [Read, Glob, Grep, Skill]
---

커뮤니티 게시판 백엔드 설계해줘. 대댓글, 추천 포함해서 테이블 구조랑 API
