/*
  Warnings:

  - You are about to drop the `Servicio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Servicio" DROP CONSTRAINT "Servicio_unidadId_fkey";

-- DropTable
DROP TABLE "Servicio";

-- CreateTable
CREATE TABLE "Servicios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Servicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiciosXUnidad" (
    "unidadId" INTEGER NOT NULL,
    "servicioId" INTEGER NOT NULL,

    CONSTRAINT "ServiciosXUnidad_pkey" PRIMARY KEY ("unidadId","servicioId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Servicios_nombre_key" ON "Servicios"("nombre");

-- AddForeignKey
ALTER TABLE "ServiciosXUnidad" ADD CONSTRAINT "ServiciosXUnidad_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiciosXUnidad" ADD CONSTRAINT "ServiciosXUnidad_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
