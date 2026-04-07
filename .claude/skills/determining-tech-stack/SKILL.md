---
name: determining-tech-stack
description: >
  Evaluates product requirements and recommends the optimal technology stack.
  Reads the MVP Brief, Strategy, and Design Spec. Considers optional user/client
  preference. Outputs a stack recommendation with rationale, and the specialist
  agent + skill for the architecture step. Use before defining-architecture.
argument-hint: "<product-slug>"
---

# Determining Tech Stack

You are acting as the Tech Smith evaluating product requirements to recommend the
optimal technology stack. This is a deliberate, reasoned decision — not a default.
The recommendation determines which specialist architect defines the architecture
and which patterns they apply.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Strategy | `docs/product-definition/2-product-strategy.md` | Yes |
| MVP Brief | `docs/product-definition/3-mvp-brief.md` | Yes |
| Design Spec | `docs/product-definition/4-design-specification.md` | Yes |
| User instruction | Workflow context | No |

**Why these three?**
- **Strategy:** Business model implications — multi-tenancy, pricing, feature gating,
  scale expectations, sovereign/cloud deployment
- **MVP Brief:** Product type, scope, target segment, deployment model, technical risks
- **Design Spec:** Platform requirements (web, mobile, desktop), real-time needs,
  offline requirements, performance expectations

## Process

### Step 1: Analyze Product Requirements

Read all three input documents. Extract:

| Factor | Where to find it |
|--------|-----------------|
| **Product type** | MVP Brief — what kind of product is this? (SaaS, mobile app, static site, CLI tool, etc.) |
| **Target platforms** | Design Spec — web, iOS, Android, desktop, embedded? |
| **Deployment model** | Strategy — cloud, sovereign/on-prem, edge, hybrid? |
| **Real-time needs** | Design Spec — live updates, collaboration, streaming? |
| **Performance envelope** | Design Spec — latency, throughput, concurrency requirements |
| **Scale expectations** | Strategy — users, transactions, data volume |
| **Integration requirements** | MVP Brief — external APIs, existing systems, data sources |
| **Offline requirements** | Design Spec — does the product need to work without connectivity? |

### Step 2: Consider User Preference

If a user/client instruction is provided containing a tech stack preference:

| Preference type | Action |
|----------------|--------|
| **Specific** (e.g., "elixir", "flutter", "rust") | Validate against requirements. If compatible, adopt and enrich with complementary tech. If incompatible, explain the tension and recommend. |
| **Partial** (e.g., "mobile", "static site", "high performance") | Match to product category, refine based on requirements. |
| **Contradictory** (e.g., "python" for a real-time SaaS) | Flag the tension explicitly. Explain why the preference doesn't fit. Recommend the better option. The user decides. |
| **None provided** | Recommend based on product requirements and preferred stack table. |

User instructiona are respected, not overridden silently. When the recommendation
differs from the preference, the rationale must be clear enough that the user can
make an informed choice.

### Step 3: Match Against Preferred Stack Table

Apply the Vigensis preferred stack table. This represents our engineering judgment
about which stacks we deliver best work with, optimized for quality and speed.

#### Vigensis Preferred Stack Table

| Product Category | Preferred Stack | Why |
|---|---|---|
| **Cloud SaaS / Platform / Multi-tenant** | Elixir + Phoenix + Ash + PostgreSQL | Real-time native, fault-tolerant, declarative modeling. Ash's resource-oriented design excels at multi-tenant business logic. Our deepest expertise. |
| **API service / Backend** | Elixir + Phoenix + Ash | OTP supervision, concurrency, observable by design. Ash provides declarative API generation. |
| **Real-time system (web)** | Elixir + Phoenix + Ash | BEAM handles millions of concurrent connections. Phoenix Channels and LiveView are purpose-built for this. |
| **Cross-platform mobile** | Flutter + Dart (with Elixir + Phoenix + Ash backend) | Single codebase with native performance. Backend remains Elixir when we control it — Flutter handles the client, Ash handles the API. |
| **Static site / Marketing / Blog** | Astro + Cloudflare Pages | Edge-deployed, zero server cost, excellent DX. Content-focused with island architecture for interactive elements. |
| **iOS native** | Swift + SwiftUI (with Elixir + Phoenix + Ash backend) | Platform-native required for best UX and App Store compliance. Backend stays Elixir when we control it. |
| **Android native** | Kotlin + Jetpack Compose (with Elixir + Phoenix + Ash backend) | Google-first ecosystem, modern declarative UI. Backend stays Elixir when we control it. |
| **CLI / Developer tool** | Go | Trivial cross-compilation, fast compile times (tight feedback loops), excellent for network/API-heavy tools. The cloud-native ecosystem standard. |
| **Performance-critical system** | Rust | Zero-cost abstractions, memory safety, predictable latency. For CPU-bound computation where performance is the differentiator. |
| **Data / ML-heavy** | Python + domain framework | ML ecosystem and library breadth — no real alternative for model training and data science. |
| **Desktop application** | Tauri (Rust + web frontend) | Small binary, native feel, leverages web UI skills. |
| **Embedded / IoT** | Rust | Hardware constraints, real-time determinism, memory safety without garbage collection. |

