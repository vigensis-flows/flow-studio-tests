# Agent Skills Open Standard & Anthropic Best Practices

**Sources:**
- [Agent Skills Specification — agentskills.io](https://agentskills.io/specification)
- [Skill Authoring Best Practices — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Equipping Agents for the Real World — Anthropic Blog](https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills)

---

## The Agent Skills Open Standard

Published December 18, 2025 at agentskills.io. Adopted by 27+ platforms: Claude Code, OpenAI Codex, Gemini CLI, Cursor, VS Code Copilot, GitHub, Databricks, and others.

**Core spec is minimal:**
- Directory with SKILL.md file
- YAML frontmatter: `name` (required), `description` (required)
- Markdown body with instructions
- Optional: `license`, `compatibility`, `metadata`, `allowed-tools` (experimental)

**What makes it portable:** Filesystem-based, no build step, no proprietary format. Any agent that reads files and interprets markdown can use a skill.

---

## Core Principles

### Concise is Key

Context window is shared with system prompt, conversation history, other skills' metadata, and the user's request.

**Default assumption:** The model is already very smart. Only add context it doesn't have.

Challenge each piece:
- "Does the model really need this explanation?"
- "Does this paragraph justify its token cost?"

**Concise (50 tokens):**
```markdown
## Extract PDF text
Use pdfplumber:
```python
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

**Verbose (150 tokens) — Avoid:**
```markdown
PDF files are a common format containing text, images...
There are many libraries, but we recommend pdfplumber...
First install it using pip, then...
```

### Degrees of Freedom

Match specificity to task fragility:

| Freedom | When to Use | Example |
|---------|-------------|---------|
| High | Multiple valid approaches | Code review process |
| Medium | Preferred pattern exists | Template with parameters |
| Low | Fragile, error-prone | Database migration script |

### Evaluation-Driven Development

Create evaluations BEFORE writing extensive documentation:

1. Identify gaps: Run the model on tasks without skill, document failures
2. Create evaluations: Build test scenarios
3. Establish baseline: Measure performance without skill
4. Write minimal instructions: Address gaps, pass evaluations
5. Iterate: Execute evaluations, compare, refine

### Iterative Development

Use two instances:
- **Instance A**: Helps design and refine skill
- **Instance B**: Tests skill in real tasks

Process:
1. Complete task without skill, notice what context you provide
2. Ask Instance A to create skill capturing that pattern
3. Review for conciseness
4. Test with Instance B on similar tasks
5. Iterate based on observation

---

## Structure Requirements

### YAML Frontmatter

**Open standard fields:**
- `name`: Required. Max 64 characters, lowercase + hyphens, must match directory
- `description`: Required. Max 1024 characters
- `license`: Optional
- `compatibility`: Optional. Max 500 chars
- `metadata`: Optional. Arbitrary key-value
- `allowed-tools`: Optional. Experimental

**Claude Code extensions (not portable):**
- `disable-model-invocation`, `user-invocable`, `context`, `agent`, `model`, `hooks`, `argument-hint`

### Naming Conventions

Gerund form (verb + -ing): `processing-pdfs`, `analyzing-spreadsheets`, `testing-code`

Avoid: `helper`, `utils`, `documents`, `data`

### Body Limits

SKILL.md body under 500 lines. Split to separate files when approaching limit.

---

## Description Guidelines

**Always third person** — injected into system prompt:
- "Processes Excel files..." (correct)
- "I can help you..." (wrong)

**Include what AND when:**
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when user mentions PDFs, forms, or document extraction.
```

**Include key terms** for discovery:
- Technologies: PDF, Excel, .xlsx
- Actions: extract, fill, merge
- Triggers: "when working with...", "when user mentions..."

---

## Progressive Disclosure

Three-level loading:

| Level | When Loaded | Budget |
|-------|------------|--------|
| Metadata | Always (startup) | ~100 tokens/skill |
| SKILL.md body | When triggered | Under 5K tokens |
| Resources | As needed | Unlimited |

**Context budget:** ~2% of context window (fallback: 16,000 chars) for all skill descriptions.

**Keep references one level deep:** SKILL.md → reference.md. Don't nest further.

**Scripts execute, not load:** Script code never enters context. Only output does.

---

## Anti-Patterns

| Anti-Pattern | Fix |
|-------------|-----|
| Windows paths (`scripts\helper.py`) | Forward slashes (`scripts/helper.py`) |
| Too many options ("use pypdf, pdfplumber, PyMuPDF...") | One recommendation ("Use pdfplumber. For OCR, use pdf2image.") |
| Magic numbers (`TIMEOUT = 47`) | Named constants with rationale |
| Punt to the model (fail silently) | Explicit error handling with helpful messages |
| Human-oriented prose | Imperative model-oriented instructions |
| Explaining common knowledge | Only add what the model doesn't know |

---

## Checklist

### Core Quality
- [ ] Description specific with key terms
- [ ] Description includes what AND when
- [ ] Description in third person
- [ ] SKILL.md under 500 lines
- [ ] No time-sensitive information
- [ ] Consistent terminology
- [ ] References one level deep

### Code/Scripts
- [ ] Scripts solve problems (don't punt)
- [ ] Error handling explicit
- [ ] No magic numbers
- [ ] Forward slashes in paths

### Testing
- [ ] At least 3 evaluations created
- [ ] Tested with real usage scenarios
- [ ] Tested with multiple models (Haiku, Sonnet, Opus)
