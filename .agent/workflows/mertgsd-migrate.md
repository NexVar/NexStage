---
description: Database migration workflow with backup plan, rollback SQL, and confirmation gates
---

# MertGSD Migrate — Database Migration with Safety Gates

Plan and execute database migrations safely. Analyzes the current schema, creates migration SQL with rollback, tests the migration, and applies it with explicit user confirmation before any destructive changes.

> **ANTI-HALLUCINATION PROTOCOL -- ACTIVE IN THIS WORKFLOW**
> Database migrations can destroy data permanently. NEVER fabricate schema information -- READ the actual database schema. NEVER assume a migration succeeded -- verify with actual queries. ALWAYS generate rollback SQL BEFORE applying changes.

## Arguments

The user should describe the migration, e.g.:
- `/mertgsd-migrate Add email_verified column to users table`
- `/mertgsd-migrate Rename posts.author to posts.author_id`
- `/mertgsd-migrate Create comments table with foreign key to posts`

If no description provided, ask: "What database change do you need?"

## Multi-Model Safeguard: Migration Safety

**MANDATORY -- regardless of which AI model is running:**

```
MIGRATION RULES:
1. Re-read STATE.md and ROADMAP.md -- understand the project context
2. NEVER apply destructive changes without explicit user confirmation
3. ALWAYS generate rollback SQL BEFORE the forward migration
4. READ the actual current schema -- do NOT assume table structures
5. Test migrations in a safe way before applying to production
6. NEVER drop tables or columns without asking -- even if the plan says to

WARNING: Database migrations are irreversible in practice. A hallucinated
column name or wrong data type can corrupt data permanently.
Destructive operations (DROP, DELETE, TRUNCATE) require explicit user approval.
```

## Steps

### 1. Validate Project

**Actually read** (not recall) `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/`:** "No MertGSD project found. Run /mertgsd-new-project first."

### 2. Detect Database Tool

Check for database tools in order:

```bash
# Check for Prisma
ls prisma/schema.prisma 2>/dev/null

# Check for Drizzle
ls drizzle.config.ts drizzle.config.js 2>/dev/null

# Check for Supabase
ls supabase/config.toml 2>/dev/null

# Check for raw SQL migration directories
ls migrations/ db/migrations/ sql/ 2>/dev/null

# Check package.json for database dependencies
grep -E "(prisma|drizzle|supabase|knex|typeorm|sequelize)" package.json 2>/dev/null
```

| Tool Found | Approach |
|------------|----------|
| `prisma/schema.prisma` | Prisma migrate |
| `drizzle.config.*` | Drizzle Kit |
| `supabase/config.toml` | Supabase migrations (check for MCP availability) |
| Raw SQL directory | Manual SQL migration files |
| Nothing found | Ask user for their database setup |

Display:
```
+--------------------------------------------------+
| MertGSD > DATABASE MIGRATION                         |
+--------------------------------------------------+

Migration: [description]
Tool:      [Prisma / Drizzle / Supabase / Raw SQL]
Database:  [detected from config]
```

### 3. Analyze Current Schema

**Read the actual current schema** -- do NOT rely on memory:

**Prisma:**
```bash
cat prisma/schema.prisma
```

**Drizzle:**
```bash
# Read schema files
find . -path "*/drizzle/*" -name "*.ts" | head -20
# Read the schema definition files
```

**Supabase (if MCP available):**
Use the Supabase MCP to query the current schema.

**Raw SQL:**
```bash
# Read the most recent migration to understand current state
ls -t migrations/*.sql | head -5
```

> **HALLUCINATION GATE:**
> - Did you READ the actual schema file? (not recall it)
> - Are you working with ACTUAL table/column names? (not assumed ones)
> - If you cannot read the schema, STOP and ask the user

Document the current state of affected tables:
```
Current Schema (affected tables):
  [table_name]:
    - [column] [type] [constraints]
    - [column] [type] [constraints]
```

### 4. Plan Migration

Based on the user's request and the ACTUAL current schema, plan the migration:

```
Migration Plan:
  1. [Step description] -- [additive/modification/destructive]
  2. [Step description] -- [additive/modification/destructive]

Classification:
  - Additive:    Adding tables, columns, indexes (safe)
  - Modification: Renaming, changing types (needs care)
  - Destructive:  Dropping tables, columns, data changes (DANGEROUS)
```

**If ANY step is destructive:** Flag it clearly:
```
!! DESTRUCTIVE OPERATION DETECTED !!
Step [N] will [DROP/DELETE/TRUNCATE] [target].
This cannot be undone and may result in data loss.
User confirmation will be required before execution.
```

### 5. Generate Migration Files

**Prisma approach:**

Update `prisma/schema.prisma` with the changes, then:
```bash
npx prisma migrate dev --name [migration-name] --create-only
```

**Read the generated SQL** to verify it matches intent:
```bash
cat prisma/migrations/[timestamp]_[name]/migration.sql
```

**Drizzle approach:**

Update the schema files, then:
```bash
npx drizzle-kit generate --name [migration-name]
```

**Read the generated migration:**
```bash
cat drizzle/[timestamp]_[name].sql
```

**Supabase approach:**
```bash
supabase migration new [migration-name]
```
Write the migration SQL manually into the generated file.

**Raw SQL approach:**

Create migration file:
```bash
# Determine next migration number
NEXT_NUM=$(printf "%04d" $(($(ls migrations/*.sql 2>/dev/null | wc -l) + 1)))
touch migrations/${NEXT_NUM}_[slug].sql
```

Write the forward migration SQL into the file.

### 6. Generate Rollback SQL

