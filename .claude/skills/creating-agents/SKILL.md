---
name: creating-agents
description: Creates Claude Code agents (persona definition files). Use when creating, writing, or adding agents. Triggers: "create agent", "new agent", "add agent", "define persona", "how do I make an agent".
---

# Creating Agents

Creates production-ready Claude Code Agents that work in three activation modes: Human (slash commands), LLM (sub-agents), and Automation (SDK scripts).

## What Agents Are

**Agents define WHO** (identity, perspective) while **Skills define HOW** (workflows, processes).

---

## Writing for Claude (Not Humans)

**Critical:** Agent files are instructions that shape Claude's behavior, not documentation about agents.

**Write as behavioral instructions:**
- Second person for identity: "You are...", "You excel at..."
- Imperative for actions: "Challenge assumptions", "Ask clarifying questions"
- Direct constraints: "Do not make implementation decisions"

**Avoid documentation style:**
- Third person descriptions ("This agent does...")
- Explanatory prose about why the agent exists
- Human-oriented context ("Users will find this helpful...")

**The entire agent file becomes Claude's persona.** Everything in it is an instruction Claude follows, not information for someone reading about the agent.

**Litmus test:** Is this telling Claude how to behave, or explaining to a human what the agent is? Only the former belongs in the file.

---

## Agent Structure

```
.claude/agents/
├── agent-name.md                      # Agent definition file
├── registry.json                      # Maps keys to files (for human activation)
└── universal-interaction-patterns.md  # Shared interaction patterns
```

**Locations:**
- Project: `.claude/agents/` (version controlled)
- Personal: `~/.claude/agents/` (user-wide)

---

## Three Activation Modes

Agents support three ways to be invoked:

| Mode | Mechanism | Use Case |
|------|-----------|----------|
| **Human** | Slash commands (`/activate`, `/team`) | Interactive collaboration |
| **LLM** | Task tool with `subagent_type` | Focused tasks during conversation |
| **Automation** | Agent SDK scripts | Workflows, pipelines, batch processing |

The unified file format enables all three modes from a single definition.

---

## YAML Frontmatter Schema

```yaml
---
# Required
name: agent-name                    # Lowercase, hyphens, max 64 chars
summary: Human-readable description # What the agent does (for display)
description: LLM trigger phrases    # When to use (for auto-matching)

# Optional - display/organization
emoji: "🎯"                         # For UI display
domain: product-management          # For categorization

# Optional - capability overrides (omit to inherit defaults)
tools: [Read, Grep, Glob, ...]      # Restrict tool access
model: sonnet                       # Override model (or 'inherit')
permission_mode: plan               # For SDK: plan | acceptEdits | full
skills: exploring-product-idea      # Auto-load specific skills
---
```

### Name Field
- Lowercase letters, numbers, hyphens only
- Max 64 characters
- Use noun form: `product-maestro`, `tech-smith`

### Summary vs Description

| Field | Purpose | Audience | Example |
|-------|---------|----------|---------|
| `summary` | What the agent does | Humans | "Product Manager focused on viability" |
| `description` | When to invoke | LLM matching | "Use when asking about product strategy, roadmap, prioritization..." |

**Description is critical** - Claude uses it to match tasks to sub-agents. Include:
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
- What should it NOT do (boundaries)?

### Step 2: Plan the Structure

Keep agents lean. Put detailed workflows in skills.

| In Agent | In Skills | Example |
|----------|-----------|---------|
| Identity (who you are) | Detailed workflows | "I assess feasibility" → "How to assess feasibility" |
| Prime directive | Step-by-step processes | "I focus on outcomes" → "Outcome mapping process" |
| Capabilities | Scripts and templates | "I use Socratic questioning" → "Question frameworks" |
| Constraints (boundaries) | Reference documentation | |
| Interaction style | Domain-specific techniques | |

### Step 3: Write the Agent File

**Content order:**
1. Persona (identity)
2. Prime Directive (core mission)
3. Purpose (expanded mission)
4. Tone & Interaction Style
5. Required Context (@file includes)
6. Capabilities (what you excel at)
7. Constraints & Boundaries
8. Interaction Guidelines
9. Examples (good and bad)
10. Domain Knowledge & References

**Keep under 300 lines.** Move detailed content to skills or reference files.

### Step 4: Update Registry (for Human Activation)

Add to `.claude/agents/registry.json`:

```json
{
  "agent-key": {
    "name": "Agent Name",
    "file": ".claude/agents/agent-name.md",
    "description": "Human-readable description",
    "domain": "domain-name",
    "emoji": "🎯"
  }
}
```

### Step 5: Test

New agent files require a session restart before LLM activation works.

---

## Required Context (@file Includes)

Use `@path/to/file` to include context the agent always needs.

**Placement:** After Tone & Interaction Style, before Capabilities.

```markdown
## Tone & Interaction Style
[How the agent communicates]

## Required Context
@docs/process/development.md

## Capabilities
[What the agent excels at]
```

**Guidelines:**
- Include only foundational context the agent always needs
- Keep includes minimal (they're loaded every invocation)
- Put optional/detailed content in skills instead
- Files are processed when agent is invoked, not at startup

---

## Agent Design Principles

### Clear Boundaries

Every agent needs explicit constraints:
- What the agent does NOT do
- When to defer to other agents
- What decisions it can't make

---

## Templates

### Minimal Agent

```yaml
---
name: domain-expert
summary: Expert in [domain]
description: Use when asking about [topics], [topics], or when [domain] perspective is needed.
emoji: "🔧"
domain: domain-name
---

## Persona

You are "[Agent Name]," an expert in [domain] with [experience/background].

## Prime Directive

[One sentence core mission]

## Purpose

[2-3 sentences expanding the mission]

## Capabilities

You excel at:
- [Capability 1]
- [Capability 2]
- [Capability 3]

## Constraints

- I am not [role] - I defer to [other agent] for [scope]
- I do not [boundary]

## Interaction Guidelines

### When to Ask Questions
- [Trigger] → Ask [question type]

### How to Structure Responses
- When [situation]: [approach]
```

### Full Agent (with all sections)

See existing agents in `.claude/agents/` for complete examples:
- `product-maestro.md` - Product strategy perspective
- `design-shaper.md` - UX/design perspective
- `tech-smith.md` - Engineering perspective

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Vague description | Include specific trigger phrases and topics |
| No summary field | Add human-readable summary |
| Too much detail | Move workflows to skills |
| Missing boundaries | Add explicit constraints section |
| No examples | Include good/bad response examples |
| @file placement wrong | Place in Required Context section after Tone & Interaction Style |
| Agent-noun naming for skills | Agents use noun form, skills use gerund |

---

## Validation Checklist

**Structure:**
- [ ] File in `.claude/agents/` with clean name
- [ ] YAML frontmatter with name, summary, description
- [ ] Under 300 lines (move detail to skills)
- [ ] Required context after Tone & Interaction Style

**Identity:**
- [ ] Clear persona (who the agent is)
- [ ] Prime directive (core mission)
- [ ] Explicit constraints (what it doesn't do)
- [ ] Interaction style defined

**Activation:**
- [ ] Description has LLM trigger phrases
- [ ] Registry.json updated (for human activation)
- [ ] Tested in all intended modes

**Quality:**
- [ ] Examples show good and bad responses
- [ ] Defers appropriately to other agents
- [ ] Includes @.claude/agents/universal-interaction-patterns.md in Required Context
- [ ] Domain knowledge sources cited

---

## Additional Resources

### Existing Agents
Browse `.claude/agents/` for working examples.

### Utilities
- `.claude/lib/agent-loader.ts` - Load agents for SDK automation
