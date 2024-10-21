import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      const servicios = await prisma.servicio.findMany({
        select: {
          id: true,
          nombre: true,
        },
      });
  
      return NextResponse.json(servicios);
    } catch (error) {
      return NextResponse.json({ error: 'Error al obtener los servicios' }, { status: 500 });
    }
  }