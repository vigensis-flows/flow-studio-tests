---
name: reviewing-ux
description: Conducts comprehensive usability reviews of implementations and documentation. Use when user asks to "review the UX", "check usability", "audit the interface", "review user experience", or after completing a feature to verify it meets usability standards. Covers heuristics, information architecture, navigation, cognitive load, accessibility, and documentation quality.
---

# Reviewing UX

Conducts comprehensive usability reviews of implemented interfaces and documentation, identifying issues and providing actionable recommendations.

## Prerequisites

- Access to the implementation (running app or code)
- Optionally: Design documentation, user documentation

---

## Review Process

### Step 1: Define Scope

Clarify what's being reviewed:

| Scope Type | What to Examine |
|------------|-----------------|
| **Feature Review** | Single feature or workflow end-to-end |
| **Page Review** | Individual view/screen |
| **Flow Review** | Multi-step user journey |
| **Full Audit** | Entire application or major section |
| **Documentation Review** | User guides, help content, design specs |

### Step 2: Gather Context

Before reviewing, understand:
- **Who are the users?** Primary personas, experience levels
- **What are they trying to accomplish?** Key tasks and goals
- **What constraints exist?** Device types, accessibility requirements, performance targets

### Step 3: Conduct Review

Work through each evaluation dimension systematically. For implementations, interact with the actual interface. For documentation, read through the content.

### Step 4: Synthesize Findings

Organize issues by severity and provide actionable recommendations using the report template at the end of this document.

---

## Evaluation Dimensions

### 1. Nielsen's Usability Heuristics

Jakob Nielsen's 10 heuristics remain the foundation of usability evaluation. For each, assess compliance and note violations.

#### H1: Visibility of System Status

The system should keep users informed about what's happening through appropriate feedback within reasonable time.

**Check for:**
- [ ] Loading indicators for operations taking >1 second
- [ ] Progress indicators for multi-step processes
- [ ] Confirmation messages after actions complete
- [ ] Clear indication of current location in navigation
- [ ] Real-time validation feedback in forms
- [ ] Status indicators for async operations (saving, syncing)
- [ ] Empty states that explain what to do next

**Questions to ask:**
- Does the user always know what's happening?
- Can they tell if the system is processing their request?
- Do they know when an action succeeded or failed?

#### H2: Match Between System and Real World

The system should speak the user's language, using familiar words, phrases, and concepts rather than system-oriented terms.

**Check for:**
- [ ] Labels use user vocabulary, not technical jargon
- [ ] Icons match real-world conventions or are clearly labeled
- [ ] Information appears in natural, logical order
- [ ] Metaphors are appropriate and consistent
- [ ] Date/time formats match user expectations
- [ ] Units and measurements are familiar to users
- [ ] Error messages describe problems in user terms

**Questions to ask:**
- Would a non-technical user understand every label?
- Are concepts organized the way users think about them?
- Does terminology match what users call things in their domain?

#### H3: User Control and Freedom

Users often choose system functions by mistake. Provide a clearly marked "emergency exit" to leave unwanted states without extended dialogue.

**Check for:**
- [ ] Undo available for destructive actions
- [ ] Cancel option on all dialogs and processes
- [ ] Back navigation works predictably
- [ ] Users can escape from any state
- [ ] Confirmation required for irreversible actions
- [ ] Draft/autosave prevents data loss
- [ ] Bulk operations can be cancelled mid-process

**Questions to ask:**
- Can users recover from mistakes easily?
- Is there always a way to go back or cancel?
- Are users warned before irreversible actions?

#### H4: Consistency and Standards

Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.

**Check for:**
- [ ] Same action = same label throughout the app
- [ ] Visual patterns consistent across pages (buttons, forms, tables)
- [ ] Navigation behaves predictably
- [ ] Keyboard shortcuts follow platform conventions
- [ ] Icons mean the same thing everywhere
- [ ] Terminology consistent throughout
- [ ] Error handling follows same pattern everywhere

**Questions to ask:**
- Does the same thing look and behave the same way everywhere?
- Do patterns match what users expect from similar apps?
- Are there any inconsistencies that might confuse users?

#### H5: Error Prevention

Even better than good error messages is a careful design that prevents problems from occurring in the first place.

**Check for:**
- [ ] Input constraints prevent invalid data (e.g., date pickers vs. free text)
- [ ] Dangerous actions require confirmation
- [ ] Smart defaults reduce user decisions
- [ ] Form validation happens before submission
- [ ] Constraints are communicated upfront (password requirements, character limits)
- [ ] Common mistakes have guardrails
- [ ] Autocomplete/suggestions reduce typing errors

**Questions to ask:**
- What mistakes could users make, and how does the design prevent them?
- Are there slip-prone areas (small targets, adjacent destructive actions)?
- Could any errors be eliminated by better defaults or constraints?

