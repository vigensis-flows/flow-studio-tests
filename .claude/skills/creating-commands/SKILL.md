---
name: creating-commands
description: Creates Claude Code slash commands. Use when creating, writing, or adding commands. Triggers: "create command", "new command", "add /command", "slash command", "how do I make a command".
---

# Creating Commands

Creates Claude Code slash commands - custom prompts that extend Claude Code's capabilities.

## Key Principle

**Commands are instructions for Claude, not documentation for humans.**

Write commands as direct prompts that Claude will execute, not as user-facing documentation.

---

## Command Structure

### Location

| Type | Location | Scope |
|------|----------|-------|
| Project commands | `.claude/commands/` | Shared with team via git |
| Personal commands | `~/.claude/commands/` | Your machine only |
| Namespaced | `.claude/commands/frontend/component.md` | Creates `/component` with label |

### File Format

```markdown
---
description: Brief description of what command does
allowed-tools: Tool1, Tool2, Bash(specific:*)
argument-hint: [required-arg] [optional-arg]
model: claude-3-5-haiku-20241022
---

# Command Title

[Direct instructions for Claude - what to do when invoked]
```

---

## Frontmatter Options

| Field | Purpose | Example |
|-------|---------|---------|
| `description` | Brief description (required) | `Creates a git commit with smart message` |
| `allowed-tools` | Tools the command can use | `Read, Write, Bash(git:*)` |
| `argument-hint` | Shows during autocomplete | `[message]` or `add \| remove \| list` |
| `model` | Specific model to use | `claude-3-5-haiku-20241022` |
| `disable-model-invocation` | Prevent SlashCommand tool calling it | `true` |

### allowed-tools Patterns

```yaml
# Specific tools
allowed-tools: Read, Write, Edit, Glob, Grep

# Bash with restrictions
allowed-tools: Bash(git:*), Bash(npm:*)

# Bash with specific commands
allowed-tools: Bash(git add:*), Bash(git commit:*)

# Multiple categories
allowed-tools: Read, Write, Bash(bun:*), Bash(ls:*), AskUserQuestion
```

---

## Writing Style

### Do: Action-Oriented Instructions

```markdown
---
description: Creates a git commit
allowed-tools: Bash(git:*)
---

# Git Commit

## Context

Current changes:
!git diff --staged

Recent commits:
!git log --oneline -5

## Task

1. Analyze the staged changes
2. Generate a commit message following conventional commits
3. Create the commit
4. Show the result
```

### Don't: Documentation Style

```markdown
---
description: Git commit helper
---

# Git Commit Command

This command helps you create a git commit. It will analyze your
changes and generate an appropriate commit message.

## How it works

First, the command checks your staged changes...
[Too much explanation, not enough action]
```

---

## Dynamic Context

Use `!` prefix to inject bash output when the command runs:

```markdown
## Context

Current directory:
!pwd

Git status:
!git status --short

Package info:
!cat package.json | head -20
```

This gives Claude real-time context about the current state.

---

## Arguments

### Capture All Arguments

```markdown
---
argument-hint: [search term]
---

Search for: $ARGUMENTS
```

Usage: `/search foo bar` → `$ARGUMENTS` = "foo bar"

### Positional Arguments

```markdown
---
argument-hint: [file] [line-number]
---

Navigate to file $1 at line $2
```

Usage: `/goto src/main.ts 42` → `$1` = "src/main.ts", `$2` = "42"

---

## Best Practices

### Naming

- Use kebab-case: `/fix-issue` not `/FixIssue`
- Keep short but descriptive
- Project commands override personal commands with same name

### Tools

- Only include tools the command actually needs
- Be specific with Bash: `Bash(git add:*)` not `Bash(*)`
- Include `AskUserQuestion` if command may need clarification

### Structure

1. Start with context injection (`!` commands)
2. Define the task clearly
3. List steps in order
4. Specify expected output format

### Conditional Logic

```markdown
## Task

### If [condition]:
Do X, then STOP.

### If [other condition]:
Do Y, continue to next step.

### Otherwise:
Do Z.
```

---

## Examples

### Simple Command

```markdown
---
description: Shows git branch summary
allowed-tools: Bash(git:*)
---

# Branch Summary

!git branch -vv

List all branches with their tracking status and last commit.
Highlight any branches that are ahead or behind remote.
```

### Command with Arguments

```markdown
---
description: Creates a new component
allowed-tools: Read, Write, Glob
argument-hint: [component-name]
---

# Create Component

Create a new React component named: $ARGUMENTS

## Context

Existing components:
!ls src/components/

## Task

1. Check if component already exists
2. Create component file following existing patterns
3. Create test file
4. Update index exports
```

### Command with Validation

```markdown
---
description: Deploys to staging
allowed-tools: Bash(npm:*), Bash(git:*), AskUserQuestion
---

# Deploy Staging

## Context

Current branch:
!git branch --show-current

Uncommitted changes:
!git status --porcelain

## Task

### 1. Validate State

If not on `main` branch or has uncommitted changes:
```
Cannot deploy: [reason]
Please commit changes and switch to main first.
```
STOP here.

### 2. Run Deploy

If validation passes, run:
```bash
npm run deploy:staging
```

Show results.
```

---

## Command vs Skill

| Aspect | Command | Skill |
|--------|---------|-------|
| **File** | Single `.md` | `SKILL.md` + references |
| **Invocation** | Manual (`/command`) | Auto-detected or manual |
| **Complexity** | Simple, focused prompts | Complex workflows |
| **Use for** | Frequent, quick actions | Comprehensive processes |

Use commands for quick, frequently-used prompts.
Use skills for complex, multi-step workflows.

---

## Validation Checklist

Before finalizing a command:

- [ ] Has `description` in frontmatter
- [ ] Has `allowed-tools` if using tools
- [ ] Written as instructions, not documentation
- [ ] Uses dynamic context (`!`) where helpful
- [ ] Steps are clear and actionable
- [ ] Conditional logic has clear STOP points
- [ ] Tested with edge cases
