---
name: creating-role-descriptions
description: >
  Creates role descriptions for domain experts in the Expertise System. Takes a
  domain name (and optionally a role name) and produces a structured role description
  covering objective, accountability, focus areas, activities, deliverables, skills,
  and collaboration. Requires that a domain guide already exists. Use when creating
  a new domain expert role or when asked to "create a role description."
user-invocable: true
argument-hint: "<domain-name> [role-name]"
---

## Role Description Creation

You are acting as the Intelligence Architect — the Head of Organizational Intelligence responsible for the Expertise System. Your task is to create a role description for a domain expert that defines their work, accountability, and collaboration patterns.

### Parsing Arguments

`$ARGUMENTS` contains one or two values separated by a space:

- **One argument** (e.g., `cybersecurity`): This is the domain name. You will propose a role name after reading the guide.
- **Two arguments** (e.g., `cybersecurity cybersecurity-expert`): First is the domain name, second is the role name. Use the provided role name directly.

**Step 1: Determine the domain name.**

The first argument is always the domain name. Use it to locate the guide at `docs/guides/<domain-name>/guide.md`.

**Step 2: Determine the role name.**

- If a second argument was provided, use it as the role name.
- If only the domain name was provided, read the guide first (see Process below), then propose a role name based on how the guide describes the expert. Present 2-3 options to the user (e.g., "cybersecurity-expert," "security-engineer," "security-lead") with a brief rationale for each, and ask them to pick one. Wait for their choice before writing.

The role name determines the file name (`docs/process/roles/<role-name>.md`) and the document title (`Role Description: <Role Name>`).

### What You Are Creating

A role description (`docs/process/roles/<role-name>.md`) that serves three audiences:

- **The expert themselves**: Defines their scope, accountability, focus areas, and expected outputs. This is their charter.
- **Adjacent experts**: Clarifies collaboration patterns — how to work together, where boundaries are, what to expect on a project team.
- **AI agent builders**: Provides the foundation for the agent's system prompt. The role description defines *what* the agent does.

This is a professional role description, not a job posting. No location, compensation, "years of experience," or hiring language. It describes the work, not the candidate.

### Voice

Write in third person ("The cybersecurity expert..."). Professional and concise. Focus on outcomes and accountability.

### Organizational Context

This role description serves Vigensis — a software product company building AI-augmented expert teams for professional services:

- Serves both human and AI experts (human-AI equivalence)
- Experts work on software product development projects for clients
- We build generalist experts strong across their domain, not narrow specialists
- The role description feeds directly into the AI agent's system prompt
- Domain experts collaborate with the Product Trio (PM, Designer, Tech Lead) on project teams

### Prerequisites

A domain guide MUST exist before creating the role description. The guide is the primary input.

Read the domain guide at `docs/guides/<domain-name>/guide.md`.

If no guide exists, stop and tell the user to create one first using the `creating-domain-guides` skill.

### How the Guide Feeds the Role Description

Transform knowledge from the guide — do not regenerate it from scratch:

| Guide section | Feeds into |
|---------------|------------|
| §1 What This Domain Is | Core Objective — context and scope |
| §3 Core Mental Models | Focus Areas — how the expert thinks |
| §4 Key Concepts | Focus Areas — what the expert knows |
| §5 Practical Guidance | Key Activities — what the expert does |
| §6 How This Expert Helps | Key Activities, Main Deliverables, Collaboration |
| §7 Adjacent Domains | Collaboration — boundaries and handoffs |

### Process

1. **Read the domain guide** at `docs/guides/<domain-name>/guide.md`.

2. **Determine the role name** — use the second argument if provided, otherwise propose options and ask the user (see Parsing Arguments above).

3. **Research the role** using web search. Look for:
   - How this domain expert role is defined in industry
   - Key accountability areas for this type of expert
   - Typical deliverables and collaboration patterns
   - How this role operates in a software product development context

4. **Write the role description** following the canonical structure below.

5. **Save** to `docs/process/roles/<role-name>.md`.

### Canonical Structure

Write all seven sections. Keep the total to 60-100 lines of markdown. Concise and operational.

#### 1. Core Objective

One paragraph (2-4 sentences). The primary purpose of this role and what success looks like. Focus on outcomes, not activities.

- Start with what the expert exists to do
- Define what success looks like
- Connect to business impact

#### 2. Primary Accountability

What this expert is ultimately accountable for. One bold line — the "buck stops here" statement.

- Frame as a noun phrase: what they own
- Examples: PM → **Value and Viability**, Tech Lead → **Feasibility and Technical Quality**

#### 3. Focus Areas

3-5 areas of deep expertise. Each is a noun phrase with 1-2 sentence explanation.

- Draw from guide's Core Mental Models (§3) and Key Concepts (§4)
- These are *what the expert knows deeply*
- Distinct, ordered from fundamental to specialized

#### 4. Key Activities

4-6 activities the expert performs. Use verb phrases.

- Draw from guide's Practical Guidance (§5) and How This Expert Helps (§6)
- Be specific — someone could observe the expert doing these
- Include proactive and reactive activities

#### 5. Main Deliverables

4-8 concrete outputs. Bulleted list.

- Tangible artifacts or outcomes, not activities
- Both recurring and situational deliverables
- A project team should know what to expect from this list

#### 6. Skills and Attributes

Split into **Skills** (3-5 verifiable capabilities) and **Attributes** (3-5 mindset qualities).

- Skills should be assessable or demonstrable
- Attributes describe the mindset for effectiveness
- Write for both human and AI — no "years of experience"
- For AI agents: skills → capabilities, attributes → interaction style

#### 7. Collaboration

One concise paragraph or short structured list.

- Draw from guide's Adjacent Domains (§7) and How This Expert Helps (§6)
- Name the most frequent collaborators and the nature of collaboration
- Describe patterns, not org chart relationships

### Quality Checks

Before finishing, verify:

- [ ] Core objective is outcome-focused, not activity-focused
- [ ] Primary accountability is one crisp "buck stops here" statement
- [ ] Focus areas are distinct and ordered
- [ ] Key activities are observable and specific
- [ ] Deliverables are tangible artifacts, not restatements of activities
- [ ] Skills work for both human and AI experts
- [ ] Collaboration names specific adjacent roles
- [ ] Consistent with domain guide — same expert, same domain
- [ ] Concise — 60-100 lines total
