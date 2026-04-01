---
name: refining-knowledge-graph
description: >
  Reviews the knowledge graph holistically for quality — fixing misclassified entities,
  improving descriptions, correcting relationship directions, merging duplicates,
  and filling gaps. Run after maintaining-knowledge-graph has processed all changes.
user-invocable: true
argument-hint: "[focus area: entities|relationships|provenance|all]"
---

## Refining the Knowledge Graph

You are reviewing and improving the FlowStudio knowledge graph as a whole. Unlike the maintaining skill (which processes changes incrementally), this skill looks at the graph holistically to find and fix quality issues.

Run this **after** the maintaining skill has processed all pending changes.

### Prerequisites

1. **API Token**: The `.env` file at `.claude/skills/maintaining-knowledge-graph/client/.env` must contain `VIA_API_TOKEN`
2. **Server Running**: FlowStudio must be running at `FLOW_STUDIO_URL` (default: http://localhost:4100)
3. **No pending changes**: Run `/maintaining-knowledge-graph` first if changes are pending

### API Client

Use the bun script at `.claude/skills/maintaining-knowledge-graph/client/graph-api.ts` for all API calls:

```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts <command> [args...]
```

**CRITICAL**: Always include `--env-file=.claude/skills/maintaining-knowledge-graph/client/.env` in every bun command. This loads the API token. Do NOT rely on shell environment variables.

### Process

#### Step 1: Survey the Graph

List all entities by type to understand the current state:

```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities concept
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities framework
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities method
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities person
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities organization
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities technology
```

Note the counts and look for obvious issues (e.g., 0 frameworks when the corpus discusses frameworks).

#### Step 2: Entity Quality Review

For each entity type, review for:

##### Classification Errors

Apply the decision tree to check typing:
1. **Frameworks typed as concepts**: Does it have named parts forming a coherent structure? → Should be `:framework`
2. **Methods typed as concepts**: Can you follow it as a process with steps? → Should be `:method`
3. **Concepts that are really methods or frameworks**: Common error — reclassify using the decision tree

Fix with:
```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts update-entity <id> --type framework
```

##### Description Quality

Good descriptions explain significance, not just define:
- **Bad**: "A management framework"
- **Good**: "A structured approach to continuous improvement through iterative Plan-Do-Study-Act cycles, emphasizing learning from small experiments before scaling"

Update weak descriptions:
```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts update-entity <id> --description "Better description here"
```

##### Duplicates

Look for entities that represent the same thing with slightly different names:
- "Agile" and "Agile Methodology"
- "TPS" and "Toyota Production System"

Merge by:
1. Keeping the more descriptive entity
2. Moving relationships from the duplicate to the kept entity
3. Deleting the duplicate

##### Missing Entities

Search the corpus for important concepts that aren't yet in the graph:
```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts search "key concept not yet captured"
```

Create missing entities with provenance.

#### Step 3: Relationship Quality Review

##### Direction Errors

Verify relationships follow the canonical direction convention:
- Source is always the **agent** or **smaller part**
- Person is always source of `authored`, `created`, `developed`, `affiliated_with`
- Smaller/specific thing is source of `part_of`, `extends`, `implements`

Fix by deleting the wrong relationship and recreating with correct direction.

##### Type Errors

Check that relationship types match what they describe:
- `extends` vs `influences`: extends means "builds upon directly", influences means "had an impact on"
- `part_of` vs `extends`: part_of means literal containment, extends means conceptual elaboration
- `authored` vs `created`: authored implies intellectual authorship, created is broader (organization created a technology)

##### Missing Relationships

For entities with few connections, search for relationships the incremental pass may have missed:
```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts get-entity <id>
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts search "how does X relate to Y"
```

Cross-work connections are particularly valuable — look for concepts that appear in multiple works but aren't yet connected.

##### Orphan Entities

Entities with zero relationships are likely extraction artifacts. Either:
- Connect them to relevant entities
- Delete them if they don't warrant inclusion

#### Step 4: Provenance Review — MANDATORY

There are **two** provenance tables. Both must be checked and filled:

1. **Entity provenance** — links entities to the source chunks they were extracted from
2. **Relationship provenance** — links relationships to the source chunks that evidence the connection

**Both require a `snippet`** — a brief passage (1-3 sentences) from the source showing the entity or relationship in context.

##### 4a: Check entity provenance and snippets

For each entity, use `get-entity` to check its provenance:

```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts get-entity <id>
```

Look at the `provenance` array in the response. If an entity has:
- **No provenance at all**: Find the source chunk using `search` or `chunks`, then create provenance
- **Provenance without snippets** (snippet is null): Search for the entity in the corpus to find a representative passage, then create a new provenance link with the snippet

To find source passages for snippets, search the corpus:
```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts search "Entity Name"
```

The search results include `chunk_id` and `work_id` values. Use them to create provenance:
```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts create-entity-provenance <entity_id> <chunk_id> <work_id> "The snippet passage from the source"
```

##### 4b: Check relationship provenance — CRITICAL

**Every relationship must have at least one provenance link.** This is the most commonly missing data.

For each relationship (visible in entity neighborhood responses), check if it has provenance. If not:

1. Search the corpus for evidence of the connection
2. Create relationship provenance with a snippet showing the evidence

```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts create-relationship-provenance <relationship_id> <chunk_id> <work_id> "The passage that evidences this relationship"
```

**Do not skip this step.** Relationships without provenance are orphans that cannot be traced to source material. This is a data quality requirement, not optional cleanup.

#### Step 5: Report

After refinement, summarize:
- Entities reclassified (with before/after types)
- Descriptions improved
- Duplicates merged
- New entities/relationships added
- Direction/type corrections made
- Provenance gaps filled

---

### Focus Areas

If an argument is provided, focus on that area:

- **`entities`**: Steps 2 only — classification, descriptions, duplicates
- **`relationships`**: Step 3 only — direction, types, missing connections
- **`provenance`**: Step 4 only — filling provenance gaps
- **`all`** (default): Full review

---

### Reference: Entity Types

| Type | Decision test |
|------|---------------|
| `:concept` | Explains *why* something works. No steps, no named structure. |
| `:framework` | Has named parts forming a coherent whole. |
| `:method` | A repeatable process you can follow. Has steps. |
| `:person` | Named individual |
| `:organization` | Named organization |
| `:technology` | Software, hardware, or technical system |
| `:standard` | Formal specification or protocol |
| `:event` | Time-bound occurrence |
| `:other` | Last resort |

### Reference: Relationship Types

| Type | Direction (source → target) |
|------|----------------------------|
| `authored` | Person → Concept/Method/Framework |
| `created` | Person/Org → Concept/Method/Framework |
| `developed` | Person/Org → Technology |
| `extends` | Concept/Method → Concept/Framework |
| `influences` | Concept/Person → Concept/Method |
| `contradicts` | Concept → Concept |
| `part_of` | Component → Container |
| `implements` | Tech/Method → Concept/Standard |
| `affiliated_with` | Person → Organization |
| `relates_to` | Any → Any |
