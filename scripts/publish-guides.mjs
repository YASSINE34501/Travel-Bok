/**
 * Publish the trending immigration guides straight to GitHub via the REST API.
 *
 *   node scripts/publish-guides.mjs            # publish
 *   node scripts/publish-guides.mjs --dry-run  # show what would happen
 *
 * Zero dependencies — uses the global fetch built into Node 18+. This is the
 * variant to reach for on this machine: it needs nothing that npm has not
 * already installed for the app itself.
 *
 * The Contents API is a create-or-update endpoint: updating a file that already
 * exists requires that file's current blob SHA. This script GETs the SHA first,
 * which is the difference between "it worked" and a 422 on every rerun.
 */

import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

// ---------------------------------------------------------------------------
// Configuration — override with environment variables, never commit a token.
// ---------------------------------------------------------------------------
const REPO_OWNER = process.env.REPO_OWNER ?? "YASSINE34501";
const REPO_NAME = process.env.REPO_NAME ?? "Travel-Bok";
const BRANCH = process.env.BRANCH ?? "master";

/**
 * Path INSIDE the repository. Trailing slashes are normalised away.
 *
 * VERIFIED 2026-08-22 against YASSINE34501/Travel-Bok: the repo root IS the
 * travlbok app (package.json, src/, scripts/ sit at the root), so the correct
 * path is "src/data/guides". A "travlbok/" prefix would create a nested
 * travlbok/travlbok/ path that no page ever reads.
 */
const TARGET_DIR = (process.env.TARGET_DIR ?? "src/data/guides")
  .replace(/^\/+|\/+$/g, "");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? "";

const API_ROOT = "https://api.github.com";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DIR = path.join(HERE, "..", "src", "data", "guides");

/** filename -> country label used in the commit message */
const FILES = {
  "spain.md": "Spain",
  "germany.md": "Germany",
  "italy.md": "Italy",
  "france.md": "France",
};

const DRY_RUN = process.argv.includes("--dry-run");

/** One authenticated GitHub API call. Never throws on HTTP status. */
async function api(method, url, payload) {
  const init = {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "travlbok-guide-publisher",
    },
  };
  if (payload !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(payload);
  }

  let res;
  try {
    res = await fetch(url, init);
  } catch (err) {
    return { status: 0, body: { message: `network error: ${err.message}` } };
  }

  const text = await res.text();
  let body = {};
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text.slice(0, 500) };
    }
  }
  return { status: res.status, body };
}

/**
 * Abort the run. Deliberately NOT process.exit(): calling that while undici
 * still holds open sockets aborts the process with a libuv assertion on
 * Windows ("!(handle->flags & UV_HANDLE_CLOSING)") and exit code 127, which
 * looks like a crash rather than a failed publish. Throw, let main() report,
 * and set process.exitCode so Node drains its handles before leaving.
 */
class PublishError extends Error {}

function fail(message) {
  throw new PublishError(message);
}

async function preflight() {
  if (!GITHUB_TOKEN) {
    fail(
      "GITHUB_TOKEN is not set.\n" +
        "  PowerShell : $env:GITHUB_TOKEN = 'ghp_xxx'\n" +
        "  bash/zsh   : export GITHUB_TOKEN=ghp_xxx\n" +
        "Needs a fine-grained PAT with Contents: Read and write on this repo.",
    );
  }
  if (REPO_OWNER === "YOUR_GITHUB_USERNAME") {
    fail("Set REPO_OWNER (env var or edit the constant at the top).");
  }

  const repo = await api("GET", `${API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}`);
  if (repo.status !== 200) {
    fail(
      `Cannot reach ${REPO_OWNER}/${REPO_NAME}: HTTP ${repo.status} — ${repo.body.message}`,
    );
  }
  console.log(`✓ repo reachable (default branch: ${repo.body.default_branch})`);

  const branch = await api(
    "GET",
    `${API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}/branches/${encodeURIComponent(BRANCH)}`,
  );
  if (branch.status !== 200) {
    fail(
      `Branch '${BRANCH}' not found (HTTP ${branch.status}). ` +
        `Default branch is '${repo.body.default_branch}'; set BRANCH accordingly.`,
    );
  }
  console.log(`✓ branch '${BRANCH}' exists`);
}

/** Current blob SHA on BRANCH, or null when the file does not exist yet. */
async function existingSha(repoPath) {
  const url =
    `${API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}` +
    `?ref=${encodeURIComponent(BRANCH)}`;
  const { status, body } = await api("GET", url);
  if (status === 200) return body.sha ?? null;
  if (status === 404) return null;
  // 401/403 here means the token cannot read the repo. Fail loudly rather than
  // treating it as "new file" and then failing confusingly on the PUT.
  throw new Error(`cannot read ${repoPath}: HTTP ${status} — ${body.message}`);
}

async function publish(filename, country) {
  const localPath = path.join(LOCAL_DIR, filename);
  const repoPath = `${TARGET_DIR}/${filename}`;
  const message = `docs(guides): publish trending ${country} legal immigration guide`;

  try {
    await stat(localPath);
  } catch {
    console.error(`  ✗ ${filename}: not found at ${localPath}`);
    return false;
  }

  const raw = await readFile(localPath);

  if (DRY_RUN) {
    console.log(
      `  → would PUT ${repoPath} (${raw.length.toLocaleString("en-US")} bytes) :: ${message}`,
    );
    return true;
  }

  let sha;
  try {
    sha = await existingSha(repoPath);
  } catch (err) {
    console.error(`  ✗ ${err.message}`);
    return false;
  }

  const payload = {
    message,
    content: raw.toString("base64"), // single line, no wrapping
    branch: BRANCH,
  };
  if (sha) payload.sha = sha; // required, otherwise GitHub returns 422

  const { status, body } = await api(
    "PUT",
    `${API_ROOT}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}`,
    payload,
  );

  if (status === 200 || status === 201) {
    const verb = sha ? "updated" : "created";
    const commit = (body.commit?.sha ?? "").slice(0, 7);
    console.log(`  ✓ ${verb.padEnd(7)} ${repoPath}  [${commit}]`);
    return true;
  }

  console.error(`  ✗ ${repoPath}: HTTP ${status} — ${body.message}`);
  for (const err of body.errors ?? []) {
    console.error(`      ${JSON.stringify(err)}`);
  }
  return false;
}

async function main() {
  console.log(
    `TRAVLBOK guide publisher → ${REPO_OWNER}/${REPO_NAME}@${BRANCH}:${TARGET_DIR}/`,
  );
  if (!DRY_RUN) await preflight();

  let ok = 0;
  // Sequential on purpose: each commit builds on the previous tree, and firing
  // four parallel writes at the same branch invites 409 conflicts.
  for (const [filename, country] of Object.entries(FILES)) {
    if (await publish(filename, country)) ok += 1;
  }

  const total = Object.keys(FILES).length;
  console.log(`\n${ok}/${total} file(s) published.`);
  process.exitCode = ok === total ? 0 : 1;
}

try {
  await main();
} catch (err) {
  console.error(err instanceof PublishError ? err.message : err);
  process.exitCode = 1;
}
