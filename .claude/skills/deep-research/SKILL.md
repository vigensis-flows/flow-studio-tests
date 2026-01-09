---
name: deep-research
description: Conducts comprehensive research on any topic using web search, Asset Store, SOAR, and Context7. Creates research plans and produces synthesis reports. Use when the Product Trio needs answers to specific research questions during MVP discovery.
---

# Deep Research

Conducts structured, comprehensive research to answer specific questions. Designed for use by the Research Analyst agent during MVP discovery and other research needs.

## When to Use

Use this skill when:
- Product Trio has questions that require external research
- Need market research (competitors, market size, trends)
- Need user research synthesis (pain points, behaviors, needs)
- Need technical research (feasibility, approaches, best practices)
- Need domain research (industry knowledge, regulations, standards)

## Research Capabilities

| Source | Tool | Best For |
|--------|------|----------|
| **Asset Store** | `mcp__asset-store__search_assets` | Curated knowledge, methodologies, best practices |
| **SOAR** | `mcp__soar__search_soar` | Current trends, recent developments, state of the art |
| **Web Search** | `WebSearch` | Broad market data, competitors, current events |
| **Web Fetch** | `WebFetch` | Specific page content, documentation |
| **Context7** | `mcp__context7__*` | Technical documentation, library docs |

## Research Types

### Market Research

Questions answered:
- Who are the competitors?
- What is the market size?
- What are the trends?
- How do competitors position themselves?
- What pricing models exist?

Sources priority: WebSearch → SOAR → Asset Store

### User Research (Secondary)

Questions answered:
- What pain points do users report?
- What solutions do they currently use?
- What do they value?
- What are common complaints about existing solutions?

Sources priority: WebSearch (reviews, forums) → Asset Store (user research methods)

### Technical Research

Questions answered:
- Is this technically feasible?
- What approaches exist?
- What are best practices?
- What technologies should we consider?

Sources priority: Context7 → Asset Store → SOAR → WebSearch

### Domain Research

Questions answered:
- What regulations apply?
- What industry standards exist?
- What domain-specific terminology is used?
- What are industry best practices?

Sources priority: Asset Store → WebSearch → SOAR

---

## Process

### Step 1: Clarify Research Question

Before researching, ensure the question is:
- **Specific**: "What are competitors in X space?" not "What's the market?"
- **Answerable**: Can be answered with available sources
- **Scoped**: Has clear boundaries

If question is too broad, break into sub-questions.

### Step 2: Create Research Plan

For non-trivial research, create a brief plan:

```markdown
## Research Plan: [Question]

**Question**: [Specific research question]
**Type**: [Market | User | Technical | Domain]
**Time Budget**: [Estimated effort]

### Sub-Questions
1. [Sub-question 1]
2. [Sub-question 2]

### Sources to Check
- [ ] [Source 1]: [What we expect to find]
- [ ] [Source 2]: [What we expect to find]

### Success Criteria
- [What constitutes a complete answer]
```

### Step 3: Execute Research

For each source:
1. Craft appropriate search query
2. Review results critically
3. Extract relevant findings
4. Note source credibility
5. Identify gaps and follow-up questions

**Search Strategy:**
- Start broad, then narrow
- Use multiple query variations
- Cross-reference findings
- Note contradictions

### Step 4: Synthesize Findings

Combine findings into coherent synthesis:
- What did we learn?
- How confident are we?
- What sources agree/disagree?
- What gaps remain?

### Step 5: Create Research Report

Document findings in structured report.

---

## Output: Research Report

Store at: `docs/products/[mvp-name]/research/[topic]-research.md`

