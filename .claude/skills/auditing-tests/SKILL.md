---
name: auditing-tests
description: Audits test files against project testing principles. Checks data usage (seeded vs created), side-effect awareness, coherent test design, proper test levels, and tag usage. Use when reviewing test quality, after writing new tests, or periodically to catch violations. Triggers: "audit tests", "review tests", "check test quality", "test principles".
---

# Auditing Tests

Audits test files against the project's testing philosophy defined in AGENTS.md. Identifies violations and proposes specific fixes.

## Prerequisites

- AGENTS.md "Testing Philosophy" section exists and is current
- Test files to audit (specific files, directories, or all)

---

## Audit Process

### Step 1: Determine Scope

Identify what to audit:
- **Specific files** provided by user
- **All test files** if no specific scope given
- **Recently changed** tests (use `git diff` to find)

List all test files in scope:
```
Glob test/**/*_test.exs
```

### Step 2: Load Principles

Read the testing principles from AGENTS.md (the "Testing Philosophy" section). These are the evaluation criteria.

Also read the seeded test data helpers:
```
Read test/support/data_case.ex
Read test/support/conn_case.ex
```

Understand what seeded data is available:
- `seeded_admin()` / `seeded_user()` — pre-created users with tokens
- `admin_actor()` / `user_actor()` — actor structs for Ash operations
- `system_org()` — the Vigensis organization
- `test_product()` — seeded test product
- `test_domain()` — seeded test domain
- `test_work()` — seeded test work
- `unique_email()` / `unique_slug()` / `unique_id()` — for unique identifiers

### Step 3: Audit Each File

For each test file, evaluate against ALL of the following dimensions:

---

#### Dimension 1: Data Usage

**Principle:** Only create what you're testing. Everything else uses seeded data.

**Check for:**
- [ ] Creates users/actors when it could use `seeded_admin()`, `seeded_user()`, `admin_actor()`, or `user_actor()`
- [ ] Creates organizations when it could use `system_org()`
- [ ] Creates products when it could use `test_product()`
- [ ] Creates domains when it could use `test_domain()`
- [ ] Creates works when it could use `test_work()`

**Violation examples:**
```elixir
# VIOLATION — creates a user just to have one for a LiveView test
setup do
  user = create_test_user("viewer@test.com")
  %{user: user}
end

# CORRECT — use seeded user
setup do
  %{user: seeded_admin()}
end
```

**Exception:** Tests that ARE testing entity creation (e.g., domain CRUD test, user registration test) should create entities — that's what they're testing.

**How to identify:** Look at what the test actually asserts. If it asserts things about a domain but creates the domain just as setup, it's a violation. If it asserts that domain creation works correctly, it's legitimate.

---

#### Dimension 2: Side-Effect Awareness

**Principle:** Understand the full chain an operation triggers. Don't trigger heavy side-effect chains unnecessarily.

**Check for:**
- [ ] Creates domains without needing to test domain creation (triggers auto_assign to ALL actors + events + potential workflows)
- [ ] Creates users without needing to test registration (triggers Actor + Org creation + auto-joins + domain reader assignment for ALL domains)
- [ ] Creates memberships without verifying the notification emails or event effects
- [ ] Multiple tests in the same module each creating the same heavy entity

**Key side-effect chains to flag:**
| Operation | Side Effects |
|-----------|-------------|
| Domain creation | DomainCreated event, potential workflow start |
| User registration | CreateActorAndOrg (Actor + Org), auto_join_orgs, accept_pending_invitations |
| Membership creation | after_transaction hooks, email notifications via MembershipSender |

---

#### Dimension 3: Coherent Testing

**Principle:** Prefer fewer tests with more assertions over many small tests that re-trigger the same side effects.

**Check for:**
- [ ] Multiple tests that each create the same entity to test different aspects of it
- [ ] Tests with a single assertion that could be grouped with related tests
- [ ] `describe` blocks where each test repeats the same expensive setup
- [ ] Side-effect verification split across multiple tests instead of one coherent test

