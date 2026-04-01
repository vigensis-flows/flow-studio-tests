---
name: creating-product-strategy
description: >
  Creates the product strategy document — how we win. Defines target market,
  go-to-market, competitive positioning, business model, roadmap, risks, and
  success metrics. Expands the MVP Brief's business model hypothesis into a
  full strategy. Reads the MVP Brief and Vision as primary inputs.
  Use after the Vision is complete.
argument-hint: "<product-slug>"
---

# Creating Product Strategy

You are acting as the Product Maestro with the Business Architect creating
a product strategy document. Strategy answers one question: **"How do we
get there?"** — the path, decisions, and trade-offs to achieve the vision.

**Strategy is NOT vision.** Vision answers "Where are we going?"
(aspirational end state). Strategy answers "How do we win on the way there?"

**Strategy is NOT the MVP Brief.** The MVP Brief defines the first bet
with a business model hypothesis. Strategy develops that hypothesis into
a full plan — target market stages, GTM motion, competitive positioning,
pricing architecture, and success metrics.

**Strategy is NOT a project plan.** Strategy defines approach and priorities,
not detailed timelines and task assignments.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| MVP Brief | `docs/product-definition/1-mvp-brief.md` | Yes |
| Vision | `docs/product-definition/2-product-vision.md` | Yes |
| Product Brief research | `docs/product-brief/*.md` | For reference |
| User instruction | Workflow context | No |

The MVP Brief is the primary input for business model details — it contains
the pricing hypothesis, unit economics sketch, segment choice, and
reachability plan. The Strategy expands all of these.

The Vision is the primary input for direction — the Strategy's job is to
chart the path toward the Vision.

## Process

### Step 1: Read the MVP Brief and Vision

Read both documents. Extract:
- **From the MVP Brief:** Primary segment, pricing hypothesis, unit economics
  sketch, revenue signal, reachability plan, expansion path, hypotheses
- **From the Vision:** Aspirational end state, differentiators, principles,
  product personality

The Strategy connects these: the MVP Brief's bet is Stage 1 of a plan
that leads toward the Vision.

### Step 2: Develop the Target Market

The MVP Brief picked a primary segment. The Strategy expands this into
a staged market approach:
- **Beachhead (Year 1):** The MVP Brief's primary segment, with more specificity
- **Expansion (Years 2-3):** Adjacent segments from the MVP Brief's compatibility
  assessment and the Vision's long-term direction

A good beachhead market is:
- Has the problem acutely (urgent pain)
- Is reachable (you know how to find them)
- Is small enough to dominate
- Can expand from (adjacent segments exist)

### Step 3: Define Go-to-Market

The MVP Brief has a reachability hypothesis ("how we reach the first 50").
The Strategy develops this into a staged GTM plan:
- **Stage 1:** First customers — expand the Brief's reachability plan
- **Stage 2:** Growth — how the motion scales
- **Stage 3:** Expansion — entering new segments

Each stage needs: target, channel, pricing, and success metrics.

### Step 4: Define Competitive Strategy

Use the competitive reality from the research synthesis. Define:
- **Positioning:** One sentence — "We are the X for Y that Z"
- **vs. each key competitor:** Their positioning, our counter-positioning,
  when we win
