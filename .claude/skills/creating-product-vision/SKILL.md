---
name: creating-product-vision
description: >
  Creates the product vision document — the north star that guides all product
  decisions. Articulates where the product is going (3-5 year horizon), why it
  matters, and what makes it different. Reads the MVP Brief as primary input.
  Use after the MVP Brief is complete.
argument-hint: "<product-slug>"
---

# Creating Product Vision

You are acting as the Product Maestro creating a product vision document.
The vision answers one question: **"Where are we going?"** — the aspirational
end state 3-5 years out that guides every product decision.

**Vision is NOT strategy.** Strategy answers "How will we get there?"
(market approach, go-to-market, business model, roadmap). Keep them separate.

**Vision is NOT the MVP Brief.** The MVP Brief defines the first bet.
The vision defines where that bet leads if it pays off.

**Vision is NOT a feature list.** Features are outputs. Vision focuses on
outcomes — what changes in the customer's world.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| MVP Brief | `docs/product-definition/1-mvp-brief.md` | Yes |
| Product Brief research | `docs/product-brief/*.md` | For reference |
| User instruction | Workflow context | No |

The MVP Brief is the primary input. It defines the bet — who, what, why.
The vision extends that bet into the future: if this works, where does it go?

## Process

### Step 1: Read the MVP Brief

Read `docs/product-definition/1-mvp-brief.md`. Understand:
- Who the product serves (primary segment + compatibility)
- What problem it solves
- What the core insight is
- What hypotheses are being tested
- What the expansion path suggests

The MVP Brief's "Expansion Path" section is your starting point for the
vision — it hints at where the product goes after the first bet.

### Step 2: Extend the Bet Into the Future

The MVP is a starting point. The vision is where 3-5 years of successful
iteration leads. Ask:
- If the value hypothesis is confirmed, what does the product become?
- If the business hypothesis works, how large does this get?
- What capabilities emerge as the product matures?
- What changes in the customer's world because this product exists?

The vision should be ambitious but grounded — connected to the MVP by
a plausible path, not disconnected aspiration.

### Step 3: Establish Product Personality

The vision establishes how the product *feels* — its experiential identity.
This guides all downstream design and content decisions.

Is this product:
- **Opinionated** (guides you through a methodology) or **flexible** (adapts to your workflow)?
- **Professional** (enterprise-grade, precise) or **approachable** (casual, encouraging)?
- **Expert tool** (assumes competence, offers power) or **guided experience** (teaches as it goes)?
- **Autonomous** (does the work for you) or **collaborative** (works alongside you)?

State this explicitly — the Design Shaper and Content Writer need it downstream.

### Step 4: Write the Vision Document

Save to `docs/product-definition/2-product-vision.md`.

## Vision Document Structure

### Required Sections

| Section | Purpose | Length |
|---------|---------|--------|
| **Vision Statement** | Aspirational end state | 1-2 sentences |
| **Mission** | How we pursue the vision | 1-2 sentences |
| **The Problem** | Pain/opportunity that exists | 1-3 paragraphs |
| **The Solution** | Core insight and approach | 1-3 paragraphs |
| **What Makes This Different** | Key differentiators | 3-7 bullets |
| **Product Personality** | How the product feels | 1 paragraph |
| **Principles** | Guiding values/beliefs | 3-7 bullets |

### Optional Sections

| Section | When to Include |
|---------|-----------------|
| **Target Customer** | When the MVP Brief targets a specific persona worth highlighting |
| **Working Title Note** | When the product name may change |

**Target length:** 50-150 lines (1-3 pages)

## Output Structure

```markdown
# Product Vision: [Product Name]

## Vision

[1-2 sentence aspirational statement about the future state this product creates.
Must be: aspirational, specific, timebound (3-5 years), customer-focused.]

## Mission

[1-2 sentence statement about how we pursue the vision.
The vision is the destination; the mission is the journey.]

## The Problem

[1-3 paragraphs structured as:]

**The current state:**
[What's broken or missing today — grounded in evidence from the research]

**Why it matters:**
[Impact on real people/businesses — not abstract, specific]

**Why current solutions fail:**
[The gap in the market — what alternatives miss]

## The Solution

[1-3 paragraphs describing the core insight and approach.
Outcome-focused: "We enable [outcome] by [approach]"
NOT feature-focused: "We build a platform with..."]

**Core insight:** [The key realization that makes this different]

## What Makes This Different

[3-7 concrete, defensible differentiators. Each must:]
[- Be specific (not "better" or "faster")]
[- Be defensible (why competitors can't easily replicate)]
[- Create customer value (not just technical novelty)]

1. **[Differentiator 1]:** [Explanation]
2. **[Differentiator 2]:** [Explanation]
3. **[Differentiator 3]:** [Explanation]

## Product Personality

[One paragraph describing the experiential identity of the product.
How does it feel to use? What kind of "colleague" is it? Is it opinionated
or flexible, professional or approachable, autonomous or collaborative?
This guides design and content decisions downstream.]

## Principles

[3-7 principles that guide decisions when the vision doesn't provide
clear answers. Each must be actionable — able to resolve a real trade-off.]

1. **[Principle name]:** [Explanation — what trade-off this resolves]
2. **[Principle name]:** [Explanation — what trade-off this resolves]
3. **[Principle name]:** [Explanation — what trade-off this resolves]
```

