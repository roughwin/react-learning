module.exports = {
  // setupFiles: [
  //   './src/test/setup.js',
  // ],
  // transform: {".": './src/test/processor.js'},
  rootDir: './src',
  moduleNameMapper: {
    "^.*\\.less$": "<rootDir>/test/SCSSStub.js"
  },
  verbose: true,
  testRegex: '\\.test.jsx?$',
  transformIgnorePatterns: [
    '/dist/',
    'node_modules\/[^/]+?\/(?!(es|node_modules)\/)', // Ignore modules without es dir
  ],
  "moduleDirectories": ["node_modules", "src"],
};