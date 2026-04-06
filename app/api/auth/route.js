import { getDb } from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const ADMIN_EMAILS = [
  'harshavardhini.j@adityauniversity.in',
  'babji@aec.edu.in',
  'harshavardhini@technicalhub.io'
]

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(req) {
  try {
    const db = await getDb()
    const body = await req.json()
    const { action } = body

    // ── REGISTER ──
    if (action === 'register') {
      const { email, password, name } = body
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
      }
      const mentors = db.collection('task_mentors')
      const existing = await mentors.findOne({ email: email.toLowerCase().trim() })
      if (!existing) {
        return NextResponse.json({ error: 'Email not found in mentor list. Contact admin.' }, { status: 404 })
      }
      if (existing.passwordHash) {
        return NextResponse.json({ error: 'Account already registered. Please login.' }, { status: 409 })
      }
      await mentors.updateOne(
        { email: email.toLowerCase().trim() },
        { $set: { passwordHash: hashPassword(password), registeredAt: new Date() } }
      )
      const role = ADMIN_EMAILS.includes(email.toLowerCase().trim()) ? 'admin' : 'mentor'
      return NextResponse.json({ 
        success: true, 
        mentor: { name: existing.name, email: existing.email, role },
        message: 'Account created successfully!' 
      })
    }

    // ── LOGIN ──
    if (action === 'login') {
      const { email, password } = body
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
      }
      const mentors = db.collection('task_mentors')
      const mentor = await mentors.findOne({ email: email.toLowerCase().trim() })
      if (!mentor) {
        return NextResponse.json({ error: 'Email not found. Check your email or contact admin.' }, { status: 404 })
      }
      if (!mentor.passwordHash) {
        return NextResponse.json({ error: 'Account not registered yet. Please create account first.' }, { status: 403 })
      }
      if (mentor.passwordHash !== hashPassword(password)) {
        return NextResponse.json({ error: 'Incorrect password. Try again.' }, { status: 401 })
      }
      const role = ADMIN_EMAILS.includes(email.toLowerCase().trim()) ? 'admin' : 'mentor'
      return NextResponse.json({ 
        success: true, 
        mentor: { name: mentor.name, email: mentor.email, role } 
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    console.error('Auth error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}