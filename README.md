# metro-ai

> [!IMPORTANT]
>
> **This is not an official Oregon Metro project.** It is an independent demo created by Liam Beckman as part of an application for the [AI Automation Specialist role](https://www.governmentjobs.com/careers/oregonmetro/jobs/4858424/ai-automation-specialist) (Job No. 2026-0069-IT-4). Oregon Metro's name and branding are used for illustrative purposes only.

**Live site:** [lbeckman314.github.io/metro-ai](https://lbeckman314.github.io/metro-ai)

A Claude Project system prompt designed to act as an AI advisor for the Metro AI Automation Specialist role — scoped to public-sector constraints, Metro's tooling stack, and compliance-first automation design.

## What's here

| Path | Description |
|---|---|
| [`prompt.md`](prompt.md) | Canonical system prompt (source of truth) |
| [`api/advisor.py`](api/advisor.py) | Anthropic SDK demo with prompt caching |
| [`src/data/prompt.ts`](src/data/prompt.ts) | Prompt as a TypeScript const for the site |
| [`src/data/scenarios.ts`](src/data/scenarios.ts) | Three test scenarios + responses |
| [`src/data/process.ts`](src/data/process.ts) | Six-step build process narrative |
| [`src/components/`](src/components/) | React components (PromptViewer, ScenarioCard, etc.) |
| [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | GitHub Actions deploy to Pages |

## Site

The site has three tabs:

- **System Prompt** — syntax-highlighted source with Code/Preview toggle and copy button
- **Example Scenarios** — three scenarios used to test and refine the prompt (workflow design, compliance gating, prompt review)
- **Build Process** — timeline narrative of how the prompt was developed

## Claude Project prompt

The system prompt lives in [`prompt.md`](prompt.md). It can be used in two ways:

**1. Claude Projects UI** — paste the contents of `prompt.md` into a new Claude Project's system prompt field at [claude.ai](https://claude.ai).

**2. Anthropic API** — run the included Python script:

```bash
pip install anthropic
export ANTHROPIC_API_KEY=your_key_here
python api/advisor.py
```

The script uses [prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) so the long system prompt is only tokenized once per session.

## Prompt design

The advisor is scoped to Metro's public-sector context:

- **Workflow Design** — proposes agentic automations using Metro's stack (Power Automate, Copilot Studio, Azure AI Foundry)
- **Compliance Gating** — surfaces PII, RBAC, audit, and human-in-the-loop questions before recommending any automation
- **Prompt Review** — critiques agent prompts using a What works → What's missing → Revised version structure
- **Stakeholder Communication** — translates technical designs into plain language for non-technical department heads
- **Prototyping Guidance** — prefers shipped MVPs over perfect requirements documents

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Deploy

Pushes to `main` automatically deploy to GitHub Pages via the included workflow. To trigger manually:

```
Actions → Deploy to GitHub Pages → Run workflow
```

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS v3](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) components
- [react-markdown](https://github.com/remarkjs/react-markdown) for prompt preview
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-python) for the API demo

## Author

Liam Beckman — [liambeckman.com](https://liambeckman.com/code) · [liam@liambeckman.com](mailto:liam@liambeckman.com)
