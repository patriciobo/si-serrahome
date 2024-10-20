'use server';

import prisma from '@/lib/prisma';
import { Cliente, EstadoReserva, Reserva } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const insertarReserva = async (reserva: Reserva, cliente: Cliente) => {
	try {
		if (await verificarDisponibilidad(reserva)) {
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
			console.log('Resultado: ', result);
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

async function verificarDisponibilidad(reserva: Reserva) {
	try {
		const reservaEnConflicto = await prisma.reserva.findFirst({
			where: {
				unidadId: +reserva.unidadId,
				AND: [
					{
						unidadId: +reserva.unidadId,
						fechaInicio: {
							lt: reserva.fechaFin,
						},
					},
					{
						unidadId: +reserva.unidadId,
						fechaFin: {
							gt: reserva.fechaInicio,
						},
					},
				],
			},
		});
		return reservaEnConflicto ? false : true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
