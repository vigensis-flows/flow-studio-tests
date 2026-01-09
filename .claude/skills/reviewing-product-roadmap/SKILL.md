---
name: reviewing-product-roadmap
description: Reviews product roadmap documents for quality and completeness. Use when user asks to "review this roadmap", "check the product roadmap", "critique the roadmap", or after creating/modifying a roadmap. Also use when evaluating if a roadmap is ready for increment planning.
---

# Reviewing Product Roadmap

Evaluates product roadmap documents for quality, completeness, and readiness for execution. Identifies issues and suggests improvements.

## Review Process

### Step 1: Read the Roadmap Document

Read the complete roadmap and referenced documents (Vision, Strategy, Discovery Log).

### Step 2: Evaluate Content Quality

Score each dimension 0-3:

| Dimension | 0 (Missing) | 1 (Weak) | 2 (Adequate) | 3 (Strong) |
|-----------|-------------|----------|--------------|------------|
| **Now Specificity** | No Now section | Vague outcomes | Clear outcomes, some gaps | Specific, measurable criteria |
| **Scope Boundaries** | No boundaries | Vague boundaries | Clear in/out | Explicit with rationale |
| **Decision Documentation** | No decisions | Decisions listed | Decisions with choices | Decisions with rationale |
| **Horizon Differentiation** | All same detail | Some variation | Clear progression | Appropriate per horizon |
| **Outcome Focus** | Feature list | Mixed | Mostly outcomes | Pure outcome focus |
| **Discovery Integration** | No discovery | Mentions discovery | Key learnings noted | Synthesized insights |

**Score interpretation:**
- 15-18: Strong roadmap, ready for execution
- 10-14: Solid foundation, needs refinement
- 5-9: Significant gaps, major revision needed
- 0-4: Fundamental issues, restart recommended

### Step 3: Evaluate Structural Quality

Check each element:

| Element | Pass | Fail |
|---------|------|------|
| **Now section** | Specific outcomes, success criteria | Vague or feature-focused |
| **Now scope boundaries** | Explicit in/out with rationale | Missing or unclear |
| **Now key decisions** | Documented with rationale | Missing or undocumented |
| **Next section** | Directional, medium confidence | Over-specified or missing |
| **Next dependencies** | Clear dependencies on Now | No dependencies noted |
| **Later section** | Thematic, low confidence | Over-detailed or missing |
| **Discovery summary** | Key learnings synthesized | Missing or disconnected |
| **Length appropriate** | 100-200 lines | Too short or bloated |

### Step 4: Check Alignment

Verify consistency with other documents:

- [ ] Now supports Strategy's near-term priorities
- [ ] Next aligns with Strategy's medium-term direction
- [ ] Later connects to Vision's long-term goals
- [ ] Scope boundaries align with Strategy's anti-scope
- [ ] Decisions align with Strategy's key choices
- [ ] No contradictions with Vision or Strategy

### Step 5: Check Executability

Verify the Now section can become an increment:

| Check | Question | Pass/Fail |
|-------|----------|-----------|
| **Scope clarity** | Can we create a Build Plan from this? | |
| **Success criteria** | Can we verify completion? | |
| **Decisions made** | Are blocking decisions resolved? | |
| **Open questions** | Are remaining questions non-blocking? | |
| **Dependencies** | Are external dependencies identified? | |

### Step 6: Identify Anti-Patterns

Check for common problems:

| Anti-Pattern | How to Detect | Severity |
|--------------|---------------|----------|
| **Feature Factory** | Lists features, not outcomes | High |
| **False Precision** | Later has same detail as Now | Medium |
| **Missing Boundaries** | No explicit scope exclusions | High |
| **Undocumented Decisions** | Key choices without rationale | Medium |
| **Strategy Duplication** | Copies Strategy content verbatim | Low |
| **Project Plan Creep** | Includes tasks/assignments | Medium |
| **Stale Discovery** | Discovery insights don't inform scope | Medium |

### Step 7: Generate Recommendations

Based on findings, provide:
1. **Strengths** - What's working well
2. **Issues** - Specific problems with examples
3. **Recommendations** - Concrete fixes
4. **Overall verdict** - Ready/Improve/Revise/Restart

---

## Quality Criteria Deep Dive

### Now Specificity

**Strong:**
- Outcomes are customer-focused
- Success criteria are measurable
- Capabilities map to customer value
- Scope is achievable in timeframe

**Weak:**
- Generic outcomes ("improve UX")
- No success criteria
- Internal focus (tech debt, refactoring)
- Scope is unclear or too large

**Questions to ask:**
- Can we verify when this is done?
- Does the customer care about this outcome?
- Is this achievable in 3 months?

### Scope Boundaries

**Strong:**
- Explicit "in scope" and "out of scope"
- Rationale for deferrals
- Aligns with Strategy anti-scope
- Prevents scope creep

**Weak:**
- No exclusions listed
- Vague boundaries ("keep it simple")
- Contradicts Strategy
- Invites scope creep

**Questions to ask:**
- What are we NOT doing?
- Why is each deferral appropriate?
- How do we prevent scope creep?

### Decision Documentation

**Strong:**
- Key decisions explicitly stated
- Choices documented (what we picked)
- Rationale explained (why we picked it)
- Alternatives considered noted

**Weak:**
- Decisions implied, not stated
- No rationale for choices
- Contradicts earlier decisions
- Key choices missing

