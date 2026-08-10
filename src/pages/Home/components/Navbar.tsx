import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, ChevronDown, LayoutDashboard, LogOut, Menu, Settings, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMenuOpen(false)
        setProfileDropdownOpen(false)
    }, [location.pathname])

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setProfileDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Bloqueia scroll quando menu mobile está aberto
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [menuOpen])

    const userName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Usuário'
    const initials = [user?.firstName?.[0], user?.lastName?.[0]]
        .filter(Boolean)
        .join('')
        .toUpperCase() || userName.slice(0, 1).toUpperCase()

    const navLinks = [
        { label: "Recursos", href: "#features" },
        { label: "Fluxo", href: "#workflow" },
        { label: "Planos", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
    ]

    return (
        <>
            <header className="fixed top-0 w-full z-50 border-b bg-bg border-border/50 px-6">
                <div className="max-w-container mx-auto h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="relative flex items-center gap-2.5 z-10">
                        <Logo showLabel />
                    </a>

                    {/* Nav desktop */}
                    <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Ações desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 rounded-lg bg-red-500 px-2 py-1.5 text-sm text-text-main shadow-sm transition-colors hover:bg-bg cursor-pointer"
                                    onClick={() => setProfileDropdownOpen(prev => !prev)}
                                >
                                    {user.avatarUrl ? (
                                        <img
                                            className="h-8 w-8 rounded-full border border-border object-cover"
                                            src={user.avatarUrl}
                                            alt="Avatar"
                                        />
                                    ) : (
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-white">
                                            {initials}
                                        </span>
                                    )}
                                    <span className="hidden max-w-[140px] truncate font-medium sm:block">{user?.firstName}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`text-text-muted transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <div className={`absolute right-0 top-12 w-56 rounded-lg border border-border bg-white p-2 shadow-lg transition-all duration-150 ${profileDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
                                    <div className="border-b border-border px-2 py-2 mb-1">
                                        <div className="truncate text-[13px] font-medium text-text-main">{userName}</div>
                                        {user.email && (
                                            <span className="block truncate text-[11px] text-text-muted">{user.email}</span>
                                        )}
                                    </div>

                                    <Link
                                        to="/app"
                                        className="flex items-center gap-2.5 rounded-lg p-2.5 text-[13px] text-text-muted no-underline transition-colors hover:bg-primary hover:text-white"
                                    >
                                        <LayoutDashboard size={16} className="shrink-0" />
                                        Dashboard
                                    </Link>

                                    <Link
                                        to="/app/settings"
                                        className="flex items-center gap-2.5 rounded-lg p-2.5 text-[13px] text-text-muted no-underline transition-colors hover:bg-primary hover:text-white"
                                    >
                                        <Settings size={16} className="shrink-0" />
                                        Configurações
                                    </Link>

                                    <div className="border-t border-border mt-1 pt-1">
                                        <button
                                            type="button"
                                            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg border-none bg-transparent p-2.5 text-left text-[13px] text-text-muted transition-colors hover:bg-danger hover:text-white"
                                            onClick={() => {
                                                setProfileDropdownOpen(false)
                                                navigate('/', { replace: true })
                                                setTimeout(() => logout(), 1)
                                            }}
                                        >
                                            <LogOut size={16} className="shrink-0" />
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Entrar
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                                >
                                    Começar grátis
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Botão hamburguer */}
                    <button
                        type="button"
                        className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-white text-text-main transition-colors hover:bg-bg cursor-pointer"
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Menu mobile */}
                <div className={`md:hidden fixed w-full top-16 z-40 bg-bg transition-all duration-300 ease-in-out ${menuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                    } rounded-b-2xl`}>

                    <div className="flex flex-col overflow-y-auto px-6 py-6 gap-1">

                        {/* Nav links */}
                        <div className="mb-4">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2 px-2">Navegação</p>
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center rounded-lg px-2 py-3 text-sm text-text-main hover:bg-bg transition-colors no-underline"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <div className="border-t border-border pt-4">
                            {user ? (
                                <>
                                    {/* Info do usuário */}
                                    <div className="flex items-center gap-3 px-2 py-3 mb-2">
                                        {user.avatarUrl ? (
                                            <img
                                                className="h-10 w-10 rounded-full border border-border object-cover shrink-0"
                                                src={user.avatarUrl}
                                                alt="Avatar"
                                            />
                                        ) : (
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                                                {initials}
                                            </span>
                                        )}
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-text-main">{userName}</p>
                                            {user.email && (
                                                <p className="truncate text-xs text-text-muted">{user.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <Link
                                        to="/app"
                                        className="flex items-center gap-2.5 rounded-lg px-2 py-3 text-sm text-text-main no-underline transition-colors hover:bg-bg"
                                    >
                                        <LayoutDashboard size={18} className="shrink-0 text-text-muted" />
                                        Dashboard
                                    </Link>

                                    <Link
                                        to="/app/settings"
                                        className="flex items-center gap-2.5 rounded-lg px-2 py-3 text-sm text-text-main no-underline transition-colors hover:bg-bg"
                                    >
                                        <Settings size={18} className="shrink-0 text-text-muted" />
                                        Configurações
                                    </Link>

                                    <div className="border-t border-border mt-2 pt-2">
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-2.5 rounded-lg px-2 py-3 text-sm text-danger transition-colors hover:bg-danger-subtle cursor-pointer border-none bg-transparent text-left"
                                            onClick={() => {
                                                setMenuOpen(false)
                                                navigate('/', { replace: true })
                                                setTimeout(() => logout(), 1)
                                            }}
                                        >
                                            <LogOut size={18} className="shrink-0" />
                                            Sair
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 mt-2">
                                    <Link
                                        to="/login"
                                        className="flex h-10 items-center justify-center rounded-lg border border-border text-sm font-medium text-text-main no-underline transition-colors hover:bg-bg"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                                    >
                                        Começar grátis
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div className={`bg-black w-full fixed top-0 h-full z-10 transition-opacity duration-300 ${menuOpen ? 'opacity-80 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}></div>
        </>
    );
}