/*
  Warnings:

  - You are about to drop the column `estado` on the `Unidad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Unidad" DROP COLUMN "estado";

-- DropEnum
DROP TYPE "EstadoUnidad";
