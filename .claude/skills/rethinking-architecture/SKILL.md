---
name: rethinking-architecture
description: Question and evolve the architecture of an Elixir codebase. NOT code review (use reviewing-elixir). This is about challenging domain boundaries, evaluating abstractions, finding conceptual improvements. Assumes code is already correct - focuses on whether the DESIGN should evolve. Triggers: "rethink the architecture", "design deep dive", "question the domain model", "how would Jose structure this".
---

# Rethinking Architecture

A deep thinking process for questioning and evolving the **design** of an Elixir codebase. This is NOT code review - the code is assumed to be correct, tests passing, patterns followed. This is about whether the **conceptual model** should evolve.

## What This Is vs What It Isn't

| This IS | This is NOT |
|---------|-------------|
| Questioning domain boundaries | Checking for anti-patterns |
| Evaluating abstraction choices | Counting Map.get usage |
| Finding semantic inconsistencies | Verifying tests pass |
| Identifying missing concepts | Finding duplicated functions |
| Rethinking module organization | Checking policy structure |
| Discovering unification opportunities | Reviewing PR changes |

**Key insight:** Code review asks "Is this code correct?" Rethinking architecture asks "Should this design evolve?"

## Prerequisites

- Code already passes review standards (use `reviewing-elixir` first if needed)
- Opus model (deep conceptual thinking required)
- Time for reflection (this is not a quick check)
- Phoenix server running (Tidewave for understanding runtime relationships)

---

## The Process

### Phase 1: Understand the Domain Model

**Goal:** Map the conceptual landscape without judgment.

**Questions to explore:**
- What are the core **concepts** in this system? (Not modules - concepts)
- How do these concepts **relate** to each other?
- What **language** does the system use? (Names, verbs, relationships)
- What is the system's **mental model** of its domain?

**Approach:**
1. Read the Ash domain files - what resources exist? What actions?
2. Understand the GenServer landscape - what stateful processes exist? Why?
3. Map the data flows - how does information move through the system?
4. Identify the core nouns (entities) and verbs (operations)

```elixir
# Use Tidewave to understand the actual runtime structure
# What modules exist? What are their relationships?
:code.all_loaded() |> Enum.filter(fn {mod, _} ->
  mod |> to_string() |> String.starts_with?("Elixir.YourApp")
end) |> Enum.map(&elem(&1, 0)) |> Enum.sort()
```

### Phase 2: Question the Boundaries

**Goal:** Challenge the current domain decomposition.

**For each domain/module cluster, ask:**
- Why does this boundary exist here?
- What would happen if we merged X and Y?
- What would happen if we split Z differently?
- Are there concepts that span boundaries awkwardly?
- Are there hidden concepts that should be explicit?

**Signs of boundary problems:**
- Module A constantly needs to know about Module B's internals
- The same concept has different names in different places
- Operations require coordinating many modules that "shouldn't" need coordination
- There's a "Utils" or "Helpers" module that's a dumping ground

**Example questions:**
- "You have 8 Ash domains. Are these the RIGHT 8 domains?"
- "Expertise has Brief, BriefDraft, BriefServer, BriefProcessor - is this the right decomposition?"
- "Services vs Domain modules - what's the actual distinction? Is it serving you?"

### Phase 3: Evaluate the Abstractions

**Goal:** Assess whether the abstractions match the problem.

**For each major abstraction, ask:**
- Does this abstraction **earn its complexity**?
- Is there a **simpler model** that would work?
- Are there **patterns emerging** that should become first-class?
- Are there concepts **fighting to exist** that we haven't named yet?

**Signs of abstraction problems:**
- Similar code in multiple places that can't be unified (the abstraction doesn't fit)
- Abstractions that need constant "escape hatches" or special cases
- Concepts that users/developers struggle to explain
- Names that don't match what things actually do

