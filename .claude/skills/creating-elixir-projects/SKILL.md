---
name: creating-elixir-projects
description: Creates new Elixir/Phoenix/Ash projects using Igniter. Use when starting a new project, setting up a fresh application, bootstrapping, scaffolding, or when user asks "create new project", "start new app", "initialize project", "new phoenix app", or mentions Igniter setup.
---

# Creating Elixir Projects

Sets up new Elixir/Phoenix/Ash projects correctly using Igniter.

## Why Igniter?

**Never use plain `mix phx.new`** for Ash projects.

Igniter:
- Configures Ash and AshPostgres correctly from the start
- Replaces Ecto Repo with AshPostgres.Repo
- Sets up proper supervision tree
- Avoids manual configuration errors

---

## Prerequisites

Install archives once:
```bash
mix archive.install hex igniter_new
mix archive.install hex phx_new
```

---

## Project Creation

### Standard Full-Stack Project

```bash
mix igniter.new my_app \
  --install ash,ash_postgres,ash_phoenix \
  --with phx.new \
  --extend postgres
```

This creates a Phoenix project with:
- Ash Framework
- AshPostgres (PostgreSQL data layer)
- AshPhoenix (LiveView integration)

### With Example Code

Add `--example` to generate sample resource:
```bash
mix igniter.new my_app \
  --install ash,ash_postgres,ash_phoenix \
  --with phx.new \
  --extend postgres \
  --example
```

### Minimal (No Phoenix)

For libraries or CLI tools:
```bash
mix igniter.new my_lib --install ash
```

### With PostgreSQL Only (No Phoenix)

```bash
mix igniter.new my_app \
  --install ash,ash_postgres \
  --extend postgres
```

---

## Post-Creation Setup

### 1. Configure Database

Edit `config/dev.exs` and `config/test.exs` with your database credentials.

### 2. Run Setup

```bash
cd my_app
mix ash.setup
```

This runs:
- `mix deps.get`
- `mix ash_postgres.create`
- `mix ash_postgres.migrate`

### 3. Add Tidewave (Recommended)

For AI-assisted development, add to `mix.exs`:
```elixir
defp deps do
  [
    # ... other deps
    {:tidewave, "~> 0.5", only: :dev}
  ]
end
```

Add the plug to `lib/my_app_web/endpoint.ex` **at the very top, before all other plugs** (including `Plug.Static`):
```elixir
defmodule MyAppWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :my_app

  # Tidewave MUST be first - before any body parsing
  if Code.ensure_loaded?(Tidewave) do
    plug Tidewave
  end

  # Then other plugs...
  plug Plug.Static, ...
```

Then configure Claude Code's MCP by creating `.claude/.mcp.json`:
```json
{
  "tidewave": {
    "type": "http",
    "url": "http://localhost:4000/tidewave/mcp"
  }
}
```

And add permissions in `.claude/settings.local.json`:
```json
{
  "permissions": {
    "allow": [
      "mcp__tidewave__*"
    ]
  }
}
```

### 4. Sync Usage Rules (Optional)

Add `usage_rules` to your deps in `mix.exs`:
```elixir
{:usage_rules, "~> 0.8", only: :dev}
```

Then sync Ash/Phoenix best practices:
```bash
mix deps.get
mix usage_rules.sync CLAUDE.md --all --link-to-folder deps
```

---

## Adding Extensions

### Authentication

```bash
mix igniter.install ash_authentication_phoenix --auth-strategy password
```

Options:
- `--auth-strategy password` - Email/password
- `--auth-strategy magic_link` - Magic link emails
- `--auth-strategy password,magic_link` - Both

**Required post-install configuration:**

#### 1. Enable token storage in User resource

Add `store_all_tokens?(true)` to ensure tokens are persisted (required for `require_token_presence_for_authentication?`):

```elixir
# lib/my_app/accounts/user.ex
authentication do
  tokens do
    enabled?(true)
    token_resource(MyApp.Accounts.Token)
    store_all_tokens?(true)  # Required!
    require_token_presence_for_authentication?(true)
    # ...
  end
end
```

#### 2. Create auth layout for centered sign-in pages

