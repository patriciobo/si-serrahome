export const initialData = {
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
			servicios: ['aire', 'pileta', 'tele'],
			precioPorNoche: 20000,
			imagenes: ['imagen1', 'imagen5'],
			propiedadId: 1,
		},
		{
			//id: 2
			tipoUnidad: 'Cabaña',
			nombre: 'Azul',
			capacidad: 6,
			servicios: ['aire', 'pileta', 'tele'],
			precioPorNoche: 20000,
			imagenes: ['imagen1', 'imagen2', 'imagen3'],
			propiedadId: 1,
		},
		{
			//id: 3
			tipoUnidad: 'Cabaña',
			nombre: 'Naranja',
			capacidad: 6,
			servicios: ['aire', 'pileta', 'tele'],
			precioPorNoche: 20000,
			imagenes: ['imagen1', 'imagen2', 'imagen3', 'imagen4'],
			propiedadId: 1,
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
