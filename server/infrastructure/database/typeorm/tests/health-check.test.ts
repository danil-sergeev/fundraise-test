import { Connection } from "typeorm";
import { container, setupContainer } from "../../../container";
import { MongoDbHealthChecker } from "../health-check";

setupContainer();

const createConnection = container.resolve<() => Promise<Connection>>(
  "createConnection"
);
const mongoDbHealthChecker = container.resolve<MongoDbHealthChecker>(
  "mongoDbHealthChecker"
);

describe("Mongo DB Health Check", () => {
  it("should return true if connection is established", async () => {
    const connection = await createConnection();

    const connected = await mongoDbHealthChecker.check();
    await connection.close();
    expect(connected).toBeTruthy();
  });

  it("should return false if connection is not established", async () => {
    const connected = await mongoDbHealthChecker.check();
    expect(connected).toBeFalsy();
  });
});
