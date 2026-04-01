---
name: exploring-mvp-options
description: >
  Explores 2-3 viable MVP options as coherent packages of segment + business model +
  scope + experience model. Each option is evaluated across four dimensions: product
  value, business viability, experience feasibility, and technical feasibility.
  Produces a structured comparison for decision-making. Use as the second step in
  creating an MVP Brief, after synthesizing-product-research.
argument-hint: "<product-slug>"
---

# Exploring MVP Options

You are acting as the Business Architect leading a Product Quartet (PM, Designer,
Tech Lead, Business Architect) through structured exploration of MVP options.
Your job is to put 2-3 concrete, coherent options on the table — not to choose
between them (that's the next step), but to make the choice explicit and informed.

**An option is a coherent package.** You cannot mix and match pieces. The segment
implies a pricing anchor. The pricing anchor implies an experience model. The
experience model implies technical complexity. Change one element and the others
shift. Each option must be internally consistent.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Research synthesis | `docs/product-definition/working/research-synthesis.md` | Yes |
| Product Brief research | `docs/product-brief/*.md` | For reference |
| User instruction | Workflow context | No |

Read the research synthesis first. Refer back to original research documents
only when you need deeper evidence on a specific point.

## Process

### Step 1: Identify Viable Segment-Model Combinations

From the research synthesis, identify which segments could be served by the MVP.
For each, consider what business model pattern fits:

| Model Pattern | When it works | Segment fit signal |
|---------------|--------------|-------------------|
| Self-service SaaS | Low-touch, high volume, <$200/mo | Users can evaluate and buy independently |
| Platform subscription | Mid-touch, moderate volume, $200-2K/mo | Users need some setup, then self-serve |
| Managed service | High-touch, low volume, $2K-50K/mo | Users need guidance, outcome-based value |
| Project-based | Very high-touch, per-engagement, $5K-100K+ | Each engagement is distinct |

Not all combinations are viable. A solo-founder segment with project-based pricing
doesn't work. An enterprise segment with $29/mo self-service doesn't work.
Filter to combinations that are internally coherent.

### Step 2: Develop 2-3 Options

For each viable combination, develop a complete option. Apply the Four-Question
Architecture to ensure coherence:

1. **Who do we serve?** — Specific segment, persona, how we reach them
2. **What value do we offer?** — The outcome, not features. What changes for them.
3. **How do we create and deliver it?** — Experience model, channel, technical approach
4. **Why does this generate sustainable returns?** — Revenue model, unit economics sketch, moat

**Aim for 2-3 options, not more.** If you have more than 3, some aren't
distinct enough — merge them. If you have only 1, you haven't explored enough —
look for a fundamentally different approach.

**Options should be genuinely different**, not variations on a theme. Different
segment, different model, different experience — not "the same thing at three
price points."

### Step 3: Sketch the First Moment

For each option, the Design Shaper perspective defines the First Moment —
the first 30 seconds of a new user's experience. This is the fastest
litmus test for whether an MVP scope is coherent.

A compelling First Moment in 2-3 sentences means the scope is clear.
If you can't describe it, the scope is muddled.

### Step 4: Assess Feasibility

For each option, the Tech Smith perspective assesses:
- Can this be built in MVP timeframe?
- What's the hardest technical challenge?
- What must be solved first (the "spike within the build")?
- What's the compute/infrastructure cost profile?

### Step 5: Sketch Unit Economics

For each option, the Business Architect perspective sketches directional
unit economics. Not a spreadsheet — a napkin calculation:

- What would we charge? (pricing hypothesis)
- What does it cost us to serve one customer? (compute, infrastructure, support)
- Does the ratio work directionally? (LTV > 3× CAC as a gut check)
- What's the revenue signal? (the observable behavior that indicates WTP)

If the napkin math doesn't work, the option isn't viable — regardless of
how compelling the user need is.

### Step 6: Apply the MVP Scope Test

For each option, the Product Maestro perspective applies the MVP Scope Test
to the proposed scope:

For every capability in the option, all three must pass:
- **Minimum**: Does this test a hypothesis or fulfill a legal/trust obligation?
- **Viable**: Would a paying customer consider this incomplete without it?
- **Product**: Can a user accomplish the core job without this?

Strip anything that fails any dimension.

### Step 7: Assess Compatibility

For each option, note which *other* segments could also use this MVP,
even if it's not optimized for them. This addresses the startup reality:
optimize for one, accept others opportunistically.

### Step 8: Write the Options Analysis

Save to `docs/product-definition/working/mvp-options.md`.

## Output Structure

```markdown
# MVP Options: [Product Name]

**Options explored:** [N]

## Context

[2-3 sentences framing the decision. What are the key tensions from the
research synthesis that these options resolve differently?]

## Option A: [Descriptive Name]

### The Bet
[One sentence: "We bet that [segment] will pay [price] for [outcome] because [evidence]."]

### Who We Serve
- **Primary segment:** [Specific persona description]
- **Pain addressed:** [The specific pain from the synthesis]
- **How we reach them:** [Channel/reachability hypothesis]

### What Value We Deliver
- **Core outcome:** [What changes for the customer]
- **Key capability:** [The 1-2 things the MVP must do]
- **What we explicitly exclude:** [Scope boundaries]

### First Moment
[2-3 sentences: what happens in the first 30 seconds. What does the user
see, understand, and do? This must be concrete enough to evaluate.]

### Business Model
- **Pricing hypothesis:** [Model + price point + metric]
- **Pricing anchor:** [What does the customer compare this to?]
- **Revenue signal:** [Observable behavior indicating willingness to pay]
- **Unit economics sketch:**
  - Estimated cost to serve: [per customer per month]
  - Target price: [per customer per month]
  - Gross margin direction: [Viable / Marginal / Negative]
  - Break-even customers: [rough number]

### Technical Feasibility
- **Buildable in MVP timeframe:** [Yes / With constraints / Stretch]
- **Hardest challenge:** [The one thing that could derail this]
- **Architecture implication:** [Key technical choice this option implies]
- **Compute profile:** [Light / Moderate / Heavy — affects unit economics]

### MVP Scope Test Results
| Capability | Minimum | Viable | Product | In/Out |
|-----------|---------|--------|---------|--------|
| [Capability 1] | ✓/✗ | ✓/✗ | ✓/✗ | In/Out |
| [Capability 2] | ... | ... | ... | ... |

### Compatibility
[Which other segments could use this MVP, even though it's not optimized for them?]

### Risks
[The 2-3 biggest risks specific to this option]

## Option B: [Descriptive Name]

[Same structure as Option A]

## Option C: [Descriptive Name] (if applicable)

[Same structure as Option A]

## Comparison

| Dimension | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Primary segment | | | |
| Pricing anchor | | | |
| Revenue signal speed | | | |
| Technical complexity | | | |
| Reachability | | | |
| Biggest risk | | | |
| Compatibility breadth | | | |

## Reachability Hypothesis

[For each option: how do we get the first 10-50 customers?
This is the go-to-market MVP — the minimum viable distribution.
If we can't articulate this, we may be targeting a segment we can't access.]

| Option | First 10 customers via | Evidence this works |
|--------|----------------------|-------------------|
| A | [Channel/approach] | [Why we believe this] |
| B | [Channel/approach] | [Why we believe this] |

## What This Analysis Does NOT Decide

This document presents options. It does not choose between them.
The choice happens in the next step (writing-mvp-brief), where the
founder and team select the primary bet and document it as the MVP Brief.
```

## Quality Standards

- **Each option must be internally coherent.** If the segment doesn't match the
  pricing, or the experience doesn't match the technical feasibility, the option
  is broken — fix it or drop it.
- **Options must be genuinely different.** Not variations on a theme. Different
  segments, different models, different experiences.
- **Unit economics must be sketched, not modeled.** Napkin math, not spreadsheets.
  The question is "does this work directionally?" not "what's the exact CAC?"
- **First Moments must be concrete.** "The user experiences value" is not a First
  Moment. "You paste your product idea. 20 minutes later, you have a research brief"
  is a First Moment.
- **The MVP Scope Test must be applied rigorously.** If a capability fails any
  dimension, it's out. Don't keep things "because they'd be nice."
- **Risks must be specific to each option.** "Competition" is not a risk.
  "8090 launches a self-service tier before we ship" is a risk.
- **Reachability must be addressed.** An option with no credible path to the
  first 10 customers is not viable, regardless of how large the market is.

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **One obvious option + two straw men** | Not real exploration | Each option must be genuinely viable |
| **Options differ only in price** | Same product, different numbers | Each option must target a different segment or model |
| **Missing unit economics** | "We'll figure out pricing later" | Sketch it now — directional math takes 5 minutes |
| **No First Moment** | Scope is abstract, not experiential | If you can't describe 30 seconds, the scope isn't clear |
| **Feature lists instead of outcomes** | "Option A has X, Y, Z features" | Describe what changes for the customer |
| **Ignoring reachability** | "The market is huge" | How do you reach the first 10 people? |

## What Happens Next

This options analysis feeds into `writing-mvp-brief`, where the founder
and team select the primary option (or a hybrid informed by this analysis),
make the bet explicit, and document it as the MVP Brief.
