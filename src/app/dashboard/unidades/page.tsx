import prisma from '@/lib/prisma';
import { Unidad } from '@prisma/client';
import { ModalUnidad } from '../../../components/Unidades/ModalUnidad';
import { getUnidadesPaginadas } from '../../../actions/unidades/unidades-paginadas';
import Tabla, { TablaUnidades } from '@/components/Unidades/Tabla';

export const metadata = {
	title: 'Unidades',
	description: 'Unidades',
};

interface Props {
	searchParams: {
		pagina?: string;
	};
}

export default async function Unidades({ searchParams }: Props) {
	const pagina = searchParams.pagina ? parseInt(searchParams.pagina) : 1;

	const { unidades, cantidadPaginas, totalUnidades } =
		await getUnidadesPaginadas({ pagina });

	return (
		<div className='flex flex-col items-center justify-start w-full h-full'>
			<ModalUnidad />
			<TablaUnidades
				unidades={unidades}
				cantidadPaginas={cantidadPaginas}
				totalUnidades={totalUnidades}
			/>
		</div>
	);
}
