# Testing Skills

**Use when:** Validating skills before deployment, verifying skills work as documented, or improving existing skills.

## Contents
- Testing by Skill Type
- Functional Testing
- Trigger Testing
- Progressive Disclosure Testing
- Script Testing
- Model-Specific Testing
- TDD Pressure Testing (for discipline skills)
- Complete Testing Checklist

---

## Testing by Skill Type

Different skills need different testing depth:

| Skill Type | Testing Focus | Depth |
|------------|---------------|-------|
| Reference (API docs, schemas) | Accuracy, completeness | Light |
| Workflow (step-by-step guides) | Functional, order | Medium |
| Tool (scripts, utilities) | Execution, edge cases | Medium |
| Discipline (rules, requirements) | Pressure, rationalization | Deep |

---

## Functional Testing

Verify the skill works as documented.

### Workflow Verification

For each documented workflow:

1. **Follow steps exactly** as written
2. **Note friction points** - unclear instructions, missing steps
3. **Verify outputs** match expectations
4. **Test edge cases** - what if input is unusual?

**Test template:**
```markdown
## Workflow Test: [workflow name]

**Steps executed:**
1. [Step] → Result: [pass/fail]
2. [Step] → Result: [pass/fail]

**Issues found:**
- Step 3 assumes X exists but doesn't mention creating it
- Output format differs from documented example

**Fixes needed:**
- Add prerequisite to Step 1
- Update example output
```

### Reference Accuracy

For reference skills (schemas, API docs):

1. **Verify information is current** - check against source
2. **Test code examples** - do they run?
3. **Check completeness** - are common cases covered?

---

## Trigger Testing

Verify the skill activates when expected.

### Discovery Test

Ask Claude questions that SHOULD trigger the skill:

```markdown
Test queries for "pdf-processor" skill:
1. "Help me extract text from this PDF" → Should trigger
2. "Fill out this PDF form" → Should trigger
3. "Convert document to PDF" → Should trigger
4. "Read this Word file" → Should NOT trigger
```

