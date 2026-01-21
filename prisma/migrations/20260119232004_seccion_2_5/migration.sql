-- CreateTable
CREATE TABLE `aseguradoras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `nit` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVA',

    UNIQUE INDEX `aseguradoras_nit_key`(`nit`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planes_cobertura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aseguradora_id` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `condiciones_generales` TEXT NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `afiliaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `persona_id` INTEGER NOT NULL,
    `plan_id` INTEGER NOT NULL,
    `numero_poliza` VARCHAR(191) NOT NULL,
    `vigente_desde` DATE NOT NULL,
    `vigente_hasta` DATE NOT NULL,
    `copago` DOUBLE NOT NULL DEFAULT 0,
    `cuotaModeradora` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `autorizaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orden_id` INTEGER NULL,
    `procedimiento_codigo` VARCHAR(191) NULL,
    `plan_id` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'SOLICITADA',
    `fecha_solicitud` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_respuesta` DATETIME(3) NULL,
    `numero_autorizacion` VARCHAR(191) NULL,
    `observaciones` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `planes_cobertura` ADD CONSTRAINT `planes_cobertura_aseguradora_id_fkey` FOREIGN KEY (`aseguradora_id`) REFERENCES `aseguradoras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `afiliaciones` ADD CONSTRAINT `afiliaciones_persona_id_fkey` FOREIGN KEY (`persona_id`) REFERENCES `personas_atendidas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `afiliaciones` ADD CONSTRAINT `afiliaciones_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `planes_cobertura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `autorizaciones` ADD CONSTRAINT `autorizaciones_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `Ordenes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `autorizaciones` ADD CONSTRAINT `autorizaciones_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `planes_cobertura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
