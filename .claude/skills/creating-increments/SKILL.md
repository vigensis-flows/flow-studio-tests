---
name: creating-increments
description: Creates increment documents in docs/increments/ with correct naming (feature-v1.md). ALWAYS use this skill when creating increments - it handles naming conventions and PDAI structure. Triggers: "create an increment", "create [name] increment", "start increment", "new increment", "plan this change", "document this feature". Do NOT manually create increment files without this skill.
---

# Creating Increments

Creates well-structured Product Development Increment documents following the PDAI cycle (Prepare, Deliver, Assess, Improve).

## What is an Increment?

An increment is a discrete, plannable unit of work that:
- Solves a specific problem or creates specific value
- Follows the PDAI cycle with ~25% time in each phase
- Has clear success criteria
- Is documented for team alignment and future reference
- **Has an executable Build Plan for the Deliver phase**

**Use increments for:**
- New features or capabilities
- System migrations or refactors
- Technical debt remediation
- Architecture changes
- Integration work

**Don't use increments for:**
- Bug fixes (use issues)
- Trivial changes (just do them)
- Research without implementation intent (use notes)

---

## Inputs

The increment is informed by product documents:

| Input | Source | Purpose |
|-------|--------|---------|
| **Roadmap "Now" section** | `docs/product/roadmap.md` | Defines scope, capabilities, success criteria |
| **Strategy** | `docs/product/strategy.md` | Provides context on approach and positioning |
| **Vision** | `docs/product/vision.md` | Provides long-term direction and principles |
| **Discovery Log** | `docs/product/discovery-log.md` | Provides key decisions and assumptions |

The Roadmap's **"Now"** section is the primary input:
- **Capabilities** → become the increment's deliverables
- **Success Criteria** → become the increment's success criteria
- **Scope Boundaries** → become scope exclusions
- **Key Decisions** → inform technical approach

---

## The PDAI Cycle

Every increment follows four phases of equal importance:

```
    Prepare ──────► Deliver
        ▲              │
        │              ▼
    Improve ◄─────── Assess
```

**Each phase gets ~25% of total duration.** This differs from common practice where planning gets 5% and doing gets 80%.

| Phase | Focus | Activities |
|-------|-------|------------|
| **Prepare** | Set direction | Define goals, success criteria, approach, **create Build Plan** |
| **Deliver** | Create value | Execute the Build Plan, produce artifacts |
| **Evaluate** | Assess honestly | Review results against criteria, identify improvements |
| **Improve** | Act on learnings | Execute improvements, refine process |

---

## Two Types of Planning

The Prepare phase includes both strategic and tactical planning:

### Strategic Planning (Why and What)

High-level direction and decisions:
- Goal: What outcome are we delivering?
- Success Criteria: How do we know we're done?
- Key Decisions: What did we choose and why?
- Risks: What could go wrong?
- Scope: What's in and out?

### Tactical Planning (How)

Executable steps for the Deliver phase:
- **Build Plan**: Step-by-step execution plan
- Each step has: Goal, Prompt, Acceptance, Verification
- Steps are dependency-ordered and right-sized (1-2 hours)

**Use the `creating-build-plans` skill** to create the Build Plan section.

---

## Naming Convention

**Location:** `docs/increments/`

**File name:** `feature-name-v1.md`

**Examples:**
- `pdf-extraction-v1.md`
- `asset-store-v1.md`
- `auth-migration-v1.md`

**Naming patterns:**

| Pattern | Example | Good for |
|---------|---------|----------|
| Topic + version | `asset-store-v1.md` | Evolving a capability through iterations |
| Topic + focus | `asset-store-embedding.md` | When each increment has distinct focus |
| Goal-based | `reduce-search-latency.md` | Outcome-focused tracking |

Consistency within a product matters more than which pattern you choose.

---

## Creation Process

### Step 1: Understand the Goal

Before writing, clarify:
- What outcome are we delivering?
- What problem does this solve?
- Who benefits and how?
- What constraints exist?

If unclear, ask clarifying questions before proceeding.

### Step 2: Research Options

