import { cloneElement } from "react"

export default function Infos({ iconElement, title, quantity, color }) {
  const styledIcon = cloneElement(iconElement, {
    className: `text-${color}`
  })

  return (
    <div className="flex-1 flex flex-col gap-3 p-6 bg-white border border-border rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        {styledIcon}
        <span className="text-sm font-medium text-text-muted">
          {title}
        </span>
      </div>
      <span className="text-2xl font-bold text-text-main">
        {quantity}
      </span>
    </div>
  )
}