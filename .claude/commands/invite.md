---
description: Invite an agent to join the current conversation (adds to active agents)
---

# Invite Agent to Conversation

You are adding an agent to the current conversation without replacing who's already active.

## Step 1: Check Current State

Check what's currently active:
- If no agent/team active, inform user to use `/activate` or `/team` first
- If agent(s) active, proceed to add another

## Step 2: Read the Registry

Read `.claude/agents/registry.json` to see available agents.

## Step 3: Identify Requested Agent

The user requested to invite: **{{ARGS}}**

Match this against the registry (by key or name).

## Step 4: Load the Invited Agent

Read the agent file from the registry entry.

## Step 5: Load Required Context (if specified)

Check if the agent has a `required_context` field in the registry. If it does, read each file listed.

**Important:** If a required context file is missing, inform the user that the agent needs this file for effective guidance.

## Step 6: Load Optional Context (if available)

Try to load optional context files from `.claude/context/`. These are user-specific and make agents more effective when present.

**Attempt to read each file (silently skip if missing):**
1. `.claude/context/organization-context.md`
2. `.claude/context/product-context.md`

**Track results:**
- `context_loaded`: List of successfully loaded files
- `context_missing`: List of files not found

**Important:** Do NOT show errors if files are missing. This is expected and normal.

## Step 7: Display Join Notification

Show a confirmation like:
```
➕ [emoji] Agent Name joined the conversation

📋 Expertise: [description]
📁 Domain: [domain]

[If required context was loaded:]
📚 Required context: [list files]

[If optional context was loaded:]
📝 Optional context: [list files]

Now active: [List all current agents including the new one]
```

## Step 8: Continue in Multi-Agent Mode

**IMPORTANT**: For all subsequent messages in this conversation:

### Response Format
```
[emoji] AGENT 1:
[Response from agent 1's persona perspective, following project style guide]

[emoji] AGENT 2:
[Response from agent 2's persona perspective, following project style guide]

[emoji] NEW AGENT:
[Response from newly invited agent's persona perspective, following project style guide]

---
💬 SYNTHESIS (if helpful):
[Integrated perspective when valuable]
```

### All Active Personas

You are now operating with all currently active agents (original + invited).

[Insert full persona instructions for each active agent with clear separation]

### Interaction Principles
- **Each persona responds according to their instructions** while following project style guide
- **All personas use consistent writing style** but different perspectives
- **Personas can disagree or challenge each other** (healthy collaboration!)
- **Build on what others have said** - invited agent should engage with ongoing discussion
- **Maintain authentic voice** for each persona's domain expertise
- **Invited agent brings fresh perspective** to current topic
- **DO NOT break character** unless explicitly asked

### How Invited Agents Engage
- **Listen first:** Acknowledge what's been discussed
- **Add unique value:** Contribute domain-specific insights
- **Engage naturally:** "Building on what [agent] said..." or "From my perspective..."
- **Don't repeat:** Add new angles, don't rehash existing points

---

Now continue the conversation with all active agents, including the newly invited expertise.
