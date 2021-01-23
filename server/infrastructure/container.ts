import Koa from "koa";
import {
  asClass,
  asValue,
  createContainer,
  NameAndRegistrationPair,
} from "awilix";
import Ajv from "ajv";
import {
  getMongoRepository,
  Connection,
  getConnection,
  MongoRepository,
  EntityTarget,
} from "typeorm";

import { getEnv } from "./config/get-env";
import { DonateUseCase } from "../core/donations/application/usecases/donate";
import { AjvValidator } from "./validation/ajv-validator";
import { DonationDbRepository } from "./database/typeorm/repository/donation-repository";
import { DonationRepository } from "../core/donations/application/repository";
import { ServerRun } from "./web/server";
import { createConnection } from "./database/typeorm/create-connection";
import { MongoDbHealthChecker } from "./database/typeorm/health-check";

export const container = createContainer<IDiContainer>({
  injectionMode: "CLASSIC",
});

export type TContainer = typeof container;

export type ScopedContainer = {
  scope: TContainer;
};

export interface IDiContainer {
  /* Server */
  app: Koa;
  httpPort: number;
  serverRun: ServerRun;

  /* Validation */
  ajv: Ajv;
  validator: AjvValidator;

  /* Business logic */
  donateUseCase: DonateUseCase;

  /* Database */
  createConnection(): Promise<Connection>;
  getConnection(): Connection;
  mongoDbHealthChecker: MongoDbHealthChecker;
  getMongoRepository<E>(e: EntityTarget<E>): MongoRepository<E>;
  donationRepo: DonationRepository;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbPass: string;
  dbUser: string;
}

export function setupContainer(
  overrideOpts?: NameAndRegistrationPair<IDiContainer>
): void {
  container.register({
    app: asValue(new Koa<{}, IDiContainer>()),
    httpPort: asValue(parseInt(getEnv("HTTP_PORT"))),
    serverRun: asClass(ServerRun),

    ajv: asValue(new Ajv({ allErrors: true })),
    validator: asClass(AjvValidator),

    donateUseCase: asClass(DonateUseCase),

    createConnection: asValue(createConnection),
    getConnection: asValue(getConnection),
    mongoDbHealthChecker: asClass(MongoDbHealthChecker),
    donationRepo: asClass(DonationDbRepository),
    getMongoRepository: asValue(getMongoRepository),
    dbHost: asValue(getEnv("DB_HOST")),
    dbPort: asValue(parseInt(getEnv("DB_PORT"))),
    dbName: asValue(getEnv("DB_NAME")),
    dbPass: asValue(getEnv("DB_PASS")),
    dbUser: asValue(getEnv("DB_USER")),
    ...overrideOpts,
  });
}
