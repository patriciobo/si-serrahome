import React from "react";
import { EstadoReserva, Reserva } from "@prisma/client";
import { BiEnvelope } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { Paginacion } from "../commons/Paginacion";

interface Props {
  reservas: Reserva[];
  cantidadPaginas: number;
  totalReservas: number;
  paginaActual: number;
}

export const Tabla = ({
  reservas = [],
  totalReservas,
  cantidadPaginas,
}: Props) => {
  return (
    <div className="mx-auto">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-md font-semibold text-slate-800">Reservas</h3>
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Buscar Reserva..."
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-8 h-8 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

<<<<<<< Updated upstream
      <div className="relative flex flex-col  w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-center text-sm table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className=" font-normal leading-none text-slate-500">
                  Cliente
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className=" font-normal leading-none text-slate-500">
                  Contacto
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className=" font-normal leading-none text-slate-500">
                  Fecha de Creación
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className=" font-normal leading-none text-slate-500">
                  Fecha Inicio
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className=" font-normal leading-none text-slate-500">
                  Fecha Fin
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className=" font-normal leading-none text-slate-500">
                  Estado
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className=" font-normal leading-none text-slate-500">
                  Pago Parcial
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className=" font-normal leading-none text-slate-500">
                  Precio Total
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr
                key={reserva.id}
                className="hover:bg-slate-50 border-b border-slate-200"
              >
                <td className="p-4 py-5">
                  <p className="block font-semibold text-slate-800">
                    {reserva.cliente.nombre}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <div className="flex items-center font-semibold text-verdeIntermedio">
                    <BsWhatsapp className="text-md" />
                    <a
                      href={`https://wa.me/${reserva.cliente.telefono}/`}
                      className="ml-2"
                    >
                      {reserva.cliente.telefono}
                    </a>
                  </div>
                  {reserva.cliente.email && (
                    <div className="flex items-center font-semibold text-blue-400">
                      <BiEnvelope className="text-xl" />
                      <p className="block ml-2 font-semibold text-blue-400">
                        {reserva.cliente.email}
                      </p>
                    </div>
                  )}
                </td>
                <td className="p-4 py-5">
                  <p className="font-bold text-slate-500">
                    {reserva.fechaHoraCreacion.toLocaleDateString("es-AR", {
                      timeZone: "GMT",
                    })}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="font-bold text-slate-500">
                    {reserva.fechaInicio.toLocaleDateString("es-AR", {
                      timeZone: "GMT",
                    })}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="font-bold text-slate-500">
                    {reserva.fechaFin.toLocaleDateString("es-AR", {
                      timeZone: "GMT",
                    })}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <div
                    className={` text-center select-none whitespace-nowrap rounded-lg py-2 px-3.5 align-baseline font-sans font-semibold uppercase leading-none text-white ${
                      reserva.estado === EstadoReserva.PENDIENTE
                        ? "bg-amber-400"
                        : reserva.estado === EstadoReserva.PAGO_PARCIAL
                        ? "bg-verdeClaro"
                        : reserva.estado === EstadoReserva.PAGADA
                        ? "bg-verdeIntermedio"
                        : reserva.estado === EstadoReserva.CANCELADA
                        ? "bg-red-500"
                        : ""
                    }`}
                  >
                    {reserva.estado}
                  </div>
                </td>
                <td className="p-4 py-5">
                  <p className=" text-slate-500">${reserva.pagoParcial}</p>
                </td>
                <td className="p-4 py-5">
                  <p className=" text-slate-500">${reserva.precioTotal}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
=======
			<div className='relative flex flex-col  w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
				<table className='w-full text-center text-sm table-auto min-w-max'>
					<thead>
						<tr>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Cliente
								</p>
							</th>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Contacto
								</p>
							</th>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Unidad
								</p>
							</th>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Fecha de Creación
								</p>
							</th>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Fecha Inicio
								</p>
							</th>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Fecha Fin
								</p>
							</th>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Estado
								</p>
							</th>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Pago Parcial
								</p>
							</th>
							<th className='p-4 border-b border-slate-200 bg-slate-50'>
								<p className=' font-normal leading-none text-slate-500'>
									Precio Total
								</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{reservas.map((reserva) => (
							<tr
								key={reserva.id}
								className='hover:bg-slate-50 border-b border-slate-200'
							>
								<td className='p-4 py-5'>
									<p className='block font-semibold text-slate-800'>
										{reserva.cliente.nombre}
									</p>
								</td>
								<td className='p-4 py-5'>
									<div className='flex items-center font-semibold text-verdeIntermedio'>
										<BsWhatsapp className='text-md' />
										<a
											href={`https://wa.me/${reserva.cliente.telefono}/`}
											className='ml-2'
										>
											{reserva.cliente.telefono}
										</a>
									</div>
									{reserva.cliente.email && (
										<div className='flex items-center font-semibold text-blue-400'>
											<BiEnvelope className='text-xl' />
											<p className='block ml-2 font-semibold text-blue-400'>
												{reserva.cliente.email}
											</p>
										</div>
									)}
								</td>
								<td>
									<p>{reserva.unidad.nombre}</p>
								</td>
								<td className='p-4 py-5'>
									<p className='font-bold text-slate-500'>
										{reserva.fechaHoraCreacion.toLocaleDateString('es-AR', {
											timeZone: 'GMT',
										})}
									</p>
								</td>
								<td className='p-4 py-5'>
									<p className='font-bold text-slate-500'>
										{reserva.fechaInicio.toLocaleDateString('es-AR', {
											timeZone: 'GMT',
										})}
									</p>
								</td>
								<td className='p-4 py-5'>
									<p className='font-bold text-slate-500'>
										{reserva.fechaFin.toLocaleDateString('es-AR', {
											timeZone: 'GMT',
										})}
									</p>
								</td>
								<td className='p-4 py-5'>
									<div
										className={` text-center select-none whitespace-nowrap rounded-lg py-2 px-3.5 align-baseline font-sans font-semibold uppercase leading-none text-white ${
											reserva.estado === EstadoReserva.PENDIENTE
												? 'bg-amber-400'
												: reserva.estado === EstadoReserva.PAGO_PARCIAL
												? 'bg-verdeClaro'
												: reserva.estado === EstadoReserva.PAGADA
												? 'bg-verdeIntermedio'
												: reserva.estado === EstadoReserva.CANCELADA
												? 'bg-red-500'
												: ''
										}`}
									>
										{reserva.estado}
									</div>
								</td>
								<td className='p-4 py-5'>
									<p className=' text-slate-500'>${reserva.pagoParcial}</p>
								</td>
								<td className='p-4 py-5'>
									<p className=' text-slate-500'>${reserva.precioTotal}</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
>>>>>>> Stashed changes

        <Paginacion
          totalRegistros={totalReservas}
          cantidadPaginas={cantidadPaginas}
          entidad="Reservas"
        />
      </div>
    </div>
  );
};

export default Tabla;
