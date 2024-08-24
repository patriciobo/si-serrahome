import prisma from '../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { initialData } from '../../../seed/data/seed.data';

export async function GET(request: Request) {
	await prisma.cliente.deleteMany({});
	await prisma.unidad.deleteMany({});
	await prisma.reserva.deleteMany({});

	const clientes = await prisma.cliente.createMany({
		data: [...initialData.clientes],
	});

	const unidades = await prisma.unidad.createMany({
		data: [...initialData.unidades],
	});

	const reservas = await prisma.reserva.createMany({
		data: [...initialData.reservas],
	});

	return NextResponse.json('Seed ejecutado');
}
