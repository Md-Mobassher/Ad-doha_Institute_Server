import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  database_url: process.env.DATABASE_URL,
  database_url_local: process.env.DATABASE_URL_LOCAL,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  super_admin_password: process.env.SUPER_ADMIN_PASS,

  frontend: {
    url: process.env.CLIENT_URL,
    live_url: process.env.CLIENT_LIVE_URL,
    build_url: process.env.CLIENT_BUILD_URL,
    local_url: process.env.CLIENT_lOCAL_URL,
  },

  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,

  sendMail: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
}
