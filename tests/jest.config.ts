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
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
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
    '**/*.{!(*@(dto|guard|entity|module|strategy|decorator)),}.ts',
  ],
};

export default config;
