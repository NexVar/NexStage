---
description: Aggregate phase verification and cross-phase integration results for a full milestone verdict
---

# MertGSD Audit Milestone

Audit the milestone as a whole.

## Steps

1. Identify the milestone scope from `ROADMAP.md`.
2. Read all phase verification and summary files in scope.
3. Cross-check milestone requirements against delivered work.
4. Use `mertgsd-integration-checker` to verify cross-phase wiring and key end-to-end flows.
5. Write `.planning/v[version]-MILESTONE-AUDIT.md` with:
   - status
   - satisfied requirements
   - unsatisfied requirements
   - integration gaps
   - broken flows
   - tech debt

## Completion Routing

- clean audit -> `/mertgsd-complete-milestone`
- gap audit -> `/mertgsd-plan-milestone-gaps`
