/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `comprador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `comprador_telefone_key` ON `comprador`(`telefone`);
