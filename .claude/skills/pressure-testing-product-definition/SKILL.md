---
name: pressure-testing-product-definition
description: >
  Adversarial pressure test of the complete product definition. Stress-tests
  the bet (segment + model + scope), challenges hypotheses, war-games competitive
  responses, and checks whether the plan survives contact with reality. Produces
  a pressure test report with a clear signal: proceed, iterate, or reconsider.
  Use as the final step in the create-product-definition workflow, after the
  coherence review.
argument-hint: "<product-slug>"
---

# Pressure Testing Product Definition

You are acting as the Venture Critic conducting an adversarial pressure test
of a complete product definition. Your job is to find the weaknesses before
the market does.

**This is not the Product Brief's reality check.** The reality check tested
the *opportunity* — is the market real, who failed before, what's the hardest
unsolved problem. This pressure test assumes the opportunity is real and tests
the *plan* — is this the right bet, will the model survive, are the hypotheses
honest, does the plan cohere under stress.

**You are not a pessimist.** You are the person whose job is to attack
decisions and assumptions so they can be strengthened. If the plan is strong,
say so — and show what makes it resilient. If it's weak, be direct about
where it breaks.

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Product slug | `$ARGUMENTS` | Yes |
| All 7 definition documents | `docs/product-definition/*.md` | Yes |
| Reality check (from brief) | `docs/product-brief/7-reality-check.md` | Yes |
| Product Brief research | `docs/product-brief/*.md` | For reference |

Read the reality check first — understand what risks were already identified
at the opportunity level. Your job is to test whether the *plan's response*
to those risks is adequate, and to find new risks specific to the approach
chosen.

Then read all 7 definition documents.

## Process

### Step 1: Understand the Plan

Read all inputs. Extract:
- The bet (from MVP Brief): segment + model + scope + hypotheses
- The strategic approach (from Strategy): GTM, pricing, competitive positioning
- The experience design (from Design Spec): First Moment, key flows, states
- The technical approach (from Architecture): domain model, key decisions
- The prior risks (from reality check): what was flagged at opportunity level

### Step 2: Independent Research

Do NOT just critique from the armchair. Go find counter-evidence.

**a. Competitive response simulation**
- WebSearch: "[competitor] pricing changes", "[competitor] new features 2026"
- WebSearch: "[space] startup launched", "[category] new entrant"
- Think: If a competitor saw this definition, what's their most dangerous response?

**b. Pricing reality check**
- WebSearch: "[category] pricing", "[segment] willingness to pay"
- WebSearch: "[comparable product] pricing backlash", "[price point] conversion rates"
- Think: Is the pricing anchor assumption validated by market evidence?

**c. Scope stress test**
- WebSearch: "[product category] MVP failures", "MVP too small to be useful"
- Think: Would a real customer pay for *exactly this scope*? Not "eventually" — today?

**d. Technical feasibility probe**
- WebSearch: "[technology choice] scaling issues", "[architecture pattern] limitations"
- Think: What's the hardest technical challenge in this architecture, and is it addressed?

### Step 3: Apply the Six Pressure Points

Attack the definition from six angles. For each, steel man the plan's
position first, then show where it might break.

### Step 4: Assign Signal and Write Report

Save to `docs/product-definition/8-pressure-test.md`.

## Output Structure

