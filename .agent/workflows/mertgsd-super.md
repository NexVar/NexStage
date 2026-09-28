---
description: Fully autonomous AI execution — from prompt to production with zero human input
---

# MertGSD Super — Full Autonomous Execution Mode

The AI takes over. Give it a prompt or PRD, answer a few setup questions, then walk away. It builds from MVP to production-ready by running all MertGSD phases autonomously — planning, executing, testing, debugging, and deploying.

> **⚡ THIS IS FULL AUTONOMY MODE**
> After the initial interview, the AI runs ALL phases on its own:
> discuss → plan → execute → verify → ship
> With built-in hallucination loop detection, browser testing, and self-debugging.

---

## Arguments

The user provides a prompt, description, or PRD:
```
/mertgsd-super Build a task management app with Next.js and Prisma
/mertgsd-super [paste detailed PRD here]
```

If no description provided, ask: "What do you want me to build? Give me a one-liner or paste a detailed PRD."

**PRD Parsing Protocol:**
```
IF input is a one-liner:
  → Expand into internal PRD by asking follow-up questions
  → Confirm expanded understanding with user

IF input is a full PRD:
  → Parse and extract:
    • Core features (MUST have)
    • Nice-to-have features (SHOULD have)
    • Constraints (tech, budget, timeline)
    • Target users
    • Success criteria
  → Summarize back to user for confirmation

IF input is ambiguous:
  → Do NOT guess. Ask specific clarifying questions:
    "You said 'social features' — do you mean:
     a) User profiles + follow system
     b) Comments + reactions
     c) Real-time chat
     d) All of the above?"
```

---

## Stage 1 — Context Detection (Automatic)

Detect the project state BEFORE doing anything else:

### 1.1 Project State Detection
```
DETECT PROJECT STATE:

IF directory contains existing source files (not just .git or config):
  ┌─────────────────────────────────────────────────────┐
  │  EXISTING PROJECT DETECTED                          │
  │                                                     │
  │  1. git checkout -b mertgsd-super/[feature-name]        │
  │  2. NEVER delete existing files                     │
  │  3. NEVER modify existing files without explicit    │
  │     instruction in the PRD                          │
  │  4. Treat as enhancement/addition                   │
  │                                                     │
  │  Tell user: "Existing project detected. Working on  │
  │  branch mertgsd-super/[name]. Your main branch is safe."│
  └─────────────────────────────────────────────────────┘

IF directory is empty or new:
  ┌─────────────────────────────────────────────────────┐
  │  NEW PROJECT DETECTED                               │
  │                                                     │
  │  1. Work on main branch                             │
  │  2. Initialize git if not already                   │
  │  3. Full new project creation                       │
  │                                                     │
  │  Tell user: "New project. Building from scratch     │
  │  on main branch."                                   │
  └─────────────────────────────────────────────────────┘
```

### 1.2 Existing Codebase Analysis (For Existing Projects)

Before planning, analyze the existing codebase:
```
CODEBASE ANALYSIS:
1. Directory structure scan — understand project layout
2. Package.json / requirements.txt / go.mod → identify stack + deps
3. Config files → identify build tools, linters, formatters
4. README.md → understand project purpose
5. Git log (last 20 commits) → understand recent activity
6. Key source files → understand patterns, naming, architecture

OUTPUT: Internal CODEBASE-MAP.md containing:
  - Tech stack (language, framework, DB, hosting)
  - Project structure with key directories explained
  - Coding patterns (naming conventions, error handling style)
  - Existing test setup (framework, coverage)
  - Build/deploy pipeline
  - Key abstractions (services, models, controllers)
```

### 1.3 Environment Detection
```
ENVIRONMENT SCAN:
1. Check Node.js / Python / Go / Rust version
2. Check package manager (npm, yarn, pnpm, bun)
3. Check for .env files → identify required env vars
4. Check for Docker → note containerization
5. Check for CI/CD configs → note existing pipelines
6. Check available ports → find free port for dev server

OUTPUT: Environment context saved to internal state
```

---

## Stage 2 — The Interview (Before ANY autonomous work)

> **🛡️ ANTI-HALLUCINATION: The Interview is the quality guarantee.**
> All user input is captured HERE. Everything after this is autonomous.
> Record answers VERBATIM. Do NOT paraphrase or "improve" user responses.

Ask these questions in a natural conversation (not a form). Adapt based on answers — skip irrelevant questions, dig deeper on critical ones.

### Required Questions

**Q1: Understanding the Build**
```
"I've read your [prompt/PRD]. Here's what I understand you want:
[Summarize in 3-5 bullet points]

Is this accurate? Anything to add or correct?"
```
→ If user corrects, re-summarize until they confirm.

**Q2: Autonomy Mode**
```
"How much control do you want during the build?

  A) FULL AUTONOMY — I run until it's done. You check the final result.
     Best for: small-medium projects, when you trust the process.
     
  B) MILESTONE PAUSES — I complete each phase, show you results, 
     then continue unless you intervene.
     Best for: larger projects, when you want oversight without micromanagement.
     
  C) CUSTOM — Tell me exactly where you want me to pause.
     Example: 'Pause after the database schema' or 
     'Ask me before building the payment flow'
     Best for: projects with critical sections that need your eye.

Which mode?"
```

**Q3: Approval Gates**
```
"For the project roadmap and requirements:

  1) I decide everything — you trust my judgment
  2) Show me the roadmap first — you approve before I start building

Which approach?"
```

