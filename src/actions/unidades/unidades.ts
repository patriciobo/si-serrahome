'use server';

import prisma from '@/lib/prisma';
import { Unidad } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface NuevaUnidadInput {
  tipoUnidad: string;
  nombre: string;
  capacidad: number;
  servicios: string[];
  precioPorNoche?: number; 
  imagenes: string[];
}

export const insertarUnidad = async (unidadInput: NuevaUnidadInput) => {
  
  if (!unidadInput.tipoUnidad) {
    throw new Error('El tipo de unidad es obligatorio.');
  }

  if (!unidadInput.nombre) {
    throw new Error('El nombre de la unidad es obligatorio.');
  }

  if (!unidadInput.capacidad || unidadInput.capacidad <= 0 || !Number.isInteger(unidadInput.capacidad)) {
    throw new Error('La capacidad debe ser un número mayor a 0 y no debe contener decimales.');
  }

  if (unidadInput.precioPorNoche !== undefined && isNaN(unidadInput.precioPorNoche)) {
    throw new Error('El precio por noche debe ser un valor numérico.');
  }

  if (!Array.isArray(unidadInput.servicios) || unidadInput.servicios.length === 0) {
    throw new Error('Debe seleccionar al menos un servicio.');
  }

  if (!Array.isArray(unidadInput.imagenes) || unidadInput.imagenes.length === 0 || unidadInput.imagenes.length > 5) {
    throw new Error('Debe subir entre 1 y 5 imágenes.');
  }

  
  const formatosPermitidos = ['jpg', 'jpeg', 'png'];
  for (const imagen of unidadInput.imagenes) {
    const extension = imagen.split('.').pop()?.toLowerCase();
    if (!extension || !formatosPermitidos.includes(extension)) {
      throw new Error('El formato de las imágenes debe ser JPG o PNG.');
    }
  }

  try {
    const unidadCreada = await prisma.unidad.create({
      data: {
        tipoUnidad: unidadInput.tipoUnidad,
        nombre: unidadInput.nombre,
        capacidad: unidadInput.capacidad,
        servicios: unidadInput.servicios,
        precioPorNoche: unidadInput.precioPorNoche,
        imagenes: unidadInput.imagenes,
      },
    });

    
    revalidatePath('/dashboard/unidades');
    console.log('Unidad Creada: ', unidadCreada);

    return unidadCreada;
  } catch (error) {
    console.error(error);
    throw new Error('Fallo al insertar la unidad.');
  }
};

