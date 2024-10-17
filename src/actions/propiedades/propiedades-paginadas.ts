'use server';

import prisma from '@/lib/prisma';

interface OpcionesPaginacion {
  pagina?: number;
  take?: number;
}

export const getPropiedadesPaginadas = async ({
  pagina = 1,
  take = 5,
}: OpcionesPaginacion) => {
  if (isNaN(Number(pagina)) || pagina < 1) pagina = 1;

  try {
    const propiedades = await prisma.propiedad.findMany({
      take,
      skip: (pagina - 1) * take,
      orderBy: { id: 'asc' }, 
    });

    const totalPropiedades = await prisma.propiedad.count({});
    const cantidadPaginas = Math.ceil(totalPropiedades / take);

    return {
      paginaActual: pagina,
      cantidadPaginas: cantidadPaginas,
      totalPropiedades: totalPropiedades,
      propiedades,
    };
  } catch (error) {
    throw new Error('No se pudo cargar las Propiedades.');
  }
};
