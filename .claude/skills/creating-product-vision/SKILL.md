---
name: creating-product-vision
description: >
  Creates the product vision document — the north star that guides all product
  decisions. Articulates where the product is going (3-5 year horizon), why it
  matters, and what makes it different. Reads the Research Synthesis as primary
  input. Use as the first step in creating a product definition, after research
  synthesis.
argument-hint: "<product-slug>"
---

# Creating Product Vision

You are acting as the Product Maestro creating a product vision document.
The vision answers one question: **"Where are we going?"** — the aspirational
end state 3-5 years out that guides every product decision.

The vision is the north star. Everything else flows from it: strategy defines
how we win, MVP Bets define where we start, MVP Brief defines the first build.

**Vision is NOT strategy.** Strategy answers "How will we get there?"
(market approach, go-to-market, business model, roadmap). Keep them separate.

**Vision is NOT an MVP.** The MVP is a first bet to test hypotheses.
The vision is the destination that bet is aimed toward.

**Vision is NOT a feature list.** Features are outputs. Vision focuses on
outcomes — what changes in the customer's world.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Research Synthesis | `docs/product-definition/working/research-synthesis.md` | Yes |
| Product Brief research | `docs/product-brief/*.md` (especially `1-problem-and-opportunity.md`) | Yes |
| Product context | `.claude/context/product-context.md` | No — for existing products |
| User instruction | Workflow context | No |

The Research Synthesis is the primary input. It distills all research into
what matters: key tensions, differentiation vectors, segment insights, and
competitive reality. The Product Brief research provides the raw evidence
the synthesis draws from.

## Process

### Step 1: Read the Research Synthesis and Key Product Brief Documents

Read `docs/product-definition/working/research-synthesis.md`. Understand:
- The key tensions and trade-offs surfaced by the research
- All customer segments and their needs
- All differentiation vectors — what makes this opportunity unique
- The competitive landscape and where existing solutions fall short
- The full scope of the opportunity, not just one slice of it

Then read the Product Brief research, especially:
- `docs/product-brief/1-problem-and-opportunity.md` — the core problem space
- `docs/product-brief/5-differentiation-analysis.md` — competitive positioning
- `docs/product-brief/3-users-and-needs.md` — who we serve and what they need

### Step 2: Understand What Already Exists (If Applicable)

If `.claude/context/product-context.md` exists, read it. Understand:
- What has already been built
- What capabilities exist today
- What constraints the current state imposes
- How the vision should account for the existing foundation

If no product context exists, this is a greenfield vision — proceed from
the research alone.

### Step 3: Articulate the Vision

The vision is informed by the **full** research — all segments, all
differentiation vectors, all competitive reality. It is not constrained
to any single segment or narrow scope. Ask:

- What is the 3-5 year aspirational end state this product creates?
- What fundamental change does this product bring to the customer's world?
- What is the full scope of the opportunity if everything goes right?
- What makes this approach fundamentally different from alternatives?
- What capabilities emerge as the product matures across all segments?

The vision should be ambitious but grounded — connected to the research
evidence, not disconnected aspiration.

### Step 4: Define the Mission

The mission answers **"Why do we exist?"** — the enduring purpose that
persists even as the product evolves. It is not timebound like the vision.

- The vision is the destination (3-5 years, specific, aspirational)
- The mission is the purpose (enduring, motivating, identity-defining)

### Step 5: Establish Product Personality

The vision establishes how the product *feels* — its experiential identity.
This guides all downstream design and content decisions.

Is this product:
- **Opinionated** (guides you through a methodology) or **flexible** (adapts to your workflow)?
- **Professional** (enterprise-grade, precise) or **approachable** (casual, encouraging)?
- **Expert tool** (assumes competence, offers power) or **guided experience** (teaches as it goes)?
- **Autonomous** (does the work for you) or **collaborative** (works alongside you)?

State this explicitly — the Design Shaper and Content Writer need it downstream.

### Step 6: Define Principles

Principles guide decisions when the vision alone does not provide clear
answers. Each principle must be actionable — able to resolve a real
trade-off. Generic platitudes ("customer-focused", "high quality") are
not principles.

### Step 7: Write the Vision Document

Save to `docs/product-definition/1-product-vision.md`.

## Vision Document Structure

### Required Sections

| Section | Purpose | Length |
|---------|---------|--------|
| **Vision Statement** | Aspirational end state (3-5 years) | 1-2 sentences |
| **Mission** | Why we exist — enduring purpose | 1-2 sentences |
| **The Problem** | Pain/opportunity that exists | 1-3 paragraphs |
| **The Solution** | Core insight and approach | 1-3 paragraphs |
| **What Makes This Different** | Key differentiators | 3-7 bullets |
| **Product Personality** | How the product feels | 1 paragraph |
| **Principles** | Guiding values/beliefs | 3-7 bullets |

