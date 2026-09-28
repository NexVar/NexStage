# Git Planning Commit

Commit planning artifacts using standard git commands. Check `commit_docs` config and gitignore status before committing.

## Commit planning files

Always check `commit_docs` before committing `.planning/` files:

```bash
COMMIT_DOCS=$(cat .planning/config.json 2>/dev/null | grep -o '"commit_docs"[[:space:]]*:[[:space:]]*[a-z]*' | grep -o '[a-z]*$' || echo "true")
if [ "$COMMIT_DOCS" = "true" ]; then
  git add .planning/STATE.md .planning/ROADMAP.md
  git commit -m "docs({scope}): {description}"
fi
```

Skip commit if `commit_docs` is `false` or `.planning/` is gitignored.

## Amend previous commit

To fold `.planning/` file changes into the previous commit:

```bash
git add .planning/codebase/*.md
git commit --amend --no-edit
```

## Commit Message Patterns

| Command | Scope | Example |
|---------|-------|---------|
| plan-phase | phase | `docs(phase-03): create authentication plans` |
| execute-phase | phase | `docs(phase-03): complete authentication phase` |
| new-milestone | milestone | `docs: start milestone v1.1` |
| remove-phase | chore | `chore: remove phase 17 (dashboard)` |
| insert-phase | phase | `docs: insert phase 16.1 (critical fix)` |
| add-phase | phase | `docs: add phase 07 (settings page)` |

## When to Skip

- `commit_docs: false` in config
- `.planning/` is gitignored
- No changes to commit (check with `git status --porcelain .planning/`)
