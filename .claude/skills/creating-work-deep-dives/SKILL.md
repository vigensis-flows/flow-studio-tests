---
name: creating-work-deep-dives
description: >
  Creates a work-specific deep dive for a knowledge work in the expertise system.
  Reads the extracted content and produces a comprehensive analysis (~2000-4000 words)
  covering arguments, frameworks, critical assessment, and practical applications.
  Publishes to the running application. Triggers: "create deep dive", "deep dive
  this work", "analyze this work".
user-invocable: true
argument-hint: "<work-slug>"
---

# Creating Work Deep Dives

You are the domain expert creating a deep dive — a comprehensive analysis that lets someone understand a work's key ideas without reading the full document.

## What You Are Creating

A deep dive (~2,000-4,000 words, 15-20 minute read) that is **work-specific** — it analyzes what the work contains and contributes, not what it means for any particular domain. Domain-specific relevance belongs in the domain_works relevance_note.

A deep dive provides:
- The work's main arguments and how they're structured
- Analysis of key frameworks, models, and methodologies
- Critical assessment — strengths, limitations, what has aged well or poorly
- Practical applications and actionable insights
- Connections to related works and ideas

Deep dive chunks get a 1.10x similarity boost in search, making them the preferred source when the expertise system answers questions about a work.

## Voice

Write as a senior practitioner who has studied the work deeply and is preparing a colleague to apply its ideas. Analytical, specific, opinionated where warranted. This is not a book report — it's an expert's analysis.

## Process

### Step 1: Access the Work Content

Query the running application for the work's extracted content.

1. Look up the work by slug to get metadata
2. Access the extracted markdown content and/or search chunks semantically
3. Read enough to understand the work's structure, key arguments, and distinctive contributions

If the work has no extracted content (status is not "ready"), stop and inform the user.

### Step 2: Analyze the Work

Map the work's structure and identify:
- The central thesis and how it's argued
- The major sections/parts and what each contributes
- Key frameworks, models, or methodologies (name them, understand their components)
- The intended audience and what the author assumes
- Historical context — when was this written and what was the state of practice?
- What has aged well and what has been superseded by newer thinking

### Step 3: Write the Deep Dive

Structure:

**1. Overview** (~200 words)
What this work is, who wrote it, when, and why it matters. The central thesis in one clear paragraph. Where it sits in the field.

**2. Core Arguments and Structure** (~500-800 words)
Walk through the work's main arguments in logical order. This is not chapter-by-chapter summary — it's the intellectual structure. What is the author building toward? How do the pieces connect?

**3. Key Frameworks and Models** (~500-1000 words)
For each significant framework or model the work introduces:
- Name it clearly
- Explain its components/dimensions
- Show how it works with a concrete example
- Note what makes it distinctive compared to alternatives

This section is the highest-value part of the deep dive — practitioners search for specific frameworks and need to understand them without reading the full work.

**4. Critical Assessment** (~300-500 words)
An honest evaluation:
- What are the work's strengths? What does it do better than anything else?
- What are its limitations? Where does it oversimplify, overclaim, or miss important aspects?
- What has aged well? What is timeless about this work?
- What has been superseded? What has newer work improved upon?
- In an AI-native context, what changes? Are the prescribed methods still valid when building is cheap?

Be specific. "This book is a classic" is not assessment. "Norman's affordance/signifier distinction remains the most precise vocabulary for discussing interaction design, but his examples from physical products require translation for screen-based interfaces" is.

**5. Practical Applications** (~300-500 words)
What can a practitioner do with this knowledge?
- Concrete actions or decisions this work informs
- Situations where its frameworks apply
- How to apply the key ideas in an AI-native software product context

**6. Connections** (~200-300 words)
How this work relates to other significant works:
- What it builds on (intellectual predecessors)
- What builds on it (works that extend or refine its ideas)
- What it challenges or contradicts
- Complementary works that pair well with it

### Step 4: Publish

Publish the deep dive using the work's slug:
```
WorkDeepDive.publish_by_slug(work_slug, content, created_by)
```

## What NOT to Do

- Do not write chapter-by-chapter summaries — analyze the ideas, not the table of contents
- Do not write domain-specific relevance — that belongs in domain_works relevance_note
- Do not skip the critical assessment — uncritical summaries have low value
- Do not ignore the AI-native context — how the work's methods apply when building is cheap
- Do not pad with filler — if the work only warrants 2000 words of analysis, stop at 2000
- Do not guess about content you haven't read — base the analysis on extracted content

## Quality Checks

- [ ] 2,000-4,000 words, proportional to the work's depth
- [ ] Central thesis stated clearly
- [ ] Key frameworks named, explained with components, and illustrated with examples
- [ ] Critical assessment is specific and honest (strengths AND limitations)
- [ ] AI-native context addressed (how methods apply when building is cheap)
- [ ] Practical applications are concrete and actionable
- [ ] Connections to other works identified
- [ ] Work-specific — no domain-specific framing
- [ ] Published to the running application
