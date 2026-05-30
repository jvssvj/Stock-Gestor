import Logo from "@/components/Logo";
import { ArrowRight, Boxes } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl mx-6">
            <div className=" mx-auto max-w-container h-16 flex items-center justify-between">
                <a href="#" className="relative flex items-center gap-2.5">
                    <Logo showLabel />
                </a>

                <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition-colors">Recursos</a>
                    <a href="#workflow" className="hover:text-foreground transition-colors">Fluxo</a>
                    <a href="#pricing" className="hover:text-foreground transition-colors">Planos</a>
                    <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/login" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Entrar
                    </Link>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-glow transition-colors"
                    >
                        Começar grátis
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </header>
    );
}