---
name: creating-mvp-plans
description: Creates implementation plans for MVPs with Claude Code CLI prompts. Use when planning an MVP build, creating implementation roadmap, or preparing step-by-step development plan. Also use when user asks "plan the MVP", "create implementation plan", or after completing product strategy.
---

# Creating MVP Plans

Creates phased implementation plans for MVPs, using the `creating-build-plans` skill for step-by-step execution within each phase.

## What is an MVP?

MVP = Minimum Viable **Product** (not prototype)

| MVP Is | MVP Is Not |
|--------|------------|
| Production-ready software | Throwaway prototype |
| Used by real customers | Internal demo |
| Customers pay for it | Free beta forever |
| Core value delivered | Feature-complete |
| Quality code with tests | Quick hack |

An MVP has the minimum features needed to deliver value to paying customers and learn from real usage.

---

## MVP Plan vs Build Plan

| Aspect | MVP Plan | Build Plan |
|--------|----------|------------|
| **Scope** | Entire MVP (multiple phases) | Single phase or increment |
| **Duration** | Weeks to months | Days to a week |
| **Structure** | Phases containing Build Plans | Steps within a phase |
| **Focus** | What to build, in what order | How to build each step |

**An MVP Plan contains multiple Build Plans** - one for each phase.

---

## Prerequisites

Before creating an MVP plan:

1. **Product Vision** - Clear problem and solution (use creating-product-vision)
2. **Product Strategy** - Target market, business model (use creating-product-strategy)
3. **CLAUDE.md configured** - Project quality standards in place

### CLAUDE.md Quality Standards

Ensure CLAUDE.md includes:

```markdown
## Quality Standards
- Run tests: `mix test`
- Check types: `mix dialyzer`
- Format code: `mix format`
- Check warnings: Compile with `--warnings-as-errors`

## Code Style
[Project-specific patterns]

## Testing Requirements
[Coverage expectations, test patterns]
```

The plan assumes CLAUDE.md handles project-wide quality. Prompts focus on feature-specific concerns.

---

## Plan Structure

### Phases

| Phase | Purpose | Typical Duration |
|-------|---------|------------------|
| **Foundation** | Project setup, core architecture | 1-3 days |
| **Core Features** | Essential value delivery | 1-2 weeks |
| **Integration** | Connect components, data flow | 2-4 days |
| **Quality** | Testing, error handling, edge cases | 2-4 days |
| **Deployment** | Production readiness | 1-3 days |

### Phase Structure

Each phase contains a Build Plan (see `creating-build-plans` skill):

```markdown
## Phase N: [Name]

**Goal**: [What this phase achieves]
**Duration**: [Estimated time]

### Build Plan

[Use creating-build-plans skill for step structure]

#### Step 1: [Name]
**Goal**: [One sentence]
**Prompt**: [Claude Code CLI prompt]
**Verification**: [How to verify]

#### Step 2: [Name]
...
```

---

## Creation Process

### Step 1: Review Strategy

Read the product strategy to understand:
- Target market and their needs
- Core features for MVP scope
- Success metrics
- Technical constraints

### Step 2: Define MVP Scope

List the minimum features needed to:
- Deliver core value proposition
- Enable customers to pay
- Generate learnings from real usage

**Scope test**: For each feature, ask "Can we launch without this?"
- If yes → cut it
- If no → keep it

### Step 3: Identify Technical Components

Map features to technical work:
- Data models needed
- UI screens/components
- Integrations required
- Infrastructure setup

### Step 4: Group into Phases

Organize by technical dependencies:

1. **Foundation** - Project setup, base architecture
2. **Core Features** - Essential value delivery (largest phase)
3. **Integration** - Connect the pieces
4. **Quality** - Error handling, edge cases
5. **Deployment** - Production readiness

### Step 5: Create Build Plans

For each phase, use the `creating-build-plans` skill to create step-by-step execution plans:

- **Identify steps** within the phase
- **Order by dependencies** (data → logic → UI)
- **Right-size steps** (1-2 hours each)
- **Write prompts** using appropriate patterns
- **Add verification** for each step

### Step 6: Add Phase Verification

For each phase, define how to verify completion:
- Commands to run (tests, type checks)
- Manual checks if needed
- What "done" looks like

---

## Template

```markdown
# MVP Implementation Plan
**[Product Name]**

*Based on: [Link to strategy document]*
*Updated: [Date]*

---

## MVP Scope

### In Scope
- [Feature 1]: [Why essential]
- [Feature 2]: [Why essential]

### Out of Scope (Post-MVP)
- [Feature]: [Why deferred]

---

## Phase 1: Foundation

**Goal**: [What this phase achieves]
**Duration**: [Estimated time]

### Build Plan

#### Step 1: [Name]
**Goal**: [What this achieves]
**Depends on**: None
**Prompt**:
```
[Claude Code CLI prompt - see creating-build-plans for patterns]
```
**Verification**: [How to verify]

---

## Phase 2: Core Features

**Goal**: [What this phase achieves]
**Duration**: [Estimated time]

### Build Plan

[Steps using creating-build-plans structure...]

---

## Phase 3: Integration

[Build Plan...]

---

## Phase 4: Quality

[Build Plan...]

---

## Phase 5: Deployment

[Build Plan...]

---

## Launch Checklist

- [ ] All tests pass
- [ ] No compiler warnings
- [ ] Error handling complete
- [ ] Monitoring configured
- [ ] Deployment tested
- [ ] Documentation complete
```

