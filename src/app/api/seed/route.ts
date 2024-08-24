import prisma from '../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { initialData } from '../../../seed/data/seed.data';

export async function GET(request: Request) {
	await prisma.reserva.deleteMany({});

	const reservas = await prisma.reserva.createMany({
		data: [...initialData.reservas],
	});

	return NextResponse.json('Seed ejecutado');
}
