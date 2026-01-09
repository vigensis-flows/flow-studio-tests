---
name: creating-product-strategy
description: Creates product strategy documents that define how to achieve the product vision. Use when user asks to "create a product strategy", "write a strategy document", "define go-to-market", or after completing a product vision. Also use when planning market entry, competitive positioning, or business model.
---

# Creating Product Strategy

Creates well-structured product strategy documents that define how to achieve the product vision.

## What is Product Strategy?

Strategy answers "How will we get there?" - the path, decisions, and trade-offs to achieve the vision.

**Strategy is NOT vision.** Vision answers "Where are we going?" (aspirational end state). Keep them separate or clearly delineated.

**Strategy is NOT a project plan.** Strategy defines approach and priorities, not detailed timelines and task assignments.

---

## Strategy Document Structure

### Core Sections

| Section | Purpose | Key Questions |
|---------|---------|---------------|
| **Target Market** | Who we serve first | Who has this problem most acutely? |
| **Go-to-Market** | How we reach them | What's the acquisition motion? |
| **Competitive Strategy** | How we win | Why us over alternatives? |
| **Business Model** | How we make money | What's the pricing and unit economics? |
| **Roadmap** | What we build when | Now/Next/Later priorities? |
| **Risk Assessment** | What could go wrong | Critical risks and mitigations? |
| **Success Metrics** | How we measure | What indicates progress? |

### Optional Sections

| Section | When to Include |
|---------|-----------------|
| **Technical Architecture** | When tech approach is strategic differentiator |
| **Validation Status** | When tracking hypotheses vs facts |
| **MVP Definition** | When scoping first version |
| **Partnerships** | When ecosystem is important |

**Target length:** 200-500 lines depending on maturity

---

## Creation Process

### Step 1: Confirm Vision Exists

Strategy builds on vision. Before writing strategy, ensure you have:
- Clear vision statement
- Problem definition
- Core solution insight
- Key differentiators

If vision is unclear, create/refine it first using creating-product-vision skill.

### Step 2: Define Target Market

Start narrow, expand later. A good beachhead market:
- Has the problem acutely (urgent pain)
- Is reachable (you know how to find them)
- Is small enough to dominate
- Can expand from (adjacent segments exist)

**Structure:**
```markdown
## Target Market

### Beachhead (Year 1)
- **Segment**: [Specific description]
- **Size**: [Estimated # of customers/users]
- **Why them first**: [Acute pain + reachability]

### Expansion (Years 2-3)
- [Adjacent segment 1]
- [Adjacent segment 2]
```

