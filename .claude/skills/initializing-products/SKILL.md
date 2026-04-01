---
name: initializing-products
description: Initializes structured input for a new Product by researching a reference product or synthesizing from a name and description. Supports three source types — code repository, product website, or name+description only. Analyzes the source, researches competitors, gathers user voice, and identifies opportunities.
---

# Initializing Product Input

Researches a reference product (or synthesizes from a description) to create structured input files for product discovery. This is how we bootstrap a new Product when starting from an existing product in the market or from a product idea.

## Prime Directive

**Research to find opportunity, not to copy.**

We study reference products as windows into a market space. The goal is understanding the problem domain, competitive landscape, user needs, and opportunities to do something different or better. The output feeds into Product Trio discovery.

## When to Use

Use this skill when:
- Starting a new Product from an existing product (competitor, inspiration, or market leader)
- User provides a repository URL or product website URL as the starting point
- User provides only a name and description and wants AI-assisted initialization
- Want to understand a market space before building something in it
- Need structured input for `creating-mvp` or `understanding-mvp`

Do NOT use when:
- User provides their own input files (use `processing-provided-materials` instead)
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

**Name + Description Only** (no URL provided):
- Starting from a product idea rather than an existing reference
- Research relies entirely on web search based on the name and description
- Infer the problem space, identify existing players, find opportunity angles
- Output files will be thinner but follow the same structure

**How to detect:**
- GitHub/GitLab/Bitbucket URLs → Code repository
- URLs ending in `.git` → Code repository
- Local paths with code files → Code repository
- HTTP/HTTPS URLs to non-git hosts → Product website
- No URL provided → Name + Description only

The process adapts based on source type, but converges on the same research steps and output.

## Inputs

**Required:**
- **Source**: A code repository URL, product website URL, or product name (+ optional description)
- **Output Directory**: Where to write the output files

**Optional:**
- **Preparation Instruction**: Additional guidance from the user (e.g., "Use Elixir/Phoenix", "Focus on the European market", "Target B2B SaaS"). When provided, carry this instruction through the entire research process — it should influence orientation, competitive analysis, user voice research, and opportunity synthesis. Reflect it in the output files where relevant.

---

## Process Overview

```
SOURCE (URL, path, or name+description)
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
Step 8: Executive Summary
    ↓
OUTPUT: 8 structured files + executive summary in input/
```

---

## Step 1: Orientation

**Goal:** Understand what we're researching and why.

**Actions:**
1. Identify the reference product (name, URL, type) — or the product idea (name, description)
2. Determine source type (code, website, or name+description)
3. Check for a Preparation Instruction — if provided, it guides the entire research (tech stack, market focus, constraints)
4. Understand the research intent:
   - Competitor to beat?
   - Product to learn from?
   - Window into a market space?
   - New idea to explore?
5. Note any specific focus areas from the user or preparation instruction

**Output:** Mental model of what we're doing and why.

**Questions to answer:**
- What is this product (or product idea)?
- Who makes it (or who would use it)?
- Why are we studying it (or exploring it)?
- What should we pay special attention to?
- **What does the product name and description signal?** The name often encodes strategic intent, identity, or positioning. "Swiss Boards — The Swiss Miro" signals geographic identity, quality association, and a specific competitive reference. Carry these signals throughout the research — they may point to beachhead markets, differentiation angles, or brand positioning that should be reflected in the output.

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
   - Note in sources-and-methods.md

4. **Technical signals:**
   - Technology stack (often visible in job postings, docs)
   - Integration partners (reveals ecosystem)
   - API capabilities (reveals technical depth)

**Handling access issues:**
- If Playwright/browser access is blocked, fall back to public information
- If signup requires payment, document this and skip product exploration
- Never fabricate information you couldn't access

### If Name + Description Only:

**Goal:** Research the problem space and existing landscape based on the product idea.

**Actions:**

1. **Problem space research:**
   - Web search for the problem domain described in the name/description
   - Identify what category this product falls into
   - Find existing products that address similar problems
   - Understand the market maturity (established, growing, nascent)

2. **Reference product identification:**
   - Pick the closest existing product as the primary reference
   - Note 2-3 additional players for competitive context
   - Research their websites using the "Product Website" approach above (lighter touch)

3. **Opportunity framing:**
   - What angle does the name/description suggest?
   - How does the described product differ from what exists?
   - What user segment might be underserved?

**Key principle:** The name and description are the user's hypothesis about a product opportunity. Research validates, refines, or challenges that hypothesis.

---

## Step 3: Competitive Scan

**Goal:** Understand the competitive landscape and positioning.

**Actions:**

1. **Identify top 3 competitors:**
   - Direct competitors (same problem, same market)
   - Adjacent products (similar capabilities, different market)
   - Note any mentioned by the reference product

2. **Identify closest-niche competitors:**
   - Which existing products occupy the positioning the new product is targeting?
   - These deserve deeper analysis than major players — understand why they haven't broken through
   - Research their limitations, user adoption, technical maturity, and market perception
   - Their struggles reveal the real barriers to the positioning we're considering

