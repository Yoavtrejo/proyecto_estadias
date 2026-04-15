"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Folder, UploadCloud, Users, User } from "lucide-react";
import ProfileDrawer from "./ProfileDrawer";

const ALL_NAV_ITEMS = [
  { href: "/inicio", icon: Home, label: "Inicio", roles: ["viewer", "editor", "admin"] },
  { href: "/dashboard", icon: LayoutDashboard, label: "Mapa", roles: ["viewer", "editor", "admin"] },
  { href: "/proyectos", icon: Folder, label: "Proyectos", roles: ["editor", "admin"] },
  { href: "/upload", icon: UploadCloud, label: "Subir", roles: ["editor", "admin"] },
  { href: "/usuarios", icon: Users, label: "Usuarios", roles: ["admin"] },
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
  const [role, setRole] = useState<string>("viewer");
  const [userName, setUserName] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("role") || "viewer";
    const savedName = localStorage.getItem("userName") || "";
    setRole(savedRole);
    setUserName(savedName);
  }, [pathname]);

  const shouldHide = pathname === "/" || HIDDEN_ROUTES.some((route) => pathname?.startsWith(route));

  if (shouldHide) return null;

  // Filtrar items según el rol actual
  const filteredItems = ALL_NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <>
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-50 transition-all duration-500 ease-in-out">
        <div className="bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] p-2 flex justify-around items-center">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/inicio" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-[1.5rem] relative transition-all duration-500 group
                  ${isActive 
                    ? 'text-[#004A61] bg-[#1D8348]/10' 
                    : 'text-gray-400 hover:text-[#1D8348]'}`}
              >
                {/* Indicador de Punto Activo */}
                {isActive && (
                  <div className="absolute -top-0.5 w-1 h-1 bg-[#1D8348] rounded-full animate-pulse" />
                )}
                
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
                
                <span className={`text-[8px] font-black uppercase tracking-[0.15em] mt-1 transition-all duration-500 overflow-hidden
                  ${isActive ? 'max-h-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {item.label}
                </span>

                {!isActive && (
                  <div className="absolute inset-0 bg-gray-100/50 rounded-[1.5rem] scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />
                )}
              </Link>
            );
          })}

          {/* Botón de Perfil Separado (Abre el Drawer) */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-[1.5rem] relative transition-all duration-500 group text-gray-400 hover:text-[#004A61] hover:bg-[#004A61]/5"
          >
            <User 
              size={20} 
              className="transition-all duration-500 group-hover:scale-110" 
            />
            <span className="text-[8px] font-black uppercase tracking-[0.15em] mt-1 max-h-0 opacity-0 group-hover:max-h-5 group-hover:opacity-100 transition-all duration-500">
              Perfil
            </span>
          </button>
        </div>
      </nav>

      {/* Profile Drawer */}
      <ProfileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        userName={userName}
        role={role}
      />
    </>
  );
}