- **Our moat:** Defensible advantages (from the Vision's differentiators)
- **What we don't compete on:** Explicitly cede ground

### Step 5: Develop the Business Model

The MVP Brief has a pricing hypothesis and unit economics sketch.
The Strategy develops these into a full business model:
- **Pricing architecture:** Tiers, metrics, expansion paths
- **Unit economics targets:** CAC, LTV, LTV:CAC ratio, gross margin, payback
- **Revenue projections:** Year 1-3 directional (not precise forecasts)

The business model must be detailed enough that the Architecture Blueprint
can make informed decisions about:
- Multi-tenancy model (per-user, per-org, per-deployment)
- Authorization complexity (tiers, feature gating)
- Metering/instrumentation (usage tracking, billing events)
- Infrastructure requirements (compute budget per customer)

### Step 6: Write the Roadmap

Use Now/Next/Later horizons. The roadmap is outcome-focused, not feature-focused:
- **Now (0-3 months):** The MVP from the Brief — high confidence, specific outcomes
- **Next (3-9 months):** Post-MVP direction — medium confidence, directional
- **Later (9+ months):** Toward the Vision — low confidence, thematic

The Now section should align precisely with the MVP Brief's scope.
If they diverge, the Brief is the source of truth for scope.

### Step 7: Assess Risks and Define Metrics

Risks come from the MVP Brief's risk section and the research synthesis.
The Strategy adds strategic and market risks.

Success metrics must be phase-specific and include pivot triggers —
conditions that would cause the team to reconsider the strategy.

### Step 8: Write the Strategy

Save to `docs/product-definition/3-product-strategy.md`.

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

## Competitive Strategy

### Positioning
[One sentence: We are the X for Y that Z]

### vs [Primary Competitor]
- **They:** [Their positioning and strength]
- **We:** [Our counter-positioning]
- **We win when:** [Scenario where we're the better choice]

### vs [Secondary Competitor]
[Same structure]

### Our Moat
1. [Defensible advantage — connected to Vision's differentiators]
2. [Defensible advantage]

### What We Don't Compete On
[Explicitly cede ground — where competitors are stronger and that's fine]

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
- [Deliverable 1 — aligned with MVP Brief scope]
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

- [ ] Target market's beachhead matches the MVP Brief's primary segment
- [ ] Pricing architecture develops (not contradicts) the Brief's pricing hypothesis
- [ ] Roadmap Now section aligns with the MVP Brief's scope
- [ ] Competitive positioning leverages the Vision's differentiators
- [ ] Success metrics connect to the MVP Brief's hypotheses and revenue signal
- [ ] GTM Stage 1 expands the Brief's reachability plan
- [ ] Business model's architecture implications are specific enough for the architect

If the strategy contradicts the MVP Brief or Vision, make your best judgment
and proceed. Note significant assumptions inline. The human reviews the full
package and the final review step catches cross-document inconsistencies.

## Iteration Awareness

Check if `docs/product-definition/3-product-strategy.md` already exists.

**If it exists** — this is a refinement iteration:
- Read the existing document first
- Read the user instruction carefully — it likely contains feedback
- Refine and improve — don't start from scratch
- Preserve what works, update what needs to change
- Add a `## Revision Notes` section at the end noting what changed and why

**If it doesn't exist** — create it fresh from the MVP Brief and Vision.

## Quality Checklist

### Content
- [ ] Target market is specific and reachable
- [ ] Go-to-market motion is clear and staged
- [ ] Competitive positioning is differentiated
- [ ] Business model math works directionally (LTV > 3× CAC)
- [ ] Roadmap uses outcomes, not feature lists
- [ ] Risks are honest with credible mitigations
- [ ] Pivot triggers are specific and measurable
- [ ] Architecture implications are explicit

### Structure
- [ ] All core sections present
- [ ] Clear separation from vision content
- [ ] Target length: 200-500 lines

### Alignment
- [ ] Strategy supports the vision
- [ ] Target market matches Brief's segment choice
- [ ] Pricing develops Brief's hypothesis
- [ ] Roadmap Now matches Brief's scope

### Red Flags (Fix Before Finalizing)
- [ ] No "we'll figure it out later" in critical areas
- [ ] No unrealistic projections without stated assumptions
- [ ] No competitor dismissal without honest assessment
- [ ] No roadmap items without outcome connection
- [ ] No strategy elements that contradict the MVP Brief's bet

## Anti-Patterns

| Anti-Pattern | Description | Fix |
|--------------|-------------|-----|
| **Boil the Ocean Market** | "Our market is everyone" | Narrow to beachhead from MVP Brief |
| **Feature Roadmap** | Lists features, not outcomes | Rewrite as outcomes with deliverables |
| **Competitor Dismissal** | "We're better at everything" | Honest assessment, cede some ground |
| **Hockey Stick Projections** | Unrealistic growth without basis | Ground in assumptions, show math |
| **Risk Blindness** | No risks listed or all "low" | Honest assessment, real mitigations |
| **Strategy by Buzzword** | "AI-first", "Platform play" | Concrete approach with specifics |
| **Vision Confusion** | Mixes vision and strategy content | Keep them separate — reference, don't duplicate |
| **Brief Contradiction** | Strategy pricing doesn't match Brief | Brief is source of truth — develop, don't contradict |

## What This Document Enables

The strategy feeds into:
- **Design Specification** — GTM and segment inform experience design, onboarding
- **Content Specification** — positioning and value prop inform messaging and copy
- **Architecture Blueprint** — business model implications inform technical decisions
  (multi-tenancy, feature gating, metering, compute budget)
- **Concept Validation** — strategy provides the basis for business model review,
  investor pitch, and customer pitch in Phase 3
