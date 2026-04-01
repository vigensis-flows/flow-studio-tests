---
name: creating-visual-design
description: >
  Creates the visual design specification — how the product looks. Defines
  the visual system: design direction, theme, color system, typography,
  spacing, component styling, and key screen compositions. Translates the
  product's identity and UX structure into a concrete visual system that
  engineers can implement directly. Use after the Design Specification is complete.
argument-hint: "<product-slug>"
---

# Creating Visual Design

You are acting as the Visual Designer creating a visual design specification
for an MVP. Your job is to translate the product's identity and UX structure
into a concrete visual system that engineers can implement directly.

**This is not a brand guide.** Brand identity (logo, tagline, messaging
framework) is handled in Concept Validation. This document defines the
visual system for the product UI.

**This is not the Design Specification.** The Design Spec defines behavior
and structure. This document defines appearance — what the user sees,
not what the user does.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| MVP Brief | `docs/product-definition/1-mvp-brief.md` | Yes |
| Vision | `docs/product-definition/2-product-vision.md` | Yes |
| Design Spec | `docs/product-definition/4-design-specification.md` | Yes |
| User instruction | Workflow context | No |

**Why these three?**
- **MVP Brief:** Target user expectations (enterprise polish vs startup energy)
- **Vision:** Product personality (professional, approachable, technical, warm)
- **Design Spec:** Screen inventory and states that need styling

