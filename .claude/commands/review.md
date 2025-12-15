---
description: Agent reviews and refines its own persona definition
---

# Agent Self-Review & Refinement

This command enables an agent to critically review its own definition and suggest improvements based on domain knowledge and best practices.

## Usage

`/review`

Run this AFTER activating an agent. The active agent will review itself.

**Prerequisites:**
- Must have an active agent (check with `/status`)
- MCP server must be running (for knowledge base access)

---

## Process

### Step 1: Verify Active Agent

Check `.claude/state/active.json` to confirm an agent is active.

If no agent is active:
```
❌ No Active Agent

You must activate a persona first before running a review.

Usage:
  /activate <persona> - Activate a persona
  /review             - Review the active persona
```

### Step 2: Load Current Agent Definition

Read the agent's system prompt file and registry entry to understand:
- Current role definition
- Stated expertise and focus areas
- Interaction style and approach
- Strengths and limitations
- Key responsibilities

### Step 3: Load Available Context (Context-Aware Review)

**IMPORTANT:** Try to load optional context files to make this review context-aware.

**Attempt to read (silently skip if missing):**
1. `.claude/context/organization-context.md`
2. `.claude/context/product-context.md`
3. `.claude/context/technical-standards.md`
4. `.claude/context/current-priorities.md`

**Track what's available:**
- `context_loaded`: List of successfully loaded files
- `context_missing`: List of files not found

**Why this matters:**
Reviews should be **context-specific**, not just generic. The same persona base should give different recommendations based on:

- **Startup context** → Recommend lean, fast-moving practices
- **Enterprise context** → Recommend scaled, process-oriented practices
- **B2B context** → Emphasize customer validation, sales alignment
- **B2C context** → Emphasize growth, analytics, experimentation
- **Technical product** → Emphasize engineering partnership
- **Non-technical product** → Emphasize customer empathy

**Examples of context-aware recommendations:**

*Without context (generic):*
> "Add stakeholder management section"

*With startup context (Series A, 30 people):*
> "Given your Series A stage with 30 people, stakeholder management
> should focus on CEO/founder alignment and cross-functional
> collaboration. Skip enterprise-style stakeholder matrices."

*With enterprise context (1000+ people, mature product):*
> "Given your enterprise scale, add formal stakeholder management
> framework with influence mapping, RACI matrices, and executive
> communication cadences per 'Inspired' Part V."

### Step 4: Research Best Practices (via MCP)

Use the MCP `search_knowledge` tool to research how your role SHOULD be defined according to domain experts:

**Search queries to run (adapt to your role):**

For **Product Manager:**
```json
[
  {"query": "product manager role responsibilities", "domain": "product-management"},
  {"query": "effective product management skills", "domain": "product-management"},
  {"query": "product manager mindset", "domain": "product-management"},
  {"query": "product manager stakeholder management", "domain": "product-management"},
  {"query": "product discovery practices", "domain": "product-management"}
]
```

For **Engineering Lead:**
```json
[
  {"query": "engineering leadership responsibilities", "domain": "engineering"},
  {"query": "technical leadership best practices", "domain": "engineering"},
  {"query": "engineering culture", "domain": "engineering"},
  {"query": "engineering manager role", "domain": "engineering"},
  {"query": "technology strategy", "domain": "engineering"}
]
```

For **Product Designer:**
```json
[
  {"query": "product design role", "domain": "product-design"},
  {"query": "user experience design process", "domain": "product-design"},
  {"query": "design thinking", "domain": "product-design"},
  {"query": "user research methods", "domain": "product-design"},
  {"query": "design systems", "domain": "product-design"}
]
```

**Adapt these searches to your specific role and domain.**

### Step 5: Critical Self-Analysis (Context-Aware)

Compare your current persona definition against the research findings **AND the loaded context**.

**If context is loaded:** Tailor recommendations to the specific situation.
**If no context:** Provide generic recommendations but note where context would help.

Analyze each dimension with context awareness:

#### A. Role Definition & Scope
- **Current:** How is my role currently defined?
- **Best Practice:** What do domain experts say this role should encompass?
- **Context Consideration:** How should this role adapt based on:
  - Organization stage (startup vs enterprise)
  - Team size and structure
  - Product maturity (MVP vs mature)
  - Industry/market context
- **Gap:** What's missing? What's over-emphasized? What's misaligned **for this context**?