**Violation example:**
```elixir
# VIOLATION — 3 domain creations to test 3 aspects
test "domain creation sets status" do
  {:ok, domain} = create_domain(...)
  assert domain.status == :setting_up
end

test "domain creation assigns readers" do
  {:ok, domain} = create_domain(...)
  # check memberships...
end

test "domain creation fires event" do
  {:ok, domain} = create_domain(...)
  # check event...
end
```

```elixir
# CORRECT — 1 domain creation, coherent verification
test "domain creation lifecycle" do
  {:ok, domain} = create_domain(...)

  assert domain.status == :setting_up

  {:ok, memberships} = list_memberships(domain.id)
  assert length(memberships) > 0

  # event effects verified...
end
```

---

#### Dimension 4: Test Level Classification

**Principle:** Tests should be at the right level and tagged correctly.

**Check for:**
- [ ] Tests tagged `:integration` that should run by default (rename or remove tag)
- [ ] Tests tagged `:slow` that are slow due to poor design (fix the test, don't tag it)
- [ ] Tests that call external systems without `@tag :e2e`
- [ ] Tests that could be pure unit tests but use the database unnecessarily

**Tag rules:**
| Tag | When to use |
|-----|------------|
| (none) | Unit tests and integration tests — the default suite |
| `@tag :e2e` | Tests that call real external systems (LLM, APIs) |
| `@tag :slow` | Tests genuinely slow by design (rare, needs justification) |

---

#### Dimension 5: Cleanup and Isolation

**Principle:** Tests that create data they're testing should clean up inline (at end of test body). But cleanup is secondary to not creating unnecessary data.

**Check for:**
- [ ] Tests that create entities without cleanup
- [ ] Tests using `on_exit` for cleanup (race condition with async tests — prefer inline cleanup at end of test body)
- [ ] Complex cleanup logic that suggests the test shouldn't be creating that data
- [ ] Tests that modify seeded data without restoring it
- [ ] Tests that depend on execution order (fragile)

**Preferred cleanup pattern:**
```elixir
# CORRECT — inline cleanup at end of test body
test "does something with a product", %{conn: conn} do
  product = create_product()
  # ... test assertions ...
  Ash.destroy!(product, actor: admin_actor())
end

# AVOID — on_exit runs asynchronously, can race with other tests
setup do
  product = create_product()
  on_exit(fn -> Ash.destroy!(product, actor: admin_actor()) end)
  %{product: product}
end
```

---

#### Dimension 6: Authorization in Tests

**Principle:** Never use `authorize?: false` except in `test_actor()` helper for user registration bootstrap.

**Check for:**
- [ ] `authorize?: false` in test setup or assertions
- [ ] Tests that bypass auth when the operation under test should go through auth
- [ ] Missing actor parameter in Ash operations

**Exception:** `DataCase.test_actor/1` uses `authorize?: false` for `register_with_password` because no actor exists yet. This is the test equivalent of the `SystemActorCache` bootstrap exception.

---

### Step 4: Generate Report

For each file, produce a finding if any violations exist:

```markdown
### `test/path/to/file_test.exs`

**Violations:**
1. **[Data Usage]** Line X: Creates a domain via `Ash.create` but only uses it as context for testing membership display. Should use `test_domain()`.
2. **[Coherent Testing]** Lines Y-Z: Three separate tests each create an org membership to test different aspects. Combine into one coherent test.
3. **[Side-Effect Awareness]** Line W: Creates a user in setup, triggering full registration chain (Actor + Org + auto-joins). Only needs a user for authentication — use `seeded_admin()`.

**Recommended changes:**
- Replace domain creation with `test_domain()` (removes ~N side-effect operations per test)
- Merge tests "creates membership", "updates role", "removes membership" into single lifecycle test
- Replace user creation with `seeded_admin()` in setup
```

### Step 5: Summary

After auditing all files, provide:

```markdown
## Test Audit Summary

**Files audited:** N
**Files with violations:** N
**Total violations:** N

### By Dimension
| Dimension | Violations | Severity |
|-----------|-----------|----------|
| Data Usage | N | High — causes data accumulation |
| Side-Effect Awareness | N | High — causes slow tests |
| Coherent Testing | N | Medium — inefficient but not harmful |
| Test Level | N | Medium — affects test organization |
| Cleanup | N | Low — secondary to good design |
| Authorization | N | High — security principle violation |

### Top Priority Fixes
1. [Most impactful fix — e.g., "12 tests create domains unnecessarily"]
2. [Second most impactful]
3. [Third]

### Estimated Impact
- Current unnecessary entity creations per test run: ~N
- Estimated side-effect operations saved by fixing: ~N
- Expected test suite speedup: significant / moderate / minor
```

---

## Quick Audit Mode

For auditing a single file or small set of files (e.g., after writing new tests):

1. Read the file(s)
2. Check all 6 dimensions
3. Report violations inline (no summary needed)
4. Suggest specific code changes

---

### Step 6: Fix Violations

After generating the report, **apply fixes** to all files with violations. Do not just report — fix.

**Fix priority order** (highest impact first):
1. **Data Usage** — replace entity creation with seeded helpers
2. **Authorization** — replace `authorize?: false` with proper actor
3. **Side-Effect Awareness** — eliminate unnecessary heavy operations
4. **Cleanup** — add inline cleanup for entities that must be created
5. **Coherent Testing** — merge fragmented tests where clear improvement
6. **Test Level** — fix tags

**Fix patterns:**

| Violation | Fix |
|-----------|-----|
| Creates org → uses `system_org()` equivalent | Replace with `system_org()` |
| Creates product → uses as context only | Replace with `test_product()` |
| Creates domain → uses as context only | Replace with `test_domain()` |
| Creates work → uses as context only | Replace with `test_work()` |
| Creates user/actor → uses for auth or as actor | Replace with `seeded_admin()`, `seeded_user()`, `admin_actor()`, `user_actor()`, or `test_actor()` |
| `authorize?: false` | Replace with `actor: admin_actor()` or `actor: Platform.Identity.system_actor()` |
| Creates entity legitimately but no cleanup | Add inline `Ash.destroy!` at end of test body |
| Uses `on_exit` for cleanup | Move to inline cleanup at end of test body (avoids async race) |

**After fixing each file:**
1. Run `mix test path/to/file_test.exs` to verify fixes don't break tests
2. If a fix breaks a test, understand why before adjusting

**Do NOT fix:**
- Tests that legitimately need to create entities (e.g., testing CRUD operations on that entity)
- Tests where the seeded data doesn't meet the test's specific requirements (e.g., needs a product with no existing membership)

### Step 7: Post-Fix Verification

After all fixes applied:

```bash
mix test 2>&1 > /tmp/test_audit_run.log
```

Check the log for:
- All tests pass
- No new warnings
- Test count hasn't decreased (fixes shouldn't delete tests, just improve them)

---

## Detection Patterns

Use these grep patterns to find common violations:

```bash
# Unnecessary org creation in tests
Grep "Organization.*for_create" in test/ (excluding organization-specific test files)
Grep "create_test_org\\|create_org\\|create_organization" in test/

# Unnecessary product creation in tests
Grep "Product\\..*for_create\\|Products\\..*create" in test/ (excluding product CRUD tests)

# Unnecessary actor/user creation in tests
Grep "Actor.*for_create\\|register_with_password" in test/ (excluding identity/auth tests)

# authorize?: false violations
Grep "authorize\\?: false" in test/ (flag all, verify each)

# on_exit cleanup (potential race condition)
Grep "on_exit" in test/ (check if should be inline cleanup)
```

---

## Periodic Full Audit

For a complete suite audit (run quarterly or after major changes):

1. Audit ALL test files
2. Generate full report with summary
3. Prioritize fixes by impact (data accumulation > slow tests > organization)
4. **Apply fixes** (Step 6) — the audit is not complete until violations are fixed
5. Verify all tests pass (Step 7)