---

## Common Phases Detail

### Phase 1: Foundation

Typical steps:
1. Project initialization (if new)
2. Core data models
3. Authentication (if needed)
4. Base UI layout

### Phase 2: Core Features

Steps vary by product. Structure as:
1. Data layer for feature
2. Business logic
3. UI for feature
4. Integration/flow

Repeat for each core feature.

### Phase 3: Integration

1. Connect frontend to backend
2. Wire up authentication flow
3. Implement navigation
4. Test end-to-end flows

### Phase 4: Quality

1. Error handling review
2. Edge case coverage
3. Performance check
4. Security review

### Phase 5: Deployment

1. Environment configuration
2. Deployment pipeline
3. Monitoring setup
4. Launch checklist

---

## Prompt Patterns

**Use the `creating-build-plans` skill** for prompt patterns and step structure.

Key patterns:
- **Explore-Plan-Implement**: For uncertain areas
- **Test-First**: For well-defined features
- **Schema-First**: For data layer work
- **Integration**: For connecting components
- **UI Component**: For frontend work

See `creating-build-plans/references/claude-code-patterns.md` for extended patterns.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Giant phases** | Too much scope, can't track progress | Split into smaller phases |
| **Giant steps** | Too much for one prompt | Split into 1-2 hour steps |
| **Vague acceptance** | "It works" isn't verifiable | Specific, testable criteria |
| **No context** | Claude doesn't know project state | Include relevant file refs |
| **Feature creep** | MVP grows beyond minimum | Scope test each feature |
| **Skipping tests** | Technical debt accumulates | Test-first patterns |
| **Repeating CLAUDE.md** | Wastes tokens | Reference, don't repeat |

---

## Bridging to Increments

After creating the MVP Plan, use `creating-increments` to create the first increment (v0.1.0).

### From MVP Plan to Increment

The MVP Plan defines phases. The first increment executes those phases:

```
MVP Plan
├── Phase 1: Foundation
├── Phase 2: Core Features
├── Phase 3: Integration
├── Phase 4: Quality
└── Phase 5: Deployment
        ↓
[creating-increments]
        ↓
Increment: [name]-v1.md
├── Goal: Ship v0.1.0 MVP
├── Success Criteria: From MVP Brief + Strategy
├── Build Plan: Combine phases into executable steps
└── PDAI structure for execution
```

### Increment Creation Steps

1. **Review MVP Plan** - Understand all phases
2. **Define Increment Goal** - "Ship v0.1.0 of [MVP Name]"
3. **Translate Success Criteria** - From MVP Brief
4. **Combine Build Plans** - All phases into one increment
5. **Add PDAI Sections** - Prepare, Deliver, Assess, Improve

### Increment Naming

For MVP creation workflow:
- First increment: `[mvp-name]-v1.md`
- Stored in: `docs/increments/`

### What Goes in the Increment

| From MVP Plan | In Increment |
|---------------|--------------|
| Phases | Build Plan steps |
| Phase goals | Step goals |
| Phase verification | Step verification |
| Launch checklist | Success criteria |

### Example Bridging

**MVP Plan** (high-level):
```markdown
## Phase 1: Foundation
- Project setup
- Core data models
- Authentication

## Phase 2: Core Features
- Feature A
- Feature B
```

**Increment** (execution-ready):
```markdown
## Build Plan

### Step 1: Project Setup
**Goal**: Initialize project with Ash/Phoenix stack
**Prompt**: [Detailed CLI prompt]
**Verification**: mix compile && mix test

### Step 2: Core Data Models
**Goal**: Create User and [Entity] resources
**Prompt**: [Detailed CLI prompt]
**Verification**: mix test test/resources/

[...continues with all phases integrated...]
```

---

## Integration with Creating MVP Workflow

When used within the `creating-mvp` workflow:

```
[MVP Brief] + [Vision] + [Strategy]
        ↓
[creating-mvp-plans]
        ↓
MVP Plan (docs/products/[name]/mvp-plan.md)
        ↓
[creating-increments]
        ↓
Increment (docs/increments/[name]-v1.md)
        ↓
[building-increments]
        ↓
Working v0.1.0
```

The MVP Plan provides the blueprint; the Increment provides the executable plan.

---

## Validation Checklist

Before finalizing plan:

**Scope:**
- [ ] MVP scope is truly minimum
- [ ] Each feature passes "can we launch without this?" test
- [ ] Scope aligns with strategy document

**Structure:**
- [ ] Phases are ordered by dependencies
- [ ] Each phase has a Build Plan with steps
- [ ] Each step is 1-2 hours max

**Build Plans:**
- [ ] Steps use appropriate prompt patterns
- [ ] Each step has Goal, Prompt, Verification
- [ ] Steps reference existing code/patterns
- [ ] Don't repeat CLAUDE.md content

**Quality:**
- [ ] CLAUDE.md has project quality standards
- [ ] Test requirements are clear
- [ ] Phase verification defined

**Increment Readiness:**
- [ ] Plan can be translated to increment
- [ ] Success criteria defined for v0.1.0
- [ ] All phases have executable Build Plans
