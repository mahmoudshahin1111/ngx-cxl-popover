module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns:[
        "<rootDir>/src/test.ts",
        "<rootDir>/src/app/app.component.spec.ts",
        "<rootDir>/projects/ngx-cxl-popover/src/test.ts"
    ]
  };