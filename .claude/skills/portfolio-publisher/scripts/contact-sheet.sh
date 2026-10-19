#!/bin/bash
# Usage: contact-sheet.sh <out.jpg> <file> [file...]
# Lays images (and the 3s frame of any video) side by side at a fixed
# height so a batch can be reviewed in one look. Max ~10 per sheet.

set -eu
out="$1"; shift
tmp=$(mktemp -d)
i=0
args=()
for f in "$@"; do
  lc=$(printf "%s" "$f" | tr "[:upper:]" "[:lower:]")
  case "$lc" in
    *.mp4|*.mov|*.webm) ffmpeg -loglevel error -y -ss 3 -i "$f" -frames:v 1 "$tmp/$i.png" ;;
    *) cp "$f" "$tmp/$i.${f##*.}" 2>/dev/null || true; sips -s format png "$f" --out "$tmp/$i.png" >/dev/null ;;
  esac
  args+=(-i "$tmp/$i.png")
  i=$((i + 1))
done
fc=""; st=""
for j in $(seq 0 $((i - 1))); do
  fc+="[$j]scale=-2:520,pad=iw+16:540:8:10:color=0x1a0714[v$j];"
  st+="[v$j]"
done
if [ "$i" -eq 1 ]; then
  ffmpeg -loglevel error -y "${args[@]}" -filter_complex "${fc%;}" -map "[v0]" "$out"
else
  ffmpeg -loglevel error -y "${args[@]}" -filter_complex "${fc}${st}hstack=inputs=$i" "$out"
fi
rm -rf "$tmp"
echo "$out"
