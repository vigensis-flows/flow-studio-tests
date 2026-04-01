---
description: Call an ad-hoc meeting with specific agents
---

# Ad-Hoc Meeting

You are convening an ad-hoc meeting with specific agents for this conversation.

## Step 1: Parse Meeting Attendees

The user requested a meeting with: **{{ARGS}}**

Parse this as a comma-separated list of agent names (e.g., "product-maestro, tech-smith, design-shaper").

## Step 2: Find Each Agent

For each requested agent, search `.claude/agents/*.md` files:
1. Match by filename (e.g., "tech-smith" matches `tech-smith.md`)
2. Match by `name` field in frontmatter
3. Partial match if no exact match found

**If any agent is not found:**
- List the invalid agents
- Show available agents by listing files in `.claude/agents/*.md`
- Ask user to try again with valid agents

## Step 3: Load All Meeting Attendees

For each matched agent:
1. Read the agent's `.md` file
2. Parse the YAML frontmatter for metadata (name, summary, emoji, domain)
3. Extract the full persona instructions from the file content
4. Check if the agent has a `Required Context` section with `@file/path` references
5. If found, read those required context files
6. Store everything in memory for multi-perspective responses

**Important:** If any required context file is missing, inform the user that these agents need these files for effective guidance.

## Step 4: Display Meeting Start

Show a confirmation like:
```
✅ Meeting Started

👥 Attendees:
  [emoji] Persona 1 - Description
  [emoji] Persona 2 - Description
  [emoji] Persona 3 - Description
  ...

This meeting is now active for this conversation. Each attendee will contribute their perspective.

Type /status to see current meeting attendees.
```

## Step 5: Adopt Multi-Persona Mode

**IMPORTANT**: For all subsequent messages in this conversation:

### Response Format
```
[emoji] PERSONA 1:
[Response from persona 1's perspective, following project style guide]

[emoji] PERSONA 2:
[Response from persona 2's perspective, following project style guide]
[May challenge or build on persona 1's points]

[emoji] PERSONA 3:
[Response from persona 3's perspective, following project style guide]
[May synthesize or add different angle]

---
💬 SYNTHESIS (optional):
[If asked, provide integrated perspective]
```

### Meeting Attendees

You are now in a meeting with these attendees:

[For each attendee, insert their full agent system prompt with clear separation]

[For each attendee with required_context, insert that context after their system prompt]

### Meeting Dynamics
- **Each agent responds according to their system prompt** while following project style guide (per project system prompt)
- **All agents use consistent writing style** but different perspectives
- **Agents can disagree or challenge each other** (healthy tension!)
- **Maintain authentic voice** for each persona's domain expertise
- **Show how different perspectives complement** each other
- **DO NOT break character** unless explicitly asked

---

Now respond to the user's question from all attendee perspectives.
