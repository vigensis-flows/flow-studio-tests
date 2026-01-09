---
name: designing-data-tables
description: Designs data tables with sorting, filtering, pagination, and selection. Use when displaying lists of items, records, or any tabular data. Triggers: "data table", "list view", "sorting", "filtering", "pagination", "table component".
---

# Designing Data Tables

Establishes patterns for data tables in Phoenix LiveView with DaisyUI components.

## Basic Table Structure

```heex
<div class="overflow-x-auto">
  <table class="table table-zebra">
    <thead>
      <tr>
        <th :if={@selectable}>
          <input type="checkbox" class="checkbox" phx-click="toggle_all" />
        </th>
        <.sortable_header field={:name} label="Name" sort={@sort} />
        <.sortable_header field={:status} label="Status" sort={@sort} />
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr :for={item <- @items}>
        <td :if={@selectable}>
          <input
            type="checkbox"
            class="checkbox"
            checked={MapSet.member?(@selected, item.id)}
            phx-click="toggle_selection"
            phx-value-id={item.id}
          />
        </td>
        <td><%= item.name %></td>
        <td><.status_badge status={item.status} /></td>
        <td><.row_actions item={item} /></td>
      </tr>
    </tbody>
  </table>
</div>
```

## Sortable Header Component

```elixir
attr :field, :atom, required: true
attr :label, :string, required: true
attr :sort, :map, required: true  # %{field: :name, direction: :asc}

def sortable_header(assigns) do
  ~H"""
  <th>
    <button
      phx-click="sort"
      phx-value-field={@field}
      class="flex items-center gap-1 hover:text-primary"
    >
      <%= @label %>
      <.sort_icon field={@field} sort={@sort} />
    </button>
  </th>
  """
end

defp sort_icon(assigns) do
  icon = cond do
    assigns.sort.field != assigns.field -> "hero-arrows-up-down"
    assigns.sort.direction == :asc -> "hero-arrow-up"
    true -> "hero-arrow-down"
  end

  assigns = assign(assigns, :icon, icon)

  ~H"""
  <.icon name={@icon} class="w-4 h-4" />
  """
end
```

## Filter Bar Component

```elixir
def filter_bar(assigns) do
  ~H"""
  <div class="flex flex-wrap gap-3 mb-4">
    <.filter_input
      name="search"
      placeholder="Search..."
      value={@filters[:search]}
    />

    <.filter_select
      name="status"
      options={status_options()}
      value={@filters[:status]}
    />

    <button
      :if={any_filters_active?(@filters)}
      phx-click="clear_filters"
      class="btn btn-ghost btn-sm"
    >
      Clear filters
    </button>
  </div>
  """
end

def filter_input(assigns) do
  ~H"""
  <input
    type="text"
    name={@name}
    value={@value}
    placeholder={@placeholder}
    phx-debounce="300"
    phx-change="filter"
    class="input input-bordered input-sm w-64"
  />
  """
end

def filter_select(assigns) do
  ~H"""
  <select
    name={@name}
    phx-change="filter"
    class="select select-bordered select-sm"
  >
    <option value="">All</option>
    <option :for={{label, value} <- @options} value={value} selected={@value == value}>
      <%= label %>
    </option>
  </select>
  """
end
```

## Pagination Component

```elixir
attr :page, :integer, required: true
attr :total_pages, :integer, required: true
attr :total_count, :integer, required: true

def pagination(assigns) do
  ~H"""
  <div class="flex items-center justify-between mt-4">
    <span class="text-sm text-base-content/60">
      Showing <%= (@page - 1) * @per_page + 1 %> to <%= min(@page * @per_page, @total_count) %>
      of <%= @total_count %> results
    </span>

    <div class="join">
      <button
        phx-click="page"
        phx-value-page={@page - 1}
        disabled={@page == 1}
        class="join-item btn btn-sm"
      >
        Previous
      </button>

      <button
        :for={p <- visible_pages(@page, @total_pages)}
        phx-click="page"
        phx-value-page={p}
        class={["join-item btn btn-sm", p == @page && "btn-active"]}
      >
        <%= p %>
      </button>

      <button
        phx-click="page"
        phx-value-page={@page + 1}
        disabled={@page == @total_pages}
        class="join-item btn btn-sm"
      >
        Next
      </button>
    </div>
  </div>
  """
end

defp visible_pages(current, total) do
  start = max(1, current - 2)
  finish = min(total, current + 2)
  Enum.to_list(start..finish)
end
```

## Row Actions Component

```elixir
def row_actions(assigns) do
  ~H"""
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-xs">
      <.icon name="hero-ellipsis-vertical" class="w-4 h-4" />
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
      <li><.link phx-click="view" phx-value-id={@item.id}>View</.link></li>
      <li><.link phx-click="edit" phx-value-id={@item.id}>Edit</.link></li>
      <li><.link phx-click="delete" phx-value-id={@item.id} class="text-error">Delete</.link></li>
    </ul>
  </div>
  """
end
```

## Event Handlers

```elixir
@impl true
def handle_event("sort", %{"field" => field}, socket) do
  field = String.to_existing_atom(field)
  current = socket.assigns.sort

  direction =
    if current.field == field && current.direction == :asc,
      do: :desc,
      else: :asc

  {:noreply,
   socket
   |> assign(:sort, %{field: field, direction: direction})
   |> load_items()}
end

@impl true
def handle_event("filter", params, socket) do
  filters = Map.merge(socket.assigns.filters, params)
  {:noreply, socket |> assign(:filters, filters) |> assign(:page, 1) |> load_items()}
end

@impl true
def handle_event("page", %{"page" => page}, socket) do
  {:noreply, socket |> assign(:page, String.to_integer(page)) |> load_items()}
end

@impl true
def handle_event("toggle_selection", %{"id" => id}, socket) do
  id = String.to_integer(id)
  selected = socket.assigns.selected

  selected =
    if MapSet.member?(selected, id),
      do: MapSet.delete(selected, id),
      else: MapSet.put(selected, id)

  {:noreply, assign(socket, :selected, selected)}
end
```

## Empty State

```elixir
def empty_state(assigns) do
  ~H"""
  <div class="text-center py-12">
    <.icon name="hero-inbox" class="w-12 h-12 mx-auto text-base-content/30 mb-4" />
    <h3 class="font-medium mb-2">No items found</h3>
    <p class="text-sm text-base-content/60 mb-4">
      <%= @message || "Get started by creating your first item." %>
    </p>
    <.link :if={@action_href} href={@action_href} class="btn btn-primary btn-sm">
      <.icon name="hero-plus" class="w-4 h-4" />
      <%= @action_label || "Create" %>
    </.link>
  </div>
  """
end
```

## Loading State

```heex
<div :if={@loading} class="flex justify-center py-12">
  <span class="loading loading-spinner loading-lg"></span>
</div>

<.table :if={!@loading} items={@items} />
```

## Validation Checklist

- [ ] Sortable headers with direction indicator
- [ ] Search with debounce
- [ ] Filter dropdowns for enums
- [ ] Clear filters button
- [ ] Pagination with total count
- [ ] Row selection (if bulk actions needed)
- [ ] Row actions dropdown
- [ ] Empty state component
- [ ] Loading state
- [ ] Responsive overflow handling
