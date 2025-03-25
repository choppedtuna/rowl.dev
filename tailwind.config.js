/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 2s linear infinite',
        'gradientShift': 'gradientShift 4s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': {
            'background-position': '0% 50%',
          },
          '100%': {
            'background-position': '100% 50%',
          },
        },
        'gradientShift': {
          '0%': {
            'background-position': '0% 50%',
            'transform': 'rotate(0deg)',
          },
          '25%': {
            'background-position': '100% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
            'transform': 'rotate(180deg)',
          },
          '75%': {
            'background-position': '0% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
            'transform': 'rotate(360deg)',
          },
        },
        'float': {
          '0%': {
            'transform': 'translateY(0px) scale(1)',
          },
          '50%': {
            'transform': 'translateY(-10px) scale(1.05)',
          },
          '100%': {
            'transform': 'translateY(0px) scale(1)',
          },
        },
      },
      fontFamily: {
        'nanami': ['Nanami Pro', 'sans-serif'],
      },
      fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        bold: 700,
      },
      fontSize: {
        'section-header': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
} 