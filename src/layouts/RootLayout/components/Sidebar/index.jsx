import { LayoutDashboard, Box, LogOut, Settings, ChevronRight, ChevronLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/items", label: "Estoque", icon: Box },
];

function Tooltip({ label }) {
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
  );
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      {/* Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black opacity-80 z-[4]"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside className={`
        flex flex-col fixed z-[5] bg-white border-r border-border shrink-0
        overflow-hidden h-dvh transition-[width] duration-[350ms] ease-in-out
        ${collapsed ? "w-14" : "w-[240px]"}
      `}>

        {/* ── Logo ── */}
        <div className="flex items-center justify-center p-3 border-b border-border min-h-14">

          <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
            <span className="leading-[0] shrink-0">
              <Box className="text-primary" />
            </span>

            <h2
              className={`text-base font-semibold text-text-main whitespace-nowrap overflow-hidden transition-[opacity,width] duration-200 ease-in-out ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
            >
              StockFlow
            </h2>
          </div>
          <button
            className="w-[35px] h-[35px] rounded-sm bg-transparent border border-border cursor-pointer flex items-center justify-center shrink-0 text-text-muted hover:bg-color-bg transition-colors duration-150"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 px-2 py-2.5 flex flex-col gap-1 overflow-hidden">

          {// eslint-disable-next-line no-unused-vars
            navItems.map(({ to, label, icon: IconComponent }) => {
              const isActive = to === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(to)

              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setCollapsed(true)}
                  className={`
                  group relative flex items-center justify-start gap-2
                  cursor-pointer w-full p-2 rounded-lg font-medium z-[2]
                  transition-all duration-200 ease-in-out no-underline
                  ${isActive
                      ? "bg-primary-subtle text-primary"
                      : "text-text-muted hover:bg-primary-subtle hover:text-primary"
                    }
                `}
                >
                  <span className="pl-[2px]"><IconComponent size={20} /></span>
                  <span className={`text-base whitespace-nowrap overflow-hidden text-ellipsis transition-[opacity,width] duration-200 ${collapsed ? "opacity-0 w-0" : ""}`}>
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
          <div className={`flex items-center gap-2.5 mb-5`}>
            {user?.avatarUrl ? (
              <img
                className="w-[39px] h-[39px] rounded-full shrink-0 object-cover border border-border"
                src={user.avatarUrl}
                alt="Avatar"
              />
            ) : (
              <span className="w-[39px] h-[39px] rounded-full shrink-0 flex items-center justify-center bg-primary-subtle text-primary text-[11px] font-bold border border-border">
                {user?.name?.slice(0, 1)}
              </span>
            )}

            <span className={`
              text-base text-ellipsis font-medium text-text-main whitespace-nowrap
              overflow-hidden transition-[opacity,width] duration-200
              ${collapsed ? "opacity-0 w-0" : "opacity-100"}
            `}>
              {user?.name}
            </span>
            {/* {collapsed && <Tooltip label={user?.name ?? ""} />} */}

          </div>

          {/* Configurações */}
          <Link
            to="/settings"
            className={`group relative flex items-center justify-start gap-2 cursor-pointer w-full p-2 rounded-lg font-medium z-[2] transition-all duration-200 ease-in-out no-underline ${location.pathname === "/settings"
              ? "bg-primary-subtle text-text-main"
              : "text-text-muted hover:bg-primary-subtle hover:text-text-main"
              }`}
            onClick={() => setCollapsed(true)}
          >
            <span className="pl-[2px]"><Settings size={20} /></span>
            <span className={`text-base whitespace-nowrap overflow-hidden text-ellipsis transition-[opacity,width] duration-200 ${collapsed ? "opacity-0 w-0" : ""}`}>
              Configurações
            </span>
          </Link>

          {/* Logout */}
          <button
            className="group relative flex items-center justify-start gap-2 cursor-pointer w-full p-2 rounded-lg font-medium z-[2] transition-all duration-200 ease-in-out text-text-muted hover:bg-danger-subtle hover:text-danger"
            onClick={() => {
              navigate("/", { replace: true });
              setTimeout(() => logout(), 1);
            }}
          >
            <span className="pl-[2px]"><LogOut size={20} /></span>
            <span className={`text-base whitespace-nowrap overflow-hidden text-ellipsis transition-[opacity,width] duration-200 ${collapsed ? "opacity-0 w-0" : ""}`}>
              Sair
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
