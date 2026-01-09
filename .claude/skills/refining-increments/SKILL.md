---
name: refining-increments
description: Refines increment plans based on review feedback and proposes improvements after delivery. Use after receiving review feedback to update plans, or after delivery to propose improvement opportunities. Owned by the Increment Delivery Agent.
---

# Refining Increments

Applies review feedback to improve increment plans and proposes improvement opportunities after delivery.

## Who Uses This Skill

The **Increment Delivery Agent** - responsible for incorporating feedback and identifying improvements.

**Used in two contexts:**

| Context | When | Purpose |
|---------|------|---------|
| **Plan Refinement** | After Plan Review (Step 4) | Address reviewer feedback before Deliver |
| **Improvement Proposal** | After Delivery Review (Step 7) | Propose improvements for Assess phase |

---

## Context 1: Plan Refinement

### When to Use

After receiving Review Feedback from the Reviewer Agent on an increment plan.

### Input

- Increment Plan (current state)
- Review Feedback containing:
  - Verdict (Ready / Needs Refinement / Major Concerns)
  - Gaps identified
  - Risks identified
  - Suggestions
  - Questions
  - Required changes

### Process

#### Step 1: Categorize Feedback

Organize feedback into:

| Category | Action |
|----------|--------|
| **Required changes** | Must address before proceeding |
| **Valid suggestions** | Should incorporate |
| **Questions** | Must answer or investigate |
| **Nice-to-haves** | Consider but not blocking |
| **Disagreements** | Discuss with reviewer |

#### Step 2: Address Required Changes

For each required change:

1. **Understand** the concern
2. **Update** the relevant section
3. **Verify** the change addresses the concern
4. **Note** what changed and why

**Common required changes:**

| Issue | How to Address |
|-------|----------------|
| Vague goal | Rewrite with specific outcome |
| Unmeasurable criteria | Add numbers/thresholds |
| Missing risks | Add identified risks with mitigations |
| Scope unclear | Explicit in/out of scope |
| Build Plan steps too big | Split into smaller steps |
| Missing dependencies | Add prerequisite steps |

#### Step 3: Incorporate Suggestions

For each valid suggestion:

1. **Assess** impact on plan
2. **Integrate** into appropriate section
3. **Update** related sections if needed

#### Step 4: Answer Questions

For each question:

1. **Research** if needed
2. **Add answer** to plan (in relevant section)
3. **Or flag** as open question to resolve

#### Step 5: Handle Disagreements

If you disagree with feedback:

1. **Document** your reasoning
2. **Discuss** with reviewer
3. **Reach agreement** before proceeding
4. **Record** the resolution

#### Step 6: Update Plan

Make all changes to the increment document:

- Update affected sections
- Ensure consistency across sections
- Add "Refinement Notes" if helpful

#### Step 7: Request Re-Review (if needed)

If changes were significant:
- Request another review pass
- Highlight what changed

### Output

- Refined Increment Plan
- Ready to proceed to Deliver (or re-review)

---

## Context 2: Improvement Proposal

### When to Use

After receiving Delivery Feedback from the Reviewer Agent.

### Input

- Delivered artifacts
- Delivery Feedback containing:
  - Criteria check results
  - Quality observations
  - Issues found
  - Improvement opportunities identified
- Own observations from building

### Process

#### Step 1: Gather Improvement Sources

Collect improvement opportunities from:

1. **Reviewer feedback** - Issues and observations
2. **Building observations** - What you noticed while executing
3. **Success criteria gaps** - What wasn't fully met
4. **Technical debt** - Shortcuts taken, TODOs left

#### Step 2: Categorize Improvements

Organize into categories:

| Category | Examples |
|----------|----------|
| **Artifact: Code** | Refactoring, cleanup, better patterns |
| **Artifact: Tests** | Coverage gaps, edge cases, performance tests |
| **Artifact: Docs** | Missing docs, outdated docs, unclear docs |
| **Process** | Workflow improvements, tool improvements |
| **Skills** | Skill updates needed based on learnings |

#### Step 3: Prioritize

