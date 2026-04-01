---
name: designing-live-views
description: Designs Phoenix LiveView architecture using separate LiveViews for major sections with consistent 3-column workspace layout. Use when creating views with navigable sections, tabs, or distinct functional areas. Triggers: "LiveView structure", "section navigation", "tabs", "multi-section page", "workspace layout".
---

# Designing LiveViews

Establishes the architectural pattern for Phoenix LiveViews with navigable sections and consistent 3-column workspace layout.

## Core Patterns

### 1. Each Major Section Gets Its Own LiveView

This is the pattern used throughout the codebase (Flow UI, Domain UI, etc.) and provides:
- Clear separation of concerns
- Manageable file sizes
- Independent testability
- Reduced state complexity

### 2. Consistent 3-Column Workspace Layout

All workspace views follow the same layout pattern:

```
┌────────────┬─────────────────────────────────┬────────────┐
│            │ Fixed Header (title + actions)  │            │
│ Navigator  ├─────────────────────────────────┤ Assistant  │
│            │ Scrollable Content              │            │
└────────────┴─────────────────────────────────┴────────────┘
```

**Every view with content has all three columns:**
- **Navigator** (left): Section navigation, context
- **Content** (center): Main content with optional header
- **Assistant** (right): Contextual help, chat, or guidance

**Exception:** Landing pages (e.g., `/`) may have a different layout without navigator/assistant.

## The Workspace Component

Use the `<.workspace>` component for all workspace views:

```heex
<.workspace>
  <:navigator>
    <.feature_navigator ... />
  </:navigator>

  <:header>
    <h1 class="text-xl font-semibold">Page Title</h1>
    <div class="flex items-center gap-2">
      <button class="btn btn-sm">Action</button>
    </div>
  </:header>

  <:content>
    <%!-- Main content here --%>
  </:content>

  <:assistant>
    <.feature_assistant ... />
  </:assistant>
</.workspace>
```

### Loading and Error States

Use dedicated components for loading and error states:

```heex
<%= if @loading do %>
  <.workspace_loading message="Loading resource..." />
<% else %>
  <%= if @not_found do %>
    <.workspace_error
      icon="🔍"
      title="Not Found"
      message="The resource you're looking for doesn't exist."
      back_link={~p"/resources"}
      back_label="Back to Resources"
    />
  <% else %>
    <.workspace>
      ...
    </.workspace>
  <% end %>
<% end %>
```

### Header Flexibility

The header slot accepts arbitrary content in a flex justify-between container:

**Simple header:**
```heex
<:header>
  <h1 class="text-xl font-semibold">Page Title</h1>
  <div class="flex items-center gap-2">
    <.link navigate={~p"/edit"} class="btn btn-sm btn-primary">Edit</.link>
  </div>
</:header>
```

**Complex header (editors with presence, mode toggles):**
```heex
<:header>
  <div class="flex items-center gap-3">
    <h1 class="text-xl font-semibold">Edit Document</h1>
    <div class="avatar-stack">...</div>
    <span class="text-sm text-base-content/50">3 editing</span>
  </div>
  <div class="flex items-center gap-2">
    <div class="join"><%!-- mode toggle --%></div>
    <div class="divider divider-horizontal mx-1 h-6"></div>
    <button>Cancel</button>
    <button class="btn btn-primary">Save</button>
  </div>
</:header>
```

### No Header (full control)

Omit the `:header` slot when content needs full control (no padding):

```heex
<.workspace>
  <:navigator>...</:navigator>
  <:content>
    <%!-- Full-height content with own layout --%>
  </:content>
  <:assistant>...</:assistant>
</.workspace>
```

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

## Reference Implementation: Domain UI

```elixir
# router.ex - Domain UI structure
scope "/expertise/domains/:domain_slug", FlowStudioWeb.Live.Domain do
  live "/", BriefLive                      # Default view
  live "/brief", BriefLive
  live "/brief/edit", BriefEditLive
  live "/brief/versions", BriefVersionsLive
  live "/role-description", RoleDescriptionLive
  live "/role-description/edit", RoleDescriptionEditLive
  live "/agent-prompt", AgentPromptLive
  live "/agent-prompt/edit", AgentPromptEditLive
  live "/assets", AssetsLive
  live "/settings", SettingsLive
end
```

