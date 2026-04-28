import { processSteps } from "@/data/process"

export function ProcessTimeline() {
  return (
    <div className="relative">
      {/* vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-metro-grey-mid dark:bg-neutral-800" />

      <div className="space-y-8">
        {processSteps.map((step) => (
          <div key={step.phase} className="relative flex gap-6">
            {/* phase bubble */}
            <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-white dark:bg-neutral-950 border-2 border-metro-green flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-metro-green">{step.phase}</span>
            </div>

            {/* content */}
            <div className="pt-2 pb-2 flex-1 min-w-0">
              <p className="text-xs font-semibold text-metro-green uppercase tracking-wide mb-0.5 font-sans">
                {step.description}
              </p>
              <h3 className="font-serif font-semibold text-metro-navy dark:text-neutral-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
