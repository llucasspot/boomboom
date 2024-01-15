module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "universe/native",
    "@react-native",
    "plugin:jest/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "import",
    "react-hooks",
    "react-native",
    "unused-imports",
  ],
  rules: {
    "no-redeclare": "error",
    "react/prop-types": "off",
    "react/jsx-boolean-value": "error",
    "react/react-in-jsx-scope": "off",
    "react-native/no-unused-styles": "error",
    "react-native/no-color-literals": "warn",
    "react-native/no-inline-styles": "off", // TODO: Turn on an fix this errors
    "react/no-unescaped-entities": [
      "error",
      {
        forbid: [
          {
            char: ">",
            alternatives: ["&gt;"],
          },
        ],
      },
    ],
    "unused-imports/no-unused-imports": "error",
  },
};
