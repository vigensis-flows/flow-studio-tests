# Quick Review Checklist

Use this for rapid code reviews when time is limited.

## Must Check (High Priority)

### Pipes
- [ ] No nested calls with 2+ operations (use pipes)
- [ ] No single-operation pipes
- [ ] Pipes start with values, not function calls

### Pattern Matching
- [ ] No `Map.get` for required keys (use pattern match)
- [ ] Conditionals converted to multi-clause functions
- [ ] Guards used for type enforcement

### Error Handling
- [ ] No complex `else` in `with`
- [ ] Consistent return types (`{:ok, _}` / `{:error, _}`)
- [ ] Errors normalized in helper functions

### Elixir Gotchas
- [ ] No `mylist[0]` (use `Enum.at`)
- [ ] Block expressions bind result (`socket = if ... do`)
- [ ] No `struct[:field]` (use `struct.field`)
- [ ] No `String.to_atom/1` on user input
- [ ] No nested modules in same file
- [ ] Predicates end with `?`, not start with `is_`

### HEEx Templates
- [ ] No `else if` (use `cond`)
- [ ] `{@var}` for values, `<%= %>` only for blocks
- [ ] Class lists use `[...]` syntax
- [ ] `for` comprehensions, not `Enum.each`

### Ash
- [ ] Actor set in changeset construction
- [ ] Single policy block per action
- [ ] No external calls in `before_action`
- [ ] `exists/2` for relationship checks in policies
- [ ] Handle both `:ok` and `{:ok, _}` from `Ash.destroy()`

### LiveView
- [ ] No business logic in `handle_event`
- [ ] Streams for lists (not assigns)
- [ ] `connected?` check for expensive mount ops
- [ ] Stream filtering refetches with `reset: true`
- [ ] No deprecated `phx-update="append/prepend"`

## Should Check (Medium Priority)

- [ ] No duplicate utility functions
- [ ] Helpers used from `FlowStudio.Helpers`
- [ ] Named Ash actions (not external query building)
- [ ] PubSub subscriptions in mount
- [ ] Stream empty states (`hidden only:block` pattern)
- [ ] Unique DOM IDs on forms and key elements

## Nice to Have (Low Priority)

- [ ] Consistent naming conventions
- [ ] Module organization (aliases at top)
- [ ] Function size (prefer small, focused)
- [ ] Boolean operators (strict for known booleans)
