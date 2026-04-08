import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SICAT — Sistema de Información Catastral',
    template: '%s | SICAT',
  },
  description:
    'Plataforma geoespacial para la gestión territorial, análisis de predios y sostenibilidad ambiental.',
  keywords: [
    'catastro',
    'territorio',
    'geoespacial',
    'análisis de predios',
    'sostenibilidad',
    'SICAT',
  ],
  authors: [{ name: 'SICAT' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
