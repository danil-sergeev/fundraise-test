import { ObjectID } from "mongodb";

export enum DonationCurrencies {
  USD,
  EUR,
  GBP,
  RUB,
}

export class DonationDomain {
  constructor(
    public amount: number,
    public currency: DonationCurrencies,
    public createdAt: Date,
    public id?: string
  ) {}

  static create(amount: number, currency: DonationCurrencies): DonationDomain {
    return new DonationDomain(
      amount,
      currency,
      new Date(),
      new ObjectID().toHexString()
    );
  }
}
