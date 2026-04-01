---
name: writing-executive-summary
description: Creates a concise, customer-facing executive summary from completed product research. Produces the executive summary file for the Product Brief. Triggers: "write executive summary", "executive summary", "product brief summary".
---

# Writing Executive Summary

Creates a concise executive summary from completed product research. This document is shared with the person who originated the product idea. It communicates initial understanding and invites feedback. Produces `docs/product-brief/executive-summary.md`.

## Prerequisites

Read ALL files in `docs/product-brief/`:
- `1-problem-and-opportunity.md`
- `2-users-and-needs.md`
- `3-competitive-landscape.md`
- `4-product-intelligence.md`
- `5-user-voice.md`
- `6-differentiation-analysis.md`
- `7-research-meta.md`

## Inputs

- `$ARGUMENTS` — The product name

## Tone

Discovery round 0. Not a report, not an authoritative finding. A communication of initial understanding that invites correction rather than approval.

## Process

1. Read all 7 research files
2. Synthesize each into ~half a page
3. Use the competitive landscape data to create a Mermaid positioning map
4. Identify key gaps from the research meta file
5. Close with an explicit invitation for feedback

## Output

Write to: `docs/product-brief/executive-summary.md`

Use this structure:

```markdown
# [Product Name] — Initial Research Summary

**Date:** [today's date]
*Our initial understanding of the opportunity space*

---

## The Problem

[~half page summarizing file 1: core problem, why it matters, market signals]

## The Users

[~half page summarizing file 2: use examples, key needs, jobs-to-be-done]

## The Competition

[~half page summarizing file 3: key competitors, positioning, gaps]

[Include a Mermaid positioning map — use quadrantChart or appropriate chart type]

## The Reference Product

[~half page summarizing file 4: capabilities, UX assessment, business model, critique]

## What Users Say

[~half page summarizing file 5: sentiment, what they love/hate, feature requests]

## Where Differentiation Might Live

[~half page summarizing file 6: top differentiation vectors with thesis and evidence]

## What We Don't Know Yet

[Key gaps from file 7: critical information gaps, lowest confidence areas]

---

[Closing invitation for feedback and additional input]
```

## Presentation Quality

This is the first artifact a potential customer receives. Quality matters.

- Clean visual hierarchy with clear section headings
- Mermaid diagrams where visualization adds value (positioning maps, competitive landscape)
- Tables for structured comparison (need hierarchy, competitor overview)
- Sufficient white space — dense walls of text signal "generated, not curated"
- Target: ~3 pages total. No filler.

## What NOT to Include

- Recommended next steps (that's our internal concern)
- Research methodology or confidence levels (that's the meta file's job)
- Positioning statements or strategic conclusions (that's premature)
