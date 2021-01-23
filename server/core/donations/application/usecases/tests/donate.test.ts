import { anything, capture, instance, mock, verify, when } from "ts-mockito";

import { DonationRepository } from "../../repository";
import { DonateDtoInput, DonateDtoOutput, DonateUseCase } from "../donate";
import { Validator } from "../../../../validation/validator";
import {
  DonationCurrencies,
  DonationDomain,
} from "../../../domain/donation-domain";

describe("Donate Use Case", () => {
  it("should execute donate use case", async function () {
    const MockDonateRepo: DonationRepository = mock<DonationRepository>();
    const MockValidator: Validator = mock<Validator>();

    const input = new DonateDtoInput(50, DonationCurrencies.EUR);

    when(MockValidator.validate(input, anything())).thenReturn(
      Promise.resolve()
    );
    when(MockDonateRepo.create(anything())).thenReturn(
      Promise.resolve(DonationDomain.create(50, DonationCurrencies.EUR))
    );

    const donateRepo: DonationRepository = instance(MockDonateRepo);
    const validator: Validator = instance(MockValidator);

    const useCase = new DonateUseCase(donateRepo, validator);

    const executed = await useCase.execute(input, {});

    const [domainArg] = capture(MockDonateRepo.create).last();
    const [inputArg] = capture(MockValidator.validate).first();
    verify(MockDonateRepo.create(domainArg)).called();
    verify(MockValidator.validate(inputArg, anything())).called();

    expect(executed).toBeInstanceOf(DonateDtoOutput);
    expect(executed.ok).toBeTruthy();
  });
});
