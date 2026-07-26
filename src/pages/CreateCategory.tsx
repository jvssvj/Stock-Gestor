import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    ArrowLeft, Check, ChevronLeft, ChevronRight,
    Package, Tag, Box, Truck, ShoppingCart, Layers, Archive, Boxes,
    ShoppingBag, Wrench, Headphones, Monitor, Keyboard, Mouse, HardDrive,
    Cable, Camera, Cpu, Smartphone, Wifi, Battery, Printer, Gamepad2,
    Watch, Speaker, Tv, Router, Usb, Disc, Server, Lightbulb, Plug,
    Shirt, Gift, Book, Coffee, Utensils,
    type LucideIcon
} from "lucide-react"
import { createCategoryService } from "@/services/appService";

const ICON_OPTIONS: { name: string; Icon: LucideIcon }[] = [
    { name: "Package", Icon: Package },
    { name: "Tag", Icon: Tag },
    { name: "Box", Icon: Box },
    { name: "Boxes", Icon: Boxes },
    { name: "Layers", Icon: Layers },
    { name: "Archive", Icon: Archive },
    { name: "Truck", Icon: Truck },
    { name: "ShoppingCart", Icon: ShoppingCart },
    { name: "ShoppingBag", Icon: ShoppingBag },
    { name: "Wrench", Icon: Wrench },
    { name: "Headphones", Icon: Headphones },
    { name: "Monitor", Icon: Monitor },
    { name: "Keyboard", Icon: Keyboard },
    { name: "Mouse", Icon: Mouse },
    { name: "HardDrive", Icon: HardDrive },
    { name: "Cable", Icon: Cable },
    { name: "Camera", Icon: Camera },
    { name: "Cpu", Icon: Cpu },
    { name: "Smartphone", Icon: Smartphone },
    { name: "Wifi", Icon: Wifi },
    { name: "Battery", Icon: Battery },
    { name: "Printer", Icon: Printer },
    { name: "Gamepad2", Icon: Gamepad2 },
    { name: "Watch", Icon: Watch },
    { name: "Speaker", Icon: Speaker },
    { name: "Tv", Icon: Tv },
    { name: "Router", Icon: Router },
    { name: "Usb", Icon: Usb },
    { name: "Disc", Icon: Disc },
    { name: "Server", Icon: Server },
    { name: "Lightbulb", Icon: Lightbulb },
    { name: "Plug", Icon: Plug },
    { name: "Shirt", Icon: Shirt },
    { name: "Gift", Icon: Gift },
    { name: "Book", Icon: Book },
    { name: "Coffee", Icon: Coffee },
    { name: "Utensils", Icon: Utensils },
]

const COLOR_OPTIONS = [
    "#3852B4", "#9310FF", "#14B8A6", "#10B981", "#F59E0B",
    "#EF4444", "#EC4899", "#6366F1", "#0EA5E9", "#64748B",
    "#F97316", "#84CC16", "#22C55E", "#06B6D4", "#8B5CF6",
    "#D946EF", "#F43F5E", "#EAB308", "#78716C", "#000333",
] as const

function Carousel({ children }: { children: React.ReactNode }) {
    const scrollerRef = useRef<HTMLDivElement>(null)

    const scrollBy = (dir: 1 | -1) => {
        const el = scrollerRef.current
        if (!el) return
        el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" })
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Anterior"
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-text-main shadow-sm transition-colors hover:bg-bg"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            <div
                ref={scrollerRef}
                className="flex gap-2 overflow-x-auto scroll-smooth px-8 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {children}
            </div>

            <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Próximo"
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-text-main shadow-sm transition-colors hover:bg-bg"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    )
}

export default function CreateCategoryPage() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [iconName, setIconName] = useState("Package")
    const [color, setColor] = useState<string>(COLOR_OPTIONS[0])

    const SelectedIcon = ICON_OPTIONS.find((i) => i.name === iconName)?.Icon ?? Package

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await createCategoryService({ name, iconName, color })

            navigate("/app/success", {
                state: {
                    status: "create",
                    resource: "category",
                    data: {
                        id: response.data.id,
                        name: response.data.name,
                        color: response.data.color,
                        iconName: response.data.iconName
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="w-full max-w-container px-4 py-8 md:px-6">
            <div className="mb-8">
                <Link
                    to="/app/categories"
                    className="inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-text-main no-underline"
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Voltar para categorias
                </Link>
                <h1 className="mt-3 text-2xl font-bold text-text-main">Nova categoria</h1>
                <p className="mt-1 text-sm text-text-muted">
                    Defina nome, ícone e cor para identificar a categoria.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Preview */}
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                    <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors"
                        style={{ backgroundColor: `${color}5A`, color }}
                    >
                        <SelectedIcon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                            Prévia
                        </p>
                        <p className="truncate text-base font-semibold text-text-main">
                            {name || "Nome da categoria"}
                        </p>
                    </div>
                </div>

                {/* Nome */}
                <div className="rounded-2xl border border-border bg-white p-6">
                    <label htmlFor="name" className="block text-sm font-semibold text-text-main">
                        Nome da categoria
                    </label>
                    <p className="mt-1 text-xs text-text-muted">
                        Um nome curto e descritivo. Ex.: Eletrônicos, Periféricos.
                    </p>
                    <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o nome da categoria"
                        className="mt-3 h-10 w-full rounded-lg border border-border bg-white px-3 text-sm placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* Ícone */}
                <div className="rounded-2xl border border-border bg-white p-6">
                    <p className="text-sm font-semibold text-text-main">Ícone</p>
                    <p className="mt-1 mb-4 text-xs text-text-muted">Deslize para escolher um ícone.</p>
                    <Carousel>
                        {ICON_OPTIONS.map(({ name: n, Icon }) => {
                            const active = iconName === n
                            return (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => setIconName(n)}
                                    aria-label={n}
                                    aria-pressed={active}
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-all ${active
                                        ? "border-primary bg-primary/10 text-primary shadow-sm scale-105"
                                        : "border-border bg-white text-text-muted hover:border-primary/40 hover:text-text-main"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                </button>
                            )
                        })}
                    </Carousel>
                </div>

                {/* Cor */}
                <div className="rounded-2xl w-full border border-border bg-white p-6">
                    <p className="text-sm font-semibold text-text-main">Cor</p>
                    <p className="mt-1 mb-4 text-xs text-text-muted">Deslize para escolher uma cor.</p>
                    <Carousel>
                        {COLOR_OPTIONS.map((c) => {
                            const active = color === c
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    aria-label={c}
                                    aria-pressed={active}
                                    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110 ${active ? "ring-2 ring-offset-2 ring-offset-white scale-110" : ""}`}
                                    style={{
                                        backgroundColor: c,
                                        ...(active ? { boxShadow: `0 0 0 2px ${c}` } : {}),
                                    }}
                                >
                                    {active && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                                </button>
                            )
                        })}
                    </Carousel>
                    <p className="mt-4 font-mono text-xs text-text-muted">{color}</p>
                </div>

                {/* Ações */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Link
                        to="/app/categories"
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-semibold text-text-main transition-colors hover:bg-bg no-underline"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                    >
                        <Check className="h-4 w-4" /> Salvar categoria
                    </button>
                </div>

            </form>
        </main>
    )
}