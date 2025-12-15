---
description: List all available agents and teams
---

# Available Agents & Teams

Read `.claude/agents/registry.json` and display beautifully:

## 👤 Available Agents

```
[emoji] agent-key (shortname)
    Name: Full Agent Name
    Domain: domain-name
    Description: description
    Activate: /activate agent-key

[Repeat for all personas]
```

## 👥 Available Teams

```
[emoji] team-key
    Name: Team Name
    Members: Agent 1, Agent 2, Agent 3
    Purpose: team description
    Activate: /team team-key

[Repeat for all teams]
```

## 💡 Usage

**Single Agent Mode**:
```
/activate engineering-lead
```
→ All responses come from that agent's perspective

**Team Mode**:
```
/team trio
```
→ Multiple perspectives in each response

**Check Status**:
```
/status
```
→ See what's currently active

**Deactivate**:
```
/deactivate
```
→ Return to standard mode

---

✨ The active agent/team persists throughout your session until you switch!