**Q4: Testing Mode**
```
"How should I verify my work as I build?

  A) VISUAL — I open the app in the browser, click through,
     take screenshots, verify it looks and works right
  B) AUTOMATED — I write and run test suites 
     (unit, integration, e2e)
  C) BOTH — Visual browser testing + automated test suites
     (recommended for production quality)

Which mode?"
```

**Q5: Tech Stack** (if not specified in PRD)
```
"Any tech stack preferences? Or should I choose what's best for this project?

Examples: 'Next.js + Tailwind + Prisma + PostgreSQL'
          'You decide'
          'React frontend, whatever backend you think works'

If you have preferences for any part, tell me. I'll fill in the rest."
```

**Q6: Deployment Target**
```
"Where should I deploy the finished product?

  - Vercel (best for Next.js, React)
  - Netlify (best for static/Jamstack)
  - Railway (best for full-stack with databases)
  - Fly.io (best for containerized apps)
  - Other: [specify]
  - Don't deploy — just build it locally

Where?"
```

**Q7: Quality Bar**
```
"What quality level are you expecting?

  1) MVP — Functional, works correctly, clean code, 
     but minimal visual polish and no CI/CD
     
  2) PRODUCTION — Everything in MVP, plus:
     → Polished UI with animations and responsive design
     → Comprehensive error handling and loading states
     → Full test suite with good coverage
     → CI/CD pipeline (GitHub Actions)
     → Documentation (README, inline comments, API docs)
     → Performance optimization
     → Security best practices
     → SEO (if web app)

Which level?"
```

### Conditional Questions (ask only if relevant)

**Q8: Database** (if project needs data persistence)
```
"For the database:
  - SQLite (simple, no setup)
  - PostgreSQL (production-grade, recommended)
  - MySQL
  - MongoDB (if document-oriented data)
  - Supabase (PostgreSQL + auth + realtime, hosted)
  - Use whatever fits best

Which database?"
```

**Q9: Authentication** (if project has users)
```
"For user authentication:
  - NextAuth.js / Auth.js (if Next.js)
  - Clerk (hosted, minimal code)
  - Supabase Auth
  - Custom (email/password with bcrypt + JWT)
  - No auth needed

Which approach?"
```

**Q10: Design System** (if project has UI)
```
"For the UI design:
  - Tailwind CSS (utility-first, most flexible)
  - shadcn/ui (Tailwind + Radix, beautiful defaults)
  - Material UI (Google's design system)
  - Chakra UI (accessible, composable)
  - Vanilla CSS (maximum control)
  - You decide based on the project

Any preference?"
```

**Q11: Special Integrations** (if PRD mentions external services)
```
"I noticed your PRD mentions [external service/API].
Do you have API keys ready, or should I:
  a) Build with mock data and you'll add keys later
  b) Wait for you to provide keys now
  c) Use a free tier / sandbox environment"
```

**Q_ntfy: Bildirim (opsiyonel)**
"ntfy bildirimi almak ister misiniz? Kanal adini girin veya Enter ile atlayin."
-> Verilmisse tum fazlarda, deploy'da ve hata durumunda bildirim gonderilir.
-> Atlanirsa sessiz calisilir.

### After Interview: Confirm and Lock

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MertGSD SUPER ► CONFIGURATION LOCKED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project:      [name from PRD/prompt]
Mode:         [A/B/C] — [full/milestone/custom]
Approval:     [AI decides / Human approves roadmap]
Testing:      [Visual / Automated / Both]
Stack:        [full stack details]
Database:     [choice]
Auth:         [choice]
UI:           [choice]
Deploy to:    [target]
Quality:      [MVP / Production]
Custom stops: [if mode C, list pause points]
Integrations: [any external services + key status]

⚡ Starting autonomous execution. I'll notify you when done.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Save this configuration to `.planning/SUPER-CONFIG.md` for reference during execution.

---

## Stage 3 — Plan Generation (Autonomous)

> **🛡️ ANTI-HALLUCINATION: Research before planning.**
> Do NOT generate plans from training data alone.
> Use read_url_content and search_web to verify all technical decisions.

### 3.1 Auto-Generate Project Files

Run the equivalent of `/mertgsd-new-project` autonomously:

```
PROJECT FILE GENERATION:
1. Create .planning/ directory structure
2. Create .planning/PROJECT.md:
   - From PRD/prompt + interview answers
   - Include decided stack, constraints, success criteria
3. Research the domain:
   - search_web: "[project type] best practices 2024"
   - search_web: "[chosen framework] project structure"
   - read_url_content: official docs for chosen stack
   - Record all sources with timestamps
4. Create .planning/REQUIREMENTS.md:
   - v1 features (from PRD core features)
   - v2 features (from PRD nice-to-haves)
   - Out of scope (explicitly stated)
   - Non-functional requirements (performance, security, accessibility)
5. Create .planning/ROADMAP.md:
   - Phases ordered by dependencies
   - Each phase: name, description, estimated tasks
   - Dependencies between phases mapped
6. Create .planning/STATE.md:
   - Current phase: 1
   - Mode: [from interview]
   - Build status: starting
7. Create .planning/SUPER-CONFIG.md:
   - Full interview answers
   - Locked configuration
```

**If approval mode = "Human approves roadmap":**
```
PAUSE:
  - Show roadmap to user
  - Show requirement splits (v1/v2/out-of-scope)
  - Wait for approval
  - If user requests changes → update and re-present
  - If approved → continue
```

**If approval mode = "AI decides":**
```
  - Continue immediately to planning
```

### 3.2 Auto-Scaffold Project

Before planning phases, set up the project skeleton:

