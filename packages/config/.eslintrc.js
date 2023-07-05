module.exports = {
    extends: [
        'next',
        'prettier',
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
        },
    ],
    settings: {
        next: {
            rootDir: ['apps/*/', 'packages/*/'],
        },
    },
    parser: '@typescript-eslint/parser',
    rules: {
        'prefer-const': 'error',
        'no-irregular-whitespace': 'error',
        'no-trailing-spaces': 'error',
        'no-empty-function': 'error',
        'no-duplicate-imports': 'error',
        'newline-after-var': 'error',
        semi: ['error', 'always'],
        '@next/next/no-html-link-for-pages': 'off',
    },
};
