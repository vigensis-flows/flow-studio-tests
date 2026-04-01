---
name: writing-mvp-brief
description: >
  Makes the MVP bet and documents it as the MVP Brief — the foundational document
  of the product definition. Selects the primary option from the options analysis,
  defines scope, states hypotheses, and produces a brief that the entire team can
  build from. Use as the final step in creating an MVP Brief, after
  exploring-mvp-options.
argument-hint: "<product-slug>"
---

# Writing the MVP Brief

You are acting as the Product Maestro writing the MVP Brief — the single most
important document in the product definition. This document makes the bet:
who we're building for, what we're building, why we believe it will work,
and how we'll know if we're right.

**This is not a summary of the options analysis.** The options analysis explored
the space. This document makes the choice — and owns the consequences. Every
sentence must earn its place. Every claim must have evidence or be marked as
a hypothesis.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Research synthesis | `docs/product-definition/working/research-synthesis.md` | Yes |
| Options analysis | `docs/product-definition/working/mvp-options.md` | Yes |
| Product Brief research | `docs/product-brief/*.md` | For reference |
| User instruction | Workflow context | No |

Read the options analysis first. It contains the decisions to be made.
Read the research synthesis for evidence. Refer to original research only
for specific data points.

**If user instruction is provided**, it may indicate which option the founder
prefers, additional constraints, or feedback from a previous iteration.
Weight it heavily — the founder's judgment matters, especially on segment
and pricing choices where they have context you don't.

## Process

### Step 1: Choose the Primary Option

Select one option from the options analysis as the primary bet. This may be:
- One of the analyzed options as-is
- A hybrid that combines elements (only if internally coherent)
- A variation informed by the founder's instruction

The choice must be justified. State why this option over the others.
"The founder preferred it" is a valid reason when combined with evidence.

### Step 2: Sharpen the Scope

Apply the MVP Scope Test one more time to the chosen option's capabilities.
Be ruthless. The brief should describe the smallest product that:
- Tests the most important hypothesis
- Delivers enough value that someone would pay
- Is a complete product, not a demo or prototype

For every capability, explicitly state whether it's in or out, and why.

### Step 3: State the Hypotheses

Write 3 hypotheses — one for each dimension:

1. **Value Hypothesis**: Do users have this problem and will they use this solution?
2. **Business Hypothesis**: Will users pay, and can we deliver at viable margins?
3. **Usability Hypothesis**: Can users accomplish the core task without hand-holding?

Each hypothesis must be:
- **Specific** — not "users will like it" but "[persona] will [action] at least [frequency]"
- **Testable** — the MVP as scoped can provide signal
- **Falsifiable** — there's a clear "we were wrong" outcome
- **Consequential** — if wrong, it changes what we build next

### Step 4: Define the Revenue Signal

The MVP must have a path to revenue. Define:
- What we charge (or plan to charge)
- The behavioral proxy that precedes payment (if freemium/trial)
- The specific metric that tells us we're on track
- The timeline for when we expect to see signal

"We'll figure out monetization later" is not acceptable. The MVP Brief
exists to test whether the model works — you can't test what you haven't defined.

### Step 5: Write the Brief

Save to `docs/product-definition/1-mvp-brief.md`.

## Output Structure

