---
name: preparing-flow
description: Prepares structured input for a new Flow by researching a reference product. Analyzes the product (via codebase or website), researches competitors, gathers user voice, and identifies opportunities. Use when starting a Flow from an existing product rather than user-provided input.
---

# Preparing Flow Input

Researches a reference product to create structured input files for MVP discovery. This is how we bootstrap a new Flow when starting from an existing product in the market.

## Prime Directive

**Research to find opportunity, not to copy.**

We study reference products as windows into a market space. The goal is understanding the problem domain, competitive landscape, user needs, and opportunities to do something different or better. The output feeds into Product Trio discovery.

## When to Use

Use this skill when:
- Starting a new Flow from an existing product (competitor, inspiration, or market leader)
- User provides a repository URL or product website URL as the starting point
- Want to understand a market space before building something in it
- Need structured input for `creating-mvp` or `understanding-mvp`

Do NOT use when:
- User provides their own input files (use `processing-mvp-input` instead)
- Just exploring a codebase for learning (use normal exploration)
- Doing ongoing competitive monitoring (this is a one-time bootstrap)

## Determining Source Type

Before starting, determine what you're working with:

**Code Repository** (e.g., GitHub URL, local path to cloned repo):
- Can see actual implementation, data models, complexity
- Higher confidence on what they actually built
- May have less marketing context

**Product Website** (e.g., company URL, product landing page):
- See their positioning, messaging, pricing
- Can explore docs, try the product (if possible)
- Lower confidence on implementation details

**How to detect:**
- GitHub/GitLab/Bitbucket URLs → Code repository
- URLs ending in `.git` → Code repository
- Local paths with code files → Code repository
- Everything else → Product website

The process adapts based on source type, but converges on the same research steps and output.

---

## Process Overview

```
REFERENCE PRODUCT (URL or path)
    ↓
Step 1: Orientation
    ↓
Step 2: Product Analysis (adapts to source type)
    ↓
Step 3: Competitive Scan
    ↓
Step 4: User Voice Research
    ↓
Step 5: UX Assessment
    ↓
Step 6: Opportunity Synthesis
    ↓
Step 7: Documentation
    ↓
OUTPUT: 7 structured files in input/
```

---

## Step 1: Orientation

**Goal:** Understand what we're researching and why.

**Actions:**
1. Identify the reference product (name, URL, type)
2. Determine source type (code or website)
3. Understand the research intent:
   - Competitor to beat?
   - Product to learn from?
   - Window into a market space?
4. Note any specific focus areas the user mentioned

**Output:** Mental model of what we're doing and why.

**Questions to answer:**
- What is this product?
- Who makes it?
- Why are we studying it?
- What should we pay special attention to?

---

## Step 2: Product Analysis

This step adapts based on source type.

### If Code Repository:

**Goal:** Understand what they actually built, how they think about the problem.

**Actions:**

1. **High-level orientation:**
   - README.md - the "why" and positioning
   - docs/ folder - architecture, guides, decisions
   - CHANGELOG.md - evolution and priorities
   - Package files (package.json, mix.exs, etc.) - identity and dependencies

2. **Product understanding:**
   - Marketing copy, about pages, taglines
   - Onboarding flows (reveal what they think users need)
   - Feature organization, pricing tiers (if present)
   - User roles and permissions (reveal segments)

3. **Design extraction:**
   - Route structure → User journeys
   - UI components → Interaction patterns
   - Error handling → Edge cases considered
   - Navigation → Information architecture

4. **Technical extraction:**
   - Data models / schemas → Domain concepts
   - API endpoints → External interfaces
   - Config files → External services required
   - Complex code sections → Hard problems solved
   - Comments explaining "why" → Lessons learned

**Key principle:** Extract the IDEA, not the IMPLEMENTATION. Focus on what problem they solved and how they thought about it, not their specific code.

### If Product Website:

