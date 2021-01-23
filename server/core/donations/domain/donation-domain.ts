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

  static create(
    amount: number,
    currency: DonationCurrencies,
    id?: string
  ): DonationDomain {
    return new DonationDomain(amount, currency, new Date(), id);
  }
}