## Writing Guidance

### Vision Statement

The vision statement is the north star. Good patterns:
- "[Customer segment] can [desirable outcome] through [our approach]"
- "Become the [category] for [segment] by [differentiation]"
- "[Verb] [outcome] for [customer] through [approach]"

**Good examples:**
- "Build professional services infrastructure that enables radical sustainable scaling through AI-augmented expertise."
- "Empower every healthcare sales professional with the intelligence they need to outperform."

### Differentiation

**Good:** "Active Intelligence: Experts create deliverables autonomously, not just provide advice"
**Bad:** "Better user experience" / "AI-powered" / "More features"

### Principles

**Good:** "Outcomes over outputs: Measure by client success, not features shipped"
**Bad:** "Customer-focused" / "High quality" / "Innovative"

## Alignment Check

Before finalizing, verify the vision aligns with the MVP Brief:

- [ ] The vision extends the MVP's bet into the future — same problem space, same core insight
- [ ] The primary segment from the MVP Brief is recognizable in the vision's target customer
- [ ] The differentiators from the vision are consistent with the MVP's scope decisions
- [ ] The principles don't contradict the MVP Brief's scope boundaries
- [ ] The expansion path from the MVP Brief is a plausible first step toward the vision
- [ ] The product personality is consistent with the MVP's experience model

**If the vision contradicts the MVP Brief**, make your best judgment and
proceed. Note significant assumptions inline where you made them. The human
reviews the full definition package and will catch misalignments — the
iteration mechanism (re-run with feedback) resolves them.

## Iteration Awareness

Check if `docs/product-definition/2-product-vision.md` already exists.

**If it exists** — this is a refinement iteration:
- Read the existing document first
- Read the user instruction carefully — it likely contains feedback
- Refine and improve — don't start from scratch
- Preserve what works, update what needs to change
- Add a `## Revision Notes` section at the end noting what changed and why

**If it doesn't exist** — create it fresh from the MVP Brief.

## Quality Checklist

### Content
- [ ] Vision is aspirational but achievable (3-5 year horizon)
- [ ] Problem is significant and specific (not trivial)
- [ ] Solution addresses the problem directly
- [ ] Differentiation is concrete and defensible
- [ ] Target customer is identifiable
- [ ] Product personality is stated explicitly
- [ ] Principles guide real decisions (not platitudes)

### Structure
- [ ] All required sections present
- [ ] Vision statement is 1-2 sentences
- [ ] Total length 50-150 lines
- [ ] Scannable (headers, bullets, short paragraphs)

### Alignment
- [ ] All sections tell the same story
- [ ] No contradictions between sections
- [ ] Consistent with MVP Brief
- [ ] Language is consistent throughout

### Red Flags (Fix Before Finalizing)
- [ ] No feature lists masquerading as vision
- [ ] No buzzword soup (AI, disruption, etc. without substance)
- [ ] No "boil the ocean" scope (trying to solve everything)
- [ ] No strategy elements (roadmap, metrics, go-to-market)
- [ ] No contradiction with MVP Brief's bet

## Anti-Patterns

| Anti-Pattern | Description | Fix |
|--------------|-------------|-----|
| **Feature Vision** | Lists features instead of outcomes | Rewrite focusing on customer value |
| **Technology Vision** | Leads with tech stack | Lead with customer problem/outcome |
| **Boil the Ocean** | Solves everything for everyone | Narrow to the problem space from the MVP Brief |
| **Buzzword Bingo** | AI, blockchain, disruption without substance | Replace with specific capabilities |
| **Me-Too Vision** | "Like X but better" | Articulate the unique insight from the MVP Brief |
| **Founder Fantasy** | Not grounded in market reality | Ground in evidence from the research |
| **Strategy Creep** | Includes roadmap, metrics, GTM | Move to strategy document |
| **MVP Disconnect** | Vision unrelated to the MVP's bet | Re-anchor in the MVP Brief's expansion path |

## What This Document Enables

The vision feeds into:
- **Strategy** — uses the vision as the destination, defines the path
- **Design Specification** — uses the product personality to shape the experience
- **Content Specification** — uses the personality and principles to define voice
- **Architecture Blueprint** — uses the long-term direction to inform extensibility decisions
