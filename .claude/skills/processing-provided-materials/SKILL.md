---
name: processing-provided-materials
description: Extracts content from provided materials (PDFs, Word, Excel, PPT, images, code, archives) into a structured digest for downstream analysis.
---

# Processing Provided Materials

Extract content from uploaded files and produce a faithful digest. Do not interpret, analyze, or synthesize — extract what's there and organize it by source.

## Input

Files in `docs/product-brief/materials/`, possibly with subfolders.

Binary files (PDF, DOCX, PPTX, XLSX) may have `.extracted.md` companions produced by a prior extraction step. When a `.extracted.md` file exists, use it instead of the original binary.

## Supported File Types

| Type | Extensions | How to extract |
|------|------------|----------------|
| PDF | `.pdf` | Read tool (renders text and images) |
| Word | `.docx`, `.doc` | Read `.extracted.md` companion or Read tool |
| Excel | `.xlsx`, `.xls`, `.csv` | Read `.extracted.md` companion or Read tool. Preserve table structure. |
| PowerPoint | `.pptx`, `.ppt` | Read `.extracted.md` companion or Read tool. Extract slide content and notes. |
| Markdown | `.md` | Direct inclusion |
| Text/Data | `.txt`, `.json`, `.yaml`, `.toml` | Direct inclusion |
| Code | `.ex`, `.exs`, `.js`, `.ts`, `.py`, etc. | Include structure and key content. Skip generated files and dependencies. |
| Images | `.png`, `.jpg`, `.jpeg`, `.svg` | Read tool (visual analysis). Describe what the image shows. |
| Archives | `.zip` | Extract contents, then process recursively |

## Process

### 1. Inventory

Scan the materials folder. List every file with its type. Note the folder structure.

### 2. Extract

For each file in the inventory, extract its content:
- Check for a `.extracted.md` companion first (e.g., `pitch-deck.pptx.extracted.md`). If it exists, use it — the text has already been extracted.
- Otherwise, read the file directly using the Read tool.
- For each file, capture the full text content (preserve headings, lists, tables), describe visual content (for images), and flag sections that couldn't be read.

Extraction rules:
- **Be faithful** — capture what's in the file, don't add interpretation
- **Preserve structure** — headings, tables, lists, slide order matter
- **Skip noise** — generated code, dependency manifests, lock files

### 3. Organize into digest

Write the digest to `docs/product-brief/provided-materials-digest.md`.

## Output Format

```markdown
# Provided Materials Digest: [Product Name]

**Generated**: YYYY-MM-DD
**Files processed**: N

## Content Inventory

List every file found in the materials folder:

| File | Type | Notes |
|------|------|-------|
| [filename] | [type] | [page count, sheet names, or brief note] |
| ... | ... | ... |

---

## Extracted Content

One section per file from the inventory above. Include every file.

### From: [filename]

[Extracted content, preserving the file's original structure]

---

### From: [filename]

[Extracted content]

---

[Continue for every file in the inventory]
```

The digest is consumed by downstream workflow steps that perform the actual analysis. Keep it clean, complete, and traceable to sources.
