---
name: extracting-ideas
description: "DEPRECATED: Use initializing-products instead. This skill has been superseded by initializing-products which provides comprehensive product research including competitive analysis, user voice, and opportunity identification."
deprecated: true
superseded_by: initializing-products
---

# DEPRECATED - Use `initializing-products` Instead

> **This skill has been superseded by `initializing-products`.**
>
> The `initializing-products` skill provides:
> - Same codebase analysis capabilities
> - Plus website-based research when code isn't available
> - Plus name+description-only mode for AI-assisted initialization
> - Plus competitive landscape analysis
> - Plus user voice research (reviews, discussions)
> - Plus explicit opportunity and differentiation analysis
> - Cleaner 7-file output structure (vs 10 overlapping files)
>
> **Use `/initializing-products` for all new product initialization.**

---

# Extracting Ideas from Codebases (Legacy)

Analyzes an existing codebase to extract the core idea, user needs, workflows, data models, and learnings - NOT the implementation details. Creates structured input files for MVP creation.

## Prime Directive

**Extract the IDEA, not the IMPLEMENTATION.**

We want to understand what problem they solved and how they thought about it - not copy their code. The output feeds into `creating-mvp` which will build a fresh implementation using our preferred tech stack.

## When to Use

Use this skill when:
- Bootstrapping a new Flow from an external repository
- User selected "Extract Idea" mode (vs "Import Codebase")
- Want to study an existing project to build something similar
- Need to understand a client's existing system before rebuilding

## Key Principles

### 1. Explain, Don't Catalog

**Bad:** "Routes: /dashboard, /settings, /users, /projects, /reports"

**Good:** "Users land on a dashboard that provides an overview of their projects. Settings and reports are secondary navigation items, suggesting they're used less frequently. The primary workflow centers on managing projects and collaborating with team members."

### 2. Intent Over Implementation

**Bad:** "Uses React with Redux for state management, PostgreSQL database with 23 tables"

**Good:** "The application maintains complex state across user sessions, suggesting users work on tasks over multiple visits. The data model centers on Projects, Tasks, and Users with rich relationships."

### 3. Never Fabricate

- If you can't find information, say "Unknown" or "Not found in codebase"
- Assumptions must be labeled: "Inferred: based on X, this appears to..."
- Gaps are valuable signal - note what's missing

### 4. Spot Complexity, Not Code

- Where did they invest significant effort? That's where the real problem is
- What edge cases did they handle? Those reveal what they learned
- What workarounds exist? Those reveal constraints they hit

### 5. External Matters, Internal Doesn't

**Extract:** "Needs payment processing, email delivery, file storage"

**Ignore:** "Uses Stripe Node SDK v12.3.4 with webhook handlers"

We'll make our own technology choices. What matters is what external capabilities the product needs.

---

## Process

### Step 1: Orientation (5 minutes)

**Read high-level documentation:**
- README.md - often contains the "why"
- docs/ folder - architecture, guides, decisions
- CHANGELOG.md - evolution and priorities
- package.json / mix.exs / requirements.txt - project identity

**Scan structure:**
- Folder organization reveals architecture thinking
- Naming conventions reveal domain concepts
- Size of directories reveals where complexity lives

**Create mental model:**
- What type of product is this? (web app, API, CLI, library)
- Who is it for?
- What's the core value proposition?

### Step 2: Product Extraction (10 minutes)

**Look for:**
- Marketing copy, taglines, "about" content
- README "why" sections
- Onboarding flows (reveal what they think users need to learn)
- Feature lists, pricing tiers (if present)
- User roles and permissions (reveal user segments)

**Extract into:**
- `idea-and-vision.md` - Core concept, purpose
- `users-and-personas.md` - Target users, segments
- `value-and-positioning.md` - Problems solved, benefits

### Step 3: Design Extraction (10 minutes)

**Analyze (looking for intent, not implementation):**
- Route structure → User journeys (what paths do users take?)
- UI components → Interaction patterns (how do users provide input?)
- Error handling → Edge cases considered (what can go wrong?)
- Empty states → Ideal outcomes (what should success look like?)
- Navigation → Information architecture (how is content organized?)

**Extract into:**
- `workflows-and-journeys.md` - User goals, task flows
- `interaction-patterns.md` - Navigation, input, feedback

