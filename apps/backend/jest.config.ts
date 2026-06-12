/**
 * Configuracao do Jest no backend.
 *
 * Responsavel pela configuracao do Jest para backend.
 *
 * Define transformacoes, ambiente e cobertura da suite de testes do backend.
 */
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  setupFiles: ["<rootDir>/tests/setupEnv.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  clearMocks: true,
  maxWorkers: 1,
  collectCoverageFrom: ["src/**/*.ts", "!src/server.ts", "!src/types/**/*.ts"],
};

export default config;
