module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    '^@containers/(.*)$': '<rootDir>/src/app/containers/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@environment': '<rootDir>/src/environments/environment',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
};
