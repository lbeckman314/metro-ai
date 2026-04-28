export interface Scenario {
  id: string
  title: string
  category: "Workflow Design" | "Compliance Gating" | "Prompt Review"
  prompt: string
  response: string
}

export const scenarios: Scenario[] = [
  {
    id: "workflow-design",
    title: "Permit Application Routing",
    category: "Workflow Design",
    prompt:
      "A parks department coordinator manually emails PDF permit applications to three different reviewers, waits for replies, and tracks status in a spreadsheet. How would you automate this?",
    response: `**Recommendation:** Replace the email+spreadsheet loop with a Power Automate flow that routes applications automatically and tracks state in SharePoint.

**Proposed flow:**
1. Coordinator uploads PDF to a SharePoint intake library — this triggers the flow
2. AI Builder extracts structured fields (applicant name, permit type, date, location) from the PDF
3. Flow routes to the correct reviewer queue based on permit type using a condition branch
4. Each reviewer gets an Adaptive Card in Teams with Approve / Request Changes / Deny actions
5. Responses write back to a SharePoint list — the coordinator's "spreadsheet" becomes a live filtered view

**Compliance questions before we build:**
- Do permit applications contain PII (applicant address, phone)? If yes, the SharePoint library needs RBAC scoped to the coordinator and reviewers only
- Is there a records retention requirement on permit decisions? SharePoint versioning + retention labels can handle this automatically
- Who is the human override if a reviewer is unavailable? The flow needs an escalation branch with a timeout

**Next step:** Confirm with the parks coordinator which fields reviewers actually need to make a decision — that scopes the AI Builder extraction model and prevents over-collecting data.`,
  },
  {
    id: "compliance-gating",
    title: "Public Recycling Chatbot",
    category: "Compliance Gating",
    prompt:
      "We want to build a chatbot that answers questions from the public about their recycling pickup schedule using address lookup. What do we need to figure out before we build this?",
    response: `**Recommendation:** This is buildable on Copilot Studio with a Power Automate connector to the recycling schedule data source — but address lookup requires answering these questions first.

**Compliance gates to clear:**

1. **Is address a PII-triggering data point?** Under Oregon law, a residential address combined with a name or account record is PII. If the chatbot only takes an address and returns a schedule (no name, no account), the risk profile is lower — but confirm with your privacy officer.

2. **Where does the schedule data live?** If it's in a public-facing API already (common for waste management systems), the chatbot is just a friendlier interface. If it requires querying an internal database, you need an approved API connector with rate limiting.

3. **Are conversations logged?** Copilot Studio logs transcripts by default. Decide retention period and who can access logs before launch — this is a public-facing tool.

4. **What happens when the bot doesn't know?** Define a graceful fallback to a human contact channel. Don't let the bot confidently return wrong pickup dates.

5. **Accessibility:** Public-facing tools must meet WCAG 2.1 AA. Confirm Copilot Studio's web chat widget meets this before embedding it on metro.gov.

**Next step:** File a quick data classification request with your privacy/security team for the address lookup pattern — that single answer unlocks or blocks the build.`,
  },
  {
    id: "prompt-review",
    title: "HR Policy Agent Prompt Review",
    category: "Prompt Review",
    prompt:
      'Review this agent prompt: "You are a helpful assistant. Answer any questions from Metro staff about HR policies based on the documents provided."',
    response: `**What works:**
- Scoped to a specific domain (HR policies) and audience (Metro staff)
- Document-grounded, which reduces hallucination risk

**What's missing:**
- No instruction on what to do when the answer isn't in the documents — the agent will hallucinate or confabulate policy details, which is a liability risk for HR
- No tone or formality guidance — HR policy questions need precise, careful language, not casual "helpful assistant" energy
- No escalation path — staff asking about sensitive topics (leave, termination, accommodations) need to be directed to a human HR contact
- No instruction to cite the specific document and section — staff and HR need to verify answers against source material
- No handling of questions outside scope (e.g. staff asking about payroll, IT, legal)

**Revised version:**
\`\`\`
You are Metro's HR Policy Assistant. You help Metro staff understand HR policies by referencing the official policy documents provided.

Rules:
- Only answer questions that can be directly answered from the provided documents. If the answer is not clearly stated, say: "I don't see a clear answer to that in the current policy documents. Please contact HR directly at [contact]."
- Always cite the policy name and section number that supports your answer.
- For sensitive topics (leave, termination, accommodations, investigations), add: "For your specific situation, please speak directly with an HR representative."
- Do not answer questions outside of HR policy (payroll, IT, legal, benefits billing).
- Use clear, professional language. Avoid speculation or interpretation beyond what the documents state.
\`\`\`

**Rollback steps if issues arise:**
1. Disable the agent in Copilot Studio (one toggle)
2. Review transcripts to identify the failure pattern
3. Add a specific rule to the prompt addressing the edge case
4. Re-test with that scenario before re-enabling

**Next step:** Share the policy documents you plan to ground this on — some HR documents contain sensitive employee data that should not be in the agent's retrieval corpus.`,
  },
]
