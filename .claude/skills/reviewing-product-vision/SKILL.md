---
name: reviewing-product-vision
description: Reviews product vision documents for quality and completeness. Use when user asks to "review this vision", "check the product vision", "critique the vision document", or after creating/modifying a vision. Also use when evaluating if a vision needs refinement or when preparing for stakeholder review.
---

# Reviewing Product Vision

Evaluates product vision documents for quality, completeness, and effectiveness. Identifies issues and suggests improvements.

## Review Process

### Step 1: Read the Vision Document

Read the complete vision document and any referenced context files.

### Step 2: Evaluate Content Quality

Score each dimension 0-3:

| Dimension | 0 (Missing) | 1 (Weak) | 2 (Adequate) | 3 (Strong) |
|-----------|-------------|----------|--------------|------------|
| **Problem Significance** | No problem stated | Trivial problem | Real but common problem | Urgent, underserved problem |
| **Problem Evidence** | Pure assumption | Anecdotal | Some research/observation | Well-researched, validated |
| **Solution Clarity** | Vague/confusing | Buzzword-heavy | Clear but generic | Clear and insightful |
| **Differentiation** | Not stated | Generic ("better") | Some specifics | Concrete, defensible |
| **Customer Specificity** | "Everyone" | Broad segment | Named segment | Specific persona |
| **Outcome Focus** | Feature list | Mixed features/outcomes | Mostly outcomes | Pure outcome focus |

**Score interpretation:**
- 15-18: Strong vision, minor refinements
- 10-14: Solid foundation, needs work in specific areas
- 5-9: Significant gaps, major revision needed
- 0-4: Fundamental issues, restart recommended

### Step 3: Evaluate Structural Quality

Check each element:

| Element | Pass | Fail |
|---------|------|------|
| **Vision statement** | 1-2 clear sentences | Missing, long, or vague |
| **Mission statement** | Clear how vision is pursued | Missing or confused with vision |
| **Problem section** | Specific, grounded, significant | Abstract, assumed, trivial |
| **Solution section** | Core insight clear | Feature list or buzzwords |
| **Differentiation** | 3-7 concrete points | Missing, generic, or too many |
| **Principles** | Actionable, memorable | Generic values or missing |
| **Length** | 50-150 lines | Too short or bloated |
| **Scannable** | Headers, bullets, short paragraphs | Wall of text |

### Step 4: Check Alignment

Verify internal consistency:

- [ ] Vision → Mission → Problem → Solution tell coherent story
- [ ] Differentiation supports the solution
- [ ] Principles align with vision
- [ ] No contradictions between sections
- [ ] Consistent language and terminology

### Step 5: Identify Anti-Patterns

Check for common problems:

| Anti-Pattern | How to Detect | Severity |
|--------------|---------------|----------|
| **Feature Vision** | Lists features, not outcomes | High |
| **Technology Vision** | Leads with tech stack | High |
| **Boil the Ocean** | No clear customer/problem focus | High |
| **Buzzword Bingo** | AI, disruption, etc. without substance | Medium |
| **Me-Too Vision** | "Like X but better" | Medium |
| **Founder Fantasy** | No problem evidence | Medium |
| **Strategy Creep** | Includes roadmap, metrics, GTM | Low |

### Step 6: Generate Recommendations

Based on findings, provide:
1. **Strengths** - What's working well
2. **Issues** - Specific problems with examples
3. **Recommendations** - Concrete fixes
4. **Overall verdict** - Keep/Improve/Revise/Restart

---

## Quality Criteria Deep Dive

### Problem Significance

**Strong:**
- Affects many people or high-value segment
- Current solutions are inadequate
- Pain is frequent or intense
- Willingness to pay is evident

**Weak:**
- Trivial inconvenience
- Already solved well
- Rare occurrence
- Nice-to-have, not must-have

**Questions to ask:**
- Who has this problem?
- How often do they experience it?
- What do they do today?
- What would they pay to solve it?

### Problem Evidence

**Strong:**
- Cites research or data
- References customer interviews
- Observes market behavior
- Acknowledges what's validated vs assumed

**Weak:**
- "We believe..." without evidence
- Pure founder intuition
- No distinction between assumption and fact

**Questions to ask:**
- Where did this insight come from?
- How many people confirmed this?
- What would disprove this?

### Solution Clarity

**Strong:**
- Core insight is immediately understandable
- Explains WHY this approach works
- Differentiates from alternatives
- Avoids jargon

**Weak:**
- Requires multiple reads to understand
- Hides behind buzzwords
- Doesn't explain the "how"
- Could describe any company

**Questions to ask:**
- Can I explain this to someone in 30 seconds?
- Why does this work when alternatives don't?
- What's the key insight?

### Differentiation

**Strong:**
- Specific and concrete
- Hard for competitors to copy
- Creates real customer value
- Supported by evidence or logic

**Weak:**
- Generic ("better UX", "AI-powered")
- Easy to replicate
- Technical novelty without customer value
- Aspirational without substance

**Questions to ask:**
- Why can't competitors do this?
- Does the customer care about this?
- Is this actually different?

