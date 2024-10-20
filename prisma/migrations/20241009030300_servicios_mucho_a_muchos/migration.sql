/*
  Warnings:

  - You are about to drop the column `servicios` on the `Unidad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Unidad" DROP COLUMN "servicios";

-- CreateTable
CREATE TABLE "Servicios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Servicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UnidadServicios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UnidadServicios_AB_unique" ON "_UnidadServicios"("A", "B");

-- CreateIndex
CREATE INDEX "_UnidadServicios_B_index" ON "_UnidadServicios"("B");

-- AddForeignKey
ALTER TABLE "_UnidadServicios" ADD CONSTRAINT "_UnidadServicios_A_fkey" FOREIGN KEY ("A") REFERENCES "Servicios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UnidadServicios" ADD CONSTRAINT "_UnidadServicios_B_fkey" FOREIGN KEY ("B") REFERENCES "Unidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
