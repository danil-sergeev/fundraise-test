import { Connection } from "typeorm";
import { container, setupContainer } from "../../../container";
import { DonationDbRepository } from "../repository/donation-repository";
import {
  DonationCurrencies,
  DonationDomain,
} from "../../../../core/donations/domain/donation-domain";

setupContainer();

const createConnection = container.resolve<() => Promise<Connection>>(
  "createConnection"
);

describe("Donation MongoDB Repository", () => {
  it("should create donation document", async () => {
    await createConnection();
    const donateRepo = container.resolve<DonationDbRepository>("donationRepo");
    const donation = DonationDomain.create(50, DonationCurrencies.EUR);
    const document = await donateRepo.create(donation);
    expect(document).toBeInstanceOf(DonationDomain);
    expect(document.id).not.toBeNull();
  });
});
