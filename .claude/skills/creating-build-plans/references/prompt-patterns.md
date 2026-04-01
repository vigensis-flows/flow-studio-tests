# Prompt Patterns

Detailed templates for each prompt pattern. Use based on the type of work.

## Pattern 1: Explore-Plan-Implement

For work with uncertainty - explores before committing.

```
<context>
[What exists, what we're adding]
</context>

<task>
Implement [feature] that [outcome].

Before coding:
1. Explore the codebase to understand current patterns
2. Create an implementation plan
3. Wait for approval before implementing
</task>

<acceptance>
- [Criteria]
- Tests cover the new functionality
</acceptance>
```

**Use when:** Unfamiliar codebase area, multiple valid approaches, architectural decisions.

---

## Pattern 2: Test-First

For well-defined work - write tests first, then implement.

```
<context>
[What exists, requirements]
</context>

<task>
Implement [feature]:
1. First, write tests that define expected behavior
2. Then implement code to pass the tests
3. Run full test suite to verify no regressions
</task>

<acceptance>
- [Feature works as specified]
- All tests pass
- No new warnings
</acceptance>
```

**Use when:** Clear requirements, well-defined behavior, existing test patterns.

---

## Pattern 3: Schema-First

For data layer work - define structure, then behavior.

```
<context>
[Current schema state, related resources]
</context>

<task>
Create [resource] with these attributes:
- [attribute]: [type] - [purpose]
- [attribute]: [type] - [purpose]

Include:
1. Migration
2. Resource with validations
3. Basic CRUD actions
4. Tests for validations and actions
</task>

<acceptance>
- Migration runs cleanly
- Resource validates correctly
- Tests cover happy path and validation errors
</acceptance>
```

**Use when:** Database changes, new data models, resource definitions.

---

## Pattern 4: Integration

For connecting components - define interface, then wire up.

```
<context>
[Component A location/purpose]
[Component B location/purpose]
</context>

<task>
Integrate [A] with [B]:
1. Define the interface between components
2. Implement the integration
3. Add integration tests
4. Verify end-to-end flow works
</task>

<acceptance>
- Data flows correctly between components
- Error cases handled gracefully
- Integration tests pass
</acceptance>
```

**Use when:** Connecting services, API integrations, component composition.

---

## Pattern 5: UI Component

For frontend work - match design, handle states.

```
<context>
[Design reference, existing components to follow]
</context>

<task>
Create [component] that:
- [Visual requirement]
- [Interaction requirement]
- [Data requirement]

Follow existing patterns in [reference component].
</task>

<acceptance>
- Matches design specification
- Handles loading/error states
- Works on mobile viewport
</acceptance>
```

**Use when:** New UI components, pages, visual features.

---

## Pattern 6: Refactor

For improving existing code - preserve behavior, improve structure.

```
<context>
[Current implementation location]
[Problems with current approach]
</context>

<task>
Refactor [component]:
1. First, ensure existing tests pass
2. [Specific refactoring]
3. Verify behavior is unchanged
4. Add tests if coverage is insufficient
</task>

<acceptance>
- All existing tests pass
- Behavior unchanged
- [Specific improvement achieved]
</acceptance>
```

**Use when:** Technical debt, code quality improvements, restructuring.
