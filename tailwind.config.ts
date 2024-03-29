import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      // bg: "#7D8BAE"
      main: "#000",
      container: "#7D8BAE",
      btn: "#9AC1F0",
      btn_hover: "#000",
      text_bg: "rgb(148 163 184)",
      normal: "#9AC1F0",
      advantage: "#2e8555",
      disadvantage: "#DC143C",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1920px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
}
export default config
