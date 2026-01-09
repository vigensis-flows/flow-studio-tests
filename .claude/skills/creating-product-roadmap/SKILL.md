---
name: creating-product-roadmap
description: Creates product roadmap documents with outcome-focused Now/Next/Later horizons. Use when user asks to "create a roadmap", "define what we're building", or after completing product vision and strategy. Also use when scoping MVP or planning increments.
---

# Creating Product Roadmap

Creates well-structured product roadmap documents that communicate what we're building and when, focused on outcomes rather than features.

## What is a Product Roadmap?

A roadmap communicates **direction, not commitments**. It shows:
- Problems we're solving (not features we're building)
- Outcomes we're pursuing
- Confidence levels at each horizon

**Roadmap is NOT a project plan.** Project plans have tasks, assignments, and deadlines. Roadmaps show strategic direction.

**Roadmap is NOT a feature list.** Features are outputs. Roadmaps focus on outcomes and capabilities.

---

## Roadmap Document Structure

### Core Sections

| Section | Purpose | Key Content |
|---------|---------|-------------|
| **Now** | Current focus (0-3 months) | High-confidence commitments, success criteria |
| **Next** | Medium-term direction (3-9 months) | Medium-confidence direction, dependencies |
| **Later** | Long-term vision (9+ months) | Low-confidence strategic direction, uncertainties |
| **Discovery Summary** | What we learned | Key questions answered, assumptions validated |

### Horizon Characteristics

| Horizon | Confidence | Detail Level | Changes |
|---------|------------|--------------|---------|
| **Now** | High | Specific outcomes, success criteria | Rarely (committed) |
| **Next** | Medium | Directional outcomes | Monthly refinement |
| **Later** | Low | Strategic themes | Quarterly review |

**Target length:** 100-200 lines

---

## Creation Process

### Step 1: Confirm Prerequisites

