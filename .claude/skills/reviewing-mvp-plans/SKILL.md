---
name: reviewing-mvp-plans
description: Reviews MVP implementation plans for quality and executability. Use when user asks to "review this plan", "check the MVP plan", "review the implementation plan", or before starting MVP execution. Also use after creating an MVP plan to validate it.
---

# Reviewing MVP Plans

Evaluates MVP implementation plans for scope discipline, prompt quality, proper sequencing, and execution readiness.

## Review Process

### Step 1: Read the Plan

Read the complete MVP plan document. Note:
- Stated scope (in/out)
- Number of phases and steps
- Prompt structure used
- Verification approach

### Step 2: Evaluate Scope Discipline

Score each dimension 0-3:

| Dimension | 0 (Poor) | 1 (Weak) | 2 (Adequate) | 3 (Strong) |
|-----------|----------|----------|--------------|------------|
| **Scope minimalism** | Feature-stuffed | Some extras | Mostly minimal | True MVP |
| **Scope justification** | No rationale | Vague reasons | Some justification | Clear "why essential" |
| **Cut list clarity** | No out-of-scope | Vague deferrals | Listed deferrals | Prioritized with rationale |

**Scope test for each feature**: "Can we launch without this?"
- If yes and included → flag as scope creep

### Step 3: Evaluate Prompt Quality

Score each dimension 0-3:

| Dimension | 0 (Poor) | 1 (Weak) | 2 (Adequate) | 3 (Strong) |
|-----------|----------|----------|--------------|------------|
| **Structure** | No structure | Partial structure | Has tags/sections | XML tags, clear sections |
| **Specificity** | Vague | Some detail | Clear task | Specific with examples |
| **Acceptance criteria** | Missing | Vague ("works") | Some criteria | Specific, verifiable |
| **Scope sizing** | Giant prompts | Some too big | Mostly right-sized | All 1-2 hour chunks |

**Prompt red flags:**
- No `<context>`, `<task>`, `<acceptance>` structure
- "Build the entire X" (too big)
- No acceptance criteria
- Repeats CLAUDE.md content

### Step 4: Evaluate Sequencing

Check dependency ordering:

| Check | Pass | Fail |
|-------|------|------|
| Foundation before features | Data models → Business logic → UI | UI before data exists |
| Dependencies respected | Step N uses outputs from N-1 | Step references future work |
| Progressive complexity | Simple → Complex | Complex items early |
| Integration timing | Components before integration | Integration before parts exist |

### Step 5: Evaluate Quality Integration

| Check | Pass | Fail |
|-------|------|------|
| CLAUDE.md assumed | Project standards not repeated | Quality rules in every prompt |
| Test mentions appropriate | Step-specific test guidance | No test mentions OR excessive |
| Verification defined | Each step has verification | No verification steps |
| Quality phase exists | Dedicated quality/polish phase | No quality phase |

### Step 6: Check Completeness

| Element | Present | Missing |
|---------|---------|---------|
| MVP scope definition | | |
| Out-of-scope list | | |
| Foundation phase | | |
| Core features phase | | |
| Quality phase | | |
| Deployment phase | | |
| Verification for each step | | |

### Step 7: Identify Anti-Patterns

| Anti-Pattern | How to Detect | Severity |
|--------------|---------------|----------|
| **Scope creep** | Features that fail "can we launch without?" | High |
| **Giant prompts** | Single prompt for multi-day work | High |
| **Missing acceptance** | Prompts end without success criteria | High |
| **CLAUDE.md duplication** | Quality rules repeated in prompts | Medium |
| **No verification** | Steps without "how to verify" | Medium |
| **Wrong sequence** | UI before data, integration before parts | Medium |
| **Vague prompts** | "Make it work" without specifics | Medium |
| **Missing phases** | No quality or deployment phase | Low |

### Step 8: Generate Recommendations

Based on findings, provide:
1. **Strengths** - What's working well
2. **Issues** - Specific problems with examples
3. **Recommendations** - Concrete fixes
4. **Overall verdict** - Ready/Improve/Revise

---

## Review Report Template

