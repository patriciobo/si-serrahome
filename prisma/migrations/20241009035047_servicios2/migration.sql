/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Servicios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Servicios_nombre_key" ON "Servicios"("nombre");
