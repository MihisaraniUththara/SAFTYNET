import { DiBlackberry } from 'react-icons/di';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': "#000000",
        'yellow': "#FBBE00",
        'light-yellow': "#F5E2A4",
        'yellow-button': "#FDDE7F"
      }
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}