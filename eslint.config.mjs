import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": [
        "error", {argsIgnorePattern: "next"}
      ]
    }
  },
  pluginJs.configs.recommended,
];