**Explicitly NOT inputs:** Strategy (business model doesn't affect visuals)
and Content Spec (content doesn't affect visual system — they're parallel).

## Context: Default UI Stack

The default stack is **DaisyUI + Tailwind CSS** rendered via Phoenix LiveView.
Adapt for other stacks if the MVP Brief or user instruction indicates otherwise.

**DaisyUI-First Rule:** Use DaisyUI component classes before Tailwind utilities.
Custom CSS is a last resort — only when DaisyUI + Tailwind genuinely cannot
express the design intent.

## Process

### Step 1: Understand the Product

Read the MVP Brief, Vision, and Design Spec. Extract:
- Product personality from the Vision (professional, playful, technical, warm?)
- Target audience expectations (enterprise polish, startup energy, developer tools?)
- Key screens and states from the Design Spec
- Brand elements if any exist (colors, logos mentioned in any input)

### Step 2: Define the Visual System

Create a cohesive visual system that serves the product's personality
and audience. Every choice — color, type, spacing — must serve the
personality, not just "look nice."

### Step 3: Write the Visual Spec

Save to `docs/product-definition/5-visual-specification.md`.

## Output Structure

```markdown
# Visual Design Specification: [Product Name]

## Design Direction

[1-2 paragraphs describing the visual personality. What feeling should
the product evoke? What visual references or inspirations inform the
direction? Connect this to the Vision's product personality.]

## Theme

**Base theme:** [DaisyUI theme name, e.g., "light", "corporate", "business"]

### Theme Customization

[CSS custom properties or Tailwind config for the theme.
For DaisyUI stacks:]

```css
[data-theme="product-name"] {
  --p: [primary HSL];          /* Primary — main actions, brand accent */
  --pf: [primary focus HSL];
  --s: [secondary HSL];        /* Secondary — supporting elements */
  --sf: [secondary focus HSL];
  --a: [accent HSL];           /* Accent — highlights, notifications */
  --af: [accent focus HSL];
  --n: [neutral HSL];          /* Neutral — text, borders */
  --nf: [neutral focus HSL];
  --b1: [base-100 HSL];        /* Background levels */
  --b2: [base-200 HSL];
  --b3: [base-300 HSL];
  --in: [info HSL];
  --su: [success HSL];
  --wa: [warning HSL];
  --er: [error HSL];
}
```

**Rationale:** [Why this theme and customizations serve the product personality]

## Typography

| Role | Font | Weight | Size | Line Height | Usage |
|------|------|--------|------|-------------|-------|
| Page Title | ... | ... | ... | ... | Main headings |
| Section Title | ... | ... | ... | ... | Card/section headings |
| Body | ... | ... | ... | ... | Default text |
| Small | ... | ... | ... | ... | Captions, labels, metadata |
| Code | ... | ... | ... | ... | Code blocks, technical content |

**Font Stack:** [Tailwind font family classes or custom fonts]

## Spacing System

| Context | Value | Class |
|---------|-------|-------|
| Component padding | ... | p-4 |
| Section gap | ... | gap-6 |
| Card padding | ... | p-6 |
| Form field gap | ... | space-y-4 |
| Page margin | ... | px-6 lg:px-8 |

## Component Styling

### Buttons
[DaisyUI button classes for primary, secondary, ghost actions. Size conventions.]

### Cards
[Card styling — borders, shadows, hover states, padding.]

### Forms
[Input styling — borders, focus states, error states, label placement.]

### Navigation
[Nav styling — active states, hover states, mobile behavior.]

### Tables
[Table styling if relevant — striping, borders, responsive behavior.]

### Alerts & Feedback
[Toast/alert styling for success, error, warning, info states.]

## Key Screen Compositions

[For each key screen from the Design Spec, describe the visual composition:]

### [Screen Name]
- **Layout:** [Grid/flex structure, spacing]
- **Visual hierarchy:** [What draws the eye first, second, third]
- **Color usage:** [Which theme colors appear where]
- **Component variants:** [Which button/card/input variants are used]
- **Observable behavior:** [What user action on this screen indicates the visual design supports the experience]

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| Mobile (<640px) | ... |
| Tablet (640-1024px) | ... |
| Desktop (>1024px) | ... |

## Dark Mode

[If applicable: how the theme adapts. Or explicitly state "MVP ships light mode only."]
```

## Alignment Check

- [ ] Visual direction reflects the Vision's product personality
- [ ] Component styling covers the components used in the Design Spec
- [ ] Key screen compositions match the Design Spec's screen inventory
- [ ] Typography and color choices serve the personality, not just aesthetics
- [ ] Every choice is expressible as Tailwind/DaisyUI classes (no abstract specs)

If upstream documents conflict, make your best judgment and proceed.
Note significant assumptions inline.

## Iteration Awareness

Check if `docs/product-definition/5-visual-specification.md` already exists.

**If it exists** — refinement iteration:
- Read existing document first
- Refine based on user instruction and upstream changes
- Preserve what works, update what needs to change
- Add `## Revision Notes` section

**If it doesn't exist** — create fresh from upstream documents.

## Quality Standards

- Every color, spacing, and typography choice must be expressible as Tailwind/DaisyUI classes
- No custom CSS unless DaisyUI + Tailwind cannot express the behavior
- Specific enough that two engineers would produce visually similar results
- Visual choices must serve the product personality, not just look "nice"
- Component styling must cover the components actually used in the Design Spec
- Each screen composition includes an observable behavior bullet
- Do not over-specify — experienced engineers handle implementation details

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Brand guide, not product spec** | Logo guidelines, brand values | Focus on UI visual system |
| **Abstract colors** | "Use a warm palette" | Specific HSL values |
| **Missing screen compositions** | Generic system, no applied examples | Style every key screen from Design Spec |
| **Ignoring personality** | Generic corporate look | Connect every choice to the Vision's personality |
| **Over-specification** | Pixel-perfect layouts | Define system, not every pixel |
| **Custom CSS everywhere** | Ignoring DaisyUI | DaisyUI class first, Tailwind second, CSS last |

## What This Document Enables

The visual spec feeds into:
- **MVP Build** — engineers implement the visual system directly
- **Content Specification** — content length and density should work within
  the typography and spacing defined here (parallel, not dependent)
- **Brand Foundation** (Concept Validation) — the visual system becomes input
  for formal brand work if the product proceeds
