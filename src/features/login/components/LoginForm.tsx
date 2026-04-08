"use client";

import { useState } from "react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    console.log("showPassword:", showPassword);
    return (
        <div className="w-full">

            {/* Encabezado */}
            <div className="mb-7">
                <h1 className="text-4xl font-serif text-[#3d2a1d] mb-2 leading-tight">
                    Bienvenido de nuevo
                </h1>
                <p className="text-gray-500 text-sm">Ingrese a su cuenta para continuar.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

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

                {/* Olvidé mi contraseña */}
                <div className="flex items-center justify-end">
                    <a
                        href="#"
                        className="text-sm text-gray-800 font-medium underline underline-offset-4
                                   hover:text-gray-600 transition-colors"
                    >
                        Olvidé mi contraseña
                    </a>
                </div>

                {/* Botón Iniciar Sesión */}
                <button
                    id="login-submit"
                    type="submit"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#004b71] to-[#4caf50]
                               text-white font-semibold rounded-lg shadow-sm
                               hover:opacity-90 active:opacity-95 transition-opacity text-sm"
                >
                    Iniciar Sesión
                </button>

            </form>
        </div>
    );
}