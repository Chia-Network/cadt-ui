/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        leftNavBg: 'var(--color-leftNavBg)',
        leftNavText: 'var(--color-leftNavText)',
        headerBackground: 'var(--color-headerBackground)',
        accent: 'var(--color-accent)',
        highlight: 'var(--color-highlight)',
        // Add more as needed
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