```
PROJECT SCAFFOLDING (new projects only):

1. Initialize project:
   - npm init / npx create-next-app / equivalent
   - Configure TypeScript (if applicable)
   - Install core dependencies

2. Set up development tooling:
   - ESLint / Biome configuration
   - Prettier / formatting config
   - Git hooks (husky + lint-staged if production quality)
   - .gitignore
   - .env.example

3. Create base structure:
   - Directory layout matching chosen architecture
   - Base configuration files
   - Global styles / theme setup
   - Layout components (if UI project)

4. Verify scaffold:
   - npm run dev → starts without errors
   - npm run build → builds successfully
   - npm run lint → no lint errors
   
5. COMMIT: "chore: initialize project scaffold"
```

### 3.3 Auto-Plan All Phases

For each phase in the roadmap:

```
PHASE PLANNING:
1. Auto-generate CONTEXT.md:
   - Make reasonable decisions for gray areas
   - Document each decision as AI-SUGGESTED
   - If Mode B/C: note decisions for user review

2. Run research for the phase:
   - search_web: relevant implementation patterns
   - read_url_content: library docs, API references
   - Verify: selected libraries exist and are maintained
   - Verify: API endpoints are real and documented
   - Tag research: HIGH/MEDIUM/LOW confidence

3. Create task plans with FULL detail (model-resilience level):

   FOR each task in the phase:
   ┌─────────────────────────────────────────────────────┐
   │  <task type="[auto/manual]" wave="[N]">             │
   │    <name>[Specific descriptive name]</name>         │
   │    <files>[Exact file paths]</files>                │
   │    <depends>[Task IDs this depends on]</depends>    │
   │    <action>                                         │
   │      STEP-BY-STEP instructions:                     │
   │      1. [Exact import statements]                   │
   │      2. [Exact function signatures with types]      │
   │      3. [Logic flow with edge cases]                │
   │      4. [Error handling specifics]                   │
   │      5. [Integration points with other files]       │
   │                                                     │
   │      STYLE REFERENCE:                               │
   │      Match patterns from: [existing file path]      │
   │      Naming convention: [camelCase/PascalCase/etc]  │
   │      Error handling style: [try-catch/Result/etc]   │
   │    </action>                                        │
   │    <verify>[Exact command to verify]</verify>       │
   │    <done>[Observable completion criteria]</done>     │
   │  </task>                                            │
   └─────────────────────────────────────────────────────┘

4. Verify plans against requirements:
   - Every v1 requirement maps to at least one task
   - No orphaned tasks (tasks that don't serve a requirement)
   - Dependencies are correctly ordered
   - Wave assignments make sense (no circular deps)
```

### 3.4 Dependency Resolution

```
DEPENDENCY MANAGEMENT:
Before starting execution, verify all dependencies are compatible:

1. Check for version conflicts:
   - npm ls (or equivalent) — check for peer dep warnings
   - Resolve any version conflicts BEFORE writing code

2. Check for deprecated packages:
   - search_web: "[package name] deprecated alternative"
   - Replace deprecated packages with maintained alternatives

3. Lock versions:
   - Use exact versions in package.json (not ^)
   - Generate lockfile (package-lock.json)
   
4. Verify dependency security:
   - npm audit (or equivalent)
   - Address HIGH/CRITICAL vulnerabilities
   - Document any accepted risks
```

---

## Stage 4 — Execution Loop (Autonomous)

> **⚡ THIS IS WHERE THE AI TAKES FULL CONTROL**
> The loop runs until all phases are complete or it gets stuck.

### 4.1 Phase Execution Flow

```
FOR each phase in ROADMAP:

  ┌─────────────────────────────────────────────────────────────┐
  │  PHASE [N]: [Phase Name]                                    │
  ├─────────────────────────────────────────────────────────────┤
  │                                                             │
  │  PRE-PHASE:                                                 │
  │  0. Ensure `dev` branch exists and is checked out:          │
  │     - if missing: git checkout -b dev                       │
  │     - else: git checkout dev                                │
  │  1. Re-read ALL planning files from disk:                   │
  │     - STATE.md (current position)                           │
  │     - ROADMAP.md (phase details)                            │
  │     - SUPER-CONFIG.md (user preferences)                    │
  │     - Phase CONTEXT.md (design decisions)                   │
  │     - Phase RESEARCH.md (verified technical info)           │
  │     - All PLAN.md files for this phase                      │
  │  2. Style anchor from existing code in same directory       │
  │  3. Start dev server if not running                         │
  │                                                             │
  │  TASK EXECUTION:                                            │
  │  FOR each wave in phase:                                    │
  │    FOR each task in wave (sequential):                      │
  │                                                             │
  │      a. Re-read the specific PLAN.md                        │
  │      b. Re-read files being modified                        │
  │      c. Write code following plan instructions exactly      │
  │      d. Run VERIFICATION SUITE (see 4.2)                    │
  │      e. If fails → AUTO-DEBUG (see 4.4)                     │
  │      f. If passes → atomic git commit                       │
  │      g. Run BROWSER TESTING if applicable (see 4.3)         │
  │      h. Update progress tracker                             │
  │                                                             │
  │  POST-PHASE:                                                │
  │  1. Self-verify against phase requirements                  │
  │  2. Create SUMMARY.md for the phase                         │
  │  3. Update STATE.md                                         │
  │  4. Run QUALITY GATES (see 4.5)                             │
  │  5. Generate PROGRESS REPORT (see 4.6)                      │
  │  6. Auto-sync phase commit to dev (no prompt):              │
  │     git add -A                                              │
  │     git commit --allow-empty -m "MertGSD: phase complete -      │
  │       $(date +%H:%M)"                                       │
  │     git push -u origin dev                                  │
  │                                                             │
  │  CHECKPOINT:                                                │
  │  Mode A: Continue to next phase                             │
  │  Mode B: Pause → show progress report → wait for user       │
  │  Mode C: Pause if at user-defined stop point                │
  │                                                             │
  └─────────────────────────────────────────────────────────────┘
```

