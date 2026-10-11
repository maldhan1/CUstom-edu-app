import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 5000);
app.use(cors()); app.use(express.json());
const pool = new Pool({host:process.env.DB_HOST||'database',port:Number(process.env.DB_PORT||5432),database:process.env.DB_NAME||'academy',user:process.env.DB_USER||'academy_user',password:process.env.DB_PASSWORD||'academy_demo_password_change_me',connectionTimeoutMillis:2500,max:10});
const fallback=[
{id:1,title:'Kubernetes Foundations',category:'Kubernetes',level:'Beginner',duration:'8 practical labs',description:'Master Pods, Deployments, Services, ConfigMaps and cluster basics.'},
{id:2,title:'Docker & Containers',category:'DevOps',level:'Beginner',duration:'6 practical labs',description:'Build images, run containers, publish to Docker Hub and use Compose.'},
{id:3,title:'AWS Cloud Essentials',category:'Cloud',level:'Beginner',duration:'7 practical labs',description:'Explore IAM, EC2, VPC, load balancing and cloud deployments.'},
{id:4,title:'CI/CD with GitHub Actions',category:'Automation',level:'Intermediate',duration:'5 practical labs',description:'Build repeatable pipelines to test, package and deploy applications.'},
{id:5,title:'Linux for Cloud Engineers',category:'Linux',level:'Beginner',duration:'9 practical labs',description:'Practice commands, users, permissions, services and scripting.'},
{id:6,title:'Three-Tier App on EKS',category:'Project',level:'Intermediate',duration:'End-to-end project',description:'Connect a frontend, REST API and PostgreSQL using Kubernetes Services.'}];
app.get('/api/health',async(_req,res)=>{let database='unavailable';try{await pool.query('SELECT 1');database='connected'}catch{}res.json({status:'ok',service:'learnwithmaldhan-api',database,timestamp:new Date().toISOString()})});
app.get('/api/ready',async(_req,res)=>{try{await pool.query('SELECT 1');res.json({ready:true})}catch{res.status(503).json({ready:false})}});
app.get('/api/courses',async(_req,res)=>{try{const r=await pool.query('SELECT id,title,category,level,duration,description FROM courses ORDER BY id');res.json({source:'postgresql',courses:r.rows})}catch(e){console.error('Course query failed:',e.message);res.json({source:'demo-fallback',courses:fallback})}});
app.listen(port,'0.0.0.0',()=>console.log(`Learn with Maldhan API listening on ${port}`));