**Jose Valim lens:**
- Would Jose introduce this abstraction, or solve it differently?
- Is this fighting Elixir/OTP, or embracing it?
- Could this be expressed more declaratively?
- Is there unnecessary indirection?

### Phase 4: Find Semantic Inconsistencies

**Goal:** Identify where the system contradicts itself conceptually.

**Look for:**
- Same concept, different names (synonyms that confuse)
- Same name, different concepts (overloaded terms)
- Implicit concepts that should be explicit
- Explicit concepts that add no value

**Example findings:**
- "You call it 'Draft' in Documents but 'ItemDraft' in AIInfra - is this the same concept?"
- "What IS a 'Flow' vs a 'Workflow'? The distinction is unclear."
- "The concept of 'Actor' appears in 3 forms - should there be one?"

### Phase 5: Identify Evolution Opportunities

**Goal:** Propose concrete architectural improvements.

**For each opportunity, articulate:**
1. **The insight:** What did you realize about the domain?
2. **The current state:** How does the code currently model this?
3. **The target state:** How should it be modeled?
4. **The impact:** What would change? What would become easier?
5. **The migration:** How do we get there safely?

**Prioritize by:**
- Conceptual clarity gained
- Code simplified
- Future development enabled
- Risk of the transformation

---

## Report Structure

```markdown
# Architectural Design Review: [Date]

## Domain Model Summary

[Diagram or description of the current conceptual model]

### Core Concepts
- **Concept A:** What it represents, where it lives
- **Concept B:** What it represents, where it lives

### Key Relationships
- A relates to B via...
- C orchestrates D and E...

## Design Observations

### Observation 1: [Descriptive Title]

**The insight:**
[What you realized about the domain model]

**Current modeling:**
[How the code currently represents this]

**Questions to consider:**
- [Thought-provoking question]
- [Alternative perspective]

**Potential direction:**
[If applicable, a sketch of how this might be modeled differently]

### Observation 2: [Title]
...

## Boundary Analysis

### Domain: [Name]
**Purpose:** [What this domain represents]
**Cohesion:** [Do the pieces belong together?]
**Coupling:** [How does it connect to other domains?]
**Questions:**
- [Boundary question]

## Abstraction Assessment

### [Abstraction Name]
**Purpose:** [What problem it solves]
**Fitness:** [How well does it fit?]
**Alternatives considered:** [Other ways to model this]

## Evolution Opportunities

### Opportunity 1: [Title]
**Insight:** [The realization]
**Impact:** High/Medium/Low
**Complexity:** High/Medium/Low
**Sketch:** [Brief description of the transformation]

## Open Questions

[Questions that emerged but weren't resolved - fodder for discussion]
```

---

## Mindset Guidance

### Think Like Jose Valim

Jose doesn't ask "Is this code correct?" He asks:
- "Is this the right way to think about this problem?"
- "Does this design let Elixir's strengths shine?"
- "Is there unnecessary complexity here?"
- "What would make this more obvious?"

### Assume Good Intent

The code is the way it is for reasons. Before proposing changes, understand:
- What constraints existed when this was built?
- What problems was this solving?
- What has changed since then?

### Focus on the Forest

Don't get lost in individual trees (functions, modules). Keep asking:
- What is the SYSTEM trying to do?
- How do the pieces fit together?
- What's the governing mental model?

### Be Willing to Question Everything

Nothing is sacred. Even well-established patterns might be wrong for THIS codebase:
- "Everyone does it this way" is not a reason
- Popularity doesn't equal fitness
- Context matters more than convention

---

## Anti-Patterns for This Skill

**Don't do these - they're code review, not architecture rethinking:**

- Checking for `Map.get` usage patterns
- Counting lines of code or modules
- Verifying test coverage
- Finding duplicated utility functions
- Checking if policies are structured correctly
- Looking for Elixir gotchas (String.to_atom, etc.)

**The reviewing-elixir skill handles all of the above.**

This skill is for stepping back and asking: "Assuming the code is correct, should this design evolve?"