```markdown
## MVP Plan Review: [Product Name]

### Summary
[1-2 sentence assessment]

### Scope Score: X/9

| Dimension | Score | Notes |
|-----------|-------|-------|
| Scope minimalism | X/3 | |
| Scope justification | X/3 | |
| Cut list clarity | X/3 | |

### Prompt Quality Score: X/12

| Dimension | Score | Notes |
|-----------|-------|-------|
| Structure | X/3 | |
| Specificity | X/3 | |
| Acceptance criteria | X/3 | |
| Scope sizing | X/3 | |

### Sequencing Check

| Check | Status | Notes |
|-------|--------|-------|
| Foundation before features | Pass/Fail | |
| Dependencies respected | Pass/Fail | |
| Progressive complexity | Pass/Fail | |
| Integration timing | Pass/Fail | |

### Quality Integration Check

| Check | Status | Notes |
|-------|--------|-------|
| CLAUDE.md assumed | Pass/Fail | |
| Test mentions appropriate | Pass/Fail | |
| Verification defined | Pass/Fail | |
| Quality phase exists | Pass/Fail | |

### Completeness Check

| Element | Status |
|---------|--------|
| MVP scope definition | Present/Missing |
| Out-of-scope list | Present/Missing |
| Foundation phase | Present/Missing |
| Core features phase | Present/Missing |
| Quality phase | Present/Missing |
| Deployment phase | Present/Missing |

### Anti-Patterns Detected
[List any anti-patterns found, or "None detected"]

### Strengths
[What's working well - be specific]

### Issues
[Specific problems with examples from the plan]

### Recommendations
[Concrete fixes, prioritized]

### Verdict: [Ready/Improve/Revise]
[Brief justification]
```

---

## Verdict Guidelines

| Verdict | When to Use |
|---------|-------------|
| **Ready** | Scope 7+, Prompts 10+, all checks pass, no high-severity anti-patterns |
| **Improve** | Scope 5-6 or Prompts 7-9, minor issues, fixable quickly |
| **Revise** | Scope <5 or Prompts <7, significant issues, needs rework |

---

## Common Issues and Fixes

### Issue: Scope Creep

**Symptom:** Features included that aren't essential for launch.

**Test:** For each feature, ask "Can we launch without this and still deliver core value?"

**Fix:** Move non-essential features to "Out of Scope (Post-MVP)" with brief rationale.

### Issue: Giant Prompts

**Symptom:** Single prompt describes multiple days of work.

**Example:** "Build the complete checkout flow including cart, payment, confirmation, and email notifications."

**Fix:** Split into focused steps:
1. Cart data model and actions
2. Cart UI
3. Payment integration
4. Confirmation flow
5. Email notifications

### Issue: Missing Acceptance Criteria

**Symptom:** Prompts end without defining success.

**Example:** "Implement user authentication."

**Fix:** Add specific criteria:
```
<acceptance>
- User can register with email/password
- User can log in and receives session
- Invalid credentials show error message
- Tests cover registration and login flows
</acceptance>
```

### Issue: CLAUDE.md Duplication

**Symptom:** Every prompt includes "remember to write tests and follow code style."

**Fix:** Remove from prompts. Add to CLAUDE.md once:
```markdown
## Quality Standards
- Run tests after each change: `mix test`
- Check formatting: `mix format`
```

### Issue: Wrong Sequencing

**Symptom:** UI steps before data models exist.

**Fix:** Reorder:
1. Data models (what we store)
2. Actions/business logic (what we do with data)
3. UI (how users interact)
4. Integration (connecting pieces)

### Issue: No Verification Steps

**Symptom:** Steps have no "how to verify completion."

**Fix:** Add verification to each step:
```markdown
**Verification:**
- Run: `mix test`
- Check: User can register at /register
- Confirm: Session persists across page refresh
```

---

## Validation Checklist

Before completing review:

- [ ] Read complete MVP plan
- [ ] Scored all 3 scope dimensions
- [ ] Scored all 4 prompt quality dimensions
- [ ] Checked all 4 sequencing items
- [ ] Checked all 4 quality integration items
- [ ] Verified completeness (all phases present)
- [ ] Checked for anti-patterns
- [ ] Documented strengths with specifics
- [ ] Documented issues with examples
- [ ] Provided actionable recommendations
- [ ] Assigned appropriate verdict (Ready/Improve/Revise)
