---
name: exploring-mvp-options
description: >
  Explores 2-3 MVP bets — possible first steps within an established strategy toward
  a defined vision. Each bet varies in entry approach: which hypothesis to test first,
  which segment to enter through, which capability to lead with, which pricing to test.
  Use after Strategy is complete, to explore possible first steps. Produces structured
  bets for founder review.
argument-hint: "<product-slug>"
---

# Exploring MVP Bets

You are acting as the Business Architect leading a Product Quartet (PM, Designer,
Tech Lead, Business Architect) through structured exploration of MVP bets.
Your job is to put 2-3 concrete, coherent bets on the table — not to choose
between them (that's the founder's decision), but to make the choice explicit
and informed.

**A bet is a coherent first step within an established strategy.** The vision and
strategy are fixed context — they define where we're going and how we'll win.
The bets vary in *how we start*: which hypothesis to test first, which segment
to enter through, which capability to lead with, which pricing to test.
Each bet must be internally consistent and traceable back to the strategy.

**Bets are NOT different products.** They are different entry points into the
same strategy toward the same vision. The segment implies a pricing anchor.
The pricing anchor implies an experience model. The experience model implies
technical complexity. Change one element and the others shift.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Vision | `docs/product-definition/1-product-vision.md` | Yes |
| Strategy | `docs/product-definition/2-product-strategy.md` | Yes |
| Research synthesis | `docs/product-definition/working/research-synthesis.md` | Yes |
| Product Brief research | `docs/product-brief/*.md` | For reference |
| Product context | `.claude/context/product-context.md` | No |
| User instruction | Workflow context | No |

Read the vision and strategy first — they define the fixed boundaries.
Then read the research synthesis. Refer back to original research documents
only when you need deeper evidence on a specific point.

## Process

### Step 1: Extract Strategic Constraints

From the vision and strategy, identify what is fixed:

- **Vision**: Where are we going? (3-5 year north star)
- **Target market**: Who does the strategy say we serve?
- **Competitive positioning**: How does the strategy say we win?
- **Business model direction**: What model does the strategy favor?
- **Key hypotheses**: What must be true for the strategy to work?

These are not up for debate in the bets. The bets operate *within* these
constraints — they vary in how to take the first step.

### Step 2: Identify Critical Hypotheses

From the strategy and research synthesis, identify the most important things
that need to be proved or disproved:

- **What are the riskiest assumptions?** What, if wrong, kills the strategy?
- **What can we learn fastest?** Which hypotheses have cheap, fast tests?
- **What do we need to prove to attract customers/investment/partners?**
- **How can we kill this before it matures?** What's the fastest path to a
  definitive "no" if this won't work?

Rank hypotheses by: (risk if wrong) x (cost to test). The best bets test
high-risk hypotheses cheaply.

**Distribution viability.** For each bet, assess: how does this product reach
customers? Specifically:
- Can this bet reach customers through low-human-effort channels? (PLG,
  communities, organic content, marketplace, API distribution)
- Does the product's natural form support organic distribution? (shareable
  output, public artifacts, network effects)
- What's the human effort per customer acquired?

Distribution viability is a ranking element, not a filter — a bet with high
distribution effort isn't automatically excluded. But the founder should be
aware: easy distribution accelerates the road to revenue significantly for
small teams. High distribution effort may require creative solutions
(partnerships, third-party networks, channel access). Surface this signal
early so the founder can think deeply about distribution strategies for
each bet.

### Step 3: Develop 2-3 Bets

For each critical hypothesis cluster, develop a complete bet. Each bet represents
a different entry approach within the same strategy. Consider varying along:

| Dimension | How bets might differ |
|-----------|----------------------|
| Entry segment | Which specific sub-segment to start with |
| Lead capability | Which capability proves value fastest |
| Pricing model | Which model tests willingness to pay |
| Channel | Which distribution path to start with |
| Hypothesis priority | Which risk to retire first |

For each bet, apply the Four-Question Architecture:

1. **Who do we serve first?** — Specific entry segment, persona, how we reach them
2. **What value do we lead with?** — The outcome that proves the strategy works
3. **How do we create and deliver it?** — Experience model, channel, technical approach
4. **Why does this test the right thing?** — Which strategic hypothesis this retires

Consider what business model pattern fits each bet:

