---
description: Update a MertGSD clone or explain how to refresh copied project installs
---

# MertGSD Update

Update MertGSD safely.

## Intent

There are two real install modes:

1. A git clone of the MertGSD repo
2. A project-local copied `.agent/` install created by `mertgsd-install`

Detect which one you are in before acting.

## If This Is A Git Clone

1. Check current branch and worktree cleanliness.
2. Fetch `origin`.
3. Compare local HEAD with `origin/main`.
4. If already current, say so clearly.
5. If updates exist, show a concise commit summary of what changed.
6. Ask for confirmation before pulling.
7. Use fast-forward update only.

## If This Is A Project Copy

Do not pretend git update is possible.

Instead:

1. Tell the user this project contains a copied MertGSD install.
2. Ask where the canonical MertGSD repo lives.
3. Instruct or perform:
   - update the source repo
   - rerun `mertgsd-install`
4. Re-check that `.agent/workflows/` and `.agent/agents/` match the new install.

## Output

Report:

- install mode detected
- current revision
- latest revision if available
- whether update was applied
- whether reinstall was needed
