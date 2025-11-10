import express, { urlencoded } from 'express'
import config from './config/config.js'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import prisma from './config/prisma.js'

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(urlencoded({ extended: true }))
app.use(express.json())

// Configuration
app.set('port', config.app.port)

app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default app
