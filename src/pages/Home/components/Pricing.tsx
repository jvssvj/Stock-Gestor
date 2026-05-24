import { CheckCircle2 } from "lucide-react";

export function Pricing() {
    const plans = [
        {
            name: "Starter",
            price: "R$ 49",
            desc: "Para pequenos negócios começando a organizar o estoque.",
            features: ["Até 500 SKUs", "1 depósito", "Alertas por e-mail", "Relatórios básicos"],
        },
        {
            name: "Pro",
            price: "R$ 149",
            desc: "Crescimento com automação e múltiplas localizações.",
            features: ["SKUs ilimitados", "Até 5 depósitos", "Previsão com IA", "Integrações", "Suporte prioritário"],
            featured: true,
        },
        {
            name: "Empresa",
            price: "Sob medida",
            desc: "Operações complexas com SLA e onboarding dedicado.",
            features: ["Multi-empresa", "API completa", "SSO + auditoria", "Gerente de conta"],
        },
    ];

    return (
        <section id="pricing" className="py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Planos</span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold">Preço justo, sem surpresas</h2>
                    <p className="mt-4 text-muted">Comece grátis por 14 dias. Cancele quando quiser.</p>
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-6">
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            className={`flex flex-col relative rounded-2xl border p-8 ${p.featured
                                ? "border-primary bg-surface shadow-glow"
                                : "border-border bg-surface/40"
                                }`}
                        >
                            {p.featured && (
                                <div className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                                    Mais popular
                                </div>
                            )}
                            <h3 className="font-display text-xl font-bold">{p.name}</h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-4xl font-bold font-display">{p.price}</span>
                                {p.price.startsWith("R$") && <span className="text-sm text-muted">/mês</span>}
                            </div>
                            <p className="mt-3 text-sm text-muted">{p.desc}</p>

                            <ul className="my-6 space-y-3">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="/app"
                                className={`mt-auto text-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${p.featured
                                    ? "bg-primary text-white hover:bg-primary-glow"
                                    : "border border-border hover:bg-surface-elevated"
                                    }`}
                            >
                                {p.name === "Empresa" ? "Falar com vendas" : "Iniciar agora"}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