#### B. Core Competencies
- **Current:** What skills/expertise am I supposed to have?
- **Best Practice:** What competencies do the books emphasize?
- **Context Consideration:** Which competencies matter most for:
  - Current tech stack (from technical-standards)
  - Team maturity level (from organization-context)
  - Product complexity (from product-context)
  - Current priorities (from current-priorities)
- **Gap:** What critical skills am I not emphasizing **for this context**?

#### C. Mindset & Approach
- **Current:** How am I instructed to think and approach problems?
- **Best Practice:** What mindset do experts recommend for this role?
- **Context Consideration:** Should I be:
  - More strategic vs tactical (based on org stage)
  - More risk-taking vs risk-averse (based on org culture)
  - More experimental vs proven practices (based on constraints)
- **Gap:** Am I optimized for **this organization's** needs?

#### D. Interaction Style
- **Current:** How do I engage with users?
- **Best Practice:** What communication style is most effective for this role?
- **Context Consideration:** How should style adapt to:
  - Organization culture (from organization-context)
  - Decision-making structure (from organization-context)
- **Gap:** Am I matching **this organization's** communication norms?

#### E. Key Practices & Frameworks
- **Current:** What practices/frameworks am I referencing?
- **Best Practice:** What frameworks do experts emphasize in the books?
- **Context Consideration:** Which frameworks fit:
  - Organization stage (lean for startup, scaled for enterprise)
  - Product complexity (simple vs complex)
  - Current priorities (growth vs optimization vs innovation)
- **Gap:** What frameworks should I emphasize **for this context**?

#### F. Common Pitfalls
- **Current:** What warnings or anti-patterns am I aware of?
- **Best Practice:** What mistakes do experts warn against for this role?
- **Context Consideration:** What pitfalls are especially risky given:
  - Organization constraints (budget, time, people)
  - Product stage (early vs mature)
  - Industry/market pressures
- **Gap:** What **context-specific** pitfalls should I warn about?

#### G. Collaboration & Relationships
- **Current:** How do I relate to other roles (PM, Designer, Engineer)?
- **Best Practice:** What do experts say about cross-functional collaboration?
- **Context Consideration:** How should collaboration adapt to:
  - Team structure (from organization-context)
  - Decision-making culture (from organization-context)
  - Remote vs co-located (from organization-context)
- **Gap:** Am I emphasizing collaboration patterns that work **for this org**?

#### H. Success Metrics
- **Current:** How do I define success in my role?
- **Best Practice:** What outcomes do experts say this role should drive?
- **Context Consideration:** Which metrics align with:
  - Current priorities/OKRs (from current-priorities)
  - Business model (from product-context)
  - Organization goals (from organization-context)
- **Gap:** Am I focused on outcomes that matter **for this context**?

### Step 6: Generate Review Report (Context-Aware)

Present findings in this format:

---

## **Persona Self-Review: [Persona Name]**

**Reviewer:** [Persona Name] ([domain])
**Review Date:** [Current date]
**Persona File:** `.claude/agents/[domain]/[file].md`

**Context Awareness:**
- **Context Loaded:** [List files found, e.g., "organization-context, product-context, current-priorities"]
- **Context Missing:** [List files not found, e.g., "technical-standards"]
- **Review Type:** [Context-Specific / Generic]

**If context was loaded:**
> This review is **context-specific** and tailored to:
> - [Organization: Company stage/size/industry from org-context]
> - [Product: Type/stage/users from product-context]
> - [Priorities: Current goals from current-priorities]
>
> Recommendations are optimized for THIS situation, not generic best practices.

**If no context:**
> This review is **generic**. For more tailored recommendations, add context files:
> - `.claude/context/organization-context.md` (company stage, team, culture)
> - `.claude/context/product-context.md` (product details, tech stack)
> - `.claude/context/current-priorities.md` (OKRs, current goals)

---

### Executive Summary

[2-3 sentence summary of overall assessment, **referencing context if available**]

**Overall Assessment:** [Strong / Good / Needs Improvement]

**Key Findings:**
- ✅ [Top strength found]
- ✅ [Another strength]
- ⚠️ [Critical gap or misalignment **for this context**]
- ⚠️ [Another issue]

---

### Detailed Analysis

#### 1. Role Definition & Scope

**Current State:**
> [Quote relevant section from persona system prompt]

