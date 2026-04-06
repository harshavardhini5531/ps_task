'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Gift, Home, Users, Pen, CreditCard, Map, Clipboard, Coffee, Award, Video, BarChart3, Monitor, CheckSquare, Shield, Shirt, Smartphone, Tv, Volume2, UtensilsCrossed, Lightbulb, Calendar, Umbrella, Compass, Flower2, Wifi, Wine, Moon, Trophy, Activity, Ticket, Image, Tag, FolderOpen, FileText, Mail, Search, Bell, LogOut, Send, Upload, Edit3, Trash2, Plus, X, Eye, Save, Layers, Zap, Star, Target, User, MessageSquare, File, Lock } from 'lucide-react'

const TASK_ICONS = {"Welcome Kit":Gift,"Boys Hostel":Home,"Girls Hostel":Home,"Guests Responsibility":Users,"Poster & Brochure Design":Pen,"Visitor Pass Design":CreditCard,"Certificates Printing":Award,"Foam Boards":Image,"Title Cards Design":Tag,"Folders":FolderOpen,"Invitation Designs":Mail,"Internship Letters":FileText,"Participation Letters":FileText,"Visitors Payment Portal":CreditCard,"Skillup Payment":CreditCard,"Project Street Setup":Map,"Certificates Segregation & Filing":Clipboard,"Snacks & Beverages":Coffee,"Gifts Arrangement":Gift,"Live Streaming Setup":Video,"Project Reviews":BarChart3,"CC Control Room":Monitor,"Attendance Management":CheckSquare,"Discipline Management":Shield,"ID Cards Production":CreditCard,"T-Shirts Order (900 units)":Shirt,"Social Media Management":Smartphone,"LED Display Setup":Tv,"Sound System Setup":Volume2,"Dinner Coordination":UtensilsCrossed,"Lighting Arrangement":Lightbulb,"Event Planning & Execution":Calendar,"Water Bottles & Umbrellas":Umbrella,"Scavenger Hunt Coordination":Compass,"Room Freshener Arrangement":Flower2,"Internet Setup":Wifi,"Soft Drinks Arrangement":Wine,"Night Stay Mentors":Moon,"Mentor Project Expo":Trophy,"Project Stats & CC Display":Activity,"Visitor Pass Distribution":Ticket}

const CARD_COLORS = [
  {bg:"rgba(255,45,0,.06)",border:"rgba(255,45,0,.15)",accent:"#ff2d00"},
  {bg:"rgba(0,180,216,.06)",border:"rgba(0,180,216,.15)",accent:"#00b4d8"},
  {bg:"rgba(255,183,3,.06)",border:"rgba(255,183,3,.15)",accent:"#ffb703"},
  {bg:"rgba(106,208,111,.06)",border:"rgba(106,208,111,.15)",accent:"#6ad06f"},
  {bg:"rgba(190,120,255,.06)",border:"rgba(190,120,255,.15)",accent:"#be78ff"},
  {bg:"rgba(255,107,107,.06)",border:"rgba(255,107,107,.15)",accent:"#ff6b6b"},
  {bg:"rgba(72,202,228,.06)",border:"rgba(72,202,228,.15)",accent:"#48cae4"},
  {bg:"rgba(255,159,28,.06)",border:"rgba(255,159,28,.15)",accent:"#ff9f1c"},
]

function getCardColor(i){return CARD_COLORS[i%CARD_COLORS.length]}
function TaskIcon({title,size=20,color="#ff2d00"}){const Ic=TASK_ICONS[title]||Clipboard;return<Ic size={size} color={color}/>}
function GI({Icon,size=18,color="#ff2d00"}){return<Icon size={size} color={color}/>}

const gAG=(n)=>{const g=["linear-gradient(135deg,#ff2d00,#cc2400)","linear-gradient(135deg,#ff6b35,#e8590c)","linear-gradient(135deg,#ffb703,#fb8500)","linear-gradient(135deg,#ff2d00,#ff6b35)","linear-gradient(135deg,#e8590c,#cc2400)","linear-gradient(135deg,#fb8500,#e8590c)"];return g[Math.abs([...n].reduce((a,c)=>a+c.charCodeAt(0),0))%g.length]}
const gI=(n)=>{const p=n.replace(/^[A-Z]\./,"").split(/[\s.]+/).filter(Boolean);return p.length>1?(p[0][0]+p[p.length-1][0]).toUpperCase():n.substring(0,2).toUpperCase()}

