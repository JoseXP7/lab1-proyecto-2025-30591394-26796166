-- CreateTable
CREATE TABLE `prestaciones` (
    `codigo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `grupo` VARCHAR(191) NOT NULL,
    `requisitos` TEXT NULL,
    `tiempo_estimado` INTEGER NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arancel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prestacion_codigo` VARCHAR(191) NOT NULL,
    `plan_id` INTEGER NULL,
    `valor_base` DECIMAL(10, 2) NOT NULL,
    `impuestos` DECIMAL(10, 2) NOT NULL,
    `vigente_desde` DATE NOT NULL,
    `vigente_hasta` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arancel` ADD CONSTRAINT `arancel_prestacion_codigo_fkey` FOREIGN KEY (`prestacion_codigo`) REFERENCES `prestaciones`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arancel` ADD CONSTRAINT `arancel_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `planes_cobertura`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
