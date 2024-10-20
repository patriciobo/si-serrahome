-- CreateEnum
CREATE TYPE "EstadoUnidad" AS ENUM ('DISPONIBLE', 'NO_DISPONIBLE');

-- AlterTable
ALTER TABLE "Unidad" ADD COLUMN     "estado" "EstadoUnidad" NOT NULL DEFAULT 'DISPONIBLE',
ADD COLUMN     "imagenes" TEXT[],
ADD COLUMN     "precioPorNoche" DOUBLE PRECISION,
ADD COLUMN     "servicios" TEXT[],
ADD COLUMN     "tipoUnidad" TEXT NOT NULL DEFAULT 'TIPO_POR_DEFECTO';
