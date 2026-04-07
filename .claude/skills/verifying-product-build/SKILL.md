---
name: verifying-product-build
description: >
  Verifies a built product against its MVP Brief scope. Runs tests, checks
  feature coverage, flags gaps and quality issues. Produces verification
  results in docs/build-plan.md. Use after building-product completes.
argument-hint: "<product-slug>"
---

# Verifying Product Build

You are verifying that a built product matches its product definition. This is
not a code review — it's a scope and quality verification. Does what was built
implement what the MVP Brief defined?

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| MVP Brief | `docs/product-definition/3-mvp-brief.md` | Yes |
| Design Spec | `docs/product-definition/4-design-specification.md` | Yes |
| Build Plan | `docs/build-plan.md` | Yes |
| The built codebase | Project root | Yes |

## Verification Process

### 1. Run the Test Suite

Execute the project's test command (determined from the tech stack):
- Elixir: `mix test`
- Node/React: `npm test` or `yarn test`
- Python: `pytest`
- Go: `go test ./...`
- Rust: `cargo test`

Record: total tests, passing, failing, coverage if available.

### 2. Check MVP Brief Scope Coverage

Read the MVP Brief (`docs/product-definition/3-mvp-brief.md`). For every
feature, capability, or scope item defined:

| Scope Item | Status | Evidence |
|------------|--------|----------|
| [Feature from MVP Brief] | Implemented / Partial / Missing | [File or test that proves it] |

Be specific. "User authentication" is not evidence — "lib/app/accounts/user.ex
with registration, login, and session management" is.

### 3. Check Design Spec State Coverage

Read the Design Spec (`docs/product-definition/4-design-specification.md`).
For key screens and flows:
- Are all defined states implemented (empty, loading, error, success)?
- Do the user flows work end-to-end?
- Are interaction patterns from the spec present?

### 4. Check Docker Compose

Verify:
- `docker-compose.yml` exists
- App service uses `DEMO_PORT` env var (not hardcoded)
- Database/dependencies are NOT exposed on host
- Health checks are defined
- `docker compose build` succeeds (if in dev mode)

### 5. Produce Verification Results

Append a verification section to `docs/build-plan.md`:

```markdown
## Verification Results

**Date:** [current date]
**Test Results:** [X passing, Y failing, Z total]

### Scope Coverage

| MVP Brief Item | Status | Evidence |
|----------------|--------|----------|
| [item] | Implemented / Partial / Missing | [evidence] |

**Coverage:** X of Y scope items implemented

### Gaps

- [Specific gap — what's missing or incomplete]

### Quality Notes

- [Any quality concerns — test coverage, error handling, etc.]

### Docker Compose

- [x] docker-compose.yml exists
- [x] App port configurable via DEMO_PORT
- [x] Dependencies not exposed on host
- [ ] [Any issues]
```

### 6. Summary Signal

End with a clear signal:

- **BUILD COMPLETE** — all scope items implemented, tests pass, docker works
- **BUILD INCOMPLETE** — X gaps remaining (list the critical ones)
- **BUILD BROKEN** — tests failing or fundamental issues

## What NOT to Do

- **Don't refactor code** — this is verification, not improvement
- **Don't add missing features** — flag them as gaps
- **Don't fix failing tests** — report them
- **Don't subjectively judge code quality** — check against the MVP Brief scope
