import { Entity, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "../BaseEntity";

@Entity({ tableName: 'user' })
export class UserEntity extends BaseEntity {

  @Property()
  firstName!: string;

  @Property()
  middleName?: string;

  @Property()
  lastName!: string;

  @Property()
  provider?: string;

  @Property()
  displayName?: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @Property()
  photo?: string;

  @Property()
  role!: string;

  @Property({ nullable: true })
  dob?: Date;

}