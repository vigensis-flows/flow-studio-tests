---
name: refining-features
description: Elaborates improvement proposals with human involvement to create the Improvement Plan. Use during Assess phase (Step 8) when Product Team presents delivery results and improvement proposals to the human for approval. This is a human checkpoint in the workflow.
---

# Refining Features

Facilitates the human checkpoint where the Product Team presents what was delivered, reviews improvement proposals, and collaboratively creates the Improvement Plan.

## Who Uses This Skill

The **Product Team** (PM, Designer, Tech Lead) working **with a human**.

**This is a human checkpoint** - the human must be involved in approving what improvements to make.

---

## When to Use

**Step 8 of implementing-features workflow:**

```
Deliver → Assess → [This Step] → Improve
                          ↑
                    Human Checkpoint
```

After:
- Delivery is complete (Step 5)
- Delivery has been reviewed (Step 6)
- Improvement Proposals have been prepared (Step 7)

Before:
- Executing improvements (Step 9)

---

## The Human Checkpoint

### Why Human Involvement?

Improvement decisions affect:
- **Time**: More improvements = more time
- **Scope**: What's "good enough" vs needs more work
- **Direction**: May surface new requirements
- **Priority**: Trade-offs with other work

Humans own these trade-offs. The Product Team facilitates, but humans decide.

### What Humans Decide

| Decision | Options |
|----------|---------|
| **Accept proposal** | Include in Improvement Plan |
| **Reject proposal** | Don't do it (note why) |
| **Defer proposal** | Capture for future, not now |
| **Modify proposal** | Change scope or approach |
| **Add proposal** | Human sees something team missed |

---

## Process

### Step 1: Prepare the Presentation

Gather materials for the human:

1. **Delivery Summary** - What was built
2. **Success Criteria Status** - What was met/not met
3. **Improvement Proposals** - From Delivery Agent
4. **Observations** - Key learnings
5. **Recommendations** - Team's suggested priorities

### Step 2: Present Delivery Results

Show the human:

**What was delivered:**
- Artifacts created
- Functionality implemented
- Tests added

**How it went:**
- Success criteria results
- Surprises or challenges
- Technical observations

**Quality assessment:**
- What's working well
- What needs attention
- Technical debt created

### Step 3: Present Improvement Proposals

Walk through proposals by priority:

**P1 - Recommended:**
- High impact, low effort
- Team strongly suggests doing these

**P2 - Suggested:**
- High impact, higher effort
- Worth considering

**P3/P4 - Optional:**
- Lower priority
- If time/budget permits

**Deferred:**
- Out of scope for this cycle
- Captured for future

### Step 4: Facilitate Discussion

Help the human understand trade-offs:

**For each proposal:**
- What's the problem?
- What's the proposed solution?
- What's the impact of doing it?
- What's the impact of NOT doing it?
- How much effort?

**Questions to prompt:**
- "Is this level of quality acceptable for now?"
- "Should we address this now or later?"
- "Are there other improvements you see?"
- "What's the timeline constraint?"

### Step 5: Capture Decisions

Record human decisions:

```markdown
### Improvement Decisions

| Proposal | Decision | Notes |
|----------|----------|-------|
| Add error logging | ✓ Accept | - |
| Refactor GenServer | ✓ Accept | Reduce scope to just X |
| Add performance tests | → Defer | Do in next increment |
| UI polish | ✗ Reject | Good enough for now |
```

### Step 6: Gather Human Additions

Ask: "Is there anything else you'd like to improve that we haven't proposed?"

Humans may see:
- User experience issues
- Business requirement gaps
- Quality concerns
- Process improvements

Add these to the Improvement Plan.

### Step 7: Create Improvement Plan

Finalize the plan with approved improvements:

