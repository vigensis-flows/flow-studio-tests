---
name: reviewing-domain-knowledge-graph
description: >
  Reviews how a domain's key concepts are represented in the knowledge graph.
  Checks entity coverage against the domain guide, relationship quality,
  work-entity provenance links, and identifies orphans or gaps. Produces a
  review artifact. Triggers: "review domain knowledge graph", "check domain
  graph", "audit domain entities", "knowledge graph health".
user-invocable: true
argument-hint: "<domain-name>"
---

# Reviewing Domain Knowledge Graph

You are reviewing how a domain's knowledge is represented in the knowledge graph. The graph should reflect the domain's key concepts, frameworks, and people — connected by meaningful relationships and grounded in provenance from the domain's works.

## What You Are Reviewing

The knowledge graph contains:
- **Entities** — concepts, frameworks, methods, people, organizations, technologies, standards (table: graph_entities)
- **Relationships** — directed connections between entities with type, description, and strength (table: graph_relationships)
- **Provenance** — links from entities back to specific work chunks with evidence snippets (table: entity_provenance)

This review evaluates graph health from a specific domain's perspective.

## Process

### Step 1: Establish the Domain's Expected Concepts

1. Read the domain guide (`docs/guides/<domain-name>/guide.md`)
2. Extract the key knowledge areas:
   - Mental models from Section 3 (named frameworks)
   - Key concepts from Section 4 (named vocabulary)
   - Influential people mentioned in Resources (Section 8)
   - Named methodologies or approaches from Practical Guidance (Section 5)
3. This produces a "should exist" list of entities the graph should contain for this domain

### Step 2: Query the Graph for Domain Coverage

Query the running application to find entities related to this domain:

1. Search entities by name for each expected concept from the guide
2. For found entities, check:
   - Entity type classification (concept, framework, method, person, etc.)
   - Description quality (explains significance, not just definition)
   - Provenance exists (linked to work chunks with snippets)
3. For missing entities, note the gap

Also search for entities that reference this domain's works via provenance — these are entities the graph has extracted from the domain's library even if not explicitly named in the guide.

### Step 3: Assess Relationship Quality

For entities that exist, check their relationships:

1. Are key relationships present? (e.g., a framework should be `authored` by its creator, `extends` or `influences` related frameworks)
2. Are relationship directions correct? (source → target follows the relationship semantics)
3. Are relationship types appropriate? (`extends` vs `influences` vs `part_of`)
4. Are there orphan entities with zero relationships?
5. Do cross-domain connections exist where they should? (concepts that bridge domains)

### Step 4: Assess Provenance Quality

For entities that exist, check their provenance:

1. Does each entity have at least one provenance link to a work chunk?
2. Do provenance records include snippets (the evidence from the source text)?
3. Are provenance links to works that are actually in this domain's library?
4. Are there entities claimed by this domain with no provenance from any of the domain's works?

### Step 5: Produce the Review

Save to `docs/reviews/domain-knowledge-graph-review-<domain-name>.md` (overwrites previous — git tracks history).

## Review Report Structure

```markdown
# Domain Knowledge Graph Review: <Domain Name>

**Date:** YYYY-MM-DD
**Domain guide:** docs/guides/<domain-name>/guide.md
**Expected concepts:** X (from guide analysis)
**Found in graph:** Y
**Coverage:** Y/X (percentage)

## Summary
[2-3 sentence assessment of graph health for this domain]

## Entity Coverage

### Found and Well-Represented
| Entity | Type | Has Provenance | Relationships | Notes |
|--------|------|---------------|---------------|-------|
| [name] | [type] | [yes/no] | [count] | [quality note] |

### Found but Incomplete
| Entity | Issue | Suggested Fix |
|--------|-------|--------------|
| [name] | [missing provenance / poor description / wrong type] | [specific action] |

### Missing from Graph
| Expected Concept | Source in Guide | Priority |
|-----------------|----------------|----------|
| [concept name] | [which section references it] | [high/medium/low] |

## Relationship Assessment

### Well-Connected Entities
- [Entity] — [count] relationships, good coverage of [what]

### Orphan Entities (zero relationships)
- [Entity] — should connect to [what]

### Relationship Issues
| Relationship | Issue | Fix |
|-------------|-------|-----|
| [source → target] | [wrong direction / wrong type / missing] | [specific fix] |

## Provenance Assessment

### Provenance Health
- Entities with provenance: X/Y
- Entities with snippet evidence: X/Y
- Entities linked to this domain's works: X/Y

### Provenance Gaps
| Entity | Issue |
|--------|-------|
| [name] | [no provenance / provenance without snippet / linked to wrong work] |

## Cross-Domain Connections
- [Entity] bridges to [other domain area] via [relationship]
- Missing bridge: [concept] should connect [this domain area] to [other area]

## Recommendation
[Healthy / Needs maintenance / Needs significant work]

## Action Items
1. [Prioritized actions — create missing entities, fix relationships, add provenance]
```

## Quality Checks

- [ ] Domain guide read and expected concepts extracted
- [ ] Graph queried for all expected concepts
- [ ] Entity descriptions assessed for quality (significance, not just definition)
- [ ] Relationships checked for direction and type correctness
- [ ] Orphan entities identified
- [ ] Provenance coverage assessed (entities → work chunks with snippets)
- [ ] Missing concepts prioritized by importance to the domain
- [ ] Report saved to `docs/reviews/`
