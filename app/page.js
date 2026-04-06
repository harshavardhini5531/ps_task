"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { LogIn, UserPlus, LogOut, Search, Plus, Trash2, Edit3, Check, X, ChevronDown, ChevronRight, Bell, Users, ClipboardList, BarChart3, Layers, Shield, Eye, EyeOff, Mail, Lock, User, CheckCircle2, Circle, AlertCircle, Zap, Settings, MessageSquare, Clock, ArrowLeft, Save, Star } from "lucide-react"

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */
const ADMIN_EMAILS = [
  "harshavardhini.j@adityauniversity.in",
  "babji@aec.edu.in",
  "harshavardhini@technicalhub.io"
]

const CARD_COLORS = [
  { bg: "rgba(255,45,0,.08)", border: "rgba(255,45,0,.25)", accent: "#ff2d00" },
  { bg: "rgba(59,130,246,.08)", border: "rgba(59,130,246,.25)", accent: "#3b82f6" },
  { bg: "rgba(245,158,11,.08)", border: "rgba(245,158,11,.25)", accent: "#f59e0b" },
  { bg: "rgba(16,185,129,.08)", border: "rgba(16,185,129,.25)", accent: "#10b981" },
  { bg: "rgba(139,92,246,.08)", border: "rgba(139,92,246,.25)", accent: "#8b5cf6" },
  { bg: "rgba(236,72,153,.08)", border: "rgba(236,72,153,.25)", accent: "#ec4899" },
  { bg: "rgba(6,182,212,.08)", border: "rgba(6,182,212,.25)", accent: "#06b6d4" },
  { bg: "rgba(249,115,22,.08)", border: "rgba(249,115,22,.25)", accent: "#f97316" },
]

/* ═══════════════════════════════════════════════════════════════════
   TOAST SYSTEM
   ═══════════════════════════════════════════════════════════════════ */
function useToast() {
  const [toasts, setToasts] = useState([])
  const add = useCallback((msg, type = "info") => {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000)
  }, [])
  return { toasts, addToast: add }
}

