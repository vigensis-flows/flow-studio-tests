---
name: designing-navigators
description: Designs sidebar navigation components with active states, counts, badges, and status indicators. Use when creating left navigation, category menus, or tree-style navigators. Triggers: "sidebar", "left nav", "navigation menu", "category links".
---

# Designing Navigators

Establishes patterns for sidebar navigation components in Phoenix LiveView.

## Navigator Structure

```heex
<nav class="w-60 bg-base-200 h-[calc(100vh-64px)] overflow-y-auto p-4">
  <.nav_section title="Overview">
    <.nav_link
      href={~p"/feature/dashboard"}
      icon="hero-home"
      label="Dashboard"
      active={@current_section == :dashboard}
    />
  </.nav_section>

  <.nav_divider />

  <.nav_section title="Categories">
    <.nav_link
      href={~p"/feature/agents"}
      icon="hero-users"
      label="Agents"
      count={@summary.agent_count}
      badge={@summary.agents_needing_attention}
      active={@current_section == :agents}
    />
  </.nav_section>
</nav>
```

## Nav Link Component

```elixir
attr :href, :string, required: true
attr :icon, :string, required: true
attr :label, :string, required: true
attr :active, :boolean, default: false
attr :count, :integer, default: nil
attr :badge, :integer, default: nil
attr :badge_type, :atom, default: :warning  # :warning | :error | :success

def nav_link(assigns) do
  ~H"""
  <.link
    patch={@href}
    class={[
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
      "hover:bg-base-300 transition-colors",
      @active && "bg-base-300 font-medium"
    ]}
  >
    <.icon name={@icon} class="w-5 h-5" />
    <span class="flex-1"><%= @label %></span>

    <%= if @count do %>
      <span class="text-xs text-base-content/60"><%= @count %></span>
    <% end %>

    <%= if @badge && @badge > 0 do %>
      <span class={[
        "px-2 py-0.5 rounded-full text-xs font-medium",
        badge_class(@badge_type)
      ]}>
        <%= @badge %>
      </span>
    <% end %>
  </.link>
  """
end

defp badge_class(:warning), do: "bg-warning/20 text-warning"
defp badge_class(:error), do: "bg-error/20 text-error"
defp badge_class(:success), do: "bg-success/20 text-success"
```

## Nav Section Component

```elixir
attr :title, :string, default: nil
slot :inner_block, required: true

def nav_section(assigns) do
  ~H"""
  <div class="mb-4">
    <%= if @title do %>
      <h3 class="px-3 mb-2 text-xs font-semibold text-base-content/50 uppercase tracking-wider">
        <%= @title %>
      </h3>
    <% end %>
    <ul class="space-y-1">
      <%= render_slot(@inner_block) %>
    </ul>
  </div>
  """
end
```

## Status Indicators

Use icons and colors for status:

| Status | Icon | Color |
|--------|------|-------|
| In sync | `hero-check-circle` | `text-success` |
| Needs attention | `hero-exclamation-circle` | `text-warning` |
| Error | `hero-x-circle` | `text-error` |
| Modified | `hero-pencil` | `text-info` |
| New | `hero-plus-circle` | `text-accent` |

## Badge Patterns

```heex
<!-- Count badge (subtle) -->
<span class="text-xs text-base-content/60">14</span>

<!-- Attention badge (warning) -->
<span class="px-2 py-0.5 rounded-full text-xs bg-warning/20 text-warning">3</span>

<!-- Update indicator -->
<span class="px-2 py-0.5 rounded text-xs bg-info/20 text-info">2 updates</span>
```

## Collapsible Sections

```elixir
def collapsible_section(assigns) do
  ~H"""
  <div>
    <button
      phx-click="toggle_section"
      phx-value-section={@section}
      class="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium"
    >
      <.icon
        name={if @expanded, do: "hero-chevron-down", else: "hero-chevron-right"}
        class="w-4 h-4"
      />
      <%= @title %>
    </button>

    <div :if={@expanded} class="ml-4">
      <%= render_slot(@inner_block) %>
    </div>
  </div>
  """
end
```

## Mobile Drawer

```heex
<div class="drawer lg:drawer-open">
  <input id="nav-drawer" type="checkbox" class="drawer-toggle" />

  <div class="drawer-content">
    <!-- Main content -->
    <label for="nav-drawer" class="btn btn-ghost lg:hidden">
      <.icon name="hero-bars-3" />
    </label>
  </div>

  <div class="drawer-side">
    <label for="nav-drawer" class="drawer-overlay"></label>
    <.navigator {assigns} />
  </div>
</div>
```

## Validation Checklist

- [ ] Active state clearly visible
- [ ] Icons consistent in size (20px / w-5)
- [ ] Counts and badges right-aligned
- [ ] Hover states on all links
- [ ] Section titles in uppercase, smaller text
- [ ] Collapsible for long lists
- [ ] Mobile drawer for responsive
- [ ] Keyboard navigation works
