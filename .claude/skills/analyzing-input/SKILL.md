---
name: analyzing-input
description: >
  Analyzes processed input files and conducts web research to generate the 7
  structured input files for MVP creation. Works from an input digest (produced
  by processing-mvp-input) or directly from text files in the input directory.
  Use after content extraction has been completed.
argument-hint: "<product-slug>"
---

# Analyzing Input

You are acting as a Research Analyst transforming processed client materials into structured product research. The input files have already been extracted to text/markdown format. Your job is to analyze this content, conduct targeted web research, and produce the 7 structured input files that downstream MVP workflows require.

## Context

A client has provided materials (PDFs, slide decks, documents, screenshots, notes) that have been uploaded and extracted to text. You now have readable content to work with. Your task is to understand what the client wants to build, research the market, and create structured research files.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Product name | Provided in workflow context | Yes |
| Input files | `input/` (relative to working directory) | Yes |
| Input digest | `docs/product-definition/input-digest.md` (if available) | No |
| Preparation instruction | Provided in workflow context | No |

## Process

### Step 1: Read All Input

Read all files in `input/`. This includes:
- Original text files (`.md`, `.txt`, `.json`, etc.)
- Extracted content files (`.extracted.md` — text extracted from PDFs, presentations, etc.)
- The input digest at `docs/product-definition/input-digest.md` (if it exists)

Build a mental model of what the client wants to build.

### Step 2: Identify What We Know vs. What We Need

From the input materials, categorize information:
- **Problem space**: Do we understand what problem this solves?
- **Target users**: Do we know who this is for?
- **Competition**: Do we know what alternatives exist?
- **Product concept**: Do we understand what they want to build?
- **Differentiation**: Do we know how this differs from existing solutions?

### Step 3: Conduct Targeted Research

Use web search to fill gaps. Focus on:
- **Competitive landscape**: Find the top 3-5 competitors, their positioning, pricing
- **User voice**: Search for reviews, forum discussions, Reddit threads about existing solutions
- **Market context**: Understand the space, trends, sizing signals
- **Technical feasibility**: Any relevant technical considerations

If the preparation instruction specifies a focus area, prioritize research accordingly.

### Step 4: Create the Structured Files

Write all files to `input/`. Follow the templates and quality checklist from the `initializing-products` skill:

1. **`1-problem-and-opportunity.md`** — Why this space? What gap exists?
2. **`2-users-and-needs.md`** — Who are the users? What do they need?
3. **`3-competitive-landscape.md`** — Who plays here? How positioned?
4. **`4-product-intelligence.md`** — What does the reference/proposed product do?
5. **`5-user-voice.md`** — What do real users say about existing solutions?
6. **`6-differentiation-analysis.md`** — Where can we win?
7. **`7-research-meta.md`** — Sources, confidence levels, gaps
8. **`executive-summary.md`** — Customer-facing summary for validation

## Key Principles

1. **Start from what the client gave you** — Their materials are the primary source of truth for the product concept
2. **Research validates and enriches** — Use web research to add competitive context, user voice, and market understanding
3. **Never fabricate** — If you can't find information, say so. Mark confidence levels honestly
4. **Adapt to what's available** — Input quality varies. A single-page brief gets different treatment than a 50-page business plan
5. **The output feeds the Product Trio** — These files are the foundation for MVP discovery. Quality matters

## Handling Preparation Instructions

If the user provided a preparation instruction:
- **Tech stack preference**: Note it prominently so the reviewing-input step picks it up
- **Focus areas**: Prioritize research in those areas
- **Constraints**: Incorporate them into the opportunity and differentiation analysis
- **Target market**: Use it to guide competitive research

## Quality Standards

- Each file should have substantive content, not just headings
- Competitive analysis should include real companies with real positioning
- User voice should cite actual sources (forums, reviews, articles)
- Research meta should honestly assess confidence levels
- If input materials are thin, note that confidence is lower — don't pad with speculation
