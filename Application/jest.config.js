module.exports = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testMatch: ['**/*.test.(ts|tsx)'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  preset: 'react-native',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
};
