/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#08dd70',
        'custom-yellow': '#fee61f',
        'custom-orange': '#ff830c',
        'custom-red': '#fb1a4a',
        'custom-purple': '#b201ee',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(66, 153, 225, 0.5)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(66, 153, 225, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(66, 153, 225, 0)' },
        }
      }
    },
  },
  plugins: [],
}

