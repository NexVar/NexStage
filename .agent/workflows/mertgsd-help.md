---
description: Show all available MertGSD commands and usage guide
---

# MertGSD Help — Available Commands

Display the following help information to the user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MertGSD — Command Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ⚡ Core Commands

| Command              | Profile       | What it does                                                |
|----------------------|---------------|-------------------------------------------------------------|
| /mertgsd-super [prompt]  | **Autonomous** | FULL AUTONOMY: AI builds from prompt to production          |
| /mertgsd-autopilot [N]   | **Autonomous** | Autonomous build engine (plan → execute → verify loop)      |
| /mertgsd-no-halluc [q]   | **Verified**   | Technical Q&A with mandatory research and citations         |
| /mertgsd-commit-memory   | **Continuity** | Distill context into long-term memory                       |

## Standard Workflow

| Command              | Task          | What it does                                                |
|----------------------|---------------|-------------------------------------------------------------|
| /mertgsd-new-project     | **Setup**     | Questions → Research → Requirements → Roadmap → Config     |
| /mertgsd-discuss [N]     | **Context**   | Capture implementation decisions before planning            |
| /mertgsd-plan [N]        | **Blueprint** | Technical planning and research for a phase                |
| /mertgsd-list-phase-assumptions [N] | **Planning** | Preview planning assumptions for a phase |
| /mertgsd-execute [N]     | **Builder**   | Execute all plans with atomic git commits                   |
| /mertgsd-verify [N]      | **Audit**     | Verify built features through user acceptance testing       |

## Quality & Review

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /mertgsd-audit           | Full project audit (security, performance, mobile, SEO, a11y, brand) |
| /mertgsd-review [N]      | PR-style code review for a phase or specific files          |
| /mertgsd-refactor [desc] | Safe refactoring with test snapshots and rollback           |

## Operations

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /mertgsd-deploy          | Build, deploy, and verify (CF Pages, Vercel, Netlify)      |
| /mertgsd-migrate [desc]  | Database migration with safety gates and rollback SQL       |
| /mertgsd-setup-config    | Configure project settings (ntfy, deploy, Supabase, tests)  |

## Utilities

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /mertgsd-quick [desc]    | Execute small ad-hoc task with MertGSD quality guarantees       |
| /mertgsd-progress        | Pulse check: Current state, roadblocks, and next steps      |
| /mertgsd-commit-memory   | Distill project state into durable memory                    |
| /mertgsd-help            | Show this help message                                      |

## Brownfield & Milestones

| Command                       | What it does                                                |
|------------------------------|-------------------------------------------------------------|
| /mertgsd-map-codebase        | Build a real codebase map before planning existing apps     |
| /mertgsd-new-milestone       | Start the next milestone on an existing project             |
| /mertgsd-audit-milestone     | Audit milestone-wide requirement coverage and integration   |
| /mertgsd-complete-milestone  | Archive a shipped milestone and prepare the next cycle      |
| /mertgsd-plan-milestone-gaps | Convert milestone audit gaps into roadmap work              |

## Continuity & Maintenance

| Command                      | What it does                                                |
|-----------------------------|-------------------------------------------------------------|
| /mertgsd-debug [issue]      | Start or resume a structured debug session                  |
| /mertgsd-pause-work         | Save a precise handoff for the next session                 |
| /mertgsd-resume-work        | Restore project context and route to the next step          |
| /mertgsd-add-todo           | Capture a follow-up item during active work                 |
| /mertgsd-check-todos        | Review pending todos and route them into action             |
| /mertgsd-health             | Validate `.planning/` integrity and repair safe issues      |
| /mertgsd-update             | Update a MertGSD clone or explain reinstall flow            |
| /mertgsd-settings           | Inspect or update project settings                          |
| /mertgsd-set-profile        | Set the preferred model profile                             |
| /mertgsd-research-phase     | Run standalone phase research                               |
| /mertgsd-add-phase          | Append a new roadmap phase                                  |
| /mertgsd-insert-phase       | Insert an urgent decimal phase                              |
| /mertgsd-remove-phase       | Remove an unstarted future phase                            |
| /mertgsd-add-tests          | Add or strengthen tests                                     |
| /mertgsd-reapply-patches    | Reapply saved local patch overlays                          |

## Typical Workflow

