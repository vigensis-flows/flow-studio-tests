---
name: designing-app-ui
description: Designs app shell structure including header, footer, main content area, and sidebar panels. Use when creating new apps, redesigning layouts, or when user asks about app structure, navigation placement, or overall UI architecture.
---

# Designing App UI

Establishes consistent app shell patterns for Phoenix LiveView applications using DaisyUI components.

## App Shell Structure

```
+------------------------------------------+
|  HEADER (fixed, 64px)                    |
+--------+-------------------+-------------+
|        |                   |             |
| NAV    |   MAIN CONTENT    |  ASSISTANT  |
| (240px)|   (flex-grow)     |  (320px)    |
|        |                   |             |
+--------+-------------------+-------------+
|  FOOTER (fixed, 48px) - optional         |
+------------------------------------------+
```

## Implementation Pattern

### Root Layout

```heex
<main class="min-h-screen flex flex-col">
  <.header current_user={@current_user} />

  <div class="flex-1 flex">
    <.navigator current_path={@current_path} />

    <div class="flex-1 p-6 overflow-y-auto">
      <%= @inner_content %>
    </div>

    <.assistant context={@context} />
  </div>

  <.footer />
</main>
```

### Header Component

- Fixed height: 64px (`h-16`)
- Background: `bg-base-100` with bottom border
- Contents: Logo, navigation links, user menu
- Z-index: `z-50` to stay above content

### Navigator Panel

- Fixed width: 240px (`w-60`)
- Height: Full remaining (`h-[calc(100vh-64px)]`)
- Background: `bg-base-200`
- Scrollable: `overflow-y-auto`
- Collapsible on mobile: `hidden lg:block`

### Main Content Area

- Flex-grow: `flex-1`
- Padding: `p-6`
- Scrollable: `overflow-y-auto`
- Max-width constraints for readability

### Assistant Panel

- Fixed width: 320px (`w-80`)
- Collapsible: Can hide/show
- Context-aware: Content changes per page
- Position: `sticky top-0` or `fixed`

## Color Palette (DaisyUI)

| Purpose | Class | Usage |
|---------|-------|-------|
| Primary | `bg-primary text-primary-content` | Actions, links, highlights |
| Secondary | `bg-secondary text-secondary-content` | Secondary actions |
| Accent | `bg-accent text-accent-content` | Emphasis |
| Base | `bg-base-100/200/300` | Backgrounds |
| Neutral | `bg-neutral text-neutral-content` | Subtle elements |
| Success/Warning/Error | `bg-success/warning/error` | Status indicators |

## Typography

| Element | Classes |
|---------|---------|
| Page title | `text-2xl font-bold` |
| Section title | `text-xl font-semibold` |
| Subsection | `text-lg font-medium` |
| Body text | `text-base` |
| Caption | `text-sm text-base-content/70` |
| Code | `font-mono text-sm` |

## Spacing Scale

Use consistent spacing from Tailwind:
- `gap-2` (8px) - Tight grouping
- `gap-4` (16px) - Related items
- `gap-6` (24px) - Sections
- `gap-8` (32px) - Major sections

Padding/margins follow same scale: `p-2`, `p-4`, `p-6`, `p-8`.

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Stack to horizontal |
| `md` | 768px | Show secondary elements |
| `lg` | 1024px | Show navigator |
| `xl` | 1280px | Show assistant |
| `2xl` | 1536px | Max content width |

## Mobile Considerations

- Navigator: Drawer overlay on mobile (`drawer drawer-side`)
- Assistant: Full screen overlay or bottom sheet
- Touch targets: Minimum 44px
- Swipe gestures: Consider for navigation

## Validation Checklist

- [ ] Header present with navigation
- [ ] Navigator collapsible on mobile
- [ ] Main content scrollable
- [ ] Consistent spacing used
- [ ] Color palette from DaisyUI
- [ ] Responsive breakpoints applied
- [ ] Touch targets adequate for mobile
