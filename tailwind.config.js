/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#31436F',
        'greyscale-light-grey': '#DDE2EF',
        'greyscale-pure-grey': '#586893',
        'greyscale-dark-grey': '#8693B4',
        'brand-extra-light-pink': '#FFE2EB',
        'brand-light-pink': '#F24F82',
        'brand-pure-pink': '#DA3468'
      }
    }
  },
  plugins: []
}
