---
description: Full project audit spawning parallel agents for security, performance, mobile, SEO, accessibility, and brand
---

# MertGSD Audit — Full Project Audit with Parallel Agents

Run a comprehensive project audit by spawning multiple specialist agents in parallel. Covers security, performance, mobile, SEO, accessibility, and brand consistency. Collects all reports into a unified AUDIT.md with prioritized findings and action items.

> **ANTI-HALLUCINATION PROTOCOL -- ACTIVE IN THIS WORKFLOW**
> Audit findings must be based on ACTUAL code analysis, not assumptions. Every finding MUST cite the exact file and line. Do NOT fabricate audit results to appear thorough. Do NOT claim "no issues" in a category without having actually checked. If a tool is unavailable, say so -- do not simulate its output.

## Arguments

The user may specify which audits to run or a scope:
- `/mertgsd-audit` -- run all audits
- `/mertgsd-audit security performance` -- run only specified audits
- `/mertgsd-audit src/` -- audit specific directory

If no argument provided, run all audit categories.

## Multi-Model Safeguard: Audit Integrity

**MANDATORY -- regardless of which AI model is running:**

```
AUDIT RULES:
1. Re-read STATE.md and ROADMAP.md -- understand the project
2. Every finding must cite EXACT file path and line number
3. Do NOT invent findings to appear thorough
4. Do NOT suppress findings to appear clean
5. If a tool is unavailable, report "NOT AUDITED" -- do NOT fake results
6. Severity must match real impact -- critical means real risk of exploit/outage

WARNING: A clean audit that missed real issues is worse than no audit.
Be thorough. Be honest. Cite evidence.
```

## Steps

### 1. Validate Project

**Actually read** (not recall) `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/`:** "No MertGSD project found. Run /mertgsd-new-project first."

Determine audit scope:
```bash
# Understand the project structure
find . -maxdepth 2 -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.html" \) | head -50

# Count source files
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/dist/*" | wc -l

# Check for configuration files
ls package.json tsconfig.json next.config.* nuxt.config.* vite.config.* 2>/dev/null
```

Display:
```
+--------------------------------------------------+
| MertGSD > FULL PROJECT AUDIT                         |
+--------------------------------------------------+

Project:    [name from ROADMAP.md]
Phase:      [current phase from STATE.md]
Source files: [count]
Scope:      [All / specified categories]

Spawning audit agents...
```

### 2. Determine Audit Categories

Based on arguments and project type, select which audits to run:

| Category | Agent | Condition |
|----------|-------|-----------|
| Security | security-auditor | Always |
| Performance | performance-tester | Always |
| Mobile | mobile-auditor | If project has UI (React, Vue, HTML) |
| SEO | seo-checker | If project has public pages |
| Accessibility | accessibility-tester | If project has UI |
| Brand | brand-reviewer | If brand guidelines exist in `.planning/` |

**If a category is not applicable:** Note it as "N/A -- [reason]" and skip.

### 3. Security Audit

Read and follow the agent instructions in `.agent/agents/mertgsd-security-auditor.md`.

The security auditor agent handles: secrets scanning, dependency vulnerabilities, code-level security review (injection, XSS, auth, CORS, etc.), and environment/config checks.

Record all findings with file, line, severity, and description.

### 4. Performance Audit

Read and follow the agent instructions in `.agent/agents/mertgsd-performance-tester.md`.

The performance tester agent handles: bundle analysis, code-level performance review (N+1 queries, memoization, memory leaks, lazy loading, etc.), and build configuration checks.

Record all findings with file, line, severity, and description.

### 5. Mobile Audit

**Skip if project has no UI.**

Read and follow the agent instructions in `.agent/agents/mertgsd-mobile-auditor.md`.

The mobile auditor agent handles: viewport meta tags, responsive breakpoints, touch target sizes, mobile navigation patterns, responsive images, and overall mobile usability.

Record all findings with file, line, severity, and description.

### 6. SEO Audit

**Skip if project has no public pages.**

Read and follow the agent instructions in `.agent/agents/mertgsd-seo-checker.md`.

The SEO checker agent handles: title tags, meta descriptions, Open Graph tags, canonical URLs, sitemap/robots.txt, alt text, semantic HTML, structured data, and SSR/SSG checks.

Record all findings with file, line, severity, and description.

### 7. Accessibility Audit

**Skip if project has no UI.**

Read and follow the agent instructions in `.agent/agents/mertgsd-accessibility-tester.md`.

The accessibility tester agent handles: WCAG 2.1 compliance, alt text, ARIA labels, form labels, color contrast, keyboard navigation, focus indicators, semantic HTML, and heading hierarchy.

