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
	propiedadId: number;
}

export const getUnidadesPorPropiedad = async (propiedadId): Unidad[] => {
	try {
		console.log('propId: ', propiedadId);
		const unidades = await prisma.unidad.findMany({
			where: {
				propiedadId: +propiedadId,
			},
		});
		return unidades;
	} catch (error) {
		console.log('Error: ', error);
		throw new Error('Error al obtener las unidades', error);
	}
};

export const insertarUnidad = async (unidadInput: NuevaUnidadInput) => {
	if (!unidadInput.tipoUnidad) {
		throw new Error('El tipo de unidad es obligatorio.');
	}
	if (!unidadInput.tipoUnidad) {
		throw new Error('El tipo de unidad es obligatorio.');
	}

	if (!unidadInput.nombre) {
		throw new Error('El nombre de la unidad es obligatorio.');
	}
	if (!unidadInput.nombre) {
		throw new Error('El nombre de la unidad es obligatorio.');
	}

	if (
		!unidadInput.capacidad ||
		unidadInput.capacidad <= 0 ||
		!Number.isInteger(unidadInput.capacidad)
	) {
		throw new Error(
			'La capacidad debe ser un número mayor a 0 y no debe contener decimales.'
		);
	}
	if (
		!unidadInput.capacidad ||
		unidadInput.capacidad <= 0 ||
		!Number.isInteger(unidadInput.capacidad)
	) {
		throw new Error(
			'La capacidad debe ser un número mayor a 0 y no debe contener decimales.'
		);
	}

	if (
		unidadInput.precioPorNoche !== undefined &&
		isNaN(unidadInput.precioPorNoche)
	) {
		throw new Error('El precio por noche debe ser un valor numérico.');
	}
	if (
		unidadInput.precioPorNoche !== undefined &&
		isNaN(unidadInput.precioPorNoche)
	) {
		throw new Error('El precio por noche debe ser un valor numérico.');
	}

	if (
		!Array.isArray(unidadInput.servicios) ||
		unidadInput.servicios.length === 0
	) {
		throw new Error('Debe seleccionar al menos un servicio.');
	}
	if (
		!Array.isArray(unidadInput.servicios) ||
		unidadInput.servicios.length === 0
	) {
		throw new Error('Debe seleccionar al menos un servicio.');
	}

	if (
		!Array.isArray(unidadInput.imagenes) ||
		unidadInput.imagenes.length === 0
	) {
		throw new Error('Debe proporcionar al menos una imagen');
	}
	if (
		!Array.isArray(unidadInput.imagenes) ||
		unidadInput.imagenes.length === 0
	) {
		throw new Error('Debe proporcionar al menos una imagen');
	}

	try {

	/*
  const formatosPermitidos = ['jpg', 'jpeg', 'png'];
  for (const imagen of unidadInput.imagenes) {
    const extension = imagen.split('.').pop()?.toLowerCase();
    if (!extension || !formatosPermitidos.includes(extension)) {
      throw new Error('El formato de las imágenes debe ser JPG o PNG.');
    }
  }
*/	
	try {
		const unidadCreada = await prisma.unidad.create({
			data: {
				tipoUnidad: unidadInput.tipoUnidad,
				nombre: unidadInput.nombre,
				capacidad: unidadInput.capacidad,
				servicios: unidadInput.servicios,
				precioPorNoche: unidadInput.precioPorNoche,
				imagenes: unidadInput.imagenes,
				propiedadId: unidadInput.propiedadId.propiedadId,
			},
		});

		revalidatePath('/dashboard/unidades');
		console.log('Unidad Creada: ', unidadCreada);

		return unidadCreada;
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
};
