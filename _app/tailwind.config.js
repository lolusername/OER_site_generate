/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./views/**/*.{vue,js}",
    "./components/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 