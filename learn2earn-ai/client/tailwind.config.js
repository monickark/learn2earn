// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Detects all your components in src
  ],
  theme: {
     extend: {keyframes: {
        slideFade: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        slideFade: 'slideFade 0.4s ease-out',
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
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
