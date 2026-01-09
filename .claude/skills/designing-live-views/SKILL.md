---
name: designing-live-views
description: Designs Phoenix LiveView architecture using separate LiveViews for major sections. Use when creating views with navigable sections, tabs, or distinct functional areas. Triggers: "LiveView structure", "section navigation", "tabs", "multi-section page".
---

# Designing LiveViews

Establishes the architectural pattern for Phoenix LiveViews with navigable sections.

## Core Pattern

**Each major section gets its own LiveView module.**

This is the pattern used throughout the codebase (Flow UI, Asset UI, etc.) and provides:
- Clear separation of concerns
- Manageable file sizes
- Independent testability
- Reduced state complexity

## Wrong vs Right

### Wrong: One LiveView with Section Parameter

```elixir
# router.ex - WRONG PATTERN
live "/feature", FeatureLive
live "/feature/:section", FeatureLive  # Same LiveView handles all sections!
```

This creates:
- Monolithic files (1000+ lines)
- Mixed state for all sections
- Complex `handle_params` switching
- Difficult to test and maintain

### Right: Separate LiveViews per Section

```elixir
# router.ex - CORRECT PATTERN
scope "/feature", MyAppWeb.Live.Feature do
  live "/", DashboardLive           # Overview/landing
  live "/items", ItemsLive          # Items section
  live "/settings", SettingsLive    # Settings section
  live "/analytics", AnalyticsLive  # Analytics section
end
```

This creates:
- Focused, manageable files (200-600 lines)
- Section-specific state only
- Simple, predictable behavior
- Easy to test independently

## Reference Implementation: Flow UI

```elixir
# router.ex - Flow UI structure
scope "/flows/:slug", FlowStudioWeb do
  live "/", FlowLive                # Dashboard
  live "/docs", Flow.DocsLive       # Separate LiveView
  live "/docs/*path", Flow.DocsLive # Sub-navigation within DocsLive
  live "/input", Flow.InputLive     # Separate LiveView
  live "/discussion", Flow.DiscussionLive
  live "/code", Flow.CodeLive
  live "/settings", Flow.SettingsLive
end
```

**Key insight:** `handle_params` is used for sub-navigation WITHIN a section (e.g., different document paths in DocsLive), not for switching between sections.

## Architecture Components

### 1. Helpers Module (Shared Functionality)

Centralize common functionality:

```elixir
# lib/my_app_web/live/feature/helpers.ex
defmodule MyAppWeb.Live.Feature.Helpers do
  @moduledoc """
  Shared helpers for Feature LiveViews.
  """

  @default_navigator_width 280
  @default_assistant_width 320

  @doc """
  Assigns common defaults for all feature views.
  """
  def assign_defaults(socket, current_user, current_section) do
    ui_prefs = current_user.ui_preferences || %{}

    socket
    |> Phoenix.Component.assign(:current_user, current_user)
    |> Phoenix.Component.assign(:current_section, current_section)
    |> Phoenix.Component.assign(:navigator_width, ui_prefs["navigator_width"] || @default_navigator_width)
    |> Phoenix.Component.assign(:navigator_open, ui_prefs["navigator_open"] != false)
  end

  @doc """
  Loads the parent resource with error handling.
  """
  def load_resource(socket, slug, page_title) do
    case MyApp.Resources.get_by_slug(slug, actor: socket.assigns.current_user) do
      {:ok, resource} ->
        {:ok,
         socket
         |> Phoenix.Component.assign(:resource, resource)
         |> Phoenix.Component.assign(:page_title, page_title)}

      {:error, _} ->
        {:error,
         socket
         |> Phoenix.LiveView.put_flash(:error, "Not found")
         |> Phoenix.LiveView.push_navigate(to: "/features")}
    end
  end

  @doc """
  Toggles navigator visibility with persistence.
  """
  def toggle_navigator(socket) do
    new_state = !socket.assigns.navigator_open

    Task.start(fn ->
      MyApp.Accounts.update_ui_preferences(socket.assigns.current_user, %{
        "navigator_open" => new_state
      })
    end)

    Phoenix.Component.assign(socket, :navigator_open, new_state)
  end
end
```

### 2. Individual Section LiveViews

Each section is a focused LiveView:

```elixir
# lib/my_app_web/live/feature/items_live.ex
defmodule MyAppWeb.Live.Feature.ItemsLive do
  @moduledoc """
  Items section for Feature.

  Route: /feature/:slug/items
  """
  use MyAppWeb, :live_view

  alias MyAppWeb.Live.Feature.Helpers
  import MyAppWeb.Live.Feature.Components.Navigator

  on_mount {MyAppWeb.LiveUserAuth, :live_user_required}

  @impl true
  def mount(%{"slug" => slug}, _session, socket) do
    current_user = socket.assigns.current_user

    # Use Helpers for common setup
    socket = Helpers.assign_defaults(socket, current_user, :items)

    case Helpers.load_resource(socket, slug, "Items") do
      {:ok, socket} ->
        if connected?(socket) do
          {:ok, load_items(socket)}
        else
          {:ok, assign(socket, :items, [])}
        end

      {:error, socket} ->
        {:ok, socket}
    end
  end

  @impl true
  def handle_event("toggle_navigator", _, socket) do
    {:noreply, Helpers.toggle_navigator(socket)}
  end

  @impl true
  def handle_event("delete_item", %{"id" => id}, socket) do
    case MyApp.Items.delete(id, actor: socket.assigns.current_user) do
      {:ok, _} ->
        {:noreply,
         socket
         |> put_flash(:info, "Item deleted")
         |> load_items()}

      {:error, _} ->
        {:noreply, put_flash(socket, :error, "Failed to delete")}
    end
  end

  defp load_items(socket) do
    items = MyApp.Items.list(resource_id: socket.assigns.resource.id)
    assign(socket, :items, items)
  end
end
```

