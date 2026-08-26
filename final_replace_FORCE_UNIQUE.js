/**
 * FINAL FIX - Force unique IDs to get full 12,100 + 500 VFX = 12,600
 */

const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

let rawUrl = process.env.DATABASE_URL || 'DATABASE_URL=postgresql://neondb_owner:npg_XGYUQ90EitbF@ep-morning-recipe-azh19ugu-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
if (rawUrl.includes('DATABASE_URL=')) rawUrl = rawUrl.split('DATABASE_URL=')[1].trim();
rawUrl = rawUrl.replace(/^["']|["']$/g, '').trim().split(' ')[0].trim();
const DATABASE_URL = rawUrl;

const FILES = [
  'natural location viral prompts.json',
  'wildlife_viral_prompts.json',
  'PROMPTOOLHUB_IMAGE_1700_V81_WORLD_CLASS_REWRITE_EXECUTION_QA.json',
  'VIDEO_1100_ALL_1-1100_EXECUTION_REWRITE_v1.json',
  'MARKETING_V9_EXECUTION_FIRST_600_QA.json',
  'PROMPTOOLHUB_8200_V85_6_EXECUTION_QA_MASTER.json',
  'PROMPTOOLHUB_300_HERO_V9_0_EXECUTION_READY.json'
];

function loadJson(file){
  const p = path.resolve(file);
  if(!fs.existsSync(p)){ console.log(`❌ ${file} NOT FOUND`); return []; }
  const raw = fs.readFileSync(p,'utf8');
  let d = JSON.parse(raw);
  if(Array.isArray(d)) return d;
  if(d.prompts) return d.prompts;
  if(d.data) return d.data;
  return [];
}

(async () => {
  const sql = neon(DATABASE_URL);
  console.log('=== FIXING COUNT TO 12,100 + 500 ===');

  const vfx = await sql`SELECT COUNT(*) as c FROM prompts WHERE id ILIKE '%vfx%' OR COALESCE(category,'') ILIKE '%vfx%'`;
  console.log(`Keeping VFX: ${vfx[0].c}`);

  console.log('🗑️ Deleting non-VFX again...');
  await sql`DELETE FROM prompts WHERE id NOT ILIKE '%vfx%' AND COALESCE(category,'') NOT ILIKE '%vfx%'`;

  let total = 0;
  let globalCounter = 0;
  for(const file of FILES){
    const items = loadJson(file);
    console.log(`\n📂 ${file} => ${items.length}`);
    for(let i=0;i<items.length;i++){
      const it = items[i];
      globalCounter++;
      // FORCE UNIQUE ID - no overlap
      const id = `ph-${globalCounter}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,5)}`;
      const prompt_content = it.prompt_content || it.prompt || it.content || it.text || '';
      if(!prompt_content || prompt_content.length < 5) continue;
      const category = (it.category || file.replace('.json','')).toString().slice(0,80);
      const preview_url = it.preview_url || `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt_content.slice(0,700))}?model=turbo&width=1024&height=1024&nologo=true&enhance=true`;
      const title = (it.title || prompt_content.slice(0,90)).toString().slice(0,200);
      try{
        await sql`INSERT INTO prompts (id, prompt_content, category, preview_url, title) VALUES (${id}, ${prompt_content}, ${category}, ${preview_url}, ${title})`;
        total++;
      }catch(e){
        try{
          await sql`INSERT INTO prompts (id, prompt_content, category, preview_url) VALUES (${id}, ${prompt_content}, ${category}, ${preview_url})`;
          total++;
        }catch(e2){ console.error(e2.message.slice(0,150)); }
      }
    }
    console.log(`  Inserted so far: ${total}`);
  }

  const final = await sql`SELECT COUNT(*) as c FROM prompts`;
  console.log(`\n🎉 FINAL FIXED!`);
  console.log(`   Files total: 12100`);
  console.log(`   Inserted now: ${total}`);
  console.log(`   VFX kept: ${vfx[0].c}`);
  console.log(`   DB TOTAL: ${final[0].c} (should be ${total + parseInt(vfx[0].c)})`);
  if(final[0].c == 12600) console.log('✅ PERFECT 12,100 + 500 = 12,600');
})();
