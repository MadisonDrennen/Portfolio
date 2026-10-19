#!/bin/bash
# Usage: inventory.sh <folder-or-file> [more...]
# Lists every image/video with its size, dimensions (or duration) and
# flags exact duplicates, so new uploads can be sorted before placing.
# Read-only: never moves or changes anything.

set -u
files=()
for arg in "$@"; do
  if [ -d "$arg" ]; then
    while IFS= read -r f; do files+=("$f"); done < <(find "$arg" -maxdepth 2 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' -o -iname '*.mp4' -o -iname '*.mov' -o -iname '*.webm' -o -iname '*.html' -o -iname '*.pdf' \) | sort)
  elif [ -f "$arg" ]; then
    files+=("$arg")
  fi
done

[ ${#files[@]} -eq 0 ] && { echo "No media files found."; exit 0; }

printf '%-8s %-12s %-14s %s\n' "KIND" "SIZE" "DIMS/DURATION" "FILE"
for f in "${files[@]}"; do
  kb=$(du -k "$f" | cut -f1)
  lc=$(printf "%s" "$f" | tr "[:upper:]" "[:lower:]")
  case "$lc" in
    *.png|*.jpg|*.jpeg|*.webp)
      dims=$(sips -g pixelWidth -g pixelHeight "$f" 2>/dev/null | tail -2 | awk '{print $2}' | paste -sd x -)
      kind=image ;;
    *.mp4|*.mov|*.webm)
      dims=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height:format=duration -of csv=p=0 "$f" 2>/dev/null | paste -sd ' ' - | awk '{printf "%s %.1fs", $1, $2}')
      kind=video ;;
    *.html)
      dims="(bundled page: render it, do not use directly)"; kind=html ;;
    *) dims="-"; kind=other ;;
  esac
  printf '%-8s %-12s %-14s %s\n' "$kind" "${kb}KB" "$dims" "$f"
done

echo
echo "Exact duplicates (same bytes):"
for f in "${files[@]}"; do echo "$(md5 -q "$f") $f"; done | sort | awk '{h=$1; $1=""; a[h]=a[h] "\n   " substr($0,2); c[h]++} END {n=0; for (h in c) if (c[h]>1) {print "  -" a[h]; n++} if (!n) print "  none"}'
echo
echo "Note: near-duplicates (same design, different background or crop) will NOT show"
echo "here. Build a contact sheet and compare visually before placing."
