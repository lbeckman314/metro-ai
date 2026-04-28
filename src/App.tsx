import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PromptViewer } from "@/components/PromptViewer"
import { ScenarioCard } from "@/components/ScenarioCard"
import { scenarios } from "@/data/scenarios"

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
              Claude Project
            </span>
            <span className="text-xs text-neutral-400">Oregon Metro · AI Automation Specialist</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">AI Automation Specialist Advisor</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed">
            A Claude Project system prompt designed to act as an AI advisor for the Metro AI Automation Specialist role.
          </p>
        </div>

        {/* tabs */}
        <Tabs defaultValue="prompt">
          <TabsList className="mb-6">
            <TabsTrigger value="prompt">System Prompt</TabsTrigger>
            <TabsTrigger value="scenarios">Example Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="prompt">
            <PromptViewer />
          </TabsContent>

          <TabsContent value="scenarios">
            <div className="space-y-6">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Three scenarios used to test and refine the prompt — covering workflow design,
                compliance gating, and prompt review.
              </p>
              {scenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          </TabsContent>

        </Tabs>

        {/* footer */}
        <div className="mt-16 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-400">Liam Beckman</span>
          <div className="flex gap-4 text-xs text-neutral-400">
            <a
              href="https://github.com/beckmanl314/metro-ai-advisor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://liambeckman.com/code"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
