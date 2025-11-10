/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `personas_atendidas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoDocumento` VARCHAR(191) NOT NULL,
    `numeroDocumento` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `contacto_emergencia` VARCHAR(191) NOT NULL,
    `alergias` VARCHAR(191) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `personas_atendidas_numeroDocumento_key`(`numeroDocumento`),
    UNIQUE INDEX `personas_atendidas_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
