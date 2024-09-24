'use client';

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className='flex h-full items-center justify-center '>
			<div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
				<div className='max-w-md mx-auto space-y-6'>
					<div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
						<div className='mx-auto max-w-screen-sm text-center'>
							<h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500'>
								500
							</h1>
							<p className='mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl'>
								Error Interno del Servidor.
							</p>
							<p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
								Estamos trabajando para solucionarlo.{' '}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
