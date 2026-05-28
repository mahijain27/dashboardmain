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
  const res = await supabase.from('courses').select('*').limit(1);
  console.log('RAW_ERROR_OBJECT_START');
  console.log(JSON.stringify(res.error, null, 2));
  console.log('RAW_ERROR_OBJECT_END');
})();
