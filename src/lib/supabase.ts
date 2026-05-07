import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sbyefaafaovnqxuxlqqy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNieWVmYWFmYW92bnF4dXhscXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzY2NzYsImV4cCI6MjA4NTUxMjY3Nn0.JPNNdxcBkwsnY0ujA9zDiekEJb86chqXyR8HM2ZYDWY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);