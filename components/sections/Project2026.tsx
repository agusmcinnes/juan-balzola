"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Trophy, Calendar } from "lucide-react";

const teamMembers = [
  {
    name: "Valentín San Juan",
    role: "Compañero",
    description: "Mi nuevo compañero para la temporada 2026",
  },
  {
    name: "Facundo Roberto",
    role: "Entrenador",
    description: "A cargo de nuestra preparación técnica y táctica",
  },
];

const objectives = [
  { icon: Trophy, text: "Calendario FIP completo" },
  { icon: Target, text: "Torneos Premier Padel" },
  { icon: Calendar, text: "AJPP en semanas libres" },
];

export default function Project2026() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="proyecto-2026"
      className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            El Futuro
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Proyecto <span className="text-gradient-gold">2026</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Un nuevo capítulo comienza. Base en Argentina con un equipo renovado
            y objetivos ambiciosos para la próxima temporada.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-2xl font-bold">El Equipo</h3>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass rounded-xl p-6 hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <span className="text-gold font-bold text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{member.name}</h4>
                      <p className="text-gold text-sm mb-1">{member.role}</p>
                      <p className="text-foreground/60 text-sm">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Objectives Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-2xl font-bold">Objetivos</h3>
            </div>

            <div className="glass rounded-xl p-6 mb-6">
              <p className="text-foreground/80 leading-relaxed">
                Con la globalización que está teniendo el deporte actualmente,
                decidimos volver a hacer base en{" "}
                <span className="text-gold font-medium">
                  Argentina, Mar del Plata
                </span>
                . Esta decisión viene de la mano del nuevo proyecto deportivo
                que vamos a desarrollar junto a Valentín y Facundo.
              </p>
            </div>

            <div className="space-y-4">
              {objectives.map((objective, index) => (
                <motion.div
                  key={objective.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gold/5 border border-gold/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <objective.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-medium">{objective.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quote/Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block glass rounded-2xl px-8 py-6 max-w-2xl">
            <p className="text-lg md:text-xl italic text-foreground/80">
              "2026 será el año de dar el siguiente paso en mi carrera. Con el
              equipo adecuado y la mentalidad correcta, vamos por todo."
            </p>
            <p className="text-gold mt-4 font-semibold">— Juan Balzola</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
