import express, { urlencoded } from 'express'
import config from './config/config.js'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swaggerOptions.js'
import personasRoutes from './routes/personasRoutes.js'
import profesionalesRoutes from './routes/profesionalesRoutes.js'
import unidadesRoutes from './routes/unidadesAtencionRoutes.js'
import citasRoutes from './routes/citasRoutes.js'
import episodiosRoutes from './routes/episodiosRoutes.js'
import ordenesRoutes from './routes/ordenesRoutes.js'
import prescripcionesRoutes from './routes/prescripcionesRoutes.js'
import resultadosRoutes from './routes/resultadosRoutes.js'
import agendaRoutes from './routes/agendaRoutes.js'
import consentimientosRoutes from './routes/consentimientosRoutes.js'
import AseguradorasRoutes from './routes/AseguradorasRoutes.js'
import planesRoutes from './routes/planesRoutes.js'
import afiliacionesRoutes from './routes/afiliacionesRoutes.js'
import prestacionesRoutes from './routes/prestacionesRoutes.js'
import arancelRoutes from './routes/arancelRoutes.js'
import facturasRoutes from './routes/facturasRoutes.js'
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

// Root endpoint: mensaje de estado y enlace a la documentación
app.get('/', (req, res) => {
  const host = req.get('host')
  const protocol = req.protocol
  res.json({
    message: 'API corriendo',
    documentation: `${protocol}://${host}/api-docs`,
  })
})

//Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/personas', personasRoutes)
app.use('/profesionales', profesionalesRoutes)
app.use('/unidades', unidadesRoutes)
app.use('/citas', citasRoutes)
app.use('/episodios', episodiosRoutes)
app.use('/ordenes', ordenesRoutes)
app.use('/prescripciones', prescripcionesRoutes)
app.use('/resultados', resultadosRoutes)
app.use('/agenda', agendaRoutes)
app.use('/consentimientos', consentimientosRoutes)
app.use('/aseguradoras', AseguradorasRoutes)
app.use('/planes', planesRoutes)
app.use('/afiliaciones', afiliacionesRoutes)
app.use('/prestaciones', prestacionesRoutes)
app.use('/arancel', arancelRoutes)
app.use('/facturas', facturasRoutes)
app.use(errors)

export default app
