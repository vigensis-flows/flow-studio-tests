# Project Instructions

## Core Rules

- No unsolicited summaries or reports - only create when explicitly requested
- Update `.claude/context/` files as you learn about the product and organization

## Context Files

- `.claude/context/product-context.md` - product specific context
- `.claude/context/organization-context.md` - organization wide context

## Knowledge Tool Selection

| Need | Tool |
|------|------|
| Internal policies/processes | Asset Store |
| Technical "best/latest" | SOAR |
| General research | WebSearch |
| Fetch web content | WebFetch (try first) |
| JS-heavy sites | Playwright (if WebFetch fails) |

## Trust Hierarchy

When sources conflict:
1. Internal prescriptive (policies, guidelines, processes)
2. Internal IP and learnings
3. Curated knowledge (Asset Store books)
4. Current information (Context7, SOAR, WebSearch)
5. General knowledge

## Tool Failures

Inform user → Try refined query → Try alternative tool → Continue with transparency.

## Style

Follow `docs/reference/style-guide.md`:
- Active voice, concise, no filler
- Lead with the answer
- No exclamation points or emojis

## Documentation

Read `docs/README.md` before creating or modifying documentation files.

## Quality Standards

### Commands
- Run tests: `mix test`
- Run specific test: `mix test path/to/test.exs:line`
- Check formatting: `mix format --check-formatted`
- Format code: `mix format`
- Check types: `mix dialyzer`
- Check warnings: `MIX_ENV=test mix compile --warnings-as-errors`

### Before Committing
1. All tests pass: `mix test`
2. No formatting issues: `mix format`
3. No type errors: `mix dialyzer` (if configured)
4. No compiler warnings

## Code Style

### Elixir Conventions
- Use pattern matching over conditionals when possible
- Prefer pipe operator for data transformations
- Keep functions small and focused
- Use meaningful variable names (not `x`, `tmp`)

### Ash Conventions
- Resources define data shape, actions define behavior
- Policies define authorization (not controllers)
- Always pass actor to actions
- Use Domain modules as public API

### LiveView Conventions
- Keep LiveViews thin (delegate to Domain)
- Use streams for lists
- Handle_event calls Domain functions
- No business logic in handle_event

## Testing Requirements

### Coverage Expectations
- All public Domain functions have tests
- Actions tested for success and validation errors
- Authorization policies tested (can/cannot patterns)

### Test Structure
- Use factories or create_* helpers
- One assertion focus per test
- Test behavior, not implementation