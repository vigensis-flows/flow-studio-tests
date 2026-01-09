---
name: understanding-features
description: Elaborates feature requests into comprehensive Feature Briefs. Use when starting a new feature, when user says "let's build X", "we need a feature for Y", or at the start of the implementing-features workflow. Owned by the Product Team (PM, Designer, Tech Lead).
---

# Understanding Features

Transforms feature requests into comprehensive Feature Briefs that capture goal, users, value, constraints, and scope - providing clear direction for planning and implementation.

## Who Uses This Skill

The **Product Team** (Product Trio):

| Role | Focus | Key Questions |
|------|-------|---------------|
| **Product Manager** | Value & Viability | Will users want this? Does it work for the business? |
| **Product Designer** | Usability & Experience | Can users figure this out? Is it delightful? |
| **Tech Lead** | Feasibility & Quality | Can we build this? What are the technical risks? |

All three perspectives are needed for a complete Feature Brief.

---

## What is a Feature Brief?

A Feature Brief is a **shared understanding document** that:
- Captures what we're building and why
- Identifies who benefits and how
- Defines scope boundaries
- Surfaces constraints and open questions
- Provides foundation for increment planning

**A Feature Brief is NOT:**
- A technical specification (that comes in the increment)
- A detailed design document
- An implementation plan

---

## When to Use

**Use understanding-features when:**
- Starting a new feature from a request or idea
- A stakeholder asks "can we add X?"
- Beginning the implementing-features workflow
- Clarifying a vague requirement

**Don't use when:**
- Bug fixes (just fix them)
- Trivial changes (just do them)
- Already have a clear Feature Brief

---

## Feature Brief Structure

```markdown
# Feature: [Name]

**Status**: [Draft | Ready for Planning | In Progress | Complete]
**Created**: YYYY-MM-DD
**Owner**: [Product Manager name/agent]

---

## Goal

[One sentence: what outcome are we delivering?]

## Problem Statement

[What problem does this solve? Why does it matter?]

## Users

### Primary Users
[Who benefits most? What's their situation?]

### Secondary Users
[Who else is affected?]

## Value

### User Value
[What do users get? How does their life improve?]

### Business Value
[Revenue, retention, efficiency, strategic position?]

## Constraints

### Technical
- [Existing system constraints]
- [Performance requirements]
- [Integration requirements]

### Business
- [Timeline constraints]
- [Budget constraints]
- [Regulatory/compliance]

### Design
- [Brand guidelines]
- [Accessibility requirements]
- [Platform constraints]

## Success Criteria

- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

## Scope

### In Scope
- [What's included]

### Out of Scope
- [What's explicitly excluded]

### Future Considerations
- [What might come later]

## Open Questions

- [ ] [Question 1]
- [ ] [Question 2]

## References

- [Link to related docs]
- [Link to research]
- [Link to designs]
```

---

## Creation Process

### Step 1: Capture the Request

Start with what you have:
- User request or idea
- Stakeholder ask
- Problem observation
- Opportunity identified

Write it down exactly as received - don't interpret yet.

### Step 2: Ask "Why?"

Dig into the underlying need:
- What problem is this solving?
- Why does this matter now?
- What happens if we don't do this?
- Who is asking and why?

**Use The Mom Test approach**: Ask about their life, not your idea.

### Step 3: Identify Users

Who benefits from this feature?

**Primary users:**
- Who has this problem most acutely?
- What's their current workaround?
- How would they describe their need?

**Secondary users:**
- Who else is affected?
- Are there internal users (support, sales)?

### Step 4: Define Value

**User value:**
- Time saved?
- Capability unlocked?
- Pain eliminated?
- Delight added?

**Business value:**
- Revenue impact?
- Retention impact?
- Cost reduction?
- Strategic positioning?

### Step 5: Surface Constraints

Gather constraints from each perspective:

**PM perspective (business):**
- Timeline requirements?
- Budget limits?
- Regulatory/compliance needs?
- Dependencies on other work?

**Designer perspective:**
- Brand guidelines?
- Accessibility requirements?
- Platform constraints?
- User research findings?

**Tech Lead perspective:**
- Existing architecture constraints?
- Performance requirements?
- Security considerations?
- Technical debt implications?

### Step 6: Define Success

How will we know this worked?

- **Measurable**: Numbers, not feelings
- **Observable**: Can we actually measure it?
- **Meaningful**: Does it indicate real success?

Bad: "Users like it"
Good: "80% of users complete onboarding within 5 minutes"

### Step 7: Set Scope Boundaries

**In Scope**: What we will build
- Be specific about what's included
- List the core capabilities

**Out of Scope**: What we won't build
- Explicitly list exclusions
- Prevents scope creep later