Explore at least 2-3 approaches:
- What are the trade-offs?
- What's the effort level?
- Are there precedents or patterns to follow?

This becomes the "Key Decisions" table in the Prepare phase.

### Step 3: Create Increment File

Use the template at `docs/templates/increment.md`:

```bash
cp docs/templates/increment.md docs/increments/my-feature-v1.md
```

### Step 4: Complete Strategic Planning

Fill in the strategic sections:

| Section | Purpose | Guidance |
|---------|---------|----------|
| **Goal** | What outcome? | One sentence describing the value delivered |
| **Hypothesis** | Why this approach? | The belief we're testing (optional) |
| **Success Criteria** | How do we know we're done? | Measurable, checkable items |
| **Approach** | High-level how? | Phases and milestones |
| **Scope Exclusions** | What's NOT included? | Prevents scope creep |
| **Key Decisions** | What did we choose and why? | Table of decision + rationale |
| **Risks** | What could go wrong? | Risk + mitigation table |

### Step 5: Create the Build Plan

Use the `creating-build-plans` skill to create executable steps:

1. **Identify components** - Data models, logic, UI, integrations
2. **Order by dependencies** - Data → Logic → UI → Integration
3. **Right-size steps** - Each step 1-2 hours max
4. **Write prompts** - Claude Code CLI prompts with acceptance criteria
5. **Add verification** - How to confirm each step is done

The Build Plan goes in the Approach section or as a separate "Build Plan" section.

### Step 6: Review Before Delivering

Before starting Deliver phase:
- [ ] Goal is specific and compelling
- [ ] Success criteria are measurable
- [ ] Approach has clear phases/milestones
- [ ] **Build Plan has executable steps with prompts**
- [ ] Key decisions are documented with rationale
- [ ] Risks have mitigations
- [ ] Scope exclusions are explicit

---

## Template Structure

The template at `docs/templates/increment.md` follows PDAI:

```markdown
# [Increment Name]

**Duration**: [1 day | 1 week | 1 month | ...]
**Status**: [Prepare | Deliver | Assess | Improve | Complete]
**Started**: YYYY-MM-DD

---

## Prepare (~25%)

### Goal
[One sentence: what outcome are we delivering?]

### Hypothesis (optional)
[The belief we're testing]

### Success Criteria
- [ ] [Measurable criterion]
- [ ] [Measurable criterion]

### Approach
[High-level phases and milestones]

### Build Plan
[Step-by-step execution plan - see creating-build-plans skill]

#### Step 1: [Name]
**Goal**: [What this achieves]
**Depends on**: [Previous steps or None]
**Prompt**: [Claude Code CLI prompt]
**Acceptance**: [Verifiable criteria]
**Verification**: [Commands to run]

#### Step 2: [Name]
[Continue for all steps...]

### Scope Exclusions
- [What's NOT included]

### Key Decisions
| Decision | Rationale |
|----------|-----------|
| [Choice] | [Why] |

### Risks
| Risk | Mitigation |
|------|------------|
| [What could go wrong] | [How we'll handle it] |

---

## Deliver (~25%)

### Artifacts Created
- [ ] [Artifact - link when complete]

### Summary
[Brief narrative of what was delivered - write at end of Deliver phase]

---

## Assess (~25%)

### Results vs Criteria
| Criterion | Result | Status |
|-----------|--------|--------|
| [Criterion] | [What happened] | ✓ / ✗ / ~ |

### Observations
[What did we notice? Surprises? Issues?]

### Improvement Opportunities
- [Artifact: improvement needed]
- [Process: improvement needed]

---

## Improve (~25%)

### Artifact Improvements
- [What was improved]

### Process Improvements
- [Changes to how we work]

### Lessons Learned
[Key takeaways]

### Follow-up
[Next increment or backlog items]
```

---

## Writing Guidelines

### Goal Statement

**Good:**
> Migrate PDF extraction from separate Python service into Flow Studio (Elixir), simplifying architecture while maintaining extraction quality and GPU acceleration.

**Bad:**
> Improve the PDF system.

### Success Criteria

