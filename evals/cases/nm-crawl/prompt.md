---
name: nm-crawl
description: URL 이 있지만 디자인이 아니라 데이터 수집 요청이다. ref 가 뜨면 오발이다.
tags: [near-miss, ref]
plugins: ["../../../plugins/design-director"]
runs: 2
max_turns: 4
timeout_seconds: 240
allowed_tools: [Read, Glob, Grep, Skill]
---

https://example.com 상품 목록 크롤링해서 가격 CSV로 뽑아줘