function Toasts({ toasts }) {
  const colors = { success: { bg: "#0a1f0a", color: "#4ade80", border: "#16a34a" }, error: { bg: "#1f0a0a", color: "#f87171", border: "#dc2626" }, info: { bg: "#0a0a1f", color: "#60a5fa", border: "#2563eb" }, warning: { bg: "#1f1a0a", color: "#fbbf24", border: "#d97706" } }
  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => {
        const c = colors[t.type] || colors.info
        return (
          <div key={t.id} style={{ animation: "toastIn .3s ease", padding: "12px 18px", borderRadius: 12, background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontSize: 13, fontWeight: 600, maxWidth: 340, display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)" }}>
            {t.type === "success" ? <CheckCircle2 size={16} /> : t.type === "error" ? <AlertCircle size={16} /> : <Bell size={16} />}
            {t.msg}
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */
function Btn({ children, variant = "primary", onClick, style = {}, disabled = false }) {
  const base = { padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .2s", border: "none", opacity: disabled ? 0.5 : 1, fontFamily: "var(--font-body)" }
  const variants = {
    primary: { background: "#ff2d00", color: "#fff", boxShadow: "0 4px 16px rgba(255,45,0,.3)" },
    secondary: { background: "transparent", color: "#9898b0", border: "1px solid #2e2e42" },
    danger: { background: "rgba(239,68,68,.1)", color: "#f87171", border: "1px solid rgba(239,68,68,.3)" },
    success: { background: "rgba(34,197,94,.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,.3)" },
    ghost: { background: "transparent", color: "#9898b0", padding: "8px 14px" },
  }
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}>{children}</button>
}

function Input({ label, icon: Icon, type = "text", value, onChange, placeholder, onKeyDown }) {
  const [show, setShow] = useState(false)
  const isPass = type === "password"
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9898b0", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "var(--font-body)" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        {Icon && <Icon size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#5c5c78" }} />}
        <input
          type={isPass && !show ? "password" : "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          style={{ width: "100%", padding: "14px 18px", paddingLeft: Icon ? 42 : 18, paddingRight: isPass ? 42 : 18, background: "#0c0c18", border: "1px solid #1e1e2e", borderRadius: 12, color: "#f0eff4", fontSize: 14, fontFamily: "var(--font-body)" }}
        />
        {isPass && (
          <button onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#5c5c78", padding: 4 }}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  )
}

function ProgressBar({ done, total, color = "#ff2d00" }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,.06)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width .5s ease" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 36, textAlign: "right" }}>{pct}%</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════════════════════════ */
function LandingPage({ onLogin, onRegister }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "-20%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,45,0,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="fade-up" style={{ textAlign: "center", maxWidth: 520, padding: 40 }}>
        {/* Logo */}
        <div style={{ width: 80, height: 80, borderRadius: 22, background: "linear-gradient(135deg, #ff2d00, #ff6b3d)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 12px 40px rgba(255,45,0,.2)" }}>
          <ClipboardList size={36} color="#fff" strokeWidth={2} />
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 800, marginBottom: 8, letterSpacing: -1, lineHeight: 1.1 }}>
          Project<span style={{ color: "#ff2d00" }}>Space</span>
        </h1>
        <p style={{ fontSize: 16, color: "#9898b0", marginBottom: 44, lineHeight: 1.6, fontWeight: 400 }}>
          Task Monitoring & Coordination Platform
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={onLogin} style={{ padding: "16px 36px", fontSize: 15 }}>
            <LogIn size={18} /> Login
          </Btn>
          <Btn variant="secondary" onClick={onRegister} style={{ padding: "16px 36px", fontSize: 15 }}>
            <UserPlus size={18} /> Create Account
          </Btn>
        </div>

        <p style={{ marginTop: 32, fontSize: 12, color: "#5c5c78" }}>
          Aditya University &middot; ProjectSpace 2026
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   REGISTER PAGE
   ═══════════════════════════════════════════════════════════════════ */
function RegisterPage({ onSubmit, onBack, loading }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const handle = () => {
    setError("")
    if (!email || !password) return setError("All fields are required")
    if (password.length < 6) return setError("Password must be at least 6 characters")
    if (password !== confirm) return setError("Passwords do not match")
    onSubmit(email.trim().toLowerCase(), password)
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="fade-up" style={{ background: "#10101a", border: "1px solid #1e1e2e", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 440, boxShadow: "0 24px 64px rgba(0,0,0,.5)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <UserPlus size={26} color="#fff" />
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 4 }}>Create Account</h2>
        <p style={{ textAlign: "center", color: "#9898b0", fontSize: 13, marginBottom: 32 }}>Use your registered mentor email</p>

        {error && <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#f87171", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><AlertCircle size={14} />{error}</div>}

        <Input label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="your.email@adityauniversity.in" onKeyDown={e => e.key === "Enter" && handle()} />
        <Input label="Password" icon={Lock} type="password" value={password} onChange={setPassword} placeholder="Min 6 characters" onKeyDown={e => e.key === "Enter" && handle()} />
        <Input label="Confirm Password" icon={Lock} type="password" value={confirm} onChange={setConfirm} placeholder="Re-enter password" onKeyDown={e => e.key === "Enter" && handle()} />

        <Btn onClick={handle} disabled={loading} style={{ width: "100%", justifyContent: "center", padding: 16, fontSize: 15 }}>
          {loading ? "Creating..." : <><UserPlus size={18} /> Create Account</>}
        </Btn>
        <button onClick={onBack} style={{ width: "100%", marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid #1e1e2e", background: "transparent", color: "#9898b0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>
          <ArrowLeft size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />Back to Home
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
function LoginPage({ onSubmit, onBack, loading }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handle = () => {
    setError("")
    if (!email || !password) return setError("Email and password required")
    onSubmit(email.trim().toLowerCase(), password)
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="fade-up" style={{ background: "#10101a", border: "1px solid #1e1e2e", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 440, boxShadow: "0 24px 64px rgba(0,0,0,.5)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #ff2d00, #ff6b3d)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <LogIn size={26} color="#fff" />
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 4 }}>Welcome Back</h2>
        <p style={{ textAlign: "center", color: "#9898b0", fontSize: 13, marginBottom: 32 }}>Login with your credentials</p>

        {error && <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#f87171", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><AlertCircle size={14} />{error}</div>}

        <Input label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="your.email@adityauniversity.in" onKeyDown={e => e.key === "Enter" && handle()} />
        <Input label="Password" icon={Lock} type="password" value={password} onChange={setPassword} placeholder="Enter your password" onKeyDown={e => e.key === "Enter" && handle()} />

        <Btn onClick={handle} disabled={loading} style={{ width: "100%", justifyContent: "center", padding: 16, fontSize: 15 }}>
          {loading ? "Logging in..." : <><LogIn size={18} /> Login</>}
        </Btn>
        <button onClick={onBack} style={{ width: "100%", marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid #1e1e2e", background: "transparent", color: "#9898b0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>
          <ArrowLeft size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />Back to Home
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   TASK CARD
   ═══════════════════════════════════════════════════════════════════ */
function TaskCard({ task, index, onClick }) {
  const c = CARD_COLORS[index % CARD_COLORS.length]
  const done = (task.stages || []).filter(s => s.status === "done").length
  const total = (task.stages || []).length

  return (
    <div onClick={onClick} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", cursor: "pointer", transition: "all .2s", position: "relative" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.border}` }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#f0eff4", lineHeight: 1.3, flex: 1, paddingRight: 10 }}>{task.title}</h3>
        <div style={{ background: c.accent, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap" }}>
          {done}/{total}
        </div>
      </div>

      <ProgressBar done={done} total={total} color={c.accent} />

      {task.responsible && (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 8, background: `${c.accent}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={12} color={c.accent} />
          </div>
          <span style={{ fontSize: 12, color: "#9898b0", fontWeight: 500 }}>{task.responsible.name}</span>
        </div>
      )}

      {!task.responsible && (
        <div style={{ marginTop: 12, fontSize: 12, color: "#5c5c78", fontStyle: "italic" }}>Unassigned</div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   TASK MODAL (full detail view)
   ═══════════════════════════════════════════════════════════════════ */
function TaskModal({ task, onClose, mentors, onUpdate, isAdmin, currentUser, addToast }) {
  const [editTask, setEditTask] = useState({ ...task })
  const [newStage, setNewStage] = useState("")
  const [editStageIdx, setEditStageIdx] = useState(-1)
  const [editStageTitle, setEditStageTitle] = useState("")
  const [stageComment, setStageComment] = useState({})
  const [saving, setSaving] = useState(false)

  const canEdit = isAdmin || (task.responsible && task.responsible.email === currentUser?.email)

  const saveTask = async (updated) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      })
      if (res.ok) {
        onUpdate()
        addToast("Task updated", "success")
      } else {
        addToast("Failed to update", "error")
      }
    } catch { addToast("Network error", "error") }
    setSaving(false)
  }

  const assignResponsible = (email) => {
    const m = mentors.find(x => x.email === email)
    if (!m) return
    const updated = { ...editTask, responsible: { name: m.name, email: m.email } }
    setEditTask(updated)
    saveTask(updated)
  }

  const addTeamMember = (email) => {
    const m = mentors.find(x => x.email === email)
    if (!m || editTask.teamMembers?.find(t => t.email === email)) return
    const updated = { ...editTask, teamMembers: [...(editTask.teamMembers || []), { name: m.name, email: m.email }] }
    setEditTask(updated)
    saveTask(updated)
  }

  const removeTeamMember = (email) => {
    const updated = { ...editTask, teamMembers: (editTask.teamMembers || []).filter(t => t.email !== email) }
    setEditTask(updated)
    saveTask(updated)
  }

  const toggleStage = (idx) => {
    if (!canEdit) return
    const stages = [...(editTask.stages || [])]
    stages[idx] = {
      ...stages[idx],
      status: stages[idx].status === "done" ? "pending" : "done",
      completedAt: stages[idx].status === "done" ? null : new Date().toISOString(),
      comment: stageComment[idx] || stages[idx].comment || ""
    }
    const updated = { ...editTask, stages }
    setEditTask(updated)
    saveTask(updated)
  }

  const addStage = () => {
    if (!newStage.trim() || !canEdit) return
    const stages = [...(editTask.stages || []), { title: newStage.trim(), status: "pending", comment: "", completedAt: null, order: (editTask.stages || []).length }]
    const updated = { ...editTask, stages }
    setEditTask(updated)
    saveTask(updated)
    setNewStage("")
  }

  const deleteStage = (idx) => {
    if (!canEdit) return
    const stages = (editTask.stages || []).filter((_, i) => i !== idx)
    const updated = { ...editTask, stages }
    setEditTask(updated)
    saveTask(updated)
  }

  const startEditStage = (idx) => {
    setEditStageIdx(idx)
    setEditStageTitle(editTask.stages[idx].title)
  }

  const saveEditStage = () => {
    if (!editStageTitle.trim()) return
    const stages = [...(editTask.stages || [])]
    stages[editStageIdx] = { ...stages[editStageIdx], title: editStageTitle.trim() }
    const updated = { ...editTask, stages }
    setEditTask(updated)
    saveTask(updated)
    setEditStageIdx(-1)
  }

  const done = (editTask.stages || []).filter(s => s.status === "done").length
  const total = (editTask.stages || []).length

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div className="scale-in" onClick={e => e.stopPropagation()} style={{ background: "#10101a", border: "1px solid #1e1e2e", borderRadius: 24, width: "100%", maxWidth: 640, maxHeight: "85vh", overflow: "auto", boxShadow: "0 32px 80px rgba(0,0,0,.6)" }}>
        {/* Header */}
        <div style={{ padding: "28px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{editTask.title}</h2>
            <ProgressBar done={done} total={total} />
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.05)", border: "1px solid #2e2e42", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#9898b0", flexShrink: 0, marginLeft: 12 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: "20px 28px 28px" }}>
          {/* Responsible & Team (Admin only) */}
          {isAdmin && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9898b0", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1.5 }}>Responsible</label>
                  <select value={editTask.responsible?.email || ""} onChange={e => assignResponsible(e.target.value)} style={{ width: "100%", padding: "10px 12px", background: "#0c0c18", border: "1px solid #1e1e2e", borderRadius: 10, color: "#f0eff4", fontSize: 13, fontFamily: "var(--font-body)" }}>
                    <option value="">Select mentor...</option>
                    {mentors.map(m => <option key={m.email} value={m.email}>{m.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9898b0", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1.5 }}>Add Team Member</label>
                  <select value="" onChange={e => addTeamMember(e.target.value)} style={{ width: "100%", padding: "10px 12px", background: "#0c0c18", border: "1px solid #1e1e2e", borderRadius: 10, color: "#f0eff4", fontSize: 13, fontFamily: "var(--font-body)" }}>
                    <option value="">Add member...</option>
                    {mentors.filter(m => !(editTask.teamMembers || []).find(t => t.email === m.email)).map(m => <option key={m.email} value={m.email}>{m.name}</option>)}
                  </select>
                </div>
              </div>

              {(editTask.teamMembers || []).length > 0 && (
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {editTask.teamMembers.map(m => (
                    <div key={m.email} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "rgba(255,255,255,.04)", border: "1px solid #1e1e2e", borderRadius: 8, fontSize: 12, color: "#9898b0" }}>
                      <User size={11} />{m.name}
                      <button onClick={() => removeTeamMember(m.email)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5c5c78", padding: 0, display: "flex" }}><X size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Responsible info for mentor view */}
          {!isAdmin && editTask.responsible && (
            <div style={{ marginBottom: 20, padding: "10px 14px", background: "rgba(255,255,255,.03)", borderRadius: 10, border: "1px solid #1e1e2e", display: "flex", alignItems: "center", gap: 10 }}>
              <Shield size={14} color="#ff2d00" />
              <span style={{ fontSize: 13, color: "#9898b0" }}>Responsible: <strong style={{ color: "#f0eff4" }}>{editTask.responsible.name}</strong></span>
            </div>
          )}

          {/* Stages */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#9898b0", textTransform: "uppercase", letterSpacing: 1 }}>Stages ({done}/{total})</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {(editTask.stages || []).map((stage, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: stage.status === "done" ? "rgba(34,197,94,.06)" : "rgba(255,255,255,.02)", border: `1px solid ${stage.status === "done" ? "rgba(34,197,94,.2)" : "#1e1e2e"}`, borderRadius: 12, transition: "all .2s" }}>
                  {canEdit && (
                    <button onClick={() => toggleStage(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: stage.status === "done" ? "#22c55e" : "#5c5c78", flexShrink: 0, display: "flex", padding: 0 }}>
                      {stage.status === "done" ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                  )}
                  {!canEdit && (
                    <span style={{ color: stage.status === "done" ? "#22c55e" : "#5c5c78", flexShrink: 0, display: "flex" }}>
                      {stage.status === "done" ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </span>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {editStageIdx === idx ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <input value={editStageTitle} onChange={e => setEditStageTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && saveEditStage()} style={{ flex: 1, padding: "6px 10px", background: "#0c0c18", border: "1px solid #2e2e42", borderRadius: 8, color: "#f0eff4", fontSize: 13, fontFamily: "var(--font-body)" }} autoFocus />
                        <button onClick={saveEditStage} style={{ background: "none", border: "none", cursor: "pointer", color: "#22c55e", display: "flex" }}><Check size={16} /></button>
                        <button onClick={() => setEditStageIdx(-1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5c5c78", display: "flex" }}><X size={16} /></button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 14, fontWeight: 600, color: stage.status === "done" ? "#9898b0" : "#f0eff4", textDecoration: stage.status === "done" ? "line-through" : "none" }}>{stage.title}</span>
                    )}
                    {stage.comment && <p style={{ fontSize: 11, color: "#5c5c78", marginTop: 3 }}>{stage.comment}</p>}
                    {stage.completedAt && <p style={{ fontSize: 10, color: "#3a3a52", marginTop: 2 }}><Clock size={9} style={{ verticalAlign: "middle", marginRight: 3 }} />{new Date(stage.completedAt).toLocaleString()}</p>}
                  </div>

                  {canEdit && editStageIdx !== idx && (
                    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                      <button onClick={() => startEditStage(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5c5c78", display: "flex", padding: 4 }}><Edit3 size={13} /></button>
                      <button onClick={() => deleteStage(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5c5c78", display: "flex", padding: 4 }}><Trash2 size={13} /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add comment to stage before toggling */}
            {canEdit && (editTask.stages || []).some(s => s.status === "pending") && (
              <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(255,255,255,.02)", borderRadius: 10, border: "1px solid #1e1e2e" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#5c5c78", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, display: "block" }}>Stage Comment (optional)</label>
                {(editTask.stages || []).map((s, i) => s.status === "pending" ? (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <span style={{ fontSize: 12, color: "#9898b0", minWidth: 120 }}>{s.title}:</span>
                    <input value={stageComment[i] || ""} onChange={e => setStageComment({ ...stageComment, [i]: e.target.value })} placeholder="Add note..." style={{ flex: 1, padding: "6px 10px", background: "#0c0c18", border: "1px solid #1e1e2e", borderRadius: 8, color: "#f0eff4", fontSize: 12, fontFamily: "var(--font-body)" }} />
                  </div>
                ) : null)}
              </div>
            )}

            {/* Add new stage */}
            {canEdit && (
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <input value={newStage} onChange={e => setNewStage(e.target.value)} onKeyDown={e => e.key === "Enter" && addStage()} placeholder="Add new stage..." style={{ flex: 1, padding: "10px 14px", background: "#0c0c18", border: "1px solid #1e1e2e", borderRadius: 10, color: "#f0eff4", fontSize: 13, fontFamily: "var(--font-body)" }} />
                <Btn onClick={addStage} style={{ padding: "10px 16px" }}><Plus size={16} /> Add</Btn>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   ADD TASK MODAL (Admin only)
   ═══════════════════════════════════════════════════════════════════ */
function AddTaskModal({ onClose, onAdd, addToast }) {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    if (!title.trim()) return addToast("Enter a task title", "warning")
    setLoading(true)
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() })
      })
      if (res.ok) {
        addToast(`Task "${title.trim()}" created!`, "success")
        onAdd()
        onClose()
      } else {
        addToast("Failed to create task", "error")
      }
    } catch { addToast("Network error", "error") }
    setLoading(false)
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div className="scale-in" onClick={e => e.stopPropagation()} style={{ background: "#10101a", border: "1px solid #1e1e2e", borderRadius: 24, padding: "36px 32px", width: "100%", maxWidth: 460, boxShadow: "0 32px 80px rgba(0,0,0,.6)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Add New Task</h2>
        <p style={{ color: "#5c5c78", fontSize: 13, marginBottom: 24 }}>Stages will be auto-generated based on the task title</p>

        <Input label="Task Title" icon={ClipboardList} value={title} onChange={setTitle} placeholder="e.g. Stage Decoration" onKeyDown={e => e.key === "Enter" && handle()} />

        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={handle} disabled={loading} style={{ flex: 1, justifyContent: "center" }}>
            {loading ? "Creating..." : <><Plus size={16} /> Create Task</>}
          </Btn>
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   STAT CARD
   ═══════════════════════════════════════════════════════════════════ */
function StatCard({ icon: Icon, value, label, color = "#ff2d00" }) {
  return (
    <div style={{ background: "#10101a", border: "1px solid #1e1e2e", borderRadius: 16, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color }}>{value}</div>
          <div style={{ fontSize: 11, color: "#5c5c78", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginTop: 2 }}>{label}</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}11`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={color} />
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   ADMIN DASHBOARD
   ═══════════════════════════════════════════════════════════════════ */
function AdminDashboard({ user, tasks, mentors, onLogout, onRefresh, addToast }) {
  const [search, setSearch] = useState("")
  const [openTask, setOpenTask] = useState(null)
  const [showAddTask, setShowAddTask] = useState(false)

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase()
    if (!q) return true
    return t.title.toLowerCase().includes(q) || (t.responsible?.name || "").toLowerCase().includes(q) || (t.responsible?.email || "").toLowerCase().includes(q) || (t.teamMembers || []).some(m => m.name.toLowerCase().includes(q))
  })

  const totalStages = tasks.reduce((a, t) => a + (t.stages || []).length, 0)
  const doneStages = tasks.reduce((a, t) => a + (t.stages || []).filter(s => s.status === "done").length, 0)
  const assignedTasks = tasks.filter(t => t.responsible).length

  const activeTask = openTask ? tasks.find(t => t._id === openTask) : null

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top Bar */}
      <div style={{ padding: "16px 28px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0a0a14" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #ff2d00, #ff6b3d)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ClipboardList size={18} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800 }}>ProjectSpace</h1>
            <p style={{ fontSize: 11, color: "#5c5c78" }}>Admin Dashboard</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(255,45,0,.08)", border: "1px solid rgba(255,45,0,.2)", display: "flex", alignItems: "center", gap: 6 }}>
            <Shield size={13} color="#ff2d00" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#ff2d00" }}>Admin</span>
          </div>
          <span style={{ fontSize: 13, color: "#9898b0", fontWeight: 600 }}>{user.name}</span>
          <Btn variant="ghost" onClick={onLogout} style={{ padding: "8px 12px" }}><LogOut size={15} /></Btn>
        </div>
      </div>

      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
          <StatCard icon={ClipboardList} value={tasks.length} label="Total Tasks" />
          <StatCard icon={Users} value={assignedTasks} label="Assigned" color="#3b82f6" />
          <StatCard icon={CheckCircle2} value={doneStages} label="Stages Done" color="#22c55e" />
          <StatCard icon={BarChart3} value={totalStages > 0 ? Math.round((doneStages / totalStages) * 100) + "%" : "0%"} label="Progress" color="#f59e0b" />
        </div>

        {/* Search + Add */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#5c5c78" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by task name, mentor name..." style={{ width: "100%", padding: "12px 18px 12px 42px", background: "#10101a", border: "1px solid #1e1e2e", borderRadius: 12, color: "#f0eff4", fontSize: 14, fontFamily: "var(--font-body)" }} />
          </div>
          <Btn onClick={() => setShowAddTask(true)}><Plus size={16} /> Add Task</Btn>
        </div>

        {/* Task Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {filtered.map((task, i) => (
            <TaskCard key={task._id} task={task} index={i} onClick={() => setOpenTask(task._id)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "#5c5c78" }}>
            <Search size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700 }}>No tasks found</p>
          </div>
        )}
      </div>

      {activeTask && <TaskModal task={activeTask} onClose={() => setOpenTask(null)} mentors={mentors} onUpdate={onRefresh} isAdmin={true} currentUser={user} addToast={addToast} />}
      {showAddTask && <AddTaskModal onClose={() => setShowAddTask(false)} onAdd={onRefresh} addToast={addToast} />}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MENTOR DASHBOARD
   ═══════════════════════════════════════════════════════════════════ */
function MentorDashboard({ user, tasks, mentors, onLogout, onRefresh, addToast }) {
  const [search, setSearch] = useState("")
  const [openTask, setOpenTask] = useState(null)

  const myTasks = tasks.filter(t =>
    (t.responsible?.email === user.email) ||
    (t.teamMembers || []).some(m => m.email === user.email)
  )

  const filtered = myTasks.filter(t => {
    const q = search.toLowerCase()
    if (!q) return true
    return t.title.toLowerCase().includes(q)
  })

  const totalStages = myTasks.reduce((a, t) => a + (t.stages || []).length, 0)
  const doneStages = myTasks.reduce((a, t) => a + (t.stages || []).filter(s => s.status === "done").length, 0)
  const responsible = myTasks.filter(t => t.responsible?.email === user.email).length

  const activeTask = openTask ? tasks.find(t => t._id === openTask) : null

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top Bar */}
      <div style={{ padding: "16px 28px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0a0a14" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #ff2d00, #ff6b3d)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ClipboardList size={18} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800 }}>ProjectSpace</h1>
            <p style={{ fontSize: 11, color: "#5c5c78" }}>Mentor Portal</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(59,130,246,.08)", border: "1px solid rgba(59,130,246,.2)", display: "flex", alignItems: "center", gap: 6 }}>
            <User size={13} color="#3b82f6" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6" }}>Mentor</span>
          </div>
          <span style={{ fontSize: 13, color: "#9898b0", fontWeight: 600 }}>{user.name}</span>
          <Btn variant="ghost" onClick={onLogout} style={{ padding: "8px 12px" }}><LogOut size={15} /></Btn>
        </div>
      </div>

      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Welcome */}
        <div style={{ marginBottom: 24, padding: "20px 24px", background: "#10101a", border: "1px solid #1e1e2e", borderRadius: 16 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Welcome, {user.name}</h2>
          <p style={{ color: "#5c5c78", fontSize: 14 }}>{user.email}</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
          <StatCard icon={Layers} value={myTasks.length} label="My Tasks" />
          <StatCard icon={Star} value={responsible} label="Responsible" color="#f59e0b" />
          <StatCard icon={CheckCircle2} value={doneStages} label="Stages Done" color="#22c55e" />
          <StatCard icon={BarChart3} value={totalStages > 0 ? Math.round((doneStages / totalStages) * 100) + "%" : "0%"} label="Progress" color="#8b5cf6" />
        </div>

        {/* Search */}
        <div style={{ marginBottom: 24, position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#5c5c78" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your tasks..." style={{ width: "100%", padding: "12px 18px 12px 42px", background: "#10101a", border: "1px solid #1e1e2e", borderRadius: 12, color: "#f0eff4", fontSize: 14, fontFamily: "var(--font-body)" }} />
        </div>

        {/* Tasks */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#5c5c78" }}>
            <Layers size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700 }}>
              {myTasks.length === 0 ? "No tasks assigned yet" : "No matching tasks"}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {filtered.map((task, i) => (
              <TaskCard key={task._id} task={task} index={i} onClick={() => setOpenTask(task._id)} />
            ))}
          </div>
        )}
      </div>

      {activeTask && <TaskModal task={activeTask} onClose={() => setOpenTask(null)} mentors={mentors} onUpdate={onRefresh} isAdmin={false} currentUser={user} addToast={addToast} />}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("landing")
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const { toasts, addToast } = useToast()

  const fetchData = useCallback(async () => {
    try {
      const [tRes, mRes] = await Promise.all([fetch("/api/tasks"), fetch("/api/mentors")])
      if (tRes.ok) setTasks(await tRes.json())
      if (mRes.ok) setMentors(await mRes.json())
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }, [])

  // Auto-seed on first load
  useEffect(() => {
    const init = async () => {
      try {
        const tRes = await fetch("/api/tasks")
        const t = await tRes.json()
        if (Array.isArray(t) && t.length === 0 && !seeded) {
          setSeeded(true)
          await fetch("/api/seed", { method: "POST" })
          await fetchData()
        } else {
          setTasks(t)
          const mRes = await fetch("/api/mentors")
          if (mRes.ok) setMentors(await mRes.json())
        }
      } catch {
        // DB not ready yet, try seed
        if (!seeded) {
          setSeeded(true)
          try {
            await fetch("/api/seed", { method: "POST" })
            await fetchData()
          } catch {}
        }
      }
    }
    init()
  }, [fetchData, seeded])

  // Refresh on page change to dashboard
  useEffect(() => {
    if (page === "admin" || page === "mentor") fetchData()
  }, [page, fetchData])

  const handleRegister = async (email, password) => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", email, password })
      })
      const data = await res.json()
      if (res.ok) {
        addToast("Account created! Logging you in...", "success")
        setUser(data.mentor)
        setPage(data.mentor.role === "admin" ? "admin" : "mentor")
      } else {
        addToast(data.error, "error")
      }
    } catch { addToast("Network error", "error") }
    setLoading(false)
  }

  const handleLogin = async (email, password) => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password })
      })
      const data = await res.json()
      if (res.ok) {
        addToast(`Welcome, ${data.mentor.name}!`, "success")
        setUser(data.mentor)
        setPage(data.mentor.role === "admin" ? "admin" : "mentor")
      } else {
        addToast(data.error, "error")
      }
    } catch { addToast("Network error", "error") }
    setLoading(false)
  }

  const handleLogout = () => {
    setUser(null)
    setPage("landing")
  }

  return (
    <>
      <Toasts toasts={toasts} />
      {page === "landing" && <LandingPage onLogin={() => setPage("login")} onRegister={() => setPage("register")} />}
      {page === "register" && <RegisterPage onSubmit={handleRegister} onBack={() => setPage("landing")} loading={loading} />}
      {page === "login" && <LoginPage onSubmit={handleLogin} onBack={() => setPage("landing")} loading={loading} />}
      {page === "admin" && user && <AdminDashboard user={user} tasks={tasks} mentors={mentors} onLogout={handleLogout} onRefresh={fetchData} addToast={addToast} />}
      {page === "mentor" && user && <MentorDashboard user={user} tasks={tasks} mentors={mentors} onLogout={handleLogout} onRefresh={fetchData} addToast={addToast} />}
    </>
  )
}