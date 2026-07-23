/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Box, LogOut, Settings, ChevronRight, ChevronLeft, Tags } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/items', label: 'Estoque', icon: Box },
  { to: '/app/categories', label: 'Categorias', icon: Tags },
]

interface TooltipProps {
  label: string
}

function Tooltip({ label }: TooltipProps) {
  return (
    <span className="
      pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2
      whitespace-nowrap rounded-md bg-white border border-border
      px-2.5 py-1.5 text-xs text-text-main shadow-sm
      opacity-0 group-hover:opacity-100
      transition-opacity duration-150 z-50
    ">
      {label}
    </span>
  )
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(true)
  const [prevPathname, setPrevPathname] = useState('')

  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setCollapsed(true)
  }

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()

  return (
    <>
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-[4]"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside className={`
        flex flex-col fixed z-[5] bg-white border-r border-border shrink-0
        overflow-hidden h-dvh transition-[width] duration-[250ms] ease-in-out
        ${collapsed ? 'w-14' : 'w-[240px]'}
      `}>

        {/* ── Logo ── */}
        <div className="flex items-center justify-center p-3 border-b border-border min-h-14">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <div className="w-7 h-7 rounded-[8px] bg-primary flex items-center justify-center shrink-0">
              <Box size={14} color="white" />
            </div>
            <span className={`
              text-[15px] font-semibold text-text-main whitespace-nowrap
              transition-[opacity,width] duration-200
              ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}
            `}>
              StockFlow
            </span>
          </div>
          <button
            className="w-[35px] h-[35px] rounded-sm bg-transparent border border-border cursor-pointer flex items-center justify-center shrink-0 text-text-muted hover:bg-bg transition-colors duration-150"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 px-2 py-2.5 flex flex-col gap-1 overflow-hidden">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = to === '/app'
              ? location.pathname === '/app'
              : location.pathname.startsWith(to)

            return (
              <Link
                key={to}
                to={to}
                className={`
                  group relative flex items-center gap-2.5 p-2.5 rounded-lg
                  text-[13px] whitespace-nowrap no-underline
                  transition-[background,color] duration-150
                  ${isActive
                    ? 'bg-primary text-white font-medium'
                    : 'text-text-muted hover:bg-primary hover:text-white'
                  }
                `}
              >
                <span className="shrink-0"><Icon size={19} /></span>
                <span className={`overflow-hidden transition-[opacity,width] duration-200 ${collapsed ? 'opacity-0 w-0' : ''}`}>
                  {label}
                </span>
                {collapsed && <Tooltip label={label} />}
              </Link>
            )
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="flex flex-col gap-1 border-t border-border px-2 py-2.5">

          {/* User */}
          <div className="group relative flex items-center gap-2.5 h-14 pl-[3px] rounded-md overflow-visible">
            {user?.avatarUrl ? (
              <img
                className="w-8 h-8 rounded-full shrink-0 object-cover border border-border"
                src={user.avatarUrl}
                alt="Avatar"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[11px] font-medium text-white shrink-0">
                {initials}
              </div>
            )}
            {!collapsed ? (
              <div className="flex-1 overflow-hidden">
                <div className="text-[13px] font-medium text-text-main truncate">
                  {user?.firstName} {user?.lastName}
                </div>
                {user?.email && (
                  <span className="text-[11px] block text-text-muted truncate">{user.email}</span>
                )}
              </div>
            ) : (
              <Tooltip label={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`} />
            )}
          </div>

          {/* Configurações */}
          <Link
            to="/app/settings"
            className={`
              group relative flex gap-2.5 items-center p-2.5 rounded-lg
              no-underline transition-colors duration-150
              ${location.pathname === '/app/settings'
                ? 'bg-primary text-white'
                : 'text-text-muted hover:bg-primary hover:text-white'
              }
            `}
          >
            <Settings size={19} className="shrink-0" />
            <span className={`text-[13px] whitespace-nowrap overflow-hidden transition-[opacity,width] duration-200 ${collapsed ? 'opacity-0 w-0' : ''}`}>
              Configurações
            </span>
            {collapsed && <Tooltip label="Configurações" />}
          </Link>

          {/* Logout */}
          <button
            className="group relative w-full bg-transparent border-none cursor-pointer text-text-muted flex gap-2.5 items-center p-2.5 rounded-lg hover:bg-danger hover:text-white transition-colors duration-150"
            onClick={() => {
              navigate('/', { replace: true })
              setTimeout(() => logout(), 1)
            }}
          >
            <LogOut size={19} className="shrink-0" />
            <span className={`text-[13px] whitespace-nowrap overflow-hidden transition-[opacity,width] duration-200 ${collapsed ? 'opacity-0 w-0' : ''}`}>
              Sair
            </span>
            {collapsed && <Tooltip label="Sair" />}
          </button>
        </div>

      </aside>
    </>
  )
}
