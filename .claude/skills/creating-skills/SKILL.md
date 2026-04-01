---
name: creating-skills
description: Creates agent skills (SKILL.md files) following the Agent Skills open standard. Use when creating, writing, or adding skills. Triggers: "create skill", "new skill", "add skill", "SKILL.md", "how do I make a skill", "extend Claude's capabilities".
---

# Creating Skills

Creates production-ready skills following the Agent Skills open standard (agentskills.io). Skills are portable across Claude Code, OpenAI Codex, Gemini CLI, Cursor, VS Code Copilot, and 27+ other adopters.

## What Skills Are

Skills are **packaged procedural knowledge** — they teach agents HOW to complete specific tasks.

| Concept | What It Is | Standard |
|---------|-----------|----------|
| **Skills** | Procedural knowledge + workflows | Agent Skills (agentskills.io) |
| **Tools** | Atomic executable functions | Function calling / MCP |
| **MCP Servers** | Infrastructure providing tool bundles | MCP (modelcontextprotocol.io) |
| **Agent Prompts** | Identity, perspective, communication style | — |

Skills and agent prompts are complementary:

| In a Skill | In an Agent Prompt |
|------------|-------------------|
| Step-by-step procedures | Identity and perspective |
| Domain-specific knowledge | Communication style |
| Templates and output formats | Decision-making heuristics |
| Executable scripts | Behavioral constraints |
| Conditional workflows | Interaction patterns |

---

## Writing for Models, Not Humans

Skills are consumed by language models, not read by humans.

**Write as instructions:**
- Imperative form: "Run X", "Check Y", "Use Z"
- Specific commands with exact syntax
- Schemas and examples over explanations
- Concise bullets over prose paragraphs

**Avoid documentation style:**
- Explanatory prose ("This is useful because...")
- Concepts the model already knows (JSON, REST, common patterns)
- Context-setting paragraphs with no actionable information

**Litmus test:** Would removing this text hurt task performance? If not, remove it.

---

## Skill Structure

```
skill-name/
├── SKILL.md              # Required: Main skill file
├── references/           # Optional: Loaded on-demand
│   └── detailed-guide.md
├── scripts/              # Optional: Executable utilities
│   └── helper.py
└── assets/               # Optional: Templates, images, data files
    └── template.txt
```

**Locations:**
- Personal: `~/.claude/skills/skill-name/`
- Project: `.claude/skills/skill-name/` (version controlled)
- Enterprise: Managed settings (all org users)

---

## YAML Frontmatter

### Open Standard Fields

```yaml
---
name: skill-name          # Required. Max 64 chars, lowercase + hyphens
description: >            # Required. Max 1024 chars
  What it does and when to use it.
  Third person. Include trigger phrases.
license: MIT              # Optional
compatibility: requires python 3.10+  # Optional. Max 500 chars
metadata:                 # Optional. Arbitrary key-value
  category: engineering
allowed-tools: Read Write Bash  # Optional. Experimental in spec
---
```

### Claude Code Extensions

Beyond the open standard, Claude Code supports:

| Field | Description |
|-------|-------------|
| `disable-model-invocation` | `true` prevents Claude from auto-loading |
| `user-invocable` | `false` hides from `/` menu (background knowledge) |
| `context` | `fork` runs in isolated subagent |
| `agent` | Subagent type when `context: fork` (e.g., `Explore`, `Plan`, custom) |
| `model` | Model override when skill is active |
| `hooks` | Lifecycle hooks scoped to this skill |
| `argument-hint` | Autocomplete hint, e.g., `[issue-number]` |

These extensions are NOT portable to other platforms.

### Name Field

- Max 64 characters, lowercase letters/numbers/hyphens
- Must match directory name
- Gerund form preferred: `processing-pdfs` not `pdf-processor`
- Avoid vague names: `helper`, `utils`, `tools`

### Description Field

**Critical for discovery.** The model reads all descriptions at startup to match skills to tasks.

- Write in third person ("Processes PDFs..." not "I help with...")
- Include WHAT it does AND WHEN to use it
- Include trigger phrases users would say

**Good:**
```yaml
description: Extract text from PDFs, fill forms, merge documents. Use when working with PDF files or when user mentions forms, document extraction, or .pdf files.
```

**Bad:**
```yaml
description: Helps with documents
```

---

## Progressive Disclosure

Skills load content in three stages:

| Level | When Loaded | Token Cost | Content |
|-------|------------|------------|---------|
| **Metadata** | Always (startup) | ~100 tokens/skill | `name` and `description` |
| **Instructions** | When skill triggers | Under 5K tokens | SKILL.md body |
| **Resources** | As needed | Effectively unlimited | Referenced files, scripts |

**Context budget:** ~2% of context window (fallback: 16,000 chars) for all skill descriptions combined. This accommodates roughly 15-30 skills.

**Keep SKILL.md under 500 lines.** Move detailed content to `references/`.

**Keep references one level deep.** Don't nest references within references.

**Scripts execute, not load.** When a skill references a script, the agent runs it and receives the output. The script code never enters context.

---

## Match Freedom to Fragility

The specificity of instructions should match the fragility of the task:

| Freedom Level | When to Use | Format |
|---------------|-------------|--------|
| **High** | Multiple valid approaches | Text-based guidelines |
| **Medium** | Preferred pattern exists | Pseudocode, parameterized scripts |
| **Low** | Fragile, consistency critical | Exact scripts, specific commands |

For deterministic operations, **bundle tested scripts** rather than asking the model to generate code each time.

---

## Creation Process

### Step 1: Understand the Use Cases

