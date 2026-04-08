"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { LogIn, LogOut, Search, Plus, Trash2, Edit3, Check, X, Bell, Users, ClipboardList, BarChart3, Layers, Shield, Eye, EyeOff, Mail, Lock, User, CheckCircle2, AlertCircle, Clock, ArrowLeft, Star, Send, GripVertical, UserPlus, ChevronDown } from "lucide-react"

const ADMIN_EMAILS=["harshavardhini.j@adityauniversity.in","babji@aec.edu.in","harshavardhini@technicalhub.io"]
const CARD_COLORS=[{bg:"rgba(255,45,0,.05)",border:"rgba(255,45,0,.18)",accent:"#ff2d00"},{bg:"rgba(59,130,246,.05)",border:"rgba(59,130,246,.18)",accent:"#3b82f6"},{bg:"rgba(245,158,11,.05)",border:"rgba(245,158,11,.18)",accent:"#f59e0b"},{bg:"rgba(16,185,129,.05)",border:"rgba(16,185,129,.18)",accent:"#10b981"},{bg:"rgba(139,92,246,.05)",border:"rgba(139,92,246,.18)",accent:"#8b5cf6"},{bg:"rgba(236,72,153,.05)",border:"rgba(236,72,153,.18)",accent:"#ec4899"},{bg:"rgba(6,182,212,.05)",border:"rgba(6,182,212,.18)",accent:"#06b6d4"},{bg:"rgba(249,115,22,.05)",border:"rgba(249,115,22,.18)",accent:"#f97316"}]
const COL_STYLES={todo:{label:"Total Stages",color:"#3b82f6",bg:"rgba(59,130,246,.04)",border:"rgba(59,130,246,.15)"},progress:{label:"In Progress",color:"#f59e0b",bg:"rgba(245,158,11,.04)",border:"rgba(245,158,11,.15)"},completed:{label:"Completed",color:"#22c55e",bg:"rgba(34,197,94,.04)",border:"rgba(34,197,94,.15)"}}

/* ═══ AVATAR ═══ */
const AV_C=["#ff2d00","#3b82f6","#f59e0b","#10b981","#8b5cf6","#ec4899","#06b6d4","#f97316","#6366f1","#14b8a6","#e11d48","#0ea5e9","#84cc16","#f43f5e","#a855f7"]
function getAC(n){let h=0;for(let i=0;i<(n||"").length;i++)h=n.charCodeAt(i)+((h<<5)-h);return AV_C[Math.abs(h)%AV_C.length]}
function Avatar({name,size=32}){const c=getAC(name),ini=(name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()
  return<div style={{width:size,height:size,borderRadius:size*.35,background:`${c}15`,border:`1.5px solid ${c}33`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:size*.36,fontWeight:700,color:c,fontFamily:"var(--font-display)"}}>{ini}</span></div>}

/* ═══ TOAST ═══ */
function useToast(){const[t,sT]=useState([]);const add=useCallback((m,tp="info")=>{const id=Date.now();sT(p=>[...p,{id,msg:m,type:tp}]);setTimeout(()=>sT(p=>p.filter(x=>x.id!==id)),4000)},[]);return{toasts:t,addToast:add}}
function Toasts({toasts}){const c={success:{bg:"#0a1f0a",c:"#4ade80",b:"#16a34a"},error:{bg:"#1f0a0a",c:"#f87171",b:"#dc2626"},info:{bg:"#0a0a1f",c:"#60a5fa",b:"#2563eb"},warning:{bg:"#1f1a0a",c:"#fbbf24",b:"#d97706"}}
  return<div style={{position:"fixed",top:20,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8}}>{toasts.map(t=>{const s=c[t.type]||c.info;return<div key={t.id} style={{animation:"toastIn .3s ease",padding:"12px 18px",borderRadius:12,background:s.bg,color:s.c,border:`1px solid ${s.b}`,fontSize:13,fontWeight:500,maxWidth:360,display:"flex",alignItems:"center",gap:8}}>{t.type==="success"?<CheckCircle2 size={15}/>:t.type==="error"?<AlertCircle size={15}/>:<Bell size={15}/>}{t.msg}</div>})}</div>}

/* ═══ UI ═══ */
function Btn({children,variant="primary",onClick,style={},disabled=false}){
  const base={padding:"11px 22px",borderRadius:10,fontSize:13,fontWeight:600,cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",gap:7,transition:"all .2s",border:"none",opacity:disabled?.5:1,fontFamily:"var(--font-body)",letterSpacing:.2}
  const v={primary:{background:"#ff2d00",color:"#fff",boxShadow:"0 2px 12px rgba(255,45,0,.25)"},secondary:{background:"transparent",color:"#9898b0",border:"1px solid #2e2e42"},ghost:{background:"transparent",color:"#9898b0",padding:"8px 12px"},admin:{background:"linear-gradient(135deg,#ff2d00,#e02800)",color:"#fff",boxShadow:"0 2px 16px rgba(255,45,0,.3)"},mentor:{background:"linear-gradient(135deg,#3b82f6,#2563eb)",color:"#fff",boxShadow:"0 2px 16px rgba(59,130,246,.3)"}}
  return<button onClick={onClick} disabled={disabled} style={{...base,...v[variant],...style}}>{children}</button>}

function FormInput({label,icon:Icon,type="text",value,onChange,placeholder,onKeyDown,autoFocus,disabled}){const[show,setShow]=useState(false);const isP=type==="password"
  return<div style={{marginBottom:18}}>{label&&<label style={{display:"block",fontSize:11,fontWeight:600,color:"#9898b0",marginBottom:5,textTransform:"uppercase",letterSpacing:1.2}}>{label}</label>}
    <div style={{position:"relative"}}>{Icon&&<Icon size={15} style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#5c5c78"}}/>}
      <input type={isP&&!show?"password":"text"} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} onKeyDown={onKeyDown} autoFocus={autoFocus} disabled={disabled}
        style={{width:"100%",padding:"13px 16px",paddingLeft:Icon?40:16,paddingRight:isP?40:16,background:disabled?"#0a0a12":"#0c0c18",border:"1px solid #1e1e2e",borderRadius:10,color:disabled?"#5c5c78":"#f0eff4",fontSize:13.5,fontFamily:"var(--font-body)",opacity:disabled?.7:1}}/>
      {isP&&<button onClick={()=>setShow(!show)} style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#5c5c78",padding:4}}>{show?<EyeOff size={15}/>:<Eye size={15}/>}</button>}</div></div>}

function ProgressBar({done,total,color="#ff2d00"}){const pct=total>0?Math.round((done/total)*100):0
  return<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:5,background:"rgba(255,255,255,.05)",borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:3,transition:"width .5s ease"}}/></div><span style={{fontSize:11,fontWeight:600,color,minWidth:32,textAlign:"right"}}>{pct}%</span></div>}

/* ═══ SEARCHABLE DROPDOWN ═══ */
function SearchDropdown({label,options,value,onChange,placeholder}){
  const[open,setOpen]=useState(false);const[search,setSearch]=useState("");const ref=useRef(null)
  const filtered=options.filter(o=>(o.label||o.name||"").toLowerCase().includes(search.toLowerCase())||(o.email||"").toLowerCase().includes(search.toLowerCase()))
  const selected=options.find(o=>o.value===value||o.email===value)
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[])
  return<div ref={ref} style={{position:"relative"}}>
    {label&&<label style={{display:"block",fontSize:11,fontWeight:600,color:"#9898b0",marginBottom:4,textTransform:"uppercase",letterSpacing:1.2}}>{label}</label>}
    <button onClick={()=>setOpen(!open)} style={{width:"100%",padding:"10px 13px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:10,color:selected?"#f0eff4":"#5c5c78",fontSize:13,fontFamily:"var(--font-body)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,textAlign:"left"}}>
      <div style={{display:"flex",alignItems:"center",gap:7,flex:1,minWidth:0,overflow:"hidden"}}>
        {selected&&<Avatar name={selected.label||selected.name} size={20}/>}
        <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selected?(selected.label||selected.name):placeholder||"Select..."}</span></div>
      <ChevronDown size={13} style={{flexShrink:0,transition:"transform .2s",transform:open?"rotate(180deg)":"none",opacity:.5}}/></button>
    {open&&<div style={{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:"#12121e",border:"1px solid #1e1e2e",borderRadius:10,boxShadow:"0 12px 40px rgba(0,0,0,.5)",zIndex:100,maxHeight:220,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"7px 8px",borderBottom:"1px solid #1a1a28"}}><div style={{position:"relative"}}><Search size={13} style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:"#5c5c78"}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." autoFocus style={{width:"100%",padding:"7px 9px 7px 30px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:7,color:"#f0eff4",fontSize:12,fontFamily:"var(--font-body)"}}/></div></div>
      <div style={{overflowY:"auto",flex:1}}>{filtered.length===0&&<div style={{padding:"10px 12px",color:"#5c5c78",fontSize:12,textAlign:"center"}}>No results</div>}
        {filtered.map((o,i)=><button key={i} onClick={()=>{onChange(o.value||o.email);setOpen(false);setSearch("")}}
          style={{width:"100%",padding:"9px 12px",background:"transparent",border:"none",borderBottom:"1px solid #14141f",color:"#f0eff4",fontSize:12.5,fontFamily:"var(--font-body)",cursor:"pointer",display:"flex",alignItems:"center",gap:9,textAlign:"left",transition:"background .15s"}}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,45,0,.05)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <Avatar name={o.label||o.name} size={22}/><div><div style={{fontWeight:600,fontSize:12.5}}>{o.label||o.name}</div>{o.email&&<div style={{fontSize:10.5,color:"#5c5c78",marginTop:1}}>{o.email}</div>}</div></button>)}</div>
    </div>}</div>}

