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
      }
    },
    env: {
      node: true,
      es6: true
    },
    rules: {
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": [
        "error", { argsIgnorePattern: "next" }
      ]
    },
    extends: "eslint:recommended"
  },
  pluginJs.configs.recommended,
];
