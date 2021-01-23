import path from "path";
import { Connection, createConnection as _createConnection } from "typeorm";
import { container } from "../../container";
import { getEnv } from "../../config/get-env";

const entityPath =
  getEnv("NODE_ENV") === "test" ? "entity/**/*.ts" : "entity/**/*.js";

export const createConnection = (): Promise<Connection> =>
  _createConnection({
    type: "mongodb",
    entities: [path.join(__dirname, entityPath)],
    host: container.resolve<string>("dbHost"),
    port: container.resolve<number>("dbPort"),
    password: container.resolve<string>("dbPass"),
    username: container.resolve<string>("dbUser"),
    database: container.resolve<string>("dbName"),
  });
