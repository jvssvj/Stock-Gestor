import { AlertTriangle, Package } from "lucide-react";

export function ProductRow({ name, sku, qty, status }: { name: string; sku: string; qty: number; status: "ok" | "low" }) {
    return (
        <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-md bg-surface-elevated flex items-center justify-center">
                    <Package className="h-3.5 w-3.5 text-muted" />
                </div>
                <div>
                    <div className="text-xs font-medium">{name}</div>
                    <div className="text-[10px] text-muted font-mono">{sku}</div>
                </div>
            </div>
            <div className={`text-xs font-mono font-semibold ${status === "low" ? "text-warning" : "text-foreground"}`}>
                {status === "low" && <AlertTriangle className="inline h-3 w-3 mr-1" />}
                {qty} un
            </div>
        </div>
    );
}