**Goal:** Understand their positioning, capabilities, and user experience.

**Actions:**

1. **Marketing analysis:**
   - Homepage messaging and value propositions
   - Feature pages and capability descriptions
   - Pricing page (tiers, limits, positioning)
   - About/company page (mission, team, funding)
   - Case studies and testimonials

2. **Documentation exploration:**
   - Product docs (reveals actual capabilities)
   - API docs (reveals technical approach)
   - Help center (reveals common user problems)
   - Changelog/release notes (reveals priorities)

3. **Product exploration (if possible):**
   - Create a free account (if available)
   - Go through onboarding
   - Explore core workflows
   - Note friction points and UX patterns
   - Take screenshots of key screens

   **If blocked by bot detection or paywalls:**
   - Document what you couldn't access
   - Proceed with other sources
   - Note in research-meta.md

4. **Technical signals:**
   - Technology stack (often visible in job postings, docs)
   - Integration partners (reveals ecosystem)
   - API capabilities (reveals technical depth)

**Handling access issues:**
- If Playwright/browser access is blocked, fall back to public information
- If signup requires payment, document this and skip product exploration
- Never fabricate information you couldn't access

---

## Step 3: Competitive Scan

**Goal:** Understand the competitive landscape and positioning.

**Actions:**

1. **Identify top 3 competitors:**
   - Direct competitors (same problem, same market)
   - Adjacent products (similar capabilities, different market)
   - Note any mentioned by the reference product

2. **For each competitor, gather:**
   - Name and URL
   - Core value proposition (from their homepage)
   - Target audience
   - Pricing model (free tier, price points)
   - Key differentiators (what they emphasize)

3. **Map the landscape:**
   - How do they position against each other?
   - What dimensions do they compete on? (price, features, ease of use, etc.)
   - Where are the gaps?

**Sources:**
- Competitor websites
- G2, Capterra, Product Hunt comparisons
- Industry reports (if findable)
- "Alternatives to X" articles

**Do NOT use:**
- Low-quality SEO comparison sites
- Outdated information (check dates)
- Sponsored/affiliate content (biased)

---

## Step 4: User Voice Research

**Goal:** Understand what real users say - praise, complaints, and wishes.

**Actions:**

1. **Review platforms:**
   - G2, Capterra (B2B products)
   - Product Hunt (launches, early feedback)
   - App Store / Play Store (mobile apps)
   - Chrome Web Store (browser extensions)

2. **Community discussions:**
   - Reddit (search for product name)
   - Hacker News (search and comments)
   - Twitter/X (search for mentions)
   - Product-specific forums or Slack/Discord

3. **Extract themes:**
   - What do users love? (retention drivers)
   - What do users hate? (churn drivers, opportunities)
   - What do users ask for? (feature gaps)
   - What surprises users? (unexpected value or friction)

4. **Quantify where possible:**
   - Overall ratings (G2, Capterra scores)
   - Common complaint frequency
   - Sentiment patterns

**Quality filters:**
- Prefer detailed reviews over star-only ratings
- Look for patterns across multiple sources
- Note recency (recent reviews > old reviews)
- Be skeptical of extremes (5-star and 1-star may be biased)

---

## Step 5: UX Assessment

**Goal:** Evaluate the user experience - strengths and weaknesses.

**Actions:**

### If we accessed the product (Step 2):

Evaluate through these lenses:

1. **Onboarding friction:**
   - How many steps to first value?
   - What information is required?
   - How long does it take?

2. **Core workflow usability:**
   - Is the primary task flow clear?
   - Where does cognitive load spike?
   - What's confusing or unclear?

3. **Information architecture:**
   - Can users find what they need?
   - Does navigation match mental models?
   - Is labeling clear and consistent?

4. **Error handling:**
   - How are errors communicated?
   - Can users recover from mistakes?
   - Are edge cases handled gracefully?

