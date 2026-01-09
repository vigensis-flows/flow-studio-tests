---
name: auditing-compliance
description: Audits process compliance for increments and artifacts. Use when checking if PDAI was followed, reviewing documentation completeness, verifying decision records exist, or assessing adherence to defined standards. Owned by Quality Guardian.
---

# Auditing Compliance

Verifies that work follows defined processes and produces required artifacts.

## When to Use

- Checking if an increment followed PDAI properly
- Verifying documentation completeness
- Ensuring decision records exist for significant choices
- Assessing adherence to quality standards
- Preparing for external audits

## Audit Principles

**Constructive, not punitive**: Find issues to fix them, not to blame.

**Evidence-based**: Document what you find with specific references.

**Proportionate**: Match audit depth to risk level.

**Learning-focused**: Each audit is an opportunity to improve the system.

---

## Increment Compliance Audit

### Step 1: Locate Increment Documentation

Check for increment document:
```
docs/increments/[increment-name].md
```

If missing: Major non-conformance (required artifact missing)

### Step 2: Verify PDAI Phase Coverage

**Prepare Phase Checklist:**
- [ ] Goals clearly defined
- [ ] Success criteria measurable
- [ ] Risks identified
- [ ] Stakeholders aligned
- [ ] Approach documented

**Deliver Phase Checklist:**
- [ ] Work executed as planned (or deviations noted)
- [ ] Artifacts produced
- [ ] Progress tracked
- [ ] Blockers communicated

**Assess Phase Checklist:**
- [ ] Results compared to success criteria
- [ ] Evidence gathered
- [ ] What worked/didn't documented
- [ ] Improvement opportunities identified

**Improve Phase Checklist:**
- [ ] Improvements actually implemented
- [ ] Learnings documented
- [ ] Follow-up work defined
- [ ] Process updates made if needed

### Step 3: Assess Phase Balance

Review time/effort distribution:

| Phase | Target | Acceptable Range | Finding |
|-------|--------|------------------|---------|
| Prepare | 25% | 20-30% | [Actual]% |
| Deliver | 25% | 20-30% | [Actual]% |
| Assess | 25% | 20-30% | [Actual]% |
| Improve | 25% | 20-30% | [Actual]% |

Common issues:
- Prepare < 10%: Rushed planning, likely rework
- Deliver > 50%: PDAI not followed, other phases skipped
- Assess < 15%: Cursory review, missed learnings
- Improve < 10%: Learnings identified but not acted on

### Step 4: Check Decision Records

For significant decisions, verify:
- [ ] Decision documented (ADR, DDR, or in increment doc)
- [ ] Context captured (why decision was needed)
- [ ] Options considered
- [ ] Rationale for chosen option
- [ ] Consequences acknowledged

### Step 5: Document Findings

```markdown
## Compliance Audit: [Increment Name]

**Audit Date:** [YYYY-MM-DD]
**Auditor:** Quality Guardian

### Scope
[What was audited]

### Conformances
- [What was done correctly]
- [Evidence of good practice]

### Non-Conformances

#### NC-1: [Title]
**Severity:** Major / Minor / Observation
**Requirement:** [What was required]
**Finding:** [What was found]
**Evidence:** [Specific reference]
**Recommended Action:** [How to address]

### Phase Balance Assessment
| Phase | Target | Actual | Status |
|-------|--------|--------|--------|
| Prepare | 25% | [X]% | ✓/⚠/✗ |
| Deliver | 25% | [X]% | ✓/⚠/✗ |
| Assess | 25% | [X]% | ✓/⚠/✗ |
| Improve | 25% | [X]% | ✓/⚠/✗ |

### Overall Assessment
**Status:** Compliant / Compliant with Observations / Non-Compliant

### Actions Required
1. [Action with owner and due date]
```

---

## Documentation Compliance Audit

### Required Documentation by Type

**For each increment:**
- Increment document with all PDAI phases

**For architectural decisions:**
- ADR in `docs/architecture/decisions/`

**For design decisions:**
- DDR in `docs/design/decisions/`

**For features:**
- Feature brief
- Increment plan

### Completeness Check

For each required document:
- [ ] Document exists
- [ ] Uses correct template
- [ ] All required sections present
- [ ] Content is substantive (not placeholder)
- [ ] Links/references valid

---

## Severity Levels

| Level | Definition | Required Action |
|-------|------------|-----------------|
| **Major** | Required artifact missing, process not followed, significant quality risk | Must address before next phase/release |
| **Minor** | Documentation incomplete, minor deviation from process | Address within defined timeframe |
| **Observation** | Opportunity for improvement, not a requirement violation | Consider for improvement |

---

## Audit Schedule

| Audit Type | Frequency | Scope |
|------------|-----------|-------|
| Increment spot-check | Weekly | Random sample of active/completed increments |
| Full increment audit | Per increment | At quality gates (pre-Deliver, final acceptance) |
| Documentation audit | Monthly | All required documentation |
| Process compliance | Quarterly | Full PDAI adherence across organization |

---

## Corrective Action Process

When non-conformances are found:

1. **Document** the finding with evidence
2. **Classify** severity (Major/Minor/Observation)
3. **Assign** owner for resolution
4. **Track** to closure
5. **Verify** resolution is effective
6. **Close** when complete

Track corrective actions in: `docs/process/corrective-actions.md`

---

## Validation

Before completing an audit:
- [ ] All findings documented with evidence
- [ ] Severity levels assigned appropriately
- [ ] Recommendations are actionable
- [ ] Report is constructive, not just critical
- [ ] Findings communicated to relevant parties
