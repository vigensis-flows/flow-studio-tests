# Coding Agent Instructions

Instructions for AI coding agents working on this project.

## Critical Context

**This is CRITICAL STRATEGIC INFRASTRUCTURE** — quality over speed, explicit over implicit, tested over untested.

## Process: PDAI Increments — CRITICAL

This project uses PDAI (Prepare, Deliver, Assess, Improve).
See `docs/process/quality-system.md` for the full framework.

Increments are scope-based, NOT time-boxed. They complete when the topic is done, not when a timer expires.

| Phase | Nature | What happens |
|-------|--------|-------------|
| Prepare | Documentation | Define what we'll do |
| Deliver | Execution | Build the planned thing |
| Assess | Documentation | Capture what we learned |
| Improve | Execution | Build the improvements |

**Improve = Deliver in scope and effort.** It is NOT polish/refinement.
If Deliver was substantial, Improve is substantial. Improvements deferred to "future increments" rarely happen.

**Never defer in-scope work:**
- Do NOT suggest "separate increment" for work that belongs to the current one
- Do NOT defer items because they "feel substantial" — substantial is expected
- Do NOT estimate effort based on human work time — you are a coding agent
- Discovered work within scope: do it now
- Genuinely unrelated: note in backlog
- Unsure: ask the user

## Tech Stack

- Elixir 1.19+ / OTP 28 / Phoenix 1.8+ / LiveView
- Ash Framework 3.x / AshPostgres / AshAuthentication
- PostgreSQL / Qdrant (vectors) / SeaweedFS (S3-compatible objects)
- Tailwind CSS v4 / DaisyUI
- Use `Req` for HTTP requests

## Quality Commands

```bash
mix test                              # Run full test suite
mix test path/to/test.exs:line        # Run specific test
mix test --include e2e                # Include E2E tests (hits external systems)
mix format                            # Format code
mix format --check-formatted          # Check formatting
MIX_ENV=test mix compile --warnings-as-errors  # Check warnings (before reporting work complete)
mix dialyzer                          # Check types (if configured)
```

**Test workflow:** Run `mix test` once. If tests fail, debug by running only the specific failing test(s) with `mix test path/to/test.exs:line`. Never re-run the full suite just to re-read failure output.

## Testing Philosophy — CRITICAL

This project does NOT use Ecto Sandbox. Tests run against the real database with real commits, real PubSub, real event chains, and real side effects. This is intentional — it catches design flaws (like O(N×M) data growth) that sandboxed tests hide.

### Three Test Levels

| Level | DB | Side Effects | External Deps | Runs by default | Tag |
|-------|-----|-------------|---------------|-----------------|-----|
| **Unit** | No | None | None | Yes | (none) |
| **Integration** | Real commits | Real PubSub, hooks, events | Mocked (Swoosh, ClaudeCli mock, HttpClient mock) | Yes | (none) |
| **E2E** | Real commits | Everything real | Real external calls (LLM, APIs) | No | `@tag :e2e` |

- **Unit tests** test pure functions. No DB, no events, no services. Input is created in-memory.
- **Integration tests** exercise real system behavior with real commits and real side-effect chains. External system boundaries are mocked (email via Swoosh test adapter, LLM via ClaudeCli mock, HTTP via HttpClient mock). These are the main test suite — they run by default with `mix test`.
- **E2E tests** cross external boundaries (real LLM calls, real API calls). Excluded by default to avoid costs and rate limits. Run with `mix test --include e2e`.

### Data Usage Rules — CRITICAL

**Only create what you're testing. Everything else is a dependency — use seeded data.**

| Situation | Approach |
|-----------|----------|
| Test needs a user as context | `seeded_admin()` or `seeded_user()` |
| Test needs an actor for Ash operations | `admin_actor()` or `user_actor()` |
| Test needs a domain as context | `test_domain()` |
| Test needs a product as context | `test_product()` |
| Test needs an org as context | `system_org()` |
| Test is testing user registration | Create a user, verify the full chain |
| Test is testing domain CRUD | Create/update/delete a domain, verify the full chain |
| Test creates entities it's not testing | **Design smell** — refactor to use seeded data |

