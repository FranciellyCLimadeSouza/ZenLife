import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Configuração para arquivos JavaScript (Node.js backend)
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error",
      "curly": "error"
    },
  },
  pluginJs.configs.recommended,

  // Configuração para Angular (front-web) e Ionic (mobile-app) em TypeScript
  {
    files: ["front-web/angular-app/**/*.ts", "mobile-app/ionic-angular/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off"
    },
  },
  tseslint.configs.recommended,
];