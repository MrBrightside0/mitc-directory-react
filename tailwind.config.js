/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#f8fafc',    
        surface: '#f1f5f9', 
        border: '#cbd5e1',  
        ink: '#0f172a',     
        subtle: '#64748b',  
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'sharp': '4px 4px 0px 0px rgba(203, 213, 225, 0.5)', 
        'drawer': '-4px 0px 0px 0px rgba(203, 213, 225, 0.5)',
      }
    },
  },
  plugins: [],
}