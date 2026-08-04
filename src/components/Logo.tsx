import { Box } from "lucide-react";
import logo from "../assets/images/logo.svg"

interface LogoProps {
    showLabel?: boolean
}

export default function Logo({ showLabel }: LogoProps) {
    return (
        <div className="flex items-center gap-2.5">
            <div className="relative h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <img className="w-3" src={logo} alt="" />
            </div>
            {showLabel && (
                <span className="font-display font-bold text-lg tracking-tight">
                    Stock <span className="text-primary">Gestor</span>
                </span>
            )}
        </div>
    )

} 
