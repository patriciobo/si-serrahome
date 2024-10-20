/*
  Warnings:

  - You are about to drop the `Servicios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiciosXUnidad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiciosXUnidad" DROP CONSTRAINT "ServiciosXUnidad_servicioId_fkey";

-- DropForeignKey
ALTER TABLE "ServiciosXUnidad" DROP CONSTRAINT "ServiciosXUnidad_unidadId_fkey";

-- DropTable
DROP TABLE "Servicios";

-- DropTable
DROP TABLE "ServiciosXUnidad";

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "unidadId" INTEGER NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Servicio_nombre_key" ON "Servicio"("nombre");

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