3. **For each competitor, gather:**
   - Name and URL
   - Core value proposition (from their homepage)
   - Target audience
   - Pricing model (free tier, price points)
   - Key differentiators (what they emphasize)

4. **Map the landscape:**
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

**For Name + Description only source:** Focus on reviews and discussions about the closest reference product identified in Step 2. Note that confidence will be lower since we're researching adjacent products, not the exact product.

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

**Goal:** Surface potential differentiation vectors for the product team to explore.

**Actions:**

1. **Gap analysis:**
   - What pain points aren't addressed?
   - What use cases have the highest friction?
   - What capabilities are requested but missing?

2. **Suggest differentiation vectors:**
   - Where is the UX weak? (usability opportunity)
   - Where is pricing problematic? (value opportunity)
   - Where is the product bloated? (simplicity opportunity)
   - Where are there privacy/security concerns? (trust opportunity)
   - Order vectors by their potential impact on user delight — what would users *feel* most?
   - Do NOT label any vector as "primary" — sequencing is the product team's decision

3. **Separate table stakes from differentiators:**
   - Industry requirements, compliance obligations, and baseline expectations are table stakes — things the product must do to be eligible, not things it competes on
   - Differentiation is what makes users choose this product over alternatives
   - Present these as distinct categories

**Critical boundary:** This is analysis, not decision. Do NOT include:
- Positioning statements or taglines
- Risk factor assessments
- Beachhead selections or entry strategies
- Strategic recommendations

These are product team deliverables, not initialization input. Document the raw opportunity landscape and let the Trio draw conclusions during discovery.

---

## Step 7: Documentation

**Goal:** Create the 8 output files in `input/`.

Create each file according to the templates below. Ensure:
- Clear separation between facts and analysis
- Sources cited for claims
- Confidence levels noted
- Gaps explicitly documented

---

## Step 8: Executive Summary

**Goal:** Create a concise, customer-facing summary for validation.

**Purpose:** This document is shared back with the person who originated the product idea. It communicates initial understanding and invites feedback — "Are we facing the right direction? Any immediate corrections or additions?"

**Tone:** Discovery round 0. Not a report, not an authoritative finding. A communication of initial understanding that invites correction rather than approval.

**Structure:**
- Cover section with product name, date, and a one-sentence framing ("Our initial understanding of the opportunity")
- ~Half a page summarizing each of files 1-6 (problem, users, competition, reference product, user voice, differentiation)
- Target total: ~3 pages of content
- Close with an explicit invitation for feedback and additional input

**Presentation quality matters:** This is likely the first artifact a potential customer receives from us. Use:
- Clean visual hierarchy with clear section headings
- Mermaid diagrams where a visualization adds value (e.g., positioning maps, competitive landscape)
- Tables where structured comparison helps (e.g., need hierarchy, competitor overview)
- Sufficient white space — dense walls of text signal "generated, not curated"

