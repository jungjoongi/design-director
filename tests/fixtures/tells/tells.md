# 테스트용 tells 카탈로그

본문은 사람이 읽는 설명이고, 스캐너는 아래 블록만 읽는다.

<!-- dd:tells:begin -->
```json
{
  "schema": "dd.tells/1",
  "tells": [
    {
      "id": "CO-1", "severity": "S1", "title": "보라→파랑 그라데이션", "threshold": 1,
      "files": ["tsx", "jsx", "html", "css"],
      "patterns": ["bg-gradient-to-[trbl]{1,2}[^\"'`]*from-(purple|violet|indigo|fuchsia)-[3-7]00"],
      "flags": "i"
    },
    {
      "id": "CO-2", "severity": "S2", "title": "테라코타 강조색", "threshold": 2,
      "files": ["css", "tsx"],
      "colors": ["#D97757"], "maxDeltaE": 0.03
    },
    {
      "id": "KR-1", "severity": "S1", "title": "keep-all 없음", "threshold": 1,
      "files": ["tsx", "css", "html"],
      "absent": ["keep-all", "break-keep"], "when": "[가-힣]"
    },
    {
      "id": "IC-1", "severity": "S1", "title": "이모지 아이콘", "threshold": 3,
      "files": ["tsx", "html"],
      "patterns": ["\\p{Extended_Pictographic}"],
      "flags": "gu"
    }
  ]
}
```
<!-- dd:tells:end -->
