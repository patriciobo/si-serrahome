'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface NuevaProppiedadInput {
  tipo: string;
  nombre: string;
  numero: number;
}

export const insertarPropiedad = async (propiedadInput: NuevaProppiedadInput) => {
  
  if (!propiedadInput.tipo) {
    throw new Error('El tipo de propiedad es obligatorio.');
  }

  if (!propiedadInput.nombre) {
    throw new Error('El nombre de la propiedad es obligatorio.');
  }

  if (!propiedadInput.numero || propiedadInput.numero <= 0 || !Number.isInteger(propiedadInput.numero)) {
    throw new Error('El numero de la calle debe ser entero y positivo');
  }

  try {
    const propiedadCreada = await prisma.propiedad.create({
      data: {
        tipo: propiedadInput.tipo,
        nombre: propiedadInput.nombre,
        numero: propiedadInput.numero,

      },
    });

    
    revalidatePath('/dashboard/propiedades');
    console.log('Propiedad Creada: ', propiedadCreada);

    return propiedadCreada;
  } catch (error) {
    console.error(error);
    throw new Error('Fallo al insertar la propiedad.');
  }
};

