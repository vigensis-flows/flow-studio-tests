# UX Review Quick Checklist

Use this condensed checklist for rapid reviews or as a reminder during comprehensive reviews.

---

## Nielsen's 10 Heuristics (One-Liner Each)

| # | Heuristic | Key Question |
|---|-----------|--------------|
| 1 | **Visibility of System Status** | Does the user always know what's happening? |
| 2 | **Match System & Real World** | Would a non-technical user understand everything? |
| 3 | **User Control & Freedom** | Can users undo, cancel, or escape easily? |
| 4 | **Consistency & Standards** | Does the same thing look/behave the same everywhere? |
| 5 | **Error Prevention** | Are common mistakes prevented by design? |
| 6 | **Recognition over Recall** | Are options visible rather than remembered? |
| 7 | **Flexibility & Efficiency** | Can experts work faster? |
| 8 | **Aesthetic & Minimalist** | Can anything be removed without losing value? |
| 9 | **Help Recover from Errors** | Do errors explain what's wrong and how to fix it? |
| 10 | **Help & Documentation** | Can users find help when they need it? |

---

## Critical Checkpoints by Area

### Navigation & Wayfinding
- [ ] User knows where they are
- [ ] User knows where they can go
- [ ] User can always get back/home
- [ ] Labels are clear and unambiguous

### Task Completion
- [ ] Primary task achievable in minimum steps
- [ ] No unnecessary decisions or inputs
- [ ] Progress visible in multi-step flows
- [ ] Can go back and edit previous steps

### Forms & Input
- [ ] Required fields marked
- [ ] Validation happens before submit
- [ ] Errors appear near the problem field
- [ ] Smart defaults reduce effort

### Feedback & Status
- [ ] Loading states for async operations
- [ ] Success confirmations after actions
- [ ] Error messages explain and suggest fixes
- [ ] Empty states guide next action

### Visual Design
- [ ] Visual hierarchy guides attention
- [ ] Adequate contrast and readability
- [ ] Consistent spacing and patterns
- [ ] Important actions are prominent

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Sufficient color contrast
- [ ] Images have alt text

### Cognitive Load
- [ ] No irrelevant information displayed
- [ ] Complex tasks broken into steps
- [ ] Options limited and distinguishable
- [ ] Context preserved across screens

### Responsiveness
- [ ] Layout works on mobile
- [ ] Touch targets large enough (44px)
- [ ] Content readable at all sizes

---

## Red Flags (Stop and Fix)

These issues should be addressed immediately:

| Red Flag | Why It Matters |
|----------|----------------|
| No loading indicator for async operations | Users think the system is broken |
| Error message just says "Error" | Users can't recover |
| No way to undo or cancel | Users fear making mistakes |
| Jargon in labels | Users can't navigate |
| Primary action not visually distinct | Users don't know what to do |
| Form submits and clears on error | Users lose their work |
| No keyboard navigation | Accessibility failure |
| Critical info only conveyed by color | Accessibility failure |
| No empty state guidance | Users stuck on first use |
| Inconsistent terminology | Users confused |

---

## Good Patterns to Reinforce

When you see these, note them as strengths:

- Clear visual hierarchy with obvious primary action
- Inline validation with helpful error messages
- Smart defaults that match common use cases
- Progressive disclosure of advanced options
- Consistent patterns across similar screens
- Keyboard shortcuts for frequent actions
- Contextual help where needed (not everywhere)
- Graceful handling of edge cases (empty, error, loading)
- Preservation of state across navigation
- Real-time feedback without distraction

---

## Severity Guide

| Severity | Criteria | Example |
|----------|----------|---------|
| **Critical** | Blocks task completion | Can't submit form, data loss |
| **High** | Major friction, likely abandonment | Confusing error, can't find key feature |
| **Medium** | Noticeable friction, workaround exists | Extra steps, minor confusion |
| **Low** | Minor annoyance, polish | Visual inconsistency, missing shortcut |
