import Koa, { BaseContext } from "koa";
import { Connection } from "typeorm";
import { RestError } from "../errors/rest-error";
import { ServerRun } from "./server";
import { TContainer } from "../container";
import supertest, { SuperTest, Test } from "supertest";
import { StatusCodes } from "http-status-codes";

export type ApiTestingKit = {
  connection: Connection;
  app: Koa;
  request: SuperTest<Test>;
};

export async function createApiTestingKit(
  container: TContainer
): Promise<ApiTestingKit> {
  const { app } = container.resolve<ServerRun>("serverRun");
  const createConnection = container.resolve<() => Promise<Connection>>(
    "createConnection"
  );
  const connection = await createConnection();
  const request = supertest(app.callback());
  return {
    app,
    request,
    connection,
  };
}

export const handleError = (ctx: BaseContext, e: Error | RestError): void => {
  if (RestError.isRestError(e)) {
    ctx.status = e.statusCode;
    ctx.body = { message: e.message };
    return;
  }

  ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
};
