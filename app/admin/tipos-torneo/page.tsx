"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TournamentTypesTable from "@/components/admin/TournamentTypesTable";
import TournamentTypeForm from "@/components/admin/TournamentTypeForm";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { TournamentType } from "@/lib/types/database";

export default function AdminTiposTorneoPage() {
  const [types, setTypes] = useState<TournamentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingType, setEditingType] = useState<TournamentType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TournamentType | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchTypes() {
    setLoading(true);
    const { data } = await supabase
      .from("tournament_types")
      .select("*")
      .order("sort_order");
    if (data) setTypes(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTypes();
  }, []);

  function handleEdit(type: TournamentType) {
    setEditingType(type);
    setFormOpen(true);
  }

  function handleNew() {
    setEditingType(null);
    setFormOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase
      .from("tournament_types")
      .delete()
      .eq("id", deleteTarget.id);
    setDeleting(false);
    if (error) {
      alert(
        "No se puede eliminar este tipo porque tiene eventos asociados. Eliminá primero los eventos."
      );
      setDeleteTarget(null);
      return;
    }
    setDeleteTarget(null);
    fetchTypes();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Tipos de Torneo
          </h2>
          <p className="text-foreground/50 text-sm mt-1">
            Gestionar categorías de torneos
          </p>
        </div>
        <Button
          onClick={handleNew}
          className="bg-gold text-black hover:bg-gold-light"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo tipo
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <TournamentTypesTable
          types={types}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
        />
      )}

      <TournamentTypeForm
        open={formOpen}
        onOpenChange={setFormOpen}
        tournamentType={editingType}
        onSaved={fetchTypes}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Eliminar tipo de torneo"
        description={`¿Estás seguro de eliminar "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
