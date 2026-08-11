import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface DataItem {
    label: string;
    value: number;
}

interface CategoryChartProps {
    data: DataItem[];
}

const COLORS = [
    "#1a38db",
    "#7300cc",
    "#0d9488",
    "#e62200",
    "#5977ff",
    "#3db8ab",
];

interface CustomTooltipProps {
    active?: boolean;
    payload?: { name: string; value: number; payload: { percent: number } }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    const item = payload[0];

    const total = payload.reduce((sum, p) => sum + p.value, 0);
    const percent = total > 0 ? (item.value / total) * 100 : 0;

    return (
        <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-sm">
            <p className="text-xs text-muted font-medium">{item.name}</p>
            <p className="text-sm font-bold text-text-main">
                {item.value} {item.value === 1 ? "item" : "itens"} ·{" "}
                {percent.toFixed(0)}%
            </p>
        </div>
    );
}

function CustomLegend({ payload }: { payload?: { color: string; value: string }[] }) {
    if (!payload?.length) return null;
    return (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2">
            {payload.map((entry, index) => (
                <li key={index} className="flex items-center gap-1.5">
                    <span
                        className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs text-muted truncate max-w-[100px]">
                        {entry.value}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default function CategoryChart({ data }: CategoryChartProps) {
    if (!data?.length) {
        return (
            <div className="flex items-center justify-center h-48 text-sm text-muted">
                Nenhuma categoria encontrada.
            </div>
        );
    }

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const chartData = data.map((d) => ({ name: d.label, value: d.value }));

    function TooltipWithTotal({ active, payload }: CustomTooltipProps) {
        if (!active || !payload?.length) return null;
        const item = payload[0];
        const percent = total > 0 ? (item.value / total) * 100 : 0;

        return (
            <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-sm">
                <p className="text-xs text-muted font-medium">{item.name}</p>
                <p className="text-sm font-bold text-text-main">
                    {item.value} {item.value === 1 ? "item" : "itens"} · {percent.toFixed(0)}%
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="relative z-5">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={58}
                            outerRadius={85}
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                            strokeWidth={0}
                        >
                            {chartData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<TooltipWithTotal />} />
                        {/* <Legend content={<CustomLegend />} /> */}
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Total no centro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-muted">Total</span>
                <span className="text-xl font-bold text-text-main">{total}</span>
            </div>
        </div>
    );
}