```markdown
# Research Report: [Topic]

**Question**: [Original research question]
**Type**: [Market | User | Technical | Domain]
**Researcher**: Research Analyst
**Date**: YYYY-MM-DD
**Status**: [Complete | Partial | Blocked]

---

## Executive Summary

[2-3 sentence summary of key findings]

**Confidence Level**: [High | Medium | Low]
**Recommendation**: [Brief recommendation for the Trio]

---

## Key Findings

### Finding 1: [Title]

[Description of finding]

**Source**: [Where this came from]
**Confidence**: [High | Medium | Low]
**Implications**: [What this means for the MVP]

### Finding 2: [Title]

[Continue for each key finding...]

---

## Detailed Analysis

### [Sub-Question 1]

[Detailed findings with citations]

**Sources Consulted:**
- [Source 1]: [What it said]
- [Source 2]: [What it said]

**Synthesis**: [Combined interpretation]

### [Sub-Question 2]

[Continue for each sub-question...]

---

## Competitive Landscape

*(For market research)*

| Competitor | Positioning | Strengths | Weaknesses | Pricing |
|------------|-------------|-----------|------------|---------|
| [Name] | [Position] | [Strengths] | [Weaknesses] | [Price] |

---

## Gaps and Limitations

### Information Not Found
- [What we couldn't find]
- [Why it matters]

### Contradictions
- [Source A says X, Source B says Y]
- [Possible explanation]

### Low-Confidence Areas
- [Areas where confidence is low]
- [What would increase confidence]

---

## Recommendations

Based on this research:

1. **[Recommendation 1]**: [Rationale]
2. **[Recommendation 2]**: [Rationale]

### Questions for Stakeholders
*(If research surfaced questions only humans can answer)*

- [Question 1]
- [Question 2]

---

## Sources

| Source | Type | URL/Reference | Credibility |
|--------|------|---------------|-------------|
| [Name] | [Type] | [Link] | [High/Med/Low] |

---

## Appendix: Raw Notes

[Detailed notes from each source...]
```

---

## Research Quality Standards

### Source Evaluation

| Criterion | High | Medium | Low |
|-----------|------|--------|-----|
| **Recency** | < 1 year | 1-3 years | > 3 years |
| **Authority** | Primary source, expert | Secondary source | Unknown/anonymous |
| **Corroboration** | Multiple sources agree | Some agreement | Single source |
| **Bias** | Neutral/disclosed | Some bias | Clear bias |

### Confidence Levels

| Level | Meaning | When to Use |
|-------|---------|-------------|
| **High** | Multiple credible sources agree | Well-researched topics |
| **Medium** | Some sources, minor conflicts | Most research |
| **Low** | Few sources, significant gaps | Emerging/niche topics |

---

## Usage in MVP Workflow

This skill runs in parallel with Trio discovery:

```
[understanding-mvp]
    │
    ├── Round 1: Initial analysis
    │   └── Identify research needs
    │       ↓
    │   [deep-research] (background)
    │       ├── Market research task
    │       ├── User research task
    │       └── Technical research task
    │
    ├── Round 2: Research-informed discussion
    │   └── Trio consumes research reports
    │
    └── Continue until convergence...
```

### Spawning Research Tasks

When Trio identifies research needs:

```
Research Need: "Who are the main competitors in healthcare scheduling?"

Spawn: deep-research
  - question: "Healthcare scheduling software competitors"
  - type: market
  - depth: standard
  - output: docs/products/[name]/research/competitors.md
```

### Consuming Research

Research reports are added to Trio's context for subsequent rounds.

---

## Research Patterns

### Pattern: Competitor Analysis

```markdown
**Question**: Who are the main competitors in [space]?

**Sub-Questions**:
1. What products exist in this space?
2. How do they position themselves?
3. What are their strengths/weaknesses?
4. What is their pricing?
5. What do users say about them?

**Sources**:
- WebSearch: "[space] software", "[space] tools comparison"
- WebSearch: "[competitor name] reviews", "G2 [space]"
- WebFetch: Competitor websites for positioning

**Output**: Competitive landscape table + analysis
```

### Pattern: Market Sizing

```markdown
**Question**: How big is the [market]?

**Sub-Questions**:
1. What is the TAM (Total Addressable Market)?
2. What is the SAM (Serviceable Addressable Market)?
3. What is the SOM (Serviceable Obtainable Market)?
4. What is the growth rate?

**Sources**:
- WebSearch: "[market] market size", "[market] industry report"
- SOAR: "[market] trends"

**Output**: Market size estimates with sources and confidence
```

### Pattern: Technical Feasibility

```markdown
**Question**: Is [approach] technically feasible?

**Sub-Questions**:
1. Has this been done before?
2. What technologies are available?
3. What are the challenges?
4. What are best practices?

**Sources**:
- Context7: [technology] documentation
- Asset Store: Engineering patterns
- SOAR: Current state of [technology]

**Output**: Feasibility assessment with approach recommendations
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Surface research** | Missing depth | Follow up on promising leads |
| **Single source** | Low confidence | Always cross-reference |
| **Confirmation bias** | Missing counter-evidence | Actively search for disagreement |
| **No synthesis** | Raw data without insight | Always synthesize and recommend |
| **Stale sources** | Outdated information | Prioritize recent sources |
| **Opinion as fact** | Low credibility | Distinguish and label source types |
