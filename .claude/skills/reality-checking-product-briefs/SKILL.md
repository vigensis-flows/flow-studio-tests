---
name: reality-checking-product-briefs
description: Produces an adversarial Reality Check of a product brief — failure modes, graveyard research, hardest unsolved problem, and honest investment signal. Produces the Reality Check file for the Product Brief. Triggers: "reality check", "stress test this idea", "would you invest", "why will this fail".
---

# Reality Checking Product Briefs

Conducts independent adversarial analysis of a product idea based on completed research. Searches for counter-evidence, failed precedents, and critical obstacles the research may have missed. Produces `docs/product-brief/7-reality-check.md`.

## Prime Directive

**Find the reasons this will fail.**

You are not here to be balanced. The research files (1-6, 8) present the opportunity. Your job is to stress-test it. Every claim needs evidence. Every risk needs specificity. If the idea is strong, it will survive your scrutiny. If it's weak, the founder is better off knowing now.

## Prerequisites

Read ALL files in `docs/product-brief/`:
- `1-problem-and-opportunity.md`
- `2-users-and-needs.md`
- `3-competitive-landscape.md`
- `4-product-intelligence.md`
- `5-user-voice.md`
- `6-differentiation-analysis.md`
- `8-sources-and-methods.md`

## Inputs

- `$ARGUMENTS` — The product name
- **Product description** — From workflow context
- **User instruction** (optional) — From workflow context

## Process

### Step 1: Understand the Opportunity Thesis

Read all 7 research files. Extract:
1. The core opportunity thesis — what the research claims is worth building and why
2. The key assumptions the thesis depends on (market size, user willingness, technical feasibility, competitive gaps, timing)
3. The differentiation vectors — what the research says makes this idea unique
4. The confidence gaps — what `8-sources-and-methods.md` already flags as uncertain

### Step 2: Independent Counter-Evidence Research

Do NOT just critique the existing files. Go find what the research missed.

**a. Graveyard search — who tried and failed?**
Search for failed companies, abandoned products, and pivoted startups in this space:
- WebSearch: "[space] startup failed", "[space] shutdown", "[product category] graveyard"
- WebSearch: "[competitor name] pivot", "[competitor name] shutdown"
- WebSearch: "[space] post-mortem", "why [product category] startups fail"
- Look for: HN discussions, founder post-mortems, industry retrospectives, TechCrunch/The Verge shutdown coverage

**b. Counter-evidence search — why won't the differentiation hold?**
For each differentiation vector from file 6:
- WebSearch: "[approach] problems", "[approach] limitations", "[approach] failed"
- WebSearch: "[technology] scaling issues", "[market] already solved"
- Look for: evidence that the claimed gap is actually filled, that the approach has been tried, or that the differentiation isn't defensible

**c. Obstacle search — what barriers did the research miss?**
- WebSearch: "[industry] regulations", "[industry] compliance requirements"
- WebSearch: "[market] barriers to entry", "[technology] adoption challenges"
- Look for: regulatory hurdles, patent landscapes, platform dependencies, distribution challenges, network effects that favor incumbents

**d. Alternative approach search — what else solves this problem?**
- WebSearch: "[job-to-be-done] without [product category]", "[problem] workaround"
- Look for: non-obvious competitors (no-code tools, platform features, manual processes that are "good enough"), upcoming platform changes that could eliminate the need

### Step 3: Synthesize into the 4-Question Framework

For each question, combine what you found in the research files with your independent research. Every claim must cite evidence.

### Step 4: Assign Signal

Based on the totality of evidence:
- **GREEN**: Risks are real but manageable. No critical assumptions are undefended. The opportunity thesis survives scrutiny.
- **YELLOW**: Significant risks that need addressing. One or more critical assumptions are unvalidated. The idea may work but needs specific things proven first.
- **RED**: Fundamental concerns. The graveyard evidence is heavy, the differentiation doesn't hold, or a critical obstacle has no clear path through. Reconsider before investing.

Be honest. Don't hedge. Pick one.

## Output

Write to: `docs/product-brief/7-reality-check.md`