1. /mertgsd-new-project     → Set up project vision, requirements, roadmap, config
2. /mertgsd-discuss 1       → Capture your preferences for Phase 1
3. /mertgsd-plan 1          → Research and create task plans
4. /mertgsd-execute 1       → Execute plans with atomic commits
5. /mertgsd-verify 1        → Test and verify the work
6. /mertgsd-audit           → Full quality audit
7. /mertgsd-deploy          → Deploy to production
8. Repeat for next phase

💡 TIP: Start a NEW CONVERSATION between each step
for optimal context freshness and reduced hallucination risk.

## Agents (18)

| Agent                    | Role                                              |
|--------------------------|----------------------------------------------------|
| mertgsd-executor             | Executes plans with atomic commits                 |
| mertgsd-planner              | Creates executable task plans                      |
| mertgsd-debugger             | Investigates bugs using scientific method          |
| mertgsd-verifier             | Verifies phase goal achievement                    |
| mertgsd-codebase-mapper      | Explores and documents codebase structure          |
| mertgsd-phase-researcher     | Researches implementation before planning          |
| mertgsd-project-researcher   | Researches domain ecosystem before roadmap         |
| mertgsd-research-synthesizer | Synthesizes parallel research outputs              |
| mertgsd-roadmapper           | Creates project roadmaps with phase breakdown      |
| mertgsd-plan-checker         | Verifies plans will achieve phase goal             |
| mertgsd-integration-checker  | Verifies cross-phase integration and E2E flows     |
| mertgsd-security-auditor     | OWASP security scanning and vulnerability check    |
| mertgsd-performance-tester   | Lighthouse, bundle size, performance anti-patterns  |
| mertgsd-mobile-auditor       | Responsive design and mobile UX audit              |
| mertgsd-seo-checker          | Metadata, sitemap, structured data verification    |
| mertgsd-accessibility-tester | WCAG 2.2 AA compliance check                      |
| mertgsd-brand-reviewer       | Brand consistency, copy quality, design review     |
| mertgsd-notifier             | Push notifications via ntfy.sh                     |

## File Structure

.planning/
├── PROJECT.md          — Project vision and context
├── REQUIREMENTS.md     — Scoped v1/v2 requirements
├── ROADMAP.md          — Phases and progress tracking
├── STATE.md            — Current position (living memory)
├── mertgsd-config.json     — Project settings (ntfy, deploy, supabase, tests)
├── research/           — Domain research
└── phases/
    ├── 01-phase-name/
    │   ├── 01-CONTEXT.md         — Implementation decisions
    │   ├── 01-RESEARCH.md        — Phase-specific research
    │   ├── 01-01-PLAN.md         — Task plan
    │   ├── 01-01-SUMMARY.md      — Execution summary
    │   ├── 01-UAT.md             — User acceptance test results
    │   ├── 01-VERIFICATION.md    — Verification results
    │   ├── SECURITY-AUDIT.md     — Security audit report
    │   ├── PERFORMANCE-REPORT.md — Performance analysis
    │   ├── MOBILE-AUDIT.md       — Mobile responsiveness audit
    │   ├── SEO-REPORT.md         — SEO verification
    │   ├── ACCESSIBILITY-REPORT.md — WCAG compliance
    │   ├── BRAND-REVIEW.md       — Brand consistency review
    │   ├── REVIEW.md             — Code review verdict
    │   └── AUDIT.md              — Unified audit report
    └── 02-phase-name/
        └── ...

## 🛡️ Anti-Hallucination Features

| Protection                    | How it works                                           |
|-------------------------------|--------------------------------------------------------|
| File-First Context            | Always re-read files — never rely on memory            |
| Source Verification           | Technical claims verified via docs before use in plans |
| Confidence Levels             | Research tagged HIGH/MEDIUM/LOW by verification source |
| Verification Gates            | Every task verified — output read, not assumed         |
| No Auto-Pass                  | Tests never marked passed without user confirmation    |
| Decision Attribution          | Tracks USER-decided vs AI-suggested decisions          |
| Context Freshness             | New conversation recommended between workflow steps    |
| Checkpoint Integrity          | WAIT for user — never hallucinate completion           |

## Notifications (ntfy.sh)

When configured via /mertgsd-setup-config, you'll receive push notifications for:
- Phase completion
- Deploy success/failure
- Audit results
- Errors and blockers

## Multi-Model Compatibility

Works with any AI model:
- 🟣 Claude (Anthropic)
- 🔵 Gemini (Google DeepMind)
- 🟢 GPT (OpenAI)
- 🟡 Open-source models

Model-agnostic by design: uses structural safeguards (file reads,
command verification, user gates) instead of model-specific behavior.
```
