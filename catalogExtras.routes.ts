import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1523',
        paper: '#FAF6F0',
        plum: {
          DEFAULT: '#4B2E6B',
          50: '#F3EEF8',
          100: '#E4D6EE',
          300: '#9E76BE',
          500: '#4B2E6B',
          700: '#361F4F',
          900: '#221333',
        },
        marigold: {
          DEFAULT: '#F2A93B',
          100: '#FCE9C8',
          300: '#F6C878',
          500: '#F2A93B',
          700: '#C6821F',
        },
        teal: {
          DEFAULT: '#1F7A6C',
          100: '#D8EFE9',
          500: '#1F7A6C',
          700: '#155A50',
        },
        line: '#E7DFD3',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-public-sans)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      borderRadius: {
        stamp: '3px',
      },
      backgroundImage: {
        'ticket-perforation':
          'radial-gradient(circle, transparent 4px, currentColor 4.5px) 0 0 / 14px 14px repeat-x',
      },
    },
  },
  plugins: [],
};

export default config;
