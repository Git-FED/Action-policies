#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: $0 [site-directory] [base-url]"
  exit 0
fi

site="${1:-site}"
base="${2:-https://fedpromptly.com}"
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  find "$site" -type f -name index.html | sort | while read -r file; do
    route="${file#"$site"}"
    route="${route%index.html}"
    echo "  <url><loc>${base}${route}</loc></url>"
  done
  echo '</urlset>'
} > "$site/sitemap.xml"

