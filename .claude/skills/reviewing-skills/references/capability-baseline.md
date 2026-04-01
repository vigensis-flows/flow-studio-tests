# Claude Capability Baseline

**Use when:** Evaluating if a skill provides unique value or just restates what Claude already knows.

This reference helps identify content that doesn't need to be in skills because Claude handles it natively.

---

## What Claude Knows Well (No Skill Needed)

### Programming Languages & Frameworks
- All major languages (Python, JavaScript, TypeScript, Go, Rust, etc.)
- Popular frameworks (React, Vue, Django, FastAPI, Express, etc.)
- Standard library usage for common languages
- Idiomatic patterns and best practices

**Skill NOT needed for:**
- "How to write a for loop in Python"
- "React component best practices"
- "TypeScript generics explained"

### Common File Formats
- JSON, YAML, TOML, XML parsing and generation
- Markdown formatting
- CSV processing
- Standard config file formats

**Skill NOT needed for:**
- "How to parse JSON"
- "YAML syntax guide"

### Standard Tools & CLIs
- Git (all common operations)
- npm, pip, cargo, go modules
- Docker basics
- Common shell commands

**Skill NOT needed for:**
- "Git branching workflow"
- "Docker basics"

### General Best Practices
- Code review principles
- Testing fundamentals (TDD, unit tests, integration)
- Clean code principles
- Common design patterns
- Security basics (OWASP top 10)

**Skill NOT needed for:**
- "How to write clean code"
- "Unit testing basics"

### Common APIs & Services
- REST API design
- GraphQL fundamentals
- Authentication patterns (JWT, OAuth basics)
- Database query patterns (SQL, NoSQL)

---

## Where Skills ADD Value

### Proprietary/Internal Content
- Company-specific schemas
- Internal API documentation
- Business logic rules
- Team conventions not in docs

### Specialized Domain Knowledge
- Industry-specific regulations
- Niche library APIs (especially poorly documented)
- Complex integration patterns
- Edge cases from experience

### Validated Workflows
- Multi-step processes that need specific order
- Error-prone operations with known pitfalls
- Workflows requiring specific tool combinations

### Reusable Scripts
- Code that would be rewritten each time
- Complex transformations
- Validation utilities

### Guardrails & Rules
- Project-specific constraints
- Compliance requirements
- Quality gates that must not be skipped

---

## Model Improvement Indicators

Signs Claude's capabilities have improved (skill may be obsolete):

### Direct Evidence
- Claude handles task correctly without skill loaded
- Claude's reasoning matches what skill teaches
- Fewer corrections needed for this task type

### Indirect Evidence
- Skill was created for older model version
- Skill explains concepts now in training data
- Community feedback shows skill is redundant

### Test Method

1. **Without skill:** Ask Claude to perform the task
2. **Evaluate:** Did Claude succeed? With what quality?
3. **With skill:** Perform same task
4. **Compare:** Did skill meaningfully improve outcome?

If no meaningful improvement → skill may not add value.

---

## Claude Code Feature Overlap

Check if Claude Code now handles natively:

### File Operations
- Reading, writing, editing files → Native tools
- Searching codebase → Glob, Grep tools
- Git operations → Built-in git support

### Web & Research
- Fetching web content → WebFetch, WebSearch
- API documentation → Context7, web tools
- Current information → SOAR, WebSearch

### Task Management
- Multi-step workflows → TodoWrite tool
- Planning → EnterPlanMode
- Sub-tasks → Task tool with agents

### Code Execution
- Running scripts → Bash tool
- Testing → Direct execution
- Building → Native support

**Skill NOT needed for:**
- Generic "how to search files" (use Glob/Grep)
- Generic "how to fetch web content" (use WebFetch)
- Basic git workflows (native support)

---

## Evaluation Checklist

When reviewing a skill, check:

- [ ] Does Claude know this from training? (test without skill)
- [ ] Is this covered by Claude Code features? (check tool list)
- [ ] Is this general knowledge or proprietary?
- [ ] Would a prompt work as well as a skill?
- [ ] Has model capability improved since skill creation?

If 3+ checks suggest no unique value → consider retirement.

---

## Example: Skill Value Assessment

### Skill: "json-processing"
```yaml
description: Parse and transform JSON files...
```

**Assessment:**
- Claude knows JSON natively ✗
- No proprietary schemas ✗
- No unique scripts ✗
- Explains basic concepts ✗

**Verdict:** Retire - no unique value

### Skill: "company-api-client"
```yaml
description: Interact with internal API using company auth...
```

**Assessment:**
- Contains internal API endpoints ✓
- Has authentication details ✓
- Documents company-specific patterns ✓
- Would need to be rediscovered without skill ✓

**Verdict:** Keep - high unique value
