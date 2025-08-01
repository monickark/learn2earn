// server/supabaseClient.js
import {createClient} from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;