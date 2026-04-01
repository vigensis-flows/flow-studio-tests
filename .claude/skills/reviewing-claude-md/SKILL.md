---
name: reviewing-claude-md
description: Reviews CLAUDE.md and AGENTS.md files for quality, placement, and coherence. Use when reviewing, checking, or auditing agent instruction files. Triggers: "review CLAUDE.md", "check config", "audit instructions", "are my CLAUDE files organized".
---

# Reviewing Agent Instruction Files

Evaluates CLAUDE.md (for Claude Code) and AGENTS.md (for other agents) for proper placement, duplication, contradictions, focus, and content quality.

---

## Check: Written for Claude, Not Humans

**Critical review criterion:** CLAUDE.md content must be instructions Claude follows, not documentation for teammates.

**Red flags (human-oriented content):**
- Team-oriented phrasing: "Developers should..."
- Explanatory context: "We use Ash because..."
- Vague guidance: "Follow best practices"
- Style rules that linters should enforce
- Verbose project history or context

**Green flags (Claude-oriented content):**
- Imperative instructions: "Run `mix test` before committing"
- Specific rules: "Use Ash Domain as public API"
- Direct constraints: "No business logic in LiveViews"

**Litmus test:** Is this an instruction Claude can act on, or information for a human reader?

When reviewing, flag human-oriented content and recommend rewrite to direct instructions or removal.

---

## Review Process

### Step 1: Discover All Files

Identify all agent instruction files in the tree:

```bash
# Global (Claude Code)
ls -la ~/.claude/CLAUDE.md 2>/dev/null

# Project root
ls -la ./CLAUDE.md ./AGENTS.md ./CLAUDE.template.md 2>/dev/null
ls -la ./.claude/CLAUDE.md 2>/dev/null

# Local override
ls -la ./CLAUDE.local.md 2>/dev/null

# Rules
find .claude/rules -name "*.md" 2>/dev/null
```

**File purposes:**
- `CLAUDE.md` - Instructions for Claude Code (has MCP tools like Context7, Tidewave)
- `AGENTS.md` - Instructions for other agents (Copilot, Cursor, Codeium - no MCP)
- `CLAUDE.template.md` - Template for new repos with same stack
- `CLAUDE.local.md` - Machine-specific overrides (gitignored)

Or use `/memory` command to see what Claude has loaded.

### Step 2: Check Current Best Practices

**Before evaluating, verify against current Claude Code guidance.**

1. Search for recent CLAUDE.md changes (DO NOT trust training data)
2. Check if file hierarchy or precedence rules have evolved
3. Compare structure against current recommendations

**Why this matters:** Claude Code evolves rapidly. Configuration patterns may have changed.

**Key areas to verify:**
- File hierarchy and precedence (global, project, local, rules/)
- Size recommendations
- Supported frontmatter for rules files
- Integration with other Claude Code features

Flag outdated patterns as issues requiring update.

### Step 3: Evaluate Placement

For each instruction, check placement is appropriate:

| Instruction Type | Correct Location | Wrong Location |
|------------------|------------------|----------------|
| Personal preferences | Global or Local | Project |
| Team standards | Project | Global |
| Machine-specific paths | Local | Project or Global |
| Project commands | Project | Global |
| Path-specific rules | Rules with `paths` | Global |

**Scoring:**
- 3: All instructions correctly placed
- 2: Minor placement issues
- 1: Significant misplacement
- 0: Most instructions wrong level

### Step 4: Check for Duplications

Compare content across all files. Flag:

| Duplication Type | Severity | Example |
|------------------|----------|---------|
| **Exact duplicate** | High | Same instruction in global and project |
| **Semantic duplicate** | Medium | "Use tabs" in global, "Indent with tabs" in project |
| **Redundant with defaults** | Low | Instructions Claude follows anyway |

**Scoring:**
- 3: No duplications
- 2: Minor redundancy
- 1: Multiple duplications
- 0: Heavily duplicated

### Step 5: Check for Contradictions

Look for conflicting instructions between levels:

| Contradiction Type | Severity | Example |
|--------------------|----------|---------|
| **Direct conflict** | High | Global: "use tabs" vs Project: "use spaces" |
| **Implicit conflict** | Medium | Global: "always X" vs Project: "never X in this case" |
| **Ambiguous overlap** | Low | Both mention same topic differently |

**Note:** Project overriding global is intentional, not a contradiction. Only flag when override isn't clearly intentional.

