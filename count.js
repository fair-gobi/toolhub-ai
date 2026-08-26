const fs=require('fs');
[
  'natural location viral prompts.json',
  'wildlife_viral_prompts.json',
  'PROMPTOOLHUB_IMAGE_1700_V81_WORLD_CLASS_REWRITE_EXECUTION_QA.json',
  'VIDEO_1100_ALL_1-1100_EXECUTION_REWRITE_v1.json',
  'MARKETING_V9_EXECUTION_FIRST_600_QA.json',
  'PROMPTOOLHUB_8200_V85_6_EXECUTION_QA_MASTER.json',
  'PROMPTOOLHUB_300_HERO_V9_0_EXECUTION_READY.json'
].forEach(f=>{
  if(!fs.existsSync(f)){ console.log(f, 'NOT FOUND'); return; }
  const d=JSON.parse(fs.readFileSync(f,'utf8'));
  const arr=Array.isArray(d)?d:d.prompts||d.data||[];
  console.log(f, '=>', arr.length);
});