**Why this matters:** Every entity creation triggers real side effects. A domain creation fires PubSub events and potentially workflow execution. User registration creates actors, orgs, and auto-joins. Creating entities "just because the test needs one" multiplies these side effects across the entire test suite and accumulates data in the shared database.

### Async by Default — CRITICAL

**All tests MUST use `async: true` unless they have a specific, documented reason not to.**

Tests using unique identifiers (`unique_id()`, `unique_slug()`, `unique_email()`) and reading seeded data are inherently safe for concurrent execution. The only legitimate reasons for `async: false` are:

| Disqualifier | Example |
|---|---|
| Modifies Application env | `Application.put_env(:flow_studio, :via_infra_path, ...)` |
| Mutates shared ETS tables | `:ets.delete(:platform_role_permissions, key)` |
| PubSub broadcasts that interfere | Broadcasting to topics other tests subscribe to |
| Modifies shared seeded data | Updating `test_product().local_path` |
| Named GenServer conflicts | Starting a globally-registered process |
| Unscoped bulk deletes | `Ash.read!() |> Enum.each(&Ash.destroy!)` without filtering |

**If a test needs `async: false`, add a comment explaining why:**
```elixir
# async: false — modifies Application env (:via_infra_path) and seeded product local_path
use FlowStudio.DataCase, async: false
```

**Design for async first.** If you find yourself needing `async: false`, consider whether the test can be redesigned (scope deletes, use unique data, avoid global state).

### Coherent Testing — CRITICAL

**Prefer fewer tests with more assertions over many small tests that each trigger the same side effects.**

```elixir
# WRONG — 4 tests, 4 domain creations, 4× full side-effect chain
test "creates domain" do ... end
test "auto-assigns readers" do ... end
test "fires DomainCreated event" do ... end
test "sends notification" do ... end

# RIGHT — 1 test, 1 domain creation, coherent verification
test "domain creation triggers reader assignment and event" do
  {:ok, domain} = create_domain(...)

  # Record was created
  assert domain.name == "Test"

  # Readers were assigned
  {:ok, memberships} = list_memberships(domain.id)
  assert length(memberships) > 0

  # Event observable effects occurred
  assert domain.status == :setting_up
end
```

**Rules:**
- Group assertions that verify different aspects of the same operation
- Use clear assertion messages so failures pinpoint the broken aspect
- Each test should represent one coherent "scenario", not one isolated assertion
- If a test creates an entity, it should verify the full expected side-effect chain
- Don't split side-effect verification across multiple tests that each re-trigger the same operation

### Side-Effect Awareness

When writing or reviewing tests, understand the full chain an operation triggers:

- **Domain creation** → fires DomainCreated event, may start initialize-domain workflow
- **User registration** → creates Actor + Org, auto-joins orgs, accepts pending invitations
- **Membership creation** → after_transaction hooks, email notifications via MembershipSender

Tests that create these entities must account for the full chain. If a test doesn't need the side effects, it shouldn't trigger the operation — use seeded data instead.

### Test Cleanup

Since there's no sandbox rollback, tests that create data they're testing must clean up:

```elixir
setup do
  on_exit(fn ->
    # Clean up test-created entities
  end)
end
```

However, cleanup is secondary to good test design. If you find yourself writing complex cleanup logic, the test probably shouldn't be creating that data in the first place.

### What NOT To Do

- **Never create entities "for convenience"** when seeded data exists
- **Never create a domain just because a test needs one** — use `test_domain()`
- **Never create a user just because a test needs an actor** — use `admin_actor()` or `user_actor()`
- **Never tag a test `:slow` to hide poor test design** — fix the test instead
- **Never add sandbox mode** — the realistic testing model is intentional and has caught real design flaws

## Completion Standards

Work must be done properly and fully. No shortcuts.

**Before reporting work complete:**
1. Old code deleted — if replacing X with Y, delete X
2. All call sites updated — grep for the old thing, update every reference
3. Wiring complete — components that should talk to each other actually do
4. Tests pass — `mix test`
5. No dangling references — no imports, aliases, or docs referencing deleted code
6. Documentation matches reality — don't document behavior that isn't implemented

