import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['var(--font-rubik-mono-one)', 'sans-serif'],
        body: ['var(--font-rubik)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
