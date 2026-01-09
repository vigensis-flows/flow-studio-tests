---
name: understanding-mvp
description: Product Trio conducts structured discovery rounds to understand what the MVP should be. Analyzes input, discovers questions, validates assumptions through research, and converges on scope. Use when starting MVP creation to build shared understanding before creating product documents.
---

# Understanding MVP

The Product Trio (PM, Designer, Tech Lead) works through structured discovery rounds to understand what the MVP should be. This skill focuses on the **discovery process** - building shared understanding through discussion and research.

**This skill produces:** Discovery Log (the record of discovery rounds)

**After discovery, use separate skills to create:**
- `creating-product-vision` → Vision document
- `creating-product-strategy` → Strategy document
- `creating-product-roadmap` → Roadmap document

## Who Uses This Skill

The **Product Trio** working as equals:

| Role | Focus | Key Questions |
|------|-------|---------------|
| **Product Manager** | Value & Viability | Will users pay? Does it work for business? |
| **Product Designer** | Usability & Experience | Can users figure it out? Is it delightful? |
| **Tech Lead** | Feasibility & Quality | Can we build this? What are the risks? |

All three perspectives required for complete understanding.

---

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| **Product Name** | product-context.md | Yes |
| **Description** | product-context.md | No |
| **Input Digest** | processing-mvp-input | If files provided |

---

## Process: Discovery Rounds

### Round Structure

Each round follows this pattern:

```
┌─────────────────────────────────────────────────────────────────┐
│ ROUND N                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. PERSPECTIVE SHARING                                         │
│     PM:       Problem space, value hypothesis, business fit     │
│     Designer: User needs, experience vision, usability risks    │
│     Tech Lead: Feasibility, architecture, technical risks       │
│                                                                 │
│  2. DISCOVERY                                                   │
│     - What questions emerged?                                   │
│     - What assumptions are we making?                           │
│     - What needs research to answer?                            │
│                                                                 │
│  3. RESEARCH (parallel)                                         │
│     - Spawn deep-research tasks for answerable questions        │
│     - Integrate research findings into discussion               │
│                                                                 │
│  4. CONVERGENCE CHECK                                           │
│     - Do we have enough understanding to create product docs?   │
│     - Are there blocking questions only stakeholders can answer?│
│     - Do we need another round?                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Convergence Rules

| Condition | Action |
|-----------|--------|
| Sufficient understanding | Converge → Ready for product docs |
| Blocking questions, rounds < max | Continue to next round |
| Blocking questions, rounds = max | Escalate → Create stakeholder questions |

Default max rounds: 5 (configurable)

---

## Round Details

### Round 1: Initial Analysis

**Purpose**: First pass understanding from each perspective.

**PM Analysis:**
- What problem does this solve?
- Who has this problem most acutely?
- Why would they pay for this?
- What's the business model hypothesis?
- What competitors exist?

**Designer Analysis:**
- Who are the users?
- What's their current journey/workaround?
- What would delight them?
- What's the core experience?
- What usability risks exist?

**Tech Lead Analysis:**
- Is this technically feasible?
- What's the likely architecture?
- What are the technical risks?
- What technologies should we use?
- What's complex vs. straightforward?

**Output:**
- Initial understanding by perspective
- Open Questions list
- Assumptions list
- Research Needs list

### Rounds 2-N: Deepen Understanding

**Purpose**: Resolve questions, validate assumptions, build confidence.

**Activities:**
1. Review research findings from previous round
2. Update understanding based on new information
3. Challenge assumptions
4. Identify remaining gaps
5. Work toward convergence

**Trio Discussion Pattern:**
```markdown
## Round [N] Discussion

### Research Findings Reviewed
- [Finding 1]: How this changes our understanding
- [Finding 2]: How this changes our understanding

### Updated Understanding

**PM**: [Updated view on value/viability]
**Designer**: [Updated view on users/experience]
**Tech Lead**: [Updated view on feasibility/approach]

### Resolved Questions
- [Question]: [Answer with source]

### New Questions
- [Question]: [Why this emerged]

### Assumptions Updated
- [Assumption]: [Validated | Invalidated | Still unvalidated]

