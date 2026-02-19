"use client";

import { motion } from "framer-motion";
import CalendarEventCard from "./CalendarEventCard";
import type { CalendarEventWithType } from "@/lib/types/database";

export default function CalendarMonthSection({
  month,
  events,
}: {
  month: string;
  events: CalendarEventWithType[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      {/* Month header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-2 h-2 rounded-full bg-gold" />
        <h3 className="text-gold text-sm font-semibold tracking-widest uppercase">
          {month}
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
      </div>

      {/* Events grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <CalendarEventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
