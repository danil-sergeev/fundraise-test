import { DonationDomain } from "../domain/donation-domain";

export abstract class DonationRepository {
  abstract create(data: DonationDomain): Promise<DonationDomain>;
}
