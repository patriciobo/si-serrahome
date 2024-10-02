import React from 'react';
import { Unidad } from '@prisma/client';
import { Paginacion } from '../commons/Paginacion';

interface Props {
  unidades: Unidad[];
  cantidadPaginas: number;
  paginaActual?: number;
  totalUnidades: number;
}

export const TablaUnidades = ({ unidades = [], totalUnidades, cantidadPaginas }: Props) => {
  return (
    <div className='mx-auto'>
      <div className='w-full flex justify-between items-center mb-3 mt-1 pl-3'>
        <div>
          <h3 className='text-md font-semibold text-slate-800'>Unidades</h3>
        </div>
        <div className='ml-3'>
          <div className='w-full max-w-sm min-w-[200px] relative'>
            <input
              type='text'
              id='input-group-search'
              className='block p-2 pl-2 w-full z-20 text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
              placeholder='Buscar Unidad'
            />
          </div>
        </div>
      </div>

      <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Nombre
              </th>
              <th scope='col' className='px-6 py-3'>
                Tipo de Unidad
              </th>
              <th scope='col' className='px-6 py-3'>
                Capacidad
              </th>
              <th scope='col' className='px-6 py-3'>
                Servicios
              </th>
              <th scope='col' className='px-6 py-3'>
                Precio por Noche
              </th>
              <th scope='col' className='px-6 py-3'>
                Imagenes
              </th>
            </tr>
          </thead>
          <tbody>
            {unidades.length === 0 && (
              <tr className='text-md text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <td colSpan={6} className='px-6 py-4 text-center'>
                  No se han encontrado unidades
                </td>
              </tr>
            )}
            {unidades.length > 0 &&
              unidades.map((unidad, index) => (
                <tr
                  key={index}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                >
                  <td className='px-6 py-4'>{unidad.nombre}</td>
                  <td className='px-6 py-4'>{unidad.tipoUnidad}</td>
                  <td className='px-6 py-4'>{unidad.capacidad}</td>
                  <td className='px-6 py-4'>{unidad.servicios.join(', ')}</td>
                  <td className='px-6 py-4'>{unidad.precioPorNoche}</td>
                  <td className='px-6 py-4'>{unidad.imagenes.join(', ')}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Paginacion cantidadPaginas={cantidadPaginas} totalRegistros={totalUnidades} entidad='Unidades' />
    </div>
  );
};

export default TablaUnidades;
