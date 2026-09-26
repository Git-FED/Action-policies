#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: $0 [site-directory]"
  echo "List HTML redirect stubs and remind maintainers to update _redirects."
  exit 0
fi

site="${1:-site}"
find "$site/redirects" -type f -name index.html -print | sort

