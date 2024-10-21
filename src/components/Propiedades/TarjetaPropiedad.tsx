import React from "react";
import { Propiedad } from "@prisma/client";
// import { redirect } from "next/dist/server/api-utils";

interface Props {
  propiedades: Propiedad[];
}

export const TarjetaPropiedad = ({ propiedades = [] }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {propiedades.map((propiedad, index) => (
        <div
          key={index}
          className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white cursor-pointer"
          // onClick={() => redirect(`/dashboard/propiedades/${propiedad.id}`)}
        >
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <img
              src="https://altolasflores.com.ar/assets/img/portfolio/exterior3.webp"
              alt="property image"
              className="rounded-xl"
            />
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">
              {propiedad.nombre}
            </h3>
            <p className="md:text-lg text-gray-500 text-base">
              {propiedad.tipo}
            </p>
            <p className="md:text-lg text-gray-500 text-base">
              {propiedad.calle.ciudad.provincia.pais.nombre}
              {", "}
              {propiedad.calle.ciudad.provincia.nombre}
            </p>
            <p className="md:text-lg text-gray-500 text-base">
              {propiedad.calle.ciudad.nombre}
              {", "}
              {propiedad.calle.nombre} {propiedad.numero}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TarjetaPropiedad;
