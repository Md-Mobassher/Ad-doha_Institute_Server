import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: (origin, callback) => {
      const whitelist = [
        'https://ad-doha-institute.vercel.app',
        'http://localhost:3000',
        'https://vercel.com/md-mobassher-hossains-projects/ad-doha-institute/9GhafAWhVAG151UCGHy1C2LuHSoH',
      ]
      if (!origin || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  }),
)

// application routes
app.use('/api/v1', router)

// Start the server
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Ad-doha Institute Server')
})

// global error handler
app.use(globalErrorHandler)

// Not Found
app.use(notFound)

export default app
