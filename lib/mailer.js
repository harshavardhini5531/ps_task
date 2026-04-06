import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'projectspace.aditya@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password-here',
  },
})

export async function sendOTPEmail(to, name, otp) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER || 'projectspace.aditya@gmail.com',
      to,
      subject: 'ProjectSpace — Your Login OTP',
      html: `
        <div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:30px;background:#08080C;color:#F0EDEA;border-radius:16px;border:1px solid #2A1510">
          <div style="text-align:center;margin-bottom:20px">
            <div style="width:50px;height:50px;border-radius:12px;background:#ff2d00;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;color:white">PS</div>
          </div>
          <h2 style="text-align:center;color:#ff2d00;margin-bottom:10px">Your Login OTP</h2>
          <p style="text-align:center;color:#8A7A6A">Hi ${name},</p>
          <div style="text-align:center;font-size:36px;font-weight:800;color:#ff2d00;letter-spacing:8px;padding:20px;background:#100C0A;border-radius:12px;margin:20px 0">${otp}</div>
          <p style="text-align:center;color:#5A4540;font-size:13px">This code expires in 5 minutes</p>
          <p style="text-align:center;color:#5A4540;font-size:12px;margin-top:20px">ProjectSpace Task Manager • Aditya University</p>
        </div>
      `
    })
    return true
  } catch (err) {
    console.error('Email error:', err.message)
    return false
  }
}

export async function sendTaskNotification(to, name, taskTitle, role) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER || 'projectspace.aditya@gmail.com',
      to,
      subject: `ProjectSpace — Task ${role === 'responsible' ? 'Assigned' : 'Team Added'}: ${taskTitle}`,
      html: `
        <div style="font-family:sans-serif;padding:30px;background:#08080C;color:#F0EDEA;border-radius:16px;border:1px solid #2A1510">
          <h2 style="color:#ff2d00">${role === 'responsible' ? 'Task Assigned to You' : 'Added to Task Team'}</h2>
          <p>Hi ${name},</p>
          <p>You have been ${role === 'responsible' ? 'assigned as <strong style="color:#ff2d00">responsible</strong> for' : 'added to the team for'}: <strong>${taskTitle}</strong></p>
          <p style="margin-top:15px"><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" style="display:inline-block;padding:12px 30px;background:#ff2d00;color:white;text-decoration:none;border-radius:10px;font-weight:700">Login to ProjectSpace</a></p>
        </div>
      `
    })
    return true
  } catch (err) {
    console.error('Email error:', err.message)
    return false
  }
}