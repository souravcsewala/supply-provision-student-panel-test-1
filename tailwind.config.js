/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        'custom-orange': '#fd8200',
        'custom-dashboard': '#f27c00',
        'custom-brown': '#1b0e00',
        'custom-grey': '#EEEEEE',
        'custom-hover': '#DADADA',
        'custom-peach': '#ffe3c5',
        'custom-dark': '#0F172A',
        'custom-dark-top': '#183350', 
        'custum-active-dark':"#38BDF8",
        'custum-hover-dark':"#191970",
        'custum-black-body':"#353935"
      },
    },
  },
  plugins: [],
};