**Measurable:**
- "Can extract text from 10-page PDF in <30 seconds"
- "All existing test cases pass"
- "GPU acceleration verified on Apple Silicon"

**Not measurable:**
- "System is faster"
- "Code is cleaner"

### Key Decisions Table

| Decision | Rationale |
|----------|-----------|
| Docling CLI over Python API | Stable interface, no Python code to maintain |
| GenServer queue over Task.Supervisor | Better job tracking, status polling |

### Scope Exclusions

Always list what's explicitly NOT in this increment:
- Worker pool for parallel processing (future optimization)
- Support for non-PDF formats (focus on PDF first)
- Asset Store integration (separate increment)

### Build Plan Steps

Each step should be:
- **Right-sized**: 1-2 hours of focused work
- **Dependency-ordered**: What must exist first?
- **Executable**: Claude Code CLI can run the prompt
- **Verifiable**: Clear way to confirm completion

**Good step:**
```markdown
#### Step 3: Create ExtractionJob Ash Resource

**Goal**: Define job resource with state machine for tracking extractions

**Depends on**: Step 2 (Domain module)

**Prompt**:
<context>
Working in FlowStudio. Domain module exists at lib/flow_studio/extraction.ex
Following Ash patterns from lib/flow_studio/accounts/user.ex
</context>

<task>
Create ExtractionJob resource with:
- UUID primary key
- Status atom: queued | processing | completed | failed
- File attributes: name, size, path
- Actions: queue, start_processing, complete, fail
- Tests for state transitions
</task>

<acceptance>
- Migration creates table
- Resource compiles without warnings
- Tests pass
</acceptance>

**Verification**:
- Run: `mix test test/flow_studio/extraction/job_test.exs`
- Run: `mix dialyzer`
```

**Bad step:**
```markdown
#### Step 3: Build the extraction system

**Goal**: Make extraction work

**Prompt**: Create the extraction feature

**Verification**: It should work
```

---

## Quick Start

1. **Create increment file:**
   ```bash
   cp docs/templates/increment.md docs/increments/my-feature-v1.md
   ```

2. **Fill in metadata** - Duration, Status (Prepare), Started date

3. **Write the Goal** - One clear sentence

4. **Define Success Criteria** - Measurable outcomes

5. **Plan the Approach** - High-level phases

6. **Create the Build Plan** - Step-by-step executable prompts (use creating-build-plans skill)

7. **Document Key Decisions** - What you chose and why

8. **List Risks** - What could go wrong and mitigations

9. **Set Scope Exclusions** - What's NOT included

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Vague goal | Add specific outcome and who benefits |
| Unmeasurable success criteria | Add numbers, thresholds, or concrete checks |
| Missing scope exclusions | Explicitly list what's out of scope |
| No key decisions documented | Record choices and rationale in table |
| Skipping risks | Every change has risks - name them |
| No phases in approach | Break into milestones for progress tracking |
| **Missing Build Plan** | Add step-by-step executable prompts |
| **Vague Build Plan steps** | Each step needs Goal, Prompt, Acceptance, Verification |
| **Giant Build Plan steps** | Split into 1-2 hour chunks |
| Starting Deliver without finishing Prepare | Complete all Prepare sections first |

---

## Validation Checklist

Before moving from Prepare to Deliver:

**Structure:**
- [ ] File name follows `feature-name-v1.md` convention
- [ ] Located in `docs/increments/`
- [ ] All Prepare sections filled

**Strategic Planning:**
- [ ] Goal is one clear sentence
- [ ] Success criteria are measurable (can check off)
- [ ] Approach has phases or milestones
- [ ] Key decisions documented with rationale
- [ ] Risks have mitigations
- [ ] Scope exclusions are explicit

**Tactical Planning (Build Plan):**
- [ ] Steps are ordered by dependencies
- [ ] Each step is 1-2 hours max
- [ ] Each step has Goal, Prompt, Acceptance, Verification
- [ ] Prompts have context and clear tasks
- [ ] Verification is automated where possible

**Quality:**
- [ ] Could a new team member understand the goal?
- [ ] Are success criteria unambiguous?
- [ ] **Could someone execute the Build Plan step-by-step?**
