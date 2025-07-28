module.exports = {
  plugins: [
    require('postcss-nesting'), // 🥇 Always first
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
