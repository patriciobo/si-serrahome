<<<<<<< Updated upstream
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { insertarReserva } from "../../actions/reservas/reservas";
import { BiCheck } from "react-icons/bi";
=======
'use client';
import { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { insertarReserva } from '../../actions/reservas/reservas';
>>>>>>> Stashed changes

type Inputs = {
  nombre: string;
  telefono: string;
  email: string;
  fechaInicio: Date;
  fechaFin: Date;
  cantidadPersonas: number;
  precioTotal: number;
  pagoParcial: number;
};

const unidades = [
  {
    id: 1,
    nombre: "Cabaña 1",
  },
  {
    id: 2,
    nombre: "Cabaña 2",
  },
  {
    id: 3,
    nombre: "Cabaña 3",
  },
];

<<<<<<< Updated upstream
export const ModalReserva = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(1);
  const [mostrarToast, setMostrarToast] = useState(false);
=======
export const ModalReserva = ({
	setIsOpen,
	setMostrarToast,
	reserva,
}: Props) => {
	const [unidadSeleccionada, setUnidadSeleccionada] = useState(1);
>>>>>>> Stashed changes

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const fechaInicio = new Date(data.fechaInicio).toISOString();
    const fechaFin = new Date(data.fechaFin).toISOString();

    const reserva = {
      precioTotal: +data.precioTotal,
      cantidadPersonas: +data.cantidadPersonas,
      pagoParcial: +data.pagoParcial,
      fechaInicio,
      fechaFin,
      unidadId: +unidadSeleccionada,
    };

    const cliente = {
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
    };

    await insertarReserva(reserva, cliente);

    setIsOpen(false);
    setMostrarToast(true);
    reset();
  };

<<<<<<< Updated upstream
  const handleSeleccionUnidad = (event) => {
    setUnidadSeleccionada(event.target.value);
  };
  // console.log(watch('fechaInicio')); // watch input value by passing the name of it

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
              <p className="font-bold">Se guardó la reserva!</p>
            </div>
          </button>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-md shadow border-verdeIntermedio border-2"
        >
          <div className="absolute inset-0 w-3 bg-verdeIntermedio transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-verdeOscuro group-hover:text-white">
            Reservar
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10 overflow-y-scroll">
          <section>
            <div className="mx-auto max-y max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                  <div className="flex text-md justify-center select-none whitespace-nowrap rounded-lg bg-verdeIntermedio py-2 px-3.5 align-baseline font-sans font-bold uppercase leading-none text-white">
                    <div className="mt-px">Cliente</div>
                  </div>
                  <div className="">
                    <label className="sr-only">Nombre y Apellido</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.nombre
                          ? "focus:ring-red-500 focus:outline-red-300 border-2 focus:border border-red-500 focus:border-red-500"
                          : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                      }`}
                      placeholder="Nombre y Apellido"
                      type="text"
                      id="nombre"
                      autoFocus
                      {...register("nombre", { required: true })}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 py-2">
                    <div className="">
                      <label className="sr-only">Email</label>
                      <input
                        className="w-full rounded-lg border-gray-400 text-oscuro text-md focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                        placeholder="Email"
                        type="email"
                        id="email"
                        {...register("email")}
                      />
                    </div>

                    <div className="">
                      <label className="sr-only">Telefono</label>
                      <input
                        className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                          errors.telefono
                            ? "focus:ring-red-500 focus:outline-red-300 border-2 focus:border border-red-500 focus:border-red-500"
                            : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                        }`}
                        placeholder="Teléfono"
                        type="tel"
                        id="telefono"
                        {...register("telefono", { required: true })}
                      />
                    </div>
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                  <div className="flex text-md justify-center select-none whitespace-nowrap rounded-lg bg-naranja py-2 px-3.5 align-baseline font-sans font-bold uppercase leading-none text-white">
                    <div className="mt-px">Reserva</div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 py-2">
                    <div>
                      <label className="sr-only">Desde</label>
                      <input
                        className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                          errors.fechaInicio
                            ? "focus:ring-red-500 focus:outline-red-300 border-2 focus:border border-red-500 focus:border-red-500"
                            : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                        }`}
                        placeholder="Fecha de Inicio"
                        type="date"
                        id="desde"
                        {...register("fechaInicio", { required: true })}
                      />
                    </div>

                    <div>
                      <label className="sr-only">Hasta</label>
                      <input
                        className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                          errors.fechaFin
                            ? "focus:ring-red-500 focus:outline-red-300 border-2 focus:border border-red-500 focus:border-red-500"
                            : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                        }`}
                        placeholder="Fecha de Fin"
                        type="date"
                        id="hasta"
                        {...register("fechaFin", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 pb-2">
                    {unidades.map((unidad) => (
                      <div key={unidad.id}>
                        <label
                          className="block w-full cursor-pointer rounded-lg border p-2 border-gray-400 text-oscuro hover:border-black has-[:checked]:border-marron has-[:checked]:bg-marron has-[:checked]:text-white"
                          tabIndex="0"
                        >
                          <input
                            className="sr-only"
                            id={unidad.id}
                            type="radio"
                            tabIndex="-1"
                            name="unidad"
                            value={unidad.id}
                            defaultChecked={unidad.id === 1}
                            onChange={handleSeleccionUnidad}
                          />
                          <span className="text-md">{unidad.nombre}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="sr-only">Personas</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.cantidadPersonas
                          ? "focus:ring-red-500 focus:outline-red-300 border-2 focus:border border-red-500 focus:border-red-500"
                          : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                      }`}
                      placeholder="Cant. Personas"
                      type="number"
                      id="personas"
                      {...register("cantidadPersonas", { required: true })}
                    />
                  </div>

                  <hr className="border-t border-gray-300 my-4" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 py-2">
                    <div>
                      <div className="flex items-center">
                        <label className="sr-only">Seña</label>
                        <span className="text-md text-verdeIntermedio font-bold p-2 border border-verdeIntermedio rounded-l-lg h-full">
                          $
                        </span>
                        <input
                          className="w-full rounded-r-lg border-gray-400 text-md text-oscuro focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                          placeholder="Seña"
                          type="number"
                          id="sena"
                          {...register("pagoParcial")}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="sr-only">Monto Total</label>
                      <div className="flex items-center">
                        <span className="text-md text-verdeIntermedio font-bold p-2 border border-verdeIntermedio rounded-l-lg h-full">
                          $
                        </span>
                        <input
                          className={`w-full rounded-r-lg border-gray-400 text-md text-oscuro ${
                            errors.precioTotal
                              ? "focus:ring-red-500 focus:outline-red-300 border-2 focus:border border-red-500 focus:border-red-500"
                              : "focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro"
                          }`}
                          placeholder="Total"
                          type="number"
                          id="precioTotal"
                          {...register("precioTotal", { required: true })}
                        />
                      </div>
                    </div>
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
                      Reservar
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
=======
	const handleSeleccionUnidad = (event) => {
		setUnidadSeleccionada(event.target.value);
	};

	return (
		<>
			<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10 overflow-y-scroll'>
				<section>
					<div className='mx-auto max-y max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8'>
						<div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-10'>
							<form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
								<div className='flex text-md justify-center select-none whitespace-nowrap rounded-lg bg-verdeIntermedio py-2 px-3.5 align-baseline font-sans font-bold uppercase leading-none text-white'>
									<div className='mt-px'>Cliente</div>
								</div>
								<div className=''>
									<label className='sr-only'>Nombre y Apellido</label>
									<input
										className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
											errors.nombre
												? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
												: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
										}`}
										placeholder='Nombre y Apellido *'
										type='text'
										id='nombre'
										autoFocus
										{...register('nombre', { required: true })}
									/>
								</div>

								<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 py-2'>
									<div className=''>
										<label className='sr-only'>Email</label>
										<input
											className='w-full rounded-lg border-gray-400 text-oscuro text-md focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
											placeholder='Email'
											type='email'
											id='email'
											{...register('email')}
										/>
									</div>

									<div className=''>
										<label className='sr-only'>Telefono</label>
										<input
											className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
												errors.telefono
													? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
													: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
											}`}
											placeholder='Teléfono *'
											type='tel'
											id='telefono'
											{...register('telefono', { required: true })}
										/>
									</div>
								</div>
								<hr className='border-t border-gray-300 my-4' />
								<div className='flex text-md justify-center select-none whitespace-nowrap rounded-lg bg-verdeIntermedio py-2 px-3.5 align-baseline font-sans font-bold uppercase leading-none text-white'>
									<div className='mt-px'>Reserva</div>
								</div>
								<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 py-2'>
									<div>
										<label className='sr-only'>Desde</label>
										<input
											className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
												errors.fechaInicio
													? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
													: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
											}`}
											placeholder='Fecha de Inicio *'
											type='date'
											id='desde'
											{...register('fechaInicio', { required: true })}
										/>
									</div>

									<div>
										<label className='sr-only'>Hasta</label>
										<input
											className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
												errors.fechaFin
													? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
													: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
											}`}
											placeholder='Fecha de Fin *'
											type='date'
											id='hasta'
											{...register('fechaFin', { required: true })}
										/>
									</div>
								</div>

								<div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3 pb-2'>
									{unidades.map((unidad) => (
										<div key={unidad.id}>
											<label
												className='block w-full cursor-pointer rounded-lg border p-2 border-gray-400 text-oscuro hover:border-black has-[:checked]:border-verdeClaro has-[:checked]:bg-verdeClaro has-[:checked]:text-white'
												tabIndex='0'
											>
												<input
													className='sr-only'
													id={unidad.id}
													type='radio'
													tabIndex='-1'
													name='unidad'
													value={unidad.id}
													defaultChecked={unidad.id === 1}
													onChange={handleSeleccionUnidad}
												/>
												<span className='text-md'>{unidad.nombre}</span>
											</label>
										</div>
									))}
								</div>
								<div>
									<label className='sr-only'>Personas</label>
									<input
										className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
											errors.cantidadPersonas
												? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
												: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
										}`}
										placeholder='Cant. Personas *'
										type='number'
										id='personas'
										{...register('cantidadPersonas', { required: true })}
									/>
								</div>

								<hr className='border-t border-gray-300 my-4' />
								<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 py-2'>
									<div>
										<div className='flex items-center'>
											<label className='sr-only'>Seña</label>
											<span className='text-md text-verdeIntermedio font-bold p-2 border border-verdeIntermedio rounded-l-lg h-full'>
												$
											</span>
											<input
												className='w-full rounded-r-lg border-gray-400 text-md text-oscuro focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
												placeholder='Seña'
												type='number'
												id='sena'
												{...register('pagoParcial')}
											/>
										</div>
									</div>
									<div>
										<label className='sr-only'>Monto Total</label>
										<div className='flex items-center'>
											<span className='text-md text-verdeIntermedio font-bold p-2 border border-verdeIntermedio rounded-l-lg h-full'>
												$
											</span>
											<input
												className={`w-full rounded-r-lg border-gray-400 text-md text-oscuro ${
													errors.precioTotal
														? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
														: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
												}`}
												placeholder='Total *'
												type='number'
												id='precioTotal'
												{...register('precioTotal', { required: true })}
											/>
										</div>
									</div>
								</div>

								<div className='flex mt-4 items-center justify-end'>
									<span className='text-red-500 mr-4'>
										* Campos Requeridos.
									</span>
									<button
										className='shadow text-md bg-white border mr-4 border-naranja hover:bg-naranja hover:text-white focus:outline-none text-naranja font-bold py-2 px-4 rounded'
										type='button'
										onClick={() => setIsOpen(false)}
									>
										Cancelar
									</button>
									<button
										className='shadow text-md bg-verdeIntermedio hover:bg-verdeClaro focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
										type='submit'
									>
										Reservar
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</div>
		</>
	);
>>>>>>> Stashed changes
};
