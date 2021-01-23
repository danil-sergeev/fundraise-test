import Router from "koa-router";
import { StatusCodes } from "http-status-codes";
import { ScopedContainer } from "../container";
import { handleError } from "./utils";
import { MongoDbHealthChecker } from "../database/typeorm/health-check";

export const healthRouter = new Router<{}, ScopedContainer>();

healthRouter.get("/mongo-health", async (ctx) => {
  try {
    const healthChecker = await ctx.scope.resolve<MongoDbHealthChecker>(
      "mongoDbHealthChecker"
    );
    const isHealthy = await healthChecker.check();
    ctx.status = isHealthy ? StatusCodes.OK : StatusCodes.SERVICE_UNAVAILABLE;
  } catch (error) {
    handleError(ctx, error);
  }
});
