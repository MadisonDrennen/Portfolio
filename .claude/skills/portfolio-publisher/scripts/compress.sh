#!/bin/bash
# Usage:
#   compress.sh image <src> <dest.jpg> [max-px=1800] [quality=80]
#   compress.sh video <src> <dest.mp4> [width=720]
#   compress.sh full  <src> <dest.jpg>            (tall full-page captures: 960px wide, q62)
# Web-ready output for /public. Videos: H.264, no audio, faststart.

set -eu
kind="$1"; src="$2"; dest="$3"
mkdir -p "$(dirname "$dest")"
case "$kind" in
  image)
    max="${4:-1800}"; q="${5:-80}"
    sips -s format jpeg -s formatOptions "$q" -Z "$max" "$src" --out "$dest" >/dev/null ;;
  full)
    sips -s format jpeg -s formatOptions 62 --resampleWidth 960 "$src" --out "$dest" >/dev/null ;;
  video)
    w="${4:-720}"
    ffmpeg -loglevel error -y -i "$src" -an -vf "scale=$w:-2" -c:v libx264 -preset slow -crf 25 \
      -pix_fmt yuv420p -movflags +faststart "$dest" ;;
  *) echo "kind must be image | full | video" >&2; exit 1 ;;
esac
echo "$(du -k "$dest" | cut -f1)KB  $dest"
