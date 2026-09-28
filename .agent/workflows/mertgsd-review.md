---
description: PR-style code review of changes with quality, security, performance, and brand checks
---

# MertGSD Review — Code Review with Multi-Agent Analysis

PR-style code review of changes since the last phase or commit range. Analyzes code quality, security, performance, and brand consistency. Spawns specialist agents as needed and produces a REVIEW.md with a verdict.

> **ANTI-HALLUCINATION PROTOCOL -- ACTIVE IN THIS WORKFLOW**
> Code review must be based on ACTUAL code, not recalled or assumed code. READ every file being reviewed. Do NOT claim a vulnerability exists without showing the exact line. Do NOT claim "no issues" without having read the actual diff.

## Arguments

The user may provide a phase number, file paths, or commit range:
- `/mertgsd-review 2` -- review all changes from Phase 2
- `/mertgsd-review src/auth/` -- review specific directory
- `/mertgsd-review HEAD~5..HEAD` -- review specific commit range

If no argument provided, review changes since the last review or last phase completion.

## Multi-Model Safeguard: Review Integrity

**MANDATORY -- regardless of which AI model is running:**

```
REVIEW RULES:
1. Re-read STATE.md and ROADMAP.md -- understand what was intended
2. READ the actual diff/files -- do NOT review from memory
3. Every finding must cite the EXACT file and line number
4. Do NOT invent vulnerabilities or issues that aren't in the code
5. Do NOT dismiss real issues to produce a "clean" review
6. Severity must match actual impact -- do not inflate or deflate

WARNING: A false "approved" review is more dangerous than a false "blocked."
When in doubt, request changes.
```

## Steps

### 1. Validate

**Actually read** (not recall) `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/`:** "No MertGSD project found. Run /mertgsd-new-project first."

Determine the review scope based on arguments:

**Phase number provided:**
```bash
# Get commits for this phase
git log --oneline --all -- .planning/phases/[NN]-*/
```

**File paths provided:**
```bash
# Get recent changes to specified files
git log --oneline -20 -- [paths]
git diff HEAD~10..HEAD -- [paths]
```

**Commit range provided:**
```bash
git diff [range]
```

**No argument -- auto-detect:**
```bash
# Find last review or phase completion
git log --oneline -1 --grep="review:" --grep="MertGSD: phase complete" --all
# Diff from that point to HEAD
git diff [last-review-hash]..HEAD
```

Display:
```
+--------------------------------------------------+
| MertGSD > CODE REVIEW                                |
+--------------------------------------------------+

Scope:    [Phase N / Files / Commit Range]
Files:    [count] files changed
Commits:  [count] commits
Lines:    +[added] / -[removed]
```

### 2. Git Diff Analysis

**Read the full diff** -- do NOT work from memory:

```bash
git diff [range] --stat
git diff [range]
```

For each changed file, categorize:
- **New files** -- full review needed
- **Modified files** -- review the changes in context
- **Deleted files** -- check for orphaned references
- **Renamed/moved** -- verify imports updated

> **HALLUCINATION GATE:**
> - Did you READ the actual diff output? (not recall what was changed)
> - Are you reviewing ACTUAL code? (not assumed/remembered code)
> - If the diff is large, review it file by file -- do NOT skip files

### 3. Code Quality Check

For each changed file, check:

| Check | What to Look For |
|-------|-----------------|
| **Naming** | Consistent naming conventions, descriptive names |
| **Structure** | Single responsibility, reasonable file size |
| **Types** | Proper TypeScript types (no `any` unless justified) |
| **Error handling** | Try/catch where needed, user-facing error messages |
| **Imports** | No circular dependencies, no unused imports |
| **Dead code** | No commented-out code, no unreachable code |
| **Duplication** | No copy-paste code that should be abstracted |
| **Console/debug** | No `console.log` left in production code |

Record each finding with:
- **File:** exact path
- **Line:** exact line number
- **Issue:** what is wrong
- **Severity:** critical / high / medium / low
- **Suggestion:** how to fix

### 4. Security Scan

Read and follow the agent instructions in `.agent/agents/mertgsd-security-auditor.md` scoped to the changed files.

The security auditor agent handles: injection attacks, auth checks, data exposure, hardcoded secrets, dependency vulnerabilities, CORS, and input validation.

