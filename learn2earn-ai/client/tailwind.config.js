// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Detects all your components in src
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // 🎨 Color system extracted from HomeComponent
      colors: {
        primary: {
          DEFAULT: '#ec4899', // Tailwind pink-500
          light: '#f9a8d4',   // Tailwind pink-300
          dark: '#db2777',    // Tailwind pink-600
        },
        background: {
          light: '#eef2ff',   // Tailwind indigo-50
          card: '#ffffff',    // Card backgrounds
        },
        text: {
          heading: '#111827', // Tailwind gray-900
          body: '#374151',    // Tailwind gray-700
          muted: '#6b7280',   // Tailwind gray-500
        },
      },
      
      // 🖋️ Typography & font family
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
      },

      // ✨ Existing Animations (kept intact)
      keyframes: {
        slideFade: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        slideFade: 'slideFade 0.4s ease-out',
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
