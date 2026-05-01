import { Box } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Logo({ label, color, size }) {
    return (
        <Link
            className="flex items-center gap-2 no-underline font-semibold text-[var(--color-text)] w-max"
            style={{ color: `var(--color-${color})` }}
            to={'/'}
        >
            <div
                className="bg-primary rounded-lg flex items-center justify-center"
                style={{ color: `var(--color-${color})`, width: `${size}px`, height: `${size}px` }}
            >
                <Box />
            </div>
            {label}
        </Link>
    )
}
