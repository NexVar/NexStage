---
description: Restore project context and route to the most sensible next action
---

# MertGSD Resume Work

Restore context fast.

## Steps

1. Read `STATE.md`, `PROJECT.md`, and `ROADMAP.md`.
2. Check for:
   - `.continue-here.md`
   - active debug sessions
   - pending todos
   - incomplete plans without summaries
3. Summarize current position:
   - project
   - phase
   - plan
   - blockers
   - last activity
4. Recommend the next action based on the real project state.

## Preferred Routing

- continue-here exists -> resume that work first
- incomplete phase exists -> continue execution or verification
- next phase lacks context -> `/mertgsd-discuss`
- next phase has context but no plan -> `/mertgsd-plan`
- milestone complete but not audited -> `/mertgsd-audit-milestone`

## Output

Return a short project status dashboard and the best next command.
