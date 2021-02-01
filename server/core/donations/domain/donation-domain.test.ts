import mockDate from "mockdate";
import { DonationCurrencies, DonationDomain } from "./donation-domain";

mockDate.set(1434319925275);

describe("DonationDomain", () => {
  test("create donation domain", () => {
    const donation = DonationDomain.create(50, DonationCurrencies.EUR);
    const date = new Date();
    expect(donation.id).not.toBeNull();
    expect(donation.createdAt.toISOString()).toBe(date.toISOString());
    expect(donation.amount).toBe(50);
    expect(donation.currency).toBe(DonationCurrencies.EUR);
  });
});
