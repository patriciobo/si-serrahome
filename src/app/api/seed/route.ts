/* import prisma from '../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { initialData } from '../../../seed/data/seed.data';

export async function GET(request: Request) {
	await prisma.$executeRaw`ALTER SEQUENCE "Servicio_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Unidad_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Cliente_id_seq" RESTART WITH 1`;
	
	// await prisma.$executeRaw`ALTER SEQUENCE "Reserva_id_seq" RESTART WITH 1`;
	// await prisma.$executeRaw`ALTER SEQUENCE "ServiciosXUnidad_id_seq" RESTART WITH 1`;
	

	await prisma.servicio.deleteMany({});
	await prisma.unidad.deleteMany({});
	await prisma.cliente.deleteMany({});
	
	await prisma.reserva.deleteMany({});
	await prisma.serviciosXUnidad.deleteMany({});


	const servicios = await prisma.servicio.createMany({
		data: [...initialData.servicios],
	  });

	const unidades = await prisma.unidad.createMany({
		data: [...initialData.unidades],
	});

	const clientes = await prisma.cliente.createMany({
		data: [...initialData.clientes],
	});

	

	const reservas = await prisma.reserva.createMany({
		data: [...initialData.reservas],
	});

	const serviciosxunidad = await prisma.serviciosXUnidad.createMany({
		data: [...initialData.serviciosxunidad]
	})

	return NextResponse.json('Seed ejecutado');
} */

// API / SEED
import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';
import { initialData } from '../../../seed/data/seed.data';

export async function GET(request: Request) {
	// Reiniciar secuencias
	await prisma.$executeRaw`ALTER SEQUENCE "Servicio_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Unidad_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Cliente_id_seq" RESTART WITH 1`;

	// Borrar datos existentes
	await prisma.serviciosXUnidad.deleteMany({});
	await prisma.servicio.deleteMany({});
	await prisma.reserva.deleteMany({});
	await prisma.unidad.deleteMany({});
	await prisma.cliente.deleteMany({});
	
	

	// Crear servicios
	const serviciosCreado = await prisma.servicio.createMany({
		data: [...initialData.servicios],
	});

	// Crear unidades
	const unidadesCreado = await prisma.unidad.createMany({
		data: [...initialData.unidades],
	});

	// Crear clientes
	const clientesCreado = await prisma.cliente.createMany({
		data: [...initialData.clientes],
	});

	// Crear reservas
	const reservasCreado = await prisma.reserva.createMany({
		data: [...initialData.reservas],
	});

	const serviciosxunidad = await prisma.serviciosXUnidad.createMany({
		data: [...initialData.serviciosxunidad]
	})

	

	

	return NextResponse.json('Seed ejecutado');
}

