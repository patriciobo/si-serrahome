import React from 'react';
import { ServiciosXUnidad, Unidad } from '@prisma/client';
import { Paginacion } from '../commons/Paginacion';

interface Props {
  unidades: Unidad[];
  cantidadPaginas: number;
  paginaActual?: number;
  totalUnidades: number;
  serviciosxunidad: ServiciosXUnidad[];
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
            <div className='relative'>
              <input
                className='bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
                placeholder='Buscar Unidad...'
              />
              <button
                className='absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded '
                type='button'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='3'
                  stroke='currentColor'
                  className='w-8 h-8 text-slate-600'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
        <table className='w-full text-center text-sm table-auto min-w-max'>
          <thead>
            <tr>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='font-normal leading-none text-slate-500'>Nombre</p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='font-normal leading-none text-slate-500'>Tipo de Unidad</p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='font-normal leading-none text-slate-500'>Capacidad</p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='font-normal leading-none text-slate-500'>Servicios</p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='font-normal leading-none text-slate-500'>Precio por Noche</p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='font-normal leading-none text-slate-500'>Imagenes</p>
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
                <tr key={index} className='hover:bg-slate-50 border-b border-slate-200'>
                  <td className='p-4 py-5'>
                    <p className='block font-semibold text-slate-800'>{unidad.nombre}</p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='font-semibold text-slate-500'>{unidad.tipoUnidad}</p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='font-semibold text-slate-500'>{unidad.capacidad}</p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='font-semibold text-slate-500'>{unidad.servicios && unidad.servicios.length > 0
                                                                      ? unidad.servicios.map((servicioXUnidad) => servicioXUnidad.servicio.nombre).join(", ")
                                                                      : "Sin servicios"} 
                    </p>
                  </td> 
                  <td className='p-4 py-5'>
                    <p className='font-semibold text-slate-500'>${unidad.precioPorNoche}</p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='font-semibold text-slate-500'>{unidad.imagenes.join(', ')}</p>
                  </td>
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
