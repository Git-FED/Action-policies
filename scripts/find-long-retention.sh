#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: $0 [repository-root]"
  echo "Find artifact uploads with retention-days greater than three or missing."
  exit 0
fi

root="${1:-.}"
workflow_dir="$root/.github/workflows"
violations=0
[[ -d "$workflow_dir" ]] || { echo "No workflow directory: $workflow_dir"; exit 0; }

while IFS= read -r -d '' file; do
  if grep -qE 'actions/upload-artifact@' "$file"; then
    if ! grep -qE 'retention-days:[[:space:]]*[1-3]([[:space:]]*#.*)?$' "$file"; then
      echo "Retention review required: $file"
      violations=$((violations + 1))
    fi
  fi
done < <(find "$workflow_dir" -type f \( -name '*.yml' -o -name '*.yaml' \) -print0 | sort -z)

if (( violations > 0 )); then
  echo "$violations workflow(s) need retention review."
  exit 1
fi
echo "No long or implicit artifact retention found."

