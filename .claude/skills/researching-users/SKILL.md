---
name: researching-users
description: Researches real user feedback, needs, and jobs-to-be-done for a product idea. Produces users-and-needs and user-voice files. Triggers: "research users", "user voice", "user needs", "user feedback".
---

# Researching Users

Gathers real user feedback from review platforms and community discussions, identifies user segments, and documents needs and jobs-to-be-done. Produces `docs/product-brief/2-users-and-needs.md` and `docs/product-brief/5-user-voice.md`.

## Prerequisites

Read the previous research files in `docs/product-brief/` for context:
- `1-problem-and-opportunity.md` — problem space
- `3-competitive-landscape.md` — competitors identified
- `4-product-intelligence.md` — reference product details

## Inputs

- `$ARGUMENTS` — The product name
- **User instruction** (optional) — From workflow context
- **Provided materials digest** (optional) — If `docs/product-brief/provided-materials-digest.md` exists, read it first and use it as a starting point. It contains extracted content from customer-provided documents (which may include user research, personas, interview notes). Enrich with web research — don't just echo the materials.

## Process

### Step 1: User Voice Research

Gather what real users say — praise, complaints, and wishes.

1. **Review platforms:**
   - G2, Capterra (B2B products)
   - Product Hunt (launches, early feedback)
   - Trustpilot
   - App Store / Play Store (mobile apps)
   - Chrome Web Store (browser extensions)

2. **Community discussions:**
   - Reddit (search for product name and competitors)
   - Hacker News (search and comments)
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
   - Review counts and date ranges

**Quality filters:**
- Prefer detailed reviews over star-only ratings
- Look for patterns across multiple sources
- Note recency (recent reviews > old reviews)
- Be skeptical of extremes (5-star and 1-star may be biased)

**For name+description only source:** Focus on reviews and discussions about the closest reference product identified in competitive analysis. Note that confidence will be lower since we're researching adjacent products.

### Step 2: Needs Assessment

Synthesize user voice into structured needs analysis.

1. **Create use examples** — 3 concrete scenarios illustrating who might use this product and how
   - Be concrete: name team sizes, industries, activities
   - These are starting points for discovery, not validated segments

2. **Build user need hierarchy** — prioritized table of needs and current state
   - Must-have / Important / Nice-to-have
   - Well-served / Poorly served / Not served

3. **Identify table stakes** — baseline requirements the product must meet to be eligible
   - Industry compliance, basic security, platform support
   - These are NOT differentiators

4. **Define jobs-to-be-done** — focus on user outcomes and behavior changes
   - Do NOT include compliance, regulatory, or infrastructure requirements (those are table stakes)
   - Focus on what users need to accomplish

## Output Files

### File 1: `docs/product-brief/2-users-and-needs.md`

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

### File 2: `docs/product-brief/5-user-voice.md`

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

## What Users Hate

### Theme 1: [e.g., "Pricing complexity"]
**Frequency:** [Common / Occasional / Rare]
**Severity:** [Dealbreaker / Frustrating / Minor]

Representative quotes:
> "[Actual user quote]" - [Source]

**Opportunity signal:** [What this suggests we could do better]

### Theme 2: [e.g., "Learning curve"]
[Same structure...]

## What Users Request

### Feature Request 1: [e.g., "Better reporting"]
**Frequency:** [How often requested]
**Current state:** [How product addresses it now, if at all]

## Comparison Mentions

[When users compare to alternatives, what do they say?]

- vs. [Competitor 1]: "[What users say about the comparison]"
- vs. [Competitor 2]: "[What users say about the comparison]"

## Support Experience

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

## Tool Usage

- Use WebSearch to find review platforms, Reddit threads, HN discussions
- Use WebFetch to read reviews (respect rate limits)
- Search Reddit, HN, Twitter for discussions about the reference product and competitors
- Use actual user quotes where possible
- Spend no more than 5 minutes on research
