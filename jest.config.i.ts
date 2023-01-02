import { config } from "./jest.config";

const integrationConfig = {
    ...config,
    testMatch: ["**/*.test.ts"]
}

module.exports = integrationConfig;