```markdown
# [Product Name] — Reality Check

**Date:** [today's date]
**Signal:** [GREEN / YELLOW / RED]
*Potential investor feedback on the opportunity*

---

## Why Will This Fail?

The 3-5 most likely failure modes for this product, ordered by probability.

### 1. [Failure Mode Name]

**What goes wrong:** [Specific scenario — not vague "the market might not want it" but concrete "enterprises won't switch because migration cost exceeds 6 months of subscription value"]

**The evidence:** [Sources — URLs, company names, data points, user quotes from file 5]

**What would need to be true for this NOT to be a problem:** [The specific condition — "migration tooling reduces switching cost to under 2 weeks" or "target customers are greenfield, not migration"]

### 2. [Failure Mode Name]

[Same structure...]

### 3. [Failure Mode Name]

[Same structure...]

[Up to 5 failure modes]

---

## Who Tried This and What Happened?

### [Company/Product 1]

**What they built:** [Brief description]
**What happened:** [Shutdown / Pivoted to X / Acquired and killed / Still struggling at small scale]
**Why it matters:** [What this tells us about the space — e.g., "proves that developer-first approach doesn't convert to enterprise revenue"]
**The lesson:** [What we'd need to do differently — specific, not generic]
**Source:** [URL or reference]

### [Company/Product 2]

[Same structure...]

[At least 2 precedents. If genuinely none found, state explicitly:]

### No Graveyard Evidence Found

[Explain why — is the space genuinely new? Is it a niche that startups don't enter? Or did we not search thoroughly enough? Be honest about which.]

---

## What's the Hardest Problem You're Ignoring?

[This section goes deep on ONE thing — the single biggest challenge the product brief glosses over or assumes away.]

### The Assumption

[What the brief assumes — quote or paraphrase the specific claim from the research files]

### Why It's Dangerous

[Why this assumption is the most critical vulnerability — what depends on it being true]

### What the Real Difficulty Looks Like

[The concrete, specific challenge. Not "it's hard to get users" but "the cold start problem in two-sided marketplaces requires $X in subsidies to reach critical mass, and the research assumes organic growth"]

### What It Would Take to Solve It

[Specific — not "more research" but "a distribution partnership with [type of company]" or "a technical breakthrough in [specific area]"]

---

## Would You Invest?

**Signal: [GREEN / YELLOW / RED]**

[Signal definition as context:]
- **GREEN**: The opportunity is real, the risks are manageable, the differentiation is defensible. Proceed with confidence.
- **YELLOW**: The opportunity may be real but significant risks need addressing before investing heavily. Proceed with caution — validate [specific things] first.
- **RED**: Fundamental concerns about the opportunity. Reconsider the approach, the market, or the problem definition before proceeding.

### The Investor's Take

[2-3 paragraphs of honest, first-person assessment. Write as a sharp, experienced investor speaking directly to the founder over coffee. Be specific about what concerns you most and what would change your mind. If the signal is GREEN, say what makes this compelling despite the risks. If YELLOW, name the specific validations needed. If RED, be direct about what's fundamentally broken.]

---

*This Reality Check is adversarial by design. Its job is to find the weaknesses — not to be balanced. The research files present the opportunity; this document stress-tests it. A strong idea survives the scrutiny. A weak idea is better killed now than after months of building.*
```

## Tool Usage

- **WebSearch**: Graveyard research, counter-evidence, obstacle search, alternative approaches
- **WebFetch**: Read post-mortems, HN threads, industry analyses, shutdown announcements
- **SOAR (search_soar)**: Search for relevant frameworks and analysis patterns
- **Read / Glob**: Read all `docs/product-brief/` files

## Quality Standards

- Every claim backed by a source (URL, company name, date)
- Graveyard section has at least 2 relevant precedents (or explicitly states none found and why)
- "What's the hardest problem" goes deep on ONE thing — not a shallow list of 5
- "Would you invest?" gives a clear signal — no "it depends" hedging
- Failure modes are specific and concrete, not generic risk categories
- Tone is sharp and direct — a seasoned investor, not a helpful assistant
- Target length: 2-4 pages. Dense with evidence, not padded with filler.

## What NOT to Include

- Suggestions for how to fix the problems (that's the founder's job — we identify, they decide)
- "On the other hand" balancing (the research files already present the opportunity — this is the counterweight)
- Encouragement or positive framing (the executive summary synthesizes both sides)
- Methodology explanations (the user doesn't need to know how we searched)
- Repetition of what the research files already say (reference them, don't restate)
