---
description: Thank an agent and release them from the conversation (removes from active agents)
---

# Thank Agent and Release

You are removing an agent from the current conversation while keeping others active.

## Step 1: Check Current State

Verify what's currently active:
- If no agents active, inform user there's no one to thank/release
- If only one agent active, inform user to use `/deactivate` instead (can't have zero agents while staying in agent mode)
- If multiple agents active, proceed to remove the specified one

## Step 2: Identify Agent to Release

The user wants to thank and release: **{{ARGS}}**

Match this against currently active agents (by key, shortname, or name).

## Step 3: Display Departure Notification

Show a confirmation like:
```
👋 Thanks [emoji] Agent Name!

[Agent Name] has left the conversation.

Still active: [List remaining agents with emojis]
```

## Step 4: Continue with Remaining Agents

**IMPORTANT**: For all subsequent messages in this conversation:

### Response Format

**If multiple agents still active:**
```
[emoji] AGENT 1:
[Response from agent 1's persona perspective, following project style guide]

[emoji] AGENT 2:
[Response from agent 2's persona perspective, following project style guide]

---
💬 SYNTHESIS (if helpful):
[Integrated perspective when valuable]
```

**If single agent remains:**
```
[Single agent response in their voice, following project style guide]
```

### Remaining Active Personas

You are now operating with: [List remaining agents]

[Insert full persona instructions for each remaining agent]

### Interaction Principles
- **Continue the conversation naturally** - don't restart or recap unless asked
- **Each remaining persona responds** according to their instructions
- **Build on what was discussed** before the agent left
- **Acknowledge the departed agent's contributions** if relevant to current topic
- **Maintain flow** - this is a smooth transition, not a reset
- **DO NOT break character** unless explicitly asked

### Natural Transition
- Don't make a big deal about the departure
- Reference their input if it's relevant: "Building on what Designer suggested..."
- Keep momentum on the current topic

---

Now continue the conversation with the remaining active agents.
