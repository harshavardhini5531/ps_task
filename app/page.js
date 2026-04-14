"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { LogIn, LogOut, Search, Plus, Trash2, Edit3, Check, X, Bell, Users, ClipboardList, BarChart3, Layers, Shield, Eye, EyeOff, Mail, Lock, User, CheckCircle2, AlertCircle, Clock, ArrowLeft, Star, Send, GripVertical, UserPlus, ChevronDown, MessageSquare, BellRing, CalendarDays } from "lucide-react"

const ADMIN_EMAILS=["harshavardhini.j@adityauniversity.in","babji@aec.edu.in","harshavardhini@technicalhub.io"]
const EXCLUDE_FROM_TEAM=["babji@aec.edu.in"]
const CARD_COLORS=[{bg:"#fff5f3",border:"#ffd4cc",accent:"#ff2d00"},{bg:"#f0f4ff",border:"#c8d8ff",accent:"#3b82f6"},{bg:"#fff8ee",border:"#ffe0a8",accent:"#d97706"},{bg:"#eefbf4",border:"#b8e8d0",accent:"#16a34a"},{bg:"#f5f0ff",border:"#d4c4f8",accent:"#8b5cf6"},{bg:"#fef0f7",border:"#f5c0da",accent:"#db2777"},{bg:"#eefbff",border:"#b0e4f5",accent:"#0891b2"},{bg:"#fff4ee",border:"#ffd0b0",accent:"#ea580c"}]
const COL_STYLES={todo:{label:"Total Sub-Tasks",color:"#3b82f6",bg:"#f5f8ff",border:"#d8e4ff"},progress:{label:"In Progress",color:"#d97706",bg:"#fffbf0",border:"#ffe8b8"},completed:{label:"Completed",color:"#16a34a",bg:"#f0faf4",border:"#c0e8d0"}}

