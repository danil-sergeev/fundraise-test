import Koa from "koa";
import koaBody from "koa-body";
import koaLogger from "koa-logger";
import koaHelmet from "koa-helmet";

export const applyKoaMiddlewares = (app: Koa): void => {
  app.use(koaBody());
  app.use(koaHelmet());
  app.use(koaLogger());
};
