import Unidades from '@/app/dashboard/unidades/page';
import { connect } from 'http2';

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
	paises: [
		{
			// id: 1,
			nombre: 'Argentina',
		},
	],
	provincias: [
		{
			// id: 1,
			nombre: 'Cordoba',
			paisId: 1,
		},
	],
	ciudades: [
		{
			// id: 1,
			nombre: 'General Paz',
			provinciaId: 1,
		},
	],
	calles: [
		{
			// id: 1,
			nombre: 'Velez Sarfield',
			ciudadId: 1,
		},
	],
	propiedades: [
		{
			// id: 1,
			nombre: 'Alto las flores',
			calleId: 1,
			numero: 123,
			tipo: 'Casa',
		},
	],
	unidades: [
		{
			//id: 1
			tipoUnidad: 'Cabaña',
			nombre: 'Rosada',
			capacidad: 6,
			propiedadId: 1,
			servicios: {
				create: [
					{
						servicio: {
							connect: {
								id: 1,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 2,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 3,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 4,
							},
						},
					},
				],
			},
			precioPorNoche: 20000,
			imagenes: [
				'https://www.altolasflores.com.ar/assets/img/portfolio/exterior2.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/exterior3.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/interior.jpeg',
				'https://www.altolasflores.com.ar/assets/img/portfolio/habitacion1.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/habitacion2.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/pileta2.webp',
			],
		},
		{
			tipoUnidad: 'Cabaña',
			nombre: 'Azul',
			capacidad: 6,
			propiedadId: 1,
			servicios: {
				create: [
					{
						servicio: {
							connect: {
								id: 1,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 2,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 3,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 4,
							},
						},
					},
				],
			},
			precioPorNoche: 20000,
			imagenes: [
				'https://www.altolasflores.com.ar/assets/img/portfolio/exterior2.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/exterior3.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/interior.jpeg',
				'https://www.altolasflores.com.ar/assets/img/portfolio/habitacion1.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/habitacion2.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/pileta2.webp',
			],
		},
		{
			tipoUnidad: 'Cabaña',
			nombre: 'Naranja',
			capacidad: 6,
			propiedadId: 1,
			servicios: {
				create: [
					{
						servicio: {
							connect: {
								id: 1,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 2,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 3,
							},
						},
					},
					{
						servicio: {
							connect: {
								id: 4,
							},
						},
					},
				],
			},
			precioPorNoche: 20000,
			imagenes: [
				'https://www.altolasflores.com.ar/assets/img/portfolio/exterior2.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/exterior3.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/interior.jpeg',
				'https://www.altolasflores.com.ar/assets/img/portfolio/habitacion1.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/habitacion2.webp',
				'https://www.altolasflores.com.ar/assets/img/portfolio/pileta2.webp',
			],
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
