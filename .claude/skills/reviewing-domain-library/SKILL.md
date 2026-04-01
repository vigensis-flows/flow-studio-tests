---
name: reviewing-domain-library
description: >
  Reviews the curated works (books, papers, standards) for a domain in the
  running expertise system. Evaluates collection quality, identifies duplication
  and supersession, assesses expertise level, and recommends additions or
  removals. Triggers: "review domain library", "audit domain books",
  "curate domain works", "check domain library quality".
user-invocable: true
argument-hint: "<domain-name>"
---

# Reviewing Domain Library

You are acting as the Intelligence Architect — reviewing the curated library of works for a domain. The library is the structural capital that backs the domain's expertise. It must represent the best available knowledge at an expert level.

## What You Are Reviewing

The works (books, papers, standards) associated with a domain in the running expertise system. These are not files in the repository — they live in the application database with embeddings in the vector store.

## Accessing the Library

1. Query the expertise system for all works associated with the specified domain. Use the running application's data access tools to retrieve:
   - Work titles, authors, publication dates
   - Work types (book, paper, standard, law)
   - Processing status (uploaded, embedded, indexed)
   - Work summary (one-liner for cards)
   - Any domain-specific relevance notes (domain_works.relevance_note)

2. Check work artifact completeness — for each work, verify:
   - Has a summary (works.summary) — the one-line description
   - Has an overview (work_overviews) — the 2-3 paragraph orientation
   - Has a deep dive (work_deep_dives) — the comprehensive analysis
   - Has metadata populated (authors, publication_date)
   - Has a relevance note for this domain (domain_works.relevance_note)

3. Read the domain guide's Resources section (`docs/guides/<domain-name>/guide.md`, section 8) to cross-reference what the guide recommends versus what the library contains.

## Review Dimensions

### 1. Expertise Level

This is an expert library. Every work should serve practitioners and experts, not beginners.

| Belongs | Does not belong |
|---------|-----------------|
| Seminal works that define the field | Introductory "for dummies" style guides |
| Authoritative practitioner references | Superficial overviews or summaries |
| Influential papers considered must-reads | Blog post compilations or listicles |
| Standards and specifications | Outdated editions when newer ones exist |
| Deep explorations of specific aspects | Works that merely survey the field |

Ask for each work: **Would a senior practitioner recommend this to a peer?** If the answer is "only to a junior" — it does not belong in an expert library.

### 2. Coverage

Does the collection cover the domain's key knowledge areas?

Map works against the domain guide's mental models and key concepts:

| Mental Model / Key Concept | Covered by which work(s)? | Gap? |
|---------------------------|--------------------------|------|
| [from guide] | [work title(s)] | [yes/no] |

Gaps mean the library is missing a perspective the guide considers essential.

### 3. Duplication and Supersession

Look for works that overlap significantly:

- **Full supersession:** An older work whose content is entirely covered (and improved upon) by a newer work. The older work adds nothing the newer one doesn't. **Recommend removal.**
- **Partial overlap with distinct value:** Two works cover similar ground but from different angles — one conceptual, one practical; or one comprehensive, one focused. **Both earn their place.**
- **Edition supersession:** An older edition of a work when a significantly updated newer edition exists. **Recommend replacing with the newer edition.**
- **Complementary coverage:** One book covers the concepts, another covers practical application of those same concepts. **Both have significant value — keep both.**

### 4. Collection Coherence

Do the works, taken together, form a coherent body of knowledge for the domain?

- Do they cover the domain's breadth without excessive overlap?
- Is there a logical progression from foundational to advanced?
- Do they represent diverse perspectives within the domain, or is one school of thought overrepresented?
- Are both timeless principles and current practice represented?

### 5. Currency and New Publications

Actively search (web search) for works published or updated in the last 3 years:

- **New books** in the domain — search for "[domain] books published [current year]" and "[domain] best books [previous year]"
- **New editions** of works already in the library — search for each title to check if a newer edition exists
- **Influential papers** or standards updates — search for recent publications that practitioners are citing
- **Updated standards** — check if specifications in the library are at their current version

This is not optional research — it is a required step. A library review that only evaluates existing works without checking for new publications is incomplete.

