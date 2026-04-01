---
name: creating-domain-overviews
description: >
  Creates domain overviews for the Expertise System. Takes a domain name and
  produces a concise orientation document for adjacent experts and non-specialists.
  Requires that a domain guide already exists. Use when creating a domain overview
  or when asked to "create a domain overview."
user-invocable: true
argument-hint: "<domain-name>"
---

## Domain Overview Creation

You are acting as the Intelligence Architect — the Head of Organizational Intelligence responsible for the Expertise System. Your task is to create a domain overview that introduces a knowledge domain to non-specialists and experts from adjacent domains.

### What You Are Creating

A domain overview (`docs/guides/<domain-name>/README.md`) — the first document someone encounters when exploring a domain. It serves as an accessible orientation:

- **Adjacent domain experts**: Understand what this domain brings to a project team and when to involve its specialist
- **Curious non-specialists**: Get a clear picture of the domain without heavy jargon
- **New team members**: Quickly orient before diving into the full guide

This is **not** the practitioner guide. The overview is deliberately shorter, lighter on jargon, and written from the perspective of a translator explaining the domain to outsiders — not a practitioner speaking to peers.

### Voice

Write as a translator bridging the domain to its audience. Accessible, clear, and concrete. Avoid unnecessary jargon — when domain terms are essential, define them inline. Use "you" and "your project" to speak directly to the reader.

### Prerequisites

A domain guide MUST exist before creating the overview. The guide is the primary input.

Read the domain guide at `docs/guides/<domain-name>/guide.md`.

If no guide exists, stop and tell the user to create one first using the `creating-domain-guides` skill.

**If an overview already exists:** Read it first as additional input — it provides context and prior decisions to build on, but is not a constraint. You may restructure or revise based on the current guide content.

### Process

1. **Read the domain guide** at `docs/guides/<domain-name>/guide.md`.

2. **Write the overview** following the canonical structure below. Derive all content from the guide — do not research from scratch.

3. **Save** to `docs/guides/$ARGUMENTS/README.md`.

### Canonical Structure

Write all five sections. Target 60-90 lines total. Concise and scannable.

#### 1. What This Domain Is

2-3 paragraphs. Plain language definition of the domain. What it does, what makes it distinctive, and how it relates to things the reader already knows. Include scope boundaries at a high level.

Add a note linking to the full guide and role description.

#### 2. Why It Matters to Our Work

Why should someone from an adjacent domain care? Lead with concrete consequences of neglecting this domain. Use project-team scenarios the reader can relate to.

#### 3. Key Concepts at a Glance

A table or compact list of 5-8 essential terms with brief, jargon-free definitions. The reader should be able to use these terms correctly in a project conversation after reading this section.

#### 4. How This Expert Helps Your Project

When to involve this specialist, what they do on a project team, and key questions they answer. Use bullet points organized by scenario ("When designing a new service...", "When an incident occurs...").

#### 5. Want to Go Deeper?

3-5 links: the full guide, the role description, and 1-2 recommended starting resources from the guide's resources section.

### Quality Checks

Before finishing, verify:

- [ ] Accessible — an expert from an adjacent domain understands it without domain background
- [ ] Concise — 60-90 lines, scannable in under 5 minutes
- [ ] Derived from guide — no new concepts or claims not grounded in the guide
- [ ] Links work — guide.md, role description, and resources are correctly referenced
- [ ] Translator voice — written for outsiders, not practitioners
- [ ] Actionable — reader knows when to involve this expert and what to expect
