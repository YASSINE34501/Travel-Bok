#!/usr/bin/env bash
#
# Publish the trending immigration guides straight to GitHub via the REST API.
#
#   ./scripts/publish-guides.sh            # publish
#   ./scripts/publish-guides.sh --dry-run  # show what would happen
#
# Requires: curl, jq. (jq builds the JSON body — hand-rolled JSON breaks the
# moment a guide contains a quote, a newline or a non-ASCII character, and these
# guides are almost entirely non-ASCII.)
#
set -euo pipefail

# --------------------------------------------------------------------------
# Configuration — override with environment variables, never commit a token.
# --------------------------------------------------------------------------
REPO_OWNER="${REPO_OWNER:-YASSINE34501}"
REPO_NAME="${REPO_NAME:-Travel-Bok}"
BRANCH="${BRANCH:-master}"

# Path INSIDE the repository, no trailing slash.
#
# VERIFIED 2026-08-22 against YASSINE34501/Travel-Bok: the repo root IS the
# travlbok app, so the correct path is "src/data/guides". A "travlbok/" prefix
# would create a nested travlbok/travlbok/ path that no page ever reads.
TARGET_DIR="${TARGET_DIR:-src/data/guides}"

GITHUB_TOKEN="${GITHUB_TOKEN:-${GH_TOKEN:-}}"

API_ROOT="https://api.github.com"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
LOCAL_DIR="${SCRIPT_DIR}/../src/data/guides"

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

# filename:Country label for the commit message
FILES=(
  "spain.md:Spain"
  "germany.md:Germany"
  "italy.md:Italy"
  "france.md:France"
)

# --------------------------------------------------------------------------
# Preflight
# --------------------------------------------------------------------------
for tool in curl jq; do
  command -v "$tool" >/dev/null 2>&1 || { echo "Missing required tool: $tool" >&2; exit 1; }
done

if [[ -z "$GITHUB_TOKEN" && $DRY_RUN -eq 0 ]]; then
  cat >&2 <<'MSG'
GITHUB_TOKEN is not set.
  bash/zsh   : export GITHUB_TOKEN=ghp_xxx
  PowerShell : $env:GITHUB_TOKEN = 'ghp_xxx'
Needs a fine-grained PAT with Contents: Read and write on this repo.
MSG
  exit 1
fi

if [[ "$REPO_OWNER" == "YOUR_GITHUB_USERNAME" && $DRY_RUN -eq 0 ]]; then
  echo "Set REPO_OWNER (env var or edit the constant at the top)." >&2
  exit 1
fi

TARGET_DIR="${TARGET_DIR#/}"
TARGET_DIR="${TARGET_DIR%/}"

# api METHOD URL [JSON_BODY_FILE] -> prints "<body>\n<http_status>"
api() {
  local method="$1" url="$2" body_file="${3:-}"
  local args=(
    -sS -w '\n%{http_code}'
    -X "$method"
    -H "Authorization: Bearer ${GITHUB_TOKEN}"
    -H "Accept: application/vnd.github+json"
    -H "X-GitHub-Api-Version: 2022-11-28"
    -H "User-Agent: travlbok-guide-publisher"
  )
  if [[ -n "$body_file" ]]; then
    args+=(-H "Content-Type: application/json" --data-binary "@${body_file}")
  fi
  curl "${args[@]}" "$url"
}

echo "TRAVLBOK guide publisher → ${REPO_OWNER}/${REPO_NAME}@${BRANCH}:${TARGET_DIR}/"

if (( ! DRY_RUN )); then
  response="$(api GET "${API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}")"
  status="${response##*$'\n'}"
  body="${response%$'\n'*}"
  if [[ "$status" != "200" ]]; then
    echo "Cannot reach ${REPO_OWNER}/${REPO_NAME}: HTTP ${status} — $(jq -r '.message // "?"' <<<"$body")" >&2
    exit 1
  fi
  echo "✓ repo reachable (default branch: $(jq -r '.default_branch' <<<"$body"))"

  response="$(api GET "${API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}/branches/${BRANCH}")"
  status="${response##*$'\n'}"
  if [[ "$status" != "200" ]]; then
    echo "Branch '${BRANCH}' not found (HTTP ${status}). Set BRANCH to the real branch." >&2
    exit 1
  fi
  echo "✓ branch '${BRANCH}' exists"
fi

# --------------------------------------------------------------------------
# Publish loop
# --------------------------------------------------------------------------
tmp_body="$(mktemp)"
trap 'rm -f "$tmp_body"' EXIT

ok=0
total="${#FILES[@]}"

for entry in "${FILES[@]}"; do
  filename="${entry%%:*}"
  country="${entry##*:}"
  local_path="${LOCAL_DIR}/${filename}"
  repo_path="${TARGET_DIR}/${filename}"
  message="docs(guides): publish trending ${country} legal immigration guide"

  if [[ ! -f "$local_path" ]]; then
    echo "  ✗ ${filename}: not found at ${local_path}" >&2
    continue
  fi

  if (( DRY_RUN )); then
    size="$(wc -c < "$local_path" | tr -d ' ')"
    echo "  → would PUT ${repo_path} (${size} bytes) :: ${message}"
    ok=$(( ok + 1 ))
    continue
  fi

  # Base64 on ONE line. GNU base64 wraps at 76 columns and BSD/macOS base64 has
  # no -w flag, so normalise by stripping newlines instead of relying on -w0.
  content="$(base64 < "$local_path" | tr -d '\r\n')"

  # The Contents API is create-or-update: an existing file needs its blob SHA,
  # otherwise every rerun fails with 422.
  response="$(api GET "${API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repo_path}?ref=${BRANCH}")"
  status="${response##*$'\n'}"
  body="${response%$'\n'*}"

  sha=""
  case "$status" in
    200) sha="$(jq -r '.sha // empty' <<<"$body")" ;;
    404) sha="" ;;
    *)   echo "  ✗ cannot read ${repo_path}: HTTP ${status} — $(jq -r '.message // "?"' <<<"$body")" >&2
         continue ;;
  esac

  jq -n \
    --arg message "$message" \
    --arg content "$content" \
    --arg branch  "$BRANCH" \
    --arg sha     "$sha" \
    '{message: $message, content: $content, branch: $branch}
     + (if $sha == "" then {} else {sha: $sha} end)' > "$tmp_body"

  response="$(api PUT "${API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repo_path}" "$tmp_body")"
  status="${response##*$'\n'}"
  body="${response%$'\n'*}"

  if [[ "$status" == "200" || "$status" == "201" ]]; then
    verb=$([[ -n "$sha" ]] && echo "updated" || echo "created")
    commit="$(jq -r '.commit.sha // "" | .[0:7]' <<<"$body")"
    printf '  ✓ %-7s %s  [%s]\n' "$verb" "$repo_path" "$commit"
    ok=$(( ok + 1 ))
  else
    echo "  ✗ ${repo_path}: HTTP ${status} — $(jq -r '.message // "?"' <<<"$body")" >&2
    jq -r '.errors[]? | "      \(.)"' <<<"$body" >&2 || true
  fi
done

echo
echo "${ok}/${total} file(s) published."
[[ "$ok" -eq "$total" ]]