#### H6: Recognition Rather Than Recall

Minimize user's memory load by making objects, actions, and options visible. Users should not have to remember information between screens.

**Check for:**
- [ ] Navigation options always visible (not hidden in menus)
- [ ] Recently used items easily accessible
- [ ] Related information displayed together
- [ ] Context preserved across screens
- [ ] Instructions visible when needed (not in tooltips user must hover)
- [ ] Search suggestions based on previous queries
- [ ] Form fields show examples or placeholders

**Questions to ask:**
- Does the user need to remember anything from previous screens?
- Are options visible, or must users recall what's available?
- Is help information available in context?

#### H7: Flexibility and Efficiency of Use

Accelerators—unseen by novice users—may speed up interaction for expert users. Allow users to tailor frequent actions.

**Check for:**
- [ ] Keyboard shortcuts for common actions
- [ ] Search/filtering for large lists
- [ ] Bulk operations available
- [ ] Customization options (layout, defaults)
- [ ] Quick actions for frequent tasks
- [ ] Power user features don't complicate novice experience
- [ ] Sensible defaults that can be overridden

**Questions to ask:**
- Can expert users work faster than novices?
- Are there shortcuts for frequent tasks?
- Does the interface scale from beginner to expert needs?

#### H8: Aesthetic and Minimalist Design

Dialogues should not contain irrelevant or rarely needed information. Every extra unit of information competes with relevant units.

**Check for:**
- [ ] Only essential information displayed by default
- [ ] Progressive disclosure for advanced options
- [ ] White space used effectively
- [ ] Visual hierarchy guides attention
- [ ] No decorative elements that distract
- [ ] Content-to-chrome ratio is high
- [ ] Rarely-used features are accessible but not prominent

**Questions to ask:**
- Can anything be removed without loss of function?
- Does every element earn its place on the screen?
- Is attention directed to what matters most?

#### H9: Help Users Recognize, Diagnose, and Recover from Errors

Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.

**Check for:**
- [ ] Error messages in plain language, not codes
- [ ] Errors identify what went wrong specifically
- [ ] Errors suggest how to fix the problem
- [ ] Error states are visually distinct but not alarming
- [ ] Errors appear near the source of the problem
- [ ] Form errors highlight which fields need attention
- [ ] Recovery path is clear

**Questions to ask:**
- When something goes wrong, does the user know exactly what and why?
- Is the solution obvious from the error message?
- Can users recover without starting over?

#### H10: Help and Documentation

Even though it's better if the system can be used without documentation, help should be easy to search, focused on user's tasks, list concrete steps, and not be too large.

**Check for:**
- [ ] Help is searchable
- [ ] Help is contextual (relevant to current task)
- [ ] Instructions are task-oriented, not feature-oriented
- [ ] Steps are concrete and actionable
- [ ] Help is concise, not overwhelming
- [ ] Tooltips and hints available where needed
- [ ] Onboarding guides new users effectively

**Questions to ask:**
- Can users find help when they need it?
- Is help focused on what users want to accomplish?
- Is the learning curve manageable?

---

### 2. Information Architecture

How information is organized, labeled, and structured affects findability and comprehension.

**Check for:**

#### Structure and Organization
- [ ] Content grouped logically from user perspective
- [ ] Hierarchy depth is manageable (3-4 levels max)
- [ ] Related items are near each other
- [ ] Categories are mutually exclusive (or clearly overlap if intentional)
- [ ] Most important/frequent items most accessible

#### Labeling
- [ ] Labels are descriptive and unambiguous
- [ ] Labels use user vocabulary
- [ ] Labels are consistent (same thing = same label)
- [ ] Abbreviations are avoided or explained
- [ ] Labels differentiate similar items clearly

#### Navigation
- [ ] Users can always tell where they are
- [ ] Users can always get back to where they came from
- [ ] Users can always get to the home/start
- [ ] Primary navigation is visible and stable
- [ ] Breadcrumbs or location indicators present for deep content
- [ ] Search available for large content sets

#### Findability
- [ ] Important items are discoverable (not buried)
- [ ] Multiple paths to important content (navigation + search + direct links)
- [ ] No dead ends
- [ ] Cross-linking between related content

**Questions to ask:**
- Could a new user find [key feature] without guidance?
- Does the structure match how users think about the domain?
- Are labels clear enough to make navigation decisions?

---

### 3. Interaction Design & User Flows

How users accomplish tasks through sequences of actions.

**Check for:**

#### Task Flows
- [ ] Primary tasks are achievable in minimum steps
- [ ] Steps follow logical order
- [ ] No unnecessary steps or screens
- [ ] Progress is visible in multi-step flows
- [ ] Users can go back and edit previous steps
- [ ] State is preserved when navigating away and back

