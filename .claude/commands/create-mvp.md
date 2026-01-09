---
description: Creates an MVP autonomously using the Claude Agent SDK workflow
allowed-tools: Read, Write, Edit, Glob, Bash(bun:*), Bash(ls:*), AskUserQuestion
---

# Create MVP Workflow

Read `.claude/context/product-context.md` and validate it contains MVP information.

## Context

Current product context:
!cat .claude/context/product-context.md 2>/dev/null || echo "File not found"

Input folder contents:
!ls input/ 2>/dev/null || echo "No input folder"

## Task

### 1. Validate Product Context

Extract from product-context.md:
- **Name**: H1 title (first `# ` line) - must be a real product name, not "Product Context" or generic titles
- **Description**: Content below the title - must describe what the product does (one sentence minimum)

**Invalid if:**
- H1 title is generic ("Product Context", "README", "Project")
- No meaningful description (empty, or just metadata like "Stage: Initial")

### 2. If Invalid: Gather Info and Update

Ask the user:
```
I need to understand what we're building before creating the MVP.

Current product context doesn't have enough information.

1. What should we call this product? (working title is fine)
2. In one sentence, what does it do?
```

Capture their answers. If they provide more (problem, users, etc.), include it.

Update `.claude/context/product-context.md`:
```markdown
# [Product Name]

[Description they provided]

[Any additional sections they mentioned]
```

Show the updated file, then STOP with:
```
Product context updated. Run /create-mvp again to start the workflow.
```

Do NOT proceed to run the workflow after updating context.

### 3. If Valid: Run Workflow

Convert name to kebab-case:
- "TaskFlow" → "task-flow"
- "My Cool App" → "my-cool-app"

Show brief status:
```
Starting MVP creation...

Product: [name]
Description: [first sentence]
Input files: [count or "none"]

Artifacts: docs/product/, docs/discovery/, docs/increments/
```

Run the workflow:
```bash
bun run .claude/workflows/create-mvp/index.ts --name "[kebab-name]" --description "[first sentence]"
```

### 4. Handle Results

**Success:** List artifacts created, suggest reviewing them.

**Failure:** Point to `docs/product/failure-analysis.md`, suggest fixes.
