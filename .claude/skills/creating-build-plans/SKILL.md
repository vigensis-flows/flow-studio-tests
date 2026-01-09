---
name: creating-build-plans
description: Creates step-by-step executable plans for Claude Code CLI. Use when breaking down implementation work into executable steps, creating tactical plans for increments or MVPs, or when user asks to "plan the build", "break this into steps", or needs an actionable execution plan.
---

# Creating Build Plans

Creates step-by-step execution plans where each step can be run by Claude Code CLI (or specialized agents).

## What is a Build Plan?

A Build Plan is an **ordered sequence of right-sized tasks** that transforms goals into working software.

| Build Plan Is | Build Plan Is Not |
|---------------|-------------------|
| Executable steps | High-level milestones |
| Claude Code CLI prompts | Vague task descriptions |
| Verifiable outcomes | "It should work" |
| Dependency-ordered | Random task list |
| Right-sized (1-2 hours) | Giant multi-day chunks |

A good Build Plan can be executed step-by-step with minimal interpretation.

---

## When to Use

**Use Build Plans for:**
- Increment Deliver phase (tactical execution plan)
- MVP implementation phases
- Feature implementation
- Migrations and refactors
- Any multi-step technical work

**Don't use Build Plans for:**
- Single, obvious tasks (just do them)
- Research and exploration (use exploration prompts)
- Strategic decisions (use increment planning)

---

## Step Structure

Each step in a Build Plan follows this structure:

```markdown
### Step N: [Name]

**Goal**: [One sentence - what this step achieves]

**Depends on**: [Previous steps required, or "None"]

**Prompt**:
```
<context>
[Project context, relevant files, current state]
</context>

<task>
[What to implement]

1. [Specific sub-task]
2. [Specific sub-task]
</task>

<acceptance>
- [Verifiable criterion]
- [Verifiable criterion]
</acceptance>
```

**Verification**:
- Run: `[command to verify]`
- Check: `[manual check if needed]`
```

---

## Prompt Patterns

Choose based on work type. Full templates in [references/prompt-patterns.md](references/prompt-patterns.md).

| Pattern | Use When |
|---------|----------|
| **Explore-Plan-Implement** | Unfamiliar area, multiple approaches, architectural decisions |
| **Test-First** | Clear requirements, well-defined behavior, existing test patterns |
| **Schema-First** | Database changes, new data models, resource definitions |
| **Integration** | Connecting services, API integrations, component composition |
| **UI Component** | New UI components, pages, visual features |
| **Refactor** | Technical debt, code quality improvements, restructuring |

---

## Right-Sizing Steps

Each step should be completable in **1-2 hours** of focused work.

### Too Big

```
Build the entire authentication system
```

### Right Size

```
Step 1: Create User resource with email, password_hash
Step 2: Add registration action with validation
Step 3: Add login action with credential verification
Step 4: Add session management
Step 5: Add password reset flow
```

### Splitting Guidance

| If step involves... | Split into... |
|--------------------|---------------|
| Multiple resources | One step per resource |
| Multiple UI pages | One step per page |
| Multiple API endpoints | One step per endpoint (or related group) |
| "and" in the description | Separate steps |

---

## Dependency Ordering

Order steps by technical dependencies:

```
1. Data models (can't build logic without data)
   ↓
2. Business logic (can't build UI without logic)
   ↓
3. UI components (can't integrate without components)
   ↓
4. Integration (connects the pieces)
   ↓
5. Edge cases & polish (refine what exists)
```

### Explicit Dependencies

Mark dependencies in each step:

```markdown
### Step 5: Create Job Status LiveView

**Depends on**: Step 3 (ExtractionJob resource), Step 4 (Extractor GenServer)
```

### Parallel Steps

Steps with no dependencies on each other can run in parallel:

```markdown
### Step 3a: Create REST API endpoints
**Depends on**: Step 2

### Step 3b: Create GraphQL schema
**Depends on**: Step 2

[Both depend on Step 2, neither depends on the other]
```

---