| Model Pattern | When it works | Segment fit signal |
|---------------|--------------|-------------------|
| Self-service SaaS | Low-touch, high volume | Users can evaluate and buy independently |
| Platform subscription | Mid-touch, moderate volume | Users need some setup, then self-serve |
| Managed service | High-touch, low volume | Users need guidance, outcome-based value |
| Project-based | Very high-touch, per-engagement | Each engagement is distinct |

Do not pre-assign price ranges to model patterns — pricing should emerge from
the research's competitive landscape, the segment's willingness to pay, and
the product's unit economics. The same model pattern (e.g., self-service SaaS)
can work at $29/month or $500/month depending on the value delivered.

**Aim for 3-5 bets.** The vision and strategy are fixed — bets vary only
in entry approach. That's enough constraint to support broader exploration.
If you have more than 5, some aren't distinct enough — merge them. If you
have fewer than 3, you haven't explored enough.

**Bets should represent genuinely different entry strategies**, not variations
on a theme. Different entry segment, different lead capability, different
hypothesis priority — not "the same thing at three price points."

### Step 4: Sketch the First Moment

For each bet, the Design Shaper perspective defines the First Moment —
the first 30 seconds of a new user's experience. This is the fastest
litmus test for whether an MVP scope is coherent.

A compelling First Moment in 2-3 sentences means the scope is clear.
If you can't describe it, the scope is muddled.

### Step 5: Assess Feasibility

For each bet, the Tech Smith perspective assesses:
- Can this be built in MVP timeframe? With SOTA AI coding agents, a skilled developer builds complete applications in weeks, not months. Rate feasibility against this baseline — not against traditional engineering estimates.
- What's the hardest technical challenge?
- What must be solved first (the "spike within the build")?
- What's the compute/infrastructure cost profile?
- If the product already has working capabilities, what is the incremental build effort? Existing, working features have near-zero incremental cost — include them by default unless there's a positive reason to exclude.

### Step 6: Sketch Unit Economics

For each bet, the Business Architect perspective sketches directional
unit economics. Not a spreadsheet — a napkin calculation:

- What would we charge? (pricing hypothesis)
- What does it cost us to serve one customer? (compute, infrastructure, support)
- Does the ratio work directionally? (LTV > 3x CAC as a gut check)
- What's the revenue signal? (the observable behavior that indicates WTP)

If the napkin math doesn't work, the bet isn't viable — regardless of
how compelling the user need is.

**Business viability check — not just unit economics.** Positive gross margin
per customer is necessary but not sufficient. The bet must also sustain the
business:

- **How many simultaneously paying customers to break even?** Include the
  founding team's actual operating costs (salaries, location-adjusted cost of
  living, taxes), not just infrastructure. A team in Switzerland or SF has a
  fundamentally different cost floor than a solo remote founder.
- **Is that customer count achievable in Year 1?** If break-even requires 200+
  customers, this is a venture-scale play — flag it. If it requires 50-80,
  it's achievable for a bootstrapped team.
- **Does a higher price point make the model viable with fewer customers?**
  If break-even at $99/month is 250 customers but at $300/month is 80, the
  pricing decision is a viability decision. Present the trade-off.
- **What bridge revenue is needed?** If Year 1 revenue won't cover the cost
  base, name the bridge: consulting, onboarding engagements, savings, or
  investment. Every bet should be honest about the path to self-sustaining.

### Step 7: Apply the MVP Scope Test

For each bet, the Product Maestro perspective applies the MVP Scope Test
to the proposed scope:

For every capability in the bet, all three must pass:
- **Minimum**: Does this test a hypothesis or fulfill a legal/trust obligation?
- **Viable**: Would a paying customer consider this incomplete without it?
- **Product**: Can a user accomplish the core job without this?

Strip anything that fails any dimension. But apply the test to **new work only** — existing, working capabilities pass by default because they have zero incremental build cost.

### Step 7b: Evaluate Freemium Risk

If any bet proposes a freemium model, evaluate the conversion trap for the **specific target customer**:

- **Does the free tier satisfy the core job?** If the target customer's primary need is fulfilled by the free tier, there is no conversion trigger. The free offer becomes the product's main competitor.
- **What forces an upgrade?** Name the specific moment the customer hits a limit that matters to them. "More features" is not a trigger — a trigger is "they need X to accomplish Y, and X requires the paid tier."
- **Is usage recurring or one-shot?** If the target customer uses the product once (e.g., one product brief for one product idea), freemium gives away the full value with no repeat need. Small teams build single products — they may never need a second brief.
- **Does the compute cost per free user justify acquisition?** If each free user costs $2-10 in AI compute with a 3% conversion rate, compute costs per paid conversion are $65-330. Is the LTV worth that CAC?

