---
description: Reapply locally saved MertGSD patch files after an update or reinstall
---

# MertGSD Reapply Patches

Use this only if local patch backups exist.

## Steps

1. Check for `.planning/mertgsd-local-patches/` or another user-specified backup folder.
2. If no patch backups exist, say so clearly and stop.
3. Review patch files before applying.
4. Reapply them carefully, preferring minimal merges over blind overwrite.
5. Report conflicts explicitly.

## Completion

Tell the user which patches were applied, skipped, or conflicted.