5. **Accessibility baseline:**
   - Keyboard navigation possible?
   - Reasonable contrast and readability?
   - Mobile experience (if applicable)?

### If we couldn't access the product:

Infer from other sources:

1. **From reviews:** What UX issues do users mention?
2. **From screenshots:** What can we observe about the interface?
3. **From docs:** How do they explain workflows? Complex = likely complex UX.
4. **From competitors:** How do alternatives compare on UX?

**Document confidence level** based on access.

---

## Step 6: Opportunity Synthesis

**Goal:** Identify where we can do something different or better.

**Actions:**

1. **Gap analysis:**
   - What pain points aren't addressed?
   - What user segments are underserved?
   - What features are requested but missing?

2. **Differentiation angles:**
   - Where is the UX weak? (usability opportunity)
   - Where is pricing problematic? (value opportunity)
   - Where is the product bloated? (simplicity opportunity)
   - Where are there privacy/security concerns? (trust opportunity)

3. **Beachhead candidates:**
   - Which user segment is most underserved?
   - Which use case has the highest friction?
   - Where could we win decisively with focus?

4. **Strategic considerations:**
   - What would it take to compete here?
   - What are the barriers to entry?
   - What's defensible long-term?

**This is analysis, not decision.** Document opportunities for the Trio to evaluate during discovery.

---

## Step 7: Documentation

**Goal:** Create the 7 output files in `input/`.

Create each file according to the templates below. Ensure:
- Clear separation between facts and analysis
- Sources cited for claims
- Confidence levels noted
- Gaps explicitly documented

---

## Output Structure

All files go in the `input/` folder of the new Flow:

```
input/
├── 1-problem-and-opportunity.md   # Why this space? What gap exists?
├── 2-users-and-needs.md           # Who are the users? What do they need?
├── 3-competitive-landscape.md     # Who plays here? How positioned?
├── 4-product-intelligence.md      # What does the reference product do?
├── 5-user-voice.md                # What do real users say?
├── 6-differentiation-analysis.md  # Where can we win?
└── 7-research-meta.md             # Sources, confidence, gaps
```

---

## File Templates

### 1-problem-and-opportunity.md

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
[Competitor to beat / Product to learn from / Market to enter]

### Specific Interest Areas
[Any focus areas noted at the start]

## Unknown

