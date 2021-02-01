import { EntityTarget, MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { Donation } from "../entity/Donation";
import { DonationRepository } from "../../../../core/donations/application/repository";
import { DonationDomain } from "../../../../core/donations/domain/donation-domain";

export class DonationDbRepository implements DonationRepository {
  private mongoManager: MongoRepository<Donation>;
  constructor(
    private getMongoRepository: (
      e: EntityTarget<Donation>
    ) => MongoRepository<Donation>
  ) {
    this.mongoManager = this.getMongoRepository(Donation);
  }

  private _encodeModel = (model: Donation) => {
    return new DonationDomain(
      model.amount,
      model.currency,
      model.createdAt,
      model.id.toString()
    );
  };

  async create(data: DonationDomain): Promise<DonationDomain> {
    const newDonation = new Donation();
    newDonation.amount = data.amount;
    newDonation.currency = data.currency;
    newDonation.createdAt = data.createdAt;
    newDonation.id = ObjectId.createFromHexString(data.id);

    await this.mongoManager.insertOne(newDonation);
    return this._encodeModel(newDonation);
  }
}
