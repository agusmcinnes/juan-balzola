"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tournaments = [
  {
    name: "P1 Mar del Plata",
    category: "Premier 1",
    location: "Argentina",
    flag: "🇦🇷",
    year: "2024",
    featured: true,
  },
  {
    name: "P1 Chile",
    category: "Premier 1",
    location: "Chile",
    flag: "🇨🇱",
    year: "2024",
    featured: false,
  },
  {
    name: "Major México",
    category: "Major",
    location: "México",
    flag: "🇲🇽",
    year: "2024",
    featured: true,
  },
  {
    name: "P1 Buenos Aires",
    category: "Premier 1",
    location: "Argentina",
    flag: "🇦🇷",
    year: "2025",
    featured: false,
  },
  {
    name: "P2 Egipto",
    category: "Premier 2",
    location: "Egipto",
    flag: "🇪🇬",
    year: "2025",
    featured: false,
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Major":
      return "bg-gold text-black";
    case "Premier 1":
      return "bg-gold/20 text-gold border border-gold/30";
    case "Premier 2":
      return "bg-secondary text-foreground";
    default:
      return "bg-secondary text-foreground";
  }
};

export default function Tournaments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="torneos" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Competencias
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Torneos <span className="text-gradient-gold">Destacados</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Participación en los torneos más importantes del circuito FIP y
            Premier Padel durante las temporadas 2024 y 2025
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tournaments.map((tournament, index) => (
            <motion.div
              key={tournament.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 group ${
                tournament.featured ? "md:col-span-1 lg:row-span-1" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{tournament.flag}</div>
                <Badge className={getCategoryColor(tournament.category)}>
                  {tournament.category}
                </Badge>
              </div>

              {/* Tournament name */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                {tournament.name}
              </h3>

              {/* Details */}
              <div className="space-y-2 text-foreground/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-sm">{tournament.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="text-sm">{tournament.year}</span>
                </div>
              </div>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Circuit logos/info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/50 text-sm mb-4">
            Participación recurrente en el calendario
          </p>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-foreground/70">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="font-semibold">FIP Tour</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-foreground/70">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="font-semibold">Premier Padel</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
