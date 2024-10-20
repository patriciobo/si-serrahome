/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Unidad` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Unidad_nombre_key" ON "Unidad"("nombre");