/* ═══ LANDING ═══ */
function LandingPage({onLogin,onCreateAccount}){return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
  {/* Sliding diagonal backgrounds */}
  <div className="landing-bg"/><div className="landing-bg landing-bg2"/><div className="landing-bg landing-bg3"/>
  <div className="fade-up" style={{textAlign:"center",maxWidth:480,padding:40,position:"relative",zIndex:1}}>
    <div style={{width:72,height:72,borderRadius:18,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",boxShadow:"0 8px 32px rgba(255,45,0,.2)"}}><ClipboardList size={32} color="#fff" strokeWidth={1.8}/></div>
    <h1 style={{fontFamily:"var(--font-display)",fontSize:36,fontWeight:700,marginBottom:6,letterSpacing:-.5}}>Project<span style={{color:"#ff2d00"}}>Space</span></h1>
    <p style={{fontSize:14.5,color:"#9898b0",marginBottom:44,lineHeight:1.6,fontWeight:400}}>Task Monitoring & Coordination Platform</p>
    <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
      <Btn variant="admin" onClick={onLogin} style={{padding:"14px 36px",fontSize:14,borderRadius:12}}><LogIn size={16}/> Login</Btn>
      <Btn variant="mentor" onClick={onCreateAccount} style={{padding:"14px 36px",fontSize:14,borderRadius:12}}><UserPlus size={16}/> Create Account</Btn>
    </div>
    <p style={{marginTop:36,fontSize:11,color:"#4a4a60",fontWeight:400}}>Aditya University &middot; ProjectSpace 2026</p>
  </div></div>}

/* ═══ ROLE PICK ═══ */
function RolePickPage({onPick,onBack,mode}){const isLogin=mode==="login"
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,textAlign:"center",boxShadow:"0 20px 56px rgba(0,0,0,.5)"}}>
  <div style={{width:50,height:50,borderRadius:14,background:isLogin?"linear-gradient(135deg,#ff2d00,#cc2400)":"linear-gradient(135deg,#8b5cf6,#6d28d9)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>{isLogin?<LogIn size={22} color="#fff"/>:<UserPlus size={22} color="#fff"/>}</div>
  <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,marginBottom:4}}>{isLogin?"Login":"Create Account"}</h2><p style={{color:"#9898b0",fontSize:13,marginBottom:28,fontWeight:400}}>Select your role</p>
  <div style={{display:"flex",flexDirection:"column",gap:10}}>
    <button onClick={()=>onPick("admin")} style={{padding:"16px 20px",borderRadius:12,border:"1px solid rgba(255,45,0,.2)",background:"rgba(255,45,0,.04)",color:"#f0eff4",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",gap:12,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,45,0,.1)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,45,0,.04)"}>
      <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Shield size={18} color="#fff"/></div>
      <div style={{textAlign:"left"}}><div style={{fontWeight:600}}>Admin</div><div style={{fontSize:11.5,color:"#9898b0",fontWeight:400,marginTop:1}}>Full access to all tasks</div></div></button>
    <button onClick={()=>onPick("mentor")} style={{padding:"16px 20px",borderRadius:12,border:"1px solid rgba(59,130,246,.2)",background:"rgba(59,130,246,.04)",color:"#f0eff4",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",gap:12,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(59,130,246,.1)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(59,130,246,.04)"}>
      <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#3b82f6,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={18} color="#fff"/></div>
      <div style={{textAlign:"left"}}><div style={{fontWeight:600}}>Mentor</div><div style={{fontSize:11.5,color:"#9898b0",fontWeight:400,marginTop:1}}>Manage assigned tasks</div></div></button>
  </div>
  <button onClick={onBack} style={{width:"100%",marginTop:18,padding:11,borderRadius:10,border:"1px solid #1e1e2e",background:"transparent",color:"#9898b0",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button>
</div></div>}

/* ═══ AUTH PAGES ═══ */
function LoginPage({onSubmit,onBack,loading,prefillEmail,role}){const[email,setEmail]=useState(prefillEmail||"");const[pw,setPw]=useState("");const[err,setErr]=useState("")
  const go=()=>{setErr("");if(!email||!pw)return setErr("Email and password required");onSubmit(email.trim().toLowerCase(),pw)}
  const isA=role==="admin"
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,boxShadow:"0 20px 56px rgba(0,0,0,.5)"}}>
    <div style={{width:50,height:50,borderRadius:14,background:isA?"linear-gradient(135deg,#ff2d00,#cc2400)":"linear-gradient(135deg,#3b82f6,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>{isA?<Shield size={22} color="#fff"/>:<User size={22} color="#fff"/>}</div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,textAlign:"center",marginBottom:4}}>{isA?"Admin":"Mentor"} Login</h2><p style={{textAlign:"center",color:"#9898b0",fontSize:13,marginBottom:28,fontWeight:400}}>Enter your credentials</p>
    {err&&<div style={{padding:"9px 13px",borderRadius:8,background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",color:"#f87171",fontSize:12.5,marginBottom:14,display:"flex",alignItems:"center",gap:7}}><AlertCircle size={13}/>{err}</div>}
    <FormInput label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="your.email@adityauniversity.in" disabled={!!prefillEmail} autoFocus={!prefillEmail}/>
    <FormInput label="Password" icon={Lock} type="password" value={pw} onChange={setPw} placeholder="Enter your password" onKeyDown={e=>e.key==="Enter"&&go()} autoFocus={!!prefillEmail}/>
    <Btn onClick={go} disabled={loading} style={{width:"100%",justifyContent:"center",padding:14,fontSize:14,borderRadius:12}}>{loading?"Logging in...":<><LogIn size={15}/> Login</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:12,padding:11,borderRadius:10,border:"1px solid #1e1e2e",background:"transparent",color:"#9898b0",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button>
  </div></div>}

function CreateEmailPage({onSubmit,onBack,loading,role}){const[email,setEmail]=useState("");const isA=role==="admin"
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,boxShadow:"0 20px 56px rgba(0,0,0,.5)"}}>
    <div style={{width:50,height:50,borderRadius:14,background:isA?"linear-gradient(135deg,#ff2d00,#cc2400)":"linear-gradient(135deg,#3b82f6,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><UserPlus size={22} color="#fff"/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,textAlign:"center",marginBottom:4}}>{isA?"Admin":"Mentor"} Account</h2><p style={{textAlign:"center",color:"#9898b0",fontSize:13,marginBottom:28,fontWeight:400}}>Enter your registered email</p>
    <FormInput label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="your.email@adityauniversity.in" onKeyDown={e=>e.key==="Enter"&&email&&onSubmit(email.trim().toLowerCase())} autoFocus/>
    <Btn variant={isA?"admin":"mentor"} onClick={()=>email&&onSubmit(email.trim().toLowerCase())} disabled={loading||!email} style={{width:"100%",justifyContent:"center",padding:14,fontSize:14,borderRadius:12}}>{loading?"Sending...":<><Send size={15}/> Send OTP</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:12,padding:11,borderRadius:10,border:"1px solid #1e1e2e",background:"transparent",color:"#9898b0",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button>
  </div></div>}

function OTPPage({email,onVerify,onBack,loading}){const[otp,setOtp]=useState(["","","","","",""]);const refs=useRef([])
  const h=(i,v)=>{if(v.length>1)v=v[v.length-1];const n=[...otp];n[i]=v;setOtp(n);if(v&&i<5)refs.current[i+1]?.focus()}
  const kd=(i,e)=>{if(e.key==="Backspace"&&!otp[i]&&i>0)refs.current[i-1]?.focus();if(e.key==="Enter"&&otp.every(d=>d))onVerify(otp.join(""))}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,textAlign:"center",boxShadow:"0 20px 56px rgba(0,0,0,.5)"}}>
    <div style={{width:50,height:50,borderRadius:14,background:"linear-gradient(135deg,#f59e0b,#d97706)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><Mail size={22} color="#fff"/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,marginBottom:4}}>Verify OTP</h2><p style={{color:"#9898b0",fontSize:13,fontWeight:400}}>Code sent to</p><p style={{color:"#ff2d00",fontSize:12.5,fontWeight:600,marginBottom:26}}>{email}</p>
    <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:26}}>{otp.map((d,i)=><input key={i} ref={el=>refs.current[i]=el} value={d} maxLength={1} onChange={e=>h(i,e.target.value)} onKeyDown={e=>kd(i,e)} style={{width:46,height:54,textAlign:"center",fontSize:22,fontWeight:700,background:"#0c0c18",border:`1.5px solid ${d?"#ff2d00":"#1e1e2e"}`,borderRadius:10,color:"#ff2d00",fontFamily:"var(--font-display)"}} autoFocus={i===0}/>)}</div>
    <Btn onClick={()=>onVerify(otp.join(""))} disabled={loading||!otp.every(d=>d)} style={{width:"100%",justifyContent:"center",padding:14,fontSize:14,borderRadius:12}}>{loading?"Verifying...":<><CheckCircle2 size={15}/> Verify</>}</Btn>
    <button onClick={onBack} style={{width:"100%",marginTop:12,padding:11,borderRadius:10,border:"1px solid #1e1e2e",background:"transparent",color:"#9898b0",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"var(--font-body)",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ArrowLeft size={13}/> Back</button>
  </div></div>}

function CreatePasswordPage({email,onSubmit,loading}){const[pw,setPw]=useState("");const[cf,setCf]=useState("");const[err,setErr]=useState("")
  const go=()=>{setErr("");if(!pw)return setErr("Password required");if(pw.length<6)return setErr("Min 6 characters");if(!/[A-Z]/.test(pw))return setErr("Need 1 uppercase");if(!/[0-9]/.test(pw))return setErr("Need 1 number");if(pw!==cf)return setErr("Passwords don't match");onSubmit(pw)}
  return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="fade-up" style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:20,padding:"44px 36px",width:"100%",maxWidth:420,boxShadow:"0 20px 56px rgba(0,0,0,.5)"}}>
    <div style={{width:50,height:50,borderRadius:14,background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><Lock size={22} color="#fff"/></div>
    <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:600,textAlign:"center",marginBottom:4}}>Create Password</h2>
    <p style={{textAlign:"center",color:"#ff2d00",fontSize:12,fontWeight:500,marginBottom:6}}>{email}</p>
    <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(59,130,246,.04)",border:"1px solid rgba(59,130,246,.1)",color:"#60a5fa",fontSize:11,marginBottom:18,lineHeight:1.5,fontWeight:400}}>Min 6 chars, 1 uppercase, 1 number</div>
    {err&&<div style={{padding:"9px 13px",borderRadius:8,background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",color:"#f87171",fontSize:12.5,marginBottom:14,display:"flex",alignItems:"center",gap:7}}><AlertCircle size={13}/>{err}</div>}
    <FormInput label="New Password" icon={Lock} type="password" value={pw} onChange={setPw} placeholder="Min 6 characters" onKeyDown={e=>e.key==="Enter"&&go()}/>
    <FormInput label="Confirm" icon={Lock} type="password" value={cf} onChange={setCf} placeholder="Re-enter" onKeyDown={e=>e.key==="Enter"&&go()}/>
    <Btn onClick={go} disabled={loading} style={{width:"100%",justifyContent:"center",padding:14,borderRadius:12,background:"linear-gradient(135deg,#22c55e,#16a34a)",boxShadow:"0 2px 12px rgba(34,197,94,.25)"}}>{loading?"Creating...":<><CheckCircle2 size={15}/> Create Password</>}</Btn>
  </div></div>}

/* ═══ STAT ═══ */
function StatCard({icon:Icon,value,label,color="#ff2d00"}){return<div style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:14,padding:"16px 18px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontFamily:"var(--font-display)",fontSize:26,fontWeight:700,color}}>{value}</div><div style={{fontSize:10.5,color:"#5c5c78",textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginTop:2}}>{label}</div></div><div style={{width:34,height:34,borderRadius:9,background:`${color}0a`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={16} color={color}/></div></div></div>}

/* ═══ TASK CARD ═══ */
function TaskCard({task,index,onClick}){const c=CARD_COLORS[index%CARD_COLORS.length];const stages=task.stages||[];const done=stages.filter(s=>s.status==="completed").length;const prog=stages.filter(s=>s.status==="progress").length
  return<div onClick={onClick} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:14,padding:"18px 20px",cursor:"pointer",transition:"all .2s"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=`0 6px 20px ${c.border}`}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
      <h3 style={{fontFamily:"var(--font-display)",fontSize:14,fontWeight:600,lineHeight:1.3,flex:1,paddingRight:8}}>{task.title}</h3>
      <div style={{background:c.accent,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:5,whiteSpace:"nowrap"}}>{done}/{stages.length}</div></div>
    <ProgressBar done={done} total={stages.length} color={c.accent}/>
    {prog>0&&<div style={{marginTop:7,fontSize:10.5,color:"#f59e0b",fontWeight:500}}>{prog} in progress</div>}
    <div style={{marginTop:10,display:"flex",alignItems:"center",gap:7}}>
      {task.responsible?<><Avatar name={task.responsible.name} size={20}/><span style={{fontSize:11.5,color:"#9898b0",fontWeight:400}}>{task.responsible.name}</span></>
        :<span style={{fontSize:11.5,color:"#5c5c78",fontStyle:"italic"}}>Unassigned</span>}</div></div>}

/* ═══ STAGE CARD ═══ */
function StageCard({stage,idx,colKey,onDragStart,canDrag,onEdit,onDelete,canEdit,mentors,teamMembers,onAssign}){
  const assigned=stage.assignedTo?[...mentors,...teamMembers].find(m=>m.email===stage.assignedTo):null
  return<div draggable={canDrag} onDragStart={e=>{if(!canDrag){e.preventDefault();return}onDragStart(e,idx,colKey)}}
    style={{background:"#10101a",border:"1px solid #1e1e2e",borderRadius:10,padding:"12px 14px",cursor:canDrag?"grab":"default",transition:"all .15s"}}
    onMouseEnter={e=>{if(canDrag)e.currentTarget.style.borderColor="#2e2e42"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#1e1e2e"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:7}}>
      <p style={{fontSize:13,fontWeight:500,color:"#f0eff4",lineHeight:1.4,flex:1,minWidth:0}}>{stage.title}</p>
      {canDrag&&<GripVertical size={13} color="#3a3a52" style={{flexShrink:0,marginTop:2}}/>}</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:9}}>
      <div style={{display:"flex",alignItems:"center",gap:5}}>
        {assigned?<><Avatar name={assigned.name} size={20}/><span style={{fontSize:10.5,color:"#9898b0"}}>{assigned.name.split(" ")[0]}</span></>
          :canEdit?<SearchDropdown options={teamMembers.map(m=>({...m,value:m.email,label:m.name}))} value="" onChange={v=>onAssign(idx,colKey,v)} placeholder="Assign..."/>
          :<span style={{fontSize:10.5,color:"#3a3a52",fontStyle:"italic"}}>Unassigned</span>}</div>
      <div style={{display:"flex",gap:3,alignItems:"center"}}>
        {stage.completedAt&&<span style={{fontSize:9.5,color:"#3a3a52"}}>{new Date(stage.completedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</span>}
        {canEdit&&<><button onClick={()=>onEdit(idx,colKey)} style={{background:"none",border:"none",cursor:"pointer",color:"#5c5c78",display:"flex",padding:2}}><Edit3 size={11}/></button>
          <button onClick={()=>onDelete(idx,colKey)} style={{background:"none",border:"none",cursor:"pointer",color:"#5c5c78",display:"flex",padding:2}}><Trash2 size={11}/></button></>}</div></div></div>}

/* ═══ KANBAN BOARD ═══ */
function KanbanBoard({stages,onSaveStages,canManage,isTM,currentUser,mentors,teamMembers,addToast}){
  const norm=s=>{const st=s.status;return(!st||st==="pending"||st==="todo")?"todo":st==="done"?"completed":st}
  const todo=stages.filter(s=>norm(s)==="todo"),progress=stages.filter(s=>norm(s)==="progress"),completed=stages.filter(s=>norm(s)==="completed")
  const[dragItem,setDragItem]=useState(null);const[newStage,setNewStage]=useState("");const[editIdx,setEditIdx]=useState(null);const[editCol,setEditCol]=useState(null);const[editTitle,setEditTitle]=useState("")
  const getCol=col=>col==="todo"?todo:col==="progress"?progress:completed

  const onDragStart=(e,idx,col)=>{setDragItem({idx,col});e.dataTransfer.effectAllowed="move"}
  const onDragOver=e=>{e.preventDefault();e.dataTransfer.dropEffect="move"}
  const onDrop=(e,targetCol)=>{e.preventDefault();if(!dragItem)return;const{idx,col:src}=dragItem;if(src===targetCol){setDragItem(null);return}
    const stage=getCol(src)[idx];if(!stage){setDragItem(null);return}
    if(!canManage&&stage.assignedTo!==currentUser?.email){addToast("You can only move your stages","warning");setDragItem(null);return}
    onSaveStages(stages.map(s=>(s.title===stage.title&&norm(s)===src&&s.assignedTo===stage.assignedTo)?{...s,status:targetCol,completedAt:targetCol==="completed"?new Date().toISOString():targetCol==="todo"?null:s.completedAt}:s));setDragItem(null)}
  const addNew=()=>{if(!newStage.trim())return;if(!canManage&&!isTM){addToast("No permission","warning");return}
    onSaveStages([...stages,{title:newStage.trim(),status:"todo",comment:"",completedAt:null,assignedTo:canManage?null:currentUser?.email,createdAt:new Date().toISOString()}]);setNewStage("")}
  const del=(idx,col)=>{if(!canManage){addToast("Only responsible can delete","warning");return}const s=getCol(col)[idx];onSaveStages(stages.filter(x=>!(x.title===s.title&&norm(x)===col&&x.assignedTo===s.assignedTo)))}
  const startEd=(idx,col)=>{setEditIdx(idx);setEditCol(col);setEditTitle(getCol(col)[idx].title)}
  const saveEd=()=>{if(!editTitle.trim())return;const s=getCol(editCol)[editIdx];onSaveStages(stages.map(x=>(x.title===s.title&&norm(x)===editCol&&x.assignedTo===s.assignedTo)?{...x,title:editTitle.trim()}:x));setEditIdx(null);setEditCol(null)}
  const assignS=(idx,col,email)=>{const s=getCol(col)[idx];const m=mentors.find(x=>x.email===email);onSaveStages(stages.map(x=>(x.title===s.title&&norm(x)===col)?{...x,assignedTo:email}:x));if(m)addToast(`Assigned to ${m.name}`,"success")}

  const renderCol=colKey=>{const st=COL_STYLES[colKey];const items=getCol(colKey)
    return<div onDragOver={onDragOver} onDrop={e=>onDrop(e,colKey)} style={{flex:1,minWidth:240,background:st.bg,border:`1px solid ${st.border}`,borderRadius:14,display:"flex",flexDirection:"column",minHeight:200}}>
      <div style={{padding:"13px 15px 10px",borderBottom:`1px solid ${st.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:st.color}}/><h3 style={{fontFamily:"var(--font-display)",fontSize:12,fontWeight:600,color:st.color}}>{st.label}</h3></div>
        <span style={{fontSize:11,fontWeight:700,color:st.color,background:`${st.color}15`,padding:"2px 7px",borderRadius:5}}>{items.length}</span></div>
      <div style={{padding:10,display:"flex",flexDirection:"column",gap:7,flex:1,overflowY:"auto"}}>
        {items.map((stage,idx)=>{const canDrag=canManage||(stage.assignedTo===currentUser?.email)
          if(editIdx===idx&&editCol===colKey)return<div key={idx} style={{background:"#10101a",border:"1px solid #2e2e42",borderRadius:10,padding:"10px 12px"}}>
            <input value={editTitle} onChange={e=>setEditTitle(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveEd()} style={{width:"100%",padding:"7px 9px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:7,color:"#f0eff4",fontSize:12.5,fontFamily:"var(--font-body)",marginBottom:7}} autoFocus/>
            <div style={{display:"flex",gap:5}}><button onClick={saveEd} style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",borderRadius:7,padding:"5px 10px",color:"#4ade80",fontSize:11.5,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}><Check size={11}/>Save</button>
              <button onClick={()=>{setEditIdx(null);setEditCol(null)}} style={{background:"transparent",border:"1px solid #2e2e42",borderRadius:7,padding:"5px 10px",color:"#9898b0",fontSize:11.5,fontWeight:600,cursor:"pointer"}}>Cancel</button></div></div>
          return<StageCard key={idx} stage={stage} idx={idx} colKey={colKey} onDragStart={onDragStart} canDrag={canDrag} onEdit={startEd} onDelete={del} canEdit={canManage} mentors={mentors} teamMembers={teamMembers} onAssign={assignS}/>})}
        {items.length===0&&<div style={{textAlign:"center",padding:"18px 10px",color:"#3a3a52",fontSize:11.5}}>Drag stages here</div>}</div></div>}

  return<div>
    {(canManage||isTM)&&<div style={{display:"flex",gap:8,marginBottom:14}}>
      <input value={newStage} onChange={e=>setNewStage(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addNew()} placeholder="Add new stage..." style={{flex:1,padding:"9px 13px",background:"#0c0c18",border:"1px solid #1e1e2e",borderRadius:9,color:"#f0eff4",fontSize:12.5,fontFamily:"var(--font-body)"}}/>
      <Btn onClick={addNew} style={{padding:"9px 16px",fontSize:12.5}}><Plus size={13}/> Add</Btn></div>}
    <div style={{display:"flex",gap:12,overflowX:"auto"}}>{renderCol("todo")}{renderCol("progress")}{renderCol("completed")}</div></div>}

/* ═══ TASK DETAIL ═══ */
function TaskDetail({task,mentors,onClose,onUpdate,isAdmin,currentUser,addToast}){
  const isResp=task.responsible?.email===currentUser?.email
  const isTM=(task.teamMembers||[]).some(m=>m.email===currentUser?.email)
  const canManage=isAdmin||isResp
  const allTeam=[...(task.responsible?[task.responsible]:[]),...(task.teamMembers||[])]
  const uniqueTeam=[...new Map(allTeam.map(m=>[m.email,m])).values()]
  const mentorOpts=mentors.map(m=>({...m,value:m.email,label:m.name}))

  const saveTask=async u=>{try{const r=await fetch(`/api/tasks/${task._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});if(r.ok)onUpdate();else addToast("Failed","error")}catch{addToast("Network error","error")}}
  const saveStages=ns=>{saveTask({stages:ns})}

  const assignResp=email=>{const m=mentors.find(x=>x.email===email);if(!m)return;saveTask({responsible:{name:m.name,email:m.email}});addToast(`${m.name} assigned`,"success")
    fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"notify-assignment",mentorEmail:m.email,mentorName:m.name,taskTitle:task.title,assignRole:"responsible"})})}
  const addTM=email=>{const m=mentors.find(x=>x.email===email);if(!m||(task.teamMembers||[]).find(t=>t.email===email))return
    saveTask({teamMembers:[...(task.teamMembers||[]),{name:m.name,email:m.email}]});addToast(`${m.name} added`,"success")
    fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"notify-assignment",mentorEmail:m.email,mentorName:m.name,taskTitle:task.title,assignRole:"team"})})}
  const rmTM=email=>{saveTask({teamMembers:(task.teamMembers||[]).filter(t=>t.email!==email)});addToast("Removed","success")}

  const stages=task.stages||[];const done=stages.filter(s=>s.status==="completed").length

  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",backdropFilter:"blur(6px)",zIndex:1000,overflow:"auto"}} onClick={onClose}>
    <div className="scale-in" onClick={e=>e.stopPropagation()} style={{background:"#0a0a14",minHeight:"100vh",maxWidth:1140,margin:"0 auto",borderLeft:"1px solid #1e1e2e",borderRight:"1px solid #1e1e2e"}}>
      <div style={{padding:"18px 26px",borderBottom:"1px solid #1e1e2e",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#0a0a14",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.04)",border:"1px solid #2e2e42",borderRadius:9,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#9898b0"}}><ArrowLeft size={15}/></button>
          <div><h2 style={{fontFamily:"var(--font-display)",fontSize:18,fontWeight:600}}>{task.title}</h2>
            <div style={{display:"flex",alignItems:"center",gap:10,marginTop:3}}>
              {task.responsible&&<div style={{display:"flex",alignItems:"center",gap:4}}><Avatar name={task.responsible.name} size={16}/><span style={{fontSize:11.5,color:"#9898b0"}}>{task.responsible.name}</span></div>}
              <span style={{fontSize:10.5,color:"#3a3a52"}}>{stages.length} stages</span></div></div></div>
        <div style={{minWidth:140}}><ProgressBar done={done} total={stages.length}/></div></div>

      {(isAdmin||isResp)&&<div style={{padding:"14px 26px",borderBottom:"1px solid #1e1e2e",display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div style={{minWidth:200}}><SearchDropdown label="Responsible" options={mentorOpts} value={task.responsible?.email||""} onChange={assignResp} placeholder="Select..."/></div>
        <div style={{minWidth:200}}><SearchDropdown label="Add Team" options={mentorOpts.filter(m=>!(task.teamMembers||[]).find(t=>t.email===m.email)&&m.email!==task.responsible?.email)} value="" onChange={addTM} placeholder="Add member..."/></div>
        {(task.teamMembers||[]).length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:5,alignItems:"center"}}>
          {(task.teamMembers||[]).map(m=><div key={m.email} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 9px",background:"rgba(255,255,255,.03)",border:"1px solid #1e1e2e",borderRadius:7,fontSize:11.5,color:"#9898b0"}}>
            <Avatar name={m.name} size={16}/>{m.name.split(" ")[0]}<button onClick={()=>rmTM(m.email)} style={{background:"none",border:"none",cursor:"pointer",color:"#5c5c78",display:"flex",padding:0}}><X size={11}/></button></div>)}</div>}</div>}

      <div style={{padding:"18px 26px"}}><KanbanBoard stages={stages} onSaveStages={saveStages} canManage={canManage} isTM={isTM} currentUser={currentUser} mentors={mentors} teamMembers={uniqueTeam} addToast={addToast}/></div>
    </div></div>}

/* ═══ DASHBOARDS ═══ */
function AdminDashboard({user,tasks,mentors,onLogout,onRefresh,addToast}){const[search,setSearch]=useState("");const[openTask,setOpenTask]=useState(null)
  const filtered=tasks.filter(t=>{const q=search.toLowerCase();if(!q)return true;return t.title.toLowerCase().includes(q)||(t.responsible?.name||"").toLowerCase().includes(q)||(t.teamMembers||[]).some(m=>m.name.toLowerCase().includes(q))||(t.stages||[]).some(s=>s.title.toLowerCase().includes(q))})
  let totalS=0,doneS=0,progS=0;tasks.forEach(t=>(t.stages||[]).forEach(s=>{totalS++;if(s.status==="completed")doneS++;if(s.status==="progress")progS++}))
  const assigned=tasks.filter(t=>t.responsible).length;const activeTask=openTask?tasks.find(t=>t._id===openTask):null
  return<div style={{minHeight:"100vh"}}><div style={{padding:"14px 26px",borderBottom:"1px solid #1e1e2e",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0a0a14"}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#ff2d00,#cc2400)",display:"flex",alignItems:"center",justifyContent:"center"}}><ClipboardList size={16} color="#fff"/></div>
      <div><h1 style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:600}}>ProjectSpace</h1><p style={{fontSize:10.5,color:"#5c5c78",fontWeight:400}}>Admin Dashboard</p></div></div>
    <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{padding:"5px 12px",borderRadius:7,background:"rgba(255,45,0,.06)",border:"1px solid rgba(255,45,0,.15)",display:"flex",alignItems:"center",gap:5}}><Shield size={12} color="#ff2d00"/><span style={{fontSize:11,fontWeight:600,color:"#ff2d00"}}>Admin</span></div>
      <Avatar name={user.name} size={28}/><span style={{fontSize:12.5,color:"#9898b0",fontWeight:500}}>{user.name}</span><Btn variant="ghost" onClick={onLogout}><LogOut size={14}/></Btn></div></div>
    <div style={{padding:"22px 26px",maxWidth:1140,margin:"0 auto"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:24}}>
        <StatCard icon={ClipboardList} value={tasks.length} label="Tasks"/><StatCard icon={Users} value={assigned} label="Assigned" color="#3b82f6"/><StatCard icon={Clock} value={progS} label="In Progress" color="#f59e0b"/><StatCard icon={CheckCircle2} value={doneS} label="Completed" color="#22c55e"/></div>
      <div style={{marginBottom:22,position:"relative"}}><Search size={15} style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#5c5c78"}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tasks, mentors, stages..." style={{width:"100%",padding:"11px 16px 11px 40px",background:"#10101a",border:"1px solid #1e1e2e",borderRadius:10,color:"#f0eff4",fontSize:13,fontFamily:"var(--font-body)"}}/></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>{filtered.map((t,i)=><TaskCard key={t._id} task={t} index={i} onClick={()=>setOpenTask(t._id)}/>)}</div>
      {filtered.length===0&&<div style={{textAlign:"center",padding:50,color:"#5c5c78"}}><Search size={36} style={{marginBottom:10,opacity:.3}}/><p style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:600}}>No tasks found</p></div>}</div>
    {activeTask&&<TaskDetail task={activeTask} mentors={mentors} onClose={()=>setOpenTask(null)} onUpdate={onRefresh} isAdmin={true} currentUser={user} addToast={addToast}/>}</div>}

function MentorDashboard({user,tasks,mentors,onLogout,onRefresh,addToast}){const[search,setSearch]=useState("");const[openTask,setOpenTask]=useState(null)
  useEffect(()=>{const i=setInterval(onRefresh,30000);return()=>clearInterval(i)},[onRefresh])
  const myTasks=tasks.filter(t=>(t.responsible?.email===user.email)||(t.teamMembers||[]).some(m=>m.email===user.email))
  const filtered=myTasks.filter(t=>{const q=search.toLowerCase();if(!q)return true;return t.title.toLowerCase().includes(q)})
  let totalS=0,doneS=0;myTasks.forEach(t=>(t.stages||[]).forEach(s=>{totalS++;if(s.status==="completed")doneS++}))
  const resp=myTasks.filter(t=>t.responsible?.email===user.email).length;const activeTask=openTask?tasks.find(t=>t._id===openTask):null
  return<div style={{minHeight:"100vh"}}><div style={{padding:"14px 26px",borderBottom:"1px solid #1e1e2e",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0a0a14"}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#3b82f6,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center"}}><ClipboardList size={16} color="#fff"/></div>
      <div><h1 style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:600}}>ProjectSpace</h1><p style={{fontSize:10.5,color:"#5c5c78",fontWeight:400}}>Mentor Portal</p></div></div>
    <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{padding:"5px 12px",borderRadius:7,background:"rgba(59,130,246,.06)",border:"1px solid rgba(59,130,246,.15)",display:"flex",alignItems:"center",gap:5}}><User size={12} color="#3b82f6"/><span style={{fontSize:11,fontWeight:600,color:"#3b82f6"}}>Mentor</span></div>
      <Avatar name={user.name} size={28}/><span style={{fontSize:12.5,color:"#9898b0",fontWeight:500}}>{user.name}</span><Btn variant="ghost" onClick={onLogout}><LogOut size={14}/></Btn></div></div>
    <div style={{padding:"22px 26px",maxWidth:1140,margin:"0 auto"}}>
      <div style={{marginBottom:22,padding:"18px 22px",background:"#10101a",border:"1px solid #1e1e2e",borderRadius:14}}><h2 style={{fontFamily:"var(--font-display)",fontSize:20,fontWeight:600,marginBottom:3}}>Welcome, {user.name}</h2><p style={{color:"#5c5c78",fontSize:13,fontWeight:400}}>{user.email}</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:24}}>
        <StatCard icon={Layers} value={myTasks.length} label="My Tasks"/><StatCard icon={Star} value={resp} label="Responsible" color="#f59e0b"/><StatCard icon={CheckCircle2} value={doneS} label="Completed" color="#22c55e"/><StatCard icon={BarChart3} value={totalS>0?Math.round((doneS/totalS)*100)+"%":"0%"} label="Progress" color="#8b5cf6"/></div>
      <div style={{marginBottom:22,position:"relative"}}><Search size={15} style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#5c5c78"}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tasks..." style={{width:"100%",padding:"11px 16px 11px 40px",background:"#10101a",border:"1px solid #1e1e2e",borderRadius:10,color:"#f0eff4",fontSize:13,fontFamily:"var(--font-body)"}}/></div>
      {filtered.length===0?<div style={{textAlign:"center",padding:50,color:"#5c5c78"}}><Layers size={36} style={{marginBottom:10,opacity:.3}}/><p style={{fontFamily:"var(--font-display)",fontSize:15,fontWeight:600}}>{myTasks.length===0?"No tasks assigned":"No match"}</p></div>
      :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>{filtered.map((t,i)=><TaskCard key={t._id} task={t} index={i} onClick={()=>setOpenTask(t._id)}/>)}</div>}</div>
    {activeTask&&<TaskDetail task={activeTask} mentors={mentors} onClose={()=>setOpenTask(null)} onUpdate={onRefresh} isAdmin={false} currentUser={user} addToast={addToast}/>}</div>}

