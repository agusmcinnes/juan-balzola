"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Trophy } from "lucide-react";
import CalendarMonthSection from "@/components/calendar/CalendarMonthSection";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { CalendarEventWithType } from "@/lib/types/database";

function groupEventsByMonth(events: CalendarEventWithType[]) {
  const grouped: Record<string, CalendarEventWithType[]> = {};
  for (const event of events) {
    const date = parseISO(event.date_start);
    const monthKey = format(date, "MMMM yyyy", { locale: es });
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(event);
  }
  return grouped;
}

export default function Calendario({
  events,
}: {
  events: CalendarEventWithType[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const eventsByMonth = groupEventsByMonth(events);
  const monthEntries = Object.entries(eventsByMonth);
  const upcomingCount = events.filter((e) => e.status === "upcoming").length;
  const completedCount = events.filter((e) => e.status === "completed").length;

  return (
    <section id="calendario" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Temporada 2026
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Calendario</span> de Torneos
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto mb-8">
            Todos los torneos programados para la temporada, actualizados en
            tiempo real
          </p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-foreground/70">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="font-semibold">{events.length} torneos</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-foreground/70">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="font-semibold">
                {completedCount} jugados
              </span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-foreground/70">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-semibold">{upcomingCount} próximos</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Calendar by month */}
        {monthEntries.length > 0 ? (
          <div className="max-w-5xl mx-auto">
            {monthEntries.map(([month, monthEvents]) => (
              <CalendarMonthSection
                key={month}
                month={month}
                events={monthEvents}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <Calendar className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground/40 text-lg">
              El calendario se actualizará próximamente
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