Flag:
- Works in the library that have been superseded by newer editions
- Significant new works that should be considered for addition
- Standards or specifications that are no longer current

### 6. Work Artifact Completeness

Each work in the library should have:

| Artifact | Purpose | Status check |
|----------|---------|-------------|
| **Summary** (works.summary) | One-line description for cards | Populated? |
| **Overview** (work_overviews) | 2-3 paragraph orientation | Exists? |
| **Deep dive** (work_deep_dives) | Comprehensive analysis | Exists? |
| **Metadata** (authors, publication_date) | Attribution and currency | Populated? |
| **Relevance note** (domain_works.relevance_note) | Why this work matters for this domain | Populated? |

A work without a summary, overview, or metadata is a half-processed asset. Flag works missing these artifacts and prioritize filling the gaps.

### 7. Guide-Library Alignment

Compare the domain guide's Resources section against the actual library:

- Works mentioned in the guide that are not in the library → gap
- Works in the library not mentioned in the guide → either the guide needs updating or the work's relevance should be questioned
- Annotations in the guide match the works' actual content and level

## Review Process

1. **Access** the domain's library data from the running expertise system (works, metadata, artifact completeness)
2. **Read** the domain guide's Resources section and Mental Models
3. **Map** works against the guide's knowledge areas
4. **Evaluate** each work against expertise level, coverage, duplication, and coherence
5. **Search** actively for new publications — books, editions, papers (web search, required)
6. **Assess** work artifact completeness (summary, overview, deep dive, metadata, relevance notes)
7. **Check** guide-library alignment
8. **Produce** the review artifact

## Review Report Structure

Save to `docs/reviews/domain-library-review-<domain-name>.md` (overwrites previous review — git tracks history):

```markdown
# Domain Library Review: <Domain Name>

**Date:** YYYY-MM-DD
**Works in library:** X
**Domain guide:** docs/guides/<domain-name>/guide.md

## Summary
[2-3 sentence overall assessment of library health]

## Current Collection

| # | Title | Author(s) | Year | Type | Level | Assessment |
|---|-------|-----------|------|------|-------|------------|
| 1 | [title] | [author] | [year] | [book/paper/standard] | [expert/practitioner] | [keep/remove/replace] |

## Coverage Map

| Domain Knowledge Area | Covered By | Gap? |
|----------------------|------------|------|
| [mental model / key concept] | [work title(s)] | [yes/no] |

## Findings

### Works to Keep
- [Title] — [why it earns its place]

### Works to Remove
- [Title] — [reason: superseded by X / below expertise level / outside domain scope]

### Works to Add
- [Title, Author, Year] — [why: fills gap in X / seminal recent work / authoritative on Y]

### Supersession Analysis
- [Older work] superseded by [newer work] — [what the newer work covers that makes the older one redundant]

### Complementary Pairs
- [Work A] + [Work B] — [how they complement each other: one conceptual, one practical / one broad, one deep]

## New Publications Search
- Search terms used: [list]
- New editions found: [list or none]
- Significant new works to consider: [list or none]
- Updated standards: [list or none]

## Artifact Completeness

| Work | Summary | Overview | Deep Dive | Metadata | Relevance Note |
|------|---------|----------|-----------|----------|----------------|
| [title] | [yes/no] | [yes/no] | [yes/no] | [yes/no] | [yes/no] |

**Completeness rate:** X/Y works fully documented

## Guide Alignment
- Works in guide but not in library: [list]
- Works in library but not in guide: [list]
- Recommendation: [update guide / question work relevance / both are correct]

## Recommendation
[Healthy / Needs curation / Needs significant expansion]

## Action Items
1. [Prioritized actions]
```

## Quality Checks

Before finishing, verify:

- [ ] All works in the library inventoried with artifact completeness
- [ ] Coverage mapped against domain guide's mental models and key concepts
- [ ] Each work assessed for expertise level
- [ ] Duplication and supersession analyzed
- [ ] Active web search performed for new publications (books, editions, papers)
- [ ] Work artifact completeness assessed (summary, overview, deep dive, metadata, relevance notes)
- [ ] Guide-library alignment checked
- [ ] Recommendations are specific with clear rationale
- [ ] No target number imposed — collection size follows from quality and coverage needs
- [ ] Report saved to `docs/reviews/`
