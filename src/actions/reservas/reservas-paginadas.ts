'use server';

import prisma from '@/lib/prisma';

interface OpcionesPaginacion {
	pagina?: number;
	take?: number;
}

export const getReservasPaginadas = async ({
	pagina = 1,
	take = 5,
}: OpcionesPaginacion) => {
	if (isNaN(Number(pagina)) || pagina < 1) pagina = 1;

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
		throw new Error(`Error: ${error}`);
	}
};
