module.exports = {
  testEnvironment: "node",
  verbose: false,
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules'],
}