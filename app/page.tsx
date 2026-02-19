import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Tournaments from "@/components/sections/Tournaments";
import Calendario from "@/components/sections/Calendario";
import Gallery from "@/components/sections/Gallery";
import Sponsors from "@/components/sections/Sponsors";
import Project2026 from "@/components/sections/Project2026";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CalendarEventWithType, PlayerConfig } from "@/lib/types/database";

export const revalidate = 60;

export default async function Home() {
  let events: CalendarEventWithType[] = [];
  const configMap: Record<string, string> = {};

  const supabase = createServerSupabaseClient();
  if (supabase) {
    const [eventsResult, configResult] = await Promise.all([
      supabase
        .from("calendar_events")
        .select("*, tournament_type:tournament_types(*)")
        .eq("year", 2026)
        .order("date_start", { ascending: true }),
      supabase.from("player_config").select("*"),
    ]);

    events = (eventsResult.data ?? []) as CalendarEventWithType[];
    const configs = (configResult.data ?? []) as PlayerConfig[];
    for (const c of configs) {
      configMap[c.key] = c.value;
    }
  }

  return (
    <>
      <Navbar fipRanking={configMap.fip_ranking ?? "294"} />
      <main>
        <Hero
          fipRanking={Number(configMap.fip_ranking) || 294}
          bestRanking={Number(configMap.best_ranking) || 222}
          points2025={Number(configMap.points_2025) || 119}
        />
        <About />
        <Timeline />
        <Tournaments />
        <Calendario events={events} />
        <Gallery />
        <Sponsors />
        <Project2026 />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
