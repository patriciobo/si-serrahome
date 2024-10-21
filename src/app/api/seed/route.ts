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
			propiedadId: unidad.propiedadId,
		})),
	});

	const unidades = await prisma.unidad.findMany({});

	for (const unidad of unidades) {
		console.log('Unidades: ', unidades);
		console.log('Unidad: ', unidad);
		// for (const servicio of initialData.servicios) {
		// 	const sxu = await prisma.serviciosXUnidad.create({
		// 		data: {
		// 			unidad: {
		// 				connect: {
		// 					id: unidad.id, // Connect using the existing Unidad id
		// 				},
		// 			},
		// 			servicio: {
		// 				connect: {
		// 					id: servicio.id, // Connect using the existing Servicio id
		// 				},
		// 			},
		// 		},
		// 	});

		// 	console.log(sxu);
		// }
	}

	const clientesCreado = await prisma.cliente.createMany({
		data: [...initialData.clientes],
	});

	const reservasCreado = await prisma.reserva.createMany({
		data: [...initialData.reservas],
	});

	return NextResponse.json('Seed ejecutado');
}
