---
description: Validate MertGSD planning files and optionally repair safe issues
---

# MertGSD Health

Validate `.planning/` integrity and report issues in plain language.

## Arguments

- `/mertgsd-health`
- `/mertgsd-health --repair`

## Checks

1. `.planning/` exists
2. Required docs exist:
   - `PROJECT.md`
   - `REQUIREMENTS.md`
   - `ROADMAP.md`
   - `STATE.md`
3. `mertgsd-config.json` exists and parses as valid JSON if present
4. Phase directories roughly match roadmap phases
5. Plans without summaries are reported as in-progress work, not failures
6. `.continue-here.md`, debug sessions, and pending todos are surfaced as context

## Repair Mode

If `--repair` is present, you may safely:

- create `.planning/mertgsd-config.json` with sensible defaults if missing
- create a minimal `STATE.md` if missing but roadmap exists
- normalize obviously broken empty directories under `.planning/`

Do not rewrite PROJECT or ROADMAP content automatically.

## Output

Return:

- status: healthy, degraded, or broken
- critical errors
- warnings
- safe repairs performed
- next command to run