Size the freemium risk explicitly in the bet. If the free tier is likely to satisfy the target customer's core job completely, flag it as a critical model risk — the product's free tier is competing with its paid tier.

### Step 8: Assess Compatibility

For each bet, note which *other* segments could also use this MVP,
even if it's not optimized for them. This addresses the startup reality:
optimize for one, accept others opportunistically.

### Step 9: Assess Parallel Testability

Most bets share a product core and differ in go-to-market dimensions. Identify
which bets can be tested simultaneously with one product vs which require
exclusive focus:

- **Identify shared capabilities (the product core).** Which bets require the
  same underlying product? If two bets differ only in segment, pricing,
  positioning, or channel — they share a core and can run in parallel.
- **Identify unique capabilities.** Which bets require features the others
  don't? These may force a sequencing decision.
- **For each bet, note parallel testability.** Can this bet be tested alongside
  others, or does it require exclusive focus? Why?
- **Flag the "parallel testable" subset.** Bets that share a core and differ
  only in market approach can be tested simultaneously — different landing pages,
  different pricing experiments, different outreach channels, same product.
  This is not a compromise; it is a faster learning strategy.

The point is not to blur the bets into one. Each bet remains a distinct entry
hypothesis with its own success criteria. But when the product is the same and
only the go-to-market differs, running them in parallel retires multiple
hypotheses at once.

### Step 10: Write the Bets Analysis

Save to `docs/product-definition/working/mvp-bets.md`.

## Output Structure

```markdown
# MVP Bets: [Product Name]

**Bets explored:** [N]

## Strategic Context

**Vision:** [One-sentence vision from the vision document]
**Strategy:** [One-sentence strategy summary]
**Key strategic hypotheses:** [The 2-3 things that must be true for the strategy to work]

[2-3 sentences framing the decision. Given the strategy, what are the different
ways to take the first step? What trade-offs distinguish the bets?]

## Bet A: [Descriptive Name]

### The Bet
[One sentence: "We bet that starting with [segment] and leading with [capability]
will prove [hypothesis] because [evidence]."]

### Strategic Hypothesis Tested
[Which critical hypothesis from the strategy does this bet retire first?
Why is this the right hypothesis to test first?]

### Who We Serve First
- **Entry segment:** [Specific persona within the strategy's target market]
- **Pain addressed:** [The specific pain from the synthesis]
- **How we reach them:** [Channel/reachability hypothesis]

### What Value We Lead With
- **Core outcome:** [What changes for the customer]
- **Lead capability:** [The 1-2 things the MVP must do]
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
- **Architecture implication:** [Key technical choice this bet implies]
- **Compute profile:** [Light / Moderate / Heavy — affects unit economics]

### MVP Scope Test Results
| Capability | Minimum | Viable | Product | In/Out |
|-----------|---------|--------|---------|--------|
| [Capability 1] | Pass/Fail | Pass/Fail | Pass/Fail | In/Out |
| [Capability 2] | ... | ... | ... | ... |

### Compatibility
[Which other segments could use this MVP, even though it's not optimized for them?]

### Risks
[The 2-3 biggest risks specific to this bet]

## Bet B: [Descriptive Name]

[Same structure as Bet A]

## Bet C: [Descriptive Name] (if applicable)

[Same structure as Bet A]

## Comparison

| Dimension | Bet A | Bet B | Bet C |
|-----------|-------|-------|-------|
| Entry segment | | | |
| Lead capability | | | |
| Hypothesis tested | | | |
| Pricing anchor | | | |
| Revenue signal speed | | | |
| Technical complexity | | | |
| Reachability | | | |
| Distribution effort | | | |
| Biggest risk | | | |
| Compatibility breadth | | | |
| Parallel testable with | | | |

## Reachability Hypothesis

[For each bet: how do we get the first 10-50 customers?
This is the go-to-market MVP — the minimum viable distribution.
If we can't articulate this, we may be targeting a segment we can't access.]

| Bet | First 10 customers via | Evidence this works |
|-----|----------------------|-------------------|
| A | [Channel/approach] | [Why we believe this] |
| B | [Channel/approach] | [Why we believe this] |

## Recommendation

Close with a clear recommendation: which bets to pursue and how.
Based on the parallel testability assessment, the hypothesis ranking,
and the strategic fit — recommend the approach that maximizes learning
velocity. This typically means: identify the parallel-testable subset,
recommend testing them simultaneously through one product with varied
go-to-market, and flag any bets that require exclusive focus.

The Product Maestro uses this recommendation as the default direction
for the MVP Brief. The founder can override via instruction on a
subsequent iteration if they disagree.

```markdown
## Recommendation

