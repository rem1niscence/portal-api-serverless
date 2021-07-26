module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            object: false,
          },
          extendDefaults: true,
        },
      ],
    }
};