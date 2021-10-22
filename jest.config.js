module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'Coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