### 4.2 Verification Suite

Run after EVERY task completion:

```
VERIFICATION SUITE:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  TIER 1 — SYNTAX & TYPES (always run)                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ File saved without syntax errors                 │    │
│  │  ✓ tsc --noEmit (if TypeScript)                     │    │
│  │  ✓ No import/require errors                         │    │
│  │  ✓ All referenced variables/functions exist         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  TIER 2 — LINT & FORMAT (always run)                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ eslint / biome check (if configured)             │    │
│  │  ✓ prettier --check (if configured)                 │    │
│  │  ✓ No unused imports/variables                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  TIER 3 — TESTS (always run)                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ Run affected test files                          │    │
│  │  ✓ Run full test suite if integration task          │    │
│  │  ✓ No test regressions (previously passing tests    │    │
│  │    must still pass)                                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  TIER 4 — BUILD (run every 3rd task or end of wave)         │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ npm run build (or equivalent)                    │    │
│  │  ✓ No build warnings treated as errors              │    │
│  │  ✓ Bundle size reasonable (flag if > 500KB)         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  TIER 5 — PLAN VERIFICATION (always run)                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ Task's <verify> command passes                   │    │
│  │  ✓ Task's <done> criteria met                       │    │
│  │  ✓ No unintended side effects on other features     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ALL TIERS PASS → COMMIT                                    │
│  ANY TIER FAILS → AUTO-DEBUG                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Browser Testing Protocol

**Visual Testing Mode:**
```
VISUAL TESTING PROTOCOL:

PRE-TEST:
1. Ensure dev server is running
2. Wait for compilation to complete (watch for "ready" message)
3. Clear browser cache/state

TEST EXECUTION:
FOR each feature built in this phase:
  ┌─────────────────────────────────────────────────────┐
  │  FEATURE: [Feature Name]                            │
  │                                                     │
  │  1. Navigate to relevant page/route                 │
  │  2. SCREENSHOT: Initial state ("before interaction")│
  │  3. Test happy path:                                │
  │     - Fill forms with valid data                    │
  │     - Click buttons, navigate links                 │
  │     - SCREENSHOT: After each key interaction        │
  │  4. Test error states:                              │
  │     - Empty form submission                         │
  │     - Invalid data                                  │
  │     - Network errors (if applicable)                │
  │     - SCREENSHOT: Error states visible              │
  │  5. Test edge cases:                                │
  │     - Very long text inputs                         │
  │     - Special characters                            │
  │     - Rapid clicking                                │
  │  6. Check responsive layout:                        │
  │     - Resize to mobile width (375px)                │
  │     - Resize to tablet width (768px)                │
  │     - SCREENSHOT: Mobile and tablet views           │
  │  7. Check visual quality:                           │
  │     - Alignment and spacing consistent              │
  │     - Colors match design system                    │
  │     - Typography hierarchy clear                    │
  │     - Loading states present                        │
  │     - Empty states handled gracefully               │
  │                                                     │
  │  RESULT: PASS or FAIL with specific issue           │
  └─────────────────────────────────────────────────────┘

POST-TEST:
- If PASS → continue
- If FAIL → auto-fix → re-test (max 3 attempts per issue)
- Save all screenshots to .planning/screenshots/phase-[N]/
```

**Automated Testing Mode:**
```
AUTOMATED TESTING PROTOCOL:

FOR each task completed:

  UNIT TESTS:
  ┌─────────────────────────────────────────────────────┐
  │  For each new function/method:                      │
  │  1. Test happy path with expected inputs            │
  │  2. Test edge cases (null, undefined, empty)        │
  │  3. Test error cases (invalid input)                │
  │  4. Test boundary values                            │
  │  5. Mock external dependencies                      │
  └─────────────────────────────────────────────────────┘

  INTEGRATION TESTS (for API endpoints):
  ┌─────────────────────────────────────────────────────┐
  │  1. Test request/response contract                  │
  │  2. Test authentication/authorization               │
  │  3. Test validation errors                          │
  │  4. Test database operations (with test DB)         │
  │  5. Test concurrent requests if applicable          │
  └─────────────────────────────────────────────────────┘

  COMPONENT TESTS (for UI components):
  ┌─────────────────────────────────────────────────────┐
  │  1. Renders without crashing                        │
  │  2. Renders correct content                         │
  │  3. Handles user interactions                       │
  │  4. Shows loading/error/empty states                │
  │  5. Accessibility: proper ARIA labels               │
  └─────────────────────────────────────────────────────┘

  COVERAGE TARGET:
  - MVP quality: >50% on new code
  - Production quality: >80% on new code
  - Critical paths (auth, payments): >90%
```

**If Both:** Run automated first, then visual. Both must pass.

### 4.4 Auto-Debug Protocol

When a task fails (build error, test failure, visual issue):

```
AUTO-DEBUG FLOW:

STEP 1 — DIAGNOSE:
┌─────────────────────────────────────────────────────────────┐
│  1. Read the ACTUAL error from terminal output              │
│     (NEVER from memory — re-read the terminal)              │
│  2. Read the ACTUAL file content that caused the error      │
│     (NEVER from memory — re-read the file)                  │
│  3. Classify the error:                                     │
│     a. SYNTAX — missing bracket, typo, import error         │
│     b. TYPE — type mismatch, missing property               │
│     c. LOGIC — wrong behavior, test assertion failure       │
│     d. RUNTIME — crash, unhandled exception                 │
│     e. ENVIRONMENT — missing dep, config issue              │
│     f. INTEGRATION — API contract mismatch                  │
└─────────────────────────────────────────────────────────────┘

