---
name: processing-mvp-input
description: Processes input files (PDFs, Word, PPT, ZIP, code, markdown) for MVP creation. Extracts content, structure, and key information into a comprehensive digest. Use at the start of MVP creation when input files are provided.
---

# Processing MVP Input

Extracts and synthesizes content from diverse input files to create a comprehensive Input Digest for MVP discovery.

## When to Use

Use this skill when:
- Starting MVP creation with input files provided
- Input folder contains PDFs, documents, code, or other materials
- Need to create a structured digest of all input materials

## Supported File Types

| Type | Extensions | Extraction Method |
|------|------------|-------------------|
| **PDF** | `.pdf` | Text extraction via Read tool |
| **Word** | `.docx`, `.doc` | Text content extraction |
| **PowerPoint** | `.pptx`, `.ppt` | Slide content and notes |
| **Markdown** | `.md` | Direct inclusion |
| **Code** | `.ex`, `.exs`, `.js`, `.ts`, `.py`, etc. | Structure analysis, key files |
| **ZIP** | `.zip` | Extract and process contents |
| **Images** | `.png`, `.jpg`, `.jpeg` | Visual analysis via Read tool |
| **Text** | `.txt`, `.json`, `.yaml`, `.toml` | Direct inclusion |

## Process

### Step 1: Inventory Input

Scan the input folder recursively:

```
input_folder/
├── business-plan.pdf
├── mockups/
│   ├── screen1.png
│   └── screen2.png
├── requirements.docx
└── prototype/
    └── src/
        └── main.ex
```

Create inventory:
- Total files by type
- Folder structure
- Estimated content volume

### Step 2: Extract Content

For each file type, apply appropriate extraction:

**PDFs and Documents:**
- Extract full text content
- Preserve heading structure
- Note any tables, figures, or diagrams
- Flag unreadable sections

**Code Files:**
- Focus on README, main modules, schemas
- Extract module/function structure
- Note dependencies and architecture patterns
- Skip generated files, dependencies

**Images:**
- Analyze visual content
- Describe UI mockups, diagrams, charts
- Note any text in images

**Archives:**
- Extract to temporary location
- Process contents recursively

### Step 3: Synthesize Digest

Create structured Input Digest with:

1. **Executive Summary** - What is this input about? (2-3 sentences)
2. **Content Inventory** - What files were processed
3. **Key Themes** - Major topics across all inputs
4. **Business Context** - Goals, problems, constraints mentioned
5. **Technical Context** - Technologies, architectures, patterns
6. **User Context** - Who are the users? What are their needs?
7. **Visual Assets** - Mockups, diagrams, visual designs
8. **Open Questions** - Gaps, contradictions, unclear areas
9. **Raw Extracts** - Detailed content by source (appendix)

---

## Output Template

Store at: `docs/products/[mvp-name]/input-digest.md`

```markdown
# Input Digest: [MVP Name]

**Generated**: YYYY-MM-DD
**Input Folder**: [path]
**Total Files**: [N] files across [N] folders

---

## Executive Summary

[2-3 sentence summary of what this input represents]

---

## Content Inventory

| Category | Files | Key Sources |
|----------|-------|-------------|
| Documents | N | file1.pdf, file2.docx |
| Code | N | main.ex, schema.ex |
| Images | N | mockup1.png |
| Other | N | ... |

### Folder Structure

```
[tree representation]
```

---

## Key Themes

1. **[Theme 1]**: [Description from sources]
2. **[Theme 2]**: [Description from sources]
3. **[Theme 3]**: [Description from sources]

---

## Business Context

### Problem Statement
[What problem is this trying to solve? From which sources?]

### Goals
- [Goal 1] (Source: file.pdf)
- [Goal 2] (Source: requirements.docx)

### Constraints
- [Constraint 1]
- [Constraint 2]

### Success Criteria (if mentioned)
- [Criterion 1]
- [Criterion 2]

---

## Technical Context

### Technologies Mentioned
- [Technology 1]: [Context]
- [Technology 2]: [Context]

### Architecture Patterns
- [Pattern 1]: [Where mentioned]

### Existing Code (if any)
- [Module/Component]: [Purpose]

---

## User Context

### Target Users
- [User type 1]: [Description from sources]
- [User type 2]: [Description from sources]

### User Needs (mentioned)
- [Need 1]
- [Need 2]

### User Journeys (if described)
- [Journey 1]

---

## Visual Assets

### Mockups/Designs
| Image | Description |
|-------|-------------|
| mockup1.png | [What it shows] |

### Diagrams
| Diagram | Description |
|---------|-------------|
| architecture.png | [What it shows] |

---

## Open Questions

Questions raised by the input materials:

- [ ] [Question 1 - why unclear]
- [ ] [Question 2 - why unclear]

### Contradictions Found
- [Source A says X, Source B says Y]

### Missing Information
- [Expected but not found]

---

## Appendix: Raw Extracts

### From: business-plan.pdf

[Key content extracted...]

### From: requirements.docx

[Key content extracted...]

[Continue for each significant source...]
```

---

## Processing Guidelines

### Prioritization

When input is large, prioritize:
1. README files and executive summaries
2. Requirements/specifications documents
3. Main code modules and schemas
4. Mockups and wireframes
5. Supporting documentation

### Handling Conflicts

When sources conflict:
- Note both perspectives
- Flag as "Open Question"
- Do not resolve - let the Trio decide

### Quality Checks

Before completing:
- [ ] All files inventoried
- [ ] Key content extracted from each source
- [ ] Executive summary captures essence
- [ ] Open questions identified
- [ ] No significant content missed

---

## Usage in MVP Workflow

This skill is Step 1 of the `creating-mvp` workflow:

```
INPUT FILES
    ↓
[processing-mvp-input]
    ↓
Input Digest (docs/products/[name]/input-digest.md)
    ↓
[understanding-mvp] (Trio uses digest for discovery)
```

The Input Digest becomes the foundation for Product Trio's discovery discussions.

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Shallow extraction** | Missing key details | Extract comprehensively |
| **Interpretation** | Adding meaning not in sources | Extract verbatim, let Trio interpret |
| **Ignoring images** | Missing visual context | Describe all visual assets |
| **No structure** | Hard to navigate digest | Use consistent template |
| **Skipping conflicts** | False sense of clarity | Flag all contradictions |
