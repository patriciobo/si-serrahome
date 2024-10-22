'use client';
import { useState, useEffect } from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
	getUnidadesDisponibles,
	insertarReserva,
} from '../../actions/reservas/reservas';
import Unidades from '@/app/dashboard/unidades/page';
import { getAllPropiedades } from '@/actions/propiedades/propiedades';
import { getUnidadesPorPropiedad } from '@/actions/unidades/unidades';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Inputs = {
	nombre: string;
	telefono: string;
	email: string;
	rangoFechas: Date[];
	cantidadPersonas: number;
	propiedadId: number;
	unidadId: number;
	precioTotal: number;
	pagoParcial: number;
};

export const ModalReserva = ({
	setIsOpen,
	setMostrarToast,
	reserva,
}: Props) => {
	const [isMounted, setIsMounted] = useState(false);
	const [propiedades, setPropiedades] = useState();
	const [unidades, setUnidades] = useState();
	const [fechaInicio, setFechaInicio] = useState(null);
	const [fechaFin, setFechaFin] = useState(null);
	const [mostrarMensajeSinDisponibilidad, setMostrarMensajeSinDisponibilidad] =
		useState(false);

	const {
		control,
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>();
	const hasErrors = Object.keys(errors).length > 0;

	const propiedadId = watch('propiedadId');
	const rangoFechas = watch('rangoFechas');
	const cantPersonas = watch('cantidadPersonas');

	useEffect(() => {
		const buscarPropiedades = async () => {
			try {
				const response = await getAllPropiedades();
				setPropiedades(response);
			} catch (error) {
				console.error('Error buscando propiedades: ', error);
			}
		};

		buscarPropiedades();
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const buscarUnidades = async () => {
			try {
				const unidadesDisponibles = await getUnidadesDisponibles(
					+propiedadId,
					cantPersonas,
					rangoFechas[0],
					rangoFechas[1]
				);

				if (unidadesDisponibles && unidadesDisponibles.length === 0) {
					setMostrarMensajeSinDisponibilidad(true);
				} else {
					setMostrarMensajeSinDisponibilidad(false);
				}
				setUnidades(unidadesDisponibles);
			} catch (error) {
				console.error('Error buscando unidades disponibles: ', error);
			}
		};

		if (propiedadId > 0 && cantPersonas && rangoFechas[0] && rangoFechas[1]) {
			buscarUnidades();
		} else {
			setUnidades();
		}
	}, [propiedadId, cantPersonas, rangoFechas]);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const fechaInicio = new Date(data.rangoFechas[0]).toISOString();
		const fechaFin = new Date(data.rangoFechas[1]).toISOString();

		const reserva = {
			precioTotal: +data.precioTotal,
			cantidadPersonas: +data.cantidadPersonas,
			pagoParcial: +data.pagoParcial,
			fechaInicio: data.rangoFechas[0],
			fechaFin: data.rangoFechas[1],
			unidadId: +data.unidadId,
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

	const handleFechasSeleccionadas = (fechas) => {
		const [inicio, fin] = fechas;
		setFechaInicio(inicio);
		setFechaFin(fin);
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
								<Controller
									name='rangoFechas'
									control={control}
									rules={{
										required: 'Las fechas de inicio y fin son requeridas',
										validate: (value) =>
											(value && value.length === 2 && value[0] && value[1]) ||
											'Ambas fechas son requeridas',
									}}
									render={({ field: { onChange, value } }) => (
										<DatePicker
											wrapperClassName='flex w-full items-center'
											contain
											className={`w-full text-center rounded-lg text-oscuro ${
												errors.rangoFechas
													? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
													: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
											}`}
											selected={fechaInicio}
											onChange={(fechas) => {
												onChange(fechas);
												handleFechasSeleccionadas(fechas);
											}}
											startDate={fechaInicio}
											endDate={fechaFin}
											selectsRange
											dateFormat='dd/MM/yyyy'
											placeholderText='Fechas de Inicio y Fin'
										/>
									)}
								/>

								<div className='py-2'>
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
								<div>
									<span className='text-verdeOscuro text-xs'>
										* Se debe completar la Fecha de Inicio, Fecha de Fin y
										Cantidad de Personas para visualizar las unidades
										disponibles.
									</span>
								</div>

								<hr className='border-t border-gray-300 my-4' />
								<div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-2 py-2'>
									<select
										className={`rounded-lg text-oscuro ${
											errors.propiedadId
												? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
												: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
										}`}
										defaultValue={0}
										{...register('propiedadId', {
											required: true,
											validate: (value) => value > 0,
										})}
									>
										Propiedades
										<option value={0}>Seleccionar Propiedad *</option>
										{propiedades &&
											propiedades.map((propiedad) => (
												<option key={propiedad.id} value={propiedad.id}>
													{propiedad.nombre}
												</option>
											))}
									</select>
									<select
										className={`rounded-lg text-oscuro ${
											errors.unidadId
												? 'focus:ring-red-400 focus:outline-red-400 border-2 focus:border border-red-400 focus:border-red-400'
												: 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
										}`}
										defaultValue={0}
										{...register('unidadId', {
											required: true,
											validate: (value) => value > 0,
										})}
									>
										Unidades
										<option value={0}>Seleccionar Unidad *</option>
										{unidades &&
											unidades.map((unidad) => (
												<option key={unidad.id} value={unidad.id}>
													{unidad.nombre}
												</option>
											))}
									</select>
								</div>

								{mostrarMensajeSinDisponibilidad && (
									<span className='text-red-400 text-xs'>
										* No se encontraron unidades disponibles en la propiedad
										para las fechas y cantidad de personas indicadas.
									</span>
								)}

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
};
