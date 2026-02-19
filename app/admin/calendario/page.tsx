"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventsTable from "@/components/admin/EventsTable";
import EventForm from "@/components/admin/EventForm";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { CalendarEventWithType, CalendarEvent } from "@/lib/types/database";

export default function AdminCalendarioPage() {
  const [events, setEvents] = useState<CalendarEventWithType[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CalendarEventWithType | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchEvents() {
    setLoading(true);
    const { data } = await supabase
      .from("calendar_events")
      .select("*, tournament_type:tournament_types(*)")
      .order("date_start", { ascending: true });
    if (data) setEvents(data as CalendarEventWithType[]);
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleEdit(event: CalendarEventWithType) {
    setEditingEvent(event);
    setFormOpen(true);
  }

  function handleNew() {
    setEditingEvent(null);
    setFormOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await supabase.from("calendar_events").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    fetchEvents();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Calendario</h2>
          <p className="text-foreground/50 text-sm mt-1">
            Gestionar eventos del calendario
          </p>
        </div>
        <Button
          onClick={handleNew}
          className="bg-gold text-black hover:bg-gold-light"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo evento
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <EventsTable
          events={events}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
        />
      )}

      <EventForm
        open={formOpen}
        onOpenChange={setFormOpen}
        event={editingEvent}
        onSaved={fetchEvents}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Eliminar evento"
        description={`¿Estás seguro de eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
