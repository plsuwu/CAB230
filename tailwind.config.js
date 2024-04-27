/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				vol: {
					crust: '#1a242f',
					mantle: '#2c3d4e',
					surface: '#3c5368',
					base: '#787f84',
					white: '#fff9f5',
					champ: '#f9e5c7',
					peach: '#f2d492',
					fawn: '#f1ae6a',
					orange: '#f08842',
					red: '#c62810',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};
