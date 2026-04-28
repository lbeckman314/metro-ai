import { Info, Lightbulb, MessageSquareWarning, TriangleAlert, OctagonAlert } from "lucide-react"
import { cn } from "@/lib/utils"

export type AdmonitionType = "note" | "tip" | "important" | "warning" | "caution"

const config: Record<AdmonitionType, {
  label: string
  icon: React.ElementType
  classes: string
  iconClass: string
  titleClass: string
}> = {
  note: {
    label: "Note",
    icon: Info,
    classes: "bg-blue-50 border-blue-400 dark:bg-blue-950/40 dark:border-blue-500",
    iconClass: "text-blue-600 dark:text-blue-400",
    titleClass: "text-blue-700 dark:text-blue-300",
  },
  tip: {
    label: "Tip",
    icon: Lightbulb,
    classes: "bg-green-50 border-green-500 dark:bg-green-950/40 dark:border-green-500",
    iconClass: "text-green-600 dark:text-green-400",
    titleClass: "text-green-700 dark:text-green-300",
  },
  important: {
    label: "Important",
    icon: MessageSquareWarning,
    classes: "bg-purple-50 border-purple-500 dark:bg-purple-950/40 dark:border-purple-500",
    iconClass: "text-purple-600 dark:text-purple-400",
    titleClass: "text-purple-700 dark:text-purple-300",
  },
  warning: {
    label: "Warning",
    icon: TriangleAlert,
    classes: "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/40 dark:border-yellow-500",
    iconClass: "text-yellow-600 dark:text-yellow-400",
    titleClass: "text-yellow-700 dark:text-yellow-300",
  },
  caution: {
    label: "Caution",
    icon: OctagonAlert,
    classes: "bg-red-50 border-red-500 dark:bg-red-950/40 dark:border-red-500",
    iconClass: "text-red-600 dark:text-red-400",
    titleClass: "text-red-700 dark:text-red-300",
  },
}

interface AdmonitionProps {
  type: AdmonitionType
  children: React.ReactNode
  className?: string
}

export function Admonition({ type, children, className }: AdmonitionProps) {
  const { label, icon: Icon, classes, iconClass, titleClass } = config[type]

  return (
    <div className={cn(
      "rounded border-l-4 px-4 py-3 text-sm font-sans",
      classes,
      className
    )}>
      <div className={cn("flex items-center gap-1.5 font-semibold mb-1", titleClass)}>
        <Icon className={cn("h-4 w-4 shrink-0", iconClass)} />
        {label}
      </div>
      <div className="text-foreground leading-relaxed">{children}</div>
    </div>
  )
}
