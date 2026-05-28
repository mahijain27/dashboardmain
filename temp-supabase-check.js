const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').trim().split('\n').reduce((acc, line) => {
  const [key, ...rest] = line.split('=');
  if (!key) return acc;
  acc[key.trim()] = rest.join('=').trim();
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

(async () => {
  try {
    const res = await supabase.from('courses').select('*').limit(1);
    console.log('courses query:', JSON.stringify(res, null, 2));
    const res2 = await supabase.from('information_schema.tables').select('table_schema,table_name').eq('table_name','courses');
    console.log('table lookup:', JSON.stringify(res2, null, 2));
  } catch (err) {
    console.error('EXCEPTION', err);
  }
})();