**Key question:** "What were they TRYING to build, not just what did they build?"

### Step 4: Technical Extraction (10 minutes)

**Focus on WHAT, not HOW:**
- Data models / schemas → Core domain concepts
- API endpoints → External interfaces needed
- Config files → External services required
- Complex code sections → Hard problems being solved
- Comments explaining "why" → Lessons learned

**Extract into:**
- `data-and-entities.md` - Domain concepts, relationships
- `integrations-and-externals.md` - External services, APIs
- `complexity-and-learnings.md` - Hard problems, insights

**Skip entirely:**
- Build configuration
- Deployment scripts
- Framework-specific patterns
- Test implementation details
- CI/CD pipelines

### Step 5: Synthesis (5 minutes)

**Create summary:**
- `source-summary.md` - Where this came from, type of project
- `extraction-notes.md` - What we couldn't determine, assumptions made

**Quality check:**
- Have we explained, not cataloged?
- Are assumptions clearly labeled?
- Did we capture complexity and learnings?
- Is this useful for someone starting fresh?

---

## Output Structure

All files go in the `input/` folder of the new Flow:

```
input/
├── source-summary.md           # Provenance and context
│
├── idea-and-vision.md          # Core concept, purpose, why it exists
├── users-and-personas.md       # Target users, goals, segments
├── value-and-positioning.md    # Problems solved, market context
│
├── workflows-and-journeys.md   # User goals, task flows, success states
├── interaction-patterns.md     # Navigation, input/feedback, UX approach
│
├── data-and-entities.md        # Domain concepts, relationships
├── integrations-and-externals.md # External services, APIs, data sources
├── complexity-and-learnings.md # Hard problems, edge cases, insights
│
└── extraction-notes.md         # Gaps, assumptions, confidence levels
```

---

## File Templates

### source-summary.md

```markdown
# Source Summary

**Source Repository**: [URL]
**Extraction Date**: YYYY-MM-DD
**Project Type**: [Web App / API / CLI / Library / Mobile App / etc.]

## Overview

[2-3 sentences: What is this project? What does it do?]

## Repository Stats

- **Primary Language**: [Language]
- **Last Activity**: [Date or "Active" / "Stale"]
- **Size**: [Small / Medium / Large - subjective assessment]
- **Maturity**: [Early prototype / MVP / Growing / Mature - based on evidence]

## Key Observations

[3-5 bullet points of high-level observations about the project]
```

### idea-and-vision.md

```markdown
# Idea and Vision

## Core Problem

[What problem does this product solve? For whom?]

**Evidence**: [Where did you find this? README, docs, marketing copy?]

## Purpose Statement

[Why does this exist? What's the mission?]

**Observed**: [Direct quotes or clear statements found]
**Inferred**: [If no clear statement, what does the product imply?]

## Key Differentiators

[What makes this different from alternatives? How does it position itself?]

- [Differentiator 1] - [Evidence]
- [Differentiator 2] - [Evidence]

## Vision (if found)

[Any long-term vision statements or roadmap hints?]

## Unknown

[What couldn't you determine about the idea/vision?]
```

### users-and-personas.md

```markdown
# Users and Personas

## Primary Users

### [User Type 1]

**Role**: [What role do they play?]
**Goals**: [What are they trying to accomplish?]
**Evidence**: [How did you identify this user type?]

### [User Type 2]

[Same structure...]

## User Segments

[Are there distinct segments? Free vs paid? Individual vs team?]

## User Needs (Observed)

Needs explicitly addressed by the product:

- [Need 1] - [Evidence: feature, flow, or documentation]
- [Need 2] - [Evidence]

## User Needs (Inferred)

Needs implied by the implementation:

- [Inferred need 1] - [Why you think this]
- [Inferred need 2] - [Why you think this]

## Unknown

[What couldn't you determine about users?]
```

### value-and-positioning.md

```markdown
# Value and Positioning

## Problems Solved

| Problem | How Addressed | Evidence |
|---------|---------------|----------|
| [Problem 1] | [Solution approach] | [Where found] |
| [Problem 2] | [Solution approach] | [Where found] |

## Benefits Delivered

What value do users get?

- [Benefit 1]
- [Benefit 2]

## Market Context

### Competitors Mentioned

- [Competitor 1] - [How referenced: "alternative to X", comparison, etc.]

### Positioning

[How does this position itself? Budget option? Premium? Niche specialist?]

## Business Model (if found)

[Any hints about monetization? Pricing tiers? Free vs paid features?]

## Unknown

[What couldn't you determine about value/positioning?]
```

