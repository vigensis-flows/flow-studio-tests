---
name: reviewing-expertise-system
description: >
  Reviews the expertise system's domain landscape for structural health. Applies
  domain governance principles to audit existing domains, identify gaps, detect
  overlaps, and recommend changes. Use when evaluating the domain map, considering
  new domains, or performing periodic expertise system health checks.
  Triggers: "review expertise system", "audit domains", "domain health check",
  "do we need a new domain", "are our domains right".
user-invocable: true
argument-hint: "[focus: all | gaps | overlaps | specific-domain]"
---

# Reviewing Expertise System

You are acting as the Intelligence Architect — reviewing the structural health of the expertise system's domain landscape. This is a meta-level review: not the content of individual guides, but whether the right domains exist with the right boundaries.

## When This Review Matters

- Before creating a new domain (is it genuinely needed?)
- Periodically (quarterly) to catch drift, gaps, and obsolescence
- When agents exist without domains, or domains exist without active use
- After significant changes to the product lifecycle or organizational strategy
- When domain boundaries feel unclear or contested

## The Domain Principle

A domain exists when there is a **distinct body of knowledge** that produces an **irreducible perspective**. Three tests, all must pass:

| Test | Question |
|------|----------|
| **Knowledge corpus** | Does it have its own authoritative sources, mental models, and frameworks substantively different from adjacent domains? |
| **Perspective uniqueness** | Does it see things other domains structurally cannot — not "chooses not to" but *cannot*? |
| **Lifecycle span** | Is this perspective needed across multiple phases of the software product lifecycle? |

### Supplementary Tests

**Independence test:** Can this perspective produce standalone deliverables, or does its output only have value when integrated with another domain's work? If the latter, it is a skill.

**Bias test:** If exercising this capability as a skill within another domain would systematically distort the output through that domain's biases, the independence is the value — and independence requires a domain.

### What Domains Are NOT

- Job titles (Frontend Developer, Backend Developer — same engineering corpus)
- Process steps (requirements gathering — an activity, not a body of knowledge)
- Tool proficiencies (Java vs C# — same mental models, different syntax)
- Subspecialties that only integrate (UX research only produces value inside design decisions — skill within product design)

## Review Process

### Step 1: Inventory Current State

1. List all domains in `docs/guides/` (each subdirectory is a domain)
2. List all agents in `.claude/agents/` and their `domain:` frontmatter field
3. Identify mismatches:
   - Agents with domains that have no published guide
   - Domains with guides but no active agent
   - Agents with no domain field

### Step 2: Apply the Three Tests to Each Domain

For each existing domain, evaluate:

| Domain | Corpus? | Perspective? | Span? | Verdict |
|--------|---------|-------------|-------|---------|
| [name] | [yes/no + reasoning] | [yes/no + reasoning] | [yes/no + reasoning] | [keep/merge/reclassify] |

Flag domains that:
- Fail any test — candidate for reclassification as skill within another domain
- Overlap significantly with another domain — candidate for merge
- Have drifted in scope from their guide — candidate for guide update

### Step 3: Identify Gaps

Consider the full software product lifecycle:

1. **Idea and research** — market analysis, problem validation, competitive landscape
2. **Product definition** — vision, strategy, design, architecture
3. **Concept validation** — expert reviews, feasibility, risk assessment
4. **Build** — engineering, quality assurance, security, privacy
5. **Go-to-market** — marketing, sales, brand, content
6. **Evolution** — user insights, iteration, measurement
7. **Maintenance** — reliability, operations, modernization
8. **Business** — modeling, licensing, compliance, venture building

For each phase, ask: is there a perspective needed here that no current domain covers? Apply the three tests to any candidate.

### Step 4: Assess Agent-Domain Alignment

For agents without a domain that passes the three tests:
- Is the agent's perspective a skill that should live within an existing domain?
- Should the agent exist without a domain (operational capability, not knowledge stewardship)?
- Should a new domain be created?

### Step 5: Produce Review Artifact

Save the review to `docs/reviews/expertise-system-review.md` (overwrites previous review — git tracks history).

## Review Report Structure

```markdown
# Expertise System Review — YYYY-MM-DD

## Current State
- X domains with published guides
- Y agents mapped to domains
- Z agents without published domain guides

## Domain Health

### Domains That Pass All Tests
| Domain | Notes |
|--------|-------|
| [name] | [brief observation] |

### Domains to Watch
| Domain | Concern | Recommendation |
|--------|---------|----------------|
| [name] | [specific concern] | [action] |

### Domains to Reclassify
| Domain | Reason | Absorb Into |
|--------|--------|-------------|
| [name] | [fails which test] | [target domain] |

## Gap Analysis

### Missing Perspectives
| Candidate | Corpus | Perspective | Span | Independence | Recommendation |
|-----------|--------|-------------|------|-------------|----------------|
| [name] | [assessment] | [assessment] | [assessment] | [assessment] | [create/skill/skip] |

## Agent Alignment

### Agents Without Domains
| Agent | Current domain field | Assessment | Recommendation |
|-------|---------------------|------------|----------------|
| [name] | [value] | [skill or domain?] | [action] |

## Recommendations
1. [Prioritized action items]

## Next Review
[Suggested date or trigger]
```

## Quality Checks

Before finishing, verify:

- [ ] Every existing domain evaluated against all three tests
- [ ] Lifecycle phases checked for gaps
- [ ] Agent-domain alignment assessed
- [ ] Recommendations are specific and actionable
- [ ] Report saved to `docs/reviews/`
- [ ] No domain recommended for creation without passing all three tests plus supplementary tests
