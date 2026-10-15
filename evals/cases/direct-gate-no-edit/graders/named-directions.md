---
type: regex
target: last_message
pattern: '[「『][^」』\n]{1,40}[」』][\s\S]*[「『][^」』\n]{1,40}[」』]'
match: contains
---