STEP 2 — FIX:
┌─────────────────────────────────────────────────────────────┐
│  Based on classification:                                   │
│                                                             │
│  SYNTAX/TYPE:                                               │
│  → Direct fix. These are straightforward.                   │
│  → Re-read relevant type definitions before fixing          │
│                                                             │
│  LOGIC:                                                     │
│  → Re-read the PLAN.md for intended behavior                │
│  → Compare actual vs expected behavior                      │
│  → Fix the logic gap                                        │
│                                                             │
│  RUNTIME:                                                   │
│  → Add proper error handling                                │
│  → Check for null/undefined access                          │
│  → Verify async/await usage                                 │
│                                                             │
│  ENVIRONMENT:                                               │
│  → Install missing dependency                               │
│  → Fix configuration                                        │
│  → Check compatibility versions                             │
│                                                             │
│  INTEGRATION:                                               │
│  → Re-read the API documentation (read_url_content)         │
│  → Verify request/response format                           │
│  → Check authentication requirements                        │
└─────────────────────────────────────────────────────────────┘

STEP 3 — VERIFY:
  → Re-run the FULL verification suite
  → If passes → commit the fix
  → If fails → track attempt and continue to STEP 4

STEP 4 — ATTEMPT TRACKING:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  attempts = []                                              │
│                                                             │
│  FOR each fix attempt:                                      │
│    Record: {                                                │
│      error_message: "[exact error text]",                   │
│      error_type: "[SYNTAX/TYPE/LOGIC/RUNTIME/ENV/INT]",     │
│      approach: "[what I tried]",                            │
│      result: "[still failing / new error / partial fix]",   │
│      files_modified: ["file1.ts", "file2.ts"],              │
│      timestamp: "[ISO timestamp]"                           │
│    }                                                        │
│    Add to attempts[]                                        │
│                                                             │
│  ESCALATION RULES:                                          │
│                                                             │
│  ┌─────────────────────────────────────┐                    │
│  │ SAME ERROR 3+ TIMES                │                    │
│  │                                     │                    │
│  │ ⚠️ Current approach is WRONG.     │                    │
│  │ → STOP current approach             │                    │
│  │ → Try FUNDAMENTALLY different:      │                    │
│  │   • Different library               │                    │
│  │   • Different architecture pattern  │                    │
│  │   • Simpler implementation          │                    │
│  │   • Remove feature temporarily      │                    │
│  │   • Different API/endpoint          │                    │
│  │   • Rewrite from scratch            │                    │
│  └─────────────────────────────────────┘                    │
│                                                             │
│  ┌─────────────────────────────────────┐                    │
│  │ 5 DIFFERENT APPROACHES ALL FAIL    │                    │
│  │                                     │                    │
│  │ 🛑 STUCK — NOTIFY USER             │                    │
│  │ → Stop autonomous execution         │                    │
│  │ → Show user:                        │                    │
│  │   "I'm stuck on [specific problem]. │                    │
│  │    Here's what I tried:             │                    │
│  │    1. [approach 1] → [result]       │                    │
│  │    2. [approach 2] → [result]       │                    │
│  │    3. [approach 3] → [result]       │                    │
│  │    4. [approach 4] → [result]       │                    │
│  │    5. [approach 5] → [result]       │                    │
│  │                                     │                    │
│  │    Relevant files:                  │                    │
│  │    [list files involved]            │                    │
│  │                                     │                    │
│  │    My best guess: [hypothesis]      │                    │
│  │    I need your input to proceed."   │                    │
│  │                                     │                    │
│  │ → Wait for user guidance            │                    │
│  │ → Resume autonomous execution       │                    │
│  │   after guidance                    │                    │
│  └─────────────────────────────────────┘                    │
│                                                             │
│  ┌─────────────────────────────────────┐                    │
│  │ HALLUCINATION LOOP DETECTED         │                    │
│  │                                     │                    │
│  │ Signs of a loop:                    │                    │
│  │ • Writing same code already written │                    │
│  │ • Reverting a fix already applied   │                    │
│  │ • Going in circles (A→B→A→B)       │                    │
│  │ • Same test passing then failing    │                    │
│  │ • Adding then removing same import  │                    │
│  │                                     │                    │
│  │ RESPONSE:                           │                    │
│  │ → STOP immediately                  │                    │
│  │ → Re-read ALL relevant files        │                    │
│  │ → Clear internal assumptions        │                    │
│  │ → Start task fresh with clean state │                    │
│  │ → If still stuck → NOTIFY USER      │                    │
│  └─────────────────────────────────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.5 Quality Gates

Run at the end of each phase:

