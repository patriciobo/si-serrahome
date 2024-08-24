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

export async function POST(request: Request) {
	const body = await request.json();

	// const reserva = await prisma.reserva.create({
	// 	data: body,
	// });

	return NextResponse.json(body);
}
