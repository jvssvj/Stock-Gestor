import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface DataItem {
    label: string;
    value: number;
}

interface TopMovementsChartProps {
    data: DataItem[];
}

const COLORS = [
    "#1a38db",
    "#5977ff",
    "#7300cc",
    "#0d9488",
    "#e62200",
];

interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-sm">
            <p className="text-xs text-muted font-medium">{label}</p>
            <p className="text-sm font-bold text-text-main">
                {payload[0].value} {payload[0].value === 1 ? "movimentação" : "movimentações"}
            </p>
        </div>
    );
}
export default function TopMovementsChart({ data }: TopMovementsChartProps) {
    const hasMovements = data.some((item) => item.value > 0)

    if (!hasMovements) {
        return (
            <div className="flex items-center justify-center h-48 text-sm text-muted">
                Nenhuma movimentação registrada.
            </div>
        )
    }

    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart
                data={data}
                margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
                barSize={36}
            >
                <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="4 4" />
                <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "#374151" }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tickFormatter={(v) => (v.length > 10 ? v.slice(0, 10) + "…" : v)}
                />
                <YAxis
                    tick={{ fontSize: 11, fill: "#374151" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0f2f8" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}