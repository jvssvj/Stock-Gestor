import Logo from "@/components/Logo";
import { Box } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border py-12 mx-6">
            <div className="mx-auto max-w-container flex flex-col md:flex-row items-center justify-between gap-6">
                <Logo showLabel />
                <p className="text-xs text-muted">
                    © 2026 Stock Gestor. Feito para quem leva estoque a sério.
                </p>
                <div className="flex gap-6 text-xs text-muted">
                    <a href="#" className="hover:text transition-colors">Privacidade</a>
                    <a href="#" className="hover:text transition-colors">Termos</a>
                    <a href="#" className="hover:text transition-colors">Contato</a>
                </div>
            </div>
        </footer>
    );
}
