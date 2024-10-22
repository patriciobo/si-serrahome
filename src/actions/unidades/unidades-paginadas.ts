'use server';

import prisma from '@/lib/prisma';

interface OpcionesPaginacion {
	pagina?: number;
	take?: number;
	propiedadId: number;
}

export const getUnidadesPaginadas = async ({
	pagina = 1,
	take = 5,
}: OpcionesPaginacion) => {
	if (isNaN(Number(pagina)) || pagina < 1) pagina = 1;

	try {
		const unidades = await prisma.unidad.findMany({
			include: {
				servicios: {
					include: {
						servicio: true,
					},
				},
			},
			take,
			skip: (pagina - 1) * take,
			orderBy: { id: 'asc' },
		});

		const totalUnidades = await prisma.unidad.count({});
		const cantidadPaginas = Math.ceil(totalUnidades / take);


		return {
			paginaActual: pagina,
			cantidadPaginas: cantidadPaginas,
			totalUnidades: totalUnidades,
			unidades,
		};
	} catch (error) {
		throw new Error('No se pudo cargar las Unidades.');
	}
};

export const getUnidadesPaginadasIdPropiedades = async ({
	pagina = 1,
	take = 5,
	propiedadId
}: OpcionesPaginacion) => {
	if (isNaN(Number(pagina)) || pagina < 1) pagina = 1;

	try {
		const unidades = await prisma.unidad.findMany({
			where: {
				propiedadId:propiedadId,
			  },
			include: {
				servicios: {
					include: {
						servicio: true,
					},
				},
			},
			take,
			skip: (pagina - 1) * take,
			orderBy: { id: 'asc' },
		});

		const totalUnidades = await prisma.unidad.count({});
		const cantidadPaginas = Math.ceil(totalUnidades / take);


		return {
			paginaActual: pagina,
			cantidadPaginas: cantidadPaginas,
			totalUnidades: totalUnidades,
			unidades,
		};
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
};