/* ═══ MAIN ═══ */
export default function App(){const[page,setPage]=useState("landing");const[email,setEmail]=useState("");const[user,setUser]=useState(null);const[tasks,setTasks]=useState([]);const[mentors,setMentors]=useState([]);const[loading,setLoading]=useState(false);const[seeded,setSeeded]=useState(false);const{toasts,addToast}=useToast();const[prefillEmail,setPrefillEmail]=useState("");const[loginRole,setLoginRole]=useState("mentor");const[authMode,setAuthMode]=useState("login")
  const fetchData=useCallback(async()=>{try{const[tR,mR]=await Promise.all([fetch("/api/tasks"),fetch("/api/mentors")]);if(tR.ok)setTasks(await tR.json());if(mR.ok)setMentors(await mR.json())}catch(e){console.error(e)}},[])
  useEffect(()=>{const init=async()=>{if(seeded)return;try{const r=await fetch("/api/tasks");const t=await r.json();if(Array.isArray(t)&&t.length===0){setSeeded(true);await fetch("/api/seed",{method:"POST"});await fetchData()}else{setTasks(t);const m=await fetch("/api/mentors");if(m.ok)setMentors(await m.json());setSeeded(true)}}catch{if(!seeded){setSeeded(true);try{await fetch("/api/seed",{method:"POST"});await fetchData()}catch{}}}};init()},[fetchData,seeded])
  useEffect(()=>{if(page==="admin"||page==="mentor")fetchData()},[page,fetchData])

  const handleCreateSendOTP=async em=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"send-otp",email:em})});const d=await r.json();if(r.ok){setEmail(em);if(d.demo_otp)addToast(`OTP: ${d.demo_otp}`,"warning");else addToast("OTP sent!","success");setPage("otp")}else addToast(d.error,"error")}catch{addToast("Network error","error")};setLoading(false)}
  const handleVerifyOTP=async otp=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"verify-otp",email,otp})});const d=await r.json();if(r.ok){addToast("Verified! Create password.","success");setPage("create-password")}else addToast(d.error,"error")}catch{addToast("Network error","error")};setLoading(false)}
  const handleCreatePassword=async pw=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"create-password",email,password:pw})});const d=await r.json();if(r.ok){addToast("Password created! Login now.","success");setPrefillEmail(email);setAuthMode("login");setPage("login")}else addToast(d.error,"error")}catch{addToast("Network error","error")};setLoading(false)}
  const handleLogin=async(em,pw)=>{setLoading(true);try{const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"login",email:em,password:pw})});const d=await r.json();if(r.ok){const chosenRole=loginRole;const isAdminEmail=ADMIN_EMAILS.includes(em.toLowerCase().trim());if(chosenRole==="admin"&&!isAdminEmail){addToast("This email doesn't have admin access","error");setLoading(false);return}addToast(`Welcome, ${d.mentor.name}!`,"success");setUser({...d.mentor,role:chosenRole});setPrefillEmail("");setPage(chosenRole)}else addToast(d.error,"error")}catch{addToast("Network error","error")};setLoading(false)}
  const handleLogout=()=>{setUser(null);setEmail("");setPrefillEmail("");setLoginRole("mentor");setPage("landing")}
  const goHome=()=>{setEmail("");setPrefillEmail("");setLoginRole("mentor");setPage("landing")}

  return<><Toasts toasts={toasts}/>
    {page==="landing"&&<LandingPage onLogin={()=>{setAuthMode("login");setPage("role-pick")}} onCreateAccount={()=>{setAuthMode("create");setPage("role-pick")}}/>}
    {page==="role-pick"&&<RolePickPage mode={authMode} onPick={r=>{setLoginRole(r);if(authMode==="login")setPage("login");else setPage("create-email")}} onBack={goHome}/>}
    {page==="login"&&<LoginPage onSubmit={handleLogin} onBack={()=>setPage("role-pick")} loading={loading} prefillEmail={prefillEmail} role={loginRole}/>}
    {page==="create-email"&&<CreateEmailPage onSubmit={handleCreateSendOTP} onBack={()=>setPage("role-pick")} loading={loading} role={loginRole}/>}
    {page==="otp"&&<OTPPage email={email} onVerify={handleVerifyOTP} onBack={()=>setPage("create-email")} loading={loading}/>}
    {page==="create-password"&&<CreatePasswordPage email={email} onSubmit={handleCreatePassword} loading={loading}/>}
    {page==="admin"&&user&&<AdminDashboard user={user} tasks={tasks} mentors={mentors} onLogout={handleLogout} onRefresh={fetchData} addToast={addToast}/>}
    {page==="mentor"&&user&&<MentorDashboard user={user} tasks={tasks} mentors={mentors} onLogout={handleLogout} onRefresh={fetchData} addToast={addToast}/>}
  </>}