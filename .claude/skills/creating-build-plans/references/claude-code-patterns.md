# Claude Code CLI Patterns

Patterns for writing effective prompts in Build Plans. Use these when creating step prompts that will be executed by Claude Code CLI.

## Prompt Effectiveness

### Specificity Matters

Vague prompts reduce first-attempt success.

**Too vague:**
```
Add user authentication
```

**Better:**
```
Add user authentication using phx_gen_auth:
1. Run the generator
2. Customize the user schema to include: name (required), role (enum: user/admin)
3. Update the registration form to collect name
4. Add tests for the custom fields
```

### Show Examples

Multi-shot prompting (examples) significantly improves results:

```
Create a new LiveView for listing products.

Follow the pattern in lib/app_web/live/order_live/index.ex:
- Use the same table component
- Same filter pattern
- Same pagination approach
```

---

## Task Decomposition

### Right-Sized Steps

Each prompt should be completable in roughly 1-2 hours of work.

**Too big:**
```
Build the entire checkout flow
```

**Right size:**
```
Create the cart resource with:
- items: array of {product_id, quantity}
- user_id: belongs_to user
- total: calculated attribute
Include tests for add/remove/update item actions.
```

### Dependency Ordering

1. Data models before business logic
2. Business logic before UI
3. Individual components before integration
4. Happy path before edge cases

---

## Quality Patterns

### Test-First Approach

Best results come from clear targets:

```
Implement password reset:

1. First, write tests:
   - User can request reset email
   - Token expires after 1 hour
   - User can set new password with valid token
   - Invalid/expired tokens are rejected

2. Then implement to pass the tests

3. Run full test suite: mix test
```

### Error Handling Request

Be explicit about error handling needs:

```
Implement file upload with error handling:
- File too large (>10MB)
- Invalid file type (only jpg, png, pdf)
- Upload failure (network error)
- Storage full

Each error should show user-friendly message.
```

---

## Context Optimization

### File References

Include relevant files without copying:

```
Update the authentication flow.

Relevant files:
@lib/app_web/live/user_live/login.ex
@lib/app/accounts/user.ex
@test/app/accounts_test.exs
```

### Minimal Effective Context

Include only what's needed:
- Files being modified
- Files with patterns to follow
- Test files for reference
- Configuration if relevant

Don't include:
- Entire codebase overview
- Unrelated modules
- Documentation Claude already knows

---

## Verification Patterns

### Automated Verification

End prompts with verification commands:

```
After implementation:
1. Run tests: mix test
2. Check types: mix dialyzer
3. Check formatting: mix format --check-formatted
```

### Manual Verification

For UI or integration work:

```
Verification:
1. Start server: mix phx.server
2. Navigate to /products
3. Verify: Products display in table
4. Verify: Filters work correctly
5. Verify: Pagination shows correct page count
```

---

## Anti-Patterns

### Context Overload

Don't dump everything into prompt. Use @references instead of copying file contents.

### Repeating Standards

Don't include in every prompt:
```
Remember to write tests and follow our code style...
```

This belongs in CLAUDE.md, loaded automatically.

### Vague Completion

Don't end with:
```
Let me know when done
```

Instead, specify:
```
Verify completion by running mix test and confirming all pass.
```

### Scope Creep Mid-Prompt

Don't add "also while you're there..." requests. Complete one task, then start new prompt for next task.
