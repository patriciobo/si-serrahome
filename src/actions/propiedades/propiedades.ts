'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface NuevaPropiedadInput {
  tipo: string;
  nombre: string;
  numero: number;
  calleId: number;
}

export const insertarPropiedad = async (propiedadInput: NuevaPropiedadInput) => {
  if (!propiedadInput.tipo) {
    throw new Error('El tipo de propiedad es obligatorio.');
  }
  if (!propiedadInput.nombre) {
    throw new Error('El nombre de la propiedad es obligatorio.');
  }
  if (!propiedadInput.numero || propiedadInput.numero <= 0 || !Number.isInteger(propiedadInput.numero)) {
    throw new Error('El número de la calle debe ser entero y positivo');
  }
  if (!propiedadInput.calleId) {
    throw new Error('El ID de la calle es obligatorio.');
  }

  try {
    const propiedadCreada = await prisma.propiedad.create({
      data: {
        tipo: propiedadInput.tipo,
        nombre: propiedadInput.nombre,
        numero: propiedadInput.numero,
        calleId: propiedadInput.calleId,

      },
      include: {
        calle: {
          include: {
            ciudad: {
              include: {
                provincia: {
                  include: {
                    pais: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    revalidatePath('/dashboard/propiedades');
    console.log('Propiedad Creada: ', propiedadCreada);
    
    const pais = propiedadCreada.calle.ciudad.provincia.pais;
    console.log('País de la Propiedad: ', pais.nombre);

    return propiedadCreada;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
