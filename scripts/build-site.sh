#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: $0 [repository-root]"
  echo "Copy the static site into a clean dist directory and verify routes."
  exit 0
fi

root="${1:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$root"
rm -rf dist
mkdir -p dist
cp -a site/. dist/

required=(index.html 404.html robots.txt sitemap.xml _headers _redirects)
for file in "${required[@]}"; do
  [[ -f "dist/$file" ]] || { echo "Missing required site file: $file" >&2; exit 1; }
done

route_count="$(find dist -type f -name index.html | wc -l | tr -d ' ')"
echo "Built dist/ with $route_count HTML route files."

