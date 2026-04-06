"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { LogIn, LogOut, Search, Plus, Trash2, Edit3, Check, X, Bell, Users, ClipboardList, BarChart3, Layers, Shield, Eye, EyeOff, Mail, Lock, User, CheckCircle2, Circle, AlertCircle, Clock, ArrowLeft, Star, Send, GripVertical, UserPlus, ChevronRight } from "lucide-react"

const ADMIN_EMAILS = ["harshavardhini.j@adityauniversity.in","babji@aec.edu.in","harshavardhini@technicalhub.io"]
const CARD_COLORS = [
  { bg:"rgba(255,45,0,.07)", border:"rgba(255,45,0,.22)", accent:"#ff2d00" },
  { bg:"rgba(59,130,246,.07)", border:"rgba(59,130,246,.22)", accent:"#3b82f6" },
  { bg:"rgba(245,158,11,.07)", border:"rgba(245,158,11,.22)", accent:"#f59e0b" },
  { bg:"rgba(16,185,129,.07)", border:"rgba(16,185,129,.22)", accent:"#10b981" },
  { bg:"rgba(139,92,246,.07)", border:"rgba(139,92,246,.22)", accent:"#8b5cf6" },
  { bg:"rgba(236,72,153,.07)", border:"rgba(236,72,153,.22)", accent:"#ec4899" },
  { bg:"rgba(6,182,212,.07)", border:"rgba(6,182,212,.22)", accent:"#06b6d4" },
  { bg:"rgba(249,115,22,.07)", border:"rgba(249,115,22,.22)", accent:"#f97316" },
]
const COL_STYLES = {
  todo:      { label:"Total Stages", color:"#3b82f6", bg:"rgba(59,130,246,.06)", border:"rgba(59,130,246,.18)" },
  progress:  { label:"In Progress",  color:"#f59e0b", bg:"rgba(245,158,11,.06)", border:"rgba(245,158,11,.18)" },
  completed: { label:"Completed",    color:"#22c55e", bg:"rgba(34,197,94,.06)",  border:"rgba(34,197,94,.18)" },
}

