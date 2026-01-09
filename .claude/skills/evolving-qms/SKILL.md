---
name: evolving-qms
description: Evolves the Quality Management System toward ISO compliance. Use when auditing QMS state, identifying gaps, proposing improvements, tracking quality metrics, or working toward ISO 9001/13485 readiness. Owned by Quality Guardian.
---

# Evolving the QMS

Stewards the Quality Management System through continuous improvement, gap analysis, and progress toward ISO certification.

## When to Use

- Auditing current QMS state against standards
- Identifying gaps and improvement opportunities
- Proposing or implementing QMS changes
- Tracking quality metrics and maturity
- Preparing for ISO certification milestones

## QMS Evolution Principles

**Progress over perfection**: Move incrementally. Small improvements compound.

**Lived, not documented**: A process that isn't followed is worthless. Focus on practices people actually use.

**Evidence-based**: Track metrics. Let data guide priorities.

**Build capability**: Help others understand quality, not just comply with it.

---

## Gap Analysis Process

### Step 1: Define Scope

Determine what's being assessed:
- Full QMS audit (comprehensive)
- Specific area (documentation, risk management, etc.)
- ISO clause-specific (9001 clause 7, 13485 clause 8, etc.)

### Step 2: Assess Current State

Review existing documentation and practices:

```
docs/process/           # Core process documentation
docs/increments/        # Increment records
docs/architecture/      # ADRs
docs/templates/         # Standard templates
```

For each area, document:
- What exists
- What's actually used (vs just documented)
- Evidence of compliance

### Step 3: Compare to Target Standard

**ISO 9001:2015 Key Clauses:**

| Clause | Area | Key Requirements |
|--------|------|------------------|
| 4 | Context | Understand org context, interested parties, QMS scope |
| 5 | Leadership | Management commitment, quality policy, roles |
| 6 | Planning | Risk/opportunity, quality objectives, change planning |
| 7 | Support | Resources, competence, awareness, communication, documented info |
| 8 | Operation | Operational planning, requirements, design, control, release |
| 9 | Performance | Monitoring, internal audit, management review |
| 10 | Improvement | Nonconformity, corrective action, continual improvement |

**ISO 13485:2016 Additional Requirements:**
- Design controls (clause 7.3)
- Risk management per ISO 14971
- Traceability requirements
- Production and service controls
- Feedback and complaint handling

### Step 4: Document Gaps

For each gap identified:

```markdown
## Gap: [Short Description]

**Standard Reference:** ISO [standard] clause [X.X]

**Requirement:** [What the standard requires]

**Current State:** [What exists today]

**Gap:** [What's missing or inadequate]

**Risk Level:** High / Medium / Low

**Proposed Resolution:** [How to address]

**Effort Estimate:** [Rough sizing]
```

### Step 5: Prioritize

Prioritize gaps by:
1. **Risk level** - Safety and regulatory first
2. **Foundation** - Prerequisites before dependent items
3. **Quick wins** - High impact, low effort
4. **Learning value** - What teaches us most about our gaps

---

## Improvement Process

### Making Changes

**Low-risk changes** (implement directly):
- Adding missing templates
- Clarifying existing documentation
- Adding examples to guides
- Filling documentation gaps

**Significant changes** (propose for approval):
- New processes or procedures
- Changes to existing workflows
- Policy changes
- Structural reorganization

### Improvement Documentation

For each improvement:

```markdown
## Improvement: [Title]

**Date:** [YYYY-MM-DD]
**Status:** Proposed / Approved / Implemented

**Problem:** [What gap or issue this addresses]

**Solution:** [What was changed or added]

**Evidence:** [Link to changed files/docs]

**Verification:** [How we know it works]
```

### Tracking Progress

Maintain a QMS improvement log:
- Location: `docs/process/qms-improvements.md`
- Track all changes with dates and rationale
- Review periodically for patterns

---

## Quality Metrics

### Qualitative Indicators

Track through observation and feedback:
- Are increment documents being created and used?
- Is PDAI being followed with balanced phases?
- Are learnings being captured during Assess/Improve?
- Are reviews happening and producing value?

### Quantitative Indicators

Track through measurement:

| Metric | What It Measures | Target Direction |
|--------|------------------|------------------|
| Increment completion rate | % increments completing all PDAI phases | Increase |
| Phase balance | Time distribution across P/D/E/I | 25% ± 5% each |
| Documentation completeness | % required docs present | Increase |
| Improvement implementation | % identified improvements acted on | Increase |
| Cycle time | Average increment duration | Stable/Decrease |

### Reporting Cadence

- **Weekly**: Quick pulse check on active increments
- **Monthly**: Metrics review and trend analysis
- **Quarterly**: Full QMS status and improvement planning

---

## ISO Readiness Milestones

### Foundation (Current Focus)

- [ ] PDAI cycle documented and practiced
- [ ] Increment tracking established
- [ ] Basic documentation structure in place
- [ ] Quality objectives defined
- [ ] Improvement process active

### ISO 9001 Ready

- [ ] Quality policy documented
- [ ] All clause requirements addressed
- [ ] Internal audit capability
- [ ] Management review process
- [ ] Corrective action process

### ISO 13485 Ready

- [ ] Design control process
- [ ] Risk management per ISO 14971
- [ ] Production controls
- [ ] Traceability system
- [ ] Complaint handling process
- [ ] Regulatory file structure

---

## Output Artifacts

This skill produces:

| Artifact | Location | Purpose |
|----------|----------|---------|
| Gap analysis report | `docs/process/qms-gap-analysis.md` | Current state vs target |
| Improvement log | `docs/process/qms-improvements.md` | Track all changes |
| Metrics dashboard | `docs/process/qms-metrics.md` | Quality indicators |
| Readiness checklist | `docs/process/iso-readiness.md` | Certification progress |

---

## Validation

Before completing a QMS evolution activity:
- [ ] Changes are documented with rationale
- [ ] Significant changes were approved
- [ ] Evidence of implementation exists
- [ ] Verification approach defined
- [ ] Improvement log updated
