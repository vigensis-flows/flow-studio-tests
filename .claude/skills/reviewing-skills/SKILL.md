---
name: reviewing-skills
description: Reviews agent skills for value, quality, and standard compliance. Use when reviewing, checking, or auditing skills. Triggers: "review skill", "check skill", "audit skills", "is this skill worth keeping", "retire skill".
---

# Reviewing Skills

Evaluates skills against the Agent Skills open standard (agentskills.io) and current best practices. Determines if skills provide genuine value, suggests improvements, and recommends retirement when skills no longer serve a purpose.

## Why Review Skills?

Skills can become obsolete:
- **Model improvements**: The model now knows what the skill teaches
- **Platform updates**: Native features replace custom workflows
- **Redundancy**: Multiple skills cover same ground
- **Scope creep**: Skill tries to do too much
- **Context bloat**: Cost exceeds benefit
- **Standard drift**: Skill uses outdated patterns

---

## Review Process

### Step 1: Read the Skill

Read SKILL.md and all referenced files:
```
skill-name/
├── SKILL.md
├── references/
├── scripts/
└── assets/
```

Note the skill's claimed purpose, triggers, and content.

### Step 2: Check Standard Compliance

Verify against the Agent Skills open standard and current best practices.

**Frontmatter:**
- `name` present, max 64 chars, lowercase + hyphens, matches directory
- `description` present, max 1024 chars, third person, includes what + when

**Structure:**
- SKILL.md under 500 lines
- References one level deep (no nested references)
- Scripts in `scripts/`, references in `references/`, assets in `assets/`

**Content quality (written for models, not humans):**

| Green Flag | Red Flag |
|------------|----------|
| Imperative instructions: "Run X", "Check Y" | Explanatory prose: "This is useful because..." |
| Specific commands with exact syntax | Concepts the model already knows |
| Schemas and examples | Context-setting paragraphs |
| Concise bullets | Friendly tutorial-style tone |

**Litmus test:** For each paragraph, ask "Would removing this hurt the model's task performance?" If not, it should be removed.

**Platform portability:**
- Core content uses only standard fields (`name`, `description`)
- Claude Code extensions (`context`, `agent`, `model`, etc.) noted as non-portable
- No hardcoded tool names (`mcp__context7`, `search_assets`)

### Step 3: Evaluate Value

Score each dimension (0-3):

| Dimension | 0 (None) | 1 (Low) | 2 (Medium) | 3 (High) |
|-----------|----------|---------|------------|----------|
| **Unique knowledge** | Model knows this | Minor additions | Significant context | Critical/proprietary |
| **Token efficiency** | Verbose, wasteful | Some bloat | Reasonably lean | Optimal |
| **Practical utility** | Never triggers | Rare use | Regular use | Essential |
| **Current relevance** | Outdated | Partially stale | Mostly current | Fully current |
| **Standard compliance** | No frontmatter, wrong format | Partial compliance | Minor deviations | Fully compliant |

**Total score interpretation:**
- 13-15: Keep as-is
- 10-12: Keep with improvements
- 6-9: Consider major revision or merge
- 0-5: Recommend retirement

### Step 4: Run Value Tests

**Test 1: The "Model Already Knows" Test**
> Would the model handle this task well WITHOUT the skill?

If yes → skill may not add value.

**Test 2: The "Token Cost" Test**
> Does the context provided justify the tokens consumed?

Calculate: SKILL.md lines + typical reference reads. If >500 lines for marginal benefit → bloated.

**Test 3: The "Trigger Clarity" Test**
> Is it clear when this skill should activate?

Vague descriptions = poor discovery = wasted skill.

**Test 4: The "Redundancy" Test**
> Does another skill or native feature cover this?

Check for overlap with other skills and platform features.

**Test 5: The "Freedom Match" Test**
> Does instruction specificity match task fragility?

High-freedom guidelines for flexible tasks. Exact scripts for fragile operations. Mismatched freedom = either brittle failures or unnecessary rigidity.

**Test 6: The "Progressive Disclosure" Test**
> Is content loaded at the right level?

Metadata should be ~100 tokens. SKILL.md body under 5K tokens. Detailed content in `references/`. Scripts execute rather than load into context.

### Step 5: Generate Recommendations

| Recommendation | When to Use |
|----------------|-------------|
| **Keep** | Score 13+, passes all tests |
| **Improve** | Score 10-12, minor issues identified |
| **Revise** | Score 6-9, significant issues but core value exists |
| **Merge** | Overlaps with another skill |
| **Retire** | Score 0-5, fails multiple tests |

---

## Value Assessment Framework

### High-Value Skills Provide

1. **Proprietary knowledge** — Company schemas, internal APIs, business logic
2. **Validated workflows** — Tested multi-step processes that prevent errors
3. **Reusable scripts** — Code that would be rewritten each time
4. **Domain expertise** — Specialized knowledge the model lacks
5. **Guardrails** — Rules that prevent common mistakes

### Low-Value Skills Contain

