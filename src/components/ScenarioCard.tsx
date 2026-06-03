import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Scenario } from "@/data/scenarios"

const categoryColors: Record<Scenario["category"], string> = {
  "Workflow Design": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Compliance Gating": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  "Prompt Review": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
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
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 border-l-4 border-l-metro-green p-4">
          <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Scenario</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 italic leading-relaxed">{scenario.prompt}</p>
        </div>

        {/* response */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Advisor Response</p>
          <div className="scenario-prose prose prose-sm prose-neutral dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100
            prose-h2:text-base prose-h2:mt-5 prose-h2:mb-2
            prose-h3:text-sm prose-h3:mt-4 prose-h3:mb-1
            prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:my-1
            prose-li:text-neutral-700 dark:prose-li:text-neutral-300 prose-li:my-0.5
            prose-ul:my-1 prose-ol:my-1
            prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
            prose-code:before:content-none prose-code:after:content-none
            prose-table:text-sm prose-table:w-full
            prose-th:text-left prose-th:font-semibold prose-th:text-neutral-700 dark:prose-th:text-neutral-300 prose-th:border-b prose-th:border-neutral-200 dark:prose-th:border-neutral-700 prose-th:pb-1
            prose-td:text-neutral-700 dark:prose-td:text-neutral-300 prose-td:border-b prose-td:border-neutral-100 dark:prose-td:border-neutral-800 prose-td:py-1
            prose-hr:border-neutral-200 dark:prose-hr:border-neutral-700 prose-hr:my-4
            prose-blockquote:border-l-2 prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-600 prose-blockquote:pl-3 prose-blockquote:italic prose-blockquote:text-neutral-600 dark:prose-blockquote:text-neutral-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{scenario.response}</ReactMarkdown>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
