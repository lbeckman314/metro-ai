import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Scenario } from "@/data/scenarios"

const categoryColors: Record<Scenario["category"], string> = {
  "Workflow Design": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Compliance Gating": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  "Prompt Review": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
}

function renderResponse(text: string) {
  return text.split("\n").map((line, i) => {
    // code block fences — handled by wrapper below
    if (line.startsWith("```")) return null

    // bold heading lines like **Recommendation:**
    const boldLine = line.match(/^\*\*(.+)\*\*$/)
    if (boldLine) {
      return (
        <p key={i} className="font-semibold text-neutral-900 dark:text-neutral-100 mt-4 mb-1">
          {boldLine[1]}
        </p>
      )
    }

    // numbered list
    const numbered = line.match(/^(\d+)\. (.+)/)
    if (numbered) {
      return (
        <div key={i} className="flex gap-2 ml-2 mb-1">
          <span className="text-neutral-400 font-mono text-xs mt-0.5 shrink-0">{numbered[1]}.</span>
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">{renderInline(numbered[2])}</span>
        </div>
      )
    }

    // bullet list
    if (line.startsWith("- ")) {
      return (
        <div key={i} className="flex gap-2 ml-2 mb-1">
          <span className="text-neutral-400 mt-1.5 shrink-0">·</span>
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">{renderInline(line.slice(2))}</span>
        </div>
      )
    }

    // empty line
    if (line.trim() === "") return <div key={i} className="h-2" />

    // default paragraph
    return (
      <p key={i} className="text-neutral-700 dark:text-neutral-300 text-sm">
        {renderInline(line)}
      </p>
    )
  })
}

function renderInline(text: string): React.ReactNode {
  // bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    // inline code `text`
    const codeParts = part.split(/(`[^`]+`)/)
    return codeParts.map((cp, j) => {
      if (cp.startsWith("`") && cp.endsWith("`")) {
        return (
          <code key={j} className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">
            {cp.slice(1, -1)}
          </code>
        )
      }
      return cp
    })
  })
}

// Extract code blocks and render them separately
function renderWithCodeBlocks(text: string) {
  const segments = text.split(/(```[\s\S]*?```)/g)
  return segments.map((seg, i) => {
    if (seg.startsWith("```")) {
      const code = seg.replace(/^```\w*\n?/, "").replace(/```$/, "")
      return (
        <pre key={i} className="mt-3 mb-2 rounded-lg bg-neutral-900 dark:bg-neutral-950 p-4 overflow-x-auto text-xs font-mono text-neutral-200 leading-relaxed">
          {code}
        </pre>
      )
    }
    return <div key={i}>{renderResponse(seg)}</div>
  })
}

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base">{scenario.title}</CardTitle>
          <span className={`shrink-0 inline-flex items-center rounded-md border-0 px-2.5 py-0.5 text-xs font-semibold ${categoryColors[scenario.category]}`}>
            {scenario.category}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* prompt */}
        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-900 p-4">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Scenario</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">{scenario.prompt}</p>
        </div>

        {/* response */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Advisor Response</p>
          <div className="space-y-1">{renderWithCodeBlocks(scenario.response)}</div>
        </div>
      </CardContent>
    </Card>
  )
}
