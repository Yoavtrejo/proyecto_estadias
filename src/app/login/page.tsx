"use client";
import { LoginForm } from "@/features/login";
import fondo from "@/assets/Sicat_fondo.png";
import logo from "@/assets/SICAT_TR.png";

export default function LoginPage() {
    return (
        <main className="fixed inset-0 flex overflow-hidden bg-white">

            {/* ── Imagen de Fondo (Lado Izquierdo en Desktop / Fondo en Móvil) ── */}
            <div className="absolute inset-0 z-0 lg:relative lg:flex lg:w-2/3 h-full flex-shrink-0">
                <img
                    src={fondo.src}
                    alt="Vista aérea de cultivos"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Overlay de cristal en móvil para que el formulario sea legible */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-md lg:hidden"></div>
            </div>

            {/* ── Lado Derecho: Formulario ── */}
            <div className="relative z-10 w-full lg:w-1/3 h-full flex flex-col bg-transparent lg:bg-white">

                {/* Logo superior derecho */}
                <div className="flex justify-end px-10 pt-6 flex-shrink-0">
                    <img src={logo.src} alt="SICAT" className="h-14 w-auto" />
                </div>

                {/* Formulario centrado verticalmente */}
                <div className="flex-1 flex items-center justify-center px-8">
                    <div className="w-full max-w-sm">
                        <LoginForm />
                    </div>
                </div>

                {/* Footer fijo abajo */}
                <footer className="flex-shrink-0 pb-6 pt-3 text-center text-xs text-gray-400">
                    <div className="flex items-center justify-center gap-5 mb-1">
                        <a href="/terminos-de-uso" className="hover:underline underline-offset-2">Términos de servicio</a>
                        <a href="/politica-de-privacidad" className="hover:underline underline-offset-2">Política de privacidad</a>
                    </div>
                    <p>© {new Date().getFullYear()} SICAT - Todos los derechos reservados.</p>
                </footer>

            </div>
        </main>
    );
}
