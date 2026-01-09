---
name: conducting-internal-audits
description: Conducts formal ISO 9001 internal audits per clause 9.2. Use when performing scheduled audits, creating audit reports, following up on findings, or managing the annual audit program. Owned by Quality Guardian.
---

# Conducting Internal Audits

Executes formal internal audits aligned with ISO 9001:2015 clause 9.2, producing audit reports and driving corrective actions.

## When to Use

- Performing scheduled quarterly or annual audits
- Creating formal audit reports
- Following up on previous audit findings
- Planning the annual audit program
- Preparing for external certification audits

## Distinction from auditing-compliance

| Skill | Focus | Output |
|-------|-------|--------|
| `auditing-compliance` | Increment-level PDAI compliance checks | Compliance assessment |
| `conducting-internal-audits` | Formal ISO 9.2 process audits | Audit reports, CAPAs |

Use `auditing-compliance` for quick increment checks.
Use `conducting-internal-audits` for formal scheduled audits.

---

## Audit Program

### Annual Schedule

Plan audits to cover all QMS areas over 12 months:

| Quarter | Focus Areas |
|---------|-------------|
| Q1 | Documentation control, PDAI compliance |
| Q2 | Corrective action, improvement tracking |
| Q3 | Management review, quality objectives |
| Q4 | Full system audit (pre-certification prep) |

### Audit Types

| Type | Frequency | Scope |
|------|-----------|-------|
| Process audit | Quarterly | Specific process area |
| Compliance audit | As needed | Check specific requirement |
| Full system audit | Annually | All QMS processes |
| Follow-up audit | As needed | Verify CAPA effectiveness |

---

## Auditor Mindset

**Critical distinction:** Auditing requires a different mindset than advisory work.

| Mode | Stance | Focus |
|------|--------|-------|
| Advisory | Collaborative, supportive | Help improve what exists |
| **Auditing** | **Skeptical, evidence-based** | **Find what's missing or broken** |

**During audits, adopt a skeptical stance:**
- Assume gaps exist until evidence proves otherwise
- Check what's REQUIRED, not just what EXISTS
- "Deferred" or "implicit" does not satisfy a requirement
- Missing foundational documentation = Nonconformity, not Observation
- Your job is to find issues - finding none is suspicious, not success

**Guard against validation bias:**
- Don't let desire for "clean audit" soften findings
- Don't downgrade NC to OBS to avoid opening CAPAs
- Don't accept "we'll do it later" for required elements
- Question your own findings: "Am I being rigorous enough?"

---

## Conducting an Audit

### Step 1: Plan the Audit

Before auditing, determine:
- **Scope**: Which processes, time period, locations
- **Criteria**: ISO clauses, internal procedures, previous findings
- **Schedule**: When, how long, who's involved

Document in audit notification or plan.

### Step 2: Prepare

Gather relevant documentation:
- Process documents being audited
- Previous audit reports and open CAPAs
- Quality objectives and metrics
- Records from the audit period

Review criteria:
- ISO 9001 clause requirements for the scope
- Internal process requirements
- Previous findings to verify closure

### Step 3: Execute the Audit

**Opening:**
- Confirm scope and criteria
- Explain audit process
- Set expectations

**Evidence gathering:**
- Review documents and records
- Interview process owners (if applicable)
- Observe processes in action
- Sample records for compliance

**For each area, assess:**
- Does documentation exist?
- Is it being followed?
- Are records maintained?
- Are results meeting objectives?

**Evidence types:**
- Documents (procedures, policies)
- Records (completed forms, logs)
- Observations (actual practice)
- Statements (from interviews)

### Step 4: Classify Findings

| Category | Definition | Action Required |
|----------|------------|-----------------|
| **Nonconformity (NC)** | Requirement not met | CAPA required |
| **Observation (OBS)** | Potential issue, weakness, or risk | Improvement recommended |
| **Opportunity (OFI)** | Enhancement possibility | Consider for improvement |
| **Conformity** | Requirement met with evidence | Document as evidence |

**Nonconformity severity:**
- **Major**: Systemic failure, significant risk, missing required element
- **Minor**: Isolated instance, limited impact

**Critical: NC vs OBS Decision Guide**

| Situation | Classification | Rationale |
|-----------|----------------|-----------|
| Required document missing | **NC** | ISO requires it to exist |
| Required process not documented | **NC** | Can't verify conformance |
| Document exists but incomplete | **NC** or OBS | NC if missing required elements |
| Process documented but not followed | **NC** | Non-compliance with own process |
| Implicit/informal practice only | **NC** | ISO requires documented information |
| "Deferred to later" for required item | **NC** | Deferral doesn't satisfy requirement |
| Weakness that could become problem | OBS | Not yet a failure |
| Suggestion for enhancement | OFI | Beyond requirements |

