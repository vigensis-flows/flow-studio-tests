---
description: Deactivate current agent/team and return to standard mode
---

# Deactivate Agent/Team

## Step 1: Check Current State

Determine if an agent or team is currently active in this conversation.

## Step 2: Show What's Being Deactivated

If an agent/team is active:
```
🔴 Deactivating: [Current Agent/Team Name]

Previously active:
[Show what was active]
```

If nothing is active:
```
📭 No active agent or team to deactivate.

You're already in standard Claude Code mode.
```

## Step 3: Confirm Deactivation

```
✅ Deactivated

You're now back in standard Claude Code mode.

To activate an agent or team:
  /activate <agent> - Activate single agent
  /team <team-name>   - Activate team
  /meeting <agents> - Call ad-hoc meeting
  /list               - See all available options
```

## Step 4: Return to Standard Mode

Resume normal Claude Code behavior without agent constraints. The agent is deactivated for this conversation only - other Claude instances are unaffected.
