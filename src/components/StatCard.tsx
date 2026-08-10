import { cloneElement, type ReactElement } from "react"

interface InfosProps {
  iconElement: ReactElement<any, any>
  title: string
  quantity: number
  color: keyof typeof colorMap
}

const colorMap = {
  blue: {
    bg: "bg-blue-200",
    icon: "text-blue-600",
  },
  red: {
    bg: "bg-red-200",
    icon: "text-red-600",
  },
  green: {
    bg: "bg-green-200",
    icon: "text-green-600",
  },
  orange: {
    bg: "bg-orange-200",
    icon: "text-orange-600",
  },
  purple: {
    bg: "bg-purple-200",
    icon: "text-purple-600",
  },
} as const

export default function StatCard({
  iconElement,
  title,
  quantity,
  color,
}: InfosProps) {
  const colors = colorMap[color]

  const styledIcon = cloneElement(iconElement, {
    className: colors.icon,
  } as any)

  return (
    <div className="flex w-full flex-col gap-4 p-5 rounded-xl bg-white border border-gray-200">
      <div className={`w-fit p-3 rounded-lg ${colors.bg}`}>
        {styledIcon}
      </div>

      <div>
        <p className="text-sm text-muted">
          {title}
        </p>

        <span className="text-2xl font-bold text-text-dark">
          {quantity}
        </span>
      </div>
    </div>
  )
}