-- DropIndex
DROP INDEX "Unidad_nombre_key";

-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Unidad" ADD COLUMN     "servicios" TEXT[];
