# Skill Patterns

**Use when:** Designing workflows, output formats, or conditional logic in skills.

## Contents
- Sequential Workflows
- Conditional Workflows
- Template Patterns
- Example Patterns
- Feedback Loops

---

## Sequential Workflows

For complex tasks, provide clear step overview:

```markdown
## PDF Form Filling Workflow

Copy this checklist and track progress:

- [ ] Step 1: Analyze form (run analyze_form.py)
- [ ] Step 2: Create field mapping (edit fields.json)
- [ ] Step 3: Validate mapping (run validate_fields.py)
- [ ] Step 4: Fill the form (run fill_form.py)
- [ ] Step 5: Verify output (run verify_output.py)

**Step 1: Analyze the form**
Run: `python scripts/analyze_form.py input.pdf`
This extracts form fields and saves to `fields.json`.

**Step 2: Create field mapping**
Edit `fields.json` to add values for each field.
[etc.]
```

Checklists help Claude track progress through multi-step workflows.

---

## Conditional Workflows

Guide through decision points:

```markdown
## Document Modification

1. Determine modification type:
   **Creating new content?** → Follow "Creation workflow" below
   **Editing existing content?** → Follow "Editing workflow" below

2. Creation workflow:
   - Use docx-js library
   - Build document from scratch
   - Export to .docx format

3. Editing workflow:
   - Unpack existing document
   - Modify XML directly
   - Validate after each change
   - Repack when complete
```

---

## Template Patterns

### Strict Template (data formats, API responses)

```markdown
## Report Structure

ALWAYS use this exact structure:

# [Analysis Title]

## Executive Summary
[One-paragraph overview]

## Key Findings
- Finding 1 with data
- Finding 2 with data

## Recommendations
1. Specific recommendation
2. Specific recommendation
```

### Flexible Template (when adaptation useful)

```markdown
## Report Structure

Sensible default format - adjust as needed:

# [Analysis Title]

## Executive Summary
[Overview]

## Key Findings
[Adapt sections based on discoveries]

## Recommendations
[Tailor to specific context]
```

---

## Example Patterns

For output quality, provide input/output pairs:

```markdown
## Commit Message Format

Generate messages following these examples:

**Example 1:**
Input: Added user authentication with JWT tokens
Output:
```
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware
```

**Example 2:**
Input: Fixed bug where dates displayed incorrectly
Output:
```
fix(reports): correct date formatting in timezone conversion

Use UTC timestamps consistently across report generation
```

Follow this style: type(scope): brief description, then detailed explanation.
```

Examples clarify style and detail better than descriptions.

---

## Feedback Loops

For quality-critical tasks, implement validation loops:

```markdown
## Document Editing Process

1. Make edits to `word/document.xml`
2. **Validate immediately**: `python scripts/validate.py dir/`
3. If validation fails:
   - Review error message
   - Fix issues in XML
   - Run validation again
4. **Only proceed when validation passes**
5. Rebuild: `python scripts/pack.py dir/ output.docx`
6. Test the output document
```

Pattern: Run validator → fix errors → repeat.

---

## Domain-Specific Organization

For skills with multiple domains:

```
bigquery-skill/
├── SKILL.md (overview and navigation)
└── references/
    ├── finance.md (revenue, billing)
    ├── sales.md (pipeline, opportunities)
    └── product.md (API usage, features)
```

In SKILL.md:
```markdown
## Available Datasets

**Finance**: Revenue, ARR, billing → See [references/finance.md]
**Sales**: Pipeline, accounts → See [references/sales.md]
**Product**: API usage, features → See [references/product.md]
```

Claude loads only relevant domain file based on user's question.

---

## Script Documentation Pattern

```markdown
## Available Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `setup.sh` | Install dependencies | `./scripts/setup.sh` |
| `generate.sh` | Generate code | `./scripts/generate.sh [name]` |
| `validate.sh` | Validate output | `./scripts/validate.sh` |

**analyze_form.py**: Extract form fields from PDF
```bash
python scripts/analyze_form.py input.pdf > fields.json
```
Output format:
```json
{
  "field_name": {"type": "text", "x": 100, "y": 200}
}
```
```

Clear documentation enables Claude to use scripts without reading source.
