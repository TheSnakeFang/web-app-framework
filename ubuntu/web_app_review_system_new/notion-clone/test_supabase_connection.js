const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_[REDACTED SECRET]_SUPABASE_URL;
const supabaseKey = process.env.NEXT_[REDACTED SECRET]_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('tasks').select('*').limit(1);

    if (error) {
      console.error('Error connecting to Supabase:', error.message);
    } else {
      console.log('Successfully connected to Supabase');
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

testConnection();
