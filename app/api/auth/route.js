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

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendOTPEmail(email, otp, name) {
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = process.env.SMTP_PORT || '587'
  const smtpFrom = process.env.SMTP_FROM || smtpUser

  console.log('=== EMAIL DEBUG ===')
  console.log('SMTP_HOST:', smtpHost)
  console.log('SMTP_PORT:', smtpPort)
  console.log('SMTP_USER:', smtpUser ? smtpUser : 'NOT SET')
  console.log('SMTP_PASS:', smtpPass ? '****SET****' : 'NOT SET')
  console.log('SMTP_FROM:', smtpFrom)
  console.log('Sending to:', email)
  console.log('===================')

  if (!smtpUser || !smtpPass) {
    console.error('SMTP credentials not configured - SMTP_USER or SMTP_PASS is missing')
    return false
  }

  try {
    const nodemailer = (await import('nodemailer')).default

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify connection first
    await transporter.verify()
    console.log('SMTP connection verified successfully')

    const info = await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: 'ProjectSpace - Your Login OTP',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0a0a14;color:#f0eff4;border-radius:16px">
          <h2 style="color:#ff2d00;margin:0 0 8px">ProjectSpace</h2>
          <p style="color:#9898b0;margin:0 0 24px">Task Monitoring Platform</p>
          <p>Hi ${name},</p>
          <p>Your one-time verification code is:</p>
          <div style="background:#161624;border:2px solid #ff2d00;border-radius:12px;padding:20px;text-align:center;margin:20px 0">
            <span style="font-size:36px;font-weight:800;letter-spacing:8px;color:#ff2d00">${otp}</span>
          </div>
          <p style="color:#5c5c78;font-size:13px">This code expires in 10 minutes. Do not share it with anyone.</p>
        </div>
      `,
    })

    console.log('Email sent successfully! MessageId:', info.messageId)
    return true
  } catch (err) {
    console.error('=== EMAIL SEND FAILED ===')
    console.error('Error name:', err.name)
    console.error('Error message:', err.message)
    console.error('Error code:', err.code)
    console.error('Full error:', err)
    console.error('=========================')
    return false
  }
}

export async function POST(req) {
  try {
    const db = await getDb()
    const body = await req.json()
    const { action } = body

    // ── SEND OTP ──
    if (action === 'send-otp') {
      const { email } = body
      if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

      const emailLower = email.toLowerCase().trim()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) {
        return NextResponse.json({ error: 'Email not found in mentor list. Contact admin.' }, { status: 404 })
      }

      const otp = generateOTP()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

      await db.collection('task_otps').deleteMany({ email: emailLower })
      await db.collection('task_otps').insertOne({ email: emailLower, otp, expiresAt, createdAt: new Date() })

      const emailSent = await sendOTPEmail(emailLower, otp, mentor.name)

      if (emailSent) {
        return NextResponse.json({
          success: true,
          message: 'OTP sent to your email',
          hasPassword: !!mentor.passwordHash,
        })
      } else {
        return NextResponse.json({
          success: true,
          message: 'OTP generated (email service unavailable)',
          demo_otp: otp,
          hasPassword: !!mentor.passwordHash,
        })
      }
    }

    // ── VERIFY OTP ──
    if (action === 'verify-otp') {
      const { email, otp } = body
      if (!email || !otp) return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 })

      const emailLower = email.toLowerCase().trim()
      const record = await db.collection('task_otps').findOne({ email: emailLower })

      if (!record) return NextResponse.json({ error: 'No OTP found. Request a new one.' }, { status: 404 })
      if (record.otp !== otp) return NextResponse.json({ error: 'Invalid OTP. Try again.' }, { status: 401 })
      if (new Date() > record.expiresAt) return NextResponse.json({ error: 'OTP expired. Request a new one.' }, { status: 410 })

      await db.collection('task_otps').deleteMany({ email: emailLower })

      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      const hasPassword = !!mentor?.passwordHash
      const role = ADMIN_EMAILS.includes(emailLower) ? 'admin' : 'mentor'

      return NextResponse.json({
        success: true,
        verified: true,
        hasPassword,
        mentor: { name: mentor.name, email: mentor.email, role },
      })
    }

    // ── CREATE PASSWORD ──
    if (action === 'create-password') {
      const { email, password } = body
      if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
      if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })

      const emailLower = email.toLowerCase().trim()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) return NextResponse.json({ error: 'Mentor not found' }, { status: 404 })

      await db.collection('task_mentors').updateOne(
        { email: emailLower },
        { $set: { passwordHash: hashPassword(password), registeredAt: new Date() } }
      )

      const role = ADMIN_EMAILS.includes(emailLower) ? 'admin' : 'mentor'
      return NextResponse.json({
        success: true,
        mentor: { name: mentor.name, email: mentor.email, role },
        message: 'Password created successfully!'
      })
    }

    // ── LOGIN WITH PASSWORD ──
    if (action === 'login-password') {
      const { email, password } = body
      if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })

      const emailLower = email.toLowerCase().trim()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) return NextResponse.json({ error: 'Mentor not found' }, { status: 404 })
      if (!mentor.passwordHash) return NextResponse.json({ error: 'No password set. Create one first.' }, { status: 403 })
      if (mentor.passwordHash !== hashPassword(password)) return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })

      const role = ADMIN_EMAILS.includes(emailLower) ? 'admin' : 'mentor'
      return NextResponse.json({
        success: true,
        mentor: { name: mentor.name, email: mentor.email, role },
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    console.error('Auth error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}