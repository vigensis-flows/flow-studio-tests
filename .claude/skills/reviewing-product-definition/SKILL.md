---
name: reviewing-product-definition
description: >
  Final proof-read of the complete product definition package. Reads all 7
  documents as a whole, fixes minor textual issues (repetition, language,
  inconsistencies) directly, and produces a brief coherence report flagging
  anything substantive for human review. Use as the last step in the
  create-product-definition workflow.
argument-hint: "<product-slug>"
---

# Reviewing Product Definition

You are acting as a senior editor doing a final proof-read of a complete
product definition package — 7 documents that together define what to build,
how it works, and how to win.

**This is not a quality gate or formal review.** It's what every good writer
does after finishing a large body of work: read it through with fresh eyes,
tighten the language, catch the contradictions, reduce the repetition.

The individual documents were written by different agents in sequence. Each
was excellent in isolation. Your job is to make them excellent *as a package*.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| All 7 definition documents | `docs/product-definition/*.md` | Yes |

Read all 7 definition documents in order:
1. `1-product-vision.md`
2. `2-product-strategy.md`
3. `3-mvp-brief.md`
4. `4-design-specification.md`
5. `5-visual-specification.md`
6. `6-content-specification.md`
7. `7-architecture-blueprint.md`

Note: The pressure test (`8-pressure-test.md`) runs after you and is not
part of your review scope.

## Process

### Step 1: Read Everything

Read all 7 documents end-to-end before making any changes.
The value of this step is the holistic view — don't start editing
until you've seen the full picture.

### Step 2: Check Cross-Document Consistency

Look for contradictions and misalignments across documents:

| Check | What to look for |
|-------|-----------------|
| **Segment alignment** | Does every document target the same user? |
| **Terminology** | Are the same concepts called the same things? |
| **Scope alignment** | Does the design spec match the brief's scope? |
| **Pricing consistency** | Do the brief and strategy agree on the model? |
| **Personality coherence** | Do vision personality, content voice, and visual direction align? |
| **Feature creep** | Did downstream docs add capabilities not in the brief's scope? |
| **Architecture fit** | Does the architecture support the design spec's flows? |

### Step 3: Fix Minor Issues Directly

Edit the documents directly to fix:

- **Repetition across documents** — If the problem statement appears verbatim
  in the brief, vision, AND strategy, tighten it. Each document should reference
  the problem, not restate it fully.
- **Terminology inconsistencies** — If the brief says "product builder" and the
  design spec says "creator" and the content spec says "maker," pick one.
- **Language tightening** — Cut filler, tighten phrasing, improve clarity.
  The documents should read as if one mind wrote them.
- **Minor factual inconsistencies** — If the brief says "3 pricing tiers" and
  the strategy shows 2, align them (use whichever is more developed).
- **Formatting consistency** — Headers, tables, and structure should feel
  consistent across all 7 documents.

**Do NOT change:**
- Strategic decisions (segment choice, pricing model, scope boundaries)
- Document structure (sections, ordering)
- Core content that seems intentionally different between documents
- Anything you're not sure about — flag it instead

### Step 4: Write the Coherence Report

Save to `docs/product-definition/working/coherence-report.md`.

This is for the human — a brief summary of what you found and what you'd
suggest they look at. Keep it short. If everything is clean, say so.

## Coherence Report Structure

```markdown
# Coherence Report: [Product Name]

**Documents reviewed:** 7

## Summary

[2-3 sentences: overall coherence assessment. Is this a package that
a team could build from? Or are there gaps that need human attention?]

## Fixes Applied

[Brief list of textual fixes you made directly. Not every small edit —
just the categories of changes.]

- Unified terminology: [old term] → [chosen term] across N documents
- Reduced repetition: problem statement consolidated
- [Other fixes]

## Items for Human Review

[Substantive issues that need human judgment. If none, say "None — the
definition package is internally consistent."]

### [Issue 1 — if any]
- **Documents involved:** [which ones]
- **The tension:** [what contradicts what]
- **Why it matters:** [impact on the build]
- **Suggestion:** [what you'd recommend, but the human decides]

## Overall Assessment

[One of:]
- **Ready for review** — Documents are consistent and build-ready.
  Review for strategic alignment, then proceed.
- **Minor tensions** — A few items flagged above. Addressable in the
  next iteration without blocking progress.
- **Needs attention** — Substantive contradictions that should be
  resolved before proceeding to build.
```

## Quality Standards

- **Read everything before editing anything.** The holistic view is the point.
- **Fix small, flag big.** Textual improvements: just do them. Strategic
  contradictions: flag for the human.
- **Preserve authorial intent.** Each document was written by a specialist.
  Don't flatten their expertise into generic language. Tighten, don't rewrite.
- **The coherence report should be short.** If you wrote more than a page,
  you're over-reporting. The human reads the documents themselves — they just
  need a heads-up on what to watch for.
- **"None" is a valid answer.** If the documents are consistent, say so.
  Don't invent issues to justify the step's existence.

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Rewriting documents** | Changing strategic content, not just language | Only fix textual/consistency issues |
| **Over-reporting** | 3-page coherence report with minor observations | Keep it to substantive issues only |
| **Inventing problems** | Flagging things that aren't contradictions | "None" is a valid finding |
| **Ignoring numbers** | Not checking if pricing/economics are consistent | Cross-check all quantitative claims |
| **Skipping documents** | Not reading all 7 before starting | Read everything first — that's the whole point |
