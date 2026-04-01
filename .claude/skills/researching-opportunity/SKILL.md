---
name: researching-opportunity
description: Researches the problem space and market opportunity for a product idea. Produces the problem-and-opportunity analysis file. Use as part of the initial-product-research workflow. Triggers: "research opportunity", "analyze problem space", "market analysis".
---

# Researching Opportunity

Analyzes the problem space, market signals, and opportunity landscape for a product idea. Produces `docs/product-brief/1-problem-and-opportunity.md`.

## Prime Directive

**Research to find opportunity, not to copy.**

Study reference products as windows into a market space. The goal is understanding the problem domain and why it matters — not replicating what exists.

## Inputs

- `$ARGUMENTS` — The product name
- **Product description** — Read from workflow context or product record
- **Reference URL** (optional) — A product website or code repository to analyze as reference
- **User instruction** (optional) — Additional guidance (e.g., "Focus on the European market", "Target small teams")
- **User materials** — Check `docs/product-brief/materials/` for uploaded documents (pitch decks, research, business plans)

## Process

### Step 1: Orientation

Understand what we're researching and why.

1. Identify the product idea: name, description, any reference URL
2. Determine source type if reference URL provided:
   - GitHub/GitLab/Bitbucket URLs or `.git` → Code repository
   - Other HTTP/HTTPS URLs → Product website
   - No URL → Name + description only
3. Check for user instruction — if provided, it guides the entire research
4. Read any materials in `docs/product-brief/materials/` — these are the foundation
5. Understand the research intent:
   - Competitor to beat?
   - Product to learn from?
   - Window into a market space?
   - New idea to explore?
6. Note what the product name and description signal — the name often encodes strategic intent, identity, or positioning. Carry these signals throughout the research.

### Step 2: Problem Space & Market Analysis

Research the problem domain and market opportunity.

**If Reference URL is a Code Repository:**
1. High-level orientation: README.md, docs/, CHANGELOG.md, package files
2. Product understanding: marketing copy, onboarding flows, feature organization, pricing tiers
3. Extract the IDEA, not the IMPLEMENTATION — what problem they solved, how they think about it

**If Reference URL is a Product Website:**
1. Marketing analysis: homepage messaging, value propositions, feature pages, pricing, case studies
2. Documentation exploration: product docs, API docs, help center, changelog
3. Technical signals: stack, integrations, API capabilities

**If Name + Description Only:**
1. Web search for the problem domain
2. Identify what category this product falls into
3. Find existing products addressing similar problems
4. Understand market maturity (established, growing, nascent)

**For all source types, research:**
1. Core problem and why it matters
2. Current pain points with existing solutions
3. Market signals: size, growth, validated demand indicators
4. Timing considerations: what's changing that creates opportunity now?
5. Adjacent opportunities connecting to this space

## Output

Write results to: `docs/product-brief/1-problem-and-opportunity.md`

Use this structure:

```markdown
# Problem and Opportunity

## The Problem Space

### Core Problem
[What fundamental problem do products in this space solve?]

### Why It Matters
[Why do people/businesses care about solving this?]

### Current Pain Points
[What's painful about existing solutions?]
- [Pain point 1]
- [Pain point 2]

## Market Opportunity

### Market Signals
[Evidence that this is a space worth entering]
- [Signal 1: e.g., "Multiple well-funded competitors suggests validated demand"]
- [Signal 2: e.g., "Growing search volume for related terms"]

### Timing Considerations
[Why now? What's changing that creates opportunity?]

### Adjacent Opportunities
[Related problems or markets that connect to this space]

## Why We're Exploring This

### Research Intent
[Competitor to beat / Product to learn from / Market to enter / Idea to explore]

### Specific Interest Areas
[Any focus areas noted at the start]

## Unknown

[What couldn't we determine about the problem/opportunity?]
```

## Tool Usage

- Use WebSearch for market research, trends, industry reports
- Use WebFetch for public pages of reference products
- Use Read/Glob for code repository analysis
- Check `docs/product-brief/materials/` for user-provided materials

## Quality Standards

- Cite sources for claims
- Note confidence levels
- Document what couldn't be determined in "Unknown"
- Be thorough but concise — spend no more than 5 minutes on web research
- If user instruction was provided, reflect it throughout the analysis

## Return Format

Return as JSON:
```json
{
  "file_path": "docs/product-brief/1-problem-and-opportunity.md",
  "summary": "one-line summary of the core opportunity"
}
```
