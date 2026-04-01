---
name: creating-mvp
description: Orchestrates the complete MVP creation workflow from input to working v0.1.0. Coordinates Product Trio, research, planning, and delivery through fully autonomous execution. Use when user provides MVP name and optionally description and input files.
---

# Creating MVP

Master orchestration workflow for creating an MVP from initial input to working v0.1.0. Fully autonomous execution with stakeholder escalation only when the team cannot proceed.

## How to Use

**1. Prepare product context:**

Edit `.claude/context/product-context.md`:
```markdown
# YourProductName

A brief description of what the product does.

## Problem (optional)
What problem does it solve.

## Target Users (optional)
Who is this for.
```

**2. Add input files (optional):**

Place source materials (PDFs, docs, code) in the `/input` folder.

**3. Trigger the workflow:**

```
/create-mvp
```

The workflow reads name and description from product-context.md. If the file is incomplete, the command will help you fill it in.

## Implementation

This workflow is implemented using the **Claude Agent SDK** at:
`.claude/workflows/create-mvp/index.ts`

The workflow runs autonomously, executing 5 phases with built-in validation and retry logic.

---

## Overview

The workflow orchestrates:
- **Product Trio** (PM, Designer, Tech Lead) - discovery and definition
- **Research Analyst** - background research support
- **Delivery Agent** - planning and execution
- **Reviewer Agent** - quality gates

Each phase uses specialized skills as guidance, with clear handoffs between agents.

---

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | MVP name (used for folder naming) |
| `description` | string | No | Initial description or idea |
| `input_folder` | path | No | Folder with input files (PDFs, docs, code, etc.) |

### Configuration

| Config | Default | Description |
|--------|---------|-------------|
| `max_discovery_rounds` | 5 | Maximum rounds before escalation |
| `research_depth` | "standard" | Research thoroughness: light, standard, deep |

---

## Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CREATE MVP WORKFLOW                               │
│                                                                             │
│  Target: Autonomous execution from input to working v0.1.0                  │
│  Success: Human reviews demo, approves next increment quickly              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

