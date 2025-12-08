"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Award, Globe } from "lucide-react";
import Image from "next/image";
import CounterAnimation from "@/components/shared/CounterAnimation";

const stats = [
  { icon: Calendar, value: 4, label: "Años en Madrid", suffix: "" },
  { icon: Globe, value: 2, label: "Temporadas FIP", suffix: "" },
  { icon: Award, value: 222, label: "Mejor Ranking", prefix: "#" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre-mi" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/fotos-juanchi/1-verical.jpg"
                alt="Juan Balzola - Jugador Profesional de Padel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
              Sobre Mí
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pasión por el{" "}
              <span className="text-gradient-gold">Padel</span>
            </h2>

            <div className="space-y-4 text-foreground/70 text-lg leading-relaxed mb-8">
              <p>
                Soy Juan Balzola, jugador profesional de padel nacido en{" "}
                <span className="text-foreground font-medium">Mar del Plata, Argentina</span>.
                Mi pasión por este deporte me llevó a vivir{" "}
                <span className="text-gold">4 años en Madrid</span>, donde entrené
                con diferentes academias y competí al más alto nivel.
              </p>
              <p>
                Durante mi tiempo en Europa, tuve la oportunidad de jugar con
                distintos compañeros, siendo mi proyecto más largo en 2025 con{" "}
                <span className="text-foreground font-medium">Francisco "Chico" Gomes</span>.
              </p>
              <p>
                Con la globalización que está teniendo el deporte actualmente,
                decidí volver a hacer base en Argentina para la temporada 2026,
                con un nuevo proyecto deportivo lleno de ambición.
              </p>
            </div>

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-8">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-sm">Actualmente en Mar del Plata, Argentina</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-secondary/50"
                >
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.prefix}
                    <CounterAnimation value={stat.value} />
                    {stat.suffix}
                  </div>
                  <p className="text-xs text-foreground/50 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
