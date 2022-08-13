module.exports = {
  overrides: [
    {
      files: ['*.tsx', '*.ts', '*.js'],
      options: {
        singleQuote: true,
        printWidth: 70,
        endOfLine: 'lf',
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
      },
    },
  ],
};
