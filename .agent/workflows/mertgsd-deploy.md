---
description: Deploy project to CF Pages, Vercel, or Netlify with post-deploy verification
---

# MertGSD Deploy — Build, Ship, Verify

Deploy the current project to a hosting platform. Auto-detects the platform from project config, builds, deploys, verifies the live URL, and updates STATE.md.

> **ANTI-HALLUCINATION PROTOCOL -- ACTIVE IN THIS WORKFLOW**
> Deployment is irreversible. Every step MUST be verified against real command output. Do NOT assume a deploy succeeded -- check the actual URL. Do NOT fabricate deploy URLs or build output. READ every command result.

## Arguments

The user may provide a platform and/or environment, e.g., `/mertgsd-deploy vercel`, `/mertgsd-deploy cf-pages`, `/mertgsd-deploy netlify --preview`

If no platform provided, auto-detect from project config (see Step 2).

## Multi-Model Safeguard: Deployment Integrity

**MANDATORY -- regardless of which AI model is running:**

```
DEPLOYMENT RULES:
1. Re-read STATE.md and ROADMAP.md before deploying -- know what phase you are shipping
2. ALWAYS build first and verify build output before deploying
3. NEVER assume deploy succeeded -- verify with actual HTTP request
4. READ every command's stdout/stderr -- do NOT skip error output
5. If deploy fails, do NOT retry blindly -- read the error and diagnose

WARNING: The most dangerous hallucination in deployment is "deploy succeeded"
when it didn't. A false positive here means broken production.
```

## Steps

### 1. Validate Project

**Actually read** (not recall) `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/`:** "No MertGSD project found. Run /mertgsd-new-project first."

Check git status -- ensure working tree is clean:
```bash
git status --porcelain
```

**If dirty working tree:** "You have uncommitted changes. Commit or stash them before deploying."

### 2. Detect Platform

Check for platform config files in order:

```bash
# Check all three
ls wrangler.toml wrangler.jsonc vercel.json netlify.toml 2>/dev/null
```

| File Found | Platform | Deploy Command |
|------------|----------|----------------|
| `wrangler.toml` or `wrangler.jsonc` | Cloudflare Pages | `npx wrangler pages deploy` |
| `vercel.json` | Vercel | `vercel --prod` |
| `netlify.toml` | Netlify | `netlify deploy --prod` |

**If multiple configs found:** Ask user which platform to deploy to.
**If no config found:** Ask user: "No deployment config detected. Which platform? (cf-pages / vercel / netlify)"
**If user specified platform in arguments:** Use that platform regardless of config files.

Display:
```
+--------------------------------------------------+
| MertGSD > DEPLOYING TO [PLATFORM]                    |
+--------------------------------------------------+

Project: [project name from ROADMAP.md]
Phase:   [current phase from STATE.md]
Branch:  [current git branch]
```

### 3. Build

Detect and run the build command:

```bash
# Check package.json for build script
cat package.json | grep -A1 '"build"'
```

Run the build:
```bash
npm run build
```

**After the build command completes, READ the output.**

**If build fails:**
- Display the ACTUAL error output (not a summary)
- "Build failed. Fix the build errors before deploying."
- Do NOT proceed to deployment

**If build succeeds:** Verify build output directory exists:

| Platform | Expected Output |
|----------|----------------|
| CF Pages | `dist/` or `build/` or as configured in wrangler.toml |
| Vercel | `.vercel/output/` or `dist/` or `.next/` |
| Netlify | `dist/` or `build/` or as configured in netlify.toml |

```bash
ls -la [output-dir]/
```

**If output directory is empty or missing:** "Build produced no output. Check your build configuration."

### 4. Deploy

Run the platform-specific deploy command:

**Cloudflare Pages:**
```bash
npx wrangler pages deploy [output-dir] --project-name [project-name]
```

**Vercel:**
```bash
vercel --prod --yes
```

**Netlify:**
```bash
netlify deploy --prod --dir=[output-dir]
```

**READ the full deploy output.** Extract the live URL from the output.

> **HALLUCINATION GATE -- After deploy command:**
> - Did you actually RUN the deploy command? (not just plan to)
> - Did you READ the full output? (not assume success)
> - Did the output contain a live URL? (not a fabricated one)
> - If the output shows ANY error, the deploy FAILED -- do not claim success

**If deploy fails:**
- Display the ACTUAL error output
- Common failures and fixes:
  | Error | Likely Cause | Suggestion |
  |-------|-------------|------------|
  | Authentication | Not logged in | Run `wrangler login` / `vercel login` / `netlify login` |
  | Project not found | First deploy | Create project first on the platform |
  | Rate limit | Too many deploys | Wait and retry |
- "Deploy failed. See error above. Fix the issue and run /mertgsd-deploy again."
- Do NOT proceed to verification

### 5. Post-Deploy Verification

Wait 10 seconds for deployment to propagate, then verify:

```bash
# Check HTTP status of main URL
curl -s -o /dev/null -w "%{http_code}" [LIVE_URL]
```

**Expected: 200**

Check key pages if known from ROADMAP.md:
```bash
# Check additional routes
curl -s -o /dev/null -w "%{http_code}" [LIVE_URL]/[route]
```

**If any check returns non-200:**
- Report which URLs failed and their status codes
- "Post-deploy check failed. The site may not be fully operational."
- Still record the deploy in STATE.md but mark verification as failed

**If all checks pass:**
```
Verification:
  [LIVE_URL]          -> 200 OK
  [LIVE_URL]/[route]  -> 200 OK
```

### 6. Update STATE.md

**Read and then update** `.planning/STATE.md`:

Add to Deployments section (create if not exists):

```markdown
### Deployments

| Date | Platform | URL | Branch | Commit | Status |
|------|----------|-----|--------|--------|--------|
| [date] | [platform] | [url] | [branch] | [short-hash] | [success/failed] |
```

Update last activity line.

### 7. Git Commit

```bash
git add .planning/STATE.md
git commit -m "deploy: [platform] — [success/failed] ([short-hash])"
```

### 8. Completion

**If deploy succeeded:**
```
+--------------------------------------------------+
| MertGSD > DEPLOY COMPLETE                            |
+--------------------------------------------------+

Platform: [Platform]
URL:      [Live URL]
Branch:   [branch]
Commit:   [hash]
Checks:   All passed

## > Next Up

Recommended: Verify the live site manually.

/mertgsd-verify [N]      -> Run UAT on deployed version
/mertgsd-audit           -> Run full audit on live site
```

**If deploy failed:**
```
+--------------------------------------------------+
| MertGSD > DEPLOY FAILED                              |
+--------------------------------------------------+

Platform: [Platform]
Error:    [Brief error description]

See full error output above. Fix the issue and retry:
/mertgsd-deploy [platform]
```
