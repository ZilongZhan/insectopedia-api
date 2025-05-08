import type { Config } from "jest";
import { createDefaultPreset } from "ts-jest";

const config: Config = {
  verbose: true,
  rootDir: "src",
  resolver: "ts-jest-resolver",
  ...createDefaultPreset(),
};

export default config;
