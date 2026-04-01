---
name: creating-agents
description: Creates agent system prompts (persona definition files). Use when creating, writing, or adding agents. Triggers: "create agent", "new agent", "add agent", "define persona", "how do I make an agent".
---

# Creating Agents

Creates portable, production-ready agent system prompts that work across platforms (Claude Code, Gemini Gems, OpenAI, LangGraph, custom deployments).

## What Agents Are

**Agents define WHO** (identity, perspective, communication style) while **Skills define HOW** (workflows, processes, step-by-step procedures).

---

## Writing for Models, Not Humans

**Critical:** Agent files are instructions that shape model behavior, not documentation about agents.

**Write as behavioral instructions:**
- Second person for identity: "You are...", "You excel at..."
- Imperative for actions: "Challenge assumptions", "Ask clarifying questions"
- Positive framing for constraints: "Focus on prompt design" not "Do not write code"

**Avoid documentation style:**
- Third person descriptions ("This agent does...")
- Explanatory prose about why the agent exists
- Human-oriented context ("Users will find this helpful...")

**The entire agent file becomes the model's persona.** Everything in it is an instruction the model follows, not information for someone reading about the agent.

---

## Format: Hybrid XML + Markdown

Agent prompts use XML tags for structural boundaries with markdown content inside. This follows cross-provider best practices and works across Claude, GPT, Gemini, and open models.

**Why hybrid:**
- XML provides unambiguous section delimiters models parse reliably
- Markdown provides readability within sections
- All major providers (Anthropic, OpenAI, Google) support this approach

---

## Agent File Structure

```
.claude/agents/agent-name.md     # Agent definition file (project-scoped)
~/.claude/agents/agent-name.md   # Agent definition file (user-scoped)
```

Each agent file contains:
1. YAML frontmatter (metadata for deployment platforms)
2. System prompt content (XML+markdown, sent to model)

---

## Section Order

Research-backed ordering that works across model providers:

| Order | Section | XML Tag | Purpose |
|-------|---------|---------|---------|
| 1 | Role + Tone | `<role>` | Identity, expertise, communication style |
| 2 | Objective | `<objective>` | What success looks like (outcome-focused) |
| 3 | Instructions | `<instructions>` | How the agent behaves |
| 4 | Capabilities | `<capabilities>` | What the agent does well |
| 5 | Examples | `<examples>` | Show ideal behavior with contrast |
| 6 | Knowledge | `<knowledge>` | Authoritative source anchoring |
| 7 | Constraints | `<constraints>` | Boundaries and quality checks (LAST) |

**Constraints go last.** Research shows models (especially Gemini) may drop constraints placed too early in the prompt.

**Tone lives in Role.** Communication style is part of identity, not a separate concern. Models treat the role section as the strongest behavioral anchor.

---

## YAML Frontmatter

```yaml
---
name: agent-name                    # Lowercase, hyphens, max 64 chars
summary: What the agent does        # Human-readable, 8 words or fewer
description: >                      # When to invoke (LLM trigger matching)
  Use when asking about [topics],
  [topics], or when [domain]
  perspective is needed.
emoji: "🎯"                         # For UI display
domain: domain-name                 # For categorization
# Optional - capability overrides (omit to inherit defaults)
tools: [Read, Grep, Glob, ...]      # Restrict tool access
model: sonnet                       # Override model (or 'inherit')
permission_mode: plan               # For SDK: plan | acceptEdits | full
skills: exploring-product-idea      # Auto-load specific skills
---
```

### Description is Critical

The model uses `description` to match tasks to agents. Include:
- Specific topics the agent handles
- Trigger phrases users would say
- Domain keywords

---

## Creation Process

### Step 1: Define the Persona

Answer these questions:
- What role does this agent play?
- What unique perspective does it bring?
- What domain expertise does it have?
- What should it focus on (and defer)?

### Step 2: Plan the Structure

Keep agents lean. Put detailed workflows in skills.

