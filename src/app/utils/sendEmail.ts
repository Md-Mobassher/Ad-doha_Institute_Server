import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
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
