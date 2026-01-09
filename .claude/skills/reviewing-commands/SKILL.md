---
name: reviewing-commands
description: Reviews Claude Code slash commands for quality. Use when reviewing or checking commands. Triggers: "review command", "check command", "audit commands", "is this command good".
---

# Reviewing Commands

Reviews Claude Code slash commands for quality, proper structure, and effectiveness.

---

## Check: Written for Claude, Not Humans

**Critical review criterion:** Commands must be instructions for Claude to execute, not documentation for users.

**Red flags (human-oriented content):**
- Explanatory overviews: "This command helps you..."
- Tutorial-style prose: "First, you'll want to..."
- "How it works" sections explaining the command

**Green flags (Claude-oriented content):**
- Direct task instructions: "1. Read the config", "2. Extract version"
- Action verbs: Read, Create, Update, Check, Run
- Clear steps, not prose explanations

Commands should read like a checklist Claude executes, not documentation a user reads.

When reviewing, flag documentation-style content and recommend rewrite to direct instructions.

---

## Review Criteria

### 1. Frontmatter Completeness

| Field | Required | Check |
|-------|----------|-------|
| `description` | Yes | Present, concise, describes what command does |
| `allowed-tools` | If using tools | Lists only tools actually needed |
| `argument-hint` | If takes args | Shows expected format clearly |
| `model` | Optional | Only if specific model needed |

**Red flags:**
- Missing `description`
- Missing `allowed-tools` when command uses Read/Write/Bash
- Overly broad tool permissions (`Bash(*)`)
- `argument-hint` doesn't match actual argument usage

### 2. Writing Style

Commands must be **instructions for Claude**, not documentation for humans.

**Good patterns:**
```markdown
## Task

1. Read the config file
2. Extract the version
3. Update to new version
4. Show the diff
```

**Anti-patterns:**
```markdown
## Overview

This command helps you update versions. It works by reading
the config file and then updating it.

## How to use

When you run this command, it will...
```

**Check for:**
- Action verbs (Read, Create, Update, Check, Run)
- Direct instructions, not explanations
- Clear steps, not prose
- Concise language

### 3. Dynamic Context Usage

Commands should inject relevant context using `!` prefix:

**Good:**
```markdown
## Context

Current state:
!git status --short

Existing files:
!ls src/
```

**Missing opportunity:**
```markdown
## Task

Check the git status and then...
```
(Should show git status in context, not ask Claude to check it)

### 4. Tool Specificity

Tools should be as specific as possible:

| Too Broad | Better |
|-----------|--------|
| `Bash(*)` | `Bash(git:*), Bash(npm:*)` |
| `Bash(git:*)` | `Bash(git add:*), Bash(git commit:*)` |

**Check:** Does the command actually need all listed tools?

### 5. Argument Handling

If command uses arguments:

- [ ] `argument-hint` in frontmatter
- [ ] Uses `$ARGUMENTS` or `$1`, `$2` correctly
- [ ] Handles missing arguments gracefully

**Good:**
```markdown
---
argument-hint: [file-path]
---

## Task

If no argument provided ($ARGUMENTS is empty):
  Ask user for the file path.

Otherwise:
  Process file at: $ARGUMENTS
```

### 6. Flow Control

Commands with conditional logic need clear flow:

- [ ] Each branch has clear outcome
- [ ] STOP points are explicit
- [ ] No ambiguous "continue" states

**Good:**
```markdown
### If validation fails:
Show error message. STOP here.

### If validation passes:
Continue to step 2.
```

**Bad:**
```markdown
### If validation fails:
Show error message.
(Unclear if Claude should continue or stop)
```

### 7. Output Expectations

Command should specify what output looks like:

- [ ] Success message format defined
- [ ] Error handling specified
- [ ] User knows what to expect

---

## Review Process

### Step 1: Read the Command

Read the command file and understand its purpose.

### Step 2: Check Current Best Practices

**Before evaluating, verify against current Claude Code guidance.**

1. Search for recent slash command changes (DO NOT trust training data)
2. Check if frontmatter options have evolved
3. Verify dynamic context syntax (!) is current

**Why this matters:** Claude Code evolves rapidly. Command features may have changed.

**Key areas to verify:**
- Frontmatter fields (description, allowed-tools, argument-hint, model)
- Tool restriction patterns
- Dynamic context injection syntax
- Argument handling ($ARGUMENTS, $1, $2)

Flag outdated patterns as issues requiring update.

### Step 3: Evaluate Value

Score each dimension (0-3):

