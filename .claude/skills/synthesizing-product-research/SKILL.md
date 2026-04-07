---
name: synthesizing-product-research
description: >
  Synthesizes the Product Brief research package into a focused working document
  that surfaces what matters, identifies tensions, and frames the decisions the
  product definition needs to make. This is not a summary — it's analytical
  compression across four perspectives (product, design, business, engineering).
  Use as the first step in creating a product definition — feeds directly into
  the Product Vision.
argument-hint: "<product-slug>"
---

# Synthesizing Product Research

You are acting as the Product Maestro synthesizing a completed Product Brief
research package. Your job is to compress 8 research documents into a focused
working document that makes MVP decision-making tractable.

**This is not a summary.** Summaries preserve structure and reduce length.
Synthesis identifies what matters, surfaces tensions between findings, and
frames the decisions that must be made. A good synthesis makes the reader
smarter about the opportunity than reading all 8 documents would — because
it connects dots the individual documents can't.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Product Brief research | `docs/product-brief/*.md` | Yes |
| User instruction | Workflow context | No |

Read all files in `docs/product-brief/`. The expected documents:

| File | What it contains |
|------|-----------------|
| `executive-summary.md` | One-page synthesis of the brief |
| `1-problem-and-opportunity.md` | Market opportunity, problem validation |
| `2-users-and-needs.md` | User segments, jobs-to-be-done, needs hierarchy |
| `3-competitive-landscape.md` | Competitor analysis, positioning, gaps |
| `4-product-intelligence.md` | Reference product analysis |
| `5-user-voice.md` | Real user feedback from adjacent products |
| `6-differentiation-analysis.md` | Differentiation vectors |
| `7-reality-check.md` | Adversarial stress test, failure modes |
| `8-sources-and-methods.md` | Research methodology, confidence levels |

## Process

### Step 1: Read Everything

Read all 8 documents. Don't start writing until you've read them all.
The value of synthesis comes from seeing connections across documents.

### Step 2: Identify What Matters

Not everything in the research is equally important for MVP scoping.
Filter for findings that are:

- **High-acuity** — sharp pains with strong evidence, not mild inconveniences
- **Actionable** — findings that change what we'd build, not background context
- **Tensioned** — places where the research points in two directions at once
- **Load-bearing** — assumptions that, if wrong, invalidate the opportunity

### Step 3: Apply Four Lenses

Process the research through four perspectives:

| Lens | What to extract |
|------|----------------|
| **Product** | Sharpest user pains, clearest unmet needs, strongest differentiation vectors |
| **Design** | Experience signals — how the product should feel, not just what it should do |
| **Business** | Monetization signals — willingness to pay, pricing anchors, unit economics clues |
| **Engineering** | Technical constraints, feasibility signals, architecture-shaping facts |

### Step 4: Surface Tensions

Identify genuine tensions — places where the research pulls in two directions.
These become the decisions the MVP Brief must resolve.

A tension is NOT a problem to solve. It's a choice to make. Both sides
must be defensible. Frame each tension as: "[A] vs [B] — choosing A means X,
choosing B means Y."

Examples of real tensions:
- "Self-service (fast learning, low WTP) vs. guided experience (slower, higher WTP)"
- "Broad lifecycle (unique positioning) vs. deep single-phase (faster to build, easier to validate)"
- "Solo founders (reachable now, $15/mo) vs. enterprises (big revenue, 18-month sales cycle)"

### Step 5: Assess Segments Factually

For each user segment identified in the research, assess along consistent
dimensions. This is factual assessment — do not recommend a segment.
That decision belongs to the next step in the workflow.

### Step 6: Write the Synthesis

Save to `docs/product-definition/working/research-synthesis.md`.

## Output Structure

