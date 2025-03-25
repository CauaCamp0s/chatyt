-- CreateTable
CREATE TABLE `CompraApartamento` (
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
CREATE TABLE `AluguelApartamento` (
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
CREATE TABLE `CaracteristicasCompraApartamento` (
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaracteristicasAluguelApartamento` (
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendaCasa` (
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
CREATE TABLE `AluguelCasa` (
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
CREATE TABLE `CaracteristicasVenda` (
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaracteristicasAluguel` (
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaracteristicasCondominio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imovel_id` INTEGER NOT NULL,
    `tipo_imovel` VARCHAR(191) NOT NULL,
    `area_murada` BOOLEAN NOT NULL,
    `condominio_fechado` BOOLEAN NOT NULL,
    `permitido_animais` BOOLEAN NOT NULL,
    `piscina` BOOLEAN NOT NULL,
    `portao_eletronico` BOOLEAN NOT NULL,
    `seguranca_24h` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BairrosInteresse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comprador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `valor_disponivel` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InteresseImovel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comprador_id` INTEGER NOT NULL,
    `imovel_id` INTEGER NOT NULL,
    `tipo_imovel` VARCHAR(191) NOT NULL,
    `data_interesse` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BairrosInteresseToComprador` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BairrosInteresseToComprador_AB_unique`(`A`, `B`),
    INDEX `_BairrosInteresseToComprador_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CaracteristicasCompraApartamento` ADD CONSTRAINT `CaracteristicasCompraApartamento_compra_apartamento_id_fkey` FOREIGN KEY (`compra_apartamento_id`) REFERENCES `CompraApartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaracteristicasAluguelApartamento` ADD CONSTRAINT `CaracteristicasAluguelApartamento_aluguel_apartamento_id_fkey` FOREIGN KEY (`aluguel_apartamento_id`) REFERENCES `AluguelApartamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaracteristicasVenda` ADD CONSTRAINT `CaracteristicasVenda_venda_casa_id_fkey` FOREIGN KEY (`venda_casa_id`) REFERENCES `VendaCasa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaracteristicasAluguel` ADD CONSTRAINT `CaracteristicasAluguel_aluguel_casa_id_fkey` FOREIGN KEY (`aluguel_casa_id`) REFERENCES `AluguelCasa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaracteristicasCondominio` ADD CONSTRAINT `CaracteristicasCondominio_imovel_id_fkey` FOREIGN KEY (`imovel_id`) REFERENCES `VendaCasa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InteresseImovel` ADD CONSTRAINT `InteresseImovel_comprador_fkey` FOREIGN KEY (`comprador_id`) REFERENCES `Comprador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InteresseImovel` ADD CONSTRAINT `InteresseImovel_venda_casa_fkey` FOREIGN KEY (`imovel_id`) REFERENCES `VendaCasa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BairrosInteresseToComprador` ADD CONSTRAINT `_BairrosInteresseToComprador_A_fkey` FOREIGN KEY (`A`) REFERENCES `BairrosInteresse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BairrosInteresseToComprador` ADD CONSTRAINT `_BairrosInteresseToComprador_B_fkey` FOREIGN KEY (`B`) REFERENCES `Comprador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
