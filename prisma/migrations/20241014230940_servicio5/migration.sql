/*
  Warnings:

  - You are about to drop the `Servicios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiciosXUnidad" DROP CONSTRAINT "ServiciosXUnidad_servicioId_fkey";

-- DropTable
DROP TABLE "Servicios";

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Servicio_nombre_key" ON "Servicio"("nombre");

-- AddForeignKey
ALTER TABLE "ServiciosXUnidad" ADD CONSTRAINT "ServiciosXUnidad_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
