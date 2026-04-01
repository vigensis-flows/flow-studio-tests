---
name: reviewing-agents
description: Reviews agent system prompts for quality, portability, and current best practices. Use when reviewing, checking, or auditing agents. Triggers: "review agent", "check agent", "audit agents", "is this agent good", "improve agent".
---

# Reviewing Agents

Evaluates agent system prompts against current best practices, suggests improvements, identifies overlaps, and recommends retirement when agents no longer serve a purpose.

## Review Process

### Step 1: Read the Agent

Read the full agent file:
- Frontmatter (name, summary, description, emoji, domain)
- All XML sections and their content
- Examples and knowledge references

Note the agent's claimed identity and boundaries.

### Step 2: Check Format Compliance

**The agent must use hybrid XML+markdown format.** Flag deviations.

| Check | Expected | Common Issue |
|-------|----------|-------------|
| Section delimiters | XML tags (`<role>`, `<constraints>`, etc.) | Pure markdown headers |
| Content within sections | Markdown (##, -, **bold**) | XML nesting |
| Section order | role, objective, instructions, capabilities, examples, knowledge, constraints | Constraints too early |
| Constraints placement | Last section | Mixed into middle |
| Tone/style | Inside `<role>` as Communication Style | Separate section |

### Step 3: Check Content Quality

**Written for models, not humans:**
- Second person identity: "You are...", "You excel at..."
- Imperative behaviors: "Challenge assumptions", "Ask questions"
- Positive framing: "Focus on X" not "Do not do Y"

**Red flags (human-oriented content):**
- Third person descriptions ("This agent helps users...")
- Explanatory prose about why the agent exists
- Documentation-style overviews

**Constraint framing:**
- Positive framing is the default ("Focus on prompt design")
- Negative framing reserved for hard safety boundaries only
- Generic expert deferral ("a product designer") not hardcoded names ("Design Shaper")

**Self-contained and portable:**
- No `@file` external references
- No platform-specific tool names (`search_assets`, `search_knowledge`)
- No hardcoded agent names in constraints
- Works if copied to Gemini Gem, OpenAI, or LangGraph

### Step 4: Score Value

Score each dimension (0-3):

| Dimension | 0 (None) | 1 (Low) | 2 (Medium) | 3 (High) |
|-----------|----------|---------|------------|----------|
| **Unique perspective** | Duplicates another agent | Minor differentiation | Distinct viewpoint | Essential perspective |
| **Clear identity** | Vague, unfocused | Partially defined | Well-defined | Crystal clear |
| **Appropriate scope** | Too broad or narrow | Some scope issues | Good boundaries | Perfect scope |
| **Activation quality** | Never triggers right | Often misses | Usually accurate | Precise matching |
| **Format compliance** | No XML, wrong order | Partial compliance | Minor deviations | Fully compliant |

**Total score interpretation:**
- 13-15: Keep as-is
- 10-12: Keep with minor improvements
- 6-9: Needs revision
- 0-5: Recommend major rewrite or retirement

### Step 5: Run Value Tests

**Test 1: Unique Perspective**
> Does this agent provide a viewpoint that other agents don't?

If duplicate -> consider merge or retirement.

**Test 2: Lean Agent**
> Is detailed workflow content in skills, not the agent?

Agents define WHO. Skills define HOW. If agent has step-by-step processes -> move to skills.

**Test 3: Portability**
> Would this agent work if copied to a different platform?

Check for @file references, tool-specific names, hardcoded agent names.

**Test 4: Example Quality**
> Does the agent include at least one good example with wrong-approach contrast?

Examples are more effective than rules. Missing examples is a significant quality gap.

**Test 5: Constraint Placement & Framing**
> Are constraints the last section? Do they use positive framing?

Constraints early in the prompt may be dropped by some models. Negative framing
("I am not X") is less effective than positive framing ("Focus on X").

**Test 6: Action Orientation**
> Does the agent have a "How You Act" section in instructions with tool-use behavior and reasoning protocol?

Agents without action orientation default to interrogating users instead of doing work. Check for: (1) concrete directives about researching before asking, (2) a reasoning protocol (steps the agent works through before responding), (3) an anchoring principle (one-liner decision heuristic at the end of instructions). Also check that Communication Style includes at least one interaction constraint (e.g., "one or two questions max per response").

### Step 6: Generate Recommendations

| Recommendation | When to Use |
|----------------|-------------|
| **Keep** | Score 13+, passes all tests |
| **Improve** | Score 10-12, minor issues |
| **Revise** | Score 6-9, significant issues but core value exists |
| **Merge** | Overlaps significantly with another agent |
| **Retire** | Score 0-5, fails multiple tests |

---

## Common Issues and Fixes

### Issue: Pure Markdown Format

**Symptom:** Agent uses `## Persona`, `## Constraints` without XML tags.

**Fix:** Convert to hybrid XML+markdown. Wrap sections in XML tags (`<role>`, `<objective>`, `<instructions>`, `<capabilities>`, `<examples>`, `<knowledge>`, `<constraints>`), keep markdown content inside.

### Issue: Tone as Separate Section

**Symptom:** Agent has `## Tone & Interaction Style` or `## Communication Style` as a standalone section.

**Fix:** Move into `<role>` as a `### Communication Style` sub-section. Tone is part of identity.

### Issue: Negative Constraint Framing

**Symptom:** Constraints say "I am not X" or "Do not Y."

**Example:**
```markdown
- I am not a developer - I will not write code
- Do not make implementation decisions
```

**Fix:** Reframe positively with generic deferral:
```markdown
Focus on [core domain]. When questions fall outside your domain,
acknowledge the boundary and suggest the user consult a relevant expert:
- Technical implementation -> a developer or engineering lead
- Design decisions -> a product designer
```

### Issue: External Dependencies

**Symptom:** Agent references `@.claude/agents/universal-interaction-patterns.md` or other @file includes.

**Fix:** Inline the relevant content. The agent must be self-contained for portability. Universal patterns should be embedded where needed, not referenced.

### Issue: Tool-Specific References

**Symptom:** Agent mentions `search_assets`, `search_knowledge`, `mcp__context7`, or similar.

**Fix:** Use generic framing: "When available, use expert knowledge tools to access deeper domain content."

### Issue: Hardcoded Agent Names

**Symptom:** Constraints reference specific agents: "defer to Design Shaper for UX."

**Fix:** Use generic role references: "defer to a product designer for UX."

### Issue: Missing Examples

**Symptom:** No `<examples>` section, or examples without wrong-approach contrast.

**Fix:** Add at least one example showing ideal behavior with a contrast showing what to avoid and why. Examples teach models more effectively than rules.

### Issue: Separate Prime Directive / Purpose

**Symptom:** Agent has `## Prime Directive` and `## Purpose` as separate sections.

**Fix:** Fold core mission into `<role>` (the identity statement) and `<objective>` (the outcome). Two sections cover what three used to.

### Issue: Missing Action Orientation

**Symptom:** Agent has no "How You Act" section. Instructions only cover when to ask questions and how to structure responses. Agent defaults to interrogating users instead of doing research and bringing insights.

**Fix:** Add a `### How You Act` subsection to `<instructions>` with three components:
1. Tool-use behavior — concrete directives about researching before asking (generic framing, no tool names)
2. Reasoning protocol — 4-6 steps the agent works through before responding
3. Anchoring principle — a memorable one-liner decision heuristic at the end

Also add at least one interaction constraint to Communication Style (e.g., "One or two questions max per response").

### Issue: Constraints Not Last

**Symptom:** `<constraints>` appears before `<examples>` or `<knowledge>`.

**Fix:** Move constraints to the final section. Research shows models may drop constraints placed too early, especially Gemini.

---

## Review Report Template

```markdown
## Agent Review: [agent-name]

### Summary
[1-2 sentence assessment]

### Value Score: X/15

| Dimension | Score | Notes |
|-----------|-------|-------|
| Unique perspective | /3 | |
| Clear identity | /3 | |
| Appropriate scope | /3 | |
| Activation quality | /3 | |
| Format compliance | /3 | |

### Test Results

| Test | Pass/Fail | Notes |
|------|-----------|-------|
| Unique Perspective | | |
| Lean Agent | | |
| Portability | | |
| Example Quality | | |
| Constraint Placement & Framing | | |

### Issues Found
1. [Issue with severity and suggested fix]
2. [Issue with severity and suggested fix]

### Recommendation: [Keep/Improve/Revise/Merge/Retire]

### Suggested Changes
- [Specific improvement with rationale]
- [Specific improvement with rationale]
```

---

## Batch Review Process

When reviewing multiple agents:

1. **List all agents** with line counts and domains
2. **Map relationships** — identify overlaps and gaps
3. **Quick triage** — check format compliance first (fastest filter)
4. **Deep review** core agents using full process above
5. **Identify merges** for overlapping agents
6. **Generate summary** with prioritized recommendations

### Relationship Matrix

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
- Score 0-5 on value assessment
- Fails 3+ value tests
- Perspective fully covered by another agent
- Identity has drifted beyond recognition
- Not activated in months of actual use

**Retirement process:**
1. Document reason for retirement
2. Check for dependent skills or team definitions
3. Remove from any team files in `.claude/teams/`
4. Archive if historically valuable
5. Delete from `.claude/agents/` directory

---

## Validation Checklist

**Before completing a review:**
- [ ] Read full agent file
- [ ] Checked format compliance (XML+markdown hybrid, section order)
- [ ] Checked content quality (model-oriented, positive framing, self-contained)
- [ ] Scored all 5 dimensions (0-3 each)
- [ ] Ran all 6 value tests
- [ ] Documented issues with suggested fixes
- [ ] Provided clear recommendation (Keep/Improve/Revise/Merge/Retire)
- [ ] Used review report template

**For batch reviews:**
- [ ] Listed all agents with line counts
- [ ] Mapped relationships between agents
- [ ] Quick triage on format compliance
- [ ] Identified overlaps for potential merges
- [ ] Generated summary with prioritized action items