Record all findings with file, line, severity, and description.

### 8. Brand Audit

**Skip if no brand guidelines exist.**

Read and follow the agent instructions in `.agent/agents/mertgsd-brand-reviewer.md`.

The brand reviewer agent handles: color palette consistency, typography, spacing/design system compliance, component usage, and copy tone/voice matching.

**If no brand guidelines:** Note "No brand guidelines found -- brand audit skipped."

### 9. Compile AUDIT.md

Collect all findings and prioritize by severity:

**Severity definitions:**
| Severity | Definition | Examples |
|----------|-----------|---------|
| Critical | Immediate risk of exploit, data loss, or outage | SQL injection, exposed secrets, auth bypass |
| High | Significant issue affecting users or security | XSS, missing auth, N+1 queries on main pages |
| Medium | Should be fixed but not urgent | Missing alt text, hardcoded values, minor perf |
| Low | Nice to have, best practice | Code style, minor a11y, SEO improvements |

Create `.planning/AUDIT.md`:

```markdown
# Project Audit Report

**Date:** [date]
**Project:** [name from ROADMAP.md]
**Phase:** [current phase]
**Audited by:** MertGSD Automated Audit

## Executive Summary

[2-3 sentences: overall project health assessment]

**Overall Score:** [Critical issues count] critical, [High] high, [Medium] medium, [Low] low

## Findings by Severity

### Critical ([count])
[List each critical finding with file:line and brief description, or "None"]

### High ([count])
[List each high finding with file:line and brief description, or "None"]

### Medium ([count])
[List each medium finding with file:line and brief description, or "None"]

### Low ([count])
[List each low finding with file:line and brief description, or "None"]

## Audit Categories

### Security Audit
**Status:** Audited | Not Audited
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### Performance Audit
**Status:** Audited | Not Audited
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### Mobile Audit
**Status:** Audited | Not Audited | N/A
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### SEO Audit
**Status:** Audited | Not Audited | N/A
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### Accessibility Audit
**Status:** Audited | Not Audited | N/A
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### Brand Audit
**Status:** Audited | Not Audited | N/A
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

## Action Items

Prioritized list of fixes, ordered by severity then effort:

| Priority | Severity | Category | Action | Files | Effort |
|----------|----------|----------|--------|-------|--------|
| 1 | Critical | Security | [what to do] | [files] | [S/M/L] |
| 2 | Critical | Security | [what to do] | [files] | [S/M/L] |
| 3 | High | Performance | [what to do] | [files] | [S/M/L] |

## Categories Not Audited
[List any categories that were skipped and why]

---
*Audited: [date]*
```

### 10. Git Commit

```bash
git add .planning/AUDIT.md
git commit -m "audit: full project audit — [critical] critical, [high] high, [medium] medium, [low] low"
```

### 11. Update STATE.md

**Read and then update** `.planning/STATE.md`:

Add to Audits section (create if not exists):

```markdown
### Audits

| Date | Scope | Critical | High | Medium | Low | Report |
|------|-------|----------|------|--------|-----|--------|
| [date] | Full | [count] | [count] | [count] | [count] | AUDIT.md |
```

Update last activity line.

```bash
git add .planning/STATE.md
git commit -m "docs: update STATE.md with audit results"
```

### 12. Completion

**If no critical issues:**
```
+--------------------------------------------------+
| MertGSD > AUDIT COMPLETE                             |
+--------------------------------------------------+

Project:  [name]
Findings: [critical] critical, [high] high, [medium] medium, [low] low
Report:   .planning/AUDIT.md

Categories Audited:
  [x] Security      — [count] findings
  [x] Performance   — [count] findings
  [x] Mobile        — [count] findings
  [x] SEO           — [count] findings
  [x] Accessibility — [count] findings
  [x] Brand         — [count] findings

Action items: [total count] (see AUDIT.md)

## > Next Up

/mertgsd-quick [action item]  -> Fix a specific finding
/mertgsd-plan [N]             -> Plan fixes into next phase
```

**If critical issues found:**
```
+--------------------------------------------------+
| MertGSD > AUDIT COMPLETE -- CRITICAL ISSUES FOUND    |
+--------------------------------------------------+

!! [count] CRITICAL ISSUES REQUIRE IMMEDIATE ATTENTION !!

[List each critical issue briefly]

Full report: .planning/AUDIT.md

These issues should be fixed before any new feature work.

## > Next Up

/mertgsd-quick [critical fix]  -> Fix critical issue immediately
/mertgsd-review                -> Review after fixes applied
```
