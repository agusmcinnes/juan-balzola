-- ============================================
-- Schema para Juan Balzola - Calendario de Padel
-- Ejecutar en Supabase SQL Editor
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: tournament_types
-- ============================================
CREATE TABLE tournament_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color_bg TEXT NOT NULL,
  color_text TEXT NOT NULL,
  color_border TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: calendar_events
-- ============================================
CREATE TABLE calendar_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  tournament_type_id UUID NOT NULL REFERENCES tournament_types(id) ON DELETE RESTRICT,
  location TEXT NOT NULL,
  country TEXT NOT NULL,
  country_flag TEXT NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  result TEXT DEFAULT NULL,
  partner_name TEXT DEFAULT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming'
    CHECK (status IN ('upcoming', 'completed', 'in_progress')),
  year INTEGER NOT NULL DEFAULT 2026,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_calendar_events_date ON calendar_events(date_start);
CREATE INDEX idx_calendar_events_year ON calendar_events(year);

-- ============================================
-- TABLE: player_config
-- ============================================
CREATE TABLE player_config (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  label TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Seed: config del jugador
-- ============================================
INSERT INTO player_config (key, value, label) VALUES
  ('fip_ranking', '294', 'Ranking FIP'),
  ('best_ranking', '222', 'Mejor Ranking'),
  ('points_2025', '119', 'Puntos 2025');

-- ============================================
-- Seed: tipos de torneo
-- ============================================
INSERT INTO tournament_types (name, color_bg, color_text, color_border, sort_order) VALUES
  ('Major', 'bg-gold', 'text-black', '', 1),
  ('Premier 1', 'bg-gold/20', 'text-gold', 'border border-gold/30', 2),
  ('Premier 2', 'bg-secondary', 'text-foreground', '', 3),
  ('FIP Rise', 'bg-emerald-500/20', 'text-emerald-400', 'border border-emerald-500/30', 4),
  ('AJPP', 'bg-blue-500/20', 'text-blue-400', 'border border-blue-500/30', 5);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE tournament_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_config ENABLE ROW LEVEL SECURITY;

-- Lectura publica
CREATE POLICY "Public read tournament_types" ON tournament_types
  FOR SELECT USING (true);

CREATE POLICY "Public read calendar_events" ON calendar_events
  FOR SELECT USING (true);

CREATE POLICY "Public read player_config" ON player_config
  FOR SELECT USING (true);

-- Escritura solo autenticados
CREATE POLICY "Auth insert tournament_types" ON tournament_types
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update tournament_types" ON tournament_types
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete tournament_types" ON tournament_types
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert calendar_events" ON calendar_events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update calendar_events" ON calendar_events
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete calendar_events" ON calendar_events
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert player_config" ON player_config
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update player_config" ON player_config
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete player_config" ON player_config
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- Trigger: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tournament_types_updated_at
  BEFORE UPDATE ON tournament_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
  BEFORE UPDATE ON calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_player_config_updated_at
  BEFORE UPDATE ON player_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
