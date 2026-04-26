import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        'accent-warm': 'var(--accent-warm)',
        text: 'var(--text)',
        'soft-white': 'var(--soft-white)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'cute': '0 6px 25px rgba(255, 183, 178, 0.2)',
        'cute-lg': '0 10px 35px rgba(255, 183, 178, 0.25)',
      },
      borderRadius: {
        card: '24px',
        blob: '30% 70% 70% 30% / 30% 30% 70% 70%',
        blob2: '60% 40% 30% 70% / 60% 30% 70% 40%',
      },
      animation: {
        'wobble': 'wobble 2s ease-in-out infinite',
        'squish': 'squish 1.5s ease-in-out infinite',
        'bounce-bubbly': 'bounce-bubbly 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
        'float-bouncy': 'float-bouncy 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '15%': { transform: 'translateX(-8px) rotate(-2deg)' },
          '30%': { transform: 'translateX(8px) rotate(2deg)' },
          '45%': { transform: 'translateX(-6px) rotate(-1.5deg)' },
          '60%': { transform: 'translateX(6px) rotate(1.5deg)' },
          '75%': { transform: 'translateX(-3px) rotate(-0.5deg)' },
          '90%': { transform: 'translateX(3px) rotate(0.5deg)' },
        },
        squish: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
          '50%': { transform: 'scaleY(0.9) scaleX(1.05)' },
        },
        'bounce-bubbly': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '25%': { transform: 'translateY(-20px) scale(0.95)' },
          '50%': { transform: 'translateY(0) scale(1.05)' },
          '75%': { transform: 'translateY(-12px) scale(0.98)' },
        },
        'float-bouncy': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

