---
name: implementing-features
description: Orchestrates full feature development from vision to implementation following PDAI. Use when starting a new feature, implementing a capability, or when user says "implement this feature", "build this", or "let's develop this". Coordinates product team and delivery agents through Prepare, Deliver, Assess, Improve phases.
---

# Implementing Features

Orchestrates the complete PDAI cycle for feature development, coordinating multiple agents and skills from initial understanding through final delivery.

## Overview

Feature implementation is a collaborative process involving:
- **Product Team** (PM, Designer, Tech Lead) - owns understanding and refinement
- **Increment Delivery Agent** - owns planning, building, and improvement execution
- **Increment Reviewer Agent** - owns quality gates and feedback

Each phase uses specialized skills, with clear handoffs between agents.

---

## The Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│ PREPARE PHASE (~25%)                                            │
│                                                                 │
│  1. Product Team: understanding-features                        │
│     └─► Feature Brief (goal, users, value, constraints)        │
│                                                                 │
│  2. Delivery Agent: planning-increments                         │
│     └─► Increment Plan (strategic + tactical)                  │
│                                                                 │
│  3. Reviewer Agent: reviewing-increments                        │
│     └─► Review Feedback (gaps, risks, suggestions)             │
│                                                                 │
│  4. Delivery Agent: refining-increments                         │
│     └─► Refined Plan (ready for execution)                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ DELIVER PHASE (~25%)                                            │
│                                                                 │
│  5. Delivery Agent: building-increments                         │
│     └─► Executed Steps (code, tests, docs)                     │
│                                                                 │
│  6. Reviewer Agent: reviewing-increments                        │
│     └─► Delivery Feedback (quality, completeness)              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ EVALUATE PHASE (~25%)                                           │
│                                                                 │
│  7. Delivery Agent: refining-increments                         │
│     └─► Improvement Proposals (artifacts + process)            │
│                                                                 │
│  8. Product Team + Human: refining-features                     │
│     └─► Improvement Plan (prioritized, approved)               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ IMPROVE PHASE (~25%)                                            │
│                                                                 │
│  9. Delivery Agent: building-increments                         │
│     └─► Improvements Executed                                  │
│                                                                 │
│ 10. Reviewer Agent: reviewing-increments                        │
│     └─► Final Review (complete/iterate)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Agents and Responsibilities

### Product Team

The Product Trio working together:

| Agent | Focus | Key Questions |
|-------|-------|---------------|
| **Product Manager** | Value & Viability | Will users want this? Does it work for the business? |
| **Product Designer** | Usability & Experience | Can users figure this out? Is it delightful? |
| **Tech Lead** | Feasibility & Quality | Can we build this? What are the technical risks? |

**Uses skills:**
- `understanding-features` - Elaborate what we're building and why
- `refining-features` - Elaborate improvement proposals with human input

### Increment Delivery Agent

Owns the tactical execution:

| Responsibility | Description |
|---------------|-------------|
| **Planning** | Create detailed increment plan with executable steps |
| **Building** | Execute each step, produce artifacts |
| **Proposing** | Identify improvement opportunities |

**Uses skills:**
- `planning-increments` - Create strategic + tactical plan
- `building-increments` - Execute plan steps
- `refining-increments` - Refine based on feedback, propose improvements

### Increment Reviewer Agent

Owns quality gates:

| Responsibility | Description |
|---------------|-------------|
| **Plan Review** | Assess completeness, risks, feasibility |
| **Delivery Review** | Verify quality, check success criteria |
| **Final Review** | Confirm improvement completion |

**Uses skills:**
- `reviewing-increments` - Review at each gate

---

## Phase Details

### Phase 1: Prepare

**Goal:** Fully understand what we're building and create an executable plan.

#### Step 1: Understanding (Product Team)

The Product Team elaborates the feature using `understanding-features`:

**Inputs:**
- Feature request or idea
- Business context
- User research (if available)

