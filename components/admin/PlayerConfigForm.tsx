"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, Check } from "lucide-react";
import type { PlayerConfig } from "@/lib/types/database";

export default function PlayerConfigForm() {
  const [configs, setConfigs] = useState<PlayerConfig[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchConfigs();
  }, []);

  async function fetchConfigs() {
    const { data } = await supabase
      .from("player_config")
      .select("*")
      .order("key");
    if (data) {
      setConfigs(data);
      const vals: Record<string, string> = {};
      for (const c of data) {
        vals[c.key] = c.value;
      }
      setValues(vals);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    for (const config of configs) {
      const newValue = values[config.key];
      if (newValue !== config.value) {
        await supabase
          .from("player_config")
          .update({ value: newValue })
          .eq("id", config.id);
      }
    }

    setSaving(false);
    setSaved(true);
    fetchConfigs();
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  const configLabels: Record<string, string> = {
    fip_ranking: "Ranking FIP actual",
    best_ranking: "Mejor ranking histórico",
    points_2025: "Puntos temporada 2025",
  };

  return (
    <div className="max-w-md space-y-6">
      {configs.map((config) => (
        <div key={config.id} className="space-y-2">
          <Label>{configLabels[config.key] ?? config.label ?? config.key}</Label>
          <Input
            value={values[config.key] ?? ""}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, [config.key]: e.target.value }))
            }
            className="bg-secondary border-border"
          />
          <p className="text-xs text-foreground/40">
            Última actualización:{" "}
            {new Date(config.updated_at).toLocaleDateString("es-AR")}
          </p>
        </div>
      ))}

      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-gold text-black hover:bg-gold-light"
      >
        {saving ? (
          "Guardando..."
        ) : saved ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Guardado
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Guardar cambios
          </>
        )}
      </Button>
    </div>
  );
}