**Key insight:** `handle_params` is used for sub-navigation WITHIN a section (e.g., query params, filters), not for switching between sections.

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
  def assign_defaults(socket, current_user) do
    ui_prefs = current_user.ui_preferences || %{}

    socket
    |> Phoenix.Component.assign(:current_user, current_user)
    |> Phoenix.Component.assign(:navigator_width, ui_prefs["navigator_width"] || @default_navigator_width)
    |> Phoenix.Component.assign(:navigator_open, ui_prefs["navigator_open"] != false)
    |> Phoenix.Component.assign(:assistant_width, ui_prefs["assistant_width"] || @default_assistant_width)
    |> Phoenix.Component.assign(:assistant_open, ui_prefs["assistant_open"] != false)
    |> Phoenix.Component.assign(:loading, true)
    |> Phoenix.Component.assign(:not_found, false)
  end

  @doc """
  Loads the parent resource with error handling.
  """
  def load_resource(socket, slug, page_title) do
    case MyApp.Resources.get_by_slug(slug, actor: socket.assigns.current_user) do
      {:ok, resource} ->
        socket
        |> Phoenix.Component.assign(:resource, resource)
        |> Phoenix.Component.assign(:page_title, page_title)
        |> Phoenix.Component.assign(:loading, false)
        |> Phoenix.Component.assign(:not_found, false)

      {:error, _} ->
        socket
        |> Phoenix.Component.assign(:loading, false)
        |> Phoenix.Component.assign(:not_found, true)
    end
  end
end
```

### 2. Individual Section LiveViews

Each section is a focused LiveView using the workspace component:

```elixir
# lib/my_app_web/live/feature/items_live.ex
defmodule MyAppWeb.Live.Feature.ItemsLive do
  @moduledoc """
  Items section for Feature.

  Route: /feature/:slug/items
  """
  use MyAppWeb, :live_view

  alias MyAppWeb.Live.Feature.Helpers

  import FlowStudioWeb.Components.Workspace
  import MyAppWeb.Live.Feature.Components.Navigator
  import MyAppWeb.Live.Feature.Components.Assistant

  on_mount {MyAppWeb.LiveUserAuth, :live_user_required}

  @impl true
  def mount(_params, _session, socket) do
    socket =
      socket
      |> Helpers.assign_defaults(socket.assigns.current_user)
      |> assign(:items, [])

    {:ok, socket}
  end

  @impl true
  def handle_params(%{"slug" => slug}, _uri, socket) do
    socket =
      socket
      |> Helpers.load_resource(slug, "Items")
      |> load_items_if_connected()

    {:noreply, socket}
  end

  @impl true
  def handle_event("toggle_navigator", _, socket) do
    {:noreply, assign(socket, :navigator_open, !socket.assigns.navigator_open)}
  end

  @impl true
  def handle_event("toggle_assistant", _, socket) do
    {:noreply, assign(socket, :assistant_open, !socket.assigns.assistant_open)}
  end

  defp load_items_if_connected(socket) do
    if connected?(socket) and not socket.assigns.not_found do
      items = MyApp.Items.list(resource_id: socket.assigns.resource.id)
      assign(socket, :items, items)
    else
      socket
    end
  end
end
```

### 3. Template Using Workspace Component

```heex
<%!-- items_live.html.heex --%>
<%= if @loading do %>
  <.workspace_loading message="Loading items..." />
<% else %>
  <%= if @not_found do %>
    <.workspace_error
      icon="🔍"
      title="Not Found"
      message="The resource you're looking for doesn't exist."
      back_link={~p"/features"}
      back_label="Back to Features"
    />
  <% else %>
    <.workspace>
      <:navigator>
        <.feature_navigator
          resource={@resource}
          current_section={:items}
          navigator_open={@navigator_open}
          navigator_width={@navigator_width}
        />
      </:navigator>

      <:header>
        <h1 class="text-xl font-semibold">{@resource.name} Items</h1>
        <div class="flex items-center gap-2">
          <button phx-click="add_item" class="btn btn-sm btn-primary">
            Add Item
          </button>
        </div>
      </:header>

      <:content>
        <div class="space-y-4">
          <%= for item <- @items do %>
            <.item_card item={item} />
          <% end %>
        </div>
      </:content>

      <:assistant>
        <.feature_assistant
          resource={@resource}
          topic={:items}
          assistant_open={@assistant_open}
          assistant_width={@assistant_width}
        />
      </:assistant>
    </.workspace>
  <% end %>