#### Form Design
- [ ] Fields in logical order
- [ ] Required vs. optional fields clearly indicated
- [ ] Labels above or beside fields (not placeholder-only)
- [ ] Field types match expected input (date picker, dropdown, etc.)
- [ ] Validation happens inline, not just on submit
- [ ] Error messages appear near the problematic field
- [ ] Tab order is logical
- [ ] Smart defaults reduce input needed

#### Interactive Elements
- [ ] Clickable elements look clickable (affordance)
- [ ] Touch targets are large enough (44px minimum)
- [ ] Hover states indicate interactivity
- [ ] Disabled states are visually distinct and explained
- [ ] Focus states visible for keyboard navigation
- [ ] Feedback for all interactions (click, hover, focus)

#### Responsiveness
- [ ] Layout adapts to screen sizes (mobile to desktop)
- [ ] Touch-friendly on mobile devices
- [ ] Content remains readable at all sizes
- [ ] Essential functions accessible on all devices
- [ ] No horizontal scrolling on mobile

**Questions to ask:**
- What's the minimum number of steps to complete [key task]?
- Are there any unnecessary friction points?
- Does the flow handle errors gracefully?

---

### 4. Visual Usability

How visual design supports or hinders usability.

**Check for:**

#### Visual Hierarchy
- [ ] Most important information is most prominent
- [ ] Clear distinction between primary and secondary actions
- [ ] Grouping uses proximity and borders effectively
- [ ] Eye flow guided naturally through the layout
- [ ] Typography hierarchy (headings, body, captions) is clear

#### Consistency
- [ ] Color usage is consistent and meaningful
- [ ] Spacing is consistent (using a spacing scale)
- [ ] Typography is consistent (limited font sizes/weights)
- [ ] Component styles are uniform
- [ ] Iconography style is unified

#### Readability
- [ ] Text has sufficient contrast (4.5:1 minimum)
- [ ] Font sizes are readable (16px minimum for body text)
- [ ] Line length is comfortable (50-75 characters)
- [ ] Line height is adequate (1.4-1.6)
- [ ] Adequate spacing between text blocks

#### Density and White Space
- [ ] Interface is not cluttered
- [ ] White space provides breathing room
- [ ] Information density matches user needs (not overwhelming)
- [ ] Important actions have visual prominence

**Questions to ask:**
- Where does the eye go first? Is that the right place?
- Is anything competing for attention unnecessarily?
- Can users quickly scan and find what they need?

---

### 5. Cognitive Load Assessment

Mental effort required to use the interface.

**Check for:**

#### Reducing Intrinsic Load
- [ ] Complex tasks broken into manageable steps
- [ ] Progressive disclosure for advanced options
- [ ] Sensible defaults reduce decisions needed
- [ ] Similar items grouped to reduce scanning

#### Reducing Extraneous Load
- [ ] No irrelevant information on screen
- [ ] No unnecessary animations or movement
- [ ] Consistent patterns reduce learning
- [ ] Instructions appear when/where needed

#### Memory and Recall
- [ ] Users don't need to remember info between screens
- [ ] Context preserved during multi-step processes
- [ ] Recent/frequent items easily accessible
- [ ] Options visible rather than recalled

#### Decision Complexity (Hick's Law)
- [ ] Limited choices presented at once (5-7 max)
- [ ] Clear distinction between options
- [ ] Recommended options highlighted
- [ ] Less common options de-emphasized or hidden

**Questions to ask:**
- How much does the user need to think vs. just do?
- What could be eliminated without losing value?
- Are users forced to make unnecessary decisions?

---

### 6. Accessibility Baseline

Minimum accessibility for inclusive design (WCAG essentials).

**Check for:**

#### Perceivable
- [ ] Images have alt text
- [ ] Color is not the only means of conveying information
- [ ] Text contrast meets 4.5:1 ratio
- [ ] Text can be resized to 200% without breaking
- [ ] Videos have captions (if applicable)

#### Operable
- [ ] All functions accessible via keyboard
- [ ] No keyboard traps
- [ ] Focus order is logical
- [ ] Focus indicators are visible
- [ ] No time limits (or adjustable)
- [ ] No content that flashes more than 3 times per second

#### Understandable
- [ ] Language is set on page
- [ ] Navigation is consistent
- [ ] Error identification is clear
- [ ] Labels and instructions are clear

#### Robust
- [ ] Valid HTML
- [ ] ARIA labels used appropriately (not excessively)
- [ ] Works with assistive technologies

**Questions to ask:**
- Could a user navigate this with keyboard only?
- Could a user with low vision read this content?
- Are there any barriers for users with disabilities?

---

### 7. Documentation Usability

Quality of user-facing documentation (guides, help content, design specs).

**Check for:**

