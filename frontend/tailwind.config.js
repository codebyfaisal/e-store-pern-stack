/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /^(xs|sm|md|lg|xl|2xl):col-span-(1[0-2]?|[1-9])$/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
