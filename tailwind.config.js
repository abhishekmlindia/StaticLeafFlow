module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        site: "#5875f8", // ✅ now you can use bg-site, text-site, border-site, etc.
        siteLightGrey: "#f5f7ff",
        siteDarkGey: "#F2F2F7",
      },
       screens: {
        'xxl': '1440px', // custom breakpoint
      },
      animation: {
        "gradient-x": "gradient-x 0.2s linear infinite", // you can reduce 0.5s to 0.3s for faster
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
