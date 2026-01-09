---
name: conducting-management-reviews
description: Prepares and facilitates ISO 9001 management reviews per clause 9.3. Use when preparing quarterly reviews, compiling review inputs, documenting decisions, or tracking review actions. Owned by Quality Guardian.
---

# Conducting Management Reviews

Prepares and facilitates management reviews aligned with ISO 9001:2015 clause 9.3, ensuring leadership evaluates QMS effectiveness and drives improvement.

## When to Use

- Preparing quarterly management review packages
- Compiling required review inputs
- Facilitating review meetings
- Documenting review decisions and actions
- Tracking actions from previous reviews

---

## Review Schedule

### Quarterly Reviews

| Quarter | Timing | Focus |
|---------|--------|-------|
| Q1 | End of March | Annual planning, objective setting |
| Q2 | End of June | Mid-year progress, adjustments |
| Q3 | End of September | Pre-year-end assessment |
| Q4 | End of December | Annual summary, next year prep |

### Ad-hoc Reviews

Trigger ad-hoc reviews for:
- Significant quality issues or incidents
- Major organizational changes
- Regulatory or customer requirement changes
- Certification audit findings

---

## Review Process

### Step 1: Prepare Review Package (1 week before)

Compile all required inputs per ISO 9001:2015 clause 9.3.2:

#### Required Inputs Checklist

**Previous review:**
- [ ] Status of actions from last review
- [ ] What was decided, was it implemented?

**Quality performance:**
- [ ] Quality objectives status (from `docs/process/quality-objectives.md`)
- [ ] Key metrics and trends
- [ ] Process performance data

**Audit results:**
- [ ] Internal audit findings summary
- [ ] Open CAPAs and status
- [ ] Audit program status

**Customer feedback:**
- [ ] NPS or satisfaction data (if available)
- [ ] Support ticket trends
- [ ] Complaints or issues

**Nonconformities:**
- [ ] CAPA status summary
- [ ] Trends in root causes
- [ ] Effectiveness of corrections

**Changes:**
- [ ] External changes (market, regulatory, technology)
- [ ] Internal changes (organization, strategy, resources)
- [ ] Impact on QMS

**Resources:**
- [ ] Resource adequacy assessment
- [ ] Training needs
- [ ] Tool/infrastructure needs

**Risks and opportunities:**
- [ ] Risk status from previous assessment
- [ ] New risks identified
- [ ] Opportunities for improvement

### Step 2: Create Review Package Document

Structure the package for efficient review:

```markdown
# Management Review Package - Q[X] 2025

**Review Date:** YYYY-MM-DD
**Prepared by:** Quality Guardian
**Period Covered:** [Start] to [End]

## Executive Summary
[2-3 key points for leadership attention]

## 1. Previous Review Actions
[Status table]

## 2. Quality Performance
[Objectives, metrics, trends]

## 3. Audit & CAPA Status
[Summary with counts and highlights]

## 4. Customer Feedback
[Key themes]

## 5. Changes & Context
[What's changed]

## 6. Resources
[Adequacy assessment]

## 7. Risks & Opportunities
[Current state]

## 8. Items for Decision
[What needs leadership decision]

## 9. Proposed Actions
[Recommendations]
```

### Step 3: Facilitate the Review

**Before meeting:**
- Distribute package to participants
- Allow time for async review
- Collect questions or concerns

**During meeting:**
- Focus on decisions, not data presentation
- Capture decisions with rationale
- Assign actions with owners and dates
- Discuss resource needs

**Meeting flow:**
1. Review previous actions (5 min)
2. Quality performance highlights (10 min)
3. Audit and CAPA summary (10 min)
4. Customer and context changes (10 min)
5. Decisions and actions (20 min)
6. Next steps (5 min)

### Step 4: Document Review Outputs

Use template at `docs/templates/management-review.md`.

**Required outputs per ISO 9001:2015 clause 9.3.3:**

| Output | Description |
|--------|-------------|
| Improvement opportunities | What can we do better? |
| QMS changes needed | Changes to policy, objectives, processes? |
| Resource needs | What resources are required? |

**Document all:**
- Decisions made (what and why)
- Actions assigned (who, what, when)
- Resources allocated
- Changes to QMS elements

**Store records in:** `docs/quality/management-reviews/`

**Naming convention:** `MR-YYYY-QX.md`
- Example: `MR-2025-Q1.md`

### Step 5: Track Actions

After the review:
1. Enter actions into tracking system
2. Assign owners and due dates
3. Set reminders for follow-up
4. Report on status at next review

---

## Gathering Data

### Quality Objectives

Read from `docs/process/quality-objectives.md`:
- Current targets
- Actual performance
- Status (on track, at risk, behind)

### Increment Metrics

Analyze `docs/increments/`:
- Completion rate
- Phase balance
- Cycle times

### Audit Status

Compile from `docs/quality/audits/`:
- Audits completed vs planned
- Findings by category
- Trend analysis

### CAPA Status

Compile from `docs/quality/capas/`:
- Open CAPAs by age
- Overdue items
- Closure rate

### Improvement Log

Review `docs/process/qms-improvements.md`:
- Improvements implemented
- Pending items
- Patterns in improvements

---

## QMS Effectiveness Assessment

During each review, assess overall QMS effectiveness:

### Assessment Questions

1. **Suitability**: Is the QMS appropriate for our context?
2. **Adequacy**: Does it meet requirements?
3. **Effectiveness**: Is it achieving intended results?

### Assessment Scale

| Rating | Description |
|--------|-------------|
| Effective | Achieving objectives, well-implemented |
| Effective with improvements | Working but has gaps |
| Not effective | Significant issues, major changes needed |

### Policy and Objectives Review

At each review, consider:
- Is the quality policy still appropriate?
- Are objectives still relevant?
- Do targets need adjustment?

---

## AI-Assisted Reviews

For small teams with AI collaboration:

### Async Preparation
- Quality Guardian compiles the full review package
- Participants review async before meeting
- Meeting focuses on decisions, not presentation

### AI Role
- Compile data from multiple sources
- Identify trends and patterns
- Draft review package for human approval
- Document decisions during meeting
- Track actions post-meeting

### Human Role
- Review and approve package
- Make decisions
- Allocate resources
- Set strategic direction

---

## Quick Reference: Review Checklist

**1 week before:**
- [ ] Compile all required inputs
- [ ] Create review package
- [ ] Distribute to participants

**At review:**
- [ ] Check previous action status
- [ ] Review each input area
- [ ] Make decisions, assign actions
- [ ] Assess QMS effectiveness

**After review:**
- [ ] Complete review record
- [ ] Store in `docs/quality/management-reviews/`
- [ ] Enter actions into tracking
- [ ] Communicate decisions

---

## Related Documents

- [Management Review Process](../../../docs/process/management-review.md)
- [Management Review Template](../../../docs/templates/management-review.md)
- [Quality Policy](../../../docs/process/quality-policy.md)
- [Quality Objectives](../../../docs/process/quality-objectives.md)

---

## Validation

Before finalizing a management review:
- [ ] All required inputs compiled
- [ ] Previous actions addressed
- [ ] Decisions documented with rationale
- [ ] Actions have owners and due dates
- [ ] QMS effectiveness assessed
- [ ] Record completed using template
- [ ] Human leadership has approved decisions
