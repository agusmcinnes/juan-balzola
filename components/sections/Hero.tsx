"use client";

import { motion } from "framer-motion";
import { ChevronDown, Trophy, MapPin, ArrowRight, Instagram } from "lucide-react";
import CounterAnimation from "@/components/shared/CounterAnimation";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-background z-10" />

      {/* Hero background image */}
      <div className="absolute inset-0 bg-[url('/fotos-juanchi/foto-top-horizontal.jpg')] bg-cover bg-center bg-no-repeat" />

      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <MapPin className="w-4 h-4 text-gold" />
          <span className="text-sm text-foreground/70 tracking-widest uppercase">
            Mar del Plata, Argentina
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-gradient-gold">JUAN</span>
          <br />
          <span className="text-foreground">BALZOLA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-foreground/70 mb-8 tracking-wide"
        >
          Jugador Profesional de Padel
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-12"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gold mb-1">
              <Trophy className="w-5 h-5" />
              <span className="text-3xl md:text-4xl font-bold">
                #<CounterAnimation value={294} />
              </span>
            </div>
            <p className="text-sm text-foreground/50 uppercase tracking-wider">
              Ranking FIP
            </p>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold text-foreground">
              #<CounterAnimation value={222} />
            </span>
            <p className="text-sm text-foreground/50 uppercase tracking-wider">
              Mejor Ranking
            </p>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold text-foreground">
              <CounterAnimation value={119} />
            </span>
            <p className="text-sm text-foreground/50 uppercase tracking-wider">
              Puntos 2025
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary Button - Conoceme */}
          <a
            href="#sobre-mi"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 hover:scale-105"
          >
            <span className="relative z-10">Conoceme</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          {/* Secondary Button - Contacto */}
          <a
            href="#contacto"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_100%] group-hover:animate-[shimmer_2s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[1.5px] bg-background rounded-full transition-all duration-300 group-hover:bg-background/80" />
            <span className="relative z-10 font-semibold text-foreground">Contacto</span>
            <ArrowRight className="w-4 h-4 relative z-10 text-gold transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gold/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
