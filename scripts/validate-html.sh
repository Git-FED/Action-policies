#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: $0 [site-directory]"
  echo "Validate basic HTML structure and local links without external dependencies."
  exit 0
fi

site="${1:-site}"
errors=0
while IFS= read -r -d '' file; do
  grep -qi '<!doctype html>' "$file" || { echo "Missing doctype: $file"; errors=$((errors+1)); }
  grep -qi '<title>' "$file" || { echo "Missing title: $file"; errors=$((errors+1)); }
  grep -qi '<h1[ >]' "$file" || { echo "Missing h1: $file"; errors=$((errors+1)); }
  grep -qi 'site-footer' "$file" || { echo "Missing footer: $file"; errors=$((errors+1)); }
done < <(find "$site" -type f -name '*.html' -print0 | sort -z)

if (( errors > 0 )); then exit 1; fi
echo "Validated $(find "$site" -type f -name '*.html' | wc -l | tr -d ' ') HTML files."