**When in doubt, classify UP (OBS→NC), not down.** It's easier to close a CAPA for a minor issue than to miss a real gap.

### Step 5: Create Audit Report

Use template at `docs/templates/audit-report.md`.

**Report structure:**
1. Audit scope and criteria
2. Executive summary
3. Findings summary (counts by category)
4. Detailed findings (NC, OBS, OFI)
5. Conformities noted (positive findings)
6. Previous audit follow-up
7. Conclusion and overall assessment

**Store reports in:** `docs/quality/audits/`

**Naming convention:** `audit-YYYY-qN-NN.md`
- Example: `audit-2025-q4-01.md` (first audit in Q4 2025)
- Scope is documented inside the report, not in the filename

### Step 6: Open CAPAs for Nonconformities

For each nonconformity:
1. Create CAPA using `docs/templates/capa.md`
2. Link CAPA ID in audit report
3. Assign owner and due date
4. Track in `docs/quality/capas/`

See `docs/process/corrective-action.md` for CAPA process.

### Step 7: Communicate Results

- Share report with relevant parties
- Discuss findings constructively
- Agree on CAPA ownership and timelines
- Schedule follow-up if needed

---

## Follow-up Audits

When verifying CAPA effectiveness:

1. **Review the CAPA**: What was the root cause? What action was taken?
2. **Verify implementation**: Is the corrective action in place?
3. **Assess effectiveness**: Is the problem resolved? Has it recurred?
4. **Document**: Update CAPA record with verification results
5. **Close or escalate**: Close if effective, escalate if not

---

## Auditor Independence

Per ISO 9001, auditors should not audit their own work.

**For AI-assisted audits:**
- Quality Guardian conducts audits with human oversight
- Human reviews and approves findings
- Human makes final decisions on severity and actions

**Maintain objectivity:**
- Base findings on evidence, not opinion
- Document what was observed
- Apply criteria consistently

---

## Quick Reference: Audit Checklist

**Before audit:**
- [ ] Scope and criteria defined
- [ ] Previous findings reviewed
- [ ] Relevant documents gathered
- [ ] Schedule communicated

**During audit:**
- [ ] Evidence collected for each area
- [ ] Findings documented with references
- [ ] Positive practices noted
- [ ] Clarifications obtained

**After audit:**
- [ ] Report completed using template
- [ ] Findings classified appropriately
- [ ] CAPAs opened for nonconformities
- [ ] Report stored in `docs/quality/audits/`
- [ ] Results communicated

---

## ISO 9001:2015 Foundational Requirements Checklist

**Use this checklist for every full system audit.** Each item is REQUIRED by ISO 9001. Missing items = Nonconformity.

### Clause 4: Context of the Organization

- [ ] **4.3 QMS Scope** - Documented scope statement defining boundaries and applicability
- [ ] **4.4 QMS processes** - Processes identified with inputs, outputs, sequence, interactions

### Clause 5: Leadership

- [ ] **5.2 Quality Policy** - Documented, appropriate, communicated, available
- [ ] **5.3 Roles and responsibilities** - Documented organizational roles, responsibilities, and authorities

### Clause 6: Planning

- [ ] **6.1 Risks and opportunities** - Actions to address risks and opportunities
- [ ] **6.2 Quality objectives** - Documented, measurable, monitored, communicated

### Clause 7: Support

- [ ] **7.1.5 Monitoring and measuring resources** - Calibration/verification where applicable
- [ ] **7.2 Competence** - Evidence of competence for personnel affecting quality
- [ ] **7.4 Communication** - Internal/external communication determined
- [ ] **7.5 Documented information** - Document control procedure (creation, approval, control, retention)

### Clause 8: Operation

- [ ] **8.1 Operational planning** - Processes to meet requirements (may be N/A early stage)

### Clause 9: Performance Evaluation

- [ ] **9.1 Monitoring and measurement** - What to monitor, methods, when, analysis
- [ ] **9.2 Internal audit** - Audit program and procedure
- [ ] **9.3 Management review** - Review process with required inputs/outputs

### Clause 10: Improvement

- [ ] **10.2 Nonconformity and corrective action** - CAPA process

**Scoring:**
- Each unchecked item where documentation is required = potential NC
- Verify evidence exists, not just "planned" or "implicit"
- N/A only applies where the requirement genuinely doesn't apply to the scope

---

## Related Documents

- [Internal Audit Process](../../../docs/process/internal-audit.md)
- [Audit Report Template](../../../docs/templates/audit-report.md)
- [Corrective Action Process](../../../docs/process/corrective-action.md)
- [CAPA Template](../../../docs/templates/capa.md)

---

## Validation

Before finalizing an audit:
- [ ] All scope areas covered
- [ ] Findings have objective evidence
- [ ] Severity levels are appropriate
- [ ] Report is constructive, not just critical
- [ ] CAPAs opened for all nonconformities
- [ ] Human has reviewed and approved findings
