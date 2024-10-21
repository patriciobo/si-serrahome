'use server';

import prisma from '@/lib/prisma';
import { Cliente, EstadoReserva, Reserva } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const insertarReserva = async (reserva: Reserva, cliente: Cliente) => {
	try {
		if (
			await verificarDisponibilidad(
				reserva.unidadId,
				reserva.fechaInicio,
				reserva.fechaFin
			)
		) {
			console.log('Reserva: ', reserva);
			console.log('Cliente: ', cliente);
			const result = await prisma.$transaction(async (prisma) => {
				const clienteCreado = await prisma.cliente.create({
					data: cliente,
				});

				const reservaCreada = await prisma.reserva.create({
					data: {
						...reserva,
						clienteId: clienteCreado.id,
						estado:
							reserva.pagoParcial != null &&
							reserva.pagoParcial > 0 &&
							reserva.pagoParcial < reserva.precioTotal
								? EstadoReserva.PAGO_PARCIAL
								: reserva.pagoParcial === reserva.precioTotal
								? EstadoReserva.PAGADA
								: EstadoReserva.PENDIENTE,
					},
				});
			});
			revalidatePath('/dashboard/reservas');
			console.log('Resultado: ', result[1]);
			return result;
		} else {
			return {
				mensaje:
					'Existe otra reserva registrada para las fechas y unidad seleccionadas.',
			};
		}
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			throw new Error('Fallo al insertar reserva', { cause: error });
		} else {
			throw new Error('Fallo al insertar reserva');
		}
	}
};

async function verificarDisponibilidad(
	unidadId: number,
	fechaInicio: Date,
	fechaFin: Date
) {
	try {
		const reservaEnConflicto = await prisma.reserva.findFirst({
			where: {
				unidadId: +unidadId,
				AND: [
					{
						unidadId: +unidadId,
						fechaInicio: {
							lt: fechaFin,
						},
					},
					{
						unidadId: unidadId,
						fechaFin: {
							gt: fechaInicio,
						},
					},
				],
			},
		});

		return reservaEnConflicto ? false : true;
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
}

export const getUnidadesDisponibles = async (
	propiedadId: number,
	cantPersonas: number,
	fechaInicio: Date,
	fechaFin: Date
): Unidad[] => {
	try {
		const unidadesPosibles = await prisma.unidad.findMany({
			where: {
				propiedadId: propiedadId,
				AND: [
					{
						capacidad: {
							gte: +cantPersonas,
						},
					},
				],
			},
		});

		const disponibilidadUnidades = await Promise.all(
			unidadesPosibles.map(async (unidad) => {
				const disponible = await verificarDisponibilidad(
					unidad.id,
					fechaInicio,
					fechaFin
				);
				return { ...unidad, disponible };
			})
		);

		const unidadesLibres = disponibilidadUnidades.filter(
			(unidad) => unidad.disponible
		);

		return unidadesLibres;
	} catch (error) {
		console.log('Error: ', error);
		throw new Error('Error al obtener las unidades', error);
	}
};
