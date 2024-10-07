/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      translate: ['hover', 'focus'],
      scale: ['hover', 'focus'],
      opacity: ['hover', 'focus'],
    }
  },
  plugins: [],
  
}

