#!/usr/bin/env python3
"""
Publish the trending immigration guides straight to GitHub via the REST API.

Stdlib only — no pip install, works on Windows / macOS / Linux.

    python scripts/publish_guides.py            # publish
    python scripts/publish_guides.py --dry-run  # show what would happen

The Contents API is a *create-or-update* endpoint: updating a file that already
exists requires that file's current blob SHA. This script GETs the SHA first and
passes it, which is the difference between "it worked" and a 422 on every rerun.
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

# --------------------------------------------------------------------------
# Configuration — override with environment variables, never hard-code a token.
# --------------------------------------------------------------------------
REPO_OWNER = os.environ.get("REPO_OWNER", "YASSINE34501")
REPO_NAME = os.environ.get("REPO_NAME", "Travel-Bok")
BRANCH = os.environ.get("BRANCH", "master")

# Path INSIDE the repository. Trailing slash optional — it is normalised below.
#
# VERIFIED 2026-08-22 against YASSINE34501/Travel-Bok: the repo root IS the
# travlbok app, so the correct path is "src/data/guides". A "travlbok/" prefix
# would create a nested travlbok/travlbok/ directory that no page ever reads.
TARGET_DIR = os.environ.get("TARGET_DIR", "src/data/guides")

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")

API_ROOT = "https://api.github.com"
LOCAL_DIR = Path(__file__).resolve().parent.parent / "src" / "data" / "guides"

# filename -> country label used in the commit message
FILES = {
    "spain.md": "Spain",
    "germany.md": "Germany",
    "italy.md": "Italy",
    "france.md": "France",
}


def request(method: str, url: str, payload: dict | None = None) -> tuple[int, dict]:
    """One authenticated GitHub API call. Returns (status_code, parsed_body)."""
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(url=url, data=data, method=method)
    req.add_header("Authorization", f"Bearer {GITHUB_TOKEN}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    req.add_header("User-Agent", "travlbok-guide-publisher")
    if data is not None:
        req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            body = resp.read().decode("utf-8")
            return resp.status, (json.loads(body) if body else {})
    except urllib.error.HTTPError as err:
        body = err.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(body)
        except json.JSONDecodeError:
            parsed = {"message": body[:500]}
        return err.code, parsed
    except urllib.error.URLError as err:
        return 0, {"message": f"network error: {err.reason}"}


def existing_sha(repo_path: str) -> str | None:
    """Current blob SHA of the file on BRANCH, or None if it does not exist yet."""
    url = f"{API_ROOT}/repos/{REPO_OWNER}/{REPO_NAME}/contents/{repo_path}?ref={BRANCH}"
    status, body = request("GET", url)
    if status == 200 and isinstance(body, dict):
        return body.get("sha")
    if status == 404:
        return None
    # 403/401 here means the token cannot read the repo — fail loudly rather
    # than treating it as "new file" and then failing confusingly on the PUT.
    raise SystemExit(f"  ✗ cannot read {repo_path}: HTTP {status} — {body.get('message')}")


def preflight() -> None:
    if not GITHUB_TOKEN:
        raise SystemExit(
            "GITHUB_TOKEN is not set.\n"
            "  PowerShell : $env:GITHUB_TOKEN = 'ghp_xxx'\n"
            "  bash/zsh   : export GITHUB_TOKEN=ghp_xxx\n"
            "Needs a fine-grained PAT with Contents: Read and write on this repo."
        )
    if REPO_OWNER == "YOUR_GITHUB_USERNAME":
        raise SystemExit("Set REPO_OWNER (env var or edit the constant at the top).")

    status, body = request("GET", f"{API_ROOT}/repos/{REPO_OWNER}/{REPO_NAME}")
    if status != 200:
        raise SystemExit(
            f"Cannot reach {REPO_OWNER}/{REPO_NAME}: HTTP {status} — {body.get('message')}"
        )
    print(f"✓ repo {REPO_OWNER}/{REPO_NAME} reachable (default branch: {body.get('default_branch')})")

    status, body = request(
        "GET", f"{API_ROOT}/repos/{REPO_OWNER}/{REPO_NAME}/branches/{BRANCH}"
    )
    if status != 200:
        raise SystemExit(
            f"Branch '{BRANCH}' not found — HTTP {status}. "
            f"Default branch is '{body.get('default_branch', '?')}'; set BRANCH accordingly."
        )
    print(f"✓ branch '{BRANCH}' exists")


def publish(filename: str, country: str, dry_run: bool) -> bool:
    local = LOCAL_DIR / filename
    if not local.is_file():
        print(f"  ✗ {filename}: not found at {local}")
        return False

    raw = local.read_bytes()
    encoded = base64.b64encode(raw).decode("ascii")  # single line, no wrapping
    repo_path = f"{TARGET_DIR.strip('/')}/{filename}"
    message = f"docs(guides): publish trending {country} legal immigration guide"

    if dry_run:
        print(f"  → would PUT {repo_path} ({len(raw):,} bytes) :: {message}")
        return True

    sha = existing_sha(repo_path)
    payload = {
        "message": message,
        "content": encoded,
        "branch": BRANCH,
    }
    if sha:
        payload["sha"] = sha  # required, otherwise GitHub returns 422

    url = f"{API_ROOT}/repos/{REPO_OWNER}/{REPO_NAME}/contents/{repo_path}"
    status, body = request("PUT", url, payload)

    if status in (200, 201):
        verb = "updated" if sha else "created"
        commit = (body.get("commit") or {}).get("sha", "")[:7]
        print(f"  ✓ {verb:7s} {repo_path}  [{commit}]")
        return True

    print(f"  ✗ {repo_path}: HTTP {status} — {body.get('message')}")
    for err in body.get("errors", []):
        print(f"      {err}")
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish TRAVLBOK guides to GitHub.")
    parser.add_argument("--dry-run", action="store_true", help="print actions, change nothing")
    args = parser.parse_args()

    print(f"TRAVLBOK guide publisher → {REPO_OWNER}/{REPO_NAME}@{BRANCH}:{TARGET_DIR.strip('/')}/")
    if not args.dry_run:
        preflight()

    ok = 0
    for filename, country in FILES.items():
        if publish(filename, country, args.dry_run):
            ok += 1

    total = len(FILES)
    print(f"\n{ok}/{total} file(s) published.")
    return 0 if ok == total else 1


if __name__ == "__main__":
    sys.exit(main())
