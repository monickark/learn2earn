// server/supabaseClient.js
import {createClient} from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Clean up environment variables that might have prefixes (only if they start with the exact variable name)
let supabaseUrl = process.env.SUPABASE_URL;
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Handle case where env vars include the variable name prefix (only at the start)
if (supabaseUrl?.startsWith('SUPABASE_URL=')) {
  supabaseUrl = supabaseUrl.slice('SUPABASE_URL='.length);
}
if (supabaseServiceKey?.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
  supabaseServiceKey = supabaseServiceKey.slice('SUPABASE_SERVICE_ROLE_KEY='.length);
}

// Validate required environment variables
if (!supabaseUrl) {
  console.error('SUPABASE_URL environment variable is not set');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set');
  process.exit(1);
}

console.log('Supabase URL configured:', supabaseUrl.substring(0, 30) + '...');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;