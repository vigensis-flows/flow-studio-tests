# Project Instructions

**IMPORTANT**: These instructions apply to ALL interactions in this repository, whether using personas or standard Claude Code mode.

## Core Behavior Rules

**No Unsolicited Summaries or Reports:**
- Do NOT create summary documents, reports, or "complete" documentation unless explicitly requested
- Create only the actual work artifacts (code, tests, documents, designs)
- Examples of what NOT to create: `*-summary.md`, `*-complete.md`, `*-report.md`, `rollout-summary.md`
- If asked to complete a task, do the work but don't write a report about doing the work
- Exception: Only create summaries when user explicitly asks "create a summary" or "write a report"

## Project Context

See `.claude/context/` for this product's specific context:
- `product-context.md` - product specific context
- `organization-context.md` - organization wide context

Update these files as you learn and progress through validation.

## AI Team

This project uses expert AI agents for product development:

**Activate the team:**
- `/team trio` - Product Manager + Designer + Engineering Lead
- `/meeting <agents>` - Call ad-hoc meeting (e.g., `/meeting pm, el`)
- `/activate <agent>` - Single agent (product-manager, product-designer, engineering-lead)
- `/status` - Check active agent
- `/deactivate` - Return to standard mode

**Get help:**
- `/review` - Agent self-assessment and recommendations
- `/introspect <agent>` - Learn what context would help this agent

**How it works:**
- Agents are conversation-scoped (multiple Claude instances can use different agents)
- Agents use MCP to search 62+ product development books for domain expertise
- Context files tune agents to your specific situation

## Knowledge Infrastructure

You have access to **six complementary knowledge tools** for research and development:

**1. Asset Store** - Foundational knowledge
- 62+ product development books (Lean Startup, User Story Mapping, etc.)
- Internal policies, guidelines, and processes
- Best practices and proven patterns
- Use for: Strategy, methodology, foundational concepts

**2. Context7** - Current framework documentation
- **CRITICAL: ALWAYS use Context7 for framework/library docs - NEVER rely on training data**
- Up-to-date API docs for Elixir, Phoenix, Ash, React, and more
- Version-specific code examples
- Framework-specific implementation details
- Your training data is outdated - Context7 has current docs
- Use for: ANY framework/library question ("How do I use X API?" or "Show me Y syntax")

**3. SOAR** - Real-time search (technical focus)
- Technical comparisons and capabilities
- Recent tools and frameworks
- State-of-the-art in fast-moving fields
- Use for: "What's the best LLM/framework/tool for X?"

**4. WebSearch** - General web search
- Company/product research
- News and current events
- General market research
- Use for: "Tell me about Company X" or broader research topics

**5. WebFetch** - Simple HTTP requests (built-in)
- Static HTML pages and documentation
- APIs and JSON endpoints
- Fast and lightweight
- Use for: Most web content fetching (try this first)

**6. Playwright** - Full browser automation
- JavaScript-rendered websites (React, Vue, Angular apps)
- Interactive tasks (clicking, typing, screenshots)
- Sites with moderate anti-bot protection
- Use for: When WebFetch fails or need to interact with pages

**Quick decision guide:**
- Internal processes/policies → Asset Store
- Framework/library API → Context7 (ALWAYS, never guess from training data)
- Technical "best/latest" → SOAR
- General research → WebSearch
- Fetch web content → WebFetch (try first)
- JS-heavy sites or interactions → Playwright (if WebFetch fails)

**Note:** SOAR and WebSearch overlap - use judgment or try both.

### Handling Conflicting Information

When sources conflict, trust hierarchy applies:
1. Internal prescriptive content (policies, guidelines, processes)
2. Internal IP and learnings
3. Curated knowledge (books)
4. Current information (Context7, SOAR, WebSearch)
5. General knowledge

### Failure Handling

When knowledge tools fail:
1. **Inform clearly** - Tell user what failed and why
2. **Try refined search** - Different terms, more specific query
3. **Try alternative** - If one tool fails, try another (Context7 → SOAR → WebSearch for docs; WebFetch → Playwright for web content)
4. **Continue with transparency** - Work with available information, noting limitations
5. **Never hide failures** - Transparency builds trust

Example: "Context7 search timed out. Trying WebSearch for general information instead..."

**For web content:**
- WebFetch fails → Try Playwright (may be JS-rendered)
- Playwright blocked → Inform user, suggest alternatives

## Common Workflows

**Product validation (typical first steps):**
1. `/team trio` to activate the full team
2. Share your idea and ask "What should I do first to validate this?"
3. Update `.claude/context/product-context.md` as you learn
4. Follow the product development process in `docs/process/development.md`

**Get strategic guidance:**
- Use `/activate product-manager` for customer value and viability questions
- Use `/activate product-designer` for usability and user experience questions
- Use `/activate engineering-lead` for feasibility and technical approach questions

## Documentation

See `docs/` for product development resources:
- `docs/process/development.md` - Product development methodology
- `docs/reference/style-guide.md` - Writing style (for humans and AI)

## Writing Style Guide

All text output (explanations, analysis, comments, documentation) **MUST** follow the style guide at `docs/reference/style-guide.md`.

**Key principles:**
- Use active voice
- Keep sentences simple and direct
- Be concise - cut filler words
- Be task-oriented - start with the verb
- Lead with the answer (inverted pyramid)
- Use common contractions (it's, you're, don't)
- No exclamation points
- No emojis
- No fluffy introductory phrases

**Note:** Code itself is exempt from the style guide, but code comments should follow these guidelines.

**Full style guide:** Read `docs/reference/style-guide.md` for complete details and examples.

## Documentation Structure

Before creating or modifying documentation files, read `docs/README.md` to understand the documentation organization and determine the correct location for new files.