**Decontamination mindset:** When doing systematic cleanup, don't stop halfway.
Discovered debt blocking your work is resistance, not a separate concern. Fix it now.

## Common Pitfalls

### Ash Policy Blocks — CRITICAL

```elixir
# WRONG — multiple blocks must ALL pass independently
policy action_type(:destroy) do
  forbid_if expr(system_flow == true)
end
policy action_type(:destroy) do
  authorize_if expr(^actor(:role) == :admin)
end

# RIGHT — single block with sequential checks
policy action_type(:destroy) do
  forbid_if expr(system_flow == true)
  authorize_if expr(^actor(:role) == :admin)
  authorize_if expr(owner_id == ^actor(:id))
end
```

### HasPermission vs HasScopePermission — CRITICAL

**Always use `HasScopePermission` for read policies on product-scoped resources.** `HasPermission` is a `SimpleCheck` that resolves to `:global` scope on read queries (because the subject is an `Ash.Query`, not a changeset). This means it only checks platform-level roles — product/org membership permissions are invisible to it. Regular users who have the permission via `ProductMembership` will be silently denied.

```elixir
# WRONG — read will fail for regular product members
policy action_type(:read) do
  authorize_if {Platform.Authorization.Checks.HasPermission,
                permission: :contribute_to_product}
end

# RIGHT — generates SQL filter on accessible product_ids
policy action_type(:read) do
  authorize_if {Platform.Authorization.Checks.HasScopePermission,
                permission: :contribute_to_product}
end
```

**When to use which:**

| Action type | Check to use | Why |
|-------------|-------------|-----|
| Read (`:read`) | `HasScopePermission` | FilterCheck — generates SQL WHERE, works with product/org memberships |
| Write (`:create`, `:update`, `:destroy`) | `HasPermission` | SimpleCheck — infers scope from changeset data, which is available on writes |
| Global resources (no product_id) | `HasPermission` | No scoping needed, permission must be platform-level |

### Ash Actor Timing — CRITICAL

```elixir
# RIGHT — actor available during changeset construction
Post |> Ash.Changeset.for_create(:create, params, actor: user) |> Ash.create()

# WRONG — too late!
Post |> Ash.Changeset.for_create(:create, params) |> Ash.create(actor: user)
```

### Never Bypass Authorization — CRITICAL

Never use `authorize?: false` to work around authorization issues. This is production enterprise software — bypassing authorization undermines the entire security model. There is **always** a correct actor to pass. Use the right one for the context.

**Available actors:**

| Function | When to use |
|----------|-------------|
| `Platform.Identity.system_actor()` | Cached system actor with full permissions. For system-context operations where no user is involved. |
| `Platform.Identity.load_service_actor!("slug")` | Loads a specific service actor by slug. For operations that need scoped service-level permissions. |
| `Platform.Authorization.with_permissions(actor, :global)` | Decorates an existing actor with additional permissions. For escalating a known actor's access. |

**Scenario 1: Inside policy checks (SimpleCheck, Check implementations)**

Policy checks run in system context — they need to read data to make authorization decisions.

```elixir
# WRONG — bypasses authorization to "just read the data"
defmodule MyCheck do
  def match?(actor, _context, _opts) do
    memberships = Ash.read!(Membership, authorize?: false)
    Enum.any?(memberships, &(&1.user_id == actor.id))
  end
end

# RIGHT — use system actor for policy-internal reads
defmodule MyCheck do
  def match?(actor, _context, _opts) do
    memberships = Ash.read!(Membership, actor: Platform.Identity.system_actor())
    Enum.any?(memberships, &(&1.user_id == actor.id))
  end
end
```

**Scenario 2: Background jobs, email senders, hooks with no user actor**

System-initiated work has no user context. Use the system actor explicitly.