1. **General knowledge** — Things the model already knows
2. **Verbose explanations** — Over-explaining basic concepts
3. **Obvious workflows** — Steps the model would naturally follow
4. **Outdated content** — Deprecated libraries, old patterns
5. **Redundant information** — Duplicates other skills or docs

### Red Flags

- Explains what a common library does
- Provides generic best practices the model knows
- No scripts, schemas, or unique content
- Description is vague ("helps with documents")
- Body exceeds 500 lines with no references
- No clear trigger conditions
- Agent-noun naming (reviewer, builder) instead of gerund (reviewing, building)
- References external files that may move
- "Related Skills" section (unnecessary coupling)
- Human-oriented prose meant for people, not models

### Green Flags

- Contains proprietary schemas or configs
- Includes validated, tested scripts
- Documents company-specific workflows
- Clear, specific trigger phrases
- Uses progressive disclosure effectively
- Self-contained (examples inline or in references/)
- Gerund naming (reviewing-x, processing-x)
- Freedom matches fragility

---

## Common Issues and Fixes

### Issue: Human-Oriented Content

**Symptom:** Explanatory prose, tutorial tone, concepts the model knows.

**Fix:** Rewrite as imperative instructions. Apply the litmus test to each paragraph.

### Issue: Vague Description

**Symptom:** Description doesn't specify when to use.

**Bad:** `description: Helps with data processing`

**Fix:** Add specific triggers:
```yaml
description: Transform CSV files to JSON with validation. Use when converting spreadsheet exports, processing CSV uploads, or cleaning tabular data.
```

### Issue: Missing Progressive Disclosure

**Symptom:** Everything in SKILL.md, >500 lines.

**Fix:** Move detailed content to `references/`. Keep SKILL.md as navigation + core workflow.

### Issue: Freedom Mismatch

**Symptom:** Vague guidelines for fragile operations, or rigid scripts for flexible tasks.

**Fix:** Match specificity to fragility. Bundle scripts for deterministic operations. Use text guidelines for judgment-based tasks.

### Issue: Outdated Content

**Symptom:** References deprecated libraries, old patterns, or pre-standard format.

**Fix:** Update or retire. Check against current open standard.

### Issue: No Unique Content

**Questions:**
- What does this skill provide that the model doesn't already know?
- Would removing this skill noticeably impact task quality?

**Fix:** If no unique value → retire.

### Issue: Scope Creep

**Symptom:** Skill covers too many domains.

**Fix:** Split into focused skills or trim to core purpose.

### Issue: Non-Portable Extensions as Core

**Symptom:** Skill depends on Claude Code-specific features (context: fork, hooks) in ways that make the core workflow non-portable.

**Fix:** Ensure the core procedural knowledge works without platform extensions. Extensions enhance, not define.

### Issue: Wrong Naming Convention

**Symptom:** Uses agent nouns (skill-builder, pdf-processor).

**Fix:** Use gerund form (building-skills, processing-pdfs).

---

## Review Report Template

```markdown
## Skill Review: [skill-name]

### Summary
[1-2 sentence assessment]

### Value Score: X/15

| Dimension | Score | Notes |
|-----------|-------|-------|
| Unique knowledge | /3 | |
| Token efficiency | /3 | |
| Practical utility | /3 | |
| Current relevance | /3 | |
| Standard compliance | /3 | |

### Test Results

| Test | Pass/Fail | Notes |
|------|-----------|-------|
| Model Already Knows | | |
| Token Cost | | |
| Trigger Clarity | | |
| Redundancy | | |
| Freedom Match | | |
| Progressive Disclosure | | |

### Issues Found
1. [Issue with suggested fix]
2. [Issue with suggested fix]

### Recommendation: [Keep/Improve/Revise/Merge/Retire]

### Suggested Changes
- [Specific improvement]
- [Specific improvement]
```

---

## Batch Review Process

When reviewing multiple skills:

1. **List all skills** with line counts and reference counts
2. **Quick triage** using red/green flags
3. **Deep review** high-value candidates
4. **Identify overlaps** for potential merges
5. **Generate summary** with recommendations

See [references/batch-review.md](references/batch-review.md) for batch review template.

---

## When to Retire a Skill

Retire when:
- Score 0-5 on value assessment
- Fails 3+ value tests
- Model handles task equally well without skill
- Content is significantly outdated
- Duplicate of another skill or native feature
- Not triggered in months of actual use

**Retirement process:**
1. Document reason for retirement
2. Check for dependent skills/docs
3. Archive if historically valuable
4. Delete from active skills directory

---

## Validation Checklist

**Before completing a review:**
- [ ] Read SKILL.md and all referenced files
- [ ] Checked standard compliance (frontmatter, structure, content quality)
- [ ] Scored all 5 dimensions (0-3 each)
- [ ] Ran all 6 value tests
- [ ] Documented issues with suggested fixes
- [ ] Provided clear recommendation (Keep/Improve/Revise/Merge/Retire)
- [ ] Used review report template

**For batch reviews:**
- [ ] Listed all skills with line counts
- [ ] Applied red/green flag triage
- [ ] Identified overlaps for potential merges
- [ ] Generated summary with action items
