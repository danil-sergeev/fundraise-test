import { createConnection } from "./infrastructure/database/typeorm/create-connection";

module.exports = async (): Promise<void> => {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.synchronize(true);
  await connection.close();
};
