---
name: designing-assistants
description: Designs context-aware assistant panels that provide contextual help, actions, and information. Use when creating right sidebars, help panels, or contextual action areas. Triggers: "assistant panel", "right sidebar", "contextual help", "action panel".
---

# Designing Assistants

Establishes patterns for context-aware assistant panels in Phoenix LiveView.

## Assistant Structure

```heex
<aside class="w-80 bg-base-100 border-l border-base-200 h-[calc(100vh-64px)] overflow-y-auto">
  <.assistant_header title="Assistant" collapsible={true} />

  <div class="p-4 space-y-6">
    <.context_section context={@context} />
    <.actions_section actions={@available_actions} />
    <.help_section topic={@current_topic} />
  </div>
</aside>
```

## Context Awareness

Assistant content changes based on current view:

```elixir
defp assistant_context(socket) do
  case socket.assigns.current_section do
    :dashboard ->
      %{
        title: "Dashboard Overview",
        description: "Summary of all AI infrastructure items",
        actions: [:sync_all, :refresh],
        help_topic: "ai-infra-dashboard"
      }

    :agents ->
      %{
        title: "Agents",
        description: "Manage AI agent definitions",
        actions: [:create_agent, :import_agents],
        help_topic: "ai-infra-agents"
      }

    _ ->
      %{title: "Help", description: "", actions: [], help_topic: "general"}
  end
end
```

## Assistant Header Component

```elixir
attr :title, :string, required: true
attr :collapsible, :boolean, default: false

def assistant_header(assigns) do
  ~H"""
  <div class="sticky top-0 bg-base-100 border-b border-base-200 px-4 py-3 flex items-center justify-between">
    <h2 class="font-semibold"><%= @title %></h2>

    <button
      :if={@collapsible}
      phx-click="toggle_assistant"
      class="btn btn-ghost btn-sm btn-circle"
    >
      <.icon name="hero-x-mark" class="w-5 h-5" />
    </button>
  </div>
  """
end
```

## Context Section

```elixir
def context_section(assigns) do
  ~H"""
  <div class="bg-base-200 rounded-lg p-4">
    <h3 class="font-medium mb-2"><%= @context.title %></h3>
    <p class="text-sm text-base-content/70">
      <%= @context.description %>
    </p>
  </div>
  """
end
```

## Actions Section

```elixir
def actions_section(assigns) do
  ~H"""
  <div>
    <h3 class="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-3">
      Actions
    </h3>
    <div class="space-y-2">
      <.action_button
        :for={action <- @actions}
        action={action}
      />
    </div>
  </div>
  """
end

def action_button(assigns) do
  {label, icon, event} = action_config(assigns.action)

  assigns = assign(assigns, label: label, icon: icon, event: event)

  ~H"""
  <button
    phx-click={@event}
    class="btn btn-outline btn-sm w-full justify-start gap-2"
  >
    <.icon name={@icon} class="w-4 h-4" />
    <%= @label %>
  </button>
  """
end

defp action_config(:sync_all), do: {"Sync All", "hero-arrow-path", "sync_all"}
defp action_config(:create_agent), do: {"New Agent", "hero-plus", "create_agent"}
defp action_config(:refresh), do: {"Refresh", "hero-arrow-path", "refresh"}
```

## Help Section

```elixir
def help_section(assigns) do
  ~H"""
  <div>
    <h3 class="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-3">
      Help
    </h3>
    <div class="prose prose-sm">
      <%= help_content(@topic) %>
    </div>
    <.link
      href={~p"/docs/#{@topic}"}
      class="text-sm text-primary hover:underline mt-2 inline-block"
    >
      Learn more
    </.link>
  </div>
  """
end
```

## Collapsible Assistant

```elixir
def handle_event("toggle_assistant", _params, socket) do
  {:noreply, assign(socket, :assistant_visible, !socket.assigns.assistant_visible)}
end
```

```heex
<aside
  :if={@assistant_visible}
  class="w-80 bg-base-100 border-l border-base-200"
>
  <!-- Assistant content -->
</aside>

<!-- Expand button when collapsed -->
<button
  :if={!@assistant_visible}
  phx-click="toggle_assistant"
  class="fixed right-0 top-1/2 -translate-y-1/2 btn btn-primary btn-sm rounded-l-lg rounded-r-none"
>
  <.icon name="hero-question-mark-circle" />
</button>
```

## Mobile Overlay

```heex
<div class="xl:hidden">
  <!-- Toggle button -->
  <button phx-click="toggle_assistant" class="btn btn-ghost btn-circle">
    <.icon name="hero-question-mark-circle" class="w-6 h-6" />
  </button>

  <!-- Modal overlay -->
  <div
    :if={@assistant_visible}
    class="fixed inset-0 bg-black/50 z-40"
    phx-click="toggle_assistant"
  />

  <!-- Slide-in panel -->
  <aside
    :if={@assistant_visible}
    class="fixed right-0 top-0 h-full w-80 bg-base-100 z-50 shadow-xl"
  >
    <.assistant_header title="Assistant" collapsible={true} />
    <!-- Content -->
  </aside>
</div>
```

## Validation Checklist

- [ ] Context changes based on current view
- [ ] Clear header with collapse option
- [ ] Actions relevant to current context
- [ ] Help content matches current section
- [ ] Mobile-friendly (overlay or drawer)
- [ ] Sticky header in scrollable content
- [ ] Consistent section spacing
- [ ] Clear visual hierarchy
