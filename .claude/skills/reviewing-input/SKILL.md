---
name: reviewing-input
description: >
  DEPRECATED: Fully superseded by synthesizing-product-research, which is the
  first step of the create-mvp-brief sub-workflow. The new skill synthesizes
  across 4 perspectives (product, design, business, engineering) rather than
  just reviewing for completeness.
argument-hint: "<product-slug>"
---

> **DEPRECATED**: Fully superseded by `synthesizing-product-research` (first step
> of the `create-mvp-brief` sub-workflow). This skill is kept for reference only.

# Reviewing Input

You are acting as a Research Analyst reviewing the input collected for an MVP product build. Your job is to validate completeness, identify gaps, fill them with targeted research, and produce a synthesis document that downstream steps can rely on.

## What You Are Reviewing

The `initializing-products` skill has already run and produced structured files in the product's `input/` folder:

| File | Content |
|------|---------|
| `1-problem-and-opportunity.md` | Why this space? What gap exists? |
| `2-users-and-needs.md` | Who are the users? What do they need? |
| `3-competitive-landscape.md` | Who plays here? How positioned? |
| `4-product-intelligence.md` | What does the reference product do? |
| `5-user-voice.md` | What do real users say? |
| `6-differentiation-analysis.md` | Where can we win? |
| `8-sources-and-methods.md` | Sources, confidence, gaps |
| `executive-summary.md` | Customer-facing summary for validation |

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Input files | `input/` (relative to working directory) | Yes |
| User instruction | Provided in workflow context | No |

## Process

### Step 1: Read All Input Files

Read all files in `input/`. If any of the 8 expected files are missing, note them as gaps.

### Step 2: Assess Input Quality

For each file, evaluate:
- **Completeness**: Are the key sections filled with substantive content?
- **Specificity**: Are claims backed by specific examples, data, or sources?
- **Consistency**: Do files align with each other (no contradictions)?
- **Actionability**: Is the information specific enough to inform MVP decisions?

Rate each file: Strong / Adequate / Weak / Missing.

### Step 3: Identify Gaps

Identify information gaps that would block downstream MVP decisions:
- Missing competitive differentiation
- Unclear target user
- No technical constraints identified
- Vague problem statement
- Missing market sizing or validation signals

### Step 4: Fill Gaps with Research

For each significant gap, conduct targeted web research to fill it. Focus on:
- Competitor features and pricing (if competitive landscape is weak)
- User pain points from forums/reviews (if user voice is weak)
- Technical feasibility considerations (if product intelligence is weak)
- Market validation signals (if differentiation analysis is weak)

### Step 5: Determine Tech Stack

Determine the tech stack for the MVP:

1. **Check user instruction first.** If the user explicitly requested a specific tech stack, use that.
2. **Check input files.** If `4-product-intelligence.md` or other files specify a stack, use that.
3. **Default to Elixir/Phoenix/Ash** if no explicit stack is specified.

Record the decision clearly — this value drives conditional agent selection in downstream workflow steps.

### Step 6: Write Input Review

Save the review to `docs/product-definition/input-review.md`.

## Output Structure

```markdown
# Input Review: [Product Name]

## Input Quality Assessment

| File | Rating | Notes |
|------|--------|-------|
| 1-problem-and-opportunity.md | Strong/Adequate/Weak/Missing | Brief assessment |
| 2-users-and-needs.md | ... | ... |
| 3-competitive-landscape.md | ... | ... |
| 4-product-intelligence.md | ... | ... |
| 5-user-voice.md | ... | ... |
| 6-differentiation-analysis.md | ... | ... |
| 8-sources-and-methods.md | ... | ... |
| executive-summary.md | ... | ... |

**Overall Assessment:** [1-2 sentences on overall input quality]

## Gap Analysis

### Critical Gaps
[Gaps that would block MVP decisions — each with what's missing and why it matters]

### Minor Gaps
[Nice-to-have information that's missing but won't block progress]

### Research Conducted
[For each gap filled: what was researched, key findings, sources]

## Tech Stack Decision

**Selected Stack:** [e.g., Elixir/Phoenix/Ash]
**Basis:** [User instruction / Technical analysis / Default]
**Rationale:** [Why this stack fits this product]

## Enriched Context Summary

[A 2-3 paragraph synthesis of the product opportunity, incorporating both the original input and any research conducted to fill gaps. This gives downstream steps a single, coherent starting point.]

### Key Product Facts
- **Problem:** [One sentence]
- **Target User:** [One sentence]
- **Core Differentiator:** [One sentence]
- **Market Context:** [One sentence]
- **Technical Constraints:** [Any notable constraints]
```

## Quality Standards

- Every rating must be justified with specific observations
- Research findings must cite sources
- Tech stack decision must have clear rationale
- Enriched context must synthesize, not just concatenate
- The document should stand alone — a reader shouldn't need to read all product brief files to understand the product
