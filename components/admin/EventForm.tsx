"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CalendarEvent, TournamentType } from "@/lib/types/database";

const COUNTRY_FLAGS = [
  { flag: "🇦🇷", name: "Argentina" },
  { flag: "🇧🇷", name: "Brasil" },
  { flag: "🇨🇱", name: "Chile" },
  { flag: "🇲🇽", name: "México" },
  { flag: "🇺🇾", name: "Uruguay" },
  { flag: "🇵🇾", name: "Paraguay" },
  { flag: "🇵🇪", name: "Perú" },
  { flag: "🇨🇴", name: "Colombia" },
  { flag: "🇪🇨", name: "Ecuador" },
  { flag: "🇪🇸", name: "España" },
  { flag: "🇵🇹", name: "Portugal" },
  { flag: "🇮🇹", name: "Italia" },
  { flag: "🇫🇷", name: "Francia" },
  { flag: "🇩🇪", name: "Alemania" },
  { flag: "🇬🇧", name: "Reino Unido" },
  { flag: "🇧🇪", name: "Bélgica" },
  { flag: "🇳🇱", name: "Países Bajos" },
  { flag: "🇸🇪", name: "Suecia" },
  { flag: "🇩🇰", name: "Dinamarca" },
  { flag: "🇫🇮", name: "Finlandia" },
  { flag: "🇦🇹", name: "Austria" },
  { flag: "🇨🇭", name: "Suiza" },
  { flag: "🇵🇱", name: "Polonia" },
  { flag: "🇨🇿", name: "República Checa" },
  { flag: "🇭🇺", name: "Hungría" },
  { flag: "🇷🇴", name: "Rumania" },
  { flag: "🇬🇷", name: "Grecia" },
  { flag: "🇭🇷", name: "Croacia" },
  { flag: "🇪🇬", name: "Egipto" },
  { flag: "🇲🇦", name: "Marruecos" },
  { flag: "🇿🇦", name: "Sudáfrica" },
  { flag: "🇦🇪", name: "Emiratos Árabes" },
  { flag: "🇶🇦", name: "Qatar" },
  { flag: "🇸🇦", name: "Arabia Saudita" },
  { flag: "🇰🇼", name: "Kuwait" },
  { flag: "🇧🇭", name: "Baréin" },
  { flag: "🇯🇵", name: "Japón" },
  { flag: "🇨🇳", name: "China" },
  { flag: "🇮🇳", name: "India" },
  { flag: "🇺🇸", name: "Estados Unidos" },
  { flag: "🇨🇦", name: "Canadá" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇳🇿", name: "Nueva Zelanda" },
  { flag: "🇹🇷", name: "Turquía" },
  { flag: "🇮🇱", name: "Israel" },
  { flag: "🇯🇴", name: "Jordania" },
  { flag: "🇵🇦", name: "Panamá" },
  { flag: "🇨🇷", name: "Costa Rica" },
  { flag: "🇩🇴", name: "República Dominicana" },
];

type EventFormData = {
  name: string;
  tournament_type_id: string;
  location: string;
  country: string;
  country_flag: string;
  date_start: string;
  status: "upcoming" | "completed" | "in_progress";
  result: string;
  partner_name: string;
  featured: boolean;
};

const defaultFormData: EventFormData = {
  name: "",
  tournament_type_id: "",
  location: "",
  country: "",
  country_flag: "",
  date_start: "",
  status: "upcoming",
  result: "",
  partner_name: "",
  featured: false,
};

export default function EventForm({
  open,
  onOpenChange,
  event,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent | null;
  onSaved: () => void;
}) {
  const [formData, setFormData] = useState<EventFormData>(defaultFormData);
  const [types, setTypes] = useState<TournamentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!event;

  useEffect(() => {
    supabase
      .from("tournament_types")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setTypes(data);
      });
  }, []);

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        tournament_type_id: event.tournament_type_id,
        location: event.location,
        country: event.country,
        country_flag: event.country_flag,
        date_start: event.date_start,
        status: event.status,
        result: event.result ?? "",
        partner_name: event.partner_name ?? "",
        featured: event.featured,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [event, open]);

  function updateField<K extends keyof EventFormData>(
    key: K,
    value: EventFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleCountrySelect(flag: string) {
    const country = COUNTRY_FLAGS.find((c) => c.flag === flag);
    if (country) {
      setFormData((prev) => ({
        ...prev,
        country_flag: country.flag,
        country: prev.country || country.name,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const year = formData.date_start
      ? new Date(formData.date_start).getFullYear()
      : 2026;

    const payload = {
      name: formData.name,
      tournament_type_id: formData.tournament_type_id,
      location: formData.location,
      country: formData.country,
      country_flag: formData.country_flag,
      date_start: formData.date_start,
      date_end: formData.date_start,
      status: formData.status,
      result: formData.result || null,
      partner_name: formData.partner_name || null,
      year,
      featured: formData.featured,
    };

    if (isEditing) {
      const { error } = await supabase
        .from("calendar_events")
        .update(payload)
        .eq("id", event!.id);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from("calendar_events")
        .insert(payload);
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
      <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar evento" : "Nuevo evento"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre del torneo</Label>
            <Input
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Ej: P2 Egipto"
              required
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de torneo</Label>
            <Select
              value={formData.tournament_type_id}
              onValueChange={(v) => updateField("tournament_type_id", v)}
              required
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {types.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Country flag selector */}
          <div className="space-y-2">
            <Label>País y bandera</Label>
            <Select
              value={formData.country_flag}
              onValueChange={handleCountrySelect}
              required
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Seleccionar país">
                  {formData.country_flag && (
                    <span>
                      {formData.country_flag}{" "}
                      {COUNTRY_FLAGS.find((c) => c.flag === formData.country_flag)?.name}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-card border-border max-h-60">
                {COUNTRY_FLAGS.map((c) => (
                  <SelectItem key={c.flag} value={c.flag}>
                    {c.flag} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ubicación</Label>
            <Input
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Ej: Buenos Aires, Argentina"
              required
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Fecha</Label>
            <Input
              type="date"
              value={formData.date_start}
              onChange={(e) => updateField("date_start", e.target.value)}
              required
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(v) =>
                updateField("status", v as EventFormData["status"])
              }
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="upcoming">Próximo</SelectItem>
                <SelectItem value="in_progress">En curso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.status === "completed" && (
            <div className="space-y-2">
              <Label>Resultado</Label>
              <Textarea
                value={formData.result}
                onChange={(e) => updateField("result", e.target.value)}
                placeholder="Ej: Cuartos de final"
                className="bg-secondary border-border"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Compañero (opcional)</Label>
            <Input
              value={formData.partner_name}
              onChange={(e) => updateField("partner_name", e.target.value)}
              placeholder="Ej: Valentín San Juan"
              className="bg-secondary border-border"
            />
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => updateField("featured", e.target.checked)}
              className="h-4 w-4 rounded border-border accent-gold"
            />
            <Label htmlFor="featured" className="cursor-pointer text-sm">
              Torneo destacado
            </Label>
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
                  : "Crear evento"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
