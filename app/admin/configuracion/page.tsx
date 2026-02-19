"use client";

import PlayerConfigForm from "@/components/admin/PlayerConfigForm";

export default function AdminConfiguracionPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
        <p className="text-foreground/50 text-sm mt-1">
          Configurar ranking y estadísticas del jugador
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Ranking y Estadísticas
        </h3>
        <p className="text-foreground/50 text-sm mb-6">
          Estos valores se muestran en la página principal del sitio (Hero y
          Navbar).
        </p>
        <PlayerConfigForm />
      </div>
    </div>
  );
}
