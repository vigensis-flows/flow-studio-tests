---
name: building-product
description: >
  Builds a product from its product definition. Reads product definition docs
  and build plan, then implements working software with proper engineering.
  Handles both fresh builds and incremental updates in a unified way — always
  inspects what exists, determines what's needed, and builds it. NOT for VIA's
  own increments — for user products during Discovery.
argument-hint: "<product-slug>"
---

# Building Product

You are building a product from its product definition. This is real software
with proper engineering — tests, clean code, no shortcuts. This is the foundation
of the MVP, not a prototype.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| Build plan | `docs/build-plan.md` | Yes |
| MVP Brief | `docs/product-definition/3-mvp-brief.md` | Yes |
| Design Spec | `docs/product-definition/4-design-specification.md` | Yes |
| Visual Spec | `docs/product-definition/5-visual-specification.md` | Yes |
| Content Spec | `docs/product-definition/6-content-specification.md` | Yes |
| Architecture Blueprint | `docs/product-definition/7-architecture-blueprint.md` | Yes |
| User instruction | Workflow context | No |

## Unified Approach

There is NO separate "first build" vs "update" path. Every run:

1. **Read the build plan** — it describes what needs to happen
2. **Inspect what currently exists** in the codebase
3. **Implement what's needed** to make the code match the definition
4. **Commit incrementally** to git as you go

Whether that means creating everything from scratch or updating specific parts
is determined by the build plan and the current state of the codebase. The plan
step upstream (using `/creating-build-plans`) has already analyzed the gap.

## What to Build

The build plan (`docs/build-plan.md`) is the primary instruction. Follow it.
It was created by analyzing:
- The MVP Brief scope (what features/capabilities are needed)
- The Architecture Blueprint (how to structure it technically)
- The current codebase state (what exists vs what's missing)

## Engineering Standards

### Code Quality
- Follow the tech stack's idiomatic patterns (defined in the architecture blueprint)
- Clean, readable code — no clever tricks
- Meaningful names, clear structure
- No dead code, no commented-out code

### Testing
- Write tests for everything you build
- Tests should verify behavior, not implementation
- Include happy path and key error cases
- Tests must pass before committing

### Docker Compose
- Generate `docker-compose.yml` as part of the product's code
- Include the application and all its dependencies (database, cache, etc.)
- Only expose the application port on the host (via the product's `demo_port`)
- Dependencies communicate on an internal Docker network only
- Include health checks for the application service

Example structure:
```yaml
services:
  app:
    build: .
    ports:
      - "${DEMO_PORT:-10000}:4000"
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/app_dev
  db:
    image: postgres:16
    # NO ports mapping — internal only
    environment:
      POSTGRES_PASSWORD: postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
```

### Git Commits
- Commit incrementally as you complete logical units of work
- Each commit should compile and tests should pass
- Commit messages should describe what was built, not how
- The git history IS the progress log

## Process

### 1. Read the Build Plan
Read `docs/build-plan.md` thoroughly. Understand the overall structure and
the sequence of work.

### 2. Read Product Definition Documents
Read the relevant definition docs to understand:
- **What** to build (MVP Brief — scope, features)
- **How it works** (Design Spec — flows, screens, interactions, states)
- **How it looks** (Visual Spec — theme, colors, typography, components)
- **What it says** (Content Spec — copy, labels, messages, errors)
- **How to structure it** (Architecture Blueprint — domain model, tech stack, patterns)

### 3. Execute the Build Plan
Follow the plan step by step. For each item:
- Implement the code
- Write tests
- Verify tests pass
- Commit to git

### 4. Generate Docker Compose
As one of the final steps, create `docker-compose.yml` and `Dockerfile`
(or equivalent for the tech stack) so the product can run locally.

### 5. Final Verification
- Run the full test suite
- Verify the project builds/compiles cleanly
- Verify `docker compose build` succeeds (if applicable)

## What NOT to Do

- **Don't skip tests** — every feature needs tests
- **Don't take shortcuts** — this becomes the MVP
- **Don't add features not in the MVP Brief** — scope discipline
- **Don't ignore the Design Spec** — implement all states, not just happy path
- **Don't hardcode the port** — use `DEMO_PORT` env var in docker-compose.yml
- **Don't expose database ports** on the host — internal Docker network only
