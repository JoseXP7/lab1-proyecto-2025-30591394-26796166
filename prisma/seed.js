import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Limpiando datos existentes (deleteMany)...")
  await prisma.resultados.deleteMany()
  await prisma.prescripcionItems.deleteMany()
  await prisma.prescripciones.deleteMany()
  await prisma.ordenItems.deleteMany()
  await prisma.ordenes.deleteMany()
  await prisma.notasClinicas.deleteMany()
  await prisma.diagnosticos.deleteMany()
  await prisma.consentimientos.deleteMany()
  await prisma.citas.deleteMany()
  await prisma.agenda.deleteMany()
  await prisma.episodiosAtencion.deleteMany()
  // Limpieza de tablas relacionadas con facturación y aranceles (hijos primero)
  await prisma.pagos.deleteMany()
  await prisma.facturaItems.deleteMany()
  await prisma.facturas.deleteMany()
  await prisma.afiliaciones.deleteMany()
  await prisma.arancel.deleteMany()
  await prisma.prestaciones.deleteMany()
  await prisma.planesCobertura.deleteMany()
  await prisma.aseguradoras.deleteMany()

  await prisma.personasAtendidas.deleteMany()
  await prisma.profesionales.deleteMany()
  await prisma.unidadesAtencion.deleteMany()

  console.log("Creando unidad de atención...")
  const unidad = await prisma.unidadesAtencion.create({
    data: {
      nombre: "Unidad Central",
      tipo: "Hospital",
      direccion: "Av. Principal 123",
      telefono: "+5800000000",
      horarioReferencia: "Lun-Vie 08:00-17:00",
      estado: "ACTIVO",
    },
  })

  console.log("Creando profesional...")
  const profesional = await prisma.profesionales.create({
    data: {
      nombres: "Ana",
      apellidos: "Pérez",
      registroProfesional: "RP-001",
      especialidad: "Medicina General",
      correo: "ana.perez@example.com",
      telefono: "+580011122233",
      agendaHabilitada: true,
      estado: "ACTIVO",
    },
  })

  console.log("Creando persona atendida (paciente)...")
  const persona = await prisma.personasAtendidas.create({
    data: {
      tipoDocumento: "V",
      numeroDocumento: "12345678",
      nombres: "Juan",
      apellidos: "Gonzalez",
      fechaNacimiento: new Date("1990-01-01"),
      sexo: "M",
      correo: "juan.gonzalez@example.com",
      telefono: "+580044455566",
      direccion: "Calle Falsa 123",
      contactoEmergencia: "+580099988877",
      alergias: "Ninguna",
      estado: true,
    },
  })

  console.log("Creando bloque de agenda y cita de ejemplo...")
  const bloque = await prisma.agenda.create({
    data: {
      profesionalId: profesional.id,
      unidadId: unidad.id,
      inicio: new Date(Date.now() + 3600 * 1000),
      fin: new Date(Date.now() + 7200 * 1000),
      capacidad: 2,
      estado: "ABIERTO",
    },
  })

  const cita = await prisma.citas.create({
    data: {
      personaId: persona.id,
      profesionalId: profesional.id,
      unidadId: unidad.id,
      inicio: new Date(Date.now() + 3600 * 1000),
      fin: new Date(Date.now() + 7200 * 1000),
      motivo: "Consulta general",
      canal: "PRESENCIAL",
      estado: "PROGRAMADA",
      agendaId: bloque.id,
    },
  })

  console.log("Creando episodio y nota clínica...")
  const episodio = await prisma.episodiosAtencion.create({
    data: {
      personaId: persona.id,
      fechaApertura: new Date(),
      motivo: "Dolor abdominal",
      tipo: "Consulta",
      estado: "ABIERTO",
    },
  })

  const nota = await prisma.notasClinicas.create({
    data: {
      episodioId: episodio.id,
      profesionalId: profesional.id,
      fechaNota: new Date(),
      subjetivo: "Paciente refiere dolor leve",
      objetivo: "Examen abdominal sin hallazgos",
      analisis: "Probable gastritis",
      plan: "Tratamiento y seguimiento",
      version: 1,
    },
  })

  console.log("Creando orden, items, resultado, prescripcion y items...")
  const orden = await prisma.ordenes.create({
    data: {
      episodioId: episodio.id,
      fechaCreacion: new Date(),
      tipo: "Laboratorio",
      prioridad: "NORMAL",
      estado: "EMITIDA",
    },
  })

  const ordenItem = await prisma.ordenItems.create({
    data: {
      ordenId: orden.id,
      codigo: "HB",
      descripcion: "Hemograma completo",
      indicaciones: "Ayuno 8 horas",
    },
  })

  const resultado = await prisma.resultados.create({
    data: {
      ordenId: orden.id,
      fecha: new Date(),
      resumen: "Sin hallazgos relevantes",
      version: 1,
    },
  })

  const prescripcion = await prisma.prescripciones.create({
    data: {
      episodioId: episodio.id,
      fechaPrescripcion: new Date(),
      observaciones: "Tomar con alimentos si es necesario",
      estado: "ACTIVA",
    },
  })

  const prescItem = await prisma.prescripcionItems.create({
    data: {
      prescripcionId: prescripcion.id,
      medicamentoCodigo: "PARA500",
      nombre: "Paracetamol",
      dosis: "500mg",
      via: "VO",
      frecuencia: "Cada 8 horas",
      duracionDias: 5,
    },
  })

  console.log("Creando consentimiento...")
  const consentimiento = await prisma.consentimientos.create({
    data: {
      personaId: persona.id,
      tipoProcedimiento: "Endoscopía",
      fecha: new Date(),
      contenido: "Consentimiento informado para procedimiento endoscópico",
      metodo: "Firma física",
    },
  })

  console.log(
    "Creando datos de facturación y catálogo (aseguradora, plan, prestaciones, arancel, afiliación y factura de ejemplo)...",
  )
  const aseguradora = await prisma.aseguradoras.create({
    data: {
      nombre: "Seguros Ejemplo",
      nit: "J-12345678-9",
      contacto: "contacto@seguros.com",
      estado: "ACTIVA",
    },
  })

  const plan = await prisma.planesCobertura.create({
    data: {
      aseguradoraId: aseguradora.id,
      nombre: "Plan Básico",
      condicionesGenerales: "Cobertura básica",
      estado: "ACTIVO",
    },
  })

  const prest1 = await prisma.prestaciones.create({
    data: {
      codigo: "P001",
      nombre: "Consulta médica",
      grupo: "CONSULTAS",
      requisitos: "Ninguno",
      tiempoEstimado: 20,
    },
  })

  const prest2 = await prisma.prestaciones.create({
    data: {
      codigo: "P002",
      nombre: "Hemograma",
      grupo: "LAB",
      requisitos: "Ayuno 8h",
      tiempoEstimado: 10,
    },
  })

  const arancel1 = await prisma.arancel.create({
    data: {
      prestacionCodigo: prest1.codigo,
      planId: null,
      valorBase: 20.0,
      impuestos: 0.0,
      vigenteDesde: new Date("2025-01-01"),
      vigenteHasta: new Date("2027-12-31"),
    },
  })

  const arancel2 = await prisma.arancel.create({
    data: {
      prestacionCodigo: prest2.codigo,
      planId: plan.id,
      valorBase: 15.0,
      impuestos: 0.0,
      vigenteDesde: new Date("2025-01-01"),
      vigenteHasta: new Date("2027-12-31"),
    },
  })

  const afiliacion = await prisma.afiliaciones.create({
    data: {
      personaId: persona.id,
      planId: plan.id,
      numeroPoliza: "POL-0001",
      vigenteDesde: new Date("2024-01-01"),
      vigenteHasta: new Date("2027-01-01"),
      copago: 0,
      cuotaModeradora: 0,
    },
  })

  const factura = await prisma.facturas.create({
    data: {
      numero: "F-0001",
      fechaEmision: new Date(),
      personaId: persona.id,
      aseguradoraId: aseguradora.id,
      moneda: "USD",
      subtotal: 35.0,
      total: 35.0,
      estado: "EMITIDA",
    },
  })

  await prisma.facturaItems.create({
    data: {
      facturaId: factura.id,
      prestacionCodigo: prest1.codigo,
      descripcion: prest1.nombre,
      cantidad: 1,
      valorUnitario: 20.0,
      impuestos: 0.0,
      total: 20.0,
    },
  })

  await prisma.facturaItems.create({
    data: {
      facturaId: factura.id,
      prestacionCodigo: prest2.codigo,
      descripcion: prest2.nombre,
      cantidad: 1,
      valorUnitario: 15.0,
      impuestos: 0.0,
      total: 15.0,
    },
  })

  console.log("Seed completado. IDs:")
  console.log({
    unidad: unidad.id,
    profesional: profesional.id,
    persona: persona.id,
    bloque: bloque.id,
    cita: cita.id,
    episodio: episodio.id,
    orden: orden.id,
    prescripcion: prescripcion.id,
    consentimiento: consentimiento.id,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