```
QUALITY GATES:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  GATE 1 — FUNCTIONAL COMPLETENESS                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  FOR each requirement mapped to this phase:         │    │
│  │    ✓ Is there code implementing it?                 │    │
│  │    ✓ Does it work correctly? (verified via tests)   │    │
│  │    ✓ Are edge cases handled?                        │    │
│  │  Score: X/Y requirements complete                   │    │
│  │  Threshold: 100% for MVP, 100% for Production      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  GATE 2 — CODE QUALITY                                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ No type errors                                   │    │
│  │  ✓ No lint errors                                   │    │
│  │  ✓ No console.log/debug statements in production    │    │
│  │  ✓ No hardcoded secrets or credentials              │    │
│  │  ✓ No TODO comments for committed features          │    │
│  │  ✓ Consistent naming conventions                    │    │
│  │  ✓ Functions < 50 lines (or justified)              │    │
│  │  ✓ Files < 300 lines (or justified)                 │    │
│  │  Threshold: All checks pass                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  GATE 3 — TEST COVERAGE (if automated testing)              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ Test coverage on new code meets target           │    │
│  │  ✓ All tests passing                                │    │
│  │  ✓ No test regressions from previous phases         │    │
│  │  Threshold: MVP >50%, Production >80%               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  GATE 4 — BUILD HEALTH                                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ Clean build (no errors, no warnings)             │    │
│  │  ✓ Bundle size within limits                        │    │
│  │  ✓ No circular dependencies                         │    │
│  │  Threshold: All checks pass                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  GATE 5 — SECURITY (production quality only)                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ✓ No secrets in source code                        │    │
│  │  ✓ Input validation on all user inputs              │    │
│  │  ✓ SQL injection prevention (parameterized queries) │    │
│  │  ✓ XSS prevention (output encoding)                 │    │
│  │  ✓ CSRF protection (if forms)                       │    │
│  │  ✓ Authentication checks on protected routes        │    │
│  │  ✓ Rate limiting on API endpoints                   │    │
│  │  Threshold: All checks pass                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ALL GATES PASS → PROCEED TO NEXT PHASE                     │
│  ANY GATE FAILS → FIX BEFORE PROCEEDING                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.6 Progress Reporting

Track and report progress throughout execution:

```
PROGRESS TRACKER:
Save to .planning/SUPER-PROGRESS.md and update after each task:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MertGSD SUPER ► PROGRESS REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall: ██████░░░░ 60% (Phase 3/5)

Phase 1: Foundation          ✅ COMPLETE (8/8 tasks)
Phase 2: Core Features       ✅ COMPLETE (12/12 tasks)
Phase 3: User Interface      🔄 IN PROGRESS (5/10 tasks)
  └─ Current: Task 3-06 "Create dashboard layout"
  └─ Status: Writing code...
Phase 4: API Integration     ⏳ PENDING
Phase 5: Polish & Deploy     ⏳ PENDING

Commits: 25
Tests: 47 passing / 47 total
Build: ✅ Clean
Uptime: 45 minutes
Debug events: 3 (all resolved)
Stuck events: 0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4.7 Rollback Protocol

When things go seriously wrong:

```
ROLLBACK PROTOCOL:

TRIGGER: Multiple tasks in a phase failing, quality gates failing repeatedly

LEVEL 1 — TASK ROLLBACK:
  → git revert [last commit]
  → Re-read plan
  → Try task again with fresh approach

LEVEL 2 — WAVE ROLLBACK:
  → git revert to before wave started
  → Re-plan the wave with different approach
  → Re-execute

LEVEL 3 — PHASE ROLLBACK:
  → git revert to before phase started  
  → Analyze what went wrong
  → Re-plan entire phase
  → Re-execute

LEVEL 4 — FULL STOP:
  → Preserve all work on branch
  → Notify user with full diagnostic:
    "Phase [N] is not working after [X] attempts.
     The branch has all my work preserved.
     Core issue: [specific problem]
     Recommended action: [suggestion]"
  → Wait for user input

RULE: Never delete commits. Always use git revert, never git reset --hard.
      The full history of attempts is valuable for debugging.
```

### 4.8 Performance Monitoring (Production Quality Only)

```
PERFORMANCE CHECKS (after each phase):

WEB APP:
┌─────────────────────────────────────────────────────┐
│  1. Lighthouse audit (via browser):                 │
│     - Performance score > 80                        │
│     - Accessibility score > 90                      │
│     - Best Practices score > 90                     │
│     - SEO score > 90                                │
│  2. Bundle analysis:                                │
│     - Total JS < 200KB (gzipped)                    │
│     - No single chunk > 100KB                       │
│     - Dynamic imports for large components          │
│  3. Loading performance:                            │
│     - First Contentful Paint < 1.5s                 │
│     - Largest Contentful Paint < 2.5s               │
│     - Time to Interactive < 3.5s                    │
│  4. If metrics fail:                                │
│     - Optimize images (WebP, proper sizing)         │
│     - Add code splitting                            │
│     - Lazy load below-fold content                  │
│     - Minimize third-party scripts                  │
└─────────────────────────────────────────────────────┘

API:
┌─────────────────────────────────────────────────────┐
│  1. Response times:                                 │
│     - Simple queries < 100ms                        │
│     - Complex queries < 500ms                       │
│     - File uploads < 2s                             │
│  2. Database:                                       │
│     - Indexes on frequently queried columns         │
│     - No N+1 query patterns                         │
│     - Connection pooling configured                 │
│  3. If metrics fail:                                │
│     - Add database indexes                          │
│     - Implement caching (Redis/in-memory)           │
│     - Optimize queries                              │
│     - Add pagination for list endpoints             │
└─────────────────────────────────────────────────────┘
```

---

## Stage 5 — Ship (Autonomous)

After ALL phases complete successfully and all quality gates pass:

### 5.1 Documentation