```markdown
# MVP Brief: [Product Name]

## The Bet

[One paragraph — 3-5 sentences. What we're building, for whom, and why we
believe it will work. This is the elevator pitch of the MVP. A reader should
understand the entire concept after this paragraph.]

## Problem

### Who Has This Problem
[Specific persona — not a segment label but a person you can picture.
Their role, context, what they're trying to do, and why current solutions fail them.]

### The Pain
[The specific pain this MVP addresses. Grounded in evidence from the research.
Include user quotes or behavioral evidence where available.]

### Current Workaround
[What they do today and why it's inadequate. This establishes the baseline
the MVP must beat.]

## Solution

### Core Insight
[The key realization that makes this solution different from what exists.
Not a feature — an approach or perspective.]

### What the MVP Does
[2-3 paragraphs describing the product in terms of what the user experiences,
not what the system does internally. Focus on outcomes.]

### First Moment
[The first 30 seconds of a new user's experience. What they see, understand,
and do. Concrete enough that a designer could build from this description.]

## Scope

### In Scope — What the MVP Includes

| Capability | Why It's In | Hypothesis It Tests |
|-----------|------------|-------------------|
| [Capability 1] | [Why essential] | [Which hypothesis] |
| [Capability 2] | [Why essential] | [Which hypothesis] |

### Out of Scope — What the MVP Excludes

| Excluded | Why It's Out | When It Might Return |
|---------|-------------|---------------------|
| [Feature/capability] | [Why not now] | [Next / Later / Never] |

### Scope Boundaries
[Explicit rules for scope decisions during build. When something comes up
that's not listed above, these boundaries help decide in or out.]

## Business Model Hypothesis

### Pricing
- **Model:** [Subscription / Usage / Project / Hybrid]
- **Price point:** [Amount and frequency]
- **Pricing anchor:** [What the customer compares this to]
- **Rationale:** [Why this price for this segment]

### Unit Economics (Directional)
| Metric | Hypothesis | Basis |
|--------|-----------|-------|
| Cost to serve | [per customer/mo] | [Compute, infrastructure, support] |
| Target price | [per customer/mo] | [Value-based / competitive] |
| Gross margin | [percentage] | [Price - cost] |
| Break-even | [N customers] | [When fixed costs are covered] |

### Revenue Signal
- **Primary signal:** [The observable behavior indicating willingness to pay]
- **Timeline:** [When we expect to see it]
- **Threshold:** [What level indicates success vs. failure]

## Reachability

### How We Reach the First 50 Customers
[Specific channels, communities, or approaches. Not "content marketing" —
"post in [specific community] about [specific topic] targeting [specific persona]".]

### Go-to-Market MVP
[The minimum viable distribution: what's the simplest path from
"product exists" to "someone is using it"?]

## Hypotheses to Test

### 1. Value Hypothesis
**We believe** [specific assumption about user value]
**MVP tests this by** [what the MVP includes/measures to test this]
**We'll know we're right when** [specific, measurable signal]
**We'll know we're wrong when** [specific, measurable counter-signal]

### 2. Business Hypothesis
**We believe** [specific assumption about business viability]
**MVP tests this by** [what the MVP includes/measures to test this]
**We'll know we're right when** [specific, measurable signal]
**We'll know we're wrong when** [specific, measurable counter-signal]

### 3. Usability Hypothesis
**We believe** [specific assumption about user capability]
**MVP tests this by** [what the MVP includes/measures to test this]
**We'll know we're right when** [specific, measurable signal]
**We'll know we're wrong when** [specific, measurable counter-signal]

## Compatibility

### Other Segments That Could Use This MVP
[Which segments, not optimized for, could still derive value.
For each: what works for them, what doesn't, what they'd need additionally.]

### Expansion Path
[If the primary bet succeeds, where does the product go next?
This is not a roadmap — it's the logical next move.]

## Risks

| Risk | Severity | What We'll Do |
|------|----------|--------------|
| [Specific risk] | Critical/High/Medium | [Mitigation — address early in build] |
| [Specific risk] | ... | ... |

## Key Decisions Made

| Decision | Choice | Why | Alternatives Considered |
|----------|--------|-----|----------------------|
| Primary segment | [Choice] | [Rationale] | [What else we considered] |
| Pricing model | [Choice] | [Rationale] | [What else we considered] |
| [Other key decision] | [Choice] | [Rationale] | [Alternatives] |

## What This Document Enables

With this brief approved, the team proceeds to create:
- **Product Vision** — where this goes long-term
- **Product Strategy** — how we win
- **Design Specification** — how the product works
- **Visual Specification** — how it looks
- **Content Specification** — what it says
- **Architecture Blueprint** — how we build it
```

## Iteration Awareness

Check if `docs/product-definition/1-mvp-brief.md` already exists.

**If it exists** — this is a refinement iteration:
- Read the existing document first
- Read the user instruction carefully — it likely contains feedback
  on specific aspects (segment choice, pricing, scope)
- Refine and improve — don't start from scratch
- Preserve what works, update what needs to change
- Add a `## Revision Notes` section at the end noting what changed and why

**If it doesn't exist** — create it fresh from the options analysis.

## Quality Standards

- **The Bet paragraph must be compelling in isolation.** If someone reads
  only that paragraph, they should understand what this product is and
  want to know more.
- **Every capability in scope must pass the MVP Scope Test.** No exceptions,
  no "nice to haves" that snuck in.
- **Hypotheses must be falsifiable.** "Users will like it" is not falsifiable.
  "Solo founders will complete a product brief within 30 minutes without
  asking for help" is falsifiable.
- **Unit economics must be directionally viable.** If the napkin math shows
  negative gross margins at any scale, the model doesn't work.
- **Reachability must be specific.** "Social media marketing" is not specific.
  "Launch post in Indie Hackers with teardown of our own product brief" is specific.
- **Key decisions must document alternatives.** The reader should understand
  not just what was chosen, but what was rejected and why.
- **Risks must be honest.** If the reality check flagged something, it should
  appear here or be explicitly addressed as "resolved because [reason]."
- **Length: 200-400 lines.** Substantive but scannable.

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Feature list disguised as scope** | Lists features, not outcomes | Describe what changes for the customer |
| **Hedged bets** | "We'll target A or B depending on..." | Pick one. The brief IS the decision. |
| **Missing falsification** | "We'll know when users engage" | Define "engage" — frequency, depth, retention |
| **Optimistic unit economics** | Ignores compute costs or support | Include real cost estimates, not just revenue |
| **Generic risks** | "Competition" | "8090 launches self-service at $99/mo before we ship" |
| **No reachability plan** | "The market is large" | How do you reach person #1? |
| **Scope creep in "Expansion Path"** | Turns into a roadmap | One logical next move, not a feature backlog |

## What Happens Next

The MVP Brief is the foundation. All subsequent documents build on it:
- Vision uses it to articulate the long-term direction
- Strategy uses it to define how to win
- Design Spec uses it to define user flows and interactions
- Content Spec uses it to define voice and messaging
- Architecture uses it to define the domain model and technical approach

If the brief changes, downstream documents may need updating.
This is by design — the brief is the source of truth for what we're building.
