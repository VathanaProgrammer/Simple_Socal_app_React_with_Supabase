import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zajeidltrkiobkkkrius.supabase.co"  // from Supabase dashboard
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphamVpZGx0cmtpb2Jra2tyaXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NjI2MTcsImV4cCI6MjA3MjMzODYxN30.FsdW3W8iZ6NwudOA34Gs5DWDttkDnbHiDA8-3bfot0A" // from Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
