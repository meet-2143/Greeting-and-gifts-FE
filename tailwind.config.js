/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#FFFDF9', 100: '#FBF6EE', 200: '#F4EBDD', 300: '#EADCC6' },
        blush: { 100: '#F8E3E0', 200: '#F1CFCB', 300: '#E8B4B0', 400: '#D98F8B' },
        peach: { 100: '#FBE5D3', 200: '#F6CFB0', 300: '#EDB088' },
        sage: { 100: '#E3EAD9', 200: '#C9D6B9', 300: '#A3B88C', 500: '#6F8760', 700: '#4A5E41' },
        cocoa: { 400: '#9A7B63', 500: '#7A5C47', 600: '#5F4434', 700: '#46301F' },
        ink: '#2B2623',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 14px -2px rgba(70,48,31,.08)',
        card: '0 10px 30px -12px rgba(70,48,31,.18)',
        lift: '0 22px 44px -16px rgba(70,48,31,.28)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'none' } },
        'slide-in': { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } },
        'slide-up': { from: { transform: 'translateY(100%)' }, to: { transform: 'none' } },
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        grow: { from: { width: '0%' }, to: { width: '100%' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
        'slide-in': 'slide-in .35s cubic-bezier(.2,.7,.2,1) both',
        'slide-up': 'slide-up .35s cubic-bezier(.2,.7,.2,1) both',
        'fade-in': 'fade-in .25s ease both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