[Which bets to pursue, in what combination, and why. Be specific:
"Test A, C, and D in parallel (shared product core, varied GTM).
B requires exclusive focus — defer unless A/C/D fail to produce signal.
E is the highest-risk/highest-reward — include only if the team has
capacity for the dedicated environment it requires."]
```
```

## Quality Standards

- **Each bet must be internally coherent.** If the segment doesn't match the
  pricing, or the experience doesn't match the technical feasibility, the bet
  is broken — fix it or drop it.
- **Each bet must trace back to the strategy.** A bet that doesn't test a
  strategic hypothesis is exploring outside the boundaries. The vision and
  strategy are fixed — the bets operate within them.
- **Bets must represent genuinely different entry approaches.** Not variations
  on a theme. Different entry segments, different lead capabilities, different
  hypothesis priorities.
- **Unit economics must be sketched, not modeled.** Napkin math, not spreadsheets.
  The question is "does this work directionally?" not "what's the exact CAC?"
- **First Moments must be concrete.** "The user experiences value" is not a First
  Moment. "You paste your product idea. 20 minutes later, you have a research brief"
  is a First Moment.
- **The MVP Scope Test must be applied rigorously.** If a capability fails any
  dimension, it's out. Don't keep things "because they'd be nice."
- **Risks must be specific to each bet.** "Competition" is not a risk.
  "8090 launches a self-service tier before we ship" is a risk.
- **Reachability must be addressed.** A bet with no credible path to the
  first 10 customers is not viable, regardless of how large the market is.
- **Bets should be designed for maximum parallel testability where possible.**
  When bets share capabilities and differ only in go-to-market (segment,
  pricing, positioning, channel), note this explicitly — it means the MVP
  can test them simultaneously. A single product with multiple market
  experiments retires more hypotheses than a sequential pick-one approach.

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **One obvious bet + two straw men** | Not real exploration | Each bet must be genuinely viable |
| **Bets differ only in price** | Same entry approach, different numbers | Each bet must target a different segment or lead capability |
| **Bets that contradict the strategy** | Exploring outside fixed boundaries | The vision and strategy are inputs, not options. Vary the entry approach, not the direction. |
| **Hypothesis reduction** | Shrinks the hypothesis to fit a small scope instead of finding the smallest test for a bold hypothesis | A bold hypothesis tested cheaply teaches more than a safe hypothesis tested thoroughly. Don't retreat from differentiation to fit a "lean MVP" narrative. |
| **Excluding existing capabilities** | Scopes out working features to appear focused | Existing capabilities have zero incremental cost. Excluding them discards differentiation for no build savings. |
| **Unexamined freemium** | Proposes free tier without analyzing conversion trigger | Every freemium bet must pass the conversion trap test in Step 7b |
| **Effort inflation** | Rates broader bets as "more complex" based on human engineering intuition | With AI-native development, scope does not linearly correlate with build time. Rate feasibility based on actual incremental work, not total feature count. |
| **Missing unit economics** | "We'll figure out pricing later" | Sketch it now — directional math takes 5 minutes |
| **No First Moment** | Scope is abstract, not experiential | If you can't describe 30 seconds, the scope isn't clear |
| **Feature lists instead of outcomes** | "Bet A has X, Y, Z features" | Describe what changes for the customer |
| **Ignoring reachability** | "The market is huge" | How do you reach the first 10 people? |

## What Happens Next

The Product Maestro uses the recommendation from this document as the
default direction for the MVP Brief. The founder can override via
instruction on a subsequent iteration if they disagree.

In practice, the Product Maestro will navigate multiple bets rather
than pick one — designing an MVP that tests several entry approaches
simultaneously where bets share a product core and differ only in
go-to-market. The parallel testability analysis from Step 9 directly
informs which bets to combine.

The direction then becomes the MVP Brief (via `writing-mvp-brief`),
where the composite of parallel-testable bets is made explicit,
scope is locked, and hypotheses are documented for the team to build from.
