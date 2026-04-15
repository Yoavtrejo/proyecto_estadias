"use client";

import React from "react";
import { LogOut, User, X, Shield, Settings, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  role: string;
}

export default function ProfileDrawer({ isOpen, onClose, userName, role }: ProfileDrawerProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    onClose();
    router.push("/login");
  };

  const getRoleLabel = (r: string) => {
    if (r === "admin") return "Administrador";
    if (r === "editor") return "Editor de Datos";
    return "Visualizador";
  };

  const getRoleColor = (r: string) => {
    if (r === "admin") return "bg-blue-500";
    if (r === "editor") return "bg-emerald-500";
    return "bg-gray-500";
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0a0a0a] z-[70] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
          <h2 className="text-xl font-black text-[#004A61] dark:text-white uppercase tracking-tighter">Mi Perfil</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* User Info Card */}
        <div className="p-8 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#004A61] to-[#1D8348] flex items-center justify-center shadow-xl">
              <span className="text-3xl font-black text-white">{userName?.slice(0, 2).toUpperCase() || "U"}</span>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-4 border-white dark:border-[#0a0a0a] rounded-full ${getRoleColor(role)}`}></div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{userName || "Usuario"}</h3>
          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${getRoleColor(role)}`}>
            {getRoleLabel(role)}
          </span>
        </div>

        {/* Menu Actions */}
        <div className="flex-grow px-6 space-y-2 mt-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Configuración</p>

          <button className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-[#004A61]/5 flex items-center justify-center text-[#004A61]">
              <User size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-200">Datos Personales</p>
              <p className="text-[10px] text-gray-400 font-medium">Gestiona tu información</p>
            </div>
          </button>
        </div>

        {/* Footer with Logout */}
        <div className="p-8 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full py-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-6 font-medium">
            SICAT v1.0 — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
}
