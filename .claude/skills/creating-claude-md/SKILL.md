---
name: creating-claude-md
description: Creates CLAUDE.md configuration files with correct tree placement. Use when setting up, configuring, or adding CLAUDE.md. Triggers: "set up CLAUDE.md", "configure Claude", "add instructions", "where should I put this rule".
---

# Creating CLAUDE.md Files

Creates well-structured CLAUDE.md configurations with proper placement across the file tree hierarchy.

## CLAUDE.md Tree Structure

Claude Code reads instructions from multiple locations with strict precedence:

| Location | Scope | Precedence | Shared |
|----------|-------|------------|--------|
| `~/.claude/CLAUDE.md` | User global | Lowest | Personal only |
| `./.claude/CLAUDE.md` or `./CLAUDE.md` | Project | Medium | Via git |
| `./CLAUDE.local.md` | Project local | Medium | Personal (gitignored) |
| `./.claude/rules/*.md` | Modular rules | Medium | Via git |

**Precedence rule**: Project overrides User. More specific overrides less specific.

**Inheritance**: Claude traverses upward from current directory, loading all CLAUDE.md files found. Subdirectory files are lazy-loaded when working in those directories.

---

## Writing for Claude (Not Humans)

**Critical:** CLAUDE.md is read by Claude, not by teammates. Write as direct instructions.

**Write as instructions Claude follows:**
- Imperative: "Run `mix test` before committing"
- Specific: "Use Ash Domain as public API"
- Direct constraints: "No business logic in LiveViews"

**Avoid documentation style:**
- Team-oriented: "Developers should run mix test..."
- Explanatory: "We use Ash because it provides..."
- Vague guidance: "Follow best practices"

**Litmus test:** Is this an instruction Claude can act on, or information for a human reader?

**Common mistakes:**
- Writing style rules (use linter configs instead)
- Explaining architectural decisions (just state the rule)
- Obvious instructions Claude would follow anyway
- Verbose context about the project's history

---

## Placement Decision Framework

### Step 1: Determine Scope

| If instruction applies to... | Place in... |
|------------------------------|-------------|
| All your projects | `~/.claude/CLAUDE.md` |
| This project, all team members | `./.claude/CLAUDE.md` |
| This project, only you | `./CLAUDE.local.md` |
| Specific file types/paths | `./.claude/rules/topic.md` with `paths` frontmatter |

### Step 2: Check for Duplication

Before adding instructions:
1. Check `~/.claude/CLAUDE.md` - is it already there globally?
2. Check `./.claude/CLAUDE.md` - is it already in project?
3. Check `./.claude/rules/*.md` - is there a topical rule file?

**Don't duplicate** - reference or inherit instead.

### Step 3: Check for Contradictions

New instructions must not contradict existing ones at other levels:
- Global says "use tabs" but project says "use spaces" → contradiction
- Global says "run tests" and project adds specific test command → extension (OK)

**Resolution**: More specific level wins, but avoid silent contradictions.

---

## What Goes Where

### Global (~/.claude/CLAUDE.md)

Personal preferences that apply everywhere:

```markdown
# Global Preferences

## Communication Style
- Be concise, no unnecessary preamble
- Use active voice

## Default Behaviors
- Always check for existing patterns before creating new ones
- Prefer editing existing files over creating new ones
```

**Good for global:**
- Communication preferences
- General coding philosophy
- Tool preferences (editor, terminal)
- Personal shortcuts

**Not for global:**
- Project-specific commands
- Team conventions
- Tech stack details

### Project (./.claude/CLAUDE.md)

Team-shared project instructions:

```markdown
# Project Instructions

## Tech Stack
- Backend: [technology]
- Database: [technology]
- Frontend: [technology]

## Commands
- Run tests: `[command]`
- Start dev server: `[command]`
- Build: `[command]`

## Code Style
[Project-specific patterns]

## Architecture
[Key architectural decisions]
```

**Good for project:**
- Build/test/deploy commands
- Team coding standards
- Architecture patterns
- Domain-specific terminology

**Not for project:**
- Personal preferences
- Machine-specific paths

### Local Override (./CLAUDE.local.md)

Personal project-specific preferences (gitignored):

```markdown
# Local Preferences

## My Sandbox
- API URL: http://localhost:4000
- Test user: dev@example.com

## My Shortcuts
- Quick test: `mix test --only focus`
```

**Good for local:**
- Personal test data
- Local environment URLs
- Machine-specific paths
- Personal workflow shortcuts

### Nested CLAUDE.md Files

For larger projects, different directories can have their own CLAUDE.md:

```
lib/
├── my_app/
│   ├── CLAUDE.md           # Domain layer rules
│   └── accounts/
│       └── CLAUDE.md       # Account-specific patterns
└── my_app_web/
    └── CLAUDE.md           # Web layer rules (LiveView patterns)
```

Claude loads these lazily when working in those directories.

### Modular Rules (./.claude/rules/*.md)

Split large configs into focused files:

