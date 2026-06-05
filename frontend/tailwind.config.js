/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ch: {
          brown:    '#2B1206',
          mocha:    '#3D1A0A',
          caramel:  '#7B4A2D',
          tan:      '#C4956A',
          cream:    '#EDD9B0',
          ivory:    '#F7F0E3',
          parchment:'#FBF7F0',
          gold:     '#C08B3A',
          amber:    '#E0B060',
          sage:     '#6B8F5E',
          charcoal: '#1A0A04',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"','Georgia','serif'],
        body:    ['"DM Sans"','system-ui','sans-serif'],
      },
      backgroundImage: {
        'hero-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'scroll-hint':'scrollHint 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { from:{opacity:0,transform:'translateY(32px)'}, to:{opacity:1,transform:'translateY(0)'} },
        fadeIn:    { from:{opacity:0}, to:{opacity:1} },
        pulseGlow: { '0%,100%':{boxShadow:'0 0 30px rgba(192,139,58,0.2)'}, '50%':{boxShadow:'0 0 60px rgba(192,139,58,0.45)'} },
        float:     { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-8px)'} },
        scrollHint:{ '0%,100%':{opacity:0.3,transform:'translateY(0)'}, '50%':{opacity:0.7,transform:'translateY(5px)'} },
      },
    },
  },
  plugins: [],
}
