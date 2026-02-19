"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Trophy } from "lucide-react";

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Trophy className="w-5 h-5 text-gold" />
        <h1 className="font-semibold text-foreground">
          Panel de Administración
        </h1>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="text-foreground/60 hover:text-foreground"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Salir
      </Button>
    </header>
  );
}
