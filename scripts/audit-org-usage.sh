#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" || $# -lt 1 ]]; then
  echo "Usage: $0 <organization>"
  echo "Read-only audit of workflow files in up to 100 repositories."
  exit $([[ $# -lt 1 ]] && echo 2 || echo 0)
fi

org="$1"
command -v gh >/dev/null || { echo "GitHub CLI (gh) is required." >&2; exit 1; }

echo "Read-only Actions workflow audit for: $org"
echo "Exact billing values remain authoritative in GitHub&apos;s billing dashboard."

while IFS= read -r repo; do
  echo "== $repo =="
  mapfile -t paths < <(gh api "repos/$repo/contents/.github/workflows" --jq '.[].path' 2>/dev/null || true)
  for path in "${paths[@]}"; do
    content="$(gh api "repos/$repo/contents/$path" --jq '.content' 2>/dev/null | base64 -d 2>/dev/null || true)"
    [[ -n "$content" ]] || continue
    if grep -qE 'actions/upload-artifact@' <<<"$content" && ! grep -qE 'retention-days:[[:space:]]*[1-3]([[:space:]]*#.*)?$' <<<"$content"; then
      echo "  retention review: $path"
    fi
    if grep -qE 'pull_request' <<<"$content" && ! grep -qE 'cancel-in-progress:[[:space:]]*true' <<<"$content"; then
      echo "  concurrency review: $path"
    fi
  done
done < <(gh repo list "$org" --limit 100 --json nameWithOwner --jq '.[].nameWithOwner')

