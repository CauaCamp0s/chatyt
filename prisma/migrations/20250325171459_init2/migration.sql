/*
  Warnings:

  - You are about to drop the `AluguelApartamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AluguelCasa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BairrosInteresse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CaracteristicasAluguel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CaracteristicasAluguelApartamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CaracteristicasCompraApartamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CaracteristicasCondominio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CaracteristicasVenda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompraApartamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comprador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InteresseImovel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VendaCasa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BairrosInteresseToComprador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CaracteristicasAluguel` DROP FOREIGN KEY `CaracteristicasAluguel_aluguel_casa_id_fkey`;

-- DropForeignKey
ALTER TABLE `CaracteristicasAluguelApartamento` DROP FOREIGN KEY `CaracteristicasAluguelApartamento_aluguel_apartamento_id_fkey`;

-- DropForeignKey
ALTER TABLE `CaracteristicasCompraApartamento` DROP FOREIGN KEY `CaracteristicasCompraApartamento_compra_apartamento_id_fkey`;

-- DropForeignKey
ALTER TABLE `CaracteristicasCondominio` DROP FOREIGN KEY `CaracteristicasCondominio_imovel_id_fkey`;

-- DropForeignKey
ALTER TABLE `CaracteristicasVenda` DROP FOREIGN KEY `CaracteristicasVenda_venda_casa_id_fkey`;

-- DropForeignKey
ALTER TABLE `InteresseImovel` DROP FOREIGN KEY `InteresseImovel_comprador_fkey`;

-- DropForeignKey
ALTER TABLE `InteresseImovel` DROP FOREIGN KEY `InteresseImovel_venda_casa_fkey`;

-- DropForeignKey
ALTER TABLE `_BairrosInteresseToComprador` DROP FOREIGN KEY `_BairrosInteresseToComprador_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BairrosInteresseToComprador` DROP FOREIGN KEY `_BairrosInteresseToComprador_B_fkey`;

-- DropTable
DROP TABLE `AluguelApartamento`;

-- DropTable
DROP TABLE `AluguelCasa`;

-- DropTable
DROP TABLE `BairrosInteresse`;

-- DropTable
DROP TABLE `CaracteristicasAluguel`;

-- DropTable
DROP TABLE `CaracteristicasAluguelApartamento`;

-- DropTable
DROP TABLE `CaracteristicasCompraApartamento`;

-- DropTable
DROP TABLE `CaracteristicasCondominio`;

-- DropTable
DROP TABLE `CaracteristicasVenda`;

-- DropTable
DROP TABLE `CompraApartamento`;

-- DropTable
DROP TABLE `Comprador`;

-- DropTable
DROP TABLE `InteresseImovel`;

-- DropTable
DROP TABLE `VendaCasa`;

-- DropTable
DROP TABLE `_BairrosInteresseToComprador`;

-- CreateTable
CREATE TABLE `_bairrosinteressetocomprador` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    INDEX `_BairrosInteresseToComprador_B_index`(`B`),
    UNIQUE INDEX `_BairrosInteresseToComprador_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluguelapartamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interesse` VARCHAR(191) NOT NULL DEFAULT 'ALUGUEL',
    `area_construida` DOUBLE NOT NULL,
    `quartos` INTEGER NOT NULL,
    `banheiros` INTEGER NOT NULL,
    `vagas_garagem` INTEGER NOT NULL,
    `andar` INTEGER NOT NULL,
    `condominio` VARCHAR(191) NOT NULL,
    `valor_cond` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluguelcasa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interesse` VARCHAR(191) NOT NULL DEFAULT 'ALUGUEL',
    `area_construida` DOUBLE NOT NULL,
    `quartos` INTEGER NOT NULL,
    `banheiros` INTEGER NOT NULL,
    `vagas_garagem` INTEGER NOT NULL,
    `posicao_imovel` VARCHAR(191) NOT NULL,
    `condominio` VARCHAR(191) NOT NULL,
    `valor_cond` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bairrosinteresse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `caracteristicasaluguel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aluguel_casa_id` INTEGER NOT NULL,
    `ar_condicionado` BOOLEAN NOT NULL,
    `area_servico` BOOLEAN NOT NULL,
    `armarios_cozinha` BOOLEAN NOT NULL,
    `armarios_quarto` BOOLEAN NOT NULL,
    `mobiliado` BOOLEAN NOT NULL,
    `varanda` BOOLEAN NOT NULL,
    `area_murada` BOOLEAN NOT NULL,
    `condominio_fechado` BOOLEAN NOT NULL,
    `permitido_animais` BOOLEAN NOT NULL,
    `piscina` BOOLEAN NOT NULL,
    `portao_eletronico` BOOLEAN NOT NULL,

    INDEX `CaracteristicasAluguel_aluguel_casa_id_fkey`(`aluguel_casa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `caracteristicasaluguelapartamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aluguel_apartamento_id` INTEGER NOT NULL,
    `ar_condicionado` BOOLEAN NOT NULL,
    `area_servico` BOOLEAN NOT NULL,
    `armarios_cozinha` BOOLEAN NOT NULL,
    `armarios_quarto` BOOLEAN NOT NULL,
    `mobiliado` BOOLEAN NOT NULL,
    `varanda` BOOLEAN NOT NULL,
    `area_murada` BOOLEAN NOT NULL,
    `condominio_fechado` BOOLEAN NOT NULL,
    `permitido_animais` BOOLEAN NOT NULL,
    `piscina` BOOLEAN NOT NULL,
    `portao_eletronico` BOOLEAN NOT NULL,

    INDEX `CaracteristicasAluguelApartamento_aluguel_apartamento_id_fkey`(`aluguel_apartamento_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `caracteristicascompraapartamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compra_apartamento_id` INTEGER NOT NULL,
    `ar_condicionado` BOOLEAN NOT NULL,
    `area_servico` BOOLEAN NOT NULL,
    `armarios_cozinha` BOOLEAN NOT NULL,
    `armarios_quarto` BOOLEAN NOT NULL,
    `mobiliado` BOOLEAN NOT NULL,
    `varanda` BOOLEAN NOT NULL,
    `area_murada` BOOLEAN NOT NULL,
    `condominio_fechado` BOOLEAN NOT NULL,
    `piscina` BOOLEAN NOT NULL,
    `portao_eletronico` BOOLEAN NOT NULL,

    INDEX `CaracteristicasCompraApartamento_compra_apartamento_id_fkey`(`compra_apartamento_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `caracteristicascondominio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imovel_id` INTEGER NOT NULL,
    `tipo_imovel` VARCHAR(191) NOT NULL,
    `area_murada` BOOLEAN NOT NULL,
    `condominio_fechado` BOOLEAN NOT NULL,
    `permitido_animais` BOOLEAN NOT NULL,
    `piscina` BOOLEAN NOT NULL,
    `portao_eletronico` BOOLEAN NOT NULL,
    `seguranca_24h` BOOLEAN NOT NULL,

    INDEX `CaracteristicasCondominio_imovel_id_fkey`(`imovel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `caracteristicasvenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `venda_casa_id` INTEGER NOT NULL,
    `ar_condicionado` BOOLEAN NOT NULL,
    `area_servico` BOOLEAN NOT NULL,
    `armarios_cozinha` BOOLEAN NOT NULL,
    `armarios_quarto` BOOLEAN NOT NULL,
    `mobiliado` BOOLEAN NOT NULL,
    `varanda` BOOLEAN NOT NULL,
    `area_murada` BOOLEAN NOT NULL,
    `condominio_fechado` BOOLEAN NOT NULL,
    `piscina` BOOLEAN NOT NULL,
    `portao_eletronico` BOOLEAN NOT NULL,

    INDEX `CaracteristicasVenda_venda_casa_id_fkey`(`venda_casa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compraapartamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interesse` VARCHAR(191) NOT NULL DEFAULT 'VENDA',
    `area_construida` DOUBLE NOT NULL,
    `quartos` INTEGER NOT NULL,
    `banheiros` INTEGER NOT NULL,
    `vagas_garagem` INTEGER NOT NULL,
    `andar` INTEGER NOT NULL,
    `condominio` VARCHAR(191) NOT NULL,
    `valor_cond` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comprador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `valor_disponivel` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interesseimovel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comprador_id` INTEGER NOT NULL,
    `imovel_id` INTEGER NOT NULL,
    `tipo_imovel` VARCHAR(191) NOT NULL,
    `data_interesse` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `InteresseImovel_comprador_fkey`(`comprador_id`),
    INDEX `InteresseImovel_venda_casa_fkey`(`imovel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendacasa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interesse` VARCHAR(191) NOT NULL DEFAULT 'VENDA',
    `area_construida` DOUBLE NOT NULL,
    `quartos` INTEGER NOT NULL,
    `banheiros` INTEGER NOT NULL,
    `vagas_garagem` INTEGER NOT NULL,
    `posicao_imovel` VARCHAR(191) NOT NULL,
    `condominio` VARCHAR(191) NOT NULL,
    `valor_cond` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comprador_id` INTEGER NOT NULL,
    `imovel_id` INTEGER NOT NULL,
    `data_visita` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comentario` VARCHAR(191) NULL,

    INDEX `Visitas_comprador_fkey`(`comprador_id`),
    INDEX `Visitas_imovel_fkey`(`imovel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