```
.claude/rules/
├── testing.md
├── api-design.md
├── frontend.md
└── security.md
```

**Path-specific rules** use YAML frontmatter:

```markdown
---
paths: src/api/**/*.ts
---

# API Development Rules

- All endpoints require authentication
- Use consistent error response format
```

**Good for rules:**
- Large instruction sets (>50 lines)
- Path-specific conventions
- Domain-specific guidelines
- Optional/conditional instructions

---

## Creation Process

### Step 1: Audit Existing Files

```bash
# Check global
cat ~/.claude/CLAUDE.md 2>/dev/null || echo "No global CLAUDE.md"

# Check project
cat .claude/CLAUDE.md 2>/dev/null || cat CLAUDE.md 2>/dev/null || echo "No project CLAUDE.md"

# Check rules
ls -la .claude/rules/ 2>/dev/null || echo "No rules directory"
```

### Step 2: Decide Placement

For each instruction, ask:
1. Does this apply to all my projects? → Global
2. Does the team need this? → Project
3. Is this just for me on this project? → Local
4. Is this for specific file types? → Rules with paths

### Step 3: Write Focused Content

Keep each file focused:
- One concern per section
- Clear, imperative language
- Specific commands, not vague guidance
- Examples where helpful

### Step 4: Verify No Conflicts

After adding, check:
- `/memory` command shows all loaded files
- No contradictions between levels
- No duplications across files

---

## Content Guidelines

### Size Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| Lines | ~60 | 300 |
| Instructions | ~50 | 150 |

LLMs can reliably follow ~150-200 instructions. Keep CLAUDE.md lean.

### Do Include

- Specific commands with exact syntax
- Clear decision criteria
- File:line references instead of code snippets
- Project-specific terminology

### Don't Include

- General knowledge Claude already has
- Obvious instructions ("write good code")
- Verbose explanations
- Duplicate instructions from other levels
- Code style rules (use linters instead)
- Large code examples (link to files)

### Writing Style

- Imperative form: "Run tests before committing"
- Specific: "Use `mix test`" not "run the tests"
- Concise: One line per instruction when possible
- Organized: Group related instructions

---

## Common Patterns

### Minimal Project Setup

```markdown
# Project Instructions

## Commands
- Test: `mix test`
- Format: `mix format`
- Dev server: `mix phx.server`

## Code Style
Follow existing patterns in codebase.
```

### Comprehensive Project Setup

```markdown
# Project Instructions

## Stack
- Elixir/Phoenix/Ash
- PostgreSQL
- LiveView + DaisyUI

## Commands
- Test: `mix test`
- Format: `mix format`
- Types: `mix dialyzer`
- Dev: `mix phx.server`

## Quality Standards
- All tests pass before commit
- No compiler warnings
- Code formatted

## Architecture
- Resources in lib/app/[domain]/
- LiveViews in lib/app_web/live/
- Domain modules are public API

## Patterns
- Use Ash actions, not raw Ecto
- Policies for authorization
- Oban for background jobs
```

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Everything global** | Pollutes all projects | Move project-specific to project |
| **Duplicate across levels** | Maintenance burden, conflicts | Single source of truth |
| **Contradicting levels** | Confusing behavior | Resolve or document override |
| **Monolithic CLAUDE.md** | Hard to maintain | Split into rules/ files |
| **Vague instructions** | Not actionable | Be specific with commands |
| **Obvious instructions** | Wastes context | Remove, Claude knows |

---

## Elixir/Phoenix/Ash Projects

### usage_rules Library

Sync guidelines from dependencies into CLAUDE.md:

```bash
# Add to mix.exs: {:usage_rules, "~> 0.8", only: :dev}
mix usage_rules.sync CLAUDE.md --all --link-to-folder deps
```

This pulls best practices from Ash, Phoenix, etc. into your CLAUDE.md.

### Phoenix 1.8+ AGENTS.md

Phoenix 1.8+ generates `AGENTS.md` with project context. Symlink for compatibility:

```bash
ln -s AGENTS.md CLAUDE.md
```

Or merge AGENTS.md content into CLAUDE.md.

### Tidewave MCP

Add Tidewave for real-time context (schemas, logs, database):

```elixir
{:tidewave, "~> 0.5", only: :dev}
```

Configure MCP to connect to `http://localhost:<port>/tidewave/mcp`.

### Quality Hooks

Use Claude Code hooks for automatic quality:

```json
{
  "hooks": {
    "PreCommit": [{
      "command": "mix format --check-formatted && mix credo --strict"
    }]
  }
}
```

This enforces standards without cluttering CLAUDE.md with style rules.

---

## Validation Checklist

Before finalizing:

- [ ] Checked existing files at all levels
- [ ] No duplications across tree
- [ ] No contradictions between levels
- [ ] Each file is focused and under 300 lines
- [ ] Instructions are specific and actionable
- [ ] Appropriate level chosen for each instruction
- [ ] Code style delegated to linters, not in CLAUDE.md
- [ ] `/memory` shows expected files loaded
