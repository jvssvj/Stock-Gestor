import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-12 md:p-16">
                    <div className="relative max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            Pronto para tirar o estoque <span className="text-primary">do chute?</span>
                        </h2>
                        <p className="mt-5 text-lg text-muted">
                            Comece em 5 minutos. 14 dias grátis, sem cartão, com suporte humano de verdade.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-glow"
                            >
                                Criar conta grátis <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}