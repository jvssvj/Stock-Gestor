import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface CategoryIconProps {
    iconName?: string
    color?: string
    size?: number
    name?: string
}

export default function CategoryIcon({
    iconName = "Package",
    color = "#3852B4",
    size = 20,
    name = "Sem categoria"
}: CategoryIconProps) {
    const Icon = Icons[iconName as keyof typeof Icons] as LucideIcon | undefined

    if (!Icon) return null

    return (
        <div className="flex items-center gap-4">
            <div
                className="p-2 rounded-lg"
                style={{
                    backgroundColor: `${color}4A`,
                }}

            >
                <Icon size={size} color={color} />
            </div>
            <p className="truncate">{name}</p>
        </div>
    )
}