[What couldn't we determine about the problem/opportunity?]
```

### 2-users-and-needs.md

```markdown
# Users and Needs

## Primary User Types

### [User Type 1: e.g., "Product Managers"]

**Role:** [What they do]

**Goals:**
- [Goal 1]
- [Goal 2]

**Pain Points:**
- [Pain 1] (Source: [where found])
- [Pain 2] (Source: [where found])

**Jobs to Be Done:**
- When [situation], I want to [motivation], so I can [outcome]

### [User Type 2]

[Same structure...]

## User Segments

### By Company Size
- **Startups:** [How they differ]
- **SMB:** [How they differ]
- **Enterprise:** [How they differ]

### By Technical Sophistication
- **Non-technical:** [Needs and constraints]
- **Technical:** [Needs and constraints]

### By Use Case
[If different use cases have different user profiles]

## Underserved Segments

[Which user types seem least well-served by existing solutions?]

- [Segment 1]: [Why underserved]
- [Segment 2]: [Why underserved]

## Unknown

[What couldn't we determine about users?]
```

### 3-competitive-landscape.md

```markdown
# Competitive Landscape

## Reference Product

**Name:** [Product name]
**URL:** [URL]
**Category:** [How they position themselves]

### Positioning
[How they describe themselves, their tagline, core message]

### Target Market
[Who they're selling to]

### Pricing
| Tier | Price | Key Limits |
|------|-------|------------|
| Free | $0 | [limits] |
| Pro | $X/mo | [limits] |
| Enterprise | Custom | [features] |

### Strengths
- [Strength 1]
- [Strength 2]

### Weaknesses
- [Weakness 1] (Source: [reviews, observation, etc.])
- [Weakness 2]

---

## Competitor 1: [Name]

**URL:** [URL]
**Positioning:** [Their core message]

### How They Differentiate
[What they emphasize vs. the reference product]

### Pricing Comparison
[How pricing compares]

### Strengths
- [Strength 1]

### Weaknesses
- [Weakness 1]

---

## Competitor 2: [Name]

[Same structure...]

---

## Competitor 3: [Name]

[Same structure...]

---

## Landscape Map

### Competition Dimensions
Products in this space compete on:
1. [Dimension 1: e.g., "Price"]
2. [Dimension 2: e.g., "Ease of use"]
3. [Dimension 3: e.g., "Feature depth"]

### Positioning Gaps
[Where is no one positioned? What combinations are missing?]

### Market Dynamics
[Is the market consolidating? Fragmenting? Growing?]

## Unknown

[What couldn't we determine about the competitive landscape?]
```

### 4-product-intelligence.md

```markdown
# Product Intelligence

## Overview

**Product:** [Name]
**Type:** [Web app / Mobile app / API / Platform / etc.]
**Source:** [Code repository / Website exploration / Both]

## Core Capabilities

### Primary Features
| Feature | Description | Maturity |
|---------|-------------|----------|
| [Feature 1] | [What it does] | [Core / Growing / New] |
| [Feature 2] | [What it does] | [Core / Growing / New] |

### Feature Categories
[How they organize their capabilities]

## User Experience

### Onboarding Flow
[How users get started]
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Time to first value:** [Estimate]
**Friction points:** [What's hard about getting started]

### Primary User Journeys

#### [Journey 1: e.g., "Creating a report"]
**Goal:** [What the user wants to achieve]
**Flow:** [Step-by-step]
**Pain points observed:** [Where it's hard]

#### [Journey 2]
[Same structure...]

### UX Patterns
- **Navigation:** [How users move around]
- **Data entry:** [How users input information]
- **Feedback:** [How the system communicates]

### UX Strengths
- [Strength 1]
- [Strength 2]

### UX Weaknesses
- [Weakness 1]
- [Weakness 2]

## Technical Approach

### Domain Concepts
[The fundamental "nouns" of the system]

| Concept | Description | Relationships |
|---------|-------------|---------------|
| [Concept 1] | [What it represents] | [How it connects] |
| [Concept 2] | [What it represents] | [How it connects] |

### External Dependencies
[What external services/capabilities does it need?]

| Capability | Purpose |
|------------|---------|
| [e.g., Email delivery] | [Why needed] |
| [e.g., Payment processing] | [Why needed] |

### Complexity Areas
[Where did they invest significant effort?]

- **[Area 1]:** [What's complex about it, what we can learn]
- **[Area 2]:** [What's complex about it, what we can learn]

## Business Model

### Monetization
[How do they make money?]

### Free Tier Strategy
[What's free? What's the hook?]

### Upsell Triggers
[What drives upgrades?]

## Unknown

[What couldn't we determine about the product?]
```

### 5-user-voice.md

```markdown
# User Voice

## Overall Sentiment

**Average Rating:** [X.X/5 across N reviews]
**Primary Sources:** [G2, Capterra, Product Hunt, etc.]

### Sentiment Summary
[2-3 sentence summary of overall user sentiment]

## What Users Love

### Theme 1: [e.g., "Ease of setup"]
**Frequency:** [Common / Occasional / Rare]

Representative quotes:
> "[Actual user quote]" - [Source]
> "[Actual user quote]" - [Source]

### Theme 2: [e.g., "All-in-one value"]
[Same structure...]

### Theme 3
[Same structure...]

## What Users Hate

### Theme 1: [e.g., "Pricing complexity"]
**Frequency:** [Common / Occasional / Rare]
**Severity:** [Dealbreaker / Frustrating / Minor]

Representative quotes:
> "[Actual user quote]" - [Source]
> "[Actual user quote]" - [Source]

**Opportunity signal:** [What this suggests we could do better]

### Theme 2: [e.g., "Learning curve"]
[Same structure...]

### Theme 3
[Same structure...]

## What Users Request

### Feature Request 1: [e.g., "Better reporting"]
**Frequency:** [How often requested]
**Current state:** [How product addresses it now, if at all]

### Feature Request 2
[Same structure...]

## Comparison Mentions

[When users compare to alternatives, what do they say?]

- vs. [Competitor 1]: "[What users say about the comparison]"
- vs. [Competitor 2]: "[What users say about the comparison]"

## Support Experience

[What do users say about getting help?]

- Documentation quality: [Good / Mixed / Poor]
- Response times: [Fast / Average / Slow]
- Common support issues: [What users need help with]

## Review Sources

| Source | Reviews Analyzed | Date Range |
|--------|------------------|------------|
| G2 | N | [range] |
| Capterra | N | [range] |
| [Other] | N | [range] |

## Unknown

[What couldn't we determine from user voice?]
```

### 6-differentiation-analysis.md

```markdown
# Differentiation Analysis

## Opportunity Summary

[2-3 sentence summary of the key opportunity we see]

## Gap Analysis

### Unaddressed Pain Points

| Pain Point | Evidence | Opportunity |
|------------|----------|-------------|
| [Pain 1] | [Where we found this] | [How we could address it] |
| [Pain 2] | [Where we found this] | [How we could address it] |

### Underserved Segments

| Segment | Why Underserved | Opportunity |
|---------|-----------------|-------------|
| [Segment 1] | [Evidence] | [How we could serve them] |
| [Segment 2] | [Evidence] | [How we could serve them] |

### Missing Capabilities

| Capability | User Need | Current Gap |
|------------|-----------|-------------|
| [Capability 1] | [Why users want it] | [Why it's not well-served] |
| [Capability 2] | [Why users want it] | [Why it's not well-served] |

## Differentiation Angles

### Angle 1: [e.g., "Simplicity"]
**Thesis:** [The core idea]
**Evidence:** [Why we think this could work]
**Trade-offs:** [What we'd give up]
**Risk:** [What could go wrong]

### Angle 2: [e.g., "Privacy-first"]
[Same structure...]

### Angle 3: [e.g., "Vertical focus"]
[Same structure...]

## Beachhead Candidates

### Candidate 1: [e.g., "Small marketing teams"]
**Why this segment:**
- [Reason 1: underserved, accessible, etc.]
- [Reason 2]

**Entry strategy:**
- [How we'd reach them]
- [What we'd emphasize]

**Expansion path:**
- [Where we'd go after winning this segment]

### Candidate 2
[Same structure...]

## Strategic Considerations

### Barriers to Entry
- [Barrier 1: e.g., "Network effects"]
- [Barrier 2: e.g., "Integration ecosystem"]

### Defensibility Options
- [What could make our position defensible]

### Key Risks
- [Risk 1]
- [Risk 2]

## Recommendations for Discovery

Questions the Product Trio should explore:

1. [Question 1 - e.g., "Is the simplicity angle viable given the complexity of the problem?"]
2. [Question 2]
3. [Question 3]

## Unknown

[What couldn't we determine about differentiation opportunities?]
```

### 7-research-meta.md

```markdown
# Research Metadata

## Research Overview

**Reference Product:** [Name]
**Research Date:** YYYY-MM-DD
**Source Type:** [Code repository / Product website / Both]
**Research Intent:** [Why we studied this product]

## Sources Used

### Primary Sources
| Source | Type | Access Level | Notes |
|--------|------|--------------|-------|
| [URL/path] | [Code/Website/Reviews] | [Full/Partial/Blocked] | [Any issues] |

### Review Sources
| Platform | Reviews Analyzed | Date Range |
|----------|------------------|------------|
| [Platform] | N | [range] |

### Secondary Sources
- [Articles, reports, discussions referenced]

## Access Issues

### What We Couldn't Access
| Resource | Why Blocked | Impact |
|----------|-------------|--------|
| [Resource] | [Reason] | [How it affects confidence] |

### Workarounds Used
[How we compensated for access limitations]

## Confidence Assessment

| File | Confidence | Rationale |
|------|------------|-----------|
| 1-problem-and-opportunity.md | [High/Medium/Low] | [Why] |
| 2-users-and-needs.md | [High/Medium/Low] | [Why] |
| 3-competitive-landscape.md | [High/Medium/Low] | [Why] |
| 4-product-intelligence.md | [High/Medium/Low] | [Why] |
| 5-user-voice.md | [High/Medium/Low] | [Why] |
| 6-differentiation-analysis.md | [High/Medium/Low] | [Why] |

## Assumptions Made

| Assumption | Basis | Confidence |
|------------|-------|------------|
| [Assumption 1] | [Why we assumed this] | [High/Med/Low] |
| [Assumption 2] | [Why we assumed this] | [High/Med/Low] |

## Information Gaps

### Critical Gaps
[Information that would significantly change our understanding]

- [Gap 1]: [Why it matters]
- [Gap 2]: [Why it matters]

### Nice-to-Have
[Information that would add depth but isn't critical]

- [Gap 1]
- [Gap 2]

## Recommendations for Trio

Before starting discovery, consider investigating:

1. [Recommendation 1 - what and why]
2. [Recommendation 2 - what and why]

## Research Quality

**Overall confidence:** [High / Medium / Low]
**Key limitation:** [The biggest constraint on this research]
**Strongest section:** [Where we have best information]
**Weakest section:** [Where we have least information]
```

---

## Tool Usage

### For Code Analysis
- Use Read tool to examine files
- Use Grep to search for patterns
- Use Glob to find relevant files
- Focus on README, docs, models, routes, config

### For Website Research
- Use WebFetch for public pages
- Use Playwright (mcp__playwright__*) for interactive exploration
- Use WebSearch for finding reviews, discussions, articles

### For User Voice
- Use WebSearch to find review platforms
- Use WebFetch to read reviews (respect rate limits)
- Search Reddit, HN, Twitter for discussions

### Handling Blocks
If access is blocked:
1. Document the block in research-meta.md
2. Try alternative sources
3. Note reduced confidence
4. Continue with available information

---

## Quality Checklist

Before completing:

- [ ] All 7 output files created
- [ ] Source type correctly identified and process adapted
- [ ] At least 3 competitors researched
- [ ] User voice gathered from multiple sources
- [ ] Opportunities are analysis, not just restated problems
- [ ] Beachhead candidates identified with rationale
- [ ] Confidence levels noted throughout
- [ ] Gaps explicitly documented
- [ ] Sources cited for claims
- [ ] Output is useful for Trio discovery

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Copying features** | We want opportunities, not clones | Focus on gaps and differentiation |
| **Shallow research** | Missing critical context | Use multiple sources, dig deeper |
| **Fabrication** | Inventing information | Mark unknowns, cite sources |
| **No analysis** | Just facts, no insight | Synthesis step must identify opportunities |
| **Ignoring blocks** | Pretending we have info we don't | Document access issues honestly |
| **Single source** | Biased or incomplete picture | Cross-reference multiple sources |
| **Outdated info** | Market has moved on | Check dates, prefer recent sources |

---

## Usage in Flow Creation

This skill is the starting point when bootstrapping from a reference product:

```
REFERENCE PRODUCT (URL)
    ↓
[preparing-flow]
    ↓
input/ (7 structured files)
    ↓
[understanding-mvp] or [creating-mvp]
    ↓
Product Trio Discovery
```

The structured input files become the foundation for the Trio's discovery work.
