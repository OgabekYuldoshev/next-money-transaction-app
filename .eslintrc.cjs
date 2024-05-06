const { configure, presets } = require('eslint-kit')

module.exports = configure({
    presets: [
        presets.imports(),
        presets.react(),
        presets.nextJs(),
        presets.typescript({
            tsconfig: 'tsconfig.json'
        }),
        presets.prettier({
            "semi": false,
            "singleQuote": true,
            "tabWidth": 2,
            "quoteProps": "consistent",
            plugins: ["prettier-plugin-tailwindcss"]
        })
    ],
    extend: {
        root: true,
        ignorePatterns: ['.eslintrc.cjs'],
        extends: ['next/core-web-vitals'],
        plugins: ['unused-imports'],
        rules: {
            "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "varsIgnorePattern": "^_",
                    "args": "after-used",
                    "argsIgnorePattern": "^_",
                },
            ],
        },
    }
})