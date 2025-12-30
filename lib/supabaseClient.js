// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// BURASI ÖNEMLİ: Linki değil, değişkenin ADINI yazıyoruz.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase bilgileri eksik! .env.local dosyasını kontrol et.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
