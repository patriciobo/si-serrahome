import React from "react";
import TarjetaPropiedad from "@/components/Propiedades/TarjetaPropiedad";
import { getPropiedadesPaginadas } from "@/actions/propiedades/propiedades-paginadas";
import { ModalPropiedad } from "@/components/Propiedades/ModalPropiedad";

export const metadata = {
  title: "Propiedades",
  description: "Página de gestión de Propiedades",
};

interface Props {
  searchParams: { pagina?: string };
}

export default async function Propiedades({ searchParams }: Props) {
  const pagina = searchParams.pagina ? parseInt(searchParams.pagina) : 1;
  const { propiedades } = await getPropiedadesPaginadas({ pagina });

  return (
    <>
      {/* Titulo
      <div className="flex justify-center mb-6">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-400 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-verdeIntermedio to-verdeClaro">
            Gestión de{" "}
          </span>
          <span className="underline underline-offset-3 decoration-8 decoration-verdeClaro">
            Propiedades
          </span>
        </h1>
      </div>
    */}
      <div className="flex justify-center mb-6">
        <ModalPropiedad />
      </div>
      <div>
        <TarjetaPropiedad propiedades={propiedades} />{" "}
      </div>
    </>
  );
}
