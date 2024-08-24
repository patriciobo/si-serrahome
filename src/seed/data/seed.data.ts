export const initialData = {
	unidades: [
		{
			//id: 1
			nombre: 'Cabaña 1',
			capacidad: 6,
		},
		{
			//id: 2
			nombre: 'Cabaña 2',
			capacidad: 6,
		},
		{
			//id: 3
			nombre: 'Cabaña 3',
			capacidad: 6,
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
	],
};
