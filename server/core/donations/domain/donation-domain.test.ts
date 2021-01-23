import mockDate from "mockdate";
import { DonationCurrencies, DonationDomain } from "./donation-domain";

mockDate.set(1434319925275);

describe("DonationDomain", () => {
  test("create donation domain", () => {
    const donation = DonationDomain.create(50, DonationCurrencies.EUR, "1");
    const date = new Date();
    expect(donation.id).toBe("1");
    expect(donation.createdAt.toISOString()).toBe(date.toISOString());
    expect(donation.amount).toBe(50);
    expect(donation.currency).toBe(DonationCurrencies.EUR);
  });
});
