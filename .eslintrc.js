/**
 *  @type {import("eslint").ESLint.ConfigData}
 */
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    plugins: ["perfectionist", "unused-imports", "@typescript-eslint", "prettier"],
    extends: [
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "prettier",
        "plugin:perfectionist/recommended-alphabetical",
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
    },
    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
            },
        },
    },
    /**
     * 0 ~ 'off', 1 ~ 'warn', 2 ~ 'error'
     */
    rules: {
        // rules im adding to the config
        "object-curly-spacing": ["error", "always"],
        "object-curly-newline": "off",

        // get rid of direct import of React, after React 17 this is not necessary
        "no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        name: "react",
                        importNames: ["default"],
                        message:
                            "Direct import of React is not allowed. Use React features from the 'react/jsx-runtime' instead.",
                    },
                ],
            },
        ],

        "arrow-body-style": "off",
        "function-paren-newline": "off",
        "implicit-arrow-linebreak": "off",
        "nonblock-statement-body-position": "off",

        // general
        "no-alert": 0,
        camelcase: 0,
        "no-console": 0,
        "no-unused-vars": 0,
        "no-nested-ternary": 1,
        "no-param-reassign": 0,
        "no-underscore-dangle": 0,
        "no-restricted-exports": 0,
        "no-promise-executor-return": 0,
        "no-case-declarations": 0,
        "import/prefer-default-export": 1,
        "prefer-destructuring": [1, { object: true, array: false }],

        // typescript
        "@typescript-eslint/naming-convention": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/consistent-type-exports": 1,
        "@typescript-eslint/consistent-type-imports": 1,
        "@typescript-eslint/no-unused-vars": [1, { args: "none" }],

        // react
        "react/no-children-prop": 0,
        "react/react-in-jsx-scope": 0,
        "react/no-array-index-key": 0,
        "react/require-default-props": 0,
        "react/jsx-props-no-spreading": 0,
        "react/function-component-definition": 0,
        "react/jsx-no-useless-fragment": [1, { allowExpressions: true }],
        "react/no-unstable-nested-components": [1, { allowAsProps: true }],
        "react/jsx-no-duplicate-props": [1, { ignoreCase: false }],

        // jsx-a11y
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/control-has-associated-label": 0,

        // unused imports
        "unused-imports/no-unused-imports": 1,
        "unused-imports/no-unused-vars": [
            1,
            { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
        ],

        // perfectionist
        "perfectionist/sort-exports": [1, { order: "asc", type: "alphabetical" }],
        "perfectionist/sort-named-exports": [1, { order: "asc", type: "alphabetical" }],
        "perfectionist/sort-named-imports": [1, { order: "asc", type: "alphabetical" }],
        "perfectionist/sort-imports": [
            1,
            {
                order: "asc",
                type: "alphabetical",
                "newlines-between": "always",
                "internal-pattern": ["src/**"],
                groups: [
                    "type",
                    "custom-types",
                    "builtin",
                    "next",
                    "react",
                    "custom-react",
                    "external",
                    "custom-mui-icons",
                    "custom-mui",
                    "custom-auth",
                    "custom-utils",
                    "custom-actions",
                    "custom-hooks",
                    "custom-components",
                    "custom-routes",
                    "internal",
                    ["parent-type", "sibling-type", "index-type"],
                    ["parent", "sibling", "index"],
                    "object",
                    "unknown",
                    "style",
                ],
                "custom-groups": {
                    value: {
                        ["custom-types"]: "src/types/**",
                        ["next"]: ["next", "next/**"],
                        ["react"]: ["react", "react/**"],
                        ["custom-react"]: "react-*",
                        ["custom-mui-icons"]: "@mui/icons-material/**",
                        ["custom-mui"]: ["@mui/**", "@mui/lab"],
                        ["custom-auth"]: ["@auth*", "next-auth/react", "src/auth/**"],
                        ["custom-utils"]: "src/utils/**",
                        ["custom-actions"]: "src/actions/**",
                        ["custom-hooks"]: "src/hooks/**",
                        ["custom-components"]: "src/components/**",
                        ["custom-routes"]: "src/routes/**",
                    },
                },
            },
        ],
    },
}