```elixir
# WRONG — no user around, so just skip auth
defmodule MyWorker do
  def perform(%Oban.Job{args: %{"id" => id}}) do
    record = Ash.get!(MyResource, id, authorize?: false)
    Ash.update!(record, %{status: :processed}, authorize?: false)
  end
end

# RIGHT — system actor for system-initiated work
defmodule MyWorker do
  def perform(%Oban.Job{args: %{"id" => id}}) do
    system = Platform.Identity.system_actor()
    record = Ash.get!(MyResource, id, actor: system)
    Ash.update!(record, %{status: :processed}, actor: system)
  end
end
```

**Scenario 3: Loading relationships after already-authorized operations**

The original actor authorized the parent read. Pass the same actor for relationship loads.

```elixir
# WRONG — "I already checked auth on the parent, so skip it for loads"
record = Ash.get!(MyResource, id, actor: user)
record = Ash.load!(record, [:organization, :memberships], authorize?: false)

# RIGHT — pass the original actor through
record = Ash.get!(MyResource, id, actor: user)
record = Ash.load!(record, [:organization, :memberships], actor: user)
```

**Scenario 4: Inside after_action / after_transaction hooks**

The actor from the original changeset is available. Use it. If the hook performs system-level work unrelated to the user's action, use system actor.

```elixir
# WRONG — "we're already inside an authorized action"
change after_action(fn changeset, record, _context ->
  Ash.update!(related, %{status: :active}, authorize?: false)
  {:ok, record}
end)

# RIGHT — use the changeset's actor or system actor
change after_action(fn changeset, record, _context ->
  actor = changeset.context[:private][:actor] || Platform.Identity.system_actor()
  Ash.update!(related, %{status: :active}, actor: actor)
  {:ok, record}
end)
```

**The ONLY legitimate use of `authorize?: false`** is inside `Platform.Identity.SystemActorCache.load_system_actor/0` itself — the bootstrap operation that loads the system actor which authorizes everything else. This is the single chicken-and-egg exception. Nowhere else.

If a query returns empty or an action is forbidden, the fix is to pass the correct actor or adjust the policy — never to skip authorization entirely.

### Ash.destroy() Return Types

```elixir
case Ash.destroy(changeset) do
  :ok -> # Direct success
  {:ok, _} -> # With return_destroyed?: true
  {:error, error} -> # Error
end
```

### Elixir Gotchas

- **Block expressions must bind result:** `socket = if connected?(socket), do: assign(socket, :val, val), else: socket`
- **Structs don't support Access syntax:** Use `changeset.field` not `changeset[:field]`
- **Lists don't support index access:** Use `Enum.at(list, 0)` not `list[0]`
- **Never use `String.to_atom/1` on user input** — memory leak risk
- **Never nest multiple modules in the same file** — causes cyclic dependencies
- **after_batch only works for bulk ops** — use `after_transaction` for single creates

### Error Handling: Pipelines over Nesting — CRITICAL

Prefer pipeline-style error handling with `{:ok, value}` / `{:error, reason}` tuples over nested `case` or `with` blocks. When a function has more than one level of case/with nesting, refactor to a pipeline.

```elixir
# WRONG — nested case blocks, hard to follow
def process(input, ctx) do
  case validate(input) do
    :ok ->
      case execute(input, ctx) do
        {:ok, result} ->
          case post_validate(result) do
            :ok -> {:ok, result}
            {:error, reason} -> {:error, reason}
          end
        {:error, _} = error -> error
      end
    {:error, _} = error -> error
  end
end

# WRONG — with blocks require mental gymnastics to read
def process(input, ctx) do
  with :ok <- validate(input),
       {:ok, result} <- execute(input, ctx),
       :ok <- post_validate(result) do
    {:ok, result}
  end
end

# RIGHT — pipeline with function heads, immediately readable
def process(input, ctx) do
  input
  |> validate_input()
  |> execute_step(ctx)
  |> post_validate_result()
end

defp validate_input(input), do: {:ok, input}  # or {:error, reason}

defp execute_step({:ok, input}, ctx), do: do_execute(input, ctx)
defp execute_step({:error, _} = error, _ctx), do: error

defp post_validate_result({:ok, result}), do: check_result(result)
defp post_validate_result({:error, _} = error), do: error
```

