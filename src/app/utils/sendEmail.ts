import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'development',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.sendMail.email,
      pass: config.sendMail.app_password,
    },
  })

  await transporter.sendMail({
    from: 'mobassherpautex@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html, // html body
  })
}
