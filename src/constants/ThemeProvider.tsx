"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("sicat-theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = stored || (prefersDark ? "dark" : "light");
        setTheme(initial);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("sicat-theme", next);
            return next;
        });
    };

    // Se evita el renderizado inconsistente durante la hidratación
    // Solo exponemos el tema real una vez montado el componente
    const contextValue = {
        theme: mounted ? theme : "light",
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className={mounted ? "" : "invisible"}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
