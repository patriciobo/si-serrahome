'use client';

import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { ModalReserva } from './ModalReserva';

export const BotonRegistrarReserva = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [mostrarToast, setMostrarToast] = useState(false);

	return (
		<>
			<div className='mb-10'>
				<button
					onClick={() => setIsOpen(true)}
					className='group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-md shadow border-verdeIntermedio border-2'
				>
					<div className='absolute inset-0 w-3 bg-verdeIntermedio transition-all duration-[250ms] ease-out group-hover:w-full'></div>
					<span className='relative text-verdeOscuro group-hover:text-white'>
						Reservar
					</span>
				</button>
			</div>
			{isOpen && (
				<ModalReserva setIsOpen={setIsOpen} setMostrarToast={setMostrarToast} />
			)}
			{mostrarToast && (
				<button
					type='button'
					onClick={() => setMostrarToast(false)}
					className='fixed left top-4 z-50 transition-duration-300 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600'
				>
					<div className='flex items-center space-x-2'>
						<span className='text-3xl'>
							<BiCheck />
						</span>
						<p className='font-bold'>Se guardó la reserva!</p>
					</div>
				</button>
			)}
		</>
	);
};
