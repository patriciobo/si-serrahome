/*
  Warnings:

  - You are about to drop the `_UnidadServicios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UnidadServicios" DROP CONSTRAINT "_UnidadServicios_A_fkey";

-- DropForeignKey
ALTER TABLE "_UnidadServicios" DROP CONSTRAINT "_UnidadServicios_B_fkey";

-- DropTable
DROP TABLE "_UnidadServicios";

-- CreateTable
CREATE TABLE "ServiciosXUnidad" (
    "unidadId" INTEGER NOT NULL,
    "servicioId" INTEGER NOT NULL,

    CONSTRAINT "ServiciosXUnidad_pkey" PRIMARY KEY ("unidadId","servicioId")
);

-- AddForeignKey
ALTER TABLE "ServiciosXUnidad" ADD CONSTRAINT "ServiciosXUnidad_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiciosXUnidad" ADD CONSTRAINT "ServiciosXUnidad_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
