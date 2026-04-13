"use client";

import { useState } from "react";
import { useLogin } from "@/features/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { executeLogin, loading, error } = useLogin();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await executeLogin(username, password);
        if (success) {
            router.push("/inicio");
        }
    };

    return (
        <div className="w-full opacity-100 ">

            {/* Encabezado */}
            <div className="mb-8">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#004b71] to-[#4caf50] mb-2 tracking-tight">
                    Bienvenid@
                </h1>
                <p className="text-gray-500 text-base font-medium">
                    Ingrese a su cuenta para continuar.
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Campo Usuario */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Usuario
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            id="login-usuario"
                            type="text"
                            placeholder="Ej. nombre.apellido@ejemplo.com"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                                    outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Campo Contraseña */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Contraseña
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="login-contrasena"
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingrese su contraseña"
                            className="w-full pl-10 pr-20 py-2.5 border border-gray-300 rounded-lg
                                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                                    outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowPassword((prev) => !prev);
                            }}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm
                                    text-gray-500 hover:text-gray-700 transition-colors font-medium z-10 cursor-pointer"
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                </div>


                {/* Mostramos el error si el hook nos dice que hubo uno */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Deshabilitamos el botón mientras el hook dice que está cargando */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#004b71] to-[#4caf50] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity"
                >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
            </form>
        </div>
    );
}