**Pipeline rules:**
- Each stage takes `{:ok, value}` or `{:error, reason}` and passes errors through
- Function heads match on the tuple shape — no nested case needed
- The happy path reads top-to-bottom as a sequence of transforms
- Nil values get their own function head: `defp do_thing(nil), do: {:error, "thing not found"}`

**When `case` is fine:** A single-level case with 2-3 branches is readable. The problem is nesting.

**When `with` is acceptable:** Chaining genuinely independent operations where the happy path is the only interesting one and the error clause is a simple passthrough. Even then, prefer pipes if the logic is sequential.

**When `try/rescue` is right:** External boundaries only — Port, System.cmd, Task.async, `apply/3` on untrusted modules, parsing external input. Never for internal code flow.

### GenServer Init — CRITICAL

GenServer `init/1` must be fast, pure, and infallible:
- **No database calls** — use `handle_continue` for loading external data
- **No bang functions** — `load_service_actor!`, `File.mkdir_p!`, `Ash.get!` all crash init
- **No network/filesystem I/O** — defer to `handle_continue`
- **Always `Process.flag(:trap_exit, true)`** — ensures `terminate/2` is called
- **Always implement `terminate/2`** — at minimum for logging, ideally for cleanup (mark DB records as failed, close ports, cancel timers)

```elixir
# RIGHT
def init(opts) do
  Process.flag(:trap_exit, true)
  state = %{id: opts[:id], resource: nil}
  {:ok, state, {:continue, :load_dependencies}}
end

def handle_continue(:load_dependencies, state) do
  case load_resource(state.id) do
    {:ok, resource} -> {:noreply, %{state | resource: resource}}
    {:error, reason} -> {:stop, reason, state}
  end
end

def terminate(reason, state) do
  Logger.info("[MyServer] Terminating: #{inspect(reason)}")
  cleanup(state)
end
```

## LiveView File Structure — CRITICAL

Follow Phoenix generator conventions. Non-negotiable.

```
lib/app_web/live/
├── user_live/           # {resource}_live/ — singular
│   ├── index.ex         # Action name, NO _live suffix
│   ├── show.ex
│   └── form.ex
├── flow_live/           # NOT flows_live/, NOT flow/
│   ├── index.ex
│   └── code.ex
└── admin_live/          # NOT admin/
    └── dashboard.ex
```

Module naming: `FlowStudioWeb.{Resource}Live.{Action}` (e.g., `FlowStudioWeb.FlowLive.Index`).
Components in `components/` subdirectory within the resource directory.

## Typography and Text Hierarchy — CRITICAL

The UI uses exactly **3 text color tiers** and **3 font sizes**. No exceptions. No ad-hoc opacity values.

### Color Tiers (3 only)

| Tier | Class | Use for |
|------|-------|---------|
| **Primary** | `text-base-content` | Headings, labels, interactive text, body content — anything the user needs to read |
| **Secondary** | `text-base-content/60` | Descriptions, supporting text, metadata, secondary labels |
| **Muted** | `text-base-content/40` | Timestamps, "(optional)" labels, empty states, truly de-emphasized content |

**Forbidden:** `/30`, `/50`, `/70`, `/80`, or any other opacity value on `text-base-content`. If you're reaching for a fourth tier, the hierarchy is wrong — simplify it.

### Font Sizes (3 only)

| Size | Class | Use for |
|------|-------|---------|
| **Title** | `text-base` (16px) | Page-level titles, section headers in main content |
| **Body** | `text-sm` (14px) | Everything else — body text, labels, descriptions, nav items, list items |
| **Meta** | `text-xs` (12px) | Timestamps, badge text, counts, tabular metadata |

**Forbidden:** `text-lg`, `text-xl`, `text-2xl` etc. in the application UI (except markdown prose rendering).

### Font Weight (2 only)

| Weight | Class | Use for |
|--------|-------|---------|
| **Semibold** | `font-semibold` | Page-level titles only (the main heading of a view) |
| **Medium** | `font-medium` | Section headers, labels that anchor a group of content |
| **Normal** | (default) | Everything else |

