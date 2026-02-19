"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TournamentType } from "@/lib/types/database";

type TypeFormData = {
  name: string;
  color_bg: string;
  color_text: string;
  color_border: string;
  sort_order: number;
};

const defaultFormData: TypeFormData = {
  name: "",
  color_bg: "bg-secondary",
  color_text: "text-foreground",
  color_border: "",
  sort_order: 0,
};

export default function TournamentTypeForm({
  open,
  onOpenChange,
  tournamentType,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentType?: TournamentType | null;
  onSaved: () => void;
}) {
  const [formData, setFormData] = useState<TypeFormData>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!tournamentType;

  useEffect(() => {
    if (tournamentType) {
      setFormData({
        name: tournamentType.name,
        color_bg: tournamentType.color_bg,
        color_text: tournamentType.color_text,
        color_border: tournamentType.color_border,
        sort_order: tournamentType.sort_order,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [tournamentType, open]);

  function updateField<K extends keyof TypeFormData>(
    key: K,
    value: TypeFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isEditing) {
      const { error } = await supabase
        .from("tournament_types")
        .update(formData)
        .eq("id", tournamentType!.id);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from("tournament_types")
        .insert(formData);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    onOpenChange(false);
    onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar tipo de torneo" : "Nuevo tipo de torneo"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Premier 1"
              required
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Color de fondo (clase Tailwind)</Label>
            <Input
              value={formData.color_bg}
              onChange={(e) => updateField("color_bg", e.target.value)}
              placeholder="bg-gold/20"
              required
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Color de texto (clase Tailwind)</Label>
            <Input
              value={formData.color_text}
              onChange={(e) => updateField("color_text", e.target.value)}
              placeholder="text-gold"
              required
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Borde (clase Tailwind, opcional)</Label>
            <Input
              value={formData.color_border}
              onChange={(e) => updateField("color_border", e.target.value)}
              placeholder="border border-gold/30"
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Orden</Label>
            <Input
              type="number"
              value={formData.sort_order}
              onChange={(e) => updateField("sort_order", Number(e.target.value))}
              className="bg-secondary border-border"
            />
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Vista previa</Label>
            <div className="p-3 bg-secondary rounded-lg">
              <Badge
                className={`${formData.color_bg} ${formData.color_text} ${formData.color_border}`}
              >
                {formData.name || "Nombre"}
              </Badge>
            </div>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gold text-black hover:bg-gold-light"
            >
              {loading
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear tipo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
