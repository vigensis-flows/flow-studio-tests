---
description: Show currently active agent or team
---

# Conversation Status Check

## Step 1: Check Conversation State

Determine if an agent or team is currently active in this conversation based on whether persona instructions were loaded earlier in this conversation via `/activate`, `/team`, or `/meeting`.

If no agent is active:
```
📭 No Active Agent

You're currently running in standard Claude Code mode.

Available commands:
  /activate <agent> - Activate a single persona
  /team <team-name>  - Activate a team
  /meeting <personas> - Call ad-hoc meeting
  /list              - Show all available agents and teams
```

## Step 2: Display Active Configuration

If a persona or team is active in this conversation, display:

### For Single Agent:
```
✅ Active Agent

[emoji] Agent Name
📋 Description
📁 Domain: domain-name

Commands:
  /activate <other> - Switch to different agent
  /team <name>      - Switch to team mode
  /deactivate       - Clear active agent
```

### For Team:
```
✅ Active Team: [emoji] Team Name

👥 Team Members:
  [emoji] Agent 1 - Description
  [emoji] Agent 2 - Description
  ...

📋 Team Purpose: [description]

Commands:
  /activate <agent> - Switch to single agent
  /team <other>       - Switch to different team
  /deactivate        - Clear active team
```

## Step 3: Confirm Persistence

Remind the user:
```
💡 This agent/team is active for this conversation and will continue
   responding to all your messages until you explicitly switch or deactivate.

💡 Other Claude instances in different terminal windows can have different
   agents active simultaneously without conflicts.
```
