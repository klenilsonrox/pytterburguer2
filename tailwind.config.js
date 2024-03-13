/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home":"url('https://www.kcms.com.br/blog/wp-content/uploads/2017/03/lanchonete-competitiva.jpg')"
      },
    },
  },
  plugins: [],
};
