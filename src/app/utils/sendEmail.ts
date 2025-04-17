import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // ✅ 465 for secure SSL
    secure: false, // ✅ must be true for port 465
    auth: {
      user: config.sendMail.email,
      pass: config.sendMail.app_pass,
    },
  })

  await transporter.sendMail({
    from: config.sendMail.email, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  })
}