### Forbidden Patterns

- **No `uppercase` or `tracking-wide`** — never use all-caps text anywhere in the UI
- **No ad-hoc font-bold** — use `font-semibold` for titles, `font-medium` for section headers
- **No combining multiple de-emphasis techniques** — don't use `text-xs text-base-content/40 italic` (pick one way to de-emphasize)
- **No wrapper divs with `/60` that cascade lighter color to children** — if a container wraps readable content, it must not set `text-base-content/60`. Set color on individual elements instead.

### DaisyUI Overrides

DaisyUI's `stat-title`, `stat-desc`, and `<th>` elements apply their own lighter text color. Always add an explicit color class to override:

```heex
<div class="stat-title text-base-content">Label</div>   <%!-- override DaisyUI's lighter default --%>
<div class="stat-value text-base">42</div>
```

Table column headers (`<th>`) in DaisyUI tables render lighter than body text. Add `text-base-content` to the `<tr>` inside `<thead>`:

```heex
<thead>
  <tr class="text-base-content">
    <th>Name</th>
    <th>Status</th>
  </tr>
</thead>
```

### Assistant Panel Content

Inside `<.assistant>` blocks, body text that users need to **read** must be primary (`text-base-content`), not secondary. This includes descriptions, help text, and list content. Only metadata, timestamps, and truly secondary labels should use `/60`.

### Exception

- The **"Vigensis" logo text** in the top-left corner is exempt — it's brand identity, not UI text
- **Markdown prose** (`.markdown-content`) has its own typography scale for rendered documents
- **Emoji decorations** used as visual icons/illustrations may use `text-2xl` for proportional sizing

## Knowledge Tools

| Need | Tool |
|------|------|
| Framework APIs (Ash, Phoenix, LiveView) | Context7 (ALWAYS) |
| Internal policies/processes | Asset Store |
| Technical "best/latest" | SOAR |
| General research | WebSearch |

**NEVER rely on training data for framework APIs.** Always check Context7 first.

**Context7 Library IDs:**

| Library | ID |
|---------|----|
| Ash Framework | `/websites/hexdocs_pm_ash` |
| AshPostgres | `/ash-project/ash_postgres` |
| AshAuthentication | `/websites/hexdocs_pm_ash_authentication` |
| AshPhoenix | `/websites/hexdocs_pm_ash_phoenix` |
| AshOban | `/websites/hexdocs_pm_ash_oban` |
| AshGraphql | `/ash-project/ash_graphql` |
| AshJsonApi | `/ash-project/ash_json_api` |
| Phoenix/LiveView/Elixir | Resolve with Context7 |

## Trust Hierarchy

When sources conflict:
1. Internal prescriptive (policies, guidelines, processes)
2. Internal IP and learnings
3. Curated knowledge (Asset Store books)
4. Current information (Context7, SOAR, WebSearch)
5. General knowledge

## Development Environment

- Uses `mise` for language versions. **ALWAYS use `docker compose`** (not `docker-compose`).
- **NEVER run `mix run priv/repo/seeds_test.exs` directly** — pollutes dev database.
- **Python lives in `scripts/`** — venv at `scripts/.venv/`, dependencies in `scripts/requirements.txt`. Never install packages globally.
- After creating Ash resources: `mix ash.codegen --name description` then `mix ash.migrate`.
- Search `FlowStudio.Helpers` before writing utilities (`humanize/1`, `slugify/1`, `truncate/3`).

## Context & Reference

- `.claude/context/product-context.md` — product specific context
- `.claude/context/organization-context.md` — organization wide context

For comprehensive patterns beyond this file:
- `docs/reference/idiomatic-elixir.md` — Core Elixir idioms
- `docs/reference/phoenix-expert.md` — Advanced LiveView/PubSub patterns
- `docs/reference/ash-expert.md` — Advanced Ash patterns
- `docs/reference/style-guide.md` — Writing style (active voice, concise, no filler)

Read `docs/README.md` before creating or modifying documentation files.
