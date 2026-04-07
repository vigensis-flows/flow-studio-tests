---
name: creating-design-specification
description: >
  Creates the design specification — how the product works. Defines the
  conceptual model, user flows, screen inventory, information architecture,
  interaction patterns, state design, and the First Moment. This is the
  behavioral blueprint that visual, content, and architecture documents
  all build from. Owned by the Design Shaper. Use after the Strategy is complete.
argument-hint: "<product-slug>"
---

# Creating Design Specification

You are acting as the Design Shaper creating a design specification for an MVP.
This document defines **how the product works** — the experience the user has,
the flows they follow, the screens they see, and how the product responds to
their actions in every state.

**This is not a visual design.** Colors, typography, and styling are the
Visual Specification's job. This document describes behavior, structure, and
interaction — what the user does and what happens, not how it looks.

**This is not a feature list.** Features are capabilities. The design spec
describes the experience of using those capabilities — the journey, not the
inventory.

**This is not a wireframe.** We don't produce static mockups. We describe
the experience precisely enough that a designer-engineer can build it
directly, and a visual designer can style it.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Vision | `docs/product-definition/1-product-vision.md` | Yes |
| Strategy | `docs/product-definition/2-product-strategy.md` | Yes |
| MVP Brief | `docs/product-definition/3-mvp-brief.md` | Yes |
| User instruction | Workflow context | No |

**Why all three upstream documents?**
- **MVP Brief:** Defines what capabilities are in scope, the primary user,
  and the First Moment sketch that this spec expands into full design
- **Vision:** Defines the product personality — opinionated vs flexible,
  professional vs approachable — which shapes every interaction decision
- **Strategy:** Defines the GTM motion (self-service vs guided), pricing
  tiers (what's gated), and target market (complexity expectations)

## Process

### Step 1: Understand the User's World

Read all three upstream documents. Before designing anything, form a clear
picture of:
- **Who is the user?** (From the Brief — specific persona, not segment label)
- **What are they trying to accomplish?** (The core job from the Brief)
- **What's their context?** (When and where they use this, their emotional state)
- **What's the product personality?** (From the Vision — how it feels to interact with)
- **What's the experience model?** (From the Strategy's GTM — self-service, guided, collaborative?)

### Step 2: Define the Conceptual Model

The conceptual model is how the user thinks about the product. It's the
mental model they form: "This is like a [familiar thing] that [does something new]."

A good conceptual model:
- Maps to something the user already understands
- Makes navigation intuitive (they can predict where things are)
- Makes terminology natural (labels match their expectations)
- Stays consistent throughout the product

Example: "VIA is like having a product team on retainer — you give them a
brief, they produce deliverables, you review and iterate."

### Step 3: Map the User Flows

For each capability in the MVP Brief's scope, map the user flow:
- What triggers this flow? (User action, system event, time)
- What steps does the user take?
- What does the product do at each step?
- How does the user know it worked?
- What can go wrong and what happens then?

Design all flows at full depth. Users don't experience primary vs. secondary — they experience quality or not. Optimize for consistency and quality across all flows.

### Step 4: Build the Screen Inventory

From the user flows, identify every distinct screen or view. For each:
- What is this screen's purpose? (One sentence)
- What does the user see? (Content areas, not visual design)
- What can the user do? (Actions available)
- What state is the user in when they arrive here?

### Step 5: Design the Information Architecture

