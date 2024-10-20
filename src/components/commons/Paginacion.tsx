'use client';
import React from 'react';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface Props {
	cantidadPaginas: number;
	totalRegistros: number;
	entidad : string;
}

export const Paginacion = ({ cantidadPaginas, totalRegistros, entidad }: Props) => {
	const pathname = usePathname();
	const parametrosBusqueda = useSearchParams();
	let paginaActual = Number(parametrosBusqueda.get('pagina')) ?? 1;

	if (isNaN(paginaActual) || paginaActual < 1) {
		paginaActual = 1;
	}

	const crearUrlPagina = (numeroPagina: number | string) => {
		const params = new URLSearchParams(parametrosBusqueda);

		if (numeroPagina == '...' || +numeroPagina > cantidadPaginas) {
			return `${pathname}?${params.toString()}`;
		}

		if (+numeroPagina <= 0) {
			return `${pathname}`;
		}

		params.set('pagina', numeroPagina.toString());

		return `${pathname}?${params.toString()}`;
	};

	const generarListadoDePaginas = () => {
		if (cantidadPaginas <= 7) {
			return Array.from({ length: cantidadPaginas }, (_, i) => i + 1);
		}

		if (paginaActual <= 3) {
			return [1, 2, 3, '...', cantidadPaginas - 1, cantidadPaginas];
		}

		if (paginaActual >= cantidadPaginas - 2) {
			return [
				1,
				2,
				'...',
				cantidadPaginas - 2,
				cantidadPaginas - 1,
				cantidadPaginas,
			];
		}

		return [
			1,
			'...',
			paginaActual - 1,
			paginaActual,
			paginaActual + 1,
			'...',
			cantidadPaginas,
		];
	};

	const paginas = generarListadoDePaginas();

	return (
		<div className='flex justify-between items-center px-4 py-3'>
			<div className='text-sm text-slate-500'>
				Se encontraron <b>{totalRegistros}</b> {entidad}.
			</div>
			<div className='flex space-x-1'>
				<Link
					href={crearUrlPagina(paginaActual - 1)}
					className='flex items-center justify-center min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'
				>
					<IoChevronBack />
				</Link>
				{paginas.map((pagina, index) => (
					<Link
						key={index}
						href={crearUrlPagina(pagina)}
						className={`flex items-center justify-center min-w-9 min-h-9 text-sm font-normal text-slate-800 border rounded hover:bg-slate-600 hover:border-slate-600 hover:text-white transition duration-200 ease
                            ${
															pagina === paginaActual
																? 'bg-slate-800 text-white'
																: ''
														}`}
					>
						{pagina}
					</Link>
				))}

				<Link
					href={crearUrlPagina(paginaActual + 1)}
					className=' flex items-center justify-center min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'
				>
					<IoChevronForward />
				</Link>
			</div>
		</div>
	);
};
