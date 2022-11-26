module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  mode: 'jit', // <--- enable JIT
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
