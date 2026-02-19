"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CalendarStatusBadge from "./CalendarStatusBadge";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { CalendarEventWithType } from "@/lib/types/database";

function formatDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, "d 'de' MMMM", { locale: es });
}

export default function CalendarEventCard({
  event,
  index = 0,
}: {
  event: CalendarEventWithType;
  index?: number;
}) {
  const type = event.tournament_type;
  const badgeClass = `${type.color_bg} ${type.color_text} ${type.color_border}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{event.country_flag}</div>
        <div className="flex flex-col items-end gap-2">
          <Badge className={badgeClass}>{type.name}</Badge>
          <CalendarStatusBadge status={event.status} />
        </div>
      </div>

      {/* Tournament name */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">
        {event.name}
      </h3>

      {/* Details */}
      <div className="space-y-2 text-foreground/60">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold shrink-0" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gold shrink-0" />
          <span className="text-sm">{formatDate(event.date_start)}</span>
        </div>
        {event.partner_name && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gold shrink-0" />
            <span className="text-sm">{event.partner_name}</span>
          </div>
        )}
      </div>

      {/* Result (if completed) */}
      {event.status === "completed" && event.result && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-sm text-gold font-medium">{event.result}</p>
        </div>
      )}

      {/* Hover decoration */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
