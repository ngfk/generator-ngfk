// https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {
    rootDir: '../',
    setupTestFrameworkScriptFile: './config/jest.setup.ts',
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    testRegex: '\\.test\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
};
