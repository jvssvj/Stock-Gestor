import { ArrowRight, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { ProductRow } from "./ProductRow";
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        {/* <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            Novo: Previsão de demanda com IA
                        </div> */}

                        <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
                            Seu estoque,
                            <br />
                            <span className="relative inline-block">
                                <span className="bg-primary-gradient bg-clip-text text-primary">
                                    sem ruídos.
                                </span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                    <path d="M2 9 Q 150 -2 298 9" stroke="#3852b4" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
                            Stock Gestor centraliza produtos, fornecedores e movimentações em uma
                            interface clara. Acabe com planilhas dispersas, rupturas e excesso de capital parado.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                to="/app"
                                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform"
                            >
                                Gerenciar estoque
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <ul className="mt-10 flex items-center gap-6 text-xs text-light-gray">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-success" /> Sem cartão
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-success" /> Setup em 5 min
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-success" /> Dados em LGPD
                            </li>
                        </ul>
                    </div>

                    {/* Dashboard mock */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-2xl border border-border bg-surface shadow-elevated overflow-hidden">
                            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface-elevated">
                                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                                <span className="ml-3 text-xs text-muted font-mono">stockgestor.app/dashboard</span>
                            </div>

                            <div className="p-5 space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    <MetricCard label="SKUs" value="1.284" trend="+12" />
                                    <MetricCard label="Giro" value="4.2x" trend="+0.3" />
                                    <MetricCard label="Rupturas" value="3" trend="-7" negative />
                                </div>

                                <div className="rounded-xl bg-background/60 border border-border p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold text-muted uppercase tracking-wider">Movimentação 7d</span>
                                        <span className="text-xs text-success flex items-center gap-1">
                                            <TrendingUp className="h-3 w-3" /> +18%
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-1.5 h-20">
                                        {[40, 65, 50, 80, 70, 95, 88].map((h, i) => (
                                            <div key={i} className="flex-1 rounded-t bg-primary opacity-90" style={{ height: `${h}%` }} />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl bg-background/60 border border-border divide-y divide-border">
                                    <ProductRow name="Camiseta Oversized" sku="CAM-OS-01" qty={42} status="ok" />
                                    <ProductRow name="Tênis Runner Pro" sku="TEN-RP-12" qty={3} status="low" />
                                    <ProductRow name="Mochila Trail 30L" sku="MOC-TR-30" qty={18} status="ok" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}