/* ═══ AVATAR ═══ */
const AV_C = ["#ff2d00","#3b82f6","#f59e0b","#10b981","#8b5cf6","#ec4899","#06b6d4","#f97316","#6366f1","#14b8a6","#e11d48","#0ea5e9","#84cc16","#f43f5e","#a855f7"]
function getAC(n){let h=0;for(let i=0;i<(n||"").length;i++)h=n.charCodeAt(i)+((h<<5)-h);return AV_C[Math.abs(h)%AV_C.length]}
function Avatar({name,size=32}){const c=getAC(name),ini=(name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()
  return<div style={{width:size,height:size,borderRadius:size*.35,background:`${c}22`,border:`2px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
    <span style={{fontSize:size*.38,fontWeight:800,color:c,fontFamily:"var(--font-display)"}}>{ini}</span></div>}

/* ═══ TOAST ═══ */
function useToast(){const[t,sT]=useState([]);const add=useCallback((m,tp="info")=>{const id=Date.now();sT(p=>[...p,{id,msg:m,type:tp}]);setTimeout(()=>sT(p=>p.filter(x=>x.id!==id)),4000)},[]);return{toasts:t,addToast:add}}
function Toasts({toasts}){const c={success:{bg:"#0a1f0a",c:"#4ade80",b:"#16a34a"},error:{bg:"#1f0a0a",c:"#f87171",b:"#dc2626"},info:{bg:"#0a0a1f",c:"#60a5fa",b:"#2563eb"},warning:{bg:"#1f1a0a",c:"#fbbf24",b:"#d97706"}}
  return<div style={{position:"fixed",top:20,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8}}>
    {toasts.map(t=>{const s=c[t.type]||c.info;return<div key={t.id} style={{animation:"toastIn .3s ease",padding:"12px 18px",borderRadius:12,background:s.bg,color:s.c,border:`1px solid ${s.b}`,fontSize:13,fontWeight:600,maxWidth:360,display:"flex",alignItems:"center",gap:8}}>
      {t.type==="success"?<CheckCircle2 size={16}/>:t.type==="error"?<AlertCircle size={16}/>:<Bell size={16}/>}{t.msg}</div>})}</div>}

/* ═══ UI ═══ */
function Btn({children,variant="primary",onClick,style={},disabled=false}){
  const base={padding:"12px 24px",borderRadius:12,fontSize:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",gap:8,transition:"all .2s",border:"none",opacity:disabled?.5:1,fontFamily:"var(--font-body)"}
  const v={primary:{background:"#ff2d00",color:"#fff",boxShadow:"0 4px 16px rgba(255,45,0,.3)"},secondary:{background:"transparent",color:"#9898b0",border:"1px solid #2e2e42"},ghost:{background:"transparent",color:"#9898b0",padding:"8px 14px"},admin:{background:"linear-gradient(135deg,#ff2d00,#ff6b3d)",color:"#fff",boxShadow:"0 4px 20px rgba(255,45,0,.35)"},mentor:{background:"linear-gradient(135deg,#3b82f6,#60a5fa)",color:"#fff",boxShadow:"0 4px 20px rgba(59,130,246,.35)"}}
  return<button onClick={onClick} disabled={disabled} style={{...base,...v[variant],...style}}>{children}</button>}

function FormInput({label,icon:Icon,type="text",value,onChange,placeholder,onKeyDown,autoFocus}){const[show,setShow]=useState(false);const isP=type==="password"
  return<div style={{marginBottom:20}}>{label&&<label style={{display:"block",fontSize:11,fontWeight:700,color:"#9898b0",marginBottom:6,textTransform:"uppercase",letterSpacing:1.5}}>{label}</label>}
    <div style={{position:"relative"}}>{Icon&&<Icon size={16} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#5c5c78"}}/>}
      <input type={isP&&!show?"password":"text"} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} onKeyDown={onKeyDown} autoFocus={autoFocus}
        style={{width:"100%",padding:"14px 18px",paddingLeft:Icon?42:18,paddingRight:isP?42:18,background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:12,color:"#f0eff4",fontSize:14,fontFamily:"var(--font-body)"}}/>
      {isP&&<button onClick={()=>setShow(!show)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#5c5c78",padding:4}}>{show?<EyeOff size={16}/>:<Eye size={16}/>}</button>}</div></div>}

function ProgressBar({done,total,color="#ff2d00"}){const pct=total>0?Math.round((done/total)*100):0
  return<div style={{display:"flex",alignItems:"center",gap:10}}><div style={{flex:1,height:6,background:"rgba(255,255,255,.06)",borderRadius:3,overflow:"hidden"}}>
    <div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:3,transition:"width .5s ease"}}/></div>
    <span style={{fontSize:12,fontWeight:700,color,minWidth:36,textAlign:"right"}}>{pct}%</span></div>}

/* ═══ AUTH PAGES ═══ */
function LandingPage({onAdmin,onMentor}){return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
  <div style={{position:"absolute",top:"-18%",left:"25%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,45,0,.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
  <div style={{position:"absolute",bottom:"-12%",right:"18%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,.04) 0%,transparent 70%)",pointerEvents:"none"}}/>
  <div className="fade-up" style={{textAlign:"center",maxWidth:520,padding:40}}>
    <div style={{width:80,height:80,borderRadius:22,background:"linear-gradient(135deg,#ff2d00,#ff6b3d)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 28px",boxShadow:"0 12px 40px rgba(255,45,0,.2)"}}><ClipboardList size={36} color="#fff" strokeWidth={2}/></div>
    <h1 style={{fontFamily:"var(--font-display)",fontSize:42,fontWeight:800,marginBottom:8,letterSpacing:-1}}>Project<span style={{color:"#ff2d00"}}>Space</span></h1>
    <p style={{fontSize:16,color:"#9898b0",marginBottom:48,lineHeight:1.6}}>Task Monitoring & Coordination Platform</p>
    <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
      <Btn variant="admin" onClick={onAdmin} style={{padding:"16px 40px",fontSize:15,borderRadius:14}}><Shield size={18}/> Admin Login</Btn>
      <Btn variant="mentor" onClick={onMentor} style={{padding:"16px 40px",fontSize:15,borderRadius:14}}><User size={18}/> Mentor Login</Btn>
    </div>
    <p style={{marginTop:40,fontSize:12,color:"#5c5c78"}}>Aditya University &middot; ProjectSpace 2026</p>
  </div></div>}

function EmailPage({role,onSubmit,onBack,loading}){const[email,setEmail]=useState("")
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:24,padding:"48px 40px",width:"100%",maxWidth:440,boxShadow:"0 24px 64px rgba(0,0,0,.5)"}}>
    <div style={{width:56,height:56,borderRadius:16,background:role==="admin"?"linear-gradient(135deg,#ff2d00,#ff6b3d)":"linear-gradient(135deg,#3b82f6,#60a5fa)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>{role==="admin"?<Shield size={26} color="#fff"/>:<User size={26} color="#fff"/>}</div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:24,fontWeight:700,textAlign:"center",marginBottom:4}}>{role==="admin"?"Admin Login":"Mentor Login"}</h2>
    <p style={{textAlign:"center",color:"#9898b0",fontSize:13,marginBottom:32}}>Enter your registered email to receive OTP</p>
    <FormInput label="Email Address" icon={Mail} value={email} onChange={setEmail} placeholder="your.email@adityauniversity.in" onKeyDown={e=>e.key==="Enter"&&email&&onSubmit(email.trim().toLowerCase())} autoFocus/>
    <Btn variant={role==="admin"?"admin":"mentor"} onClick={()=>email&&onSubmit(email.trim().toLowerCase())} disabled={loading||!email} style={{width:"100%",justifyContent:"center",padding:16,fontSize:15,borderRadius:14}}>{loading?"Sending...":<><Send size={16}/> Send OTP</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:14,padding:12,borderRadius:12,border:"1px solid #1e1e2e",background:"transparent",color:"#9898b0",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><ArrowLeft size={14}/> Back to Home</button>
  </div></div>}

function OTPPage({email,onVerify,onBack,loading}){const[otp,setOtp]=useState(["","","","","",""]);const refs=useRef([])
  const handle=(i,v)=>{if(v.length>1)v=v[v.length-1];const n=[...otp];n[i]=v;setOtp(n);if(v&&i<5)refs.current[i+1]?.focus()}
  const kd=(i,e)=>{if(e.key==="Backspace"&&!otp[i]&&i>0)refs.current[i-1]?.focus();if(e.key==="Enter"&&otp.every(d=>d))onVerify(otp.join(""))}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:24,padding:"48px 40px",width:"100%",maxWidth:440,textAlign:"center",boxShadow:"0 24px 64px rgba(0,0,0,.5)"}}>
    <div style={{width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#f59e0b,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><Mail size={26} color="#fff"/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:24,fontWeight:700,marginBottom:4}}>Verify OTP</h2>
    <p style={{color:"#9898b0",fontSize:13}}>Enter the 6-digit code sent to</p><p style={{color:"#ff2d00",fontSize:13,fontWeight:700,marginBottom:28}}>{email}</p>
    <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:28}}>{otp.map((d,i)=><input key={i} ref={el=>refs.current[i]=el} value={d} maxLength={1} onChange={e=>handle(i,e.target.value)} onKeyDown={e=>kd(i,e)}
      style={{width:50,height:60,textAlign:"center",fontSize:24,fontWeight:800,background:"#0c0c18",border:`2px solid ${d?"#ff2d00":"#1e1e2e"}`,borderRadius:12,color:"#ff2d00",fontFamily:"var(--font-display)",transition:"border .2s"}} autoFocus={i===0}/>)}</div>
    <Btn onClick={()=>onVerify(otp.join(""))} disabled={loading||!otp.every(d=>d)} style={{width:"100%",justifyContent:"center",padding:16,fontSize:15,borderRadius:14}}>{loading?"Verifying...":<><CheckCircle2 size={16}/> Verify</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:14,padding:12,borderRadius:12,border:"1px solid #1e1e2e",background:"transparent",color:"#9898b0",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><ArrowLeft size={14}/> Back</button>
  </div></div>}

function CreatePasswordPage({email,onSubmit,loading}){const[pw,setPw]=useState("");const[cf,setCf]=useState("");const[err,setErr]=useState("")
  const go=()=>{setErr("");if(!pw)return setErr("Password required");if(pw.length<6)return setErr("Min 6 characters");if(pw!==cf)return setErr("Passwords don't match");onSubmit(pw)}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:24,padding:"48px 40px",width:"100%",maxWidth:440,boxShadow:"0 24px 64px rgba(0,0,0,.5)"}}>
    <div style={{width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#22c55e,#10b981)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><Lock size={26} color="#fff"/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:24,fontWeight:700,textAlign:"center",marginBottom:4}}>Create Password</h2>
    <p style={{textAlign:"center",color:"#9898b0",fontSize:13,marginBottom:8}}>Set a password for your account</p>
    <p style={{textAlign:"center",color:"#ff2d00",fontSize:12,fontWeight:600,marginBottom:28}}>{email}</p>
    {err&&<div style={{padding:"10px 14px",borderRadius:10,background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",color:"#f87171",fontSize:13,marginBottom:16,display:"flex",alignItems:"center",gap:8}}><AlertCircle size={14}/>{err}</div>}
    <FormInput label="New Password" icon={Lock} type="password" value={pw} onChange={setPw} placeholder="Min 6 characters" onKeyDown={e=>e.key==="Enter"&&go()}/>
    <FormInput label="Confirm Password" icon={Lock} type="password" value={cf} onChange={setCf} placeholder="Re-enter password" onKeyDown={e=>e.key==="Enter"&&go()}/>
    <Btn onClick={go} disabled={loading} style={{width:"100%",justifyContent:"center",padding:16,fontSize:15,borderRadius:14,background:"linear-gradient(135deg,#22c55e,#10b981)",boxShadow:"0 4px 16px rgba(34,197,94,.3)"}}>{loading?"Creating...":<><CheckCircle2 size={16}/> Create Password & Login</>}</Btn>
  </div></div>}

function PasswordLoginPage({email,mentor,onSubmit,onBack,loading}){const[pw,setPw]=useState("");const[err,setErr]=useState("")
  const go=()=>{setErr("");if(!pw)return setErr("Password required");onSubmit(pw)}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:24,padding:"48px 40px",width:"100%",maxWidth:440,boxShadow:"0 24px 64px rgba(0,0,0,.5)"}}>
    <div style={{margin:"0 auto 16px",display:"flex",justifyContent:"center"}}><Avatar name={mentor?.name||email} size={56}/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:700,textAlign:"center",marginBottom:4}}>Welcome back</h2>
    <p style={{textAlign:"center",color:"#ff2d00",fontSize:14,fontWeight:700,marginBottom:28}}>{mentor?.name||email}</p>
    {err&&<div style={{padding:"10px 14px",borderRadius:10,background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",color:"#f87171",fontSize:13,marginBottom:16,display:"flex",alignItems:"center",gap:8}}><AlertCircle size={14}/>{err}</div>}
    <FormInput label="Password" icon={Lock} type="password" value={pw} onChange={setPw} placeholder="Enter your password" onKeyDown={e=>e.key==="Enter"&&go()} autoFocus/>
    <Btn onClick={go} disabled={loading} style={{width:"100%",justifyContent:"center",padding:16,fontSize:15,borderRadius:14}}>{loading?"Logging in...":<><LogIn size={16}/> Login</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:14,padding:12,borderRadius:12,border:"1px solid #1e1e2e",background:"transparent",color:"#9898b0",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><ArrowLeft size={14}/> Back to Home</button>
  </div></div>}

/* ═══ STAT CARD ═══ */
function StatCard({icon:Icon,value,label,color="#ff2d00"}){return<div style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:16,padding:"18px 20px"}}>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontFamily:"var(--font-display)",fontSize:28,fontWeight:800,color}}>{value}</div>
    <div style={{fontSize:11,color:"#5c5c78",textTransform:"uppercase",letterSpacing:1,fontWeight:700,marginTop:2}}>{label}</div></div>
    <div style={{width:36,height:36,borderRadius:10,background:`${color}11`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={18} color={color}/></div></div></div>}

/* ═══ TASK CARD ═══ */
function TaskCard({task,index,onClick}){const c=CARD_COLORS[index%CARD_COLORS.length];const stages=task.stages||[];const done=stages.filter(s=>s.status==="completed").length;const prog=stages.filter(s=>s.status==="progress").length
  return<div onClick={onClick} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:16,padding:"20px 22px",cursor:"pointer",transition:"all .2s"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 24px ${c.border}`}}
    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
      <h3 style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:700,lineHeight:1.3,flex:1,paddingRight:10}}>{task.title}</h3>
      <div style={{background:c.accent,color:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:6,whiteSpace:"nowrap"}}>{done}/{stages.length}</div></div>
    <ProgressBar done={done} total={stages.length} color={c.accent}/>
    {prog>0&&<div style={{marginTop:8,fontSize:11,color:"#f59e0b",fontWeight:600}}>{prog} in progress</div>}
    <div style={{marginTop:12,display:"flex",alignItems:"center",gap:8}}>
      {task.responsible?<><Avatar name={task.responsible.name} size={22}/><span style={{fontSize:12,color:"#9898b0",fontWeight:500}}>{task.responsible.name}</span></>
        :<span style={{fontSize:12,color:"#5c5c78",fontStyle:"italic"}}>Unassigned</span>}</div></div>}

