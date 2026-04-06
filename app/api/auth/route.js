import { getDb } from '@/lib/mongodb'
import { sendOTPEmail } from '@/lib/mailer'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const ADMIN_EMAILS = [
  'harshavardhini.j@adityauniversity.in',
  'babji@aec.edu.in',
  'harshavardhini@technicalhub.io',
]

export async function POST(request) {
  try {
    const { action, email, otp } = await request.json()
    const db = await getDb()

    if (action === 'send-otp') {
      const emailLower = email.toLowerCase()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) return NextResponse.json({ error: 'Email not found in system' }, { status: 404 })

      const code = crypto.randomInt(100000, 999999).toString()
      await db.collection('task_otps').deleteMany({ email: emailLower })
      await db.collection('task_otps').insertOne({ email: emailLower, otp: code, createdAt: new Date() })

      const emailSent = await sendOTPEmail(emailLower, mentor.name, code)
      const isAdmin = ADMIN_EMAILS.includes(emailLower)

      return NextResponse.json({
        message: 'OTP sent',
        mentor: { name: mentor.name, email: mentor.email },
        isAdmin,
        emailSent,
        demo_otp: code
      })
    }

    if (action === 'verify-otp') {
      const emailLower = email.toLowerCase()
      const record = await db.collection('task_otps').findOne({ email: emailLower, otp })
      if (!record) return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 })

      await db.collection('task_otps').deleteMany({ email: emailLower })
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      const isAdmin = ADMIN_EMAILS.includes(emailLower)

      return NextResponse.json({ message: 'Verified', mentor, isAdmin })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}