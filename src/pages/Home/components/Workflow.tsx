import { ArrowRight } from "lucide-react";

export function Workflow() {
    const steps = [
        { n: "01", title: "Importe seus produtos", desc: "Upload de planilha ou integração via API. Setup em poucos minutos." },
        { n: "02", title: "Movimente em tempo real", desc: "Entradas, saídas e transferências com leitor de código de barras." },
        { n: "03", title: "Tome decisões com dados", desc: "Relatórios, previsões e alertas que evitam perdas e rupturas." },
    ];

    return (
        <section id="workflow" className="mx-6 py-28 bg-surface/30 border-y border-border">
            <div className="mx-auto max-w-container">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Como funciona</span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold">Do caos à clareza em 3 passos</h2>
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-6">
                    {steps.map((s, i) => (
                        <div key={s.n} className="relative">
                            <div className="rounded-2xl border border-border bg-background p-8 h-full">
                                <div className="font-mono text-sm text-primary font-bold">{s.n}</div>
                                <h3 className="mt-4 text-xl font-semibold font-display">{s.title}</h3>
                                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <ArrowRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 h-6 w-6 text-primary" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
