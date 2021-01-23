import { Connection } from "typeorm";

export class MongoDbHealthChecker {
  constructor(private getConnection: () => Connection) {}

  check(): boolean {
    try {
      const connection = this.getConnection();
      if (connection && connection.isConnected) {
        return true;
      }
    } catch (error) {}
    return false;
  }
}
