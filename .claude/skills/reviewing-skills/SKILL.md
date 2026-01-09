---
name: reviewing-skills
description: Reviews Claude Code skills for value and quality. Use when reviewing, checking, or auditing skills. Triggers: "review skill", "check skill", "audit skills", "is this skill worth keeping", "retire skill".
---

# Reviewing Skills

Evaluates skills to determine if they provide genuine value, suggests improvements, and recommends retirement when skills no longer serve a purpose.

## Why Review Skills?

Skills can become obsolete:
- **Model improvements**: Claude now knows what the skill teaches
- **Claude Code updates**: Native features replace custom workflows
- **Redundancy**: Multiple skills cover same ground
- **Scope creep**: Skill tries to do too much
- **Context bloat**: Cost exceeds benefit

Regular review prevents context waste and keeps skill collections focused.

---

## Check: Written for Claude, Not Humans

**Critical review criterion:** Skills must be written for Claude to consume, not for humans to read.

**Red flags (human-oriented content):**
- Explanatory prose ("This is useful because...")
- Concepts Claude already knows (JSON, REST, common patterns)
- Context-setting paragraphs with no actionable information
- Friendly, tutorial-style tone

**Green flags (Claude-oriented content):**
- Imperative instructions: "Run X", "Check Y"
- Specific commands with exact syntax
- Schemas and examples without excessive explanation
- Concise bullets over prose

**Apply this test:** For each paragraph, ask "Would removing this hurt Claude's task performance?" If not, it should be removed.

When reviewing, flag human-oriented content as a specific issue and recommend removal or rewrite.

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

### Step 2: Check Current Best Practices

**Before evaluating, verify the skill against current Claude Code guidance.**

1. Search for recent Claude Code skill changes (DO NOT trust training data)
2. Check if Anthropic has updated skill documentation
3. Compare skill structure against current recommendations

**Why this matters:** Claude Code evolves rapidly. Skills created months ago may use outdated patterns, deprecated approaches, or miss new capabilities.

**Key areas to verify:**
- YAML frontmatter schema (has it changed?)
- Description best practices (trigger optimization)
- Progressive disclosure patterns
- Tool integration methods

Flag outdated patterns as issues requiring update.

### Step 3: Evaluate Value

Score each dimension (0-3):

| Dimension | 0 (None) | 1 (Low) | 2 (Medium) | 3 (High) |
|-----------|----------|---------|------------|----------|
| **Unique knowledge** | Claude knows this | Minor additions | Significant context | Critical/proprietary |
| **Token efficiency** | Verbose, wasteful | Some bloat | Reasonably lean | Optimal |
| **Practical utility** | Never triggers | Rare use | Regular use | Essential |
| **Current relevance** | Outdated | Partially stale | Mostly current | Fully current |

**Total score interpretation:**
- 10-12: Keep as-is
- 7-9: Keep with improvements
- 4-6: Consider major revision or merge
- 0-3: Recommend retirement

### Step 3: Apply Value Tests

Run each test. Track failures.

**Test 1: The "Claude Already Knows" Test**
> Would Claude handle this task well WITHOUT the skill?

If yes → skill may not add value.

**Test 2: The "Token Cost" Test**
> Does the context provided justify the tokens consumed?

Calculate: SKILL.md lines + typical reference reads. If >500 lines for marginal benefit → bloated.

**Test 3: The "Trigger Clarity" Test**
> Is it clear when this skill should activate?

Vague descriptions = poor discovery = wasted skill.

**Test 4: The "Redundancy" Test**
> Does another skill or Claude Code feature cover this?

Check for overlap with other skills and native features.

**Test 5: The "Last Updated" Test**
> Does the skill reference outdated libraries, patterns, or versions?

Stale skills teach bad habits.

### Step 4: Generate Recommendations

Based on evaluation, recommend one of:

| Recommendation | When to Use |
|----------------|-------------|
| **Keep** | Score 10+, passes all tests |
| **Improve** | Score 7-9, minor issues identified |
| **Revise** | Score 4-6, significant issues but core value exists |
| **Merge** | Overlaps with another skill |
| **Retire** | Score 0-3, fails multiple tests |

---

## Value Assessment Framework

### What Makes a Skill Valuable?

**High-value skills provide:**

1. **Proprietary knowledge** - Company schemas, internal APIs, business logic
2. **Validated workflows** - Tested multi-step processes that prevent errors
3. **Reusable scripts** - Code that would be rewritten each time
4. **Domain expertise** - Specialized knowledge Claude lacks
5. **Guardrails** - Rules that prevent common mistakes

**Low-value skills contain:**

1. **General knowledge** - Things Claude already knows well
2. **Verbose explanations** - Over-explaining basic concepts
3. **Obvious workflows** - Steps Claude would naturally follow
4. **Outdated content** - Deprecated libraries, old patterns
5. **Redundant information** - Duplicates other skills or docs

### Red Flags (Likely Low Value)

