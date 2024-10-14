-- AlterTable
ALTER TABLE "Unidad" ADD COLUMN     "propiedadId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Propiedad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unidad" ADD CONSTRAINT "Unidad_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "Propiedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
