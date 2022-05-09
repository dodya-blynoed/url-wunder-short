module.exports = {
    collectCoverageFrom: ['src/**/*.{js,ts,jsx,tsx}'],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'index.js',
        'assets.d.ts',
        'custom.d.ts',
    ],
    globals: {
        window: true,
        jest: true,
        'ts-jest': {
            tsConfig: {
                target: 'es2017',
            },
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testRegex: '.*\\.test\\.(jsx|js|ts|tsx)$',
    testEnvironmentOptions: { url: 'http://localhost/' },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
}
