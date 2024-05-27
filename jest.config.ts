import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testRegex: ['(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$'],
    moduleNameMapper: {
        "^@core$": ["<rootDir>/src/core/index.ts"],
        "^@core/(.*)$": ["<rootDir>/src/core/$1"],
        "^@app$": ["<rootDir>/src/index.ts"],
        "^@app/(.*)$": ["<rootDir>/src/$1"],
    }
};

export default config;
