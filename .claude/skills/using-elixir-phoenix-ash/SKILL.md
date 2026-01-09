---
name: using-elixir-phoenix-ash
description: Establishes Elixir/Phoenix/Ash patterns and ensures current documentation usage. Use when discussing architecture, starting features, when Claude suggests wrong stack, or when user asks about Elixir, Phoenix, Ash, or LiveView patterns.
---

# Using Elixir/Phoenix/Ash

Core patterns and documentation sources for the Elixir/Phoenix/Ash stack.

## Getting Current Documentation

Training data is outdated. Always fetch current docs via Context7.

### Context7 Library IDs

| Library | Context7 ID |
|---------|-------------|
| Ash Framework | `/websites/hexdocs_pm_ash` |
| Phoenix | `/websites/hexdocs_pm_phoenix` |
| AshPhoenix | `/websites/hexdocs_pm_ash_phoenix` |
| AshAuthentication | `/team-alembic/ash_authentication` |
| AshPostgres | `/ash-project/ash_postgres` |
| AshOban | `/websites/hexdocs_pm_ash_oban` |
| AshGraphql | `/ash-project/ash_graphql` |
| AshJsonApi | `/ash-project/ash_json_api` |

**Always fetch docs** before:
- Using generator commands (`mix ash.gen.*`)
- Writing resource DSL
- Configuring actions or policies
- Setting up LiveView forms

### In-Project Search

When project has `usage_rules` installed:
```bash
mix usage_rules.search_docs "query" -p package_name
```

---

## Tidewave (REQUIRED)

**All Elixir/Phoenix/Ash projects MUST include Tidewave for AI-assisted development.** This is development infrastructure, not optional tooling.

### Why Required

Tidewave provides runtime debugging capabilities essential for AI-assisted development:
- **Runtime evaluation** - Execute code in the live application context
- **Database access** - Query PostgreSQL directly, inspect schema structure
- **Application logs** - Read and filter runtime logs for debugging
- **Source navigation** - Find where modules and functions are defined
- **Documentation lookup** - Fetch docs for project and dependency modules

Without Tidewave, debugging Elixir applications requires manual REPL sessions and static analysis, which is significantly less effective.

### Required Setup

**1. Add to mix.exs:**
```elixir
# mix.exs
{:tidewave, "~> 0.5", only: :dev}
```

**2. Add to endpoint.ex (inside code_reloading? block or as separate conditional):**
```elixir
# lib/my_app_web/endpoint.ex
if Code.ensure_loaded?(Tidewave) do
  plug Tidewave
end
```

**3. Verify installation:**
- Start Phoenix: `mix phx.server`
- Tidewave MCP available at: `http://localhost:<port>/tidewave/mcp`

### When Tidewave is NOT Required

- CLI tools with no Phoenix web layer
- Library packages (no running application)
- Production deployments (`:only :dev` excludes it automatically)

---

## Core Architecture Principles

### Resources Are Central

Ash resources are the core building blocks. They define:
- Attributes (data shape)
- Actions (what can be done)
- Policies (who can do it)
- Calculations (derived values)

Group resources into **Domains** by responsibility (e.g., `Accounts`, `Blog`, `Billing`).

### Functional Core, Imperative Shell

- Pure business logic in Ash actions and calculations
- Side effects isolated at boundaries (controllers, LiveViews)
- No business logic in controllers or LiveViews

### Database as Source of Truth

- Don't use GenServers for domain state
- Persist state in PostgreSQL via AshPostgres
- Use optimistic locking for concurrent updates

### Async for External Calls

- Use Oban (via AshOban) for background jobs
- Never block request paths with external API calls
- Notifications, webhooks, integrations → background jobs

---

## LiveView Patterns

### Phoenix 1.8+ with DaisyUI

Phoenix 1.8+ includes DaisyUI by default. Use DaisyUI components for UI instead of custom Tailwind.

### Use AshPhoenix.Form

For any form backed by Ash resources:
```elixir
form = AshPhoenix.Form.for_create(Resource, :action, actor: current_user)
```

Fetch current AshPhoenix docs for form handling patterns.

### Streams for Lists

Use streams for memory-efficient list handling:
```elixir
socket
|> stream(:items, items)
|> assign(:form, form)
```

### Keep LiveViews Thin

