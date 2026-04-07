---
name: creating-product-strategy
description: >
  Creates the product strategy document — how we win. Defines target market,
  competitive positioning, go-to-market, business model, roadmap, risks, and
  success metrics. Strategy is the offensive plan: know yourself, know your
  competition, determine how to win. Reads the Vision and Research Synthesis
  as primary inputs. Use after the Vision is complete, before MVP scoping.
argument-hint: "<product-slug>"
---

# Creating Product Strategy

You are acting as the Product Maestro with the Business Architect creating
a product strategy document. Strategy answers one question: **"How do we
win?"** — the competitive approach, market positioning, and business model
that achieve the vision.

**Strategy is OFFENSIVE, not defensive.** Competition is opportunity for
positioning. Know yourself, know your competition, determine how to win.
The attack is the best defense. Position AGAINST competitors, not retreating
from them.

**Strategy is NOT vision.** Vision answers "Where are we going?"
(aspirational end state). Strategy answers "How do we win on the way there?"

**Strategy is NOT the MVP Brief.** The MVP Brief is DOWNSTREAM of strategy.
Strategy defines the competitive approach, and the MVP tests the most
critical part of that approach. Strategy determines what the first step
should be, not the other way around.

**Strategy is NOT a project plan.** Strategy defines approach and priorities,
not detailed timelines and task assignments.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Vision | `docs/product-definition/1-product-vision.md` | Yes |
| Research Synthesis | `docs/product-definition/working/research-synthesis.md` | Yes |
| Competitive Landscape | `docs/product-brief/3-competitive-landscape.md` | Yes |
| Product Intelligence | `docs/product-brief/4-product-intelligence.md` | Yes |
| Product context | `.claude/context/product-context.md` | No |
| User instruction | Workflow context | No |

The Vision is the primary input for direction — the Strategy's job is to
chart the winning path toward the Vision.

The Research Synthesis provides the analytical foundation — distilled
insights about the problem space, users, competition, and opportunities.

The Competitive Landscape and Product Intelligence provide the raw
competitive data — who's out there, what they do, how they position,
and what reference products teach us about what works.

## Process

### Step 1: Read the Vision and Research

Read all input documents. Extract:
- **From the Vision:** Aspirational end state, differentiators, principles,
  product personality
- **From the Research Synthesis:** Key tensions, decision-relevant insights,
  differentiation vectors, user needs
- **From the Competitive Landscape:** Competitor positions, gaps in the
  market, competitive dynamics
- **From the Product Intelligence:** Reference product patterns, what works,
  what doesn't, lessons learned

The Strategy synthesizes all of this into a coherent plan for winning.

### Step 2: Develop the Target Market

Define a staged market approach:
- **Beachhead (Year 1):** The specific segment to dominate first
- **Expansion (Years 2-3):** Adjacent segments that follow naturally

A good beachhead market is:
- Has the problem acutely (urgent pain)
- Is reachable (you know how to find them)
- Is small enough to dominate
- Can expand from (adjacent segments exist)

### Step 3: Define Competitive Strategy

This is the heart of the strategy. Competition is opportunity for
positioning. Use the competitive landscape to define:
- **Positioning:** One sentence — "We are the X for Y that Z"
- **vs. each key competitor:** Their positioning, our counter-positioning,
  when we win, how we take their customers
