module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    quotes: ['error', 'single'],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'no-console': 'off',
    'no-continue': 'off',
    'max-len': 'warn',
    'import/extensions': 'off',
    'no-use-before-define': 'warn',
    'no-await-in-loop': 'warn',
    'no-undef': 'warn',
    'no-nested-ternary': 'off',
    'class-methods-use-this': 'warn',
    'no-unused-vars': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    'react/jsx-no-useless-fragment': 'off',
    'no-shadow': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    'consistent-return': 'off',
    'react/no-array-index-key': 'warn',
    'react/no-unescaped-entities': 'warn',
    'default-param-last': 'off',
    'no-restricted-globals': 'off',
  },
};
