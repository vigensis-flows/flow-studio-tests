---
name: creating-work-overviews
description: >
  Creates a work-specific overview for a knowledge work in the expertise system.
  Reads the extracted content and produces a concise summary (~300-500 words)
  covering thesis, contribution, key takeaways, and audience. Publishes to the
  running application. Triggers: "create work overview", "overview this work",
  "summarize this work".
user-invocable: true
argument-hint: "<work-slug>"
---

# Creating Work Overviews

You are the domain expert creating a work overview — a concise orientation document that helps someone decide if this work is worth their time.

## What You Are Creating

A work overview (~300-500 words, 2-3 minute read) that is **work-specific** — it describes what the work IS, not what it means for any particular domain. Domain-specific relevance belongs in the domain_works relevance_note, not here.

An overview answers:
- What is this work about? What is its central thesis?
- What does it contribute to its field?
- What are the key takeaways a practitioner should know?
- Who is this work best for? (expertise level, background)
- How does it relate to other significant works in the field?

## Voice

Write as a senior practitioner who has read the work and is briefing a colleague. Authoritative, concise, specific. No filler, no marketing language. The reader is deciding whether to invest 10+ hours reading — give them what they need to decide.

## Process

### Step 1: Access the Work Content

Query the running application for the work's extracted content. The work has been processed through the upload pipeline and its content is available as markdown and chunks in the system.

1. Look up the work by slug to get its metadata (title, authors, asset_type)
2. Access the extracted markdown content or search the work's chunks semantically for key passages

If the work has no extracted content (status is not "ready"), stop and inform the user.

### Step 2: Understand the Work

Read or search the extracted content to understand:
- The main argument or thesis
- The structure (how the work is organized)
- The key frameworks, models, or methodologies introduced
- The intended audience and prerequisites
- What makes this work significant in its field

### Step 3: Write the Overview

Structure (~300-500 words):

**Opening paragraph** — What this work is about in one clear statement. Title, author(s), and the central thesis. What problem or question does it address?

**Contribution** — What does this work add to its field? What frameworks, models, or ideas does it introduce or advance? What makes it distinctive compared to other works on the same topic?

**Key takeaways** — The 3-5 most important ideas a practitioner should take away. These should be specific enough to be useful, not generic summaries. Name the concepts.

**Audience and level** — Who benefits most from reading this? What background knowledge does it assume? Is it foundational (read this first), practitioner-level (assumes basics), or expert-level (assumes deep familiarity)?

**Relationship to field** — How does this work sit in relation to other significant works? Does it build on, challenge, or complement other well-known works? Keep this brief — one or two sentences.

### Step 4: Populate Metadata

If the work is missing metadata, populate it from the content:
- **Summary** (one-liner for cards): A single sentence capturing what this work is. Example: "The foundational text on how humans interact with designed objects — affordances, signifiers, mental models."
- **Authors**: Extract from the work content if not populated
- **Publication date**: Extract or research if not populated

### Step 5: Publish

Publish the overview using the work's slug:
```
WorkOverview.publish_by_slug(work_slug, content, created_by)
```

The `created_by` field should identify who created it (e.g., "design-shaper", "intelligence-architect", or a user identifier).

## What NOT to Do

- Do not write domain-specific relevance — that belongs in the domain_works relevance_note
- Do not pad with generic praise ("this groundbreaking work...") — be specific about what makes it valuable
- Do not summarize every chapter — focus on the ideas that matter
- Do not exceed 500 words — if you need more depth, that's a deep dive
- Do not guess about content you haven't read — base the overview on the extracted content

## Quality Checks

- [ ] 300-500 words, scannable in 2-3 minutes
- [ ] Central thesis stated clearly in the opening
- [ ] Key takeaways are specific and named (not "the author discusses several frameworks")
- [ ] Audience and level identified
- [ ] Work-specific — no domain-specific framing
- [ ] Metadata populated (summary, authors, publication_date)
- [ ] Published to the running application