**Future Considerations**: What might come later
- Acknowledge but defer
- Creates backlog for later

### Step 8: Capture Open Questions

What don't we know yet?
- Technical uncertainties
- User behavior questions
- Business model questions
- Design questions

These get resolved during planning or discovery.

---

## Quality Tests

### The "New Person" Test
> Could someone new to the team understand what we're building and why?

If not → Add more context to Problem Statement and Value.

### The "Why This?" Test
> Is it clear why this feature vs. alternatives?

If not → Add more to Problem Statement, clarify the constraint that makes this the right approach.

### The "How Do We Know?" Test
> Are success criteria specific and measurable?

If not → Add numbers and thresholds.

### The "What's Out?" Test
> Is scope clearly bounded?

If not → Add explicit Out of Scope items.

---

## Trio Collaboration Pattern

The Product Trio should work together on Feature Briefs:

```
1. PM drafts initial brief based on request
   └─► Focus: Goal, Problem, Value, Business constraints

2. Designer adds user perspective
   └─► Focus: Users, Design constraints, User value

3. Tech Lead adds feasibility perspective
   └─► Focus: Technical constraints, Open questions, Risks

4. Trio reviews together
   └─► Resolve conflicts, align on scope, finalize
```

### Healthy Tension

Each role should push back:
- **PM pushes for** scope that delivers business value
- **Designer pushes for** scope that serves user needs
- **Tech Lead pushes for** scope that's technically sound

The Feature Brief should reflect balanced trade-offs.

---

## Common Patterns

### Pattern: Stakeholder Request

```markdown
**Request**: "Sales needs a bulk export feature"

**Understanding process**:
1. What are they exporting? Why bulk?
2. What's the current workaround? How painful?
3. How often? How many records?
4. What format? Where does it go?
5. Who specifically asked? Can we talk to them?

**Feature Brief outcome**:
- Goal: Enable sales team to export prospect data for offline analysis
- Users: Sales reps (primary), Sales managers (secondary)
- Value: Save 2 hours/week per rep currently spent on manual copy/paste
- Constraint: Must handle 10K+ records, CSV format required
```

### Pattern: User Problem Observation

```markdown
**Observation**: "Users keep asking support how to undo actions"

**Understanding process**:
1. Which actions? How often?
2. What's the impact of not undoing?
3. Current workaround? (Call support, recreate manually)
4. Is this all users or specific segment?
5. What have we learned from support tickets?

**Feature Brief outcome**:
- Goal: Reduce support load by enabling users to self-serve undo
- Users: All users who make mistakes (everyone)
- Value: Reduce support tickets by 30%, improve user confidence
- Scope: Start with most common action (delete), expand later
```

### Pattern: Competitive Response

```markdown
**Trigger**: "Competitor X just launched feature Y"

**Understanding process**:
1. What exactly did they launch? How does it work?
2. Are our users asking for this? Evidence?
3. Is this table stakes or differentiator?
4. Can we do it better/differently?
5. What's the cost of not responding?

**Feature Brief outcome**:
- Goal: [Depends on analysis - might be "match" or "differentiate"]
- Constraint: Competitive timeline pressure
- Open question: Is this what our users actually need?
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Solution-first** | Skips understanding the problem | Ask "why?" before "what" |
| **Single perspective** | Misses constraints | Involve full trio |
| **Vague value** | Can't prioritize | Quantify impact |
| **No boundaries** | Scope creep inevitable | Explicit Out of Scope |
| **Assumed users** | Build for wrong people | Talk to actual users |
| **No success criteria** | Can't evaluate | Add measurable outcomes |

---

## Handoff to Planning

When the Feature Brief is complete:

1. **Status**: Change to "Ready for Planning"
2. **Review**: Trio confirms brief is complete
3. **Handoff**: Brief goes to Delivery Agent for increment planning
4. **Location**: Store in `docs/features/feature-name.md`

The Feature Brief becomes input for the `creating-increments` skill.

---

## Validation Checklist

Before marking "Ready for Planning":

**Completeness:**
- [ ] Goal is one clear sentence
- [ ] Problem statement explains why this matters
- [ ] Users are identified (primary and secondary)
- [ ] Value is articulated (user and business)
- [ ] Constraints are captured from all perspectives
- [ ] Success criteria are measurable

**Scope:**
- [ ] In Scope is specific
- [ ] Out of Scope is explicit
- [ ] Future Considerations captured

**Quality:**
- [ ] Passes "New Person" test
- [ ] Passes "Why This?" test
- [ ] Passes "How Do We Know?" test
- [ ] Open questions are listed
- [ ] All trio perspectives included
