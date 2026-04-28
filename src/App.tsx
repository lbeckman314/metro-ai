import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PromptViewer } from "@/components/PromptViewer"
import { ScenarioCard } from "@/components/ScenarioCard"
import { ProcessTimeline } from "@/components/ProcessTimeline"
import { Admonition } from "@/components/Admonition"
import { scenarios } from "@/data/scenarios"

export default function App() {
  return (
    <div className="min-h-screen bg-metro-grey-light dark:bg-neutral-950 text-foreground">

      {/* Metro-style top nav bar */}
      <header className="bg-metro-navy dark:bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold tracking-tight">Oregon Metro</span>
            <span className="text-metro-grey-mid text-sm hidden sm:inline">·</span>
            <span className="text-metro-grey-mid text-sm hidden sm:inline">Information Services</span>
          </div>
          <a
            href="https://www.oregonmetro.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-metro-grey-mid hover:text-white transition-colors"
          >
            oregonmetro.gov ↗
          </a>
        </div>
      </header>

      {/* Metro green accent bar */}
      <div className="h-1 bg-metro-green" />

      {/* page content */}
      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* disclaimer */}
        <Admonition type="important" className="mb-8">
          <p>This is not an official Oregon Metro project — it is an independent demo created as part of the AI Automation Specialist application process.</p>
          
          <p>Oregon Metro's name and branding are used for illustrative purposes only.</p>
        </Admonition>

        {/* page header */}
        <div className="mb-8 pb-6 border-b border-metro-grey-mid dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded bg-metro-green-light text-metro-green px-2.5 py-0.5 text-xs font-semibold font-sans uppercase tracking-wide">
              Claude Project
            </span>
            <span className="text-xs text-muted-foreground">AI Automation Specialist · Job No. 2026-0069-IT-4</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-metro-navy dark:text-white mb-2 tracking-tight">
            AI Automation Specialist Advisor
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl font-sans">
            A Claude Project system prompt scoped to Metro's public-sector constraints, tooling
            stack, and compliance-first automation design — submitted as part of the application
            for the AI Automation Specialist role.
          </p>
        </div>

        {/* tabs */}
        <Tabs defaultValue="prompt">
          <TabsList className="mb-6 bg-white dark:bg-neutral-900 border border-metro-grey-mid dark:border-neutral-800">
            <TabsTrigger value="prompt" className="font-sans data-[state=active]:text-metro-green data-[state=active]:border-b-2 data-[state=active]:border-metro-green">
              System Prompt
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="font-sans data-[state=active]:text-metro-green data-[state=active]:border-b-2 data-[state=active]:border-metro-green">
              Example Scenarios
            </TabsTrigger>
            <TabsTrigger value="process" className="font-sans data-[state=active]:text-metro-green data-[state=active]:border-b-2 data-[state=active]:border-metro-green">
              Build Process
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompt">
            <PromptViewer />
          </TabsContent>

          <TabsContent value="scenarios">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground font-sans">
                Three scenarios used to test and refine the prompt — covering workflow design,
                compliance gating, and prompt review.
              </p>
              {scenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="process">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground font-sans">
                How the system prompt was built — from job description to tested, iterated specification.
              </p>
              <ProcessTimeline />
            </div>
          </TabsContent>
        </Tabs>

        {/* footer */}
        <div className="mt-16 pt-6 border-t border-metro-grey-mid dark:border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-sans">Liam Beckman · liam@liambeckman.com</span>
          <div className="flex gap-4 text-xs text-muted-foreground font-sans">
            <a
              href="https://github.com/lbeckman314/metro-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-metro-green transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://liambeckman.com/code"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-metro-green transition-colors"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
