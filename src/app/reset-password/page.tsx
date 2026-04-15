"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import fondo from "@/assets/fondo.png";
import logo from "@/assets/SICAT_TR.png";
import api from "@/api/axiosconfig";
import Link from "next/link";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!uid || !token) {
            setError("Enlace inválido o incompleto. Solicite uno nuevo.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        setLoading(true);
        try {
            await api.post('password-reset-confirm/', { 
                uid, 
                token, 
                new_password: password 
            });
            setSuccess(true);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "El enlace es inválido o ha expirado.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="p-8 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-[2.5rem] shadow-xl shadow-emerald-500/5 text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="font-black uppercase tracking-tighter text-xl mb-3">¡Éxito Total!</h3>
                <p className="text-sm text-emerald-700/80 mb-8 leading-relaxed">Tu contraseña ha sido restablecida. Ya puedes acceder con tus nuevas credenciales.</p>
                <Link href="/login" className="inline-block w-full py-4 bg-[#1D8348] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-emerald-900/10 hover:bg-[#145A32] transition-all transform active:scale-95 text-xs">
                    Ir al Inicio de Sesión
                </Link>
            </div>
        );
    }

    return (
        <form className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200" onSubmit={handleSubmit}>
            {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs font-bold border border-red-100 animate-shake">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#004A61] focus:bg-white outline-none transition-all text-sm text-gray-800"
                />
            </div>

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
                    Confirmar Contraseña
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Vuelva a escribirla"
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#004A61] focus:bg-white outline-none transition-all text-sm text-gray-800"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-4 mt-2 bg-gradient-to-r from-[#004A61] to-[#4caf50] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#004A61]/10 transition-all text-sm active:scale-95
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
                {loading ? "Actualizando..." : "Restablecer Contraseña"}
            </button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="fixed inset-0 flex overflow-hidden bg-white">
            {/* ── Lado Izquierdo: Imagen (2/3) ── */}
            <div className="hidden lg:flex w-2/3 h-full flex-shrink-0 relative">
                <img
                    src={fondo.src}
                    alt="Fondo SICAT"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#173F4A]/10 backdrop-subtle"></div>
            </div>

            {/* ── Lado Derecho: Formulario (1/3) ── */}
            <div className="w-full lg:w-1/3 h-full flex flex-col bg-white">
                {/* Logo */}
                <div className="flex justify-end px-10 pt-6 flex-shrink-0">
                    <img src={logo.src} alt="SICAT" className="h-14 w-auto" />
                </div>

                <div className="flex-1 flex items-center justify-center px-8 sm:px-12">
                    <div className="w-full max-w-sm">
                        
                        {/* Encabezado Premium */}
                        <div className="mb-10 animate-in fade-in slide-in-from-top-6 duration-1000 ease-out">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#004A61] text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm border border-blue-100">
                                Seguridad de Cuenta
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter leading-tight mb-3">
                                <span className="text-gray-400">Nueva</span>
                                <br />
                                <span className="bg-gradient-to-r from-[#004A61] via-[#1D8348] to-[#8FC044] text-transparent bg-clip-text">
                                    Contraseña.
                                </span>
                            </h1>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                Establece una clave segura para proteger tu acceso al territorio inteligente.
                            </p>
                        </div>
                        
                        <Suspense fallback={<div className="text-center text-xs font-bold p-10 text-gray-300 animate-pulse uppercase tracking-widest">Cargando formulario...</div>}>
                            <ResetPasswordForm />
                        </Suspense>
                    </div>
                </div>

                {/* Footer */}
                <footer className="flex-shrink-0 pb-8 pt-3 text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} SICAT. Todos los derechos reservados.</p>
                </footer>
            </div>
        </main>
    );
}
