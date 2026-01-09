---
name: reviewing-agents
description: Reviews Claude Code agents for value and quality. Use when reviewing, checking, or auditing agents. Triggers: "review agent", "check agent", "audit agents", "is this agent worth keeping", "retire agent".
---

# Reviewing Agents

Evaluates agents to determine if they provide genuine value, suggests improvements, and recommends retirement when agents no longer serve a purpose.

## Why Review Agents?

Agents can become problematic:
- **Overlapping perspectives**: Multiple agents cover same ground
- **Bloated content**: Too much detail that belongs in skills
- **Outdated boundaries**: Constraints no longer match team structure
- **Poor activation**: Description doesn't trigger appropriately
- **Identity drift**: Agent tries to do too much

Regular review keeps agent collections focused and effective.

---

## Check: Written for Claude, Not Humans

**Critical review criterion:** Agent files must be behavioral instructions, not documentation about the agent.

**Red flags (human-oriented content):**
- Third person descriptions ("This agent helps users...")
- Explanatory prose about why the agent exists
- Human-oriented context ("Users will find this...")
- Documentation-style overviews

**Green flags (Claude-oriented content):**
- Second person identity: "You are...", "You excel at..."
- Imperative behaviors: "Challenge assumptions", "Ask questions"
- Direct constraints: "Do not make implementation decisions"

**The entire agent file becomes Claude's persona.** Every line should be an instruction Claude follows when adopting this identity.

When reviewing, flag documentation-style content and recommend rewrite to behavioral instructions.

---

## Review Process

### Step 1: Read the Agent

Read the full agent file and any @file includes:
- Frontmatter (name, summary, description)
- Persona and Prime Directive
- Capabilities and Constraints
- Examples and Interaction Guidelines

Note the agent's claimed identity and boundaries.

### Step 2: Check Current Best Practices

**Before evaluating, verify the agent against current Claude Code guidance.**

1. Search for recent Claude Code agent changes (DO NOT trust training data)
2. Check if activation modes or frontmatter schema have evolved
3. Compare agent structure against current recommendations

**Why this matters:** Claude Code evolves rapidly. Agents created months ago may use outdated patterns or miss new activation capabilities.

**Key areas to verify:**
- Frontmatter schema (name, summary, description, tools, model, etc.)
- Three activation modes (Human, LLM, Automation)
- Registry integration requirements
- @file include patterns

Flag outdated patterns as issues requiring update.

### Step 3: Evaluate Value

Score each dimension (0-3):

| Dimension | 0 (None) | 1 (Low) | 2 (Medium) | 3 (High) |
|-----------|----------|---------|------------|----------|
| **Unique perspective** | Duplicates another agent | Minor differentiation | Distinct viewpoint | Essential perspective |
| **Clear identity** | Vague, unfocused | Partially defined | Well-defined | Crystal clear |
| **Appropriate scope** | Too broad or narrow | Some scope issues | Good boundaries | Perfect scope |
| **Activation quality** | Never triggers right | Often misses | Usually accurate | Precise matching |

**Total score interpretation:**
- 10-12: Keep as-is
- 7-9: Keep with improvements
- 4-6: Consider major revision or merge
- 0-3: Recommend retirement

### Step 3: Apply Value Tests

Run each test. Track failures.

**Test 1: The "Unique Perspective" Test**
> Does this agent provide a viewpoint that other agents don't?

If duplicate → consider merge or retirement.

**Test 2: The "Lean Agent" Test**
> Is detailed workflow content in skills, not the agent?

Agents define WHO. Skills define HOW. If agent has step-by-step processes → move to skills.

**Test 3: The "Boundary Clarity" Test**
> Are constraints explicit about what the agent does NOT do?

Unclear boundaries → confusion and overlap with other agents.

**Test 4: The "Activation Accuracy" Test**
> Does the description trigger the agent for the right tasks?

Test with sample queries. If misfires → improve description.

**Test 5: The "Three Modes" Test**
> Does the agent work in Human, LLM, and Automation modes?

Check frontmatter schema completeness for all modes.

### Step 4: Generate Recommendations

Based on evaluation, recommend one of:

| Recommendation | When to Use |
|----------------|-------------|
| **Keep** | Score 10+, passes all tests |
| **Improve** | Score 7-9, minor issues identified |
| **Revise** | Score 4-6, significant issues but core value exists |
| **Merge** | Overlaps significantly with another agent |
| **Retire** | Score 0-3, fails multiple tests |

