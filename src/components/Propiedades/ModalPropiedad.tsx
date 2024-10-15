'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { insertarPropiedad } from '@/actions/propiedades/propiedades';
import { Propiedad } from '@prisma/client';

type Inputs = {
  tipo: string;
  nombre: string;
  numero: number;

};

export const ModalPropiedad = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const propiedad = {
      tipo: data.tipo,
      nombre: data.nombre,
      numero: data.numero,
    };

    try {
      await insertarPropiedad(propiedad);
      setMostrarToast(true);
      reset();
      setIsOpen(false);
      setErrorMessage(null); 
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Error desconocido al insertar la propiedad.');
      }
    }
  };

  return (
    <>
      <div className='mb-10'>
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
              <p className='font-bold'>Se guardó la propiedad!</p>
            </div>
          </button>
        )}
        
        {errorMessage && (
          <div className='fixed left top-4 z-50 transition-duration-300 rounded-md bg-red-500 px-4 py-2 text-white transition'>
            {errorMessage}
          </div>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className='group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-md shadow border-verdeIntermedio border-2'
        >
          <div className='absolute inset-0 w-3 bg-verdeIntermedio transition-all duration-[250ms] ease-out group-hover:w-full'></div>
          <span className='relative text-verdeOscuro group-hover:text-white'>
            Registrar Propiedad
          </span>
        </button>
      </div>

      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10 overflow-y-scroll'>
          <section>
            <div className='mx-auto max-y max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8'>
              <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-10'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                  <div className='text-md justify-center select-none whitespace-nowrap rounded-lg bg-verdeIntermedio py-2 px-3.5 align-baseline font-sans font-bold uppercase leading-none text-white text-center'>
                    Registrar Propiedad
                  </div>
                  
                  <div className=''>
                    <label className='sr-only'>Nombre</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.nombre
                          ? 'focus:ring-red-500 focus:outline-red-300 border-2 border-red-500'
                          : 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
                      }`}
                      placeholder='Nombre'
                      type='text'
                      {...register('nombre', { required: true })}
                    />
                  </div>
                  <div className=''>
                    <label className='sr-only'>Tipo de Propiedad</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.tipo
                          ? 'focus:ring-red-500 focus:outline-red-300 border-2 border-red-500'
                          : 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
                      }`}
                      placeholder='Tipo de Propiedad (e.g. Cabaña, Habitación)'
                      type='text'
                      {...register('tipo', { required: true })}
                    />
                  </div>

                  

                  <div className=''>
                    <label className='sr-only'>Numero</label>
                    <input
                      className={`w-full rounded-lg border-gray-400 text-md text-oscuro ${
                        errors.numero
                          ? 'focus:ring-red-500 focus:outline-red-300 border-2 border-red-500'
                          : 'focus:ring-verdeOscuro focus:border-verdeIntermedio focus:outline-verdeClaro'
                      }`}
                      placeholder='Numero de Calle'
                      type='number'
                      {...register('numero', { required: true })}
                    />
                  </div>
                      
                  <div className='flex mt-4 items-center justify-end'>
                    {hasErrors && (
                      <span className='text-red-500 mr-4'>* Campos Requeridos.</span>
                    )}
                    <button
                      className='shadow text-md bg-white border mr-4 border-naranja hover:bg-naranja hover:text-white focus:outline-none text-naranja font-bold py-2 px-4 rounded'
                      type='button'
                      onClick={() => setIsOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className='shadow text-md bg-verdeIntermedio hover:bg-verdeClaro focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                      type='submit'
                    >
                      Guardar Propiedad
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