### Customer Specificity

**Strong:**
- Named segment with characteristics
- Clear pain points for this segment
- Explains why this segment first
- Can identify individuals in segment

**Weak:**
- "Everyone" or "businesses"
- Broad categories without focus
- Multiple unrelated segments
- Can't name a specific person

**Questions to ask:**
- Who is the first customer?
- Why them and not others?
- Can you name 10 potential customers?

### Outcome Focus

**Strong:**
- Describes customer world after using product
- Measures success by customer outcomes
- Features are means, not ends
- Uses customer language

**Weak:**
- Lists features and capabilities
- Technical specifications
- Internal metrics (users, revenue)
- Builder language, not buyer language

**Questions to ask:**
- What can customers do that they couldn't before?
- How is their life/work different?
- What outcome are we delivering?

---

## Review Report Template

```markdown
## Vision Review: [Product Name]

### Summary
[1-2 sentence overall assessment]

### Content Quality Score: X/18

| Dimension | Score | Notes |
|-----------|-------|-------|
| Problem Significance | X/3 | [Brief note] |
| Problem Evidence | X/3 | [Brief note] |
| Solution Clarity | X/3 | [Brief note] |
| Differentiation | X/3 | [Brief note] |
| Customer Specificity | X/3 | [Brief note] |
| Outcome Focus | X/3 | [Brief note] |

### Structural Check

| Element | Status | Notes |
|---------|--------|-------|
| Vision statement | Pass/Fail | |
| Mission statement | Pass/Fail | |
| Problem section | Pass/Fail | |
| Solution section | Pass/Fail | |
| Differentiation | Pass/Fail | |
| Principles | Pass/Fail | |
| Length appropriate | Pass/Fail | |
| Scannable | Pass/Fail | |

### Alignment Check
- [ ] Coherent story across sections
- [ ] Differentiation supports solution
- [ ] Principles align with vision
- [ ] No contradictions
- [ ] Consistent terminology

### Anti-Patterns Detected
[List any anti-patterns found, or "None detected"]

### Strengths
[What's working well - be specific]

### Issues
[Specific problems with examples from the document]

### Recommendations
[Concrete fixes, prioritized]

### Verdict: [Keep/Improve/Revise/Restart]
[Brief justification]
```

---

## Verdict Guidelines

| Verdict | When to Use |
|---------|-------------|
| **Keep** | Score 15+, no anti-patterns, minor polish only |
| **Improve** | Score 10-14, specific areas need work |
| **Revise** | Score 5-9, significant gaps but core is sound |
| **Restart** | Score 0-4, fundamental issues, better to start fresh |

---

## Common Issues and Fixes

### Issue: Vision Too Abstract

**Symptom:** Vision could apply to any company in the space.

**Example:** "We help businesses succeed with AI."

**Fix:** Add specificity:
- Who specifically? (segment)
- What outcome specifically? (measurable)
- How specifically? (approach)

**Better:** "We enable medical device manufacturers to ship compliant software 40% faster by automating FDA documentation in their CI/CD pipeline."

### Issue: Problem Not Grounded

**Symptom:** Problem section reads like assumptions.

**Example:** "Users struggle with X" without evidence.

**Fix:** Add evidence markers:
- "Research shows..." (cite source)
- "In 15 customer interviews, 12 mentioned..."
- "Industry reports indicate..."
- "Our observation:" (acknowledge it's observation)

### Issue: Solution Is Feature List

**Symptom:** Solution describes what you build, not why it matters.

**Example:** "We build a platform with AI agents, real-time collaboration, and workflow automation."

**Fix:** Lead with outcome:
- What can customers do that they couldn't before?
- What's the core insight that enables this?

**Better:** "We enable solo practitioners to deliver enterprise-grade work by operationalizing their expertise through AI augmentation. Core insight: Professional services work isn't 'chat with AI' - it's orchestrated collaboration across long-running projects."

### Issue: Generic Differentiation

**Symptom:** Differentiation points are industry clichés.

**Example:** "Better UX", "AI-powered", "Fast and reliable"

**Fix:** Make it specific and defensible:
- What specifically is better?
- Why can't competitors do this?
- What evidence supports this claim?

### Issue: Principles Are Generic Values

**Symptom:** Principles are motherhood statements.

**Example:** "Customer-focused", "High quality", "Innovative"

**Fix:** Make principles actionable:
- Does this help decide between two options?
- Would the opposite also be reasonable?
- Can you give an example where this principle guided a decision?

**Better:** "Outcomes over outputs: We measure success by client outcomes (revenue, retention), not features shipped. This means we'll kill a feature that ships but doesn't move metrics."

---

## Validation Checklist

Before completing review:

- [ ] Read complete vision document
- [ ] Scored all 6 content dimensions
- [ ] Checked all 8 structural elements
- [ ] Verified internal alignment
- [ ] Checked for anti-patterns
- [ ] Documented strengths with specifics
- [ ] Documented issues with examples
- [ ] Provided actionable recommendations
- [ ] Assigned appropriate verdict
