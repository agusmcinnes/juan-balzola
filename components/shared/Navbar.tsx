"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Instagram, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#torneos", label: "Torneos" },
  { href: "#galeria", label: "Galería" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#proyecto-2026", label: "2026" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "py-4 bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo - Left side */}
        <div className="flex-1 flex justify-start">
          <a href="#inicio" className="group flex items-center gap-3">
            <div className="relative">
              <div
                className={`rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? "w-9 h-9" : "w-10 h-10"
                }`}
              >
                <span className="text-black font-bold text-lg">JB</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gold/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className={`hidden sm:block transition-all duration-300 overflow-hidden ${isScrolled ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
              <p className="text-sm font-semibold text-foreground leading-none whitespace-nowrap">Juan Balzola</p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="flex items-center bg-white/5 rounded-full px-2 py-1.5 border border-white/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive
                      ? "text-black"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-gold rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right side - Ranking + Instagram + Contact */}
        <div className="flex-1 hidden lg:flex items-center justify-end gap-3">
          {/* Ranking badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Trophy className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold">#294</span>
            <span className="text-xs text-foreground/50">FIP</span>
          </div>

          {/* Instagram */}
          <a
            href="https://instagram.com/juan_balzola"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/60 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
          >
            <Instagram size={16} />
          </a>

          {/* Contact button */}
          <Button
            asChild
            size="sm"
            className="bg-gold text-black hover:bg-gold-light font-semibold rounded-full px-4 h-9"
          >
            <a href="#contacto">Contacto</a>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Instagram */}
          <a
            href="https://instagram.com/juan_balzola"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/60 hover:text-pink-500 transition-all duration-300"
          >
            <Instagram size={16} />
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#0a0a0a] border-white/10 w-[85vw] sm:w-80 p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20">
                      <span className="text-black font-bold text-2xl">JB</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-foreground">Juan Balzola</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Trophy className="w-3.5 h-3.5 text-gold" />
                        <span className="text-sm text-gold font-medium">#294 FIP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile nav items */}
                <div className="flex-1 py-4 px-3 overflow-y-auto">
                  <p className="text-xs text-foreground/40 uppercase tracking-wider font-medium px-3 mb-3">Navegación</p>
                  <div className="flex flex-col gap-1">
                    {navItems.map((item, index) => {
                      const isActive = activeSection === item.href.replace("#", "");
                      return (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                            isActive
                              ? "bg-gold/10 text-gold"
                              : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-gold" : "bg-foreground/30"}`} />
                          <span className="font-medium">{item.label}</span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile footer */}
                <div className="p-4 border-t border-white/10 space-y-3">
                  <a
                    href="https://instagram.com/juan_balzola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold shadow-lg shadow-pink-500/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <Instagram size={18} />
                    Seguir en Instagram
                  </a>
                  <a
                    href="#contacto"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-3.5 rounded-xl bg-gold text-black font-semibold"
                  >
                    Contacto
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
