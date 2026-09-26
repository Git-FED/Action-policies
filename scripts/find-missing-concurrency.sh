#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: $0 [repository-root]"
  echo "Find pull-request workflows without cancellation concurrency."
  exit 0
fi

root="${1:-.}"
workflow_dir="$root/.github/workflows"
violations=0
[[ -d "$workflow_dir" ]] || { echo "No workflow directory: $workflow_dir"; exit 0; }

while IFS= read -r -d '' file; do
  if grep -qE 'pull_request' "$file" && ! grep -qE 'cancel-in-progress:[[:space:]]*true' "$file"; then
    echo "Concurrency review required: $file"
    violations=$((violations + 1))
  fi
done < <(find "$workflow_dir" -type f \( -name '*.yml' -o -name '*.yaml' \) -print0 | sort -z)

if (( violations > 0 )); then
  echo "$violations workflow(s) need concurrency review."
  exit 1
fi
echo "All pull-request workflows have cancellation concurrency."

