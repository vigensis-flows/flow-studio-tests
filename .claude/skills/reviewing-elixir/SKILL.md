---
name: reviewing-elixir
description: Reviews Elixir code for idiomatic patterns, anti-patterns, and best practices. Use when user asks to "review code", "check my elixir", "is this idiomatic", "improve this code", "refactor", or after completing a feature to verify code quality. Covers pipes, pattern matching, error handling, Ash patterns, and LiveView patterns.
---

# Reviewing Elixir Code

Reviews Elixir/Phoenix/Ash code for idiomatic patterns and identifies improvement opportunities.

## Prerequisites

- Phoenix server running (for Tidewave access)
- Code files to review

---

## Review Process

### Step 1: Gather Context

Identify what to review:
- Specific files provided by user
- Recent changes (use `git diff` or `git log`)
- Entire module or directory

### Step 2: Read Reference Standards

Load the appropriate reference docs based on what's being reviewed:

**For core Elixir patterns:**
```
Read docs/reference/idiomatic-elixir.md
```

**For LiveView/Phoenix code:**
```
Read docs/reference/phoenix-expert.md
```

**For Ash resources/actions:**
```
Read docs/reference/ash-expert.md
```

### Step 3: Analyze Code

Review each file against the checklist below. Use Tidewave tools to verify runtime behavior if needed.

### Step 4: Report Findings

Present findings in this structure:
1. **Summary** - Overall code quality assessment
2. **Issues Found** - Specific anti-patterns with file:line references
3. **Recommendations** - Concrete improvements with code examples
4. **Good Patterns** - Highlight what's working well (reinforces good habits)

---

## Review Checklist

### Pipe Operator Usage

**Check for:**
- [ ] Nested function calls that should use pipes (2+ operations)
- [ ] Single-operation pipes (should be simple function call)
- [ ] Pipes starting with function calls instead of values
- [ ] Missing parentheses in pipe chains

**Good:**
```elixir
name
|> String.downcase()
|> String.replace(~r/\s+/, "-")
|> String.trim("-")
```

**Issues to flag:**
```elixir
# Unnecessary single-operation pipe
name |> String.downcase()

# Pipe starting with function call
String.trim(name) |> String.downcase()
```

### Pattern Matching

**Check for:**
- [ ] Conditionals that should be multi-clause functions
- [ ] `Map.get` calls where pattern matching would assert key presence
- [ ] Function heads extracting too many values (extract in body instead)
- [ ] Missing guards that could enforce types

**Good:**
```elixir
def process(nil), do: {:error, :nil_input}
def process(""), do: {:error, :empty}
def process(input) when is_binary(input), do: {:ok, do_work(input)}

def check(%{id: id, roles: roles} = actor) do
  # Pattern match asserts structure
end
```

**Issues to flag:**
```elixir
# Defensive Map.get hiding potential bugs
def check(actor) do
  id = Map.get(actor, :id)
  roles = Map.get(actor, :roles, [])
end

# Conditional that should be pattern match
def process(input) do
  cond do
    is_nil(input) -> {:error, :nil}
    # ...
  end
end
```

### Error Handling

**Check for:**
- [ ] Complex `else` clauses in `with` statements
- [ ] Inconsistent return types (`nil` vs `{:error, _}`)
- [ ] Missing error normalization in helper functions
- [ ] Exceptions used for control flow (should use tuples)

**Good:**
```elixir
with {:ok, a} <- fetch_a(),
     {:ok, b} <- fetch_b(a) do
  {:ok, b}
end

defp fetch_a do
  case do_fetch() do
    nil -> {:error, :not_found}  # Normalized
    val -> {:ok, val}
  end
end
```

**Issues to flag:**
```elixir
with {:ok, a} <- fetch_a(),
     {:ok, b} <- fetch_b(a) do
  {:ok, b}
else
  {:error, :not_found} -> # Which clause?
    {:error, :something_failed}
  {:error, reason} ->
    {:error, reason}
end
```

### Code Reuse

**Check for:**
- [ ] Duplicate utility functions (especially slug generation)
- [ ] Functions that should use existing helpers
- [ ] Copy-pasted logic across modules

**Search for duplicates:**
```bash
grep -r "String.downcase" --include="*.ex" | head -20
grep -r "slugify\|to_slug\|generate_slug" --include="*.ex"
```

### Ash Patterns

**Check for:**
- [ ] Actor set during changeset construction (not at action call)
- [ ] Logic outside resources that belongs in actions
- [ ] Multiple policy blocks for same action (should be single block)
- [ ] External API calls in `before_action` (should be `before_transaction`)
- [ ] Missing `exists/2` for relationship checks in policies

### LiveView Patterns

