import { DonationRepository } from "../repository";
import {
  DonationCurrencies,
  DonationDomain,
} from "../../domain/donation-domain";

export class DonateDtoInput {
  constructor(public amount: number, public currency: DonationCurrencies) {}
}

export class DonateDtoOutput {
  constructor(public ok: boolean) {}
}

export class DonateUseCase {
  constructor(private donationRepo: DonationRepository) {}

  async execute<S>(dto: DonateDtoInput, schema: S): Promise<DonateDtoOutput> {
    const donation = DonationDomain.create(dto.amount, dto.currency);
    const createdDonation = await this.donationRepo.create(donation);
    return new DonateDtoOutput(!!createdDonation);
  }
}
