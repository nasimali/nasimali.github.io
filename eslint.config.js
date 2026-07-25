// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        ignores: ['eslint.config.js', 'node_modules', 'dist', 'build'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                tsconfigRootDir: process.cwd(),
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'warn',
        },
    },
    prettier,
];