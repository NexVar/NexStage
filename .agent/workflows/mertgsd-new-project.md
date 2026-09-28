---
description: Initialize a new MertGSD project with questions, research, requirements, and roadmap
---

# MertGSD New Project — Full Initialization

Initialize a new project through a structured flow: questioning → research → requirements → roadmap. This is the most leveraged moment — deep questioning here means better plans, better execution, better outcomes.

> **🛡️ ANTI-HALLUCINATION PROTOCOL — ACTIVE IN THIS WORKFLOW**
> Project initialization defines EVERYTHING downstream. Record the user's ACTUAL vision — do NOT subtly reshape it. Research using real sources — do NOT fabricate ecosystem knowledge. When unsure about a technology claim, verify it or say "I'm not certain."

## Multi-Model Safeguard: Initialization Integrity

**MANDATORY — regardless of which AI model is running:**

```
INITIALIZATION RULES:
1. Write down what the USER says — do NOT "improve" their vision
2. Research claims before recording — verify libraries exist, APIs work
3. Present options neutrally — do NOT favor your training data's preferences
4. Record decisions with attribution — USER chose X vs AI suggested Y
5. Mark research confidence levels — HIGH (verified), MEDIUM (searched), LOW (from memory)

⚠️ This is the FOUNDATION. Hallucinations here compound into every phase.
```

## Steps

### 1. Check for Existing Project

Check if `.planning/` directory exists.

**If it exists and contains `PROJECT.md`:**
```
A MertGSD project already exists in this directory.
Run /mertgsd-progress to see current status.
```
Ask the user if they want to reinitialize (this will overwrite existing planning files) or continue with the existing project.

**If it doesn't exist:** Continue to Step 2.

### 2. Initialize Git (if needed)

Check if the current directory is a git repo:
```bash
git status
```

If not a git repo, initialize one:
```bash
git init
```

### 3. Deep Questioning

This is where you understand what the user wants to build. Start with an open question and follow threads naturally.

**Open the conversation:**

Ask the user: **"What do you want to build?"**

Wait for their response, then follow up with intelligent questions that dig into what they said.

**Follow-up techniques:**
- Challenge vague terms — "What do you mean by 'smart'?"
- Make abstract concrete — "What would that look like for a user?"
- Surface assumptions — "Are you assuming users will already have accounts?"
- Find edges — "What happens when there are zero items?"
- Reveal motivation — "What problem sparked this idea?"

> **🛡️ QUESTIONING INTEGRITY:**
> - Do NOT lead the user toward your preferred architecture
> - Do NOT assume technical requirements the user hasn't mentioned
> - If the user says something technically questionable, ASK — don't silently correct
> - Record their EXACT responses, not your interpreted version

