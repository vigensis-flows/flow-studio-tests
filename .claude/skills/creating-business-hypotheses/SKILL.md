---
name: creating-business-hypotheses
description: >
  DEPRECATED: Business hypotheses are now integral to the MVP Brief, created
  during the writing-mvp-brief step of the create-mvp-brief sub-workflow.
  The Business Architect perspective is embedded in the exploration and
  writing steps rather than running as a post-hoc add-on.
argument-hint: "<product-slug>"
---

> **DEPRECATED**: Business hypotheses are now created as part of the
> `writing-mvp-brief` skill within the `create-mvp-brief` sub-workflow.
> This skill is kept for reference only.

# Creating Business Hypotheses

You are acting as the Business Architect reviewing an MVP Brief to propose the most important hypotheses this MVP should test. Your focus is business viability — will this create and capture value?

## Context

The Product Trio (PM, Designer, Tech Lead) has completed initial discovery and produced an MVP Brief. Before the team proceeds to vision, design, and architecture, you bring the business viability lens to ensure the MVP is designed to test the right assumptions.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| MVP Brief | `docs/product-definition/1-mvp-brief.md` | Yes |

## Process

### Step 1: Read the MVP Brief

Read `docs/product-definition/1-mvp-brief.md`. Understand the proposed MVP scope, target user, problem, and solution approach.

### Step 2: Identify Key Assumptions

Every MVP rests on assumptions. Identify the riskiest ones across three categories:

- **Value Hypothesis**: Do users actually have this problem? Will they use this solution?
- **Business Hypothesis**: Can we capture value? Will users pay / engage / retain?
- **Usability Hypothesis**: Can users accomplish the core task without hand-holding?

### Step 3: Propose Top 3 Hypotheses

Select the 3 most important hypotheses to test — one from each category. Each hypothesis must be:

- **Specific**: Not "users will like it" but "freelance designers with 5+ clients will use the dashboard at least 3x/week"
- **Testable**: The MVP as scoped can actually provide signal on this
- **Falsifiable**: There's a clear "we were wrong" outcome
- **Consequential**: If wrong, it changes what we build next

### Step 4: Update the MVP Brief

Add a "Hypotheses to Test" section to `docs/product-definition/1-mvp-brief.md`. Insert it after the MVP scope section (or at the end if no clear insertion point).

Do NOT rewrite or restructure existing content. Add your section cleanly.

## Hypothesis Format

Each hypothesis follows this structure:

```markdown
## Hypotheses to Test

These hypotheses were identified by the Business Architect to ensure the MVP
is designed to validate our riskiest assumptions.

### 1. Value Hypothesis
**We believe** [specific assumption about user value]
**MVP tests this by** [what the MVP includes/measures to test this]
**We'll know we're right when** [specific, measurable signal]
**We'll know we're wrong when** [specific, measurable counter-signal]

### 2. Business Hypothesis
**We believe** [specific assumption about business viability]
**MVP tests this by** [what the MVP includes/measures to test this]
**We'll know we're right when** [specific, measurable signal]
**We'll know we're wrong when** [specific, measurable counter-signal]

### 3. Usability Hypothesis
**We believe** [specific assumption about user capability]
**MVP tests this by** [what the MVP includes/measures to test this]
**We'll know we're right when** [specific, measurable signal]
**We'll know we're wrong when** [specific, measurable counter-signal]
```

## Quality Standards

- Hypotheses must be specific to this product, not generic startup wisdom
- Each hypothesis must be testable within the MVP scope — don't propose hypotheses that require features not in the brief
- The "we'll know when" signals must be observable, not aspirational
- The section must integrate cleanly with the existing brief — same tone, same level of specificity
- Do not modify any existing content in the brief
