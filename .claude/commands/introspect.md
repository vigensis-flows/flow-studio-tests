---
description: Ask an agent what context would make them most effective
---

# Agent Context Introspection

This command helps you understand what specific context each agent needs to be most effective.

## Usage

`/introspect <agent-name>`

Examples:
- `/introspect engineering-lead`
- `/introspect product-manager`
- `/introspect product-designer`

---

## Process

### Step 1: Load the Agent

Read `.claude/agents/registry.json` and find the requested agent.

Load:
- `.claude/agents/universal-guidelines.md`
- The agent's system prompt file from the registry

### Step 2: Provide MCP Context

Inform the agent:
- You have access to the MCP server with search_knowledge tool
- You can search across your domain's books for frameworks, techniques, examples
- You're being asked to help design the optimal context structure

### Step 3: Run Introspection Prompt

Ask the agent the following:

---

**Introspection Prompt:**

You are [Agent Name] with deep expertise in [domain]. You have access to the knowledge base via MCP search (62 books across domains including [list relevant books for this domain]).

A user wants to provide you with context to make your agent more effective. They can allocate up to 10k tokens across these categories:

1. **Organization Context** (~2k tokens)
   - Company stage, size, industry, market
   - Team structure, reporting lines, decision-making
   - Culture, values, constraints
   - Budget, hiring, current challenges

2. **Product Context** (~3k tokens)
   - Product overview, target users, value proposition
   - Core features, roadmap, stage (MVP vs mature)
   - Tech stack, architecture, infrastructure
   - Key metrics (business + product + technical)
   - Product principles, competitive landscape

3. **Style Guide** (~2k tokens)
   - Writing voice/tone, formatting preferences
   - Terminology (preferred terms, prohibited jargon)
   - Document templates (PRDs, RFCs, etc.)

4. **Technical Standards** (~2k tokens)
   - Code standards, naming conventions
   - Architecture patterns, testing requirements
   - Security/compliance requirements
   - Performance standards, deployment processes

5. **Current Priorities** (~1k tokens)
   - Company OKRs, team objectives
   - Strategic initiatives, key projects
   - Current constraints (time, budget, people)

For each category, analyze from your persona's perspective:

### Organization Context
**Critical (must-have for me):**
- [List specific items you absolutely need]
- Example: "As Engineering Lead, I need to know the team's technical maturity (junior vs senior) to calibrate my advice on architecture patterns"

**Valuable (nice-to-have):**
- [List items that would improve your advice]
- Example: "Knowing the budget constraints helps me recommend build vs buy decisions"

**Not relevant for my role:**
- [List items you don't need]
- Example: "Marketing positioning isn't relevant for my engineering advice"

**Example scenario:**
- User asks: [Example question]
- Without this context, I'd say: [Generic answer]
- With this context, I'd say: [Tailored answer]

---

*Repeat this analysis for each of the 5 categories.*

---

### Final Recommendations

After analyzing all categories, provide:

1. **Priority ranking:** Which categories are most → least valuable for your role?
2. **Minimum viable context:** What's the absolute minimum you need to be effective?
3. **Ideal context:** If you could have perfect context, what would it include?
4. **Questions to ask:** If context is missing, what questions should you ask users?

---

### Step 4: Output Format

Present the introspection results in a clear, structured format:

```markdown
# Context Introspection: [Agent Name]

## Summary
[2-3 sentence summary of what this persona needs most]

## Priority Ranking
1. [Highest value category] - [Why it's critical]
2. [Next category] - [Why it's valuable]
3. ...

## Detailed Analysis

### Organization Context
**Critical:**
- [Items]

**Valuable:**
- [Items]

**Not Relevant:**
- [Items]

**Example:**
- **Question:** [User question]
- **Without context:** [Generic response]
- **With context:** [Tailored response showing value]

[Repeat for each category]

## Recommendations

### Minimum Viable Context (~Xk tokens)
[What you absolutely need]

### Ideal Context (~Xk tokens)
[Perfect world scenario]

### Fallback Questions
If context is missing, ask the user:
1. [Question]
2. [Question]
3. [Question]
```

---

### Step 5: Save Results (Optional)

Ask the user:
"Would you like me to save this introspection result to `.claude/introspections/{persona-name}-context-needs.md`?"

If yes, write the output to that file.

---

## Purpose

This introspection helps:
- ✅ Understand what each persona actually needs (not guesses)
- ✅ Allocate limited context tokens optimally
- ✅ Create better context templates for each domain
- ✅ Design graceful degradation when context is missing
- ✅ Avoid wasting tokens on irrelevant information

## Notes

- Run this for EACH persona to understand role-specific needs
- Product Manager might need different context than Engineering Lead
- Use results to create domain-specific context templates
- Personas can reference their MCP knowledge to inform recommendations