**Questions to ask:**
- What decisions did we make to enable this scope?
- Why did we choose this approach?
- What did we decide against?

### Horizon Differentiation

**Strong:**
- Now: specific, measurable, committed
- Next: directional, dependencies noted
- Later: thematic, uncertainties acknowledged
- Clear confidence progression

**Weak:**
- All horizons equally detailed
- Now is too vague
- Later is too specific
- No confidence acknowledgment

**Questions to ask:**
- Does detail level match confidence?
- Is Now specific enough to execute?
- Is Later appropriately uncertain?

### Outcome Focus

**Strong:**
- Customer capabilities, not features
- Measurable outcomes
- "Customer can do X" language
- Why it matters explained

**Weak:**
- Feature lists
- Technical specifications
- Internal metrics only
- No customer value articulated

**Questions to ask:**
- What can customers do that they couldn't before?
- Why do they care about this?
- How do we know it succeeded?

### Discovery Integration

**Strong:**
- Key questions from discovery answered
- Assumptions explicitly stated
- Risks identified with mitigations
- Learnings inform scope decisions

**Weak:**
- No reference to discovery
- Assumptions unstated
- Risks not addressed
- Scope ignores discovery insights

**Questions to ask:**
- What did we learn that shaped this scope?
- What are we still assuming?
- What risks did we identify?

---

## Review Report Template

```markdown
## Roadmap Review: [Product Name]

### Summary
[1-2 sentence overall assessment]

### Content Quality Score: X/18

| Dimension | Score | Notes |
|-----------|-------|-------|
| Now Specificity | /3 | |
| Scope Boundaries | /3 | |
| Decision Documentation | /3 | |
| Horizon Differentiation | /3 | |
| Outcome Focus | /3 | |
| Discovery Integration | /3 | |

### Structural Check

| Element | Status | Notes |
|---------|--------|-------|
| Now section | Pass/Fail | |
| Now scope boundaries | Pass/Fail | |
| Now key decisions | Pass/Fail | |
| Next section | Pass/Fail | |
| Next dependencies | Pass/Fail | |
| Later section | Pass/Fail | |
| Discovery summary | Pass/Fail | |
| Length appropriate | Pass/Fail | |

### Alignment Check
- [ ] Now supports Strategy
- [ ] Next aligns with Strategy
- [ ] Later connects to Vision
- [ ] No contradictions

### Executability Check

| Check | Status | Notes |
|-------|--------|-------|
| Scope clarity | Pass/Fail | |
| Success criteria | Pass/Fail | |
| Decisions made | Pass/Fail | |
| Open questions | Pass/Fail | |
| Dependencies | Pass/Fail | |

### Anti-Patterns Detected
[List any anti-patterns found, or "None detected"]

### Strengths
[What's working well - be specific]

### Issues
[Specific problems with examples from the document]

### Recommendations
[Concrete fixes, prioritized]

### Verdict: [Ready | Improve | Revise | Restart]
[Brief justification]

### Ready for Increment Planning?
[Yes/No with explanation]
```

---

## Verdict Guidelines

| Verdict | When to Use |
|---------|-------------|
| **Ready** | Score 15+, executability passes, no high-severity anti-patterns |
| **Improve** | Score 10-14, specific areas need work before execution |
| **Revise** | Score 5-9, significant gaps but core direction is sound |
| **Restart** | Score 0-4, fundamental issues, better to start fresh |

---

## Common Issues and Fixes

### Issue: Now Section Too Vague

**Symptom:** Can't create a Build Plan from the Now section.

**Example:** "Improve user experience for core workflows"

**Fix:** Add specificity:
- Which workflows specifically?
- What improvement specifically?
- How will we measure success?

**Better:** "Users can complete extraction setup in under 5 minutes with <2% error rate"

### Issue: Missing Scope Boundaries

**Symptom:** No explicit exclusions, inviting scope creep.

**Fix:** Add "Out of scope" section with:
- Specific items excluded
- Rationale for each deferral
- Which horizon they move to

### Issue: Feature List Instead of Outcomes

**Symptom:** Lists what we're building, not why.

**Example:** "Build extraction API, add webhook support, create dashboard"

**Fix:** Reframe as customer outcomes:
- What can customers do?
- Why does this matter to them?
- How do we measure success?

**Better:** "Customers can automate document extraction without engineering support"

### Issue: Later Too Detailed

**Symptom:** Later section has same specificity as Now.

**Fix:** Reduce Later to themes:
- Remove specific features
- Keep strategic direction
- Acknowledge major uncertainties
- Connect to long-term Vision

### Issue: Discovery Not Integrated

**Symptom:** Scope doesn't reflect discovery learnings.

**Fix:** Add Discovery Summary section:
- Key questions answered
- Assumptions made explicit
- Risks identified
- Show how learnings shaped scope

---

## Validation Checklist

Before completing review:

- [ ] Read complete roadmap document
- [ ] Read referenced Vision and Strategy
- [ ] Scored all 6 content dimensions
- [ ] Checked all 8 structural elements
- [ ] Verified alignment with Vision/Strategy
- [ ] Checked executability of Now section
- [ ] Checked for anti-patterns
- [ ] Documented strengths with specifics
- [ ] Documented issues with examples
- [ ] Provided actionable recommendations
- [ ] Assigned appropriate verdict
- [ ] Assessed readiness for increment planning
