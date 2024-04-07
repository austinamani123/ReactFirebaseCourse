/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
	theme: {
		fontFamily: {
			ubuntu: 'Ubuntu, sans-serif',
		},
		extend: {},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
	],
};
