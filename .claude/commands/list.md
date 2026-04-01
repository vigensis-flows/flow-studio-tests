---
description: List all available agents and teams
---

# Available Agents & Teams

List available agents and teams by reading agent files and team definitions.

## Step 1: List Agents

Read all `.claude/agents/*.md` files and parse their YAML frontmatter to extract:
- `name` - agent identifier (e.g., "tech-smith")
- `summary` - brief description
- `emoji` - display emoji
- `domain` - knowledge domain

**Display format:**

## 👤 Available Agents

```
[emoji] agent-name
    Summary: brief description
    Domain: domain-name
    Activate: /activate agent-name

[Repeat for all agents]
```

## Step 2: List Teams

Read all `.claude/teams/*.json` files to get team definitions.

Each team file contains:
- `name` - display name
- `slug` - team identifier
- `members` - array of agent names
- `description` - team purpose
- `emoji` - display emoji

**Display format:**

## 👥 Available Teams

```
[emoji] team-slug
    Name: Team Name
    Members: agent-1, agent-2, agent-3
    Purpose: team description
    Activate: /team team-slug

[Repeat for all teams]
```

## 💡 Usage

**Single Agent Mode**:
```
/activate tech-smith
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