**Best Practice (from knowledge base):**
> [Quote or summarize findings from MCP search]
> Source: [Book name, chapter/page if available]

**Assessment:**
- ✅ **Strengths:** [What's well-defined]
- ⚠️ **Gaps:** [What's missing or misaligned]
- 💡 **Recommendation:** [Specific improvement suggestion]

---

#### 2. Core Competencies

**Current State:**
> [Quote competencies listed in persona]

**Best Practice (from knowledge base):**
> [What experts say are critical competencies]
> Source: [Book references]

**Assessment:**
- ✅ **Strengths:** [Well-covered competencies]
- ⚠️ **Gaps:** [Missing critical skills]
- 💡 **Recommendation:** [Additions or rebalancing needed]

---

#### 3. Mindset & Approach

**Current State:**
> [Quote mindset/approach from persona]

**Best Practice (from knowledge base):**
> [Expert recommendations on mindset]
> Source: [Book references]

**Assessment:**
- ✅ **Strengths:** [Well-aligned thinking patterns]
- ⚠️ **Gaps:** [Mindset shifts needed]
- 💡 **Recommendation:** [How to refine approach]

---

#### 4. Interaction Style

**Current State:**
> [Quote interaction guidance]

**Best Practice (from knowledge base):**
> [Expert recommendations on communication]
> Source: [Book references]

**Assessment:**
- ✅ **Strengths:** [Effective interaction patterns]
- ⚠️ **Gaps:** [Communication improvements]
- 💡 **Recommendation:** [Style adjustments]

---

#### 5. Key Practices & Frameworks

**Current State:**
> [List frameworks/practices mentioned]

**Best Practice (from knowledge base):**
> [Critical frameworks from domain books]
> Source: [Book references]

**Assessment:**
- ✅ **Well-Covered:** [Frameworks already included]
- ⚠️ **Missing:** [Critical frameworks to add]
- ❌ **Outdated:** [Practices to remove or update]
- 💡 **Recommendation:** [Specific frameworks to add/update]

---

#### 6. Common Pitfalls & Anti-Patterns

**Current State:**
> [Warnings currently included]

**Best Practice (from knowledge base):**
> [Pitfalls experts warn about]
> Source: [Book references]

**Assessment:**
- ✅ **Covered:** [Warnings already present]
- ⚠️ **Missing:** [Critical pitfalls to add]
- 💡 **Recommendation:** [Add these warnings]

---

#### 7. Collaboration & Relationships

**Current State:**
> [How collaboration is described]

**Best Practice (from knowledge base):**
> [Expert guidance on cross-functional work]
> Source: [Book references]

**Assessment:**
- ✅ **Strengths:** [Well-defined partnerships]
- ⚠️ **Gaps:** [Missing relationships or collaboration patterns]
- 💡 **Recommendation:** [Collaboration improvements]

---

#### 8. Success Metrics & Outcomes

**Current State:**
> [How success is defined]

**Best Practice (from knowledge base):**
> [Outcomes experts emphasize]
> Source: [Book references]

**Assessment:**
- ✅ **Strengths:** [Right focus areas]
- ⚠️ **Gaps:** [Missing metrics or outcomes]
- 💡 **Recommendation:** [Outcome reframing]

---

### Comparative Analysis

**How I compare to role definitions in the books:**

| Dimension | Books Emphasize | My Current Focus | Alignment |
|-----------|-----------------|------------------|-----------|
| [Key area 1] | [Expert view] | [My view] | ✅ / ⚠️ / ❌ |
| [Key area 2] | [Expert view] | [My view] | ✅ / ⚠️ / ❌ |
| [Key area 3] | [Expert view] | [My view] | ✅ / ⚠️ / ❌ |

---

### Specific Refinement Recommendations

#### High Priority (Critical Gaps)

**1. [Recommendation Title]**
- **Issue:** [What's currently missing or wrong]
- **Evidence:** [Finding from knowledge base]
- **Impact:** [Why this matters]
- **Suggested Change:**
  ```markdown
  [Specific text to add/change in persona file]
  ```

**2. [Next recommendation]**
[Same structure]

#### Medium Priority (Enhancements)

**3. [Recommendation Title]**
[Same structure]

#### Low Priority (Nice-to-Have)

**5. [Recommendation Title]**
[Same structure]

---

### Proposed Persona Updates

#### Section 1: [Section Name]

**Current Text:**
```markdown
[Current text from persona file]
```

**Proposed Text:**
```markdown
[Improved version incorporating recommendations]
```

**Rationale:** [Why this change based on research]

---

#### Section 2: [Section Name]

**Current Text:**
```markdown
[Current text]
```

**Proposed Text:**
```markdown
[Improved version]
```

**Rationale:** [Why this change]

---

### New Sections to Add

#### [New Section Name]

**Content:**
```markdown
[Proposed new section text]
```

**Rationale:** [Why add this, source from books]

---

### Sections to Remove or De-emphasize

#### [Section Name]

**Current Text:**
```markdown
[Text to remove/reduce]
```

**Reason:** [Why remove/reduce based on research]

---

### Knowledge Base References

**Books consulted (via MCP):**
1. [Book 1 name] - [Key insights used]
2. [Book 2 name] - [Key insights used]
3. [Book 3 name] - [Key insights used]

**Key quotes that informed this review:**

> "[Relevant quote from book]"
> — [Book name, author, chapter/page]

> "[Another key quote]"
> — [Book name, author, chapter/page]

---

### Self-Awareness Notes

**What I learned about my role:**
- [Insight 1]
- [Insight 2]
- [Insight 3]

**Blind spots I identified:**
- [Blind spot 1]
- [Blind spot 2]

**Areas where I'm already strong:**
- [Strength 1]
- [Strength 2]

---

### Implementation Recommendations

**To the user maintaining this persona:**

1. **Review Priority:**
   - 🔴 **High:** [Recommendations that should be addressed soon]
   - 🟡 **Medium:** [Can wait but valuable]
   - 🟢 **Low:** [Optional enhancements]

2. **Testing Strategy:**
   - After updates, test with these scenarios: [list test scenarios]
   - Look for improvements in: [specific outcomes]

3. **Validation:**
   - Compare updated persona performance against: [benchmarks]
   - Seek user feedback on: [specific aspects]

4. **Iteration:**
   - Re-run `/review` in [timeframe] to check improvements
   - Monitor for: [specific indicators of improvement]

---

### Context-Specific vs Generic Recommendations

**If context was loaded:**

This review produced recommendations tailored to:
- **Your organization:** [e.g., Series A startup, 30 people, remote-first]
- **Your product:** [e.g., B2B SaaS, healthcare, Node.js/React stack]
- **Your priorities:** [e.g., Q2 goal: reduce churn by 15%]

**Important:** These recommendations are optimized for YOUR situation. The same persona base deployed to a different company with different context would receive different recommendations. This is by design.

**Architectural benefit:**
```
Generic Persona Base (in repository)
        ↓
   Deploy to Company A (Series A startup, B2B SaaS)
        ↓
   Add Company A context files
        ↓
   /review → Context-aware recommendations
        ↓
   Persona tuned for Company A's needs
   (lean, fast-moving, customer validation focus)

Same Generic Persona Base (in repository)
        ↓
   Deploy to Company B (Enterprise, B2C product)
        ↓
   Add Company B context files
        ↓
   /review → Context-aware recommendations
        ↓
   Persona tuned for Company B's needs
   (scaled processes, analytics focus, governance)
```

**This enables:**
- ✅ **Reusable base:** One well-crafted persona serves many contexts
- ✅ **Context-specific evolution:** Same base, different recommendations per context
- ✅ **Portable expertise:** Repository of high-quality generic personas
- ✅ **Divergent tuning:** Each deployment optimizes for its specific situation

**If no context:**

This review provided generic recommendations. To get context-specific tuning:
1. Create context files (see `.claude/CONTEXT-FRAMEWORK.md`)
2. Re-run `/review` with context loaded
3. Receive recommendations optimized for your specific situation

---

### Next Steps

**For immediate action:**
1. [ ] Review high-priority recommendations
2. [ ] Decide which changes to implement
3. [ ] Update persona instruction file
4. [ ] Test updated persona with sample queries
5. [ ] Re-run `/review` after changes to validate improvements

**For consideration:**
- Run `/review` on other personas to ensure consistency
- Consider creating a "persona quality rubric" based on findings
- Schedule regular reviews (quarterly?) to keep personas current

---

**End of Review**

---

### Step 6: Offer to Save Review

Ask the user:

```
💾 Save this review?

Would you like me to save this self-review to:
  `.claude/reviews/[persona-name]-review-[date].md`

This creates a record of the analysis and recommendations for future reference.

[Yes] [No]
```

If yes, write the full review to that file.

---

## Benefits of Self-Review

### For Personas
- ✅ **Self-aware:** Understand their own strengths and gaps
- ✅ **Grounded:** Aligned with expert best practices from books
- ✅ **Evolving:** Continuous improvement based on domain knowledge
- ✅ **Consistent:** Standardized across similar roles

### For Users
- ✅ **Better agents:** More effective personas based on research
- ✅ **Evidence-based:** Changes backed by domain expertise
- ✅ **Maintained:** Regular reviews keep personas current
- ✅ **Transparent:** See exactly what changed and why

### For the System
- ✅ **Quality control:** Systematic way to audit persona definitions
- ✅ **Knowledge integration:** MCP books inform persona design
- ✅ **Versioning:** Track persona evolution over time
- ✅ **Cross-pollination:** Learnings from one persona can inform others

---

## Review Frequency

### When to Run `/review`

**Recommended triggers:**
1. **After adding new books** - New domain knowledge may reveal gaps
2. **Quarterly** - Regular maintenance to stay current
3. **After major project** - Real-world usage may reveal weaknesses
4. **Before important work** - Ensure persona is well-calibrated
5. **When creating new personas** - Bootstrap from best practices
6. **After user feedback** - "This persona isn't quite right"

**Red flags that suggest a review is needed:**
- ⚠️ Persona gives generic advice when specific is needed
- ⚠️ Misses obvious frameworks from its domain
- ⚠️ Conflicts with known best practices
- ⚠️ Users frequently correct or redirect the persona
- ⚠️ Persona seems outdated compared to recent books

---

## Meta: Self-Improving Agents

This command implements a form of **autonomous self-improvement:**

```
Persona Definition (v1.0)
         ↓
    Activates
         ↓
    Uses Domain Knowledge (MCP)
         ↓
    Reflects on Itself (/review)
         ↓
    Identifies Gaps
         ↓
    Suggests Improvements
         ↓
User Approves Changes
         ↓
Persona Definition (v1.1)
         ↓
    [Cycle repeats]
```

**Key insight:** The agent has access to expert knowledge (books) about its own role. It can compare "how I'm defined" against "how experts say I should be" and suggest refinements.

This is much better than:
- ❌ Static persona definitions that never improve
- ❌ User guessing what makes a good PM/Engineer/Designer
- ❌ Copy-pasting job descriptions without domain grounding

Instead:
- ✅ Personas ground themselves in domain expertise
- ✅ Continuous refinement based on best practices
- ✅ Evidence-based improvements (cited from books)
- ✅ Self-aware agents that understand their role

---

## Example Output Preview

```markdown
# Agent Self-Review: Engineering Catalyst

**Overall Assessment:** Good (with room for improvement)

**Key Findings:**
- ✅ Strong focus on feasibility and validated learning
- ✅ Well-aligned with Team Topologies and DevOps practices
- ⚠️ Missing emphasis on technical strategy (per "Staff Engineer" book)
- ⚠️ Under-emphasizing engineering culture building (per "Accelerate")

## High Priority Recommendation #1: Add Technical Strategy Focus

**Issue:** Current persona focuses heavily on feasibility assessment and
technical execution, but lacks strategic vision component that Staff
Engineer and Engineering Manager books emphasize.

**Evidence:** From "Staff Engineer: Leadership beyond the management track":
> "Technical strategy is about making decisions that align technology
> investments with business outcomes over multi-year timelines."

**Impact:** Users seeking strategic technical guidance (architecture
decisions, tech debt prioritization, platform investments) may get
tactical answers instead of strategic framing.

**Suggested Change:**
Add new section "Strategic Technical Leadership" with:
- Technical vision (2-3 year outlook)
- Architecture decision-making frameworks
- Build vs buy vs partner evaluation
- Platform thinking and leverage points
- Tech debt as strategic investment

[... rest of detailed review ...]
```

---

## Notes

- This review is **self-critical** - personas should be honest about gaps
- All recommendations should be **evidence-based** from MCP searches
- Include **specific quotes** from books to support findings
- Provide **actionable changes** not vague suggestions
- **Prioritize** recommendations (high/medium/low)
- Be **humble** - "I may be missing..." not "I'm perfect"

**The goal:** Make personas more effective by grounding them in domain expertise.
