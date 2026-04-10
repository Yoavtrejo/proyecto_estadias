"use client";

import { useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import SICAT_TC from "@/assets/SICAT_TC.png";
import SICAT_TO from "@/assets/SICAT_TO.png";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface NavbarProps {
    role?: "Administrador" | "Usuario";
}

interface NavItemProps {
    href: string;
    icon: string;
    label: string;
    accentColor?: string;
    isDark: boolean;
}

// ─── Constantes de color ──────────────────────────────────────────────────────

const COLOR = {
    primary: "#408c94", // Teal blending blue and green
    primaryLight: "#69b3b3",
    primaryDark: "#2d6666",
    green: "#97bb5e",
    gold: "#fbbf24",
} as const;

// ─── Componente NavItem ───────────────────────────────────────────────────────

function NavItem({
    href,
    icon,
    label,
    accentColor = COLOR.primary,
    isDark,
}: NavItemProps) {
    const baseColor = isDark ? COLOR.primaryLight : COLOR.primaryDark;

    return (
        <li>
            <a
                href={href}
                aria-label={label}
                className="flex items-center px-4 py-2 rounded-xl transition-all duration-300 gap-2 font-semibold text-sm"
                style={{
                    color: "rgba(255, 255, 255, 0.9)",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
            >
                <span className={`${icon} size-5`} />
                <span>{label}</span>
            </a>
        </li>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Navbar({ role = "Usuario" }: NavbarProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";
    const baseColor = isDark ? COLOR.primaryLight : COLOR.primaryDark;

    const navItems = [
        { href: "/Inicio", icon: "icon-[tabler--home]", label: "Inicio", accent: COLOR.primary },
        { href: "/Proyectos", icon: "icon-[tabler--briefcase]", label: "Proyectos", accent: COLOR.primary },
        { href: "/Mapa", icon: "icon-[tabler--map-pin]", label: "Mapa", accent: COLOR.green },
    ];

    const adminItem = {
        href: "/Usuarios",
        icon: "icon-[tabler--users]",
        label: "Usuarios",
        accent: COLOR.green,
    };

    return (
        <header
            className="fixed bottom-0 left-0 right-0 z-50 h-20 transition-all duration-500"
            style={{
                // Strong gradient background (Blue to Green) - Adjusts for dark mode
                background: isDark 
                    ? "linear-gradient(90deg, #0f172a 0%, #1e4b6e 50%, #1b3d16 100%)"
                    : "linear-gradient(90deg, #1e5482 0%, #4aaccc 40%, #97bb5e 100%)",
                borderTop: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.1)",
                boxShadow: isDark 
                    ? "0 -8px 32px rgba(0,0,0,0.6)"
                    : "0 -8px 32px rgba(0,0,0,0.3)",
            }}
        >
            <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">

                {/* Logo y Nombre */}
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-black tracking-tighter text-white drop-shadow-md">
                        SICAT
                    </span>
                </div>

                {/* Navegación Desktop */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavItem key={item.href} {...item} accentColor={item.accent} isDark={isDark} />
                        ))}
                        {role === "Administrador" && (
                            <NavItem {...adminItem} accentColor={adminItem.accent} isDark={isDark} />
                        )}
                    </ul>
                </nav>

                {/* Acciones (Tema + Usuario) */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={toggleTheme}
                        aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
                        className="p-2 rounded-xl transition-all duration-300 flex items-center justify-center text-white hover:bg-white/10"
                        style={{
                            background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "rotate(15deg) scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "rotate(0) scale(1)";
                        }}
                    >
                        <span className={`${isDark ? "icon-[tabler--sun]" : "icon-[tabler--moon]"} size-5`} />
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu((prev) => !prev)}
                            className="flex items-center gap-2 p-1 md:pr-3 rounded-full transition-all duration-300 hover:bg-white/10 text-white"
                        >
                            <span className="icon-[tabler--user-circle] size-8 shrink-0" />
                            <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">Mi cuenta</span>
                        </button>

                        {showUserMenu && (
                            <UserDropdown
                                role={role}
                                isDark={isDark}
                                onLogout={async () => { }}
                                onClose={() => setShowUserMenu(false)}
                            />
                        )}
                    </div>

                    {/* Menú Móvil Toggle */}
                    <button 
                        className="md:hidden p-2 rounded-xl text-white hover:bg-white/10"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className={isMobileMenuOpen ? "icon-[tabler--x]" : "icon-[tabler--menu-2]"} />
                    </button>
                </div>
            </div>

            {/* Menú Móvil Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="md:hidden absolute bottom-20 left-0 right-0 p-4 border-t animate-in fade-in slide-in-from-bottom-4 duration-300"
                    style={{
                        background: isDark 
                            ? "linear-gradient(135deg, #0f172a 0%, #1a365d 100%)"
                            : "linear-gradient(135deg, #1e5482 0%, #2d5a27 100%)",
                        borderColor: "rgba(255,255,255,0.1)",
                    }}
                >
                    <nav>
                        <ul className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <NavItem key={item.href} {...item} accentColor={item.accent} isDark={isDark} />
                            ))}
                            {role === "Administrador" && (
                                <NavItem {...adminItem} accentColor={adminItem.accent} isDark={isDark} />
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}

// ─── Dropdown de usuario ──────────────────────────────────────────────────────

interface UserDropdownProps {
    role: NavbarProps["role"];
    isDark: boolean;
    onLogout: () => Promise<void>;
    onClose: () => void;
}

function UserDropdown({ role, isDark, onLogout, onClose }: UserDropdownProps) {
    return (
        <>
            {/* Overlay transparente para cerrar al hacer clic fuera */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            <div
                className="absolute right-0 bottom-full mb-3 w-48 rounded-2xl shadow-2xl border py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-bottom-right"
                style={{
                    background: isDark ? "#1a2332" : "#f4fafd",
                    borderColor: isDark ? "rgba(64,140,148,0.15)" : "rgba(64,140,148,0.25)",
                }}
            >
                <div
                    className="px-4 py-2 border-b mb-1"
                    style={{ borderColor: isDark ? "rgba(64,140,148,0.1)" : "rgba(64,140,148,0.2)" }}
                >
                    <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: COLOR.primary }}>
                        Cuenta ({role})
                    </p>
                </div>

                <a
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                    style={{ color: isDark ? "#cbd5e1" : "#1a4a5a" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(74,172,204,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    <span className="icon-[tabler--user] size-5" style={{ color: COLOR.primary }} />
                    Mi Perfil
                </a>

                <div
                    className="mx-2 my-1 border-t"
                    style={{ borderColor: isDark ? "rgba(64,140,148,0.1)" : "rgba(64,140,148,0.15)" }}
                />

                <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-500 font-medium transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.07)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    <span className="icon-[tabler--logout] size-5" />
                    Cerrar Sesión
                </button>
            </div>
        </>
    );
}
