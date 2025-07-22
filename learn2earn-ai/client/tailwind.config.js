// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Detects all your components in src
  ],
  theme: {
    extend: {},
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
