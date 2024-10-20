'use server';

import prisma from '@/lib/prisma';
import { NOMEM } from 'dns';

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
      include: {
        calle: {
          select: {
            nombre: true,
            ciudad: {
              select: {
                nombre: true,
                provincia: {
                  select: {
                    nombre: true,
                    pais: {
                      select: {
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    
    console.log(propiedades)
    const totalPropiedades = await prisma.propiedad.count({});
    const cantidadPaginas = Math.ceil(totalPropiedades / take);

    return {
      paginaActual: pagina,
      cantidadPaginas: cantidadPaginas,
      totalPropiedades: totalPropiedades,
      propiedades,
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
