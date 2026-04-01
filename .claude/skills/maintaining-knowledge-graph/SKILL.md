---
name: maintaining-knowledge-graph
description: >
  Builds or incrementally updates the knowledge graph by processing unprocessed
  expertise changes. Extracts entities and relationships using the system's own
  RAG search as external memory. Works whether the graph is empty (initial build)
  or populated (incremental update).
user-invocable: true
argument-hint: ""
---

## Managing the Knowledge Graph

You are building or updating the FlowStudio knowledge graph — a structured layer of entities and relationships that enriches semantic search across the expertise system.

This skill handles both initial graph creation and incremental updates. The process is the same: check for unprocessed changes and process them.

### Prerequisites

1. **API Token**: The `VIA_API_TOKEN` environment variable must be set
2. **Server Running**: FlowStudio must be running at `FLOW_STUDIO_URL` (default: http://localhost:4100)

### API Client

Use the bun script at `.claude/skills/maintaining-knowledge-graph/client/graph-api.ts` for all API calls:

```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts <command> [args...]
```

### Process

#### Step 1: Check for Pending Changes

```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-changes
```

If no changes are pending, report this and exit.

#### Step 2: Understand the Current Graph State

Check what already exists:
```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities
```

If the graph is empty, you're doing an initial build. If entities exist, you're doing an incremental update — be careful to avoid duplicates.

#### Step 3: Process Each Change

For each unprocessed change, handle based on `change_type`:

##### `work_ready` — New work available for analysis

1. Read the work's chunks:
   ```bash
   bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts chunks <resource_id>
   ```

2. Search existing entities and the corpus to understand context:
   ```bash
   bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts search "key topics from this work"
   ```

3. **Extract entities** from the chunks. See [Entity Types](#entity-types) for classification guidance.

4. **Check for duplicates** before creating. Always search existing entities first:
   ```bash
   bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts list-entities concept
   bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts search "Entity Name"
   ```

5. **Create new entities**:
   ```bash
   bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts create-entity "Entity Name" concept "Description of the entity and its significance"
   ```

6. **Create entity provenance** — MANDATORY for every entity (new or existing) that appears in this work's chunks. Include a snippet showing the most relevant passage where this entity is mentioned:
   ```bash
   curl -s -X POST http://localhost:4100/api/graph/entity-provenance \
     -H "Authorization: Bearer $VIA_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"entity_id": "<entity_id>", "chunk_id": "<chunk_id>", "work_id": "<work_id>", "snippet": "relevant passage from source mentioning this entity"}'
   ```
   - For **new entities**: link to the chunk(s) the entity was extracted from
   - For **existing entities** referenced in this work: create additional provenance links
   - The `chunk_id` comes from the chunks response (Step 1), the `work_id` is the `resource_id` from the change
   - The `snippet` should be a brief, meaningful passage (1-3 sentences) showing this entity in context

7. **Create relationships** between entities. See [Relationship Taxonomy](#relationship-taxonomy) for types and directionality:
   ```bash
   bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts create-relationship <source_id> <target_id> relates_to "Description of how they relate" 0.8
   ```

8. **Create relationship provenance** — MANDATORY for every relationship. Include a snippet showing the evidence for this connection:
   ```bash
   curl -s -X POST http://localhost:4100/api/graph/relationship-provenance \
     -H "Authorization: Bearer $VIA_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"relationship_id": "<rel_id>", "chunk_id": "<chunk_id>", "work_id": "<work_id>", "snippet": "passage evidencing this relationship"}'
   ```

##### `work_deleted` — Work was removed

1. Search the graph for entities related to this work
2. Entities that only had provenance from this work may need to be removed
3. Entities shared across works should be preserved

##### `domain_created` — New domain added

Note the domain for context — new works in this domain will arrive as `work_ready` changes.

##### `domain_archived` — Domain archived

Consider whether entities unique to this domain should be flagged. Cross-domain entities should be preserved.

#### Step 4: Acknowledge Processed Changes

After processing each change:
```bash
bun --env-file=.claude/skills/maintaining-knowledge-graph/client/.env run .claude/skills/maintaining-knowledge-graph/client/graph-api.ts acknowledge <change_id>
```

---

### Entity Types

| Type | When to use | Decision test |
|------|-------------|---------------|
| `:concept` | An idea that explains *why* something works | No prescribed steps, no named parts forming a structure |
| `:framework` | A structured model with named components, dimensions, or stages | "Does it have named parts forming a coherent whole?" |
| `:method` | A repeatable process for *doing* something | "Can you follow it? Does it have steps, practices, or rituals?" |
| `:person` | Authors, researchers, practitioners | Named individuals |
| `:organization` | Companies, institutions, standards bodies | Named organizations |
| `:technology` | Tools, languages, platforms | Software, hardware, or technical systems |
| `:standard` | Specifications, protocols, standards | Formal specifications or protocols |
| `:event` | Conferences, incidents, milestones | Time-bound occurrences |
| `:other` | Entities that don't fit other categories | Last resort only |

**Classification decision tree:**
1. Is it a named person, organization, technology, standard, or event? → Use that type directly
2. Does it have named parts forming a coherent structure? → `:framework`
3. Can you follow it as a process with steps? → `:method`
4. Is it an abstract idea or principle? → `:concept`
5. None of the above? → `:other`

**DO NOT use `:artifact`** — this type has been removed. Books and papers are already `Work` resources in the Expertise domain. The provenance system links entities to their source works.

---

### Relationship Taxonomy

There are exactly **10 canonical relationship types**. Do not invent types outside this list — the UI filters depend on them.

Relationships are **directed** (source → target). The **source is always the "agent" or "smaller part"**.

| Type | Stored direction (source → target) | Example |
|------|------|---------|
| `authored` | Person → Concept/Method/Framework | "Deming authored PDSA Cycle" |
| `created` | Person/Org → Concept/Method/Framework | "Toyota created Toyota Production System" |
| `developed` | Person/Org → Technology | "Google developed Kubernetes" |
| `extends` | Concept/Method → Concept/Framework | "Lean Startup extends Lean Thinking" |
| `influences` | Concept/Person → Concept/Method | "Systems Thinking influences Senge's work" |
| `contradicts` | Concept → Concept | "Taylorism contradicts Theory Y" |
| `part_of` | Component → Container | "Sprint Planning part_of Scrum" |
| `implements` | Tech/Method → Concept/Standard | "Kubernetes implements container orchestration" |
| `affiliated_with` | Person → Organization | "Deming affiliated_with MIT" |
| `relates_to` | Any → Any | Generic connection when no specific type fits |

**Direction rules:**
- Person is always the **source** when authoring, creating, developing, or affiliating
- The smaller/more specific thing is the **source** of `part_of`, `extends`, `implements`
- `influences` flows from the influencer to the influenced
- `contradicts` and `relates_to` are symmetric (direction doesn't matter semantically, but pick one consistently)

**NEVER store inverse forms** like "authored_by", "influenced_by", "developed_by". Always store the canonical direction. The UI derives the inverse label automatically.

---

### Provenance — CRITICAL

Every entity and every relationship **must** have provenance linking it back to its source chunk(s) and work(s). An entity or relationship without provenance is an orphan that cannot be traced to source material.

**Entity provenance**: Links an entity to the chunk where it was discovered.
- Create one per entity-chunk pair
- Include a `snippet`: the most relevant 1-3 sentences showing this entity in context
- An entity can have provenance from multiple chunks and multiple works

**Relationship provenance**: Links a relationship to the chunk where the connection was evidenced.
- Create one per relationship-chunk pair
- Include a `snippet`: the passage that shows evidence for why these two entities are connected
- A relationship can have provenance from multiple chunks

**Why this matters**: Provenance enables "Source Works" sections in entity detail views, domain-specific export/import, and cross-domain discovery. Without it, the graph is a disconnected abstraction.

---

### Quality Guidelines

- **Be selective**: Not every noun is an entity. Focus on concepts that appear across multiple works or are central to a domain's understanding.
- **Use search as memory**: Before creating an entity, search for it. It may already exist or you may find additional context.
- **Check before creating**: Always search existing entities before creating new ones to avoid duplicates.
- **Update, don't duplicate**: If an entity already exists but you have new information, update it rather than creating a duplicate.
- **Strength values**: Use 0.8-1.0 for explicitly stated relationships, 0.5-0.7 for inferred ones, 0.3-0.4 for weak associations.
- **Descriptions matter**: Entity descriptions should explain significance, not just define. "Systems Thinking" → "An approach to analysis that focuses on the way a system's constituent parts interrelate, particularly over time and within the context of larger systems" rather than just "A type of thinking."
- **Relationship descriptions**: Briefly explain *how* the connection manifests. "Lean Startup extends Lean Thinking by applying waste-reduction principles to product development under uncertainty."
- **Holistic view**: Unlike automated extraction, you can see patterns across the entire corpus. Prioritize cross-work connections.
- **Process in order**: Changes arrive in chronological order. Process them sequentially.
- **Graceful on deletes**: Don't aggressively remove entities on work deletion. Only remove entities that have no other provenance.
