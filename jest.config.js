require('dotenv').config();
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Add this line to map the '@' alias
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },  
  preset: 'ts-jest',
  testEnvironment: 'node',
};