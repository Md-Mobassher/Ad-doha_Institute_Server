import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import config from './app/config'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: [
      'https://ad-doha-institute.vercel.app',
      'https://ad-doha-institute.vercel.app',
      `${config.frontend.url}`,
      `${config.frontend.live_url}`,
      `${config.frontend.build_url}`,
      `${config.frontend.local_url}`,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)

// application routes
app.use('/api/v1', router)

// Start the server
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Ad-doha.org Server')
})

// global error handler
app.use(globalErrorHandler)

// Not Found
app.use(notFound)

export default app
