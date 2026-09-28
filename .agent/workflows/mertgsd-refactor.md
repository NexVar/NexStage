---
description: Safe refactoring workflow with snapshot tests, atomic commits, and rollback strategy
---

# MertGSD Refactor — Safe Refactoring with Rollback

Execute refactoring operations safely. Takes a snapshot of current behavior via tests, performs the refactor in atomic commits, and verifies behavior is preserved. Automatically rolls back if tests fail.

> **ANTI-HALLUCINATION PROTOCOL -- ACTIVE IN THIS WORKFLOW**
> Refactoring is the most dangerous place to hallucinate. A refactor that "looks right" but changes behavior is a bug. Every step MUST verify behavior preservation with ACTUAL test output. Do NOT assume tests pass -- RUN them and READ the output.

## Arguments

The user should describe what to refactor, e.g.:
- `/mertgsd-refactor Extract auth logic from pages into shared hooks`
- `/mertgsd-refactor Rename UserProfile component to ProfileCard across codebase`
- `/mertgsd-refactor Split utils.ts into separate modules`

If no description provided, ask: "What do you want to refactor?"

## Multi-Model Safeguard: Refactor Safety

**MANDATORY -- regardless of which AI model is running:**

```
REFACTOR RULES:
1. Re-read STATE.md and ROADMAP.md -- know where the project is
2. NEVER refactor without tests passing BEFORE you start
3. NEVER skip the post-refactor test run
4. If tests fail after refactor, ROLLBACK -- do NOT fix tests to match new behavior
5. Each refactor step gets its own atomic commit -- easier to bisect and revert
6. READ the actual test output -- do NOT assume tests pass because "nothing changed"

WARNING: The most dangerous refactor hallucination is "behavior is preserved"
when it isn't. Tests are the ONLY proof of preservation.
```

## Steps

### 1. Validate Project

**Actually read** (not recall) `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/`:** "No MertGSD project found. Run /mertgsd-new-project first."

Ensure working tree is clean:
```bash
git status --porcelain
```

**If dirty:** "Uncommitted changes detected. Commit or stash before refactoring."

Record the rollback point:
```bash
ROLLBACK_HASH=$(git rev-parse HEAD)
echo "Rollback point: $ROLLBACK_HASH"
```

### 2. Pre-Refactor Test Snapshot

**Run the full test suite BEFORE any changes:**

```bash
# Detect test runner
if [ -f "vitest.config.ts" ] || [ -f "vitest.config.js" ]; then
  npx vitest run 2>&1
elif [ -f "jest.config.ts" ] || [ -f "jest.config.js" ] || grep -q '"jest"' package.json 2>/dev/null; then
  npx jest 2>&1
elif grep -q '"test"' package.json 2>/dev/null; then
  npm test 2>&1
else
  echo "NO_TEST_RUNNER"
fi
```

**READ the actual test output.**

**If tests fail BEFORE refactor:**
- "Tests are already failing before refactoring. Fix existing test failures first."
- Display the failing tests
- Do NOT proceed

**If no test runner found:**
- Warn: "No test suite detected. Refactoring without tests is risky."
- Ask: "Proceed without tests? (Type check and build will still be verified)"
- If user declines, stop

Record pre-refactor results:
```
Pre-refactor snapshot:
  Tests:    [X] passed, [Y] failed, [Z] skipped
  Duration: [time]
```

Also run type check and build as baseline:
```bash
# Type check (if TypeScript)
npx tsc --noEmit 2>&1

# Build check
npm run build 2>&1
```

**READ both outputs.** Record pass/fail status.

Display:
```
+--------------------------------------------------+
| MertGSD > REFACTOR -- PRE-CHECK COMPLETE             |
+--------------------------------------------------+

Refactor: [description]
Tests:    [X] passing
Types:    [pass/fail]
Build:    [pass/fail]
Rollback: [ROLLBACK_HASH]

Proceeding with refactor...
```

### 3. Identify Scope

**Read the files** that will be affected by the refactor:

```bash
# List files that match the refactor scope
# (this varies by refactor type -- search for relevant patterns)
```

For each file in scope:
1. **READ the file** -- do not work from memory
2. Note what will change
3. Note what must be preserved (exports, interfaces, behavior)
4. Check for consumers/importers:
   ```bash
   grep -r "import.*from.*[module-name]" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
   ```

Create a refactor plan:
```
Refactor Scope:
  Files to modify: [list]
  Files to create:  [list]
  Files to delete:  [list]
  Importers to update: [list]
```

### 4. Execute Refactor

Execute the refactor in atomic steps. Each step gets its own commit.

