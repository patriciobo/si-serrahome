import * as yup from 'yup';
import prisma from '../../../lib/prisma';

import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request) {
	const parametros = request.nextUrl.searchParams;
	console.log('params:', parametros);

	const take = Number(parametros.get('take') ?? '10');
	const skip = Number(parametros.get('skip') ?? '0');

	if (isNaN(take)) {
		return NextResponse.json(
			{ message: 'Take debe ser un número' },
			{ status: 400 }
		);
	}

	if (isNaN(skip)) {
		return NextResponse.json(
			{ message: 'Skip debe ser un número' },
			{ status: 400 }
		);
	}
	const reservas = await prisma.reserva.findMany({
		take,
		skip,
	});

	return NextResponse.json(reservas);
}

let postSchema = yup.object({
	fechaInicio: yup.string().datetime().required(),
	fechaFin: yup.string().datetime().required(),
	cantidadPersonas: yup.number().positive().integer().required(),
	precioTotal: yup.number().positive().required(),
	pagoParcial: yup.number().positive().optional(),
	unidadId: yup.number().integer().required(),
	clienteId: yup.number().integer().required(),
});

export async function POST(request: Request) {
	try {
		const reserva = await request.json();

		const reservaValidada = await postSchema.validate(reserva, {
			abortEarly: false,
		});

		if (await verificarDisponibilidad(reservaValidada)) {
			const reservaCreada = await prisma.reserva.create({
				data: reservaValidada,
			});
			return NextResponse.json(reservaCreada);
		} else {
			return NextResponse.json(
				{
					mensaje:
						'Existe otra reserva registrada para las fechas y unidad seleccionadas.',
				},
				{ status: 400 }
			);
		}
	} catch (error) {
		return NextResponse.json(error.errors, { status: 400 });
	}
}

async function verificarDisponibilidad(reserva: any) {
	try {
		const reservaEnConflicto = await prisma.reserva.findFirst({
			where: {
				unidadId: reserva.unidadId,
				AND: [
					{
						unidadId: reserva.unidadId,
						fechaInicio: {
							lt: reserva.fechaFin,
						},
					},
					{
						unidadId: reserva.unidadId,
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