- **Our moat:** Defensible advantages (from the Vision's differentiators)
- **What we don't compete on:** Explicitly cede ground — but strategically,
  not defensively. Ceding ground in one area concentrates force in another.

### Step 4: Define Go-to-Market

Develop a staged GTM plan:
- **Stage 1:** First customers — how to reach and convert them
- **Stage 2:** Growth — how the motion scales
- **Stage 3:** Expansion — entering new segments

Each stage needs: target, channel, pricing, and success metrics.

**Distribution as strategic advantage.** For small teams, distribution IS the
bottleneck — not building, not product quality. Evaluate distribution channels
not just as tactics but as strategic assets: does the product distribute itself
(shareable output, PLG, network effects) or does it require human salespeople?
Low-human-effort distribution is a structural advantage that should be actively
designed for, not discovered after launch. If distribution requires high human
effort, the strategy should explicitly address how to overcome this —
partnerships, channel access, platform distribution — rather than deferring it
to "go-to-market execution."

### Step 5: Develop the Business Model

Define the full business model:
- **Pricing architecture:** Tiers, metrics, expansion paths
- **Unit economics targets:** CAC, LTV, LTV:CAC ratio, gross margin, payback
- **Revenue projections:** Year 1-3 directional (not precise forecasts)

### Step 6: Architecture Implications

The business model must be detailed enough that the Architecture Blueprint
can make informed decisions about:
- Multi-tenancy model (per-user, per-org, per-deployment)
- Authorization complexity (tiers, feature gating)
- Metering/instrumentation (usage tracking, billing events)
- Infrastructure requirements (compute budget per customer)

### Step 7: Write the Roadmap

Use Now/Next/Later horizons. The roadmap is outcome-focused, not feature-focused:
- **Now (0-3 months):** High confidence, specific outcomes
- **Next (3-9 months):** Medium confidence, directional
- **Later (9+ months):** Toward the Vision — low confidence, thematic

The Now section should end with clear direction for what the MVP needs
to test — strategy determines MVP scope, not the other way around.

### Step 8: Assess Risks and Define Metrics

Risks come from the research synthesis and competitive analysis.
The Strategy adds strategic and market risks.

Success metrics must be phase-specific and include pivot triggers —
conditions that would cause the team to reconsider the strategy.

### Step 9: Write the Strategy

Save to `docs/product-definition/2-product-strategy.md`.

## Output Structure

```markdown
# Product Strategy: [Product Name]

## Target Market

### Beachhead (Year 1)
- **Segment:** [Specific description — not "businesses" but "solo founders
  building their first SaaS product"]
- **Size:** [Estimated addressable customers]
- **Why them first:** [Acute pain + reachability + evidence]

### Expansion (Years 2-3)
- [Adjacent segment 1] — [Why and when]
- [Adjacent segment 2] — [Why and when]

## Competitive Strategy

### Positioning
[One sentence: We are the X for Y that Z]

### vs [Primary Competitor]
- **They:** [Their positioning and strength]
- **We:** [Our counter-positioning]
- **We win when:** [Scenario where we're the better choice]
- **How we take their customers:** [Specific approach]

### vs [Secondary Competitor]
[Same structure]

### Our Moat
1. [Defensible advantage — connected to Vision's differentiators]
2. [Defensible advantage]

### What We Don't Compete On
[Explicitly cede ground — where competitors are stronger and that's a
strategic choice, not a retreat. Ceding here concentrates force elsewhere.]

## Go-to-Market Strategy

### Motion
[Product-led / Sales-led / Hybrid — and why this motion for this segment]

### Stage 1: First Customers (Months 1-3)
- **Target:** [Specific persona]
- **Channel:** [How to reach them — specific, not "social media"]
- **Offer:** [What they get, at what price, with what commitment]
- **Success metric:** [What indicates this is working]

### Stage 2: Growth (Months 3-9)
- **Target:** [Same or expanded persona]
- **Channel:** [How the initial channel scales or new channels]
- **Pricing evolution:** [Any changes from Stage 1]
- **Success metric:** [Growth indicator]

### Stage 3: Expansion (Months 9+)
- **New segments:** [Adjacent segments from Target Market]
- **New channels:** [Enterprise sales, partnerships, etc.]
- **Success metric:** [Expansion indicator]

## Business Model

### Pricing Architecture
| Tier | Price | Target | What's Included |
|------|-------|--------|----------------|
| [Tier 1] | [Price/frequency] | [Who] | [Capabilities] |
| [Tier 2] | [Price/frequency] | [Who] | [Capabilities] |

**Pricing metric:** [What scales with value — seats, usage, projects]
**Expansion path:** [How customers naturally pay more as they get more value]

### Unit Economics (Targets)
| Metric | Target | Basis |
|--------|--------|-------|
| CAC | [Amount] | [Acquisition approach] |
| LTV | [Amount] | [Retention × ARPU] |
| LTV:CAC | [Ratio — target >3:1] | [Calculation] |
| Gross Margin | [%] | [Revenue - delivery costs] |
| Payback Period | [Months] | [Time to recover CAC] |

### Revenue Projections (Directional)
| Year | Customers | ARR | Key Driver |
|------|-----------|-----|-----------|
| 1 | [N] | [Amount] | [What drives this] |
| 2 | [N] | [Amount] | [What drives this] |
| 3 | [N] | [Amount] | [What drives this] |

**Assumptions stated:** [What must be true for these projections]

### Architecture Implications
[Explicit notes for the Architecture Blueprint:]
- Multi-tenancy model: [per-user / per-org / per-deployment]
- Feature gating: [How tiers affect access]
- Metering needs: [What usage to track for billing/limits]
- Compute budget: [Rough cost per customer per month]

## Roadmap

### Now (0-3 Months)
**Outcome:** [What customers can do when this is complete]

**Commitments:**
- [Deliverable 1]
- [Deliverable 2]

**Success criteria:**
- [Measurable outcome]

### Next (3-9 Months)
**Outcome:** [Target outcome for this horizon]

**Direction:**
- [Capability/outcome 1] — [Why valuable]
- [Capability/outcome 2] — [Why valuable]

**Dependencies:**
- [What must be true from Now]

### Later (9+ Months)
**Outcome:** [Long-term outcome — connected to Vision]

**Strategic direction:**
- [Theme 1]
- [Theme 2]

**Major uncertainties:**
- [What could change this]

### MVP Direction
[What the strategy demands the MVP test first. This section provides
clear direction for the MVP Bets exploration that follows.]

## Risk Assessment

### Critical Risks
| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| [Specific risk] | High/Med/Low | High/Med/Low | [How we address it] |

### Strategic Risks
[Risks to the overall approach — market shifts, competitive moves]

### Execution Risks
[Risks in delivery — technical challenges, resource constraints]

## Success Metrics

### Phase 1: MVP (Months 1-3)
- [Metric 1]: [Target]
- [Metric 2]: [Target]

### Phase 2: Growth (Months 3-9)
- [Metric 1]: [Target]
- [Metric 2]: [Target]

### Pivot Triggers
Re-evaluate strategy if:
- [Condition 1 — specific and measurable]
- [Condition 2 — specific and measurable]
```

## Alignment Check

Before finalizing, verify alignment with upstream documents:

- [ ] Target market beachhead is grounded in research synthesis insights
- [ ] Competitive positioning leverages the Vision's differentiators
- [ ] Competitive strategy uses actual competitor data from the landscape analysis
- [ ] Business model is informed by product intelligence patterns
- [ ] Roadmap connects to the Vision's aspirational end state
- [ ] Success metrics are phase-specific with measurable pivot triggers
- [ ] Business model's architecture implications are specific enough for the architect
- [ ] MVP Direction section provides clear guidance for downstream MVP scoping

If the strategy reveals tensions with the Vision, make your best judgment
and proceed. Note significant assumptions inline. The human reviews the full
package and the final review step catches cross-document inconsistencies.

## Iteration Awareness

Check if `docs/product-definition/2-product-strategy.md` already exists.

**If it exists** — this is a refinement iteration:
- Read the existing document first
- Read the user instruction carefully — it likely contains feedback
- Refine and improve — don't start from scratch
- Preserve what works, update what needs to change
- Add a `## Revision Notes` section at the end noting what changed and why

**If it doesn't exist** — create it fresh from the Vision and research inputs.

## Quality Checklist

### Content
- [ ] Target market is specific and reachable
- [ ] Competitive positioning is offensive — positions against competitors
- [ ] Go-to-market motion is clear and staged
- [ ] Business model math works directionally (LTV > 3x CAC)
- [ ] Roadmap uses outcomes, not feature lists
- [ ] Risks are honest with credible mitigations
- [ ] Pivot triggers are specific and measurable
- [ ] Architecture implications are explicit
- [ ] MVP Direction gives clear guidance for downstream scoping

### Structure
- [ ] All core sections present
- [ ] Clear separation from vision content
- [ ] Target length: 200-500 lines

### Alignment
- [ ] Strategy supports the vision
- [ ] Competitive strategy uses real competitor data
- [ ] Research synthesis insights are reflected in market and positioning choices
- [ ] MVP direction flows logically from the strategy

### Red Flags (Fix Before Finalizing)
- [ ] No "we'll figure it out later" in critical areas
- [ ] No unrealistic projections without stated assumptions
- [ ] No competitor dismissal without honest assessment
- [ ] No roadmap items without outcome connection
- [ ] No defensive framing — strategy should be offensive throughout

## Anti-Patterns

| Anti-Pattern | Description | Fix |
|--------------|-------------|-----|
| **Boil the Ocean Market** | "Our market is everyone" | Narrow to specific beachhead |
| **Feature Roadmap** | Lists features, not outcomes | Rewrite as outcomes with deliverables |
| **Competitor Dismissal** | "We're better at everything" | Honest assessment, cede some ground strategically |
| **Hockey Stick Projections** | Unrealistic growth without basis | Ground in assumptions, show math |
| **Risk Blindness** | No risks listed or all "low" | Honest assessment, real mitigations |
| **Strategy by Buzzword** | "AI-first", "Platform play" | Concrete approach with specifics |
| **Vision Confusion** | Mixes vision and strategy content | Keep them separate — reference, don't duplicate |
| **Defensive Posture** | Avoiding competition, finding niches to hide in | Offensive positioning — attack, don't retreat |
| **MVP Tail Wags Dog** | Strategy shaped to justify a pre-chosen MVP | Strategy comes first — MVP tests the strategy |

## What Happens Next

The strategy feeds into:
- **MVP Bets** — exploring possible first steps within the strategy. The
  strategy's MVP Direction section frames what options to explore.
- **Design Specification** — GTM and segment inform experience design, onboarding
- **Content Specification** — positioning and value prop inform messaging and copy
- **Architecture Blueprint** — business model implications inform technical decisions
  (multi-tenancy, feature gating, metering, compute budget)
