module.exports = {
  plugins: [
    "postcss-import",
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
    "postcss-reporter",
  ],
};