**Outputs:** Feature Brief containing:
- Goal: What outcome are we delivering?
- Users: Who benefits and how?
- Value: Why does this matter?
- Constraints: Technical, business, time
- Success Criteria: How we'll measure success
- Scope: In/out boundaries

**Handoff:** Feature Brief → Delivery Agent

#### Step 2: Planning (Delivery Agent)

The Delivery Agent creates the increment plan using `planning-increments`:

**Inputs:**
- Feature Brief
- Codebase context
- Existing patterns

**Outputs:** Increment Plan containing:
- Strategic: Goal, Hypothesis, Success Criteria, Decisions, Risks
- Tactical: Build Plan with executable steps
  - Each step: Goal, Prompt, Acceptance, Verification

**Handoff:** Increment Plan → Reviewer Agent

#### Step 3: Plan Review (Reviewer Agent)

The Reviewer Agent assesses the plan using `reviewing-increments`:

**Inputs:**
- Increment Plan
- Feature Brief (for alignment check)

**Outputs:** Review Feedback containing:
- Gaps: Missing considerations
- Risks: Underestimated or missing risks
- Suggestions: Improvements to approach
- Questions: Clarifications needed
- Verdict: Ready / Needs Refinement

**Handoff:** Review Feedback → Delivery Agent

#### Step 4: Plan Refinement (Delivery Agent)

The Delivery Agent refines the plan using `refining-increments`:

**Inputs:**
- Increment Plan
- Review Feedback

**Outputs:** Refined Plan containing:
- Addressed feedback
- Updated steps
- Resolved questions

**Gate:** Plan must be "Ready" before proceeding to Deliver.

---

### Phase 2: Deliver

**Goal:** Execute the plan, produce working artifacts.

#### Step 5: Building (Delivery Agent)

The Delivery Agent executes the plan using `building-increments`:

**Inputs:**
- Refined Increment Plan
- Build Plan steps

**Process:**
- Execute each step's prompt
- Run verification
- Record results in increment document
- Handle blockers (ask for help or adjust)

**Outputs:**
- Artifacts created (code, tests, docs)
- Increment document updated with Deliver summary

**Handoff:** Completed artifacts → Reviewer Agent

#### Step 6: Delivery Review (Reviewer Agent)

The Reviewer Agent assesses delivery using `reviewing-increments`:

**Inputs:**
- Delivered artifacts
- Success Criteria from plan

**Outputs:** Delivery Feedback containing:
- Criteria check: Met / Partially Met / Not Met
- Quality observations
- Issues found
- Improvement opportunities identified

**Handoff:** Delivery Feedback → Delivery Agent

---

### Phase 3: Evaluate

**Goal:** Honestly assess what was delivered and identify improvements.

#### Step 7: Propose Improvements (Delivery Agent)

The Delivery Agent proposes improvements using `refining-increments`:

**Inputs:**
- Delivery Feedback
- Observations during building

**Outputs:** Improvement Proposals containing:
- Artifact improvements (code quality, test coverage, docs)
- Process improvements (workflow, tools, skills)
- Lessons learned
- Estimated effort per improvement

**Handoff:** Improvement Proposals → Product Team + Human

#### Step 8: Improvement Planning (Product Team + Human)

The Product Team works with the human using `refining-features`:

**This is a human checkpoint.** The team presents:
- What was delivered
- How it went (observations, surprises)
- Proposed improvements

**Human involvement:**
- Accept/reject proposals
- Add additional improvements
- Prioritize what to address now vs later
- Approve the improvement plan

**Outputs:** Improvement Plan containing:
- Approved improvements (prioritized)
- Deferred items (captured for later)
- Updated increment document

**Handoff:** Improvement Plan → Delivery Agent

---

### Phase 4: Improve

**Goal:** Execute approved improvements, complete the cycle.

#### Step 9: Execute Improvements (Delivery Agent)

The Delivery Agent executes improvements using `building-increments`:

**Inputs:**
- Improvement Plan
- Existing artifacts

**Process:**
- Execute each improvement step
- Update artifacts
- Run verification

