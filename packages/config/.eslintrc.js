module.exports = {
  extends: ["next", "prettier", "next/core-web-vitals"],
  plugins: ["simple-import-sort", "prettier"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
    }
  ],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-irregular-whitespace": "error",
    "no-trailing-spaces": "error",
    semi: "error",
    "no-empty-function": "error",
    "no-duplicate-imports": "error",
    "newline-after-var": "error",
    camelcase: "error"
  },
};