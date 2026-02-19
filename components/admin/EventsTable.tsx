"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { CalendarEventWithType } from "@/lib/types/database";

const statusLabels: Record<string, { label: string; className: string }> = {
  upcoming: {
    label: "Próximo",
    className: "bg-gold/20 text-gold",
  },
  in_progress: {
    label: "En curso",
    className: "bg-emerald-500/20 text-emerald-400",
  },
  completed: {
    label: "Completado",
    className: "bg-foreground/10 text-foreground/60",
  },
};

export default function EventsTable({
  events,
  onEdit,
  onDelete,
}: {
  events: CalendarEventWithType[];
  onEdit: (event: CalendarEventWithType) => void;
  onDelete: (event: CalendarEventWithType) => void;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-foreground/50">Torneo</TableHead>
            <TableHead className="text-foreground/50">Tipo</TableHead>
            <TableHead className="text-foreground/50">Lugar</TableHead>
            <TableHead className="text-foreground/50">Fecha</TableHead>
            <TableHead className="text-foreground/50">Estado</TableHead>
            <TableHead className="text-foreground/50 text-right">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-foreground/40 py-8"
              >
                No hay eventos cargados
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => {
              const type = event.tournament_type;
              const status = statusLabels[event.status];
              return (
                <TableRow key={event.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{event.country_flag}</span>
                      <span className="font-medium text-foreground">
                        {event.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${type.color_bg} ${type.color_text} ${type.color_border}`}
                    >
                      {type.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground/70">
                    {event.location}
                  </TableCell>
                  <TableCell className="text-foreground/70">
                    {format(parseISO(event.date_start), "d MMM yyyy", {
                      locale: es,
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge className={status.className}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-foreground/50 hover:text-foreground"
                        onClick={() => onEdit(event)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-foreground/50 hover:text-destructive"
                        onClick={() => onDelete(event)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
