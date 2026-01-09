---
name: building-increments
description: Executes increment Build Plans step by step. Use during the Deliver phase to execute planned steps, or during Improve phase to execute improvement steps. Owned by the Increment Delivery Agent.
---

# Building Increments

Executes increment Build Plans step by step, producing working artifacts while tracking progress and handling blockers.

## Who Uses This Skill

The **Increment Delivery Agent** - responsible for tactical execution of planned work.

**Used in:**
- **Deliver phase**: Execute the Build Plan from Prepare
- **Improve phase**: Execute the Improvement Plan from Evaluate

---

## Prerequisites

Before building, ensure:

1. **Increment document exists** at `docs/increments/feature-name-v1.md`
2. **Build Plan is complete** with executable steps
3. **Plan has been reviewed** (passed reviewing-increments)
4. **Status is correct** (Deliver or Improve)

---

## Execution Process

### Overview

```
For each step in Build Plan:
    1. Read step (Goal, Prompt, Acceptance, Verification)
    2. Check dependencies are met
    3. Execute the prompt
    4. Run verification
    5. Update increment document
    6. Proceed to next step (or handle blocker)
```

### Step-by-Step Execution

#### 1. Read the Step

Before executing, understand:
- **Goal**: What this step achieves
- **Dependencies**: What must be done first
- **Prompt**: The Claude Code CLI prompt to execute
- **Acceptance**: How to know it's done
- **Verification**: Commands to confirm

#### 2. Check Dependencies

Verify prerequisite steps are complete:
- Check increment document for completed steps
- Verify artifacts from dependencies exist
- Ensure project is in expected state

**If dependencies not met**: Stop and resolve before proceeding.

#### 3. Execute the Prompt

Run the Claude Code CLI prompt:
- Use the exact prompt from the Build Plan
- Stay focused on the step's scope
- Don't expand beyond acceptance criteria

**During execution:**
- Follow the prompt's structure
- Create the specified artifacts
- Write tests as specified
- Handle errors appropriately

#### 4. Run Verification

After execution, verify completion:
- Run specified commands (tests, type checks)
- Perform manual checks if required
- Confirm all acceptance criteria met

**Verification checklist:**
```markdown
- [ ] All acceptance criteria met
- [ ] Verification commands pass
- [ ] No new warnings or errors
- [ ] Code is formatted
- [ ] No pending migrations (if Ash resources created)
```

**CRITICAL: After creating Ash resources with `data_layer: AshPostgres.DataLayer`:**
1. Run `mix ash.codegen --name <description>` to generate migrations
2. Run `mix ash.migrate` to apply migrations
3. Verify migrations applied: `mix ecto.migrations`

Forgetting migrations is a common error that causes runtime failures.

#### 5. Update Increment Document

Record progress in the increment:
- Mark step as complete
- Update "Artifacts Created" section
- Note any observations or issues
- Record actual time vs estimated (if tracking)

#### 6. Proceed or Handle Blocker

**If step succeeded**: Move to next step

**If blocked**:
- Document the blocker
- Determine if it can be resolved
- Create additional step if needed
- Or escalate for help

---

## Handling Situations

### When a Step Succeeds

```markdown
✓ Step 3: Create ExtractionJob Resource
  - Artifacts: lib/flow_studio/extraction/job.ex, migration, tests
  - Verification: mix test (14 tests, 0 failures)
  - Notes: Added extra validation for file size
```

Update increment document and proceed.

### When a Step Partially Succeeds

The core work is done but acceptance criteria aren't fully met:

1. **Document what's done** vs what's not
2. **Assess the gap** - is it critical or minor?
3. **Options**:
   - Complete the remaining work in this step
   - Create a follow-up step for the gap
   - Note as improvement opportunity

### When a Step Fails

The prompt execution didn't produce working results:

1. **Stop and analyze** - what went wrong?
2. **Document the failure** - error messages, symptoms
3. **Diagnose**:
   - Wrong approach? → Revise step
   - Missing dependency? → Add prerequisite step
   - External issue? → Escalate

4. **Don't proceed** until resolved

### When Blocked by External Factor

Dependencies outside your control:
- API not available
- Access not granted
- Waiting for decision

1. **Document the blocker** in increment
2. **Skip to independent steps** if possible
3. **Escalate** if blocking critical path
4. **Set reminder** to return when unblocked

### When Scope Creep Appears

You notice additional work needed:

1. **Don't expand the current step** - stay focused
2. **Note the additional work** in Observations
3. **Create new step** in Build Plan if critical
4. **Add to Improvement Opportunities** if not critical

---

## Progress Tracking

### During Execution

Update the increment document as you work:

```markdown
### Build Plan Progress

| Step | Status | Duration | Notes |
|------|--------|----------|-------|
| Step 1: Setup | ✓ Complete | 45m | - |
| Step 2: Resource | ✓ Complete | 1.5h | Added extra validations |
| Step 3: GenServer | ▶ In Progress | - | - |
| Step 4: API | ○ Pending | - | - |
```

### Artifacts Created

Keep the artifacts list updated:

```markdown
### Artifacts Created

- [x] `lib/flow_studio/extraction/job.ex` - ExtractionJob resource
- [x] `priv/repo/migrations/20241230_create_extraction_jobs.exs`
- [x] `test/flow_studio/extraction/job_test.exs`
- [ ] `lib/flow_studio/extraction/extractor.ex` - In progress
```

### End of Deliver Phase

When all steps complete:

1. **Update Status** to "Evaluate"
2. **Write Summary** in Deliver section
3. **Ensure all artifacts linked**
4. **Handoff** to Reviewer Agent

---

## Execution Modes

### Normal Execution

Execute steps sequentially, one at a time:
1. Complete step fully
2. Verify
3. Update document
4. Move to next

Best for: Most situations, learning new codebase

### Parallel Execution

Execute independent steps simultaneously:
- Identify steps with no dependencies on each other
- Run in parallel
- Sync at dependency points

Best for: Steps that are truly independent (e.g., 3a and 3b both depend on 2 but not on each other)

---

## Improvement Phase Execution

When executing Improvement Plan (Step 9 of implementing-features):

Same process, but:
- **Input**: Improvement Plan (not Build Plan)
- **Focus**: Refinement, not new functionality
- **Quality bar**: Higher - addressing known issues
- **Scope**: Approved improvements only

---

## Deliverables

At end of building:

### Deliver Phase Output

1. **Working artifacts** - Code, tests, docs as specified
2. **Updated increment document** with:
   - Completed Build Plan steps
   - Artifacts Created (with links)
   - Summary of what was delivered
3. **Status** changed to "Evaluate"

### Improve Phase Output

1. **Refined artifacts** - Improvements executed
2. **Updated increment document** with:
   - Completed improvement steps
   - Artifact Improvements section filled
   - Process Improvements noted
3. **Status** ready for final review

---

## Validation Checklist

Before marking Deliver/Improve complete:

**All Steps:**
- [ ] Every step in plan attempted
- [ ] Blockers documented and resolved (or noted)
- [ ] Skipped steps have justification

**Quality:**
- [ ] All tests pass
- [ ] No new warnings
- [ ] Code formatted
- [ ] Type checking passes

**Documentation:**
- [ ] Artifacts Created updated
- [ ] Summary written
- [ ] Observations noted
- [ ] Status updated

**Handoff:**
- [ ] Ready for reviewer
- [ ] Increment document is current
- [ ] No loose ends undocumented
