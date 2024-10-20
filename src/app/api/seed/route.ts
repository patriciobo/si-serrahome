import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';
import { initialData } from '../../../seed/data/seed.data';

export async function GET(request: Request) {
	await prisma.$executeRaw`ALTER SEQUENCE "Servicio_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Unidad_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Cliente_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Pais_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Provincia_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Ciudad_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Calle_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Propiedad_id_seq" RESTART WITH 1`;

	await prisma.serviciosXUnidad.deleteMany({});
	await prisma.servicio.deleteMany({});
	await prisma.reserva.deleteMany({});
	await prisma.unidad.deleteMany({});
	await prisma.cliente.deleteMany({});
	await prisma.unidad.deleteMany({});
	await prisma.propiedad.deleteMany({});
	await prisma.calle.deleteMany({});
	await prisma.ciudad.deleteMany({});
	await prisma.provincia.deleteMany({});
	await prisma.pais.deleteMany({});

	const paises = await prisma.pais.createMany({
		data: [...initialData.paises],
	});

	const provincias = await prisma.provincia.createMany({
		data: [...initialData.provincias],
	});

	const ciudades = await prisma.ciudad.createMany({
		data: [...initialData.ciudades],
	});

	const calles = await prisma.calle.createMany({
		data: [...initialData.calles],
	});

	const propiedades = await prisma.propiedad.createMany({
		data: [...initialData.propiedades],
	});

	const serviciosCreado = await prisma.servicio.createMany({
		data: [...initialData.servicios],
	});

	const unidadesCreado = await prisma.unidad.createMany({
		data: initialData.unidades.map((unidad) => ({
			tipoUnidad: unidad.tipoUnidad,
			nombre: unidad.nombre,
			capacidad: unidad.capacidad,
			precioPorNoche: unidad.precioPorNoche,
			imagenes: unidad.imagenes,
		})),
	});

	for (const unidad of initialData.unidades) {
		for (const servicio of unidad.servicios.create) {
			await prisma.serviciosXUnidad.create({
				data: {
					unidad: { connect: { nombre: unidad.nombre } }, // O usa id si es conocido
					servicio: { connect: { id: servicio.servicio.connect.id } },
				},
			});
		}
	}

	const clientesCreado = await prisma.cliente.createMany({
		data: [...initialData.clientes],
	});

	const reservasCreado = await prisma.reserva.createMany({
		data: [...initialData.reservas],
	});

	return NextResponse.json('Seed ejecutado');
}