Clarify concrete examples before writing:
- What should this skill do?
- What would a user say to trigger it?
- What variations exist?

### Step 2: Plan Resources

For each use case, identify:
- **Scripts:** Code rewritten repeatedly (e.g., `validate.py`)
- **References:** Documentation to reference on-demand (e.g., `schema.md`)
- **Assets:** Templates/files used in output (e.g., `template.txt`)

### Step 3: Create Structure

```bash
mkdir -p .claude/skills/my-skill/{references,scripts,assets}
touch .claude/skills/my-skill/SKILL.md
```

### Step 4: Write SKILL.md

**Content order:**
1. Overview (2-3 sentences)
2. Prerequisites (if any)
3. Quick Start (tool skills only — shows invocation pattern)
4. Step-by-Step Guide (detailed instructions)
5. Available Resources (reference to scripts/files)
6. Troubleshooting

Process skills (creating-X, reviewing-X) don't need Quick Start — the step-by-step process IS the workflow.

**Writing style:**
- Imperative form: "Run the script" not "You should run"
- Third person in description
- Front-load keywords for search

### Step 5: Test

See [references/testing.md](references/testing.md) for complete methodology.

**Quick validation:**
1. Trigger test — does skill activate on expected queries?
2. Functional test — does workflow run without errors?
3. Reference test — do referenced files load correctly?
4. Script test — do bundled scripts execute?
5. Cross-model test — Opus, Sonnet, and Haiku may need different detail levels

**Evaluation-driven development (recommended):**
1. Run Claude on tasks WITHOUT skill, document failures
2. Create test scenarios from observed failures
3. Write minimal instructions addressing the gaps
4. Re-test, compare, iterate

### Step 6: Iterate

After real usage or review feedback:
1. Notice struggles or inefficiencies
2. Identify missing content or unclear sections
3. Update and re-test

---

## Skill Composition

### Skills and Agents Together

**Skills can delegate to agents:**
```yaml
---
name: deep-research
context: fork
agent: Explore
---
Research $ARGUMENTS thoroughly...
```

**Agents can preload skills:**
```yaml
# .claude/agents/api-developer.md
---
skills:
  - api-conventions
  - error-handling-patterns
---
```

### Dynamic Features (Claude Code)

**String substitutions:** `$ARGUMENTS`, `$ARGUMENTS[N]`, `$N`, `${CLAUDE_SESSION_ID}`

**Dynamic context injection:** `` !`command` `` runs shell commands before skill content is sent, replacing placeholder with output.

---

## Templates

### Minimal Skill (Process)

```yaml
---
name: reviewing-something
description: Reviews something for quality. Use when reviewing, checking, or auditing something. Triggers: "review something", "check something".
---

# Reviewing Something

## Overview
[2-3 sentences]

## Process
1. First step
2. Second step
3. Verify results

## Common Issues
| Issue | Fix |
|-------|-----|
| [Problem] | [Solution] |
```

### Skill with Scripts (Tool)

```yaml
---
name: processing-something
description: Processes something with validation. Use when processing, converting, or transforming something.
---

# Processing Something

## Quick Start
```bash
python scripts/process.py input.txt
```

## Workflow
1. Run setup: `./scripts/setup.sh`
2. Configure: edit `config.json`
3. Process: `python scripts/process.py input.txt`
4. Validate: `python scripts/validate.py output.txt`

## Available Scripts
| Script | Purpose | Usage |
|--------|---------|-------|
| `setup.sh` | Install dependencies | `./scripts/setup.sh` |
| `process.py` | Main processing | `python scripts/process.py [input]` |
| `validate.py` | Validate output | `python scripts/validate.py [output]` |

## References
- [Configuration Guide](references/config.md)

## Troubleshooting
**Issue:** Common problem
**Solution:** How to fix
```

---

## Self-Containment

Skills should work standalone:

- Don't reference external files that may move
- Include examples inline or in `references/`
- Avoid dependencies on other skills
- Don't add "Related Skills" sections — descriptions handle discovery

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Vague description | Include specific trigger phrases and "Use when" |
| No "when to use" | Add: "Use when [conditions]" |
| SKILL.md over 500 lines | Move details to `references/` |
| Second person description | Use third person ("Processes..." not "I help...") |
| Deeply nested references | Keep one level deep from SKILL.md |
| Agent-noun names | Gerund form: `processing-x` not `x-processor` |
| External file dependencies | Keep content within skill directory |
| Related Skills section | Remove — creates coupling, descriptions handle discovery |
| Human-oriented prose | Write imperative instructions for the model |
| Platform-specific extensions as core | Keep extensions separate from portable content |
| Explaining what the model knows | Only add context it doesn't already have |
| Generating code the model could bundle | Use scripts for deterministic operations |

---

## Validation Checklist

**Structure:**
- [ ] SKILL.md exists with YAML frontmatter
- [ ] `name` and `description` fields present
- [ ] Name uses gerund form, matches directory name
- [ ] Under 500 lines
- [ ] Referenced files exist

**Description:**
- [ ] Written in third person
- [ ] Includes what AND when to use
- [ ] Contains specific trigger phrases
- [ ] Under 1024 characters

**Content:**
- [ ] Written for models, not humans
- [ ] Uses imperative form
- [ ] Freedom matches fragility (scripts for deterministic ops)
- [ ] Self-contained (no external dependencies)
- [ ] References one level deep
- [ ] No Related Skills section
- [ ] Platform-specific extensions noted as non-portable

**Testing:**
- [ ] Triggers on expected queries
- [ ] Workflow executes successfully
- [ ] Scripts execute (if any)
- [ ] References load correctly (if any)
