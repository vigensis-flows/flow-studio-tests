---
name: creating-skills
description: Creates Claude Code skills (SKILL.md files). Use when creating, writing, or adding skills. Triggers: "create skill", "new skill", "add skill", "SKILL.md", "how do I make a skill", "extend Claude's capabilities".
---

# Creating Skills

Creates and evolves production-ready Claude Code Skills with proper YAML frontmatter, progressive disclosure, and validation.

## What Skills Are

Skills are modular packages that extend Claude's capabilities with:
- Specialized workflows for specific domains
- Tool integrations (file formats, APIs)
- Domain expertise (schemas, business logic)
- Bundled resources (scripts, templates, references)

---

## Writing for Claude (Not Humans)

**Critical:** Skills are consumed by Claude, not read by humans. This fundamentally changes how to write them.

**Write as instructions Claude follows:**
- Imperative form: "Run X", "Check Y", "Use Z"
- Specific commands with exact syntax
- Schemas and examples over explanations
- Concise bullets over prose paragraphs

**Avoid documentation style:**
- Explanatory prose ("This is useful because...")
- Concepts Claude already knows (JSON syntax, REST APIs, common patterns)
- Context-setting paragraphs that add no actionable information
- Human-oriented phrasing ("You might want to...", "Consider...")

**Litmus test:** Would removing this text hurt Claude's task performance? If not, remove it.

**Common mistakes:**
- Explaining what a library does (Claude knows)
- Describing file formats Claude already understands
- Adding "helpful context" that's actually noise
- Writing in a friendly, explanatory tone meant for human readers

---

## Skill Structure

```
skill-name/
├── SKILL.md              # Required: Main skill file
├── references/           # Optional: Loaded on-demand
│   └── detailed-guide.md
├── scripts/              # Optional: Executable utilities
│   └── helper.py
└── assets/               # Optional: Templates, images
    └── template.txt
```

**Locations:**
- Personal: `~/.claude/skills/skill-name/`
- Project: `.claude/skills/skill-name/` (version controlled)

---

## YAML Frontmatter (Required)

Only two fields matter:

```yaml
---
name: skill-name
description: Brief what + when to use. Third person. Max 1024 chars.
---
```

### Name Field
- Max 64 characters
- Lowercase letters, numbers, hyphens
- Gerund form preferred: "processing-pdfs" not "pdf-processor"

### Description Field
- **Critical for discovery** - Claude uses this to match skills to tasks
- Must include WHAT it does and WHEN to use it
- Third person ("Processes PDFs..." not "I help with...")
- Include trigger phrases users would say

**Good:**
```yaml
description: Extract text from PDFs, fill forms, merge documents. Use when working with PDF files or when user mentions forms, document extraction, or .pdf files.
```

**Bad:**
```yaml
description: Helps with documents  # Too vague, no triggers
```

---

## Creation Process

### Step 1: Understand the Use Cases

Clarify concrete examples before writing:
- What should this skill do?
- What would a user say to trigger it?
- What variations exist?

Skip only if use cases are already clear.

### Step 2: Plan Reusable Resources

For each use case, identify:
- **Scripts**: Code rewritten repeatedly (e.g., `rotate_pdf.py`)
- **References**: Documentation Claude should reference (e.g., `schema.md`)
- **Assets**: Templates/files used in output (e.g., `component.tsx.template`)

### Step 3: Create Structure

```bash
mkdir -p ~/.claude/skills/my-skill/{references,scripts,assets}
touch ~/.claude/skills/my-skill/SKILL.md
```

### Step 4: Write SKILL.md

**Content order:**
1. Overview (2-3 sentences)
2. Prerequisites (if any)
3. Quick Start (only for tool skills with scripts - shows invocation pattern)
4. Step-by-Step Guide (detailed instructions)
5. Available Resources (reference to scripts/files)
6. Troubleshooting

**Note:** Process skills (creating-X, reviewing-X) don't need Quick Start - the step-by-step process IS the workflow. Quick Start is for tool skills where showing `./scripts/run.sh input.pdf` is valuable.

**Keep under 500 lines.** Move detailed content to references/.

**Writing style:**
- Imperative form: "Run the script" not "You should run"
- Third person in description
- Front-load keywords for search

### Step 5: Test the Skill

Test before deploying. See [references/testing.md](references/testing.md) for complete methodology.

**Quick validation:**
1. Trigger test - does skill activate on expected queries?
2. Functional test - does workflow run without errors?
3. Reference test - do referenced files load correctly?
4. Script test - do bundled scripts execute?

**Testing depth by skill type:**
| Type | Focus |
|------|-------|
| Reference | Accuracy, completeness |
| Workflow | Steps work end-to-end |
| Tool | Scripts handle edge cases |
| Discipline | Pressure scenarios, rationalization |