| Dimension | 0 (None) | 1 (Low) | 2 (Medium) | 3 (High) |
|-----------|----------|---------|------------|----------|
| **Frontmatter quality** | Missing required fields | Incomplete or too broad | Good but minor issues | Complete and specific |
| **Claude-oriented style** | Documentation style | Mixed audience | Mostly instructions | Pure instructions |
| **Context usage** | No dynamic context | Missing key context | Adequate | Optimal context injection |
| **Flow control** | Ambiguous flow | Some unclear branches | Clear with minor gaps | Explicit STOP points |

**Total score interpretation:**
- 10-12: Keep as-is
- 7-9: Keep with improvements
- 4-6: Consider major revision
- 0-3: Recommend rewrite

### Step 4: Check Frontmatter

```
Frontmatter Review:
- description: [present/missing] - [quality assessment]
- allowed-tools: [present/missing] - [appropriate for usage?]
- argument-hint: [present/missing/n/a] - [matches usage?]
```

### Step 5: Assess Writing Style

```
Style Assessment:
- Audience: [Claude/Human/Mixed]
- Format: [Instructions/Documentation/Mixed]
- Conciseness: [Good/Verbose/Too sparse]
```

### Step 6: Check Context Usage

```
Context Usage:
- Dynamic context (!): [Used well/Could add/Not needed]
- Missing context: [List any that would help]
```

### Step 7: Review Tool Usage

```
Tool Review:
- Listed tools: [list]
- Actually needed: [list]
- Specificity: [Appropriate/Too broad/Too narrow]
```

### Step 8: Test Flow Logic

```
Flow Review:
- Conditional branches: [Clear/Ambiguous]
- STOP points: [Explicit/Implicit/Missing]
- Edge cases: [Handled/Not handled]
```

### Step 9: Provide Recommendations

Categorize findings:

**Must Fix:**
- Critical issues that break the command

**Should Fix:**
- Issues that reduce effectiveness

**Consider:**
- Nice-to-have improvements

---

## Common Issues

### Issue: Documentation Style

**Symptom:** Long explanations, "This command will...", "How it works..."

**Fix:** Rewrite as direct instructions. Cut explanations.

### Issue: Missing allowed-tools

**Symptom:** Command uses Read/Write/Bash but no `allowed-tools` in frontmatter

**Fix:** Add `allowed-tools` with specific tools needed.

### Issue: Overly Broad Permissions

**Symptom:** `Bash(*)` or listing many tools "just in case"

**Fix:** List only tools actually used. Be specific with Bash patterns.

### Issue: No Dynamic Context

**Symptom:** Command asks Claude to check things that could be injected

**Fix:** Add `!` context injection for relevant state.

### Issue: Ambiguous Flow

**Symptom:** Conditional logic without clear outcomes

**Fix:** Add explicit STOP points, clarify what happens in each branch.

### Issue: Missing Argument Handling

**Symptom:** Uses `$ARGUMENTS` but no `argument-hint`, no handling of missing args

**Fix:** Add frontmatter, add fallback for missing arguments.

---

## Review Output Template

```markdown
## Command Review: [command-name]

### Summary
[One sentence assessment]

### Value Score: X/12

| Dimension | Score | Notes |
|-----------|-------|-------|
| Frontmatter quality | X/3 | |
| Claude-oriented style | X/3 | |
| Context usage | X/3 | |
| Flow control | X/3 | |

### Frontmatter
| Field | Status | Notes |
|-------|--------|-------|
| description | [OK/Missing/Needs work] | [details] |
| allowed-tools | [OK/Missing/Too broad] | [details] |
| argument-hint | [OK/Missing/N/A] | [details] |

### Style Assessment
- **Audience**: [Claude/Human/Mixed]
- **Quality**: [Good/Needs rewrite/Minor tweaks]

### Context Usage
- **Dynamic context**: [Good/Could improve/Not needed]
- **Suggestions**: [any missing context to add]

### Tool Review
- **Appropriateness**: [Good/Too broad/Missing tools]
- **Suggestions**: [specific changes]

### Flow Review
- **Clarity**: [Clear/Needs work]
- **STOP points**: [Explicit/Missing]

### Issues Found
1. [Issue with suggested fix]
2. [Issue with suggested fix]

### Recommendation: [Keep/Improve/Revise/Rewrite]

### Suggested Changes
- [Specific improvement]
- [Specific improvement]
```

---

## Quick Checklist

For rapid review, check these items:

- [ ] `description` present and clear
- [ ] `allowed-tools` matches actual tool usage
- [ ] Written as instructions, not documentation
- [ ] Uses `!` for relevant context
- [ ] Tool permissions are specific
- [ ] Arguments handled (if applicable)
- [ ] Flow has clear STOP points
- [ ] Output format specified