**Common mistakes:**
- Too broad ("businesses", "developers")
- Too narrow (can't build a business)
- Not reachable (can't find them)

### Step 3: Define Go-to-Market

How you'll reach and convert customers:

**B2C motions:**
- Product-led growth (self-serve)
- Content/SEO
- Paid acquisition
- Viral/referral

**B2B motions:**
- Sales-led (enterprise)
- Product-led (self-serve to teams)
- Partner/channel
- Account-based marketing

**Structure:**
```markdown
## Go-to-Market Strategy

### Motion
[Product-led / Sales-led / Hybrid]

### Stage 1: [Name] (Months X-Y)
- **Target**: [Who specifically]
- **Channel**: [How to reach them]
- **Pricing**: [Price point and model]
- **Success metrics**: [What indicates it's working]

### Stage 2: [Name] (Months Y-Z)
[...]
```

### Step 4: Define Competitive Strategy

Not just "who are competitors" but "how we win":

**Framework:**
```markdown
## Competitive Strategy

### Positioning
[One sentence: We are the X for Y that Z]

### vs [Competitor 1]
- They: [Their positioning]
- We: [Our counter-positioning]
- We win when: [Scenario where we're better choice]

### vs [Competitor 2]
[...]

### Our Moat
1. [Defensible advantage 1]
2. [Defensible advantage 2]

### What We Don't Compete On
[Explicitly cede ground where competitors are stronger]
```

### Step 5: Define Business Model

How money flows:

**Structure:**
```markdown
## Business Model

### Pricing
| Tier | Price | Target | Features |
|------|-------|--------|----------|
| [Tier 1] | [Price] | [Who] | [What's included] |
| [Tier 2] | [Price] | [Who] | [What's included] |

### Unit Economics (Target)
| Metric | Target | Notes |
|--------|--------|-------|
| CAC | [Amount] | [Acquisition cost] |
| LTV | [Amount] | [Lifetime value] |
| LTV:CAC | [Ratio] | [Should be >3:1] |
| Gross Margin | [%] | [Revenue - COGS] |
| Payback Period | [Months] | [Time to recover CAC] |

### Revenue Projections
| Year | Customers | ARR | Notes |
|------|-----------|-----|-------|
| 1 | [N] | [Amount] | [Key driver] |
| 2 | [N] | [Amount] | [Key driver] |
| 3 | [N] | [Amount] | [Key driver] |
```

### Step 6: Define Roadmap

Use Now/Next/Later, not detailed timelines:

**Structure:**
```markdown
## Roadmap

### Now (Next 3 months)
**Outcome**: [What we're trying to achieve]

**High-confidence commitments:**
- [Deliverable 1]
- [Deliverable 2]

**Open questions:**
- [What we'll learn]

### Next (3-9 months)
**Outcome**: [Target outcome]

**Medium-confidence direction:**
- [Likely deliverable 1]
- [Likely deliverable 2]

**Dependencies:**
- [What must be true]

### Later (9+ months)
**Outcome**: [Target outcome]

**Low-confidence strategic direction:**
- [Possible direction 1]
- [Possible direction 2]

**Major uncertainties:**
- [What could change this]
```

### Step 7: Assess Risks

Identify what could derail the strategy:

**Structure:**
```markdown
## Risk Assessment

### Critical Risks
| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [How we address it] |
| [Risk 2] | ... | ... | ... |

### Strategic Risks
[Risks to the overall approach]

### Execution Risks
[Risks in delivery]

### Market Risks
[External factors]
```

### Step 8: Define Success Metrics

How you'll know if strategy is working:

**Structure:**
```markdown
## Success Metrics

### Phase 1: [Name]
- [Metric 1]: [Target]
- [Metric 2]: [Target]

### Pivot Triggers
Re-evaluate strategy if:
- [Condition 1]
- [Condition 2]
```

---

## Quality Checklist

Before finalizing, verify:

### Content
- [ ] Target market is specific and reachable
- [ ] Go-to-market motion is clear
- [ ] Competitive positioning is differentiated
- [ ] Business model math works (LTV > CAC)
- [ ] Roadmap uses outcomes, not just outputs
- [ ] Risks are honest and mitigations credible

### Structure
- [ ] All core sections present
- [ ] Clear separation from vision content
- [ ] Appropriate length for maturity stage

### Alignment
- [ ] Strategy supports the vision
- [ ] Target market matches problem from vision
- [ ] Competitive strategy leverages differentiators from vision

### Red Flags (Fix Before Finalizing)
- [ ] No "we'll figure it out later" in critical areas
- [ ] No unrealistic projections without assumptions stated
- [ ] No competitor dismissal without honest assessment
- [ ] No roadmap items without outcome connection

---

## Anti-Patterns to Avoid

| Anti-Pattern | Description | Fix |
|--------------|-------------|-----|
| **Boil the Ocean Market** | "Our market is everyone" | Narrow to specific beachhead |
| **Feature Roadmap** | Lists features, not outcomes | Rewrite as outcomes with deliverables |
| **Competitor Dismissal** | "We're better at everything" | Honest assessment, cede some ground |
| **Hockey Stick Projections** | Unrealistic growth without basis | Ground in assumptions, show math |
| **Risk Blindness** | No risks listed or all "low" | Honest assessment, real mitigations |
| **Strategy by Buzzword** | "AI-first", "Platform play" | Concrete approach with specifics |
| **Vision Confusion** | Mixes vision and strategy | Separate documents or clear sections |

---

## Template

```markdown
# Product Strategy
**[Product Name]**

*Updated: [Date]*

---

## Target Market

### Beachhead (Year 1)
- **Segment**:
- **Size**:
- **Why them first**:

### Expansion (Years 2-3)
-
-

---

## Go-to-Market Strategy

### Motion
[Product-led / Sales-led / Hybrid]

### Stage 1: [Name]
- **Target**:
- **Channel**:
- **Pricing**:
- **Success metrics**:

---

## Competitive Strategy

### Positioning
[We are the X for Y that Z]

### vs [Primary Competitor]
- They:
- We:
- We win when:

### Our Moat
1.
2.

---

## Business Model

### Pricing
| Tier | Price | Target |
|------|-------|--------|
| | | |

### Unit Economics (Target)
| Metric | Target |
|--------|--------|
| CAC | |
| LTV | |
| LTV:CAC | |

---

## Roadmap

### Now (Next 3 months)
**Outcome**:

**Commitments:**
-
-

### Next (3-9 months)
**Outcome**:

**Direction:**
-
-

### Later (9+ months)
**Outcome**:

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| | | |

---

## Success Metrics

### Phase 1
-
-

### Pivot Triggers
-
-
```

