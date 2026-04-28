import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SYSTEM_PROMPT } from "@/data/prompt"

export function PromptViewer() {
  const [copied, setCopied] = useState(false)

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
        <span className="text-xs font-mono text-neutral-500">CLAUDE.md</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 gap-1.5 text-xs">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      {/* code block */}
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
    </div>
  )
}

function HighlightedLine({ line }: { line: string }) {
  // h1
  if (line.startsWith("# ")) {
    return <span className="text-purple-600 dark:text-purple-400 font-bold">{line}</span>
  }
  // h2
  if (line.startsWith("## ")) {
    return <span className="text-blue-600 dark:text-blue-400 font-semibold">{line}</span>
  }
  // list items with bold key
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
  // plain list items
  if (line.startsWith("- ") || line.startsWith("  - ")) {
    return <span className="text-neutral-700 dark:text-neutral-300">{line}</span>
  }
  // empty
  if (line.trim() === "") return <span>&nbsp;</span>
  // default
  return <span className="text-neutral-700 dark:text-neutral-300">{line}</span>
}