- Delegate to Domain functions
- Don't put business logic in handle_event
- LiveView handles UI state, Domain handles business state

---

## Authentication (REQUIRED)

**All Phoenix/Ash applications with a UI MUST use AshAuthentication.** This is infrastructure, not a feature, and cannot be descoped from MVPs.

### Required Packages

```elixir
# mix.exs
{:ash_authentication, "~> 4.0"},
{:ash_authentication_phoenix, "~> 2.0"}
```

### Minimum Setup

1. **Add authentication to your User resource:**
```elixir
defmodule MyApp.Accounts.User do
  use Ash.Resource,
    extensions: [AshAuthentication]

  authentication do
    strategies do
      password :password do
        identity_field :email
      end
    end

    tokens do
      enabled? true
      token_resource MyApp.Accounts.Token
      signing_secret fn _, _ ->
        Application.get_env(:my_app, :token_signing_secret)
      end
    end
  end
end
```

2. **Add auth plugs to router:**
```elixir
# router.ex
use AshAuthentication.Phoenix.Router

ash_authentication_live_session :authenticated,
  on_mount: {MyAppWeb.LiveUserAuth, :live_user_required} do
  live "/protected", ProtectedLive
end
```

3. **Protect LiveViews with on_mount hooks**

**Always fetch current AshAuthentication docs** before implementing - the API evolves.

### When Auth is NOT Required

- CLI tools with no web UI
- Pure API services using API key auth only
- Internal tools on isolated networks (must document security decision)

---

## Authorization

### Policies, Not Controller Checks

Define authorization in resources:
```elixir
policies do
  policy action_type(:read) do
    authorize_if actor_attribute_equals(:role, :admin)
  end
end
```

Don't check permissions in controllers or LiveViews.

### Always Pass Actor

```elixir
Domain.create_post!(attrs, actor: current_user)
```

---

## Common Patterns

| Pattern | Implementation | Required? |
|---------|----------------|-----------|
| **Authentication** | AshAuthentication + AshAuthentication.Phoenix | **YES** (for apps with UI) |
| Background jobs | AshOban | When needed |
| GraphQL API | AshGraphql | When needed |
| REST API | AshJsonApi | When needed |
| Admin UI | AshAdmin | Optional |
| State machines | `Ash.Resource.Change.Builtins.transition_state/3` | When needed |

---

## Testing

### Configuration (config/test.exs)

```elixir
# Required for transactional tests with AshPostgres
config :ash, :disable_async?, true

# Reduce notification noise in tests
config :ash, :missed_notifications, :ignore
```

### Testing Actions

```elixir
test "creates a post" do
  user = create_user!()
  assert {:ok, post} = Blog.create_post(%{title: "Hello"}, actor: user)
end
```

### Testing Authorization

```elixir
test "user can update own post" do
  user = create_user!()
  post = create_post!(actor: user)
  assert Blog.can_update_post?(user, post)
end

test "user cannot update others post" do
  [user1, user2] = create_users!(2)
  post = create_post!(actor: user1)
  refute Blog.can_update_post?(user2, post)
end
```

### Property Testing

Use `Ash.Generator` for property-based tests:
```elixir
property "action accepts valid input" do
  check all input <- Ash.Generator.action_input(Resource, :create) do
    assert {:ok, _} = Domain.create(input, actor: admin)
  end
end
```

See [references/testing.md](references/testing.md) for detailed patterns.

---

## Project CLAUDE.md Standards

Every Elixir/Phoenix/Ash project should have quality standards in CLAUDE.md. This ensures Claude Code CLI maintains code quality without repeating rules in every prompt.

### Required CLAUDE.md Sections

```markdown
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
```

### Minimal Version

For simpler projects, at minimum include:

```markdown
## Quality Standards
- Run tests: `mix test`
- Format code: `mix format`
- No warnings: `MIX_ENV=test mix compile --warnings-as-errors`

## Code Style
Follow Elixir conventions. Use Ash Domain as public API.
```

---

## Quick Reference

### Generators

Always fetch current docs first, then use:
```bash
mix ash.gen.resource MyApp.Blog.Post   # Generate resource
mix ash.gen.domain MyApp.Blog          # Generate domain
mix ash.codegen                        # Run all codegen
mix ash.setup                          # Initial setup
```

### Migrations

```bash
mix ash_postgres.generate_migrations
mix ash_postgres.migrate
```