**What NOT to include:**
- Recommended next steps (that's our internal concern)
- Research methodology or confidence levels (that's the meta file's job)
- Positioning statements or strategic conclusions (that's premature)

**Output:** `input/executive-summary.md`

---

## Output Structure

All files go in the `input/` folder of the new Product:

```
input/
├── 1-problem-and-opportunity.md   # Why this space? What gap exists?
├── 2-users-and-needs.md           # Who are the users? What do they need?
├── 3-competitive-landscape.md     # Who plays here? How positioned?
├── 4-product-intelligence.md      # What does the reference product do?
├── 5-user-voice.md                # What do real users say?
├── 6-differentiation-analysis.md  # Where can we win?
├── 7-reality-check.md              # Adversarial stress-test of the opportunity
├── 8-sources-and-methods.md        # Sources, confidence, gaps
└── executive-summary.md            # Customer-facing summary for validation
```

### Visualization Standard

Use **Mermaid diagrams** for all visual illustrations — positioning maps, competitive landscapes, flow diagrams, and any other visualization where a picture communicates better than text. Prefer appropriate Mermaid chart types (`quadrantChart` for positioning maps, `flowchart` for processes, `graph` for relationships). Never use ASCII art for diagrams.

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
[Competitor to beat / Product to learn from / Market to enter / Idea to explore]

### Specific Interest Areas
[Any focus areas noted at the start]

## Unknown

[What couldn't we determine about the problem/opportunity?]
```

### 2-users-and-needs.md

```markdown
# Users and Needs

## Use Examples

Concrete scenarios illustrating who might use this product and how. These are starting points for discovery, not validated segments.

### Example 1: [Short scenario title]
[2-3 sentences describing a specific team, their context, what they're trying to do, and why current tools fall short. Be concrete — name team sizes, industries, activities.]

### Example 2: [Short scenario title]
[Same structure...]

### Example 3: [Short scenario title]
[Same structure...]

## User Need Hierarchy

| Priority | Need | Current State |
|----------|------|---------------|
| [Must-have / Important / Nice-to-have] | [Need] | [Well-served / Poorly served / Not served] |

## Table Stakes

Requirements the product must meet to be eligible for consideration. These are not differentiators — they are baseline expectations.

- [Requirement 1: e.g., industry compliance, basic security, platform support]
- [Requirement 2]

## Jobs to Be Done

Focus on what users need to accomplish — desired outcomes and behavior changes. Do NOT include compliance, regulatory, or infrastructure requirements here (those belong in Table Stakes above).

1. **"[Job statement]"** — [Brief explanation of the core need]
2. **"[Job statement]"** — [Brief explanation]
3. **"[Job statement]"** — [Brief explanation]

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
**Source:** [Code repository / Website exploration / Name+description synthesis]

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

## Critique

### What They Do Well
[3-4 specific things the reference product gets right — things worth learning from or matching. Ground in user evidence or observable quality, not assumption.]

- **[Strength 1]:** [Why it works, what makes it effective]
- **[Strength 2]:** [Why it works]

### Where They Fail
[3-4 specific things the reference product gets wrong — areas where users suffer or the product contradicts its own value proposition. These are potential opportunity vectors.]

- **[Failure 1]:** [What goes wrong, evidence from user voice or observation]
- **[Failure 2]:** [What goes wrong]

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

## Opportunity Landscape

[2-3 sentence summary of where opportunities exist based on the research]

## Gap Analysis

### Unaddressed Pain Points

| Pain Point | Evidence | Potential Opportunity |
|------------|----------|----------------------|
| [Pain 1] | [Where we found this] | [How this could be addressed] |
| [Pain 2] | [Where we found this] | [How this could be addressed] |

### Missing or Weak Capabilities

| Capability | User Need | Current Gap |
|------------|-----------|-------------|
| [Capability 1] | [Why users want it] | [Why it's not well-served] |
| [Capability 2] | [Why users want it] | [Why it's not well-served] |

## Suggested Differentiation Vectors

Potential angles for the product team to explore during discovery. Ordered by estimated potential for user delight — what would users *feel* most directly?

Do NOT label any vector as "primary" — sequencing and prioritization is the product team's decision.

### Vector: [e.g., "Focused simplicity"]
**Thesis:** [The core idea]
**Evidence:** [Why the research suggests this could work]
**Trade-offs:** [What pursuing this might mean giving up]

### Vector: [e.g., "Performance"]
[Same structure...]

### Vector: [e.g., "Pricing model"]
[Same structure...]

## Table Stakes vs. Differentiators

Separate what the product must do to be eligible from what it could compete on.

**Table stakes** (must-have to enter the market):
- [Requirement 1]
- [Requirement 2]

**Potential differentiators** (what could make users choose this over alternatives):
- [Differentiator 1]
- [Differentiator 2]

## Unknown

[What couldn't we determine about differentiation opportunities?]
```

### 8-sources-and-methods.md

```markdown
# Sources & Methods

## Research Overview

**Reference Product:** [Name]
**Research Date:** YYYY-MM-DD
**Source Type:** [Code repository / Product website / Name+description synthesis]
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

### For Name + Description Research
- Use WebSearch extensively to research the problem space
- Use WebFetch to analyze competitor websites
- Focus on understanding what exists before documenting opportunities

### For User Voice
- Use WebSearch to find review platforms
- Use WebFetch to read reviews (respect rate limits)
- Search Reddit, HN, Twitter for discussions

### Handling Blocks
If access is blocked:
1. Document the block in sources-and-methods.md
2. Try alternative sources
3. Note reduced confidence
4. Continue with available information

---

## Quality Checklist

Before completing:

- [ ] All 8 output files created
- [ ] Executive summary created (customer-facing, ~3 pages)
- [ ] Source type correctly identified and process adapted
- [ ] Preparation instruction reflected in research (if provided)
- [ ] Product name/description signals reflected in the research
- [ ] At least 3 competitors researched
- [ ] Closest-niche competitors analyzed in depth (why haven't they broken through?)
- [ ] User voice gathered from multiple sources
- [ ] Use examples provided (not formal segments)
- [ ] JTBDs focus on user needs, table stakes listed separately
- [ ] Differentiation vectors presented as suggestions, ordered by user delight potential
- [ ] No positioning statements, risk factors, or strategic recommendations (those are product team deliverables)
- [ ] Reference product critique included (what they do well / where they fail)
- [ ] Mermaid diagrams used for all visualizations (no ASCII art)
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

## Usage in Product Creation

This skill is the starting point when bootstrapping a new Product:

```
SOURCE (URL, path, or name+description)
    ↓
[initializing-products]
    ↓
input/ (8 structured files + executive summary)
    ↓
Executive summary → share with customer for validation
    ↓
Customer feedback → additional input for next workflow
    ↓
[understanding-mvp] or [creating-mvp]
    ↓
Product Trio Discovery
```

The structured input files become the foundation for the Trio's discovery work. The executive summary serves as the validation loop with the customer before discovery begins.
