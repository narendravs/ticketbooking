module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: { flexbox: "no-2009" },
        stage: 0, // Less strict stage
        features: {
          "nesting-rules": true, // Allow nested CSS (SCSS-like syntax)
        },
      },
    ],
  ],
};
