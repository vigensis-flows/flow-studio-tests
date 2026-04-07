---
name: writing-mvp-brief
description: >
  Defines the first step in detail — the MVP that tests the strategy's most
  important hypotheses. Uses the Venture Builder's recommendation from the
  MVP Bets analysis as the default direction, or the founder's instruction
  if provided.
argument-hint: "<product-slug>"
---

# Writing the MVP Brief

You are acting as the Product Maestro writing the MVP Brief — the detailed
plan for the first step toward the vision, within the strategy. This document
takes the founder's direction on the bets and turns it into a complete,
buildable plan: who we're building for, what we're building, why we believe
it will work, and how we'll know if we're right.

**This is not a summary of the bets analysis.** The vision set the destination,
the strategy defined the path, and the bets explored concrete starting points.
This document designs an MVP that tests the most important entry hypotheses —
often in parallel — defining scope, hypotheses, business model, and success
criteria with enough precision that a team can build from it. Every sentence
must earn its place. Every claim must have evidence or be marked as a hypothesis.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Vision | `docs/product-definition/1-product-vision.md` | Yes |
| Strategy | `docs/product-definition/2-product-strategy.md` | Yes |
| MVP Bets | `docs/product-definition/working/mvp-bets.md` | Yes |
| Research synthesis | `docs/product-definition/working/research-synthesis.md` | For reference |
| Product context | `.claude/context/product-context.md` | Optional |
| User instruction | Workflow context | No |

Read the vision and strategy first — they define the destination and the path.
Read the MVP bets analysis — it contains the explored bets, their evaluation,
parallel testability assessment, and the Venture Builder's recommendation.

**If user instruction is provided**, it contains the founder's direction on
which bet(s) to pursue, modifications, or additional constraints. Weight it
heavily — the founder's judgment matters.

**If no user instruction is provided**, use the Venture Builder's recommendation
from the bets analysis as the starting direction. The bets document includes
a recommendation ranked by hypothesis risk, parallel testability, and strategic
fit. This recommendation is your default — proceed with it autonomously.

## Process

### Step 0: Understand What Already Exists

If a product context file exists (`.claude/context/product-context.md` or equivalent),
read it. If the product already has working capabilities, understand them before
making scope decisions.

**Existing, working capabilities change the scope equation fundamentally.**
Including them has near-zero incremental cost — the engineering already happened.
Excluding them discards differentiation for no build-time savings. The question
for existing products is not "what's the minimum to build?" but "what's the
minimum to add (billing, onboarding, positioning) to make existing capabilities
reach revenue signal?"

### Step 1: Navigate the Bets

The bets analysis contains the Venture Builder's recommendation on which bets
to pursue and how they can be tested in parallel. Use the recommendation as
the starting direction — or the user instruction if one was provided.

