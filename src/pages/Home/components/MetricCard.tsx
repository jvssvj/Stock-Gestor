export function MetricCard({ label, value, trend, negative }: { label: string; value: string; trend: string; negative?: boolean }) {
    return (
        <div className="rounded-xl bg-background/60 border border-border p-3">
            <div className="text-xs text-muted">{label}</div>
            <div className="mt-1 text-xl font-bold font-display">{value}</div>
            <div className={`text-[10px] mt-0.5 ${negative ? "text-success" : "text-success"}`}>{trend}</div>
        </div>
    );
}