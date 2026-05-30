export function Logos() {
    return (
        <section className="py-12 border-y border-border/50 mx-6">
            <div className="mx-auto max-w-container">
                <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
                    Mais de 2.300 negócios confiam no Stock Gestor
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
                    {["NORDEA", "Lumína", "FORJA.CO", "Verdant", "PIXELHAUS", "Atlas&Co"].map((n) => (
                        <span key={n} className="font-display font-semibold text-lg text-muted-foreground tracking-wide">
                            {n}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