### workflows-and-journeys.md

```markdown
# Workflows and Journeys

## Primary User Goals

What are users trying to accomplish?

1. **[Goal 1]**: [Description]
2. **[Goal 2]**: [Description]

## Key Task Flows

### [Task Flow 1: e.g., "Creating a Project"]

**Goal**: [What the user wants to achieve]

**Flow**:
1. [Step 1 - what happens]
2. [Step 2 - decisions/branches]
3. [Step 3 - completion]

**Success State**: [What does "done" look like?]

### [Task Flow 2]

[Same structure...]

## Decision Points

Where do users make important choices?

- [Decision 1]: [Options and implications]
- [Decision 2]: [Options and implications]

## Entry Points

How do users start using the product?

- [Entry point 1: Signup? Import? Quick start?]

## Unknown

[What workflows couldn't you fully trace?]
```

### interaction-patterns.md

```markdown
# Interaction Patterns

## Navigation Paradigm

[How do users move around? Sidebar? Tabs? Breadcrumbs? Search-centric?]

**Inferred UX Principle**: [What does this suggest about their design philosophy?]

## Input Patterns

How do users provide information?

- **Forms**: [Wizard? Single page? Inline editing?]
- **Data entry**: [Manual? Import? API?]
- **Selection**: [Dropdowns? Search? Recent items?]

## Feedback Patterns

How does the system communicate with users?

- **Success**: [Toast? Redirect? Inline?]
- **Errors**: [How are errors shown? How specific?]
- **Progress**: [Loading states? Progress bars?]

## Edge Case Handling

How are unusual situations handled?

- **Empty states**: [What do users see with no data?]
- **Error recovery**: [Can users recover from mistakes?]
- **Offline/failure**: [Any graceful degradation?]

## Inferred UX Principles

Based on the patterns observed, they seem to value:

- [Principle 1] - [Evidence]
- [Principle 2] - [Evidence]

## Unknown

[What interaction patterns couldn't you determine?]
```

### data-and-entities.md

```markdown
# Data and Entities

## Core Domain Concepts

The fundamental "nouns" of the system:

### [Entity 1: e.g., Project]

**Purpose**: [What does this represent?]
**Key Attributes**: [Important properties - conceptual, not schema]
**Relationships**: [How does it connect to other entities?]

### [Entity 2: e.g., User]

[Same structure...]

## Key Relationships

```
[Simple diagram or description of how entities relate]

User --owns--> Project
Project --contains--> Task
Task --assigned to--> User
```

## Important Constraints

Business rules implied by the data model:

- [Constraint 1: e.g., "A project must have at least one owner"]
- [Constraint 2: e.g., "Tasks cannot be reassigned once completed"]

## Data Flows

How does data move through the system?

- [Flow 1: e.g., "User creates project → Tasks inherit project settings"]

## Unknown

[What data concepts couldn't you fully understand?]
```

### integrations-and-externals.md

```markdown
# Integrations and External Services

## External Services Required

| Service Type | Purpose | Evidence |
|--------------|---------|----------|
| [e.g., Payment processing] | [Why needed] | [Config file, API client, etc.] |
| [e.g., Email delivery] | [Why needed] | [Evidence] |
| [e.g., File storage] | [Why needed] | [Evidence] |

## Third-Party APIs Consumed

- **[API 1]**: [What data/functionality it provides]
- **[API 2]**: [What data/functionality it provides]

## Data Sources

Where does data come from?

- [Source 1]: [What type of data]
- [Source 2]: [What type of data]

## Infrastructure Requirements (Conceptual)

Not specific technologies, but capabilities needed:

- [e.g., "Needs background job processing for long-running tasks"]
- [e.g., "Requires real-time updates for collaboration"]
- [e.g., "Needs to handle file uploads up to 100MB"]

## Unknown

[What external dependencies couldn't you identify?]
```

### complexity-and-learnings.md