**Check for:**
- [ ] Business logic in `handle_event` (should delegate to Domain)
- [ ] Large data stored in assigns (should use streams)
- [ ] Socket passed to async functions (capture values instead)
- [ ] Missing `connected?` checks for expensive mount operations
- [ ] Missing PubSub subscriptions for collaborative features
- [ ] Deprecated `phx-update="append/prepend"` (use streams)
- [ ] Stream filtering without `reset: true` (streams aren't enumerable)

**Stream empty state pattern:**
```elixir
<div id="tasks" phx-update="stream">
  <div class="hidden only:block">No tasks yet</div>
  <div :for={{id, task} <- @streams.tasks} id={id}>
    {task.name}
  </div>
</div>
```

### Elixir Gotchas

**Check for:**
- [ ] List index access (`mylist[0]` is invalid - use `Enum.at`)
- [ ] Block expressions not binding result (if/case/cond must rebind)
- [ ] Struct Access syntax (`changeset[:field]` fails - use `.field`)
- [ ] `String.to_atom/1` on user input (memory leak risk)
- [ ] Nested modules in same file (causes cyclic dependencies)
- [ ] Predicate functions starting with `is_` (should end with `?`)

**Block binding - common mistake:**
```elixir
# WRONG - socket unchanged
if connected?(socket) do
  socket = assign(socket, :val, val)
end

# RIGHT - rebind result
socket =
  if connected?(socket) do
    assign(socket, :val, val)
  else
    socket
  end
```

### HEEx Templates

**Check for:**
- [ ] `else if` in templates (invalid - use `cond`)
- [ ] `<%= @var %>` in attributes (use `{@var}`)
- [ ] `{if ... do}` blocks (use `<%= if ... do %>`)
- [ ] Class attrs without `[...]` list syntax
- [ ] `<% Enum.each %>` for collections (use `<%= for %>`)
- [ ] Missing `phx-no-curly-interpolation` for literal `{}`

**Interpolation rules:**
```elixir
# RIGHT
<div id={@id}>
  {@my_assign}
  <%= if @condition do %>
    {@other}
  <% end %>
</div>

# WRONG
<div id="<%= @id %>">
  {if @condition do}
  {end}
</div>
```

### Testing

**Check for:**
- [ ] Missing unique DOM IDs on forms and key elements
- [ ] Testing raw HTML instead of using selectors
- [ ] Missing LazyHTML for debugging complex selectors

**Debug pattern:**
```elixir
html = render(view)
html |> LazyHTML.from_fragment() |> LazyHTML.filter("selector") |> IO.inspect()
```

---

## Review Report Template

```markdown
# Elixir Code Review: [Module/Feature Name]

## Summary
[1-2 sentence overall assessment]

## Issues Found

### High Priority
- **[Issue Type]** at `file.ex:123`
  - Problem: [What's wrong]
  - Impact: [Why it matters]
  - Fix: [Code example]

### Medium Priority
- ...

### Low Priority
- ...

## Good Patterns Observed
- [Pattern]: seen in `file.ex` - [brief praise]

## Recommendations
1. [Specific actionable improvement]
2. [Specific actionable improvement]
```

---

## Quick Review Commands

**Find pipe operator issues:**
```elixir
# Use Tidewave to check a module
project_eval("Code.fetch_docs(MyModule)")
```

**Check for duplicate slug implementations:**
```bash
grep -rn "slugify\|to_slug\|generate_slug" lib/
```

**Find Map.get patterns that might need review:**
```bash
grep -rn "Map.get(" lib/ --include="*.ex" | head -30
```

**Check actor handling in Ash calls:**
```bash
grep -rn "Ash.create\|Ash.update\|Ash.destroy" lib/ --include="*.ex"
```

**Find potential list index access issues:**
```bash
grep -rn "\[0\]\|\[1\]\|\[i\]" lib/ --include="*.ex" | head -20
```

**Find String.to_atom on potential user input:**
```bash
grep -rn "String.to_atom\|String.to_existing_atom" lib/ --include="*.ex"
```

**Find else if in templates (invalid):**
```bash
grep -rn "else if\|elseif" lib/ --include="*.heex"
```

**Find deprecated phx-update patterns:**
```bash
grep -rn 'phx-update="append"\|phx-update="prepend"' lib/ --include="*.heex"
```

**Find Enum.each in templates:**
```bash
grep -rn "Enum.each" lib/ --include="*.heex"
```

---

## References

For detailed patterns, see:
- [Idiomatic Elixir](../../../docs/reference/idiomatic-elixir.md)
- [Phoenix Expert Guide](../../../docs/reference/phoenix-expert.md)
- [Ash Expert Guide](../../../docs/reference/ash-expert.md)
