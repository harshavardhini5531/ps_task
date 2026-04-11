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

async function getTransporter() {
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  if (!smtpUser || !smtpPass) return null
  try {
    const nodemailer = (await import('nodemailer')).default
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false }
    })
    await transporter.verify()
    return transporter
  } catch (err) {
    console.error('SMTP connection failed:', err.message)
    return null
  }
}

async function sendOTPEmail(email, otp, name) {
  const transporter = await getTransporter()
  if (!transporter) return false
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'ProjectSpace - Your Verification OTP',
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
    console.log('OTP email sent to:', email)
    return true
  } catch (err) {
    console.error('OTP email failed:', err.message)
    return false
  }
}

// Called when admin assigns a task to a mentor
async function sendAssignmentEmail(mentorEmail, mentorName, taskTitle, role) {
  const transporter = await getTransporter()
  if (!transporter) return false
  try {
    const roleLabel = role === 'responsible' ? 'Responsible Person' : 'Team Member'
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: mentorEmail,
      subject: `ProjectSpace - You've been assigned: ${taskTitle}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0a0a14;color:#f0eff4;border-radius:16px">
          <h2 style="color:#ff2d00;margin:0 0 8px">ProjectSpace</h2>
          <p style="color:#9898b0;margin:0 0 24px">Task Assignment Notification</p>
          <p>Hi ${mentorName},</p>
          <p>You have been assigned as <strong style="color:#ff2d00">${roleLabel}</strong> for the following task:</p>
          <div style="background:#161624;border:2px solid #ff2d00;border-radius:12px;padding:20px;text-align:center;margin:20px 0">
            <span style="font-size:24px;font-weight:800;color:#ff2d00">${taskTitle}</span>
          </div>
          <p>Please login to your ProjectSpace dashboard to view and manage your task stages.</p>
          <p style="color:#5c5c78;font-size:13px;margin-top:20px">— ProjectSpace Admin</p>
        </div>
      `,
    })
    console.log('Assignment email sent to:', mentorEmail, 'for task:', taskTitle)
    return true
  } catch (err) {
    console.error('Assignment email failed:', err.message)
    return false
  }
}

export async function POST(req) {
  try {
    const db = await getDb()
    const body = await req.json()
    const { action } = body

    // ── CHECK EMAIL (does account exist?) ──
    if (action === 'check-email') {
      const { email } = body
      if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      const emailLower = email.toLowerCase().trim()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) return NextResponse.json({ error: 'Email not found in mentor list. Contact admin.' }, { status: 404 })
      const hasPassword = !!mentor.passwordHash
      const role = ADMIN_EMAILS.includes(emailLower) ? 'admin' : 'mentor'
      return NextResponse.json({ success: true, hasPassword, name: mentor.name, role })
    }

    // ── SEND OTP (only for registration) ──
    if (action === 'send-otp') {
      const { email } = body
      if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      const emailLower = email.toLowerCase().trim()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) return NextResponse.json({ error: 'Email not found in mentor list. Contact admin.' }, { status: 404 })
      if (mentor.passwordHash) return NextResponse.json({ error: 'Account already exists. Please login with password.' }, { status: 409 })

      const otp = generateOTP()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
      await db.collection('task_otps').deleteMany({ email: emailLower })
      await db.collection('task_otps').insertOne({ email: emailLower, otp, expiresAt, createdAt: new Date() })

      const emailSent = await sendOTPEmail(emailLower, otp, mentor.name)

      return NextResponse.json({
        success: true,
        message: emailSent ? 'OTP sent to your email' : 'OTP generated',
        demo_otp: emailSent ? undefined : otp,
      })
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
      return NextResponse.json({ success: true, verified: true, name: mentor.name, email: mentor.email })
    }

    // ── CREATE PASSWORD (after OTP verified) ──
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
      return NextResponse.json({ success: true, message: 'Password created! Please login.' })
    }

    // ── LOGIN WITH PASSWORD ──
    if (action === 'login') {
      const { email, password } = body
      if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
      const emailLower = email.toLowerCase().trim()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) return NextResponse.json({ error: 'Email not found.' }, { status: 404 })
      if (!mentor.passwordHash) return NextResponse.json({ error: 'Account not registered. Create account first.' }, { status: 403 })
      if (mentor.passwordHash !== hashPassword(password)) return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
      const role = ADMIN_EMAILS.includes(emailLower) ? 'admin' : 'mentor'
      return NextResponse.json({ success: true, mentor: { name: mentor.name, email: mentor.email, role } })
    }

    // ── FORGOT PASSWORD (send reset OTP) ──
    if (action === 'forgot-password') {
      const { email } = body
      if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      const emailLower = email.toLowerCase().trim()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) return NextResponse.json({ error: 'Email not found.' }, { status: 404 })
      if (!mentor.passwordHash) return NextResponse.json({ error: 'No account found. Create account first.' }, { status: 403 })

      const otp = generateOTP()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
      await db.collection('task_otps').deleteMany({ email: emailLower })
      await db.collection('task_otps').insertOne({ email: emailLower, otp, expiresAt, type: 'reset', createdAt: new Date() })

      const transporter = await getTransporter()
      let emailSent = false
      if (transporter) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: emailLower,
            subject: 'ProjectSpace - Password Reset Code',
            html: `
              <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0a0a14;color:#f0eff4;border-radius:16px">
                <h2 style="color:#ff2d00;margin:0 0 8px">ProjectSpace</h2>
                <p style="color:#9898b0;margin:0 0 24px">Password Reset</p>
                <p>Hi ${mentor.name},</p>
                <p>Your password reset code is:</p>
                <div style="background:#161624;border:2px solid #ff2d00;border-radius:12px;padding:20px;text-align:center;margin:20px 0">
                  <span style="font-size:36px;font-weight:800;letter-spacing:8px;color:#ff2d00">${otp}</span>
                </div>
                <p style="color:#5c5c78;font-size:13px">This code expires in 10 minutes.</p>
              </div>
            `,
          })
          emailSent = true
        } catch (err) { console.error('Reset email failed:', err.message) }
      }

      return NextResponse.json({
        success: true,
        message: emailSent ? 'Reset code sent to your email' : 'Reset code generated',
        demo_otp: emailSent ? undefined : otp,
      })
    }

    // ── RESET PASSWORD (after OTP verified) ──
    if (action === 'reset-password') {
      const { email, password } = body
      if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
      if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
      const emailLower = email.toLowerCase().trim()
      const mentor = await db.collection('task_mentors').findOne({ email: emailLower })
      if (!mentor) return NextResponse.json({ error: 'Mentor not found' }, { status: 404 })
      await db.collection('task_mentors').updateOne(
        { email: emailLower },
        { $set: { passwordHash: hashPassword(password) } }
      )
      return NextResponse.json({ success: true, message: 'Password reset successfully!' })
    }

    // ── SEND ASSIGNMENT NOTIFICATION (original) ──
    if (action === 'notify-assignment') {
      const { mentorEmail, mentorName, taskTitle, assignRole } = body
      if (!mentorEmail || !taskTitle) return NextResponse.json({ error: 'Missing data' }, { status: 400 })
      const sent = await sendAssignmentEmail(mentorEmail, mentorName || 'Mentor', taskTitle, assignRole || 'team')
      // Also save notification in DB
      await db.collection('task_notifications').insertOne({
        type: 'assignment',
        mentorEmail,
        mentorName,
        taskTitle,
        assignRole: assignRole || 'team',
        emailSent: sent,
        createdAt: new Date(),
        read: false
      })
      return NextResponse.json({ success: true, emailSent: sent })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    console.error('Auth error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}