| In Agent | In Skills |
|----------|-----------|
| Identity (who you are) | Detailed workflows |
| Objective (outcome) | Step-by-step processes |
| Capabilities (what you do) | Scripts and templates |
| Constraints (boundaries) | Reference documentation |
| Communication style | Domain-specific techniques |

### Step 3: Write the Agent File

Use the template below. Key principles:

- **Self-contained:** No external file references (`@file` includes). The agent must work independently on any platform.
- **Portable:** No platform-specific tool names or hardcoded agent names. Use generic references ("a product designer" not "Design Shaper").
- **Positive framing:** Constraints say what to focus on, not what to avoid. Reserve negative framing for hard safety boundaries.
- **Examples included:** At least one good example with a wrong-approach contrast.
- **Under 200 lines of prompt content** (excluding frontmatter and template comments). Move detailed content to skills.

### Step 4: Test

New agent files require a session restart before activation works.

The agent is available via:
- `/list` - Shows the new agent
- `/activate agent-name` - Activates by filename or name field
- Task tool with `subagent_type` - For LLM invocation

---

## Template

Replace bracketed [placeholders] with specific content. Remove all template comments
(lines starting with `>`). Delete optional sections you don't need.

```
---
name: [agent-slug]
summary: [One-line description, 8 words or fewer]
description: >
  [When to use this agent. What triggers activation.
  2-3 sentences covering the agent's scope.]
emoji: "[single emoji]"
domain: [domain-slug]
---

<role>
## [Agent Title / Name]

You are "[AgentName]," [a/an] [role description] with [expertise context].
[1-2 sentences defining core identity: who you are, what makes you distinctive,
your relationship to the user.]

### Communication Style

- [Trait 1: specific linguistic markers — HOW you communicate, not just WHAT]
- [Trait 2: e.g., "Use 'we' and 'let's' to create partnership"]
- [Trait 3: e.g., "Explain reasoning transparently: 'I'm suggesting X because...'"]
</role>
```

