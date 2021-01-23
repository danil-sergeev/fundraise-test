import { StatusCodes } from "http-status-codes";
import { setupContainer, container } from "../../container";
import { DonationCurrencies } from "../../../core/donations/domain/donation-domain";
import { applyKoaMiddlewares } from "../apply-middlewares";
import { ApiTestingKit, createApiTestingKit } from "../utils";

setupContainer();

describe("Donation Routes", () => {
  let apiKit: ApiTestingKit;

  beforeEach(async () => {
    apiKit = await createApiTestingKit(container);
    applyKoaMiddlewares(apiKit.app);
  });

  afterEach(() => apiKit.connection.close());

  it("should response with 201 CREATED", async () => {
    await apiKit.request
      .post("/donate")
      .send({ amount: 50, currency: DonationCurrencies.RUB })
      .set("Accept", "application/json")
      .expect(StatusCodes.CREATED)
      .expect("Content-Type", /json/);
  });

  it("should response with 422 UNPROCESSABLE ENTITY if amount below 0", async () => {
    await apiKit.request
      .post("/donate")
      .send({ amount: -10, currency: DonationCurrencies.RUB })
      .set("Accept", "application/json")
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)
      .expect("Content-Type", /json/);
  });

  it("should response with 422 UNPROCESSABLE ENTITY if currency is not supported", async () => {
    await apiKit.request
      .post("/donate")
      .send({ amount: 50, currency: 7 })
      .set("Accept", "application/json")
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)
      .expect("Content-Type", /json/);
  });

  it("should response with 422 UNPROCESSABLE ENTITY if any of body's parameters is not given", async () => {
    await apiKit.request
      .post("/donate")
      .send({ amount: null, currency: DonationCurrencies.RUB })
      .set("Accept", "application/json")
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)
      .expect("Content-Type", /json/);
  });
});
