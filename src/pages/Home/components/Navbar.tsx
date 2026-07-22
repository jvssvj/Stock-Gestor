import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, ChevronDown, LogOut, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface UserProps {
    avatarUrl: string
    firstName: string
    lastName: string
}

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

    useEffect(() => {
        setProfileDropdownOpen(false)
    }, [location.pathname])

    const userName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.name || 'Usuário'
    const initials = [user?.firstName?.[0], user?.lastName?.[0]]
        .filter(Boolean)
        .join('')
        .toUpperCase() || userName.slice(0, 1).toUpperCase()

    return (
        <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl mx-6">
            <div className=" mx-auto max-w-container h-16 flex items-center justify-between">
                <a href="#" className="relative flex items-center gap-2.5">
                    <Logo showLabel />
                </a>

                <nav className="flex items-center gap-8 text-sm text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition-colors">Recursos</a>
                    <a href="#workflow" className="hover:text-foreground transition-colors">Fluxo</a>
                    <a href="#pricing" className="hover:text-foreground transition-colors">Planos</a>
                    <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
                </nav>

                {user ? (
                    <div className="relative">
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 text-sm text-text-main shadow-sm transition-colors hover:bg-bg"
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

                        <div
                            className={`absolute right-0 top-12 w-56 rounded-lg border border-border bg-white p-2 shadow-lg transition-all duration-150 ${profileDropdownOpen
                                ? 'visible translate-y-0 opacity-100'
                                : 'invisible -translate-y-1 opacity-0'
                                }`}
                        >
                            <div className="border-b border-border px-2 py-2">
                                <div className="truncate text-[13px] font-medium text-text-main">{userName}</div>
                                {user.email && (
                                    <span className="block truncate text-[11px] text-text-muted">{user.email}</span>
                                )}
                            </div>

                            <Link
                                to="/app/settings"
                                className="mt-2 flex items-center gap-2.5 rounded-lg p-2.5 text-[13px] text-text-muted no-underline transition-colors hover:bg-primary hover:text-white"
                                onClick={() => setProfileDropdownOpen(false)}
                            >
                                <Settings size={18} className="shrink-0" />
                                Configurações
                            </Link>

                            <button
                                type="button"
                                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg border-none bg-transparent p-2.5 text-left text-[13px] text-text-muted transition-colors hover:bg-danger hover:text-white"
                                onClick={() => {
                                    setProfileDropdownOpen(false)
                                    navigate('/', { replace: true })
                                    setTimeout(() => logout(), 1)
                                }}
                            >
                                <LogOut size={18} className="shrink-0" />
                                Sair
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Entrar
                        </Link>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-glow transition-colors"
                        >
                            Começar grátis
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}