import { setupContainer } from "./infrastructure/container";

export default {
  globalSetup: "./jest.globalSetup.ts",
  preset: "ts-jest",
  testEnvironment: "node",
};

process.env = Object.assign(process.env, {
  DB_NAME: "fundraise-test",
  DB_PORT: 27017,
  HTTP_PORT: 8000,
  DB_HOST: "localhost",
  DB_PASS: "1+92[`x,KB&ueG2cFD*8ZYa5Spg2zpwz",
  DB_USER: "fundraise_user",
});

setupContainer();
