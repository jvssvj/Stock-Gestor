import { Bell, Layers, ScanBarcode, ShieldCheck, TrendingUp, Workflow } from "lucide-react";

export function Features() {
    const features = [
        {
            icon: ScanBarcode,
            title: "Código de barras",
            desc: "Entradas e saídas em segundos, com leitor de qualquer dispositivo.",
        },
        {
            icon: Bell,
            title: "Alertas inteligentes",
            desc: "Avisos automáticos para estoque mínimo, vencimentos e desvios.",
        },
        {
            icon: TrendingUp,
            title: "Previsão com IA",
            desc: "Sugestões de compra baseadas em sazonalidade e histórico de vendas.",
        },
        {
            icon: Layers,
            title: "Multi-depósito",
            desc: "Gerencie múltiplas filiais e localizações em uma única conta.",
        },
        {
            icon: Workflow,
            title: "Integrações",
            desc: "Conecte com seu e-commerce, ERP ou marketplace em minutos.",
        },
        {
            icon: ShieldCheck,
            title: "Auditoria completa",
            desc: "Histórico imutável de cada movimentação e usuário responsável.",
        },
    ];

    return (
        <section id="features" className="py-28 relative mx-6">
            <div className="mx-auto max-w-container">
                <div className="text-center">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Recursos</span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold">
                        Tudo que falta nas planilhas — <span className="text-muted-foreground">sem o que sobra nos ERPs.</span>
                    </h2>
                </div>

                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-border">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="group bg-background hover:bg-surface transition-colors p-8"
                        >
                            <div className="h-11 w-11 rounded-xl bg-surface-elevated border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                                <f.icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
