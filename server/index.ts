import "reflect-metadata";

import { container, setupContainer } from "./infrastructure/container";
import { ServerRun } from "./infrastructure/web/server";
import { getEnv } from "./infrastructure/config/get-env";
import { Connection } from "typeorm";

setupContainer();

const server = container.resolve<ServerRun>("serverRun");
const createConnection = container.resolve<() => Promise<Connection>>(
  "createConnection"
);

(async function () {
  if (getEnv("NODE_ENV") !== "test") {
    await createConnection();
    await server.serve();
  }
})();
