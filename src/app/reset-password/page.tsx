"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import fondo from "@/assets/Sicat_fondo.png";
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
            setError(err.response?.data?.error || "El enlace es inválido o ha expirado. Solicite la recuperación nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg shadow-sm text-center">
                <h3 className="font-semibold mb-2 text-lg">¡Contraseña actualizada!</h3>
                <p className="text-sm mb-6">Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión con tu nueva clave.</p>
                <Link href="/login" className="inline-block py-2.5 px-6 bg-gradient-to-r from-[#004b71] to-[#4caf50] text-white font-semibold rounded-lg shadow-sm transition-opacity text-sm hover:opacity-90">
                    Ir al Inicio de Sesión
                </Link>
            </div>
        );
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm text-gray-800"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirmar Contraseña
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Vuelva a escribirla"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm text-gray-800"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-[#004b71] to-[#4caf50] text-white font-semibold rounded-lg shadow-sm transition-opacity text-sm 
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 active:opacity-95'}`}
            >
                {loading ? "Actualizando..." : "Restablecer Contraseña"}
            </button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="fixed inset-0 flex overflow-hidden bg-white">
            <div className="hidden lg:flex w-1/2 h-full flex-shrink-0 relative">
                <img
                    src={fondo.src}
                    alt="Fondo SICAT"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            <div className="w-full lg:w-1/2 h-full flex flex-col bg-white">
                <div className="flex justify-end px-10 pt-6 flex-shrink-0">
                    <img src={logo.src} alt="SICAT" className="h-14 w-auto" />
                </div>

                <div className="flex-1 flex items-center justify-center px-8">
                    <div className="w-full max-w-sm">
                        <div className="mb-7">
                            <h1 className="text-3xl font-serif text-[#3d2a1d] mb-2 leading-tight">
                                Crear nueva contraseña
                            </h1>
                            <p className="text-gray-500 text-sm">Asegúrate de que sea segura y fácil de recordar.</p>
                        </div>
                        
                        <Suspense fallback={<div className="text-center text-sm p-4 text-gray-500">Cargando formulario...</div>}>
                            <ResetPasswordForm />
                        </Suspense>
                    </div>
                </div>

                <footer className="flex-shrink-0 pb-6 pt-3 text-center text-xs text-gray-400">
                    <p>© {new Date().getFullYear()} SICAT - Todos los derechos reservados.</p>
                </footer>
            </div>
        </main>
    );
}
