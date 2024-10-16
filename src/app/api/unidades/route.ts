import * as yup from 'yup';
import prisma from '../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

interface OpcionesPaginacion {
  pagina?: number;
  take?: number;
}

export const getUnidadesPaginadas = async ({
  pagina = 1,
  take = 5,
}: OpcionesPaginacion) => {
  if (isNaN(Number(pagina)) || pagina < 1) pagina = 1;

  try {
    const unidades = await prisma.unidad.findMany({
      include: {
        servicios: { // Hace referencia a la relación ServiciosXUnidad
          include: {
            servicios: true // Aquí se refiere al modelo Servicio relacionado
          }
        }
      },
      take,
      skip: (pagina - 1) * take,
      orderBy: { nombre: 'asc' },
    });
    console.log(unidades);

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


export async function GET(request: Request) {
  const url = new URL(request.url);
  const parametros = url.searchParams;
  const take = Number(parametros.get('take') ?? '5');
  const pagina = Number(parametros.get('pagina') ?? '1');

  if (isNaN(take)) {
    return NextResponse.json(
      { message: 'Take debe ser un número' },
      { status: 400 }
    );
  }

  if (isNaN(pagina)) {
    return NextResponse.json(
      { message: 'Página debe ser un número' },
      { status: 400 }
    );
  }

  try {
    const unidades = await getUnidadesPaginadas({ pagina, take });
    return NextResponse.json({ unidades });
  } catch (error) {
    if (error instanceof Error){   
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Ocurrió un error desconocido' }, { status: 400 });
  }
}


let unidadSchema = yup.object({
  tipoUnidad: yup.string().required('Tipo de Unidad es requerido'),
  nombre: yup.string().required('Nombre es requerido'),
  capacidadMaxima: yup.number().positive().integer().required('Capacidad máxima es requerida'),
  servicios: yup.array().of(yup.string().required()).min(1, 'Debe seleccionar al menos un servicio').required('Servicios son requeridos'),
  precioPorNoche: yup.number().positive().optional(),
  imagenes: yup.array().of(yup.string().required()).min(1, 'Debe proporcionar al menos una imagen').required('Imagenes son requeridas'),
});


export async function POST(request: Request) {
  try {
    const unidad = await request.json();

  
    const unidadValidada = await unidadSchema.validate(unidad, {
      abortEarly: false,
    });

    const serviciosFiltrados = unidadValidada.servicios.filter(
      (servicio: string) => servicio !== undefined && servicio !== null
    );

    const imagenesFiltradas = unidadValidada.imagenes?.filter(
      (imagen) => typeof imagen == 'string' && imagen.trim().length > 0
    );


    const unidadCreada = await prisma.unidad.create({
      data: {
        tipoUnidad: unidadValidada.tipoUnidad,
        nombre: unidadValidada.nombre,
        capacidad: unidadValidada.capacidadMaxima,
        // servicios: serviciosFiltrados,
        precioPorNoche: unidadValidada.precioPorNoche ?? null,
        imagenes: imagenesFiltradas,
      },
    });
    
    return NextResponse.json(unidadCreada);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error al crear la unidad' }, { status: 400 });
  }

}
