import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				verdeOscuro: '#2D4A1A',
				verdeIntermedio: '#699B2C',
				verdeClaro: '#B8CE69',
				oscuro: '#151C15',
				marron: '#7D5244',
				naranja: '#FF944C',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
export default config;
