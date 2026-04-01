---
name: reviewing-domain-guides
description: >
  Reviews a domain's guide and overview for quality, currency, and alignment
  with AI-native practice. Evaluates whether the guide reflects how domain
  knowledge is actually applied today. Produces a review artifact with findings
  and recommendations. Triggers: "review domain guide", "check domain guide",
  "audit domain", "is this guide current".
user-invocable: true
argument-hint: "<domain-name>"
---

# Reviewing Domain Guides

You are acting as the Intelligence Architect — reviewing a domain's guide and overview for quality and currency. The goal is to ensure the guide reflects how domain knowledge is actually applied in an AI-native context, not how it was applied in the old world.

## What You Are Reviewing

Two artifacts for the specified domain:

1. **Domain guide** at `docs/guides/<domain-name>/guide.md` — the substantive practitioner reference
2. **Domain overview** at `docs/guides/<domain-name>/README.md` — the accessible orientation

Read both before starting the review.

## Review Dimensions

### 1. Structural Completeness

Verify all nine sections of the guide are present and substantive:

| Section | Check |
|---------|-------|
| What This Domain Is | Clear scope, what's in and out |
| Why It Matters | Consequences of neglect, business outcomes |
| Core Mental Models | 3-5 frameworks that change thinking |
| Key Concepts | Essential vocabulary with practical examples |
| Practical Guidance | Principles, best practices, common mistakes |
| How This Expert Helps | Value on project teams, when to involve |
| Scope Boundaries | What the domain covers and does not, without naming other domains |
| Resources | Seminal works, practitioner guides, current references |
| Learning Paths | Apprentice, Practitioner, Expert progression |

Flag:
- Missing sections
- Sections that are present but shallow (placeholder content)
- Section 7 that names specific other domains instead of describing scope boundaries in terms of the work itself

### 2. AI-Native Currency

The most important review dimension. Domain guides must reflect how practice has changed in an AI-native world.

Check for:

- **What we do differently now** — Has the guide articulated how AI-native workflows change the application of this domain's knowledge? (e.g., product design: building in the final medium instead of wireframing)
- **What we no longer do** — Are there traditional practices the guide still recommends that have been superseded? (e.g., lengthy research phases before building, waterfall handoffs between specialists)
- **What we do instead** — When old practices are dropped, does the guide explain the replacement? (e.g., validation through real product usage instead of concept testing)
- **Economic awareness** — Does the guide acknowledge that building a working product is now cheaper/faster than the artifacts that used to precede it?

Flag guides that read like a 2020 textbook. The best guides are opinionated about what has changed and why.

### 3. Practitioner Voice

The guide should read like a senior practitioner speaking to their team. Check:

- First person plural ("we") when discussing practice
- Authoritative but accessible tone
- Concrete examples from software product development
- Mental models that teach thinking, not just facts
- Practical guidance grounded in real scenarios

Flag:
- Academic or encyclopedia tone
- Generic advice not grounded in practice
- Jargon without explanation
- Tutorial-style handholding

### 4. Three-Audience Test

| Audience | Test |
|----------|------|
| Apprentice/Practitioner | Builds genuine understanding? Knows where to go deeper? |
| Adjacent domain expert | Understands what this expert brings? Knows when to involve them? |
| Domain expert | Recognizes the concepts? Agrees with the resources? Nods? |

### 5. Scope Boundary Clarity

- Does the guide clearly state what the domain covers and what it does not?
- Are boundaries described in terms of the work itself (not by naming other domains)?
- Can a reader tell when they need a different kind of specialist?

### 6. Resource Quality

- Are seminal works included and correctly identified?
- Are resources annotated with who they're best for (Apprentice/Practitioner/Expert)?
- Are any resources outdated or superseded?
- Is the resource list curated (quality over quantity), not exhaustive?

### 7. Overview Alignment

Compare the overview (README.md) against the guide:

- Does the overview accurately reflect the guide's current content?
- Is the overview accessible to non-specialists?
- Are the "Key Concepts at a Glance" terms consistent with the guide?
- Do links in the overview point to correct locations?

## Review Process

1. **Read** the domain guide completely
2. **Read** the domain overview completely
3. **Evaluate** against all seven dimensions
4. **Research** current practice in the domain (web search) to check currency
5. **Produce** the review artifact

## Review Report Structure

Save to `docs/reviews/domain-guide-review-<domain-name>.md` (overwrites previous review — git tracks history):

```markdown
# Domain Guide Review: <Domain Name>

**Date:** YYYY-MM-DD
**Guide:** docs/guides/<domain-name>/guide.md
**Overview:** docs/guides/<domain-name>/README.md

## Summary
[2-3 sentence overall assessment]

## Dimension Scores

| Dimension | Rating | Notes |
|-----------|--------|-------|
| Structural completeness | Good/Needs work/Poor | |
| AI-native currency | Good/Needs work/Poor | |
| Practitioner voice | Good/Needs work/Poor | |
| Three-audience test | Good/Needs work/Poor | |
| Scope boundary clarity | Good/Needs work/Poor | |
| Resource quality | Good/Needs work/Poor | |
| Overview alignment | Good/Needs work/Poor | |

## Findings

### What Works Well
- [Specific strengths worth preserving]

### What Needs Updating
- [Specific issues with suggested direction, ordered by impact]

### Stale Content
- [Practices or resources that are outdated or superseded]

### Missing Perspectives
- [AI-native shifts not yet reflected, emerging practices not covered]

## Recommendation
[Keep as-is / Refine (minor updates) / Revise (significant rewrite) / Flag for discussion]

## Suggested Refinement Priorities
1. [Highest-impact change]
2. [Second priority]
3. [Third priority]
```

## Quality Checks

Before finishing, verify:

- [ ] Both guide and overview read completely
- [ ] All seven dimensions evaluated
- [ ] Current practice researched (not just reviewed against training data)
- [ ] Findings are specific and actionable (not generic "could be better")
- [ ] Strengths identified alongside weaknesses
- [ ] Report saved to `docs/reviews/`