const AV_C=["#ff2d00","#3b82f6","#d97706","#16a34a","#8b5cf6","#db2777","#0891b2","#ea580c","#6366f1","#0d9488","#e11d48","#0284c7","#65a30d","#e04545","#7c3aed"]
function getAC(n){let h=0;for(let i=0;i<(n||"").length;i++)h=n.charCodeAt(i)+((h<<5)-h);return AV_C[Math.abs(h)%AV_C.length]}
function Avatar({name,size=32}){const c=getAC(name),ini=(name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()
  return<div style={{width:size,height:size,borderRadius:size*.35,background:`${c}14`,border:`1.5px solid ${c}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:size*.36,fontWeight:700,color:c,fontFamily:"var(--font-display)"}}>{ini}</span></div>}

function useToast(){const[t,sT]=useState([]);const add=useCallback((m,tp="info")=>{const id=Date.now();sT(p=>[...p,{id,msg:m,type:tp}]);setTimeout(()=>sT(p=>p.filter(x=>x.id!==id)),4000)},[]);return{toasts:t,addToast:add}}
function Toasts({toasts}){const c={success:{bg:"#f0faf4",c:"#16a34a",b:"#b8e8d0"},error:{bg:"#fef5f5",c:"#dc2626",b:"#f5c0c0"},info:{bg:"#f0f4ff",c:"#3b82f6",b:"#c8d8ff"},warning:{bg:"#fffbf0",c:"#d97706",b:"#ffe0a8"}}
  return<div style={{position:"fixed",top:20,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8}}>{toasts.map(t=>{const s=c[t.type]||c.info;return<div key={t.id} style={{animation:"toastIn .3s ease",padding:"12px 18px",borderRadius:10,background:s.bg,color:s.c,border:`1px solid ${s.b}`,fontSize:13,fontWeight:500,maxWidth:360,display:"flex",alignItems:"center",gap:8,boxShadow:"0 4px 16px rgba(0,0,0,.06)"}}>{t.type==="success"?<CheckCircle2 size={15}/>:t.type==="error"?<AlertCircle size={15}/>:<Bell size={15}/>}{t.msg}</div>})}</div>}

function Btn({children,variant="primary",onClick,style={},disabled=false}){
  const base={padding:"11px 22px",borderRadius:10,fontSize:13,fontWeight:600,cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",gap:7,transition:"all .2s",border:"none",opacity:disabled?.5:1,fontFamily:"var(--font-body)"}
  const v={primary:{background:"#ff2d00",color:"#fff",boxShadow:"0 2px 10px rgba(255,45,0,.2)"},secondary:{background:"#fff",color:"#6b6b80",border:"1px solid #e5e5ec"},ghost:{background:"transparent",color:"#6b6b80",padding:"8px 12px"},purple:{background:"linear-gradient(135deg,#8b5cf6,#7c3aed)",color:"#fff",boxShadow:"0 2px 14px rgba(139,92,246,.2)"},teal:{background:"linear-gradient(135deg,#0d9488,#0891b2)",color:"#fff",boxShadow:"0 2px 14px rgba(13,148,136,.2)"},amber:{background:"linear-gradient(135deg,#d97706,#b45309)",color:"#fff",boxShadow:"0 2px 10px rgba(217,119,6,.2)"},green:{background:"linear-gradient(135deg,#16a34a,#15803d)",color:"#fff",boxShadow:"0 2px 10px rgba(22,163,74,.2)"},notify:{background:"#fff",color:"#d97706",border:"1px solid #ffe0a8",padding:"8px 14px"}}
  return<button onClick={onClick} disabled={disabled} style={{...base,...v[variant],...style}}>{children}</button>}

function FormInput({label,icon:Icon,type="text",value,onChange,placeholder,onKeyDown,autoFocus,disabled}){const[show,setShow]=useState(false);const isP=type==="password"
  return<div style={{marginBottom:18}}>{label&&<label style={{display:"block",fontSize:11,fontWeight:600,color:"#6b6b80",marginBottom:5,textTransform:"uppercase",letterSpacing:1.2}}>{label}</label>}
    <div style={{position:"relative"}}>{Icon&&<Icon size={15} style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#9898a8"}}/>}
      <input type={isP&&!show?"password":"text"} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} onKeyDown={onKeyDown} autoFocus={autoFocus} disabled={disabled}
        style={{width:"100%",padding:"13px 16px",paddingLeft:Icon?40:16,paddingRight:isP?40:16,background:disabled?"#f5f5f8":"#fff",border:"1px solid #e5e5ec",borderRadius:10,color:disabled?"#9898a8":"#1a1a2e",fontSize:13.5}}/>
      {isP&&<button onClick={()=>setShow(!show)} style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9898a8",padding:4}}>{show?<EyeOff size={15}/>:<Eye size={15}/>}</button>}</div></div>}

function ProgressBar({done,total,color="#ff2d00"}){const pct=total>0?Math.round((done/total)*100):0
  return<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:5,background:"#f0f0f4",borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:3,transition:"width .5s ease"}}/></div><span style={{fontSize:11,fontWeight:600,color,minWidth:32,textAlign:"right"}}>{pct}%</span></div>}

function SearchDropdown({label,options,value,onChange,placeholder}){
  const[open,setOpen]=useState(false);const[search,setSearch]=useState("");const ref=useRef(null);const btnRef=useRef(null);const[pos,setPos]=useState({top:0,left:0,width:0,openUp:false})
  const filtered=options.filter(o=>(o.label||o.name||"").toLowerCase().includes(search.toLowerCase())||(o.email||"").toLowerCase().includes(search.toLowerCase()))
  const selected=options.find(o=>o.value===value||o.email===value)
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[])
  const toggle=()=>{if(!open&&btnRef.current){const r=btnRef.current.getBoundingClientRect();const spaceBelow=window.innerHeight-r.bottom;const openUp=spaceBelow<260;setPos({top:openUp?r.top:r.bottom+4,left:r.left,width:Math.max(r.width,260),openUp})}setOpen(!open)}
  return<div ref={ref} style={{position:"relative",minWidth:200}}>
    {label&&<label style={{display:"block",fontSize:11,fontWeight:600,color:"#6b6b80",marginBottom:4,textTransform:"uppercase",letterSpacing:1.2}}>{label}</label>}
    <button ref={btnRef} onClick={toggle} style={{width:"100%",padding:"10px 13px",background:"#fff",border:"1px solid #e5e5ec",borderRadius:10,color:selected?"#1a1a2e":"#9898a8",fontSize:13,fontFamily:"var(--font-body)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,textAlign:"left"}}>
      <div style={{display:"flex",alignItems:"center",gap:7,flex:1,minWidth:0,overflow:"hidden"}}>{selected&&<Avatar name={selected.label||selected.name} size={20}/>}<span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selected?(selected.label||selected.name):placeholder||"Select..."}</span></div>
      <ChevronDown size={13} style={{flexShrink:0,transition:"transform .2s",transform:open?"rotate(180deg)":"none",opacity:.4}}/></button>
    {open&&<div style={{position:"fixed",left:pos.left,width:pos.width,top:pos.openUp?"auto":pos.top,bottom:pos.openUp?(window.innerHeight-pos.top+4):"auto",background:"#fff",border:"1px solid #e5e5ec",borderRadius:10,boxShadow:"0 12px 40px rgba(0,0,0,.15)",zIndex:9999,maxHeight:240,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"8px 10px",borderBottom:"1px solid #f0f0f4"}}><div style={{position:"relative"}}><Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9898a8"}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." autoFocus style={{width:"100%",padding:"8px 10px 8px 32px",background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:8,color:"#1a1a2e",fontSize:12.5}}/></div></div>
      <div style={{overflowY:"auto",flex:1}}>{filtered.length===0&&<div style={{padding:"12px 14px",color:"#9898a8",fontSize:12,textAlign:"center"}}>No results</div>}
        {filtered.map((o,i)=><button key={i} onClick={()=>{onChange(o.value||o.email);setOpen(false);setSearch("")}}
          style={{width:"100%",padding:"10px 14px",background:"transparent",border:"none",borderBottom:"1px solid #f5f5f8",color:"#1a1a2e",fontSize:13,fontFamily:"var(--font-body)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,textAlign:"left",transition:"background .15s"}}
          onMouseEnter={e=>e.currentTarget.style.background="#fff5f3"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <Avatar name={o.label||o.name} size={24}/><span style={{fontWeight:500}}>{o.label||o.name}</span></button>)}</div></div>}</div>}

/* ═══ NOTIFICATIONS PANEL ═══ */
function NotificationsPanel({notifications,onClose,onMarkRead}){
  return<div style={{position:"fixed",top:0,right:0,bottom:0,width:"100%",maxWidth:400,background:"#fff",borderLeft:"1px solid #e5e5ec",boxShadow:"-8px 0 30px rgba(0,0,0,.08)",zIndex:2000,display:"flex",flexDirection:"column",overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
    <div style={{padding:"18px 20px",borderBottom:"1px solid #e5e5ec",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <h3 style={{fontFamily:"var(--font-display)",fontSize:16,fontWeight:600,color:"#1a1a2e"}}>Notifications</h3>
      <div style={{display:"flex",gap:8}}><button onClick={onMarkRead} style={{background:"#f0f4ff",border:"1px solid #c8d8ff",borderRadius:7,padding:"5px 10px",color:"#3b82f6",fontSize:11,fontWeight:600,cursor:"pointer"}}>Mark all read</button>
        <button onClick={onClose} style={{background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:7,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b6b80"}}><X size={14}/></button></div></div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 16px"}}>
      {notifications.length===0&&<div style={{textAlign:"center",padding:40,color:"#9898a8"}}><Bell size={32} style={{marginBottom:8,opacity:.3}}/><p style={{fontSize:13}}>No notifications</p></div>}
      {notifications.map((n,i)=>{const bg=n.read?"#fff":"#f5f8ff";const typeColors={assignment:"#3b82f6","stage-request":"#d97706","stage-approved":"#16a34a","stage-moved":"#8b5cf6","stage-added":"#0891b2"}
        return<div key={i} style={{padding:"12px 14px",background:bg,border:"1px solid #e5e5ec",borderRadius:10,marginBottom:8,borderLeft:`3px solid ${typeColors[n.type]||"#9898a8"}`}}>
          <div style={{fontSize:12.5,fontWeight:500,color:"#1a1a2e",lineHeight:1.4}}>{n.message}</div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}><span style={{fontSize:10.5,color:"#9898a8"}}>{n.taskTitle}</span>
            <span style={{fontSize:10,color:"#c0c0cc"}}>{new Date(n.createdAt).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</span></div>
        </div>})}</div></div>}

/* ═══ AUTH PAGES ═══ */
function LandingPage({onLogin,onCreateAccount}){return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
  <div className="landing-bg"/><div className="landing-bg landing-bg2"/><div className="landing-bg landing-bg3"/>
  <div className="fade-up" style={{textAlign:"center",maxWidth:480,padding:40,position:"relative",zIndex:1}}>
    <div style={{width:72,height:72,borderRadius:18,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",boxShadow:"0 8px 28px rgba(255,45,0,.18)"}}><ClipboardList size={32} color="#fff" strokeWidth={1.8}/></div>
    <h1 style={{fontFamily:"var(--font-display)",fontSize:36,fontWeight:700,marginBottom:6,letterSpacing:-.5,color:"#1a1a2e"}}>Project<span style={{color:"#ff2d00"}}>Space</span></h1>
    <p style={{fontSize:14.5,color:"#6b6b80",marginBottom:44,lineHeight:1.6}}>Task Monitoring & Coordination Platform</p>
    <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
      <Btn variant="purple" onClick={onLogin} style={{padding:"14px 36px",fontSize:14,borderRadius:12}}><LogIn size={16}/> Login</Btn>
      <Btn variant="teal" onClick={onCreateAccount} style={{padding:"14px 36px",fontSize:14,borderRadius:12}}><UserPlus size={16}/> Create Account</Btn></div>
    <p style={{marginTop:36,fontSize:11,color:"#b0b0be"}}>Aditya University &middot; ProjectSpace 2026</p></div></div>}

function RolePickPage({onPick,onBack,mode}){const isLogin=mode==="login"
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8fa"}}><div className="fade-up" style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,.06)"}}>
  <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,marginBottom:4,color:"#1a1a2e"}}>{isLogin?"Login":"Create Account"}</h2><p style={{color:"#6b6b80",fontSize:13,marginBottom:28}}>Select your role</p>
  <div style={{display:"flex",flexDirection:"column",gap:10}}>
    <button onClick={()=>onPick("admin")} style={{padding:"16px 20px",borderRadius:12,border:"1px solid #ffd4cc",background:"#fff8f6",color:"#1a1a2e",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",gap:12,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="#fff0ed"} onMouseLeave={e=>e.currentTarget.style.background="#fff8f6"}>
      <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Shield size={18} color="#fff"/></div>
      <div style={{textAlign:"left"}}><div style={{fontWeight:600}}>Admin</div><div style={{fontSize:11.5,color:"#6b6b80",fontWeight:400}}>Full access</div></div></button>
    <button onClick={()=>onPick("mentor")} style={{padding:"16px 20px",borderRadius:12,border:"1px solid #c8d8ff",background:"#f5f8ff",color:"#1a1a2e",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",gap:12,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="#eef4ff"} onMouseLeave={e=>e.currentTarget.style.background="#f5f8ff"}>
      <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#3b82f6,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={18} color="#fff"/></div>
      <div style={{textAlign:"left"}}><div style={{fontWeight:600}}>Mentor</div><div style={{fontSize:11.5,color:"#6b6b80",fontWeight:400}}>Manage tasks</div></div></button></div>
  <button onClick={onBack} style={{width:"100%",marginTop:18,padding:11,borderRadius:10,border:"1px solid #e5e5ec",background:"transparent",color:"#6b6b80",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button></div></div>}

function LoginPage({onSubmit,onBack,loading,prefillEmail,role,onForgot}){const[email,setEmail]=useState(prefillEmail||"");const[pw,setPw]=useState("");const[err,setErr]=useState("");const go=()=>{setErr("");if(!email||!pw)return setErr("Required");onSubmit(email.trim().toLowerCase(),pw)};const isA=role==="admin"
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8fa"}}><div className="fade-up" style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,boxShadow:"0 8px 32px rgba(0,0,0,.06)"}}>
    <div style={{width:50,height:50,borderRadius:14,background:isA?"linear-gradient(135deg,#ff2d00,#cc2400)":"linear-gradient(135deg,#3b82f6,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>{isA?<Shield size={22} color="#fff"/>:<User size={22} color="#fff"/>}</div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,textAlign:"center",marginBottom:28,color:"#1a1a2e"}}>{isA?"Admin":"Mentor"} Login</h2>
    {err&&<div style={{padding:"9px 13px",borderRadius:8,background:"#fef5f5",border:"1px solid #f5c0c0",color:"#dc2626",fontSize:12.5,marginBottom:14,display:"flex",alignItems:"center",gap:7}}><AlertCircle size={13}/>{err}</div>}
    <FormInput label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="email@adityauniversity.in" disabled={!!prefillEmail} autoFocus={!prefillEmail}/>
    <FormInput label="Password" icon={Lock} type="password" value={pw} onChange={setPw} placeholder="Password" onKeyDown={e=>e.key==="Enter"&&go()} autoFocus={!!prefillEmail}/>
    <div style={{textAlign:"right",marginTop:-10,marginBottom:14}}><button onClick={()=>onForgot(email)} style={{background:"none",border:"none",color:"#ff2d00",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",padding:0}}>Forgot Password?</button></div>
    <Btn variant="purple" onClick={go} disabled={loading} style={{width:"100%",justifyContent:"center",padding:14,borderRadius:12}}>{loading?"...":<><LogIn size={15}/> Login</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:12,padding:11,borderRadius:10,border:"1px solid #e5e5ec",background:"transparent",color:"#6b6b80",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button></div></div>}

function CreateEmailPage({onSubmit,onBack,loading,role}){const[email,setEmail]=useState("");const isA=role==="admin"
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8fa"}}><div className="fade-up" style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,boxShadow:"0 8px 32px rgba(0,0,0,.06)"}}>
    <div style={{width:50,height:50,borderRadius:14,background:isA?"linear-gradient(135deg,#ff2d00,#cc2400)":"linear-gradient(135deg,#3b82f6,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><UserPlus size={22} color="#fff"/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,textAlign:"center",marginBottom:28,color:"#1a1a2e"}}>{isA?"Admin":"Mentor"} Account</h2>
    <FormInput label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="email@adityauniversity.in" onKeyDown={e=>e.key==="Enter"&&email&&onSubmit(email.trim().toLowerCase())} autoFocus/>
    <Btn variant="teal" onClick={()=>email&&onSubmit(email.trim().toLowerCase())} disabled={loading||!email} style={{width:"100%",justifyContent:"center",padding:14,borderRadius:12}}>{loading?"...":<><Send size={15}/> Send OTP</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:12,padding:11,borderRadius:10,border:"1px solid #e5e5ec",background:"transparent",color:"#6b6b80",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button></div></div>}

function OTPPage({email,onVerify,onBack,loading}){const[otp,setOtp]=useState(["","","","","",""]);const refs=useRef([])
  const h=(i,v)=>{if(v.length>1)v=v[v.length-1];const n=[...otp];n[i]=v;setOtp(n);if(v&&i<5)refs.current[i+1]?.focus()}
  const kd=(i,e)=>{if(e.key==="Backspace"&&!otp[i]&&i>0)refs.current[i-1]?.focus();if(e.key==="Enter"&&otp.every(d=>d))onVerify(otp.join(""))}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8fa"}}><div className="fade-up" style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,.06)"}}>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,marginBottom:4,color:"#1a1a2e"}}>Verify OTP</h2><p style={{color:"#ff2d00",fontSize:12.5,fontWeight:600,marginBottom:26}}>{email}</p>
    <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:26}}>{otp.map((d,i)=><input key={i} ref={el=>refs.current[i]=el} value={d} maxLength={1} onChange={e=>h(i,e.target.value)} onKeyDown={e=>kd(i,e)} style={{width:46,height:54,textAlign:"center",fontSize:22,fontWeight:700,background:"#f8f8fa",border:`1.5px solid ${d?"#ff2d00":"#e5e5ec"}`,borderRadius:10,color:"#ff2d00",fontFamily:"var(--font-display)"}} autoFocus={i===0}/>)}</div>
    <Btn onClick={()=>onVerify(otp.join(""))} disabled={loading||!otp.every(d=>d)} style={{width:"100%",justifyContent:"center",padding:14,borderRadius:12}}>{loading?"...":<><CheckCircle2 size={15}/> Verify</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:12,padding:11,borderRadius:10,border:"1px solid #e5e5ec",background:"transparent",color:"#6b6b80",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button></div></div>}

function CreatePasswordPage({email,onSubmit,loading}){const[pw,setPw]=useState("");const[cf,setCf]=useState("");const[err,setErr]=useState("")
  const go=()=>{setErr("");if(pw.length<6)return setErr("Min 6 chars");if(!/[A-Z]/.test(pw))return setErr("Need uppercase");if(!/[0-9]/.test(pw))return setErr("Need number");if(pw!==cf)return setErr("No match");onSubmit(pw)}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8fa"}}><div className="fade-up" style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,boxShadow:"0 8px 32px rgba(0,0,0,.06)"}}>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,textAlign:"center",marginBottom:4,color:"#1a1a2e"}}>Create Password</h2>
    <p style={{textAlign:"center",color:"#ff2d00",fontSize:12,fontWeight:500,marginBottom:18}}>{email}</p>
    {err&&<div style={{padding:"9px 13px",borderRadius:8,background:"#fef5f5",border:"1px solid #f5c0c0",color:"#dc2626",fontSize:12.5,marginBottom:14,display:"flex",alignItems:"center",gap:7}}><AlertCircle size={13}/>{err}</div>}
    <FormInput label="Password" icon={Lock} type="password" value={pw} onChange={setPw} placeholder="Min 6, 1 upper, 1 number" onKeyDown={e=>e.key==="Enter"&&go()}/>
    <FormInput label="Confirm" icon={Lock} type="password" value={cf} onChange={setCf} placeholder="Confirm" onKeyDown={e=>e.key==="Enter"&&go()}/>
    <Btn variant="green" onClick={go} disabled={loading} style={{width:"100%",justifyContent:"center",padding:14,borderRadius:12}}>{loading?"...":<><CheckCircle2 size={15}/> Create</>}</Btn></div></div>}

/* ═══ FORGOT PASSWORD ═══ */
function ForgotPasswordPage({onSubmit,onBack,loading,prefillEmail}){const[email,setEmail]=useState(prefillEmail||"")
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8fa"}}><div className="fade-up" style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,boxShadow:"0 8px 32px rgba(0,0,0,.06)"}}>
    <div style={{width:50,height:50,borderRadius:14,background:"linear-gradient(135deg,#d97706,#b45309)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><Lock size={22} color="#fff"/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,textAlign:"center",marginBottom:4,color:"#1a1a2e"}}>Forgot Password</h2>
    <p style={{textAlign:"center",color:"#6b6b80",fontSize:13,marginBottom:28}}>Enter your email to receive a reset code</p>
    <FormInput label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="email@adityauniversity.in" onKeyDown={e=>e.key==="Enter"&&email&&onSubmit(email.trim().toLowerCase())} autoFocus/>
    <Btn variant="amber" onClick={()=>email&&onSubmit(email.trim().toLowerCase())} disabled={loading||!email} style={{width:"100%",justifyContent:"center",padding:14,borderRadius:12}}>{loading?"Sending...":<><Send size={15}/> Send Reset Code</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:12,padding:11,borderRadius:10,border:"1px solid #e5e5ec",background:"transparent",color:"#6b6b80",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back to Login</button></div></div>}

function ResetOTPPage({email,onVerify,onBack,loading}){const[otp,setOtp]=useState(["","","","","",""]);const refs=useRef([])
  const h=(i,v)=>{if(v.length>1)v=v[v.length-1];const n=[...otp];n[i]=v;setOtp(n);if(v&&i<5)refs.current[i+1]?.focus()}
  const kd=(i,e)=>{if(e.key==="Backspace"&&!otp[i]&&i>0)refs.current[i-1]?.focus();if(e.key==="Enter"&&otp.every(d=>d))onVerify(otp.join(""))}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8fa"}}><div className="fade-up" style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,.06)"}}>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,marginBottom:4,color:"#1a1a2e"}}>Enter Reset Code</h2><p style={{color:"#ff2d00",fontSize:12.5,fontWeight:600,marginBottom:26}}>{email}</p>
    <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:26}}>{otp.map((d,i)=><input key={i} ref={el=>refs.current[i]=el} value={d} maxLength={1} onChange={e=>h(i,e.target.value)} onKeyDown={e=>kd(i,e)} style={{width:46,height:54,textAlign:"center",fontSize:22,fontWeight:700,background:"#f8f8fa",border:`1.5px solid ${d?"#d97706":"#e5e5ec"}`,borderRadius:10,color:"#d97706",fontFamily:"var(--font-display)"}} autoFocus={i===0}/>)}</div>
    <Btn variant="amber" onClick={()=>onVerify(otp.join(""))} disabled={loading||!otp.every(d=>d)} style={{width:"100%",justifyContent:"center",padding:14,borderRadius:12}}>{loading?"...":<><CheckCircle2 size={15}/> Verify Code</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:12,padding:11,borderRadius:10,border:"1px solid #e5e5ec",background:"transparent",color:"#6b6b80",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button></div></div>}

function ResetPasswordPage({email,onSubmit,loading}){const[pw,setPw]=useState("");const[cf,setCf]=useState("");const[err,setErr]=useState("")
  const go=()=>{setErr("");if(pw.length<6)return setErr("Min 6 chars");if(!/[A-Z]/.test(pw))return setErr("Need uppercase");if(!/[0-9]/.test(pw))return setErr("Need number");if(pw!==cf)return setErr("No match");onSubmit(pw)}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8fa"}}><div className="fade-up" style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,boxShadow:"0 8px 32px rgba(0,0,0,.06)"}}>
    <div style={{width:50,height:50,borderRadius:14,background:"linear-gradient(135deg,#16a34a,#15803d)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><Lock size={22} color="#fff"/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,textAlign:"center",marginBottom:4,color:"#1a1a2e"}}>New Password</h2>
    <p style={{textAlign:"center",color:"#ff2d00",fontSize:12,fontWeight:500,marginBottom:18}}>{email}</p>
    {err&&<div style={{padding:"9px 13px",borderRadius:8,background:"#fef5f5",border:"1px solid #f5c0c0",color:"#dc2626",fontSize:12.5,marginBottom:14,display:"flex",alignItems:"center",gap:7}}><AlertCircle size={13}/>{err}</div>}
    <FormInput label="New Password" icon={Lock} type="password" value={pw} onChange={setPw} placeholder="Min 6, 1 upper, 1 number" onKeyDown={e=>e.key==="Enter"&&go()}/>
    <FormInput label="Confirm" icon={Lock} type="password" value={cf} onChange={setCf} placeholder="Confirm" onKeyDown={e=>e.key==="Enter"&&go()}/>
    <Btn variant="green" onClick={go} disabled={loading} style={{width:"100%",justifyContent:"center",padding:14,borderRadius:12}}>{loading?"...":<><CheckCircle2 size={15}/> Reset Password</>}</Btn></div></div>}

function StatCard({icon:Icon,value,label,color="#ff2d00"}){return<div style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:14,padding:"16px 18px",boxShadow:"0 1px 4px rgba(0,0,0,.03)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontFamily:"var(--font-display)",fontSize:26,fontWeight:700,color}}>{value}</div><div style={{fontSize:10.5,color:"#9898a8",textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginTop:2}}>{label}</div></div><div style={{width:34,height:34,borderRadius:9,background:`${color}0c`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={16} color={color}/></div></div></div>}

function TaskCard({task,index,onClick}){const c=CARD_COLORS[index%CARD_COLORS.length];const stages=task.stages||[];const done=stages.filter(s=>s.status==="completed").length;const prog=stages.filter(s=>s.status==="progress").length
  return<div onClick={onClick} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:14,padding:"18px 20px",cursor:"pointer",transition:"all .2s"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,.06)"}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
      <h3 style={{fontFamily:"var(--font-display)",fontSize:14,fontWeight:600,lineHeight:1.3,flex:1,paddingRight:8,color:"#1a1a2e"}}>{task.title}</h3>
      <div style={{background:c.accent,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:5}}>{done}/{stages.length}</div></div>
    <ProgressBar done={done} total={stages.length} color={c.accent}/>
    {prog>0&&<div style={{marginTop:7,fontSize:10.5,color:"#d97706",fontWeight:500}}>{prog} in progress</div>}
    <div style={{marginTop:10,display:"flex",alignItems:"center",gap:7}}>
      {task.responsible?<><Avatar name={task.responsible.name} size={20}/><span style={{fontSize:11.5,color:"#6b6b80"}}>{task.responsible.name}</span></>:<span style={{fontSize:11.5,color:"#9898a8",fontStyle:"italic"}}>Unassigned</span>}</div></div>}

function StageCard({stage,idx,colKey,onDragStart,canDrag,onEdit,onDelete,canEdit,mentors,teamMembers,onAssign,onSetDeadline}){
  const assignedList=Array.isArray(stage.assignedTo)?stage.assignedTo:stage.assignedTo?[stage.assignedTo]:[]
  const assignedMembers=assignedList.map(email=>[...mentors,...teamMembers].find(m=>m.email===email)).filter(Boolean)
  const unassignedTeam=teamMembers.filter(m=>!assignedList.includes(m.email))
  const borderL=colKey==="progress"?"#d97706":colKey==="completed"?"#16a34a":"#3b82f6"
  const bg=colKey==="progress"?"#fffdf5":colKey==="completed"?"#f5fcf8":"#fff"
  const deadline=stage.deadline?new Date(stage.deadline):null
  const isOverdue=deadline&&colKey!=="completed"&&deadline<new Date()
  const daysLeft=deadline&&colKey!=="completed"?Math.ceil((deadline-new Date())/(1000*60*60*24)):null
  return<div draggable={canDrag} onDragStart={e=>{if(!canDrag){e.preventDefault();return}onDragStart(e,idx,colKey)}}
    style={{background:isOverdue?"#fff5f5":bg,border:`1px solid ${isOverdue?"#fcc":"#e5e5ec"}`,borderLeft:`3px solid ${isOverdue?"#dc2626":borderL}`,borderRadius:10,padding:"12px 14px",cursor:canDrag?"grab":"default",transition:"all .15s"}}
    onMouseEnter={e=>{if(canDrag)e.currentTarget.style.boxShadow="0 3px 10px rgba(0,0,0,.06)"}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="none"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:7}}>
      <p style={{fontSize:13,fontWeight:500,color:"#1a1a2e",lineHeight:1.4,flex:1}}>{stage.title}</p>
      {canDrag&&<GripVertical size={13} color="#c0c0cc" style={{flexShrink:0,marginTop:2}}/>}</div>
    {/* Deadline row - only for non-completed */}
    {colKey!=="completed"&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:7}}>
      <div style={{position:"relative",display:"flex",alignItems:"center"}}>
        <CalendarDays size={13} color={isOverdue?"#dc2626":deadline?"#8b5cf6":"#c0c0cc"} style={{cursor:"pointer"}}/>
        <input type="date" value={stage.deadline||""} onChange={e=>onSetDeadline(idx,colKey,e.target.value)}
          style={{position:"absolute",left:0,top:0,width:20,height:20,opacity:0,cursor:"pointer"}}/>
      </div>
      {deadline&&<span style={{fontSize:10,fontWeight:500,color:isOverdue?"#dc2626":daysLeft!==null&&daysLeft<=2?"#d97706":"#8b5cf6"}}>
        {isOverdue?<span>Overdue! {deadline.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</span>
          :<span>{deadline.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}{daysLeft!==null&&<span style={{color:"#9898a8"}}> ({daysLeft}d left)</span>}</span>}
      </span>}
      {!deadline&&<span style={{fontSize:10,color:"#c0c0cc",fontStyle:"italic",cursor:"pointer"}} onClick={e=>{const inp=e.currentTarget.previousElementSibling?.querySelector("input");if(inp)inp.showPicker?.()}}>Set deadline</span>}
    </div>}
    <div style={{marginTop:7}}>
      {assignedMembers.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
        {assignedMembers.map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",background:"#f0f4ff",border:"1px solid #d8e4ff",borderRadius:6,fontSize:10.5,color:"#3b82f6"}}>
          <Avatar name={m.name} size={16}/>{m.name}</div>)}</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {canEdit&&unassignedTeam.length>0&&<SearchDropdown options={unassignedTeam.map(m=>({...m,value:m.email,label:m.name}))} value="" onChange={v=>onAssign(idx,colKey,v)} placeholder={assignedMembers.length>0?"+Add":"Assign..."}/>}
          {!canEdit&&assignedMembers.length===0&&<span style={{fontSize:10.5,color:"#c0c0cc",fontStyle:"italic"}}>Unassigned</span>}</div>
        <div style={{display:"flex",gap:3,alignItems:"center"}}>
          {stage.completedAt&&<span style={{fontSize:9.5,color:"#16a34a"}}><CheckCircle2 size={10} style={{verticalAlign:"middle",marginRight:2}}/>{new Date(stage.completedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</span>}
          {canEdit&&<><button onClick={()=>onEdit(idx,colKey)} style={{background:"none",border:"none",cursor:"pointer",color:"#9898a8",display:"flex",padding:2}}><Edit3 size={11}/></button>
            <button onClick={()=>onDelete(idx,colKey)} style={{background:"none",border:"none",cursor:"pointer",color:"#9898a8",display:"flex",padding:2}}><Trash2 size={11}/></button></>}</div></div></div></div>}

function KanbanBoard({stages,onSaveStages,canManage,isTM,currentUser,mentors,teamMembers,addToast,onRequestStage,onNotifyActivity}){
  const norm=s=>{const st=s.status;return(!st||st==="pending"||st==="todo")?"todo":st==="done"?"completed":st}
  const todo=stages.filter(s=>norm(s)==="todo"),progress=stages.filter(s=>norm(s)==="progress"),completed=stages.filter(s=>norm(s)==="completed")
  const[dragItem,setDragItem]=useState(null);const[newStage,setNewStage]=useState("");const[editIdx,setEditIdx]=useState(null);const[editCol,setEditCol]=useState(null);const[editTitle,setEditTitle]=useState("")
  const getCol=col=>col==="todo"?todo:col==="progress"?progress:completed
  const onDragStart=(e,idx,col)=>{setDragItem({idx,col});e.dataTransfer.effectAllowed="move"}
  const onDragOver=e=>e.preventDefault()
  const onDrop=(e,targetCol)=>{e.preventDefault();if(!dragItem)return;const{idx,col:src}=dragItem;if(src===targetCol){setDragItem(null);return}
    const stage=getCol(src)[idx];if(!stage){setDragItem(null);return}
    const assignArr=Array.isArray(stage.assignedTo)?stage.assignedTo:stage.assignedTo?[stage.assignedTo]:[];if(!canManage&&!assignArr.includes(currentUser?.email)){addToast("You can only move your sub-tasks","warning");setDragItem(null);return}
    onSaveStages(stages.map(s=>(s.title===stage.title&&norm(s)===src&&s.assignedTo===stage.assignedTo)?{...s,status:targetCol,completedAt:targetCol==="completed"?new Date().toISOString():targetCol==="todo"?null:s.completedAt}:s))
    onNotifyActivity&&onNotifyActivity(`Sub-task "${stage.title}" moved to ${targetCol==="progress"?"In Progress":"Completed"}`,currentUser?.name)
    setDragItem(null)}
  const addNew=()=>{if(!newStage.trim()||!canManage)return;onSaveStages([...stages,{title:newStage.trim(),status:"todo",comment:"",completedAt:null,assignedTo:null,createdAt:new Date().toISOString()}])
    onNotifyActivity&&onNotifyActivity(`New sub-task added: "${newStage.trim()}"`,currentUser?.name);setNewStage("")}
  const del=(idx,col)=>{if(!canManage)return;const s=getCol(col)[idx];onSaveStages(stages.filter(x=>!(x.title===s.title&&norm(x)===col&&x.assignedTo===s.assignedTo)))}
  const startEd=(idx,col)=>{setEditIdx(idx);setEditCol(col);setEditTitle(getCol(col)[idx].title)}
  const saveEd=()=>{if(!editTitle.trim())return;const s=getCol(editCol)[editIdx];onSaveStages(stages.map(x=>(x.title===s.title&&norm(x)===editCol&&x.assignedTo===s.assignedTo)?{...x,title:editTitle.trim()}:x));setEditIdx(null);setEditCol(null)}
  const assignS=(idx,col,email)=>{const s=getCol(col)[idx];const m=mentors.find(x=>x.email===email);onSaveStages(stages.map(x=>{if(x.title===s.title&&norm(x)===col){const curr=Array.isArray(x.assignedTo)?x.assignedTo:x.assignedTo?[x.assignedTo]:[];if(!curr.includes(email))return{...x,assignedTo:[...curr,email]};return x}return x}));if(m)addToast(`Assigned to ${m.name}`,"success")}
  const setDeadline=(idx,col,date)=>{const s=getCol(col)[idx];onSaveStages(stages.map(x=>(x.title===s.title&&norm(x)===col&&x.assignedTo===s.assignedTo)?{...x,deadline:date||null}:x));addToast(date?`Deadline set: ${new Date(date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}`:"Deadline removed","success")}
  const renderCol=colKey=>{const st=COL_STYLES[colKey];const items=getCol(colKey)
    return<div onDragOver={onDragOver} onDrop={e=>onDrop(e,colKey)} style={{flex:1,minWidth:240,background:st.bg,border:`1px solid ${st.border}`,borderRadius:14,display:"flex",flexDirection:"column",minHeight:200}}>
      <div style={{padding:"13px 15px 10px",borderBottom:`1px solid ${st.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:st.color}}/><h3 style={{fontFamily:"var(--font-display)",fontSize:12,fontWeight:600,color:st.color}}>{st.label}</h3></div>
        <span style={{fontSize:11,fontWeight:700,color:st.color,background:`${st.color}12`,padding:"2px 7px",borderRadius:5}}>{items.length}</span></div>
      <div style={{padding:10,display:"flex",flexDirection:"column",gap:7,flex:1,overflow:"visible",position:"relative"}}>
        {items.map((stage,idx)=>{const stgAssign=Array.isArray(stage.assignedTo)?stage.assignedTo:stage.assignedTo?[stage.assignedTo]:[];const canDrag=canManage||stgAssign.includes(currentUser?.email)
          if(editIdx===idx&&editCol===colKey)return<div key={idx} style={{background:"#fff",border:"1px solid #d0d0da",borderRadius:10,padding:"10px 12px"}}>
            <input value={editTitle} onChange={e=>setEditTitle(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveEd()} style={{width:"100%",padding:"7px 9px",background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:7,color:"#1a1a2e",fontSize:12.5,marginBottom:7}} autoFocus/>
            <div style={{display:"flex",gap:5}}><button onClick={saveEd} style={{background:"#f0faf4",border:"1px solid #c0e8d0",borderRadius:7,padding:"5px 10px",color:"#16a34a",fontSize:11.5,fontWeight:600,cursor:"pointer"}}><Check size={11}/> Save</button>
              <button onClick={()=>{setEditIdx(null);setEditCol(null)}} style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:7,padding:"5px 10px",color:"#6b6b80",fontSize:11.5,fontWeight:600,cursor:"pointer"}}>Cancel</button></div></div>
          return<StageCard key={idx} stage={stage} idx={idx} colKey={colKey} onDragStart={onDragStart} canDrag={canDrag} onEdit={startEd} onDelete={del} canEdit={canManage} mentors={mentors} teamMembers={teamMembers} onAssign={assignS} onSetDeadline={setDeadline}/>})}
        {items.length===0&&<div style={{textAlign:"center",padding:"18px 10px",color:"#c0c0cc",fontSize:11.5}}>Drag sub-tasks here</div>}</div></div>}
  return<div>
    <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
      {canManage&&<><input value={newStage} onChange={e=>setNewStage(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addNew()} placeholder="Add new sub-task..." style={{flex:1,minWidth:160,padding:"9px 13px",background:"#fff",border:"1px solid #e5e5ec",borderRadius:9,color:"#1a1a2e",fontSize:12.5}}/>
        <Btn onClick={addNew} style={{padding:"9px 16px",fontSize:12.5}}><Plus size={13}/> Add</Btn></>}
      {isTM&&!canManage&&<><input value={newStage} onChange={e=>setNewStage(e.target.value)} placeholder="Request a sub-task..." style={{flex:1,minWidth:160,padding:"9px 13px",background:"#fff",border:"1px solid #e5e5ec",borderRadius:9,color:"#1a1a2e",fontSize:12.5}}/>
        <Btn variant="amber" onClick={()=>{if(newStage.trim()){onRequestStage(newStage.trim());setNewStage("")}}} style={{padding:"9px 16px",fontSize:12.5}}><MessageSquare size={13}/> Request</Btn></>}</div>
    <div className="kanban-cols" style={{display:"flex",gap:12,overflow:"visible",position:"relative"}}>{renderCol("todo")}{renderCol("progress")}{renderCol("completed")}</div></div>}

function TaskDetail({task,mentors,onClose,onUpdate,isAdmin,currentUser,addToast,onSendNotification}){
  const isResp=task.responsible?.email===currentUser?.email;const isTM=(task.teamMembers||[]).some(m=>m.email===currentUser?.email);const canManage=isAdmin||isResp
  const allTeam=[...(task.responsible?[task.responsible]:[]),...(task.teamMembers||[])];const uniqueTeam=[...new Map(allTeam.map(m=>[m.email,m])).values()]
  const respOpts=mentors.filter(m=>!EXCLUDE_FROM_TEAM.includes(m.email)&&!(task.teamMembers||[]).find(t=>t.email===m.email)).map(m=>({...m,value:m.email,label:m.name}))
  const teamOpts=mentors.filter(m=>!EXCLUDE_FROM_TEAM.includes(m.email)&&m.email!==task.responsible?.email&&!(task.teamMembers||[]).find(t=>t.email===m.email)).map(m=>({...m,value:m.email,label:m.name}))
  const[pendingNotify,setPendingNotify]=useState(false)
  const[stageRequests,setStageRequests]=useState(task.stageRequests||[])
  const[approveIdx,setApproveIdx]=useState(-1);const[approveName,setApproveName]=useState("")
  const[notifiedEmails,setNotifiedEmails]=useState(task.notifiedEmails||[])

  const saveTask=async u=>{try{const r=await fetch(`/api/tasks/${task._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});if(r.ok)onUpdate();else addToast("Failed","error")}catch{addToast("Error","error")}}
  const saveStages=ns=>saveTask({stages:ns})

  const assignResp=email=>{const m=mentors.find(x=>x.email===email);if(!m)return;saveTask({responsible:{name:m.name,email:m.email}});addToast(`${m.name} assigned as responsible`,"success")
    onSendNotification({type:"assignment",taskTitle:task.title,message:`${currentUser?.name} assigned you as responsible for "${task.title}"`,targetEmail:m.email,fromName:currentUser?.name,fromEmail:currentUser?.email})}
  const addTM=email=>{const m=mentors.find(x=>x.email===email);if(!m)return;saveTask({teamMembers:[...(task.teamMembers||[]),{name:m.name,email:m.email}]});addToast(`${m.name} added`,"success")
    onSendNotification({type:"assignment",taskTitle:task.title,message:`${currentUser?.name} added you to team for "${task.title}"`,targetEmail:m.email,fromName:currentUser?.name,fromEmail:currentUser?.email})}
  const rmTM=email=>{saveTask({teamMembers:(task.teamMembers||[]).filter(t=>t.email!==email)});addToast("Removed","success")}

  // Smart notify: only send to people NOT in notifiedEmails list
  const notifyNew=async()=>{setPendingNotify(true)
    const people=[...(task.responsible?[task.responsible]:[]),...(task.teamMembers||[])]
    const newPeople=people.filter(p=>!notifiedEmails.includes(p.email))
    if(newPeople.length===0){addToast("Everyone already notified","info");setPendingNotify(false);return}
    for(const p of newPeople){await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"notify-assignment",mentorEmail:p.email,mentorName:p.name,taskTitle:task.title,assignRole:p.email===task.responsible?.email?"responsible":"team"})})}
    const updatedNotified=[...new Set([...notifiedEmails,...newPeople.map(p=>p.email)])]
    setNotifiedEmails(updatedNotified);saveTask({notifiedEmails:updatedNotified})
    addToast(`Notified ${newPeople.length} new member(s)`,"success");setPendingNotify(false)}

  const onRequestStage=title=>{const req={title,requestedBy:currentUser?.name||currentUser?.email,requestedEmail:currentUser?.email,requestedAt:new Date().toISOString()}
    const updated=[...stageRequests,req];setStageRequests(updated);saveTask({stageRequests:updated});addToast("Sub-task requested!","info")
    // Notify responsible
    if(task.responsible)onSendNotification({type:"stage-request",taskTitle:task.title,message:`${currentUser?.name} requested sub-task "${title}" for "${task.title}"`,targetEmail:task.responsible.email,fromName:currentUser?.name,fromEmail:currentUser?.email})}

  const startApprove=idx=>{setApproveIdx(idx);setApproveName(stageRequests[idx].title)}
  const confirmApprove=()=>{if(!approveName.trim())return;const newStages=[...(task.stages||[]),{title:approveName.trim(),status:"todo",comment:"",completedAt:null,assignedTo:null,createdAt:new Date().toISOString()}]
    const req=stageRequests[approveIdx];const newReqs=stageRequests.filter((_,i)=>i!==approveIdx);setStageRequests(newReqs);saveTask({stages:newStages,stageRequests:newReqs});setApproveIdx(-1);addToast(`Approved: ${approveName}`,"success")
    // Notify requester
    if(req.requestedEmail)onSendNotification({type:"stage-approved",taskTitle:task.title,message:`Your sub-task request "${approveName}" was approved for "${task.title}"`,targetEmail:req.requestedEmail,fromName:currentUser?.name,fromEmail:currentUser?.email})}
  const rejectRequest=idx=>{const req=stageRequests[idx];const newReqs=stageRequests.filter((_,i)=>i!==idx);setStageRequests(newReqs);saveTask({stageRequests:newReqs});addToast("Rejected","warning")
    if(req.requestedEmail)onSendNotification({type:"stage-request",taskTitle:task.title,message:`Your sub-task request "${req.title}" was rejected for "${task.title}"`,targetEmail:req.requestedEmail,fromName:currentUser?.name,fromEmail:currentUser?.email})}

  const onNotifyActivity=(message,fromName)=>{
    // Notify responsible about stage activity
    if(task.responsible&&task.responsible.email!==currentUser?.email)
      onSendNotification({type:"stage-moved",taskTitle:task.title,message:`${fromName}: ${message} in "${task.title}"`,targetEmail:task.responsible.email,fromName,fromEmail:currentUser?.email})
    // Also notify admin emails
    ADMIN_EMAILS.forEach(ae=>{if(ae!==currentUser?.email&&ae!==task.responsible?.email)
      onSendNotification({type:"stage-moved",taskTitle:task.title,message:`${fromName}: ${message} in "${task.title}"`,targetEmail:ae,fromName,fromEmail:currentUser?.email})})}

  const stages=task.stages||[];const done=stages.filter(s=>s.status==="completed").length
  const[editingTitle,setEditingTitle]=useState(false);const[titleVal,setTitleVal]=useState(task.title)
  const saveTitle=()=>{if(!titleVal.trim())return;saveTask({title:titleVal.trim()});setEditingTitle(false);addToast("Task renamed","success")}
  const deleteTask=async()=>{if(!confirm(`Delete "${task.title}"? This cannot be undone.`))return;try{const r=await fetch(`/api/tasks/${task._id}`,{method:"DELETE"});if(r.ok){addToast("Task deleted","success");onUpdate();onClose()}else addToast("Failed","error")}catch{addToast("Error","error")}}

  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.3)",backdropFilter:"blur(4px)",zIndex:1000,overflow:"auto"}} onClick={onClose}>
    <div className="scale-in" onClick={e=>e.stopPropagation()} style={{background:"#f8f8fa",minHeight:"100vh",maxWidth:1140,margin:"0 auto",borderLeft:"1px solid #e5e5ec",borderRight:"1px solid #e5e5ec"}}>
      <div className="task-header" style={{padding:"18px 26px",borderBottom:"1px solid #e5e5ec",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#fff",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12,flex:1,minWidth:0}}>
          <button onClick={onClose} style={{background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:9,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b6b80",flexShrink:0}}><ArrowLeft size={15}/></button>
          <div style={{flex:1,minWidth:0}}>
            {editingTitle?<div style={{display:"flex",gap:6,alignItems:"center"}}>
              <input value={titleVal} onChange={e=>setTitleVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")saveTitle();if(e.key==="Escape"){setEditingTitle(false);setTitleVal(task.title)}}} style={{flex:1,padding:"6px 10px",background:"#f8f8fa",border:"1px solid #d0d0da",borderRadius:8,color:"#1a1a2e",fontSize:17,fontWeight:600,fontFamily:"var(--font-display)"}} autoFocus/>
              <button onClick={saveTitle} style={{background:"#f0faf4",border:"1px solid #c0e8d0",borderRadius:7,padding:"6px 10px",color:"#16a34a",cursor:"pointer",display:"flex"}}><Check size={14}/></button>
              <button onClick={()=>{setEditingTitle(false);setTitleVal(task.title)}} style={{background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:7,padding:"6px 10px",color:"#6b6b80",cursor:"pointer",display:"flex"}}><X size={14}/></button></div>
            :<div style={{display:"flex",alignItems:"center",gap:8}}>
              <h2 style={{fontFamily:"var(--font-display)",fontSize:18,fontWeight:600,color:"#1a1a2e"}}>{task.title}</h2>
              {isAdmin&&<button onClick={()=>setEditingTitle(true)} style={{background:"none",border:"none",cursor:"pointer",color:"#9898a8",display:"flex",padding:2}} title="Edit task name"><Edit3 size={14}/></button>}
              {isAdmin&&<button onClick={deleteTask} style={{background:"none",border:"none",cursor:"pointer",color:"#dc2626",display:"flex",padding:2}} title="Delete task"><Trash2 size={14}/></button>}</div>}
            <div style={{display:"flex",alignItems:"center",gap:10,marginTop:3}}>
              {task.responsible&&<div style={{display:"flex",alignItems:"center",gap:4}}><Avatar name={task.responsible.name} size={16}/><span style={{fontSize:11.5,color:"#6b6b80"}}>{task.responsible.name}</span></div>}
              <span style={{fontSize:10.5,color:"#c0c0cc"}}>{stages.length} sub-tasks</span></div></div></div>
        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",flexShrink:0}}>
          <div style={{minWidth:120}}><ProgressBar done={done} total={stages.length}/></div>
          {canManage&&(task.responsible||(task.teamMembers||[]).length>0)&&<Btn variant="notify" onClick={notifyNew} disabled={pendingNotify}><BellRing size={14}/> {pendingNotify?"Sending...":"Notify New"}</Btn>}</div></div>

      {(isAdmin||isResp)&&<div className="assign-row" style={{padding:"14px 26px",borderBottom:"1px solid #e5e5ec",background:"#fff",display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>
        {isAdmin&&<div style={{minWidth:200}}><SearchDropdown label="Responsible" options={respOpts} value={task.responsible?.email||""} onChange={assignResp} placeholder="Assign..."/></div>}
        <div style={{minWidth:200}}><SearchDropdown label="Add Team" options={teamOpts} value="" onChange={addTM} placeholder="Add member..."/></div>
        {(task.teamMembers||[]).length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:5,alignItems:"center"}}>
          {(task.teamMembers||[]).map(m=><div key={m.email} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 9px",background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:7,fontSize:11.5,color:"#6b6b80"}}>
            <Avatar name={m.name} size={16}/>{m.name}<button onClick={()=>rmTM(m.email)} style={{background:"none",border:"none",cursor:"pointer",color:"#9898a8",display:"flex",padding:0}}><X size={11}/></button></div>)}</div>}</div>}

      {/* Sub-Task Requests */}
      {canManage&&stageRequests.length>0&&<div style={{padding:"12px 26px",borderBottom:"1px solid #e5e5ec",background:"#fffbf0"}}>
        <div style={{fontSize:12,fontWeight:600,color:"#d97706",marginBottom:8,display:"flex",alignItems:"center",gap:5}}><MessageSquare size={13}/> Sub-Task Requests ({stageRequests.length})</div>
        {stageRequests.map((req,i)=><div key={i} style={{padding:"10px 14px",background:"#fff",border:"1px solid #ffe0a8",borderRadius:8,marginBottom:6}}>
          {approveIdx===i?<div><div style={{fontSize:12,color:"#6b6b80",marginBottom:6}}>Requested: <strong>{req.title}</strong> by {req.requestedBy}</div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}><input value={approveName} onChange={e=>setApproveName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&confirmApprove()} placeholder="Stage name..." style={{flex:1,padding:"7px 10px",background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:7,color:"#1a1a2e",fontSize:12.5}} autoFocus/>
              <Btn variant="green" onClick={confirmApprove} style={{padding:"7px 12px",fontSize:12}}><Check size={12}/> Add</Btn>
              <button onClick={()=>setApproveIdx(-1)} style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:7,padding:"7px 10px",color:"#6b6b80",fontSize:12,cursor:"pointer"}}>Cancel</button></div></div>
          :<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><span style={{fontSize:13,fontWeight:500,color:"#1a1a2e"}}>{req.title}</span><span style={{fontSize:11,color:"#9898a8",marginLeft:8}}>by {req.requestedBy}</span></div>
            <div style={{display:"flex",gap:5}}><button onClick={()=>startApprove(i)} style={{background:"#f0faf4",border:"1px solid #c0e8d0",borderRadius:6,padding:"4px 10px",color:"#16a34a",fontSize:11,fontWeight:600,cursor:"pointer"}}><Check size={11}/> Approve</button>
              <button onClick={()=>rejectRequest(i)} style={{background:"#fef5f5",border:"1px solid #f5c0c0",borderRadius:6,padding:"4px 10px",color:"#dc2626",fontSize:11,fontWeight:600,cursor:"pointer"}}><X size={11}/> Reject</button></div></div>}
        </div>)}</div>}

      <div style={{padding:"18px 26px"}}><KanbanBoard stages={stages} onSaveStages={saveStages} canManage={canManage} isTM={isTM} currentUser={currentUser} mentors={mentors} teamMembers={uniqueTeam} addToast={addToast} onRequestStage={onRequestStage} onNotifyActivity={onNotifyActivity}/></div>
    </div></div>}

/* ═══ DASHBOARDS ═══ */
function AdminDashboard({user,tasks,mentors,onLogout,onRefresh,addToast,notifications,onToggleNotifs,unreadCount,onSendNotification}){const[search,setSearch]=useState("");const[openTask,setOpenTask]=useState(null);const[showAddTask,setShowAddTask]=useState(false);const[newTitle,setNewTitle]=useState("");const[newDesc,setNewDesc]=useState("");const[activeTab,setActiveTab]=useState("tasks")
  const filtered=tasks.filter(t=>{const q=search.toLowerCase();if(!q)return true;return t.title.toLowerCase().includes(q)||(t.responsible?.name||"").toLowerCase().includes(q)||(t.teamMembers||[]).some(m=>m.name.toLowerCase().includes(q))||(t.stages||[]).some(s=>s.title.toLowerCase().includes(q))})
  let totalS=0,doneS=0,progS=0;tasks.forEach(t=>(t.stages||[]).forEach(s=>{totalS++;if(s.status==="completed")doneS++;if(s.status==="progress")progS++}))
  const pendingS=totalS-doneS-progS
  const assigned=tasks.filter(t=>t.responsible).length;const activeTask=openTask?tasks.find(t=>t._id===openTask):null
  const addTask=async()=>{if(!newTitle.trim())return;try{const r=await fetch("/api/tasks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:newTitle.trim(),description:newDesc.trim()})});if(r.ok){addToast(`Task created!`,"success");setNewTitle("");setNewDesc("");setShowAddTask(false);onRefresh()}else addToast("Failed","error")}catch{addToast("Error","error")}}

  // Collect all sub-tasks for status overview - filtered by search
  const allSubTasks=[];tasks.forEach(t=>(t.stages||[]).forEach(s=>{const st=(!s.status||s.status==="todo"||s.status==="pending")?"pending":s.status;const assignedNames=Array.isArray(s.assignedTo)?s.assignedTo.map(e=>mentors.find(m=>m.email===e)?.name||e).join(", "):s.assignedTo?mentors.find(m=>m.email===s.assignedTo)?.name||s.assignedTo:"";allSubTasks.push({...s,taskTitle:t.title,taskId:t._id,responsible:t.responsible,statusNorm:st,assignedNames})}))
  const q=search.toLowerCase()
  const filteredSubTasks=q?allSubTasks.filter(s=>s.title.toLowerCase().includes(q)||s.taskTitle.toLowerCase().includes(q)||(s.assignedNames||"").toLowerCase().includes(q)||(s.responsible?.name||"").toLowerCase().includes(q)):allSubTasks
  const pendingItems=filteredSubTasks.filter(s=>s.statusNorm==="pending")
  const progressItems=filteredSubTasks.filter(s=>s.statusNorm==="progress")
  const completedItems=filteredSubTasks.filter(s=>s.statusNorm==="completed")

  return<div style={{minHeight:"100vh",background:"#f8f8fa"}}><div className="top-bar" style={{padding:"14px 26px",borderBottom:"1px solid #e5e5ec",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fff",position:"sticky",top:0,zIndex:50}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center"}}><ClipboardList size={16} color="#fff"/></div>
      <div><h1 style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:600,color:"#1a1a2e"}}>ProjectSpace</h1><p style={{fontSize:10.5,color:"#9898a8"}}>Admin</p></div></div>
    <div className="top-bar-right" style={{display:"flex",alignItems:"center",gap:10}}>
      <button onClick={onToggleNotifs} style={{position:"relative",background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:9,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b6b80"}}><Bell size={16}/>
        {unreadCount>0&&<div style={{position:"absolute",top:-4,right:-4,width:18,height:18,borderRadius:"50%",background:"#ff2d00",color:"#fff",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",animation:"notifPulse 2s infinite"}}>{unreadCount}</div>}</button>
      <Avatar name={user.name} size={28}/><span style={{fontSize:12.5,color:"#6b6b80"}}>{user.name}</span><Btn variant="ghost" onClick={onLogout} style={{color:"#9898a8"}}><LogOut size={14}/></Btn></div></div>

    {/* Tabs + Search - sticky below top bar */}
    <div style={{padding:"10px 26px",background:"#fff",borderBottom:"1px solid #e5e5ec",position:"sticky",top:52,zIndex:49,boxShadow:"0 1px 3px rgba(0,0,0,.03)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:0}}>
          <button onClick={()=>setActiveTab("tasks")} style={{padding:"10px 20px",background:"none",border:"none",borderBottom:activeTab==="tasks"?"2px solid #ff2d00":"2px solid transparent",color:activeTab==="tasks"?"#ff2d00":"#9898a8",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",gap:6}}><ClipboardList size={14}/> Tasks</button>
          <button onClick={()=>setActiveTab("status")} style={{padding:"10px 20px",background:"none",border:"none",borderBottom:activeTab==="status"?"2px solid #3b82f6":"2px solid transparent",color:activeTab==="status"?"#3b82f6":"#9898a8",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",gap:6}}><BarChart3 size={14}/> Tasks Status</button></div>
        <div style={{display:"flex",gap:10,alignItems:"center",flex:1,maxWidth:500,minWidth:200}}>
          <div style={{flex:1,position:"relative"}}><Search size={15} style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#9898a8"}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tasks, sub-tasks, mentors..." style={{width:"100%",padding:"10px 16px 10px 40px",background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:10,color:"#1a1a2e",fontSize:13,fontFamily:"var(--font-body)"}}/></div>
          {activeTab==="tasks"&&<Btn onClick={()=>setShowAddTask(true)} style={{flexShrink:0}}><Plus size={14}/> Add Task</Btn>}</div>
      </div>
    </div>

    {activeTab==="tasks"&&<div style={{padding:"22px 26px",maxWidth:1140,margin:"0 auto"}}>
      <div className="stat-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:24}}>
        <StatCard icon={ClipboardList} value={tasks.length} label="Tasks"/><StatCard icon={Users} value={assigned} label="Assigned" color="#3b82f6"/><StatCard icon={Clock} value={progS} label="In Progress" color="#d97706"/><StatCard icon={CheckCircle2} value={doneS} label="Completed" color="#16a34a"/></div>
      <div className="dash-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>{filtered.map((t,i)=><TaskCard key={t._id} task={t} index={i} onClick={()=>setOpenTask(t._id)}/>)}</div>
      {filtered.length===0&&<div style={{textAlign:"center",padding:50,color:"#9898a8"}}><Search size={36} style={{marginBottom:10,opacity:.3}}/><p style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:600,color:"#6b6b80"}}>No tasks found</p></div>}</div>}

    {/* Tasks Status Tab - Full Page */}
    {activeTab==="status"&&<div style={{padding:"22px 26px",maxWidth:1140,margin:"0 auto"}}>
      <div className="stat-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
        <div style={{background:"#fff",border:"1px solid #fcc",borderRadius:14,padding:"16px 18px",boxShadow:"0 1px 4px rgba(0,0,0,.03)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontFamily:"var(--font-display)",fontSize:26,fontWeight:700,color:"#dc2626"}}>{pendingItems.length}</div><div style={{fontSize:10.5,color:"#dc2626",textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginTop:2}}>Pending</div></div><div style={{width:34,height:34,borderRadius:9,background:"#fef5f5",display:"flex",alignItems:"center",justifyContent:"center"}}><AlertCircle size={16} color="#dc2626"/></div></div></div>
        <div style={{background:"#fff",border:"1px solid #ffe8b8",borderRadius:14,padding:"16px 18px",boxShadow:"0 1px 4px rgba(0,0,0,.03)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontFamily:"var(--font-display)",fontSize:26,fontWeight:700,color:"#d97706"}}>{progressItems.length}</div><div style={{fontSize:10.5,color:"#d97706",textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginTop:2}}>In Progress</div></div><div style={{width:34,height:34,borderRadius:9,background:"#fffbf0",display:"flex",alignItems:"center",justifyContent:"center"}}><Clock size={16} color="#d97706"/></div></div></div>
        <div style={{background:"#fff",border:"1px solid #c0e8d0",borderRadius:14,padding:"16px 18px",boxShadow:"0 1px 4px rgba(0,0,0,.03)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontFamily:"var(--font-display)",fontSize:26,fontWeight:700,color:"#16a34a"}}>{completedItems.length}</div><div style={{fontSize:10.5,color:"#16a34a",textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginTop:2}}>Completed</div></div><div style={{width:34,height:34,borderRadius:9,background:"#f0faf4",display:"flex",alignItems:"center",justifyContent:"center"}}><CheckCircle2 size={16} color="#16a34a"/></div></div></div></div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        {/* Pending - RED themed */}
        <div style={{background:"#fff",border:"1px solid #fcc",borderRadius:16,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",background:"#fef5f5",borderBottom:"1px solid #fcc",display:"flex",alignItems:"center",gap:7}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#dc2626"}}/><h3 style={{fontFamily:"var(--font-display)",fontSize:13,fontWeight:600,color:"#dc2626"}}>Pending</h3>
            <span style={{marginLeft:"auto",fontSize:11,fontWeight:700,color:"#dc2626",background:"#fee",padding:"2px 8px",borderRadius:5}}>{pendingItems.length}</span></div>
          <div style={{padding:12,display:"flex",flexDirection:"column",gap:6,maxHeight:"calc(100vh - 280px)",overflowY:"auto"}}>
            {pendingItems.length===0&&<div style={{textAlign:"center",padding:24,color:"#c0c0cc",fontSize:12}}>No pending sub-tasks</div>}
            {pendingItems.map((s,i)=><div key={i} style={{padding:"10px 12px",background:"#fff8f8",border:"1px solid #fdd",borderLeft:"3px solid #dc2626",borderRadius:8}}>
              <div style={{fontSize:12.5,fontWeight:500,color:"#1a1a2e"}}>{s.title}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <span style={{fontSize:10.5,color:"#9898a8"}}>{s.taskTitle}</span>
                {s.assignedNames&&<span style={{fontSize:10,color:"#dc2626",fontWeight:500}}>{s.assignedNames}</span>}</div>
            </div>)}</div></div>

        {/* In Progress - AMBER themed */}
        <div style={{background:"#fff",border:"1px solid #ffe8b8",borderRadius:16,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",background:"#fffbf0",borderBottom:"1px solid #ffe8b8",display:"flex",alignItems:"center",gap:7}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#d97706"}}/><h3 style={{fontFamily:"var(--font-display)",fontSize:13,fontWeight:600,color:"#d97706"}}>In Progress</h3>
            <span style={{marginLeft:"auto",fontSize:11,fontWeight:700,color:"#d97706",background:"#fff4e0",padding:"2px 8px",borderRadius:5}}>{progressItems.length}</span></div>
          <div style={{padding:12,display:"flex",flexDirection:"column",gap:6,maxHeight:"calc(100vh - 280px)",overflowY:"auto"}}>
            {progressItems.length===0&&<div style={{textAlign:"center",padding:24,color:"#c0c0cc",fontSize:12}}>No in-progress sub-tasks</div>}
            {progressItems.map((s,i)=><div key={i} style={{padding:"10px 12px",background:"#fffdf5",border:"1px solid #ffe8b8",borderLeft:"3px solid #d97706",borderRadius:8}}>
              <div style={{fontSize:12.5,fontWeight:500,color:"#1a1a2e"}}>{s.title}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <span style={{fontSize:10.5,color:"#9898a8"}}>{s.taskTitle}</span>
                {s.assignedNames&&<span style={{fontSize:10,color:"#d97706",fontWeight:500}}>{s.assignedNames}</span>}</div>
            </div>)}</div></div>

        {/* Completed - GREEN themed */}
        <div style={{background:"#fff",border:"1px solid #c0e8d0",borderRadius:16,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",background:"#f0faf4",borderBottom:"1px solid #c0e8d0",display:"flex",alignItems:"center",gap:7}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#16a34a"}}/><h3 style={{fontFamily:"var(--font-display)",fontSize:13,fontWeight:600,color:"#16a34a"}}>Completed</h3>
            <span style={{marginLeft:"auto",fontSize:11,fontWeight:700,color:"#16a34a",background:"#e0f5e8",padding:"2px 8px",borderRadius:5}}>{completedItems.length}</span></div>
          <div style={{padding:12,display:"flex",flexDirection:"column",gap:6,maxHeight:"calc(100vh - 280px)",overflowY:"auto"}}>
            {completedItems.length===0&&<div style={{textAlign:"center",padding:24,color:"#c0c0cc",fontSize:12}}>No completed sub-tasks</div>}
            {completedItems.map((s,i)=><div key={i} style={{padding:"10px 12px",background:"#f5fcf8",border:"1px solid #c0e8d0",borderLeft:"3px solid #16a34a",borderRadius:8}}>
              <div style={{fontSize:12.5,fontWeight:500,color:"#1a1a2e"}}>{s.title}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <span style={{fontSize:10.5,color:"#9898a8"}}>{s.taskTitle}</span>
                {s.assignedNames&&<span style={{fontSize:10,color:"#16a34a",fontWeight:500}}>{s.assignedNames}</span>}</div>
            </div>)}</div></div>
      </div>
    </div>}

    {activeTask&&<TaskDetail task={activeTask} mentors={mentors} onClose={()=>setOpenTask(null)} onUpdate={onRefresh} isAdmin={true} currentUser={user} addToast={addToast} onSendNotification={onSendNotification}/>}
    {showAddTask&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.3)",backdropFilter:"blur(4px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAddTask(false)}>
      <div className="scale-in" onClick={e=>e.stopPropagation()} style={{background:"#fff",border:"1px solid #e5e5ec",borderRadius:20,padding:"36px 32px",width:"100%",maxWidth:460,boxShadow:"0 20px 60px rgba(0,0,0,.1)"}}>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:20,fontWeight:600,marginBottom:22,color:"#1a1a2e"}}>Add Task</h2>
        <FormInput label="Title" icon={ClipboardList} value={newTitle} onChange={setNewTitle} placeholder="e.g. Stage Decoration"/>
        <div style={{marginBottom:18}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#6b6b80",marginBottom:5,textTransform:"uppercase",letterSpacing:1.2}}>Description</label>
          <textarea value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="Brief description..." rows={3} style={{width:"100%",padding:"10px 14px",background:"#fff",border:"1px solid #e5e5ec",borderRadius:10,color:"#1a1a2e",fontSize:13,resize:"vertical"}}/></div>
        <div style={{display:"flex",gap:10}}><Btn onClick={addTask} style={{flex:1,justifyContent:"center"}}><Plus size={14}/> Create</Btn><Btn variant="secondary" onClick={()=>setShowAddTask(false)}>Cancel</Btn></div></div></div>}
  </div>}

function MentorDashboard({user,tasks,mentors,onLogout,onRefresh,addToast,notifications,onToggleNotifs,unreadCount,onSendNotification}){const[search,setSearch]=useState("");const[openTask,setOpenTask]=useState(null)
  useEffect(()=>{const i=setInterval(onRefresh,30000);return()=>clearInterval(i)},[onRefresh])
  const myTasks=tasks.filter(t=>(t.responsible?.email===user.email)||(t.teamMembers||[]).some(m=>m.email===user.email))
  const filtered=myTasks.filter(t=>{const q=search.toLowerCase();if(!q)return true;return t.title.toLowerCase().includes(q)})
  let totalS=0,doneS=0;myTasks.forEach(t=>(t.stages||[]).forEach(s=>{totalS++;if(s.status==="completed")doneS++}))
  const resp=myTasks.filter(t=>t.responsible?.email===user.email).length;const activeTask=openTask?tasks.find(t=>t._id===openTask):null
  return<div style={{minHeight:"100vh",background:"#f8f8fa"}}><div className="top-bar" style={{padding:"14px 26px",borderBottom:"1px solid #e5e5ec",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fff",position:"sticky",top:0,zIndex:50}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#3b82f6,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center"}}><ClipboardList size={16} color="#fff"/></div>
      <div><h1 style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:600,color:"#1a1a2e"}}>ProjectSpace</h1><p style={{fontSize:10.5,color:"#9898a8"}}>Mentor</p></div></div>
    <div className="top-bar-right" style={{display:"flex",alignItems:"center",gap:10}}>
      <button onClick={onToggleNotifs} style={{position:"relative",background:"#f8f8fa",border:"1px solid #e5e5ec",borderRadius:9,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b6b80"}}><Bell size={16}/>
        {unreadCount>0&&<div style={{position:"absolute",top:-4,right:-4,width:18,height:18,borderRadius:"50%",background:"#ff2d00",color:"#fff",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",animation:"notifPulse 2s infinite"}}>{unreadCount}</div>}</button>
      <Avatar name={user.name} size={28}/><span style={{fontSize:12.5,color:"#6b6b80"}}>{user.name}</span><Btn variant="ghost" onClick={onLogout} style={{color:"#9898a8"}}><LogOut size={14}/></Btn></div></div>
    <div style={{padding:"22px 26px",maxWidth:1140,margin:"0 auto"}}>
      <div style={{marginBottom:22,padding:"18px 22px",background:"#fff",border:"1px solid #e5e5ec",borderRadius:14}}><h2 style={{fontFamily:"var(--font-display)",fontSize:20,fontWeight:600,color:"#1a1a2e"}}>Welcome, {user.name}</h2><p style={{color:"#9898a8",fontSize:13}}>{user.email}</p></div>
      <div className="stat-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:24}}>
        <StatCard icon={Layers} value={myTasks.length} label="My Tasks"/><StatCard icon={Star} value={resp} label="Responsible" color="#d97706"/><StatCard icon={CheckCircle2} value={doneS} label="Completed" color="#16a34a"/><StatCard icon={BarChart3} value={totalS>0?Math.round((doneS/totalS)*100)+"%":"0%"} label="Progress" color="#8b5cf6"/></div>
      <div style={{marginBottom:22,position:"relative"}}><Search size={15} style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#9898a8"}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{width:"100%",padding:"11px 16px 11px 40px",background:"#fff",border:"1px solid #e5e5ec",borderRadius:10,color:"#1a1a2e",fontSize:13,boxShadow:"0 1px 3px rgba(0,0,0,.03)"}}/></div>
      {filtered.length===0?<div style={{textAlign:"center",padding:50,color:"#9898a8"}}><Layers size={36} style={{marginBottom:10,opacity:.3}}/><p style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:600,color:"#6b6b80"}}>{myTasks.length===0?"No tasks":"No match"}</p></div>
      :<div className="dash-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>{filtered.map((t,i)=><TaskCard key={t._id} task={t} index={i} onClick={()=>setOpenTask(t._id)}/>)}</div>}</div>
    {activeTask&&<TaskDetail task={activeTask} mentors={mentors} onClose={()=>setOpenTask(null)} onUpdate={onRefresh} isAdmin={false} currentUser={user} addToast={addToast} onSendNotification={onSendNotification}/>}</div>}

/* ═══ MAIN ═══ */
export default function App(){const[page,setPage]=useState("landing");const[email,setEmail]=useState("");const[user,setUser]=useState(null);const[tasks,setTasks]=useState([]);const[mentors,setMentors]=useState([]);const[loading,setLoading]=useState(false);const[seeded,setSeeded]=useState(false);const{toasts,addToast}=useToast();const[prefillEmail,setPrefillEmail]=useState("");const[loginRole,setLoginRole]=useState("mentor");const[authMode,setAuthMode]=useState("login")
  const[notifications,setNotifications]=useState([]);const[showNotifs,setShowNotifs]=useState(false)

  const fetchData=useCallback(async()=>{try{const[tR,mR]=await Promise.all([fetch("/api/tasks"),fetch("/api/mentors")]);if(tR.ok)setTasks(await tR.json());if(mR.ok)setMentors(await mR.json())}catch(e){console.error(e)}},[])
  const fetchNotifs=useCallback(async()=>{if(!user)return;try{const r=await fetch(`/api/notifications?email=${user.email}`);if(r.ok){const n=await r.json();setNotifications(n)}}catch{}},[user])

  useEffect(()=>{const init=async()=>{if(seeded)return;try{const r=await fetch("/api/tasks");const t=await r.json();if(Array.isArray(t)&&t.length===0){setSeeded(true);await fetch("/api/seed",{method:"POST"});await fetchData()}else{setTasks(t);const m=await fetch("/api/mentors");if(m.ok)setMentors(await m.json());setSeeded(true)}}catch{if(!seeded){setSeeded(true);try{await fetch("/api/seed",{method:"POST"});await fetchData()}catch{}}}};init()},[fetchData,seeded])
  useEffect(()=>{if(page==="admin"||page==="mentor"){fetchData();fetchNotifs()}},[page,fetchData,fetchNotifs])
  // Poll notifications every 15 seconds
  useEffect(()=>{if(!user)return;const i=setInterval(fetchNotifs,15000);return()=>clearInterval(i)},[user,fetchNotifs])

  const sendNotification=async(data)=>{try{await fetch("/api/notifications",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})}catch{}}
  const markAllRead=async()=>{if(!user)return;try{await fetch("/api/notifications",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"mark-read",email:user.email})});fetchNotifs()}catch{}}
  const unreadCount=notifications.filter(n=>!n.read).length

  // Show popup toast for new notifications
  const prevNotifCount=useRef(0)
  useEffect(()=>{if(notifications.length>prevNotifCount.current&&prevNotifCount.current>0){const newest=notifications[0];if(newest&&!newest.read)addToast(newest.message,"info")}prevNotifCount.current=notifications.length},[notifications,addToast])

  const handleCreateSendOTP=async em=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"send-otp",email:em})});const d=await r.json();if(r.ok){setEmail(em);if(d.demo_otp)addToast(`OTP: ${d.demo_otp}`,"warning");else addToast("OTP sent!","success");setPage("otp")}else addToast(d.error,"error")}catch{addToast("Error","error")};setLoading(false)}
  const handleVerifyOTP=async otp=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"verify-otp",email,otp})});const d=await r.json();if(r.ok){addToast("Verified!","success");setPage("create-password")}else addToast(d.error,"error")}catch{addToast("Error","error")};setLoading(false)}
  const handleCreatePassword=async pw=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"create-password",email,password:pw})});const d=await r.json();if(r.ok){addToast("Password created!","success");setPrefillEmail(email);setAuthMode("login");setPage("login")}else addToast(d.error,"error")}catch{addToast("Error","error")};setLoading(false)}
  const handleLogin=async(em,pw)=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"login",email:em,password:pw})});const d=await r.json();if(r.ok){const role=loginRole;if(role==="admin"&&!ADMIN_EMAILS.includes(em.toLowerCase().trim())){addToast("No admin access","error");setLoading(false);return}addToast(`Welcome, ${d.mentor.name}!`,"success");setUser({...d.mentor,role});setPrefillEmail("");setPage(role)}else addToast(d.error,"error")}catch{addToast("Error","error")};setLoading(false)}
  const handleLogout=()=>{setUser(null);setEmail("");setPrefillEmail("");setLoginRole("mentor");setNotifications([]);setShowNotifs(false);setPage("landing")}
  const goHome=()=>{setEmail("");setPrefillEmail("");setLoginRole("mentor");setPage("landing")}

  // Forgot password flow
  const handleForgotSend=async em=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"forgot-password",email:em})});const d=await r.json();if(r.ok){setEmail(em);if(d.demo_otp)addToast(`Reset code: ${d.demo_otp}`,"warning");else addToast("Reset code sent!","success");setPage("reset-otp")}else addToast(d.error,"error")}catch{addToast("Error","error")};setLoading(false)}
  const handleResetVerify=async otp=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"verify-otp",email,otp})});const d=await r.json();if(r.ok){addToast("Code verified! Set new password.","success");setPage("reset-password")}else addToast(d.error,"error")}catch{addToast("Error","error")};setLoading(false)}
  const handleResetPassword=async pw=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"reset-password",email,password:pw})});const d=await r.json();if(r.ok){addToast("Password reset! Login now.","success");setPrefillEmail(email);setPage("login")}else addToast(d.error,"error")}catch{addToast("Error","error")};setLoading(false)}

  return<><Toasts toasts={toasts}/>
    {page==="landing"&&<LandingPage onLogin={()=>{setAuthMode("login");setPage("role-pick")}} onCreateAccount={()=>{setAuthMode("create");setPage("role-pick")}}/>}
    {page==="role-pick"&&<RolePickPage mode={authMode} onPick={r=>{setLoginRole(r);if(authMode==="login")setPage("login");else setPage("create-email")}} onBack={goHome}/>}
    {page==="login"&&<LoginPage onSubmit={handleLogin} onBack={()=>setPage("role-pick")} loading={loading} prefillEmail={prefillEmail} role={loginRole} onForgot={em=>{if(em)setEmail(em);setPage("forgot-password")}}/>}
    {page==="forgot-password"&&<ForgotPasswordPage onSubmit={handleForgotSend} onBack={()=>setPage("login")} loading={loading} prefillEmail={email}/>}
    {page==="reset-otp"&&<ResetOTPPage email={email} onVerify={handleResetVerify} onBack={()=>setPage("forgot-password")} loading={loading}/>}
    {page==="reset-password"&&<ResetPasswordPage email={email} onSubmit={handleResetPassword} loading={loading}/>}
    {page==="create-email"&&<CreateEmailPage onSubmit={handleCreateSendOTP} onBack={()=>setPage("role-pick")} loading={loading} role={loginRole}/>}
    {page==="otp"&&<OTPPage email={email} onVerify={handleVerifyOTP} onBack={()=>setPage("create-email")} loading={loading}/>}
    {page==="create-password"&&<CreatePasswordPage email={email} onSubmit={handleCreatePassword} loading={loading}/>}
    {page==="admin"&&user&&<AdminDashboard user={user} tasks={tasks} mentors={mentors} onLogout={handleLogout} onRefresh={fetchData} addToast={addToast} notifications={notifications} onToggleNotifs={()=>setShowNotifs(!showNotifs)} unreadCount={unreadCount} onSendNotification={sendNotification}/>}
    {page==="mentor"&&user&&<MentorDashboard user={user} tasks={tasks} mentors={mentors} onLogout={handleLogout} onRefresh={fetchData} addToast={addToast} notifications={notifications} onToggleNotifs={()=>setShowNotifs(!showNotifs)} unreadCount={unreadCount} onSendNotification={sendNotification}/>}
    {showNotifs&&<><div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.2)",zIndex:1999}} onClick={()=>setShowNotifs(false)}/><NotificationsPanel notifications={notifications} onClose={()=>setShowNotifs(false)} onMarkRead={markAllRead}/></>}
  </>}