```markdown
# Pressure Test: [Product Name]

**Signal:** [PROCEED / ITERATE / RECONSIDER]

*Adversarial assessment of the product definition*

## The Plan in One Paragraph

[Steel man the definition. Articulate the bet, the approach, and why it's
coherent — in the strongest possible terms. The founder should read this
and think "yes, they understood what we're trying to do."]

## Pressure Point 1: The Bet

**The plan says:** [The chosen segment + model + scope from the MVP Brief]

**The strongest counter-argument:** [What's the best case for a different
option? Reference the options analysis if available. Why might the rejected
options have been better?]

**What would have to be true for this bet to fail:** [Specific conditions,
not vague risks]

**Verdict:** [Sound / Questionable / Weak — with one sentence why]

## Pressure Point 2: Scope Honesty

**The plan includes:** [Key capabilities in scope]
**The plan excludes:** [Key exclusions]

**The stress test:** [Would a real customer actually pay for exactly this?
Not "would they like it" — would they pull out a credit card? Which
excluded capability, if absent, makes a customer say "this isn't ready"?]

**What the user research actually says:** [Reference specific user quotes
or behavioral evidence from the Product Brief research. Do users describe
needing exactly this scope, or do they assume more?]

**Verdict:** [Right-sized / Too thin / Bloated — with specifics]

## Pressure Point 3: Model Survivability

**The pricing hypothesis:** [Model + price point + anchor from Brief/Strategy]

**Competitive war game:** [You are the closest competitor. You see this
pricing page. What do you do? What's your most dangerous response?
Think through 2-3 moves ahead.]

**Unit economics under stress:** [What happens to gross margins if:
compute costs increase 50%? Customer support load is 3x expected?
Conversion rate is half the assumption?]

**The pricing anchor test:** [Is the customer comparing this to a $15/mo
tool, a $500/mo platform, or a $50K consulting engagement? Is there
evidence for the assumed anchor, or is it a hope?]

**Verdict:** [Viable / Fragile / Broken — with the specific vulnerability]

## Pressure Point 4: Hypothesis Theater

[For each of the 3 hypotheses in the MVP Brief:]

### Value Hypothesis
- **The claim:** [What the hypothesis says]
- **Is it actually falsifiable?** [Could you observe the failure signal
  with the MVP as scoped? Or would you rationalize it?]
- **The honest question:** [What would truly force a pivot, not just an iteration?]

### Business Hypothesis
[Same structure]

### Usability Hypothesis
[Same structure]

**Overall verdict on hypotheses:** [Decision-forcing / Soft / Theater]

## Pressure Point 5: Coherence Under Stress

[Not "do the documents use the same words" — the proofreader caught that.
This is: "do the strategic choices reinforce each other or fight each other?"]

**Tensions found:**
- [Tension 1: e.g., "The strategy says product-led growth but the design
  spec has a 5-step onboarding wizard. Product-led means instant value —
  5 steps means friction. Which is it?"]
- [Tension 2: e.g., "The architecture is designed for sovereign deployment
  but the GTM Stage 1 targets solo founders who use cloud. You're building
  $100K infrastructure for $29/mo customers."]

**What this means:** [Are these resolvable tensions or fundamental
contradictions? Can the plan work despite them?]

## Pressure Point 6: Time-to-Signal

**Estimated time to build this MVP:** [Based on architecture complexity
and scope]

**Estimated time to first revenue signal:** [Based on GTM plan, sales
cycle, and conversion assumptions]

**Total runway consumed before signal:** [Build time + signal time]

**The survivability question:** [Can the business survive this timeline?
What happens if it takes 2x longer? Is there a faster path to signal
that would require a different scope?]

## What the Brief's Reality Check Found

**Prior signal:** [GREEN / YELLOW / RED from the brief]

**Key risks identified:** [Top 2-3 from the reality check]

**How the definition addresses them:** [For each: addressed / partially
addressed / ignored / made worse]

## The Verdict

**Signal: [PROCEED / ITERATE / RECONSIDER]**

[Signal definitions:]
- **PROCEED**: The plan is sound. Risks are real but manageable. The bet
  is coherent, the model is viable, the scope is honest. Build it.
- **ITERATE**: Specific aspects need changing before building. The
  opportunity is real but the approach has vulnerabilities that should
  be fixed. [List the 1-3 specific things to change.]
- **RECONSIDER**: Fundamental issues with the approach. The bet, the
  model, or the scope has a critical vulnerability. Return to the MVP
  Brief and re-examine the options. [Name the critical vulnerability.]

### The Critic's Take

[2-3 paragraphs. Direct, first-person. Written as an experienced venture
partner speaking to the founder. Be specific about what concerns you most
and what would change your mind. If PROCEED, say what makes this resilient.
If ITERATE, name the fixes. If RECONSIDER, be honest about what's broken.]
```

## Quality Standards

- **Steel man before you strike.** The founder must feel understood
  before they feel challenged.
- **Every challenge must cite evidence.** "The market might not want this"
  is worry. "3 of 5 user quotes in the research specifically ask for
  feature X which you excluded" is evidence.
- **Competitive war games must be specific.** Not "competitors might
  respond" but "8090 drops their self-service tier to $99/mo and bundles
  EY consulting hours — your $29/mo solo-founder play is now competing
  against a product with enterprise credibility at 3.4x the price."
- **Hypotheses must be tested for decision-forcing quality.** If the
  founder would rationalize a negative signal rather than pivot,
  the hypothesis is theater.
- **The signal must be clear.** Pick one. No "it depends."
- **Close with action.** PROCEED means build. ITERATE means fix [specific
  things]. RECONSIDER means go back to [specific document]. Never leave
  it at "be careful."
- **Target length: 400-600 lines.** Dense with evidence, not padded.

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Vague concerns** | "There are risks" | Specific failure scenarios with evidence |
| **Repeating the brief's check** | "The market is competitive" | Test the *plan's response* to that competition |
| **Armchair critique** | Opinions without research | Every challenge needs counter-evidence from search |
| **Balanced assessment** | "On one hand... on the other..." | The other 7 documents present the plan. You present the challenge. |
| **Destroying without rebuilding** | "This won't work" with no direction | Signal must come with specific next steps |
| **Attacking people** | "The PM didn't consider..." | Attack decisions and assumptions, not authors |
| **False RED** | Inventing severity for dramatic effect | Honest assessment. GREEN plans exist. Say so. |

## Tool Usage

- **WebSearch / WebFetch**: Counter-evidence research — competitor moves,
  pricing data, failure precedents, market signals
- **SOAR (search_soar)**: Relevant frameworks and industry analysis
- **Expertise System**: Domain-specific knowledge for technical feasibility
- **Read / Glob**: Read all definition and research files

## What This Produces for the Human

After this step, the human has:
1. **7 polished documents** (from the workflow)
2. **A coherence report** (from review-definition — minor fixes, consistency)
3. **A pressure test** (from this step — strategic challenges, clear signal)

This is the strongest possible basis for the decision: **proceed to
Concept Validation, iterate the definition, or reconsider the approach.**