### 3. Shared Navigator Component

The navigator is shared across all section LiveViews:

```elixir
# lib/my_app_web/live/feature/components/navigator.ex
defmodule MyAppWeb.Live.Feature.Components.Navigator do
  use Phoenix.Component

  attr :current_section, :atom, required: true
  attr :resource, :map, required: true
  attr :open, :boolean, default: true
  attr :width, :integer, default: 280

  def navigator(assigns) do
    ~H"""
    <aside
      :if={@open}
      class="border-r border-base-200 bg-base-100 overflow-y-auto"
      style={"width: #{@width}px"}
    >
      <nav class="p-4 space-y-1">
        <.nav_item
          href={~p"/feature/#{@resource.slug}"}
          icon="hero-home"
          label="Dashboard"
          active={@current_section == :dashboard}
        />
        <.nav_item
          href={~p"/feature/#{@resource.slug}/items"}
          icon="hero-cube"
          label="Items"
          active={@current_section == :items}
        />
        <.nav_item
          href={~p"/feature/#{@resource.slug}/settings"}
          icon="hero-cog-6-tooth"
          label="Settings"
          active={@current_section == :settings}
        />
      </nav>
    </aside>
    """
  end

  defp nav_item(assigns) do
    ~H"""
    <.link
      navigate={@href}
      class={[
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
        @active && "bg-primary/10 text-primary",
        !@active && "hover:bg-base-200"
      ]}
    >
      <.icon name={@icon} class="w-5 h-5" />
      <%= @label %>
    </.link>
    """
  end
end
```

### 4. Shared Template Layout

Each LiveView uses the same layout structure:

```heex
<%!-- items_live.html.heex --%>
<div class="flex h-full">
  <%!-- Navigator (shared component) --%>
  <.navigator
    current_section={@current_section}
    resource={@resource}
    open={@navigator_open}
    width={@navigator_width}
  />

  <%!-- Main Content (section-specific) --%>
  <main class="flex-1 p-6 overflow-y-auto">
    <h1 class="text-2xl font-bold mb-6">Items</h1>

    <div class="space-y-4">
      <.item_card :for={item <- @items} item={item} />
    </div>
  </main>

  <%!-- Assistant (optional, shared component) --%>
  <.assistant :if={@assistant_open} context={@current_section} />
</div>
```

## When to Use handle_params

Use `handle_params` for sub-navigation WITHIN a section, not for switching sections:

```elixir
# DocsLive uses handle_params for document path navigation
def handle_params(params, _uri, socket) do
  doc_path = params["path"] || "README.md"
  socket = load_document(socket, doc_path)
  {:noreply, socket}
end
```

## Module Organization

```
lib/my_app_web/live/feature/
├── dashboard_live.ex         # Dashboard section LiveView
├── dashboard_live.html.heex
├── items_live.ex             # Items section LiveView
├── items_live.html.heex
├── settings_live.ex          # Settings section LiveView
├── settings_live.html.heex
├── helpers.ex                # Shared helpers
└── components/
    ├── navigator.ex          # Shared navigation
    ├── assistant.ex          # Shared assistant panel
    └── item_card.ex          # Reusable components
```

## Navigation Pattern

Use `navigate` (not `patch`) between sections since they're different LiveViews:

```elixir
# Between sections: navigate (full LiveView mount)
<.link navigate={~p"/feature/#{@slug}/items"}>Items</.link>

# Within section: patch (same LiveView, handle_params)
<.link patch={~p"/feature/#{@slug}/items/#{item.id}"}>View Item</.link>
```

## Validation Checklist

- [ ] Each major section is a separate LiveView module
- [ ] Shared functionality centralized in Helpers module
- [ ] Navigator component shared across all section LiveViews
- [ ] Each LiveView file is under 600 lines
- [ ] `navigate` used between sections (different LiveViews)
- [ ] `patch` used within sections (same LiveView sub-navigation)
- [ ] Common assigns initialized via Helpers.assign_defaults
- [ ] Events follow `{:ok, result} | {:error, reason}` pattern
- [ ] Flash messages provide user feedback

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| One LiveView with `:section` param | Monolithic, 1000+ lines | Split into separate LiveViews |
| Switching sections via assigns | Full re-render, state complexity | Use navigation between LiveViews |
| Duplicating helper code | Maintenance burden | Centralize in Helpers module |
| Giant `render` with conditionals | Hard to test, complex | Separate LiveViews with focused templates |
