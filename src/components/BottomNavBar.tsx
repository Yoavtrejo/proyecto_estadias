"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "dashboard", label: "Inicio" },
  { href: "/proyectos", icon: "folder", label: "Proyectos" },
  { href: "/upload", icon: "map", label: "Mapas" },
  { href: "/usuarios", icon: "group", label: "Usuarios" },
];

const HIDDEN_ROUTES = [
  "/login",
  "/recuperar",
  "/reset-password",
  "/politica-de-privacidad",
  "/terminos-de-uso",
];

export default function BottomNavBar() {
  const pathname = usePathname();

  const shouldHide = pathname === "/" || HIDDEN_ROUTES.some((route) => pathname?.startsWith(route));

  if (shouldHide) return null;

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-white/75 dark:bg-[#0a0a0a]/75 backdrop-blur-xl border-t border-[var(--color-outline-variant)]/30 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_-8px_30px_rgb(255,255,255,0.02)] transition-all duration-300">
      <div className="max-w-md mx-auto px-6 py-2 pb-4 flex justify-between items-center relative">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href + "/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-[4.5rem] h-14 rounded-2xl relative group transition-all duration-300 select-none
                ${isActive ? 'text-[var(--color-primary)] dark:text-[var(--color-primary-fixed)]' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'}`}
            >
              {/* Fondo Activo (Active Indicator) */}
              <div 
                className={`absolute inset-0 bg-[var(--color-primary-container)] dark:bg-[var(--color-primary)] rounded-xl transition-all duration-500 ease-out flex-shrink-0
                ${isActive ? 'scale-100 opacity-[0.15] dark:opacity-[0.12]' : 'scale-75 opacity-0 group-hover:scale-95 group-hover:opacity-[0.05] dark:group-hover:opacity-10'}`} 
              />
              
              {/* Ícono */}
              <span 
                className={`material-symbols-outlined relative z-10 transition-all duration-500 ease-out will-change-transform
                           ${isActive ? '-translate-y-[2px] scale-110 drop-shadow-sm' : 'translate-y-1 group-hover:scale-105'}`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              
              {/* Etiqueta (Label) */}
              <span 
                className={`text-[10px] font-semibold tracking-wide relative z-10 transition-all duration-500 ease-out absolute bottom-[2px]
                           ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
