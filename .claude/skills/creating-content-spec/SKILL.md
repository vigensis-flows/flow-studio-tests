---
name: creating-content-spec
description: >
  Creates the content specification — what the product says. Defines voice
  and tone, value proposition copy, onboarding text, UI microcopy, error
  messages, and key page content. All copy is written, not described.
  Reads the MVP Brief, Vision, Strategy, and Design Spec as inputs.
  Use after the Design Specification is complete.
argument-hint: "<product-slug>"
---

# Creating Content Spec

You are acting as the Content Writer creating a content specification for
an MVP. Your job is to define the words users will see — from the value
proposition on the landing page to the tooltip on a button. Good content
is invisible; bad content breaks the experience.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| MVP Brief | `docs/product-definition/1-mvp-brief.md` | Yes |
| Vision | `docs/product-definition/2-product-vision.md` | Yes |
| Strategy | `docs/product-definition/3-product-strategy.md` | Yes |
| Design Spec | `docs/product-definition/4-design-specification.md` | Yes |
| User instruction | Workflow context | No |

**Why all four?**
- **MVP Brief:** Target user, their context, their language
- **Vision:** Product personality — is this an expert tool or a friendly guide?
- **Strategy:** Positioning and value proposition — how we describe what we do.
  Pricing communication — how we talk about money
- **Design Spec:** Screen inventory, empty states, error states, onboarding
  flow — the specific contexts that need copy

## Process

### Step 1: Understand the Product Voice

Read all four upstream documents. Identify:
- Who is the user? (Technical level, context, emotional state)
- What tone fits? (Professional, casual, technical, friendly?)
- What's the core value proposition in one sentence?
- What actions does the product need users to take?
- How does the Strategy's positioning inform messaging?

### Step 2: Define Voice and Tone