```markdown
# Complexity and Learnings

## Areas of High Complexity

Where did they invest significant effort?

### [Complex Area 1: e.g., "Scheduling Algorithm"]

**What**: [Description of the complex area]
**Why Complex**: [What makes this hard?]
**Their Approach**: [High-level summary of their solution]
**Insight**: [What can we learn from this?]

### [Complex Area 2]

[Same structure...]

## Edge Cases Handled

What unusual situations did they explicitly handle?

- [Edge case 1]: [How handled] - [What this teaches us]
- [Edge case 2]: [How handled] - [What this teaches us]

## Workarounds Present

Signs of constraints they hit:

- [Workaround 1]: [What constraint it reveals]
- [Workaround 2]: [What constraint it reveals]

## "Here Be Dragons" Warnings

Areas that seem fragile or over-complicated:

- [Area 1]: [Why it's concerning]
- [Area 2]: [Why it's concerning]

## Hidden Insights

Learnings embedded in comments, commit messages, or code structure:

- [Insight 1]: [Where found]
- [Insight 2]: [Where found]

## What We Should Avoid

Based on their experience:

- [Anti-pattern or approach to avoid]
- [Problem they seemed to struggle with]

## Unknown

[What complexity couldn't you assess?]
```

### extraction-notes.md

```markdown
# Extraction Notes

## What We Couldn't Determine

Areas where information was incomplete or absent:

| Area | What's Missing | Impact |
|------|----------------|--------|
| [Area 1] | [What's unknown] | [How it affects our understanding] |
| [Area 2] | [What's unknown] | [How it affects our understanding] |

## Assumptions Made

Assumptions marked throughout the extraction:

| Assumption | Basis | Confidence |
|------------|-------|------------|
| [Assumption 1] | [Why we assumed this] | High / Medium / Low |
| [Assumption 2] | [Why we assumed this] | High / Medium / Low |

## Confidence Levels by Section

| Section | Confidence | Notes |
|---------|------------|-------|
| idea-and-vision.md | [High/Med/Low] | [Why] |
| users-and-personas.md | [High/Med/Low] | [Why] |
| value-and-positioning.md | [High/Med/Low] | [Why] |
| workflows-and-journeys.md | [High/Med/Low] | [Why] |
| interaction-patterns.md | [High/Med/Low] | [Why] |
| data-and-entities.md | [High/Med/Low] | [Why] |
| integrations-and-externals.md | [High/Med/Low] | [Why] |
| complexity-and-learnings.md | [High/Med/Low] | [Why] |

## Recommendations for Trio

Before starting MVP creation, consider investigating:

- [Question 1 that would significantly change approach]
- [Question 2 that needs human judgment]

## Source Quality Assessment

**Overall Documentation Quality**: [Good / Moderate / Poor]
**Code Quality**: [Clean / Average / Legacy]
**Extraction Difficulty**: [Easy / Moderate / Challenging]
```

---

## Usage in Bootstrap Workflow

This skill is used in the "Extract Idea" mode of Bootstrap from External:

```
EXTERNAL REPO
    ↓
[Clone to temp directory]
    ↓
[extracting-ideas skill]  ← YOU ARE HERE
    ↓
input/ files (10 structured markdown files)
    ↓
[Create fresh repo in via-vigensis]
    ↓
[Initialize with extracted input + AI Infra]
    ↓
NEW FLOW (ready for creating-mvp)
```

The extracted input files then feed into the standard MVP creation workflow:

```
input/ files
    ↓
[creating-mvp or understanding-mvp]
    ↓
Product Trio Discovery
    ↓
Vision, Strategy, Roadmap
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Cataloging** | Lists files/functions without insight | Explain the WHY, not the WHAT |
| **Tech obsession** | Focusing on implementation details | Focus on capabilities needed |
| **Fabrication** | Making up information not in source | Mark unknowns explicitly |
| **Shallow analysis** | Missing complexity/learnings | Dig into hard parts |
| **No attribution** | Claims without evidence | Note where you found things |
| **Implementation copying** | Describing their code | Describe the concepts |

---

## Quality Checklist

Before completing extraction:

- [ ] All 10 output files created
- [ ] Explanations are narrative, not lists
- [ ] Technology choices are abstracted to capabilities
- [ ] Assumptions are clearly labeled with "Inferred:"
- [ ] Unknowns are documented, not glossed over
- [ ] Complexity areas identified with insights
- [ ] extraction-notes.md has confidence assessments
- [ ] Output is useful for someone starting fresh