PHASE 1: INPUT (if files provided)
┌─────────────────────────────────────────────────────────────────────────────┐
│ Skill: processing-provided-materials                                        │
│                                                                             │
│ INPUT:  input_folder with files                                             │
│ OUTPUT: docs/product-definition/input-digest.md                                │
│                                                                             │
│ Process:                                                                    │
│ - Scan and inventory all files                                              │
│ - Extract content from PDFs, docs, code                                     │
│ - Create comprehensive Input Digest                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
PHASE 2: UNDERSTAND
┌─────────────────────────────────────────────────────────────────────────────┐
│ Skill: understanding-mvp                                                    │
│ Owner: Product Trio                                                         │
│                                                                             │
│ INPUT:  name, description, Input Digest (if exists)                         │
│ OUTPUT: docs/product-definition/1-mvp-brief.md                                   │
│         docs/product-definition/discovery-log.md                               │
│                                                                             │
│ Process:                                                                    │
│ - Product Trio discovery rounds (adaptive, max N)                           │
│ - Parallel research for answerable questions                                │
│ - Converge on MVP scope (Delight + Table Stakes + Anti-Scope)              │
│                                                                             │
│ Research Support (parallel):                                                │
│ - Skill: deep-research                                                      │
│ - Agent: Research Analyst                                                   │
│ - Output: docs/product-definition/research/*.md                               │
│                                                                             │
│ Exit Conditions:                                                            │
│ - Converged: MVP Brief complete → continue                                  │
│ - Escalated: Stakeholder questions prepared → STOP                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
PHASE 3: DEFINE
┌─────────────────────────────────────────────────────────────────────────────┐
│ Skills: creating-product-vision, creating-product-strategy                  │
│ Owner: Product Trio                                                         │
│                                                                             │
│ INPUT:  MVP Brief                                                           │
│ OUTPUT: docs/product-definition/2-product-vision.md                                      │
│         docs/product-definition/3-product-strategy.md                                    │
│                                                                             │
│ Process:                                                                    │
│ 3.1 Create Vision                                                           │
│     - Use MVP Brief insights                                                │
│     - Apply creating-product-vision skill                                   │
│     - Internal review using skill checklist                                 │
│                                                                             │
│ 3.2 Create Strategy                                                         │
│     - Target market, go-to-market hypothesis                               │
│     - Business model hypothesis                                             │
│     - Apply creating-product-strategy skill                                 │
│     - Internal review using skill checklist                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
PHASE 4: PLAN
┌─────────────────────────────────────────────────────────────────────────────┐
│ Skills: creating-mvp-plans, creating-increments, reviewing-increments       │
│ Owner: Tech Lead (with Trio input)                                          │
│                                                                             │
│ INPUT:  MVP Brief, Vision, Strategy                                         │
│ OUTPUT: docs/product-definition/mvp-plan.md                                    │
│         docs/increments/[name]-v1.md                                        │
│                                                                             │
│ Process:                                                                    │
│ 4.1 MVP Plan                                                                │
│     - Apply creating-mvp-plans skill                                        │
│     - Define phases with Build Plans                                        │
│     - Apply "MVP Scope Test (Minimum AND Viable AND Product)" scope test                            │
│                                                                             │
│ 4.2 v0.1.0 Increment                                                        │
│     - Apply creating-increments skill                                       │
│     - Create increment for first version                                    │
│     - Full Build Plan with executable steps                                 │
│                                                                             │
│ 4.3 Internal Review                                                         │
│     - Apply reviewing-increments skill (Plan Review context)                │
│     - Refine based on feedback                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
PHASE 5: BUILD
┌─────────────────────────────────────────────────────────────────────────────┐
│ Skills: building-increments, reviewing-increments, refining-increments      │
│ Owner: Delivery Agent + Reviewer Agent                                      │
│                                                                             │
│ INPUT:  Increment document with Build Plan                                  │
│ OUTPUT: Working MVP v0.1.0 code + tests + docs                             │
│                                                                             │
│ Process (PDAI within PDAI):                                                 │
│                                                                             │
│ 5.1 DELIVER                                                                 │
│     - Apply building-increments skill                                       │
│     - Execute each Build Plan step                                          │
│     - Run verification after each step                                      │
│     - Update increment document with results                                │
│                                                                             │
│ 5.2 ASSESS                                                                  │
│     - Apply reviewing-increments skill (Delivery Review context)            │
│     - Identify improvements                                                 │
│     - Apply refining-increments skill                                       │
│     - Create Improvement Proposals                                          │
│                                                                             │
│ 5.3 IMPROVE                                                                 │
│     - Apply building-increments skill for improvements                      │
│     - Execute approved improvements                                         │
│     - Apply reviewing-increments skill (Final Review context)               │
│                                                                             │
│ Quality Gates:                                                              │
│ - All tests pass                                                            │
│ - No compiler warnings                                                      │
│ - Documentation complete                                                    │
│ - Demo-ready                                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
PHASE 6: DELIVER
┌─────────────────────────────────────────────────────────────────────────────┐
│ Final Outputs                                                               │
│                                                                             │
│ DELIVERABLES:                                                               │
│ ├── Working application (runnable/deployable)                               │
│ ├── Demo instructions (README or DEMO.md)                                   │
│ └── Evidence trail:                                                         │
│     docs/product-definition/                                                │
│     ├── input-digest.md          (if input files provided)                 │
│     ├── 1-mvp-brief.md           (MVP scope definition)                    │
│     ├── discovery-log.md         (discovery process)                        │
│     ├── 2-product-vision.md      (product vision)                           │
│     ├── 3-product-strategy.md    (product strategy)                         │
│     ├── mvp-plan.md              (implementation plan)                      │
│     └── research/                (research reports)                         │
│         ├── market-research.md                                              │
│         ├── user-research.md                                                │
│         └── ...                                                             │
│     docs/increments/                                                        │
│     └── [name]-v1.md             (increment: Complete)                      │
│                                                                             │
│ SUCCESS MEASURE:                                                            │
│ Human reviews demo → approves next increment with minimal feedback          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Invocation

### Command

```
/create-mvp
```

Or when user says:
- "Create an MVP"
- "Build the MVP"
- "Start MVP creation"

### Prerequisites

1. **Product context** (required): `.claude/context/product-context.md` with:
   - H1 title = Product name
   - Content = Description

2. **Input files** (optional): Place in `/input` folder

If product context is incomplete, the command will guide you through setup.

---

## Phase Execution Details

### Phase 1: Input Processing

**When**: Input folder provided

**Process**:
1. Invoke `processing-provided-materials` skill
2. Create `docs/product-definition/` folder structure
3. Process all files, create Input Digest
4. Verify digest is comprehensive

**Outputs**:
- `docs/product-definition/input-digest.md`

### Phase 2: Understanding

**Process**:
1. Invoke `understanding-mvp` skill
2. Activate Product Trio (PM, Designer, Tech Lead perspectives)
3. Execute discovery rounds:
   - Round 1: Initial analysis
   - Rounds 2-N: Research-informed deepening
   - Convergence check after each round
4. For research needs:
   - Spawn `deep-research` tasks in parallel
   - Integrate findings into next round
5. Exit when converged or at max rounds

**Convergence criteria**:
- MVP scope defined (Delight + Table Stakes + Anti-Scope)
- No blocking questions remain
- Assumptions explicit and acceptable

**Escalation (if needed)**:
- Prepare `stakeholder-questions.md`
- STOP workflow, return to human

**Outputs**:
- `docs/product-definition/1-mvp-brief.md`
- `docs/product-definition/discovery-log.md`
- `docs/product-definition/research/*.md` (if research conducted)

### Phase 3: Definition

**Process**:
1. Create Vision:
   - Invoke `creating-product-vision` skill
   - Use MVP Brief as primary input
   - Apply skill's quality checklist
2. Create Strategy:
   - Invoke `creating-product-strategy` skill
   - Use MVP Brief and Vision
   - Apply skill's quality checklist

**Internal Review**:
- Trio reviews vision for coherence with MVP Brief
- Trio reviews strategy for market fit and feasibility
- Iterate if needed (no human gate)

**Outputs**:
- `docs/product-definition/2-product-vision.md`
- `docs/product-definition/3-product-strategy.md`

### Phase 4: Planning

**Process**:
1. Create MVP Plan:
   - Invoke `creating-mvp-plans` skill
   - Define phases (Foundation → Core → Integration → Quality → Deploy)
   - Apply scope discipline ("MVP Scope Test (Minimum AND Viable AND Product)")
2. Create v0.1.0 Increment:
   - Invoke `creating-increments` skill
   - Create full PDAI increment document
   - Include Build Plan with executable steps
3. Internal Review:
   - Invoke `reviewing-increments` skill (Plan Review)
   - Address feedback
   - Invoke `refining-increments` if changes needed

**Outputs**:
- `docs/product-definition/mvp-plan.md`
- `docs/increments/[name]-v1.md`

### Phase 5: Build

**Process** (PDAI execution):

**DELIVER**:
1. Invoke `building-increments` skill
2. Execute Build Plan steps sequentially
3. For each step:
   - Execute the prompt
   - Run verification
   - Record result in increment document
   - Handle errors (fix and continue or flag)
4. Update increment Deliver section

**ASSESS**:
1. Invoke `reviewing-increments` skill (Delivery Review)
2. Check success criteria
3. Identify improvements
4. Invoke `refining-increments` skill
5. Create Improvement Proposals

**IMPROVE**:
1. Invoke `building-increments` for approved improvements
2. Execute improvement steps
3. Invoke `reviewing-increments` skill (Final Review)
4. Mark increment Complete

**Quality Gates**:
- All tests pass
- No compiler warnings
- Documentation complete

**Outputs**:
- Working code (committed)
- Updated increment document
- Artifacts as defined in plan

### Phase 6: Deliver

**Final Steps**:
1. Verify all quality gates passed
2. Create demo instructions if needed
3. Update increment status to Complete
4. Prepare summary for human review

**Human Handoff**:
- Present working demo
- Show evidence trail
- Ready for human to approve next increment

---

## Folder Structure

```
docs/product-definition/
├── 1-mvp-brief.md            # MVP scope definition
├── discovery-log.md          # Discovery process record
├── 2-product-vision.md       # Product vision
├── 3-product-strategy.md     # Product strategy
├── mvp-plan.md               # Implementation plan
├── input-digest.md           # Processed input (if provided)
└── research/                 # Research artifacts (if any)

docs/increments/
└── [mvp-name]-v1.md          # First increment (v0.1.0)
```

---

## Agents and Responsibilities

### Product Trio

| Agent | Focus | Phases |
|-------|-------|--------|
| **Product Maestro (PM)** | Value & Viability | Understand, Define |
| **Design Shaper (Designer)** | Usability & Experience | Understand, Define |
| **Tech Smith (Tech Lead)** | Feasibility & Quality | Understand, Define, Plan |

### Delivery

| Agent | Focus | Phases |
|-------|-------|--------|
| **Delivery Agent** | Execution | Plan, Build |
| **Reviewer Agent** | Quality Gates | Plan, Build |

### Support

| Agent | Focus | Phases |
|-------|-------|--------|
| **Research Analyst** | Secondary Research | Understand |

---

## Success Criteria

The creating-mvp workflow succeeds when:

- [ ] Input processed comprehensively (if provided)
- [ ] MVP scope defined with Delight, Table Stakes, Anti-Scope
- [ ] Vision and Strategy created and internally reviewed
- [ ] MVP Plan with phases and Build Plans
- [ ] Increment executed with all quality gates passed
- [ ] Working demo ready for human review
- [ ] Complete evidence trail in docs/product-definition/
- [ ] Human can quickly approve next increment

---

## Error Handling

### Research Timeout

If research takes too long:
- Continue with available information
- Flag gaps in discovery log
- Note assumptions made

### Build Failures

If build step fails:
- Attempt to fix automatically
- If unfixable, document issue
- Continue if non-blocking
- Escalate if blocking

### Quality Gate Failures

If quality gate fails:
- Attempt to fix in Improve phase
- If still failing, document gap
- Continue if acceptable for v0.1.0
- Escalate if critical

### Escalation

When escalating to human:
- Document what was tried
- Explain why team is blocked
- Provide specific questions
- Present options if possible

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Skipping understanding** | Building wrong thing | Complete discovery rounds |
| **Premature planning** | Plan before scope clear | Converge on scope first |
| **Over-engineering v0.1.0** | Scope creep | Apply "MVP Scope Test (Minimum AND Viable AND Product)" |
| **Skipping reviews** | Quality issues | Always run internal reviews |
| **Silent failures** | Issues hidden | Document all failures and decisions |
| **Infinite research** | Never converging | Time-box, accept uncertainty |
