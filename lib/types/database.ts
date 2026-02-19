export type TournamentType = {
  id: string
  name: string
  color_bg: string
  color_text: string
  color_border: string
  sort_order: number
  created_at: string
  updated_at: string
}

export type CalendarEvent = {
  id: string
  name: string
  tournament_type_id: string
  location: string
  country: string
  country_flag: string
  date_start: string
  date_end: string
  result: string | null
  partner_name: string | null
  status: 'upcoming' | 'completed' | 'in_progress'
  year: number
  featured: boolean
  created_at: string
  updated_at: string
}

export type CalendarEventWithType = CalendarEvent & {
  tournament_type: TournamentType
}

export type PlayerConfig = {
  id: string
  key: string
  value: string
  label: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      tournament_types: {
        Row: TournamentType
        Insert: Omit<TournamentType, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<TournamentType, 'id' | 'created_at' | 'updated_at'>>
      }
      calendar_events: {
        Row: CalendarEvent
        Insert: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>>
      }
      player_config: {
        Row: PlayerConfig
        Insert: Omit<PlayerConfig, 'id' | 'updated_at'>
        Update: Partial<Omit<PlayerConfig, 'id' | 'updated_at'>>
      }
    }
  }
}
