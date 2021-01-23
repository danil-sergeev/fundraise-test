import { StatusCodes } from "http-status-codes";
import { container, setupContainer } from "../../container";
import { ApiTestingKit, createApiTestingKit } from "../utils";
import { applyKoaMiddlewares } from "../apply-middlewares";

setupContainer();

describe("Health Routes", () => {
  let kit: ApiTestingKit;

  beforeAll(async () => {
    kit = await createApiTestingKit(container);
    applyKoaMiddlewares(kit.app);
  });

  it("should response with 200 OK", async () => {
    await kit.request
      .get("/mongo-health")
      .set("Accept", "application/json")
      .expect(StatusCodes.OK);
  });

  it("should response with 503 SERVICE UNAVAILABLE", async () => {
    await kit.connection.close();
    await kit.request
      .get("/mongo-health")
      .set("Accept", "application/json")
      .expect(StatusCodes.SERVICE_UNAVAILABLE);
  });
});
