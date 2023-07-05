module.exports = {
    extends: ['next', 'prettier', 'plugin:@typescript-eslint/recommended'],
    settings: {
        next: {
            rootDir: ['apps/*/', 'packages/*/'],
        },
    },
};