```
DOCUMENTATION CHECKLIST:

README.md:
┌─────────────────────────────────────────────────────┐
│  ✓ Project title and description                    │
│  ✓ Live demo link (if deployed)                     │
│  ✓ Screenshot / GIF of the app                      │
│  ✓ Tech stack list with badges                      │
│  ✓ Features list                                    │
│  ✓ Prerequisites (Node.js version, etc.)            │
│  ✓ Installation instructions                        │
│  ✓ Environment variables (.env.example reference)   │
│  ✓ Development server instructions                  │
│  ✓ Build instructions                               │
│  ✓ Test instructions                                │
│  ✓ Project structure overview                       │
│  ✓ API documentation (if API project)               │
│  ✓ Contributing guidelines (if production quality)  │
│  ✓ License                                          │
└─────────────────────────────────────────────────────┘

Code Documentation:
┌─────────────────────────────────────────────────────┐
│  ✓ JSDoc/TSDoc on all exported functions            │
│  ✓ Inline comments for complex logic                │
│  ✓ API endpoint documentation                       │
│  ✓ Database schema documentation                    │
│  ✓ Architecture decision records (if applicable)    │
└─────────────────────────────────────────────────────┘

.env.example:
┌─────────────────────────────────────────────────────┐
│  ✓ All required env vars listed                     │
│  ✓ Descriptions for each variable                   │
│  ✓ Example values (not real secrets)                │
│  ✓ Links to where to get API keys                   │
└─────────────────────────────────────────────────────┘
```

### 5.2 Final Test Suite

```
FINAL TESTING:
1. Run FULL test suite one final time
2. Verify: zero failures
3. Generate coverage report
4. If production quality:
   - Review uncovered critical paths
   - Add tests for any gaps
   - Re-run full suite
5. Report:
   ┌─────────────────────────────────────┐
   │  Tests:    87 passing / 87 total    │
   │  Coverage: 84%                      │
   │  Duration: 12.3s                    │
   │  Failed:   0                        │
   └─────────────────────────────────────┘
```

### 5.3 CI/CD Pipeline (Production Quality)

```
CI/CD SETUP:

GitHub Actions — .github/workflows/ci.yml:
┌─────────────────────────────────────────────────────┐
│  name: CI                                           │
│  on: [push, pull_request]                           │
│                                                     │
│  jobs:                                              │
│    lint:        eslint/biome check                   │
│    typecheck:   tsc --noEmit                         │
│    test:        test suite + coverage report          │
│    build:       production build                     │
│    security:    npm audit                            │
│                                                     │
│  If deployment configured:                          │
│    deploy:                                          │
│      needs: [lint, typecheck, test, build]           │
│      on: push to main only                          │
│      → deploy to [chosen platform]                   │
└─────────────────────────────────────────────────────┘

Verify CI config:
  - Run each CI step locally to confirm they pass
  - COMMIT: "ci: add GitHub Actions CI/CD pipeline"
```

### 5.4 Deployment

```
DEPLOYMENT PROTOCOL:

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  VERCEL:                                                     │
│  1. Create vercel.json with:                                 │
│     - Build command                                          │
│     - Output directory                                       │
│     - Environment variables reference                        │
│     - Redirects/rewrites if needed                           │
│  2. Run: npx vercel --prod (or via CLI)                      │
│  3. Set environment variables in Vercel dashboard via CLI     │
│  4. Wait for deployment                                      │
│  5. Test deployed URL                                        │
│                                                              │
│  NETLIFY:                                                    │
│  1. Create netlify.toml with:                                │
│     - Build command and publish directory                     │
│     - Redirects for SPA routing                              │
│     - Environment variables                                   │
│  2. Deploy via CLI                                           │
│  3. Test deployed URL                                        │
│                                                              │
│  RAILWAY:                                                    │
│  1. Create railway.json / Procfile                           │
│  2. Configure database connection                            │
│  3. Set environment variables                                │
│  4. Deploy                                                   │
│  5. Test deployed URL + API endpoints                         │
│                                                              │
│  FLY.IO:                                                     │
│  1. Create fly.toml                                          │
│  2. Create Dockerfile (if not exists)                        │
│  3. Configure secrets                                        │
│  4. Deploy                                                   │
│  5. Test deployed URL                                        │
│                                                              │
│  POST-DEPLOYMENT VERIFICATION:                               │
│  1. Open deployed URL in browser                             │
│  2. Run full visual test on deployed site                    │
│  3. Test all critical paths (login, core features)           │
│  4. Verify HTTPS working                                     │
│  5. Check for CORS issues                                    │
│  6. Verify environment variables loaded correctly            │
│  7. SCREENSHOT: Deployed app running in production           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 5.5 Final Report

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MertGSD SUPER ► COMPLETE ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What I Built
[Feature summary — 5-10 bullets with descriptions]

## Tech Stack
[Full stack breakdown: framework, language, database, hosting]

## Stats
- Phases completed: [X/X]
- Total tasks: [N]
- Total commits: [N]
- Files created: [N]
- Lines of code: [N]
- Tests: [X passing / Y total] — [Z% coverage]
- Build: ✅ Clean
- Branch: [main or mertgsd-super/feature-name]
- Total time: [duration]

## Deployment
- URL: [deployed URL or "Local only"]
- Platform: [Vercel/Netlify/Railway/etc.]
- Status: ✅ Live
- SSL: ✅ Active

## Quality Report
- Type safety: ✅ No type errors
- Lint: ✅ No lint errors  
- Security: ✅ No vulnerabilities
- Performance: ✅ [Lighthouse score]
- Accessibility: ✅ [a11y score]

## Files Created/Modified
[Organized list of key files with one-line descriptions]

## How to Run Locally
```bash
git clone [repo URL]
cd [project-name]
cp .env.example .env  # Fill in your values
npm install
npm run dev
# Open http://localhost:3000
```

## Known Limitations
[Any features skipped, edge cases not handled, known issues]

## What's Next (v2 ideas)
[Features from the nice-to-have list that weren't built]

## If on a branch:
```bash
# Review changes:
git diff main...mertgsd-super/[feature-name]

