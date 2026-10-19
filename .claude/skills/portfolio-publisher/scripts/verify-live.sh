#!/bin/bash
# Usage: verify-live.sh <page-path> <text-that-should-appear> [text-that-should-be-gone]
#
# After `git push`, waits for Vercel's GitHub status on HEAD to report
# success (the `vercel ls` list lags, do not rely on it), then polls the live
# page with a cache-busting query until the expected text shows up (and the
# removed text is gone). Prints a one-line result.

set -u
cd "$(git rev-parse --show-toplevel)"
path="$1"; want="$2"; gone="${3:-}"
sha=$(git rev-parse HEAD)
repo=$(git remote get-url origin | sed -E 's#.*github.com[:/]##; s#\.git$##')

for i in $(seq 1 45); do
  st=$(gh api "repos/$repo/commits/$sha/status" --jq '.state' 2>/dev/null)
  [ "$st" = "success" ] && break
  [ "$st" = "failure" ] && { echo "Vercel build FAILED for $sha"; exit 1; }
  sleep 10
done
echo "vercel status: ${st:-unknown}"

for i in $(seq 1 30); do
  html=$(curl -s "https://madisondrennen.com${path}?v=$RANDOM$i")
  has=$(printf '%s' "$html" | grep -cF "$want")
  left=0; [ -n "$gone" ] && left=$(printf '%s' "$html" | grep -cF "$gone")
  if [ "$has" -gt 0 ] && [ "$left" -eq 0 ]; then
    echo "LIVE: \"$want\" is on $path${gone:+, \"$gone\" is gone}"
    exit 0
  fi
  sleep 8
done
echo "NOT CONFIRMED: \"$want\" present=$has${gone:+, \"$gone\" still present=$left} on $path"
exit 1
