---
name: reviewing-increments
description: Reviews increment documents at quality gates throughout the PDAI cycle. Use for plan review (before Deliver), delivery review (after Deliver), and final review (after Improve). Owned by the Increment Reviewer Agent.
---

# Reviewing Increments

Assesses increment documents and artifacts at quality gates throughout the PDAI cycle, ensuring quality and completeness before phase transitions.

## Who Uses This Skill

The **Increment Reviewer Agent** - responsible for quality gates.

**Used at three points in implementing-features workflow:**

| Review | When | Purpose |
|--------|------|---------|
| **Plan Review** | Step 3 | Validate plan before Deliver |
| **Delivery Review** | Step 6 | Assess what was built |
| **Final Review** | Step 10 | Confirm improvements complete |

---

## Review Context 1: Plan Review

### When

After Prepare phase is complete, before starting Deliver.

### What to Review

The Increment Plan including:
- Strategic planning (Goal, Criteria, Decisions, Risks)
- Tactical planning (Build Plan with steps)

### Plan Review Dimensions

Score each dimension (0-3):

| Dimension | 0 (Poor) | 1 (Weak) | 2 (Good) | 3 (Excellent) |
|-----------|----------|----------|----------|---------------|
| **Goal clarity** | Vague or missing | Unclear outcome | Clear goal | Compelling with impact |
| **Success criteria** | Missing | Vague/unmeasurable | Mostly measurable | All quantified |
| **Build Plan** | Missing/vague | Steps too big | Clear steps | Right-sized with prompts |
| **Key decisions** | No decisions | Decisions without rationale | Clear reasoning | Data-driven choices |
| **Risk coverage** | No risks | Incomplete | Major risks covered | Comprehensive + mitigations |
| **Scope boundaries** | No exclusions | Vague boundaries | Clear exclusions | Explicit with rationale |

**Total score interpretation:**
- 16-18: Ready to proceed
- 12-15: Minor revisions needed
- 8-11: Significant revisions needed
- 0-7: Major rework required

### Plan Review Quality Tests

**Test 1: The "New Team Member" Test**
> Could someone unfamiliar understand the goal and approach?

**Test 2: The "How Do We Know" Test**
> Are success criteria specific and measurable?

**Test 3: The "Why This Way" Test**
> Are key decisions documented with rationale?

**Test 4: The "What Could Go Wrong" Test**
> Are risks realistic with actionable mitigations?

**Test 5: The "Can We Execute" Test**
> Is the Build Plan executable step by step?

**Test 6: The "Scope Creep" Test**
> Are scope boundaries explicit?

### Plan Review Output

```markdown
## Plan Review: [increment-name]

### Summary
[1-2 sentence overall assessment]

### Quality Score: X/18

| Dimension | Score | Notes |
|-----------|-------|-------|
| Goal clarity | /3 | |
| Success criteria | /3 | |
| Build Plan | /3 | |
| Key decisions | /3 | |
| Risk coverage | /3 | |
| Scope boundaries | /3 | |

### Test Results

| Test | Pass/Fail | Notes |
|------|-----------|-------|
| New Team Member | | |
| How Do We Know | | |
| Why This Way | | |
| What Could Go Wrong | | |
| Can We Execute | | |
| Scope Creep | | |

### Gaps
- [Missing consideration]

### Risks Identified
- [Underestimated or missing risk]

### Suggestions
- [Specific improvement]

### Questions
- [Clarification needed]

### Verdict: [Ready | Needs Refinement | Major Concerns]

### Required Changes (if any)
- [ ] [Specific change needed]
```

---

## Review Context 2: Delivery Review

### When

After Deliver phase is complete, before Assess.

### What to Review

- Delivered artifacts (code, tests, docs)
- Success criteria achievement
- Build quality
- Increment document updates

### Delivery Review Dimensions

| Dimension | What to Check |
|-----------|---------------|
| **Completeness** | All planned artifacts created? |
| **Criteria met** | Success criteria achieved? |
| **Quality** | Code quality, test coverage, documentation? |
| **Consistency** | Follows existing patterns? |
| **Robustness** | Error handling, edge cases? |

### Delivery Review Process

#### Step 1: Check Artifacts

Verify all planned artifacts exist:
- [ ] All code files created
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Migrations created AND applied (if Ash resources created)
- [ ] No pending migrations: `mix ecto.migrations` shows all "up"

#### Step 2: Verify Success Criteria

For each criterion:
- **Met**: Clear evidence of achievement
- **Partially met**: Some aspects missing
- **Not met**: Criterion not achieved

#### Step 3: Assess Quality

**Code quality:**
- Follows project patterns?
- No obvious issues?
- Appropriate abstractions?

**Test quality:**
- Covers happy path?
- Covers error cases?
- Tests are meaningful (not just for coverage)?

**Documentation:**
- Code comments where needed?
- API documentation?
- Usage examples?

#### Step 4: Identify Improvements

Note opportunities for Improve phase:
- Code that could be cleaner
- Missing test coverage
- Documentation gaps
- Performance concerns

### Delivery Review Output

