module.exports = {
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@environment': '<rootDir>/src/environments/environment',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/containers/fake-login/**/*.ts',
    'src/app/containers/settings/**/*.ts',
    'src/app/shared/components/sb-calendar/**/*.ts',
    'src/app/shared/services/**/*.ts',
    'src/app/shared/utils/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/**/*.test.ts',
    '!src/app/**/*.mock.ts',
    '!src/app/**/*.module.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
};
