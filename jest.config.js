module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], 
  testMatch: ['**/test/**/*.spec.ts'], 
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
};