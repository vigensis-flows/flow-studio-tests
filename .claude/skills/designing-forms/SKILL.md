---
name: designing-forms
description: Designs form layouts with validation, error display, and multi-step patterns. Use when creating forms, input handling, or validation display. Triggers: "form design", "validation", "input fields", "form layout", "multi-step form".
---

# Designing Forms

Establishes patterns for forms in Phoenix LiveView with DaisyUI components.

## Basic Form Structure

```heex
<.form for={@form} phx-submit="save" phx-change="validate" class="space-y-6">
  <.form_section title="Basic Information">
    <.input field={@form[:name]} label="Name" required />
    <.input field={@form[:email]} type="email" label="Email" required />
  </.form_section>

  <.form_section title="Details">
    <.input field={@form[:description]} type="textarea" label="Description" />
  </.form_section>

  <.form_actions>
    <.button type="submit" phx-disable-with="Saving...">Save</.button>
    <.link patch={@return_path} class="btn btn-ghost">Cancel</.link>
  </.form_actions>
</.form>
```

## Form Section Component

```elixir
attr :title, :string, required: true
slot :inner_block, required: true

def form_section(assigns) do
  ~H"""
  <fieldset class="space-y-4">
    <legend class="text-lg font-medium mb-4"><%= @title %></legend>
    <%= render_slot(@inner_block) %>
  </fieldset>
  """
end
```

## Input Component (Enhanced)

```elixir
attr :field, Phoenix.HTML.FormField, required: true
attr :label, :string, required: true
attr :type, :string, default: "text"
attr :required, :boolean, default: false
attr :help, :string, default: nil
attr :rest, :global

def input(assigns) do
  ~H"""
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">
        <%= @label %>
        <span :if={@required} class="text-error">*</span>
      </span>
    </label>

    <%= case @type do %>
      <% "textarea" -> %>
        <textarea
          id={@field.id}
          name={@field.name}
          class={["textarea textarea-bordered", @field.errors != [] && "textarea-error"]}
          {@rest}
        ><%= @field.value %></textarea>

      <% "select" -> %>
        <select
          id={@field.id}
          name={@field.name}
          class={["select select-bordered", @field.errors != [] && "select-error"]}
          {@rest}
        >
          <%= render_slot(@inner_block) %>
        </select>

      <% _ -> %>
        <input
          type={@type}
          id={@field.id}
          name={@field.name}
          value={@field.value}
          class={["input input-bordered", @field.errors != [] && "input-error"]}
          {@rest}
        />
    <% end %>

    <div :if={@help} class="label">
      <span class="label-text-alt text-base-content/60"><%= @help %></span>
    </div>

    <.error :for={msg <- @field.errors}><%= msg %></.error>
  </div>
  """
end
```

## Error Display

```elixir
slot :inner_block, required: true

def error(assigns) do
  ~H"""
  <div class="label">
    <span class="label-text-alt text-error flex items-center gap-1">
      <.icon name="hero-exclamation-circle-mini" class="w-4 h-4" />
      <%= render_slot(@inner_block) %>
    </span>
  </div>
  """
end
```

## Form Actions

```elixir
slot :inner_block, required: true

def form_actions(assigns) do
  ~H"""
  <div class="flex items-center justify-end gap-3 pt-6 border-t border-base-200">
    <%= render_slot(@inner_block) %>
  </div>
  """
end
```

## Inline Validation

```elixir
@impl true
def handle_event("validate", %{"form" => params}, socket) do
  changeset =
    socket.assigns.resource
    |> Resource.changeset(params)
    |> Map.put(:action, :validate)

  {:noreply, assign(socket, form: to_form(changeset))}
end

@impl true
def handle_event("save", %{"form" => params}, socket) do
  case Resource.create(params) do
    {:ok, resource} ->
      {:noreply,
       socket
       |> put_flash(:info, "Saved successfully")
       |> push_navigate(to: ~p"/resources/#{resource}")}

    {:error, changeset} ->
      {:noreply, assign(socket, form: to_form(changeset))}
  end
end
```

## Multi-Step Form

```elixir
@impl true
def mount(_params, _session, socket) do
  {:ok,
   assign(socket,
     step: 1,
     total_steps: 3,
     form: to_form(%{})
   )}
end

def render(assigns) do
  ~H"""
  <div>
    <.step_indicator current={@step} total={@total_steps} />

    <.form for={@form} phx-submit="next_step">
      <%= case @step do %>
        <% 1 -> %><.step_1 form={@form} />
        <% 2 -> %><.step_2 form={@form} />
        <% 3 -> %><.step_3 form={@form} />
      <% end %>

      <.form_actions>
        <button :if={@step > 1} type="button" phx-click="prev_step" class="btn btn-ghost">
          Back
        </button>
        <button type="submit" class="btn btn-primary">
          <%= if @step == @total_steps, do: "Submit", else: "Next" %>
        </button>
      </.form_actions>
    </.form>
  </div>
  """
end
```

## Step Indicator

```elixir
attr :current, :integer, required: true
attr :total, :integer, required: true

def step_indicator(assigns) do
  ~H"""
  <ul class="steps mb-8">
    <li
      :for={step <- 1..@total}
      class={["step", step <= @current && "step-primary"]}
    >
      Step <%= step %>
    </li>
  </ul>
  """
end
```

## Form Patterns

| Pattern | When to Use |
|---------|-------------|
| Single form | Simple CRUD operations |
| Multi-step | Complex data entry, onboarding |
| Inline edit | Quick updates, table rows |
| Modal form | Quick creation without navigation |

## Validation Patterns

| Validation | Trigger |
|------------|---------|
| Field-level | `phx-change` on form |
| Submit | `phx-submit` on form |
| Async (unique check) | `phx-debounce="500"` on field |

## Validation Checklist

- [ ] Labels for all inputs
- [ ] Required indicator (asterisk)
- [ ] Error messages below inputs
- [ ] Submit button with loading state
- [ ] Cancel/back navigation
- [ ] `phx-change="validate"` for live feedback
- [ ] `phx-disable-with` on submit button
- [ ] Focus trap in modal forms
- [ ] Step indicator for multi-step