**Scoring:**
- 3: No contradictions
- 2: Minor ambiguity
- 1: Some conflicts
- 0: Major contradictions

### Step 6: Evaluate Focus and Size

Each file should be focused, lean, and within size limits:

| Focus Issue | Symptom | Fix |
|-------------|---------|-----|
| **Oversized** | >500 lines total | Split into rules/ files or nested CLAUDE.md |
| **Too many instructions** | >150 instructions | Prioritize, remove obvious |
| **Bloated** | >100 lines, many topics | Split into rules/ files |
| **Unfocused** | Mixes concerns | Reorganize by topic |
| **Verbose** | Explains obvious things | Remove, Claude knows |
| **Vague** | No specific commands | Add concrete instructions |
| **Code style in CLAUDE.md** | Style rules that linters handle | Remove, use linter config |
| **Embedded code blocks** | Large code examples | Use file:line references |

**Size targets:**
- **Lean config:** ~60 lines - minimal project-specific overrides
- **Standard config:** ~150 lines - project commands, key patterns
- **Comprehensive reference:** 300-500 lines - full tech stack patterns, pitfalls, examples

Choose target based on project complexity. Comprehensive is appropriate for critical infrastructure with specific tech stacks.

**Scoring:**
- 3: Each file focused and appropriate size for its purpose
- 2: Minor verbosity or organization issues
- 1: Bloated, unfocused, or wrong size tier
- 0: Major organization issues

### Step 7: Check Actionability

Instructions should be specific and actionable:

| Good | Bad |
|------|-----|
| `mix test` | "run the tests" |
| "Use Ash Domain as public API" | "follow best practices" |
| "No business logic in LiveViews" | "keep code clean" |

**Scoring:**
- 3: All instructions actionable
- 2: Some vague instructions
- 1: Many vague instructions
- 0: Mostly unactionable

### Step 8: Check Content Quality

For projects with specific tech stacks, verify appropriate coverage:

**For Elixir/Phoenix/Ash projects, check for:**
- [ ] Common pitfalls section (policy blocks, actor timing, etc.)
- [ ] Idiomatic patterns (pipes, pattern matching, error handling)
- [ ] Framework-specific patterns (Ash lifecycle, LiveView streams)
- [ ] HEEx template gotchas (interpolation, class lists, etc.)
- [ ] Code reuse guidance (helper modules to check first)
- [ ] MCP tool workflows (Context7 for docs, Tidewave for runtime)

**For any project, check for:**
- [ ] Quality commands (test, format, lint)
- [ ] Pre-commit checklist
- [ ] Expert reference docs (if available)

**Scoring:**
- 3: Comprehensive coverage for tech stack
- 2: Missing some patterns/pitfalls
- 1: Minimal coverage
- 0: No tech-stack-specific guidance

### Step 9: Check CLAUDE.md / AGENTS.md Consistency

