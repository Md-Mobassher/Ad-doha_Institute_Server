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
    origin: [
      'https://ad-doha-institute-hsoxdhroq-md-mobassher-hossains-projects.vercel.app',
      'https://ad-doha-institute.vercel.app',
      'http://localhost:3000',
    ],
    credentials: true,
  }),
)

// application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Ad-doha Server')
})

// global error handler
app.use(globalErrorHandler)

// Not Found
app.use(notFound)

export default app
