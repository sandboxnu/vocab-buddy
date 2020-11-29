module.exports = {
  overrides: [
    {
      files: "*.tsx",
      options: {
        singleQuote: false,
        printWidth: 70,
        endOfLine: "lf",
        semi: true,
        tabWidth: 2,
        trailingComma: "es5",
      },
    },
  ],
};
