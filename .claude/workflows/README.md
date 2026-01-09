# Agentic Workflows

This directory contains declarative workflow definitions for orchestrating multi-agent tasks.

## Structure

```
.claude/workflows/
├── steps/          # Atomic, reusable step definitions
├── flows/          # Complete workflow definitions
├── lib/            # Shared workflow modules (reusable sub-workflows)
├── executor.py     # Workflow execution engine
└── README.md       # This file
```

## Concepts

### Steps
Atomic building blocks that can be reused across workflows. Each step defines:
- What agent executes it
- What inputs it needs
- What outputs it produces
- The prompt or script to execute

### Flows
Complete workflows that chain multiple steps together. Flows support:
- Sequential execution
- Conditional branching (when conditions)
- Variable passing between steps
- Nested workflows

### Variables
Reference data across the workflow:
- `$inputs.variable_name` - Access workflow inputs
- `$steps.step_id.output_name` - Access outputs from previous steps
- `{{variable}}` - Template substitution in prompts

## Usage

### List available workflows
```bash
./scripts/workflow list
```

### Validate a workflow
```bash
./scripts/workflow validate flows/add-knowledge-domain
```

### Run a workflow
```bash
./scripts/workflow run flows/add-knowledge-domain \
  --input domain_name=user-research \
  --input initial_description="Expert in user research methodologies"
```

### Run with options
```bash
./scripts/workflow run flows/add-knowledge-domain \
  --input domain_name=data-architecture \
  --input skip_review=true
```

## Creating Workflows

### 1. Create atomic steps

Create reusable steps in `steps/`:

```yaml
# steps/analyze-market.yaml
name: Analyze Market Opportunity
agent: product-manager
inputs:
  - name: product_idea
    type: string
    required: true
outputs:
  - name: market_analysis
    file: market-analysis.md
prompt: |
  Analyze the market opportunity for: {{product_idea}}

  Cover:
  - Market size
  - Competition
  - Target customers
```

### 2. Create a workflow

Chain steps together in `flows/`:

```yaml
# flows/product-discovery.yaml
name: Product Discovery
inputs:
  product_idea:
    type: string
    required: true

steps:
  - id: market_analysis
    step: steps/analyze-market
    inputs:
      product_idea: $inputs.product_idea

  - id: design_ux
    agent: product-designer
    prompt: |
      Design UX for: {{$inputs.product_idea}}
      Consider: {{$steps.market_analysis.market_analysis}}
    outputs:
      ux_design: ux-approach.md

outputs:
  market_doc: $steps.market_analysis.market_analysis
  ux_doc: $steps.design_ux.ux_design
```

### 3. Add conditional branching

Use `when` conditions to control flow:

```yaml
steps:
  - id: viability_check
    agent: product-manager
    prompt: "Is this viable? (yes/no)"
    outputs:
      viable: boolean

  - id: proceed
    when: $steps.viability_check.viable == true
    agent: product-manager
    prompt: "Continue with development"

  - id: reject
    when: $steps.viability_check.viable == false
    agent: product-manager
    prompt: "Document why we're not proceeding"
```

### 4. Nest workflows

Reuse entire workflows as steps:

```yaml
steps:
  - id: trio_analysis
    workflow: lib/trio-analysis
    inputs:
      topic: $inputs.feature_name
      context_files: [$steps.research.research_doc]
```

## Examples

### Add a knowledge domain
```bash
./scripts/workflow run flows/add-knowledge-domain \
  --input domain_name=user-research \
  --input initial_description="UX research methodologies and user testing"
```

This workflow:
1. Defines the domain scope and purpose
2. Designs the persona characteristics
3. Writes the system prompt
4. Registers in the registry
5. Creates initial test cases

## Best Practices

1. **Keep steps atomic** - Each step should do one thing well
2. **Make steps reusable** - Design steps that work in multiple workflows
3. **Use clear IDs** - Step IDs become variable names
4. **Document inputs/outputs** - Be explicit about what data flows where
5. **Add conditions carefully** - Test both branches of conditional logic
6. **Provide good summaries** - Help users understand what happened

## Troubleshooting

### Workflow fails to load
- Check YAML syntax with `./scripts/workflow validate`
- Verify file paths are correct
- Ensure all referenced steps exist

### Step fails to execute
- Check that the agent is registered in `.claude/agents/registry.json`
- Verify the agent is available (not a typo)
- Check prompt syntax and variable references

### Variables not resolving
- Use `$inputs.name` for workflow inputs
- Use `$steps.id.output` for step outputs
- Check that referenced step IDs exist and ran before this step

## Future Enhancements

Planned features:
- Parallel step execution
- Error handling and retry logic
- State persistence between runs
- Workflow templates
- Interactive approval gates
- Workflow visualization