The Product Maestro's job is NOT to pick one bet — it's to design an MVP that
tests multiple entry hypotheses simultaneously. The 3-5 bets from the Venture
Builder likely share most capabilities (they're within the same strategy) and
differ primarily in go-to-market: segment, pricing, positioning, channel.

**1. Map what's shared vs. what varies.** Review all bets. Identify:
- **Product core** — the capabilities all viable bets need. This is what we build.
- **Entry variations** — where the bets differ: packaging, pricing tiers,
  positioning, target segment emphasis, distribution channel. This is what we
  test in parallel.

**2. Design one MVP with parallel tests.** The MVP should have:
- **(a) A product core** that supports all viable bets. Don't narrow the
  product to fit one bet when the same capabilities serve several.
- **(b) Entry variations** that test different hypotheses in parallel —
  different pricing tiers, different landing pages, different channel
  experiments, different positioning for different segments. These are
  lightweight go-to-market variations, not separate products.
- **(c) Clean signal separation** — define what observable behavior
  distinguishes each entry variation's success or failure. If you can't tell
  which bet is winning from the data, you're not testing — you're guessing.

**3. When to pick one instead.** Default to navigating multiple bets, not
picking. Only collapse to a single bet when:
- Bets require genuinely different product capabilities (not just different
  positioning of the same capability)
- Parallel go-to-market is not feasible (e.g., the product requires deep
  customization per segment that changes the core experience)
- The founder explicitly directs a single-bet approach

Even when picking one, document what was set aside and the conditions under
which it would be revisited.

**Check for hypothesis reduction.** If the resulting MVP is significantly
narrower than what the strategy calls for — if the strategy identified a bold
opportunity and the MVP retreats to a safe subset — name that explicitly.
Is the narrowing justified by evidence (e.g., sovereign deployment has 18-month
sales cycles), or is it an unexamined assumption (e.g., "broad scope is risky")?
Find the smallest test for the bold hypothesis, don't reduce the hypothesis
to fit a small test.

### Step 2: Sharpen the Scope

Apply the MVP Scope Test to **the product core** (new work only). Existing,
working capabilities are included by default — they already passed their own
validation by being built and tested. The scope test applies to the shared
product core, not to individual entry variations (which are go-to-market
variations, not product scope).

For new capabilities, the brief should describe the smallest product that:
- Supports the entry variations identified in Step 1
- Tests the most important hypotheses across bets
- Delivers enough value that someone would pay
- Is a complete product, not a demo or prototype

For every capability, explicitly state whether it's in or out, and why.
For existing capabilities that are excluded, the reason must be stronger than
"scope discipline" — name the specific harm of including them.

### Step 3: State the Hypotheses

Hypotheses should be derived from two questions:
1. **What must we prove to achieve the vision?** — The vision defines where
   we're going. What assumptions, if wrong, would mean we can never get there?
2. **What could kill this?** — What risks, if they materialize, would make
   the strategy unviable?

These are not generic "will users pay and use this?" questions. They are
specific to *this* product's vision and strategy.

Write 3 hypotheses — one for each dimension:

1. **Value Hypothesis**: Do users have this problem and will they use this solution?
2. **Business Hypothesis**: Will users pay, and can we deliver at viable margins?
3. **Usability Hypothesis**: Can users accomplish the core task without hand-holding?

Each hypothesis must be:
- **Specific** — not "users will like it" but "[persona] will [action] at least [frequency]"
- **Testable** — the MVP as scoped can provide signal
- **Falsifiable** — there's a clear "we were wrong" outcome
- **Consequential** — if wrong, it changes what we build next
- **Connected to the vision** — failing this hypothesis threatens the long-term destination, not just this MVP

### Step 4: Define the Revenue Signal

The MVP must have a path to revenue. Define:
- What we charge (or plan to charge)
- The behavioral proxy that precedes payment (if freemium/trial)
- The specific metric that tells us we're on track
- The timeline for when we expect to see signal

"We'll figure out monetization later" is not acceptable. The MVP Brief
exists to test whether the model works — you can't test what you haven't defined.

**Freemium trap check:** If the model includes a free tier, evaluate the
conversion trigger for the specific target customer — not generically:

- Does the free tier fully satisfy the target customer's core job? If yes,
  there is no conversion trigger — the free offer is the product's main competitor.
- Is the target customer's usage recurring or one-shot? If the customer has
  a single job (e.g., one product to validate, one assessment to run), they
  may never need the paid tier. The free tier gave them what they needed.
- What is the compute cost per free user? At what conversion rate does the
  free tier's cost justify itself as acquisition spending?
- Size this risk explicitly. If the free tier is likely to satisfy the core
  job completely for the target customer, flag it as a critical model risk.

### Step 4b: Business Viability Check

Revenue signal is necessary but not sufficient. The model must also sustain the
business. Before writing the brief, sanity-check the business viability:

- **At the proposed price point and a conservative Year 1 customer count, does
  the revenue cover the founding team's actual operating costs?** Not just
  infrastructure — people, rent, tools, taxes. A team in a high-cost location
  (e.g., Switzerland, SF, London) has a higher cost floor than a solo founder
  in a low-cost market. Be specific.
- **How many simultaneously paying customers are needed to break even?** If
  the answer is 200+, this is a venture-scale play that needs external funding
  or a bridge revenue source — acknowledge that in the brief. If the answer is
  30-80, it's achievable for a bootstrapped team within 12-18 months.
- **What bridge is needed?** If Year 1 revenue won't cover costs, name the
  bridge: founder savings, consulting revenue, part-time work, or external
  investment. "We'll figure it out" is not a bridge — it's hope.
- **Does a higher price point make the model viable with fewer customers?**
  If break-even at $99/month requires 250 customers but break-even at $300/month
  requires 80, the pricing decision is also a viability decision. Flag the
  trade-off explicitly.

If the model fails the viability check at the proposed price, don't just
note the risk — reconsider the pricing. A model that produces revenue signal
but can't sustain the business is a hobby, not a venture.

### Step 5: Write the Brief

Save to `docs/product-definition/3-mvp-brief.md`.

## Output Structure

```markdown
# MVP Brief: [Product Name]

## The Bets

[Which entry hypotheses this MVP tests in parallel. For each bet: the target
segment, positioning, pricing approach, and distribution channel. Explain what
they share (the product core) and where they diverge (go-to-market variations).
If only one bet is being pursued, state why parallel testing was not feasible
and what was set aside.]

## Signal Separation

[How each entry variation produces distinguishable signals. Define the
observable behaviors, metrics, or conversion events that tell you which bet
is working and which is not. If you can't distinguish signal from noise
between bets, the parallel design needs rework. For each variation: what
does success look like? What does failure look like? What data do you collect
and how do you attribute it?]

## Vision Alignment

[How this MVP is the first concrete step toward the product vision. Reference
the vision document — don't restate it. Explain what this MVP proves that
matters for the long-term destination.]

## Strategic Context

[How this MVP executes the strategy. Which strategic priorities does it
address? What competitive positioning does it establish? Reference the
strategy document for the full picture.]

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
**This matters for the vision because** [why this threatens the long-term destination if wrong]
**MVP tests this by** [what the MVP includes/measures to test this]
**We'll know we're right when** [specific, measurable signal]
**We'll know we're wrong when** [specific, measurable counter-signal]

### 2. Business Hypothesis
**We believe** [specific assumption about business viability]
**This matters for the vision because** [why this threatens the long-term destination if wrong]
**MVP tests this by** [what the MVP includes/measures to test this]
**We'll know we're right when** [specific, measurable signal]
**We'll know we're wrong when** [specific, measurable counter-signal]

### 3. Usability Hypothesis
**We believe** [specific assumption about user capability]
**This matters for the vision because** [why this threatens the long-term destination if wrong]
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
- **Design Specification** — how the product works
- **Visual Specification** — how it looks
- **Content Specification** — what it says
- **Tech Stack Decision** — what we build with
- **Architecture Blueprint** — how we build it
```

## Iteration Awareness

Check if `docs/product-definition/3-mvp-brief.md` already exists.

**If it exists** — this is a refinement iteration:
- Read the existing document first
- Read the user instruction carefully — it likely contains feedback
  on specific aspects (segment choice, pricing, scope)
- Refine and improve — don't start from scratch
- Preserve what works, update what needs to change
- Add a `## Revision Notes` section at the end noting what changed and why

**If it doesn't exist** — create it fresh from the vision, strategy, and
chosen bet.

## Quality Standards

- **The Bets section must be compelling in isolation.** If someone reads
  only that section, they should understand what this MVP tests, how the
  bets relate, and what distinguishes them.
- **Vision Alignment must be substantive.** Not "this aligns with the vision"
  but specifically how this MVP proves something that matters for the
  long-term destination.
- **Every capability in scope must pass the MVP Scope Test.** No exceptions,
  no "nice to haves" that snuck in.
- **Hypotheses must be falsifiable and vision-connected.** "Users will like it"
  is not falsifiable. "Solo founders will complete a product brief within
  30 minutes without asking for help" is falsifiable. Each hypothesis must
  state why it matters for the vision, not just for this MVP.
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
| **Undifferentiated bets** | "We'll target A or B depending on..." | Design parallel tests with clean signal separation. Each bet needs its own success/failure criteria. |
| **Missing falsification** | "We'll know when users engage" | Define "engage" — frequency, depth, retention |
| **Optimistic unit economics** | Ignores compute costs or support | Include real cost estimates, not just revenue |
| **Generic risks** | "Competition" | "8090 launches self-service at $99/mo before we ship" |
| **No reachability plan** | "The market is large" | How do you reach person #1? |
| **Scope creep in "Expansion Path"** | Turns into a roadmap | One logical next move, not a feature backlog |
| **Restating the vision** | Copies paragraphs from vision/strategy | Reference those documents, add new specificity |
| **Disconnected hypotheses** | Hypotheses don't trace to vision | Each hypothesis must say why it matters for the destination |

## What Happens Next

The MVP Brief is the last strategic document. All subsequent documents build
on it to define how to execute:
- **Design Specification** uses it to define user flows and interactions
- **Visual Specification** uses it to define how the product looks
- **Content Specification** uses it to define voice and messaging
- **Tech Stack Decision** uses it to evaluate technology options
- **Architecture Blueprint** uses it to define the domain model and technical approach

The brief references the Vision and Strategy — it does not replace them.
If the brief reveals tensions with the strategy, surface them explicitly
rather than silently diverging.
