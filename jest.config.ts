import type { Config } from "jest";
import { createDefaultPreset } from "ts-jest";

const config: Config = {
  verbose: true,
  rootDir: "src",
  resolver: "ts-jest-resolver",
  coverageDirectory: "../coverage",
  coverageReporters: ["text", "html", "lcov"],
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/*.ts",
    "!**/types.ts",
    "!**/*.d.ts",
    "!index.ts",
    "!**/startServer.ts",
    "!**/connectToDatabase.ts",
  ],
  ...createDefaultPreset(),
};

export default config;
