import prisma from '../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { initialData } from '../../../seed/data/seed.data';

export async function GET(request: Request) {
	await prisma.$executeRaw`ALTER SEQUENCE "Unidad_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Cliente_id_seq" RESTART WITH 1`;
	await prisma.reserva.deleteMany({});
	await prisma.cliente.deleteMany({});
	await prisma.unidad.deleteMany({});

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