/* ═══ STAGE CARD (Kanban) ═══ */
function StageCard({stage,idx,colKey,onDragStart,canDrag,onEdit,onDelete,canEdit,mentors,teamMembers,onAssign}){
  const assigned=stage.assignedTo?[...mentors,...teamMembers].find(m=>m.email===stage.assignedTo):null
  return<div draggable={canDrag} onDragStart={e=>{if(!canDrag){e.preventDefault();return}onDragStart(e,idx,colKey)}}
    style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:12,padding:"14px 16px",cursor:canDrag?"grab":"default",transition:"all .15s"}}
    onMouseEnter={e=>{if(canDrag)e.currentTarget.style.borderColor="#2e2e42"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#1e1e2e"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
      <p style={{fontSize:14,fontWeight:600,color:"#f0eff4",lineHeight:1.4,flex:1,minWidth:0}}>{stage.title}</p>
      {canDrag&&<GripVertical size={14} color="#3a3a52" style={{flexShrink:0,marginTop:2}}/>}</div>
    {stage.comment&&<p style={{fontSize:11,color:"#5c5c78",marginTop:4}}>{stage.comment}</p>}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        {assigned?<><Avatar name={assigned.name} size={22}/><span style={{fontSize:11,color:"#9898b0"}}>{assigned.name.split(" ")[0]}</span></>
          :canEdit?<select value="" onChange={e=>onAssign(idx,colKey,e.target.value)} style={{padding:"4px 8px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:6,color:"#5c5c78",fontSize:11,fontFamily:"var(--font-body)",cursor:"pointer"}}>
            <option value="">Assign...</option>{teamMembers.map(m=><option key={m.email} value={m.email}>{m.name}</option>)}</select>
          :<span style={{fontSize:11,color:"#3a3a52",fontStyle:"italic"}}>Unassigned</span>}</div>
      <div style={{display:"flex",gap:4,alignItems:"center"}}>
        {stage.completedAt&&<span style={{fontSize:10,color:"#3a3a52"}}>{new Date(stage.completedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</span>}
        {canEdit&&<><button onClick={()=>onEdit(idx,colKey)} style={{background:"none",border:"none",cursor:"pointer",color:"#5c5c78",display:"flex",padding:2}}><Edit3 size={12}/></button>
          <button onClick={()=>onDelete(idx,colKey)} style={{background:"none",border:"none",cursor:"pointer",color:"#5c5c78",display:"flex",padding:2}}><Trash2 size={12}/></button></>}</div></div></div>}

/* ═══ KANBAN BOARD ═══ */
function KanbanBoard({task,mentors,onClose,onUpdate,isAdmin,currentUser,addToast}){
  const isResp=task.responsible?.email===currentUser?.email
  const isTM=(task.teamMembers||[]).some(m=>m.email===currentUser?.email)
  const canManage=isAdmin||isResp
  const allTeam=[...(task.responsible?[task.responsible]:[]),...(task.teamMembers||[])]
  const uniqueTeam=[...new Map(allTeam.map(m=>[m.email,m])).values()]

  const stages=task.stages||[]
  const todo=stages.filter(s=>s.status==="todo"||s.status==="pending"||!s.status)
  const progress=stages.filter(s=>s.status==="progress")
  const completed=stages.filter(s=>s.status==="completed"||s.status==="done")

  const[dragItem,setDragItem]=useState(null)
  const[newStage,setNewStage]=useState("")
  const[editIdx,setEditIdx]=useState(null)
  const[editCol,setEditCol]=useState(null)
  const[editTitle,setEditTitle]=useState("")

  const getCol=(col)=>col==="todo"?todo:col==="progress"?progress:completed

  const saveStages=async(ns)=>{try{const r=await fetch(`/api/tasks/${task._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({stages:ns})})
    if(r.ok){onUpdate();addToast("Updated","success")}else addToast("Failed","error")}catch{addToast("Network error","error")}}

  const onDragStart=(e,idx,col)=>{setDragItem({idx,col});e.dataTransfer.effectAllowed="move"}
  const onDragOver=(e)=>{e.preventDefault();e.dataTransfer.dropEffect="move"}
  const onDrop=(e,targetCol)=>{e.preventDefault();if(!dragItem)return;const{idx,col:src}=dragItem;if(src===targetCol){setDragItem(null);return}
    const srcS=getCol(src);const stage=srcS[idx];if(!stage){setDragItem(null);return}
    if(!canManage&&stage.assignedTo!==currentUser?.email){addToast("You can only move your assigned stages","warning");setDragItem(null);return}
    const norm=s=>{const st=s.status;return st==="pending"||!st?"todo":st==="done"?"completed":st}
    const all=stages.map(s=>{if(s.title===stage.title&&norm(s)===src&&s.assignedTo===stage.assignedTo)
      return{...s,status:targetCol,completedAt:targetCol==="completed"?new Date().toISOString():targetCol==="todo"?null:s.completedAt};return s})
    saveStages(all);setDragItem(null)}

  const addNewStage=()=>{if(!newStage.trim())return;if(!canManage&&!isTM){addToast("No permission","warning");return}
    const assignTo=canManage?null:currentUser?.email
    saveStages([...stages,{title:newStage.trim(),status:"todo",comment:"",completedAt:null,assignedTo:assignTo,createdAt:new Date().toISOString()}]);setNewStage("")}

  const deleteStage=(idx,col)=>{const s=getCol(col)[idx];const norm=x=>{const st=x.status;return st==="pending"||!st?"todo":st==="done"?"completed":st}
    saveStages(stages.filter(x=>!(x.title===s.title&&norm(x)===col&&x.assignedTo===s.assignedTo)))}

  const startEdit=(idx,col)=>{setEditIdx(idx);setEditCol(col);setEditTitle(getCol(col)[idx].title)}
  const saveEdit=()=>{if(!editTitle.trim())return;const s=getCol(editCol)[editIdx];const norm=x=>{const st=x.status;return st==="pending"||!st?"todo":st==="done"?"completed":st}
    saveStages(stages.map(x=>(x.title===s.title&&norm(x)===editCol&&x.assignedTo===s.assignedTo)?{...x,title:editTitle.trim()}:x));setEditIdx(null);setEditCol(null)}

  const assignStage=(idx,col,email)=>{const s=getCol(col)[idx];const norm=x=>{const st=x.status;return st==="pending"||!st?"todo":st==="done"?"completed":st}
    const m=mentors.find(x=>x.email===email);saveStages(stages.map(x=>(x.title===s.title&&norm(x)===col)?{...x,assignedTo:email}:x))
    if(m)addToast(`Assigned to ${m.name}`,"success")}

  const assignResp=async(email)=>{const m=mentors.find(x=>x.email===email);if(!m)return
    try{await fetch(`/api/tasks/${task._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({responsible:{name:m.name,email:m.email}})});onUpdate();addToast(`${m.name} set as responsible`,"success")
      fetch("/api/notifications",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"assigned",taskTitle:task.title,mentorEmail:m.email,mentorName:m.name,message:`You are responsible for "${task.title}"`})})}catch{addToast("Failed","error")}}

  const addTM=async(email)=>{const m=mentors.find(x=>x.email===email);if(!m||(task.teamMembers||[]).find(t=>t.email===email))return
    try{await fetch(`/api/tasks/${task._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({teamMembers:[...(task.teamMembers||[]),{name:m.name,email:m.email}]})});onUpdate();addToast(`${m.name} added`,"success")}catch{addToast("Failed","error")}}

  const rmTM=async(email)=>{try{await fetch(`/api/tasks/${task._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({teamMembers:(task.teamMembers||[]).filter(t=>t.email!==email)})});onUpdate();addToast("Removed","success")}catch{addToast("Failed","error")}}

  const renderCol=(colKey)=>{const st=COL_STYLES[colKey];const items=getCol(colKey)
    return<div onDragOver={onDragOver} onDrop={e=>onDrop(e,colKey)} style={{flex:1,minWidth:260,background:st.bg,border:`1px solid ${st.border}`,borderRadius:16,display:"flex",flexDirection:"column",minHeight:300}}>
      <div style={{padding:"16px 18px 12px",borderBottom:`1px solid ${st.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:"50%",background:st.color}}/><h3 style={{fontFamily:"var(--font-display)",fontSize:13,fontWeight:700,color:st.color}}>{st.label}</h3></div>
        <span style={{fontSize:12,fontWeight:800,color:st.color,background:`${st.color}18`,padding:"2px 8px",borderRadius:6}}>{items.length}</span></div>
      <div style={{padding:12,display:"flex",flexDirection:"column",gap:8,flex:1,overflowY:"auto"}}>
        {items.map((stage,idx)=>{const canDrag=canManage||(stage.assignedTo===currentUser?.email)
          if(editIdx===idx&&editCol===colKey)return<div key={idx} style={{background:"#10101a",border:"1px solid #2e2e42",borderRadius:12,padding:"12px 14px"}}>
            <input value={editTitle} onChange={e=>setEditTitle(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveEdit()} style={{width:"100%",padding:"8px 10px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:8,color:"#f0eff4",fontSize:13,fontFamily:"var(--font-body)",marginBottom:8}} autoFocus/>
            <div style={{display:"flex",gap:6}}><button onClick={saveEdit} style={{background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.3)",borderRadius:8,padding:"6px 12px",color:"#4ade80",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Check size={12}/>Save</button>
              <button onClick={()=>{setEditIdx(null);setEditCol(null)}} style={{background:"transparent",border:"1px solid #2e2e42",borderRadius:8,padding:"6px 12px",color:"#9898b0",fontSize:12,fontWeight:700,cursor:"pointer"}}>Cancel</button></div></div>
          return<StageCard key={idx} stage={stage} idx={idx} colKey={colKey} onDragStart={onDragStart} canDrag={canDrag} onEdit={startEdit} onDelete={deleteStage} canEdit={canManage} mentors={mentors} teamMembers={uniqueTeam} onAssign={assignStage}/>})}
        {items.length===0&&<div style={{textAlign:"center",padding:"24px 12px",color:"#3a3a52",fontSize:12}}><p>Drag stages here</p></div>}
      </div></div>}

  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(8px)",zIndex:1000,overflow:"auto"}} onClick={onClose}>
    <div className="scale-in" onClick={e=>e.stopPropagation()} style={{background:"#0a0a14",minHeight:"100vh",maxWidth:1200,margin:"0 auto",borderLeft:"1px solid #1e1e2e",borderRight:"1px solid #1e1e2e"}}>
      <div style={{padding:"20px 28px",borderBottom:"1px solid #1e1e2e",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#0a0a14",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.05)",border:"1px solid #2e2e42",borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#9898b0"}}><ArrowLeft size={16}/></button>
          <div><h2 style={{fontFamily:"var(--font-display)",fontSize:20,fontWeight:800}}>{task.title}</h2>
            <div style={{display:"flex",alignItems:"center",gap:12,marginTop:4}}>
              {task.responsible&&<div style={{display:"flex",alignItems:"center",gap:4}}><Avatar name={task.responsible.name} size={18}/><span style={{fontSize:12,color:"#9898b0"}}>{task.responsible.name}</span></div>}
              <span style={{fontSize:11,color:"#3a3a52"}}>{stages.length} stages</span></div></div></div>
        <div style={{minWidth:160}}><ProgressBar done={completed.length} total={stages.length}/></div></div>

      {isAdmin&&<div style={{padding:"16px 28px",borderBottom:"1px solid #1e1e2e",display:"flex",gap:14,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div style={{minWidth:220}}><label style={{display:"block",fontSize:11,fontWeight:700,color:"#9898b0",marginBottom:4,textTransform:"uppercase",letterSpacing:1.5}}>Responsible Person</label>
          <select value={task.responsible?.email||""} onChange={e=>assignResp(e.target.value)} style={{width:"100%",padding:"10px 12px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:10,color:"#f0eff4",fontSize:13,fontFamily:"var(--font-body)"}}>
            <option value="">Select...</option>{mentors.map(m=><option key={m.email} value={m.email}>{m.name}</option>)}</select></div>
        <div style={{minWidth:220}}><label style={{display:"block",fontSize:11,fontWeight:700,color:"#9898b0",marginBottom:4,textTransform:"uppercase",letterSpacing:1.5}}>Add Team Member</label>
          <select value="" onChange={e=>addTM(e.target.value)} style={{width:"100%",padding:"10px 12px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:10,color:"#f0eff4",fontSize:13,fontFamily:"var(--font-body)"}}>
            <option value="">Add...</option>{mentors.filter(m=>!(task.teamMembers||[]).find(t=>t.email===m.email)&&m.email!==task.responsible?.email).map(m=><option key={m.email} value={m.email}>{m.name}</option>)}</select></div>
        {(task.teamMembers||[]).length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
          {(task.teamMembers||[]).map(m=><div key={m.email} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",background:"rgba(255,255,255,.04)",border:"1px solid #1e1e2e",borderRadius:8,fontSize:12,color:"#9898b0"}}>
            <Avatar name={m.name} size={18}/>{m.name.split(" ")[0]}<button onClick={()=>rmTM(m.email)} style={{background:"none",border:"none",cursor:"pointer",color:"#5c5c78",display:"flex",padding:0}}><X size={12}/></button></div>)}</div>}</div>}

      {(canManage||isTM)&&<div style={{padding:"14px 28px",borderBottom:"1px solid #1e1e2e",display:"flex",gap:10}}>
        <input value={newStage} onChange={e=>setNewStage(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addNewStage()} placeholder="Add new stage..."
          style={{flex:1,padding:"10px 14px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:10,color:"#f0eff4",fontSize:13,fontFamily:"var(--font-body)"}}/>
        <Btn onClick={addNewStage} style={{padding:"10px 18px"}}><Plus size={14}/> Add</Btn></div>}

      <div style={{padding:"20px 28px",display:"flex",gap:16,overflowX:"auto",minHeight:"calc(100vh - 200px)"}}>
        {renderCol("todo")}{renderCol("progress")}{renderCol("completed")}</div>
    </div></div>}

/* ═══ ADMIN DASHBOARD ═══ */
function AdminDashboard({user,tasks,mentors,onLogout,onRefresh,addToast}){const[search,setSearch]=useState("");const[openTask,setOpenTask]=useState(null)
  const filtered=tasks.filter(t=>{const q=search.toLowerCase();if(!q)return true;return t.title.toLowerCase().includes(q)||(t.responsible?.name||"").toLowerCase().includes(q)||(t.teamMembers||[]).some(m=>m.name.toLowerCase().includes(q))})
  const totalS=tasks.reduce((a,t)=>a+(t.stages||[]).length,0);const doneS=tasks.reduce((a,t)=>a+(t.stages||[]).filter(s=>s.status==="completed"||s.status==="done").length,0)
  const progS=tasks.reduce((a,t)=>a+(t.stages||[]).filter(s=>s.status==="progress").length,0);const assigned=tasks.filter(t=>t.responsible).length
  const activeTask=openTask?tasks.find(t=>t._id===openTask):null

  return<div style={{minHeight:"100vh"}}><div style={{padding:"16px 28px",borderBottom:"1px solid #1e1e2e",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0a0a14"}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#ff2d00,#ff6b3d)",display:"flex",alignItems:"center",justifyContent:"center"}}><ClipboardList size={18} color="#fff"/></div>
      <div><h1 style={{fontFamily:"var(--font-display)",fontSize:16,fontWeight:800}}>ProjectSpace</h1><p style={{fontSize:11,color:"#5c5c78"}}>Admin Dashboard</p></div></div>
    <div style={{display:"flex",alignItems:"center",gap:14}}>
      <div style={{padding:"6px 14px",borderRadius:8,background:"rgba(255,45,0,.08)",border:"1px solid rgba(255,45,0,.2)",display:"flex",alignItems:"center",gap:6}}><Shield size={13} color="#ff2d00"/><span style={{fontSize:12,fontWeight:700,color:"#ff2d00"}}>Admin</span></div>
      <Avatar name={user.name} size={32}/><span style={{fontSize:13,color:"#9898b0",fontWeight:600}}>{user.name}</span><Btn variant="ghost" onClick={onLogout}><LogOut size={15}/></Btn></div></div>

    <div style={{padding:"24px 28px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:28}}>
        <StatCard icon={ClipboardList} value={tasks.length} label="Total Tasks"/><StatCard icon={Users} value={assigned} label="Assigned" color="#3b82f6"/>
        <StatCard icon={Clock} value={progS} label="In Progress" color="#f59e0b"/><StatCard icon={CheckCircle2} value={doneS} label="Completed" color="#22c55e"/></div>
      <div style={{marginBottom:24,position:"relative"}}><Search size={16} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#5c5c78"}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by task name, mentor name..." style={{width:"100%",padding:"12px 18px 12px 42px",background:"#10101a",border:"1px solid #1e1e2e",borderRadius:12,color:"#f0eff4",fontSize:14,fontFamily:"var(--font-body)"}}/></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>{filtered.map((t,i)=><TaskCard key={t._id} task={t} index={i} onClick={()=>setOpenTask(t._id)}/>)}</div>
      {filtered.length===0&&<div style={{textAlign:"center",padding:60,color:"#5c5c78"}}><Search size={40} style={{marginBottom:12,opacity:.3}}/><p style={{fontFamily:"var(--font-display)",fontSize:16,fontWeight:700}}>No tasks found</p></div>}</div>
    {activeTask&&<KanbanBoard task={activeTask} mentors={mentors} onClose={()=>setOpenTask(null)} onUpdate={onRefresh} isAdmin={true} currentUser={user} addToast={addToast}/>}</div>}

/* ═══ MENTOR DASHBOARD ═══ */
function MentorDashboard({user,tasks,mentors,onLogout,onRefresh,addToast}){const[search,setSearch]=useState("");const[openTask,setOpenTask]=useState(null)
  const myTasks=tasks.filter(t=>(t.responsible?.email===user.email)||(t.teamMembers||[]).some(m=>m.email===user.email))
  const filtered=myTasks.filter(t=>{const q=search.toLowerCase();if(!q)return true;return t.title.toLowerCase().includes(q)})
  const totalS=myTasks.reduce((a,t)=>a+(t.stages||[]).length,0);const doneS=myTasks.reduce((a,t)=>a+(t.stages||[]).filter(s=>s.status==="completed"||s.status==="done").length,0)
  const resp=myTasks.filter(t=>t.responsible?.email===user.email).length;const activeTask=openTask?tasks.find(t=>t._id===openTask):null

  return<div style={{minHeight:"100vh"}}><div style={{padding:"16px 28px",borderBottom:"1px solid #1e1e2e",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0a0a14"}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#3b82f6,#60a5fa)",display:"flex",alignItems:"center",justifyContent:"center"}}><ClipboardList size={18} color="#fff"/></div>
      <div><h1 style={{fontFamily:"var(--font-display)",fontSize:16,fontWeight:800}}>ProjectSpace</h1><p style={{fontSize:11,color:"#5c5c78"}}>Mentor Portal</p></div></div>
    <div style={{display:"flex",alignItems:"center",gap:14}}>
      <div style={{padding:"6px 14px",borderRadius:8,background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.2)",display:"flex",alignItems:"center",gap:6}}><User size={13} color="#3b82f6"/><span style={{fontSize:12,fontWeight:700,color:"#3b82f6"}}>Mentor</span></div>
      <Avatar name={user.name} size={32}/><span style={{fontSize:13,color:"#9898b0",fontWeight:600}}>{user.name}</span><Btn variant="ghost" onClick={onLogout}><LogOut size={15}/></Btn></div></div>

    <div style={{padding:"24px 28px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{marginBottom:24,padding:"20px 24px",background:"#10101a",border:"1px solid #1e1e2e",borderRadius:16}}>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:800,marginBottom:4}}>Welcome, {user.name}</h2><p style={{color:"#5c5c78",fontSize:14}}>{user.email}</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:28}}>
        <StatCard icon={Layers} value={myTasks.length} label="My Tasks"/><StatCard icon={Star} value={resp} label="Responsible" color="#f59e0b"/>
        <StatCard icon={CheckCircle2} value={doneS} label="Completed" color="#22c55e"/><StatCard icon={BarChart3} value={totalS>0?Math.round((doneS/totalS)*100)+"%":"0%"} label="Progress" color="#8b5cf6"/></div>
      <div style={{marginBottom:24,position:"relative"}}><Search size={16} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#5c5c78"}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search your tasks..." style={{width:"100%",padding:"12px 18px 12px 42px",background:"#10101a",border:"1px solid #1e1e2e",borderRadius:12,color:"#f0eff4",fontSize:14,fontFamily:"var(--font-body)"}}/></div>
      {filtered.length===0?<div style={{textAlign:"center",padding:60,color:"#5c5c78"}}><Layers size={40} style={{marginBottom:12,opacity:.3}}/><p style={{fontFamily:"var(--font-display)",fontSize:16,fontWeight:700}}>{myTasks.length===0?"No tasks assigned yet":"No matching tasks"}</p></div>
      :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>{filtered.map((t,i)=><TaskCard key={t._id} task={t} index={i} onClick={()=>setOpenTask(t._id)}/>)}</div>}</div>
    {activeTask&&<KanbanBoard task={activeTask} mentors={mentors} onClose={()=>setOpenTask(null)} onUpdate={onRefresh} isAdmin={false} currentUser={user} addToast={addToast}/>}</div>}

/* ═══ MAIN APP ═══ */
export default function App(){
  const[page,setPage]=useState("landing");const[loginRole,setLoginRole]=useState("mentor");const[email,setEmail]=useState("")
  const[user,setUser]=useState(null);const[otpMentor,setOtpMentor]=useState(null);const[tasks,setTasks]=useState([]);const[mentors,setMentors]=useState([])
  const[loading,setLoading]=useState(false);const[seeded,setSeeded]=useState(false);const{toasts,addToast}=useToast()

  const fetchData=useCallback(async()=>{try{const[tR,mR]=await Promise.all([fetch("/api/tasks"),fetch("/api/mentors")])
    if(tR.ok)setTasks(await tR.json());if(mR.ok)setMentors(await mR.json())}catch(e){console.error(e)}},[])

  useEffect(()=>{const init=async()=>{if(seeded)return;try{const r=await fetch("/api/tasks");const t=await r.json()
    if(Array.isArray(t)&&t.length===0){setSeeded(true);await fetch("/api/seed",{method:"POST"});await fetchData()}
    else{setTasks(t);const m=await fetch("/api/mentors");if(m.ok)setMentors(await m.json());setSeeded(true)}}
    catch{if(!seeded){setSeeded(true);try{await fetch("/api/seed",{method:"POST"});await fetchData()}catch{}}}};init()},[fetchData,seeded])

  useEffect(()=>{if(page==="admin"||page==="mentor")fetchData()},[page,fetchData])

  const handleSendOTP=async(em)=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"send-otp",email:em})});const d=await r.json()
    if(r.ok){setEmail(em);if(d.demo_otp)addToast(`OTP: ${d.demo_otp} (email not configured)`,"warning");else addToast("OTP sent!","success");setPage("otp")}else addToast(d.error,"error")}catch{addToast("Network error","error")};setLoading(false)}
  const handleVerifyOTP=async(otp)=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"verify-otp",email,otp})});const d=await r.json()
    if(r.ok){setOtpMentor(d.mentor);if(d.hasPassword){addToast("OTP verified! Enter password.","success");setPage("password-login")}else{addToast("OTP verified! Create password.","success");setPage("create-password")}}else addToast(d.error,"error")}catch{addToast("Network error","error")};setLoading(false)}
  const handleCreatePassword=async(pw)=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"create-password",email,password:pw})});const d=await r.json()
    if(r.ok){addToast(`Welcome, ${d.mentor.name}!`,"success");setUser(d.mentor);setPage(d.mentor.role==="admin"?"admin":"mentor")}else addToast(d.error,"error")}catch{addToast("Network error","error")};setLoading(false)}
  const handlePasswordLogin=async(pw)=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"login-password",email,password:pw})});const d=await r.json()
    if(r.ok){addToast(`Welcome back, ${d.mentor.name}!`,"success");setUser(d.mentor);setPage(d.mentor.role==="admin"?"admin":"mentor")}else addToast(d.error,"error")}catch{addToast("Network error","error")};setLoading(false)}
  const handleLogout=()=>{setUser(null);setOtpMentor(null);setEmail("");setPage("landing")}
  const goHome=()=>{setEmail("");setOtpMentor(null);setPage("landing")}

  return<><Toasts toasts={toasts}/>
    {page==="landing"&&<LandingPage onAdmin={()=>{setLoginRole("admin");setPage("email")}} onMentor={()=>{setLoginRole("mentor");setPage("email")}}/>}
    {page==="email"&&<EmailPage role={loginRole} onSubmit={handleSendOTP} onBack={goHome} loading={loading}/>}
    {page==="otp"&&<OTPPage email={email} onVerify={handleVerifyOTP} onBack={()=>setPage("email")} loading={loading}/>}
    {page==="create-password"&&<CreatePasswordPage email={email} onSubmit={handleCreatePassword} loading={loading}/>}
    {page==="password-login"&&<PasswordLoginPage email={email} mentor={otpMentor} onSubmit={handlePasswordLogin} onBack={goHome} loading={loading}/>}
    {page==="admin"&&user&&<AdminDashboard user={user} tasks={tasks} mentors={mentors} onLogout={handleLogout} onRefresh={fetchData} addToast={addToast}/>}
    {page==="mentor"&&user&&<MentorDashboard user={user} tasks={tasks} mentors={mentors} onLogout={handleLogout} onRefresh={fetchData} addToast={addToast}/>}
  </>}