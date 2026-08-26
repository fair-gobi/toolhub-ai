/**
 * REPLACE OLD 500 VFX WITH NEW 1000 VFX = 13100 TOTAL
 * 12100 existing + 1000 new VFX
 */

const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

let rawUrl = process.env.DATABASE_URL || 'DATABASE_URL=postgresql://neondb_owner:npg_XGYUQ90EitbF@ep-morning-recipe-azh19ugu-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
if(!rawUrl){
  try{
    // try read from any previous file
    const files = fs.readdirSync('.').filter(f=>f.endsWith('.js'));
    for(const f of files){
      const txt = fs.readFileSync(f,'utf8');
      const m = txt.match(/postgresql:\/\/[^\s'"`]+/);
      if(m){ rawUrl = m[0]; break; }
    }
  }catch(e){}
}
if(!rawUrl){ console.log('❌ Set DATABASE_URL env'); process.exit(1); }
rawUrl = rawUrl.replace(/^["']|["']$/g,'').trim().split(' ')[0].trim();
if(rawUrl.includes('DATABASE_URL=')) rawUrl = rawUrl.split('DATABASE_URL=')[1].trim();
const DATABASE_URL = rawUrl;
const sql = neon(DATABASE_URL);

function loadJson(file){
  const p = path.resolve(file);
  if(!fs.existsSync(p)){ console.log(`❌ NOT FOUND: ${file} - put it in this folder`); return []; }
  const raw = fs.readFileSync(p,'utf8');
  let d = JSON.parse(raw);
  if(Array.isArray(d)) return d;
  if(d.prompts) return d.prompts;
  if(d.data) return d.data;
  return [];
}

(async()=>{
  console.log('=== REPLACE VFX 500 -> 1000 ===');
  console.log('URL:', DATABASE_URL.slice(0,40)+'...');

  // 1. Count before
  const before = await sql`SELECT COUNT(*) as c FROM prompts`;
  console.log(`Before: ${before[0].c}`);

  // 2. Delete OLD VFX (500)
  console.log('🗑️ Deleting old VFX 500...');
  await sql`DELETE FROM prompts WHERE id ILIKE '%vfx%' OR COALESCE(category,'') ILIKE '%vfx%'`;
  const afterDel = await sql`SELECT COUNT(*) as c FROM prompts`;
  console.log(`After delete old VFX: ${afterDel[0].c} (should be 12100)`);

  // 3. Load NEW 1000 VFX
  const vfxFile = 'ALL_1000_VFX_TEMPLATE_EXPANDED.json';
  const items = loadJson(vfxFile);
  console.log(`\n📂 ${vfxFile} => ${items.length} prompts`);

  if(!items.length){
    console.log('❌ Put ALL_1000_VFX_TEMPLATE_EXPANDED.json in C:\\Users\\DELL\\toolhub-fresh');
    return;
  }

  let inserted = 0;
  for(let i=0;i<items.length;i++){
    const it = items[i];
    let pc = it.prompt_content || it.prompt || it.content || it.text || it.description || '';
    if(typeof pc !== 'string') pc = JSON.stringify(pc);
    if(!pc || pc.length < 5) pc = JSON.stringify(it).slice(0,2000);
    
    const id = `vfx-${Date.now()}-${i}-${Math.random().toString(36).slice(2,6)}`;
    const category = 'VFX Templates';
    const title = (it.title || pc.slice(0,80)).toString().slice(0,200);
    const preview = it.preview_url || `https://image.pollinations.ai/prompt/${encodeURIComponent(pc.slice(0,700))}?model=turbo&width=1024&height=1024&nologo=true&enhance=true`;

    try{
      await sql`INSERT INTO prompts (id, prompt_content, category, preview_url, title) VALUES (${id}, ${pc}, ${category}, ${preview}, ${title})`;
      inserted++;
    }catch(e){
      try{
        await sql`INSERT INTO prompts (id, prompt_content, category, preview_url) VALUES (${id}, ${pc}, ${category}, ${preview})`;
        inserted++;
      }catch(e2){
        console.log(`FAIL ${i}: ${e2.message.slice(0,200)}`);
      }
    }
    if(inserted % 200 === 0) console.log(`Inserted VFX: ${inserted}/${items.length}`);
  }

  const final = await sql`SELECT COUNT(*) as c FROM prompts`;
  console.log(`\n🎉 DONE!`);
  console.log(`   Inserted new VFX: ${inserted}/1000`);
  console.log(`   DB TOTAL: ${final[0].c}`);
  console.log(`   Expected: 13100 (12100 + 1000)`);
  if(final[0].c == 13100) console.log('✅ PERFECT 13,100!');
  else console.log(`⚠️ Got ${final[0].c}, need 13100 - check if marketing 600 was inserted before`);
})();
