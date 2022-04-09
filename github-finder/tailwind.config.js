// prettier-ignore
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				'3xl': { min: '1600px' },
			},
		},
	},
	plugins: [require('daisyui')],
}
