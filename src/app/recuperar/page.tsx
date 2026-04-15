"use client";
import fondo from "@/assets/fondo.png";
import logo from "@/assets/SICAT_TR.png";
import Link from "next/link";
import { useState } from "react";
import api from "@/api/axiosconfig";

export default function RecoverPasswordPage() {
    const [email, setEmail] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('password-reset/', { email });
            setEnviado(true);
        } catch (error: any) {
            console.error(error);
            alert(`Error de servidor: ${error.response?.data?.error || error.message || "Intente de nuevo"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="fixed inset-0 flex overflow-hidden bg-white">
            {/* ── Lado Izquierdo: Imagen (2/3) ── */}
            <div className="hidden lg:flex w-2/3 h-full flex-shrink-0 relative">
                <img
                    src={fondo.src}
                    alt="Vista aérea de cultivos"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#004A61]/10 backdrop-subtle"></div>
            </div>

            {/* ── Lado Derecho: Formulario (1/3) ── */}
            <div className="w-full lg:w-1/3 h-full flex flex-col bg-white">
                {/* Logo superior derecho */}
                <div className="flex justify-end px-10 pt-6 flex-shrink-0">
                    <img src={logo.src} alt="SICAT" className="h-14 w-auto" />
                </div>

                {/* Formulario centrado verticalmente */}
                <div className="flex-1 flex items-center justify-center px-8 sm:px-12">
                    <div className="w-full max-w-sm">
                        
                        {/* Encabezado Premium */}
                        <div className="mb-10 animate-in fade-in slide-in-from-top-6 duration-1000 ease-out">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#004A61] text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm border border-blue-100">
                                Recuperación de Cuenta
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter leading-tight mb-3">
                                <span className="text-gray-400">Recuperar</span>
                                <br />
                                <span className="bg-gradient-to-r from-[#004A61] via-[#1D8348] to-[#8FC044] text-transparent bg-clip-text">
                                    Acceso.
                                </span>
                            </h1>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                {enviado 
                                    ? "Hemos enviado un enlace a tu correo." 
                                    : "Ingresa tu correo para recibir instrucciones de restablecimiento."}
                            </p>
                        </div>

                        {enviado ? (
                            <div className="p-6 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-[2rem] shadow-xl shadow-emerald-500/5 animate-in zoom-in duration-500 text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-black uppercase tracking-tighter text-lg mb-2">¡Correo enviado!</h3>
                                <p className="text-sm text-emerald-700/80 mb-6">Si existe una cuenta asociada, recibirás un enlace pronto.</p>
                                <Link href="/login" className="inline-block w-full py-3 bg-[#1D8348] text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/10 hover:bg-[#145A32] transition-all transform active:scale-95 text-sm uppercase tracking-widest leading-none">
                                    Volver al Login
                                </Link>
                            </div>
                        ) : (
                            <form className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
                                        Correo electrónico
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 transition-colors group-focus-within:text-[#004A61]">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="ejemplo@correo.com"
                                            required
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#004A61] focus:bg-white outline-none transition-all text-sm text-gray-800 placeholder-gray-300"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 px-4 bg-gradient-to-r from-[#004A61] to-[#4caf50] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#004A61]/10 transition-all text-sm active:scale-95
                                        ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                                >
                                    {loading ? "Enviando..." : "Enviar Instrucciones"}
                                </button>

                                <div className="text-center pt-4">
                                    <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#004A61] transition-colors flex items-center justify-center gap-2 group">
                                        <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                                        Volver al inicio de sesión
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Footer fijo abajo */}
                <footer className="flex-shrink-0 pb-8 pt-3 text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} SICAT. Todos los derechos reservados.</p>
                </footer>
            </div>
        </main>
    );
}
