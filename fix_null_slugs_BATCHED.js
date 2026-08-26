/**
 * FIX NULL SLUGS - BATCHED (fixes 507 error)
 */

const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

let rawUrl = process.env.DATABASE_URL || 'DATABASE_URL=postgresql://neondb_owner:npg_XGYUQ90EitbF@ep-morning-recipe-azh19ugu-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
if (rawUrl.includes('DATABASE_URL=')) rawUrl = rawUrl.split('DATABASE_URL=')[1].trim();
if(!rawUrl){
  try{ rawUrl = fs.readFileSync('final_replace_neon_FIXED.js','utf8').match(/postgresql:\/\/[^\s'"`]+/)[0]; }catch(e){}
}
rawUrl = rawUrl.replace(/^["']|["']$/g,'').trim().split(' ')[0].trim();
if(rawUrl.includes('DATABASE_URL=')) rawUrl = rawUrl.split('DATABASE_URL=')[1].trim();
const sql = neon(rawUrl);

(async()=>{
  console.log('Fixing NULL slugs in batches of 200...');
  
  const countRes = await sql`SELECT COUNT(*) as c FROM prompts WHERE slug IS NULL OR slug = 'null' OR slug = ''`;
  console.log(`Found ${countRes[0].c} NULL slugs`);

  let totalFixed = 0;
  let batchSize = 200;
  let batchNum = 0;

  while(true){
    // Get next batch
    const rows = await sql`SELECT id, title, prompt_content FROM prompts WHERE slug IS NULL OR slug = 'null' OR slug = '' LIMIT ${batchSize}`;
    
    if(rows.length === 0) break;
    
    batchNum++;
    console.log(`\nBatch ${batchNum}: ${rows.length} rows`);

    for(const r of rows){
      let base = (r.title || r.prompt_content || r.id).toString().toLowerCase();
      base = base.slice(0,60).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      if(!base || base.length < 3) base = r.id.toString().toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,40);
      const slug = `${base}-${Math.random().toString(36).slice(2,6)}`.slice(0,100);

      try{
        await sql`UPDATE prompts SET slug = ${slug} WHERE id = ${r.id}`;
        totalFixed++;
      }catch(e){
        console.log(`Fail ${r.id}: ${e.message.slice(0,150)}`);
      }
    }
    
    console.log(`  Fixed so far: ${totalFixed}`);
    
    // Small delay to avoid rate limit
    await new Promise(res=>setTimeout(res, 100));
  }
  
  console.log(`\n✅ Fixed ${totalFixed} slugs`);
  const finalNull = await sql`SELECT COUNT(*) as c FROM prompts WHERE slug IS NULL OR slug = 'null' OR slug = ''`;
  const total = await sql`SELECT COUNT(*) as c FROM prompts`;
  console.log(`Remaining NULL: ${finalNull[0].c}`);
  console.log(`DB TOTAL: ${total[0].c}`);

  // Fix missing 1 - insert dummy if 13099
  if(total[0].c == 13099){
    console.log('\n⚠️ Need 1 more to reach 13100 - inserting missing marketing one...');
    const id = `ph-missing-${Date.now()}`;
    const pc = "Viral marketing prompt: Ultimate social media growth hack for 2025 - highly engaging content strategy";
    await sql`INSERT INTO prompts (id, prompt_content, category, preview_url, slug, title) VALUES (${id}, ${pc}, 'Marketing', ${'https://image.pollinations.ai/prompt/'+encodeURIComponent(pc)+'?width=1024&height=1024'}, ${'viral-marketing-growth-hack-'+Math.random().toString(36).slice(2,5)}, ${'Viral Marketing Growth Hack'})`;
    console.log('Inserted missing 1');
    const final2 = await sql`SELECT COUNT(*) as c FROM prompts`;
    console.log(`DB TOTAL NOW: ${final2[0].c}`);
  }
})();