```markdown
# Improvement Plan: [Feature Name]

**Approved by**: [Human name/identifier]
**Date**: YYYY-MM-DD

---

## Approved Improvements

| Improvement | Priority | Effort | Owner |
|-------------|----------|--------|-------|
| Add error logging | P1 | Small | Delivery Agent |
| Refactor GenServer | P1 | Medium | Delivery Agent |
| Update documentation | P2 | Small | Delivery Agent |

## Improvement Steps

[Use creating-build-plans format for each improvement]

### Step 1: Add Error Logging
**Goal**: [What this achieves]
**Prompt**: [Claude Code CLI prompt]
**Verification**: [How to verify]

### Step 2: Refactor GenServer
...

---

## Deferred Items

| Item | Reason | Capture For |
|------|--------|-------------|
| Performance tests | Time constraint | Next increment |
| Edge case handling | Low priority | Backlog |

---

## Process Improvements Approved

- [Change to make]

---

## Notes

[Any additional context from discussion]
```

### Step 8: Handoff

Provide Improvement Plan to Delivery Agent for execution (Step 9).

---

## Presentation Template

### Meeting Structure

```
1. Delivery Summary (5 min)
   - What we built
   - Key artifacts

2. Results Review (10 min)
   - Success criteria status
   - What went well
   - Challenges encountered

3. Improvement Proposals (15 min)
   - Walk through by priority
   - Explain trade-offs

4. Discussion & Decisions (15 min)
   - Human questions
   - Accept/reject/defer decisions
   - Human additions

5. Finalize Plan (5 min)
   - Confirm scope
   - Set expectations
```

### Presentation Outline

```markdown
# [Feature Name] - Assess Phase Review

---

## What We Delivered

[Brief summary with key artifacts]

---

## Success Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| ... | ✓/✗/~ | ... |

---

## Observations

### What Went Well
- [Positive observations]

### Challenges
- [Difficulties encountered]

### Technical Notes
- [Relevant technical observations]

---

## Improvement Proposals

### Recommended (P1)
[High impact, low effort - suggest doing all]

### Suggested (P2)
[Worth considering - discuss trade-offs]

### Optional (P3/P4)
[Lower priority - only if time permits]

---

## Questions for You

1. Is the current quality level acceptable?
2. Which improvements should we prioritize?
3. Are there other concerns we should address?
4. What's the timeline for completing improvements?

---

## Next Steps

[Based on decisions, what happens next]
```

---

## Facilitating Good Decisions

### Help Humans Understand Trade-offs

**Time trade-off:**
"Adding these 3 improvements will take approximately 2 more days. Is that acceptable given [timeline]?"

**Quality trade-off:**
"We can ship now with this known issue, or spend 4 hours to fix it. The risk of not fixing is [X]."

**Scope trade-off:**
"This improvement would add [capability], but it's beyond the original scope. Should we include it?"

### When Human Is Unsure

Provide clear recommendation:
"Based on the team's assessment, we recommend [X] because [reason]. If you're uncertain, we suggest [conservative option]."

### When Human Disagrees with Team

Respect the decision:
- Capture their reasoning
- Adjust the plan accordingly
- Note any concerns for future reference

### When Human Adds Significant Work

Assess impact:
- "This addition will take approximately [time]"
- "It may affect [other work]"
- "We can do it now or capture it for [future]"

Let human decide with full information.

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Skipping human** | Decisions made without approval | Always involve human at this step |
| **Overwhelming detail** | Human can't process | Summarize, prioritize clearly |
| **No recommendation** | Human has no guidance | Always provide team's suggestion |
| **Pushing back on decisions** | Creates friction | Accept human's call, note concerns |
| **Hiding problems** | Erodes trust | Be transparent about issues |
| **Scope creep approval** | Improvements grow too large | Clear effort estimates |

---

## Deliverables

After this step:

1. **Improvement Plan** document with:
   - Approved improvements
   - Improvement steps (Build Plan format)
   - Deferred items
   - Process improvements

2. **Updated Increment Document** with:
   - Assess section completed
   - Improvement Opportunities finalized

3. **Clear handoff** to Delivery Agent for Step 9

---

## Validation Checklist

Before proceeding to Improve phase:

**Human Involvement:**
- [ ] Human was presented delivery results
- [ ] Human reviewed all improvement proposals
- [ ] Human made explicit accept/reject/defer decisions
- [ ] Human had opportunity to add improvements

**Documentation:**
- [ ] All decisions captured
- [ ] Improvement Plan created
- [ ] Deferred items documented
- [ ] Process improvements noted

**Handoff:**
- [ ] Improvement Plan has executable steps
- [ ] Effort estimates are realistic
- [ ] Delivery Agent has what they need
