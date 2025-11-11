import express, { urlencoded } from 'express'
import config from './config/config.js'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import personasRoutes from './routes/personasRoutes.js'
import errors from './utils/errors.js'

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(urlencoded({ extended: true }))
app.use(express.json())

// Configuration
app.set('port', config.app.port)

//Routes

app.use('/api/personas', personasRoutes)
app.use(errors)

export default app
