"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Calendar, Tag, Settings, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    tournamentTypes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [eventsRes, upcomingRes, typesRes] = await Promise.all([
        supabase.from("calendar_events").select("id", { count: "exact", head: true }),
        supabase
          .from("calendar_events")
          .select("id", { count: "exact", head: true })
          .eq("status", "upcoming"),
        supabase.from("tournament_types").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        totalEvents: eventsRes.count ?? 0,
        upcomingEvents: upcomingRes.count ?? 0,
        tournamentTypes: typesRes.count ?? 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Eventos",
      value: stats.totalEvents,
      icon: Calendar,
      href: "/admin/calendario",
    },
    {
      label: "Próximos",
      value: stats.upcomingEvents,
      icon: ArrowRight,
      href: "/admin/calendario",
    },
    {
      label: "Tipos de Torneo",
      value: stats.tournamentTypes,
      icon: Tag,
      href: "/admin/tipos-torneo",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-foreground/50 text-sm mt-1">
          Resumen general del sitio
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-card border border-border rounded-xl p-5 hover:border-gold/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-foreground">
                  {card.value}
                </p>
              )}
              <p className="text-sm text-foreground/50 mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Acciones rápidas
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-gold text-black hover:bg-gold-light">
            <Link href="/admin/calendario">
              <Plus className="w-4 h-4 mr-2" />
              Agregar evento
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-border">
            <Link href="/admin/tipos-torneo">
              <Tag className="w-4 h-4 mr-2" />
              Tipos de torneo
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-border">
            <Link href="/admin/configuracion">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
