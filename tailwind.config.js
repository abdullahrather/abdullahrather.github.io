/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        blob: {
          "0%": { borderRadius: "60% 40% 50% 70%" },
          "25%": { borderRadius: "40% 60% 70% 50%" },
          "50%": { borderRadius: "70% 50% 40% 60%" },
          "75%": { borderRadius: "50% 70% 60% 40%" },
          "100%": { borderRadius: "60% 40% 50% 70%" },
        },
        "float-around": {
          "0%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "33%": { transform: "translate(5%, 5%) rotate(3deg) scale(1.1)" },
          "66%": { transform: "translate(-5%, 2%) rotate(-3deg) scale(0.9)" },
          "100%": {
            transform: "translate(3%, -3%) rotate(1.5deg) scale(1.05)",
          },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        blob: "blob 8s ease-in-out infinite",
        "float-around": "float-around 8s infinite alternate ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