**Topics to cover through natural conversation (don't use as a checklist):**
- Core value proposition — the ONE thing that must work
- Target users — who is this for?
- Technical preferences — any stack decisions already made?
- Constraints — budget, timeline, platform limitations?
- Scope boundaries — what is explicitly NOT in v1?
- Integration needs — what does this connect to?
- Success criteria — how do you know it works?

**Decision gate:** When you have enough context to write a clear project document, ask the user:
"I think I understand what you're building. Ready to create the project plan, or do you want to share more?"

### 4. Write PROJECT.md

Create `.planning/PROJECT.md` synthesizing everything gathered:

```markdown
# [Project Name]

## Vision
[One paragraph: what this is and why it matters — use USER'S framing]

## Core Value
[The ONE thing that must work for this to succeed — from USER's words]

## Target Users
[Who this is for, what they need — as USER described]

## Technical Context
[Stack decisions, platform, constraints]
[Note: USER-chosen vs AI-suggested items]

## Requirements

### Validated
(None yet — ship to validate)

### Active
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]
...

### Out of Scope
- [Exclusion 1] — [why]
- [Exclusion 2] — [why]

## Key Decisions

| Decision | Source | Rationale | Outcome |
|----------|--------|-----------|---------|
| [Choice] | User | [Why]     | Decided |
| [Choice] | AI-suggested | [Why] | Agreed |

---
*Last updated: [date] after initialization*
```

Create the directory and write the file:
```bash
mkdir -p .planning
```

Commit:
```bash
git add .planning/PROJECT.md
git commit -m "docs: initialize project"
```

### 5. Workflow Preferences

Ask the user these questions to configure the workflow:

**Question 1 — Depth:**
"How thorough should planning be?"
- **Quick** — Ship fast (3-5 phases, 1-3 plans each)
- **Standard** — Balanced scope and speed (5-8 phases, 3-5 plans each)
- **Comprehensive** — Thorough coverage (8-12 phases, 5-10 plans each)

**Question 2 — Git Tracking:**
"Commit planning docs to git?"
- **Yes (Recommended)** — Planning docs tracked in version control
- **No** — Keep .planning/ local-only (add to .gitignore)

Save preferences to `.planning/config.json`:
```json
{
  "depth": "quick|standard|comprehensive",
  "commit_docs": true|false,
  "workflow": {
    "research": true,
    "verification": true
  }
}
```

If commit_docs is false, add `.planning/` to `.gitignore`.

### 6. Domain Research

Ask the user: "Want me to research the domain ecosystem before defining requirements? This discovers standard stacks, expected features, and common pitfalls."

**If yes, research these 4 dimensions:**

> **🛡️ RESEARCH VERIFICATION — For each claim in research:**
> - Use `search_web` to verify current ecosystem state
> - Use `read_url_content` on official docs when referencing specific tools
> - Mark confidence level: HIGH (verified) / MEDIUM (searched) / LOW (from memory)
> - Flag anything marked LOW — user should validate these claims

1. **Stack Research** — What's the standard 2025 stack for this domain? Write to `.planning/research/STACK.md`
2. **Features Research** — What features do products in this domain have? What's table stakes vs differentiating? Write to `.planning/research/FEATURES.md`
3. **Architecture Research** — How are these systems typically structured? Write to `.planning/research/ARCHITECTURE.md`
4. **Pitfalls Research** — What do projects in this domain commonly get wrong? Write to `.planning/research/PITFALLS.md`

After researching all 4, create `.planning/research/SUMMARY.md` with key findings and confidence levels.

```bash
mkdir -p .planning/research
```

Commit research:
```bash
git add .planning/research/
git commit -m "docs: domain research complete"
```

**If no:** Skip to Step 7.

### 7. Define Requirements

Using PROJECT.md and research (if exists), create `.planning/REQUIREMENTS.md`:

```markdown
# Requirements

## Overview
[Brief description of what requirements cover]

## V1 — Must Have
These are table stakes. The product doesn't work without them.

| ID | Requirement | Phase | Status |
|----|-------------|-------|--------|
| R1 | [Requirement] | TBD | Planned |
| R2 | [Requirement] | TBD | Planned |

## V2 — Nice to Have
Differentiators and improvements for after v1 is stable.

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R10 | [Requirement] | High | Backlog |
| R11 | [Requirement] | Medium | Backlog |

## Out of Scope
- [Thing] — [reason]

---
*Last updated: [date]*
```

Present requirements to user for approval before continuing.

**WAIT for explicit user approval. Do NOT proceed without it.**

Commit:
```bash
git add .planning/REQUIREMENTS.md
git commit -m "docs: define requirements"
```

### 8. Create Roadmap

Create `.planning/ROADMAP.md` based on requirements:

```markdown
# Roadmap

## Milestone 1: [Name]

### Progress

| Phase | Name | Status | Plans | Date |
|-------|------|--------|-------|------|
| 1 | [Name] | Planned | — | — |
| 2 | [Name] | Planned | — | — |
| 3 | [Name] | Planned | — | — |

### Phases

#### Phase 1: [Name]
**Goal:** [What this phase achieves]
**Requirements:** [R1, R2, R3]
- [ ] [Deliverable 1]
- [ ] [Deliverable 2]

#### Phase 2: [Name]
**Goal:** [What this phase achieves]
**Requirements:** [R4, R5]
- [ ] [Deliverable 1]
- [ ] [Deliverable 2]

...

---
*Last updated: [date]*
```

Present roadmap to user for approval.

**WAIT for explicit user approval. Do NOT proceed without it.**

Commit:
```bash
git add .planning/ROADMAP.md
git commit -m "docs: create roadmap"
```

### 9. Create STATE.md

Create `.planning/STATE.md` to track current position:

```markdown
# Project State

## Current Position
**Phase:** 1 — [Name]
**Status:** Ready to plan
**Last activity:** [date] — Project initialized

## Key Decisions

| Decision | Phase | Source | Rationale |
|----------|-------|--------|-----------|
| [From questioning] | Init | User | [Why] |
| [From questioning] | Init | AI-suggested | [Why] |

### Blockers/Concerns
None

---
*Last updated: [date]*
```

Commit:
```bash
git add .planning/STATE.md
git commit -m "docs: initialize project state"
```

### 10. Project Configuration

Run the project configuration flow to set up notifications, deploy platform, and project-specific settings.

Ask the user these questions:

**1. Notifications:**
"Push bildirim almak ister misin? Fazlar tamamlandığında, deploy olduğunda veya hata çıktığında bildirim alırsın. (ntfy.sh kullanılır)"

If yes: "ntfy kanal adı ne olsun? (örn: mertpi-alerts, proje-adi-alerts)"
Send test: `curl -s -d "MertGSD: ${PROJECT_NAME} projesi baslatildi!" ntfy.sh/${TOPIC}`

**2. Deploy:**
"Deploy platformu var mı?" → cloudflare-pages / vercel / netlify / none

**3. Supabase:**
"Supabase kullanılacak mı?" → If yes, ask project_ref

**4. Test runner:**
Auto-detect from package.json. Show detected commands, ask if correct.

Create `.planning/mertgsd-config.json` with all settings.

Commit:
```bash
git add .planning/mertgsd-config.json
git commit -m "docs: project configuration"
```

### 11. Completion

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MertGSD ► PROJECT INITIALIZED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project: [Name]
Phases: [N] phases planned
Requirements: [M] v1 requirements
Notifications: [enabled/disabled]
Deploy: [platform/none]

## ▶ Next Up

Recommended: Start a NEW CONVERSATION for each phase workflow.
This prevents initialization context from contaminating planning.

/mertgsd-discuss 1    → Capture preferences for Phase 1
/mertgsd-plan 1       → Skip to planning Phase 1
/mertgsd-audit        → Run full project audit
```

**Send notification (if enabled):**
```bash
NTFY_TOPIC=$(cat .planning/mertgsd-config.json 2>/dev/null | grep -o '"ntfy_topic":"[^"]*"' | cut -d'"' -f4)
if [ -n "$NTFY_TOPIC" ]; then
  curl -s -H "Title: MertGSD Proje Baslatildi" -d "${PROJECT_NAME}: ${PHASE_COUNT} faz planlanadi. Hazir!" ntfy.sh/$NTFY_TOPIC
fi
```
