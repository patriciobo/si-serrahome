import prisma from '@/lib/prisma';
import { Segment } from 'next/dist/server/app-render/types';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request, { params }: Segment) {
	const reserva = await prisma.reserva.findFirst({
		where: { id: params.id },
	});

	if (!reserva) {
		return NextResponse.json({
			message: `No se encontró la reserva con id ${params.id}`,
		});
	}
	return NextResponse.json(reserva);
}
