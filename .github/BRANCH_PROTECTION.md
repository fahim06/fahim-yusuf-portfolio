# 🛡️ Main Branch Protection & Ruleset Setup

To enforce quality, security, and prevent accidental direct commits to `main`, configure GitHub Branch Protection Rules or Repository Rulesets for the `main` branch.

---

## Option 1: GitHub Repository Rulesets (Recommended)

1. Go to your repository on GitHub: `https://github.com/fahim06/fahim-yusuf-portfolio`
2. Navigate to **Settings** > **Rules** > **Rulesets** (in the left sidebar).
3. Click **New ruleset** > **New branch ruleset**.
4. Configure the following ruleset:
   - **Ruleset Name:** `Main Branch Protection`
   - **Enforcement status:** `Active`
   - **Target branches:** Click **Add target** > **Include default branch** (or select `main`).

### Rules to Enable

- ✅ **Restrict creations:** Prevents creating branches matching this rule without permission.
- ✅ **Restrict updates:** Prevents pushing directly to `main` unless through a Pull Request.
- ✅ **Restrict deletions:** Prevents deleting `main`.
- ✅ **Block force pushes:** Prevents `git push --force` rewriting history.
- ✅ **Require linear history:** Enforces clean git history (rebase / squash merges).
- ✅ **Require a pull request before merging:**
  - Required approvals: `1` (or `0` if you are a solo developer working via PRs)
  - Dismiss stale pull request approvals when new commits are pushed: `Enabled`
  - Require review from Code Owners: `Optional`
- ✅ **Require status checks to pass before merging:**
  - Search and check the following status checks:
    - `Code Quality & Linting`
    - `Build & Bundle Validation (Node 20)`
    - `SEO & Static Asset Validation`
    - `CodeQL Static Security Analysis`
    - `Secret & Credential Leak Detection`
  - Require branches to be up to date before merging: `Enabled`
- ✅ **Do not allow bypassing the above settings:** Includes repository administrators in the rules.

---

## Option 2: Classic Branch Protection Rule

If you prefer classic Branch Protection:

1. Go to **Settings** > **Branches** > **Add classic branch protection rule**.
2. **Branch name pattern:** `main`
3. Check the following:
   - [x] **Require a pull request before merging**
   - [x] **Require status checks to pass before merging** (Select `lint`, `build`, `codeql`, `gitleaks`)
   - [x] **Require branches to be up to date before merging**
   - [x] **Require linear history**
   - [x] **Do not allow bypassing the above settings**

---

## 🔑 GitHub Repository Secrets Configuration

To enable automated production deployments to `https://fahimyusuf.com.bd/` and secret scanning:

Go to **Settings** > **Secrets and variables** > **Actions** > **New repository secret**:

| Secret Name | Purpose |
| --- | --- |
| `VERCEL_TOKEN` | Vercel Personal Access Token (from `vercel.com/account/tokens`) |
| `VERCEL_ORG_ID` | Vercel Team/User ID (found in `.vercel/project.json` or project settings) |
| `VERCEL_PROJECT_ID` | Vercel Project ID (found in Project Settings > General) |
| `EMAIL_USER` | Gmail address for contact form SMTP |
| `EMAIL_PASS` | 16-character Google App Password |
| `EMAIL_TO` | Recipient email address for inquiries |
