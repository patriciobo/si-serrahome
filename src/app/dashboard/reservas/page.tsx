import prisma from "@/lib/prisma";
import Tabla from "../../../components/Reservas/Tabla";
import { Reserva } from "@prisma/client";
import { ModalReserva } from "../../../components/Reservas/ModalReserva";
import { getReservasPaginadas } from "../../../actions/reservas/reservas-paginadas";

export const metadata = {
  title: "Reservas",
  description: "Reservas",
};

interface Props {
  searchParams: {
    pagina?: string;
  };
}

export default async function Reservas({ searchParams }: Props) {
  const pagina = searchParams.pagina ? parseInt(searchParams.pagina) : 1;

  const { reservas, cantidadPaginas, totalReservas } =
    await getReservasPaginadas({ pagina });

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <ModalReserva />
      <Tabla
        reservas={reservas}
        totalReservas={totalReservas}
        cantidadPaginas={cantidadPaginas}
      />
    </div>
  );
}