How do screens relate to each other? Define:
- Navigation structure (how the user moves between screens)
- Hierarchy (what's primary, secondary, tertiary)
- Grouping (what belongs together and why)

The IA should be intuitive enough that a user can find what they need
without searching or asking for help.

### Step 6: Define Interaction Patterns

For recurring interactions, define the pattern once:
- How does the product handle long-running operations? (Progress, status)
- How does the product communicate success? (Feedback pattern)
- How does the product handle errors? (Error pattern)
- How does real-time content appear? (Streaming, live updates)
- How does the product handle destructive actions? (Confirmation pattern)

### Step 7: Design All States

For every screen, define what the user sees in every state:
- **Empty** — First time, no data yet (this IS the onboarding for that screen)
- **Loading** — Data is being fetched or computed
- **Partial** — Some data but not complete
- **Complete** — Full data, normal usage
- **Error** — Something went wrong
- **Offline** — No connection (if applicable)

Empty states are the most underdesigned and most important — they're the
first thing a new user sees on every screen.

### Step 8: Expand the First Moment

The MVP Brief has a First Moment sketch (2-3 sentences). Expand it into
a detailed, second-by-second design:
- What does the user see when they first open the product?
- What do they understand within 10 seconds?
- What action do they take first?
- What feedback do they get?
- What's their emotional state at each point?

The First Moment is the highest-leverage design surface. If users don't
understand and act within the first 30 seconds, nothing else matters.

### Step 9: Define Observable Behaviors

For each key screen, define what user behaviors indicate the design is
working or failing. These become the instrumentation requirements for
the Architecture Blueprint.

### Step 10: Write the Design Specification

Save to `docs/product-definition/4-design-specification.md`.

## Output Structure

```markdown
# Design Specification: [Product Name]

## Conceptual Model

[1-2 paragraphs: How should the user think about this product?
What familiar mental model does it map to? What metaphor guides
the experience?]

**Core metaphor:** [One sentence — "It's like having a [X] that [Y]"]

## User Flows

### Flow 1: [Primary Flow Name]
[The most important flow — the one that delivers the core value]

**Trigger:** [What starts this flow]

| Step | User Action | Product Response | User Sees |
|------|------------|-----------------|-----------|
| 1 | [What user does] | [What product does] | [What changes on screen] |
| 2 | [What user does] | [What product does] | [What changes on screen] |
| ... | ... | ... | ... |

**Success state:** [How the user knows it worked]
**Error paths:** [What can go wrong and what happens]

### Flow 2: [Secondary Flow Name]
[Same structure — continue for each flow in the MVP scope]

### Flow 3: [Additional Flow Name]
[Same depth — all flows designed at full quality]

## Screen Inventory

### [Screen 1: Name]
- **Purpose:** [One sentence — why this screen exists]
- **Arrives from:** [What screen/action brings the user here]
- **Content areas:** [What information is displayed — not visual layout, but content blocks]
- **Actions available:** [What the user can do from here]
- **Leads to:** [Where the user goes next]

### [Screen 2: Name]
[Same structure — continue for each screen]

## Information Architecture

### Navigation Structure

[Describe the navigation model. Is it:]
[- Flat (all screens accessible from one level)]
[- Hierarchical (sections → sub-sections → detail)]
[- Sequential (step 1 → step 2 → step 3)]
[- Hub-and-spoke (home screen → features → back to home)]

```
[ASCII or text diagram of the navigation tree]
```

### Screen Relationships

[How screens connect to each other. Which screens are "siblings"
(same level), which are "parent-child" (drill-down)?]

## Interaction Patterns

### Long-Running Operations
[How the product handles operations that take time — research,
generation, processing. What does the user see while waiting?
Can they do other things? How do they know it's done?]

### Success Feedback
[How the product communicates that an action succeeded.
Toast? Inline? State change? How long does it persist?]

### Error Handling
[How the product communicates failures. What information does
the user get? What can they do about it? Is retry available?]

### Real-Time Content
[If the product streams content, displays live updates, or shows
collaborative presence — how does this work? What appears, how,
and how does the user know content is still arriving vs complete?]

### Destructive Actions
[How the product handles irreversible actions. Confirmation pattern?
Undo window? What's the copy pattern?]

### [Additional patterns as needed]
[Add patterns specific to this product's interaction model]

## State Design

### [Screen Name]: States

**Empty State**
- **What the user sees:** [Description — not just "nothing", but the
  empty state design that invites action]
- **Primary action:** [What the user is invited to do]
- **Messaging:** [What the empty state communicates — the content
  spec will write the actual copy]

**Loading State**
- **What the user sees:** [Skeleton? Spinner? Progress bar?]
- **Duration expectation:** [Instant / seconds / minutes]

**Complete State**
- **What the user sees:** [Full data, normal operation]

**Error State**
- **What the user sees:** [Error message area + recovery action]
- **Recovery:** [What the user can do — retry, go back, contact support]

[Continue for each screen that has meaningful state variation.
Not every screen needs all states — focus on screens where state
design affects the experience.]

## First Moment

[Detailed expansion of the MVP Brief's First Moment sketch.
This should read like a story — second by second.]

### Second 0-5: Arrival
[What the user sees immediately. What's the first impression?]

### Second 5-15: Understanding
[What the user reads/scans that explains what this product does.
What click of understanding happens?]

### Second 15-30: First Action
[What the user does first. What makes this action obvious?
What feedback do they get?]

### After the First Moment
[What happens next? Where does the user go from here?
How does the product transition from "new user" to "active user"?]

## Observable Behaviors

[For each key screen, define what user behaviors to instrument.]

| Screen | Behavior to Observe | What It Tells Us |
|--------|---------------------|-----------------|
| [Screen] | [Specific user action or pattern] | [Success/failure signal] |
| [Screen] | [Specific user action or pattern] | [Success/failure signal] |

### Key Metrics
- **Activation:** [What action means a user "got it"?]
- **Engagement:** [What pattern means a user finds value?]
- **Retention signal:** [What behavior predicts they'll come back?]
- **Struggle signal:** [What behavior indicates the design is failing?]

```

## Alignment Check

Before finalizing, verify alignment with upstream documents:

- [ ] Every capability in the MVP Brief's scope has a user flow
- [ ] Nothing in the design spec adds capabilities beyond the Brief's scope
- [ ] The product personality from the Vision is reflected in the interaction patterns
- [ ] The GTM motion from the Strategy is reflected in the onboarding approach
- [ ] The First Moment expands (not contradicts) the Brief's First Moment sketch
- [ ] Pricing tier gating from the Strategy is designed into the experience
- [ ] Observable behaviors connect to the Brief's hypotheses and the Strategy's metrics

If upstream documents conflict or have gaps, make your best judgment and
proceed. Note significant assumptions inline. The human reviews the full
package and the final review step catches cross-document inconsistencies.

## Iteration Awareness

Check if `docs/product-definition/4-design-specification.md` already exists.

**If it exists** — this is a refinement iteration:
- Read the existing document first
- Read the user instruction carefully — it likely contains feedback
  on specific flows, screens, or interaction patterns
- Refine and improve — don't start from scratch
- Preserve what works, update what needs to change
- Add a `## Revision Notes` section at the end noting what changed and why

**If it doesn't exist** — create it fresh from the upstream documents.

## Quality Standards

- **Every screen in every state.** The happy path is maybe 30% of the real
  experience. Empty, loading, and error states are where users form their
  opinion of quality.
- **User flows must be concrete.** "The user creates a project" is not a flow.
  "The user clicks 'New Project', enters a name, selects a template, clicks
  'Create', sees the project dashboard with the template applied" is a flow.
- **The First Moment must be detailed.** If a designer-engineer can't build
  the first 30 seconds from this description alone, it's not specific enough.
- **Interaction patterns must be defined once, referenced everywhere.** If you
  describe the error handling pattern on screen 1 and again on screen 3,
  you've defined it twice. Define it once in Interaction Patterns, reference it.
- **Observable behaviors must be specific.** "Users engage with the product" is
  not observable. "Users complete the first brief within 30 minutes without
  asking for help" is observable.
- **No visual design.** Don't specify colors, fonts, spacing, or component
  styles. Describe behavior and content structure. The Visual Spec handles
  appearance.
- **Length: 300-600 lines.** This is the longest document in the definition.
  It needs to be comprehensive enough that Visual, Content, and Architecture
  can all build from it.

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Feature list as spec** | Lists capabilities without flows | Map every capability as a user journey |
| **Happy path only** | No empty, error, or loading states | Design all states for every screen |
| **Wireframes in words** | Describes layout, not behavior | Focus on what happens, not how it's arranged |
| **Visual design leak** | Specifies colors, fonts, sizes | Remove — that's the Visual Spec's job |
| **Scope creep** | Adds screens beyond Brief's scope | Check every screen against the Brief |
| **Generic patterns** | "Standard error handling" | Be specific to this product's personality |
| **Missing First Moment** | Skips the most important design surface | Expand the Brief's sketch in detail |
| **Unobservable metrics** | "Users find value" | Define specific, measurable behaviors |

## What This Document Enables

The design spec is the backbone of the definition. It feeds into:
- **Visual Specification** — styles the screens and states defined here
- **Content Specification** — writes copy for the flows, empty states,
  errors, and onboarding defined here
- **Architecture Blueprint** — models the domain based on the data flows
  and screen relationships defined here. Observable behaviors become
  instrumentation requirements.

If the design spec is weak, all three downstream documents suffer.