### Optional Sections

| Section | When to Include |
|---------|-----------------|
| **Target Customer** | When the research highlights a specific persona worth calling out |
| **Working Title Note** | When the product name may change |

**Target length:** 50-150 lines (1-3 pages)

## Output Structure

```markdown
# Product Vision: [Product Name]

## Vision

[1-2 sentence aspirational statement about the future state this product creates.
Must be: aspirational, specific, timebound (3-5 years), customer-focused.
Grounded in the full opportunity from the research, not limited to any single segment.]

## Mission

[1-2 sentence statement about why we exist — the enduring purpose.
The mission persists even as the product evolves. It is the "why" that
motivates the team and anchors every decision.]

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

### Mission Statement

The mission is the enduring purpose. Good patterns:
- "We exist to [purpose] by [approach]"
- "[Verb] [who] to [outcome]"

The mission should feel timeless — it should still be true in 10 years
even if the product has evolved significantly.

### Differentiation

**Good:** "Active Intelligence: Experts create deliverables autonomously, not just provide advice"
**Bad:** "Better user experience" / "AI-powered" / "More features"

### Principles

**Good:** "Outcomes over outputs: Measure by client success, not features shipped"
**Bad:** "Customer-focused" / "High quality" / "Innovative"

## Alignment Check

Before finalizing, verify the vision is grounded in the research:

- [ ] The vision reflects the full opportunity surfaced by the research — all segments, all vectors
- [ ] The problem statement is grounded in evidence from the Product Brief research
- [ ] The differentiators reflect the differentiation vectors from the research synthesis
- [ ] The solution addresses the competitive gaps identified in the research
- [ ] The principles are informed by the tensions the research surfaced
- [ ] The product personality is appropriate for the target customers identified

**If the research contains tensions or contradictions**, make your best
judgment and proceed. Note significant assumptions inline where you made
them. The human reviews the full definition package and will catch
misalignments — the iteration mechanism (re-run with feedback) resolves them.

## Iteration Awareness

Check if `docs/product-definition/1-product-vision.md` already exists.

**If it exists** — this is a refinement iteration:
- Read the existing document first
- Read the user instruction carefully — it likely contains feedback
- Refine and improve — don't start from scratch
- Preserve what works, update what needs to change
- Add a `## Revision Notes` section at the end noting what changed and why

**If it doesn't exist** — create it fresh from the research synthesis.

## Quality Checklist

### Content
- [ ] Vision is aspirational but achievable (3-5 year horizon)
- [ ] Mission is enduring and purpose-driven (not timebound)
- [ ] Problem is significant and specific (not trivial)
- [ ] Solution addresses the problem directly
- [ ] Differentiation is concrete and defensible
- [ ] Target customer is identifiable
- [ ] Product personality is stated explicitly
- [ ] Principles guide real decisions (not platitudes)

### Structure
- [ ] All required sections present
- [ ] Vision statement is 1-2 sentences
- [ ] Mission statement is 1-2 sentences
- [ ] Total length 50-150 lines
- [ ] Scannable (headers, bullets, short paragraphs)

### Alignment
- [ ] All sections tell the same story
- [ ] No contradictions between sections
- [ ] Grounded in research evidence
- [ ] Language is consistent throughout

### Red Flags (Fix Before Finalizing)
- [ ] No feature lists masquerading as vision
- [ ] No buzzword soup (AI, disruption, etc. without substance)
- [ ] No "boil the ocean" scope (trying to solve everything)
- [ ] No strategy elements (roadmap, metrics, go-to-market)
- [ ] No narrow scope that ignores research breadth

## Anti-Patterns

| Anti-Pattern | Description | Fix |
|--------------|-------------|-----|
| **Feature Vision** | Lists features instead of outcomes | Rewrite focusing on customer value |
| **Technology Vision** | Leads with tech stack | Lead with customer problem/outcome |
| **Boil the Ocean** | Solves everything for everyone | Focus on the opportunity the research identified |
| **Buzzword Bingo** | AI, blockchain, disruption without substance | Replace with specific capabilities |
| **Me-Too Vision** | "Like X but better" | Articulate the unique insight from the research |
| **Founder Fantasy** | Not grounded in market reality | Ground in evidence from the research |
| **Strategy Creep** | Includes roadmap, metrics, GTM | Move to strategy document |
| **Narrow Scope** | Vision constrained to one segment or MVP slice | Expand to reflect the full opportunity from research |

## What Happens Next

The vision feeds into:
- **Product Strategy** (`creating-product-strategy`) — uses the vision as the destination, defines how we win: target market, go-to-market, competitive positioning, business model, and roadmap
- **Design Specification** — uses the product personality to shape the experience
- **Content Specification** — uses the personality and principles to define voice
- **Architecture Blueprint** — uses the long-term direction to inform extensibility decisions