> **Guidance:** Role is the anchor. Models treat this section as the strongest
> behavioral signal. Include tone here — it's part of identity, not a separate concern.
> 3-4 communication traits is sufficient. Use positive framing ("Use collaborative
> language" not "Don't talk down to the user").

```
<objective>
[What success looks like in 1-2 sentences. What does the user walk away with?
Frame as outcome, not activity.]
</objective>
```

> **Guidance:** Keep this short and outcome-focused. "Transform users from X to Y"
> is better than "Help users with X, Y, and Z tasks."

```
<instructions>
## Core Approach

[1-2 sentences on the fundamental methodology or philosophy that guides all behavior.]

### When to Ask Questions

- [Trigger situation] -> [What to ask or do]
- [Trigger situation] -> [What to ask or do]
- Sufficient context is provided -> Proceed directly without unnecessary questions

### How to Structure Responses

- **When [scenario]:** [Response pattern]
- **When [scenario]:** [Response pattern]
- **When [scenario]:** [Response pattern]
</instructions>
```

> **Guidance:** Instructions define HOW the agent behaves. Keep at the "right altitude" —
> specific enough to guide, flexible enough to be heuristic. Avoid hardcoding brittle
> logic. If you find yourself writing complex if/then chains, step back and find
> the principle behind them.

```
<capabilities>
## What You Do Well

### [Capability Category 1]
[Verb-led description of what this capability is:]
- [Specific skill with enough context to guide behavior]
- [Specific skill with enough context to guide behavior]

### [Capability Category 2]
[Verb-led description:]
- [Specific skill]
- [Specific skill]

### [Capability Category 3]
[Verb-led description:]
- [Specific skill]
- [Specific skill]
</capabilities>
```

> **Guidance:** 3-5 capability categories is the sweet spot. Each should be distinct —
> if two categories overlap significantly, merge them. Use verb-led descriptions
> ("Analyze X for Y" not "X analysis"). Include enough context for the model to
> know WHEN to apply each capability, not just what it is.

```
<examples>
## [Example Title: describes the pattern being demonstrated]

**User:** "[Realistic user input]"

**[AgentName]:** "[Ideal response demonstrating voice, methodology, and capabilities]"

**Why this works:** [1 sentence explaining the principle this example illustrates]

---

**Wrong approach:** "[Poor response showing what to avoid]"

**Why that fails:** [1 sentence explaining the failure]
</examples>
```

> **Guidance:** Examples are more effective than rules. Include 2-3 that cover:
> (1) a common interaction showing ideal behavior, (2) a contrast showing what
> to avoid and why. Make examples realistic and specific to the domain.
> Research shows 3-5 diverse examples is optimal; more than 5 hits diminishing returns.

```
<knowledge>
## Expert Knowledge

Your expertise is grounded in authoritative sources including:
- [Book/Framework 1 (Author)]
- [Book/Framework 2 (Author)]
- [Book/Framework 3 (Author)]

When available, use expert knowledge tools to access deeper domain content.
Cite sources when referencing specific frameworks or research.
Acknowledge when information is outside your knowledge rather than guessing.
</knowledge>
```

> **Guidance:** Reference lists anchor the model's knowledge without requiring
> tool access. 3-7 sources is sufficient. Use general "expert knowledge tools"
> framing — works whether the agent has MCP, RAG, or no tools at all.
> This section is optional but recommended for domain-specialist agents.

```
<constraints>
## Boundaries

[Positive framing of scope — what the agent focuses on.]

When questions fall outside your domain, acknowledge the boundary and suggest
the user consult a relevant expert. For example:
- [Domain A questions] -> [type of expert]
- [Domain B questions] -> [type of expert]

### Quality Checks

Before responding, verify:
- Does this answer the user's actual question?
- Have I explained my reasoning, not just provided a solution?
- [Domain-specific quality check]
- [Domain-specific quality check]
</constraints>
```

> **Guidance:** Constraints go LAST — research shows models (especially Gemini)
> may drop constraints placed too early. Use positive framing: "Focus on X" rather
> than "Do not do Y." Reserve negative framing for hard safety boundaries only.
> Use generic expert references ("a product designer") not specific agent names
> ("Design Shaper") for portability. Quality checks are self-verification prompts
> that improve response quality — include 3-5 relevant to the domain.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Pure markdown format | Use hybrid XML+markdown (XML boundaries, markdown content) |
| Tone as separate section | Fold communication style into `<role>` |
| Constraints placed early | Move `<constraints>` to last section |
| Negative framing ("I am not X") | Positive framing ("Focus on X, defer Y to experts") |
| Hardcoded agent names in constraints | Generic references ("a product designer") |
| Tool-specific knowledge references | Generic framing ("expert knowledge tools") |
| External file dependencies (@file) | Self-contained — all content in one file |
| No examples | Include at least one good + wrong approach contrast |
| Vague description in frontmatter | Include specific trigger phrases and topics |
| Too much detail (>200 lines) | Move workflows to skills |
| Separate "Prime Directive" / "Purpose" | Fold into `<role>` and `<objective>` |

---

## Validation Checklist

**Format:**
- [ ] Hybrid XML+markdown (XML section tags, markdown content inside)
- [ ] Section order: role, objective, instructions, capabilities, examples, knowledge, constraints
- [ ] Constraints are the last section
- [ ] Under 200 lines of prompt content

**Frontmatter:**
- [ ] name, summary, description, emoji, domain fields present
- [ ] Description has specific LLM trigger phrases

**Content:**
- [ ] Self-contained: no @file references or external dependencies
- [ ] Portable: no platform-specific tool names or hardcoded agent names
- [ ] Role includes communication style (tone folded in)
- [ ] Objective is outcome-focused (1-2 sentences)
- [ ] Constraints use positive framing
- [ ] Generic expert deferral pattern (not hardcoded names)
- [ ] At least one example with wrong-approach contrast
- [ ] Knowledge sources listed (for domain specialists)
- [ ] Quality checks included in constraints

**Activation:**
- [ ] Description triggers for intended tasks
- [ ] Tested on target platform(s)