# Merge when ready:
git checkout main
git merge mertgsd-super/[feature-name]
git push origin main
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Stage 6 — Post-Execution: Quality Audit

After all phases complete and verify, run the audit workflow:

Read and follow `.agent/workflows/mertgsd-audit.md` to run a full quality audit.
This covers: security, performance, mobile, SEO, accessibility, brand.

---

## Stage 7 — Post-Audit: Deploy (if configured)

If `.planning/mertgsd-config.json` has `deploy_platform` set:
Read and follow `.agent/workflows/mertgsd-deploy.md` to deploy to production.

---

## Stage 8 — Send Notification

If the user provided an ntfy channel during the interview (Q_ntfy), or if ntfy is configured in mertgsd-config.json:
```bash
# Use the channel from the interview, or fall back to config
NTFY_TOPIC="${INTERVIEW_NTFY_CHANNEL:-$(cat .planning/mertgsd-config.json 2>/dev/null | python3 -c "import json,sys; print(json.load(sys.stdin).get('ntfy_topic',''))" 2>/dev/null)}"
if [ -n "$NTFY_TOPIC" ]; then
  curl -s -H "Title: MertGSD Super Complete" -d "Proje tamamlandi! Tum fazlar, audit ve deploy bitti." ntfy.sh/$NTFY_TOPIC
fi
```

Throughout execution, if ntfy channel was provided:
- Her faz tamamlandiginda: `curl -s -H "Title: MertGSD Super" -d "Faz [N] tamamlandi." ntfy.sh/[KANAL]`
- Hata durumunda: `curl -s -H "Title: MertGSD HATA" -H "Priority: high" -d "[hata]" ntfy.sh/[KANAL]`
- Kullanici kanal vermemisse bildirim gonderme.

---

## Safety Guardrails

### Non-Negotiable Rules

```
SUPER MODE SAFETY — THESE RULES CANNOT BE OVERRIDDEN:

1.  NEVER delete existing files on existing projects
2.  ALWAYS create a new branch for existing projects
3.  NEVER push to main on existing projects without explicit instruction
4.  NEVER make external API calls with real credentials unless user confirmed
5.  ALWAYS re-read files before modifying (anti-hallucination)
6.  ALWAYS run verification suite after every task
7.  STOP if stuck — never loop infinitely
8.  ALL commits are atomic and reversible
9.  NEVER use git reset --hard — use git revert
10. NEVER store secrets in source code
11. NEVER skip tests to "save time"
12. NEVER auto-merge into main
13. ALWAYS preserve the full attempt history
14. ALWAYS notify user when stuck, never silently skip
```

### Multi-Model Resilience

```
SUPER MODE runs long — model switches WILL happen.
This is the MOST CRITICAL section for MertGSD.

1. Plans must be model-proof:
   - Step-by-step instructions (not "implement X")
   - Code pattern references to existing files
   - Exact function signatures and types
   - Error handling patterns specified

2. Style anchoring protocol:
   - Before writing ANY code: read 2-3 existing files in same area
   - Match exact patterns: naming, spacing, error handling, comments
   - If no existing code: define patterns in first file, reference later

3. Context reconstruction:
   - Re-read planning files at the start of every phase
   - Re-read SUPER-CONFIG.md for user preferences
   - Re-read STATE.md for current position
   - Never rely on memory of previous phases

4. Progress persistence:
   - Track progress in STATE.md after every task
   - Track progress in SUPER-PROGRESS.md after every task
   - Any model can pick up where another left off
   - All decisions documented in CONTEXT.md files

5. Quality consistency:
   - Same verification suite runs regardless of model
   - Same quality gates apply regardless of model
   - Test results are objective, not model-dependent
```

### Context Freshness

```
Super mode runs across many phases. Context WILL get stale.

PER-PHASE REFRESH:
  1. Re-read STATE.md, ROADMAP.md, SUPER-CONFIG.md
  2. Re-read phase-specific: CONTEXT.md, RESEARCH.md, all PLANs
  3. Re-read SUPER-PROGRESS.md (know where we are)

PER-TASK REFRESH:
  1. Re-read the specific PLAN.md being executed
  2. Re-read files being modified (ALWAYS, no exceptions)
  3. Re-read related files that might be affected

PER-DEBUG REFRESH:
  1. Re-read ACTUAL error output from terminal
  2. Re-read ACTUAL file content from disk
  3. Re-read attempt history to avoid repeating failed approaches

RULE: If in doubt, re-read. The cost of reading is low.
      The cost of hallucinating is high.
```

### Emergency Procedures

```
EMERGENCY STOP:
  IF at any point the AI detects:
    - Deleting files it shouldn't
    - Modifying main branch on existing project
    - Credentials being hardcoded
    - Tests being removed to make builds pass
    - Infinite loop in execution
    
  THEN:
    → IMMEDIATELY STOP all execution
    → git stash any uncommitted changes
    → Notify user with emergency report:
      "⚠️ EMERGENCY STOP: [reason]
       All changes are safely stashed.
       Branch: [current branch]
       Last good commit: [hash]
       Action needed: [recommendation]"
    → Wait for user before ANY further action

GRACEFUL SHUTDOWN:
  IF user interrupts or conversation ends mid-execution:
    → Commit any complete tasks
    → Stash any incomplete work
    → Update STATE.md with exact stopping point
    → Update SUPER-PROGRESS.md
    → Any model can resume from this state later
```
