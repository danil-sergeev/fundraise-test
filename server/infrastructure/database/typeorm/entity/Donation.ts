import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";
import { DonationCurrencies } from "../../../../core/donations/domain/donation-domain";

@Entity()
export class Donation {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  amount: number;

  @Column({ enum: DonationCurrencies, nullable: false })
  currency: DonationCurrencies;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;
}