> **HALLUCINATION GATE -- Security findings:**
> - Can you point to the EXACT line with the vulnerability?
> - Is this a real vulnerability or a false positive?
> - Do NOT claim "no security issues" without having checked each category

### 5. Performance Check

Read and follow the agent instructions in `.agent/agents/mertgsd-performance-tester.md` scoped to the changed files.

The performance tester agent handles: N+1 queries, bundle size, React re-renders/memoization, memory leaks, async patterns, and image optimization.

### 6. Brand Review

If the project has brand guidelines (check `.planning/` for brand-related docs):

Read and follow the agent instructions in `.agent/agents/mertgsd-brand-reviewer.md` scoped to the changed files.

The brand reviewer agent handles: design token usage, color palette, typography, spacing system, component consistency, and copy tone/voice.

**If no brand guidelines exist:** Skip this step and note "No brand guidelines found."

### 7. Create REVIEW.md

Determine verdict:
- **APPROVE** -- No critical or high issues. Medium/low issues are informational.
- **REQUEST CHANGES** -- High issues that should be fixed before shipping.
- **BLOCK** -- Critical issues that MUST be fixed. Security vulnerabilities, data loss risks, broken core functionality.

Create `.planning/REVIEW.md` (overwrite if exists):

```markdown
# Code Review

**Date:** [date]
**Scope:** [Phase N / Files / Commit Range]
**Verdict:** APPROVE | REQUEST CHANGES | BLOCK
**Reviewer:** MertGSD Automated Review

## Summary

[2-3 sentences: overall assessment of the changes]

## Stats

- **Files changed:** [count]
- **Lines:** +[added] / -[removed]
- **Commits:** [count]

## Findings

### Critical
[List critical findings or "None"]

### High
[List high findings or "None"]

### Medium
[List medium findings or "None"]

### Low
[List low findings or "None"]

## Detailed Findings

### [Finding Title]
- **File:** [path]
- **Line:** [number]
- **Severity:** [critical/high/medium/low]
- **Category:** [quality/security/performance/brand]
- **Issue:** [description]
- **Suggestion:** [how to fix]

[Repeat for each finding]

## Security Summary
- [x] No hardcoded secrets found
- [x] Input validation present
- [x] Auth checks in place
- [ ] [Any unchecked items with explanation]

## Performance Summary
- [x] No N+1 queries detected
- [x] Bundle impact reasonable
- [ ] [Any unchecked items with explanation]

---
*Reviewed: [date]*
```

### 8. Git Commit

```bash
git add .planning/REVIEW.md
git commit -m "review: [verdict] — [critical] critical, [high] high, [medium] medium, [low] low"
```

### 9. Update STATE.md

**Read and then update** `.planning/STATE.md`:

Add to Reviews section (create if not exists):

```markdown
### Reviews

| Date | Scope | Verdict | Critical | High | Medium | Low |
|------|-------|---------|----------|------|--------|-----|
| [date] | [scope] | [verdict] | [count] | [count] | [count] | [count] |
```

Update last activity line.

```bash
git add .planning/STATE.md
git commit -m "docs: update STATE.md with review results"
```

### 10. Completion

**If APPROVE:**
```
+--------------------------------------------------+
| MertGSD > REVIEW COMPLETE -- APPROVED                |
+--------------------------------------------------+

Scope:   [scope]
Verdict: APPROVE
Issues:  [medium] medium, [low] low (informational)

Review saved: .planning/REVIEW.md

## > Next Up

/mertgsd-deploy          -> Deploy the approved changes
/mertgsd-execute [N+1]   -> Continue to next phase
```

**If REQUEST CHANGES:**
```
+--------------------------------------------------+
| MertGSD > REVIEW COMPLETE -- CHANGES REQUESTED       |
+--------------------------------------------------+

Scope:   [scope]
Verdict: REQUEST CHANGES
Issues:  [high] high, [medium] medium

[List high-severity issues briefly]

Review saved: .planning/REVIEW.md
Fix the issues and run /mertgsd-review again.
```

**If BLOCK:**
```
+--------------------------------------------------+
| MertGSD > REVIEW COMPLETE -- BLOCKED                 |
+--------------------------------------------------+

Scope:   [scope]
Verdict: BLOCK
Issues:  [critical] critical

[List critical issues briefly]

Review saved: .planning/REVIEW.md
These issues MUST be fixed before proceeding.
```
