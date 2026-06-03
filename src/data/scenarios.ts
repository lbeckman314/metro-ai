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
    response: `This is a textbook automation candidate — let's design it properly for a government context.

---

## What Works (Current State Has Hidden Value) ✅
- Email-based intake is familiar to applicants — worth preserving as an *option*
- Three-reviewer structure suggests there may be deliberate checks (legal, safety, operational) — that logic should be **preserved, not bypassed**
- The spreadsheet is actually a de facto audit log — we need to replace it with something better, not just eliminate it

---

## What's Missing / Flagged ⚠️

| Gap | Risk |
|---|---|
| No structured intake | Free-form PDFs mean inconsistent data, manual re-keying, errors |
| No SLA enforcement | Reviewers can go silent — no escalation path |
| Spreadsheet as system of record | No version control, no access control, easy to corrupt |
| No applicant visibility | Citizens have no status updates unless someone manually emails them |
| Parallel vs. sequential review unclear | Does all three need to approve? In order? Any one can reject? |
| No audit trail | If a permit is denied, what's the documented basis? |
| PII/sensitive data handling | Permit apps may contain SSN, address, business financials — needs RBAC |

---

## Proposed Architecture

### Tools: Power Automate + SharePoint + Power Apps + Teams + Azure AI Foundry (optional)

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                     INTAKE LAYER                        │
│  Power Apps Form (or MS Forms) → structured data entry  │
│  PDF upload supported; stored in SharePoint Document     │
│  Library with RBAC (reviewers only, not public)         │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│               TRIAGE / AI EXTRACTION (Optional)         │
│  Azure AI Foundry Document Intelligence                 │
│  Extracts key fields from uploaded PDFs                 │
│  Flags incomplete applications before routing           │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│              ROUTING & REVIEW WORKFLOW                  │
│  Power Automate orchestrates review assignments         │
│                                                         │
│  Define routing logic:                                  │
│  → Parallel (all 3 at once) or Sequential (1→2→3)?     │
│  → Any-approve or all-must-approve?                     │
│  → Conditional routing by permit type or location?     │
│                                                         │
│  Each reviewer gets:                                    │
│  • Teams Adaptive Card with Approve / Reject / More     │
│    Info buttons (actionable without leaving Teams)      │
│  • Link to application in SharePoint                    │
│  • Required comment field before decision recorded      │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│                  SLA ENFORCEMENT                        │
│  Power Automate timer:                                  │
│  • 48hr: reminder to reviewer                          │
│  • 72hr: escalation email to reviewer's supervisor     │
│  • Configurable thresholds per permit type             │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│           HUMAN-IN-THE-LOOP DECISION GATE               │
│  ⚠️  No auto-approval. Final status set only when       │
│  a human reviewer submits a documented decision.        │
│  AI assists, never decides.                             │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│           APPLICANT NOTIFICATION + RECORD               │
│  • Auto-email to applicant on status change             │
│  • Denial includes documented reason (reviewer note)   │
│  • Approved permit generated as PDF from template      │
│  • All decisions logged to SharePoint list             │
│    (replaces spreadsheet — queryable, versioned, RBAC) │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Phased Implementation Plan

### Phase 1 — Stop the Bleeding (Quick Wins)
- [ ] Create SharePoint list to replace the tracker spreadsheet (columns: applicant, permit type, submission date, reviewer statuses, decision, notes)
- [ ] Build Power Automate flow to receive emailed PDFs → auto-create SharePoint list item → notify reviewers
- [ ] Set up SLA reminders for non-responses
- *No new applicant-facing changes yet — internal only*

### Phase 2 — Structured Intake
- [ ] Build Power Apps or MS Forms intake form with required fields
- [ ] Define routing rules with parks coordinator (parallel vs. sequential, permit type logic)
- [ ] Replace email with Teams Adaptive Cards for reviewer actions
- [ ] Add applicant status notification emails

### Phase 3 — Intelligence Layer (Optional)
- [ ] Azure AI Foundry: auto-extract fields from legacy PDF submissions
- [ ] Flag incomplete applications before they reach reviewers
- [ ] Summarize application for reviewers using Azure OpenAI (within Metro's data boundary)
- [ ] Dashboard for coordinator showing pipeline status, SLA health, approval rates

---

## Compliance Checklist Before Go-Live

- [ ] **RBAC confirmed** — reviewers can only see permits assigned to them or their department
- [ ] **Audit log enabled** — every status change, decision, and escalation is timestamped and attributed to a named user
- [ ] **PII inventory completed** — what data fields are collected, where stored, retention period defined
- [ ] **Denial documentation** — legal has confirmed what must be recorded when a permit is denied
- [ ] **Applicant disclosure** — privacy notice updated if AI is used to process application content
- [ ] **Coordinator override** — coordinator can manually intervene, reassign, or close any permit at any time

---

## Rollback Steps
If the automated flow misfires:
1. Power Automate flows can be **turned off instantly** without data loss
2. SharePoint list remains intact as the source of truth
3. Coordinator can revert to manual email notifications while the flow is corrected
4. All flow run history is retained in Power Automate for diagnosis

---

## ➡️ Concrete Next Step

**You need to answer one decision-making question with the parks coordinator before building anything:**

> *When all three reviewers are involved — do they review in a specific order, or simultaneously? And can one rejection kill the whole application, or does it go to a tiebreaker?*

That routing logic is the core of the entire flow. Everything else is configurable around it.`,
  },
  {
    id: "compliance-gating",
    title: "Public Recycling Chatbot",
    category: "Compliance Gating",
    prompt:
      "We want to build a chatbot that answers questions from the public about their recycling pickup schedule using address lookup. What do we need to figure out before we build this?",
    response: `Great use case — high public value, bounded scope, and relatively low risk compared to other AI applications. But there are more dependencies here than it first appears. Let's map them all out.

---

## What Works ✅
- Highly repetitive, high-volume question type — ideal for deflecting calls/emails to Metro's customer service team
- Address lookup is a well-defined, testable input
- Schedule data is not sensitive — no PII generated *by the system* (though users will be submitting their addresses)
- Strong candidate for Copilot Studio as the chatbot layer, given Metro's M365 stack

---

## What's Missing / Must Be Figured Out First ⚠️

---

### 🗄️ 1. Data Layer — The Most Critical Dependency

Before any chatbot can be built, you need to answer:

| Question | Why It Matters |
|---|---|
| Where does the authoritative schedule data live? | Database, spreadsheet, third-party solid waste system, GIS layer? |
| How is it structured? | By address, parcel ID, zone/route? |
| How often does it change? | Holiday schedules, route changes, weather delays |
| Who owns and maintains it? | Parks? Public works? A contracted hauler? |
| Is there an API? | Or will you need to build a connector to query it? |
| What's the geographic coverage? | Metro boundary only, or partner jurisdictions? |
| Is the data clean enough? | Address normalization issues will break lookups |

**This is your single biggest risk.** A chatbot is only as reliable as the data behind it. If the schedule data lives in a spreadsheet someone updates manually, you have a fragility problem before you write a single line of automation.

---

### 🏗️ 2. Address Handling — Privacy and Technical

- Users will be typing their **home addresses** into a public-facing tool — that's PII
- Questions to resolve:
  - [ ] Are addresses **logged**? If so, where, how long, and under what retention policy?
  - [ ] Is address input sent to any third-party service for geocoding (e.g., Google Maps, Azure Maps)? That requires disclosure
  - [ ] What happens with **partial or misspelled addresses**? Does the bot guess, ask for clarification, or fail gracefully?
  - [ ] Do you need to handle **apartment/unit numbers** or just street addresses?
  - [ ] What about **unincorporated areas** or addresses just outside Metro's boundary?

---

### 🤖 3. Bot Scope — Harder to Define Than It Looks

**What the bot WILL do:**
- [ ] Look up next pickup date by address?
- [ ] Show the full schedule (weekly, biweekly)?
- [ ] Identify which bin goes out on which week?
- [ ] Handle holiday schedule exceptions?
- [ ] Notify about weather/service delays?

**What the bot WON'T do (must be defined and enforced):**
- [ ] Report a missed pickup?
- [ ] Request a new bin or service change?
- [ ] Answer billing questions?
- [ ] Handle hazardous waste or bulk item pickup?

Without a defined scope, the bot will either over-promise or require constant prompt patching. Every out-of-scope question needs a **graceful handoff path** — not a dead end.

---

### 🔁 4. Fallback and Escalation Path

- What happens when the bot **can't find an address**?
- What happens when the **data is stale** (e.g., a route just changed)?
- Is there a **live agent handoff**? Chat? Phone number? Email form?
- Who is responsible for monitoring **failed lookups and user frustration signals**?

A public-facing bot with no exit ramp damages trust more than having no bot at all.

---

### ⚖️ 5. Compliance and Public-Facing Considerations

| Item | Detail |
|---|---|
| **Accessibility** | Must meet WCAG 2.1 AA — applies to all Metro public digital services |
| **Language access** | Does Metro serve non-English speaking residents? Is multilingual support required? |
| **Privacy notice** | Public must be informed if their address input is logged or processed by AI |
| **Transparency disclosure** | Oregon and general best practice: disclose this is an automated system, not a human |
| **Terms of use** | What happens if the bot gives wrong information and someone misses pickup? |
| **ADA compliance** | Screen reader compatibility for the chat widget |

---

## Recommended Stack (Metro Context)

| Layer | Tool | Notes |
|---|---|---|
| Chatbot UI | **Copilot Studio** | Embeds on Metro website, M365-native, no new vendor |
| Address lookup | **Power Automate connector** → schedule database or API | Keeps data in Metro boundary |
| Geocoding (if needed) | **Azure Maps** | Stays within Azure tenant vs. Google |
| Logging/monitoring | **Application Insights** (Azure) | Bot usage analytics without storing PII |
| Escalation | **Omnichannel for Customer Service** or phone/email link | Human handoff when bot fails |

---

## Rollback Steps
If the bot goes live with bad data or misbehaves:
1. Copilot Studio bots can be **unpublished instantly** from the admin portal
2. Redirect the embed URL to a static "use our pickup schedule lookup tool" page as a backup
3. Review Application Insights logs to identify the failure pattern
4. Fix data source or prompt, re-test, republish

---

## ➡️ Concrete Next Step

**The single most important question to answer right now:**

> *Where does the recycling schedule data actually live, who maintains it, and is there a way to query it programmatically by address today?*

If the answer is "a spreadsheet" or "I'm not sure," that's your Phase 1 work — and it has nothing to do with AI. Get the data layer solid first, and the chatbot becomes straightforward to build.`,
  },
  {
    id: "prompt-review",
    title: "HR Policy Agent Prompt Review",
    category: "Prompt Review",
    prompt:
      'Review this agent prompt: "You are a helpful assistant. Answer any questions from Metro staff about HR policies based on the documents provided."',
    response: `## Prompt Review: HR Policy Assistant

**Prompt submitted:**
> *"You are a helpful assistant. Answer any questions from Metro staff about HR policies based on the documents provided."*

---

## What Works ✅

- **Scoped to a document set** — "based on the documents provided" is a meaningful constraint that reduces hallucination risk versus open-web answering
- **Audience defined** — "Metro staff" establishes this isn't a public-facing tool
- **Task is clear at a high level** — HR policy Q&A is a legitimate, high-value use case

---

## What's Missing ⚠️

### 🔴 Critical Gaps

**1. No hallucination guardrail**
The prompt doesn't instruct the model to say "I don't know" when an answer isn't in the documents. Without this, the model will confidently synthesize an answer from general HR knowledge — which may contradict Metro's actual policy. In an HR context, that's a liability.

**2. No citation requirement**
Staff have no way to verify an answer or trace it back to the source document. If someone acts on incorrect guidance about leave policy or a disciplinary procedure, there's no audit trail showing what the bot said or where it pulled from.

**3. No scope boundary**
"Any questions about HR policies" is dangerously broad. What happens when someone asks:
- *"Can I be fired for this?"* — legal advice territory
- *"What did my manager say in my performance review?"* — personal record, not policy
- *"Is this situation harassment?"* — requires human judgment and may trigger formal reporting obligations

**4. No human escalation path**
HR questions frequently touch sensitive personal situations. The prompt provides no instruction to refer staff to an HR representative for complex, sensitive, or ambiguous matters. An AI should never be the final word on employment decisions.

**5. No confidentiality or role-awareness**
HR documents often contain tiered information — some policies apply differently to managers vs. individual contributors, union vs. non-union staff. The prompt doesn't account for this.

---

## Revised Version ✅

\`\`\`
You are an HR Policy Reference Assistant for Oregon Metro staff.
Your role is to help employees understand Metro's HR policies by
referencing the official policy documents provided to you.

ANSWERING GUIDELINES:
- Only answer based on the policy documents provided. Do not use
  general HR knowledge, legal knowledge, or information from
  outside these documents.
- Always cite the specific policy name and section number your
  answer is drawn from (e.g., "Per Policy 4.2 – Leave of Absence,
  Section 3...").
- If the answer is not clearly addressed in the provided documents,
  say: "I don't see a clear answer to that in the current policy
  documents. I'd recommend contacting HR directly at [contact info]."
- If a question is ambiguous, ask one clarifying question before
  answering.

SCOPE BOUNDARIES — Do not attempt to answer questions that:
- Require legal advice or interpretation of employment law
- Involve a specific employee's personal records, performance,
  or individual circumstances
- Ask you to make a judgment about whether a specific situation
  violates policy
- Involve active workplace investigations, complaints, or
  accommodations requests

For any of the above, respond with:
"This type of question needs direct support from an HR team member.
Please contact [HR contact or ticketing system link]."

TONE: Be clear, professional, and neutral. Do not offer opinions,
reassurance, or legal conclusions.

TRANSPARENCY: If asked whether you are an AI, always confirm that
you are an automated assistant and not a human HR representative.
\`\`\`

---

## Rollback Steps
If this agent produces a harmful or incorrect response:
1. **Suspend the agent immediately** via Copilot Studio — takes effect instantly
2. **Preserve the conversation log** showing the problematic exchange — do not delete
3. **Notify HR leadership** if the response could have affected an employment decision
4. **Identify root cause**: Was it a document gap, a prompt gap, or a model behavior issue?
5. **Do not republish** until the gap is patched and tested against the failure case

---

## Compliance Flags Before Deployment

- [ ] **RBAC**: Confirm this agent is staff-only, not accessible to the public or contractors without authorization
- [ ] **Conversation logging**: All interactions should be logged with user ID, timestamp, question, and response
- [ ] **Document governance**: Who owns the policy documents loaded into the agent? What's the update process when policies change?
- [ ] **Union considerations**: Does Metro have collective bargaining agreements? Union-covered staff may need a separately reviewed document set
- [ ] **Legal review**: Has Metro's legal or HR leadership signed off on AI being used for policy Q&A?

---

## ➡️ Concrete Next Step

**Before refining the prompt further, answer this question:**

> *Who is responsible for maintaining the HR policy documents this agent will reference — and is there a defined process for notifying the IS team when a policy is updated so the document set stays current?*

A stale document set is the most likely way this agent causes real harm. The prompt can be perfect and still produce wrong answers if the underlying documents are 18 months out of date.`,
  },
]
