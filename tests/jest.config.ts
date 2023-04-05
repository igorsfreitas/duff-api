import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'ts'],
  rootDir: '../',
  testRegex: ['.*\\.spec\\.ts$'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@commons/(.*)$': '<rootDir>/src/commons/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/src/commons/',
    '<rootDir>/src/config/',
    '<rootDir>/src/utils/',
    '<rootDir>/src/validators/',
    '<rootDir>/tests/jest.config.ts',
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/*.{!(*@(dto|guard|entity|module|strategy|decorator|filter|validator)),}.ts',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/tests/mocks/repository.mock.ts'],
};

export default config;