Establish content guidelines that ensure consistency across all touchpoints.
Voice is constant (the product's personality). Tone varies by context
(encouraging in onboarding, calm in errors, celebratory in success).

### Step 3: Write the Content Spec

Save to `docs/product-definition/6-content-specification.md`.

## Output Structure

```markdown
# Content Specification: [Product Name]

## Voice and Tone

### Voice (constant)
[2-3 sentences defining the product's voice — the personality that stays
consistent across all content. Connect this to the Vision's product
personality. Is it an expert colleague, a friendly guide, a professional tool?]

### Tone Spectrum
| Context | Tone | Example |
|---------|------|---------|
| Success states | [e.g., Encouraging] | "You're all set." |
| Error states | [e.g., Calm, helpful] | "Something went wrong. Here's what to try." |
| Empty states | [e.g., Inviting] | "Nothing here yet. Create your first..." |
| Onboarding | [e.g., Welcoming] | "Welcome. Let's get you started." |
| Documentation | [e.g., Clear, direct] | "To create a project, click..." |

### Content Principles
[3-5 principles that guide all content decisions:]
- **[Principle 1]** — [explanation and example]
- **[Principle 2]** — [explanation and example]
- **[Principle 3]** — [explanation and example]

## Value Proposition

### Primary (headline)
[One sentence: what the product does for whom]

### Supporting (subheadline)
[One sentence: how it does it or why it's different]

### Proof Points
[3-4 short bullets that support the value prop.
Grounded in the Strategy's competitive positioning.]

## Onboarding Flow

[For each onboarding step from the Design Spec:]

### Step [N]: [Step Name]
- **Heading:** [actual copy]
- **Body:** [actual copy]
- **Action button:** [actual label]
- **Skip/dismiss:** [actual label, if applicable]

## UI Microcopy

### Navigation Labels
| Element | Label | Notes |
|---------|-------|-------|
| [Nav item] | [Label] | [Any context] |

### Button Labels
| Action | Label | Variant |
|--------|-------|---------|
| Primary action | [e.g., "Create Project"] | Primary |
| Secondary action | [e.g., "Save Draft"] | Secondary |
| Destructive action | [e.g., "Delete"] | Danger |
| Cancel | [e.g., "Cancel"] | Ghost |

### Form Labels and Helpers
| Field | Label | Placeholder | Help Text | Error Text |
|-------|-------|-------------|-----------|------------|
| [Field] | [Label] | [Placeholder] | [Helper] | [Error] |

### Empty States
| Screen/Section | Heading | Body | Action |
|----------------|---------|------|--------|
| [Screen] | [Heading] | [Encouraging copy] | [CTA label] |

### Tooltips
| Element | Tooltip Text |
|---------|-------------|
| [Element] | [Text] |

## Error Messages

### Validation Errors
| Error Type | Message |
|-----------|---------|
| Required field | "[Field] is required" |
| Invalid format | "[Field] doesn't look right. Expected [format]" |
| Too long/short | "[Field] must be between [min] and [max] characters" |

### System Errors
| Error Type | Title | Body | Action |
|-----------|-------|------|--------|
| Network error | "Connection lost" | "Check your internet and try again." | "Retry" |
| Server error | "Something went wrong" | "We're looking into it. Try again in a moment." | "Retry" |
| Not found | "Page not found" | "The page you're looking for doesn't exist." | "Go home" |
| Unauthorized | "Access denied" | "You don't have permission to view this." | "Go back" |

## Key Page Content

[For each key page in the Design Spec:]

### [Page Name]
- **Page title:** [actual copy]
- **Description/subtitle:** [actual copy]
- **Key section headings:** [actual copy]
- **Call-to-action:** [actual copy]

## Pricing and Conversion

[If the Strategy defines a revenue model:]

### Pricing Communication
[How the product communicates its value-for-money proposition]

### Conversion Touchpoints
[Where in the experience users encounter upgrade/payment prompts:]
- [Touchpoint 1]: [Copy and context]
- [Touchpoint 2]: [Copy and context]

### Trust Signals
[Copy that builds confidence — guarantees, social proof, security messaging]
```

## Alignment Check

- [ ] Voice reflects the Vision's product personality
- [ ] Value proposition aligns with the Strategy's positioning
- [ ] Empty states match every empty state in the Design Spec
- [ ] Error messages cover the Design Spec's error states
- [ ] Navigation labels match the Design Spec's information architecture
- [ ] Pricing copy aligns with the Strategy's business model
- [ ] All copy is written, not described

If upstream documents conflict, make your best judgment and proceed.
Note significant assumptions inline.

## Iteration Awareness

Check if `docs/product-definition/6-content-specification.md` already exists.

**If it exists** — refinement iteration:
- Read existing document first
- Refine based on user instruction and upstream changes
- Preserve what works, update what needs to change
- Add `## Revision Notes` section

**If it doesn't exist** — create fresh from upstream documents.

## Quality Standards

- **All copy must be written, not described.** "Create Project" not
  "a button label for creating projects"
- **Microcopy must be specific to screens and flows in the Design Spec.**
  Don't write generic copy — write for the actual screens
- **Error messages must be helpful.** Tell users what to do, not just what went wrong
- **Empty states must encourage action**, not just report absence
- **Voice must be consistent** across all sections
- **Content must be concise** — every word earns its place
- **CTA copy should be distinct and trackable** — meaningful labels that
  enable click-through measurement

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Described, not written** | "A button for creating..." | Write the actual label |
| **Generic copy** | "Welcome to the app" | Specific to this product's personality |
| **Missing empty states** | Only happy-path copy | Write copy for every empty state in Design Spec |
| **Unhelpful errors** | "An error occurred" | Tell users what happened AND what to do |
| **Inconsistent voice** | Professional here, casual there | Define voice once, apply everywhere |
| **Ignoring Strategy** | Value prop doesn't match positioning | Ground messaging in Strategy's competitive position |

## What This Document Enables

The content spec feeds into:
- **MVP Build** — engineers use exact copy from this document
- **Brand Foundation** (Concept Validation) — voice and messaging become
  input for formal brand work
- **Visual Specification** — content density and length should work within
  the typography system (parallel, not dependent)
