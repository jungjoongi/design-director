#!/usr/bin/env bash
# 픽스처 앱 bland-landing-ko 를 이번 실행의 빈 작업 디렉터리(cwd)에 복사한다.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$HERE/../../fixtures/apps/bland-landing-ko"
[ -d "$SRC" ] || { echo "fixture not found: $SRC" >&2; exit 1; }
cp -R "$SRC/." .
