module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    "@csstools/postcss-is-pseudo-class",
    [
      "postcss-preset-env",
      {
        autoprefixer: { flexbox: "no-2009" },
        stage: 3,
      },
    ],
  ],
};