#### User Documentation
- [ ] Task-oriented (focuses on what users want to do)
- [ ] Scannable (headings, lists, short paragraphs)
- [ ] Complete but concise (no unnecessary detail)
- [ ] Uses user vocabulary (not internal jargon)
- [ ] Includes examples and screenshots where helpful
- [ ] Organized by user goals, not features
- [ ] Kept up-to-date with product changes
- [ ] Searchable and well-indexed

#### In-App Help
- [ ] Tooltips are helpful, not just restating labels
- [ ] Onboarding introduces key concepts progressively
- [ ] Help links go to relevant content
- [ ] Error messages include recovery instructions

#### Design Documentation
- [ ] Design rationale is captured
- [ ] Patterns are documented for consistency
- [ ] Edge cases are considered
- [ ] Accessibility requirements noted
- [ ] Content guidelines provided

**Questions to ask:**
- Could a new user learn from this documentation?
- Is the documentation findable when needed?
- Does documentation match current product behavior?

---

### 8. Technology-Specific Considerations (Phoenix LiveView)

While users don't care about technology, certain implementation choices create UX risks or opportunities.

**LiveView Opportunities (Leverage):**
- [ ] Real-time validation provides instant feedback
- [ ] Optimistic UI updates feel responsive
- [ ] Live updates keep shared data in sync
- [ ] Server-side rendering ensures fast initial load
- [ ] No page refreshes for interactions (SPA-like feel)

**LiveView Risks (Watch for):**
- [ ] Loading states during async operations
- [ ] Latency feedback on slow connections
- [ ] State preservation on navigation
- [ ] Large list performance (should use streams)
- [ ] Form recovery on connection loss
- [ ] Focus management after dynamic updates
- [ ] Screen reader announcements for live updates

**Check for:**
- [ ] Loading indicators appear for all async operations
- [ ] Skeleton loaders or spinners prevent layout shift
- [ ] Optimistic updates have fallback for failures
- [ ] Streams used for large/dynamic lists
- [ ] Focus is managed correctly after DOM updates
- [ ] Live regions announce important updates to screen readers
- [ ] Debounce/throttle prevents jittery updates
- [ ] Disconnection/reconnection handled gracefully

**Questions to ask:**
- What happens on slow connections?
- What happens if the server is briefly unavailable?
- Do real-time updates help or distract users?

---

## Severity Rating Scale

Rate each issue found:

| Severity | Description | Action |
|----------|-------------|--------|
| **Critical** | Prevents task completion or causes data loss | Fix immediately |
| **High** | Major friction, users likely to abandon task | Fix before release |
| **Medium** | Noticeable friction, workarounds exist | Fix in next iteration |
| **Low** | Minor annoyance, polish item | Fix when convenient |

---

## Review Report Template

```markdown
# UX Review: [Feature/Page/Flow Name]

**Reviewer:** Design Shaper
**Date:** [Date]
**Scope:** [Feature Review / Page Review / Flow Review / Full Audit / Documentation Review]

## Context

**Target Users:** [Who is this for?]
**Key Tasks:** [What are users trying to accomplish?]
**Review Method:** [Implementation review / Documentation review / Both]

## Executive Summary

[2-3 sentence overall assessment. Is this ready for users? What's the most important thing to address?]

**Overall Usability Score:** [Strong / Acceptable / Needs Work / Critical Issues]

## Critical Issues

[Issues that must be fixed before release]

### Issue 1: [Descriptive Title]
- **Location:** [Where in the interface / Which document]
- **Heuristic:** [Which principle is violated]
- **Problem:** [What's wrong and why it matters]
- **Impact:** [How does this affect users?]
- **Recommendation:** [Specific actionable fix]

## High Priority Issues

[Issues that significantly impact usability]

### Issue 2: [Descriptive Title]
...

## Medium Priority Issues

[Issues that cause friction but have workarounds]

...

## Low Priority Issues

[Polish items for future consideration]

...

## Strengths

[What's working well - reinforce good patterns]

- [Strength 1]: [Where observed] - [Why it works]
- [Strength 2]: ...

## Recommendations Summary

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| Critical | [Issue] | [Fix] |
| High | [Issue] | [Fix] |
| ... | ... | ... |

## Next Steps

1. [First recommended action]
2. [Second recommended action]
3. [Third recommended action]
```

---

## Review Approach

Always perform the full review. AI review takes minutes — there is no time constraint that justifies skipping dimensions. Prioritize findings by severity for action, but don't skip the analysis.

---

## References

For detailed patterns, see:
- [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [Laws of UX](https://lawsofux.com/)
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [UX Design Institute Principles](https://www.uxdesigninstitute.com/blog/ux-design-principles-2026/)

Internal references:
- `docs/reference/phoenix-expert.md` - LiveView patterns
- `.claude/skills/designing-app-ui/SKILL.md` - App shell structure
- `.claude/skills/designing-forms/SKILL.md` - Form patterns
- `.claude/skills/designing-navigators/SKILL.md` - Navigation patterns
