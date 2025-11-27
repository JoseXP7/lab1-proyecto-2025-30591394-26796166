/*
  Warnings:

  - You are about to alter the column `estado` on the `unidades_atencion` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `citas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tratamientos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `horario_referencia` to the `unidades_atencion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `unidades_atencion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `citas` DROP FOREIGN KEY `citas_paciente_id_fkey`;

-- DropForeignKey
ALTER TABLE `citas` DROP FOREIGN KEY `citas_profesional_id_fkey`;

-- DropForeignKey
ALTER TABLE `citas` DROP FOREIGN KEY `citas_unidad_id_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_rol_id_fkey`;

-- AlterTable
ALTER TABLE `profesionales` ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE `unidades_atencion` ADD COLUMN `horario_referencia` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipo` VARCHAR(191) NOT NULL,
    MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO';

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `citas`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `tratamientos`;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `Agenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profesional_id` INTEGER NOT NULL,
    `unidad_id` INTEGER NOT NULL,
    `inicio` DATETIME(3) NOT NULL,
    `fin` DATETIME(3) NOT NULL,
    `capacidad` INTEGER NOT NULL DEFAULT 1,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ABIERTO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Citas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personaId` INTEGER NOT NULL,
    `profesionalId` INTEGER NOT NULL,
    `unidadId` INTEGER NOT NULL,
    `inicio` DATETIME(3) NOT NULL,
    `fin` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `canal` VARCHAR(191) NOT NULL DEFAULT 'PRESENCIAL',
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PROGRAMADA',
    `observaciones` VARCHAR(191) NULL,
    `agendaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EpisodiosAtencion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personaId` INTEGER NOT NULL,
    `fechaApertura` DATE NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ABIERTO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotasClinicas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `episodioId` INTEGER NOT NULL,
    `profesionalId` INTEGER NOT NULL,
    `fechaNota` DATE NOT NULL,
    `subjetivo` VARCHAR(191) NOT NULL,
    `objetivo` VARCHAR(191) NOT NULL,
    `analisis` VARCHAR(191) NOT NULL,
    `plan` VARCHAR(191) NOT NULL,
    `adjuntos` JSON NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `NotasClinicas_episodioId_version_key`(`episodioId`, `version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diagnosticos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `episodioId` INTEGER NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `principal` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consentimientos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personaId` INTEGER NOT NULL,
    `tipoProcedimiento` VARCHAR(191) NOT NULL,
    `fecha` DATE NOT NULL,
    `contenido` TEXT NOT NULL,
    `metodo` VARCHAR(191) NOT NULL,
    `archivoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ordenes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `episodioId` INTEGER NOT NULL,
    `fechaCreacion` DATE NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `prioridad` VARCHAR(191) NOT NULL DEFAULT 'NORMAL',
    `estado` VARCHAR(191) NOT NULL DEFAULT 'EMITIDA',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orden_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orden_id` INTEGER NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `indicaciones` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prescripciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `episodio_id` INTEGER NOT NULL,
    `fecha_prescripcion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observaciones` TEXT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVA',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescripcion_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescripcionId` INTEGER NOT NULL,
    `medicamentoCodigo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `dosis` VARCHAR(191) NOT NULL,
    `via` VARCHAR(191) NOT NULL,
    `frecuencia` VARCHAR(191) NOT NULL,
    `duracionDias` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resultados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ordenId` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `resumen` VARCHAR(191) NOT NULL,
    `archivoId` VARCHAR(191) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Resultados_ordenId_version_key`(`ordenId`, `version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agenda` ADD CONSTRAINT `Agenda_profesional_id_fkey` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agenda` ADD CONSTRAINT `Agenda_unidad_id_fkey` FOREIGN KEY (`unidad_id`) REFERENCES `unidades_atencion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Citas` ADD CONSTRAINT `Citas_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `personas_atendidas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Citas` ADD CONSTRAINT `Citas_profesionalId_fkey` FOREIGN KEY (`profesionalId`) REFERENCES `profesionales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Citas` ADD CONSTRAINT `Citas_unidadId_fkey` FOREIGN KEY (`unidadId`) REFERENCES `unidades_atencion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Citas` ADD CONSTRAINT `Citas_agendaId_fkey` FOREIGN KEY (`agendaId`) REFERENCES `Agenda`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EpisodiosAtencion` ADD CONSTRAINT `EpisodiosAtencion_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `personas_atendidas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotasClinicas` ADD CONSTRAINT `NotasClinicas_episodioId_fkey` FOREIGN KEY (`episodioId`) REFERENCES `EpisodiosAtencion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotasClinicas` ADD CONSTRAINT `NotasClinicas_profesionalId_fkey` FOREIGN KEY (`profesionalId`) REFERENCES `profesionales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosticos` ADD CONSTRAINT `Diagnosticos_episodioId_fkey` FOREIGN KEY (`episodioId`) REFERENCES `EpisodiosAtencion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consentimientos` ADD CONSTRAINT `Consentimientos_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `personas_atendidas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ordenes` ADD CONSTRAINT `Ordenes_episodioId_fkey` FOREIGN KEY (`episodioId`) REFERENCES `EpisodiosAtencion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden_items` ADD CONSTRAINT `orden_items_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `Ordenes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescripciones` ADD CONSTRAINT `Prescripciones_episodio_id_fkey` FOREIGN KEY (`episodio_id`) REFERENCES `EpisodiosAtencion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescripcion_items` ADD CONSTRAINT `prescripcion_items_prescripcionId_fkey` FOREIGN KEY (`prescripcionId`) REFERENCES `Prescripciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resultados` ADD CONSTRAINT `Resultados_ordenId_fkey` FOREIGN KEY (`ordenId`) REFERENCES `Ordenes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
