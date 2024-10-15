import * as yup from 'yup';
import prisma from '../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

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
      orderBy: { nombre: 'asc' },
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
    const propiedades = await getPropiedadesPaginadas({ pagina, take });
    return NextResponse.json({ propiedades });
  } catch (error) {
    if (error instanceof Error){   
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Ocurrió un error desconocido' }, { status: 400 });
  }
}


let propiedadSchema = yup.object({
  nombre: yup.string().required('Nombre es requerido'),
  numero: yup.number().positive().integer().required('Numero de calle es requerido'),
  tipo: yup.string().required('Tipo de Propiedad es requerido'),
});


export async function POST(request: Request) {
  try {
    const propiedad = await request.json();

  
    const propiedadValidada = await propiedadSchema.validate(propiedad, {
      abortEarly: false,
    });

    const propiedadCreada = await prisma.propiedad.create({
      data: {
        tipo: propiedadValidada.tipo,
        nombre: propiedadValidada.nombre,
        numero: propiedadValidada.numero,
      },
    });
    
    return NextResponse.json(propiedadCreada);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error al crear la propiedad' }, { status: 400 });
  }

}