**For each refactor step:**

1. **Re-read the target file(s)** before modifying
2. Make the change
3. Update all importers/consumers
4. **Run the verification suite:**
   ```
   VERIFICATION SUITE (run ALL applicable):
   - Type check:  tsc --noEmit (if TypeScript)
   - Lint:        eslint/biome check (if configured)
   - Tests:       full test suite
   - Build:       npm run build
   ```
5. **READ every verification output**
6. **If ALL pass:** Commit atomically:
   ```bash
   git add [specific-files]
   git commit -m "refactor: [what this step did]"
   ```
7. **If ANY check fails:** Go to Rollback (Step 5)

Report each step:
```
Step [N]: [What was done]
  Types: pass | Tests: [X] passing | Build: pass
  Committed: [hash]
```

> **HALLUCINATION GATE -- After each refactor step:**
> - Did you RUN the tests? (not just plan to)
> - Did you READ the output? (not assume it passed)
> - Does the test count MATCH the pre-refactor count? (no tests silently dropped)
> - Did the same tests pass? (not different tests)
> - If ANY doubt, re-run and re-read before proceeding

### 5. Rollback (If Tests Fail)

**If any verification fails after a refactor step:**

```bash
# Show what failed
echo "REFACTOR FAILED -- initiating rollback"

# Reset to rollback point
git reset --hard $ROLLBACK_HASH
```

Display:
```
+--------------------------------------------------+
| MertGSD > REFACTOR ROLLED BACK                       |
+--------------------------------------------------+

Step that failed: [step description]
Failure:          [what failed -- type check / tests / build]
Error:            [actual error output]
Rolled back to:   [ROLLBACK_HASH]

The codebase is restored to its pre-refactor state.
No changes were kept.
```

Ask user: "Would you like to try a different approach, or abandon this refactor?"

Do NOT proceed to Steps 6-8.

### 6. Post-Refactor Verification

After all refactor steps complete successfully, run the full suite one final time:

```bash
# Full test suite
[test-command] 2>&1

# Type check
npx tsc --noEmit 2>&1

# Build
npm run build 2>&1
```

**READ all outputs.** Compare against pre-refactor snapshot:

```
Behavior Comparison:
  Pre-refactor:  [X] tests passed
  Post-refactor: [X] tests passed
  Tests dropped: [count] (MUST be 0)
  New failures:  [count] (MUST be 0)
  Types:         [pass/fail]
  Build:         [pass/fail]
```

**If test count decreased:** "WARNING: [N] tests were lost during refactoring. This may indicate deleted functionality."
**If new failures:** Initiate rollback (Step 5).

### 7. Create Summary

Create `.planning/REFACTOR-[date].md`:

```markdown
# Refactor: [Description]

**Date:** [date]
**Status:** Complete | Rolled Back
**Commits:** [count]
**Rollback point:** [hash]

## What Was Refactored
[Description of the refactoring -- based on ACTUAL changes made]

## Steps Taken
| # | Step | Files Changed | Commit |
|---|------|--------------|--------|
| 1 | [description] | [files] | [hash] |
| 2 | [description] | [files] | [hash] |

## Behavior Verification
| Check | Pre-Refactor | Post-Refactor | Status |
|-------|-------------|---------------|--------|
| Tests passing | [X] | [X] | Match |
| Type check | pass | pass | Match |
| Build | pass | pass | Match |

## Files Changed
| File | Action | What Changed |
|------|--------|-------------|
| [path] | Modified | [description] |
| [path] | Created | [description] |
| [path] | Deleted | [replaced by X] |

---
*Refactored: [date]*
```

### 8. Update STATE.md

**Read and then update** `.planning/STATE.md`:

Add to Refactors section (create if not exists):

```markdown
### Refactors

| Date | Description | Commits | Tests Before | Tests After | Status |
|------|-------------|---------|-------------|-------------|--------|
| [date] | [description] | [count] | [X] pass | [X] pass | Complete |
```

Update last activity line.

```bash
git add .planning/STATE.md .planning/REFACTOR-[date].md
git commit -m "docs: refactor complete — [description]"
```

### 9. Completion

```
+--------------------------------------------------+
| MertGSD > REFACTOR COMPLETE                          |
+--------------------------------------------------+

Refactor:    [description]
Steps:       [count] atomic commits
Tests:       [X] passing (matched pre-refactor)
Types:       pass
Build:       pass

Summary: .planning/REFACTOR-[date].md

## > Next Up

/mertgsd-review          -> Review the refactored code
/mertgsd-execute [N]     -> Continue execution
```
