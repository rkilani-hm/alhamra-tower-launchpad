import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
PAGES=[('/', 'Home'),('/tower','Tower Overview'),('/tower/rising','Rising Above'),('/tower/engineering','Engineering & Design'),('/tower/awards','Awards & Honours'),('/tower/sustainability','Sustainability'),('/experience/services','Services & Facilities'),('/experience/business-support','Business Support'),('/experience/location','Location'),('/leasing','Leasing Opportunities'),('/leasing/inquiry','Leasing Inquiry'),('/privacy','Privacy'),('/terms','Terms')]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  page=await browser.new_page(viewport={'width':1280,'height':1800})
  docs=[]
  for path,title in PAGES:
   await page.goto('http://localhost:8080'+path,wait_until='domcontentloaded')
   await page.wait_for_timeout(1800)
   text=await page.evaluate('''() => { const root=document.querySelector('main') || document.querySelector('#main-content') || document.querySelector('#root'); const clone=root.cloneNode(true); clone.querySelectorAll('nav,footer,script,style,input,select,textarea').forEach(n=>n.remove()); return Array.from(clone.querySelectorAll('*')).flatMap(el=>Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent)).join(' ').replace(/\\s+/g,' ').trim(); }''')
   docs.append({'path':path,'title':title,'text':text})
   print(path,len(text))
  cms=await page.evaluate('''async () => { const {supabase}=await import('/src/integrations/supabase/client.ts'); const cols={page_prose:'page_key,field_key,value_en',section_fields:'section_key,field_key,value_en',awards:'page_key,year,ribbon_en,title_en,organization_en,category,body_en,sub_en',feature_cards:'collection,title_en,body_en,image_caption_en,num',stat_counters:'group_key,stat_key,display_en,label_en,sub_en,unit_en',timeline_entries:'collection,year,title_en,body_en',spec_rows:'category_en,label_en,value_en'}; const out={}; await Promise.all(Object.entries(cols).map(async ([table,columns])=>{const {data,error}=await supabase.from(table).select(columns).eq('status','published'); if(error) throw new Error(table+': '+error.message); out[table]=data||[];})); return out; }''')
  with open(Path(__file__).resolve().parents[1] / 'src/lib/search-content.json','w') as f: json.dump({'pages':docs,'cms':cms},f,ensure_ascii=False,indent=2)
  await browser.close()
asyncio.run(main())
