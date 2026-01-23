-- CreateTable
CREATE TABLE `facturas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(191) NOT NULL,
    `fecha_emision` DATETIME(3) NOT NULL,
    `persona_id` INTEGER NULL,
    `aseguradora_id` INTEGER NULL,
    `moneda` VARCHAR(191) NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',

    UNIQUE INDEX `facturas_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factura_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `factura_id` INTEGER NOT NULL,
    `prestacion_codigo` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `valor_unitario` DECIMAL(10, 2) NOT NULL,
    `impuestos` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `factura_id` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monto` DECIMAL(10, 2) NOT NULL,
    `medio` VARCHAR(191) NOT NULL,
    `referencia` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'COMPLETADO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas_factura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `factura_id` INTEGER NOT NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `motivo` TEXT NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `facturas` ADD CONSTRAINT `facturas_persona_id_fkey` FOREIGN KEY (`persona_id`) REFERENCES `personas_atendidas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facturas` ADD CONSTRAINT `facturas_aseguradora_id_fkey` FOREIGN KEY (`aseguradora_id`) REFERENCES `aseguradoras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factura_items` ADD CONSTRAINT `factura_items_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `facturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factura_items` ADD CONSTRAINT `factura_items_prestacion_codigo_fkey` FOREIGN KEY (`prestacion_codigo`) REFERENCES `prestaciones`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagos` ADD CONSTRAINT `pagos_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `facturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas_factura` ADD CONSTRAINT `notas_factura_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `facturas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