For each improvement, assess:

| Factor | Question |
|--------|----------|
| **Impact** | How much does this improve quality? |
| **Effort** | How much work is this? |
| **Risk** | What's the risk of not doing it? |
| **Dependencies** | Does other work depend on this? |

Priority matrix:

```
           High Impact    Low Impact
Low Effort    P1             P3
High Effort   P2             P4
```

#### Step 4: Estimate Effort

For each improvement:
- Small: < 1 hour
- Medium: 1-4 hours
- Large: 4+ hours

#### Step 5: Create Improvement Proposals

Document each proposal:

```markdown
### Improvement: [Name]

**Category**: [Artifact/Process]
**Priority**: P[1-4]
**Effort**: [Small/Medium/Large]

**Problem**: [What's the issue?]

**Proposed Solution**: [What to do]

**Impact**: [Why this matters]

**Recommendation**: [Do now / Defer / Optional]
```

#### Step 6: Group for Review

Organize proposals for Product Team:

```markdown
## Improvement Proposals

### Recommended (P1 - Do Now)
[High impact, low effort improvements]

### Suggested (P2 - Consider)
[High impact, higher effort improvements]

### Optional (P3/P4 - If Time Permits)
[Lower priority improvements]

### Deferred (Future)
[Out of scope for this cycle]
```

#### Step 7: Prepare for Human Review

The Improvement Proposals go to the Product Team + Human for approval.

Include:
- Summary of what was delivered
- Overall assessment
- Prioritized improvement proposals
- Recommendation for Improve phase scope

### Output

- Improvement Proposals document
- Ready for Product Team + Human review (Step 8)

---

## Improvement Proposal Template

See [references/improvement-proposal-template.md](references/improvement-proposal-template.md) for the full template.

---

## Common Refinement Patterns

### Pattern: Build Plan Step Too Large

**Feedback**: "Step 3 is too large - covers multiple concerns"

**Refinement**:
```markdown
Before:
  Step 3: Build the extraction system

After:
  Step 3a: Create ExtractionJob Ash Resource
  Step 3b: Implement Extractor GenServer
  Step 3c: Add webhook callback
  Step 3d: Create REST API endpoints
```

### Pattern: Missing Risk

**Feedback**: "What if Docling CLI isn't installed?"

**Refinement**:
Add to Risks table:
```markdown
| Risk | Mitigation |
|------|------------|
| Docling CLI not installed | Add startup validation, clear error message, installation docs |
```

### Pattern: Unclear Success Criteria

**Feedback**: "How do we measure 'fast enough'?"

**Refinement**:
```markdown
Before:
  - [ ] Extraction is fast enough

After:
  - [ ] Can extract 10-page PDF in <30 seconds
  - [ ] Can extract 50-page PDF in <120 seconds
```

### Pattern: Missing Edge Case

**Feedback**: "What happens when PDF is corrupted?"

**Refinement**:
Add to Build Plan:
```markdown
Step 5: Error Handling
- Handle corrupted PDF
- Handle unsupported PDF version
- Handle empty PDF
- Tests for each error case
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Ignoring feedback** | Same issues return | Address all required changes |
| **Over-engineering** | Scope creep | Only address what's raised |
| **Defensive response** | Misses valid points | Assume reviewer has good intent |
| **No prioritization** | Everything feels urgent | Use priority matrix |
| **Hiding issues** | Problems compound | Transparent about gaps |

---

## Validation Checklist

### For Plan Refinement

Before marking plan ready:

- [ ] All required changes addressed
- [ ] Questions answered or flagged
- [ ] Suggestions incorporated or discussed
- [ ] Plan is internally consistent
- [ ] Build Plan steps are right-sized
- [ ] Ready for re-review (if significant changes)

### For Improvement Proposals

Before presenting to Product Team:

- [ ] All improvement sources gathered
- [ ] Improvements categorized
- [ ] Priorities assigned with rationale
- [ ] Effort estimated
- [ ] Clear recommendations made
- [ ] Process improvements captured
- [ ] Lessons learned documented