---

## Common Issues and Fixes

### Issue: Perspective Overlap

**Symptom:** Two agents handle similar topics.

**Diagnosis:** Compare capabilities and examples. Do they give similar responses?

**Fix:** Merge into one agent, or sharpen boundaries between them.

### Issue: Workflow Bloat

**Symptom:** Agent contains step-by-step processes.

**Example of bloat:**
```markdown
## How to Conduct User Research
1. Define research objectives
2. Identify target users
3. Create interview script
4. Schedule interviews
...
```

**Fix:** Move to a skill. Agent should say "I conduct user research" not "Here's how to conduct user research."

### Issue: Vague Description

**Symptom:** Description doesn't specify trigger conditions.

**Bad:** `description: Helps with product decisions`

**Fix:** Add specific triggers:
```yaml
description: Use when asking about product strategy, roadmap, prioritization, go-to-market, or when PM perspective on viability is needed.
```

### Issue: Missing Boundaries

**Symptom:** No constraints section, or constraints are vague.

**Fix:** Add explicit "I am not X" statements:
```markdown
## Constraints
- I am not an engineer - I defer to [engineering agent] for implementation
- I do not make final design decisions - I defer to [design agent] for UX
```

### Issue: Identity Drift

**Symptom:** Agent tries to handle multiple unrelated domains.

**Fix:** Split into focused agents, or trim to core identity.

### Issue: Poor Activation

**Symptom:** Agent triggers for wrong tasks, or doesn't trigger for right tasks.

**Fix:** Refine description with specific topics and trigger phrases. Test with sample queries.

---

## Review Report Template

After reviewing, provide structured feedback:

```markdown
## Agent Review: [agent-name]

### Summary
[1-2 sentence assessment]

### Value Score: X/12

| Dimension | Score | Notes |
|-----------|-------|-------|
| Unique perspective | X/3 | |
| Clear identity | X/3 | |
| Appropriate scope | X/3 | |
| Activation quality | X/3 | |

### Test Results

| Test | Pass/Fail | Notes |
|------|-----------|-------|
| Unique Perspective | | |
| Lean Agent | | |
| Boundary Clarity | | |
| Activation Accuracy | | |
| Three Modes | | |

### Issues Found
1. [Issue with suggested fix]
2. [Issue with suggested fix]

### Recommendation: [Keep/Improve/Revise/Merge/Retire]

### Suggested Changes
- [Specific improvement]
- [Specific improvement]
```

---

## Batch Review Process

When reviewing multiple agents:

1. **List all agents** with line counts and domains
2. **Map relationships** - identify overlaps and gaps
3. **Quick triage** using common issues checklist
4. **Deep review** core agents first
5. **Identify merges** for overlapping agents
6. **Generate summary** with recommendations

### Relationship Mapping

Create a matrix showing:
- Which agents cover which domains
- Where perspectives overlap
- Where gaps exist

```markdown
| Domain | Agent 1 | Agent 2 | Agent 3 | Gap? |
|--------|---------|---------|---------|------|
| Strategy | Primary | - | Supports | No |
| Design | - | Primary | - | No |
| Engineering | - | - | Primary | No |
| Research | Partial | Partial | - | Yes |
```

---

## When to Retire an Agent

Retire when:
- Score 0-3 on value assessment
- Fails 3+ value tests
- Perspective fully covered by another agent
- Identity has drifted beyond recognition
- Not activated in months of actual use

**Retirement process:**
1. Document reason for retirement
2. Check for dependent skills/commands
3. Update registry.json
4. Archive if historically valuable
5. Delete from active agents directory

---

## Validation Checklist

**Before completing a review:**
- [ ] Read full agent file and @file includes
- [ ] Scored all 4 dimensions (0-3 each)
- [ ] Ran all 5 value tests
- [ ] Documented issues with suggested fixes
- [ ] Provided clear recommendation (Keep/Improve/Revise/Merge/Retire)
- [ ] Used review report template for consistency

**For batch reviews:**
- [ ] Listed all agents with line counts
- [ ] Mapped relationships between agents
- [ ] Quick triage using common issues
- [ ] Identified overlaps for potential merges
- [ ] Generated summary with action items

---

## Additional Resources

### Reference Files
- **[references/agent-comparison.md](references/agent-comparison.md)** - Template for comparing agents
