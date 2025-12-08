import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Balzola | Jugador Profesional de Padel",
  description: "Jugador profesional de padel argentino. Ranking FIP #294. Experiencia internacional en Madrid y torneos Premier Padel.",
  keywords: ["padel", "jugador profesional", "FIP", "Premier Padel", "Juan Balzola", "Argentina", "Mar del Plata"],
  authors: [{ name: "Juan Balzola" }],
  openGraph: {
    title: "Juan Balzola | Jugador Profesional de Padel",
    description: "Jugador profesional de padel argentino. Ranking FIP #294.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
