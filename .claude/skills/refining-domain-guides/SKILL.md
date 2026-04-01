---
name: refining-domain-guides
description: >
  Refines a domain's guide and overview based on review findings. Updates content
  to reflect current AI-native practice, fixes structural issues, and ensures
  guide-overview alignment. Requires a completed review as input.
  Triggers: "refine domain guide", "update domain guide", "improve domain guide",
  "apply review findings".
user-invocable: true
argument-hint: "<domain-name>"
---

# Refining Domain Guides

You are acting as the Intelligence Architect — refining a domain's guide and overview based on review findings. This skill takes the output of `reviewing-domain-guides` and applies the recommended changes.

## Prerequisites

A completed domain guide review must exist. Check `docs/reviews/` for the most recent review of the specified domain:

```
docs/reviews/domain-guide-review-<domain-name>.md
```

If no review exists, stop and tell the user to run `reviewing-domain-guides` first.

## Process

### Step 1: Read Current State

1. Read the review artifact
2. Read the current domain guide (`docs/guides/<domain-name>/guide.md`)
3. Read the current domain overview (`docs/guides/<domain-name>/README.md`)

### Step 2: Plan Changes

Organize the review's findings into:

**Must fix** — structural issues, factual errors, stale content that misrepresents current practice
**Should update** — AI-native currency gaps, missing perspectives, voice issues
**Consider** — enhancements that improve depth but aren't critical

Present the plan to the user before making changes. Wait for approval.

### Step 3: Refine the Guide

Apply changes to `docs/guides/<domain-name>/guide.md`:

**Preserve what works.** Do not rewrite sections the review rated as "Good" unless there is a specific reason. Stability matters — a guide that changes completely on every review loses its value as a reference.

**Update with intent.** For each change:
- What specifically is being changed
- Why (which review finding drives this)
- What the change achieves for the reader

**AI-native currency is the priority.** The most valuable refinements articulate:
- What practitioners in this domain do differently now compared to traditional practice
- What traditional practices have been retired and why
- What has replaced them in an AI-native workflow
- How the economics of building have changed the domain's priorities

**Maintain practitioner voice.** First person plural ("we"), authoritative but accessible, grounded in real scenarios.

**Respect scope boundaries.** Section 7 (Scope Boundaries) must describe what the domain covers and does not cover in terms of the work itself — never by naming specific other domains.

### Step 4: Update the Overview

After updating the guide, update `docs/guides/<domain-name>/README.md` to reflect any changes:

- Key concepts table must match guide terminology
- "What This Domain Is" must reflect any scope changes
- "How This Expert Helps" must reflect any practice changes
- Links must point to correct locations

The overview is derived from the guide. If the guide changed, the overview must stay aligned.

### Step 5: Update Resources if Needed

If the review or a concurrent library review identified resource changes:

- Add newly recommended works to the Resources section
- Remove references to works being dropped from the library
- Update annotations for accuracy
- Ensure Apprentice/Practitioner/Expert level tags are correct

### Step 6: Verify

After all changes:

- [ ] Guide passes structural completeness check (all 9 sections present and substantive)
- [ ] AI-native perspective is clear — reader knows what has changed and why
- [ ] Practitioner voice is consistent throughout
- [ ] Three-audience test: apprentice learns, adjacent expert orients, domain expert nods
- [ ] Scope boundaries describe the work, not other domains
- [ ] Resources are curated and annotated
- [ ] Overview is aligned with updated guide content
- [ ] No unintended changes to sections the review rated "Good"

## What NOT to Do

- Do not rewrite the entire guide. Refinement preserves and improves; it does not replace
- Do not add content the review did not identify as missing
- Do not change the domain's scope without explicit discussion and approval
- Do not introduce references to specific other domains in scope boundaries
- Do not remove content the review rated as working well
- Do not update the guide without also checking the overview for alignment
