const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  // Only run our own source tests. Never scan build output or scratch folders
  // (e.g. a throwaway browser profile under .shots can carry third-party *.test.js).
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/.shots/"],
};

module.exports = createJestConfig(config);
