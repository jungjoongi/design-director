#!/usr/bin/env bash
# 픽스처 앱 ai-slop-landing-ko 를 이번 실행의 빈 작업 디렉터리(cwd)에 복사한다.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$HERE/../../fixtures/apps/ai-slop-landing-ko"
[ -d "$SRC" ] || { echo "fixture not found: $SRC" >&2; exit 1; }
cp -R "$SRC/." .
