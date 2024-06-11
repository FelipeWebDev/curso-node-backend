import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    env: {
      node: true,
      es6: true,
    },
    rules: {
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
      "no-redeclare": "error",
      "no-shadow": "error",
      "prefer-destructuring": ["error", { object: true, array: true }],
      "object-shorthand": ["error", "always"],
      "no-duplicate-imports": "error",
    },
    extends: "eslint:recommended",
  },
  pluginJs.configs.recommended,
];