- Explains what a common library does
- Provides generic best practices Claude knows
- Describes obvious file formats (JSON, YAML, etc.)
- Contains no scripts, schemas, or unique content
- Description is vague ("helps with documents")
- Body exceeds 500 lines with no references
- No clear trigger conditions
- Uses agent-noun naming (reviewer, builder) instead of gerund form
- References external files that may move (tmp/, user directories)
- Contains "Related Skills" section (creates unnecessary coupling)

### Green Flags (Likely High Value)

- Contains proprietary schemas or configs
- Includes validated, tested scripts
- Documents company-specific workflows
- Provides internal API documentation
- Has clear, specific trigger phrases
- Uses progressive disclosure effectively
- Updated within last 6 months
- Uses gerund naming (reviewing-x, processing-x)
- Self-contained (examples inline or in references/)

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Reviewing without reading refs | Read all referenced files first |
| Skipping value tests | Run all 5 tests, track failures |
| No score justification | Document reasoning for each dimension |
| Missing recommendation | Always end with Keep/Improve/Revise/Merge/Retire |
| Forgetting token cost | Calculate SKILL.md + typical reference reads |
| Ignoring naming convention | Check for gerund form (reviewing-x not x-reviewer) |

---

## Common Issues and Fixes

### Issue: Verbose Explanations

**Symptom:** Paragraphs explaining what Claude already knows.

**Example of bloat:**
```markdown
JSON (JavaScript Object Notation) is a lightweight data format
that is easy to read and write. It consists of key-value pairs
enclosed in curly braces...
```

**Fix:** Delete. Claude knows JSON.

### Issue: Vague Description

**Symptom:** Description doesn't specify when to use.

**Bad:** `description: Helps with data processing`

**Fix:** Add specific triggers:
```yaml
description: Transform CSV files to JSON with validation. Use when converting spreadsheet exports, processing CSV uploads, or cleaning tabular data.
```

### Issue: Outdated Content

**Symptom:** References deprecated libraries or old patterns.

**Fix:** Update or retire. Outdated skills teach bad habits.

### Issue: No Unique Content

**Symptom:** Skill contains only general guidance Claude already knows.

**Questions to ask:**
- What does this skill provide that Claude doesn't already know?
- Would removing this skill noticeably impact task quality?

**Fix:** If no unique value → retire.

### Issue: Scope Creep

**Symptom:** Skill tries to cover too many domains.

**Fix:** Split into focused skills or trim to core purpose.

### Issue: Missing Progressive Disclosure

**Symptom:** Everything in SKILL.md, >500 lines.

**Fix:** Move detailed content to references/.

### Issue: Wrong Naming Convention

**Symptom:** Uses agent nouns (skill-builder, pdf-processor).

**Fix:** Use gerund form (building-skills, processing-pdfs).

### Issue: External Dependencies

**Symptom:** References files outside the skill directory (tmp/, examples elsewhere).

**Fix:** Move examples and content into skill's references/ or inline in SKILL.md. Skills should be self-contained.

### Issue: Related Skills Section

**Symptom:** Skill contains a "Related Skills" section listing other skills.

**Problems:**
- Creates coupling between skills
- Becomes stale when skills are renamed/retired
- Doesn't help Claude discover skills (descriptions do that)
- Adds maintenance burden

**Fix:** Remove the section entirely. If workflow order matters, use Prerequisites section instead (states what must exist, not what's related).

---

## Review Report Template

After reviewing, provide structured feedback:

```markdown
## Skill Review: [skill-name]

### Summary
[1-2 sentence assessment]

### Value Score: X/12

| Dimension | Score | Notes |
|-----------|-------|-------|
| Unique knowledge | X/3 | |
| Token efficiency | X/3 | |
| Practical utility | X/3 | |
| Current relevance | X/3 | |

### Test Results

| Test | Pass/Fail | Notes |
|------|-----------|-------|
| Claude Already Knows | | |
| Token Cost | | |
| Trigger Clarity | | |
| Redundancy | | |
| Last Updated | | |

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

1. **List all skills** with line counts
2. **Quick triage** using red/green flags
3. **Deep review** high-value candidates
4. **Identify overlaps** for potential merges
5. **Generate summary** with recommendations

See [references/batch-review.md](references/batch-review.md) for batch review template.

---

## When to Retire a Skill

Retire when:
- Score 0-3 on value assessment
- Fails 3+ value tests
- Claude handles task equally well without skill
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
- [ ] Scored all 4 dimensions (0-3 each)
- [ ] Ran all 5 value tests
- [ ] Documented issues with suggested fixes
- [ ] Provided clear recommendation (Keep/Improve/Revise/Merge/Retire)
- [ ] Used review report template for consistency

**For batch reviews:**
- [ ] Listed all skills with line counts
- [ ] Applied red/green flag triage
- [ ] Identified overlaps for potential merges
- [ ] Generated summary with action items

---

## Additional Resources

### Reference Files
- **[references/batch-review.md](references/batch-review.md)** - Template for reviewing skill collections
- **[references/capability-baseline.md](references/capability-baseline.md)** - What Claude knows natively (for comparison)
