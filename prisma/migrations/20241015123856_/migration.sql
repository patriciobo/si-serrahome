/*
  Warnings:

  - Made the column `email` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `propiedadId` to the `Unidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Unidad" ADD COLUMN     "propiedadId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Pais" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ciudad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,

    CONSTRAINT "Ciudad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calle" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ciudadId" INTEGER NOT NULL,

    CONSTRAINT "Calle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propiedad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "calleId" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unidad" ADD CONSTRAINT "Unidad_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "Propiedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provincia" ADD CONSTRAINT "Provincia_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ciudad" ADD CONSTRAINT "Ciudad_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calle" ADD CONSTRAINT "Calle_ciudadId_fkey" FOREIGN KEY ("ciudadId") REFERENCES "Ciudad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_calleId_fkey" FOREIGN KEY ("calleId") REFERENCES "Calle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
