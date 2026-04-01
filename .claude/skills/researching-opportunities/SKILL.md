---
name: researching-opportunities
description: Synthesizes all product research into differentiation vectors and documents sources and methods. Produces differentiation analysis and sources & methods files. Triggers: "differentiation analysis", "opportunity synthesis", "research opportunities".
---

# Researching Opportunities

Synthesizes insights from all previous research steps into differentiation vectors, gap analysis, and sources & methods. Produces `docs/product-brief/6-differentiation-analysis.md` and `docs/product-brief/8-sources-and-methods.md`.

## Prerequisites

Read ALL previous research files in `docs/product-brief/`:
- `1-problem-and-opportunity.md` — problem space and market
- `2-users-and-needs.md` — user segments and needs
- `3-competitive-landscape.md` — competitors and positioning
- `4-product-intelligence.md` — reference product details
- `5-user-voice.md` — real user feedback

## Inputs

- `$ARGUMENTS` — The product name
- **User instruction** (optional) — From workflow context
- **Provided materials digest** (optional) — If `docs/product-brief/provided-materials-digest.md` exists, read it to inform the synthesis. It contains extracted content from customer-provided documents.

## Process

### Step 1: Opportunity Synthesis

1. **Gap analysis:**
   - What pain points aren't addressed by existing products?
   - What use cases have the highest friction?
   - What capabilities are requested but missing?

2. **Suggest differentiation vectors:**
   - Where is the UX weak? (usability opportunity)
   - Where is pricing problematic? (value opportunity)
   - Where is the product bloated? (simplicity opportunity)
   - Where are there privacy/security concerns? (trust opportunity)
   - Order vectors by potential impact on user delight — what would users *feel* most?
   - For each vector: thesis, evidence, trade-offs
   - Do NOT label any vector as "primary" — sequencing is the product team's decision

3. **Separate table stakes from differentiators:**
   - Industry requirements, compliance obligations, baseline expectations are table stakes
   - Differentiation is what makes users choose this product over alternatives
   - Present these as distinct categories

**Critical boundary:** This is analysis, not decision. Do NOT include:
- Positioning statements or taglines
- Risk factor assessments
- Beachhead selections or entry strategies
- Strategic recommendations

These are product team deliverables, not initialization input.

### Step 2: Research Documentation

Document all sources, confidence levels, assumptions, and gaps.

1. Research overview: reference product, date, source type, intent
2. Sources used: primary, review platforms, secondary — with access level and notes
3. Access issues: what was blocked, workarounds used, impact on confidence
4. Confidence assessment per output file with rationale
5. Assumptions made with basis and confidence level
6. Information gaps: critical (would change understanding) vs nice-to-have (adds depth)
7. Research quality: overall assessment, key limitation, strongest and weakest sections

## Output Files

### File 1: `docs/product-brief/6-differentiation-analysis.md`

```markdown
# Differentiation Analysis

## Opportunity Landscape

[2-3 sentence summary of where opportunities exist based on the research]

## Gap Analysis

### Unaddressed Pain Points

| Pain Point | Evidence | Potential Opportunity |
|------------|----------|----------------------|
| [Pain 1] | [Where we found this] | [How this could be addressed] |

### Missing or Weak Capabilities

| Capability | User Need | Current Gap |
|------------|-----------|-------------|
| [Capability 1] | [Why users want it] | [Why it's not well-served] |

## Suggested Differentiation Vectors

Potential angles for the product team to explore during discovery. Ordered by estimated potential for user delight — what would users *feel* most directly?

Do NOT label any vector as "primary" — sequencing and prioritization is the product team's decision.

### Vector: [e.g., "Focused simplicity"]
**Thesis:** [The core idea]
**Evidence:** [Why the research suggests this could work]
**Trade-offs:** [What pursuing this might mean giving up]

### Vector: [e.g., "Performance"]
[Same structure...]

### Vector: [e.g., "Pricing model"]
[Same structure...]

## Table Stakes vs. Differentiators

**Table stakes** (must-have to enter the market):
- [Requirement 1]
- [Requirement 2]

**Potential differentiators** (what could make users choose this over alternatives):
- [Differentiator 1]
- [Differentiator 2]

## Unknown

[What couldn't we determine about differentiation opportunities?]
```

### File 2: `docs/product-brief/8-sources-and-methods.md`

```markdown
# Sources & Methods

## Research Overview

**Reference Product:** [Name]
**Research Date:** YYYY-MM-DD
**Source Type:** [Code repository / Product website / Name+description synthesis]
**Research Intent:** [Why we studied this product]

## Sources Used

### Primary Sources
| Source | Type | Access Level | Notes |
|--------|------|--------------|-------|
| [URL/path] | [Code/Website/Reviews] | [Full/Partial/Blocked] | [Any issues] |

### Review Sources
| Platform | Reviews Analyzed | Date Range |
|----------|------------------|------------|
| [Platform] | N | [range] |

### Secondary Sources
- [Articles, reports, discussions referenced]

## Access Issues

### What We Couldn't Access
| Resource | Why Blocked | Impact |
|----------|-------------|--------|
| [Resource] | [Reason] | [How it affects confidence] |

### Workarounds Used
[How we compensated for access limitations]

## Confidence Assessment

| File | Confidence | Rationale |
|------|------------|-----------|
| 1-problem-and-opportunity.md | [High/Medium/Low] | [Why] |
| 2-users-and-needs.md | [High/Medium/Low] | [Why] |
| 3-competitive-landscape.md | [High/Medium/Low] | [Why] |
| 4-product-intelligence.md | [High/Medium/Low] | [Why] |
| 5-user-voice.md | [High/Medium/Low] | [Why] |
| 6-differentiation-analysis.md | [High/Medium/Low] | [Why] |

## Assumptions Made

| Assumption | Basis | Confidence |
|------------|-------|------------|
| [Assumption 1] | [Why we assumed this] | [High/Med/Low] |

## Information Gaps

### Critical Gaps
[Information that would significantly change our understanding]
- [Gap 1]: [Why it matters]

### Nice-to-Have
[Information that would add depth but isn't critical]
- [Gap 1]

## Research Quality

**Overall confidence:** [High / Medium / Low]
**Key limitation:** [The biggest constraint on this research]
**Strongest section:** [Where we have best information]
**Weakest section:** [Where we have least information]
```
