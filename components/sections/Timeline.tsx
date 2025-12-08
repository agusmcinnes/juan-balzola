"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Target, Plane } from "lucide-react";

const timelineData = [
  {
    year: "2024",
    title: "Inicio en el Circuito FIP",
    description:
      "Comencé mi carrera profesional en el circuito FIP, terminando el año con 79 puntos. Participé en torneos destacados como P1 Mar del Plata, P1 Chile y Major México.",
    points: 79,
    icon: Target,
    highlights: ["P1 Mar del Plata", "P1 Chile", "Major México"],
  },
  {
    year: "2025",
    title: "Crecimiento y Consolidación",
    description:
      "Año de crecimiento significativo, alcanzando 119 puntos y mi mejor ranking #222. Jugué con Francisco 'Chico' Gomes y participé en P1 Buenos Aires y P2 Egipto.",
    points: 119,
    icon: TrendingUp,
    highlights: ["P1 Buenos Aires", "P2 Egipto", "Mejor ranking #222"],
  },
  {
    year: "2026",
    title: "Nuevo Proyecto",
    description:
      "Regreso a Argentina con un ambicioso proyecto deportivo junto a Valentín San Juan como compañero y Facundo Roberto como entrenador. Apuntamos al calendario FIP y Premier Padel.",
    points: null,
    icon: Plane,
    highlights: ["Nuevo compañero", "Nuevo entrenador", "Base en Argentina"],
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trayectoria" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Mi Camino
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient-gold">Trayectoria</span> Profesional
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/50 to-gold/20" />

          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 md:mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-gold rounded-full glow-gold z-10" />

              {/* Content card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-gold/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <span className="text-gold text-3xl font-bold">
                        {item.year}
                      </span>
                      {item.points && (
                        <p className="text-sm text-foreground/50">
                          {item.points} puntos FIP
                        </p>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-foreground/70 mb-4">{item.description}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 text-xs rounded-full bg-gold/10 text-gold border border-gold/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