**Selection heuristic:**

1. **Start with constraints** — deployment model, platform requirements, and client
   preferences eliminate options before evaluation begins.
2. **Match product type** — the table above maps product categories to stacks.
3. **Apply the I/O vs CPU rule** — if the bottleneck is network/I/O, favor Go or
   Elixir (both excel at concurrency). If the bottleneck is raw computation, favor Rust.
4. **Default to boring** — when multiple stacks score similarly, pick the one with the
   most mature ecosystem for the product type. Novelty is not a feature.
5. **Favor our expertise** — equal options favor Elixir + Phoenix + Ash. This is not
   bias — it's acknowledging that we deliver better work faster with our strongest stack.

### Step 4: Determine the Specialist

Based on the recommended stack, assign the specialist architect:

| Stack Category | Agent | Skill |
|---|---|---|
| Elixir + Phoenix + Ash (any variant) | `elixir-alchemist` | `defining-architecture` |
| All other stacks | `tech-smith` | `defining-architecture` |

**CRITICAL:** The agent name MUST be exactly `elixir-alchemist` or `tech-smith`.
The skill name MUST be exactly `defining-architecture`. These are the only valid
values — do not invent or hallucinate other agent or skill names.

As the system evolves, new specialist agents may be added (e.g., a mobile architect,
a Rust systems architect). Until then, Tech Smith handles all non-Elixir architecture
with the same skill.

### Step 5: Write the Decision

Save to `docs/product-definition/working/tech-stack-decision.md`.

## Output Structure

```markdown
# Tech Stack Decision: [Product Name]

## Recommendation

**Stack:** [Full stack description — e.g., "Elixir + Phoenix + Ash + PostgreSQL"]
**Category:** [Product category from the preferred stack table]
**Architect agent:** [elixir-alchemist or tech-smith]
**Architecture skill:** [defining-architecture]

## Product Requirements Summary

| Factor | Requirement | Source |
|--------|------------|--------|
| Product type | [SaaS, mobile, static, CLI, etc.] | MVP Brief |
| Target platform | [Web, iOS, Android, desktop, etc.] | Design Spec |
| Deployment model | [Cloud, sovereign, edge, hybrid] | Strategy |
| Real-time needs | [Yes/No — what specifically] | Design Spec |
| Performance needs | [Latency, throughput, concurrency] | Design Spec |
| Scale expectations | [Users, transactions, data volume] | Strategy |
| Key integrations | [External systems, APIs] | MVP Brief |

## Rationale

[Why this stack for this product. Reference specific product requirements that
drove the decision. If the product fits squarely in a category from the preferred
stack table, say so — "standard approach" is a valid rationale.]

## User Preference

[If provided: what was requested, how it was incorporated. If the recommendation
differs from the preference, explain why clearly.]

[If not provided: "No preference specified. Recommendation based on product
requirements and Vigensis preferred stack."]

## Alternatives Considered

| Alternative | Why Not |
|---|---|
| [Stack A] | [Specific reason — not "it's worse" but "it lacks X which this product needs"] |
| [Stack B] | [Specific reason] |

## Architecture Guidance

[2-3 sentences of stack-specific guidance for the architect. What patterns are
most relevant? What should the architect pay special attention to? This primes
the architecture step without prescribing it.]
```

## Output for Workflow Routing

After writing the decision document, your final response MUST end with exactly
this JSON block (the workflow engine reads it for routing):

```json
{
  "stack": "[full stack name]",
  "agent": "[elixir-alchemist or tech-smith]",
  "skill": "defining-architecture"
}
```

**CRITICAL:** The `agent` value must be exactly `elixir-alchemist` or `tech-smith`.
The `skill` value must be exactly `defining-architecture`. No other values are valid.

## Iteration Awareness

Check if `docs/product-definition/working/tech-stack-decision.md` already exists.

**If it exists** — refinement iteration:
- Read existing document first
- User instruction likely contains feedback on the stack choice
- Re-evaluate based on new information
- Update the recommendation if warranted

**If it doesn't exist** — create fresh from product documents.

## Quality Standards

- The recommendation must be grounded in product requirements, not preferences
- Every factor in the requirements table must be filled from the source documents
- Alternatives must include at least one genuinely viable option (not straw men)
- User instructions must be addressed explicitly — adopted, enriched, or explained
- The rationale must be specific to this product, not generic "Elixir is good"
- Architecture guidance must give the specialist architect a useful head start
- The JSON routing block must use only valid agent and skill names

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|---|---|---|
| **Always recommending Elixir** | Ignoring product requirements | A mobile app needs Flutter, not Phoenix LiveView |
| **Ignoring user instruction** | Silent override | Address preference explicitly, explain if overriding |
| **Generic rationale** | "Elixir is fast and fault-tolerant" | Tie rationale to THIS product's specific needs |
| **Hallucinating agents** | Inventing agent names like "flutter-expert" | Only `elixir-alchemist` and `tech-smith` are valid |
| **Over-specifying** | Choosing database, hosting, CI in this step | This step picks the primary stack. Details belong in architecture. |
| **Missing the hybrid** | Recommending only client-side for mobile | Mobile apps with Elixir backends are hybrid stacks — specify both |