Create `lib/my_app_web/components/layouts/auth.html.heex`:
```heex
<div class="min-h-screen bg-base-200">
  <div class="flex flex-col items-center justify-center min-h-screen px-4 py-8">
    <div class="mb-6 text-center">
      <a href="/" class="flex items-center justify-center gap-2">
        <.icon name="hero-command-line" class="size-10 text-primary" />
        <span class="text-2xl font-bold">My App</span>
      </a>
    </div>
    <div class="card bg-base-100 shadow-xl w-full max-w-sm">
      <div class="card-body">
        {@inner_content}
      </div>
    </div>
    <div class="mt-6 text-sm text-base-content/60">
      <a href="/" class="link link-hover">Back to home</a>
    </div>
  </div>
</div>
<.flash_group flash={@flash} />
```

#### 3. Create auth overrides to hide Ash banner

Create `lib/my_app_web/auth_overrides.ex`:
```elixir
defmodule MyAppWeb.AuthOverrides do
  use AshAuthentication.Phoenix.Overrides
  alias AshAuthentication.Phoenix.Components

  # Hide Ash banner - we use our own branding
  override Components.Banner do
    set :image_url, nil
    set :dark_image_url, nil
    set :text, nil
  end

  override Components.SignIn do
    set :show_banner, false
  end
end
```

#### 4. Configure routes with DaisyUI styling

```elixir
# lib/my_app_web/router.ex
sign_in_route(
  register_path: "/register",
  reset_path: "/reset",
  auth_routes_prefix: "/auth",
  layout: {MyAppWeb.Layouts, :auth},
  overrides: [
    MyAppWeb.AuthOverrides,
    AshAuthentication.Phoenix.Overrides.DaisyUI
  ]
)

reset_route(
  auth_routes_prefix: "/auth",
  layout: {MyAppWeb.Layouts, :auth},
  overrides: [
    MyAppWeb.AuthOverrides,
    AshAuthentication.Phoenix.Overrides.DaisyUI
  ]
)
```

### Background Jobs (Oban)

```bash
mix igniter.install ash_oban
```

### GraphQL API

```bash
mix igniter.install ash_graphql
```

### JSON:API

```bash
mix igniter.install ash_json_api
```

### Admin Dashboard

```bash
mix igniter.install ash_admin
```

---

## Project Structure

After creation, key directories:

```
my_app/
├── lib/
│   ├── my_app/              # Business logic
│   │   ├── accounts/        # Domain: user management
│   │   │   ├── accounts.ex  # Domain module
│   │   │   └── user.ex      # Resource
│   │   └── repo.ex          # AshPostgres.Repo
│   └── my_app_web/          # Web layer
│       ├── live/            # LiveViews
│       └── components/      # UI components
├── priv/
│   └── repo/
│       └── migrations/      # Database migrations
├── config/
│   ├── config.exs
│   ├── dev.exs
│   ├── test.exs
│   └── runtime.exs
└── test/
```

---

## First Resource

Generate a domain and resource:

```bash
# Create domain
mix ash.gen.domain MyApp.Blog

# Create resource with postgres extension
mix ash.gen.resource MyApp.Blog.Post \
  --extend postgres
```

Then define attributes, actions, and policies in the generated file.

See [references/first-resource.md](references/first-resource.md) for a complete example.

---

## Common Issues

### Database Connection Failed

Check `config/dev.exs`:
```elixir
config :my_app, MyApp.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "my_app_dev"
```

### Missing postgres Extension

Ensure `--extend postgres` was used, or add manually:
```elixir
# In your resource
use Ash.Resource,
  extensions: [AshPostgres.Resource]

postgres do
  table "posts"
  repo MyApp.Repo
end
```

### Repo Not Found

Ensure `MyApp.Repo` is started in `application.ex`:
```elixir
def start(_type, _args) do
  children = [
    MyApp.Repo,
    # ...
  ]
  # ...
end
```

---

## Upgrading Dependencies

Use Igniter for upgrades (runs any migration scripts):
```bash
mix igniter.upgrade ash ash_postgres ash_phoenix
```

---

## Related Skills

- **using-elixir-phoenix-ash** - Stack patterns and documentation sources

---

## Quick Reference

| Task | Command |
|------|---------|
| New project | `mix igniter.new app --install ash,ash_postgres,ash_phoenix --with phx.new --extend postgres` |
| Add auth | `mix igniter.install ash_authentication_phoenix --auth-strategy password` |
| Add Oban | `mix igniter.install ash_oban` |
| Generate domain | `mix ash.gen.domain MyApp.Context` |
| Generate resource | `mix ash.gen.resource MyApp.Context.Resource --extend postgres` |
| Generate migrations | `mix ash_postgres.generate_migrations` |
| Run migrations | `mix ash_postgres.migrate` |
| Full setup | `mix ash.setup` |
| Upgrade deps | `mix igniter.upgrade package1 package2` |
