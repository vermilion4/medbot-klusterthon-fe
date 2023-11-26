/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#0098DE',
        'primary-hover': '#008FD1',
        'primary-surface': '#E0F3FB',
        secondary: '#14B9A4',
        'secondary-hover': '#13AD9A',
        'secondary-surface': '#E3F7F4',
        'base': '#1A1F21',
        'subdued': '#595D62',
        'grey':{
          50: '#F2F2F2',
          100: '#FAF9F9',
          200: '#E2E2E2',
        },
        'warning': {
          10:'#FFB3191F',
          60:'#FFB3198F',
          100:'#FFB319',
        },
        'critical': {
          10:'#D330301F',
          60:'#D330308F',
          100:'#D33030',
        },
        'success': {
          10:'#6FAD3F1F',
          60:'#6FAD3F8F',
          100:'#6FAD3F',
        },
        }
      }
    },
    plugins: [
      [
        "import",
      {
        "libraryName": "antd",
        "style": true
      }
    ]]
}