function useToast(){const[ts,sT]=useState([]);const a=useCallback((m,t="info")=>{const id=Date.now()+Math.random();sT(p=>[...p,{id,m,t}]);setTimeout(()=>sT(p=>p.filter(x=>x.id!==id)),4500)},[]);return{ts,addToast:a}}
function Toasts({ts}){return<div style={{position:"fixed",top:80,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:10}}>{ts.map(t=><div key={t.id} style={{padding:"14px 22px",borderRadius:14,fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:10,animation:"toastIn .35s ease",backdropFilter:"blur(16px)",boxShadow:"0 8px 24px rgba(0,0,0,.25)",...(t.t==="success"?{background:"rgba(16,185,129,.12)",color:"#6EE7B7",border:"1px solid rgba(16,185,129,.25)"}:t.t==="error"?{background:"rgba(239,68,68,.12)",color:"#FCA5A5",border:"1px solid rgba(239,68,68,.25)"}:{background:"rgba(255,45,0,.1)",color:"#ff8a70",border:"1px solid rgba(255,45,0,.2)"})}}>{t.m}</div>)}</div>}

export default function Page(){
  const[pg,sPg]=useState("landing");const[cu,sCu]=useState(null);const[tasks,sTasks]=useState([]);const[mentors,sMentors]=useState([]);const[notifs,sNotifs]=useState([]);const[loading,sLoading]=useState(true);const{ts,addToast}=useToast();const[le,sLe]=useState("");const[otp,sOtp]=useState(["","","","","",""]);const[gotp,sGotp]=useState("");const[isAdmin,sIsAdmin]=useState(false)

  const fetchData=async()=>{try{const[tR,mR,nR]=await Promise.all([fetch('/api/tasks'),fetch('/api/mentors'),fetch('/api/notifications')]);const[t,m,n]=await Promise.all([tR.json(),mR.json(),nR.json()]);if(Array.isArray(t))sTasks(t);if(Array.isArray(m))sMentors(m);if(Array.isArray(n))sNotifs(n)}catch(e){console.error(e)}sLoading(false)}
  useEffect(()=>{fetchData()},[])

  const apiTask=async(id,body)=>{const res=await fetch(`/api/tasks/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const u=await res.json();sTasks(p=>p.map(t=>t._id===id?u:t));fetchData();return u}
  const assignResp=async(id,email)=>{const m=mentors.find(x=>x.email===email);if(!m)return;const task=tasks.find(t=>t._id===id);await apiTask(id,{action:'assign-responsible',name:m.name,email:m.email,taskTitle:task?.title});addToast(`${m.name} assigned!`,"success")}
  const addTeam=async(id,email)=>{const m=mentors.find(x=>x.email===email);if(!m)return;const task=tasks.find(t=>t._id===id);await apiTask(id,{action:'add-team',name:m.name,email:m.email,taskTitle:task?.title});addToast(`${m.name} added & notified!`,"success")}
  const rmTeam=async(id,email)=>{await apiTask(id,{action:'remove-team',email})}
  const addStg=async(id,title)=>{await apiTask(id,{action:'add-stage',title});addToast("Stage added","success")}
  const delStg=async(id,title)=>{await apiTask(id,{action:'delete-stage',title});addToast("Stage removed","info")}
  const edtStg=async(id,oldTitle,newTitle)=>{await apiTask(id,{action:'edit-stage',oldTitle,newTitle})}
  const cmpStg=async(id,title,comment,proof)=>{const task=tasks.find(t=>t._id===id);await apiTask(id,{action:'complete-stage',title,comment,proof,taskTitle:task?.title});addToast("Stage completed!","success")}
  const addTask=async(title)=>{const res=await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title})});const task=await res.json();fetchData();addToast(`"${title}" created!`,"success")}

  const doLogin=async()=>{const res=await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'send-otp',email:le})});const data=await res.json();if(res.ok){sGotp(data.demo_otp);sIsAdmin(data.isAdmin);addToast(`OTP sent! ${data.emailSent?'Check email':'(Demo: '+data.demo_otp+')'}`,"info");sPg("otp")}else addToast(data.error,"error")}
  const doOtp=async()=>{const res=await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'verify-otp',email:le,otp:otp.join("")})});const data=await res.json();if(res.ok){sCu({...data.mentor,role:data.isAdmin?"admin":"mentor"});sPg(data.isAdmin?"admin":"mentor");addToast(`Welcome, ${data.mentor.name}!`,"success")}else addToast(data.error,"error")}
  const seedDb=async()=>{addToast("Seeding...","info");const res=await fetch('/api/seed',{method:'POST'});const data=await res.json();addToast(data.message,"success");fetchData()}

  if(loading)return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#08080C"}}><div style={{color:"#ff2d00",fontSize:18,fontWeight:600}}>Loading...</div></div>

  return(<div style={{minHeight:"100vh",background:"#08080C"}}><Toasts ts={ts}/>
    {pg==="landing"&&<Landing onLogin={()=>sPg("login")} onSeed={seedDb}/>}
    {pg==="login"&&<LoginPg e={le} sE={sLe} sub={doLogin} back={()=>sPg("landing")}/>}
    {pg==="otp"&&<OTPPg e={le} o={otp} sO={sOtp} v={doOtp} back={()=>sPg("login")}/>}
    {pg==="admin"&&<AdminDash tasks={tasks} mentors={mentors} notifs={notifs} sNotifs={sNotifs} assignResp={assignResp} addTeam={addTeam} rmTeam={rmTeam} addStg={addStg} delStg={delStg} edtStg={edtStg} addTask={addTask} out={()=>{sPg("landing");sCu(null)}} addToast={addToast} fetchData={fetchData} user={cu}/>}
    {pg==="mentor"&&cu&&<MentorDash u={cu} tasks={tasks} mentors={mentors} cmpStg={cmpStg} addStg={addStg} delStg={delStg} edtStg={edtStg} out={()=>{sPg("landing");sCu(null);sLe("");sOtp(["","","","","",""])}} addToast={addToast}/>}
  </div>)
}

function Landing({onLogin,onSeed}){return(
  <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:"-15%",left:"-8%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,45,0,.07),transparent 70%)",animation:"float 6s ease-in-out infinite"}}/>
    <div className="fade-up" style={{textAlign:"center",position:"relative",zIndex:1}}>
      <div style={{width:88,height:88,borderRadius:22,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:34,fontWeight:800,color:"white",boxShadow:"0 8px 30px rgba(255,45,0,.2)"}}>PS</div>
      <h1 style={{fontSize:42,fontWeight:800,marginBottom:8,background:"linear-gradient(135deg,#F0EDEA,#ff2d00,#ff6b35,#F0EDEA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200% 100%",animation:"shimmer 4s linear infinite"}}>ProjectSpace</h1>
      <p style={{color:"#6A5A50",fontSize:16,marginBottom:40}}>Event Task Monitoring & Coordination Platform</p>
      <button onClick={onLogin} style={{padding:"16px 48px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:16,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:10,margin:"0 auto",boxShadow:"0 6px 20px rgba(255,45,0,.2)"}}>
        <GI Icon={Lock} size={20} color="white"/> Login
      </button>
      <p style={{marginTop:40,fontSize:12,color:"#3A2A20",letterSpacing:1.5,fontWeight:600}}>ADITYA UNIVERSITY • PROJECT SPACE EVENT</p>
    </div>
  </div>
)}

function LoginPg({e,sE,sub,back}){return(
  <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div className="fade-up" style={{background:"rgba(16,12,10,.95)",border:"1px solid #2A1510",borderRadius:24,padding:48,width:"100%",maxWidth:440,boxShadow:"0 16px 50px rgba(0,0,0,.4)"}}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{width:64,height:64,borderRadius:18,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><GI Icon={User} size={28} color="white"/></div>
        <h2 style={{fontSize:24,fontWeight:700}}>Login</h2>
        <p style={{color:"#6A5A50",fontSize:14,marginTop:4}}>Admin or Mentor — enter your email</p>
      </div>
      <label style={{display:"block",fontSize:12,fontWeight:700,color:"#6A5A50",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Email</label>
      <input value={e} onChange={x=>sE(x.target.value)} onKeyDown={x=>x.key==="Enter"&&sub()} placeholder="your.email@adityauniversity.in" style={{width:"100%",padding:"14px 18px",background:"#08080C",border:"1px solid #2A1510",borderRadius:12,color:"#F0EDEA",fontSize:15,marginBottom:24}}/>
      <button onClick={sub} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:16,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><GI Icon={Send} size={18} color="white"/> Send OTP</button>
      <button onClick={back} style={{width:"100%",marginTop:12,padding:12,borderRadius:12,border:"1px solid #2A1510",background:"transparent",color:"#6A5A50",fontSize:14,fontWeight:600,cursor:"pointer"}}>Back</button>
    </div>
  </div>
)}

function OTPPg({e,o,sO,v,back}){const r=useRef([]);const h=(i,val)=>{if(val.length>1)val=val[val.length-1];const n=[...o];n[i]=val;sO(n);if(val&&i<5)r.current[i+1]?.focus()};const k=(i,ev)=>{if(ev.key==="Backspace"&&!o[i]&&i>0)r.current[i-1]?.focus()};return(
  <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div className="fade-up" style={{background:"rgba(16,12,10,.95)",border:"1px solid #2A1510",borderRadius:24,padding:48,width:"100%",maxWidth:440,textAlign:"center",boxShadow:"0 16px 50px rgba(0,0,0,.4)"}}>
      <div style={{width:64,height:64,borderRadius:18,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><GI Icon={Mail} size={28} color="white"/></div>
      <h2 style={{fontSize:24,fontWeight:700,marginBottom:4}}>Verify OTP</h2>
      <p style={{color:"#ff2d00",fontSize:13,fontWeight:700,marginBottom:28}}>{e}</p>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:28}}>{o.map((d,i)=><input key={i} ref={el=>r.current[i]=el} value={d} maxLength={1} onChange={x=>h(i,x.target.value)} onKeyDown={x=>k(i,x)} style={{width:50,height:62,textAlign:"center",fontSize:24,fontWeight:800,background:"#08080C",border:"2px solid #2A1510",borderRadius:12,color:"#ff2d00"}}/>)}</div>
      <button onClick={v} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:16,fontWeight:700,cursor:"pointer"}}>Verify & Login</button>
      <button onClick={back} style={{width:"100%",marginTop:12,padding:12,borderRadius:12,border:"1px solid #2A1510",background:"transparent",color:"#6A5A50",fontSize:14,cursor:"pointer"}}>Change Email</button>
    </div>
  </div>
)}

function Hdr({role,name,onBell,unread,onLogout}){return(
  <header style={{background:"rgba(8,8,12,.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid #1A1208",padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
    <div style={{display:"flex",alignItems:"center",gap:14}}>
      <div style={{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:15,color:"white"}}>PS</div>
      <span style={{fontSize:20,fontWeight:700,color:"#F0EDEA"}}>ProjectSpace</span>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <span style={{padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,background:"rgba(255,45,0,.08)",color:"#ff2d00",border:"1px solid rgba(255,45,0,.15)"}}>{role}</span>
      {name&&<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:32,height:32,borderRadius:"50%",background:gAG(name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white"}}>{gI(name)}</div><span style={{fontSize:14,fontWeight:600,color:"#C0A090"}}>{name}</span></div>}
      {onBell&&<button onClick={onBell} style={{position:"relative",width:38,height:38,borderRadius:11,border:"1px solid #1A1208",background:"rgba(16,12,10,.6)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><GI Icon={Bell} size={17}/>{unread>0&&<span style={{position:"absolute",top:-4,right:-4,width:18,height:18,borderRadius:"50%",background:"#ff2d00",color:"white",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{unread}</span>}</button>}
      <button onClick={onLogout} style={{width:38,height:38,borderRadius:11,border:"1px solid #1A1208",background:"rgba(16,12,10,.6)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><GI Icon={LogOut} size={17} color="#ff6b6b"/></button>
    </div>
  </header>
)}

function TCard({t,idx,onOpen}){
  const d=t.stages?.filter(s=>s.status==="done").length||0;const n=t.stages?.length||0;const p=n?Math.round(d/n*100):0
  const cc=getCardColor(idx)
  return(
    <div onClick={onOpen} style={{background:cc.bg,border:`1px solid ${cc.border}`,borderRadius:18,padding:"20px 22px",cursor:"pointer",transition:"all .25s",position:"relative",overflow:"hidden"}}>
      <div style={{position:"relative"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:40,height:40,borderRadius:10,background:`${cc.accent}15`,border:`1px solid ${cc.accent}25`,display:"flex",alignItems:"center",justifyContent:"center"}}><TaskIcon title={t.title} size={18} color={cc.accent}/></div>
            <h3 style={{fontSize:13,fontWeight:700,lineHeight:1.4,maxWidth:170}}>{t.title}</h3>
          </div>
          <div style={{fontSize:18,fontWeight:800,color:p===100?"#4ADE80":cc.accent}}>{p}%</div>
        </div>
        <div style={{height:4,background:"rgba(255,255,255,.05)",borderRadius:3,overflow:"hidden",marginBottom:12}}>
          <div style={{height:"100%",width:`${p}%`,background:p===100?"linear-gradient(90deg,#4ADE80,#22C55E)":`linear-gradient(90deg,${cc.accent},${cc.accent}aa)`,borderRadius:3,transition:"width .5s ease"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:11,color:"#5A4A40",display:"flex",alignItems:"center",gap:4}}><GI Icon={Eye} size={12} color="#5A4A40"/> {d}/{n}</span>
          {t.responsible?<div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:20,height:20,borderRadius:"50%",background:gAG(t.responsible.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:"white"}}>{gI(t.responsible.name)}</div><span style={{fontSize:10,color:"#8A7A6A",fontWeight:600}}>{t.responsible.name}</span></div>:<span style={{fontSize:10,color:"#3A2A20",fontStyle:"italic"}}>Unassigned</span>}
        </div>
      </div>
    </div>
  )
}

function TModal({t,cl,mentors,assignResp,addTeam,rmTeam,addStg,delStg,edtStg,cmpStg,canEdit,canUpdate}){
  const[re,sRe]=useState(t.responsible?.email||"");const[te,sTe]=useState("");const[ns,sNs]=useState("");const[es,sEs]=useState(null);const[et,sEt]=useState("");const[ap,sAp]=useState(null);const[cm,sCm]=useState("");const[pn,sPn]=useState("")
  const d=t.stages?.filter(s=>s.status==="done").length||0;const n=t.stages?.length||0;const p=n?Math.round(d/n*100):0
  const inp={padding:"12px 14px",background:"#08080C",border:"1px solid #2A1510",borderRadius:12,color:"#F0EDEA",fontSize:14,outline:"none",width:"100%"}
  const sec={background:"rgba(16,12,10,.4)",border:"1px solid #1A1208",borderRadius:16,padding:20,marginBottom:18}
  return(
    <div onClick={cl} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",backdropFilter:"blur(6px)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(180deg,#100C0A,#08080C)",border:"1px solid #1A1208",borderRadius:22,width:"100%",maxWidth:840,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.5)"}}>
        <div style={{padding:"20px 26px",borderBottom:"1px solid #1A1208",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"rgba(16,12,10,.97)",zIndex:10,borderRadius:"22px 22px 0 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:42,height:42,borderRadius:11,background:"rgba(255,45,0,.08)",border:"1px solid rgba(255,45,0,.12)",display:"flex",alignItems:"center",justifyContent:"center"}}><TaskIcon title={t.title} size={20}/></div>
            <h2 style={{fontSize:18,fontWeight:700}}>{t.title}</h2>
          </div>
          <button onClick={cl} style={{width:34,height:34,borderRadius:9,border:"1px solid #1A1208",background:"rgba(16,12,10,.6)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><GI Icon={X} size={16} color="#ff6b6b"/></button>
        </div>
        <div style={{padding:26}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:"#6A5A50",fontWeight:600}}>Progress</span><span style={{fontSize:16,fontWeight:800,color:"#ff2d00"}}>{p}%</span></div>
          <div style={{height:7,background:"#1A1208",borderRadius:4,overflow:"hidden",marginBottom:24}}><div style={{height:"100%",width:`${p}%`,background:p===100?"linear-gradient(90deg,#4ADE80,#22C55E)":"linear-gradient(90deg,#ff2d00,#ff6b35)",borderRadius:4}}/></div>

          {assignResp&&<div style={sec}>
            <h4 style={{fontSize:13,fontWeight:700,marginBottom:10,display:"flex",alignItems:"center",gap:7}}><GI Icon={User} size={15}/> Responsible Mentor</h4>
            <div style={{display:"flex",gap:8}}><select value={re} onChange={x=>sRe(x.target.value)} style={{...inp,cursor:"pointer"}}><option value="">— Select —</option>{mentors.map(m=><option key={m.email} value={m.email}>{m.name} • {m.email}</option>)}</select>
            <button onClick={()=>{if(re)assignResp(t._id,re)}} style={{padding:"12px 18px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Assign</button></div>
            {t.responsible&&<div style={{marginTop:10,display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"rgba(255,45,0,.04)",borderRadius:10,border:"1px solid rgba(255,45,0,.08)"}}><div style={{width:30,height:30,borderRadius:"50%",background:gAG(t.responsible.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white"}}>{gI(t.responsible.name)}</div><div><p style={{fontWeight:700,fontSize:13}}>{t.responsible.name}</p><p style={{fontSize:10,color:"#5A4A40"}}>{t.responsible.email}</p></div><span style={{marginLeft:"auto"}}><GI Icon={Star} size={13}/></span></div>}
          </div>}

          {addTeam&&<div style={sec}>
            <h4 style={{fontSize:13,fontWeight:700,marginBottom:10,display:"flex",alignItems:"center",gap:7}}><GI Icon={Users} size={15}/> Team Members</h4>
            <div style={{display:"flex",gap:8,marginBottom:10}}><select value={te} onChange={x=>sTe(x.target.value)} style={{...inp,cursor:"pointer"}}><option value="">— Select —</option>{mentors.filter(m=>!t.teamMembers?.find(x=>x.email===m.email)&&m.email!==t.responsible?.email).map(m=><option key={m.email} value={m.email}>{m.name}</option>)}</select>
            <button onClick={()=>{if(te){addTeam(t._id,te);sTe("")}}} style={{padding:"12px 18px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Add</button></div>
            {t.teamMembers?.length>0?<div style={{display:"flex",flexDirection:"column",gap:6}}>{t.teamMembers.map(m=><div key={m.email} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"rgba(255,45,0,.02)",borderRadius:10,border:"1px solid rgba(255,45,0,.06)"}}><div style={{width:26,height:26,borderRadius:"50%",background:gAG(m.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"white"}}>{gI(m.name)}</div><span style={{flex:1,fontWeight:600,fontSize:12}}>{m.name}</span><button onClick={()=>rmTeam(t._id,m.email)} style={{width:24,height:24,borderRadius:7,border:"1px solid rgba(255,69,0,.12)",background:"rgba(255,69,0,.03)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><GI Icon={X} size={12} color="#ff6b6b"/></button></div>)}</div>:<p style={{fontSize:12,color:"#3A2A20",fontStyle:"italic"}}>No team members yet</p>}
          </div>}

          <div style={sec}>
            <h4 style={{fontSize:13,fontWeight:700,marginBottom:14,display:"flex",alignItems:"center",gap:7}}><GI Icon={Layers} size={15}/> Stages ({n})</h4>
            <div style={{position:"relative",paddingLeft:26}}>
              <div style={{position:"absolute",left:9,top:0,bottom:0,width:2,background:"linear-gradient(180deg,#2A1510,#1A1208)"}}/>
              {t.stages?.map((s,i)=>{const iD=s.status==="done";const iN=!iD&&(i===0||t.stages[i-1]?.status==="done");return(
                <div key={i} style={{position:"relative",marginBottom:10,padding:"12px 14px",background:iD?"rgba(74,222,128,.03)":iN?"rgba(255,45,0,.03)":"rgba(16,12,10,.2)",border:`1px solid ${iD?"rgba(74,222,128,.1)":iN?"rgba(255,45,0,.12)":"#1A1208"}`,borderRadius:12}}>
                  <div style={{position:"absolute",left:-22,top:14,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,border:"2px solid",...(iD?{background:"#22C55E",borderColor:"#22C55E",color:"white"}:iN?{background:"#ff2d00",borderColor:"#ff2d00",color:"white",animation:"pulse2 2s infinite"}:{background:"#08080C",borderColor:"#2A1510",color:"#3A2A20"})}}>{iD?"✓":i+1}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    {es===i?<div style={{display:"flex",gap:6,flex:1,marginRight:6}}><input value={et} onChange={x=>sEt(x.target.value)} onKeyDown={x=>{if(x.key==="Enter"){edtStg(t._id,s.title,et);sEs(null)}}} style={{...inp,padding:"5px 10px",fontSize:12}}/><button onClick={()=>{edtStg(t._id,s.title,et);sEs(null)}} style={{padding:"5px 10px",borderRadius:7,border:"none",background:"#22C55E",color:"white",fontSize:11,fontWeight:700,cursor:"pointer"}}>Save</button><button onClick={()=>sEs(null)} style={{padding:"5px 10px",borderRadius:7,border:"1px solid #2A1510",background:"transparent",color:"#6A5A50",fontSize:11,cursor:"pointer"}}>✕</button></div>
                    :<span style={{fontSize:12,fontWeight:600,color:iD?"#6EE7B7":iN?"#ff8a70":"#6A5A50"}}>{s.title}</span>}
                    <div style={{display:"flex",gap:4,alignItems:"center"}}>
                      <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",padding:"2px 8px",borderRadius:6,...(iD?{background:"rgba(34,197,94,.08)",color:"#4ADE80"}:iN?{background:"rgba(255,45,0,.08)",color:"#ff2d00"}:{background:"rgba(58,42,32,.15)",color:"#3A2A20"})}}>{iD?"Done":iN?"Current":"Pending"}</span>
                      {canEdit&&!iD&&es!==i&&<><button onClick={()=>{sEs(i);sEt(s.title)}} style={{width:22,height:22,borderRadius:6,border:"1px solid #1A1208",background:"rgba(16,12,10,.5)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><GI Icon={Edit3} size={10}/></button><button onClick={()=>delStg(t._id,s.title)} style={{width:22,height:22,borderRadius:6,border:"1px solid rgba(255,69,0,.1)",background:"rgba(255,69,0,.02)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><GI Icon={Trash2} size={10} color="#ff6b6b"/></button></>}
                    </div>
                  </div>
                  {s.comment&&<p style={{marginTop:5,fontSize:11,color:"#6A5A50",display:"flex",alignItems:"center",gap:4}}><GI Icon={MessageSquare} size={10} color="#6A5A50"/> {s.comment}</p>}
                  {s.proof&&<p style={{marginTop:3,fontSize:11,color:"#4ADE80",display:"flex",alignItems:"center",gap:4}}><GI Icon={File} size={10} color="#4ADE80"/> {s.proof}</p>}
                  {canUpdate&&iN&&!iD&&<div style={{marginTop:10}}>
                    {ap===i?<div style={{padding:14,background:"rgba(16,12,10,.4)",borderRadius:12,border:"1px solid #1A1208"}}>
                      <div onClick={()=>sPn("proof_"+i+".pdf")} style={{border:"1px dashed #2A1510",borderRadius:10,padding:14,textAlign:"center",cursor:"pointer",color:"#3A2A20",marginBottom:12,fontSize:12}}><GI Icon={Upload} size={16} color="#3A2A20"/><p style={{marginTop:4}}>{pn||"Click to upload proof"}</p></div>
                      <textarea value={cm} onChange={x=>sCm(x.target.value)} placeholder="Comment..." style={{width:"100%",padding:10,background:"#08080C",border:"1px solid #2A1510",borderRadius:8,color:"#F0EDEA",fontSize:12,resize:"vertical",minHeight:50,marginBottom:10}}/>
                      <div style={{display:"flex",gap:6}}>
                        <button onClick={()=>{cmpStg(t._id,s.title,cm,pn);sAp(null);sCm("");sPn("")}} style={{padding:"8px 16px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#22C55E,#16A34A)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>Mark Done</button>
                        <button onClick={()=>{sAp(null);sCm("");sPn("")}} style={{padding:"8px 14px",borderRadius:10,border:"1px solid #2A1510",background:"transparent",color:"#6A5A50",fontSize:12,cursor:"pointer"}}>Cancel</button>
                      </div>
                    </div>:<button onClick={()=>sAp(i)} style={{padding:"8px 16px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>Complete Stage</button>}
                  </div>}
                </div>
              )})}
            </div>
            {canEdit&&<div style={{marginTop:12,display:"flex",gap:8,paddingLeft:26}}><input value={ns} onChange={x=>sNs(x.target.value)} placeholder="Add stage..." onKeyDown={x=>{if(x.key==="Enter"&&ns.trim()){addStg(t._id,ns.trim());sNs("")}}} style={{...inp,fontSize:12}}/><button onClick={()=>{if(ns.trim()){addStg(t._id,ns.trim());sNs("")}}} style={{padding:"10px 16px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Add</button></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

function NP({notifs,close}){return(<><div onClick={close} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",zIndex:200}}/><div style={{position:"fixed",right:0,top:0,bottom:0,width:360,background:"linear-gradient(180deg,#08080C,#100C0A)",borderLeft:"1px solid #1A1208",zIndex:250,overflowY:"auto",animation:"toastIn .3s ease"}}><div style={{padding:"16px 20px",borderBottom:"1px solid #1A1208",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#08080C",zIndex:1}}><h3 style={{fontSize:16,fontWeight:700,display:"flex",alignItems:"center",gap:7}}><GI Icon={Bell} size={16}/> Notifications</h3><button onClick={close} style={{background:"none",border:"none",cursor:"pointer"}}><GI Icon={X} size={16} color="#ff6b6b"/></button></div>{notifs.length===0?<p style={{padding:40,textAlign:"center",color:"#3A2A20"}}>No notifications</p>:notifs.map((n,i)=><div key={i} style={{padding:"12px 20px",borderBottom:"1px solid #100C0A",...(!n.read?{background:"rgba(255,45,0,.02)",borderLeft:"3px solid #ff2d00"}:{})}}><p style={{fontSize:12,lineHeight:1.5,color:n.read?"#6A5A50":"#F0EDEA"}}>{n.message}</p><p style={{fontSize:10,color:"#3A2A20",marginTop:3}}>{new Date(n.createdAt).toLocaleString()}</p></div>)}</div></>)}

function AdminDash({tasks,mentors,notifs,sNotifs,assignResp,addTeam,rmTeam,addStg,delStg,edtStg,addTask,out,addToast,fetchData,user}){
  const[se,sSe]=useState("");const[ot,sOt]=useState(null);const[sn,sSn]=useState(false);const[sa,sSa]=useState(false);const[nt,sNt]=useState("")
  const fl=tasks.filter(t=>{const s=se.toLowerCase();return!s||t.title.toLowerCase().includes(s)||t.responsible?.name?.toLowerCase().includes(s)||t.teamMembers?.some(m=>m.name.toLowerCase().includes(s))})
  const tS=tasks.reduce((a,t)=>a+(t.stages?.length||0),0);const dS=tasks.reduce((a,t)=>a+(t.stages?.filter(s=>s.status==="done").length||0),0);const aT=tasks.filter(t=>t.responsible).length;const fD=tasks.filter(t=>t.stages?.length>0&&t.stages.every(s=>s.status==="done")).length;const un=notifs.filter(n=>!n.read).length;const cT=ot?tasks.find(t=>t._id===ot):null
  return(<>
    <Hdr role="Admin" name={user?.name} onBell={()=>sSn(!sn)} unread={un} onLogout={out}/>
    <div style={{padding:"24px 24px 60px",maxWidth:1400,margin:"0 auto"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14,marginBottom:24}}>
        {[{l:"Total Tasks",v:tasks.length,I:Layers},{l:"Assigned",v:aT,I:User},{l:"Stages Done",v:dS,I:CheckSquare},{l:"Complete",v:fD,I:Star},{l:"Pending",v:tS-dS,I:Target}].map((s,i)=>(
          <div key={i} style={{background:"rgba(16,12,10,.4)",border:"1px solid #1A1208",borderRadius:16,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:28,fontWeight:800,color:"#ff2d00"}}>{s.v}</div><div style={{fontSize:10,color:"#5A4A40",textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginTop:2}}>{s.l}</div></div><GI Icon={s.I} size={18}/></div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:10,marginBottom:20,alignItems:"center"}}>
        <div style={{flex:1,position:"relative"}}><div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}><GI Icon={Search} size={14}/></div><input value={se} onChange={x=>sSe(x.target.value)} placeholder="Search tasks, mentors..." style={{width:"100%",padding:"12px 14px 12px 38px",background:"rgba(16,12,10,.5)",border:"1px solid #1A1208",borderRadius:12,color:"#F0EDEA",fontSize:13}}/></div>
        <button onClick={()=>sSa(!sa)} style={{padding:"12px 20px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}><GI Icon={Plus} size={14} color="white"/> Add Task</button>
      </div>
      {sa&&<div style={{marginBottom:20,padding:20,background:"rgba(16,12,10,.5)",border:"1px solid #2A1510",borderRadius:16}}>
        <h3 style={{fontSize:14,fontWeight:700,marginBottom:12,display:"flex",alignItems:"center",gap:7}}><GI Icon={Zap} size={15}/> Create New Task</h3>
        <div style={{display:"flex",gap:10}}><input value={nt} onChange={x=>sNt(x.target.value)} placeholder="Task title — stages auto-detected..." onKeyDown={x=>{if(x.key==="Enter"&&nt.trim()){addTask(nt.trim());sNt("");sSa(false)}}} style={{flex:1,padding:"11px 14px",background:"#08080C",border:"1px solid #2A1510",borderRadius:10,color:"#F0EDEA",fontSize:13}}/><button onClick={()=>{if(nt.trim()){addTask(nt.trim());sNt("");sSa(false)}}} style={{padding:"11px 20px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#ff2d00,#cc2400)",color:"white",fontSize:13,fontWeight:700,cursor:"pointer"}}>Create</button><button onClick={()=>sSa(false)} style={{padding:"11px 14px",borderRadius:10,border:"1px solid #2A1510",background:"transparent",color:"#6A5A50",cursor:"pointer"}}><GI Icon={X} size={14} color="#6A5A50"/></button></div>
      </div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
        {fl.map((t,i)=><TCard key={t._id} t={t} idx={i} onOpen={()=>sOt(t._id)}/>)}
      </div>
      {fl.length===0&&<div style={{textAlign:"center",padding:50,color:"#3A2A20"}}><GI Icon={Search} size={36} color="#3A2A20"/><p style={{fontSize:15,fontWeight:600,marginTop:10}}>No tasks found</p></div>}
    </div>
    {cT&&<TModal t={cT} cl={()=>sOt(null)} mentors={mentors} assignResp={assignResp} addTeam={addTeam} rmTeam={rmTeam} addStg={addStg} delStg={delStg} edtStg={edtStg} canEdit={true} canUpdate={false}/>}
    {sn&&<NP notifs={notifs} close={()=>sSn(false)}/>}
  </>)
}

function MentorDash({u,tasks,mentors,cmpStg,addStg,delStg,edtStg,out}){
  const[ot,sOt]=useState(null);const my=tasks.filter(t=>t.responsible?.email===u.email||t.teamMembers?.some(m=>m.email===u.email))
  const tS=my.reduce((a,t)=>a+(t.stages?.length||0),0);const dS=my.reduce((a,t)=>a+(t.stages?.filter(s=>s.status==="done").length||0),0)
  const cT=ot?tasks.find(t=>t._id===ot):null;const isR=t=>t.responsible?.email===u.email
  return(<>
    <Hdr role="Mentor" name={u.name} onLogout={out}/>
    <div style={{padding:"24px 24px 60px",maxWidth:1000,margin:"0 auto"}}>
      <div className="fade-up" style={{marginBottom:24}}><h1 style={{fontSize:24,fontWeight:800,marginBottom:4,color:"#F0EDEA"}}>Welcome, {u.name}</h1><p style={{color:"#5A4A40",fontSize:13}}>Your assigned tasks</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
        {[{l:"My Tasks",v:my.length,I:Layers},{l:"Done",v:dS,I:CheckSquare},{l:"Remaining",v:tS-dS,I:Target}].map((s,i)=>(
          <div key={i} style={{background:"rgba(16,12,10,.4)",border:"1px solid #1A1208",borderRadius:16,padding:"16px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:26,fontWeight:800,color:"#ff2d00"}}>{s.v}</div><div style={{fontSize:10,color:"#5A4A40",textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginTop:2}}>{s.l}</div></div><GI Icon={s.I} size={16}/></div>
          </div>
        ))}
      </div>
      {my.length===0?<div style={{textAlign:"center",padding:50,color:"#3A2A20"}}><GI Icon={Layers} size={36} color="#3A2A20"/><p style={{fontSize:15,fontWeight:600,marginTop:10}}>No tasks assigned yet</p></div>
      :my.map((t,i)=><div key={t._id} style={{marginBottom:14}}><TCard t={t} idx={i} onOpen={()=>sOt(t._id)}/></div>)}
    </div>
    {cT&&<TModal t={cT} cl={()=>sOt(null)} mentors={mentors} addStg={addStg} delStg={delStg} edtStg={edtStg} cmpStg={cmpStg} canEdit={isR(cT)} canUpdate={isR(cT)}/>}
  </>)
}