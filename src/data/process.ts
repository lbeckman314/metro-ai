export interface ProcessStep {
  phase: string
  title: string
  description: string
  detail: string
}

export const processSteps: ProcessStep[] = [
  {
    phase: "01",
    title: "Start with the job description as requirements",
    description: "Treat the posting as a spec document",
    detail:
      "Rather than starting with a blank prompt, I read the Metro job posting as a requirements document — extracting the core responsibilities, success attributes, and constraints the role is accountable for. These became the direct structure of the prompt's sections.",
  },
  {
    phase: "02",
    title: "Identify the key tension",
    description: "General advisor vs. compliance-aware public sector advisor",
    detail:
      'My first conversation with Claude was deliberately open-ended: "Help me think through what a Claude Project for an AI Automation Specialist at a regional government should do." The response surfaced a tension I hadn\'t fully articulated: a general-purpose automation advisor and a compliance-aware public-sector advisor are meaningfully different tools. That reframe shaped the entire prompt structure.',
  },
  {
    phase: "03",
    title: "Scope via failure modes",
    description: "What could go wrong without constraints?",
    detail:
      "I asked Claude to enumerate the failure modes of an unconstrained AI automation advisor in a government context. The answers — PII leakage, unapproved tooling recommendations, decisions without audit trails, hallucinated compliance guidance — became the Constraints block verbatim.",
  },
  {
    phase: "04",
    title: "Specify behavior per responsibility",
    description: "Map each job duty to an advisor behavior",
    detail:
      "I worked through each responsibility in the job posting and asked: what would this advisor need to do differently from a generic assistant? Stakeholder communication, compliance gating, and prototyping guidance each required distinct behavioral instructions rather than a single catch-all persona.",
  },
  {
    phase: "05",
    title: "Calibrate output format",
    description: "Test against real scenarios, refine until consistent",
    detail:
      "I tested the draft prompt against three scenarios: permit application routing, a public-facing chatbot, and an HR policy agent prompt review. Each response was evaluated for whether it led with a recommendation, surfaced compliance questions unprompted, and ended with a concrete next step. The Style section was refined until all three passed.",
  },
  {
    phase: "06",
    title: "Final design principle",
    description: "Compliance as a first-class gate, not an afterthought",
    detail:
      "The finished prompt treats compliance not as a disclaimer but as a prerequisite — the advisor surfaces data governance questions before offering a solution, mirrors the human-in-the-loop language from the job posting directly into its constraints, and defaults to explainability as a design principle. Every response ends with a next step that keeps the human moving forward.",
  },
]
