import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Parser from 'rss-parser';

const app=express();
const port=Number(process.env.PORT||8787);
const origins=(process.env.ALLOWED_ORIGINS||'http://localhost:8080').split(',').map(x=>x.trim()).filter(Boolean);
const parser=new Parser({timeout:10000,headers:{'User-Agent':'UPS-Creator-Studio/1.0'}});
const safeText=(value,max=180)=>String(value??'').replace(/[\\u0000-\\u001f\\u007f]/g,' ').trim().slice(0,max);
const allowedGeo=new Set(['IN','US','GB','CA','AU','SG','AE']);
app.use(helmet({crossOriginResourcePolicy:{policy:'cross-origin'}}));
app.use(cors({origin(origin,cb){if(!origin||origins.includes(origin))return cb(null,true);return cb(new Error('Origin not allowed by CORS'));}}));
app.use(express.json({limit:'1mb'}));
app.use('/api/',rateLimit({windowMs:60_000,limit:40,standardHeaders:true,legacyHeaders:false}));

app.get('/api/health',(req,res)=>res.json({status:'ok',service:'UPS Creator Studio API',time:new Date().toISOString(),features:{rssSearch:true,geminiText:!!process.env.GEMINI_API_KEY,imageGeneration:false,videoRendering:false}}));
app.get('/api/capabilities',(req,res)=>res.json({textGeneration:!!process.env.GEMINI_API_KEY,newsRss:true,trendsRss:true,imageGeneration:false,videoGeneration:false,mp4Rendering:false,socialPublishing:false,notes:'Capabilities are reported from configured services; image/video generation and publishing are not implemented in this starter.'}));

app.get('/api/search',async(req,res)=>{
 const q=safeText(req.query.q,180);
 if(!q)return res.status(400).json({error:'Search query is required'});
 const url=`https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=hi&gl=IN&ceid=IN:hi`;
 try{
  const feed=await parser.parseURL(url);
  const items=(feed.items||[]).slice(0,15).map(i=>({title:i.title||'Untitled',url:i.link||'',source:i.creator||i.source||'Google News RSS',date:i.isoDate||i.pubDate||null,snippet:(i.contentSnippet||i.content||'').replace(/<[^>]*>/g,'').slice(0,450)}));
  res.json({query:q,source:'Google News RSS',retrievedAt:new Date().toISOString(),items,notice:'News RSS results are discovery leads. Verify facts with primary sources before publishing; ranking is not official search volume.'});
 }catch(e){res.status(502).json({error:'News RSS source unavailable',detail:process.env.NODE_ENV==='development'?e.message:undefined})}
});

app.get('/api/trends',async(req,res)=>{
 const requestedGeo=safeText(req.query.geo||'IN',2).toUpperCase();
 const geo=allowedGeo.has(requestedGeo)?requestedGeo:'IN';
 const url=`https://trends.google.com/trending/rss?geo=${encodeURIComponent(geo)}`;
 try{
  const feed=await parser.parseURL(url);
  const items=(feed.items||[]).slice(0,25).map(i=>({title:i.title||'Untitled',url:i.link||'',source:'Google Trends RSS',date:i.isoDate||i.pubDate||null,snippet:i.contentSnippet||''}));
  res.json({geo,source:'Google Trends RSS',retrievedAt:new Date().toISOString(),items,notice:'Trend feed availability and coverage may vary. Do not interpret this feed as precise search-volume data.'});
 }catch(e){res.status(502).json({error:'Trends RSS unavailable',detail:process.env.NODE_ENV==='development'?e.message:undefined})}
});

app.post('/api/ai/generate',async(req,res)=>{
 const apiKey=process.env.GEMINI_API_KEY;
 if(!apiKey)return res.status(503).json({error:'AI text provider is not configured on the backend.'});
 const prompt=safeText(req.body?.prompt,18000);
 if(!prompt)return res.status(400).json({error:'Prompt is required.'});
 const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
 const controller=new AbortController();
 const timeout=setTimeout(()=>controller.abort(),45000);
 try{
  const endpoint=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const upstream=await fetch(endpoint,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({
    contents:[{role:'user',parts:[{text:prompt}]}],
    generationConfig:{temperature:0.65,maxOutputTokens:8192}
   }),
   signal:controller.signal
  });
  const data=await upstream.json();
  if(!upstream.ok)return res.status(502).json({
   error:'AI provider request failed',
   providerStatus:upstream.status,
   detail:process.env.NODE_ENV==='development'?(data.error?.message||'Provider error'):'Check provider key, model and quota.'
  });
  const text=(data.candidates||[]).flatMap(c=>c.content?.parts||[]).map(p=>p.text||'').join('\n');
  if(!text.trim())return res.status(502).json({error:'AI provider returned no text. Check safety filters and provider response.'});
  res.json({text,model,provider:'Gemini',generatedAt:new Date().toISOString()});
 }catch(e){
  res.status(502).json({
   error:e.name==='AbortError'?'AI provider timed out':'AI provider connection failed',
   detail:process.env.NODE_ENV==='development'?e.message:undefined
  });
 }finally{clearTimeout(timeout)}
});

app.use((err,req,res,next)=>{if(err.message?.includes('CORS'))return res.status(403).json({error:'Origin not allowed'});console.error(err);res.status(500).json({error:'Internal server error'})});
app.listen(port,()=>console.log(`UPS Creator Studio API listening on ${port}`));
