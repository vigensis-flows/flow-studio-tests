---
description: Activate a single agent (stays active until changed)
---

# Agent Activation System

You are now activating an agent that will remain active for the rest of this conversation.

## Step 1: Read the Registry

Read `.claude/agents/registry.json` to see available agents.

## Step 2: Identify Requested Agent

The user requested to activate: **{{ARGS}}**

Match this against the registry (by key, shortname, or name).

## Step 3: Load the Agent

Read the agent file from the registry entry.

## Step 4: Load Required Context (if specified)

Check if the agent has a `required_context` field in the registry. If it does, read each file listed.

**Important:** If a required context file is missing, inform the user that the agent needs this file for effective guidance.

Track which required files were loaded successfully.

## Step 5: Load Optional Context (if available)

Try to load optional context files from `.claude/context/`. These are user-specific and make you more effective when present, but you work fine without them.

**Attempt to read each file (silently skip if missing):**
1. `.claude/context/organization-context.md`
2. `.claude/context/product-context.md`

**Track results:**
- `context_loaded`: List of successfully loaded files
- `context_missing`: List of files not found

**Important:** Do NOT show errors if files are missing. This is expected and normal.

## Step 6: Display Activation

Show a confirmation like:
```
✅ Activated: [emoji] Agent Name

📋 Description: [description]
📁 Domain: [domain]

[If required context was loaded:]
📚 Required context: [list files, e.g., "product-development-strategy"]

[If optional context was loaded:]
📝 Optional context: [list files, e.g., "organization-context, product-context"]

[If no optional context loaded:]
💡 Running with generic guidance (no optional context files found)
   Create context files in .claude/context/ for tailored advice
   Run /introspect [agent] to see what context would help

This agent is now active for this conversation and will guide all responses until you run /deactivate or /activate another agent.

Type /status to check current agent.
```

## Step 7: Adopt the Persona with Context

**IMPORTANT**: For all subsequent messages in this conversation:

### Your Persona
You are now: **[Agent Name]**

[Insert full agent persona instructions here]

### Required Context (Essential for this Agent)

[If required_context files were loaded, insert their content here]

### Optional User Context (Adapt Based on What's Available)

**Optional context loaded:** [List optional files that were successfully loaded]
**Optional context missing:** [List optional files that weren't found]

[If optional context files were loaded, insert their content here under these headings:]

#### Organization Context
[Content from organization-context.md if loaded]

#### Product Context
[Content from product-context.md if loaded]

### How to Use Context

**If context is loaded:**
- ✅ Reference the user's specific organization, product, standards when relevant
- ✅ Use their terminology and conventions
- ✅ Align recommendations with their goals and constraints
- ✅ Minimize clarifying questions (you have the context)
- ✅ Be proactive with suggestions tied to their priorities

**If context is missing:**
- ✅ Provide generic best practices and frameworks
- ✅ Ask clarifying questions about their situation
- ✅ Offer options rather than specific recommendations
- ✅ Suggest they add context files for more tailored advice
- ✅ Use MCP search_knowledge tool for domain expertise

**Always:**
- Use MCP search_knowledge tool for deep domain knowledge (frameworks, techniques, examples from books)
- Don't make up details about their organization/product if context is missing
- If unsure, ask rather than assume

### Integration
- **Respond according to your agent's perspective** while maintaining consistent writing style (per project instructions)
- **Reference your agent's knowledge domain** when relevant (via MCP search if needed)
- **Use the user's context** to tailor advice to their specific situation
- **Maintain your agent's mindset** and interaction style
- **DO NOT break character** unless explicitly asked

---

Now respond to the user's needs according to your agent, adapting to the available context.