```markdown
# Research Synthesis: [Product Name]

**Synthesized from:** [N] Product Brief documents

## The Opportunity in Brief

[3-4 sentences. What exists, why it matters, what's not being done.
This should make someone who hasn't read the research understand the
opportunity well enough to have an opinion.]

## Sharpest User Pains

[The 3-5 pains with the strongest evidence and highest acuity.
Not all pains — the ones that matter most for MVP scoping.]

### [Pain 1 — descriptive name]
- **Who feels it:** [Specific — not "businesses" but "solo founders building their first product"]
- **How acutely:** [Evidence of severity — quotes, data, behavioral signals]
- **Current workaround:** [What they do today and why it fails]
- **Source:** [Which research document(s)]

### [Pain 2]
[Same structure]

[Continue for 3-5 pains]

## Competitive Reality

[Not a competitor matrix — the strategic takeaways. What's moving fast,
who's closest, where the genuine gaps are, what competitive moves
constrain or enable our MVP choices.]

### What's Moving Fast
[Recent competitive moves that affect timing]

### Closest Competitor
[Who, what they do, where they fall short]

### Genuine Gaps
[Spaces no competitor occupies that are validated by user need]

## Differentiation Landscape

[Which vectors have the most evidence AND defensibility.
Be honest about which are genuinely defensible vs. temporary advantages.]

| Vector | Evidence Strength | Defensibility | User Value | Assessment |
|--------|------------------|---------------|------------|------------|
| [Vector 1] | Strong/Medium/Weak | High/Medium/Low | High/Medium/Low | [1 sentence] |
| [Vector 2] | ... | ... | ... | ... |

## Experience Signals

[Patterns from the research that inform how the product should *feel*.
Each signal connects a research observation to an experience implication.]

| Research Observation | Experience Implication |
|---------------------|----------------------|
| [What users said/did] | [What this means for how the product should work] |
| [What users said/did] | [What this means for how the product should work] |

## Monetization Signals

[Evidence about willingness to pay, pricing anchors, value perception,
and cost constraints. Factual collection — not pricing recommendation.]

### Pricing Anchors
[What do users compare this category to? What do they pay for alternatives?]

### Value Perception
[How do users talk about the value? Do they frame it as "tool" or "team member" or "service"?]

### Cost Constraints
[Any evidence about compute costs, delivery costs, or margin pressure]

### Competitor Pricing
[What competitors charge and how — subscription, usage, project-based]

## Technical Landscape

[Technical facts from the research that constrain what's feasible.
Not architecture decisions — the inputs to those decisions.]

- [Technical fact 1 and its implication]
- [Technical fact 2 and its implication]

## Segment Attractiveness

[Factual assessment of each segment. Do NOT recommend — that's the next step's job.]

| Segment | Pain Acuity | Reachability | WTP Signal | Sales Cycle | Key Risk |
|---------|-------------|-------------|------------|-------------|----------|
| [Segment 1] | High/Med/Low | High/Med/Low | [Evidence] | [Estimate] | [Risk] |
| [Segment 2] | ... | ... | ... | ... | ... |

## Key Tensions

[The 3-5 genuine tensions the MVP Brief must resolve.
Each is a choice, not a problem. Both sides must be defensible.]

### Tension 1: [A] vs [B]
- **Choosing A means:** [Implications]
- **Choosing B means:** [Implications]
- **What would resolve it:** [Evidence or decision that tips the balance]

### Tension 2: [A] vs [B]
[Same structure]

## Open Questions

[Questions the research raised but couldn't answer.
The MVP Brief must either answer these or explicitly acknowledge
them as unknowns being tested.]

- [Question 1] — [Why it matters for MVP scoping]
- [Question 2] — [Why it matters for MVP scoping]

## Risk Landscape

[From the reality check and across documents: risks that constrain
the MVP definition. Not all risks — the load-bearing ones.]

| Risk | Severity | Evidence | MVP Implication |
|------|----------|----------|----------------|
| [Risk 1] | Critical/High/Medium | [Source] | [How this constrains MVP choices] |
| [Risk 2] | ... | ... | ... |
```

## Quality Standards

- **Every finding must cite its source document.** Traceability is non-negotiable —
  if Phase 2 questions a finding, the team must be able to trace it back.
- **Tensions must be genuine choices.** If one side is obviously wrong, it's not
  a tension — it's a finding. Both sides of a tension must be defensible.
- **Segment assessment must be factual, not prescriptive.** The synthesis
  presents evidence; the next step (exploring-mvp-options) makes decisions.
- **Length: 300-500 lines.** Shorter than the input, but substantive enough
  to stand alone. A reader should be able to make MVP decisions from this
  document without re-reading the original 8 files.
- **No jargon inflation.** Use the language of the original research.
  Don't introduce frameworks or terminology the research didn't use.
- **Honest about evidence quality.** If a finding is based on one blog post,
  say so. If it's based on 5 independent sources, say that too.
  Confidence levels matter for decision-making.

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Summary, not synthesis** | Restates each document sequentially | Connect findings across documents |
| **Everything is important** | 20 pains, 10 tensions, 8 risks | Ruthlessly filter to what changes MVP decisions |
| **Premature recommendation** | "We should target segment X" | Present evidence, let Phase 2 decide |
| **Strategic pre-framing** | Frames conclusions that constrain downstream options: "strongest differentiators are hardest to monetize," "broad scope is risky" | Present evidence and tensions. Strategic conclusions belong to the options analysis and MVP brief, not the synthesis. If a differentiator is strong, say so. If monetization is uncertain, say that. Don't package these into a strategic frame that biases toward narrow scope. |
| **Effort inflation** | Implying that broad scope = long build time, or that including more capabilities = more risk | Do not estimate build effort or imply build timelines. The synthesis is about market evidence, user needs, and competitive reality — not engineering feasibility. That assessment belongs to the options analysis. With AI-native development, scope ≠ time. |
| **Missing tensions** | Only presents one-sided findings | Look for where research contradicts itself |
| **Jargon escalation** | Introduces BMC, JTBD, TAM where research used plain language | Match the research's vocabulary |
| **Ignoring the reality check** | Only presents optimistic findings | The reality check exists for a reason — integrate its warnings |

## What Happens Next

This synthesis feeds directly into `creating-product-vision`, where the
Product Maestro articulates the north star — where this product is going.
The synthesis provides the evidence base for the vision. After the vision,
`creating-product-strategy` defines how to win. The synthesis informs both.