**MANDATORY -- create rollback BEFORE applying the migration.**

For each step in the migration, generate the reverse operation:

| Forward Operation | Rollback Operation |
|-------------------|-------------------|
| CREATE TABLE x | DROP TABLE x |
| ADD COLUMN x | ALTER TABLE DROP COLUMN x |
| RENAME COLUMN x TO y | RENAME COLUMN y TO x |
| DROP COLUMN x | ALTER TABLE ADD COLUMN x [type] (data lost) |
| DROP TABLE x | Cannot fully rollback (data lost) |
| ALTER COLUMN type | ALTER COLUMN back to original type |

Create rollback file alongside the migration:

**Prisma:** Create `prisma/migrations/[timestamp]_[name]/rollback.sql`
**Drizzle:** Create `drizzle/[timestamp]_[name]_rollback.sql`
**Raw SQL:** Create `migrations/${NEXT_NUM}_[slug]_rollback.sql`

```sql
-- Rollback for: [migration description]
-- Generated: [date]
-- WARNING: [any data loss warnings]

[rollback SQL statements]
```

**If any step cannot be fully rolled back** (data loss), warn:
```
!! IRREVERSIBLE STEP !!
Step [N] ([description]) cannot be fully rolled back.
Dropping column/table [name] will permanently lose data.
```

### 7. Confirmation Gate

Display the complete migration plan for user review:

```
+--------------------------------------------------+
| MIGRATION REVIEW -- CONFIRMATION REQUIRED        |
+--------------------------------------------------+

Forward Migration:
  [Show the actual SQL that will be executed]

Rollback Available:
  [Show the rollback SQL]

Affected Tables: [list]
Destructive Steps: [count] (or "None")

[If destructive steps exist:]
!! DATA LOSS WARNING !!
The following operations will permanently delete data:
  - [operation description]

Type "apply" to execute this migration.
Type "abort" to cancel.
```

**WAIT for user response. Do NOT proceed without explicit confirmation.**

**If user types "abort" or anything other than "apply":** Cancel the migration. Clean up generated files if requested.

### 8. Apply Migration

**Only after explicit user confirmation:**

**Prisma:**
```bash
npx prisma migrate dev
```

**Drizzle:**
```bash
npx drizzle-kit push
```

**Supabase:**
```bash
supabase db push
```

**Raw SQL:**
```bash
# Execute against the database (method depends on DB type)
# psql, mysql, sqlite3, etc.
```

**READ the full output of the migration command.**

> **HALLUCINATION GATE -- After migration:**
> - Did the migration command actually succeed? (READ the output)
> - Were there any errors or warnings? (do NOT ignore them)
> - If it failed, do NOT claim success

**If migration fails:**
- Display the ACTUAL error output
- "Migration failed. The database may be in a partially migrated state."
- Suggest: "Run the rollback SQL to restore the previous state?"
- Do NOT proceed to verification

### 9. Post-Migration Verification

Verify the migration was applied correctly:

**Prisma:**
```bash
npx prisma db pull --print
```

**General SQL verification:**
```bash
# Verify the new schema matches expectations
# (method depends on database type and tool)
```

Check that the application still works:
```bash
# Type check
npx tsc --noEmit 2>&1

# Build
npm run build 2>&1

# Tests
npm test 2>&1
```

**READ all outputs.** Confirm the migration matches the plan.

```
Post-Migration Verification:
  Schema change applied: [yes/no]
  Type check:            [pass/fail]
  Build:                 [pass/fail]
  Tests:                 [X] passing
```

### 10. Create Summary

Create `.planning/MIGRATION-[date].md`:

```markdown
# Migration: [Description]

**Date:** [date]
**Status:** Applied | Failed | Rolled Back
**Tool:** [Prisma / Drizzle / Supabase / Raw SQL]

## Changes Applied
| Table | Operation | Column | Type | Details |
|-------|-----------|--------|------|---------|
| [table] | ADD COLUMN | [col] | [type] | [constraints] |

## Migration SQL
```sql
[the actual migration SQL]
```

## Rollback SQL
```sql
[the rollback SQL]
```

## Verification
- [x] Schema change confirmed
- [x] Application builds
- [x] Tests pass
- [ ] [Any unchecked items]

## Data Impact
[Description of any data changes, or "No existing data affected"]

---
*Migrated: [date]*
```

### 11. Update STATE.md

**Read and then update** `.planning/STATE.md`:

Add to Migrations section (create if not exists):

```markdown
### Migrations

| Date | Description | Tool | Tables Affected | Rollback Available | Status |
|------|-------------|------|-----------------|--------------------|--------|
| [date] | [description] | [tool] | [tables] | Yes | Applied |
```

Update last activity line.

```bash
git add .planning/STATE.md .planning/MIGRATION-[date].md [migration-files]
git commit -m "migrate: [description]"
```

### 12. Completion

**If migration succeeded:**
```
+--------------------------------------------------+
| MertGSD > MIGRATION COMPLETE                         |
+--------------------------------------------------+

Migration: [description]
Tables:    [affected tables]
Rollback:  Available at [rollback file path]

Summary: .planning/MIGRATION-[date].md

## > Next Up

/mertgsd-execute [N]     -> Continue phase execution
/mertgsd-review          -> Review migration code
```

**If migration failed:**
```
+--------------------------------------------------+
| MertGSD > MIGRATION FAILED                           |
+--------------------------------------------------+

Migration: [description]
Error:     [brief error]
Rollback:  [rollback file path]

To rollback: Run the rollback SQL at [path]
To retry:    Fix the issue and run /mertgsd-migrate again
```
