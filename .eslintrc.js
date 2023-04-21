const base = require('config/.eslintrc.js');

module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  ...base,
};
