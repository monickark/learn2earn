// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Detects all your components in src
  ],
  theme: {
    colors: {
      primary: '#106EBE',
      bright: '#00ABE4',
      mint: '#0FFCBE',
      lightblue: '#E9F1FA',
      white: '#FFFFFF',
    }
  },
  typography: (theme) => ({
  invert: {
    css: {
      '--tw-prose-headings': theme('colors.indigo.200'),
      '--tw-prose-body': theme('colors.indigo.100'),
      '--tw-prose-bullets': theme('colors.indigo.300'),
    },
  },
}),
  plugins: [require('@tailwindcss/typography')],

};
