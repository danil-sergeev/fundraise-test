import Router from "koa-router";
import { StatusCodes } from "http-status-codes";
import { ScopedContainer } from "../container";
import {
  DonateDtoInput,
  DonateUseCase,
} from "../../core/donations/application/usecases/donate";
import donateSchema from "../validation/schema/donate.json";
import { handleError } from "./utils";

export const donationRouter = new Router<{}, ScopedContainer>();

donationRouter.post("/donate", async (ctx) => {
  try {
    const { amount = null, currency = null } = <DonateDtoInput>ctx.request.body;
    const input = new DonateDtoInput(amount, currency);
    const donateUseCase = ctx.scope.resolve<DonateUseCase>("donateUseCase");
    const response = await donateUseCase.execute(input, donateSchema);
    ctx.status = StatusCodes.CREATED;
    ctx.body = response;
  } catch (error) {
    handleError(ctx, error);
  }
});
