import { useState } from "react"
import { Copy, Check, Code, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SYSTEM_PROMPT } from "@/data/prompt"
import ReactMarkdown from "react-markdown"

type View = "code" | "preview"

export function PromptViewer() {
  const [copied, setCopied] = useState(false)
  const [view, setView] = useState<View>("code")

  const handleCopy = () => {
    navigator.clipboard.writeText(SYSTEM_PROMPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = SYSTEM_PROMPT.split("\n")

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        {/* view toggle */}
        <div className="flex items-center gap-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-0.5">
          <button
            onClick={() => setView("code")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              view === "code"
                ? "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            Code
          </button>
          <button
            onClick={() => setView("preview")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              view === "preview"
                ? "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
        </div>

        {/* filename + copy */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">CLAUDE.md</span>
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 gap-1.5 text-xs">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      {/* code view */}
      {view === "code" && (
        <div className="overflow-x-auto bg-neutral-50 dark:bg-neutral-950">
          <table className="w-full text-sm font-mono">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i} className="hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                  <td className="select-none text-right pr-4 pl-4 py-0 text-neutral-400 text-xs w-10 leading-6">
                    {i + 1}
                  </td>
                  <td className="pr-6 py-0 leading-6 whitespace-pre-wrap break-words">
                    <HighlightedLine line={line} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* preview view */}
      {view === "preview" && (
        <div className="px-8 py-6 bg-white dark:bg-neutral-950 prose prose-neutral dark:prose-invert prose-sm max-w-none
          prose-headings:font-serif prose-headings:text-metro-navy dark:prose-headings:text-neutral-100
          prose-h1:text-2xl prose-h1:border-b prose-h1:border-neutral-200 prose-h1:pb-2
          prose-h2:text-lg prose-h2:mt-6
          prose-li:marker:text-metro-green
          prose-a:text-metro-green prose-a:no-underline hover:prose-a:underline
          prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
          prose-code:text-metro-green prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1 prose-code:rounded prose-code:text-xs">
          <ReactMarkdown>{SYSTEM_PROMPT}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

function HighlightedLine({ line }: { line: string }) {
  if (line.startsWith("# ")) {
    return <span className="text-purple-600 dark:text-purple-400 font-bold">{line}</span>
  }
  if (line.startsWith("## ")) {
    return <span className="text-blue-600 dark:text-blue-400 font-semibold">{line}</span>
  }
  if (line.match(/^- \*\*.+\*\*/)) {
    const match = line.match(/^(- )(\*\*[^*]+\*\*)(.*)$/)
    if (match) {
      return (
        <span>
          <span className="text-neutral-400">{match[1]}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {match[2].replace(/\*\*/g, "")}
          </span>
          <span className="text-neutral-700 dark:text-neutral-300">{match[3]}</span>
        </span>
      )
    }
  }
  if (line.startsWith("- ") || line.startsWith("  - ")) {
    return <span className="text-neutral-700 dark:text-neutral-300">{line}</span>
  }
  if (line.trim() === "") return <span>&nbsp;</span>
  return <span className="text-neutral-700 dark:text-neutral-300">{line}</span>
}