### Step 6: Iterate

After real usage or review feedback:
1. Notice struggles or inefficiencies
2. Identify missing content or unclear sections
3. Update and re-test

---

## Evolving Existing Skills

When improving a skill based on feedback or review:

### From Review Feedback

1. Read the review findings
2. Address each issue:
   - Vague description → Add specific triggers
   - Bloated content → Move to references/
   - Missing coverage → Add new sections
3. Re-test affected areas
4. Update version notes if tracked

### From Usage Feedback

1. Document what went wrong or was unclear
2. Identify root cause:
   - Missing information?
   - Unclear instructions?
   - Outdated content?
3. Make targeted fixes (don't over-engineer)
4. Re-test the specific scenario

---

## Progressive Disclosure

Skills use 3-level loading to manage context:

| Level | When Loaded | Size Target |
|-------|-------------|-------------|
| Metadata (name + description) | Always (startup) | ~100 words |
| SKILL.md body | When skill triggers | <500 lines |
| Bundled resources | On-demand | Unlimited |

**Keep SKILL.md lean.** Reference detailed content:

```markdown
## Advanced Configuration
See [references/advanced.md](references/advanced.md) for complex scenarios.
```

**Keep references one level deep** - don't nest references within references.

---

## Templates

### Minimal Skill

```yaml
---
name: processing-something
description: Brief what. Use when [specific triggers].
---

# Processing Something

## Overview
[2-3 sentences]

## Quick Start
[Most common use case with code example]

## Step-by-Step
1. First step
2. Second step
3. Verify results
```

### Skill with Resources

```yaml
---
name: generating-reports
description: Detailed what. Use when [trigger 1], [trigger 2], or [trigger 3].
---

# Generating Reports

## Prerequisites
- Requirement 1
- Requirement 2

## Quick Start
```bash
./scripts/setup.sh
./scripts/generate.sh my-project
```

## Workflow
1. Run setup script
2. Configure options
3. Execute main script
4. Verify output

## Available Scripts
- `scripts/setup.sh` - Initial setup
- `scripts/generate.sh` - Main execution
- `scripts/validate.sh` - Validation

## References
- [Configuration Guide](references/config.md)
- [API Reference](references/api.md)

## Troubleshooting
**Issue:** Common problem
**Solution:** How to fix
```

---

## Self-Containment

Skills should work standalone without external dependencies:

- **Don't reference external files** that may move (e.g., `tmp/`, user directories)
- **Include examples inline** or in `references/` rather than pointing elsewhere
- **Avoid dependencies on other skills** - each skill should be independently useful
- **Don't add "Related Skills" sections** - creates coupling, adds maintenance burden, doesn't help Claude discover skills (descriptions do that)

If content would be useful across multiple skills, consider whether it belongs in CLAUDE.md or a shared reference that's version-controlled with the project.

**Prerequisites vs Related Skills:**
- Prerequisites section is fine - states what must exist before using this skill
- Related Skills section is not - creates unnecessary cross-references that become stale

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Vague description | Include specific trigger phrases |
| No "when to use" | Add: "Use when [conditions]" |
| Too long SKILL.md | Move details to references/ |
| Second person | Use imperative form |
| Deeply nested refs | Keep references one level deep |
| Windows paths | Always use forward slashes |
| Agent-noun names | Use gerund form: "processing-x" not "x-processor" |
| @file references | Use skill name only: "See creating-skills for..." |
| External file refs | Keep examples/content within skill directory |
| Related Skills section | Remove - creates coupling, descriptions handle discovery |

---

## Validation Checklist

**Structure:**
- [ ] SKILL.md exists with YAML frontmatter
- [ ] `name` and `description` fields present
- [ ] Name uses gerund form (verb-ing)
- [ ] Referenced files exist

**Description:**
- [ ] Written in third person
- [ ] Includes what AND when to use
- [ ] Contains specific trigger phrases
- [ ] Under 1024 characters

**Content:**
- [ ] Body under 500 lines
- [ ] Uses imperative form
- [ ] Quick Start included (tool skills only)
- [ ] References point to actual files
- [ ] Self-contained (no external file dependencies)
- [ ] No Related Skills section

**Testing:**
- [ ] Skill triggers on expected queries
- [ ] Workflow executes successfully
- [ ] Examples are runnable

---

## Additional Resources

### Reference Files
- **[references/testing.md](references/testing.md)** - Complete testing methodology
- **[references/patterns.md](references/patterns.md)** - Workflow patterns and output templates
- **[references/anthropic-guide.md](references/anthropic-guide.md)** - Official Anthropic best practices summary

### Example Skills
Browse existing skills in `.claude/skills/` for working examples.

### External Resources
- [Anthropic Skills Documentation](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - Community examples
