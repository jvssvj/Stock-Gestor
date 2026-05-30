import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
    return (
        <div className="mb-28 mx-6">
            <section className="mx-auto max-w-container py-24 border border-border p-8 rounded-2xl">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Pronto para tirar o estoque <span className="text-primary">do chute?</span>
                </h2>
                <p className="mt-5 text-lg text-muted">
                    Comece em 5 minutos. 14 dias grátis, sem cartão, com suporte humano de verdade.
                </p>
                <Link
                    to="/register"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-glow"
                >
                    Criar conta grátis <ArrowRight className="h-4 w-4" />
                </Link>
            </section>
        </div>
    );
}