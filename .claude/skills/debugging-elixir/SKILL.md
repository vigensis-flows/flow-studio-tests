---
name: debugging-elixir
description: Debugging Elixir/Phoenix/Ash applications using Tidewave runtime tools. Use when debugging errors, investigating unexpected behavior, exploring runtime state, testing code interactively, querying database, checking logs, or when user reports "it's not working", "getting an error", "something's wrong", or asks "why is this happening".
---

# Debugging Elixir Applications

Runtime debugging workflows using Tidewave MCP tools.

## Prerequisites

Phoenix server must be running with Tidewave connected:
- Server: `mix phx.server`
- MCP: Connected to `http://localhost:4000/tidewave/mcp`

---

## Tidewave Tools Reference

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `get_logs` | Read application logs | First step for any error investigation |
| `project_eval` | Execute Elixir code | Test functions, inspect state, reproduce issues |
| `execute_sql_query` | Run SQL queries | Check data state, verify DB operations |
| `get_ecto_schemas` | List all schemas | Understand data model, find resource names |
| `get_source_location` | Find code location | Locate module/function definitions |
| `get_docs` | Get documentation | Check function signatures and behavior |
| `search_package_docs` | Search Hex docs | Find documentation across dependencies |

---

## Debugging Workflows

### Error Investigation

1. **Check logs first**
   ```
   get_logs(tail: 50, grep: "error")
   ```

2. **Understand the context**
   ```
   get_source_location("ModuleName.function_name")
   ```

3. **Reproduce the issue**
   ```
   project_eval("ModuleName.function_name(args)")
   ```

4. **Check data state if relevant**
   ```
   execute_sql_query("SELECT * FROM table WHERE condition LIMIT 5")
   ```

### Before Modifying Code

1. **Understand the data model**
   ```
   get_ecto_schemas()
   ```

2. **Check current behavior**
   ```
   project_eval("Domain.action(params, actor: user)")
   ```

3. **Inspect related data**
   ```
   execute_sql_query("SELECT column_name FROM information_schema.columns WHERE table_name = 'table'")
   ```

### Testing a Fix

1. **Evaluate the fix**
   ```
   project_eval("new_function(test_input)")
   ```

2. **Verify no errors**
   ```
   get_logs(tail: 10)
   ```

3. **Check data changes**
   ```
   execute_sql_query("SELECT * FROM affected_table WHERE id = 'xxx'")
   ```

---

## Common Patterns

### Inspect Ash Resource

```elixir
# Get all actions
project_eval("Ash.Resource.Info.actions(MyApp.Resource)")

# Get attributes
project_eval("Ash.Resource.Info.attributes(MyApp.Resource)")

# Check policies
project_eval("Ash.Resource.Info.policies(MyApp.Resource)")
```

### Test Ash Action

```elixir
# Create with actor
project_eval("""
  MyApp.Domain.create!(
    %{field: "value"},
    actor: MyApp.Repo.get!(MyApp.Accounts.User, "user-id")
  )
""")
```

### Query with Ash

```elixir
project_eval("""
  MyApp.Resource
  |> Ash.Query.filter(field == "value")
  |> Ash.read!(actor: admin)
""")
```

---

## Quick Diagnostics

| Symptom | First Tool | Query |
|---------|------------|-------|
| "Error in production" | `get_logs` | `grep: "error"` |
| "Data looks wrong" | `execute_sql_query` | SELECT from relevant table |
| "Action not working" | `project_eval` | Call the action directly |
| "Don't know the schema" | `get_ecto_schemas` | No args |
| "Where is this defined?" | `get_source_location` | Module.function |
