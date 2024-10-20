import * as yup from 'yup';
import prisma from '../../../lib/prisma';

import { NextResponse, NextRequest } from 'next/server';

interface OpcionesPaginacion {
	pagina?: number;
	take?: number;
}

export const getReservasPaginadas = async ({
	pagina = 1,
	take = 5,
}: OpcionesPaginacion) => {
	if (isNaN(Number(pagina) || pagina < 1)) pagina = 1;

	try {
		const reservas = await prisma.reserva.findMany({
			take,
			skip: (pagina - 1) * take,
			include: {
				cliente: {
					select: {
						nombre: true,
						telefono: true,
						email: true,
					},
				},
			},
			orderBy: { fechaHoraCreacion: 'desc' },
		});

		const totalReservas = await prisma.reserva.count({});
		const cantidadPaginas = Math.ceil(totalReservas / take);

		return {
			paginaActual: pagina,
			cantidadPaginas: cantidadPaginas,
			totalReservas: totalReservas,
			reservas,
		};
	} catch (error) {
		throw new Error('No se pudo cargar las Reservas.');
	}
};

export async function GET(request: Request) {
	const url = new URL(request.url);
  	const parametros = url.searchParams;
	console.log('params:', parametros);

	const take = Number(parametros.get('take') ?? '5');
	const skip = Number(parametros.get('pagina') ?? '1');

	if (isNaN(take)) {
		return NextResponse.json(
			{ message: 'Take debe ser un número' },
			{ status: 400 }
		);
	}

	if (isNaN(skip)) {
		return NextResponse.json(
			{ message: 'Pagna debe ser un número' },
			{ status: 400 }
		);
	}
	try {
		const reservas = await getReservasPaginadas(pagina, take);
		return NextResponse.json({ reservas });
	} catch (error) {
		if (error instanceof Error){   
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ error: 'Ocurrió un error desconocido' }, { status: 400 });
	}
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
