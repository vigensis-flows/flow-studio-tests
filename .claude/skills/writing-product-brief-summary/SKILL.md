---
name: writing-product-brief-summary
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
- `7-reality-check.md`
- `8-sources-and-methods.md`

## Inputs

- `$ARGUMENTS` — The product name

## Tone

Discovery round 0. Not a report, not an authoritative finding. A communication of initial understanding that invites correction rather than approval.

## Process

1. Read all 8 research files (including the Reality Check)
2. Synthesize each research file (1-6) into ~half a page
3. Use the competitive landscape data to create a Mermaid positioning map
4. Distill the Reality Check (file 7) into 2-3 key risks and the overall signal (GREEN/YELLOW/RED)
5. Identify key gaps from the Sources & Methods file (file 8)
6. Close with a signal-specific invitation for feedback

## Output

Write to: `docs/product-brief/executive-summary.md`

Use this structure:

```markdown
# [Product Name] — Product Brief Summary

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

## The Hard Questions

[~half page summarizing file 7: the Reality Check signal (GREEN/YELLOW/RED),
the top 2-3 risks an investor would flag, and what would need to be true for each
to not be a problem. This is honest — not alarmist, not dismissive.
Frame as: "A sharp investor would ask..."]

## What We Don't Know Yet

[Key gaps from file 8: critical information gaps, lowest confidence areas]

---

[Signal-specific closing invitation:

- If Reality Check signal is GREEN: "The opportunity looks solid. The hard questions have reasonable answers. What did we get right? What did we miss?"
- If YELLOW: "There are real questions to address before investing heavily. The risks aren't dealbreakers — but they need answers. What's your take on these concerns?"
- If RED: "We found significant concerns that deserve serious consideration before proceeding. This doesn't mean the idea is wrong — but it may need a different angle. Let's talk about what you see differently."]
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
