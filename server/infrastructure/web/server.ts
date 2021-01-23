import Koa from "koa";
import { applyKoaMiddlewares } from "./apply-middlewares";

export class ServerRun {
  constructor(public readonly app: Koa, private readonly httpPort: number) {}

  async serve(): Promise<void> {
    try {
      applyKoaMiddlewares(this.app);
      this.app.listen(this.httpPort);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