```markdown
## Delivery Review: [increment-name]

### Summary
[1-2 sentence overall assessment]

### Artifacts Check

| Artifact | Status | Notes |
|----------|--------|-------|
| [artifact] | ✓/✗/~ | |

### Success Criteria Status

| Criterion | Status | Evidence |
|-----------|--------|----------|
| [criterion] | ✓ Met / ~ Partial / ✗ Not met | [How verified] |

### Quality Assessment

**Code Quality**: [Good / Acceptable / Needs Work]
- [Observations]

**Test Coverage**: [Good / Acceptable / Needs Work]
- [Observations]

**Documentation**: [Good / Acceptable / Needs Work]
- [Observations]

### Issues Found
- [Issue with severity]

### Improvement Opportunities
- [Opportunity for Improve phase]

### Verdict: [Acceptable | Needs Fixes | Major Issues]

### Required Fixes (if any)
- [ ] [Fix needed before proceeding]
```

---

## Review Context 3: Final Review

### When

After Improve phase is complete, before marking increment Complete.

### What to Review

- Improvements were executed
- Quality issues addressed
- Increment is truly complete

### Final Review Dimensions

| Dimension | What to Check |
|-----------|---------------|
| **Improvements done** | Approved improvements executed? |
| **Quality addressed** | Issues from Delivery Review fixed? |
| **Documentation complete** | All docs updated? |
| **Lessons captured** | Learnings documented? |

### Final Review Process

#### Step 1: Verify Improvements

For each approved improvement:
- [ ] Improvement was executed
- [ ] Verification passes
- [ ] Quality is acceptable

#### Step 2: Check Outstanding Issues

From Delivery Review:
- [ ] Required fixes completed
- [ ] Issues addressed or documented

#### Step 3: Verify Documentation

- [ ] Increment document complete
- [ ] All sections filled
- [ ] Lessons learned captured
- [ ] Follow-up items noted

#### Step 4: Make Recommendation

**Complete**: Ready to close
**Another cycle**: Needs more work (return to appropriate phase)

### Final Review Output

```markdown
## Final Review: [increment-name]

### Summary
[1-2 sentence overall assessment]

### Improvement Verification

| Improvement | Status | Notes |
|-------------|--------|-------|
| [improvement] | ✓/✗ | |

### Outstanding Issues

| Issue | Status | Notes |
|-------|--------|-------|
| [from delivery review] | ✓ Fixed / → Deferred | |

### Documentation Check

- [ ] Deliver section complete
- [ ] Assess section complete
- [ ] Improve section complete
- [ ] Lessons learned captured
- [ ] Follow-up documented

### Overall Assessment

**Success Criteria**: [All met / Most met / Some gaps]
**Quality**: [Good / Acceptable / Issues remain]
**Documentation**: [Complete / Mostly complete / Gaps]

### Verdict: [Complete | Another Cycle Needed]

### If Another Cycle
- Return to: [Phase]
- Focus on: [What needs work]
```

---

## Common Issues and Guidance

### Plan Review Issues

| Issue | How to Address |
|-------|----------------|
| Vague goal | Request specific outcome and beneficiary |
| No Build Plan | Cannot proceed - require executable steps |
| Steps too big | Request split into 1-2 hour chunks |
| Missing risks | Identify likely risks from experience |
| No scope exclusions | Request explicit boundaries |

### Delivery Review Issues

| Issue | How to Address |
|-------|----------------|
| Tests missing | Flag as required improvement |
| Criteria not met | Determine if blocker or improvement |
| Code quality issues | Prioritize for Improve phase |
| Documentation gaps | Flag for improvement |

### Final Review Issues

| Issue | How to Address |
|-------|----------------|
| Improvements skipped | Verify why, may need another cycle |
| Quality still poor | May need another cycle |
| Docs incomplete | Should complete before marking done |

---

## When to Block Progress

### Block at Plan Review if:

- Goal is vague or missing
- No success criteria defined
- No Build Plan or steps too vague
- Critical risks not identified
- No scope boundaries

### Block at Delivery Review if:

- Core success criteria not met
- Critical functionality broken
- No tests for new code
- Security issues present

### Block at Final Review if:

- Required improvements not done
- Critical issues unaddressed
- Documentation severely lacking

---

## Validation Checklist

### For Any Review

- [ ] Read all relevant materials
- [ ] Scored/assessed all dimensions
- [ ] Specific feedback provided
- [ ] Clear verdict given
- [ ] Required changes listed (if any)

### For Plan Review

- [ ] All 6 quality tests run
- [ ] Build Plan assessed for executability
- [ ] Risks evaluated

### For Delivery Review

- [ ] Artifacts verified
- [ ] Success criteria checked with evidence
- [ ] Quality assessed
- [ ] Improvement opportunities noted
- [ ] No pending migrations (Ash resources)
- [ ] UI patterns followed (sectioned LiveViews split, navigators used)

### For Final Review

- [ ] Improvements verified
- [ ] Outstanding issues checked
- [ ] Documentation complete
- [ ] Clear complete/iterate recommendation
