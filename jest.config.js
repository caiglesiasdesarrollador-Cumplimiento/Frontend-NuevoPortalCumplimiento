module.exports = {
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@environment': '<rootDir>/src/environments/environment',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '^tech-block-lib$': '<rootDir>/src/app/lib/index.ts',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
};
