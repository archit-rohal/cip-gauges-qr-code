/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Larger defaults for factory UI
        'base': ['1rem', { lineHeight: '1.6rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      colors: {
        // High contrast color palette for industrial environment
        'industrial-dark': '#1f2937',
        'industrial-light': '#ffffff',
        'industrial-blue': '#1e40af',
        'industrial-yellow': '#fbbf24',
        'industrial-red': '#dc2626',
        'industrial-green': '#16a34a',
      },
    },
  },
  plugins: [],
}
