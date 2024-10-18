import Unidades from "@/app/dashboard/unidades/page"
import { connect } from "http2";

export const initialData = {
	servicios: [
		{ nombre: 'Aire acondicionado' },
		{ nombre: 'Pileta' },
		{ nombre: 'Estacionamiento' },
		{ nombre: 'Calefacción' },
		{ nombre: 'Wifi gratuito' },
		{ nombre: 'Desayuno incluido' },
		{ nombre: 'TV por cable' },
		{ nombre: 'Spa' },
		{ nombre: 'Gimnasio' },
		{ nombre: 'Servicio a la habitación' },
		{ nombre: 'Restaurante' },
		{ nombre: 'Bar' },
		{ nombre: 'Actividades recreativas' },
		{ nombre: 'Servicio de lavandería' },
		{ nombre: 'Cuidado de niños' },
		{ nombre: 'Acceso para discapacitados' },
		{ nombre: 'Mascotas permitidas' },
		{ nombre: 'Parrillas' },
		{ nombre: 'Juegos infantiles' },
		{ nombre: 'Sala de juegos' },
		{ nombre: 'Transporte al aeropuerto' },
		{ nombre: 'Alquiler de bicicletas' },
		{ nombre: 'Servicio de limpieza' },
		{ nombre: 'Camas adicionales' },
		{ nombre: 'Servicio de guardaequipaje' },
		{ nombre: 'Caja de seguridad' },
	],
	unidades: [
		{
			
			tipoUnidad: 'Cabaña',
			nombre: 'Rosada',
			capacidad: 6,
			servicios: {
				create: [
					{
						servicio: {
							connect: {
								id: 1,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 2,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 3,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 4,
							}
						}
					}
				]
			},
			precioPorNoche: 20000,
			imagenes: ['imagen1', 'imagen5'],
			
		},
		{
			tipoUnidad: 'Cabaña',
			nombre: 'Azul',
			capacidad: 6,
			servicios: {
				create: [
					{
						servicio: {
							connect: {
								id: 1,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 2,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 3,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 4,
							}
						}
					}
				]
			},
			precioPorNoche: 20000,
			imagenes: ['imagen1', 'imagen2', 'imagen3'],
		},
		{
			tipoUnidad: 'Cabaña',
			nombre: 'Naranja',
			capacidad: 6,
			servicios: {
				create: [
					{
						servicio: {
							connect: {
								id: 1,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 2,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 3,
							}
						}
					},
					{
						servicio: {
							connect: {
								id: 4,
							}
						}
					}
				]
			},
			precioPorNoche: 20000,
			imagenes: ['imagen1', 'imagen2', 'imagen3', 'imagen4'],
		},
	],

	clientes: [
		{
			nombre: 'Chandler Bing',
			telefono: '9093829831',
			email: 'chandler.bing@gmail.com',
		},
		{
			nombre: 'Monica Geller',
			telefono: '9093859831',
			email: 'monica.geller@gmail.com',
		},
	],

	

	reservas: [
		{
			fechaInicio: '2024-08-23T14:00:00Z',
			fechaFin: '2024-08-27T10:00:00Z',
			cantidadPersonas: 4,
			precioTotal: 40000,
			pagoParcial: 10000,
			unidadId: 1,
			clienteId: 1,
		},
		{
			fechaInicio: '2024-09-02T14:00:00Z',
			fechaFin: '2024-09-05T10:00:00Z',
			cantidadPersonas: 2,
			precioTotal: 30000,
			unidadId: 2,
			clienteId: 2,
		},
		{
			fechaInicio: '2024-09-05T14:00:00Z',
			fechaFin: '2024-09-10T10:00:00Z',
			cantidadPersonas: 4,
			precioTotal: 50000,
			unidadId: 1,
			clienteId: 1,
		},
		{
			fechaInicio: '2024-09-06T14:00:00Z',
			fechaFin: '2024-09-07T10:00:00Z',
			cantidadPersonas: 4,
			precioTotal: 40000,
			pagoParcial: 10000,
			unidadId: 2,
			clienteId: 1,
		},
		{
			fechaInicio: '2024-09-02T14:00:00Z',
			fechaFin: '2024-09-05T10:00:00Z',
			cantidadPersonas: 2,
			precioTotal: 30000,
			unidadId: 3,
			clienteId: 2,
		},
		{
			fechaInicio: '2024-09-05T14:00:00Z',
			fechaFin: '2024-09-10T10:00:00Z',
			cantidadPersonas: 4,
			precioTotal: 50000,
			unidadId: 3,
			clienteId: 1,
		},
		{
			fechaInicio: '2024-11-01T14:00:00Z',
			fechaFin: '2024-11-02T10:00:00Z',
			cantidadPersonas: 4,
			precioTotal: 40000,
			pagoParcial: 10000,
			unidadId: 1,
			clienteId: 1,
		},
		{
			fechaInicio: '2024-11-03T14:00:00Z',
			fechaFin: '2024-11-04T10:00:00Z',
			cantidadPersonas: 2,
			precioTotal: 30000,
			unidadId: 2,
			clienteId: 2,
		},
		{
			fechaInicio: '2024-09-05T14:00:00Z',
			fechaFin: '2024-11-06T10:00:00Z',
			cantidadPersonas: 4,
			precioTotal: 50000,
			unidadId: 1,
			clienteId: 1,
		},
	],
};

