module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
    },
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
};
