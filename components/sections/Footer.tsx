"use client";

import { Instagram, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#torneos", label: "Torneos" },
  { href: "#galeria", label: "Galería" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#proyecto-2026", label: "2026" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <a href="#inicio" className="text-3xl font-bold tracking-tight">
              <span className="text-gradient-gold">JUAN BALZOLA</span>
            </a>
            <p className="text-foreground/50 text-sm mt-2">
              Jugador Profesional de Padel
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/juan_balzola"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/70 hover:text-gold hover:bg-gold/10 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <Separator className="bg-border mb-8" />

        {/* Navigation links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/60 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Separator className="bg-border mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
          <p>
            © {currentYear} Juan Balzola. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
