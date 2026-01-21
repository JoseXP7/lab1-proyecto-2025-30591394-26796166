import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation - Laboratorio I - UCLA DCYT',
      version: '1.0.0',
      description:
        'Documentation of the REST API. Laboratorio I Project - UCLA DCYT',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
    components: {
      schemas: {
        /* Personas (ya existentes) */
        Persona: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            tipoDocumento: { type: 'string', enum: ['V', 'E'] },
            numeroDocumento: { type: 'string', example: '12345678' },
            nombres: { type: 'string', example: 'Juan' },
            apellidos: { type: 'string', example: 'Pérez' },
            fechaNacimiento: {
              type: 'string',
              format: 'date',
              example: '1990-01-01',
            },
            sexo: { type: 'string', enum: ['M', 'F'] },
            correo: {
              type: 'string',
              format: 'email',
              example: 'juan@example.com',
            },
            telefono: { type: 'string', example: '+584241234567' },
            direccion: { type: 'string', example: 'Calle Falsa 123' },
            contactoEmergencia: { type: 'string', example: '+584241234568' },
            alergias: { type: 'string', example: 'Ninguna' },
            estado: { type: 'boolean', example: true },
          },
        },
        PersonaCreate: {
          type: 'object',
          required: [
            'tipoDocumento',
            'numeroDocumento',
            'nombres',
            'apellidos',
            'fechaNacimiento',
            'sexo',
            'correo',
            'telefono',
            'direccion',
            'contactoEmergencia',
          ],
          properties: {
            tipoDocumento: { type: 'string', enum: ['V', 'E'] },
            numeroDocumento: { type: 'string' },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            fechaNacimiento: { type: 'string', format: 'date' },
            sexo: { type: 'string', enum: ['M', 'F'] },
            correo: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            direccion: { type: 'string' },
            contactoEmergencia: { type: 'string' },
            alergias: { type: 'string' },
            estado: { type: 'boolean' },
          },
        },
        PersonaUpdate: {
          type: 'object',
          properties: {
            tipoDocumento: { type: 'string', enum: ['V', 'E'] },
            numeroDocumento: { type: 'string' },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            fechaNacimiento: { type: 'string', format: 'date' },
            sexo: { type: 'string', enum: ['M', 'F'] },
            correo: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            direccion: { type: 'string' },
            contactoEmergencia: { type: 'string' },
            alergias: { type: 'string' },
            estado: { type: 'boolean' },
          },
        },

        /* Citas */
        Cita: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            personaId: { type: 'integer', example: 1 },
            profesionalId: { type: 'integer', example: 2 },
            unidadId: { type: 'integer', example: 1 },
            inicio: {
              type: 'string',
              format: 'date-time',
              example: '2025-11-27T09:30:00Z',
            },
            fin: {
              type: 'string',
              format: 'date-time',
              example: '2025-11-27T10:00:00Z',
            },
            motivo: { type: 'string', example: 'Consulta general' },
            canal: { type: 'string', example: 'PRESENCIAL' },
            estado: { type: 'string', example: 'PROGRAMADA' },
            observaciones: { type: 'string' },
          },
        },
        CitaCreate: {
          type: 'object',
          required: [
            'personaId',
            'profesionalId',
            'unidadId',
            'inicio',
            'fin',
            'motivo',
          ],
          properties: {
            personaId: { type: 'integer' },
            profesionalId: { type: 'integer' },
            unidadId: { type: 'integer' },
            inicio: { type: 'string', format: 'date-time' },
            fin: { type: 'string', format: 'date-time' },
            motivo: { type: 'string' },
            canal: { type: 'string' },
            observaciones: { type: 'string' },
          },
        },
        CitaUpdate: {
          type: 'object',
          properties: {
            personaId: { type: 'integer' },
            profesionalId: { type: 'integer' },
            unidadId: { type: 'integer' },
            inicio: { type: 'string', format: 'date-time' },
            fin: { type: 'string', format: 'date-time' },
            motivo: { type: 'string' },
            canal: { type: 'string' },
            estado: { type: 'string' },
            observaciones: { type: 'string' },
          },
        },

        /* Episodios */
        Episodio: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            personaId: { type: 'integer' },
            fechaApertura: {
              type: 'string',
              format: 'date',
              example: '2025-11-01',
            },
            motivo: { type: 'string' },
            tipo: { type: 'string' },
            estado: { type: 'string' },
          },
        },

        /* Ordenes */
        Orden: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            episodioId: { type: 'integer' },
            fechaCreacion: { type: 'string', format: 'date' },
            tipo: { type: 'string' },
            prioridad: { type: 'string' },
            estado: { type: 'string' },
          },
        },
        OrdenCreate: {
          type: 'object',
          required: ['episodioId', 'tipo'],
          properties: {
            episodioId: { type: 'integer' },
            fechaCreacion: { type: 'string', format: 'date' },
            tipo: { type: 'string' },
            prioridad: { type: 'string' },
            estado: { type: 'string' },
          },
        },

        /* Prescripciones */
        Prescripcion: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            episodioId: { type: 'integer' },
            fechaPrescripcion: { type: 'string', format: 'date' },
            observaciones: { type: 'string' },
            estado: { type: 'string' },
          },
        },

        /* Resultados */
        Resultado: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            ordenId: { type: 'integer' },
            fecha: { type: 'string', format: 'date' },
            resumen: { type: 'string' },
            archivoId: { type: 'string' },
            version: { type: 'integer' },
          },
        },

        /* Agenda */
        Agenda: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            profesionalId: { type: 'integer' },
            unidadId: { type: 'integer' },
            inicio: { type: 'string', format: 'date-time' },
            fin: { type: 'string', format: 'date-time' },
            capacidad: { type: 'integer', example: 1 },
            estado: { type: 'string', example: 'ABIERTO' },
          },
        },

        /* NotasClinicas */
        NotaClinica: {
          type: 'object',
          properties: {
            profesionalId: { type: 'integer' },
            fechaNota: { type: 'string', format: 'date' },
            subjetivo: { type: 'string' },
            objetivo: { type: 'string' },
            analisis: { type: 'string' },
            plan: { type: 'string' },
            adjuntos: { type: 'object' },
          },
        },

        /* Diagnosticos */
        Diagnostico: {
          type: 'object',
          properties: {
            codigo: { type: 'string' },
            descripcion: { type: 'string' },
            tipo: { type: 'string' },
            principal: { type: 'boolean' },
          },
        },

        /* Consentimientos */
        Consentimiento: {
          type: 'object',
          required: ['personaId', 'tipoProcedimiento', 'fecha', 'contenido'],
          properties: {
            personaId: { type: 'integer' },
            tipoProcedimiento: { type: 'string' },
            fecha: { type: 'string', format: 'date' },
            contenido: { type: 'string' },
            metodo: { type: 'string' },
            archivoId: { type: 'string' },
          },
        },

        /* Profesionales */
        Profesional: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            registroProfesional: { type: 'string' },
            especialidad: { type: 'string' },
            correo: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            agendaHabilitada: { type: 'boolean' },
          },
        },
        ProfesionalCreate: {
          type: 'object',
          required: [
            'nombres',
            'apellidos',
            'registroProfesional',
            'especialidad',
            'correo',
            'telefono',
          ],
          properties: {
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            registroProfesional: { type: 'string' },
            especialidad: { type: 'string' },
            correo: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            agendaHabilitada: { type: 'boolean' },
          },
        },
        ProfesionalUpdate: {
          type: 'object',
          properties: {
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            registroProfesional: { type: 'string' },
            especialidad: { type: 'string' },
            correo: { type: 'string', format: 'email' },
            telefono: { type: 'string' },
            agendaHabilitada: { type: 'boolean' },
          },
        },

        /* (Removed schemas for Roles and Tratamientos; out of project scope) */

        /* Unidades de atención */
        Unidad: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string' },
            tipo: { type: 'string' },
            direccion: { type: 'string' },
            telefono: { type: 'string' },
            horarioReferencia: { type: 'string' },
            estado: { type: 'string', example: 'ACTIVO' },
          },
        },
        UnidadCreate: {
          type: 'object',
          required: [
            'nombre',
            'tipo',
            'direccion',
            'telefono',
            'horarioReferencia',
          ],
          properties: {
            nombre: { type: 'string' },
            tipo: { type: 'string' },
            direccion: { type: 'string' },
            telefono: { type: 'string' },
            horarioReferencia: { type: 'string' },
            estado: { type: 'string' },
          },
        },
        UnidadUpdate: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            tipo: { type: 'string' },
            direccion: { type: 'string' },
            telefono: { type: 'string' },
            horarioReferencia: { type: 'string' },
            estado: { type: 'string' },
          },
        },

        /* Aseguradoras, Planes y Afiliaciones (Sección 2.5) */
        Aseguradora: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string' },
            nit: { type: 'string' },
            contacto: { type: 'string' },
            estado: { type: 'string', example: 'ACTIVA' },
          },
        },
        AseguradoraCreate: {
          type: 'object',
          required: ['nombre', 'nit', 'contacto'],
          properties: {
            nombre: { type: 'string' },
            nit: { type: 'string' },
            contacto: { type: 'string' },
          },
        },
        AseguradoraUpdate: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            nit: { type: 'string' },
            contacto: { type: 'string' },
            estado: { type: 'string' },
          },
        },

        Plan: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            aseguradoraId: { type: 'integer' },
            nombre: { type: 'string' },
            condicionesGenerales: { type: 'string' },
            estado: { type: 'string' },
          },
        },
        PlanCreate: {
          type: 'object',
          required: ['aseguradoraId', 'nombre', 'condicionesGenerales'],
          properties: {
            aseguradoraId: { type: 'integer' },
            nombre: { type: 'string' },
            condicionesGenerales: { type: 'string' },
          },
        },
        PlanUpdate: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            condicionesGenerales: { type: 'string' },
            estado: { type: 'string' },
          },
        },

        Afiliacion: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            personaId: { type: 'integer' },
            planId: { type: 'integer' },
            numeroPoliza: { type: 'string' },
            vigenteDesde: { type: 'string', format: 'date' },
            vigenteHasta: { type: 'string', format: 'date' },
            copago: { type: 'number' },
            cuotaModeradora: { type: 'number' },
            persona: { $ref: '#/components/schemas/Persona' },
            plan: { $ref: '#/components/schemas/Plan' },
          },
        },
        AfiliacionCreate: {
          type: 'object',
          required: [
            'personaId',
            'planId',
            'numeroPoliza',
            'vigenteDesde',
            'vigenteHasta',
          ],
          properties: {
            personaId: { type: 'integer' },
            planId: { type: 'integer' },
            numeroPoliza: { type: 'string' },
            vigenteDesde: { type: 'string', format: 'date' },
            vigenteHasta: { type: 'string', format: 'date' },
            copago: { type: 'number' },
            cuotaModeradora: { type: 'number' },
          },
        },
        AfiliacionUpdate: {
          type: 'object',
          properties: {
            numeroPoliza: { type: 'string' },
            vigenteDesde: { type: 'string', format: 'date' },
            vigenteHasta: { type: 'string', format: 'date' },
            copago: { type: 'number' },
            cuotaModeradora: { type: 'number' },
          },
        },

        /* (Removed schemas for Usuarios; out of project scope) */

        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            errors: { type: 'object' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