**Document results:**
- Which queries triggered the skill?
- Which failed to trigger? (description may need refinement)
- Any false positives? (triggers when it shouldn't)

### Description Refinement

If trigger testing reveals issues:

**Problem:** Skill doesn't activate on expected queries

**Fix:** Add missing trigger phrases to description:
```yaml
# Before
description: Process PDF files.

# After
description: Extract text from PDFs, fill PDF forms, merge documents. Use when working with PDF files, forms, or document extraction.
```

**Problem:** Skill activates when it shouldn't

**Fix:** Add exclusions or be more specific:
```yaml
# Before
description: Process documents.

# After
description: Process PDF documents specifically. Use for PDF files only, not Word or other formats.
```

---

## Progressive Disclosure Testing

Verify references load correctly when needed.

### Reference Loading Test

1. **Ask question requiring reference content**
2. **Observe:** Does Claude read the reference file?
3. **Verify:** Does Claude use the reference information correctly?

**Example:**
```markdown
Skill: bigquery-skill
Reference: references/finance.md

Test: "What's the schema for the revenue table?"

Expected: Claude reads finance.md, provides accurate schema
Actual: [document what happened]
```

### Common Issues

| Issue | Symptom | Fix |
|-------|---------|-----|
| Reference not found | Claude says file doesn't exist | Check file path in SKILL.md |
| Reference ignored | Claude answers without reading | Make reference link more prominent |
| Partial read | Claude misses key info | Add table of contents to reference |

---

## Script Testing

Verify bundled scripts work correctly.

### Execution Test

For each script in `scripts/`:

```bash
# Test with expected inputs
python scripts/process.py test-input.txt

# Test with edge cases
python scripts/process.py empty.txt
python scripts/process.py large-file.txt

# Test error handling
python scripts/process.py nonexistent.txt
```

**Document:**
- Does script run without errors?
- Is output as documented?
- Are error messages helpful?

### Integration Test

Test scripts in the context of the full workflow:

1. Follow documented workflow using scripts
2. Verify script outputs feed correctly to next step
3. Check for undocumented dependencies

---

## Model-Specific Testing

Skills may perform differently across models.

### Model Comparison

Test skill with each model you'll use:

| Model | Considerations |
|-------|----------------|
| Haiku | Fast but less capable - does skill provide enough guidance? |
| Sonnet | Balanced - is skill clear and efficient? |
| Opus | Powerful - does skill avoid over-explaining? |

### Test Process

1. Run same test scenarios on each model
2. Note differences in:
   - Skill activation (did it trigger?)
   - Instruction following (did it follow steps?)
   - Output quality (was result correct?)
3. Adjust skill if one model struggles

**Common findings:**
- Haiku may need more explicit instructions
- Opus may skip steps it deems unnecessary
- Add model-specific notes if needed

---

## TDD Pressure Testing

For discipline-enforcing skills (rules that could be skipped).

### When to Use

Full pressure testing for:
- Skills with compliance costs (time, effort)
- Skills agents might rationalize away
- Rules that contradict immediate goals

### RED Phase: Baseline

Run scenario WITHOUT skill. Document failures.

**Pressure scenario template:**
```markdown
You spent [X hours] on [task]. It works perfectly.
[Time pressure]. [Consequence pressure].
You just realized you didn't [follow the rule].

Options:
A) [Correct but costly option]
B) [Tempting shortcut]
C) [Compromise option]

Choose A, B, or C.
```

**Combine 3+ pressures:**
- Time (deadline, emergency)
- Sunk cost (hours of work)
- Authority (senior says skip it)
- Exhaustion (end of day)
- Economic (job at stake)

Document:
- Which option agent chose
- Exact rationalizations (verbatim)

### GREEN Phase: Write Skill

Address specific failures documented in RED phase.
Run same scenarios WITH skill. Agent should comply.

### REFACTOR Phase: Close Loopholes

When agent violates despite having skill:

1. Capture new rationalizations verbatim
2. Add explicit negation in rules
3. Add to rationalization table
4. Re-test until bulletproof

**Rationalization table pattern:**
```markdown
| Excuse | Reality |
|--------|---------|
| "[exact excuse]" | [why it's wrong] |
```

### Meta-Testing

When agent still fails:
```markdown
You read the skill and chose [wrong option] anyway.
How could the skill be written differently to make
the correct choice crystal clear?
```

Reveals: documentation problem, organization issue, or foundational gap.

---

## Complete Testing Checklist

### All Skills (Minimum)

**Structure:**
- [ ] SKILL.md has valid YAML frontmatter
- [ ] All referenced files exist
- [ ] File paths use forward slashes

**Triggers:**
- [ ] Tested 3+ queries that SHOULD trigger skill
- [ ] Tested 2+ queries that should NOT trigger
- [ ] Description updated if triggers failed

**Functionality:**
- [ ] Followed documented workflow end-to-end
- [ ] Verified outputs match documentation
- [ ] Fixed any unclear or missing steps

### Skills with References

- [ ] References load when needed
- [ ] Reference content is accurate and current
- [ ] Long references have table of contents

### Skills with Scripts

- [ ] Scripts execute without errors
- [ ] Scripts handle edge cases gracefully
- [ ] Error messages are helpful
- [ ] Scripts work in documented workflow

### Skills for Multiple Models

- [ ] Tested on primary model (Sonnet)
- [ ] Tested on Haiku (if used)
- [ ] Tested on Opus (if used)
- [ ] Added model-specific notes if needed

### Discipline-Enforcing Skills

- [ ] Created pressure scenarios (3+ pressures)
- [ ] Ran baseline WITHOUT skill
- [ ] Documented rationalizations verbatim
- [ ] Skill addresses specific failures
- [ ] Agent complies WITH skill loaded
- [ ] Closed loopholes through refactor cycle
- [ ] Agent follows rule under maximum pressure

---

## Quick Validation (Pre-Deployment)

For rapid testing before deployment:

```markdown
## Quick Validation: [skill-name]

1. [ ] Triggers on expected query
2. [ ] Workflow runs without errors
3. [ ] Output matches documentation
4. [ ] Scripts execute (if any)
5. [ ] References load (if any)

Ready to deploy: Yes / No
Issues to fix: [list]
```