### Convergence Assessment
[Do we have enough understanding? What's blocking?]
```

### Final Round: Convergence

When team is ready to converge, confirm:

1. **Problem clarity**: Do we understand the problem well enough?
2. **User clarity**: Do we know who we're building for?
3. **Value clarity**: Do we know why they'd use/pay for this?
4. **Feasibility clarity**: Do we know we can build this?
5. **Scope clarity**: Do we have a sense of Now vs Later?

If yes to all → Ready for product documents
If no → Either continue rounds or escalate blocking questions

---

## Output: Discovery Log

Store at: `docs/product/discovery-log.md`

```markdown
# Discovery Log: [Product Name]

**Rounds Completed**: [N]
**Final Status**: [Converged | Escalated]
**Date**: YYYY-MM-DD

---

## Round 1: Initial Analysis

**Date**: YYYY-MM-DD

### PM Perspective
[Initial analysis - problem, value, business model, competition]

### Designer Perspective
[Initial analysis - users, experience, usability, delight]

### Tech Lead Perspective
[Initial analysis - feasibility, architecture, risks, technologies]

### Questions Identified
- [ ] [Question 1]
- [ ] [Question 2]

### Assumptions Made
- [Assumption 1]
- [Assumption 2]

### Research Requested
- [Topic 1] → [research findings summary]

---

## Round 2: [Focus Area]

**Date**: YYYY-MM-DD

### Research Findings Reviewed
- [Finding]: [Impact on understanding]

### Updated Understanding

**PM**: [Updated view]
**Designer**: [Updated view]
**Tech Lead**: [Updated view]

### Resolved Questions
- [Question]: [Answer] - [Source]

### New Questions
- [Question]: [Why it emerged]

### Assumptions Updated
- [Assumption]: [Status]

---

[Continue for each round...]

---

## Convergence Decision

**Decision**: [Converged | Escalated]
**Date**: YYYY-MM-DD

### What We Understand

**Problem**: [Summary of problem understanding]
**Users**: [Summary of user understanding]
**Value**: [Summary of value proposition]
**Feasibility**: [Summary of technical approach]

### Key Insights

1. [Major insight from discovery]
2. [Major insight from discovery]
3. [Major insight from discovery]

### Remaining Uncertainties

[What we're still not sure about but proceeding anyway]

### Stakeholder Questions (if escalated)

[Questions that require human input before proceeding]

---

## Ready for Product Documents

The team has sufficient understanding to create:
- [ ] Product Vision (use creating-product-vision skill)
- [ ] Product Strategy (use creating-product-strategy skill)
- [ ] Product Roadmap (use creating-product-roadmap skill)
```

---

## Stakeholder Questions (if escalated)

If discovery cannot converge, create: `docs/product/stakeholder-questions.md`

```markdown
# Stakeholder Questions: [Product Name]

**Status**: Awaiting Response
**Created**: YYYY-MM-DD
**Blocking**: Product Definition

---

## Context

We've completed [N] rounds of discovery for [Product Name]. The Product Trio has been unable to resolve the following questions, which are blocking our ability to define the product.

---

## Blocking Questions

### Question 1: [Question]

**Why we need this answered**: [Impact on product definition]
**What we've tried**: [Research/reasoning attempted]
**Our best guess**: [If we had to assume]
**Risk of assuming**: [What could go wrong]

### Question 2: [Question]

[Continue for each question...]

---

## What We Can Proceed With

Even without answers, we can:
- [Action we can take]
- [Action we can take]

---

## Requested By

Product Trio:
- Product Manager (Product Maestro)
- Product Designer (Design Shaper)
- Tech Lead (Tech Smith)
```

---

## Discovery Techniques

### Asking Good Questions

**Problem Space:**
- What's the job to be done?
- What's the current workaround?
- What's the cost of the status quo?

**Value:**
- Why would someone pay for this?
- What would make them choose this over alternatives?
- What's the minimum to deliver value?

**Users:**
- Who has this problem most acutely?
- What's their context when they need this?
- What would delight them?

**Feasibility:**
- What's technically hard about this?
- What's been solved before that we can leverage?
- Where are the unknowns?

### Challenging Assumptions

For each assumption, ask:
- What evidence do we have?
- What would prove this wrong?
- What's the impact if we're wrong?

### Using Research

When research returns:
1. Share findings with full Trio
2. Update understanding based on evidence
3. Note where research conflicts with assumptions
4. Identify new questions raised by research

---

## Collaboration Pattern

The Trio works together, not in silos:

```
Round Start
    │
    ├── PM shares perspective
    │   └── Designer and Tech Lead ask clarifying questions
    │
    ├── Designer shares perspective
    │   └── PM and Tech Lead ask clarifying questions
    │
    ├── Tech Lead shares perspective
    │   └── PM and Designer ask clarifying questions
    │
    ├── Joint discussion
    │   └── Synthesize, identify tensions, resolve or flag
    │
    └── Convergence check (joint decision)
```

### Healthy Tension

Each role pushes back:
- **PM**: "Is this enough value? Will they pay?"
- **Designer**: "Is this usable? Will they succeed?"
- **Tech Lead**: "Can we build this? What's the risk?"

Tension is good. It surfaces issues early.

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Single perspective** | Missing risks | Ensure all three roles contribute |
| **Premature convergence** | Unvalidated assumptions | Complete rounds until truly ready |
| **Analysis paralysis** | Never converging | Time-box, accept uncertainty |
| **Guessing without research** | Low confidence | Spawn research for answerable questions |
| **Ignoring conflicts** | Hidden risks | Surface and resolve or flag |
| **Jumping to solutions** | Miss the problem | Focus on understanding before solutioning |

---

## Success Criteria

The understanding-mvp skill succeeds when:

- [ ] All three perspectives contributed
- [ ] Key questions identified and addressed
- [ ] Assumptions made explicit
- [ ] Research conducted for answerable questions
- [ ] Sufficient understanding to create product documents
- [ ] Either converged or cleanly escalated with stakeholder questions
- [ ] Discovery Log captures the journey

---

## What Happens Next

After discovery converges, the workflow should:

1. **Use creating-product-vision skill** to create Vision document
2. **Use creating-product-strategy skill** to create Strategy document
3. **Use creating-product-roadmap skill** to create Roadmap document

The Discovery Log informs all three documents and is referenced by them.
