---
description: Configure project-specific MertGSD settings (notifications, deploy platform, model preferences)
---

# MertGSD Setup Config — Project Configuration

Interactive configuration for project-specific MertGSD settings. Creates `.planning/mertgsd-config.json`.

## When to Run

- Automatically called by `mertgsd-new-project` after project initialization
- Manually via `/mertgsd-setup-config` to update settings

## Steps

### 1. Check Existing Config

```bash
cat .planning/mertgsd-config.json 2>/dev/null
```

If exists, show current config and ask what to change.

### 2. Gather Settings

Ask the user these questions (skip if already configured):

**Notifications:**
- "Push bildirim almak ister misin? (ntfy.sh kullanılır)" → yes/no
- If yes: "ntfy kanal adı ne olsun? (örn: mertpi-alerts)" → topic name
- Test notification: `curl -s -d "MertGSD bildirim testi basarili!" ntfy.sh/${topic}`

**Deploy Platform:**
- "Deploy platformu hangisi?" → cloudflare-pages / vercel / netlify / none
- If CF Pages: "Project name?"
- If Vercel: "Project name?"

**Language:**
- "Proje dili?" → tr / en / both
- Affects: commit messages, report language, notifications

**Model Preferences:**
- "Agent model tercihi?" → default (inherit) / opus / sonnet / haiku
- "Autonomous execution allowed?" → yes / no (affects mertgsd-super)

**Git Settings:**
- "Main branch?" → main / master
- "Dev branch?" → dev / develop / none

**Supabase:**
- "Supabase kullanılacak mı?" → yes / no
- If yes: "Project ref?" → project_ref
- "Service role key env var name?" → SUPABASE_SERVICE_ROLE_KEY

**Test Runner:**
- Auto-detect from package.json scripts (test, test:unit, test:e2e)
- "Ek test komutu var mı?" → custom command or skip

### 3. Create Config File

Write `.planning/mertgsd-config.json`:

```json
{
  "project_name": "project-name",
  "ntfy_topic": "channel-name",
  "ntfy_enabled": true,
  "deploy_platform": "cloudflare-pages",
  "deploy_project": "project-name",
  "language": "tr",
  "model": "default",
  "autonomous": true,
  "git_main_branch": "main",
  "git_dev_branch": "dev",
  "supabase": {
    "enabled": true,
    "project_ref": "xxxx",
    "service_key_env": "SUPABASE_SERVICE_ROLE_KEY"
  },
  "test_commands": {
    "unit": "npm run test",
    "e2e": "npm run test:e2e",
    "lint": "npm run lint",
    "typecheck": "npm run type-check",
    "build": "npm run build"
  },
  "created_at": "2026-03-19T00:00:00Z",
  "updated_at": "2026-03-19T00:00:00Z"
}
```

### 4. Confirmation

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MertGSD Config ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 Notifications: {enabled/disabled} → {topic}
 Deploy: {platform} → {project}
 Language: {language}
 Supabase: {enabled/disabled}
 Test: {detected commands}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