**Outputs:**
- Improved artifacts
- Updated increment document

**Handoff:** Improved artifacts → Reviewer Agent

#### Step 10: Final Review (Reviewer Agent)

The Reviewer Agent does final assessment using `reviewing-increments`:

**Inputs:**
- Improved artifacts
- Full increment document

**Outputs:** Final Review containing:
- Success Criteria: Final status
- Quality assessment
- Recommendation: Complete / Another cycle needed

**If Complete:** Update increment status to "Complete"
**If Another Cycle:** Return to Prepare with learnings

---

## Skills Reference

| Skill | Owner | Phase | Purpose |
|-------|-------|-------|---------|
| `understanding-features` | Product Team | Prepare | Elaborate what and why |
| `planning-increments` | Delivery Agent | Prepare | Create executable plan |
| `reviewing-increments` | Reviewer Agent | All | Quality gates |
| `refining-increments` | Delivery Agent | Prepare, Assess | Apply feedback, propose improvements |
| `building-increments` | Delivery Agent | Deliver, Improve | Execute plan steps |
| `refining-features` | Product Team | Assess | Human-involved improvement planning |

---

## Artifacts

### Feature Brief

Created by Product Team in Step 1.

```markdown
# Feature: [Name]

## Goal
[One sentence: what outcome are we delivering?]

## Users
[Who benefits and how?]

## Value
[Why does this matter? Business impact?]

## Constraints
- Technical: [Constraints]
- Business: [Constraints]
- Time: [Constraints]

## Success Criteria
- [ ] [Measurable criterion]
- [ ] [Measurable criterion]

## Scope
**In:** [What's included]
**Out:** [What's explicitly excluded]

## Open Questions
- [Questions to resolve during planning]
```

### Increment Plan

Created by Delivery Agent in Step 2. Uses `docs/templates/increment.md` structure with added Build Plan section.

### Review Feedback

Created by Reviewer Agent at each gate.

```markdown
# Review: [Increment Name]
**Phase:** [Prepare | Deliver | Improve]
**Date:** YYYY-MM-DD

## Verdict
[Ready | Needs Refinement | Major Concerns]

## Strengths
- [What's working well]

## Gaps
- [Missing considerations]

## Risks
- [Underestimated or missing risks]

## Suggestions
- [Specific improvements]

## Questions
- [Clarifications needed]
```

### Improvement Plan

Created by Product Team + Human in Step 8.

```markdown
# Improvement Plan: [Feature Name]

## Approved Improvements
| Improvement | Priority | Effort | Owner |
|-------------|----------|--------|-------|
| [Description] | P1 | Small | Delivery Agent |

## Deferred
| Improvement | Reason | Capture For |
|-------------|--------|-------------|
| [Description] | [Why deferred] | [Next increment / Backlog] |

## Process Changes
- [Changes to how we work]
```

---

## Invocation

### Starting a Feature

```
/implementing-features [feature description]
```

Or when user says:
- "Implement [feature]"
- "Let's build [capability]"
- "Develop [feature]"

### Process

1. Invoke `understanding-features` with the feature description
2. Guide through the PDAI workflow
3. Coordinate handoffs between agents
4. Ensure human checkpoint at Step 8
5. Track progress in increment document

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Skipping understanding** | Building wrong thing | Always start with Product Team elaboration |
| **Vague plan** | Can't execute | Build Plan must have executable prompts |
| **Skipping reviews** | Quality issues | Reviews are gates, not optional |
| **No human checkpoint** | Improvements not aligned | Step 8 requires human involvement |
| **Rushing Improve** | Tech debt accumulates | Give Improve full 25% of time |

---

## Success Criteria for This Skill

The implementing-features workflow succeeds when:
- [ ] Feature Brief captures goal, users, value, constraints
- [ ] Increment Plan is executable (steps have prompts)
- [ ] Reviews happen at each gate
- [ ] Human is involved in improvement planning
- [ ] Improvements are actually executed (not deferred forever)
- [ ] Increment document is complete at the end