<% end %>
```

### 4. Shared Navigator Component

```elixir
# lib/my_app_web/live/feature/components/navigator.ex
defmodule MyAppWeb.Live.Feature.Components.Navigator do
  use Phoenix.Component

  attr :current_section, :atom, required: true
  attr :resource, :map, required: true
  attr :navigator_open, :boolean, default: true
  attr :navigator_width, :integer, default: 280

  def feature_navigator(assigns) do
    ~H"""
    <div
      class="transition-all duration-300 flex-shrink-0"
      style={"width: #{if @navigator_open, do: "#{@navigator_width}px", else: "32px"}"}
    >
      <%= if @navigator_open do %>
        <aside class="h-full border-r border-base-300 flex flex-col">
          <%!-- Navigator content --%>
        </aside>
      <% else %>
        <%!-- Collapsed state --%>
      <% end %>
    </div>
    """
  end
end
```

### 5. Shared Assistant Component

```elixir
# lib/my_app_web/live/feature/components/assistant.ex
defmodule MyAppWeb.Live.Feature.Components.Assistant do
  use Phoenix.Component

  attr :topic, :atom, required: true
  attr :resource, :map, required: true
  attr :assistant_open, :boolean, default: true
  attr :assistant_width, :integer, default: 320

  def feature_assistant(assigns) do
    ~H"""
    <div
      class="transition-all duration-300 flex-shrink-0"
      style={"width: #{if @assistant_open, do: "#{@assistant_width}px", else: "32px"}"}
    >
      <%= if @assistant_open do %>
        <aside class="h-full shadow-lg rounded-2xl border border-base-300 flex flex-col">
          <%!-- Topic-specific help content --%>
          <.topic_help topic={@topic} resource={@resource} />
        </aside>
      <% else %>
        <%!-- Collapsed state --%>
      <% end %>
    </div>
    """
  end

  defp topic_help(%{topic: :items} = assigns) do
    ~H"""
    <div class="p-4 space-y-3">
      <h3 class="font-medium">About Items</h3>
      <p class="text-sm text-base-content/70">
        Items are the building blocks of your feature...
      </p>
    </div>
    """
  end

  defp topic_help(assigns) do
    ~H"""
    <div class="p-4 text-sm text-base-content/70">
      Select a topic to see contextual help.
    </div>
    """
  end
end
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
<.link patch={~p"/feature/#{@slug}/items?filter=active"}>Active Items</.link>
```

## Validation Checklist

- [ ] Each major section is a separate LiveView module
- [ ] All views use the `<.workspace>` component
- [ ] Navigator slot present (left column)
- [ ] Content slot present (center column)
- [ ] Assistant slot present (right column)
- [ ] Loading state uses `<.workspace_loading>`
- [ ] Error/not-found state uses `<.workspace_error>`
- [ ] Header slot has title on left, actions on right
- [ ] Shared functionality centralized in Helpers module
- [ ] Each LiveView file is under 600 lines
- [ ] `navigate` used between sections (different LiveViews)
- [ ] `patch` used within sections (same LiveView sub-navigation)
- [ ] `toggle_navigator` and `toggle_assistant` events handled

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| One LiveView with `:section` param | Monolithic, 1000+ lines | Split into separate LiveViews |
| Missing navigator or assistant | Inconsistent layout | Always use all 3 columns |
| Inline loading/error states | Inconsistent styling | Use workspace_loading/workspace_error |
| Custom flex layout per view | Visual inconsistency | Use workspace component |
| Duplicating helper code | Maintenance burden | Centralize in Helpers module |
| Footer status bars | Visual clutter, low value | Remove, use header for status |
