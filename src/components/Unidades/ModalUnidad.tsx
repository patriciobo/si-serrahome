"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { insertarUnidad } from "../../actions/unidades/unidades";
import { BiCheck } from "react-icons/bi";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { only } from "node:test";
import SelectServicios from "../commons/AsyncSelect";

type Inputs = {
  tipoUnidad: string;
  nombre: string;
  capacidad: number;
  servicios: string;
  precioPorNoche?: number;
  imagenes: string;
  propiedadId: number;
};

export const ModalUnidad = (propidadesId: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<any[]>(
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const unidad = {
      tipoUnidad: data.tipoUnidad,
      nombre: data.nombre,
      capacidad: +data.capacidad,
      servicios: serviciosSeleccionados.map((servicio) => servicio.value),
      //servicios: data.servicios.split(',').map((serv) => serv.trim()),
      precioPorNoche: data.precioPorNoche ? +data.precioPorNoche : undefined,
      imagenes: data.imagenes.split(",").map((img) => img.trim()),
      propiedadId: propidadesId,
    };
    try {
      await insertarUnidad(unidad);
      setMostrarToast(true);
      reset();
      setServiciosSeleccionados([]);
      setIsOpen(false);
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Error desconocido al insertar la unidad.");
      }
    }
  };

  return (
    <>
      <div className="mb-10">
        {mostrarToast && (
          <button
            type="button"
            onClick={() => setMostrarToast(false)}
            className="fixed left top-4 z-50 transition-duration-300 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            <div className="flex items-center space-x-2">
              <span className="text-3xl">
                <BiCheck />
              </span>
              <p className="font-bold">Se guardó la unidad!</p>
            </div>
          </button>
        )}

        {errorMessage && (
          <div className="fixed left top-4 z-50 transition-duration-300 rounded-md bg-red-500 px-4 py-2 text-white transition">
            {errorMessage}
          </div>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-md shadow border-verdeIntermedio border-2"
        >
          <div className="absolute inset-0 w-3 bg-verdeIntermedio transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-verdeOscuro group-hover:text-white">
            Registrar Unidad
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10 overflow-y-scroll">
          <section>
            <div className="mx-auto max-y max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                  <div className="text-md justify-center select-none whitespace-nowrap rounded-lg bg-verdeIntermedio py-2 px-3.5 align-baseline font-sans font-bold uppercase leading-none text-white text-center">
                    Registrar Unidad
                  </div>

                  <div className="">
                    <label className="sr-only">Tipo de Unidad</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.tipoUnidad
                          ? "focus:ring-red-500 focus:outline-red-300 border-2 border-red-500"
                          : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                      }`}
                      placeholder="Tipo de Unidad (e.g. Cabaña, Habitación)"
                      type="text"
                      {...register("tipoUnidad", { required: true })}
                    />
                  </div>

                  <div className="">
                    <label className="sr-only">Nombre</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.nombre
                          ? "focus:ring-red-500 focus:outline-red-300 border-2 border-red-500"
                          : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                      }`}
                      placeholder="Nombre"
                      type="text"
                      {...register("nombre", { required: true })}
                    />
                  </div>

                  <div className="">
                    <label className="sr-only">Capacidad</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.capacidad
                          ? "focus:ring-red-500 focus:outline-red-300 border-2 border-red-500"
                          : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                      }`}
                      placeholder="Capacidad"
                      type="number"
                      {...register("capacidad", { required: true })}
                    />
                  </div>

                  <div className=" rounded-lg border-gray-400 text-md text-oscuro focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro">
                    <SelectServicios
                      onChange={(selected) =>
                        setServiciosSeleccionados(selected)
                      }
                    />
                  </div>

                  <div className="">
                    <label className="sr-only">Precio por Noche</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.precioPorNoche
                          ? "focus:ring-red-500 focus:outline-red-300 border-2 border-red-500"
                          : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                      }`}
                      placeholder="Precio por Noche"
                      type="number"
                      {...register("precioPorNoche")}
                    />
                  </div>

                  <div className="">
                    <label className="sr-only">Imágenes</label>
                    <input
                      className="w-full rounded-lg border-gray-400 text-md text-oscuro focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                      placeholder="URLs de Imágenes (separadas por comas)"
                      type="text"
                      {...register("imagenes", {
                        required: true,
                        validate: (value) => {
                          return value.trim().length > 0;
                        },
                      })}
                    />
                  </div>

                  <div className="flex mt-4 items-center justify-end">
                    {hasErrors && (
                      <span className="text-red-500 mr-4">
                        * Campos Requeridos.
                      </span>
                    )}
                    <button
                      className="shadow text-md bg-white border mr-4 border-naranja hover:bg-naranja hover:text-white focus:outline-none text-naranja font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="shadow text-md bg-verdeIntermedio hover:bg-verdeClaro focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Guardar Unidad
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