Before creating a roadmap, ensure you have:
- Product Vision (where we're going)
- Product Strategy (how we'll get there)
- Discovery insights (what we learned)

If these don't exist, create them first using the appropriate skills.

### Step 2: Define "Now" Horizon

The Now section is your MVP or current increment scope. It becomes the input for increment planning.

**Structure:**
```markdown
## Now (Next 3 Months)

**Outcome**: [What customers can do when this is complete]

### Capabilities

| Capability | Why It Matters | Success Criteria |
|------------|----------------|------------------|
| [Capability 1] | [Customer value] | [Measurable criteria] |
| [Capability 2] | [Customer value] | [Measurable criteria] |

### Scope Boundaries

**In scope:**
- [Included capability/outcome]

**Out of scope (deferred to Next/Later):**
- [Excluded item] - [Why deferred]

### Key Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| [Decision area] | [What we chose] | [Why] |

### Open Questions to Resolve

- [Question that will be answered during execution]
```

**Guidance for Now:**
- Be specific about success criteria (measurable)
- Keep scope boundaries explicit
- Document key decisions with rationale
- List questions we'll answer by building

### Step 3: Define "Next" Horizon

The Next section shows medium-term direction. Less detailed than Now.

**Structure:**
```markdown
## Next (3-9 Months)

**Outcome**: [Target outcome for this horizon]

### Direction

- [Capability/outcome 1] - [Why valuable]
- [Capability/outcome 2] - [Why valuable]

### Dependencies

- [What must be true from Now for this to proceed]
- [External dependency]

### Open Questions

- [Strategic question to resolve before committing]
```

**Guidance for Next:**
- Stay outcome-focused, not feature-focused
- Acknowledge uncertainty (medium confidence)
- Note dependencies on Now completion
- List strategic questions still open

### Step 4: Define "Later" Horizon

The Later section shows long-term strategic direction. Deliberately vague.

**Structure:**
```markdown
## Later (9+ Months)

**Outcome**: [Long-term vision for product capabilities]

### Strategic Direction

- [Theme/direction 1]
- [Theme/direction 2]

### Major Uncertainties

- [What could change this direction]
- [Market/technology unknown]
```

**Guidance for Later:**
- Keep it thematic, not specific
- Acknowledge high uncertainty
- Connect to product vision
- Note what could change direction

### Step 5: Document Discovery Summary

Capture key learnings from the discovery process.

**Structure:**
```markdown
## Discovery Summary

### Key Questions Answered

| Question | Answer | Source |
|----------|--------|--------|
| [Question from discovery] | [What we learned] | [Research/interview/analysis] |

### Assumptions Made

| Assumption | Confidence | Validation Plan |
|------------|------------|-----------------|
| [Assumption] | High/Medium/Low | [How we'll validate] |

### Risks Identified

| Risk | Severity | Mitigation |
|------|----------|------------|
| [Risk] | High/Medium/Low | [How we'll address] |
```

---

## Quality Checklist

Before finalizing, verify:

### Content
- [ ] Now section has specific, measurable success criteria
- [ ] Scope boundaries are explicit (in/out)
- [ ] Key decisions documented with rationale
- [ ] Next section is directional, not over-specified
- [ ] Later section connects to vision
- [ ] Discovery insights captured

### Structure
- [ ] All core sections present
- [ ] Appropriate detail level per horizon
- [ ] 100-200 lines total length
- [ ] Scannable (tables, bullets)

### Alignment
- [ ] Now supports Strategy's near-term goals
- [ ] Next aligns with Strategy's medium-term direction
- [ ] Later connects to Vision
- [ ] No contradictions with Strategy

### Red Flags (Fix Before Finalizing)
- [ ] No feature lists (focus on outcomes)
- [ ] No false precision in Later (stay thematic)
- [ ] No missing scope boundaries in Now
- [ ] No undocumented assumptions

---

## Template

```markdown
# Product Roadmap: [Product Name]

*Updated: [Date]*
*Status: [Draft | Active | Under Review]*

---

## Now (Next 3 Months)

**Outcome**: [What customers can do when this is complete]

### Capabilities

| Capability | Why It Matters | Success Criteria |
|------------|----------------|------------------|
| | | |

### Scope Boundaries

**In scope:**
-

**Out of scope (deferred):**
- [Item] - [Reason for deferral]

### Key Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| | | |

### Open Questions to Resolve

-

---

## Next (3-9 Months)

**Outcome**: [Target outcome for this horizon]

### Direction

-

### Dependencies

-

### Open Questions

-

---

## Later (9+ Months)

**Outcome**: [Long-term vision for product capabilities]

### Strategic Direction

-

### Major Uncertainties

-

---

## Discovery Summary

### Key Questions Answered

| Question | Answer | Source |
|----------|--------|--------|
| | | |

### Assumptions Made

| Assumption | Confidence | Validation Plan |
|------------|------------|-----------------|
| | | |

### Risks Identified

| Risk | Severity | Mitigation |
|------|----------|------------|
| | | |

---

## References

- [Product Vision](./vision.md)
- [Product Strategy](./strategy.md)
- [Discovery Log](./discovery-log.md)
```

---

## Anti-Patterns to Avoid

| Anti-Pattern | Description | Fix |
|--------------|-------------|-----|
| **Feature Factory** | Lists features, not outcomes | Rewrite as customer capabilities/outcomes |
| **False Precision** | Later has same detail as Now | Reduce Later to themes only |
| **Missing Boundaries** | No explicit scope exclusions | Add "Out of scope" section |
| **Undocumented Decisions** | Key choices without rationale | Add decision table with reasoning |
| **Strategy Duplication** | Repeats Strategy content | Reference Strategy, don't duplicate |
| **Project Plan Creep** | Includes tasks/assignments | Keep at outcome level |

---

## Relationship to Other Documents

| Document | Relationship |
|----------|-------------|
| **Vision** | Roadmap moves toward Vision |
| **Strategy** | Roadmap implements Strategy priorities |
| **Increment** | Now section becomes increment input |
| **Discovery Log** | Discovery Summary synthesizes key learnings |

---

## Living Document

Roadmaps should be updated regularly:

| Horizon | Update Frequency |
|---------|------------------|
| Now | When scope changes (rare during increment) |
| Next | Monthly refinement |
| Later | Quarterly review |

When updating, note what changed and why in a "Changelog" section or commit message.
