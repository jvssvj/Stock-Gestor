export function Stats() {
    return (
        <section className="py-20 mx-6">
            <div className="mx-auto max-w-container grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { v: "37%", l: "Menos rupturas em 60 dias" },
                    { v: "2.5h", l: "Economizadas por semana" },
                    { v: "99.9%", l: "Uptime garantido" },
                    { v: "4.9/5", l: "Avaliação média de clientes" },
                ].map((s) => (
                    <div key={s.l} className="text-center md:text-left">
                        <span className="block text-4xl md:text-5xl font-bold font-display bg-clip-text text-primary">
                            {s.v}
                        </span>
                        <span className="mt-2 text-sm text-muted">{s.l}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