If both files exist, verify:
- [ ] Same patterns documented (no contradictions)
- [ ] CLAUDE.md has MCP-specific workflows (Context7, Tidewave)
- [ ] AGENTS.md omits MCP references (other agents don't have these)
- [ ] Core patterns present in both

**Scoring:**
- 3: Consistent, appropriate differences
- 2: Minor inconsistencies
- 1: Significant gaps or contradictions
- 0: Files contradict each other

---

## Review Report Template

```markdown
## Agent Instruction Files Review

### Files Found

| Location | Present | Lines | Instructions |
|----------|---------|-------|--------------|
| ~/.claude/CLAUDE.md | Yes/No | N | N |
| ./CLAUDE.md | Yes/No | N | N |
| ./AGENTS.md | Yes/No | N | N |
| ./CLAUDE.template.md | Yes/No | N | N |
| ./CLAUDE.local.md | Yes/No | N | N |
| ./.claude/rules/*.md | N files | N total | N total |
| **Total** | | **N** | **N** |

Size targets: Lean config ~60 lines, Comprehensive reference ~300-500 lines.

### Scores

| Dimension | Score | Notes |
|-----------|-------|-------|
| Placement | X/3 | |
| Duplication | X/3 | |
| Contradictions | X/3 | |
| Focus & Size | X/3 | |
| Actionability | X/3 | |
| Content Quality | X/3 | |
| CLAUDE/AGENTS Consistency | X/3 | |
| **Total** | **X/21** | |

### Duplications Found
[List any duplicated instructions, or "None"]

### Contradictions Found
[List any conflicts, or "None"]

### Placement Issues
[List misplaced instructions, or "None"]

### Focus/Size Issues
[List bloated, unfocused, or oversized files, or "None"]

### Recommendations
1. [Specific improvement]
2. [Specific improvement]

### Verdict: [Clean/Improve/Reorganize]
```

---

## Scoring Interpretation

| Total Score | Verdict | Action |
|-------------|---------|--------|
| 18-21 | **Clean** | Minor tweaks at most |
| 13-17 | **Improve** | Address specific issues |
| 7-12 | **Reorganize** | Significant restructuring needed |
| 0-6 | **Rebuild** | Start fresh with clear structure |

---

## Common Issues and Fixes

### Issue: Global Pollution

**Symptom:** Global CLAUDE.md has project-specific instructions.

**Example:**
```markdown
# ~/.claude/CLAUDE.md
- Use Ash Framework  # Wrong! Project-specific
- Run: mix test      # Wrong! Project-specific
```

**Fix:** Move to project CLAUDE.md. Global should only have personal preferences that apply everywhere.

### Issue: Duplicate Commands

**Symptom:** Same command appears in multiple files.

**Example:**
```markdown
# ~/.claude/CLAUDE.md
- Format: mix format

# ./.claude/CLAUDE.md
- Format code: mix format  # Duplicate!
```

**Fix:** Keep in most appropriate location only. Usually project for project commands.

### Issue: Contradicting Styles

**Symptom:** Different files give conflicting guidance.

**Example:**
```markdown
# ~/.claude/CLAUDE.md
- Use descriptive variable names

# ./.claude/CLAUDE.md
- Keep variable names short  # Contradicts!
```

**Fix:** Decide on one approach. If project intentionally overrides, document why.

### Issue: Monolithic Project File

**Symptom:** Single CLAUDE.md >100 lines covering many topics.

**Fix:** Split into `.claude/rules/`:
```
.claude/rules/
├── testing.md
├── architecture.md
├── api-design.md
└── frontend.md
```

### Issue: Obvious Instructions

**Symptom:** Instructions that Claude would follow anyway.

**Example:**
```markdown
- Write clean code
- Follow best practices
- Be helpful
```

**Fix:** Remove. These waste context and add no value.

### Issue: Vague Guidance

**Symptom:** Instructions without specific actions.

**Example:**
```markdown
- Handle errors properly
- Write good tests
```

**Fix:** Be specific:
```markdown
- Wrap external calls in try/rescue, log errors
- Test success path, validation errors, and authorization
```

### Issue: Code Style in CLAUDE.md

**Symptom:** Style rules that linters already enforce.

**Example:**
```markdown
- Use 2-space indentation
- Line length max 100 characters
- Use trailing commas
```

**Fix:** Remove from CLAUDE.md. Configure linters:
- Elixir: `.formatter.exs`, `.credo.exs`
- TypeScript: `.eslintrc`, `.prettierrc`
- Python: `pyproject.toml`, `.flake8`

Hooks can run linters automatically.

### Issue: Embedded Code Examples

**Symptom:** Large code blocks in CLAUDE.md.

**Example:**
```markdown
## Pattern Example
\`\`\`elixir
defmodule MyApp.Accounts.User do
  use Ash.Resource
  # ... 50 lines of code
end
\`\`\`
```

**Fix:** Use file:line references:
```markdown
## Pattern Example
See `lib/my_app/accounts/user.ex:1-50` for User resource pattern.
```

---

## Validation Checklist

Before completing review:

- [ ] Discovered all instruction files (CLAUDE.md, AGENTS.md, template, local, rules/)
- [ ] Scored all 7 dimensions
- [ ] Checked total lines (lean ~60, comprehensive ~300-500)
- [ ] Checked instruction count (target ~50, max 150)
- [ ] Identified specific duplications
- [ ] Identified specific contradictions
- [ ] Checked placement for each instruction type
- [ ] Evaluated focus of each file
- [ ] Verified no code style rules (use linters)
- [ ] Verified no large embedded code (use file:line refs)
- [ ] Checked tech-stack-specific content coverage
- [ ] Checked CLAUDE.md / AGENTS.md consistency
- [ ] Verified MCP tools only in CLAUDE.md (not AGENTS.md)
- [ ] Provided actionable recommendations
- [ ] Assigned verdict (Clean/Improve/Reorganize/Rebuild)
