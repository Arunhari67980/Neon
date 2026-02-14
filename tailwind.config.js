/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          black: '#020617',
          deep: '#0f172a',
        },
        neon: {
          purple: '#c084fc',
          blue: '#38bdf8',
          pink: '#f472b6',
        }
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(192, 132, 252, 0.5)',
        'glow-blue': '0 0 20px rgba(56, 189, 248, 0.5)',
      },
      animation: {
        'orbit-slow': 'orbit 20s linear infinite',
        'orbit-fast': 'orbit 10s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