## Verification Patterns

Every step needs verification - how to confirm it's done.

### Automated Verification

Prefer automated checks:

```markdown
**Verification**:
- Run: `mix test test/my_module_test.exs`
- Run: `mix dialyzer`
- Run: `mix format --check-formatted`
```

### Manual Verification

When automation isn't practical:

```markdown
**Verification**:
- Start: `mix phx.server`
- Navigate to: `/admin/extraction`
- Check: Queue status displays correctly
- Check: Job list shows recent jobs
```

### Verification Checklist

For complex steps:

```markdown
**Verification**:
- [ ] Migration runs without errors
- [ ] Resource compiles without warnings
- [ ] Tests pass: `mix test test/flow_studio/extraction/job_test.exs`
- [ ] Can create job via IEx: `Extraction.queue_job(...)`
```

---

## Build Plan Template

```markdown
# Build Plan: [Feature/Increment Name]

**Based on**: [Link to increment or feature spec]
**Estimated steps**: [N]
**Target duration**: [X days/hours]

---

## Prerequisites

- [ ] [Prerequisite 1]
- [ ] [Prerequisite 2]

---

## Steps

### Step 1: [Name]

**Goal**: [One sentence]

**Depends on**: None

**Prompt**:
```
[Claude Code CLI prompt using appropriate pattern]
```

**Verification**:
- [Verification method]

---

### Step 2: [Name]

**Goal**: [One sentence]

**Depends on**: Step 1

**Prompt**:
```
[Claude Code CLI prompt]
```

**Verification**:
- [Verification method]

---

[Continue for all steps...]

---

## Completion Checklist

- [ ] All steps completed
- [ ] All verifications pass
- [ ] No new warnings or errors
- [ ] Code formatted
- [ ] Tests pass
```

---

## Creation Process

### Step 1: Understand the Goal

Read the increment plan or feature spec:
- What outcome are we delivering?
- What are the success criteria?
- What constraints exist?

### Step 2: Identify Components

List the technical components needed:
- Data models
- Business logic
- API endpoints
- UI components
- Integrations

### Step 3: Order by Dependencies

Arrange components by technical dependencies:
1. What must exist first?
2. What depends on what?
3. What can run in parallel?

### Step 4: Right-Size Each Step

For each component:
- Can it be done in 1-2 hours?
- If not, split it further
- One concern per step

### Step 5: Write Prompts

For each step:
- Choose appropriate pattern
- Include context (files, state)
- Define clear acceptance criteria
- Add verification method

### Step 6: Review the Plan

Before execution:
- [ ] Steps are ordered by dependencies
- [ ] Each step is 1-2 hours
- [ ] Prompts have context and acceptance criteria
- [ ] Verification is defined for each step
- [ ] Prerequisites are listed

---

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| **Giant steps** | Can't verify progress | Split into 1-2 hour chunks |
| **Missing context** | Claude doesn't know project state | Include file references, current state |
| **Vague acceptance** | "It works" isn't verifiable | Specific, testable criteria |
| **Wrong ordering** | Steps fail due to missing dependencies | Order by technical dependencies |
| **No verification** | Can't confirm step completion | Add run commands or checks |
| **Repeating CLAUDE.md** | Wastes tokens | Reference, don't repeat |
| **Scope creep** | Steps grow during execution | Stick to plan, create new steps |

---

## Validation Checklist

Before finalizing a Build Plan:

**Structure:**
- [ ] All steps have Goal, Prompt, Verification
- [ ] Dependencies explicitly marked
- [ ] Prerequisites listed

**Steps:**
- [ ] Each step is 1-2 hours max
- [ ] Uses appropriate prompt pattern
- [ ] Has specific acceptance criteria
- [ ] Has verification method

**Order:**
- [ ] Data before logic
- [ ] Logic before UI
- [ ] Components before integration
- [ ] Dependencies respected

**Quality:**
- [ ] Could someone execute this without interpretation?
- [ ] Are prompts specific enough?
- [ ] Is verification automated where possible?
