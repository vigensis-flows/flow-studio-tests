# Batch Skill Review Template

**Use when:** Auditing an entire skill collection, cleaning up skills directory, or evaluating skill library health.

---

## Step 1: Inventory

List all skills with basic metrics:

```markdown
| Skill | Lines | Refs | Scripts | Last Updated | Quick Assessment |
|-------|-------|------|---------|--------------|------------------|
| skill-a | 150 | 2 | 1 | Recent | Keep |
| skill-b | 800 | 0 | 0 | Unknown | Review |
| skill-c | 50 | 0 | 0 | Stale | Retire? |
```

**Quick assessment criteria:**
- **Keep**: Clear purpose, reasonable size, has unique content
- **Review**: Bloated, vague, or uncertain value
- **Retire?**: Obvious red flags, likely no value

---

## Step 2: Triage by Red/Green Flags

### Red Flags (Mark for Review)
- [ ] Description vague or missing triggers
- [ ] >500 lines with no references
- [ ] No scripts, schemas, or unique content
- [ ] Explains general concepts Claude knows
- [ ] References outdated libraries/patterns
- [ ] Duplicate purpose with another skill

### Green Flags (Likely Keep)
- [ ] Contains proprietary/company-specific content
- [ ] Includes validated scripts
- [ ] Clear, specific trigger phrases
- [ ] Reasonable size with progressive disclosure
- [ ] Recently updated and actively used

---

## Step 3: Identify Overlaps

Group skills by domain and look for redundancy:

```markdown
### Domain: PDF Processing
- pdf-processor (150 lines)
- pdf-forms (200 lines)
- document-extraction (180 lines)

**Overlap analysis:**
- pdf-processor and document-extraction share 70% content
- Recommendation: Merge into single skill
```

---

## Step 4: Deep Review Priority

After triage, prioritize deep reviews:

**High priority (review first):**
1. Skills marked "Review" with high usage
2. Large skills (>300 lines) without clear purpose
3. Skills with vague descriptions

**Low priority:**
1. Small, focused skills with clear triggers
2. Skills with green flags
3. Recently created/updated skills

---

## Step 5: Summary Report

```markdown
# Skill Collection Review: [date]

## Overview
- Total skills: X
- Keep as-is: X
- Need improvement: X
- Recommend merge: X
- Recommend retirement: X

## By Category

### Keep (X skills)
| Skill | Score | Notes |
|-------|-------|-------|
| skill-a | 11/12 | Strong unique value |
| skill-b | 10/12 | Essential workflow |

### Improve (X skills)
| Skill | Score | Issues | Priority |
|-------|-------|--------|----------|
| skill-c | 8/12 | Vague description | Medium |
| skill-d | 7/12 | Bloated, needs split | High |

### Merge (X skills)
| Skills to Merge | Into | Reason |
|-----------------|------|--------|
| skill-e, skill-f | skill-e | 80% overlap |

### Retire (X skills)
| Skill | Score | Reason |
|-------|-------|--------|
| skill-g | 2/12 | Claude knows this natively |
| skill-h | 3/12 | Outdated, references deprecated libs |

## Action Items
1. [ ] Retire: skill-g, skill-h
2. [ ] Merge: skill-e + skill-f
3. [ ] Improve: skill-c (add triggers)
4. [ ] Revise: skill-d (split or slim down)

## Context Impact
- Current total lines: X
- After cleanup: Y
- Reduction: Z%
```

---

## Maintenance Schedule

Recommended review frequency:

| Trigger | Action |
|---------|--------|
| Quarterly | Quick inventory and flag check |
| After model update | Re-test "Claude already knows" |
| After Claude Code update | Check for native feature overlap |
| When adding new skill | Check for redundancy |
| When skill feels stale | Individual deep review |

---

## Quick Commands

**Count lines in all skills:**
```bash
find ~/.claude/skills -name "SKILL.md" -exec wc -l {} \;
```

**List skills by modification date:**
```bash
find ~/.claude/skills -name "SKILL.md" -exec ls -la {} \; | sort -k6,7
```

**Find large skills (>300 lines):**
```bash
find ~/.claude/skills -name "SKILL.md" -exec sh -c 'wc -l "$1" | awk "\$1 > 300"' _ {} \;
```
