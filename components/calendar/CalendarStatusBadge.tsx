"use client";

import { Badge } from "@/components/ui/badge";
import { Check, Clock, Zap } from "lucide-react";

type Status = "upcoming" | "in_progress" | "completed";

const statusConfig: Record<Status, { label: string; className: string; icon: typeof Clock }> = {
  upcoming: {
    label: "Próximo",
    className: "bg-gold/20 text-gold border border-gold/30",
    icon: Clock,
  },
  in_progress: {
    label: "En curso",
    className: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    icon: Zap,
  },
  completed: {
    label: "Completado",
    className: "bg-foreground/10 text-foreground/60 border border-foreground/10",
    icon: Check,
  },
};

export default function CalendarStatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} gap-1 text-xs font-medium`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
